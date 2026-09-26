bl_info = {'name': 'Cups — PDF / JPG Mockup', 'author': 'Cups Studio', 'version': (0, 4, 0), 'blender': (4, 2, 0),
           'location': '3D View > N > Cups', 'description': 'Paper cups HB80-280 / DW80-280: clean geometry, template registration, GLB for cup-viewer',
           'category': 'Material'}

import bpy
from bpy.props import BoolProperty, EnumProperty, FloatProperty, IntProperty, PointerProperty, StringProperty
from bpy_extras.io_utils import ExportHelper, ImportHelper

from . import engine, materials, paper

_MODEL_ITEMS = []


def model_items(self, context):
    # Keep a module-level reference: Blender does not copy dynamic enum items.
    global _MODEL_ITEMS
    _MODEL_ITEMS = paper.list_models()
    return _MODEL_ITEMS

VIEWS = [('CUPS_Hero', 'Каталог 8°', 'Как в студии пластика'),
         ('CUPS_Print', 'Печать 2°', 'Почти фронтально'),
         ('CUPS_Seam_macro', 'Шов — крупно', ''),
         ('CUPS_Rim_macro', 'Венчик у шва', ''),
         ('CUPS_Bottom_macro', 'Пятка у шва', ''),
         ('CUPS_Underside', 'Дно снаружи', ''),
         ('CUPS_Interior', 'Внутри', ''),
         ('CUPS_Sleeve_macro', 'Подворот обечайки DW', '')]


def update_uv(self, context):
    engine.update_uv(context.scene)


def update_emboss_depth(self, context):
    if engine.product() is not None:
        try:
            engine.import_emboss(context.scene, self.emboss_source or None)
        except Exception:
            pass


def update_rotation(self, context):
    root = engine.product()
    if root:
        root.rotation_euler.z = self.rotation


def update_art_visibility(self, context):
    materials.set_artwork_visible(self.show_artwork)


def update_inspection(self, context):
    engine.apply_view(context.scene)


class CupsSettings(bpy.types.PropertyGroup):
    model: EnumProperty(name='Стакан', items=model_items)
    mapping: EnumProperty(name='Формат дизайна', items=[('A4', 'Развёртка на вашем A4', 'Полный горизонтальный лист, без обрезки полей'),
                                                        ('RECT', 'Прямоугольник на всю стенку', 'Картинка охватывает 360 градусов видимой стенки')],
                          default='A4', update=update_uv)
    offset_x: FloatProperty(name='Сдвиг по листу X, мм', default=0, soft_min=-30, soft_max=30, update=update_uv)
    offset_y: FloatProperty(name='Сдвиг по листу Y, мм', default=0, soft_min=-30, soft_max=30, update=update_uv)
    scale: FloatProperty(name='Масштаб привязки', default=1, min=.1, max=10, update=update_uv)
    rotation: FloatProperty(name='Поворот стакана', subtype='ANGLE', default=0, update=update_rotation)
    page: IntProperty(name='Страница PDF', default=1, min=1)
    dpi: IntProperty(name='PDF, dpi', default=300, min=72, max=600)
    hide_guides: BoolProperty(name='Скрыть слои Masks / Info / setka', default=True,
                              description='Только отдельные PDF-слои с этими именами. Линии в JPG и сведённом PDF остаются')
    python_path: StringProperty(name='Python для PDF', subtype='FILE_PATH', default=engine.find_python())
    source: StringProperty(name='Дизайн', subtype='FILE_PATH')
    show_artwork: BoolProperty(name='Показать печать', default=True, update=update_art_visibility)
    inspection_view: EnumProperty(name='Ракурс', items=VIEWS, default='CUPS_Hero', update=update_inspection)
    emboss_source: StringProperty(name='Конгрев', subtype='FILE_PATH')
    emboss_depth: FloatProperty(name='Глубина конгрева, мм', default=0.35, min=0.0, soft_max=1.5,
                                description='На сколько миллиметров белое на листе выдавливается наружу',
                                update=update_emboss_depth)
    status: StringProperty(default='Создайте стакан, затем загрузите дизайн.')


class CUPS_OT_build(bpy.types.Operator):
    bl_idname = 'cups.build'
    bl_label = 'Создать / обновить стакан'
    bl_options = {'REGISTER', 'UNDO'}

    def execute(self, context):
        engine.build_cup(context.scene)
        context.scene.cups.status = 'Стакан создан: ' + context.scene.cups.model
        return {'FINISHED'}


class CUPS_OT_import(bpy.types.Operator, ImportHelper):
    bl_idname = 'cups.import_art'
    bl_label = 'Загрузить PDF / JPG / PNG'
    filename_ext = ''
    filter_glob: StringProperty(default='*.pdf;*.jpg;*.jpeg;*.png;*.tif;*.tiff', options={'HIDDEN'})

    def execute(self, context):
        try:
            engine.import_art(context.scene, self.filepath)
        except Exception as exc:
            self.report({'ERROR'}, str(exc))
            return {'CANCELLED'}
        self.report({'INFO'}, 'Дизайн загружен и упакован в .blend')
        return {'FINISHED'}


class CUPS_OT_import_emboss(bpy.types.Operator, ImportHelper):
    bl_idname = 'cups.import_emboss'
    bl_label = 'Загрузить конгрев (Ч/Б)'
    filename_ext = ''
    filter_glob: StringProperty(default='*.pdf;*.jpg;*.jpeg;*.png;*.tif;*.tiff', options={'HIDDEN'})

    def execute(self, context):
        try:
            engine.import_emboss(context.scene, self.filepath)
        except Exception as exc:
            self.report({'ERROR'}, str(exc))
            return {'CANCELLED'}
        self.report({'INFO'}, 'Конгрев загружен: белое выдавлено наружу')
        return {'FINISHED'}


class CUPS_OT_clear_emboss(bpy.types.Operator):
    bl_idname = 'cups.clear_emboss'
    bl_label = 'Убрать конгрев'
    bl_options = {'REGISTER', 'UNDO'}

    def execute(self, context):
        engine.import_emboss(context.scene, None)
        self.report({'INFO'}, 'Остался только обжим дна')
        return {'FINISHED'}


class CUPS_OT_studio(bpy.types.Operator):
    bl_idname = 'cups.studio'
    bl_label = 'Студия и камеры'
    bl_options = {'REGISTER', 'UNDO'}

    def execute(self, context):
        engine.setup_studio(context.scene)
        return {'FINISHED'}


class CUPS_OT_export_glb(bpy.types.Operator, ExportHelper):
    bl_idname = 'cups.export_glb'
    bl_label = 'Сохранить GLB'
    filename_ext = '.glb'
    filter_glob: StringProperty(default='*.glb', options={'HIDDEN'})

    def execute(self, context):
        from . import gltf_export
        try:
            path = gltf_export.export(context.scene, self.filepath)
        except Exception as exc:
            self.report({'ERROR'}, str(exc))
            return {'CANCELLED'}
        context.scene.cups.status = 'Сохранён GLB: ' + engine.Path(path).name
        self.report({'INFO'}, 'GLB сохранён: материалы Paper_Print / Paper_Inner / Paper_Edge')
        return {'FINISHED'}


class CUPS_OT_reset(bpy.types.Operator):
    bl_idname = 'cups.reset'
    bl_label = 'Сбросить привязку'
    bl_options = {'REGISTER', 'UNDO'}

    def execute(self, context):
        s = context.scene.cups
        s.offset_x = 0
        s.offset_y = 0
        s.scale = 1
        return {'FINISHED'}


class CUPS_PT_panel(bpy.types.Panel):
    bl_label = 'Cups · мокап стакана'
    bl_idname = 'CUPS_PT_panel'
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Cups'

    def draw(self, context):
        lay = self.layout
        s = context.scene.cups
        lay.prop(s, 'model')
        lay.operator('cups.build', icon='MESH_CYLINDER')
        root = engine.product()
        if root and (root.get('model') != s.model or root.get('geometry_version') != '4.0'):
            lay.label(text='Нажмите «Создать / обновить»', icon='ERROR')
        lay.separator()
        lay.prop(s, 'mapping')
        lay.operator('cups.import_art', icon='FILE_IMAGE')
        lay.prop(s, 'show_artwork')
        box = lay.box()
        box.label(text='Конгрев (тиснение)')
        wrap = bpy.data.objects.get('Cup_Wrap')
        if wrap is not None and 'relief_quads' in wrap:
            box.label(text='Вафля EM уже выдавлена в сетке;', icon='INFO')
            box.label(text='сюда — только дополнительный конгрев')
        box.prop(s, 'emboss_depth')
        box.operator('cups.import_emboss', icon='MOD_DISPLACE')
        box.operator('cups.clear_emboss')
        lay.prop(s, 'rotation')
        lay.prop(s, 'inspection_view')
        lay.operator('cups.export_glb', icon='EXPORT')
        box = lay.box()
        box.label(text='Привязка развёртки к листу')
        box.prop(s, 'offset_x')
        box.prop(s, 'offset_y')
        box.prop(s, 'scale')
        box.operator('cups.reset')
        box = lay.box()
        box.label(text='PDF')
        box.prop(s, 'page')
        box.prop(s, 'dpi')
        box.prop(s, 'hide_guides')
        box.prop(s, 'python_path')
        lay.separator()
        lay.operator('cups.studio', icon='LIGHT_AREA')
        lay.label(text='Рендер: F12 · Сохранить: Ctrl+S')
        if s.source:
            lay.label(text=engine.Path(s.source).name)
        lay.label(text=s.status)


CLASSES = [CupsSettings, CUPS_OT_build, CUPS_OT_import, CUPS_OT_import_emboss, CUPS_OT_clear_emboss, CUPS_OT_studio, CUPS_OT_export_glb, CUPS_OT_reset, CUPS_PT_panel]


def register():
    for cls in CLASSES:
        bpy.utils.register_class(cls)
    bpy.types.Scene.cups = PointerProperty(type=CupsSettings)


def unregister():
    del bpy.types.Scene.cups
    for cls in reversed(CLASSES):
        bpy.utils.unregister_class(cls)


if __name__ == '__main__':
    register()
