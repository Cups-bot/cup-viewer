"""S07 / S12 / S14: authored environments around the unchanged product.

Layout coordinates are multiples of cup height; product scale stays exactly 1.
The existing material, print mapping, renderer and exporter are reused.
"""
import math
import random
from pathlib import Path

import bpy
from mathutils import Vector
from . import greybox, material, place


def mat(name, rgb, roughness=.5, metallic=0, transmission=0, ior=1.45):
    m = bpy.data.materials.new('ENV_' + name)
    m.use_nodes = True
    p = m.node_tree.nodes.get('Principled BSDF')
    p.inputs['Base Color'].default_value = (*rgb, 1)
    for key, value in [('Roughness', roughness), ('Metallic', metallic),
                       ('Transmission Weight', transmission), ('IOR', ior)]:
        p.inputs[key].default_value = value
    return m


class Stage:
    def __init__(self, height, collection):
        self.h, self.coll = height, collection

    def attach(self, ob, name, material=None):
        ob.name = 'ENV_' + name
        for c in list(ob.users_collection):
            c.objects.unlink(ob)
        self.coll.objects.link(ob)
        if material:
            ob.data.materials.append(material)
        return ob

    def box(self, name, xyz, size, material, bevel=.01, rotation=(0, 0, 0)):
        bpy.ops.mesh.primitive_cube_add(size=1, location=Vector(xyz)*self.h)
        ob = self.attach(bpy.context.object, name, material)
        ob.dimensions = Vector(size)*self.h
        bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
        ob.rotation_euler = tuple(math.radians(v) for v in rotation)
        if bevel:
            b = ob.modifiers.new('Soft manufactured edges', 'BEVEL')
            b.width, b.segments = bevel*self.h, 4
            ob.modifiers.new('Weighted face normals', 'WEIGHTED_NORMAL')
        return ob

    def sphere(self, name, xyz, size, material):
        bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=20, location=Vector(xyz)*self.h)
        ob = self.attach(bpy.context.object, name, material)
        ob.scale = Vector(size)*self.h
        for p in ob.data.polygons:
            p.use_smooth = True
        return ob

    def light(self, name, xyz, target, watts, size, color=(1,1,1)):
        data = bpy.data.lights.new('ENV_' + name, 'AREA')
        data.shape = 'RECTANGLE'
        data.energy = watts*(self.h/.1353)**2
        data.size, data.size_y = size[0]*self.h, size[1]*self.h
        data.color = color
        ob = bpy.data.objects.new(data.name, data)
        self.coll.objects.link(ob)
        ob.location = Vector(xyz)*self.h
        greybox._aim(ob, Vector(target)*self.h)
        return ob


def sun(s, name, aim_deg, watts, color, angle_deg=.53):
    """Настоящее солнце: параллельные лучи и резкая тень от переплёта.

    Площадной источник такую тень не рисует — он размывает её тем сильнее, чем
    дальше от преграды, и раскладка света на подоконнике превращается в общее
    свечение. На референсе именно рисунок теней от рам держит кадр.
    Мощность SUN задаётся облучённостью и от размера сцены не зависит.
    """
    data = bpy.data.lights.new('ENV_' + name, 'SUN')
    data.energy = watts
    data.angle = math.radians(angle_deg)
    data.color = color
    ob = bpy.data.objects.new(data.name, data)
    s.coll.objects.link(ob)
    ob.rotation_euler = tuple(math.radians(v) for v in aim_deg)
    return ob


def stone_texture(m):
    folder = Path(place.PROJECT)/'scenes/assets/concrete_floor_02'
    nt = m.node_tree
    p = nt.nodes.get('Principled BSDF')
    coord = nt.nodes.new('ShaderNodeTexCoord')
    mapping = nt.nodes.new('ShaderNodeVectorMath')
    mapping.operation = 'SCALE'
    mapping.inputs['Scale'].default_value = 2.0 # one repeat per 0.5 metres
    nt.links.new(coord.outputs['Object'], mapping.inputs[0])
    for suffix, socket in [('diff','Base Color'),('rough','Roughness'),('bump','Normal')]:
        path = folder/f'concrete_floor_02_{suffix}_2k.jpg'
        if not path.exists():
            raise place.ConfigError(f'Missing scene texture: {path}')
        image = bpy.data.images.load(str(path), check_existing=True)
        image.colorspace_settings.name = 'sRGB' if suffix=='diff' else 'Non-Color'
        image.pack()
        tex = nt.nodes.new('ShaderNodeTexImage')
        tex.image, tex.projection, tex.projection_blend = image, 'BOX', .2
        nt.links.new(mapping.outputs[0], tex.inputs['Vector'])
        if suffix == 'bump':
            # A true scalar height map supports seamless triplanar projection.
            bump = nt.nodes.new('ShaderNodeBump')
            bump.inputs['Strength'].default_value = .12
            bump.inputs['Distance'].default_value = .00004
            nt.links.new(tex.outputs['Color'], bump.inputs['Height'])
            nt.links.new(bump.outputs['Normal'], p.inputs[socket])
        elif suffix=='diff':
            mix = nt.nodes.new('ShaderNodeMixRGB')
            mix.blend_type='MIX'
            mix.inputs[0].default_value=.45
            mix.inputs[2].default_value=(.52,.49,.42,1)
            nt.links.new(tex.outputs['Color'],mix.inputs[1])
            nt.links.new(mix.outputs[0],p.inputs[socket])
        else:
            nt.links.new(tex.outputs['Color'],p.inputs[socket])


def micro_finish(m,scale,distance,strength):
    nt=m.node_tree;p=nt.nodes.get('Principled BSDF')
    coord=nt.nodes.new('ShaderNodeTexCoord');noise=nt.nodes.new('ShaderNodeTexNoise')
    noise.inputs['Scale'].default_value=scale;noise.inputs['Detail'].default_value=2
    nt.links.new(coord.outputs['Object'],noise.inputs['Vector'])
    bump=nt.nodes.new('ShaderNodeBump');bump.inputs['Distance'].default_value=distance;bump.inputs['Strength'].default_value=strength
    nt.links.new(noise.outputs['Fac'],bump.inputs['Height']);nt.links.new(bump.outputs[0],p.inputs['Normal'])


def polished_stone(m):
    nt=m.node_tree;p=nt.nodes.get('Principled BSDF')
    for link in list(p.inputs['Roughness'].links):nt.links.remove(link)
    p.inputs['Roughness'].default_value=.19
    p.inputs['Coat Weight'].default_value=.20;p.inputs['Coat Roughness'].default_value=.18
    coord=nt.nodes.new('ShaderNodeTexCoord');mapping=nt.nodes.new('ShaderNodeVectorMath')
    mapping.operation='SCALE';mapping.inputs['Scale'].default_value=1/.30
    nt.links.new(coord.outputs['Object'],mapping.inputs[0])
    tex=nt.nodes.new('ShaderNodeTexImage')
    tex.image=bpy.data.images.load(str(Path(place.PROJECT)/'scenes/assets/city/terrazzo_basecolor.png'),check_existing=True)
    tex.image.pack();tex.projection='BOX';tex.projection_blend=.2
    # Плита референса — средне-серая с тёмным заполнителем. Готовая карта
    # заметно светлее, поэтому её приглушаем, иначе солнце выбивает подоконник в белое.
    nt.links.new(mapping.outputs[0],tex.inputs['Vector'])
    shade=nt.nodes.new('ShaderNodeMixRGB');shade.blend_type='MULTIPLY'
    shade.inputs[0].default_value=1.0;shade.inputs[2].default_value=(.46,.45,.44,1)
    nt.links.new(tex.outputs['Color'],shade.inputs[1])
    nt.links.new(shade.outputs[0],p.inputs['Base Color'])


def melt_mesh(ob,h):
    """Round, remesh and melt only environmental ice; never called on product."""
    bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    for mod in list(ob.modifiers):bpy.ops.object.modifier_apply(modifier=mod.name)
    remesh=ob.modifiers.new('Uniform ice surface','REMESH');remesh.mode='VOXEL';remesh.voxel_size=.022*h
    bpy.ops.object.modifier_apply(modifier=remesh.name)
    # Слабее прежнего: сильное сглаживание превращало кусок льда в оплывшее
    # стекло, а на референсе грани читаются, скруглены только рёбра.
    smooth=ob.modifiers.new('Melted edges','SMOOTH');smooth.factor=.55;smooth.iterations=2
    bpy.ops.object.modifier_apply(modifier=smooth.name)
    tex=bpy.data.textures.new('Ice surface undulations','CLOUDS');tex.noise_scale=.075*h;tex.noise_depth=2
    dis=ob.modifiers.new('Irregular melting','DISPLACE');dis.texture=tex;dis.strength=.013*h;dis.mid_level=.47
    bpy.ops.object.modifier_apply(modifier=dis.name)
    for p in ob.data.polygons:p.use_smooth=True
    bpy.context.view_layer.update()
    low=min((ob.matrix_world@v.co).z for v in ob.data.vertices)
    ob.location.z-=low


def urban(s, shot):
    stone = mat('Honed pale stone',(.48,.45,.39),.6)
    stone_texture(stone)
    polished_stone(stone)
    s.box('Window ledge',(0,0,-.13),(5.6,3.2,.26),stone,.015)
    frame = mat('Warm graphite anodised frame',(.022,.024,.026),.16,.85)
    s.box('Window mullion',(-1.13,.72,1.8),(.12,.20,4.1),frame,.014)
    s.box('Frame base',(-.1,.95,.10),(5.2,.14,.20),frame,.012)
    # The distant skyline is a generated photographic backplate. Everything
    # in reach of the cup is geometry and receives actual shadows/reflections.
    image=bpy.data.images.load(str(Path(place.PROJECT)/'scenes/assets/city/skyline.png'),check_existing=True)
    image.pack()
    sky=mat('Distant photographic skyline',(1,1,1),1)
    nt=sky.node_tree;nt.nodes.clear();out=nt.nodes.new('ShaderNodeOutputMaterial')
    tex=nt.nodes.new('ShaderNodeTexImage');tex.image=image
    emit=nt.nodes.new('ShaderNodeEmission');emit.inputs['Strength'].default_value=.75
    nt.links.new(tex.outputs['Color'],emit.inputs['Color']);nt.links.new(emit.outputs[0],out.inputs['Surface'])
    bpy.ops.mesh.primitive_plane_add(size=2,location=(0,20*s.h,-5*s.h),rotation=(math.pi/2,0,0))
    plate=s.attach(bpy.context.object,'Distant city backplate',sky);plate.scale=(7.8*s.h,7.8*s.h,1)
    wall=mat('Window wall',(.055,.062,.068),.8)
    s.box('Left window reveal',(-1.72,.85,1.5),(1.0,.6,3.3),wall,.01)
    # Paper edges and curved covers read as a quiet magazine, without branding.
    paper=mat('Magazine paper',(.72,.71,.67),.7)
    cover=mat('Magazine charcoal cover',(.042,.05,.052),.4)
    for i in range(10):
        s.box('Magazine page '+str(i),(-1.02,-.80,.012+i*.003),(.76,.50,.002),paper,.003,rotation=(0,0,-16))
    s.box('Magazine cover',(-1.02,-.80,.044),(.78,.51,.009),cover,.006,rotation=(0,-3,-16))
    # Лист на просвет светлее и желтее, чем в отражении. Без пропускания
    # контровое солнце превращает листву в плотное зелёное пятно.
    green=mat('Soft ficus foliage',(.085,.150,.055),.42,transmission=.35,ior=1.42)
    # Ближе камеры и крупнее: на референсе растение — размытое зелёное пятно
    # в переднем углу, а не деталь на заднем плане. Прежние листья не попадали
    # в кадр вовсе: они стояли левее границы поля зрения.
    # Камера смещена вправо, поэтому левый край кадра на этой глубине проходит
    # около x=-0.3h: прежние листья на x=-0.9 оставались за границей поля зрения.
    for i,(x,y,z,a,t) in enumerate([(-.40,-1.70,.30,-28,.55),(-.52,-1.92,.86,16,.40),
                                    (-.33,-1.58,1.24,-22,.62),(-.60,-2.05,.52,33,.35),
                                    (-.44,-1.80,1.62,-9,.48)]):
        leaf=s.sphere('Ficus leaf '+str(i),(x,y,z),(.26,.016,.13),green)
        leaf.rotation_euler=(t,.30,math.radians(a))
    # Внешние импосты стоят за стеклом только ради теней: они дробят солнце на
    # полосы, как на референсе, и в кадр сами не попадают.
    for i,x in enumerate((-.35,1.35,2.9)):
        bar=s.box('Outer glazing bar '+str(i),(x,1.35,2.0),(.10,.10,5.0),frame,.01)
        bar.visible_camera=False
    sun(s,'Low afternoon sun',(-58,0,21),7.5,(1,.82,.60),.45)
    s.light('Sky through glass',(-2.2,2.6,3.2),(0,0,.5),7,(2.2,3.0),(.86,.92,1))
    s.light('Warm room bounce',(2.4,-2.6,1.5),(0,0,.5),2.2,(3.0,3.2),(1,.94,.84))


def sweep(s,name,points,radii,material):
    """Smooth ceramic sculpture: Catmull-Rom path, elliptical cross sections."""
    points=[Vector(p) for p in points]
    pts=[points[0]]+points+[points[-1]]
    samples=[]
    for i in range(1,len(pts)-2):
        a,b,c,d=pts[i-1:i+3]
        for j in range(20):
            t=j/20
            p=.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t)
            r=Vector(radii[i-1]).lerp(Vector(radii[i]),t)
            samples.append((p,r))
    samples.append((points[-1],Vector(radii[-1])))
    verts=[];faces=[];n=40
    for i,(p,r) in enumerate(samples):
        tangent=(samples[min(i+1,len(samples)-1)][0]-samples[max(i-1,0)][0]).normalized()
        side=tangent.cross(Vector((0,1,0))).normalized()
        up=tangent.cross(side).normalized()
        for j in range(n):
            a=j*math.tau/n
            verts.append((p+side*math.cos(a)*r.x+up*math.sin(a)*r.y)*s.h)
    for i in range(len(samples)-1):
        for j in range(n):
            a=i*n+j;b=i*n+(j+1)%n
            faces.append((a,b,b+n,a+n))
    faces.extend([tuple(reversed(range(n))),tuple((len(samples)-1)*n+j for j in range(n))])
    mesh=bpy.data.meshes.new(name);mesh.from_pydata(verts,[],faces);mesh.update()
    ob=bpy.data.objects.new('ENV_'+name,mesh);s.coll.objects.link(ob);mesh.materials.append(material)
    for f in mesh.polygons:f.use_smooth=True
    return ob


def cream(s,shot):
    floor=mat('Warm ivory stage',(.40,.30,.205),.44)
    greybox.cyclorama(s.h,.5*s.h,.4,s.coll)
    bpy.data.objects['BK_Cyclorama'].data.materials.clear()
    bpy.data.objects['BK_Cyclorama'].data.materials.append(floor)
    ceramic=mat('Satin ivory ceramic',(.66,.51,.345),.17)
    caramel=mat('Pale caramel ceramic',(.62,.49,.355),.20)
    # На референсе формы подходят вплотную и выходят за кадр: масса, а не
    # предметы на полке. Прежние были вдвое тоньше и стояли далеко за стаканом.
    # Складка поднимается раньше и проходит над стаканом, а не за ним. Стенка
    # PP просвечивает, и тёмная теневая грань, оказавшись прямо за изделием,
    # читалась как посторонний предмет внутри стакана.
    # Масса заполняет левую половину кадра и уходит вверх ещё до оси стакана:
    # так формы остаются крупными, как на референсе, а прямо за изделием
    # оказывается ровный участок фона. Стенка PP просвечивает, и любая тёмная
    # грань, попавшая за стакан, читается как предмет внутри него.
    sweep(s,'Broad cream fold',[(-2.5,.60,.28),(-1.62,.70,.55),(-.95,.86,1.08),(-.34,1.02,2.05),(.38,1.06,2.85),(.98,1.00,3.45)],[(.56,.70),(.60,.74),(.60,.76),(.58,.74),(.60,.76),(.58,.72)],ceramic)
    sweep(s,'Upper crossing fold',[(-2.4,1.35,2.05),(-1.1,1.25,2.35),(.25,1.20,2.55),(1.6,1.30,2.35)],[(.40,.52),(.46,.58),(.47,.58),(.40,.50)],caramel)
    sweep(s,'Low returning fold',[(-1.9,-.55,.02),(-1.15,-.66,.14),(-.88,-.52,.18),(-1.00,-.22,.13)],[(.20,.32),(.34,.42),(.32,.40),(.20,.28)],caramel)
    s.sphere('Right porcelain volume',(1.32,-.10,.52),(.66,.54,.92),ceramic)
    s.sphere('Right rear volume',(1.05,1.25,.42),(.50,.44,.70),caramel)
    # Ближняя к камере форма уходит в сильный расфокус и держит передний угол.
    s.sphere('Foreground cream boulder',(-1.25,-2.20,.28),(1.00,.88,.72),ceramic)
    micro_finish(floor,9000,.000025,.18)
    micro_finish(ceramic,14000,.000008,.12)
    # Узкий тёплый источник сверху-слева: он и лепит форму, и оставляет справа
    # длинный мягкий спад, из которого на референсе состоит половина кадра.
    s.light('Large upper left silk',(-2.6,-.5,3.1),(0,.2,.7),26,(.9,2.4),(1,.90,.74))
    s.light('Quiet front fill',(.1,-3.4,1.2),(0,0,.6),1.1,(2.6,2.8),(1,.97,.93))
    s.light('Sculpture edge',(1.9,1.5,2.6),(.3,.5,.7),5,(.6,2.2),(1,.86,.68))
    black=mat('Negative fill',(.008,.009,.009),.9)
    ob=s.box('Right negative fill',(2.1,.2,1.5),(.02,2.8,3.0),black,0)
    ob.visible_camera=False


def ice_material(s):
    m=mat('Clear melting ice',(.97,.99,1),.065,transmission=1,ior=1.31)
    nt=m.node_tree;p=nt.nodes.get('Principled BSDF')
    tex=nt.nodes.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=14/s.h
    tex.inputs['Detail'].default_value=2
    coord=nt.nodes.new('ShaderNodeTexCoord');nt.links.new(coord.outputs['Object'],tex.inputs['Vector'])
    bump=nt.nodes.new('ShaderNodeBump');bump.inputs['Distance'].default_value=.0004;bump.inputs['Strength'].default_value=.4
    nt.links.new(tex.outputs['Fac'],bump.inputs['Height']);nt.links.new(bump.outputs[0],p.inputs['Normal'])
    absorption=nt.nodes.new('ShaderNodeVolumeAbsorption');absorption.inputs['Color'].default_value=(.64,.85,.95,1);absorption.inputs['Density'].default_value=.6
    nt.links.new(absorption.outputs[0],nt.nodes.get('Material Output').inputs['Volume'])
    return m


def ice(s,shot):
    floor=mat('Dry cool mineral stage',(.003,.008,.016),.14)
    greybox.cyclorama(s.h,.5*s.h,.3,s.coll)
    bpy.data.objects['BK_Cyclorama'].data.materials.clear();bpy.data.objects['BK_Cyclorama'].data.materials.append(floor)
    micro_finish(floor,2800,.00022,.6)
    # Larger mineral variation complements submillimetre grain, visible at
    # product distance instead of reading as a uniformly blue plastic plane.
    nt=floor.node_tree;p=nt.nodes.get('Principled BSDF')
    coords=nt.nodes.new('ShaderNodeTexCoord');noise=nt.nodes.new('ShaderNodeTexNoise')
    noise.inputs['Scale'].default_value=170;noise.inputs['Detail'].default_value=4;noise.inputs['Roughness'].default_value=.75
    nt.links.new(coords.outputs['Object'],noise.inputs['Vector'])
    mix=nt.nodes.new('ShaderNodeMixRGB');mix.inputs[1].default_value=(.009,.018,.03,1);mix.inputs[2].default_value=(.035,.057,.08,1)
    nt.links.new(noise.outputs['Fac'],mix.inputs[0]);nt.links.new(mix.outputs[0],p.inputs['Base Color'])
    bump=nt.nodes.new('ShaderNodeBump');bump.inputs['Distance'].default_value=.00032;bump.inputs['Strength'].default_value=.55
    nt.links.new(p.inputs['Normal'].links[0].from_socket,bump.inputs['Normal'])
    nt.links.new(noise.outputs['Fac'],bump.inputs['Height']);nt.links.new(bump.outputs[0],p.inputs['Normal'])
    iced=ice_material(s)
    block=s.box('Main ice block',(-.66,.32,.405),(.80,.61,.81),iced,.045,rotation=(0,0,-16))
    # A few nonparallel cut faces, softened only on the ice prop.
    for v in block.data.vertices:
        if v.co.z>0:v.co.x+=.045*s.h;v.co.y+=.026*s.h
    block.data.update()
    melt_mesh(block,s.h)
    fragment=s.box('Detached ice fragment',(.56,-.36,.10),(.30,.25,.20),iced,.018,rotation=(0,0,22))
    for v in fragment.data.vertices:
        if v.co.z>0:
            v.co.x+=.075*s.h;v.co.y*=.35
    melt_mesh(fragment,s.h)
    water=mat('Thin melt water',(.98,.99,1),.045,transmission=1,ior=1.333)
    s.sphere('Melt beneath main ice',(-.69,.32,.002),(.51,.42,.002),water)
    s.sphere('Melt beneath fragment',(.56,-.36,.0015),(.23,.19,.0015),water)
    # Nested cloudy core has no reflective surface, only weak internal scatter.
    cloud=bpy.data.materials.new('ENV_Cloudy ice core');cloud.use_nodes=True
    nt=cloud.node_tree;nt.nodes.clear();out=nt.nodes.new('ShaderNodeOutputMaterial')
    scatter=nt.nodes.new('ShaderNodeVolumeScatter');scatter.inputs['Density'].default_value=4.5;scatter.inputs['Anisotropy'].default_value=.35
    nt.links.new(scatter.outputs[0],out.inputs['Volume'])
    # Мутность только намёком: на референсе куб прозрачный, искрится он
    # плоскостями раскола, а не молоком внутри.
    s.sphere('Soft cloudy core',(-.65,.35,.32),(.13,.09,.15),cloud)
    air=mat('Air inclusions', (1,1,1),.02,transmission=1,ior=1.0/1.31)
    rng=random.Random(7)
    for i in range(42):
        xyz=(-.67+rng.uniform(-.17,.17),.32+rng.uniform(-.13,.13),rng.uniform(.18,.65))
        r=rng.uniform(.003,.007)
        s.sphere('Air inclusion '+str(i),xyz,(r,r*.7,r*rng.uniform(2,5)),air)
    # Плоскости раскола — то, чем лёд на референсе искрится. Их больше, они
    # крупнее и разложены веером, а не стопкой.
    for i in range(18):
        chip=s.sphere('Internal air fissure '+str(i),
                      (-.68+rng.uniform(-.20,.20),.31+rng.uniform(-.13,.13),.16+rng.uniform(0,.52)),
                      (rng.uniform(.09,.17),.0012,rng.uniform(.06,.13)),air)
        chip.rotation_euler=tuple(rng.uniform(-1.1,1.1) for _ in range(3))
    for i in range(160):
        xyz=(-.67+rng.uniform(-.25,.25),.30+rng.uniform(-.18,.18),rng.uniform(.10,.73))
        r=rng.uniform(.0015,.0035)
        s.sphere('Fine trapped bubble '+str(i),xyz,(r,r,r*1.5),air)
    for ob in s.coll.objects:
        if ob.name.startswith('ENV_Melt beneath'):
            for v in ob.data.vertices:
                a=math.atan2(v.co.y,v.co.x);f=1+.07*math.sin(5*a)+.035*math.cos(9*a)
                v.co.x*=f;v.co.y*=f
    # Мокрый стол — половина ощущения холода на референсе. Капель втрое больше,
    # они крупнее и расходятся дальше, плюс широкая плёнка подтаявшей воды.
    film=s.sphere('Wet film',(-.25,.05,.0008),(1.55,1.15,.0008),water)
    for v in film.data.vertices:
        a=math.atan2(v.co.y,v.co.x);g=1+.06*math.sin(4*a+1.1)+.03*math.cos(7*a)
        v.co.x*=g;v.co.y*=g
    for i in range(120):
        x=rng.uniform(-1.55,1.35);y=rng.uniform(-.95,.85)
        if (x-.1)**2+y*y<.34**2:continue
        if -.98<x<-.24 and -.05<y<.62:continue
        # Крупнее и реже: мелкая частая россыпь читалась песком, а не каплями.
        r=rng.uniform(.011,.040)
        s.sphere('Melt bead '+str(i),(x,y,r*.24),(r,r*.84,r*.26),water)
    # Холодная дымка: без среды в воздухе луч не виден, а на референсе именно он
    # и держит кадр. Плотность низкая — это воздух, а не туман.
    haze=bpy.data.materials.new('ENV_Cold air haze');haze.use_nodes=True
    hn=haze.node_tree;hn.nodes.clear();hout=hn.nodes.new('ShaderNodeOutputMaterial')
    hs=hn.nodes.new('ShaderNodeVolumeScatter')
    hs.inputs['Density'].default_value=.17;hs.inputs['Anisotropy'].default_value=.62
    hs.inputs['Color'].default_value=(.84,.91,1,1)
    hn.links.new(hs.outputs[0],hout.inputs['Volume'])
    air_box=s.box('Cold air volume',(-.2,.9,1.6),(9.0,5.0,4.4),haze,0)
    air_box.visible_shadow=False
    # Косой луч и рейки, режущие его на полосы. Рейки в кадр не попадают.
    beam=bpy.data.lights.new('ENV_Cold window shaft','SPOT')
    beam.energy=190*(s.h/.1353)**2;beam.spot_size=math.radians(38);beam.spot_blend=.30
    beam.color=(.86,.93,1);beam.shadow_soft_size=.02*s.h
    shaft=bpy.data.objects.new(beam.name,beam);s.coll.objects.link(shaft)
    shaft.location=Vector((-3.1,2.4,4.3))*s.h
    greybox._aim(shaft,Vector((.7,.1,-.2))*s.h)
    slat=mat('Shaft slat',(.005,.006,.007),.9)
    for i,off in enumerate((-.95,-.30,.38,1.05)):
        bar=s.box('Shaft slat '+str(i),(-1.9+off*.55,1.75+off*.30,2.9),(.16,2.6,.9),slat,0,rotation=(0,0,-26))
        bar.visible_camera=False
    s.light('Cold broad rear light' ,(-1.7,1.4,2.3),(-.4,.2,.5),5,(.9,1.7),(.86,.94,1))
    s.light('Print softbox',(1.1,-2.7,2.7),(0,0,.55),5,(1.4,2.7),(1,.98,.95))
    s.light('Ice edge strip',(-2.4,-.6,1.4),(-.6,.3,.45),11,(.16,1.8),(.85,.93,1))
    flag=s.box('Ice negative fill',(-1.8,.15,1),(.02,1.3,2),mat('Ice flag',(.006,.008,.009),.9),0)
    flag.visible_camera=False


def build(cfg,shot_name,samples=None,resolution=None):
    place.WARNINGS.clear();shot=cfg['shots'][shot_name]
    builders={'urban':urban,'cream':cream,'ice':ice}
    if shot['environment'] not in builders:raise place.ConfigError('Unknown authored environment')
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene=bpy.context.scene;scene.name=shot_name.upper()
    stage=bpy.data.collections.new('ENV_Set');scene.collection.children.link(stage)
    cups=bpy.data.collections.new('BK_Cup');scene.collection.children.link(cups)
    from bk import group
    many=group.load(cfg,shot,cups);group.check_count(shot_name,shot,len(many))
    cup,h,printed=many[0]['obj'],many[0]['height'],many[0]['printed']
    # Декорации, свет и камера строятся по эталонному стакану: лёд и камень
    # одного размера для любого объёма. К стакану другого роста камера потом
    # подъезжает (place.fit_camera). Для эталона href == h — кадр прежний.
    href=place.reference_height(cfg,h)
    cup.rotation_euler=tuple(math.radians(v) for v in shot['cup_rotation_deg'])
    bpy.context.view_layer.update()
    low=min((cup.matrix_world@Vector(v)).z for v in cup.bound_box)
    cup.location=Vector(shot['cup_position_h'])*href-Vector((0,0,low))
    s=Stage(href,stage);builders[shot['environment']](s,shot)
    world=bpy.data.worlds.new('ENV_Ambient');world.use_nodes=True;scene.world=world
    world.node_tree.nodes['Background'].inputs['Color'].default_value=(*shot.get('world_color',[.88,.93,1]),1)
    world.node_tree.nodes['Background'].inputs['Strength'].default_value=shot.get('world_strength',.12)
    c=shot['camera'];data=bpy.data.cameras.new('ENV_CAMERA');cam=bpy.data.objects.new(data.name,data);stage.objects.link(cam)
    cam.location=Vector(c['position_h'])*href;target=Vector(c['target_h'])*href
    greybox._aim(cam,target);data.lens=c['lens_mm'];data.sensor_width=36
    data.clip_start=.001;data.clip_end=100
    fit=1.0;pair=None;comp=None
    from bk import compose
    if compose.fit_mode(cfg)=='crop':
        # кадр вырезом из кадра по эталону (bk/compose.py): превью совпадает с рендером
        data.dof.use_dof=True;data.dof.aperture_fstop=c.get('fstop',8)
        data.dof.focus_distance=(cam.location-(cup.location+Vector((0,0,href*.52)))).length
        scene.camera=cam
        side=shot.get('resolution',1400);scene.render.resolution_x=side;scene.render.resolution_y=side
        bpy.context.view_layer.update()
        low=min((cup.matrix_world@Vector(v)).z for v in cup.bound_box)
        comp=compose.run(scene,cam,many,cfg,shot,shot_name,dict(
            origin=Vector((cup.location.x,cup.location.y,low)),scale=1.0,holder=cup,
            rotation_deg=shot['cup_rotation_deg'],href=href,focus='centre'))
        pair=comp['group']
    elif shot.get('camera_fit',True):
        bpy.context.view_layer.update()
        fit=place.fit_camera(cam,cup.location+Vector((0,0,h*.5)),h/href)
    if comp is None:
        data.dof.use_dof=True;data.dof.aperture_fstop=c.get('fstop',8)
        data.dof.focus_distance=(cam.location-(cup.location+Vector((0,0,h*.52)))).length
    scene.camera=cam
    if comp is None and len(many)>1:
        bpy.context.view_layer.update()
        low=min((cup.matrix_world@Vector(v)).z for v in cup.bound_box)
        pair=group.place_second(scene,cam,many,cfg.get('_layout') or 'pair',1.0,
                                hero_base=Vector((cup.location.x,cup.location.y,low)),
                                rotation_deg=shot['cup_rotation_deg'],coll=cups,hero_holder=cup)
    if comp is None:
        side=shot.get('resolution',1400);scene.render.resolution_x=side;scene.render.resolution_y=side
    scene.unit_settings.system='METRIC';scene.unit_settings.scale_length=1
    place.configure_render(cfg,scene,samples or shot.get('samples',256),resolution or side)
    color=place.apply_color(cfg,shot,scene)
    bpy.context.view_layer.update()
    face=place.face_pixel(scene,cam,cup,cup.location.z+h*.45)
    return dict(cup=place.resolve_cup(cfg).get('key','500'),shot=shot_name,scene=scene.name,camera=cam.name,
                removed=[],hidden_from_camera=[],dropped_scenes=[],purged=0,cup_height_mm=h*1000,
                hero_height_mm=h*1000,hero_rotation_deg=shot['cup_rotation_deg'],scale=1.0,
                placed_at=list(cup.location),retuned=[],print=printed,engine=scene.render.engine,
                samples=scene.cycles.samples,resolution=[scene.render.resolution_x,scene.render.resolution_y],
                view_transform=scene.view_settings.view_transform,look=scene.view_settings.look,
                warnings=list(place.WARNINGS),environment_settings=shot,
                camera_fit=fit,scale_reference_mm=round(href*1000,2),color=color,face_px=face,
                cups=place.cups_report(many),group=pair,compose=comp)
