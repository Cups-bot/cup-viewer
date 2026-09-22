/* cup-viewer — собрано npm run build. Исходники в js/, править нужно там. */
var ru=s=>{throw TypeError(s)};var qm=(s,e,t)=>e.has(s)||ru("Cannot "+t);var an=(s,e,t)=>e.has(s)?ru("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t);var V=(s,e,t)=>(qm(s,e,"access private method"),t);var qi=Object.freeze({assets:{hdri:"assets/hdri/main.hdr",dracoDecoder:"vendor/draco/"},texture:{maxSize:2048},order:{endpoint:null},security:{urlOverrides:"localhost",allowedAssetPrefixes:["assets/","/upload/"],debugApi:"localhost"},renderer:{antialias:!0,preserveDrawingBuffer:!0,alpha:!0,maxPixelRatio:2,toneMapping:"none",toneMappingExposure:1,shadows:!0},camera:{fov:32,position:{x:0,y:.4,z:1.2}},controls:{enableDamping:!0,dampingFactor:.08,minDistance:.4,maxDistance:3,maxPolarAngle:Math.PI,enablePan:!0},autoRotate:{enabled:!0,speed:.45},quality:{postProcessing:!0,msaaSamples:4,ambientOcclusion:{enabled:!0,intensity:1,radius:.07,thickness:.3,scale:1.35,samples:32}},lighting:{environment:"studio",environmentIntensity:.5,keyLight:{enabled:!0,distance:2.2,intensityScale:.2,useColor:!0},shadow:{mapSize:1024,near:.4,far:6,frustum:1.6,bias:0,normalBias:.0015,radius:4}},shadowCatcher:{enabled:!0,size:3,opacity:.32,tint:"#0a1526",falloffStart:.16,falloffEnd:.95},ambientShadow:{enabled:!0,size:1.7,resolution:512,height:.13,darkness:2.2,falloff:2.4,blur:2.6,opacity:.85},studioShading:{ambientOcclusion:{intensity:.7,radius:.045,scale:1.15},shadowOpacity:.6,shadowRadius:4,shadowPenumbra:{near:3,far:40},shadowNormalBias:.008,shadowFalloff:{start:.12,end:.95},contact:{height:.07,darkness:1.6,blur:.6,opacity:.78,falloff:2.2,nearestSurface:!0,resolution:1024}},model:{targetSize:.5,cameraFitOffset:1.6,cameraAim:-.015},turntable:{enabled:!0,radiusScale:1,lift:.012},backgrounds:["#eaf5ff","#ffffff","#777777","#1c1c1e"],backgroundSweep:.07,turnExport:{duration:12,fps:30,bitrate:8e6,photoStep:45,name:"cup-360"},ui:{toastDuration:2500,screenshotName:"cup-viewer.png",screenshotShare:"auto",dragAndDrop:!0,uploadButton:!0,photoScene:!0,modelPicker:!0}});var ss={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},rs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ym=0,ou=1,Zm=2;var oa=1,Km=2,li=3,Ln=0,dn=1,wn=2;var Vt=0,Ds=1,au=2,cu=3,lu=4,ml=5,Pn=100,$m=101,jm=102,hu=103,uu=104,Ks=200,Jm=201,Qm=202,eg=203,Nc=204,Oc=205,aa=206,tg=207,ca=208,ng=209,ig=210,sg=211,rg=212,og=213,ag=214,cg=0,lg=1,hg=2,Po=3,ug=4,dg=5,fg=6,pg=7,Zd=0,mg=1,gg=2,Zn=0,Ur=1,gl=2,vl=3,$s=4,vg=5,os=6,du="attached",_g="detached",Kd=300,Os=301,Fs=302,Fc=303,Bc=304,la=306,Gt=1e3,Ot=1001,_r=1002,It=1003,Lo=1004;var fr=1005;var bt=1006,_l=1007;var Vn=1008;var Kn=1009,xg=1010,yg=1011,xl=1012,$d=1013,Ai=1014,nn=1015,Dt=1016,jd=1017,Jd=1018,di=1020,Mg=1021,hn=1023,Sg=1024,Eg=1025,Qi=1026,Ci=1027,yl=1028,Qd=1029,wg=1030,ef=1031,tf=1033,nc=33776,ic=33777,sc=33778,rc=33779,fu=35840,pu=35841,mu=35842,gu=35843,nf=36196,vu=37492,_u=37496,xu=37808,yu=37809,Mu=37810,Su=37811,Eu=37812,wu=37813,bu=37814,Tu=37815,Au=37816,Ru=37817,Cu=37818,Pu=37819,Lu=37820,Iu=37821,oc=36492,Du=36494,Uu=36495,bg=36283,Nu=36284,Ou=36285,Fu=36286;var Bs=2300,ts=2301,ac=2302,Bu=2400,zu=2401,ku=2402,Tg=2500;var sf=0,ha=1,Nr=2,rf=3e3,es=3001,Ag=3200,Rg=3201,Ml=0,Cg=1,un="",ht="srgb",Tt="srgb-linear",Sl="display-p3",ua="display-p3-linear",Io="linear",St="srgb",Do="rec709",Uo="p3";var fs=7680;var Hu=519,Pg=512,Lg=513,Ig=514,of=515,Dg=516,Ug=517,Ng=518,Og=519,zc=35044;var Vu="300 es",kc=1035,ui=2e3,No=2001,$n=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gu=1234567,pr=Math.PI/180,zs=180/Math.PI;function Hn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(cn[s&255]+cn[s>>8&255]+cn[s>>16&255]+cn[s>>24&255]+"-"+cn[e&255]+cn[e>>8&255]+"-"+cn[e>>16&15|64]+cn[e>>24&255]+"-"+cn[t&63|128]+cn[t>>8&255]+"-"+cn[t>>16&255]+cn[t>>24&255]+cn[n&255]+cn[n>>8&255]+cn[n>>16&255]+cn[n>>24&255]).toLowerCase()}function Jt(s,e,t){return Math.max(e,Math.min(t,s))}function El(s,e){return(s%e+e)%e}function Fg(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Bg(s,e,t){return s!==e?(t-s)/(e-s):0}function mr(s,e,t){return(1-t)*s+t*e}function zg(s,e,t,n){return mr(s,e,1-Math.exp(-t*n))}function kg(s,e=1){return e-Math.abs(El(s,e*2)-e)}function Hg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Vg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Gg(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Wg(s,e){return s+Math.random()*(e-s)}function Xg(s){return s*(.5-Math.random())}function qg(s){s!==void 0&&(Gu=s);let e=Gu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Yg(s){return s*pr}function Zg(s){return s*zs}function Hc(s){return(s&s-1)===0&&s!==0}function Kg(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Oo(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function $g(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,c*u,c*d,a*l);break;case"YZY":s.set(c*d,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*d,a*h,a*l);break;case"XZX":s.set(a*h,c*g,c*p,a*l);break;case"YXY":s.set(c*p,a*h,c*g,a*l);break;case"ZYZ":s.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Yn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function yt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Kt={DEG2RAD:pr,RAD2DEG:zs,generateUUID:Hn,clamp:Jt,euclideanModulo:El,mapLinear:Fg,inverseLerp:Bg,lerp:mr,damp:zg,pingpong:kg,smoothstep:Hg,smootherstep:Vg,randInt:Gg,randFloat:Wg,randFloatSpread:Xg,seededRandom:qg,degToRad:Yg,radToDeg:Zg,isPowerOfTwo:Hc,ceilPowerOfTwo:Kg,floorPowerOfTwo:Oo,setQuaternionFromProperEuler:$g,normalize:yt,denormalize:Yn},Re=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Jt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},rt=class s{constructor(e,t,n,i,r,o,a,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l)}set(e,t,n,i,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],_=i[0],m=i[3],f=i[6],S=i[1],y=i[4],R=i[7],F=i[2],L=i[5],P=i[8];return r[0]=o*_+a*S+c*F,r[3]=o*m+a*y+c*L,r[6]=o*f+a*R+c*P,r[1]=l*_+h*S+u*F,r[4]=l*m+h*y+u*L,r[7]=l*f+h*R+u*P,r[2]=d*_+p*S+g*F,r[5]=d*m+p*y+g*L,r[8]=d*f+p*R+g*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,p=l*r-o*c,g=t*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*r-a*t)*_,e[6]=p*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(cc.makeScale(e,t)),this}rotate(e){return this.premultiply(cc.makeRotation(-e)),this}translate(e,t){return this.premultiply(cc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},cc=new rt;function af(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function xr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function jg(){let s=xr("canvas");return s.style.display="block",s}var Wu={};function gr(s){s in Wu||(Wu[s]=!0,console.warn(s))}var Xu=new rt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),qu=new rt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),to={[Tt]:{transfer:Io,primaries:Do,toReference:s=>s,fromReference:s=>s},[ht]:{transfer:St,primaries:Do,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[ua]:{transfer:Io,primaries:Uo,toReference:s=>s.applyMatrix3(qu),fromReference:s=>s.applyMatrix3(Xu)},[Sl]:{transfer:St,primaries:Uo,toReference:s=>s.convertSRGBToLinear().applyMatrix3(qu),fromReference:s=>s.applyMatrix3(Xu).convertLinearToSRGB()}},Jg=new Set([Tt,ua]),ft={enabled:!0,_workingColorSpace:Tt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Jg.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;let n=to[e].toReference,i=to[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return to[s].primaries},getTransfer:function(s){return s===un?Io:to[s].transfer}};function Us(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function lc(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var ps,Fo=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ps===void 0&&(ps=xr("canvas")),ps.width=e.width,ps.height=e.height;let n=ps.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ps}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=xr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Us(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Us(t[n]/255)*255):t[n]=Us(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Qg=0,Bo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qg++}),this.uuid=Hn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(hc(i[o].image)):r.push(hc(i[o]))}else r=hc(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function hc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Fo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var e0=0,Wt=class s extends $n{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Ot,i=Ot,r=bt,o=Vn,a=hn,c=Kn,l=s.DEFAULT_ANISOTROPY,h=un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:e0++}),this.uuid=Hn(),this.name="",this.source=new Bo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Re(0,0),this.repeat=new Re(1,1),this.center=new Re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(gr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===es?ht:un),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Kd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gt:e.x=e.x-Math.floor(e.x);break;case Ot:e.x=e.x<0?0:1;break;case _r:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gt:e.y=e.y-Math.floor(e.y);break;case Ot:e.y=e.y<0?0:1;break;case _r:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return gr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ht?es:rf}set encoding(e){gr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===es?ht:un}};Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=Kd;Wt.DEFAULT_ANISOTROPY=1;var Et=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,R=(p+1)/2,F=(f+1)/2,L=(h+d)/4,P=(u+_)/4,k=(g+m)/4;return y>R&&y>F?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=L/n,r=P/n):R>F?R<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(R),n=L/i,r=k/i):F<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(F),n=P/r,i=k/r),this.set(n,i,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-_)/S,this.z=(d-h)/S,this.w=Math.acos((l+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Vc=class extends $n{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Et(0,0,e,t),this.scissorTest=!1,this.viewport=new Et(0,0,e,t);let i={width:e,height:t,depth:1};n.encoding!==void 0&&(gr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===es?ht:un),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Wt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Bo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xt=class extends Vc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},zo=class extends Wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=It,this.minFilter=It,this.wrapR=Ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Gc=class extends Wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=It,this.minFilter=It,this.wrapR=Ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var _n=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==p||h!==g){let m=1-a,f=c*d+l*p+h*g+u*_,S=f>=0?1:-1,y=1-f*f;if(y>Number.EPSILON){let F=Math.sqrt(y),L=Math.atan2(F,f*S);m=Math.sin(m*L)/F,a=Math.sin(a*L)/F}let R=a*S;if(c=c*m+d*R,l=l*m+p*R,h=h*m+g*R,u=u*m+_*R,m===1-a){let F=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=F,l*=F,h*=F,u*=F}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*p-l*d,e[t+1]=c*g+h*d+l*u-a*p,e[t+2]=l*g+h*p+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(r/2),d=c(n/2),p=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-i)*p}else if(n>a&&n>u){let p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(r+l)/p}else if(a>u){let p=2*Math.sqrt(1+a-n-u);this._w=(r-l)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-n-a);this._w=(o-i)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Jt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=i+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return uc.copy(this).projectOnVector(e),this.sub(uc)}reflect(e){return this.sub(uc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Jt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},uc=new B,Yu=new _n,sn=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Bn):Bn.fromBufferAttribute(r,o),Bn.applyMatrix4(e.matrixWorld),this.expandByPoint(Bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),no.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),no.copy(n.boundingBox)),no.applyMatrix4(e.matrixWorld),this.union(no)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Bn),Bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(or),io.subVectors(this.max,or),ms.subVectors(e.a,or),gs.subVectors(e.b,or),vs.subVectors(e.c,or),Si.subVectors(gs,ms),Ei.subVectors(vs,gs),Yi.subVectors(ms,vs);let t=[0,-Si.z,Si.y,0,-Ei.z,Ei.y,0,-Yi.z,Yi.y,Si.z,0,-Si.x,Ei.z,0,-Ei.x,Yi.z,0,-Yi.x,-Si.y,Si.x,0,-Ei.y,Ei.x,0,-Yi.y,Yi.x,0];return!dc(t,ms,gs,vs,io)||(t=[1,0,0,0,1,0,0,0,1],!dc(t,ms,gs,vs,io))?!1:(so.crossVectors(Si,Ei),t=[so.x,so.y,so.z],dc(t,ms,gs,vs,io))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},ii=[new B,new B,new B,new B,new B,new B,new B,new B],Bn=new B,no=new sn,ms=new B,gs=new B,vs=new B,Si=new B,Ei=new B,Yi=new B,or=new B,io=new B,so=new B,Zi=new B;function dc(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Zi.fromArray(s,r);let a=i.x*Math.abs(Zi.x)+i.y*Math.abs(Zi.y)+i.z*Math.abs(Zi.z),c=e.dot(Zi),l=t.dot(Zi),h=n.dot(Zi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var t0=new sn,ar=new B,fc=new B,bn=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):t0.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ar.subVectors(e,this.center);let t=ar.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ar,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ar.copy(e.center).add(fc)),this.expandByPoint(ar.copy(e.center).sub(fc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},si=new B,pc=new B,ro=new B,wi=new B,mc=new B,oo=new B,gc=new B,fi=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,si)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=si.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(si.copy(this.origin).addScaledVector(this.direction,t),si.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){pc.copy(e).add(t).multiplyScalar(.5),ro.copy(t).sub(e).normalize(),wi.copy(this.origin).sub(pc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(ro),a=wi.dot(this.direction),c=-wi.dot(ro),l=wi.lengthSq(),h=Math.abs(1-o*o),u,d,p,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(pc).addScaledVector(ro,d),p}intersectSphere(e,t){si.subVectors(e.center,this.origin);let n=si.dot(this.direction),i=si.dot(si)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,si)!==null}intersectTriangle(e,t,n,i,r){mc.subVectors(t,e),oo.subVectors(n,e),gc.crossVectors(mc,oo);let o=this.direction.dot(gc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;wi.subVectors(this.origin,e);let c=a*this.direction.dot(oo.crossVectors(wi,oo));if(c<0)return null;let l=a*this.direction.dot(mc.cross(wi));if(l<0||c+l>o)return null;let h=-a*wi.dot(gc);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},$e=class s{constructor(e,t,n,i,r,o,a,c,l,h,u,d,p,g,_,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l,h,u,d,p,g,_,m)}set(e,t,n,i,r,o,a,c,l,h,u,d,p,g,_,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=i,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/_s.setFromMatrixColumn(e,0).length(),r=1/_s.setFromMatrixColumn(e,1).length(),o=1/_s.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,p=c*u,g=l*h,_=l*u;t[0]=d+_*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,p=c*u,g=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-p,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+g,t[10]=d-_*u}else if(e.order==="XZY"){let d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(n0,e,i0)}lookAt(e,t,n){let i=this.elements;return Mn.subVectors(e,t),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),bi.crossVectors(n,Mn),bi.lengthSq()===0&&(Math.abs(n.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),bi.crossVectors(n,Mn)),bi.normalize(),ao.crossVectors(Mn,bi),i[0]=bi.x,i[4]=ao.x,i[8]=Mn.x,i[1]=bi.y,i[5]=ao.y,i[9]=Mn.y,i[2]=bi.z,i[6]=ao.z,i[10]=Mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],S=n[3],y=n[7],R=n[11],F=n[15],L=i[0],P=i[4],k=i[8],M=i[12],b=i[1],H=i[5],X=i[9],ie=i[13],D=i[2],G=i[6],W=i[10],te=i[14],ne=i[3],J=i[7],ee=i[11],oe=i[15];return r[0]=o*L+a*b+c*D+l*ne,r[4]=o*P+a*H+c*G+l*J,r[8]=o*k+a*X+c*W+l*ee,r[12]=o*M+a*ie+c*te+l*oe,r[1]=h*L+u*b+d*D+p*ne,r[5]=h*P+u*H+d*G+p*J,r[9]=h*k+u*X+d*W+p*ee,r[13]=h*M+u*ie+d*te+p*oe,r[2]=g*L+_*b+m*D+f*ne,r[6]=g*P+_*H+m*G+f*J,r[10]=g*k+_*X+m*W+f*ee,r[14]=g*M+_*ie+m*te+f*oe,r[3]=S*L+y*b+R*D+F*ne,r[7]=S*P+y*H+R*G+F*J,r[11]=S*k+y*X+R*W+F*ee,r[15]=S*M+y*ie+R*te+F*oe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+r*c*u-i*l*u-r*a*d+n*l*d+i*a*p-n*c*p)+_*(+t*c*p-t*l*d+r*o*d-i*o*p+i*l*h-r*c*h)+m*(+t*l*u-t*a*p-r*o*u+n*o*p+r*a*h-n*l*h)+f*(-i*a*h-t*c*u+t*a*d+i*o*u-n*o*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],S=u*m*l-_*d*l+_*c*p-a*m*p-u*c*f+a*d*f,y=g*d*l-h*m*l-g*c*p+o*m*p+h*c*f-o*d*f,R=h*_*l-g*u*l+g*a*p-o*_*p-h*a*f+o*u*f,F=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,L=t*S+n*y+i*R+r*F;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/L;return e[0]=S*P,e[1]=(_*d*r-u*m*r-_*i*p+n*m*p+u*i*f-n*d*f)*P,e[2]=(a*m*r-_*c*r+_*i*l-n*m*l-a*i*f+n*c*f)*P,e[3]=(u*c*r-a*d*r-u*i*l+n*d*l+a*i*p-n*c*p)*P,e[4]=y*P,e[5]=(h*m*r-g*d*r+g*i*p-t*m*p-h*i*f+t*d*f)*P,e[6]=(g*c*r-o*m*r-g*i*l+t*m*l+o*i*f-t*c*f)*P,e[7]=(o*d*r-h*c*r+h*i*l-t*d*l-o*i*p+t*c*p)*P,e[8]=R*P,e[9]=(g*u*r-h*_*r-g*n*p+t*_*p+h*n*f-t*u*f)*P,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*f+t*a*f)*P,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*p-t*a*p)*P,e[12]=F*P,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*P,e[14]=(g*a*i-o*_*i-g*n*c+t*_*c+o*n*m-t*a*m)*P,e[15]=(o*u*i-h*a*i+h*n*c-t*u*c-o*n*d+t*a*d)*P,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,p=r*h,g=r*u,_=o*h,m=o*u,f=a*u,S=c*l,y=c*h,R=c*u,F=n.x,L=n.y,P=n.z;return i[0]=(1-(_+f))*F,i[1]=(p+R)*F,i[2]=(g-y)*F,i[3]=0,i[4]=(p-R)*L,i[5]=(1-(d+f))*L,i[6]=(m+S)*L,i[7]=0,i[8]=(g+y)*P,i[9]=(m-S)*P,i[10]=(1-(d+_))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=_s.set(i[0],i[1],i[2]).length(),o=_s.set(i[4],i[5],i[6]).length(),a=_s.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],zn.copy(this);let l=1/r,h=1/o,u=1/a;return zn.elements[0]*=l,zn.elements[1]*=l,zn.elements[2]*=l,zn.elements[4]*=h,zn.elements[5]*=h,zn.elements[6]*=h,zn.elements[8]*=u,zn.elements[9]*=u,zn.elements[10]*=u,t.setFromRotationMatrix(zn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=ui){let c=this.elements,l=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i),p,g;if(a===ui)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===No)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=ui){let c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*l,p=(n+i)*h,g,_;if(a===ui)g=(o+r)*u,_=-2*u;else if(a===No)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},_s=new B,zn=new $e,n0=new B(0,0,0),i0=new B(1,1,1),bi=new B,ao=new B,Mn=new B,Zu=new $e,Ku=new _n,ko=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(Jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Jt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Jt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Jt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Zu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ku.setFromEuler(this),this.setFromQuaternion(Ku,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ko.DEFAULT_ORDER="XYZ";var yr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},s0=0,$u=new B,xs=new _n,ri=new $e,co=new B,cr=new B,r0=new B,o0=new _n,ju=new B(1,0,0),Ju=new B(0,1,0),Qu=new B(0,0,1),a0={type:"added"},c0={type:"removed"},Ut=class s extends $n{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:s0++}),this.uuid=Hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new B,t=new ko,n=new _n,i=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new $e},normalMatrix:{value:new rt}}),this.matrix=new $e,this.matrixWorld=new $e,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.multiply(xs),this}rotateOnWorldAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.premultiply(xs),this}rotateX(e){return this.rotateOnAxis(ju,e)}rotateY(e){return this.rotateOnAxis(Ju,e)}rotateZ(e){return this.rotateOnAxis(Qu,e)}translateOnAxis(e,t){return $u.copy(e).applyQuaternion(this.quaternion),this.position.add($u.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ju,e)}translateY(e){return this.translateOnAxis(Ju,e)}translateZ(e){return this.translateOnAxis(Qu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ri.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?co.copy(e):co.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ri.lookAt(cr,co,this.up):ri.lookAt(co,cr,this.up),this.quaternion.setFromRotationMatrix(ri),i&&(ri.extractRotation(i.matrixWorld),xs.setFromRotationMatrix(ri),this.quaternion.premultiply(xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(a0)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(c0)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(ri),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,e,r0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,o0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++){let a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};Ut.DEFAULT_UP=new B(0,1,0);Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var kn=new B,oi=new B,vc=new B,ai=new B,ys=new B,Ms=new B,ed=new B,_c=new B,xc=new B,yc=new B,lo=!1,Ps=class s{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),kn.subVectors(e,t),i.cross(kn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){kn.subVectors(i,t),oi.subVectors(n,t),vc.subVectors(e,t);let o=kn.dot(kn),a=kn.dot(oi),c=kn.dot(vc),l=oi.dot(oi),h=oi.dot(vc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ai)===null?!1:ai.x>=0&&ai.y>=0&&ai.x+ai.y<=1}static getUV(e,t,n,i,r,o,a,c){return lo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),lo=!0),this.getInterpolation(e,t,n,i,r,o,a,c)}static getInterpolation(e,t,n,i,r,o,a,c){return this.getBarycoord(e,t,n,i,ai)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ai.x),c.addScaledVector(o,ai.y),c.addScaledVector(a,ai.z),c)}static isFrontFacing(e,t,n,i){return kn.subVectors(n,t),oi.subVectors(e,t),kn.cross(oi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kn.subVectors(this.c,this.b),oi.subVectors(this.a,this.b),kn.cross(oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return lo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),lo=!0),s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;ys.subVectors(i,n),Ms.subVectors(r,n),_c.subVectors(e,n);let c=ys.dot(_c),l=Ms.dot(_c);if(c<=0&&l<=0)return t.copy(n);xc.subVectors(e,i);let h=ys.dot(xc),u=Ms.dot(xc);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(ys,o);yc.subVectors(e,r);let p=ys.dot(yc),g=Ms.dot(yc);if(g>=0&&p<=g)return t.copy(r);let _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Ms,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return ed.subVectors(r,i),a=(u-h)/(u-h+(p-g)),t.copy(i).addScaledVector(ed,a);let f=1/(m+_+d);return o=_*f,a=d*f,t.copy(n).addScaledVector(ys,o).addScaledVector(Ms,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},cf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},ho={h:0,s:0,l:0};function Mc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Ie=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ft.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=ft.workingColorSpace){return this.r=e,this.g=t,this.b=n,ft.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=ft.workingColorSpace){if(e=El(e,1),t=Jt(t,0,1),n=Jt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Mc(o,r,e+1/3),this.g=Mc(o,r,e),this.b=Mc(o,r,e-1/3)}return ft.toWorkingColorSpace(this,i),this}setStyle(e,t=ht){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ht){let n=cf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Us(e.r),this.g=Us(e.g),this.b=Us(e.b),this}copyLinearToSRGB(e){return this.r=lc(e.r),this.g=lc(e.g),this.b=lc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ht){return ft.fromWorkingColorSpace(ln.copy(this),e),Math.round(Jt(ln.r*255,0,255))*65536+Math.round(Jt(ln.g*255,0,255))*256+Math.round(Jt(ln.b*255,0,255))}getHexString(e=ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ft.workingColorSpace){ft.fromWorkingColorSpace(ln.copy(this),t);let n=ln.r,i=ln.g,r=ln.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ft.workingColorSpace){return ft.fromWorkingColorSpace(ln.copy(this),t),e.r=ln.r,e.g=ln.g,e.b=ln.b,e}getStyle(e=ht){ft.fromWorkingColorSpace(ln.copy(this),e);let t=ln.r,n=ln.g,i=ln.b;return e!==ht?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ti),this.setHSL(Ti.h+e,Ti.s+t,Ti.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ti),e.getHSL(ho);let n=mr(Ti.h,ho.h,t),i=mr(Ti.s,ho.s,t),r=mr(Ti.l,ho.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ln=new Ie;Ie.NAMES=cf;var l0=0,vn=class extends $n{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:l0++}),this.uuid=Hn(),this.name="",this.type="Material",this.blending=Ds,this.side=Ln,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Nc,this.blendDst=Oc,this.blendEquation=Pn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ie(0,0,0),this.blendAlpha=0,this.depthFunc=Po,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fs,this.stencilZFail=fs,this.stencilZPass=fs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ds&&(n.blending=this.blending),this.side!==Ln&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Nc&&(n.blendSrc=this.blendSrc),this.blendDst!==Oc&&(n.blendDst=this.blendDst),this.blendEquation!==Pn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Po&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},zt=class extends vn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Zd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},hi=h0();function h0(){let s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[c|256]=32768,i[c]=24,i[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,i[c]=-l-1,i[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,i[c]=13,i[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,i[c]=24,i[c|256]=24):(n[c]=31744,n[c|256]=64512,i[c]=13,i[c|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;(l&8388608)===0;)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function u0(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=Jt(s,-65504,65504),hi.floatView[0]=s;let e=hi.uint32View[0],t=e>>23&511;return hi.baseTable[t]+((e&8388607)>>hi.shiftTable[t])}function d0(s){let e=s>>10;return hi.uint32View[0]=hi.mantissaTable[hi.offsetTable[e]+(s&1023)]+hi.exponentTable[e],hi.floatView[0]}var Fi={toHalfFloat:u0,fromHalfFloat:d0},Bt=new B,uo=new Re,Ct=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=zc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)uo.fromBufferAttribute(this,t),uo.applyMatrix3(e),this.setXY(t,uo.x,uo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array),r=yt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==zc&&(e.usage=this.usage),e}};var Ho=class extends Ct{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Vo=class extends Ct{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Pt=class extends Ct{constructor(e,t,n){super(new Float32Array(e),t,n)}};var f0=0,Cn=new $e,Sc=new Ut,Ss=new B,Sn=new sn,lr=new sn,jt=new B,qt=class s extends $n{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:f0++}),this.uuid=Hn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(af(e)?Vo:Ho)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new rt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Cn.makeRotationFromQuaternion(e),this.applyMatrix4(Cn),this}rotateX(e){return Cn.makeRotationX(e),this.applyMatrix4(Cn),this}rotateY(e){return Cn.makeRotationY(e),this.applyMatrix4(Cn),this}rotateZ(e){return Cn.makeRotationZ(e),this.applyMatrix4(Cn),this}translate(e,t,n){return Cn.makeTranslation(e,t,n),this.applyMatrix4(Cn),this}scale(e,t,n){return Cn.makeScale(e,t,n),this.applyMatrix4(Cn),this}lookAt(e){return Sc.lookAt(e),Sc.updateMatrix(),this.applyMatrix4(Sc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ss).negate(),this.translate(Ss.x,Ss.y,Ss.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Pt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];Sn.setFromBufferAttribute(r),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];lr.setFromBufferAttribute(a),this.morphTargetsRelative?(jt.addVectors(Sn.min,lr.min),Sn.expandByPoint(jt),jt.addVectors(Sn.max,lr.max),Sn.expandByPoint(jt)):(Sn.expandByPoint(lr.min),Sn.expandByPoint(lr.max))}Sn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)jt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(jt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)jt.fromBufferAttribute(a,l),c&&(Ss.fromBufferAttribute(e,l),jt.add(Ss)),i=Math.max(i,n.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,i=t.position.array,r=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let b=0;b<a;b++)l[b]=new B,h[b]=new B;let u=new B,d=new B,p=new B,g=new Re,_=new Re,m=new Re,f=new B,S=new B;function y(b,H,X){u.fromArray(i,b*3),d.fromArray(i,H*3),p.fromArray(i,X*3),g.fromArray(o,b*2),_.fromArray(o,H*2),m.fromArray(o,X*2),d.sub(u),p.sub(u),_.sub(g),m.sub(g);let ie=1/(_.x*m.y-m.x*_.y);isFinite(ie)&&(f.copy(d).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(ie),S.copy(p).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(ie),l[b].add(f),l[H].add(f),l[X].add(f),h[b].add(S),h[H].add(S),h[X].add(S))}let R=this.groups;R.length===0&&(R=[{start:0,count:n.length}]);for(let b=0,H=R.length;b<H;++b){let X=R[b],ie=X.start,D=X.count;for(let G=ie,W=ie+D;G<W;G+=3)y(n[G+0],n[G+1],n[G+2])}let F=new B,L=new B,P=new B,k=new B;function M(b){P.fromArray(r,b*3),k.copy(P);let H=l[b];F.copy(H),F.sub(P.multiplyScalar(P.dot(H))).normalize(),L.crossVectors(k,H);let ie=L.dot(h[b])<0?-1:1;c[b*4]=F.x,c[b*4+1]=F.y,c[b*4+2]=F.z,c[b*4+3]=ie}for(let b=0,H=R.length;b<H;++b){let X=R[b],ie=X.start,D=X.count;for(let G=ie,W=ie+D;G<W;G+=3)M(n[G+0]),M(n[G+1]),M(n[G+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new B,r=new B,o=new B,a=new B,c=new B,l=new B,h=new B,u=new B;if(e)for(let d=0,p=e.count;d<p;d+=3){let g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)jt.fromBufferAttribute(e,t),jt.normalize(),e.setXYZ(t,jt.x,jt.y,jt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*h;for(let f=0;f<h;f++)d[g++]=l[p++]}return new Ct(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],p=e(d,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},td=new $e,Ki=new fi,fo=new bn,nd=new B,Es=new B,ws=new B,bs=new B,Ec=new B,po=new B,mo=new Re,go=new Re,vo=new Re,id=new B,sd=new B,rd=new B,_o=new B,xo=new B,ct=class extends Ut{constructor(e=new qt,t=new zt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){po.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Ec.fromBufferAttribute(u,e),o?po.addScaledVector(Ec,h):po.addScaledVector(Ec.sub(t),h))}t.add(po)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fo.copy(n.boundingSphere),fo.applyMatrix4(r),Ki.copy(e.ray).recast(e.near),!(fo.containsPoint(Ki.origin)===!1&&(Ki.intersectSphere(fo,nd)===null||Ki.origin.distanceToSquared(nd)>(e.far-e.near)**2))&&(td.copy(r).invert(),Ki.copy(e.ray).applyMatrix4(td),!(n.boundingBox!==null&&Ki.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ki)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],f=o[m.materialIndex],S=Math.max(m.start,p.start),y=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let R=S,F=y;R<F;R+=3){let L=a.getX(R),P=a.getX(R+1),k=a.getX(R+2);i=yo(this,f,e,n,l,h,u,L,P,k),i&&(i.faceIndex=Math.floor(R/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let S=a.getX(m),y=a.getX(m+1),R=a.getX(m+2);i=yo(this,o,e,n,l,h,u,S,y,R),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],f=o[m.materialIndex],S=Math.max(m.start,p.start),y=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let R=S,F=y;R<F;R+=3){let L=R,P=R+1,k=R+2;i=yo(this,f,e,n,l,h,u,L,P,k),i&&(i.faceIndex=Math.floor(R/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let S=m,y=m+1,R=m+2;i=yo(this,o,e,n,l,h,u,S,y,R),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function p0(s,e,t,n,i,r,o,a){let c;if(e.side===dn?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,e.side===Ln,a),c===null)return null;xo.copy(a),xo.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(xo);return l<t.near||l>t.far?null:{distance:l,point:xo.clone(),object:s}}function yo(s,e,t,n,i,r,o,a,c,l){s.getVertexPosition(a,Es),s.getVertexPosition(c,ws),s.getVertexPosition(l,bs);let h=p0(s,e,t,n,Es,ws,bs,_o);if(h){i&&(mo.fromBufferAttribute(i,a),go.fromBufferAttribute(i,c),vo.fromBufferAttribute(i,l),h.uv=Ps.getInterpolation(_o,Es,ws,bs,mo,go,vo,new Re)),r&&(mo.fromBufferAttribute(r,a),go.fromBufferAttribute(r,c),vo.fromBufferAttribute(r,l),h.uv1=Ps.getInterpolation(_o,Es,ws,bs,mo,go,vo,new Re),h.uv2=h.uv1),o&&(id.fromBufferAttribute(o,a),sd.fromBufferAttribute(o,c),rd.fromBufferAttribute(o,l),h.normal=Ps.getInterpolation(_o,Es,ws,bs,id,sd,rd,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new B,materialIndex:0};Ps.getNormal(Es,ws,bs,u.normal),h.face=u}return h}var Mr=class s extends qt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Pt(l,3)),this.setAttribute("normal",new Pt(h,3)),this.setAttribute("uv",new Pt(u,2));function g(_,m,f,S,y,R,F,L,P,k,M){let b=R/P,H=F/k,X=R/2,ie=F/2,D=L/2,G=P+1,W=k+1,te=0,ne=0,J=new B;for(let ee=0;ee<W;ee++){let oe=ee*H-ie;for(let he=0;he<G;he++){let K=he*b-X;J[_]=K*S,J[m]=oe*y,J[f]=D,l.push(J.x,J.y,J.z),J[_]=0,J[m]=0,J[f]=L>0?1:-1,h.push(J.x,J.y,J.z),u.push(he/P),u.push(1-ee/k),te+=1}}for(let ee=0;ee<k;ee++)for(let oe=0;oe<P;oe++){let he=d+oe+G*ee,K=d+oe+G*(ee+1),se=d+(oe+1)+G*(ee+1),Se=d+(oe+1)+G*ee;c.push(he,K,Se),c.push(K,se,Se),ne+=6}a.addGroup(p,ne,M),p+=ne,d+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function ks(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function gn(s){let e={};for(let t=0;t<s.length;t++){let n=ks(s[t]);for(let i in n)e[i]=n[i]}return e}function m0(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function lf(s){return s.getRenderTarget()===null?s.outputColorSpace:ft.workingColorSpace}var Gn={clone:ks,merge:gn},g0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,v0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Nt=class extends vn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=g0,this.fragmentShader=v0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ks(e.uniforms),this.uniformsGroups=m0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Go=class extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $e,this.projectionMatrix=new $e,this.projectionMatrixInverse=new $e,this.coordinateSystem=ui}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},kt=class extends Go{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=zs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(pr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zs*2*Math.atan(Math.tan(pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(pr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ts=-90,As=1,Wc=class extends Ut{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new kt(Ts,As,e,t);i.layers=this.layers,this.add(i);let r=new kt(Ts,As,e,t);r.layers=this.layers,this.add(r);let o=new kt(Ts,As,e,t);o.layers=this.layers,this.add(o);let a=new kt(Ts,As,e,t);a.layers=this.layers,this.add(a);let c=new kt(Ts,As,e,t);c.layers=this.layers,this.add(c);let l=new kt(Ts,As,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===ui)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===No)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Wo=class extends Wt{constructor(e,t,n,i,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Os,super(e,t,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Xc=class extends Xt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(gr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===es?ht:un),this.texture=new Wo(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:bt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Mr(5,5,5),r=new Nt({name:"CubemapFromEquirect",uniforms:ks(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:dn,blending:Vt});r.uniforms.tEquirect.value=t;let o=new ct(i,r),a=t.minFilter;return t.minFilter===Vn&&(t.minFilter=bt),new Wc(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},wc=new B,_0=new B,x0=new rt,En=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=wc.subVectors(n,t).cross(_0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(wc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||x0.getNormalMatrix(e),i=this.coplanarPoint(wc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},$i=new bn,Mo=new B,Sr=class{constructor(e=new En,t=new En,n=new En,i=new En,r=new En,o=new En){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ui){let n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],p=i[8],g=i[9],_=i[10],m=i[11],f=i[12],S=i[13],y=i[14],R=i[15];if(n[0].setComponents(c-r,d-l,m-p,R-f).normalize(),n[1].setComponents(c+r,d+l,m+p,R+f).normalize(),n[2].setComponents(c+o,d+h,m+g,R+S).normalize(),n[3].setComponents(c-o,d-h,m-g,R-S).normalize(),n[4].setComponents(c-a,d-u,m-_,R-y).normalize(),t===ui)n[5].setComponents(c+a,d+u,m+_,R+y).normalize();else if(t===No)n[5].setComponents(a,u,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(e){return $i.center.set(0,0,0),$i.radius=.7071067811865476,$i.applyMatrix4(e.matrixWorld),this.intersectsSphere($i)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Mo.x=i.normal.x>0?e.max.x:e.min.x,Mo.y=i.normal.y>0?e.max.y:e.min.y,Mo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Mo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function hf(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function y0(s,e){let t=e.isWebGL2,n=new WeakMap;function i(l,h){let u=l.array,d=l.usage,p=u.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,u,d),l.onUploadCallback();let _;if(u instanceof Float32Array)_=s.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=s.SHORT;else if(u instanceof Uint32Array)_=s.UNSIGNED_INT;else if(u instanceof Int32Array)_=s.INT;else if(u instanceof Int8Array)_=s.BYTE;else if(u instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:p}}function r(l,h,u){let d=h.array,p=h._updateRange,g=h.updateRanges;if(s.bindBuffer(u,l),p.count===-1&&g.length===0&&s.bufferSubData(u,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){let f=g[_];t?s.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d,f.start,f.count):s.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}p.count!==-1&&(t?s.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):s.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);h&&(s.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);if(u===void 0)n.set(l,i(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}var Tn=class s extends qt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=e/a,d=t/c,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){let S=f*d-o;for(let y=0;y<l;y++){let R=y*u-r;g.push(R,-S,0),_.push(0,0,1),m.push(y/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let S=0;S<a;S++){let y=S+l*f,R=S+l*(f+1),F=S+1+l*(f+1),L=S+1+l*f;p.push(y,R,L),p.push(R,F,L)}this.setIndex(p),this.setAttribute("position",new Pt(g,3)),this.setAttribute("normal",new Pt(_,3)),this.setAttribute("uv",new Pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},M0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,S0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,E0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,w0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,b0=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,T0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,A0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,R0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,C0=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,P0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,L0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,I0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,D0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,U0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,N0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,O0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,F0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,B0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,z0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,k0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,H0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,V0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,G0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,W0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,X0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,q0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Y0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Z0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,K0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,j0="gl_FragColor = linearToOutputTexel( gl_FragColor );",J0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Q0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ev=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,nv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,iv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ov=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,av=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,hv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,uv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,pv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,mv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_v=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,yv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Mv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Sv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ev=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Av=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Rv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Lv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Iv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Dv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Uv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Ov=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Fv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Bv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,kv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Wv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,$v=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,e_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,t_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,n_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,i_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,s_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,r_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,o_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,a_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,c_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,l_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,h_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,u_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,d_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,f_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,p_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,m_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,g_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,v_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,__=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,x_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,y_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,M_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,E_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,b_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,T_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,A_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,R_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,C_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,P_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,L_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,D_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,U_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,N_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,F_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,z_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,H_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,V_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,W_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,X_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Y_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,K_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,j_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,J_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Q_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,it={alphahash_fragment:M0,alphahash_pars_fragment:S0,alphamap_fragment:E0,alphamap_pars_fragment:w0,alphatest_fragment:b0,alphatest_pars_fragment:T0,aomap_fragment:A0,aomap_pars_fragment:R0,batching_pars_vertex:C0,batching_vertex:P0,begin_vertex:L0,beginnormal_vertex:I0,bsdfs:D0,iridescence_fragment:U0,bumpmap_pars_fragment:N0,clipping_planes_fragment:O0,clipping_planes_pars_fragment:F0,clipping_planes_pars_vertex:B0,clipping_planes_vertex:z0,color_fragment:k0,color_pars_fragment:H0,color_pars_vertex:V0,color_vertex:G0,common:W0,cube_uv_reflection_fragment:X0,defaultnormal_vertex:q0,displacementmap_pars_vertex:Y0,displacementmap_vertex:Z0,emissivemap_fragment:K0,emissivemap_pars_fragment:$0,colorspace_fragment:j0,colorspace_pars_fragment:J0,envmap_fragment:Q0,envmap_common_pars_fragment:ev,envmap_pars_fragment:tv,envmap_pars_vertex:nv,envmap_physical_pars_fragment:pv,envmap_vertex:iv,fog_vertex:sv,fog_pars_vertex:rv,fog_fragment:ov,fog_pars_fragment:av,gradientmap_pars_fragment:cv,lightmap_fragment:lv,lightmap_pars_fragment:hv,lights_lambert_fragment:uv,lights_lambert_pars_fragment:dv,lights_pars_begin:fv,lights_toon_fragment:mv,lights_toon_pars_fragment:gv,lights_phong_fragment:vv,lights_phong_pars_fragment:_v,lights_physical_fragment:xv,lights_physical_pars_fragment:yv,lights_fragment_begin:Mv,lights_fragment_maps:Sv,lights_fragment_end:Ev,logdepthbuf_fragment:wv,logdepthbuf_pars_fragment:bv,logdepthbuf_pars_vertex:Tv,logdepthbuf_vertex:Av,map_fragment:Rv,map_pars_fragment:Cv,map_particle_fragment:Pv,map_particle_pars_fragment:Lv,metalnessmap_fragment:Iv,metalnessmap_pars_fragment:Dv,morphcolor_vertex:Uv,morphnormal_vertex:Nv,morphtarget_pars_vertex:Ov,morphtarget_vertex:Fv,normal_fragment_begin:Bv,normal_fragment_maps:zv,normal_pars_fragment:kv,normal_pars_vertex:Hv,normal_vertex:Vv,normalmap_pars_fragment:Gv,clearcoat_normal_fragment_begin:Wv,clearcoat_normal_fragment_maps:Xv,clearcoat_pars_fragment:qv,iridescence_pars_fragment:Yv,opaque_fragment:Zv,packing:Kv,premultiplied_alpha_fragment:$v,project_vertex:jv,dithering_fragment:Jv,dithering_pars_fragment:Qv,roughnessmap_fragment:e_,roughnessmap_pars_fragment:t_,shadowmap_pars_fragment:n_,shadowmap_pars_vertex:i_,shadowmap_vertex:s_,shadowmask_pars_fragment:r_,skinbase_vertex:o_,skinning_pars_vertex:a_,skinning_vertex:c_,skinnormal_vertex:l_,specularmap_fragment:h_,specularmap_pars_fragment:u_,tonemapping_fragment:d_,tonemapping_pars_fragment:f_,transmission_fragment:p_,transmission_pars_fragment:m_,uv_pars_fragment:g_,uv_pars_vertex:v_,uv_vertex:__,worldpos_vertex:x_,background_vert:y_,background_frag:M_,backgroundCube_vert:S_,backgroundCube_frag:E_,cube_vert:w_,cube_frag:b_,depth_vert:T_,depth_frag:A_,distanceRGBA_vert:R_,distanceRGBA_frag:C_,equirect_vert:P_,equirect_frag:L_,linedashed_vert:I_,linedashed_frag:D_,meshbasic_vert:U_,meshbasic_frag:N_,meshlambert_vert:O_,meshlambert_frag:F_,meshmatcap_vert:B_,meshmatcap_frag:z_,meshnormal_vert:k_,meshnormal_frag:H_,meshphong_vert:V_,meshphong_frag:G_,meshphysical_vert:W_,meshphysical_frag:X_,meshtoon_vert:q_,meshtoon_frag:Y_,points_vert:Z_,points_frag:K_,shadow_vert:$_,shadow_frag:j_,sprite_vert:J_,sprite_frag:Q_},be={common:{diffuse:{value:new Ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new rt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new rt},normalScale:{value:new Re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0},uvTransform:{value:new rt}},sprite:{diffuse:{value:new Ie(16777215)},opacity:{value:1},center:{value:new Re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}}},qn={basic:{uniforms:gn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:gn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ie(0)}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:gn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ie(0)},specular:{value:new Ie(1118481)},shininess:{value:30}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:gn([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:gn([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Ie(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:gn([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:gn([be.points,be.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:gn([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:gn([be.common,be.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:gn([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:gn([be.sprite,be.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distanceRGBA:{uniforms:gn([be.common,be.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distanceRGBA_vert,fragmentShader:it.distanceRGBA_frag},shadow:{uniforms:gn([be.lights,be.fog,{color:{value:new Ie(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};qn.physical={uniforms:gn([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new rt},clearcoatNormalScale:{value:new Re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new rt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new rt},sheen:{value:0},sheenColor:{value:new Ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new rt},transmissionSamplerSize:{value:new Re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new rt},attenuationDistance:{value:0},attenuationColor:{value:new Ie(0)},specularColor:{value:new Ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new rt},anisotropyVector:{value:new Re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new rt}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};var So={r:0,b:0,g:0};function ex(s,e,t,n,i,r,o){let a=new Ie(0),c=r===!0?0:1,l,h,u=null,d=0,p=null;function g(m,f){let S=!1,y=f.isScene===!0?f.background:null;y&&y.isTexture&&(y=(f.backgroundBlurriness>0?t:e).get(y)),y===null?_(a,c):y&&y.isColor&&(_(y,1),S=!0);let R=s.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||S)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),y&&(y.isCubeTexture||y.mapping===la)?(h===void 0&&(h=new ct(new Mr(1,1,1),new Nt({name:"BackgroundCubeMaterial",uniforms:ks(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(F,L,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=ft.getTransfer(y.colorSpace)!==St,(u!==y||d!==y.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,p=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ct(new Tn(2,2),new Nt({name:"BackgroundMaterial",uniforms:ks(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:Ln,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=ft.getTransfer(y.colorSpace)!==St,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||p!==s.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,p=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,f){m.getRGB(So,lf(s)),n.buffers.color.setClear(So.r,So.g,So.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),c=f,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(a,c)},render:g}}function tx(s,e,t,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null),l=c,h=!1;function u(D,G,W,te,ne){let J=!1;if(o){let ee=_(te,W,G);l!==ee&&(l=ee,p(l.object)),J=f(D,te,W,ne),J&&S(D,te,W,ne)}else{let ee=G.wireframe===!0;(l.geometry!==te.id||l.program!==W.id||l.wireframe!==ee)&&(l.geometry=te.id,l.program=W.id,l.wireframe=ee,J=!0)}ne!==null&&t.update(ne,s.ELEMENT_ARRAY_BUFFER),(J||h)&&(h=!1,k(D,G,W,te),ne!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(ne).buffer))}function d(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function p(D){return n.isWebGL2?s.bindVertexArray(D):r.bindVertexArrayOES(D)}function g(D){return n.isWebGL2?s.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function _(D,G,W){let te=W.wireframe===!0,ne=a[D.id];ne===void 0&&(ne={},a[D.id]=ne);let J=ne[G.id];J===void 0&&(J={},ne[G.id]=J);let ee=J[te];return ee===void 0&&(ee=m(d()),J[te]=ee),ee}function m(D){let G=[],W=[],te=[];for(let ne=0;ne<i;ne++)G[ne]=0,W[ne]=0,te[ne]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:W,attributeDivisors:te,object:D,attributes:{},index:null}}function f(D,G,W,te){let ne=l.attributes,J=G.attributes,ee=0,oe=W.getAttributes();for(let he in oe)if(oe[he].location>=0){let se=ne[he],Se=J[he];if(Se===void 0&&(he==="instanceMatrix"&&D.instanceMatrix&&(Se=D.instanceMatrix),he==="instanceColor"&&D.instanceColor&&(Se=D.instanceColor)),se===void 0||se.attribute!==Se||Se&&se.data!==Se.data)return!0;ee++}return l.attributesNum!==ee||l.index!==te}function S(D,G,W,te){let ne={},J=G.attributes,ee=0,oe=W.getAttributes();for(let he in oe)if(oe[he].location>=0){let se=J[he];se===void 0&&(he==="instanceMatrix"&&D.instanceMatrix&&(se=D.instanceMatrix),he==="instanceColor"&&D.instanceColor&&(se=D.instanceColor));let Se={};Se.attribute=se,se&&se.data&&(Se.data=se.data),ne[he]=Se,ee++}l.attributes=ne,l.attributesNum=ee,l.index=te}function y(){let D=l.newAttributes;for(let G=0,W=D.length;G<W;G++)D[G]=0}function R(D){F(D,0)}function F(D,G){let W=l.newAttributes,te=l.enabledAttributes,ne=l.attributeDivisors;W[D]=1,te[D]===0&&(s.enableVertexAttribArray(D),te[D]=1),ne[D]!==G&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,G),ne[D]=G)}function L(){let D=l.newAttributes,G=l.enabledAttributes;for(let W=0,te=G.length;W<te;W++)G[W]!==D[W]&&(s.disableVertexAttribArray(W),G[W]=0)}function P(D,G,W,te,ne,J,ee){ee===!0?s.vertexAttribIPointer(D,G,W,ne,J):s.vertexAttribPointer(D,G,W,te,ne,J)}function k(D,G,W,te){if(n.isWebGL2===!1&&(D.isInstancedMesh||te.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();let ne=te.attributes,J=W.getAttributes(),ee=G.defaultAttributeValues;for(let oe in J){let he=J[oe];if(he.location>=0){let K=ne[oe];if(K===void 0&&(oe==="instanceMatrix"&&D.instanceMatrix&&(K=D.instanceMatrix),oe==="instanceColor"&&D.instanceColor&&(K=D.instanceColor)),K!==void 0){let se=K.normalized,Se=K.itemSize,_e=t.get(K);if(_e===void 0)continue;let Te=_e.buffer,Ue=_e.type,Ge=_e.bytesPerElement,Ne=n.isWebGL2===!0&&(Ue===s.INT||Ue===s.UNSIGNED_INT||K.gpuType===$d);if(K.isInterleavedBufferAttribute){let tt=K.data,Z=tt.stride,At=K.offset;if(tt.isInstancedInterleavedBuffer){for(let Oe=0;Oe<he.locationSize;Oe++)F(he.location+Oe,tt.meshPerAttribute);D.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Oe=0;Oe<he.locationSize;Oe++)R(he.location+Oe);s.bindBuffer(s.ARRAY_BUFFER,Te);for(let Oe=0;Oe<he.locationSize;Oe++)P(he.location+Oe,Se/he.locationSize,Ue,se,Z*Ge,(At+Se/he.locationSize*Oe)*Ge,Ne)}else{if(K.isInstancedBufferAttribute){for(let tt=0;tt<he.locationSize;tt++)F(he.location+tt,K.meshPerAttribute);D.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let tt=0;tt<he.locationSize;tt++)R(he.location+tt);s.bindBuffer(s.ARRAY_BUFFER,Te);for(let tt=0;tt<he.locationSize;tt++)P(he.location+tt,Se/he.locationSize,Ue,se,Se*Ge,Se/he.locationSize*tt*Ge,Ne)}}else if(ee!==void 0){let se=ee[oe];if(se!==void 0)switch(se.length){case 2:s.vertexAttrib2fv(he.location,se);break;case 3:s.vertexAttrib3fv(he.location,se);break;case 4:s.vertexAttrib4fv(he.location,se);break;default:s.vertexAttrib1fv(he.location,se)}}}}L()}function M(){X();for(let D in a){let G=a[D];for(let W in G){let te=G[W];for(let ne in te)g(te[ne].object),delete te[ne];delete G[W]}delete a[D]}}function b(D){if(a[D.id]===void 0)return;let G=a[D.id];for(let W in G){let te=G[W];for(let ne in te)g(te[ne].object),delete te[ne];delete G[W]}delete a[D.id]}function H(D){for(let G in a){let W=a[G];if(W[D.id]===void 0)continue;let te=W[D.id];for(let ne in te)g(te[ne].object),delete te[ne];delete W[D.id]}}function X(){ie(),h=!0,l!==c&&(l=c,p(l.object))}function ie(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:X,resetDefaultState:ie,dispose:M,releaseStatesOfGeometry:b,releaseStatesOfProgram:H,initAttributes:y,enableAttribute:R,disableUnusedAttributes:L}}function nx(s,e,t,n){let i=n.isWebGL2,r;function o(h){r=h}function a(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,d){if(d===0)return;let p,g;if(i)p=s,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,h,u,d),t.update(u,r,d)}function l(h,u,d){if(d===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{p.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function ix(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext",a=t.precision!==void 0?t.precision:"highp",c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),f=s.getParameter(s.MAX_VARYING_VECTORS),S=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=d>0,R=o||e.has("OES_texture_float"),F=y&&R,L=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:S,vertexTextures:y,floatFragmentTextures:R,floatVertexTextures:F,maxSamples:L}}function sx(s){let e=this,t=null,n=0,i=!1,r=!1,o=new En,a=new rt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{let S=r?0:n,y=S*4,R=f.clippingState||null;c.value=R,R=h(g,d,y,p);for(let F=0;F!==y;++F)R[F]=t[F];f.clippingState=R,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,p,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let f=p+_*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let y=0,R=p;y!==_;++y,R+=4)o.copy(u[y]).applyMatrix4(S,a),o.normal.toArray(m,R),m[R+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function rx(s){let e=new WeakMap;function t(o,a){return a===Fc?o.mapping=Os:a===Bc&&(o.mapping=Fs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Fc||a===Bc)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Xc(c.height/2);return l.fromEquirectangularTexture(s,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var jn=class extends Go{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ls=4,od=[.125,.215,.35,.446,.526,.582],Ji=20,bc=new jn,ad=new Ie,Tc=null,Ac=0,Rc=0,ji=(1+Math.sqrt(5))/2,Rs=1/ji,cd=[new B(1,1,1),new B(-1,1,1),new B(1,1,-1),new B(-1,1,-1),new B(0,ji,Rs),new B(0,ji,-Rs),new B(Rs,0,ji),new B(-Rs,0,ji),new B(ji,Rs,0),new B(-ji,Rs,0)],Jn=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Tc=this._renderer.getRenderTarget(),Ac=this._renderer.getActiveCubeFace(),Rc=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ud(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Tc,Ac,Rc),e.scissorTest=!1,Eo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Os||e.mapping===Fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Tc=this._renderer.getRenderTarget(),Ac=this._renderer.getActiveCubeFace(),Rc=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:bt,minFilter:bt,generateMipmaps:!1,type:Dt,format:hn,colorSpace:Tt,depthBuffer:!1},i=ld(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ld(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ox(r)),this._blurMaterial=ax(r,e,t)}return i}_compileMaterial(e){let t=new ct(this._lodPlanes[0],e);this._renderer.compile(t,bc)}_sceneToCubeUV(e,t,n,i){let a=new kt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(ad),h.toneMapping=Zn,h.autoClear=!1;let p=new zt({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1}),g=new ct(new Mr,p),_=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(ad),_=!0);for(let f=0;f<6;f++){let S=f%3;S===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):S===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));let y=this._cubeSize;Eo(i,S*y,f>2?y:0,y,y),h.setRenderTarget(i),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Os||e.mapping===Fs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ud()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hd());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new ct(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Eo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,bc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=cd[(i-1)%cd.length];this._blur(e,i-1,i,r,o)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new ct(this._lodPlanes[i],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ji-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Ji;m>Ji&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ji}`);let f=[],S=0;for(let P=0;P<Ji;++P){let k=P/_,M=Math.exp(-k*k/2);f.push(M),P===0?S+=M:P<m&&(S+=2*M)}for(let P=0;P<f.length;P++)f[P]=f[P]/S;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;let R=this._sizeLods[i],F=3*R*(i>y-Ls?i-y+Ls:0),L=4*(this._cubeSize-R);Eo(t,F,L,3*R,2*R),c.setRenderTarget(t),c.render(u,bc)}};function ox(s){let e=[],t=[],n=[],i=s,r=s-Ls+1+od.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let c=1/a;o>s-Ls?c=od[o-s+Ls-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,S=new Float32Array(_*g*p),y=new Float32Array(m*g*p),R=new Float32Array(f*g*p);for(let L=0;L<p;L++){let P=L%3*2/3-1,k=L>2?0:-1,M=[P,k,0,P+2/3,k,0,P+2/3,k+1,0,P,k,0,P+2/3,k+1,0,P,k+1,0];S.set(M,_*g*L),y.set(d,m*g*L);let b=[L,L,L,L,L,L];R.set(b,f*g*L)}let F=new qt;F.setAttribute("position",new Ct(S,_)),F.setAttribute("uv",new Ct(y,m)),F.setAttribute("faceIndex",new Ct(R,f)),e.push(F),i>Ls&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ld(s,e,t){let n=new Xt(s,e,t);return n.texture.mapping=la,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Eo(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function ax(s,e,t){let n=new Float32Array(Ji),i=new B(0,1,0);return new Nt({name:"SphericalGaussianBlur",defines:{n:Ji,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function hd(){return new Nt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function ud(){return new Nt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function wl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function cx(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Fc||c===Bc,h=c===Os||c===Fs;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new Jn(s)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{let u=a.image;if(l&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new Jn(s));let d=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function i(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function lx(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function hx(s,e,t,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete i[d.id];let p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let g in d)e.update(d[g],s.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],s.ARRAY_BUFFER)}}function l(u){let d=[],p=u.index,g=u.attributes.position,_=0;if(p!==null){let S=p.array;_=p.version;for(let y=0,R=S.length;y<R;y+=3){let F=S[y+0],L=S[y+1],P=S[y+2];d.push(F,L,L,P,P,F)}}else if(g!==void 0){let S=g.array;_=g.version;for(let y=0,R=S.length/3-1;y<R;y+=3){let F=y+0,L=y+1,P=y+2;d.push(F,L,L,P,P,F)}}else return;let m=new(af(d)?Vo:Ho)(d,1);m.version=_;let f=r.get(u);f&&e.remove(f),r.set(u,m)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function ux(s,e,t,n){let i=n.isWebGL2,r;function o(p){r=p}let a,c;function l(p){a=p.type,c=p.bytesPerElement}function h(p,g){s.drawElements(r,g,a,p*c),t.update(g,r,1)}function u(p,g,_){if(_===0)return;let m,f;if(i)m=s,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](r,g,a,p*c,_),t.update(g,r,_)}function d(p,g,_){if(_===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<_;f++)this.render(p[f]/c,g[f]);else{m.multiDrawElementsWEBGL(r,g,0,a,p,0,_);let f=0;for(let S=0;S<_;S++)f+=g[S];t.update(f,r,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function dx(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function fx(s,e){return s[0]-e[0]}function px(s,e){return Math.abs(e[1])-Math.abs(s[1])}function mx(s,e,t){let n={},i=new Float32Array(8),r=new WeakMap,o=new Et,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){let d=l.morphTargetInfluences;if(e.isWebGL2===!0){let p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=p!==void 0?p.length:0,_=r.get(h);if(_===void 0||_.count!==g){let D=function(){X.dispose(),r.delete(h),h.removeEventListener("dispose",D)};_!==void 0&&_.texture.dispose();let S=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,R=h.morphAttributes.color!==void 0,F=h.morphAttributes.position||[],L=h.morphAttributes.normal||[],P=h.morphAttributes.color||[],k=0;S===!0&&(k=1),y===!0&&(k=2),R===!0&&(k=3);let M=h.attributes.position.count*k,b=1;M>e.maxTextureSize&&(b=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let H=new Float32Array(M*b*4*g),X=new zo(H,M,b,g);X.type=nn,X.needsUpdate=!0;let ie=k*4;for(let G=0;G<g;G++){let W=F[G],te=L[G],ne=P[G],J=M*b*4*G;for(let ee=0;ee<W.count;ee++){let oe=ee*ie;S===!0&&(o.fromBufferAttribute(W,ee),H[J+oe+0]=o.x,H[J+oe+1]=o.y,H[J+oe+2]=o.z,H[J+oe+3]=0),y===!0&&(o.fromBufferAttribute(te,ee),H[J+oe+4]=o.x,H[J+oe+5]=o.y,H[J+oe+6]=o.z,H[J+oe+7]=0),R===!0&&(o.fromBufferAttribute(ne,ee),H[J+oe+8]=o.x,H[J+oe+9]=o.y,H[J+oe+10]=o.z,H[J+oe+11]=ne.itemSize===4?o.w:1)}}_={count:g,texture:X,size:new Re(M,b)},r.set(h,_),h.addEventListener("dispose",D)}let m=0;for(let S=0;S<d.length;S++)m+=d[S];let f=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(s,"morphTargetBaseInfluence",f),u.getUniforms().setValue(s,"morphTargetInfluences",d),u.getUniforms().setValue(s,"morphTargetsTexture",_.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",_.size)}else{let p=d===void 0?0:d.length,g=n[h.id];if(g===void 0||g.length!==p){g=[];for(let y=0;y<p;y++)g[y]=[y,0];n[h.id]=g}for(let y=0;y<p;y++){let R=g[y];R[0]=y,R[1]=d[y]}g.sort(px);for(let y=0;y<8;y++)y<p&&g[y][1]?(a[y][0]=g[y][0],a[y][1]=g[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(fx);let _=h.morphAttributes.position,m=h.morphAttributes.normal,f=0;for(let y=0;y<8;y++){let R=a[y],F=R[0],L=R[1];F!==Number.MAX_SAFE_INTEGER&&L?(_&&h.getAttribute("morphTarget"+y)!==_[F]&&h.setAttribute("morphTarget"+y,_[F]),m&&h.getAttribute("morphNormal"+y)!==m[F]&&h.setAttribute("morphNormal"+y,m[F]),i[y]=L,f+=L):(_&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),m&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),i[y]=0)}let S=h.morphTargetsRelative?1:1-f;u.getUniforms().setValue(s,"morphTargetBaseInfluence",S),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function gx(s,e,t,n){let i=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var Hs=class extends Wt{constructor(e,t,n,i,r,o,a,c,l,h){if(h=h!==void 0?h:Qi,h!==Qi&&h!==Ci)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Qi&&(n=Ai),n===void 0&&h===Ci&&(n=di),super(null,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:It,this.minFilter=c!==void 0?c:It,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},uf=new Wt,df=new Hs(1,1);df.compareFunction=of;var ff=new zo,pf=new Gc,mf=new Wo,dd=[],fd=[],pd=new Float32Array(16),md=new Float32Array(9),gd=new Float32Array(4);function js(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=dd[i];if(r===void 0&&(r=new Float32Array(i),dd[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Yt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Zt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function da(s,e){let t=fd[e];t===void 0&&(t=new Int32Array(e),fd[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function vx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function _x(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;s.uniform2fv(this.addr,e),Zt(t,e)}}function xx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;s.uniform3fv(this.addr,e),Zt(t,e)}}function yx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;s.uniform4fv(this.addr,e),Zt(t,e)}}function Mx(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;gd.set(n),s.uniformMatrix2fv(this.addr,!1,gd),Zt(t,n)}}function Sx(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;md.set(n),s.uniformMatrix3fv(this.addr,!1,md),Zt(t,n)}}function Ex(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;pd.set(n),s.uniformMatrix4fv(this.addr,!1,pd),Zt(t,n)}}function wx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function bx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;s.uniform2iv(this.addr,e),Zt(t,e)}}function Tx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;s.uniform3iv(this.addr,e),Zt(t,e)}}function Ax(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;s.uniform4iv(this.addr,e),Zt(t,e)}}function Rx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Cx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;s.uniform2uiv(this.addr,e),Zt(t,e)}}function Px(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;s.uniform3uiv(this.addr,e),Zt(t,e)}}function Lx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;s.uniform4uiv(this.addr,e),Zt(t,e)}}function Ix(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?df:uf;t.setTexture2D(e||r,i)}function Dx(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||pf,i)}function Ux(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||mf,i)}function Nx(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||ff,i)}function Ox(s){switch(s){case 5126:return vx;case 35664:return _x;case 35665:return xx;case 35666:return yx;case 35674:return Mx;case 35675:return Sx;case 35676:return Ex;case 5124:case 35670:return wx;case 35667:case 35671:return bx;case 35668:case 35672:return Tx;case 35669:case 35673:return Ax;case 5125:return Rx;case 36294:return Cx;case 36295:return Px;case 36296:return Lx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ix;case 35679:case 36299:case 36307:return Dx;case 35680:case 36300:case 36308:case 36293:return Ux;case 36289:case 36303:case 36311:case 36292:return Nx}}function Fx(s,e){s.uniform1fv(this.addr,e)}function Bx(s,e){let t=js(e,this.size,2);s.uniform2fv(this.addr,t)}function zx(s,e){let t=js(e,this.size,3);s.uniform3fv(this.addr,t)}function kx(s,e){let t=js(e,this.size,4);s.uniform4fv(this.addr,t)}function Hx(s,e){let t=js(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Vx(s,e){let t=js(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Gx(s,e){let t=js(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Wx(s,e){s.uniform1iv(this.addr,e)}function Xx(s,e){s.uniform2iv(this.addr,e)}function qx(s,e){s.uniform3iv(this.addr,e)}function Yx(s,e){s.uniform4iv(this.addr,e)}function Zx(s,e){s.uniform1uiv(this.addr,e)}function Kx(s,e){s.uniform2uiv(this.addr,e)}function $x(s,e){s.uniform3uiv(this.addr,e)}function jx(s,e){s.uniform4uiv(this.addr,e)}function Jx(s,e,t){let n=this.cache,i=e.length,r=da(t,i);Yt(n,r)||(s.uniform1iv(this.addr,r),Zt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||uf,r[o])}function Qx(s,e,t){let n=this.cache,i=e.length,r=da(t,i);Yt(n,r)||(s.uniform1iv(this.addr,r),Zt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||pf,r[o])}function ey(s,e,t){let n=this.cache,i=e.length,r=da(t,i);Yt(n,r)||(s.uniform1iv(this.addr,r),Zt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||mf,r[o])}function ty(s,e,t){let n=this.cache,i=e.length,r=da(t,i);Yt(n,r)||(s.uniform1iv(this.addr,r),Zt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||ff,r[o])}function ny(s){switch(s){case 5126:return Fx;case 35664:return Bx;case 35665:return zx;case 35666:return kx;case 35674:return Hx;case 35675:return Vx;case 35676:return Gx;case 5124:case 35670:return Wx;case 35667:case 35671:return Xx;case 35668:case 35672:return qx;case 35669:case 35673:return Yx;case 5125:return Zx;case 36294:return Kx;case 36295:return $x;case 36296:return jx;case 35678:case 36198:case 36298:case 36306:case 35682:return Jx;case 35679:case 36299:case 36307:return Qx;case 35680:case 36300:case 36308:case 36293:return ey;case 36289:case 36303:case 36311:case 36292:return ty}}var qc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ox(t.type)}},Yc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ny(t.type)}},Zc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},Cc=/(\w+)(\])?(\[|\.)?/g;function vd(s,e){s.seq.push(e),s.map[e.id]=e}function iy(s,e,t){let n=s.name,i=n.length;for(Cc.lastIndex=0;;){let r=Cc.exec(n),o=Cc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){vd(t,l===void 0?new qc(a,s,e):new Yc(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new Zc(a),vd(t,u)),t=u}}}var Ns=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);iy(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function _d(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var sy=37297,ry=0;function oy(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function ay(s){let e=ft.getPrimaries(ft.workingColorSpace),t=ft.getPrimaries(s),n;switch(e===t?n="":e===Uo&&t===Do?n="LinearDisplayP3ToLinearSRGB":e===Do&&t===Uo&&(n="LinearSRGBToLinearDisplayP3"),s){case Tt:case ua:return[n,"LinearTransferOETF"];case ht:case Sl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function xd(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+oy(s.getShaderSource(e),o)}else return i}function cy(s,e){let t=ay(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function ly(s,e){let t;switch(e){case Ur:t="Linear";break;case gl:t="Reinhard";break;case vl:t="OptimizedCineon";break;case $s:t="ACESFilmic";break;case os:t="AgX";break;case vg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function hy(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Is).join(`
`)}function uy(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Is).join(`
`)}function dy(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function fy(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Is(s){return s!==""}function yd(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Md(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var py=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kc(s){return s.replace(py,gy)}var my=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function gy(s,e){let t=it[e];if(t===void 0){let n=my.get(e);if(n!==void 0)t=it[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Kc(t)}var vy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sd(s){return s.replace(vy,_y)}function _y(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Ed(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function xy(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===oa?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Km?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===li&&(e="SHADOWMAP_TYPE_VSM"),e}function yy(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Os:case Fs:e="ENVMAP_TYPE_CUBE";break;case la:e="ENVMAP_TYPE_CUBE_UV";break}return e}function My(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Fs:e="ENVMAP_MODE_REFRACTION";break}return e}function Sy(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Zd:e="ENVMAP_BLENDING_MULTIPLY";break;case mg:e="ENVMAP_BLENDING_MIX";break;case gg:e="ENVMAP_BLENDING_ADD";break}return e}function Ey(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function wy(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=xy(t),l=yy(t),h=My(t),u=Sy(t),d=Ey(t),p=t.isWebGL2?"":hy(t),g=uy(t),_=dy(r),m=i.createProgram(),f,S,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Is).join(`
`),f.length>0&&(f+=`
`),S=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Is).join(`
`),S.length>0&&(S+=`
`)):(f=[Ed(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Is).join(`
`),S=[p,Ed(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Zn?"#define TONE_MAPPING":"",t.toneMapping!==Zn?it.tonemapping_pars_fragment:"",t.toneMapping!==Zn?ly("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,cy("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Is).join(`
`)),o=Kc(o),o=yd(o,t),o=Md(o,t),a=Kc(a),a=yd(a,t),a=Md(a,t),o=Sd(o),a=Sd(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,S=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Vu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);let R=y+f+o,F=y+S+a,L=_d(i,i.VERTEX_SHADER,R),P=_d(i,i.FRAGMENT_SHADER,F);i.attachShader(m,L),i.attachShader(m,P),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function k(X){if(s.debug.checkShaderErrors){let ie=i.getProgramInfoLog(m).trim(),D=i.getShaderInfoLog(L).trim(),G=i.getShaderInfoLog(P).trim(),W=!0,te=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(W=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,L,P);else{let ne=xd(i,L,"vertex"),J=xd(i,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+ie+`
`+ne+`
`+J)}else ie!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ie):(D===""||G==="")&&(te=!1);te&&(X.diagnostics={runnable:W,programLog:ie,vertexShader:{log:D,prefix:f},fragmentShader:{log:G,prefix:S}})}i.deleteShader(L),i.deleteShader(P),M=new Ns(i,m),b=fy(i,m)}let M;this.getUniforms=function(){return M===void 0&&k(this),M};let b;this.getAttributes=function(){return b===void 0&&k(this),b};let H=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=i.getProgramParameter(m,sy)),H},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ry++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=L,this.fragmentShader=P,this}var by=0,$c=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new jc(e),t.set(e,n)),n}},jc=class{constructor(e){this.id=by++,this.code=e,this.usedTimes=0}};function Ty(s,e,t,n,i,r,o){let a=new yr,c=new $c,l=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures,p=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function m(M,b,H,X,ie){let D=X.fog,G=ie.geometry,W=M.isMeshStandardMaterial?X.environment:null,te=(M.isMeshStandardMaterial?t:e).get(M.envMap||W),ne=te&&te.mapping===la?te.image.height:null,J=g[M.type];M.precision!==null&&(p=i.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));let ee=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,oe=ee!==void 0?ee.length:0,he=0;G.morphAttributes.position!==void 0&&(he=1),G.morphAttributes.normal!==void 0&&(he=2),G.morphAttributes.color!==void 0&&(he=3);let K,se,Se,_e;if(J){let Qt=qn[J];K=Qt.vertexShader,se=Qt.fragmentShader}else K=M.vertexShader,se=M.fragmentShader,c.update(M),Se=c.getVertexShaderID(M),_e=c.getFragmentShaderID(M);let Te=s.getRenderTarget(),Ue=ie.isInstancedMesh===!0,Ge=ie.isBatchedMesh===!0,Ne=!!M.map,tt=!!M.matcap,Z=!!te,At=!!M.aoMap,Oe=!!M.lightMap,We=!!M.bumpMap,De=!!M.normalMap,gt=!!M.displacementMap,Ze=!!M.emissiveMap,T=!!M.metalnessMap,E=!!M.roughnessMap,$=M.anisotropy>0,fe=M.clearcoat>0,le=M.iridescence>0,de=M.sheen>0,Pe=M.transmission>0,we=$&&!!M.anisotropyMap,Ae=fe&&!!M.clearcoatMap,Fe=fe&&!!M.clearcoatNormalMap,Xe=fe&&!!M.clearcoatRoughnessMap,ce=le&&!!M.iridescenceMap,Je=le&&!!M.iridescenceThicknessMap,I=de&&!!M.sheenColorMap,re=de&&!!M.sheenRoughnessMap,pe=!!M.specularMap,ge=!!M.specularColorMap,Le=!!M.specularIntensityMap,ze=Pe&&!!M.transmissionMap,Be=Pe&&!!M.thicknessMap,Ke=!!M.gradientMap,q=!!M.alphaMap,z=M.alphaTest>0,xe=!!M.alphaHash,ye=!!M.extensions,qe=!!G.attributes.uv1,ke=!!G.attributes.uv2,lt=!!G.attributes.uv3,ut=Zn;return M.toneMapped&&(Te===null||Te.isXRRenderTarget===!0)&&(ut=s.toneMapping),{isWebGL2:h,shaderID:J,shaderType:M.type,shaderName:M.name,vertexShader:K,fragmentShader:se,defines:M.defines,customVertexShaderID:Se,customFragmentShaderID:_e,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Ge,instancing:Ue,instancingColor:Ue&&ie.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Te===null?s.outputColorSpace:Te.isXRRenderTarget===!0?Te.texture.colorSpace:Tt,map:Ne,matcap:tt,envMap:Z,envMapMode:Z&&te.mapping,envMapCubeUVHeight:ne,aoMap:At,lightMap:Oe,bumpMap:We,normalMap:De,displacementMap:d&&gt,emissiveMap:Ze,normalMapObjectSpace:De&&M.normalMapType===Cg,normalMapTangentSpace:De&&M.normalMapType===Ml,metalnessMap:T,roughnessMap:E,anisotropy:$,anisotropyMap:we,clearcoat:fe,clearcoatMap:Ae,clearcoatNormalMap:Fe,clearcoatRoughnessMap:Xe,iridescence:le,iridescenceMap:ce,iridescenceThicknessMap:Je,sheen:de,sheenColorMap:I,sheenRoughnessMap:re,specularMap:pe,specularColorMap:ge,specularIntensityMap:Le,transmission:Pe,transmissionMap:ze,thicknessMap:Be,gradientMap:Ke,opaque:M.transparent===!1&&M.blending===Ds,alphaMap:q,alphaTest:z,alphaHash:xe,combine:M.combine,mapUv:Ne&&_(M.map.channel),aoMapUv:At&&_(M.aoMap.channel),lightMapUv:Oe&&_(M.lightMap.channel),bumpMapUv:We&&_(M.bumpMap.channel),normalMapUv:De&&_(M.normalMap.channel),displacementMapUv:gt&&_(M.displacementMap.channel),emissiveMapUv:Ze&&_(M.emissiveMap.channel),metalnessMapUv:T&&_(M.metalnessMap.channel),roughnessMapUv:E&&_(M.roughnessMap.channel),anisotropyMapUv:we&&_(M.anisotropyMap.channel),clearcoatMapUv:Ae&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Fe&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Xe&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:I&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:re&&_(M.sheenRoughnessMap.channel),specularMapUv:pe&&_(M.specularMap.channel),specularColorMapUv:ge&&_(M.specularColorMap.channel),specularIntensityMapUv:Le&&_(M.specularIntensityMap.channel),transmissionMapUv:ze&&_(M.transmissionMap.channel),thicknessMapUv:Be&&_(M.thicknessMap.channel),alphaMapUv:q&&_(M.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(De||$),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,vertexUv1s:qe,vertexUv2s:ke,vertexUv3s:lt,pointsUvs:ie.isPoints===!0&&!!G.attributes.uv&&(Ne||q),fog:!!D,useFog:M.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:ie.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:he,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&H.length>0,shadowMapType:s.shadowMap.type,toneMapping:ut,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Ne&&M.map.isVideoTexture===!0&&ft.getTransfer(M.map.colorSpace)===St,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===wn,flipSided:M.side===dn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ye&&M.extensions.derivatives===!0,extensionFragDepth:ye&&M.extensions.fragDepth===!0,extensionDrawBuffers:ye&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ye&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ye&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function f(M){let b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(let H in M.defines)b.push(H),b.push(M.defines[H]);return M.isRawShaderMaterial===!1&&(S(b,M),y(b,M),b.push(s.outputColorSpace)),b.push(M.customProgramCacheKey),b.join()}function S(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking)}function y(M,b){a.disableAll(),b.isWebGL2&&a.enable(0),b.supportsVertexTextures&&a.enable(1),b.instancing&&a.enable(2),b.instancingColor&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),M.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.skinning&&a.enable(4),b.morphTargets&&a.enable(5),b.morphNormals&&a.enable(6),b.morphColors&&a.enable(7),b.premultipliedAlpha&&a.enable(8),b.shadowMapEnabled&&a.enable(9),b.useLegacyLights&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function R(M){let b=g[M.type],H;if(b){let X=qn[b];H=Gn.clone(X.uniforms)}else H=M.uniforms;return H}function F(M,b){let H;for(let X=0,ie=l.length;X<ie;X++){let D=l[X];if(D.cacheKey===b){H=D,++H.usedTimes;break}}return H===void 0&&(H=new wy(s,b,M,r),l.push(H)),H}function L(M){if(--M.usedTimes===0){let b=l.indexOf(M);l[b]=l[l.length-1],l.pop(),M.destroy()}}function P(M){c.remove(M)}function k(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:R,acquireProgram:F,releaseProgram:L,releaseShaderCache:P,programs:l,dispose:k}}function Ay(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Ry(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function wd(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function bd(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,p,g,_,m){let f=s[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),e++,f}function a(u,d,p,g,_,m){let f=o(u,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):t.push(f)}function c(u,d,p,g,_,m){let f=o(u,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):t.unshift(f)}function l(u,d){t.length>1&&t.sort(u||Ry),n.length>1&&n.sort(d||wd),i.length>1&&i.sort(d||wd)}function h(){for(let u=e,d=s.length;u<d;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function Cy(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new bd,s.set(n,[o])):i>=r.length?(o=new bd,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Py(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new Ie};break;case"SpotLight":t={position:new B,direction:new B,color:new Ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Ie,groundColor:new Ie};break;case"RectAreaLight":t={color:new Ie,position:new B,halfWidth:new B,halfHeight:new B};break}return s[e.id]=t,t}}}function Ly(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Iy=0;function Dy(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Uy(s,e){let t=new Py,n=Ly(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new B);let r=new B,o=new $e,a=new $e;function c(h,u){let d=0,p=0,g=0;for(let X=0;X<9;X++)i.probe[X].set(0,0,0);let _=0,m=0,f=0,S=0,y=0,R=0,F=0,L=0,P=0,k=0,M=0;h.sort(Dy);let b=u===!0?Math.PI:1;for(let X=0,ie=h.length;X<ie;X++){let D=h[X],G=D.color,W=D.intensity,te=D.distance,ne=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=G.r*W*b,p+=G.g*W*b,g+=G.b*W*b;else if(D.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(D.sh.coefficients[J],W);M++}else if(D.isDirectionalLight){let J=t.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity*b),D.castShadow){let ee=D.shadow,oe=n.get(D);oe.shadowBias=ee.bias,oe.shadowNormalBias=ee.normalBias,oe.shadowRadius=ee.radius,oe.shadowMapSize=ee.mapSize,i.directionalShadow[_]=oe,i.directionalShadowMap[_]=ne,i.directionalShadowMatrix[_]=D.shadow.matrix,R++}i.directional[_]=J,_++}else if(D.isSpotLight){let J=t.get(D);J.position.setFromMatrixPosition(D.matrixWorld),J.color.copy(G).multiplyScalar(W*b),J.distance=te,J.coneCos=Math.cos(D.angle),J.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),J.decay=D.decay,i.spot[f]=J;let ee=D.shadow;if(D.map&&(i.spotLightMap[P]=D.map,P++,ee.updateMatrices(D),D.castShadow&&k++),i.spotLightMatrix[f]=ee.matrix,D.castShadow){let oe=n.get(D);oe.shadowBias=ee.bias,oe.shadowNormalBias=ee.normalBias,oe.shadowRadius=ee.radius,oe.shadowMapSize=ee.mapSize,i.spotShadow[f]=oe,i.spotShadowMap[f]=ne,L++}f++}else if(D.isRectAreaLight){let J=t.get(D);J.color.copy(G).multiplyScalar(W),J.halfWidth.set(D.width*.5,0,0),J.halfHeight.set(0,D.height*.5,0),i.rectArea[S]=J,S++}else if(D.isPointLight){let J=t.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity*b),J.distance=D.distance,J.decay=D.decay,D.castShadow){let ee=D.shadow,oe=n.get(D);oe.shadowBias=ee.bias,oe.shadowNormalBias=ee.normalBias,oe.shadowRadius=ee.radius,oe.shadowMapSize=ee.mapSize,oe.shadowCameraNear=ee.camera.near,oe.shadowCameraFar=ee.camera.far,i.pointShadow[m]=oe,i.pointShadowMap[m]=ne,i.pointShadowMatrix[m]=D.shadow.matrix,F++}i.point[m]=J,m++}else if(D.isHemisphereLight){let J=t.get(D);J.skyColor.copy(D.color).multiplyScalar(W*b),J.groundColor.copy(D.groundColor).multiplyScalar(W*b),i.hemi[y]=J,y++}}S>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=g;let H=i.hash;(H.directionalLength!==_||H.pointLength!==m||H.spotLength!==f||H.rectAreaLength!==S||H.hemiLength!==y||H.numDirectionalShadows!==R||H.numPointShadows!==F||H.numSpotShadows!==L||H.numSpotMaps!==P||H.numLightProbes!==M)&&(i.directional.length=_,i.spot.length=f,i.rectArea.length=S,i.point.length=m,i.hemi.length=y,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.pointShadow.length=F,i.pointShadowMap.length=F,i.spotShadow.length=L,i.spotShadowMap.length=L,i.directionalShadowMatrix.length=R,i.pointShadowMatrix.length=F,i.spotLightMatrix.length=L+P-k,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=k,i.numLightProbes=M,H.directionalLength=_,H.pointLength=m,H.spotLength=f,H.rectAreaLength=S,H.hemiLength=y,H.numDirectionalShadows=R,H.numPointShadows=F,H.numSpotShadows=L,H.numSpotMaps=P,H.numLightProbes=M,i.version=Iy++)}function l(h,u){let d=0,p=0,g=0,_=0,m=0,f=u.matrixWorldInverse;for(let S=0,y=h.length;S<y;S++){let R=h[S];if(R.isDirectionalLight){let F=i.directional[d];F.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),F.direction.sub(r),F.direction.transformDirection(f),d++}else if(R.isSpotLight){let F=i.spot[g];F.position.setFromMatrixPosition(R.matrixWorld),F.position.applyMatrix4(f),F.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),F.direction.sub(r),F.direction.transformDirection(f),g++}else if(R.isRectAreaLight){let F=i.rectArea[_];F.position.setFromMatrixPosition(R.matrixWorld),F.position.applyMatrix4(f),a.identity(),o.copy(R.matrixWorld),o.premultiply(f),a.extractRotation(o),F.halfWidth.set(R.width*.5,0,0),F.halfHeight.set(0,R.height*.5,0),F.halfWidth.applyMatrix4(a),F.halfHeight.applyMatrix4(a),_++}else if(R.isPointLight){let F=i.point[p];F.position.setFromMatrixPosition(R.matrixWorld),F.position.applyMatrix4(f),p++}else if(R.isHemisphereLight){let F=i.hemi[m];F.direction.setFromMatrixPosition(R.matrixWorld),F.direction.transformDirection(f),m++}}}return{setup:c,setupView:l,state:i}}function Td(s,e){let t=new Uy(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Ny(s,e){let t=new WeakMap;function n(r,o=0){let a=t.get(r),c;return a===void 0?(c=new Td(s,e),t.set(r,[c])):o>=a.length?(c=new Td(s,e),a.push(c)):c=a[o],c}function i(){t=new WeakMap}return{get:n,dispose:i}}var Er=class extends vn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ag,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Jc=class extends vn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Oy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function By(s,e,t){let n=new Sr,i=new Re,r=new Re,o=new Et,a=new Er({depthPacking:Rg}),c=new Jc,l={},h=t.maxTextureSize,u={[Ln]:dn,[dn]:Ln,[wn]:wn},d=new Nt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Re},radius:{value:4}},vertexShader:Oy,fragmentShader:Fy}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new qt;g.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ct(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oa;let f=this.type;this.render=function(L,P,k){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||L.length===0)return;let M=s.getRenderTarget(),b=s.getActiveCubeFace(),H=s.getActiveMipmapLevel(),X=s.state;X.setBlending(Vt),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);let ie=f!==li&&this.type===li,D=f===li&&this.type!==li;for(let G=0,W=L.length;G<W;G++){let te=L[G],ne=te.shadow;if(ne===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(ne.autoUpdate===!1&&ne.needsUpdate===!1)continue;i.copy(ne.mapSize);let J=ne.getFrameExtents();if(i.multiply(J),r.copy(ne.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/J.x),i.x=r.x*J.x,ne.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/J.y),i.y=r.y*J.y,ne.mapSize.y=r.y)),ne.map===null||ie===!0||D===!0){let oe=this.type!==li?{minFilter:It,magFilter:It}:{};ne.map!==null&&ne.map.dispose(),ne.map=new Xt(i.x,i.y,oe),ne.map.texture.name=te.name+".shadowMap",ne.camera.updateProjectionMatrix()}s.setRenderTarget(ne.map),s.clear();let ee=ne.getViewportCount();for(let oe=0;oe<ee;oe++){let he=ne.getViewport(oe);o.set(r.x*he.x,r.y*he.y,r.x*he.z,r.y*he.w),X.viewport(o),ne.updateMatrices(te,oe),n=ne.getFrustum(),R(P,k,ne.camera,te,this.type)}ne.isPointLightShadow!==!0&&this.type===li&&S(ne,k),ne.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(M,b,H)};function S(L,P){let k=e.update(_);d.defines.VSM_SAMPLES!==L.blurSamples&&(d.defines.VSM_SAMPLES=L.blurSamples,p.defines.VSM_SAMPLES=L.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new Xt(i.x,i.y)),d.uniforms.shadow_pass.value=L.map.texture,d.uniforms.resolution.value=L.mapSize,d.uniforms.radius.value=L.radius,s.setRenderTarget(L.mapPass),s.clear(),s.renderBufferDirect(P,null,k,d,_,null),p.uniforms.shadow_pass.value=L.mapPass.texture,p.uniforms.resolution.value=L.mapSize,p.uniforms.radius.value=L.radius,s.setRenderTarget(L.map),s.clear(),s.renderBufferDirect(P,null,k,p,_,null)}function y(L,P,k,M){let b=null,H=k.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(H!==void 0)b=H;else if(b=k.isPointLight===!0?c:a,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){let X=b.uuid,ie=P.uuid,D=l[X];D===void 0&&(D={},l[X]=D);let G=D[ie];G===void 0&&(G=b.clone(),D[ie]=G,P.addEventListener("dispose",F)),b=G}if(b.visible=P.visible,b.wireframe=P.wireframe,M===li?b.side=P.shadowSide!==null?P.shadowSide:P.side:b.side=P.shadowSide!==null?P.shadowSide:u[P.side],b.alphaMap=P.alphaMap,b.alphaTest=P.alphaTest,b.map=P.map,b.clipShadows=P.clipShadows,b.clippingPlanes=P.clippingPlanes,b.clipIntersection=P.clipIntersection,b.displacementMap=P.displacementMap,b.displacementScale=P.displacementScale,b.displacementBias=P.displacementBias,b.wireframeLinewidth=P.wireframeLinewidth,b.linewidth=P.linewidth,k.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let X=s.properties.get(b);X.light=k}return b}function R(L,P,k,M,b){if(L.visible===!1)return;if(L.layers.test(P.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&b===li)&&(!L.frustumCulled||n.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,L.matrixWorld);let ie=e.update(L),D=L.material;if(Array.isArray(D)){let G=ie.groups;for(let W=0,te=G.length;W<te;W++){let ne=G[W],J=D[ne.materialIndex];if(J&&J.visible){let ee=y(L,J,M,b);L.onBeforeShadow(s,L,P,k,ie,ee,ne),s.renderBufferDirect(k,null,ie,ee,L,ne),L.onAfterShadow(s,L,P,k,ie,ee,ne)}}}else if(D.visible){let G=y(L,D,M,b);L.onBeforeShadow(s,L,P,k,ie,G,null),s.renderBufferDirect(k,null,ie,G,L,null),L.onAfterShadow(s,L,P,k,ie,G,null)}}let X=L.children;for(let ie=0,D=X.length;ie<D;ie++)R(X[ie],P,k,M,b)}function F(L){L.target.removeEventListener("dispose",F);for(let k in l){let M=l[k],b=L.target.uuid;b in M&&(M[b].dispose(),delete M[b])}}}function zy(s,e,t){let n=t.isWebGL2;function i(){let z=!1,xe=new Et,ye=null,qe=new Et(0,0,0,0);return{setMask:function(ke){ye!==ke&&!z&&(s.colorMask(ke,ke,ke,ke),ye=ke)},setLocked:function(ke){z=ke},setClear:function(ke,lt,ut,Ft,Qt){Qt===!0&&(ke*=Ft,lt*=Ft,ut*=Ft),xe.set(ke,lt,ut,Ft),qe.equals(xe)===!1&&(s.clearColor(ke,lt,ut,Ft),qe.copy(xe))},reset:function(){z=!1,ye=null,qe.set(-1,0,0,0)}}}function r(){let z=!1,xe=null,ye=null,qe=null;return{setTest:function(ke){ke?Ge(s.DEPTH_TEST):Ne(s.DEPTH_TEST)},setMask:function(ke){xe!==ke&&!z&&(s.depthMask(ke),xe=ke)},setFunc:function(ke){if(ye!==ke){switch(ke){case cg:s.depthFunc(s.NEVER);break;case lg:s.depthFunc(s.ALWAYS);break;case hg:s.depthFunc(s.LESS);break;case Po:s.depthFunc(s.LEQUAL);break;case ug:s.depthFunc(s.EQUAL);break;case dg:s.depthFunc(s.GEQUAL);break;case fg:s.depthFunc(s.GREATER);break;case pg:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ye=ke}},setLocked:function(ke){z=ke},setClear:function(ke){qe!==ke&&(s.clearDepth(ke),qe=ke)},reset:function(){z=!1,xe=null,ye=null,qe=null}}}function o(){let z=!1,xe=null,ye=null,qe=null,ke=null,lt=null,ut=null,Ft=null,Qt=null;return{setTest:function(xt){z||(xt?Ge(s.STENCIL_TEST):Ne(s.STENCIL_TEST))},setMask:function(xt){xe!==xt&&!z&&(s.stencilMask(xt),xe=xt)},setFunc:function(xt,en,Rn){(ye!==xt||qe!==en||ke!==Rn)&&(s.stencilFunc(xt,en,Rn),ye=xt,qe=en,ke=Rn)},setOp:function(xt,en,Rn){(lt!==xt||ut!==en||Ft!==Rn)&&(s.stencilOp(xt,en,Rn),lt=xt,ut=en,Ft=Rn)},setLocked:function(xt){z=xt},setClear:function(xt){Qt!==xt&&(s.clearStencil(xt),Qt=xt)},reset:function(){z=!1,xe=null,ye=null,qe=null,ke=null,lt=null,ut=null,Ft=null,Qt=null}}}let a=new i,c=new r,l=new o,h=new WeakMap,u=new WeakMap,d={},p={},g=new WeakMap,_=[],m=null,f=!1,S=null,y=null,R=null,F=null,L=null,P=null,k=null,M=new Ie(0,0,0),b=0,H=!1,X=null,ie=null,D=null,G=null,W=null,te=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ne=!1,J=0,ee=s.getParameter(s.VERSION);ee.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(ee)[1]),ne=J>=1):ee.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),ne=J>=2);let oe=null,he={},K=s.getParameter(s.SCISSOR_BOX),se=s.getParameter(s.VIEWPORT),Se=new Et().fromArray(K),_e=new Et().fromArray(se);function Te(z,xe,ye,qe){let ke=new Uint8Array(4),lt=s.createTexture();s.bindTexture(z,lt),s.texParameteri(z,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(z,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ut=0;ut<ye;ut++)n&&(z===s.TEXTURE_3D||z===s.TEXTURE_2D_ARRAY)?s.texImage3D(xe,0,s.RGBA,1,1,qe,0,s.RGBA,s.UNSIGNED_BYTE,ke):s.texImage2D(xe+ut,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ke);return lt}let Ue={};Ue[s.TEXTURE_2D]=Te(s.TEXTURE_2D,s.TEXTURE_2D,1),Ue[s.TEXTURE_CUBE_MAP]=Te(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ue[s.TEXTURE_2D_ARRAY]=Te(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ue[s.TEXTURE_3D]=Te(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Ge(s.DEPTH_TEST),c.setFunc(Po),Ze(!1),T(ou),Ge(s.CULL_FACE),De(Vt);function Ge(z){d[z]!==!0&&(s.enable(z),d[z]=!0)}function Ne(z){d[z]!==!1&&(s.disable(z),d[z]=!1)}function tt(z,xe){return p[z]!==xe?(s.bindFramebuffer(z,xe),p[z]=xe,n&&(z===s.DRAW_FRAMEBUFFER&&(p[s.FRAMEBUFFER]=xe),z===s.FRAMEBUFFER&&(p[s.DRAW_FRAMEBUFFER]=xe)),!0):!1}function Z(z,xe){let ye=_,qe=!1;if(z)if(ye=g.get(xe),ye===void 0&&(ye=[],g.set(xe,ye)),z.isWebGLMultipleRenderTargets){let ke=z.texture;if(ye.length!==ke.length||ye[0]!==s.COLOR_ATTACHMENT0){for(let lt=0,ut=ke.length;lt<ut;lt++)ye[lt]=s.COLOR_ATTACHMENT0+lt;ye.length=ke.length,qe=!0}}else ye[0]!==s.COLOR_ATTACHMENT0&&(ye[0]=s.COLOR_ATTACHMENT0,qe=!0);else ye[0]!==s.BACK&&(ye[0]=s.BACK,qe=!0);qe&&(t.isWebGL2?s.drawBuffers(ye):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ye))}function At(z){return m!==z?(s.useProgram(z),m=z,!0):!1}let Oe={[Pn]:s.FUNC_ADD,[$m]:s.FUNC_SUBTRACT,[jm]:s.FUNC_REVERSE_SUBTRACT};if(n)Oe[hu]=s.MIN,Oe[uu]=s.MAX;else{let z=e.get("EXT_blend_minmax");z!==null&&(Oe[hu]=z.MIN_EXT,Oe[uu]=z.MAX_EXT)}let We={[Ks]:s.ZERO,[Jm]:s.ONE,[Qm]:s.SRC_COLOR,[Nc]:s.SRC_ALPHA,[ig]:s.SRC_ALPHA_SATURATE,[ca]:s.DST_COLOR,[aa]:s.DST_ALPHA,[eg]:s.ONE_MINUS_SRC_COLOR,[Oc]:s.ONE_MINUS_SRC_ALPHA,[ng]:s.ONE_MINUS_DST_COLOR,[tg]:s.ONE_MINUS_DST_ALPHA,[sg]:s.CONSTANT_COLOR,[rg]:s.ONE_MINUS_CONSTANT_COLOR,[og]:s.CONSTANT_ALPHA,[ag]:s.ONE_MINUS_CONSTANT_ALPHA};function De(z,xe,ye,qe,ke,lt,ut,Ft,Qt,xt){if(z===Vt){f===!0&&(Ne(s.BLEND),f=!1);return}if(f===!1&&(Ge(s.BLEND),f=!0),z!==ml){if(z!==S||xt!==H){if((y!==Pn||L!==Pn)&&(s.blendEquation(s.FUNC_ADD),y=Pn,L=Pn),xt)switch(z){case Ds:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case au:s.blendFunc(s.ONE,s.ONE);break;case cu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case lu:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Ds:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case au:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case cu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case lu:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}R=null,F=null,P=null,k=null,M.set(0,0,0),b=0,S=z,H=xt}return}ke=ke||xe,lt=lt||ye,ut=ut||qe,(xe!==y||ke!==L)&&(s.blendEquationSeparate(Oe[xe],Oe[ke]),y=xe,L=ke),(ye!==R||qe!==F||lt!==P||ut!==k)&&(s.blendFuncSeparate(We[ye],We[qe],We[lt],We[ut]),R=ye,F=qe,P=lt,k=ut),(Ft.equals(M)===!1||Qt!==b)&&(s.blendColor(Ft.r,Ft.g,Ft.b,Qt),M.copy(Ft),b=Qt),S=z,H=!1}function gt(z,xe){z.side===wn?Ne(s.CULL_FACE):Ge(s.CULL_FACE);let ye=z.side===dn;xe&&(ye=!ye),Ze(ye),z.blending===Ds&&z.transparent===!1?De(Vt):De(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),c.setFunc(z.depthFunc),c.setTest(z.depthTest),c.setMask(z.depthWrite),a.setMask(z.colorWrite);let qe=z.stencilWrite;l.setTest(qe),qe&&(l.setMask(z.stencilWriteMask),l.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),l.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),$(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?Ge(s.SAMPLE_ALPHA_TO_COVERAGE):Ne(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ze(z){X!==z&&(z?s.frontFace(s.CW):s.frontFace(s.CCW),X=z)}function T(z){z!==Ym?(Ge(s.CULL_FACE),z!==ie&&(z===ou?s.cullFace(s.BACK):z===Zm?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ne(s.CULL_FACE),ie=z}function E(z){z!==D&&(ne&&s.lineWidth(z),D=z)}function $(z,xe,ye){z?(Ge(s.POLYGON_OFFSET_FILL),(G!==xe||W!==ye)&&(s.polygonOffset(xe,ye),G=xe,W=ye)):Ne(s.POLYGON_OFFSET_FILL)}function fe(z){z?Ge(s.SCISSOR_TEST):Ne(s.SCISSOR_TEST)}function le(z){z===void 0&&(z=s.TEXTURE0+te-1),oe!==z&&(s.activeTexture(z),oe=z)}function de(z,xe,ye){ye===void 0&&(oe===null?ye=s.TEXTURE0+te-1:ye=oe);let qe=he[ye];qe===void 0&&(qe={type:void 0,texture:void 0},he[ye]=qe),(qe.type!==z||qe.texture!==xe)&&(oe!==ye&&(s.activeTexture(ye),oe=ye),s.bindTexture(z,xe||Ue[z]),qe.type=z,qe.texture=xe)}function Pe(){let z=he[oe];z!==void 0&&z.type!==void 0&&(s.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function we(){try{s.compressedTexImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ae(){try{s.compressedTexImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Fe(){try{s.texSubImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Xe(){try{s.texSubImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ce(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Je(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function I(){try{s.texStorage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function re(){try{s.texStorage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function pe(){try{s.texImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ge(){try{s.texImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Le(z){Se.equals(z)===!1&&(s.scissor(z.x,z.y,z.z,z.w),Se.copy(z))}function ze(z){_e.equals(z)===!1&&(s.viewport(z.x,z.y,z.z,z.w),_e.copy(z))}function Be(z,xe){let ye=u.get(xe);ye===void 0&&(ye=new WeakMap,u.set(xe,ye));let qe=ye.get(z);qe===void 0&&(qe=s.getUniformBlockIndex(xe,z.name),ye.set(z,qe))}function Ke(z,xe){let qe=u.get(xe).get(z);h.get(xe)!==qe&&(s.uniformBlockBinding(xe,qe,z.__bindingPointIndex),h.set(xe,qe))}function q(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},oe=null,he={},p={},g=new WeakMap,_=[],m=null,f=!1,S=null,y=null,R=null,F=null,L=null,P=null,k=null,M=new Ie(0,0,0),b=0,H=!1,X=null,ie=null,D=null,G=null,W=null,Se.set(0,0,s.canvas.width,s.canvas.height),_e.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Ge,disable:Ne,bindFramebuffer:tt,drawBuffers:Z,useProgram:At,setBlending:De,setMaterial:gt,setFlipSided:Ze,setCullFace:T,setLineWidth:E,setPolygonOffset:$,setScissorTest:fe,activeTexture:le,bindTexture:de,unbindTexture:Pe,compressedTexImage2D:we,compressedTexImage3D:Ae,texImage2D:pe,texImage3D:ge,updateUBOMapping:Be,uniformBlockBinding:Ke,texStorage2D:I,texStorage3D:re,texSubImage2D:Fe,texSubImage3D:Xe,compressedTexSubImage2D:ce,compressedTexSubImage3D:Je,scissor:Le,viewport:ze,reset:q}}function ky(s,e,t,n,i,r,o){let a=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,E){return p?new OffscreenCanvas(T,E):xr("canvas")}function _(T,E,$,fe){let le=1;if((T.width>fe||T.height>fe)&&(le=fe/Math.max(T.width,T.height)),le<1||E===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){let de=E?Oo:Math.floor,Pe=de(le*T.width),we=de(le*T.height);u===void 0&&(u=g(Pe,we));let Ae=$?g(Pe,we):u;return Ae.width=Pe,Ae.height=we,Ae.getContext("2d").drawImage(T,0,0,Pe,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+Pe+"x"+we+")."),Ae}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function m(T){return Hc(T.width)&&Hc(T.height)}function f(T){return a?!1:T.wrapS!==Ot||T.wrapT!==Ot||T.minFilter!==It&&T.minFilter!==bt}function S(T,E){return T.generateMipmaps&&E&&T.minFilter!==It&&T.minFilter!==bt}function y(T){s.generateMipmap(T)}function R(T,E,$,fe,le=!1){if(a===!1)return E;if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let de=E;if(E===s.RED&&($===s.FLOAT&&(de=s.R32F),$===s.HALF_FLOAT&&(de=s.R16F),$===s.UNSIGNED_BYTE&&(de=s.R8)),E===s.RED_INTEGER&&($===s.UNSIGNED_BYTE&&(de=s.R8UI),$===s.UNSIGNED_SHORT&&(de=s.R16UI),$===s.UNSIGNED_INT&&(de=s.R32UI),$===s.BYTE&&(de=s.R8I),$===s.SHORT&&(de=s.R16I),$===s.INT&&(de=s.R32I)),E===s.RG&&($===s.FLOAT&&(de=s.RG32F),$===s.HALF_FLOAT&&(de=s.RG16F),$===s.UNSIGNED_BYTE&&(de=s.RG8)),E===s.RGBA){let Pe=le?Io:ft.getTransfer(fe);$===s.FLOAT&&(de=s.RGBA32F),$===s.HALF_FLOAT&&(de=s.RGBA16F),$===s.UNSIGNED_BYTE&&(de=Pe===St?s.SRGB8_ALPHA8:s.RGBA8),$===s.UNSIGNED_SHORT_4_4_4_4&&(de=s.RGBA4),$===s.UNSIGNED_SHORT_5_5_5_1&&(de=s.RGB5_A1)}return(de===s.R16F||de===s.R32F||de===s.RG16F||de===s.RG32F||de===s.RGBA16F||de===s.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function F(T,E,$){return S(T,$)===!0||T.isFramebufferTexture&&T.minFilter!==It&&T.minFilter!==bt?Math.log2(Math.max(E.width,E.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?E.mipmaps.length:1}function L(T){return T===It||T===Lo||T===fr?s.NEAREST:s.LINEAR}function P(T){let E=T.target;E.removeEventListener("dispose",P),M(E),E.isVideoTexture&&h.delete(E)}function k(T){let E=T.target;E.removeEventListener("dispose",k),H(E)}function M(T){let E=n.get(T);if(E.__webglInit===void 0)return;let $=T.source,fe=d.get($);if(fe){let le=fe[E.__cacheKey];le.usedTimes--,le.usedTimes===0&&b(T),Object.keys(fe).length===0&&d.delete($)}n.remove(T)}function b(T){let E=n.get(T);s.deleteTexture(E.__webglTexture);let $=T.source,fe=d.get($);delete fe[E.__cacheKey],o.memory.textures--}function H(T){let E=T.texture,$=n.get(T),fe=n.get(E);if(fe.__webglTexture!==void 0&&(s.deleteTexture(fe.__webglTexture),o.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray($.__webglFramebuffer[le]))for(let de=0;de<$.__webglFramebuffer[le].length;de++)s.deleteFramebuffer($.__webglFramebuffer[le][de]);else s.deleteFramebuffer($.__webglFramebuffer[le]);$.__webglDepthbuffer&&s.deleteRenderbuffer($.__webglDepthbuffer[le])}else{if(Array.isArray($.__webglFramebuffer))for(let le=0;le<$.__webglFramebuffer.length;le++)s.deleteFramebuffer($.__webglFramebuffer[le]);else s.deleteFramebuffer($.__webglFramebuffer);if($.__webglDepthbuffer&&s.deleteRenderbuffer($.__webglDepthbuffer),$.__webglMultisampledFramebuffer&&s.deleteFramebuffer($.__webglMultisampledFramebuffer),$.__webglColorRenderbuffer)for(let le=0;le<$.__webglColorRenderbuffer.length;le++)$.__webglColorRenderbuffer[le]&&s.deleteRenderbuffer($.__webglColorRenderbuffer[le]);$.__webglDepthRenderbuffer&&s.deleteRenderbuffer($.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let le=0,de=E.length;le<de;le++){let Pe=n.get(E[le]);Pe.__webglTexture&&(s.deleteTexture(Pe.__webglTexture),o.memory.textures--),n.remove(E[le])}n.remove(E),n.remove(T)}let X=0;function ie(){X=0}function D(){let T=X;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),X+=1,T}function G(T){let E=[];return E.push(T.wrapS),E.push(T.wrapT),E.push(T.wrapR||0),E.push(T.magFilter),E.push(T.minFilter),E.push(T.anisotropy),E.push(T.internalFormat),E.push(T.format),E.push(T.type),E.push(T.generateMipmaps),E.push(T.premultiplyAlpha),E.push(T.flipY),E.push(T.unpackAlignment),E.push(T.colorSpace),E.join()}function W(T,E){let $=n.get(T);if(T.isVideoTexture&&gt(T),T.isRenderTargetTexture===!1&&T.version>0&&$.__version!==T.version){let fe=T.image;if(fe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(fe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Se($,T,E);return}}t.bindTexture(s.TEXTURE_2D,$.__webglTexture,s.TEXTURE0+E)}function te(T,E){let $=n.get(T);if(T.version>0&&$.__version!==T.version){Se($,T,E);return}t.bindTexture(s.TEXTURE_2D_ARRAY,$.__webglTexture,s.TEXTURE0+E)}function ne(T,E){let $=n.get(T);if(T.version>0&&$.__version!==T.version){Se($,T,E);return}t.bindTexture(s.TEXTURE_3D,$.__webglTexture,s.TEXTURE0+E)}function J(T,E){let $=n.get(T);if(T.version>0&&$.__version!==T.version){_e($,T,E);return}t.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture,s.TEXTURE0+E)}let ee={[Gt]:s.REPEAT,[Ot]:s.CLAMP_TO_EDGE,[_r]:s.MIRRORED_REPEAT},oe={[It]:s.NEAREST,[Lo]:s.NEAREST_MIPMAP_NEAREST,[fr]:s.NEAREST_MIPMAP_LINEAR,[bt]:s.LINEAR,[_l]:s.LINEAR_MIPMAP_NEAREST,[Vn]:s.LINEAR_MIPMAP_LINEAR},he={[Pg]:s.NEVER,[Og]:s.ALWAYS,[Lg]:s.LESS,[of]:s.LEQUAL,[Ig]:s.EQUAL,[Ng]:s.GEQUAL,[Dg]:s.GREATER,[Ug]:s.NOTEQUAL};function K(T,E,$){if($?(s.texParameteri(T,s.TEXTURE_WRAP_S,ee[E.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,ee[E.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,ee[E.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,oe[E.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,oe[E.minFilter])):(s.texParameteri(T,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(T,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(E.wrapS!==Ot||E.wrapT!==Ot)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(T,s.TEXTURE_MAG_FILTER,L(E.magFilter)),s.texParameteri(T,s.TEXTURE_MIN_FILTER,L(E.minFilter)),E.minFilter!==It&&E.minFilter!==bt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,he[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let fe=e.get("EXT_texture_filter_anisotropic");if(E.magFilter===It||E.minFilter!==fr&&E.minFilter!==Vn||E.type===nn&&e.has("OES_texture_float_linear")===!1||a===!1&&E.type===Dt&&e.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||n.get(E).__currentAnisotropy)&&(s.texParameterf(T,fe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy)}}function se(T,E){let $=!1;T.__webglInit===void 0&&(T.__webglInit=!0,E.addEventListener("dispose",P));let fe=E.source,le=d.get(fe);le===void 0&&(le={},d.set(fe,le));let de=G(E);if(de!==T.__cacheKey){le[de]===void 0&&(le[de]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,$=!0),le[de].usedTimes++;let Pe=le[T.__cacheKey];Pe!==void 0&&(le[T.__cacheKey].usedTimes--,Pe.usedTimes===0&&b(E)),T.__cacheKey=de,T.__webglTexture=le[de].texture}return $}function Se(T,E,$){let fe=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(fe=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(fe=s.TEXTURE_3D);let le=se(T,E),de=E.source;t.bindTexture(fe,T.__webglTexture,s.TEXTURE0+$);let Pe=n.get(de);if(de.version!==Pe.__version||le===!0){t.activeTexture(s.TEXTURE0+$);let we=ft.getPrimaries(ft.workingColorSpace),Ae=E.colorSpace===un?null:ft.getPrimaries(E.colorSpace),Fe=E.colorSpace===un||we===Ae?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);let Xe=f(E)&&m(E.image)===!1,ce=_(E.image,Xe,!1,i.maxTextureSize);ce=Ze(E,ce);let Je=m(ce)||a,I=r.convert(E.format,E.colorSpace),re=r.convert(E.type),pe=R(E.internalFormat,I,re,E.colorSpace,E.isVideoTexture);K(fe,E,Je);let ge,Le=E.mipmaps,ze=a&&E.isVideoTexture!==!0&&pe!==nf,Be=Pe.__version===void 0||le===!0,Ke=F(E,ce,Je);if(E.isDepthTexture)pe=s.DEPTH_COMPONENT,a?E.type===nn?pe=s.DEPTH_COMPONENT32F:E.type===Ai?pe=s.DEPTH_COMPONENT24:E.type===di?pe=s.DEPTH24_STENCIL8:pe=s.DEPTH_COMPONENT16:E.type===nn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===Qi&&pe===s.DEPTH_COMPONENT&&E.type!==xl&&E.type!==Ai&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=Ai,re=r.convert(E.type)),E.format===Ci&&pe===s.DEPTH_COMPONENT&&(pe=s.DEPTH_STENCIL,E.type!==di&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=di,re=r.convert(E.type))),Be&&(ze?t.texStorage2D(s.TEXTURE_2D,1,pe,ce.width,ce.height):t.texImage2D(s.TEXTURE_2D,0,pe,ce.width,ce.height,0,I,re,null));else if(E.isDataTexture)if(Le.length>0&&Je){ze&&Be&&t.texStorage2D(s.TEXTURE_2D,Ke,pe,Le[0].width,Le[0].height);for(let q=0,z=Le.length;q<z;q++)ge=Le[q],ze?t.texSubImage2D(s.TEXTURE_2D,q,0,0,ge.width,ge.height,I,re,ge.data):t.texImage2D(s.TEXTURE_2D,q,pe,ge.width,ge.height,0,I,re,ge.data);E.generateMipmaps=!1}else ze?(Be&&t.texStorage2D(s.TEXTURE_2D,Ke,pe,ce.width,ce.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,ce.width,ce.height,I,re,ce.data)):t.texImage2D(s.TEXTURE_2D,0,pe,ce.width,ce.height,0,I,re,ce.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ze&&Be&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ke,pe,Le[0].width,Le[0].height,ce.depth);for(let q=0,z=Le.length;q<z;q++)ge=Le[q],E.format!==hn?I!==null?ze?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,ge.width,ge.height,ce.depth,I,ge.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,q,pe,ge.width,ge.height,ce.depth,0,ge.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?t.texSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,ge.width,ge.height,ce.depth,I,re,ge.data):t.texImage3D(s.TEXTURE_2D_ARRAY,q,pe,ge.width,ge.height,ce.depth,0,I,re,ge.data)}else{ze&&Be&&t.texStorage2D(s.TEXTURE_2D,Ke,pe,Le[0].width,Le[0].height);for(let q=0,z=Le.length;q<z;q++)ge=Le[q],E.format!==hn?I!==null?ze?t.compressedTexSubImage2D(s.TEXTURE_2D,q,0,0,ge.width,ge.height,I,ge.data):t.compressedTexImage2D(s.TEXTURE_2D,q,pe,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?t.texSubImage2D(s.TEXTURE_2D,q,0,0,ge.width,ge.height,I,re,ge.data):t.texImage2D(s.TEXTURE_2D,q,pe,ge.width,ge.height,0,I,re,ge.data)}else if(E.isDataArrayTexture)ze?(Be&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ke,pe,ce.width,ce.height,ce.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,I,re,ce.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,pe,ce.width,ce.height,ce.depth,0,I,re,ce.data);else if(E.isData3DTexture)ze?(Be&&t.texStorage3D(s.TEXTURE_3D,Ke,pe,ce.width,ce.height,ce.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,I,re,ce.data)):t.texImage3D(s.TEXTURE_3D,0,pe,ce.width,ce.height,ce.depth,0,I,re,ce.data);else if(E.isFramebufferTexture){if(Be)if(ze)t.texStorage2D(s.TEXTURE_2D,Ke,pe,ce.width,ce.height);else{let q=ce.width,z=ce.height;for(let xe=0;xe<Ke;xe++)t.texImage2D(s.TEXTURE_2D,xe,pe,q,z,0,I,re,null),q>>=1,z>>=1}}else if(Le.length>0&&Je){ze&&Be&&t.texStorage2D(s.TEXTURE_2D,Ke,pe,Le[0].width,Le[0].height);for(let q=0,z=Le.length;q<z;q++)ge=Le[q],ze?t.texSubImage2D(s.TEXTURE_2D,q,0,0,I,re,ge):t.texImage2D(s.TEXTURE_2D,q,pe,I,re,ge);E.generateMipmaps=!1}else ze?(Be&&t.texStorage2D(s.TEXTURE_2D,Ke,pe,ce.width,ce.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,I,re,ce)):t.texImage2D(s.TEXTURE_2D,0,pe,I,re,ce);S(E,Je)&&y(fe),Pe.__version=de.version,E.onUpdate&&E.onUpdate(E)}T.__version=E.version}function _e(T,E,$){if(E.image.length!==6)return;let fe=se(T,E),le=E.source;t.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+$);let de=n.get(le);if(le.version!==de.__version||fe===!0){t.activeTexture(s.TEXTURE0+$);let Pe=ft.getPrimaries(ft.workingColorSpace),we=E.colorSpace===un?null:ft.getPrimaries(E.colorSpace),Ae=E.colorSpace===un||Pe===we?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let Fe=E.isCompressedTexture||E.image[0].isCompressedTexture,Xe=E.image[0]&&E.image[0].isDataTexture,ce=[];for(let q=0;q<6;q++)!Fe&&!Xe?ce[q]=_(E.image[q],!1,!0,i.maxCubemapSize):ce[q]=Xe?E.image[q].image:E.image[q],ce[q]=Ze(E,ce[q]);let Je=ce[0],I=m(Je)||a,re=r.convert(E.format,E.colorSpace),pe=r.convert(E.type),ge=R(E.internalFormat,re,pe,E.colorSpace),Le=a&&E.isVideoTexture!==!0,ze=de.__version===void 0||fe===!0,Be=F(E,Je,I);K(s.TEXTURE_CUBE_MAP,E,I);let Ke;if(Fe){Le&&ze&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Be,ge,Je.width,Je.height);for(let q=0;q<6;q++){Ke=ce[q].mipmaps;for(let z=0;z<Ke.length;z++){let xe=Ke[z];E.format!==hn?re!==null?Le?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z,0,0,xe.width,xe.height,re,xe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z,ge,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Le?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z,0,0,xe.width,xe.height,re,pe,xe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z,ge,xe.width,xe.height,0,re,pe,xe.data)}}}else{Ke=E.mipmaps,Le&&ze&&(Ke.length>0&&Be++,t.texStorage2D(s.TEXTURE_CUBE_MAP,Be,ge,ce[0].width,ce[0].height));for(let q=0;q<6;q++)if(Xe){Le?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ce[q].width,ce[q].height,re,pe,ce[q].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,ge,ce[q].width,ce[q].height,0,re,pe,ce[q].data);for(let z=0;z<Ke.length;z++){let ye=Ke[z].image[q].image;Le?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z+1,0,0,ye.width,ye.height,re,pe,ye.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z+1,ge,ye.width,ye.height,0,re,pe,ye.data)}}else{Le?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,re,pe,ce[q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,ge,re,pe,ce[q]);for(let z=0;z<Ke.length;z++){let xe=Ke[z];Le?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z+1,0,0,re,pe,xe.image[q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z+1,ge,re,pe,xe.image[q])}}}S(E,I)&&y(s.TEXTURE_CUBE_MAP),de.__version=le.version,E.onUpdate&&E.onUpdate(E)}T.__version=E.version}function Te(T,E,$,fe,le,de){let Pe=r.convert($.format,$.colorSpace),we=r.convert($.type),Ae=R($.internalFormat,Pe,we,$.colorSpace);if(!n.get(E).__hasExternalTextures){let Xe=Math.max(1,E.width>>de),ce=Math.max(1,E.height>>de);le===s.TEXTURE_3D||le===s.TEXTURE_2D_ARRAY?t.texImage3D(le,de,Ae,Xe,ce,E.depth,0,Pe,we,null):t.texImage2D(le,de,Ae,Xe,ce,0,Pe,we,null)}t.bindFramebuffer(s.FRAMEBUFFER,T),De(E)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,fe,le,n.get($).__webglTexture,0,We(E)):(le===s.TEXTURE_2D||le>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,fe,le,n.get($).__webglTexture,de),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ue(T,E,$){if(s.bindRenderbuffer(s.RENDERBUFFER,T),E.depthBuffer&&!E.stencilBuffer){let fe=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if($||De(E)){let le=E.depthTexture;le&&le.isDepthTexture&&(le.type===nn?fe=s.DEPTH_COMPONENT32F:le.type===Ai&&(fe=s.DEPTH_COMPONENT24));let de=We(E);De(E)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,de,fe,E.width,E.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,de,fe,E.width,E.height)}else s.renderbufferStorage(s.RENDERBUFFER,fe,E.width,E.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,T)}else if(E.depthBuffer&&E.stencilBuffer){let fe=We(E);$&&De(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,fe,s.DEPTH24_STENCIL8,E.width,E.height):De(E)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,fe,s.DEPTH24_STENCIL8,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,T)}else{let fe=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let le=0;le<fe.length;le++){let de=fe[le],Pe=r.convert(de.format,de.colorSpace),we=r.convert(de.type),Ae=R(de.internalFormat,Pe,we,de.colorSpace),Fe=We(E);$&&De(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Fe,Ae,E.width,E.height):De(E)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Fe,Ae,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,Ae,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ge(T,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,T),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),W(E.depthTexture,0);let fe=n.get(E.depthTexture).__webglTexture,le=We(E);if(E.depthTexture.format===Qi)De(E)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,fe,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,fe,0);else if(E.depthTexture.format===Ci)De(E)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,fe,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,fe,0);else throw new Error("Unknown depthTexture format")}function Ne(T){let E=n.get(T),$=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!E.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");Ge(E.__webglFramebuffer,T)}else if($){E.__webglDepthbuffer=[];for(let fe=0;fe<6;fe++)t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[fe]),E.__webglDepthbuffer[fe]=s.createRenderbuffer(),Ue(E.__webglDepthbuffer[fe],T,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=s.createRenderbuffer(),Ue(E.__webglDepthbuffer,T,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function tt(T,E,$){let fe=n.get(T);E!==void 0&&Te(fe.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),$!==void 0&&Ne(T)}function Z(T){let E=T.texture,$=n.get(T),fe=n.get(E);T.addEventListener("dispose",k),T.isWebGLMultipleRenderTargets!==!0&&(fe.__webglTexture===void 0&&(fe.__webglTexture=s.createTexture()),fe.__version=E.version,o.memory.textures++);let le=T.isWebGLCubeRenderTarget===!0,de=T.isWebGLMultipleRenderTargets===!0,Pe=m(T)||a;if(le){$.__webglFramebuffer=[];for(let we=0;we<6;we++)if(a&&E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer[we]=[];for(let Ae=0;Ae<E.mipmaps.length;Ae++)$.__webglFramebuffer[we][Ae]=s.createFramebuffer()}else $.__webglFramebuffer[we]=s.createFramebuffer()}else{if(a&&E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer=[];for(let we=0;we<E.mipmaps.length;we++)$.__webglFramebuffer[we]=s.createFramebuffer()}else $.__webglFramebuffer=s.createFramebuffer();if(de)if(i.drawBuffers){let we=T.texture;for(let Ae=0,Fe=we.length;Ae<Fe;Ae++){let Xe=n.get(we[Ae]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&T.samples>0&&De(T)===!1){let we=de?E:[E];$.__webglMultisampledFramebuffer=s.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let Ae=0;Ae<we.length;Ae++){let Fe=we[Ae];$.__webglColorRenderbuffer[Ae]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,$.__webglColorRenderbuffer[Ae]);let Xe=r.convert(Fe.format,Fe.colorSpace),ce=r.convert(Fe.type),Je=R(Fe.internalFormat,Xe,ce,Fe.colorSpace,T.isXRRenderTarget===!0),I=We(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,I,Je,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,$.__webglColorRenderbuffer[Ae])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&($.__webglDepthRenderbuffer=s.createRenderbuffer(),Ue($.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(le){t.bindTexture(s.TEXTURE_CUBE_MAP,fe.__webglTexture),K(s.TEXTURE_CUBE_MAP,E,Pe);for(let we=0;we<6;we++)if(a&&E.mipmaps&&E.mipmaps.length>0)for(let Ae=0;Ae<E.mipmaps.length;Ae++)Te($.__webglFramebuffer[we][Ae],T,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ae);else Te($.__webglFramebuffer[we],T,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0);S(E,Pe)&&y(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){let we=T.texture;for(let Ae=0,Fe=we.length;Ae<Fe;Ae++){let Xe=we[Ae],ce=n.get(Xe);t.bindTexture(s.TEXTURE_2D,ce.__webglTexture),K(s.TEXTURE_2D,Xe,Pe),Te($.__webglFramebuffer,T,Xe,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,0),S(Xe,Pe)&&y(s.TEXTURE_2D)}t.unbindTexture()}else{let we=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(a?we=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(we,fe.__webglTexture),K(we,E,Pe),a&&E.mipmaps&&E.mipmaps.length>0)for(let Ae=0;Ae<E.mipmaps.length;Ae++)Te($.__webglFramebuffer[Ae],T,E,s.COLOR_ATTACHMENT0,we,Ae);else Te($.__webglFramebuffer,T,E,s.COLOR_ATTACHMENT0,we,0);S(E,Pe)&&y(we),t.unbindTexture()}T.depthBuffer&&Ne(T)}function At(T){let E=m(T)||a,$=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let fe=0,le=$.length;fe<le;fe++){let de=$[fe];if(S(de,E)){let Pe=T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,we=n.get(de).__webglTexture;t.bindTexture(Pe,we),y(Pe),t.unbindTexture()}}}function Oe(T){if(a&&T.samples>0&&De(T)===!1){let E=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],$=T.width,fe=T.height,le=s.COLOR_BUFFER_BIT,de=[],Pe=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,we=n.get(T),Ae=T.isWebGLMultipleRenderTargets===!0;if(Ae)for(let Fe=0;Fe<E.length;Fe++)t.bindFramebuffer(s.FRAMEBUFFER,we.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,we.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Fe=0;Fe<E.length;Fe++){de.push(s.COLOR_ATTACHMENT0+Fe),T.depthBuffer&&de.push(Pe);let Xe=we.__ignoreDepthValues!==void 0?we.__ignoreDepthValues:!1;if(Xe===!1&&(T.depthBuffer&&(le|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&(le|=s.STENCIL_BUFFER_BIT)),Ae&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,we.__webglColorRenderbuffer[Fe]),Xe===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Pe]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Pe])),Ae){let ce=n.get(E[Fe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ce,0)}s.blitFramebuffer(0,0,$,fe,0,0,$,fe,le,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,de)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Ae)for(let Fe=0;Fe<E.length;Fe++){t.bindFramebuffer(s.FRAMEBUFFER,we.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,we.__webglColorRenderbuffer[Fe]);let Xe=n.get(E[Fe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,we.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,Xe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}}function We(T){return Math.min(i.maxSamples,T.samples)}function De(T){let E=n.get(T);return a&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function gt(T){let E=o.render.frame;h.get(T)!==E&&(h.set(T,E),T.update())}function Ze(T,E){let $=T.colorSpace,fe=T.format,le=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===kc||$!==Tt&&$!==un&&(ft.getTransfer($)===St?a===!1?e.has("EXT_sRGB")===!0&&fe===hn?(T.format=kc,T.minFilter=bt,T.generateMipmaps=!1):E=Fo.sRGBToLinear(E):(fe!==hn||le!==Kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),E}this.allocateTextureUnit=D,this.resetTextureUnits=ie,this.setTexture2D=W,this.setTexture2DArray=te,this.setTexture3D=ne,this.setTextureCube=J,this.rebindTextures=tt,this.setupRenderTarget=Z,this.updateRenderTargetMipmap=At,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=De}function Hy(s,e,t){let n=t.isWebGL2;function i(r,o=un){let a,c=ft.getTransfer(o);if(r===Kn)return s.UNSIGNED_BYTE;if(r===jd)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Jd)return s.UNSIGNED_SHORT_5_5_5_1;if(r===xg)return s.BYTE;if(r===yg)return s.SHORT;if(r===xl)return s.UNSIGNED_SHORT;if(r===$d)return s.INT;if(r===Ai)return s.UNSIGNED_INT;if(r===nn)return s.FLOAT;if(r===Dt)return n?s.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Mg)return s.ALPHA;if(r===hn)return s.RGBA;if(r===Sg)return s.LUMINANCE;if(r===Eg)return s.LUMINANCE_ALPHA;if(r===Qi)return s.DEPTH_COMPONENT;if(r===Ci)return s.DEPTH_STENCIL;if(r===kc)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===yl)return s.RED;if(r===Qd)return s.RED_INTEGER;if(r===wg)return s.RG;if(r===ef)return s.RG_INTEGER;if(r===tf)return s.RGBA_INTEGER;if(r===nc||r===ic||r===sc||r===rc)if(c===St)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===nc)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ic)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===sc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===rc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===nc)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ic)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===sc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===rc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===fu||r===pu||r===mu||r===gu)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===fu)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===pu)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===mu)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===gu)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===nf)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===vu||r===_u)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===vu)return c===St?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===_u)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===xu||r===yu||r===Mu||r===Su||r===Eu||r===wu||r===bu||r===Tu||r===Au||r===Ru||r===Cu||r===Pu||r===Lu||r===Iu)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===xu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===yu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Mu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Su)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Eu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===wu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===bu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Tu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Au)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Ru)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Cu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Pu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Lu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Iu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===oc||r===Du||r===Uu)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===oc)return c===St?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Du)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Uu)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===bg||r===Nu||r===Ou||r===Fu)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===oc)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Nu)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Ou)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Fu)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===di?n?s.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}var Qc=class extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Ht=class extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}},Vy={type:"move"},vr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ht,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ht,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ht,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Vy)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ht;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},el=class extends $n{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null,_=t.getContextAttributes(),m=null,f=null,S=[],y=[],R=new Re,F=null,L=new kt;L.layers.enable(1),L.viewport=new Et;let P=new kt;P.layers.enable(2),P.viewport=new Et;let k=[L,P],M=new Qc;M.layers.enable(1),M.layers.enable(2);let b=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let se=S[K];return se===void 0&&(se=new vr,S[K]=se),se.getTargetRaySpace()},this.getControllerGrip=function(K){let se=S[K];return se===void 0&&(se=new vr,S[K]=se),se.getGripSpace()},this.getHand=function(K){let se=S[K];return se===void 0&&(se=new vr,S[K]=se),se.getHandSpace()};function X(K){let se=y.indexOf(K.inputSource);if(se===-1)return;let Se=S[se];Se!==void 0&&(Se.update(K.inputSource,K.frame,l||o),Se.dispatchEvent({type:K.type,data:K.inputSource}))}function ie(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",ie),i.removeEventListener("inputsourceschange",D);for(let K=0;K<S.length;K++){let se=y[K];se!==null&&(y[K]=null,S[K].disconnect(se))}b=null,H=null,e.setRenderTarget(m),p=null,d=null,u=null,i=null,f=null,he.stop(),n.isPresenting=!1,e.setPixelRatio(F),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",ie),i.addEventListener("inputsourceschange",D),_.xrCompatible!==!0&&await t.makeXRCompatible(),F=e.getPixelRatio(),e.getSize(R),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let se={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,t,se),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new Xt(p.framebufferWidth,p.framebufferHeight,{format:hn,type:Kn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let se=null,Se=null,_e=null;_.depth&&(_e=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=_.stencil?Ci:Qi,Se=_.stencil?di:Ai);let Te={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Te),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),f=new Xt(d.textureWidth,d.textureHeight,{format:hn,type:Kn,depthTexture:new Hs(d.textureWidth,d.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});let Ue=e.properties.get(f);Ue.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),he.setContext(i),he.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function D(K){for(let se=0;se<K.removed.length;se++){let Se=K.removed[se],_e=y.indexOf(Se);_e>=0&&(y[_e]=null,S[_e].disconnect(Se))}for(let se=0;se<K.added.length;se++){let Se=K.added[se],_e=y.indexOf(Se);if(_e===-1){for(let Ue=0;Ue<S.length;Ue++)if(Ue>=y.length){y.push(Se),_e=Ue;break}else if(y[Ue]===null){y[Ue]=Se,_e=Ue;break}if(_e===-1)break}let Te=S[_e];Te&&Te.connect(Se)}}let G=new B,W=new B;function te(K,se,Se){G.setFromMatrixPosition(se.matrixWorld),W.setFromMatrixPosition(Se.matrixWorld);let _e=G.distanceTo(W),Te=se.projectionMatrix.elements,Ue=Se.projectionMatrix.elements,Ge=Te[14]/(Te[10]-1),Ne=Te[14]/(Te[10]+1),tt=(Te[9]+1)/Te[5],Z=(Te[9]-1)/Te[5],At=(Te[8]-1)/Te[0],Oe=(Ue[8]+1)/Ue[0],We=Ge*At,De=Ge*Oe,gt=_e/(-At+Oe),Ze=gt*-At;se.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Ze),K.translateZ(gt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert();let T=Ge+gt,E=Ne+gt,$=We-Ze,fe=De+(_e-Ze),le=tt*Ne/E*T,de=Z*Ne/E*T;K.projectionMatrix.makePerspective($,fe,le,de,T,E),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}function ne(K,se){se===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(se.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;M.near=P.near=L.near=K.near,M.far=P.far=L.far=K.far,(b!==M.near||H!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),b=M.near,H=M.far);let se=K.parent,Se=M.cameras;ne(M,se);for(let _e=0;_e<Se.length;_e++)ne(Se[_e],se);Se.length===2?te(M,L,P):M.projectionMatrix.copy(L.projectionMatrix),J(K,M,se)};function J(K,se,Se){Se===null?K.matrix.copy(se.matrixWorld):(K.matrix.copy(Se.matrixWorld),K.matrix.invert(),K.matrix.multiply(se.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(se.projectionMatrix),K.projectionMatrixInverse.copy(se.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=zs*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(K){c=K,d!==null&&(d.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)};let ee=null;function oe(K,se){if(h=se.getViewerPose(l||o),g=se,h!==null){let Se=h.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let _e=!1;Se.length!==M.cameras.length&&(M.cameras.length=0,_e=!0);for(let Te=0;Te<Se.length;Te++){let Ue=Se[Te],Ge=null;if(p!==null)Ge=p.getViewport(Ue);else{let tt=u.getViewSubImage(d,Ue);Ge=tt.viewport,Te===0&&(e.setRenderTargetTextures(f,tt.colorTexture,d.ignoreDepthValues?void 0:tt.depthStencilTexture),e.setRenderTarget(f))}let Ne=k[Te];Ne===void 0&&(Ne=new kt,Ne.layers.enable(Te),Ne.viewport=new Et,k[Te]=Ne),Ne.matrix.fromArray(Ue.transform.matrix),Ne.matrix.decompose(Ne.position,Ne.quaternion,Ne.scale),Ne.projectionMatrix.fromArray(Ue.projectionMatrix),Ne.projectionMatrixInverse.copy(Ne.projectionMatrix).invert(),Ne.viewport.set(Ge.x,Ge.y,Ge.width,Ge.height),Te===0&&(M.matrix.copy(Ne.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),_e===!0&&M.cameras.push(Ne)}}for(let Se=0;Se<S.length;Se++){let _e=y[Se],Te=S[Se];_e!==null&&Te!==void 0&&Te.update(_e,se,l||o)}ee&&ee(K,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),g=null}let he=new hf;he.setAnimationLoop(oe),this.setAnimationLoop=function(K){ee=K},this.dispose=function(){}}};function Gy(s,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,lf(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,S,y,R){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,R)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,S,y):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===dn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===dn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let S=e.get(f).envMap;if(S&&(m.envMap.value=S,m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;let y=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*y,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,S,y){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=y*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===dn&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){let S=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Wy(s,e,t,n){let i={},r={},o=[],a=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(S,y){let R=y.program;n.uniformBlockBinding(S,R)}function l(S,y){let R=i[S.id];R===void 0&&(g(S),R=h(S),i[S.id]=R,S.addEventListener("dispose",m));let F=y.program;n.updateUBOMapping(S,F);let L=e.render.frame;r[S.id]!==L&&(d(S),r[S.id]=L)}function h(S){let y=u();S.__bindingPointIndex=y;let R=s.createBuffer(),F=S.__size,L=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,R),s.bufferData(s.UNIFORM_BUFFER,F,L),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,R),R}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){let y=i[S.id],R=S.uniforms,F=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let L=0,P=R.length;L<P;L++){let k=Array.isArray(R[L])?R[L]:[R[L]];for(let M=0,b=k.length;M<b;M++){let H=k[M];if(p(H,L,M,F)===!0){let X=H.__offset,ie=Array.isArray(H.value)?H.value:[H.value],D=0;for(let G=0;G<ie.length;G++){let W=ie[G],te=_(W);typeof W=="number"||typeof W=="boolean"?(H.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,X+D,H.__data)):W.isMatrix3?(H.__data[0]=W.elements[0],H.__data[1]=W.elements[1],H.__data[2]=W.elements[2],H.__data[3]=0,H.__data[4]=W.elements[3],H.__data[5]=W.elements[4],H.__data[6]=W.elements[5],H.__data[7]=0,H.__data[8]=W.elements[6],H.__data[9]=W.elements[7],H.__data[10]=W.elements[8],H.__data[11]=0):(W.toArray(H.__data,D),D+=te.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,X,H.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(S,y,R,F){let L=S.value,P=y+"_"+R;if(F[P]===void 0)return typeof L=="number"||typeof L=="boolean"?F[P]=L:F[P]=L.clone(),!0;{let k=F[P];if(typeof L=="number"||typeof L=="boolean"){if(k!==L)return F[P]=L,!0}else if(k.equals(L)===!1)return k.copy(L),!0}return!1}function g(S){let y=S.uniforms,R=0,F=16;for(let P=0,k=y.length;P<k;P++){let M=Array.isArray(y[P])?y[P]:[y[P]];for(let b=0,H=M.length;b<H;b++){let X=M[b],ie=Array.isArray(X.value)?X.value:[X.value];for(let D=0,G=ie.length;D<G;D++){let W=ie[D],te=_(W),ne=R%F;ne!==0&&F-ne<te.boundary&&(R+=F-ne),X.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=R,R+=te.storage}}}let L=R%F;return L>0&&(R+=F-L),S.__size=R,S.__cache={},this}function _(S){let y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function m(S){let y=S.target;y.removeEventListener("dispose",m);let R=o.indexOf(y.__bindingPointIndex);o.splice(R,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function f(){for(let S in i)s.deleteBuffer(i[S]);o=[],i={},r={}}return{bind:c,update:l,dispose:f}}var wr=class{constructor(e={}){let{canvas:t=jg(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;let p=new Uint32Array(4),g=new Int32Array(4),_=null,m=null,f=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ht,this._useLegacyLights=!1,this.toneMapping=Zn,this.toneMappingExposure=1;let y=this,R=!1,F=0,L=0,P=null,k=-1,M=null,b=new Et,H=new Et,X=null,ie=new Ie(0),D=0,G=t.width,W=t.height,te=1,ne=null,J=null,ee=new Et(0,0,G,W),oe=new Et(0,0,G,W),he=!1,K=new Sr,se=!1,Se=!1,_e=null,Te=new $e,Ue=new Re,Ge=new B,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function tt(){return P===null?te:1}let Z=n;function At(v,A){for(let C=0;C<v.length;C++){let U=v[C],N=t.getContext(U,A);if(N!==null)return N}return null}try{let v={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r160"),t.addEventListener("webglcontextlost",q,!1),t.addEventListener("webglcontextrestored",z,!1),t.addEventListener("webglcontextcreationerror",xe,!1),Z===null){let A=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&A.shift(),Z=At(A,v),Z===null)throw At(A)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&Z instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),Z.getShaderPrecisionFormat===void 0&&(Z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Oe,We,De,gt,Ze,T,E,$,fe,le,de,Pe,we,Ae,Fe,Xe,ce,Je,I,re,pe,ge,Le,ze;function Be(){Oe=new lx(Z),We=new ix(Z,Oe,e),Oe.init(We),ge=new Hy(Z,Oe,We),De=new zy(Z,Oe,We),gt=new dx(Z),Ze=new Ay,T=new ky(Z,Oe,De,Ze,We,ge,gt),E=new rx(y),$=new cx(y),fe=new y0(Z,We),Le=new tx(Z,Oe,fe,We),le=new hx(Z,fe,gt,Le),de=new gx(Z,le,fe,gt),I=new mx(Z,We,T),Xe=new sx(Ze),Pe=new Ty(y,E,$,Oe,We,Le,Xe),we=new Gy(y,Ze),Ae=new Cy,Fe=new Ny(Oe,We),Je=new ex(y,E,$,De,de,d,c),ce=new By(y,de,We),ze=new Wy(Z,gt,We,De),re=new nx(Z,Oe,gt,We),pe=new ux(Z,Oe,gt,We),gt.programs=Pe.programs,y.capabilities=We,y.extensions=Oe,y.properties=Ze,y.renderLists=Ae,y.shadowMap=ce,y.state=De,y.info=gt}Be();let Ke=new el(y,Z);this.xr=Ke,this.getContext=function(){return Z},this.getContextAttributes=function(){return Z.getContextAttributes()},this.forceContextLoss=function(){let v=Oe.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Oe.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(v){v!==void 0&&(te=v,this.setSize(G,W,!1))},this.getSize=function(v){return v.set(G,W)},this.setSize=function(v,A,C=!0){if(Ke.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=v,W=A,t.width=Math.floor(v*te),t.height=Math.floor(A*te),C===!0&&(t.style.width=v+"px",t.style.height=A+"px"),this.setViewport(0,0,v,A)},this.getDrawingBufferSize=function(v){return v.set(G*te,W*te).floor()},this.setDrawingBufferSize=function(v,A,C){G=v,W=A,te=C,t.width=Math.floor(v*C),t.height=Math.floor(A*C),this.setViewport(0,0,v,A)},this.getCurrentViewport=function(v){return v.copy(b)},this.getViewport=function(v){return v.copy(ee)},this.setViewport=function(v,A,C,U){v.isVector4?ee.set(v.x,v.y,v.z,v.w):ee.set(v,A,C,U),De.viewport(b.copy(ee).multiplyScalar(te).floor())},this.getScissor=function(v){return v.copy(oe)},this.setScissor=function(v,A,C,U){v.isVector4?oe.set(v.x,v.y,v.z,v.w):oe.set(v,A,C,U),De.scissor(H.copy(oe).multiplyScalar(te).floor())},this.getScissorTest=function(){return he},this.setScissorTest=function(v){De.setScissorTest(he=v)},this.setOpaqueSort=function(v){ne=v},this.setTransparentSort=function(v){J=v},this.getClearColor=function(v){return v.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor.apply(Je,arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha.apply(Je,arguments)},this.clear=function(v=!0,A=!0,C=!0){let U=0;if(v){let N=!1;if(P!==null){let j=P.texture.format;N=j===tf||j===ef||j===Qd}if(N){let j=P.texture.type,Y=j===Kn||j===Ai||j===xl||j===di||j===jd||j===Jd,Q=Je.getClearColor(),ae=Je.getClearAlpha(),ue=Q.r,ve=Q.g,Me=Q.b;Y?(p[0]=ue,p[1]=ve,p[2]=Me,p[3]=ae,Z.clearBufferuiv(Z.COLOR,0,p)):(g[0]=ue,g[1]=ve,g[2]=Me,g[3]=ae,Z.clearBufferiv(Z.COLOR,0,g))}else U|=Z.COLOR_BUFFER_BIT}A&&(U|=Z.DEPTH_BUFFER_BIT),C&&(U|=Z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z.clear(U)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",q,!1),t.removeEventListener("webglcontextrestored",z,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),Ae.dispose(),Fe.dispose(),Ze.dispose(),E.dispose(),$.dispose(),de.dispose(),Le.dispose(),ze.dispose(),Pe.dispose(),Ke.dispose(),Ke.removeEventListener("sessionstart",Qt),Ke.removeEventListener("sessionend",xt),_e&&(_e.dispose(),_e=null),en.stop()};function q(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function z(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let v=gt.autoReset,A=ce.enabled,C=ce.autoUpdate,U=ce.needsUpdate,N=ce.type;Be(),gt.autoReset=v,ce.enabled=A,ce.autoUpdate=C,ce.needsUpdate=U,ce.type=N}function xe(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function ye(v){let A=v.target;A.removeEventListener("dispose",ye),qe(A)}function qe(v){ke(v),Ze.remove(v)}function ke(v){let A=Ze.get(v).programs;A!==void 0&&(A.forEach(function(C){Pe.releaseProgram(C)}),v.isShaderMaterial&&Pe.releaseShaderCache(v))}this.renderBufferDirect=function(v,A,C,U,N,j){A===null&&(A=Ne);let Y=N.isMesh&&N.matrixWorld.determinant()<0,Q=x(v,A,C,U,N);De.setMaterial(U,Y);let ae=C.index,ue=1;if(U.wireframe===!0){if(ae=le.getWireframeAttribute(C),ae===void 0)return;ue=2}let ve=C.drawRange,Me=C.attributes.position,Ee=ve.start*ue,Ce=(ve.start+ve.count)*ue;j!==null&&(Ee=Math.max(Ee,j.start*ue),Ce=Math.min(Ce,(j.start+j.count)*ue)),ae!==null?(Ee=Math.max(Ee,0),Ce=Math.min(Ce,ae.count)):Me!=null&&(Ee=Math.max(Ee,0),Ce=Math.min(Ce,Me.count));let He=Ce-Ee;if(He<0||He===1/0)return;Le.setup(N,U,Q,C,ae);let mt,je=re;if(ae!==null&&(mt=fe.get(ae),je=pe,je.setIndex(mt)),N.isMesh)U.wireframe===!0?(De.setLineWidth(U.wireframeLinewidth*tt()),je.setMode(Z.LINES)):je.setMode(Z.TRIANGLES);else if(N.isLine){let Ye=U.linewidth;Ye===void 0&&(Ye=1),De.setLineWidth(Ye*tt()),N.isLineSegments?je.setMode(Z.LINES):N.isLineLoop?je.setMode(Z.LINE_LOOP):je.setMode(Z.LINE_STRIP)}else N.isPoints?je.setMode(Z.POINTS):N.isSprite&&je.setMode(Z.TRIANGLES);if(N.isBatchedMesh)je.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else if(N.isInstancedMesh)je.renderInstances(Ee,He,N.count);else if(C.isInstancedBufferGeometry){let Ye=C._maxInstanceCount!==void 0?C._maxInstanceCount:1/0,_t=Math.min(C.instanceCount,Ye);je.renderInstances(Ee,He,_t)}else je.render(Ee,He)};function lt(v,A,C){v.transparent===!0&&v.side===wn&&v.forceSinglePass===!1?(v.side=dn,v.needsUpdate=!0,nt(v,A,C),v.side=Ln,v.needsUpdate=!0,nt(v,A,C),v.side=wn):nt(v,A,C)}this.compile=function(v,A,C=null){C===null&&(C=v),m=Fe.get(C),m.init(),S.push(m),C.traverseVisible(function(N){N.isLight&&N.layers.test(A.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),v!==C&&v.traverseVisible(function(N){N.isLight&&N.layers.test(A.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),m.setupLights(y._useLegacyLights);let U=new Set;return v.traverse(function(N){let j=N.material;if(j)if(Array.isArray(j))for(let Y=0;Y<j.length;Y++){let Q=j[Y];lt(Q,C,N),U.add(Q)}else lt(j,C,N),U.add(j)}),S.pop(),m=null,U},this.compileAsync=function(v,A,C=null){let U=this.compile(v,A,C);return new Promise(N=>{function j(){if(U.forEach(function(Y){Ze.get(Y).currentProgram.isReady()&&U.delete(Y)}),U.size===0){N(v);return}setTimeout(j,10)}Oe.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let ut=null;function Ft(v){ut&&ut(v)}function Qt(){en.stop()}function xt(){en.start()}let en=new hf;en.setAnimationLoop(Ft),typeof self<"u"&&en.setContext(self),this.setAnimationLoop=function(v){ut=v,Ke.setAnimationLoop(v),v===null?en.stop():en.start()},Ke.addEventListener("sessionstart",Qt),Ke.addEventListener("sessionend",xt),this.render=function(v,A){if(A!==void 0&&A.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),A.parent===null&&A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),Ke.enabled===!0&&Ke.isPresenting===!0&&(Ke.cameraAutoUpdate===!0&&Ke.updateCamera(A),A=Ke.getCamera()),v.isScene===!0&&v.onBeforeRender(y,v,A,P),m=Fe.get(v,S.length),m.init(),S.push(m),Te.multiplyMatrices(A.projectionMatrix,A.matrixWorldInverse),K.setFromProjectionMatrix(Te),Se=this.localClippingEnabled,se=Xe.init(this.clippingPlanes,Se),_=Ae.get(v,f.length),_.init(),f.push(_),Rn(v,A,0,y.sortObjects),_.finish(),y.sortObjects===!0&&_.sort(ne,J),this.info.render.frame++,se===!0&&Xe.beginShadows();let C=m.state.shadowsArray;if(ce.render(C,v,A),se===!0&&Xe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Je.render(_,v),m.setupLights(y._useLegacyLights),A.isArrayCamera){let U=A.cameras;for(let N=0,j=U.length;N<j;N++){let Y=U[N];Xi(_,v,Y,Y.viewport)}}else Xi(_,v,A);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),v.isScene===!0&&v.onAfterRender(y,v,A),Le.resetDefaultState(),k=-1,M=null,S.pop(),S.length>0?m=S[S.length-1]:m=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function Rn(v,A,C,U){if(v.visible===!1)return;if(v.layers.test(A.layers)){if(v.isGroup)C=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(A);else if(v.isLight)m.pushLight(v),v.castShadow&&m.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||K.intersectsSprite(v)){U&&Ge.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Te);let Y=de.update(v),Q=v.material;Q.visible&&_.push(v,Y,Q,C,Ge.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||K.intersectsObject(v))){let Y=de.update(v),Q=v.material;if(U&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Ge.copy(v.boundingSphere.center)):(Y.boundingSphere===null&&Y.computeBoundingSphere(),Ge.copy(Y.boundingSphere.center)),Ge.applyMatrix4(v.matrixWorld).applyMatrix4(Te)),Array.isArray(Q)){let ae=Y.groups;for(let ue=0,ve=ae.length;ue<ve;ue++){let Me=ae[ue],Ee=Q[Me.materialIndex];Ee&&Ee.visible&&_.push(v,Y,Ee,C,Ge.z,Me)}}else Q.visible&&_.push(v,Y,Q,C,Ge.z,null)}}let j=v.children;for(let Y=0,Q=j.length;Y<Q;Y++)Rn(j[Y],A,C,U)}function Xi(v,A,C,U){let N=v.opaque,j=v.transmissive,Y=v.transparent;m.setupLightsView(C),se===!0&&Xe.setGlobalState(y.clippingPlanes,C),j.length>0&&tc(N,j,A,C),U&&De.viewport(b.copy(U)),N.length>0&&Xn(N,A,C),j.length>0&&Xn(j,A,C),Y.length>0&&Xn(Y,A,C),De.buffers.depth.setTest(!0),De.buffers.depth.setMask(!0),De.buffers.color.setMask(!0),De.setPolygonOffset(!1)}function tc(v,A,C,U){if((C.isScene===!0?C.overrideMaterial:null)!==null)return;let j=We.isWebGL2;_e===null&&(_e=new Xt(1,1,{generateMipmaps:!0,type:Oe.has("EXT_color_buffer_half_float")?Dt:Kn,minFilter:Vn,samples:j?4:0})),y.getDrawingBufferSize(Ue),j?_e.setSize(Ue.x,Ue.y):_e.setSize(Oo(Ue.x),Oo(Ue.y));let Y=y.getRenderTarget();y.setRenderTarget(_e),y.getClearColor(ie),D=y.getClearAlpha(),D<1&&y.setClearColor(16777215,.5),y.clear();let Q=y.toneMapping;y.toneMapping=Zn,Xn(v,C,U),T.updateMultisampleRenderTarget(_e),T.updateRenderTargetMipmap(_e);let ae=!1;for(let ue=0,ve=A.length;ue<ve;ue++){let Me=A[ue],Ee=Me.object,Ce=Me.geometry,He=Me.material,mt=Me.group;if(He.side===wn&&Ee.layers.test(U.layers)){let je=He.side;He.side=dn,He.needsUpdate=!0,yi(Ee,C,U,Ce,He,mt),He.side=je,He.needsUpdate=!0,ae=!0}}ae===!0&&(T.updateMultisampleRenderTarget(_e),T.updateRenderTargetMipmap(_e)),y.setRenderTarget(Y),y.setClearColor(ie,D),y.toneMapping=Q}function Xn(v,A,C){let U=A.isScene===!0?A.overrideMaterial:null;for(let N=0,j=v.length;N<j;N++){let Y=v[N],Q=Y.object,ae=Y.geometry,ue=U===null?Y.material:U,ve=Y.group;Q.layers.test(C.layers)&&yi(Q,A,C,ae,ue,ve)}}function yi(v,A,C,U,N,j){v.onBeforeRender(y,A,C,U,N,j),v.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),N.onBeforeRender(y,A,C,U,v,j),N.transparent===!0&&N.side===wn&&N.forceSinglePass===!1?(N.side=dn,N.needsUpdate=!0,y.renderBufferDirect(C,A,U,N,v,j),N.side=Ln,N.needsUpdate=!0,y.renderBufferDirect(C,A,U,N,v,j),N.side=wn):y.renderBufferDirect(C,A,U,N,v,j),v.onAfterRender(y,A,C,U,N,j)}function nt(v,A,C){A.isScene!==!0&&(A=Ne);let U=Ze.get(v),N=m.state.lights,j=m.state.shadowsArray,Y=N.state.version,Q=Pe.getParameters(v,N.state,j,A,C),ae=Pe.getProgramCacheKey(Q),ue=U.programs;U.environment=v.isMeshStandardMaterial?A.environment:null,U.fog=A.fog,U.envMap=(v.isMeshStandardMaterial?$:E).get(v.envMap||U.environment),ue===void 0&&(v.addEventListener("dispose",ye),ue=new Map,U.programs=ue);let ve=ue.get(ae);if(ve!==void 0){if(U.currentProgram===ve&&U.lightsStateVersion===Y)return eo(v,Q),ve}else Q.uniforms=Pe.getUniforms(v),v.onBuild(C,Q,y),v.onBeforeCompile(Q,y),ve=Pe.acquireProgram(Q,ae),ue.set(ae,ve),U.uniforms=Q.uniforms;let Me=U.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Me.clippingPlanes=Xe.uniform),eo(v,Q),U.needsLights=O(v),U.lightsStateVersion=Y,U.needsLights&&(Me.ambientLightColor.value=N.state.ambient,Me.lightProbe.value=N.state.probe,Me.directionalLights.value=N.state.directional,Me.directionalLightShadows.value=N.state.directionalShadow,Me.spotLights.value=N.state.spot,Me.spotLightShadows.value=N.state.spotShadow,Me.rectAreaLights.value=N.state.rectArea,Me.ltc_1.value=N.state.rectAreaLTC1,Me.ltc_2.value=N.state.rectAreaLTC2,Me.pointLights.value=N.state.point,Me.pointLightShadows.value=N.state.pointShadow,Me.hemisphereLights.value=N.state.hemi,Me.directionalShadowMap.value=N.state.directionalShadowMap,Me.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Me.spotShadowMap.value=N.state.spotShadowMap,Me.spotLightMatrix.value=N.state.spotLightMatrix,Me.spotLightMap.value=N.state.spotLightMap,Me.pointShadowMap.value=N.state.pointShadowMap,Me.pointShadowMatrix.value=N.state.pointShadowMatrix),U.currentProgram=ve,U.uniformsList=null,ve}function rr(v){if(v.uniformsList===null){let A=v.currentProgram.getUniforms();v.uniformsList=Ns.seqWithValue(A.seq,v.uniforms)}return v.uniformsList}function eo(v,A){let C=Ze.get(v);C.outputColorSpace=A.outputColorSpace,C.batching=A.batching,C.instancing=A.instancing,C.instancingColor=A.instancingColor,C.skinning=A.skinning,C.morphTargets=A.morphTargets,C.morphNormals=A.morphNormals,C.morphColors=A.morphColors,C.morphTargetsCount=A.morphTargetsCount,C.numClippingPlanes=A.numClippingPlanes,C.numIntersection=A.numClipIntersection,C.vertexAlphas=A.vertexAlphas,C.vertexTangents=A.vertexTangents,C.toneMapping=A.toneMapping}function x(v,A,C,U,N){A.isScene!==!0&&(A=Ne),T.resetTextureUnits();let j=A.fog,Y=U.isMeshStandardMaterial?A.environment:null,Q=P===null?y.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Tt,ae=(U.isMeshStandardMaterial?$:E).get(U.envMap||Y),ue=U.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,ve=!!C.attributes.tangent&&(!!U.normalMap||U.anisotropy>0),Me=!!C.morphAttributes.position,Ee=!!C.morphAttributes.normal,Ce=!!C.morphAttributes.color,He=Zn;U.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(He=y.toneMapping);let mt=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,je=mt!==void 0?mt.length:0,Ye=Ze.get(U),_t=m.state.lights;if(se===!0&&(Se===!0||v!==M)){let Lt=v===M&&U.id===k;Xe.setState(U,v,Lt)}let Ve=!1;U.version===Ye.__version?(Ye.needsLights&&Ye.lightsStateVersion!==_t.state.version||Ye.outputColorSpace!==Q||N.isBatchedMesh&&Ye.batching===!1||!N.isBatchedMesh&&Ye.batching===!0||N.isInstancedMesh&&Ye.instancing===!1||!N.isInstancedMesh&&Ye.instancing===!0||N.isSkinnedMesh&&Ye.skinning===!1||!N.isSkinnedMesh&&Ye.skinning===!0||N.isInstancedMesh&&Ye.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ye.instancingColor===!1&&N.instanceColor!==null||Ye.envMap!==ae||U.fog===!0&&Ye.fog!==j||Ye.numClippingPlanes!==void 0&&(Ye.numClippingPlanes!==Xe.numPlanes||Ye.numIntersection!==Xe.numIntersection)||Ye.vertexAlphas!==ue||Ye.vertexTangents!==ve||Ye.morphTargets!==Me||Ye.morphNormals!==Ee||Ye.morphColors!==Ce||Ye.toneMapping!==He||We.isWebGL2===!0&&Ye.morphTargetsCount!==je)&&(Ve=!0):(Ve=!0,Ye.__version=U.version);let Mt=Ye.currentProgram;Ve===!0&&(Mt=nt(U,A,N));let pn=!1,Rt=!1,dt=!1,Qe=Mt.getUniforms(),tn=Ye.uniforms;if(De.useProgram(Mt.program)&&(pn=!0,Rt=!0,dt=!0),U.id!==k&&(k=U.id,Rt=!0),pn||M!==v){Qe.setValue(Z,"projectionMatrix",v.projectionMatrix),Qe.setValue(Z,"viewMatrix",v.matrixWorldInverse);let Lt=Qe.map.cameraPosition;Lt!==void 0&&Lt.setValue(Z,Ge.setFromMatrixPosition(v.matrixWorld)),We.logarithmicDepthBuffer&&Qe.setValue(Z,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshLambertMaterial||U.isMeshBasicMaterial||U.isMeshStandardMaterial||U.isShaderMaterial)&&Qe.setValue(Z,"isOrthographic",v.isOrthographicCamera===!0),M!==v&&(M=v,Rt=!0,dt=!0)}if(N.isSkinnedMesh){Qe.setOptional(Z,N,"bindMatrix"),Qe.setOptional(Z,N,"bindMatrixInverse");let Lt=N.skeleton;Lt&&(We.floatVertexTextures?(Lt.boneTexture===null&&Lt.computeBoneTexture(),Qe.setValue(Z,"boneTexture",Lt.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}N.isBatchedMesh&&(Qe.setOptional(Z,N,"batchingTexture"),Qe.setValue(Z,"batchingTexture",N._matricesTexture,T));let ni=C.morphAttributes;if((ni.position!==void 0||ni.normal!==void 0||ni.color!==void 0&&We.isWebGL2===!0)&&I.update(N,C,Mt),(Rt||Ye.receiveShadow!==N.receiveShadow)&&(Ye.receiveShadow=N.receiveShadow,Qe.setValue(Z,"receiveShadow",N.receiveShadow)),U.isMeshGouraudMaterial&&U.envMap!==null&&(tn.envMap.value=ae,tn.flipEnvMap.value=ae.isCubeTexture&&ae.isRenderTargetTexture===!1?-1:1),Rt&&(Qe.setValue(Z,"toneMappingExposure",y.toneMappingExposure),Ye.needsLights&&w(tn,dt),j&&U.fog===!0&&we.refreshFogUniforms(tn,j),we.refreshMaterialUniforms(tn,U,te,W,_e),Ns.upload(Z,rr(Ye),tn,T)),U.isShaderMaterial&&U.uniformsNeedUpdate===!0&&(Ns.upload(Z,rr(Ye),tn,T),U.uniformsNeedUpdate=!1),U.isSpriteMaterial&&Qe.setValue(Z,"center",N.center),Qe.setValue(Z,"modelViewMatrix",N.modelViewMatrix),Qe.setValue(Z,"normalMatrix",N.normalMatrix),Qe.setValue(Z,"modelMatrix",N.matrixWorld),U.isShaderMaterial||U.isRawShaderMaterial){let Lt=U.uniformsGroups;for(let Mi=0,Xm=Lt.length;Mi<Xm;Mi++)if(We.isWebGL2){let su=Lt[Mi];ze.update(su,Mt),ze.bind(su,Mt)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Mt}function w(v,A){v.ambientLightColor.needsUpdate=A,v.lightProbe.needsUpdate=A,v.directionalLights.needsUpdate=A,v.directionalLightShadows.needsUpdate=A,v.pointLights.needsUpdate=A,v.pointLightShadows.needsUpdate=A,v.spotLights.needsUpdate=A,v.spotLightShadows.needsUpdate=A,v.rectAreaLights.needsUpdate=A,v.hemisphereLights.needsUpdate=A}function O(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(v,A,C){Ze.get(v.texture).__webglTexture=A,Ze.get(v.depthTexture).__webglTexture=C;let U=Ze.get(v);U.__hasExternalTextures=!0,U.__hasExternalTextures&&(U.__autoAllocateDepthBuffer=C===void 0,U.__autoAllocateDepthBuffer||Oe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),U.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(v,A){let C=Ze.get(v);C.__webglFramebuffer=A,C.__useDefaultFramebuffer=A===void 0},this.setRenderTarget=function(v,A=0,C=0){P=v,F=A,L=C;let U=!0,N=null,j=!1,Y=!1;if(v){let ae=Ze.get(v);ae.__useDefaultFramebuffer!==void 0?(De.bindFramebuffer(Z.FRAMEBUFFER,null),U=!1):ae.__webglFramebuffer===void 0?T.setupRenderTarget(v):ae.__hasExternalTextures&&T.rebindTextures(v,Ze.get(v.texture).__webglTexture,Ze.get(v.depthTexture).__webglTexture);let ue=v.texture;(ue.isData3DTexture||ue.isDataArrayTexture||ue.isCompressedArrayTexture)&&(Y=!0);let ve=Ze.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(ve[A])?N=ve[A][C]:N=ve[A],j=!0):We.isWebGL2&&v.samples>0&&T.useMultisampledRTT(v)===!1?N=Ze.get(v).__webglMultisampledFramebuffer:Array.isArray(ve)?N=ve[C]:N=ve,b.copy(v.viewport),H.copy(v.scissor),X=v.scissorTest}else b.copy(ee).multiplyScalar(te).floor(),H.copy(oe).multiplyScalar(te).floor(),X=he;if(De.bindFramebuffer(Z.FRAMEBUFFER,N)&&We.drawBuffers&&U&&De.drawBuffers(v,N),De.viewport(b),De.scissor(H),De.setScissorTest(X),j){let ae=Ze.get(v.texture);Z.framebufferTexture2D(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_CUBE_MAP_POSITIVE_X+A,ae.__webglTexture,C)}else if(Y){let ae=Ze.get(v.texture),ue=A||0;Z.framebufferTextureLayer(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,ae.__webglTexture,C||0,ue)}k=-1},this.readRenderTargetPixels=function(v,A,C,U,N,j,Y){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Q=Ze.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Y!==void 0&&(Q=Q[Y]),Q){De.bindFramebuffer(Z.FRAMEBUFFER,Q);try{let ae=v.texture,ue=ae.format,ve=ae.type;if(ue!==hn&&ge.convert(ue)!==Z.getParameter(Z.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Me=ve===Dt&&(Oe.has("EXT_color_buffer_half_float")||We.isWebGL2&&Oe.has("EXT_color_buffer_float"));if(ve!==Kn&&ge.convert(ve)!==Z.getParameter(Z.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ve===nn&&(We.isWebGL2||Oe.has("OES_texture_float")||Oe.has("WEBGL_color_buffer_float")))&&!Me){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}A>=0&&A<=v.width-U&&C>=0&&C<=v.height-N&&Z.readPixels(A,C,U,N,ge.convert(ue),ge.convert(ve),j)}finally{let ae=P!==null?Ze.get(P).__webglFramebuffer:null;De.bindFramebuffer(Z.FRAMEBUFFER,ae)}}},this.copyFramebufferToTexture=function(v,A,C=0){let U=Math.pow(2,-C),N=Math.floor(A.image.width*U),j=Math.floor(A.image.height*U);T.setTexture2D(A,0),Z.copyTexSubImage2D(Z.TEXTURE_2D,C,0,0,v.x,v.y,N,j),De.unbindTexture()},this.copyTextureToTexture=function(v,A,C,U=0){let N=A.image.width,j=A.image.height,Y=ge.convert(C.format),Q=ge.convert(C.type);T.setTexture2D(C,0),Z.pixelStorei(Z.UNPACK_FLIP_Y_WEBGL,C.flipY),Z.pixelStorei(Z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),Z.pixelStorei(Z.UNPACK_ALIGNMENT,C.unpackAlignment),A.isDataTexture?Z.texSubImage2D(Z.TEXTURE_2D,U,v.x,v.y,N,j,Y,Q,A.image.data):A.isCompressedTexture?Z.compressedTexSubImage2D(Z.TEXTURE_2D,U,v.x,v.y,A.mipmaps[0].width,A.mipmaps[0].height,Y,A.mipmaps[0].data):Z.texSubImage2D(Z.TEXTURE_2D,U,v.x,v.y,Y,Q,A.image),U===0&&C.generateMipmaps&&Z.generateMipmap(Z.TEXTURE_2D),De.unbindTexture()},this.copyTextureToTexture3D=function(v,A,C,U,N=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let j=v.max.x-v.min.x+1,Y=v.max.y-v.min.y+1,Q=v.max.z-v.min.z+1,ae=ge.convert(U.format),ue=ge.convert(U.type),ve;if(U.isData3DTexture)T.setTexture3D(U,0),ve=Z.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)T.setTexture2DArray(U,0),ve=Z.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}Z.pixelStorei(Z.UNPACK_FLIP_Y_WEBGL,U.flipY),Z.pixelStorei(Z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),Z.pixelStorei(Z.UNPACK_ALIGNMENT,U.unpackAlignment);let Me=Z.getParameter(Z.UNPACK_ROW_LENGTH),Ee=Z.getParameter(Z.UNPACK_IMAGE_HEIGHT),Ce=Z.getParameter(Z.UNPACK_SKIP_PIXELS),He=Z.getParameter(Z.UNPACK_SKIP_ROWS),mt=Z.getParameter(Z.UNPACK_SKIP_IMAGES),je=C.isCompressedTexture?C.mipmaps[N]:C.image;Z.pixelStorei(Z.UNPACK_ROW_LENGTH,je.width),Z.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,je.height),Z.pixelStorei(Z.UNPACK_SKIP_PIXELS,v.min.x),Z.pixelStorei(Z.UNPACK_SKIP_ROWS,v.min.y),Z.pixelStorei(Z.UNPACK_SKIP_IMAGES,v.min.z),C.isDataTexture||C.isData3DTexture?Z.texSubImage3D(ve,N,A.x,A.y,A.z,j,Y,Q,ae,ue,je.data):C.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),Z.compressedTexSubImage3D(ve,N,A.x,A.y,A.z,j,Y,Q,ae,je.data)):Z.texSubImage3D(ve,N,A.x,A.y,A.z,j,Y,Q,ae,ue,je),Z.pixelStorei(Z.UNPACK_ROW_LENGTH,Me),Z.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,Ee),Z.pixelStorei(Z.UNPACK_SKIP_PIXELS,Ce),Z.pixelStorei(Z.UNPACK_SKIP_ROWS,He),Z.pixelStorei(Z.UNPACK_SKIP_IMAGES,mt),N===0&&U.generateMipmaps&&Z.generateMipmap(ve),De.unbindTexture()},this.initTexture=function(v){v.isCubeTexture?T.setTextureCube(v,0):v.isData3DTexture?T.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?T.setTexture2DArray(v,0):T.setTexture2D(v,0),De.unbindTexture()},this.resetState=function(){F=0,L=0,P=null,De.reset(),Le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===Sl?"display-p3":"srgb",t.unpackColorSpace=ft.workingColorSpace===ua?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ht?es:rf}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===es?ht:Tt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},tl=class extends wr{};tl.prototype.isWebGL1Renderer=!0;var Vs=class extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},br=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=zc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Hn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},mn=new B,Tr=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix4(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyNormalMatrix(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.transformDirection(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Yn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array),r=yt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Ad=new B,Rd=new Et,Cd=new Et,Xy=new B,Pd=new $e,wo=new B,Pc=new bn,Ld=new $e,Lc=new fi,Xo=class extends ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=du,this.bindMatrix=new $e,this.bindMatrixInverse=new $e,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new sn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,wo),this.boundingBox.expandByPoint(wo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new bn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,wo),this.boundingSphere.expandByPoint(wo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pc.copy(this.boundingSphere),Pc.applyMatrix4(i),e.ray.intersectsSphere(Pc)!==!1&&(Ld.copy(i).invert(),Lc.copy(e.ray).applyMatrix4(Ld),!(this.boundingBox!==null&&Lc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Lc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Et,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===du?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===_g?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Rd.fromBufferAttribute(i.attributes.skinIndex,e),Cd.fromBufferAttribute(i.attributes.skinWeight,e),Ad.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=Cd.getComponent(r);if(o!==0){let a=Rd.getComponent(r);Pd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Xy.copy(Ad).applyMatrix4(Pd),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},Ar=class extends Ut{constructor(){super(),this.isBone=!0,this.type="Bone"}},Pi=class extends Wt{constructor(e=null,t=1,n=1,i,r,o,a,c,l=It,h=It,u,d){super(null,o,a,c,l,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Id=new $e,qy=new $e,qo=class s{constructor(e=[],t=[]){this.uuid=Hn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new $e)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new $e;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:qy;Id.multiplyMatrices(a,t[r]),Id.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Pi(t,e,e,hn,nn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Ar),this.bones.push(o),this.boneInverses.push(new $e().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},ns=class extends Ct{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Cs=new $e,Dd=new $e,bo=[],Ud=new sn,Yy=new $e,hr=new ct,ur=new bn,is=class extends ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ns(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Yy)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new sn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Cs),Ud.copy(e.boundingBox).applyMatrix4(Cs),this.boundingBox.union(Ud)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new bn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Cs),ur.copy(e.boundingSphere).applyMatrix4(Cs),this.boundingSphere.union(ur)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,i=this.count;if(hr.geometry=this.geometry,hr.material=this.material,hr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ur.copy(this.boundingSphere),ur.applyMatrix4(n),e.ray.intersectsSphere(ur)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Cs),Dd.multiplyMatrices(n,Cs),hr.matrixWorld=Dd,hr.raycast(e,bo);for(let o=0,a=bo.length;o<a;o++){let c=bo[o];c.instanceId=r,c.object=this,t.push(c)}bo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ns(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Rr=class extends vn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Nd=new B,Od=new B,Fd=new $e,Ic=new fi,To=new bn,Gs=class extends Ut{constructor(e=new qt,t=new Rr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Nd.fromBufferAttribute(t,i-1),Od.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Nd.distanceTo(Od);e.setAttribute("lineDistance",new Pt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),To.copy(n.boundingSphere),To.applyMatrix4(i),To.radius+=r,e.ray.intersectsSphere(To)===!1)return;Fd.copy(i).invert(),Ic.copy(e.ray).applyMatrix4(Fd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new B,h=new B,u=new B,d=new B,p=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let f=Math.max(0,o.start),S=Math.min(g.count,o.start+o.count);for(let y=f,R=S-1;y<R;y+=p){let F=g.getX(y),L=g.getX(y+1);if(l.fromBufferAttribute(m,F),h.fromBufferAttribute(m,L),Ic.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);let k=e.ray.origin.distanceTo(d);k<e.near||k>e.far||t.push({distance:k,point:u.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{let f=Math.max(0,o.start),S=Math.min(m.count,o.start+o.count);for(let y=f,R=S-1;y<R;y+=p){if(l.fromBufferAttribute(m,y),h.fromBufferAttribute(m,y+1),Ic.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);let L=e.ray.origin.distanceTo(d);L<e.near||L>e.far||t.push({distance:L,point:u.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},Bd=new B,zd=new B,Yo=class extends Gs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Bd.fromBufferAttribute(t,i),zd.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Bd.distanceTo(zd);e.setAttribute("lineDistance",new Pt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Zo=class extends Gs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Cr=class extends vn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},kd=new $e,nl=new fi,Ao=new bn,Ro=new B,Ko=class extends Ut{constructor(e=new qt,t=new Cr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ao.copy(n.boundingSphere),Ao.applyMatrix4(i),Ao.radius+=r,e.ray.intersectsSphere(Ao)===!1)return;kd.copy(i).invert(),nl.copy(e.ray).applyMatrix4(kd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=d,_=p;g<_;g++){let m=l.getX(g);Ro.fromBufferAttribute(u,m),Hd(Ro,m,c,i,e,t,this)}}else{let d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,_=p;g<_;g++)Ro.fromBufferAttribute(u,g),Hd(Ro,g,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Hd(s,e,t,n,i,r,o){let a=nl.distanceSqToPoint(s);if(a<t){let c=new B;nl.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}var Li=class extends Wt{constructor(e,t,n,i,r,o,a,c,l){super(e,t,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Pr=class s extends qt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new B,h=new Re;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let p=n+u/t*i;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Pt(o,3)),this.setAttribute("normal",new Pt(a,3)),this.setAttribute("uv",new Pt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}};var Ws=class s extends qt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new B,d=new B,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){let S=[],y=f/n,R=0;f===0&&o===0?R=.5/t:f===n&&c===Math.PI&&(R=-.5/t);for(let F=0;F<=t;F++){let L=F/t;u.x=-e*Math.cos(i+L*r)*Math.sin(o+y*a),u.y=e*Math.cos(o+y*a),u.z=e*Math.sin(i+L*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(L+R,1-y),S.push(l++)}h.push(S)}for(let f=0;f<n;f++)for(let S=0;S<t;S++){let y=h[f][S+1],R=h[f][S],F=h[f+1][S],L=h[f+1][S+1];(f!==0||o>0)&&p.push(y,R,L),(f!==n-1||c<Math.PI)&&p.push(R,F,L)}this.setIndex(p),this.setAttribute("position",new Pt(g,3)),this.setAttribute("normal",new Pt(_,3)),this.setAttribute("uv",new Pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var $o=class s extends qt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let o=[],a=[],c=[],l=[],h=new B,u=new B,d=new B;for(let p=0;p<=n;p++)for(let g=0;g<=i;g++){let _=g/i*r,m=p/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/i),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=i;g++){let _=(i+1)*p+g-1,m=(i+1)*(p-1)+g-1,f=(i+1)*(p-1)+g,S=(i+1)*p+g;o.push(_,m,S),o.push(m,f,S)}this.setIndex(o),this.setAttribute("position",new Pt(a,3)),this.setAttribute("normal",new Pt(c,3)),this.setAttribute("uv",new Pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var jo=class extends vn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ie(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}},Jo=class extends Nt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Xs=class extends vn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ml,this.normalScale=new Re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},In=class extends Xs{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Jt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ie(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ie(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ie(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Qo=class extends vn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ml,this.normalScale=new Re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}};function Co(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Zy(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Ky(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Vd(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)i[o++]=s[a+c]}return i}function gf(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}var Ii=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},il=class extends Ii{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Bu,endingEnd:Bu}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case zu:r=e,a=2*t-n;break;case ku:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case zu:o=e,c=2*n-t;break;case ku:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,f=-d*m+2*d*_-d*g,S=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,y=(-1-p)*m+(1.5+p)*_+.5*g,R=p*m-p*_;for(let F=0;F!==a;++F)r[F]=f*o[h+F]+S*o[l+F]+y*o[c+F]+R*o[u+F];return r}},sl=class extends Ii{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},rl=class extends Ii{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Dn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Co(t,this.TimeBufferType),this.values=Co(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Co(e.times,Array),values:Co(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new rl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new sl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new il(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Bs:t=this.InterpolantFactoryMethodDiscrete;break;case ts:t=this.InterpolantFactoryMethodLinear;break;case ac:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Bs;case this.InterpolantFactoryMethodLinear:return ts;case this.InterpolantFactoryMethodSmooth:return ac}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&Zy(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ac,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(i)c=!0;else{let u=a*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){let _=t[u+g];if(_!==t[d+g]||_!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let p=0;p!==n;++p)t[d+p]=t[u+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Dn.prototype.TimeBufferType=Float32Array;Dn.prototype.ValueBufferType=Float32Array;Dn.prototype.DefaultInterpolation=ts;var Di=class extends Dn{};Di.prototype.ValueTypeName="bool";Di.prototype.ValueBufferType=Array;Di.prototype.DefaultInterpolation=Bs;Di.prototype.InterpolantFactoryMethodLinear=void 0;Di.prototype.InterpolantFactoryMethodSmooth=void 0;var ea=class extends Dn{};ea.prototype.ValueTypeName="color";var pi=class extends Dn{};pi.prototype.ValueTypeName="number";var ol=class extends Ii{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t),l=e*a;for(let h=l+a;l!==h;l+=4)_n.slerpFlat(r,0,o,l-a,o,l,c);return r}},Qn=class extends Dn{InterpolantFactoryMethodLinear(e){return new ol(this.times,this.values,this.getValueSize(),e)}};Qn.prototype.ValueTypeName="quaternion";Qn.prototype.DefaultInterpolation=ts;Qn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ui=class extends Dn{};Ui.prototype.ValueTypeName="string";Ui.prototype.ValueBufferType=Array;Ui.prototype.DefaultInterpolation=Bs;Ui.prototype.InterpolantFactoryMethodLinear=void 0;Ui.prototype.InterpolantFactoryMethodSmooth=void 0;var mi=class extends Dn{};mi.prototype.ValueTypeName="vector";var ta=class{constructor(e,t=-1,n,i=Tg){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Hn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(jy(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Dn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=Ky(c);c=Vd(c,1,h),l=Vd(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new pi(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(l)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,p,g,_){if(p.length!==0){let m=[],f=[];gf(p,m,f,g),m.length!==0&&_.push(new u(d,m,f))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let p={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)p[d[g].morphTargets[_]]=-1;for(let _ in p){let m=[],f=[];for(let S=0;S!==d[g].morphTargets.length;++S){let y=d[g];m.push(y.time),f.push(y.morphTarget===_?1:0)}i.push(new pi(".morphTargetInfluence["+_+"]",m,f))}c=p.length*o}else{let p=".bones["+t[u].name+"]";n(mi,p+".position",d,"pos",i),n(Qn,p+".quaternion",d,"rot",i),n(mi,p+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function $y(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return pi;case"vector":case"vector2":case"vector3":case"vector4":return mi;case"color":return ea;case"quaternion":return Qn;case"bool":case"boolean":return Di;case"string":return Ui}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function jy(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=$y(s.type);if(s.times===void 0){let t=[],n=[];gf(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var Ri={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},al=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},Jy=new al,Un=class{constructor(e){this.manager=e!==void 0?e:Jy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Un.DEFAULT_MATERIAL_NAME="__DEFAULT";var ci={},cl=class extends Error{constructor(e,t){super(e),this.response=t}},gi=class extends Un{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Ri.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ci[e]!==void 0){ci[e].push({onLoad:t,onProgress:n,onError:i});return}ci[e]=[],ci[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=ci[e],u=l.body.getReader(),d=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),p=d?parseInt(d):0,g=p!==0,_=0,m=new ReadableStream({start(f){S();function S(){u.read().then(({done:y,value:R})=>{if(y)f.close();else{_+=R.byteLength;let F=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let L=0,P=h.length;L<P;L++){let k=h[L];k.onProgress&&k.onProgress(F)}f.enqueue(R),S()}})}}});return new Response(m)}else throw new cl(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(d);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{Ri.add(e,l);let h=ci[e];delete ci[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onLoad&&p.onLoad(l)}}).catch(l=>{let h=ci[e];if(h===void 0)throw this.manager.itemError(e),l;delete ci[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var ll=class extends Un{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Ri.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=xr("img");function c(){h(),Ri.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var qs=class extends Un{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new Pi,a=new gi(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(c){let l;try{l=r.parse(c)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}l.image!==void 0?o.image=l.image:l.data!==void 0&&(o.image.width=l.width,o.image.height=l.height,o.image.data=l.data),o.wrapS=l.wrapS!==void 0?l.wrapS:Ot,o.wrapT=l.wrapT!==void 0?l.wrapT:Ot,o.magFilter=l.magFilter!==void 0?l.magFilter:bt,o.minFilter=l.minFilter!==void 0?l.minFilter:bt,o.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0?o.colorSpace=l.colorSpace:l.encoding!==void 0&&(o.encoding=l.encoding),l.flipY!==void 0&&(o.flipY=l.flipY),l.format!==void 0&&(o.format=l.format),l.type!==void 0&&(o.type=l.type),l.mipmaps!==void 0&&(o.mipmaps=l.mipmaps,o.minFilter=Vn),l.mipmapCount===1&&(o.minFilter=bt),l.generateMipmaps!==void 0&&(o.generateMipmaps=l.generateMipmaps),o.needsUpdate=!0,t&&t(o,l)},n,i),o}},Ni=class extends Un{constructor(e){super(e)}load(e,t,n,i){let r=new Wt,o=new ll(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},Lr=class extends Ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ie(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}};var Dc=new $e,Gd=new B,Wd=new B,Ir=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Re(512,512),this.map=null,this.mapPass=null,this.matrix=new $e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sr,this._frameExtents=new Re(1,1),this._viewportCount=1,this._viewports=[new Et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Gd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Gd),Wd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wd),t.updateMatrixWorld(),Dc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Dc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},hl=class extends Ir{constructor(){super(new kt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=zs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Ys=class extends Lr{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new hl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Xd=new $e,dr=new B,Uc=new B,ul=class extends Ir{constructor(){super(new kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Re(4,2),this._viewportCount=6,this._viewports=[new Et(2,1,1,1),new Et(0,1,1,1),new Et(3,1,1,1),new Et(1,1,1,1),new Et(3,0,1,1),new Et(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),dr.setFromMatrixPosition(e.matrixWorld),n.position.copy(dr),Uc.copy(n.position),Uc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Uc),n.updateMatrixWorld(),i.makeTranslation(-dr.x,-dr.y,-dr.z),Xd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xd)}},na=class extends Lr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ul}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},dl=class extends Ir{constructor(){super(new jn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ia=class extends Lr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.shadow=new dl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Oi=class{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var sa=class extends Un{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Ri.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ri.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Ri.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Ri.add(e,c),r.manager.itemStart(e)}};var Zs=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=qd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=qd();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function qd(){return(typeof performance>"u"?Date:performance).now()}var bl="\\[\\]\\.:\\/",Qy=new RegExp("["+bl+"]","g"),Tl="[^"+bl+"]",eM="[^"+bl.replace("\\.","")+"]",tM=/((?:WC+[\/:])*)/.source.replace("WC",Tl),nM=/(WCOD+)?/.source.replace("WCOD",eM),iM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Tl),sM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Tl),rM=new RegExp("^"+tM+nM+iM+sM+"$"),oM=["material","materials","bones","map"],fl=class{constructor(e,t,n){let i=n||wt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},wt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Qy,"")}static parseTrackName(e){let t=rM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);oM.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[i];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};wt.Composite=fl;wt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};wt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};wt.prototype.GetterByBindingType=[wt.prototype._getValue_direct,wt.prototype._getValue_array,wt.prototype._getValue_arrayElement,wt.prototype._getValue_toArray];wt.prototype.SetterByBindingTypeAndVersioning=[[wt.prototype._setValue_direct,wt.prototype._setValue_direct_setNeedsUpdate,wt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_array,wt.prototype._setValue_array_setNeedsUpdate,wt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_arrayElement,wt.prototype._setValue_arrayElement_setNeedsUpdate,wt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_fromArray,wt.prototype._setValue_fromArray_setNeedsUpdate,wt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var yE=new Float32Array(1);var ra=class{constructor(e,t,n=0,i=1/0){this.ray=new fi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new yr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return pl(e,this,n,t),n.sort(Yd),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)pl(e[i],this,n,t);return n.sort(Yd),n}};function Yd(s,e){return s.distance-e.distance}function pl(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){let i=s.children;for(let r=0,o=i.length;r<o;r++)pl(i[r],e,t,!0)}}var Dr=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Jt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");function vf(){return new Vs}var aM=.1,cM=100;function _f(s,e){let{fov:t,position:n}=s.camera,i=new kt(t,e,aM,cM);return i.position.set(n.x,n.y,n.z),i}var lM={aces:$s,agx:os,none:Zn};function xf(s){let{antialias:e,preserveDrawingBuffer:t,alpha:n,maxPixelRatio:i,toneMappingExposure:r,shadows:o}=s.renderer,a=new wr({antialias:e,preserveDrawingBuffer:t,alpha:n,powerPreference:"high-performance"});return a.setPixelRatio(Math.min(window.devicePixelRatio,i)),a.setClearAlpha(0),a.outputColorSpace=ht,a.toneMapping=lM[s.renderer.toneMapping]??$s,a.toneMappingExposure=r,o&&(a.shadowMap.enabled=!0,a.shadowMap.type=oa),a}function yf(s,e){let{shadow:t}=e.lighting,n=new Ht;n.name="LightingRig";let i=new Ys(16777215,0);return i.name="KeyLight",i.decay=2,i.distance=0,i.penumbra=1,e.renderer.shadows&&(i.castShadow=!0,i.shadow.mapSize.set(t.mapSize,t.mapSize),i.shadow.radius=t.radius,i.shadow.camera.near=t.near,i.shadow.camera.far=t.far,i.shadow.bias=t.bias,i.shadow.normalBias=t.normalBias),n.add(i),n.add(i.target),s.add(n),n}function Al(s,e,t){let n=t.lighting.keyLight;if(!(n!=null&&n.enabled))return null;let i=s.getObjectByName("KeyLight");if(!i)return null;let r=n.distance;return i.position.copy(e.direction).multiplyScalar(r),i.target.position.set(0,0,0),i.target.updateMatrixWorld(),i.angle=Math.atan(t.lighting.shadow.frustum/r),n.useColor&&i.color.copy(e.color),i.intensity=e.irradiance*n.intensityScale*r*r,i}var Mf={type:"change"},Rl={type:"start"},Sf={type:"end"},fa=new fi,Ef=new En,hM=Math.cos(70*Kt.DEG2RAD),pa=class extends $n{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ss.ROTATE,MIDDLE:ss.DOLLY,RIGHT:ss.PAN},this.touches={ONE:rs.ROTATE,TWO:rs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(I){I.addEventListener("keydown",de),this._domElementKeyEvents=I},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",de),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Mf),n.update(),r=i.NONE},this.update=(function(){let I=new B,re=new _n().setFromUnitVectors(e.up,new B(0,1,0)),pe=re.clone().invert(),ge=new B,Le=new _n,ze=new B,Be=2*Math.PI;return function(q=null){let z=n.object.position;I.copy(z).sub(n.target),I.applyQuaternion(re),a.setFromVector3(I),n.autoRotate&&r===i.NONE&&H(M(q)),n.enableDamping?(a.theta+=c.theta*n.dampingFactor,a.phi+=c.phi*n.dampingFactor):(a.theta+=c.theta,a.phi+=c.phi);let xe=n.minAzimuthAngle,ye=n.maxAzimuthAngle;isFinite(xe)&&isFinite(ye)&&(xe<-Math.PI?xe+=Be:xe>Math.PI&&(xe-=Be),ye<-Math.PI?ye+=Be:ye>Math.PI&&(ye-=Be),xe<=ye?a.theta=Math.max(xe,Math.min(ye,a.theta)):a.theta=a.theta>(xe+ye)/2?Math.max(xe,a.theta):Math.min(ye,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&L||n.object.isOrthographicCamera?a.radius=J(a.radius):a.radius=J(a.radius*l),I.setFromSpherical(a),I.applyQuaternion(pe),z.copy(n.target).add(I),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),h.set(0,0,0));let qe=!1;if(n.zoomToCursor&&L){let ke=null;if(n.object.isPerspectiveCamera){let lt=I.length();ke=J(lt*l);let ut=lt-ke;n.object.position.addScaledVector(R,ut),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let lt=new B(F.x,F.y,0);lt.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),qe=!0;let ut=new B(F.x,F.y,0);ut.unproject(n.object),n.object.position.sub(ut).add(lt),n.object.updateMatrixWorld(),ke=I.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;ke!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(ke).add(n.object.position):(fa.origin.copy(n.object.position),fa.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(fa.direction))<hM?e.lookAt(n.target):(Ef.setFromNormalAndCoplanarPoint(n.object.up,n.target),fa.intersectPlane(Ef,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),qe=!0);return l=1,L=!1,qe||ge.distanceToSquared(n.object.position)>o||8*(1-Le.dot(n.object.quaternion))>o||ze.distanceToSquared(n.target)>0?(n.dispatchEvent(Mf),ge.copy(n.object.position),Le.copy(n.object.quaternion),ze.copy(n.target),!0):!1}})(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Ae),n.domElement.removeEventListener("pointerdown",Ze),n.domElement.removeEventListener("pointercancel",E),n.domElement.removeEventListener("wheel",le),n.domElement.removeEventListener("pointermove",T),n.domElement.removeEventListener("pointerup",E),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",de),n._domElementKeyEvents=null)};let n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},r=i.NONE,o=1e-6,a=new Dr,c=new Dr,l=1,h=new B,u=new Re,d=new Re,p=new Re,g=new Re,_=new Re,m=new Re,f=new Re,S=new Re,y=new Re,R=new B,F=new Re,L=!1,P=[],k={};function M(I){return I!==null?2*Math.PI/60*n.autoRotateSpeed*I:2*Math.PI/60/60*n.autoRotateSpeed}function b(I){let re=Math.abs(I)/(100*(window.devicePixelRatio|0));return Math.pow(.95,n.zoomSpeed*re)}function H(I){c.theta-=I}function X(I){c.phi-=I}let ie=(function(){let I=new B;return function(pe,ge){I.setFromMatrixColumn(ge,0),I.multiplyScalar(-pe),h.add(I)}})(),D=(function(){let I=new B;return function(pe,ge){n.screenSpacePanning===!0?I.setFromMatrixColumn(ge,1):(I.setFromMatrixColumn(ge,0),I.crossVectors(n.object.up,I)),I.multiplyScalar(pe),h.add(I)}})(),G=(function(){let I=new B;return function(pe,ge){let Le=n.domElement;if(n.object.isPerspectiveCamera){let ze=n.object.position;I.copy(ze).sub(n.target);let Be=I.length();Be*=Math.tan(n.object.fov/2*Math.PI/180),ie(2*pe*Be/Le.clientHeight,n.object.matrix),D(2*ge*Be/Le.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(ie(pe*(n.object.right-n.object.left)/n.object.zoom/Le.clientWidth,n.object.matrix),D(ge*(n.object.top-n.object.bottom)/n.object.zoom/Le.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function W(I){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function te(I){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ne(I,re){if(!n.zoomToCursor)return;L=!0;let pe=n.domElement.getBoundingClientRect(),ge=I-pe.left,Le=re-pe.top,ze=pe.width,Be=pe.height;F.x=ge/ze*2-1,F.y=-(Le/Be)*2+1,R.set(F.x,F.y,1).unproject(n.object).sub(n.object.position).normalize()}function J(I){return Math.max(n.minDistance,Math.min(n.maxDistance,I))}function ee(I){u.set(I.clientX,I.clientY)}function oe(I){ne(I.clientX,I.clientX),f.set(I.clientX,I.clientY)}function he(I){g.set(I.clientX,I.clientY)}function K(I){d.set(I.clientX,I.clientY),p.subVectors(d,u).multiplyScalar(n.rotateSpeed);let re=n.domElement;H(2*Math.PI*p.x/re.clientHeight),X(2*Math.PI*p.y/re.clientHeight),u.copy(d),n.update()}function se(I){S.set(I.clientX,I.clientY),y.subVectors(S,f),y.y>0?W(b(y.y)):y.y<0&&te(b(y.y)),f.copy(S),n.update()}function Se(I){_.set(I.clientX,I.clientY),m.subVectors(_,g).multiplyScalar(n.panSpeed),G(m.x,m.y),g.copy(_),n.update()}function _e(I){ne(I.clientX,I.clientY),I.deltaY<0?te(b(I.deltaY)):I.deltaY>0&&W(b(I.deltaY)),n.update()}function Te(I){let re=!1;switch(I.code){case n.keys.UP:I.ctrlKey||I.metaKey||I.shiftKey?X(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(0,n.keyPanSpeed),re=!0;break;case n.keys.BOTTOM:I.ctrlKey||I.metaKey||I.shiftKey?X(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(0,-n.keyPanSpeed),re=!0;break;case n.keys.LEFT:I.ctrlKey||I.metaKey||I.shiftKey?H(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(n.keyPanSpeed,0),re=!0;break;case n.keys.RIGHT:I.ctrlKey||I.metaKey||I.shiftKey?H(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(-n.keyPanSpeed,0),re=!0;break}re&&(I.preventDefault(),n.update())}function Ue(I){if(P.length===1)u.set(I.pageX,I.pageY);else{let re=Je(I),pe=.5*(I.pageX+re.x),ge=.5*(I.pageY+re.y);u.set(pe,ge)}}function Ge(I){if(P.length===1)g.set(I.pageX,I.pageY);else{let re=Je(I),pe=.5*(I.pageX+re.x),ge=.5*(I.pageY+re.y);g.set(pe,ge)}}function Ne(I){let re=Je(I),pe=I.pageX-re.x,ge=I.pageY-re.y,Le=Math.sqrt(pe*pe+ge*ge);f.set(0,Le)}function tt(I){n.enableZoom&&Ne(I),n.enablePan&&Ge(I)}function Z(I){n.enableZoom&&Ne(I),n.enableRotate&&Ue(I)}function At(I){if(P.length==1)d.set(I.pageX,I.pageY);else{let pe=Je(I),ge=.5*(I.pageX+pe.x),Le=.5*(I.pageY+pe.y);d.set(ge,Le)}p.subVectors(d,u).multiplyScalar(n.rotateSpeed);let re=n.domElement;H(2*Math.PI*p.x/re.clientHeight),X(2*Math.PI*p.y/re.clientHeight),u.copy(d)}function Oe(I){if(P.length===1)_.set(I.pageX,I.pageY);else{let re=Je(I),pe=.5*(I.pageX+re.x),ge=.5*(I.pageY+re.y);_.set(pe,ge)}m.subVectors(_,g).multiplyScalar(n.panSpeed),G(m.x,m.y),g.copy(_)}function We(I){let re=Je(I),pe=I.pageX-re.x,ge=I.pageY-re.y,Le=Math.sqrt(pe*pe+ge*ge);S.set(0,Le),y.set(0,Math.pow(S.y/f.y,n.zoomSpeed)),W(y.y),f.copy(S);let ze=(I.pageX+re.x)*.5,Be=(I.pageY+re.y)*.5;ne(ze,Be)}function De(I){n.enableZoom&&We(I),n.enablePan&&Oe(I)}function gt(I){n.enableZoom&&We(I),n.enableRotate&&At(I)}function Ze(I){n.enabled!==!1&&(P.length===0&&(n.domElement.setPointerCapture(I.pointerId),n.domElement.addEventListener("pointermove",T),n.domElement.addEventListener("pointerup",E)),Fe(I),I.pointerType==="touch"?Pe(I):$(I))}function T(I){n.enabled!==!1&&(I.pointerType==="touch"?we(I):fe(I))}function E(I){Xe(I),P.length===0&&(n.domElement.releasePointerCapture(I.pointerId),n.domElement.removeEventListener("pointermove",T),n.domElement.removeEventListener("pointerup",E)),n.dispatchEvent(Sf),r=i.NONE}function $(I){let re;switch(I.button){case 0:re=n.mouseButtons.LEFT;break;case 1:re=n.mouseButtons.MIDDLE;break;case 2:re=n.mouseButtons.RIGHT;break;default:re=-1}switch(re){case ss.DOLLY:if(n.enableZoom===!1)return;oe(I),r=i.DOLLY;break;case ss.ROTATE:if(I.ctrlKey||I.metaKey||I.shiftKey){if(n.enablePan===!1)return;he(I),r=i.PAN}else{if(n.enableRotate===!1)return;ee(I),r=i.ROTATE}break;case ss.PAN:if(I.ctrlKey||I.metaKey||I.shiftKey){if(n.enableRotate===!1)return;ee(I),r=i.ROTATE}else{if(n.enablePan===!1)return;he(I),r=i.PAN}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(Rl)}function fe(I){switch(r){case i.ROTATE:if(n.enableRotate===!1)return;K(I);break;case i.DOLLY:if(n.enableZoom===!1)return;se(I);break;case i.PAN:if(n.enablePan===!1)return;Se(I);break}}function le(I){n.enabled===!1||n.enableZoom===!1||r!==i.NONE||(I.preventDefault(),n.dispatchEvent(Rl),_e(I),n.dispatchEvent(Sf))}function de(I){n.enabled===!1||n.enablePan===!1||Te(I)}function Pe(I){switch(ce(I),P.length){case 1:switch(n.touches.ONE){case rs.ROTATE:if(n.enableRotate===!1)return;Ue(I),r=i.TOUCH_ROTATE;break;case rs.PAN:if(n.enablePan===!1)return;Ge(I),r=i.TOUCH_PAN;break;default:r=i.NONE}break;case 2:switch(n.touches.TWO){case rs.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;tt(I),r=i.TOUCH_DOLLY_PAN;break;case rs.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Z(I),r=i.TOUCH_DOLLY_ROTATE;break;default:r=i.NONE}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(Rl)}function we(I){switch(ce(I),r){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;At(I),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;Oe(I),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;De(I),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;gt(I),n.update();break;default:r=i.NONE}}function Ae(I){n.enabled!==!1&&I.preventDefault()}function Fe(I){P.push(I.pointerId)}function Xe(I){delete k[I.pointerId];for(let re=0;re<P.length;re++)if(P[re]==I.pointerId){P.splice(re,1);return}}function ce(I){let re=k[I.pointerId];re===void 0&&(re=new Re,k[I.pointerId]=re),re.set(I.pageX,I.pageY)}function Je(I){let re=I.pointerId===P[0]?P[1]:P[0];return k[re]}n.domElement.addEventListener("contextmenu",Ae),n.domElement.addEventListener("pointerdown",Ze),n.domElement.addEventListener("pointercancel",E),n.domElement.addEventListener("wheel",le,{passive:!1}),this.update()}};function wf(s,e,t){let n=t.controls,i=new pa(s,e);return i.enableDamping=n.enableDamping,i.dampingFactor=n.dampingFactor,i.minDistance=n.minDistance,i.maxDistance=n.maxDistance,i.maxPolarAngle=n.maxPolarAngle,i.enablePan=n.enablePan,i.autoRotate=!1,i.update(),i}var Cl={from:"#include <begin_vertex>",to:`#include <begin_vertex>
	vPlanePos = position.xy;`},Pl={from:"gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );",to:`float dist = length( vPlanePos );
    float reach = 1.0 - smoothstep( falloffStart, falloffEnd, dist );
    gl_FragColor = vec4( color, opacity * reach * ( 1.0 - studioShadowMask() ) );`},uM=`
uniform vec2 studioPenumbra;
uniform vec2 studioShadowCamera;
uniform bool studioShadowEnabled;
float studioLinearDepth(float depth) {
  float near = studioShadowCamera.x;
  float far = studioShadowCamera.y;
  return near * far / (far - depth * (far - near));
}
#if defined(USE_SHADOWMAP) && NUM_SPOT_LIGHT_SHADOWS > 0
float studioCompare(vec2 uv, float depth) {
  vec2 size = spotLightShadows[0].shadowMapSize;
  vec2 pixel = uv * size - 0.5;
  vec2 weight = fract(pixel);
  vec2 base = (floor(pixel) + 0.5) / size;
  vec2 stepUV = 1.0 / size;
  return mix(
    mix(texture2DCompare(spotShadowMap[0], base, depth),
        texture2DCompare(spotShadowMap[0], base + vec2(stepUV.x, 0.0), depth), weight.x),
    mix(texture2DCompare(spotShadowMap[0], base + vec2(0.0, stepUV.y), depth),
        texture2DCompare(spotShadowMap[0], base + stepUV, depth), weight.x), weight.y);
}
#endif
float studioShadowMask() {
  float result = 1.0;
  #if defined(USE_SHADOWMAP) && NUM_SPOT_LIGHT_SHADOWS > 0
    if (studioShadowEnabled && receiveShadow) {
      vec3 coord = vSpotLightCoord[0].xyz / vSpotLightCoord[0].w;
      coord.z += spotLightShadows[0].shadowBias;
      result = 1.0;
      if (coord.z <= 1.0 && coord.x >= 0.0 && coord.x <= 1.0 && coord.y >= 0.0 && coord.y <= 1.0) {
      float blockerSum = 0.0;
      float blockerCount = 0.0;
      vec2 searchRadius = studioPenumbra.y / spotLightShadows[0].shadowMapSize;
      #pragma unroll_loop_start
      for (int i = 0; i < 24; i++) {
        {
        float radius = sqrt((float(UNROLLED_LOOP_INDEX) + 0.5) / 24.0);
        float angle = float(UNROLLED_LOOP_INDEX) * 2.39996323;
        vec2 uv = coord.xy + vec2(cos(angle), sin(angle)) * radius * searchRadius;
        float depth = unpackRGBAToDepth(texture2D(spotShadowMap[0], uv));
        if (depth < coord.z) {
          blockerSum += studioLinearDepth(depth);
          blockerCount += 1.0;
        }
        }
      }
      #pragma unroll_loop_end
      float separation = max(0.0, studioLinearDepth(coord.z) - blockerSum / max(1.0, blockerCount));
      float spread = mix(studioPenumbra.x, studioPenumbra.y,
        smoothstep(0.0, 0.45, separation));
      vec2 texel = spread / spotLightShadows[0].shadowMapSize;
      float visibility = 0.0;
      #pragma unroll_loop_start
      for (int i = 0; i < 64; i++) {
        {
        float t = (float(UNROLLED_LOOP_INDEX) + 0.5) / 64.0;
        float radius = sqrt(-2.0 * log(1.0 - t * 0.98)) * 0.5;
        float angle = float(UNROLLED_LOOP_INDEX) * 2.39996323;
        vec2 offset = vec2(cos(angle), sin(angle)) * radius * texel;
        visibility += studioCompare(coord.xy + offset, coord.z);
        }
      }
      #pragma unroll_loop_end
      result = blockerCount > 0.0 ? visibility / 64.0 : 1.0;
      }
    }
  #endif
  if (!studioShadowEnabled) result = getShadowMask();
  return result;
}
`;function bf(s){let e=s.shadowCatcher,t=s.lighting.shadow.frustum*2;e.size>t&&console.warn(`shadowCatcher.size (${e.size}) \u0431\u043E\u043B\u044C\u0448\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043A\u0430\u0440\u0442\u044B \u0442\u0435\u043D\u0435\u0439 (${t}). \u041F\u043E \u043A\u0430\u0434\u0440\u0443 \u043F\u043E\u0439\u0434\u0451\u0442 \u0431\u043B\u0435\u0434\u043D\u0430\u044F \u043F\u043E\u043B\u043E\u0441\u0430 \u2014 \u0443\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u0435 \u0440\u0430\u0437\u043C\u0435\u0440 \u0438\u043B\u0438 \u043F\u043E\u0434\u043D\u0438\u043C\u0438\u0442\u0435 lighting.shadow.frustum.`);let n=new jo;n.color.set(e.tint??"#000000"),n.opacity=e.opacity,n.transparent=!0,n.depthWrite=!1;let i={falloffStart:{value:e.falloffStart??.2},falloffEnd:{value:e.falloffEnd??1},studioPenumbra:{value:new Re(2,42)},studioShadowCamera:{value:new Re(s.lighting.shadow.near,s.lighting.shadow.far)},studioShadowEnabled:{value:!1}};n.onBeforeCompile=o=>{if(o.uniforms.falloffStart=i.falloffStart,o.uniforms.falloffEnd=i.falloffEnd,o.uniforms.studioPenumbra=i.studioPenumbra,o.uniforms.studioShadowCamera=i.studioShadowCamera,o.uniforms.studioShadowEnabled=i.studioShadowEnabled,!o.vertexShader.includes(Cl.from)||!o.fragmentShader.includes(Pl.from)){console.warn("ShadowCatcher: \u0448\u0435\u0439\u0434\u0435\u0440 ShadowMaterial \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F \u2014 \u0442\u0435\u043D\u044C \u0431\u0443\u0434\u0435\u0442 \u0431\u0435\u0437 \u0437\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u044F.");return}o.vertexShader=`varying vec2 vPlanePos;
${o.vertexShader}`.replace(Cl.from,Cl.to),o.fragmentShader=`uniform float falloffStart;
uniform float falloffEnd;
varying vec2 vPlanePos;
${o.fragmentShader}`.replace(Pl.from,Pl.to).replace("#include <shadowmask_pars_fragment>",`#include <shadowmask_pars_fragment>
`+uM)};let r=new ct(new Tn(e.size,e.size),n);return r.rotation.x=-Math.PI/2,r.receiveShadow=!0,r.renderOrder=-1,r.layers.set(1),r.name="ShadowCatcher",{plane:r,setHeight(o){r.position.y=o},setOpacity(o){n.opacity=o},setPenumbra(o){i.studioShadowEnabled.value=!!o,o&&i.studioPenumbra.value.set(o.near,o.far)},setFalloff(o,a){o!=null&&(i.falloffStart.value=o),a!=null&&(i.falloffEnd.value=a)},dispose(){r.geometry.dispose(),n.dispose(),r.removeFromParent()}}}var Tf={name:"HorizontalBlurShader",uniforms:{tDiffuse:{value:null},h:{value:.001953125}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform float h;

		varying vec2 vUv;

		void main() {

			vec4 sum = vec4( 0.0 );

			sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
			sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
			sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

			gl_FragColor = sum;

		}`};var Af={name:"VerticalBlurShader",uniforms:{tDiffuse:{value:null},v:{value:.001953125}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform float v;

		varying vec2 vUv;

		void main() {

			vec4 sum = vec4( 0.0 );

			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

			gl_FragColor = sum;

		}`};var as,Rf,Il,Ll=class{constructor(e){an(this,as);let{size:t,resolution:n,height:i,blur:r,opacity:o,darkness:a,falloff:c}=e.ambientShadow;this.config=e,this.blurAmount=r,this.group=new Ht,this.group.name="AmbientContactShadow";let l={depthBuffer:!1,stencilBuffer:!1};this.target=new Xt(n,n,{...l,depthBuffer:!0}),this.blurTarget=new Xt(n,n,l),this.target.texture.generateMipmaps=!1,this.blurTarget.texture.generateMipmaps=!1;let h=new Tn(t,t).rotateX(Math.PI/2);this.plane=new ct(h,new zt({map:this.target.texture,opacity:o,transparent:!0,depthWrite:!1})),this.plane.scale.y=-1,this.plane.renderOrder=-2,this.plane.layers.set(1),this.group.add(this.plane),this.blurPlane=new ct(h),this.blurPlane.visible=!1,this.group.add(this.blurPlane),this.camera=new jn(-t/2,t/2,t/2,-t/2,0,i),this.camera.rotation.x=Math.PI/2,this.group.add(this.camera),this.blurCamera=this.camera.clone(),this.group.add(this.blurCamera),this.depthMaterial=V(this,as,Rf).call(this,a,c),this.horizontalBlur=new Nt(Tf),this.verticalBlur=new Nt(Af)}setAppearance(e){let{height:t,darkness:n,blur:i,opacity:r,falloff:o,resolution:a,nearestSurface:c=!1}={...this.config.ambientShadow,...e};this.target.setSize(a,a),this.blurTarget.setSize(a,a),this.depthMaterial.depthTest=c,this.camera.position.y=c?-1e-4:0,this.camera.far=t,this.camera.updateProjectionMatrix(),this.blurCamera.far=t,this.blurCamera.updateProjectionMatrix(),this.depthMaterial.userData.darkness.value=n,this.depthMaterial.userData.falloff.value=o??1,this.blurAmount=i,this.plane.material.opacity=r}update(e,t){let n=e.shadowMap.autoUpdate;e.shadowMap.autoUpdate=!1;let i=t.background;this.plane.visible=!1,t.background=null,t.overrideMaterial=this.depthMaterial;let r=[];t.traverse(o=>{o.visible&&o.userData.excludeFromShadow&&(o.visible=!1,r.push(o))}),e.setRenderTarget(this.target),e.render(t,this.camera);for(let o of r)o.visible=!0;t.overrideMaterial=null,V(this,as,Il).call(this,e,this.blurAmount),V(this,as,Il).call(this,e,this.blurAmount*.4),e.setRenderTarget(null),t.background=i,this.plane.visible=!0,e.shadowMap.autoUpdate=n}dispose(){this.target.dispose(),this.blurTarget.dispose(),this.plane.geometry.dispose(),this.plane.material.dispose(),this.depthMaterial.dispose(),this.horizontalBlur.dispose(),this.verticalBlur.dispose()}};as=new WeakSet,Rf=function(e,t){let n=new Er;return n.userData.darkness={value:e},n.userData.falloff={value:t??1},n.onBeforeCompile=i=>{i.uniforms.darkness=n.userData.darkness,i.uniforms.falloff=n.userData.falloff;let r="gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );",o="gl_FragColor = vec4( vec3( 0.0 ), pow( 1.0 - fragCoordZ, falloff ) * darkness );";if(!i.fragmentShader.includes(r)){console.warn("AmbientContactShadow: \u0448\u0435\u0439\u0434\u0435\u0440 MeshDepthMaterial \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F \u2014 \u0442\u0435\u043D\u044C \u0431\u0443\u0434\u0435\u0442 \u043D\u0435\u0432\u0435\u0440\u043D\u043E\u0439.");return}i.fragmentShader=`uniform float darkness;
uniform float falloff;
${i.fragmentShader}`.replace(r,o)},n},Il=function(e,t){this.blurPlane.visible=!0,this.blurPlane.material=this.horizontalBlur,this.horizontalBlur.uniforms.tDiffuse.value=this.target.texture,this.horizontalBlur.uniforms.h.value=t/256,e.setRenderTarget(this.blurTarget),e.render(this.blurPlane,this.blurCamera),this.blurPlane.material=this.verticalBlur,this.verticalBlur.uniforms.tDiffuse.value=this.blurTarget.texture,this.verticalBlur.uniforms.v.value=t/256,e.setRenderTarget(this.target),e.render(this.blurPlane,this.blurCamera),this.blurPlane.visible=!1};function Cf(s){return new Ll(s)}var Or=24,dM=128,Ul=1842206,fM=16777215,pM=15214860,Dl={light:{color:Ul,ring:.18,ticks:.3},dark:{color:fM,ring:.32,ticks:.55}},mM=.45,gM=s=>-s,Pf=s=>-s,ot,Lf,Fr,If,ma,Ol,Fl,Df,Uf,Nf,Bl,zl,kl,Nl=class{constructor({scene:e,camera:t,controls:n,domElement:i,config:r,onRotate:o,onDragStart:a,onDragEnd:c}){an(this,ot);this.camera=t,this.controls=n,this.domElement=i,this.options=r.turntable,this.onRotate=o,this.onDragStart=a,this.onDragEnd=c,this.metrics=null,this.visible=!1,this.pinned=!1,this.dragging=!1,this.capturing=!1,this.fade=0,this.theme=Dl.light,this.snap=null,this.raycaster=new ra,this.pointer=new Re,this.floor=new En(new B(0,1,0),0),this.hit=new B,this.group=new Ht,this.group.name="Turntable",this.group.visible=!1,this.group.userData.excludeFromShadow=!0,V(this,ot,Lf).call(this),this.group.traverse(l=>l.layers.set(1)),this.raycaster.layers.enable(1),e.add(this.group),V(this,ot,If).call(this)}setBackground(e){let t=.2126*e.r+.7152*e.g+.0722*e.b;this.theme=t<.4?Dl.dark:Dl.light,this.materials.ring.color.setHex(this.theme.color),this.materials.ticks.color.setHex(this.theme.color),V(this,ot,kl).call(this)}setMetrics(e){if(this.metrics=e,!e){this.group.visible=!1;return}let{center:t,baseY:n,radius:i}=e;this.group.position.set(t.x,n+i*this.options.lift,t.z),this.group.scale.setScalar(i),this.floor.constant=-this.group.position.y}togglePinned(){return this.pinned=!this.pinned,this.pinned?this.show():this.dragging||this.hide(),this.pinned}show(){this.visible=!0}setHiddenForCapture(e){this.capturing=e,this.group.visible=!e&&this.fade>.001&&!!this.metrics}hide(){this.dragging||this.pinned||(this.visible=!1,this.domElement.style.cursor="")}update(e,t=.016){var o,a;this.currentRotation=e;let n=!1,i=this.visible?1:0;if(this.fade!==i){let c=t/.2;this.fade=i>this.fade?Math.min(this.fade+c,1):Math.max(this.fade-c,0),V(this,ot,kl).call(this),n=!0}if(this.snap){this.snap.time+=t;let c=Math.min(this.snap.time/mM,1),l=1-(1-c)**3;(o=this.onRotate)==null||o.call(this,this.snap.from+(this.snap.to-this.snap.from)*l),c>=1&&(this.snap=null,(a=this.onDragEnd)==null||a.call(this)),n=!0}if(this.group.visible=!this.capturing&&this.fade>.001&&!!this.metrics,!this.group.visible)return n;let r=gM(e)*Math.PI/180;return this.knob.position.set(Math.cos(r),0,Math.sin(r)),this.knob.quaternion.copy(this.camera.quaternion),n}dispose(){this.group.traverse(e=>{e.geometry&&e.geometry.dispose()});for(let e of Object.values(this.materials))e.dispose();this.knobTarget.material.dispose(),this.tickTargets.material.dispose(),this.group.removeFromParent()}};ot=new WeakSet,Lf=function(){this.materials={ring:V(this,ot,Fr).call(this,Ul,.18),ticks:V(this,ot,Fr).call(this,Ul,.3),knob:V(this,ot,Fr).call(this,pM,1),knobRing:V(this,ot,Fr).call(this,16777215,1)};let e=new ct(new $o(1,.006,6,dM).rotateX(Math.PI/2),this.materials.ring);this.group.add(e);let t=[],n=new $e;for(let a=0;a<Or;a++){let c=a/Or*Math.PI*2;n.setPosition(Math.cos(c),0,Math.sin(c)),t.push(n.clone())}let i=a=>(t.forEach((c,l)=>a.setMatrixAt(l,c)),a.instanceMatrix.needsUpdate=!0,this.group.add(a),a);this.dots=i(new is(new Ws(.018,8,6),this.materials.ticks,Or)),this.tickTargets=i(new is(new Ws(.075,6,4),new zt({visible:!1}),Or)),this.knob=new Ht;let r=new ct(new Pr(.085,32),this.materials.knobRing),o=new ct(new Pr(.062,32),this.materials.knob);o.position.z=.001,this.knob.add(r,o),this.group.add(this.knob),this.knobTarget=new ct(new Ws(.16,8,6),new zt({visible:!1})),this.knob.add(this.knobTarget)},Fr=function(e,t){return new zt({color:e,opacity:t,transparent:!0,toneMapped:!1})},If=function(){let e=this.domElement;e.addEventListener("pointerdown",t=>V(this,ot,Df).call(this,t)),e.addEventListener("pointermove",t=>V(this,ot,Nf).call(this,t)),e.addEventListener("pointerup",t=>V(this,ot,Bl).call(this,t)),e.addEventListener("pointercancel",t=>V(this,ot,Bl).call(this,t))},ma=function(e){let t=this.domElement.getBoundingClientRect();this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera)},Ol=function(e){return!this.visible||!this.metrics?!1:(V(this,ot,ma).call(this,e),this.raycaster.intersectObject(this.knobTarget,!1).length>0)},Fl=function(e){if(!this.visible||!this.metrics)return null;V(this,ot,ma).call(this,e);let[t]=this.raycaster.intersectObject(this.tickTargets,!1);return t?t.instanceId??null:null},Df=function(e){var n,i,r;if(V(this,ot,Ol).call(this,e)){e.preventDefault(),this.dragging=!0,this.snap=null,(i=(n=this.domElement).setPointerCapture)==null||i.call(n,e.pointerId),this.controls.enabled=!1,(r=this.onDragStart)==null||r.call(this),V(this,ot,zl).call(this,e);return}let t=V(this,ot,Fl).call(this,e);t!==null&&(e.preventDefault(),V(this,ot,Uf).call(this,Pf(t/Or*360)))},Uf=function(e){var i;let t=this.currentRotation??0,n=((e-t)%360+540)%360-180;Math.abs(n)<.1||(this.snap={from:t,to:t+n,time:0},(i=this.onDragStart)==null||i.call(this))},Nf=function(e){if(this.dragging){V(this,ot,zl).call(this,e);return}this.visible&&(V(this,ot,Ol).call(this,e)?this.domElement.style.cursor="grab":this.domElement.style.cursor=V(this,ot,Fl).call(this,e)!==null?"pointer":"")},Bl=function(e){var t,n,i;this.dragging&&(this.dragging=!1,(n=(t=this.domElement).releasePointerCapture)==null||n.call(t,e.pointerId),this.controls.enabled=!0,this.domElement.style.cursor="",(i=this.onDragEnd)==null||i.call(this),this.pinned||this.hide())},zl=function(e){var i;if(!this.metrics||(V(this,ot,ma).call(this,e),!this.raycaster.ray.intersectPlane(this.floor,this.hit)))return;let t=this.hit.x-this.group.position.x,n=this.hit.z-this.group.position.z;(i=this.onRotate)==null||i.call(this,Pf(Math.atan2(n,t)*180/Math.PI))},kl=function(){let{ring:e,ticks:t,knob:n,knobRing:i}=this.materials;e.opacity=this.theme.ring*this.fade,t.opacity=this.theme.ticks*this.fade,n.opacity=this.fade,i.opacity=this.fade};function Of(s){return new Nl(s)}var Ff=function(s){return URL.createObjectURL(new Blob([s],{type:"text/javascript"}))},vM=function(s){return new Worker(s)};try{URL.revokeObjectURL(Ff(""))}catch{Ff=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)},vM=function(e){return new Worker(e,{type:"module"})}}var Nn=Uint8Array,Bi=Uint16Array,Gl=Uint32Array,Bf=new Nn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),zf=new Nn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),_M=new Nn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),kf=function(s,e){for(var t=new Bi(31),n=0;n<31;++n)t[n]=e+=1<<s[n-1];for(var i=new Gl(t[30]),n=1;n<30;++n)for(var r=t[n];r<t[n+1];++r)i[r]=r-t[n]<<5|n;return[t,i]},Hf=kf(Bf,2),Vf=Hf[0],xM=Hf[1];Vf[28]=258,xM[258]=28;var Gf=kf(zf,0),yM=Gf[0],VE=Gf[1],Wl=new Bi(32768);for(vt=0;vt<32768;++vt)vi=(vt&43690)>>>1|(vt&21845)<<1,vi=(vi&52428)>>>2|(vi&13107)<<2,vi=(vi&61680)>>>4|(vi&3855)<<4,Wl[vt]=((vi&65280)>>>8|(vi&255)<<8)>>>1;var vi,vt,Br=(function(s,e,t){for(var n=s.length,i=0,r=new Bi(e);i<n;++i)++r[s[i]-1];var o=new Bi(e);for(i=0;i<e;++i)o[i]=o[i-1]+r[i-1]<<1;var a;if(t){a=new Bi(1<<e);var c=15-e;for(i=0;i<n;++i)if(s[i])for(var l=i<<4|s[i],h=e-s[i],u=o[s[i]-1]++<<h,d=u|(1<<h)-1;u<=d;++u)a[Wl[u]>>>c]=l}else for(a=new Bi(n),i=0;i<n;++i)s[i]&&(a[i]=Wl[o[s[i]-1]++]>>>15-s[i]);return a}),zr=new Nn(288);for(vt=0;vt<144;++vt)zr[vt]=8;var vt;for(vt=144;vt<256;++vt)zr[vt]=9;var vt;for(vt=256;vt<280;++vt)zr[vt]=7;var vt;for(vt=280;vt<288;++vt)zr[vt]=8;var vt,Wf=new Nn(32);for(vt=0;vt<32;++vt)Wf[vt]=5;var vt;var MM=Br(zr,9,1);var SM=Br(Wf,5,1),Hl=function(s){for(var e=s[0],t=1;t<s.length;++t)s[t]>e&&(e=s[t]);return e},Wn=function(s,e,t){var n=e/8|0;return(s[n]|s[n+1]<<8)>>(e&7)&t},Vl=function(s,e){var t=e/8|0;return(s[t]|s[t+1]<<8|s[t+2]<<16)>>(e&7)},EM=function(s){return(s/8|0)+(s&7&&1)},wM=function(s,e,t){(e==null||e<0)&&(e=0),(t==null||t>s.length)&&(t=s.length);var n=new(s instanceof Bi?Bi:s instanceof Gl?Gl:Nn)(t-e);return n.set(s.subarray(e,t)),n},bM=function(s,e,t){var n=s.length;if(!n||t&&!t.l&&n<5)return e||new Nn(0);var i=!e||t,r=!t||t.i;t||(t={}),e||(e=new Nn(n*3));var o=function(_e){var Te=e.length;if(_e>Te){var Ue=new Nn(Math.max(Te*2,_e));Ue.set(e),e=Ue}},a=t.f||0,c=t.p||0,l=t.b||0,h=t.l,u=t.d,d=t.m,p=t.n,g=n*8;do{if(!h){t.f=a=Wn(s,c,1);var _=Wn(s,c+1,3);if(c+=3,_)if(_==1)h=MM,u=SM,d=9,p=5;else if(_==2){var y=Wn(s,c,31)+257,R=Wn(s,c+10,15)+4,F=y+Wn(s,c+5,31)+1;c+=14;for(var L=new Nn(F),P=new Nn(19),k=0;k<R;++k)P[_M[k]]=Wn(s,c+k*3,7);c+=R*3;for(var M=Hl(P),b=(1<<M)-1,H=Br(P,M,1),k=0;k<F;){var X=H[Wn(s,c,b)];c+=X&15;var m=X>>>4;if(m<16)L[k++]=m;else{var ie=0,D=0;for(m==16?(D=3+Wn(s,c,3),c+=2,ie=L[k-1]):m==17?(D=3+Wn(s,c,7),c+=3):m==18&&(D=11+Wn(s,c,127),c+=7);D--;)L[k++]=ie}}var G=L.subarray(0,y),W=L.subarray(y);d=Hl(G),p=Hl(W),h=Br(G,d,1),u=Br(W,p,1)}else throw"invalid block type";else{var m=EM(c)+4,f=s[m-4]|s[m-3]<<8,S=m+f;if(S>n){if(r)throw"unexpected EOF";break}i&&o(l+f),e.set(s.subarray(m,S),l),t.b=l+=f,t.p=c=S*8;continue}if(c>g){if(r)throw"unexpected EOF";break}}i&&o(l+131072);for(var te=(1<<d)-1,ne=(1<<p)-1,J=c;;J=c){var ie=h[Vl(s,c)&te],ee=ie>>>4;if(c+=ie&15,c>g){if(r)throw"unexpected EOF";break}if(!ie)throw"invalid length/literal";if(ee<256)e[l++]=ee;else if(ee==256){J=c,h=null;break}else{var oe=ee-254;if(ee>264){var k=ee-257,he=Bf[k];oe=Wn(s,c,(1<<he)-1)+Vf[k],c+=he}var K=u[Vl(s,c)&ne],se=K>>>4;if(!K)throw"invalid distance";c+=K&15;var W=yM[se];if(se>3){var he=zf[se];W+=Vl(s,c)&(1<<he)-1,c+=he}if(c>g){if(r)throw"unexpected EOF";break}i&&o(l+131072);for(var Se=l+oe;l<Se;l+=4)e[l]=e[l-W],e[l+1]=e[l+1-W],e[l+2]=e[l+2-W],e[l+3]=e[l+3-W];l=Se}}t.l=h,t.p=J,t.b=l,h&&(a=1,t.m=d,t.d=u,t.n=p)}while(!a);return l==e.length?e:wM(e,0,l)};var TM=new Nn(0);var AM=function(s){if((s[0]&15)!=8||s[0]>>>4>7||(s[0]<<8|s[1])%31)throw"invalid zlib data";if(s[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function kr(s,e){return bM((AM(s),s.subarray(2,-4)),e)}var RM=typeof TextDecoder<"u"&&new TextDecoder,CM=0;try{RM.decode(TM,{stream:!0}),CM=1}catch{}var ga=class extends qs{constructor(e){super(e),this.type=Dt}parse(e){let M=Math.pow(2.7182818,2.2);function b(x,w){let O=0;for(let A=0;A<65536;++A)(A==0||x[A>>3]&1<<(A&7))&&(w[O++]=A);let v=O-1;for(;O<65536;)w[O++]=0;return v}function H(x){for(let w=0;w<16384;w++)x[w]={},x[w].len=0,x[w].lit=0,x[w].p=null}let X={l:0,c:0,lc:0};function ie(x,w,O,v,A){for(;O<x;)w=w<<8|ge(v,A),O+=8;O-=x,X.l=w>>O&(1<<x)-1,X.c=w,X.lc=O}let D=new Array(59);function G(x){for(let O=0;O<=58;++O)D[O]=0;for(let O=0;O<65537;++O)D[x[O]]+=1;let w=0;for(let O=58;O>0;--O){let v=w+D[O]>>1;D[O]=w,w=v}for(let O=0;O<65537;++O){let v=x[O];v>0&&(x[O]=v|D[v]++<<6)}}function W(x,w,O,v,A,C){let U=w,N=0,j=0;for(;v<=A;v++){if(U.value-w.value>O)return!1;ie(6,N,j,x,U);let Y=X.l;if(N=X.c,j=X.lc,C[v]=Y,Y==63){if(U.value-w.value>O)throw new Error("Something wrong with hufUnpackEncTable");ie(8,N,j,x,U);let Q=X.l+6;if(N=X.c,j=X.lc,v+Q>A+1)throw new Error("Something wrong with hufUnpackEncTable");for(;Q--;)C[v++]=0;v--}else if(Y>=59){let Q=Y-59+2;if(v+Q>A+1)throw new Error("Something wrong with hufUnpackEncTable");for(;Q--;)C[v++]=0;v--}}G(C)}function te(x){return x&63}function ne(x){return x>>6}function J(x,w,O,v){for(;w<=O;w++){let A=ne(x[w]),C=te(x[w]);if(A>>C)throw new Error("Invalid table entry");if(C>14){let U=v[A>>C-14];if(U.len)throw new Error("Invalid table entry");if(U.lit++,U.p){let N=U.p;U.p=new Array(U.lit);for(let j=0;j<U.lit-1;++j)U.p[j]=N[j]}else U.p=new Array(1);U.p[U.lit-1]=w}else if(C){let U=0;for(let N=1<<14-C;N>0;N--){let j=v[(A<<14-C)+U];if(j.len||j.p)throw new Error("Invalid table entry");j.len=C,j.lit=w,U++}}}return!0}let ee={c:0,lc:0};function oe(x,w,O,v){x=x<<8|ge(O,v),w+=8,ee.c=x,ee.lc=w}let he={c:0,lc:0};function K(x,w,O,v,A,C,U,N,j){if(x==w){v<8&&(oe(O,v,A,C),O=ee.c,v=ee.lc),v-=8;let Y=O>>v;if(Y=new Uint8Array([Y])[0],N.value+Y>j)return!1;let Q=U[N.value-1];for(;Y-- >0;)U[N.value++]=Q}else if(N.value<j)U[N.value++]=x;else return!1;he.c=O,he.lc=v}function se(x){return x&65535}function Se(x){let w=se(x);return w>32767?w-65536:w}let _e={a:0,b:0};function Te(x,w){let O=Se(x),A=Se(w),C=O+(A&1)+(A>>1),U=C,N=C-A;_e.a=U,_e.b=N}function Ue(x,w){let O=se(x),v=se(w),A=O-(v>>1)&65535,C=v+A-32768&65535;_e.a=C,_e.b=A}function Ge(x,w,O,v,A,C,U){let N=U<16384,j=O>A?A:O,Y=1,Q,ae;for(;Y<=j;)Y<<=1;for(Y>>=1,Q=Y,Y>>=1;Y>=1;){ae=0;let ue=ae+C*(A-Q),ve=C*Y,Me=C*Q,Ee=v*Y,Ce=v*Q,He,mt,je,Ye;for(;ae<=ue;ae+=Me){let _t=ae,Ve=ae+v*(O-Q);for(;_t<=Ve;_t+=Ce){let Mt=_t+Ee,pn=_t+ve,Rt=pn+Ee;N?(Te(x[_t+w],x[pn+w]),He=_e.a,je=_e.b,Te(x[Mt+w],x[Rt+w]),mt=_e.a,Ye=_e.b,Te(He,mt),x[_t+w]=_e.a,x[Mt+w]=_e.b,Te(je,Ye),x[pn+w]=_e.a,x[Rt+w]=_e.b):(Ue(x[_t+w],x[pn+w]),He=_e.a,je=_e.b,Ue(x[Mt+w],x[Rt+w]),mt=_e.a,Ye=_e.b,Ue(He,mt),x[_t+w]=_e.a,x[Mt+w]=_e.b,Ue(je,Ye),x[pn+w]=_e.a,x[Rt+w]=_e.b)}if(O&Y){let Mt=_t+ve;N?Te(x[_t+w],x[Mt+w]):Ue(x[_t+w],x[Mt+w]),He=_e.a,x[Mt+w]=_e.b,x[_t+w]=He}}if(A&Y){let _t=ae,Ve=ae+v*(O-Q);for(;_t<=Ve;_t+=Ce){let Mt=_t+Ee;N?Te(x[_t+w],x[Mt+w]):Ue(x[_t+w],x[Mt+w]),He=_e.a,x[Mt+w]=_e.b,x[_t+w]=He}}Q=Y,Y>>=1}return ae}function Ne(x,w,O,v,A,C,U,N,j){let Y=0,Q=0,ae=U,ue=Math.trunc(v.value+(A+7)/8);for(;v.value<ue;)for(oe(Y,Q,O,v),Y=ee.c,Q=ee.lc;Q>=14;){let Me=Y>>Q-14&16383,Ee=w[Me];if(Ee.len)Q-=Ee.len,K(Ee.lit,C,Y,Q,O,v,N,j,ae),Y=he.c,Q=he.lc;else{if(!Ee.p)throw new Error("hufDecode issues");let Ce;for(Ce=0;Ce<Ee.lit;Ce++){let He=te(x[Ee.p[Ce]]);for(;Q<He&&v.value<ue;)oe(Y,Q,O,v),Y=ee.c,Q=ee.lc;if(Q>=He&&ne(x[Ee.p[Ce]])==(Y>>Q-He&(1<<He)-1)){Q-=He,K(Ee.p[Ce],C,Y,Q,O,v,N,j,ae),Y=he.c,Q=he.lc;break}}if(Ce==Ee.lit)throw new Error("hufDecode issues")}}let ve=8-A&7;for(Y>>=ve,Q-=ve;Q>0;){let Me=w[Y<<14-Q&16383];if(Me.len)Q-=Me.len,K(Me.lit,C,Y,Q,O,v,N,j,ae),Y=he.c,Q=he.lc;else throw new Error("hufDecode issues")}return!0}function tt(x,w,O,v,A,C){let U={value:0},N=O.value,j=pe(w,O),Y=pe(w,O);O.value+=4;let Q=pe(w,O);if(O.value+=4,j<0||j>=65537||Y<0||Y>=65537)throw new Error("Something wrong with HUF_ENCSIZE");let ae=new Array(65537),ue=new Array(16384);H(ue);let ve=v-(O.value-N);if(W(x,O,ve,j,Y,ae),Q>8*(v-(O.value-N)))throw new Error("Something wrong with hufUncompress");J(ae,j,Y,ue),Ne(ae,ue,x,O,Q,Y,C,A,U)}function Z(x,w,O){for(let v=0;v<O;++v)w[v]=x[w[v]]}function At(x){for(let w=1;w<x.length;w++){let O=x[w-1]+x[w]-128;x[w]=O}}function Oe(x,w){let O=0,v=Math.floor((x.length+1)/2),A=0,C=x.length-1;for(;!(A>C||(w[A++]=x[O++],A>C));)w[A++]=x[v++]}function We(x){let w=x.byteLength,O=new Array,v=0,A=new DataView(x);for(;w>0;){let C=A.getInt8(v++);if(C<0){let U=-C;w-=U+1;for(let N=0;N<U;N++)O.push(A.getUint8(v++))}else{let U=C;w-=2;let N=A.getUint8(v++);for(let j=0;j<U+1;j++)O.push(N)}}return O}function De(x,w,O,v,A,C){let U=new DataView(C.buffer),N=O[x.idx[0]].width,j=O[x.idx[0]].height,Y=3,Q=Math.floor(N/8),ae=Math.ceil(N/8),ue=Math.ceil(j/8),ve=N-(ae-1)*8,Me=j-(ue-1)*8,Ee={value:0},Ce=new Array(Y),He=new Array(Y),mt=new Array(Y),je=new Array(Y),Ye=new Array(Y);for(let Ve=0;Ve<Y;++Ve)Ye[Ve]=w[x.idx[Ve]],Ce[Ve]=Ve<1?0:Ce[Ve-1]+ae*ue,He[Ve]=new Float32Array(64),mt[Ve]=new Uint16Array(64),je[Ve]=new Uint16Array(ae*64);for(let Ve=0;Ve<ue;++Ve){let Mt=8;Ve==ue-1&&(Mt=Me);let pn=8;for(let dt=0;dt<ae;++dt){dt==ae-1&&(pn=ve);for(let Qe=0;Qe<Y;++Qe)mt[Qe].fill(0),mt[Qe][0]=A[Ce[Qe]++],gt(Ee,v,mt[Qe]),Ze(mt[Qe],He[Qe]),T(He[Qe]);Y==3&&E(He);for(let Qe=0;Qe<Y;++Qe)$(He[Qe],je[Qe],dt*64)}let Rt=0;for(let dt=0;dt<Y;++dt){let Qe=O[x.idx[dt]].type;for(let tn=8*Ve;tn<8*Ve+Mt;++tn){Rt=Ye[dt][tn];for(let ni=0;ni<Q;++ni){let Lt=ni*64+(tn&7)*8;U.setUint16(Rt+0*Qe,je[dt][Lt+0],!0),U.setUint16(Rt+2*Qe,je[dt][Lt+1],!0),U.setUint16(Rt+4*Qe,je[dt][Lt+2],!0),U.setUint16(Rt+6*Qe,je[dt][Lt+3],!0),U.setUint16(Rt+8*Qe,je[dt][Lt+4],!0),U.setUint16(Rt+10*Qe,je[dt][Lt+5],!0),U.setUint16(Rt+12*Qe,je[dt][Lt+6],!0),U.setUint16(Rt+14*Qe,je[dt][Lt+7],!0),Rt+=16*Qe}}if(Q!=ae)for(let tn=8*Ve;tn<8*Ve+Mt;++tn){let ni=Ye[dt][tn]+8*Q*2*Qe,Lt=Q*64+(tn&7)*8;for(let Mi=0;Mi<pn;++Mi)U.setUint16(ni+Mi*2*Qe,je[dt][Lt+Mi],!0)}}}let _t=new Uint16Array(N);U=new DataView(C.buffer);for(let Ve=0;Ve<Y;++Ve){O[x.idx[Ve]].decoded=!0;let Mt=O[x.idx[Ve]].type;if(O[Ve].type==2)for(let pn=0;pn<j;++pn){let Rt=Ye[Ve][pn];for(let dt=0;dt<N;++dt)_t[dt]=U.getUint16(Rt+dt*2*Mt,!0);for(let dt=0;dt<N;++dt)U.setFloat32(Rt+dt*2*Mt,q(_t[dt]),!0)}}}function gt(x,w,O){let v,A=1;for(;A<64;)v=w[x.value],v==65280?A=64:v>>8==255?A+=v&255:(O[A]=v,A++),x.value++}function Ze(x,w){w[0]=q(x[0]),w[1]=q(x[1]),w[2]=q(x[5]),w[3]=q(x[6]),w[4]=q(x[14]),w[5]=q(x[15]),w[6]=q(x[27]),w[7]=q(x[28]),w[8]=q(x[2]),w[9]=q(x[4]),w[10]=q(x[7]),w[11]=q(x[13]),w[12]=q(x[16]),w[13]=q(x[26]),w[14]=q(x[29]),w[15]=q(x[42]),w[16]=q(x[3]),w[17]=q(x[8]),w[18]=q(x[12]),w[19]=q(x[17]),w[20]=q(x[25]),w[21]=q(x[30]),w[22]=q(x[41]),w[23]=q(x[43]),w[24]=q(x[9]),w[25]=q(x[11]),w[26]=q(x[18]),w[27]=q(x[24]),w[28]=q(x[31]),w[29]=q(x[40]),w[30]=q(x[44]),w[31]=q(x[53]),w[32]=q(x[10]),w[33]=q(x[19]),w[34]=q(x[23]),w[35]=q(x[32]),w[36]=q(x[39]),w[37]=q(x[45]),w[38]=q(x[52]),w[39]=q(x[54]),w[40]=q(x[20]),w[41]=q(x[22]),w[42]=q(x[33]),w[43]=q(x[38]),w[44]=q(x[46]),w[45]=q(x[51]),w[46]=q(x[55]),w[47]=q(x[60]),w[48]=q(x[21]),w[49]=q(x[34]),w[50]=q(x[37]),w[51]=q(x[47]),w[52]=q(x[50]),w[53]=q(x[56]),w[54]=q(x[59]),w[55]=q(x[61]),w[56]=q(x[35]),w[57]=q(x[36]),w[58]=q(x[48]),w[59]=q(x[49]),w[60]=q(x[57]),w[61]=q(x[58]),w[62]=q(x[62]),w[63]=q(x[63])}function T(x){let w=.5*Math.cos(.7853975),O=.5*Math.cos(3.14159/16),v=.5*Math.cos(3.14159/8),A=.5*Math.cos(3*3.14159/16),C=.5*Math.cos(5*3.14159/16),U=.5*Math.cos(3*3.14159/8),N=.5*Math.cos(7*3.14159/16),j=new Array(4),Y=new Array(4),Q=new Array(4),ae=new Array(4);for(let ue=0;ue<8;++ue){let ve=ue*8;j[0]=v*x[ve+2],j[1]=U*x[ve+2],j[2]=v*x[ve+6],j[3]=U*x[ve+6],Y[0]=O*x[ve+1]+A*x[ve+3]+C*x[ve+5]+N*x[ve+7],Y[1]=A*x[ve+1]-N*x[ve+3]-O*x[ve+5]-C*x[ve+7],Y[2]=C*x[ve+1]-O*x[ve+3]+N*x[ve+5]+A*x[ve+7],Y[3]=N*x[ve+1]-C*x[ve+3]+A*x[ve+5]-O*x[ve+7],Q[0]=w*(x[ve+0]+x[ve+4]),Q[3]=w*(x[ve+0]-x[ve+4]),Q[1]=j[0]+j[3],Q[2]=j[1]-j[2],ae[0]=Q[0]+Q[1],ae[1]=Q[3]+Q[2],ae[2]=Q[3]-Q[2],ae[3]=Q[0]-Q[1],x[ve+0]=ae[0]+Y[0],x[ve+1]=ae[1]+Y[1],x[ve+2]=ae[2]+Y[2],x[ve+3]=ae[3]+Y[3],x[ve+4]=ae[3]-Y[3],x[ve+5]=ae[2]-Y[2],x[ve+6]=ae[1]-Y[1],x[ve+7]=ae[0]-Y[0]}for(let ue=0;ue<8;++ue)j[0]=v*x[16+ue],j[1]=U*x[16+ue],j[2]=v*x[48+ue],j[3]=U*x[48+ue],Y[0]=O*x[8+ue]+A*x[24+ue]+C*x[40+ue]+N*x[56+ue],Y[1]=A*x[8+ue]-N*x[24+ue]-O*x[40+ue]-C*x[56+ue],Y[2]=C*x[8+ue]-O*x[24+ue]+N*x[40+ue]+A*x[56+ue],Y[3]=N*x[8+ue]-C*x[24+ue]+A*x[40+ue]-O*x[56+ue],Q[0]=w*(x[ue]+x[32+ue]),Q[3]=w*(x[ue]-x[32+ue]),Q[1]=j[0]+j[3],Q[2]=j[1]-j[2],ae[0]=Q[0]+Q[1],ae[1]=Q[3]+Q[2],ae[2]=Q[3]-Q[2],ae[3]=Q[0]-Q[1],x[0+ue]=ae[0]+Y[0],x[8+ue]=ae[1]+Y[1],x[16+ue]=ae[2]+Y[2],x[24+ue]=ae[3]+Y[3],x[32+ue]=ae[3]-Y[3],x[40+ue]=ae[2]-Y[2],x[48+ue]=ae[1]-Y[1],x[56+ue]=ae[0]-Y[0]}function E(x){for(let w=0;w<64;++w){let O=x[0][w],v=x[1][w],A=x[2][w];x[0][w]=O+1.5747*A,x[1][w]=O-.1873*v-.4682*A,x[2][w]=O+1.8556*v}}function $(x,w,O){for(let v=0;v<64;++v)w[O+v]=Fi.toHalfFloat(fe(x[v]))}function fe(x){return x<=1?Math.sign(x)*Math.pow(Math.abs(x),2.2):Math.sign(x)*Math.pow(M,Math.abs(x)-1)}function le(x){return new DataView(x.array.buffer,x.offset.value,x.size)}function de(x){let w=x.viewer.buffer.slice(x.offset.value,x.offset.value+x.size),O=new Uint8Array(We(w)),v=new Uint8Array(O.length);return At(O),Oe(O,v),new DataView(v.buffer)}function Pe(x){let w=x.array.slice(x.offset.value,x.offset.value+x.size),O=kr(w),v=new Uint8Array(O.length);return At(O),Oe(O,v),new DataView(v.buffer)}function we(x){let w=x.viewer,O={value:x.offset.value},v=new Uint16Array(x.width*x.scanlineBlockSize*(x.channels*x.type)),A=new Uint8Array(8192),C=0,U=new Array(x.channels);for(let Me=0;Me<x.channels;Me++)U[Me]={},U[Me].start=C,U[Me].end=U[Me].start,U[Me].nx=x.width,U[Me].ny=x.lines,U[Me].size=x.type,C+=U[Me].nx*U[Me].ny*U[Me].size;let N=z(w,O),j=z(w,O);if(j>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(N<=j)for(let Me=0;Me<j-N+1;Me++)A[Me+N]=Le(w,O);let Y=new Uint16Array(65536),Q=b(A,Y),ae=pe(w,O);tt(x.array,w,O,ae,v,C);for(let Me=0;Me<x.channels;++Me){let Ee=U[Me];for(let Ce=0;Ce<U[Me].size;++Ce)Ge(v,Ee.start+Ce,Ee.nx,Ee.size,Ee.ny,Ee.nx*Ee.size,Q)}Z(Y,v,C);let ue=0,ve=new Uint8Array(v.buffer.byteLength);for(let Me=0;Me<x.lines;Me++)for(let Ee=0;Ee<x.channels;Ee++){let Ce=U[Ee],He=Ce.nx*Ce.size,mt=new Uint8Array(v.buffer,Ce.end*2,He*2);ve.set(mt,ue),ue+=He*2,Ce.end+=He}return new DataView(ve.buffer)}function Ae(x){let w=x.array.slice(x.offset.value,x.offset.value+x.size),O=kr(w),v=x.lines*x.channels*x.width,A=x.type==1?new Uint16Array(v):new Uint32Array(v),C=0,U=0,N=new Array(4);for(let j=0;j<x.lines;j++)for(let Y=0;Y<x.channels;Y++){let Q=0;switch(x.type){case 1:N[0]=C,N[1]=N[0]+x.width,C=N[1]+x.width;for(let ae=0;ae<x.width;++ae){let ue=O[N[0]++]<<8|O[N[1]++];Q+=ue,A[U]=Q,U++}break;case 2:N[0]=C,N[1]=N[0]+x.width,N[2]=N[1]+x.width,C=N[2]+x.width;for(let ae=0;ae<x.width;++ae){let ue=O[N[0]++]<<24|O[N[1]++]<<16|O[N[2]++]<<8;Q+=ue,A[U]=Q,U++}break}}return new DataView(A.buffer)}function Fe(x){let w=x.viewer,O={value:x.offset.value},v=new Uint8Array(x.width*x.lines*(x.channels*x.type*2)),A={version:ze(w,O),unknownUncompressedSize:ze(w,O),unknownCompressedSize:ze(w,O),acCompressedSize:ze(w,O),dcCompressedSize:ze(w,O),rleCompressedSize:ze(w,O),rleUncompressedSize:ze(w,O),rleRawSize:ze(w,O),totalAcUncompressedCount:ze(w,O),totalDcUncompressedCount:ze(w,O),acCompression:ze(w,O)};if(A.version<2)throw new Error("EXRLoader.parse: "+yi.compression+" version "+A.version+" is unsupported");let C=new Array,U=z(w,O)-2;for(;U>0;){let Ee=Xe(w.buffer,O),Ce=Le(w,O),He=Ce>>2&3,mt=(Ce>>4)-1,je=new Int8Array([mt])[0],Ye=Le(w,O);C.push({name:Ee,index:je,type:Ye,compression:He}),U-=Ee.length+3}let N=yi.channels,j=new Array(x.channels);for(let Ee=0;Ee<x.channels;++Ee){let Ce=j[Ee]={},He=N[Ee];Ce.name=He.name,Ce.compression=0,Ce.decoded=!1,Ce.type=He.pixelType,Ce.pLinear=He.pLinear,Ce.width=x.width,Ce.height=x.lines}let Y={idx:new Array(3)};for(let Ee=0;Ee<x.channels;++Ee){let Ce=j[Ee];for(let He=0;He<C.length;++He){let mt=C[He];Ce.name==mt.name&&(Ce.compression=mt.compression,mt.index>=0&&(Y.idx[mt.index]=Ee),Ce.offset=Ee)}}let Q,ae,ue;if(A.acCompressedSize>0)switch(A.acCompression){case 0:Q=new Uint16Array(A.totalAcUncompressedCount),tt(x.array,w,O,A.acCompressedSize,Q,A.totalAcUncompressedCount);break;case 1:let Ee=x.array.slice(O.value,O.value+A.totalAcUncompressedCount),Ce=kr(Ee);Q=new Uint16Array(Ce.buffer),O.value+=A.totalAcUncompressedCount;break}if(A.dcCompressedSize>0){let Ee={array:x.array,offset:O,size:A.dcCompressedSize};ae=new Uint16Array(Pe(Ee).buffer),O.value+=A.dcCompressedSize}if(A.rleRawSize>0){let Ee=x.array.slice(O.value,O.value+A.rleCompressedSize),Ce=kr(Ee);ue=We(Ce.buffer),O.value+=A.rleCompressedSize}let ve=0,Me=new Array(j.length);for(let Ee=0;Ee<Me.length;++Ee)Me[Ee]=new Array;for(let Ee=0;Ee<x.lines;++Ee)for(let Ce=0;Ce<j.length;++Ce)Me[Ce].push(ve),ve+=j[Ce].width*x.type*2;De(Y,Me,j,Q,ae,v);for(let Ee=0;Ee<j.length;++Ee){let Ce=j[Ee];if(!Ce.decoded)switch(Ce.compression){case 2:let He=0,mt=0;for(let je=0;je<x.lines;++je){let Ye=Me[Ee][He];for(let _t=0;_t<Ce.width;++_t){for(let Ve=0;Ve<2*Ce.type;++Ve)v[Ye++]=ue[mt+Ve*Ce.width*Ce.height];mt++}He++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(v.buffer)}function Xe(x,w){let O=new Uint8Array(x),v=0;for(;O[w.value+v]!=0;)v+=1;let A=new TextDecoder().decode(O.slice(w.value,w.value+v));return w.value=w.value+v+1,A}function ce(x,w,O){let v=new TextDecoder().decode(new Uint8Array(x).slice(w.value,w.value+O));return w.value=w.value+O,v}function Je(x,w){let O=re(x,w),v=pe(x,w);return[O,v]}function I(x,w){let O=pe(x,w),v=pe(x,w);return[O,v]}function re(x,w){let O=x.getInt32(w.value,!0);return w.value=w.value+4,O}function pe(x,w){let O=x.getUint32(w.value,!0);return w.value=w.value+4,O}function ge(x,w){let O=x[w.value];return w.value=w.value+1,O}function Le(x,w){let O=x.getUint8(w.value);return w.value=w.value+1,O}let ze=function(x,w){let O;return"getBigInt64"in DataView.prototype?O=Number(x.getBigInt64(w.value,!0)):O=x.getUint32(w.value+4,!0)+Number(x.getUint32(w.value,!0)<<32),w.value+=8,O};function Be(x,w){let O=x.getFloat32(w.value,!0);return w.value+=4,O}function Ke(x,w){return Fi.toHalfFloat(Be(x,w))}function q(x){let w=(x&31744)>>10,O=x&1023;return(x>>15?-1:1)*(w?w===31?O?NaN:1/0:Math.pow(2,w-15)*(1+O/1024):6103515625e-14*(O/1024))}function z(x,w){let O=x.getUint16(w.value,!0);return w.value+=2,O}function xe(x,w){return q(z(x,w))}function ye(x,w,O,v){let A=O.value,C=[];for(;O.value<A+v-1;){let U=Xe(w,O),N=re(x,O),j=Le(x,O);O.value+=3;let Y=re(x,O),Q=re(x,O);C.push({name:U,pixelType:N,pLinear:j,xSampling:Y,ySampling:Q})}return O.value+=1,C}function qe(x,w){let O=Be(x,w),v=Be(x,w),A=Be(x,w),C=Be(x,w),U=Be(x,w),N=Be(x,w),j=Be(x,w),Y=Be(x,w);return{redX:O,redY:v,greenX:A,greenY:C,blueX:U,blueY:N,whiteX:j,whiteY:Y}}function ke(x,w){let O=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],v=Le(x,w);return O[v]}function lt(x,w){let O=pe(x,w),v=pe(x,w),A=pe(x,w),C=pe(x,w);return{xMin:O,yMin:v,xMax:A,yMax:C}}function ut(x,w){let O=["INCREASING_Y"],v=Le(x,w);return O[v]}function Ft(x,w){let O=Be(x,w),v=Be(x,w);return[O,v]}function Qt(x,w){let O=Be(x,w),v=Be(x,w),A=Be(x,w);return[O,v,A]}function xt(x,w,O,v,A){if(v==="string"||v==="stringvector"||v==="iccProfile")return ce(w,O,A);if(v==="chlist")return ye(x,w,O,A);if(v==="chromaticities")return qe(x,O);if(v==="compression")return ke(x,O);if(v==="box2i")return lt(x,O);if(v==="lineOrder")return ut(x,O);if(v==="float")return Be(x,O);if(v==="v2f")return Ft(x,O);if(v==="v3f")return Qt(x,O);if(v==="int")return re(x,O);if(v==="rational")return Je(x,O);if(v==="timecode")return I(x,O);if(v==="preview")return O.value+=A,"skipped";O.value+=A}function en(x,w,O){let v={};if(x.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");v.version=x.getUint8(4);let A=x.getUint8(5);v.spec={singleTile:!!(A&2),longName:!!(A&4),deepFormat:!!(A&8),multiPart:!!(A&16)},O.value=8;let C=!0;for(;C;){let U=Xe(w,O);if(U==0)C=!1;else{let N=Xe(w,O),j=pe(x,O),Y=xt(x,w,O,N,j);Y===void 0?console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${N}'.`):v[U]=Y}}if((A&-5)!=0)throw console.error("THREE.EXRHeader:",v),new Error("THREE.EXRLoader: Provided file is currently unsupported.");return v}function Rn(x,w,O,v,A){let C={size:0,viewer:w,array:O,offset:v,width:x.dataWindow.xMax-x.dataWindow.xMin+1,height:x.dataWindow.yMax-x.dataWindow.yMin+1,channels:x.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:x.channels[0].pixelType,uncompress:null,getter:null,format:null,colorSpace:Tt};switch(x.compression){case"NO_COMPRESSION":C.lines=1,C.uncompress=le;break;case"RLE_COMPRESSION":C.lines=1,C.uncompress=de;break;case"ZIPS_COMPRESSION":C.lines=1,C.uncompress=Pe;break;case"ZIP_COMPRESSION":C.lines=16,C.uncompress=Pe;break;case"PIZ_COMPRESSION":C.lines=32,C.uncompress=we;break;case"PXR24_COMPRESSION":C.lines=16,C.uncompress=Ae;break;case"DWAA_COMPRESSION":C.lines=32,C.uncompress=Fe;break;case"DWAB_COMPRESSION":C.lines=256,C.uncompress=Fe;break;default:throw new Error("EXRLoader.parse: "+x.compression+" is unsupported")}if(C.scanlineBlockSize=C.lines,C.type==1)switch(A){case nn:C.getter=xe,C.inputSize=2;break;case Dt:C.getter=z,C.inputSize=2;break}else if(C.type==2)switch(A){case nn:C.getter=Be,C.inputSize=4;break;case Dt:C.getter=Ke,C.inputSize=4}else throw new Error("EXRLoader.parse: unsupported pixelType "+C.type+" for "+x.compression+".");C.blockCount=(x.dataWindow.yMax+1)/C.scanlineBlockSize;for(let N=0;N<C.blockCount;N++)ze(w,v);C.outputChannels=C.channels==3?4:C.channels;let U=C.width*C.height*C.outputChannels;switch(A){case nn:C.byteArray=new Float32Array(U),C.channels<C.outputChannels&&C.byteArray.fill(1,0,U);break;case Dt:C.byteArray=new Uint16Array(U),C.channels<C.outputChannels&&C.byteArray.fill(15360,0,U);break;default:console.error("THREE.EXRLoader: unsupported type: ",A);break}return C.bytesPerLine=C.width*C.inputSize*C.channels,C.outputChannels==4?(C.format=hn,C.colorSpace=Tt):(C.format=yl,C.colorSpace=un),C}let Xi=new DataView(e),tc=new Uint8Array(e),Xn={value:0},yi=en(Xi,e,Xn),nt=Rn(yi,Xi,tc,Xn,this.type),rr={value:0},eo={R:0,G:1,B:2,A:3,Y:0};for(let x=0;x<nt.height/nt.scanlineBlockSize;x++){let w=pe(Xi,Xn);nt.size=pe(Xi,Xn),nt.lines=w+nt.scanlineBlockSize>nt.height?nt.height-w:nt.scanlineBlockSize;let v=nt.size<nt.lines*nt.bytesPerLine?nt.uncompress(nt):le(nt);Xn.value+=nt.size;for(let A=0;A<nt.scanlineBlockSize;A++){let C=A+x*nt.scanlineBlockSize;if(C>=nt.height)break;for(let U=0;U<nt.channels;U++){let N=eo[yi.channels[U].name];for(let j=0;j<nt.width;j++){rr.value=(A*(nt.channels*nt.width)+U*nt.width+j)*nt.inputSize;let Y=(nt.height-1-C)*(nt.width*nt.outputChannels)+j*nt.outputChannels+N;nt.byteArray[Y]=nt.getter(v,rr)}}}}return{header:yi,width:nt.width,height:nt.height,data:nt.byteArray,format:nt.format,colorSpace:nt.colorSpace,type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(o,a){o.colorSpace=a.colorSpace,o.minFilter=bt,o.magFilter=bt,o.generateMipmaps=!1,o.flipY=!1,t&&t(o,a)}return super.load(e,r,n,i)}};var Js=class extends qs{constructor(e){super(e),this.type=Dt}parse(e){let o=function(k,M){switch(k){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(M||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(M||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(M||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(M||""))}},u=function(k,M,b){M=M||1024;let X=k.pos,ie=-1,D=0,G="",W=String.fromCharCode.apply(null,new Uint16Array(k.subarray(X,X+128)));for(;0>(ie=W.indexOf(`
`))&&D<M&&X<k.byteLength;)G+=W,D+=W.length,X+=128,W+=String.fromCharCode.apply(null,new Uint16Array(k.subarray(X,X+128)));return-1<ie?(b!==!1&&(k.pos+=D+ie+1),G+W.slice(0,ie)):!1},d=function(k){let M=/^#\?(\S+)/,b=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,H=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,X=/^\s*FORMAT=(\S+)\s*$/,ie=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,D={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},G,W;for((k.pos>=k.byteLength||!(G=u(k)))&&o(1,"no header found"),(W=G.match(M))||o(3,"bad initial token"),D.valid|=1,D.programtype=W[1],D.string+=G+`
`;G=u(k),G!==!1;){if(D.string+=G+`
`,G.charAt(0)==="#"){D.comments+=G+`
`;continue}if((W=G.match(b))&&(D.gamma=parseFloat(W[1])),(W=G.match(H))&&(D.exposure=parseFloat(W[1])),(W=G.match(X))&&(D.valid|=2,D.format=W[1]),(W=G.match(ie))&&(D.valid|=4,D.height=parseInt(W[1],10),D.width=parseInt(W[2],10)),D.valid&2&&D.valid&4)break}return D.valid&2||o(3,"missing format specifier"),D.valid&4||o(3,"missing image size specifier"),D},p=function(k,M,b){let H=M;if(H<8||H>32767||k[0]!==2||k[1]!==2||k[2]&128)return new Uint8Array(k);H!==(k[2]<<8|k[3])&&o(3,"wrong scanline width");let X=new Uint8Array(4*M*b);X.length||o(4,"unable to allocate buffer space");let ie=0,D=0,G=4*H,W=new Uint8Array(4),te=new Uint8Array(G),ne=b;for(;ne>0&&D<k.byteLength;){D+4>k.byteLength&&o(1),W[0]=k[D++],W[1]=k[D++],W[2]=k[D++],W[3]=k[D++],(W[0]!=2||W[1]!=2||(W[2]<<8|W[3])!=H)&&o(3,"bad rgbe scanline format");let J=0,ee;for(;J<G&&D<k.byteLength;){ee=k[D++];let he=ee>128;if(he&&(ee-=128),(ee===0||J+ee>G)&&o(3,"bad scanline data"),he){let K=k[D++];for(let se=0;se<ee;se++)te[J++]=K}else te.set(k.subarray(D,D+ee),J),J+=ee,D+=ee}let oe=H;for(let he=0;he<oe;he++){let K=0;X[ie]=te[he+K],K+=H,X[ie+1]=te[he+K],K+=H,X[ie+2]=te[he+K],K+=H,X[ie+3]=te[he+K],ie+=4}ne--}return X},g=function(k,M,b,H){let X=k[M+3],ie=Math.pow(2,X-128)/255;b[H+0]=k[M+0]*ie,b[H+1]=k[M+1]*ie,b[H+2]=k[M+2]*ie,b[H+3]=1},_=function(k,M,b,H){let X=k[M+3],ie=Math.pow(2,X-128)/255;b[H+0]=Fi.toHalfFloat(Math.min(k[M+0]*ie,65504)),b[H+1]=Fi.toHalfFloat(Math.min(k[M+1]*ie,65504)),b[H+2]=Fi.toHalfFloat(Math.min(k[M+2]*ie,65504)),b[H+3]=Fi.toHalfFloat(1)},m=new Uint8Array(e);m.pos=0;let f=d(m),S=f.width,y=f.height,R=p(m.subarray(m.pos),S,y),F,L,P;switch(this.type){case nn:P=R.length/4;let k=new Float32Array(P*4);for(let b=0;b<P;b++)g(R,b*4,k,b*4);F=k,L=nn;break;case Dt:P=R.length/4;let M=new Uint16Array(P*4);for(let b=0;b<P;b++)_(R,b*4,M,b*4);F=M,L=Dt;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:S,height:y,data:F,header:f.string,gamma:f.gamma,exposure:f.exposure,type:L}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(o,a){switch(o.type){case nn:case Dt:o.colorSpace=Tt,o.minFilter=bt,o.magFilter=bt,o.generateMipmaps=!1,o.flipY=!0;break}t&&t(o,a)}return super.load(e,r,n,i)}};var LM=.25,IM=.06;function DM(s){return s.toLowerCase().endsWith(".exr")?new ga:new Js}function UM(s){let e=(s&32768)>>15,t=(s&31744)>>10,n=s&1023;return t===0?(e?-1:1)*2**-14*(n/1024):t===31?n?NaN:(e?-1:1)*(1/0):(e?-1:1)*2**(t-15)*(1+n/1024)}function Xl(s){let{width:e,height:t,data:n}=s.image,i=n instanceof Uint16Array,r=P=>i?UM(n[P]):n[P],o=n.length/(e*t),a=new Float32Array(e*t),c=0,l=0,h=0;for(let P=0;P<e*t;P++){let k=P*o,M=.2126*r(k)+.7152*r(k+1)+.0722*r(k+2);a[P]=M,h+=M,M>c&&(c=M,l=P)}h/=e*t;let u=c*LM,d=Math.floor(l/e),p=l%e,g=Math.max(4,Math.round(t*IM)),_=new B,m=new Ie(0,0,0),f=2*Math.PI/e*(Math.PI/t),S=0,y=0,R=0;for(let P=Math.max(0,d-g);P<Math.min(t,d+g);P++)for(let k=p-g;k<p+g;k++){let M=(k+e)%e,b=P*e+M,H=a[b];if(H<u)continue;let X=(M+.5)/e,ie=1-(P+.5)/t,D=(X-.5)*2*Math.PI,G=(ie-.5)*Math.PI,W=Math.cos(G);_.x+=H*W*Math.cos(D),_.y+=H*Math.sin(G),_.z+=H*W*Math.sin(D),S+=H;let te=b*o;m.r+=r(te),m.g+=r(te+1),m.b+=r(te+2),y+=H*f*W,R++}if(S===0)return{direction:new B(0,1,0),color:new Ie(1,1,1),irradiance:0,angularRadius:0,peak:c,mean:h};_.normalize();let F=Math.max(m.r,m.g,m.b)||1;m.multiplyScalar(1/F);let L=Math.sqrt(R*f/Math.PI);return{direction:_,color:m,irradiance:y,angularRadius:L,peak:c,mean:h}}function Xf(s,e,t,n){let i=t.assets.hdri;return new Promise((r,o)=>{DM(i).load(i,a=>{let c=Xl(a),l=new Jn(e);l.compileEquirectangularShader();let h=l.fromEquirectangular(a).texture;a.dispose(),l.dispose(),s.environment=h,r({envMap:h,sun:c})},a=>n==null?void 0:n(a.total>0?a.loaded/a.total*100:-1),a=>o(new Error(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C HDRI "${i}": ${(a==null?void 0:a.message)??a}`)))})}function Hr(s,e){s.traverse(t=>{if(!t.isMesh||!t.material)return;let n=Array.isArray(t.material)?t.material:[t.material];for(let i of n)"envMapIntensity"in i&&(i.envMapIntensity=e,i.needsUpdate=!0)})}var Yf={size:14,ceiling:.46,floor:.12,wallKey:.36,wallShadow:.5,wallFront:.42,wallBack:.3,wallGradient:.55},Zf=[{name:"key",width:6.5,height:7.5,distance:5.4,rotationY:58,elevation:50,intensity:5.4},{name:"fill",width:8,height:7,distance:6.5,rotationY:-108,elevation:14,intensity:4},{name:"bounce",width:10,height:8,distance:6,rotationY:16,elevation:22,intensity:3.2},{name:"rim",width:4,height:2.2,distance:5.5,rotationY:-150,elevation:34,intensity:2.4},{name:"streak-near",width:.4,height:7.5,distance:4.6,rotationY:62,elevation:12,intensity:3.6},{name:"streak-far",width:.25,height:6,distance:4.6,rotationY:138,elevation:20,intensity:2.6}],va=null;function NM(){if(va)return va;let s=64,e=document.createElement("canvas");e.width=s,e.height=s;let t=e.getContext("2d"),n=t.createImageData(s,s);for(let i=0;i<s;i++)for(let r=0;r<s;r++){let o=Math.abs((r+.5)/s-.5)*2,a=Math.abs((i+.5)/s-.5)*2,c=Math.max(o,a),l=Math.min(1,Math.max(0,(1-c)/.35)),h=.42+.58*(l*l*(3-2*l)),u=Math.round(h*255),d=(i*s+r)*4;n.data[d]=u,n.data[d+1]=u,n.data[d+2]=u,n.data[d+3]=255}return t.putImageData(n,0,0),va=new Li(e),va}function ql(s,{mask:e=!1,gradient:t=!1}={}){let n=new zt;return typeof s=="number"?n.color.setScalar(s):n.color.copy(s),n.side=wn,e&&(n.map=NM()),t&&(n.vertexColors=!0),n}function OM(s,e){let{width:t,height:n,distance:i,rotationY:r,elevation:o,intensity:a}=e,c=new ct(new Tn(t,n),ql(a,{mask:!0})),l=Kt.degToRad(r),h=Kt.degToRad(o);return c.position.set(Math.sin(l)*Math.cos(h)*i,Math.sin(h)*i,Math.cos(l)*Math.cos(h)*i),c.lookAt(0,0,0),c.name=e.name,s.add(c),c}var FM={floor:.5,ceiling:0,key:.18,shadow:.1,front:.28,back:.42};function qf(s,e,t){let n=new Ie().setScalar(s);return e&&t>0&&(n.r+=e.r*t,n.g+=e.g*t,n.b+=e.b*t),n}function BM(s,e,t){let n=new Tn(s,s,1,8),i=n.attributes.position,r=new Float32Array(i.count*3),o=s/2;for(let a=0;a<i.count;a++){let c=(i.getY(a)+o)/s,l=1-t*(1-c);r[a*3]=l,r[a*3+1]=l,r[a*3+2]=l}return n.setAttribute("color",new Ct(r,3)),new ct(n,ql(e,{gradient:!0}))}function zM(s,e){let{size:t,ceiling:n,floor:i,wallKey:r,wallShadow:o,wallFront:a,wallBack:c,wallGradient:l}=Yf,h=t/2,u=FM,d=[{level:n,tint:u.ceiling,position:[0,h,0],rotation:[Math.PI/2,0,0]},{level:i,tint:u.floor,position:[0,-h,0],rotation:[-Math.PI/2,0,0]}];for(let g of d){let _=new ct(new Tn(t,t),ql(qf(g.level,e,g.tint)));_.position.set(...g.position),_.rotation.set(...g.rotation),s.add(_)}let p=[{level:c,tint:u.back,position:[0,0,-h],rotation:[0,0,0]},{level:a,tint:u.front,position:[0,0,h],rotation:[0,Math.PI,0]},{level:o,tint:u.shadow,position:[-h,0,0],rotation:[0,Math.PI/2,0]},{level:r,tint:u.key,position:[h,0,0],rotation:[0,-Math.PI/2,0]}];for(let g of p){let _=BM(t,qf(g.level,e,g.tint),l);_.position.set(...g.position),_.rotation.set(...g.rotation),s.add(_)}}function kM(){let s=Zf[0],e=Kt.degToRad(s.rotationY),t=Kt.degToRad(s.elevation),n=new B(Math.sin(e)*Math.cos(t),Math.sin(t),Math.cos(e)*Math.cos(t)).normalize(),i=Math.atan(Math.sqrt(s.width*s.height/Math.PI)/s.distance),{ceiling:r,floor:o,wallKey:a,wallShadow:c,wallFront:l,wallBack:h}=Yf,u=(r+o+a+c+l+h)/6;return{direction:n,color:new Ie(1,1,1),irradiance:s.intensity,angularRadius:i,peak:s.intensity,mean:u}}function Yl(s,e,t,n=null){let i=n?new Ie(n).convertSRGBToLinear():null,r=new Vs;zM(r,i);for(let c of Zf)OM(r,c);let o=new Jn(e);o.compileEquirectangularShader();let a=o.fromScene(r,0,.1,100).texture;return o.dispose(),r.traverse(c=>{c.isMesh&&(c.geometry.dispose(),c.material.dispose())}),s.environment=a,{envMap:a,sun:kM()}}var Qs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var An=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},HM=new jn(-1,1,1,-1,0,1),Zl=class extends qt{constructor(){super(),this.setAttribute("position",new Pt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Pt([0,2,0,0,2,0],2))}},VM=new Zl,zi=class{constructor(e){this._mesh=new ct(VM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,HM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var cs=class extends An{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Nt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Gn.clone(e.uniforms),this.material=new Nt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new zi(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Vr=class extends An{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}},_a=class extends An{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var xa=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new Re);this._width=n.width,this._height=n.height,t=new Xt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Dt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new cs(Qs),this.copyPass.material.blending=Vt,this.clock=new Zs}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let i=0,r=this.passes.length;i<r;i++){let o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){let a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Vr!==void 0&&(o instanceof Vr?n=!0:o instanceof _a&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new Re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var ya=class extends An{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ie}render(e,t,n){let i=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}};var Gr={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Re},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new $e},cameraProjectionMatrixInverse:{value:new $e},cameraWorldMatrix:{value:new $e},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new B(-1,-1,-1)},sceneBoxMax:{value:new B(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;		
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif
		
		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {  
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {   
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}
		
		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif
			
			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0, totalWeight = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {
				
				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w); 
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));
				
				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));
				
				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);	

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}		

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);		
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Wr={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Ma={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function Kf(s=5){let e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=GM(e),n=t.length,i=new Uint8Array(n*4);for(let o=0;o<n;++o){let a=t[o],c=2*Math.PI*a/n,l=new B(Math.cos(c),Math.sin(c),0).normalize();i[o*4]=(l.x*.5+.5)*255,i[o*4+1]=(l.y*.5+.5)*255,i[o*4+2]=127,i[o*4+3]=255}let r=new Pi(i,e,e);return r.wrapS=Gt,r.wrapT=Gt,r.needsUpdate=!0,r}function GM(s){let e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=e*e,n=Array(t).fill(0),i=Math.floor(e/2),r=e-1;for(let o=1;o<=t;){if(i===-1&&r===e?(r=e-2,i=0):(r===e&&(r=0),i<0&&(i=e-1)),n[i*e+r]!==0){r-=2,i++;continue}else n[i*e+r]=o++;r++,i--}return n}var Xr={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:Kl(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Re},cameraProjectionMatrixInverse:{value:new $e},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;
		
		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}
		
		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1    
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1    
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);
			
			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;
		
			denoised += w * neighborColor;
			totalWeight += w;
		}
		
		void main() {
			float depth = getDepth(vUv.xy);	
			vec3 viewNormal = getViewNormal(vUv);	
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);
		
			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}
		
			if (totalWeight > 0.) { 
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function Kl(s,e,t){let n=WM(s,e,t),i="vec3[SAMPLES](";for(let r=0;r<s;r++){let o=n[r];i+=`vec3(${o.x}, ${o.y}, ${o.z})${r<s-1?",":")"}`}return i}function WM(s,e,t){let n=[];for(let i=0;i<s;i++){let r=2*Math.PI*e*i/s,o=Math.pow(i/(s-1),t);n.push(new B(Math.cos(r),Math.sin(r),o))}return n}var Sa=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(e,t,n){return e[0]*t+e[1]*n}dot3(e,t,n,i){return e[0]*t+e[1]*n+e[2]*i}dot4(e,t,n,i,r){return e[0]*t+e[1]*n+e[2]*i+e[3]*r}noise(e,t){let n,i,r,o=.5*(Math.sqrt(3)-1),a=(e+t)*o,c=Math.floor(e+a),l=Math.floor(t+a),h=(3-Math.sqrt(3))/6,u=(c+l)*h,d=c-u,p=l-u,g=e-d,_=t-p,m,f;g>_?(m=1,f=0):(m=0,f=1);let S=g-m+h,y=_-f+h,R=g-1+2*h,F=_-1+2*h,L=c&255,P=l&255,k=this.perm[L+this.perm[P]]%12,M=this.perm[L+m+this.perm[P+f]]%12,b=this.perm[L+1+this.perm[P+1]]%12,H=.5-g*g-_*_;H<0?n=0:(H*=H,n=H*H*this.dot(this.grad3[k],g,_));let X=.5-S*S-y*y;X<0?i=0:(X*=X,i=X*X*this.dot(this.grad3[M],S,y));let ie=.5-R*R-F*F;return ie<0?r=0:(ie*=ie,r=ie*ie*this.dot(this.grad3[b],R,F)),70*(n+i+r)}noise3d(e,t,n){let i,r,o,a,l=(e+t+n)*.3333333333333333,h=Math.floor(e+l),u=Math.floor(t+l),d=Math.floor(n+l),p=1/6,g=(h+u+d)*p,_=h-g,m=u-g,f=d-g,S=e-_,y=t-m,R=n-f,F,L,P,k,M,b;S>=y?y>=R?(F=1,L=0,P=0,k=1,M=1,b=0):S>=R?(F=1,L=0,P=0,k=1,M=0,b=1):(F=0,L=0,P=1,k=1,M=0,b=1):y<R?(F=0,L=0,P=1,k=0,M=1,b=1):S<R?(F=0,L=1,P=0,k=0,M=1,b=1):(F=0,L=1,P=0,k=1,M=1,b=0);let H=S-F+p,X=y-L+p,ie=R-P+p,D=S-k+2*p,G=y-M+2*p,W=R-b+2*p,te=S-1+3*p,ne=y-1+3*p,J=R-1+3*p,ee=h&255,oe=u&255,he=d&255,K=this.perm[ee+this.perm[oe+this.perm[he]]]%12,se=this.perm[ee+F+this.perm[oe+L+this.perm[he+P]]]%12,Se=this.perm[ee+k+this.perm[oe+M+this.perm[he+b]]]%12,_e=this.perm[ee+1+this.perm[oe+1+this.perm[he+1]]]%12,Te=.6-S*S-y*y-R*R;Te<0?i=0:(Te*=Te,i=Te*Te*this.dot3(this.grad3[K],S,y,R));let Ue=.6-H*H-X*X-ie*ie;Ue<0?r=0:(Ue*=Ue,r=Ue*Ue*this.dot3(this.grad3[se],H,X,ie));let Ge=.6-D*D-G*G-W*W;Ge<0?o=0:(Ge*=Ge,o=Ge*Ge*this.dot3(this.grad3[Se],D,G,W));let Ne=.6-te*te-ne*ne-J*J;return Ne<0?a=0:(Ne*=Ne,a=Ne*Ne*this.dot3(this.grad3[_e],te,ne,J)),32*(i+r+o+a)}noise4d(e,t,n,i){let r=this.grad4,o=this.simplex,a=this.perm,c=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20,h,u,d,p,g,_=(e+t+n+i)*c,m=Math.floor(e+_),f=Math.floor(t+_),S=Math.floor(n+_),y=Math.floor(i+_),R=(m+f+S+y)*l,F=m-R,L=f-R,P=S-R,k=y-R,M=e-F,b=t-L,H=n-P,X=i-k,ie=M>b?32:0,D=M>H?16:0,G=b>H?8:0,W=M>X?4:0,te=b>X?2:0,ne=H>X?1:0,J=ie+D+G+W+te+ne,ee=o[J][0]>=3?1:0,oe=o[J][1]>=3?1:0,he=o[J][2]>=3?1:0,K=o[J][3]>=3?1:0,se=o[J][0]>=2?1:0,Se=o[J][1]>=2?1:0,_e=o[J][2]>=2?1:0,Te=o[J][3]>=2?1:0,Ue=o[J][0]>=1?1:0,Ge=o[J][1]>=1?1:0,Ne=o[J][2]>=1?1:0,tt=o[J][3]>=1?1:0,Z=M-ee+l,At=b-oe+l,Oe=H-he+l,We=X-K+l,De=M-se+2*l,gt=b-Se+2*l,Ze=H-_e+2*l,T=X-Te+2*l,E=M-Ue+3*l,$=b-Ge+3*l,fe=H-Ne+3*l,le=X-tt+3*l,de=M-1+4*l,Pe=b-1+4*l,we=H-1+4*l,Ae=X-1+4*l,Fe=m&255,Xe=f&255,ce=S&255,Je=y&255,I=a[Fe+a[Xe+a[ce+a[Je]]]]%32,re=a[Fe+ee+a[Xe+oe+a[ce+he+a[Je+K]]]]%32,pe=a[Fe+se+a[Xe+Se+a[ce+_e+a[Je+Te]]]]%32,ge=a[Fe+Ue+a[Xe+Ge+a[ce+Ne+a[Je+tt]]]]%32,Le=a[Fe+1+a[Xe+1+a[ce+1+a[Je+1]]]]%32,ze=.6-M*M-b*b-H*H-X*X;ze<0?h=0:(ze*=ze,h=ze*ze*this.dot4(r[I],M,b,H,X));let Be=.6-Z*Z-At*At-Oe*Oe-We*We;Be<0?u=0:(Be*=Be,u=Be*Be*this.dot4(r[re],Z,At,Oe,We));let Ke=.6-De*De-gt*gt-Ze*Ze-T*T;Ke<0?d=0:(Ke*=Ke,d=Ke*Ke*this.dot4(r[pe],De,gt,Ze,T));let q=.6-E*E-$*$-fe*fe-le*le;q<0?p=0:(q*=q,p=q*q*this.dot4(r[ge],E,$,fe,le));let z=.6-de*de-Pe*Pe-we*we-Ae*Ae;return z<0?g=0:(z*=z,g=z*z*this.dot4(r[Le],de,Pe,we,Ae)),27*(h+u+d+p+g)}};var ki=class s extends An{constructor(e,t,n,i,r,o,a){super(),this.width=n!==void 0?n:512,this.height=i!==void 0?i:512,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Kf(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Xt(this.width,this.height,{type:Dt}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Nt({defines:Object.assign({},Gr.defines),uniforms:Gn.clone(Gr.uniforms),vertexShader:Gr.vertexShader,fragmentShader:Gr.fragmentShader,blending:Vt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.definesPERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Qo,this.normalMaterial.blending=Vt,this.pdMaterial=new Nt({defines:Object.assign({},Xr.defines),uniforms:Gn.clone(Xr.uniforms),vertexShader:Xr.vertexShader,fragmentShader:Xr.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Nt({defines:Object.assign({},Wr.defines),uniforms:Gn.clone(Wr.uniforms),vertexShader:Wr.vertexShader,fragmentShader:Wr.fragmentShader,blending:Vt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Nt({uniforms:Gn.clone(Qs.uniforms),vertexShader:Qs.vertexShader,fragmentShader:Qs.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:ca,blendDst:Ks,blendEquation:Pn,blendSrcAlpha:aa,blendDstAlpha:Ks,blendEquationAlpha:Pn}),this.blendMaterial=new Nt({uniforms:Gn.clone(Ma.uniforms),vertexShader:Ma.vertexShader,fragmentShader:Ma.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:ml,blendSrc:ca,blendDst:Ks,blendEquation:Pn,blendSrcAlpha:aa,blendDstAlpha:Ks,blendEquationAlpha:Pn}),this.fsQuad=new zi(null),this.originalClearColor=new Ie,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),o!==void 0&&this.updateGtaoMaterial(o),a!==void 0&&this.updatePdMaterial(a)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new Hs,this.depthTexture.format=Ci,this.depthTexture.type=di,this.normalRenderTarget=new Xt(this.width,this.height,{minFilter:It,magFilter:It,type:Dt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let n=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Kl(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case s.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Vt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Vt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Vt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Vt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Vt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(e,t,n,i,r){e.getClearColor(this.originalClearColor);let o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=a,e.setClearColor(this.originalClearColor),e.setClearAlpha(o)}renderOverride(e,t,n,i,r){e.getClearColor(this.originalClearColor);let o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i=t.clearColor||i,r=t.clearAlpha||r,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=a,e.setClearColor(this.originalClearColor),e.setClearAlpha(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){t.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){let i=t.get(n);n.visible=i}),t.clear()}generateNoise(e=64){let t=new Sa,n=e*e*4,i=new Uint8Array(n);for(let o=0;o<e;o++)for(let a=0;a<e;a++){let c=o,l=a;i[(o*e+a)*4]=(t.noise(c,l)*.5+.5)*255,i[(o*e+a)*4+1]=(t.noise(c+e,l)*.5+.5)*255,i[(o*e+a)*4+2]=(t.noise(c,l+e)*.5+.5)*255,i[(o*e+a)*4+3]=(t.noise(c+e,l+e)*.5+.5)*255}let r=new Pi(i,e,e,hn,Kn);return r.wrapS=Gt,r.wrapT=Gt,r.needsUpdate=!0,r}};ki.OUTPUT={Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Ea={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var wa=class extends An{constructor(){super();let e=Ea;this.uniforms=Gn.clone(e.uniforms),this.material=new Jo({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new zi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ft.getTransfer(this._outputColorSpace)===St&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Ur?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===gl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===vl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===$s?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===os&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var jf={uniforms:{tDiffuse:{value:null},amount:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float amount;
    varying vec2 vUv;

    // \u0417\u0435\u0440\u043D\u043E \u043D\u0435\u043F\u043E\u0434\u0432\u0438\u0436\u043D\u043E: \u043A\u0430\u0434\u0440 \u043F\u0435\u0440\u0435\u0440\u0438\u0441\u043E\u0432\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u043E \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044E, \u0438 \xAB\u0436\u0438\u0432\u043E\u0439\xBB \u0448\u0443\u043C
    // \u043C\u0435\u0440\u0446\u0430\u043B \u0431\u044B \u043F\u0440\u0438 \u043A\u0430\u0436\u0434\u043E\u043C \u043F\u043E\u0432\u043E\u0440\u043E\u0442\u0435, \u043F\u0440\u0438\u0442\u044F\u0433\u0438\u0432\u0430\u044F \u043A \u0441\u0435\u0431\u0435 \u0432\u0441\u0451 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435.
    float grain(vec2 uv) {
      return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      if (amount > 0.0) {
        float n = grain(vUv) - 0.5;
        // \u0412 \u0442\u0435\u043D\u044F\u0445 \u0437\u0435\u0440\u043D\u043E \u0437\u0430\u043C\u0435\u0442\u043D\u0435\u0435, \u0447\u0435\u043C \u0432 \u0441\u0432\u0435\u0442\u0430\u0445, \u2014 \u043A\u0430\u043A \u043D\u0430 \u043F\u043B\u0451\u043D\u043A\u0435.
        float weight = 1.0 - 0.6 * dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
        // \u041A\u0430\u0434\u0440 \u0441 \u0443\u043C\u043D\u043E\u0436\u0435\u043D\u043D\u043E\u0439 \u043D\u0430 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435 \u0430\u043B\u044C\u0444\u043E\u0439: \u043D\u0430 \u043F\u0443\u0441\u0442\u044B\u0445 \u043F\u043E\u043B\u044F\u0445 \u0445\u043E\u043B\u0441\u0442\u0430 \u0437\u0435\u0440\u043D\u0443
        // \u043C\u0435\u0441\u0442\u0430 \u043D\u0435\u0442, \u0438\u043D\u0430\u0447\u0435 \u0442\u0430\u043C \u043F\u0440\u043E\u0441\u0442\u0443\u043F\u0430\u0435\u0442 \u0446\u0432\u0435\u0442\u043D\u043E\u0439 \u0448\u0443\u043C \u043F\u043E\u0432\u0435\u0440\u0445 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B.
        color.rgb += n * amount * weight * color.a;
      }
      gl_FragColor = color;
    }
  `},XM=`
  precision highp float;

  uniform sampler2D tDiffuse;

  #include <tonemapping_pars_fragment>
  #include <colorspace_pars_fragment>

  varying vec2 vUv;

  void main() {
    gl_FragColor = texture2D( tDiffuse, vUv );
    float coverage = gl_FragColor.a;
    if ( coverage > 0.0 ) gl_FragColor.rgb /= coverage;

    #ifdef LINEAR_TONE_MAPPING
      gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
    #elif defined( REINHARD_TONE_MAPPING )
      gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
    #elif defined( CINEON_TONE_MAPPING )
      gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );
    #elif defined( ACES_FILMIC_TONE_MAPPING )
      gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
    #elif defined( AGX_TONE_MAPPING )
      gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
    #endif

    gl_FragColor.rgb = max( gl_FragColor.rgb, vec3( 0.0 ) );

    #ifdef SRGB_TRANSFER
      gl_FragColor = sRGBTransferOETF( gl_FragColor );
    #endif

    gl_FragColor.rgb *= coverage;
  }
`,$l=class extends wa{constructor(){super(),this.material.fragmentShader=XM,this.material.vertexShader=Ea.vertexShader}},qM={uniforms:{tDiffuse:{value:null},backdrop:{value:null},shadow:{value:null},hasBackdrop:{value:!1},hasShadow:{value:!1},shadowOpacity:{value:1},frameSize:{value:new Re(1,1)}},vertexShader:jf.vertexShader,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform sampler2D backdrop;
    uniform sampler2D shadow;
    uniform bool hasBackdrop;
    uniform bool hasShadow;
    uniform float shadowOpacity;
    uniform vec2 frameSize;
    varying vec2 vUv;

    vec3 toDisplay(vec3 c) {
      c = max(c, vec3(0.0));
      return mix(pow(c, vec3(0.41666)) * 1.055 - vec3(0.055), c * 12.92,
                 vec3(lessThanEqual(c, vec3(0.0031308))));
    }

    void main() {
      vec4 cup = texture2D(tDiffuse, vUv);
      vec2 uv = (vUv - 0.5) / frameSize + 0.5;
      // \u0412\u044B\u0431\u043E\u0440\u043A\u0438 \u2014 \u0434\u043E \u0432\u0435\u0442\u0432\u043B\u0435\u043D\u0438\u044F: \u0443\u0440\u043E\u0432\u043D\u0438 \u043C\u0438\u043F\u043C\u0430\u043F\u0430 \u0441\u0447\u0438\u0442\u0430\u044E\u0442\u0441\u044F \u043F\u043E \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u043D\u044B\u043C, \u0430
      // \u0432\u043D\u0443\u0442\u0440\u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u043E\u043D\u0438 \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u044B.
      vec3 room = texture2D(backdrop, uv).rgb;
      vec4 shade = texture2D(shadow, uv);

      bool inside = all(greaterThanEqual(uv, vec2(0.0))) && all(lessThanEqual(uv, vec2(1.0)));
      if (!hasBackdrop || !inside) {
        gl_FragColor = cup;
        return;
      }
      if (hasShadow) room = mix(room, shade.rgb, clamp(shade.a * shadowOpacity, 0.0, 1.0));
      gl_FragColor = vec4(cup.rgb + toDisplay(room) * (1.0 - cup.a), 1.0);
    }
  `},ba=class{constructor({renderer:e,scene:t,camera:n,config:i}){this.renderer=e,this.scene=t,this.camera=n,this.config=i;let r=i.quality??{};if(this.enabled=r.postProcessing!==!1,!this.enabled)return;let o=e.getDrawingBufferSize(new Re);this.target=new Xt(o.x,o.y,{type:Dt,samples:r.msaaSamples??4}),this.composer=new xa(e,this.target),this.composer.setPixelRatio(e.getPixelRatio()),this.renderPass=new ya(t,n),this.composer.addPass(this.renderPass),this.aoCamera=n.clone(),this.aoCamera.layers.set(0),this.gtao=new ki(t,this.aoCamera,o.x,o.y),this.gtao.output=ki.OUTPUT.Default,this.gtao.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:8,rings:4,samples:16}),this.setAmbientOcclusion(r.ambientOcclusion??{}),this.composer.addPass(this.gtao),this.composer.addPass(new $l),this.backdrop=new cs(qM),this.backdrop.enabled=!1,this.composer.addPass(this.backdrop),this.grain=new cs(jf),this.composer.addPass(this.grain)}setAmbientOcclusion(e={}){var n;if(!this.gtao)return;let t={...((n=this.config.quality)==null?void 0:n.ambientOcclusion)??{},...e};this.gtao.enabled=t.enabled!==!1,this.gtao.blendIntensity=t.intensity??1,this.gtao.updateGtaoMaterial({radius:t.radius??.06,distanceExponent:t.distanceExponent??1,thickness:t.thickness??.3,scale:t.scale??1,samples:t.samples??16,screenSpaceRadius:!1})}showAmbientOcclusionOnly(e){this.gtao&&(this.gtao.output=e?ki.OUTPUT.Denoise:ki.OUTPUT.Default)}setBackdrop(e){if(!this.backdrop)return;let t=this.backdrop.uniforms;this.backdrop.enabled=!!(e!=null&&e.texture),t.backdrop.value=(e==null?void 0:e.texture)??null,t.hasBackdrop.value=!!(e!=null&&e.texture),t.shadow.value=(e==null?void 0:e.shadow)??null,t.hasShadow.value=!!(e!=null&&e.shadow),t.shadowOpacity.value=(e==null?void 0:e.shadowOpacity)??1,t.frameSize.value.set(...(e==null?void 0:e.frameSize)??[1,1])}setGrain(e){this.grain&&(this.grain.uniforms.amount.value=Math.max(0,e??0))}render(){if(!this.enabled){this.renderer.render(this.scene,this.camera);return}this.aoCamera.copy(this.camera),this.aoCamera.layers.set(0),this.composer.render()}setSize(e,t){if(!this.enabled)return;let n=this.renderer.getPixelRatio();this.composer.setPixelRatio(n),this.composer.setSize(e,t),this.gtao.setSize(e*n,t*n)}dispose(){var e,t,n,i;this.enabled&&((t=(e=this.gtao).dispose)==null||t.call(e),(i=(n=this.composer).dispose)==null||i.call(n),this.target.dispose())}};var Qf=.62,YM=.35;function ep(s,e=0){let t=new Ie(s),n=Math.max(0,Math.min(.4,e??0)),i=r=>`#${t.clone().convertSRGBToLinear().multiplyScalar(r).convertLinearToSRGB().getHexString()}`;return{base:`#${t.getHexString()}`,top:i(1-n),bottom:i(1+n*YM),flat:n===0}}function tp(s){return s.flat?s.base:`linear-gradient(180deg, ${s.top} 0%, ${s.base} ${Math.round(Qf*100)}%, ${s.bottom} 100%)`}function np(s,e,t,n){if(n.flat)s.fillStyle=n.base;else{let i=s.createLinearGradient(0,0,0,t);i.addColorStop(0,n.top),i.addColorStop(Qf,n.base),i.addColorStop(1,n.bottom),s.fillStyle=i}s.fillRect(0,0,e,t)}function Ta(s,e,t,n){np(s,e,t,n)}var Jf=1;function ip(){let s=document.createElement("canvas");s.width=1,s.height=256;let e=s.getContext("2d"),t=new Li(s);t.colorSpace=ht;let n=new zt({map:t,depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!0}),i=new ct(new Tn(1,1),n);return i.name="Backdrop",i.position.z=-Jf,i.renderOrder=-1e3,i.frustumCulled=!1,i.layers.set(1),{mesh:i,setColors(r){np(e,1,256,r),t.needsUpdate=!0},fit(r){let o=2*Jf*Math.tan(Kt.degToRad(r.fov)/2);i.scale.set(o*r.aspect,o,1)},dispose(){i.geometry.dispose(),n.dispose(),t.dispose(),i.removeFromParent()}}}var ZM=[{mime:"video/mp4;codecs=avc1.42E01E",ext:"mp4"},{mime:"video/mp4",ext:"mp4"},{mime:"video/webm;codecs=vp9",ext:"webm"},{mime:"video/webm;codecs=vp8",ext:"webm"},{mime:"video/webm",ext:"webm"}];function jl(){var s;if(typeof MediaRecorder>"u")return null;for(let e of ZM)if((s=MediaRecorder.isTypeSupported)!=null&&s.call(MediaRecorder,e.mime))return e;return null}function KM(s,e){let t=Math.max(2,s.width-s.width%2),n=Math.max(2,s.height-s.height%2),i=document.createElement("canvas");i.width=t,i.height=n;let r=i.getContext("2d");return{canvas:i,draw(){Ta(r,t,n,e),r.drawImage(s,0,0)}}}function $M(s,e="image/png"){return new Promise(t=>{try{s.toBlob(n=>t(n),e)}catch(n){console.error(n),t(null)}})}var jM=s=>new Promise(e=>setTimeout(e,s)),JM=250;async function QM({compositor:s,type:e,settings:t,startAngle:n,setAngle:i,renderFrame:r,onProgress:o}){let{fps:a,bitrate:c,duration:l}=t,h=s.canvas.captureStream(a),u=new MediaRecorder(h,{mimeType:e.mime,videoBitsPerSecond:c}),d=[];u.addEventListener("dataavailable",S=>{var y;(y=S.data)!=null&&y.size&&d.push(S.data)});let p=new Promise((S,y)=>{u.addEventListener("stop",S,{once:!0}),u.addEventListener("error",R=>y(R.error??new Error("\u0417\u0430\u043F\u0438\u0441\u044C \u043F\u0440\u0435\u0440\u0432\u0430\u043D\u0430")),{once:!0})});i(n),r(),s.draw(),u.start();let g=1e3/a,_=l*1e3,m=0,f=performance.now();return await new Promise(S=>{let y=()=>{let R=performance.now();if(document.hidden){u.state==="recording"&&u.pause(),f=R,setTimeout(y,200);return}u.state==="paused"&&u.resume(),m+=Math.min(R-f,JM),f=R;let F=Math.min(m/_,1);if(i(n+F*360),r(),s.draw(),o==null||o(F),F>=1){S();return}setTimeout(y,Math.max(0,g-(performance.now()-R)))};y()}),await jM(Math.ceil(1e3/a)+60),u.stop(),await p,h.getTracks().forEach(S=>S.stop()),new Blob(d,{type:e.mime})}async function eS({compositor:s,step:e,prefix:t,setAngle:n,renderFrame:i,onProgress:r}){let o=Math.max(1,Math.round(360/e)),a=360/o,c=[];for(let l=0;l<o;l+=1){let h=l*a;n(h),i(),s.draw();let u=await $M(s.canvas);if(u){let d=String(Math.round(h)).padStart(3,"0");c.push({name:`${t}-${d}.png`,data:new Uint8Array(await u.arrayBuffer())})}r==null||r((l+1)/o)}return c}async function sp({source:s,backdrop:e,settings:t,startAngle:n,setAngle:i,renderFrame:r,photos:o=!1,onProgress:a}){let c=KM(s,e),l=jl(),h=l?o?.85:1:0,u=null;l&&(u=await QM({compositor:c,type:l,settings:t,startAngle:n,setAngle:i,renderFrame:r,onProgress:p=>a==null?void 0:a(p*h,"\u0417\u0430\u043F\u0438\u0441\u044C \u043E\u0431\u043E\u0440\u043E\u0442\u0430")}));let d=[];return o&&(d=await eS({compositor:c,step:t.photoStep,prefix:t.name,setAngle:i,renderFrame:r,onProgress:p=>a==null?void 0:a(h+p*(1-h),"\u0421\u044A\u0451\u043C\u043A\u0430 \u043A\u0430\u0434\u0440\u043E\u0432")})),{video:u,videoExt:(l==null?void 0:l.ext)??null,photos:d}}var Aa=Object.freeze([{id:"cafe",label:"\u041A\u043E\u0444\u0435\u0439\u043D\u044F",note:"\u0423\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u0441\u0432\u0435\u0442 \u0438\u0437 \u043E\u043A\u043D\u0430"}]),Jl="assets/scenes",Ra=Aa[0].id;var tS=.85,Ca=new Map;function Ql(s){return new Promise((e,t)=>{new Ni().load(s,n=>{n.colorSpace=ht,n.wrapS=Ot,n.wrapT=Ot,e(n)},void 0,()=>t(new Error(`\u0444\u043E\u043D \u0441\u0446\u0435\u043D\u044B \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u0441\u044F: ${s}`)))})}function nS(s,e,t){return new Promise((n,i)=>{new Js().load(s,r=>{let o=Xl(r),a=new Jn(e);a.compileEquirectangularShader();let c=a.fromEquirectangular(r).texture;r.dispose(),a.dispose(),n({envMap:c,sun:o})},r=>t==null?void 0:t(r.total>0?r.loaded/r.total*100:-1),()=>i(new Error(`\u0441\u0432\u0435\u0442 \u0441\u0446\u0435\u043D\u044B \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u0441\u044F: ${s}`)))})}async function iS(s,e,t){let n=`${Jl}/${s}`,i=await fetch(`${n}/scene.json`,{credentials:"same-origin"});if(!i.ok)throw new Error(`\u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u0446\u0435\u043D\u044B ${s}: HTTP ${i.status}`);let r=await i.json(),[o,a,c]=await Promise.all([Ql(`${n}/${r.backdrop.wide}`),Ql(`${n}/${r.backdrop.tall}`),nS(`${n}/${r.environment}`,e,t)]);return{id:s,data:r,backdrops:{wide:o,tall:a},envMap:c.envMap,sun:c.sun}}function rp(s,e,t){return Ca.has(s)||Ca.set(s,iS(s,e,t).catch(n=>{throw Ca.delete(s),n})),Ca.get(s)}var Pa=new Map;function op(s){return(s==null?void 0:s.id)??null}function eh(s,e,t,n="wide"){let i=t&&e.shadows?e.shadows[t]:null,r=typeof i=="string"?n==="wide"?i:null:i==null?void 0:i[n];if(!r)return Promise.resolve(null);let o=`${Jl}/${s}/${r}`;return Pa.has(o)||Pa.set(o,Ql(o).catch(a=>(console.warn(`\u0421\u043B\u043E\u0439 \u0442\u0435\u043D\u0438 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u0441\u044F: ${a.message}`),Pa.delete(o),null))),Pa.get(o)}function th(s){return s<tS?"tall":"wide"}function La(s,e){let[t,n]=s.frames[e];return t/n}function ap(s,e,t){let n=s.camera.fov[e];if(t>=La(s,e))return n.y;let i=Kt.degToRad(n.x)/2;return Kt.radToDeg(2*Math.atan(Math.tan(i)/t))}function cp(s,e){return s>=e?[e/s,1]:[1,s/e]}function lp(s,e){var i,r;let t=(i=e==null?void 0:e.size)==null?void 0:i.height,n=(r=s.floor)==null?void 0:r.mmPerUnit;return!(t>0)||!(n>0)?null:t/n}var _i={coated:{label:"\u041C\u0435\u043B\u043E\u0432\u0430\u043D\u043D\u044B\u0439",roughness:.18,relief:.1,reliefScale:42,normalScale:.3,short:"\u0413\u043B\u044F\u043D\u0435\u0446",note:"\u0413\u043B\u0430\u0434\u043A\u0438\u0439, \u0441\u043E\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u0431\u043B\u0438\u043A"},uncoated:{label:"\u041D\u0435\u043C\u0435\u043B\u043E\u0432\u0430\u043D\u043D\u044B\u0439",roughness:.85,relief:.55,reliefScale:16,normalScale:1.4,short:"\u041C\u0430\u0442",note:"\u041C\u0430\u0442\u043E\u0432\u044B\u0439, \u0432\u0438\u0434\u043D\u043E \u0432\u043E\u043B\u043E\u043A\u043D\u043E"}},xi="uncoated";function Ia(){let s=_i[xi];return nh(xi)}function nh(s){let e=_i[s]??_i[xi];return{roughness:e.roughness,metalness:0,relief:e.relief,reliefScale:e.reliefScale,normalScale:e.normalScale}}var ti=Object.freeze({color:"#ffffff",opacity:.65,roughness:.62,metalness:0,clearcoat:.35,clearcoatRoughness:.3,sheen:.5,sheenRoughness:.6}),sS={coated:"coated",\u043C\u0435\u043B\u043E\u0432\u0430\u043D\u043D\u044B\u0439:"coated",\u043C\u0435\u043B\u043E\u0432\u0430\u043D\u043D\u0430\u044F:"coated",\u0433\u043B\u044F\u043D\u0446\u0435\u0432\u044B\u0439:"coated",uncoated:"uncoated",\u043D\u0435\u043C\u0435\u043B\u043E\u0432\u0430\u043D\u043D\u044B\u0439:"uncoated",\u043D\u0435\u043C\u0435\u043B\u043E\u0432\u0430\u043D\u043D\u0430\u044F:"uncoated",\u043A\u0440\u0430\u0444\u0442:"uncoated",\u043C\u0430\u0442\u043E\u0432\u044B\u0439:"uncoated"};function hp(s){let e=String(s??"").trim().toLowerCase(),t=sS[e]??(_i[e]?e:xi);return{key:t,..._i[t]}}var Da=Object.freeze({materials:[],uv:0,sheet:!1}),rS=Object.freeze({materials:["Paper_Print"],uv:0,sheet:!1}),ih=Object.freeze({single:{label:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0439",short:"1 \u0441\u043B\u043E\u0439"},double:{label:"\u0414\u0432\u0443\u0445\u0441\u043B\u043E\u0439\u043D\u044B\u0439",short:"2 \u0441\u043B\u043E\u044F"},embossed:{label:"\u0421 \u0442\u0438\u0441\u043D\u0435\u043D\u0438\u0435\u043C",short:"\u0442\u0438\u0441\u043D\u0435\u043D\u0438\u0435"},plastic:{label:"\u041F\u043E\u043B\u0438\u043F\u0440\u043E\u043F\u0438\u043B\u0435\u043D",short:"\u043F\u043B\u0430\u0441\u0442\u0438\u043A"}});function oS({id:s,group:e,wall:t,volume:n,size:i}){return{id:s,label:s,group:e,wall:t,volume:n,note:`${ih[t].label} \xB7 \xD8${Math.round(i.top)} \u043C\u043C`,file:`assets/models/cups/${s}.glb`,size:i,finish:"paper",print:rS}}var aS=[{id:"HB62-120",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:120,size:{height:63,top:62,bottom:45.2}},{id:"HB70-180",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:180,size:{height:80,top:70,bottom:45.6}},{id:"HB70-195",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:195,size:{height:79.5,top:70.4,bottom:49.4}},{id:"HB72-205",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:205,size:{height:81,top:71.9,bottom:50.9}},{id:"HB70-210",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:210,size:{height:93,top:70,bottom:45.7}},{id:"HB73-260",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:260,size:{height:103.5,top:72.7,bottom:48.1}},{id:"HB80-280",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:280,size:{height:88,top:80.1,bottom:57.1}},{id:"HB80-340",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:340,size:{height:116,top:80,bottom:50.3}},{id:"HB80-360",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:360,size:{height:116.9,top:80.8,bottom:53.7}},{id:"HB90-430",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:430,size:{height:111.6,top:89.4,bottom:60.1}},{id:"HB90-530",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:530,size:{height:135.7,top:89.7,bottom:60.2}},{id:"DW80-280",group:"\u0414\u0432\u0443\u0445\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"double",volume:280,size:{height:88,top:80.1,bottom:57.1}},{id:"DW90-430",group:"\u0414\u0432\u0443\u0445\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"double",volume:430,size:{height:111.6,top:89.4,bottom:60.1}},{id:"DW90-530",group:"\u0414\u0432\u0443\u0445\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"double",volume:530,size:{height:135.7,top:89.7,bottom:60.2}},{id:"EM80-280",group:"\u0421 \u0442\u0438\u0441\u043D\u0435\u043D\u0438\u0435\u043C",wall:"embossed",volume:280,size:{height:88,top:80.1,bottom:57.1}},{id:"EM90-430",group:"\u0421 \u0442\u0438\u0441\u043D\u0435\u043D\u0438\u0435\u043C",wall:"embossed",volume:430,size:{height:111.6,top:89.4,bottom:60.1}}].map(oS),cS=[{id:"PP-410",label:"PP-410",group:"\u041F\u043B\u0430\u0441\u0442\u0438\u043A\u043E\u0432\u044B\u0435",wall:"plastic",volume:410,note:"\u041F\u043E\u043B\u0438\u043F\u0440\u043E\u043F\u0438\u043B\u0435\u043D \xB7 \xD889 \u043C\u043C",file:"assets/models/Cup_410ml.glb",size:{height:112,top:89,bottom:57},finish:"plastic",print:{materials:["Cup_PP"],uv:1,sheet:!0}},{id:"PP-500",label:"PP-500",group:"\u041F\u043B\u0430\u0441\u0442\u0438\u043A\u043E\u0432\u044B\u0435",wall:"plastic",volume:500,note:"\u041F\u043E\u043B\u0438\u043F\u0440\u043E\u043F\u0438\u043B\u0435\u043D \xB7 \xD889 \u043C\u043C",file:"assets/models/Cup_500ml.glb",size:{height:135,top:89,bottom:57},finish:"plastic",print:{materials:["Cup_PP"],uv:1,sheet:!0}},{id:"PP-650",label:"PP-650",group:"\u041F\u043B\u0430\u0441\u0442\u0438\u043A\u043E\u0432\u044B\u0435",wall:"plastic",volume:650,note:"\u041F\u043E\u043B\u0438\u043F\u0440\u043E\u043F\u0438\u043B\u0435\u043D \xB7 \xD889 \u043C\u043C",file:"assets/models/Cup_650ml.glb",size:{height:179,top:89,bottom:57},finish:"plastic",print:{materials:["Cup_PP"],uv:1,sheet:!0}}],ls=Object.freeze([...aS,...cS]),up="HB80-280",lS=[{test:/^DW/i,id:"DW80-280"},{test:/^EM/i,id:"EM80-280"},{test:/^HB/i,id:"HB80-280"},{test:/^PP/i,id:"PP-500"}],hS=new Map(ls.map(s=>[s.id.toUpperCase(),s])),uS=new Map(ls.map(s=>[s.file,s])),dp=s=>String(s??"").toUpperCase().replace(/[^A-ZА-Я0-9]/g,"");function Hi(s){return hS.get(String(s??"").trim().toUpperCase())??null}function fp(s){return uS.get(String(s??"").trim())??null}function pp(s){let e=String(s??"").trim();if(!e)return{cup:Hi(up),matchedBy:"fallback"};let t=Hi(e);if(t)return{cup:t,matchedBy:"sku"};let n=dp(e),i=ls.filter(o=>n.startsWith(dp(o.id))).sort((o,a)=>a.id.length-o.id.length)[0];if(i)return{cup:i,matchedBy:"sku"};let r=lS.find(o=>o.test.test(e));return r?{cup:Hi(r.id),matchedBy:"pattern"}:(console.warn(`\u041A\u0430\u0442\u0430\u043B\u043E\u0433: \u043D\u043E\u043C\u0435\u043D\u043A\u043B\u0430\u0442\u0443\u0440\u0430 "${e}" \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430 \u2014 \u0433\u0440\u0443\u0437\u0438\u043C \u043C\u043E\u0434\u0435\u043B\u044C \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E.`),{cup:Hi(up),matchedBy:"fallback"})}function mp(){let s=new Map;for(let e of ls){let t=e.group??"";s.has(t)||s.set(t,[]),s.get(t).push(e)}return[...s].map(([e,t])=>({group:e,cups:t}))}var gp={width:297,height:210},vp=1024,Ua=null;function hs(){if(Ua)return Ua;let s=document.createElement("canvas");s.width=vp,s.height=Math.round(vp*gp.height/gp.width);let e=s.getContext("2d");return e.fillStyle="#ffffff",e.fillRect(0,0,s.width,s.height),Ua=s.toDataURL("image/png"),Ua}var dS=(()=>{let s=new Uint32Array(256);for(let e=0;e<256;e+=1){let t=e;for(let n=0;n<8;n+=1)t=t&1?3988292384^t>>>1:t>>>1;s[e]=t>>>0}return s})();function fS(s){let e=4294967295;for(let t=0;t<s.length;t+=1)e=dS[(e^s[t])&255]^e>>>8;return(e^4294967295)>>>0}function pS(s){let e=Math.max(s.getFullYear(),1980);return{time:s.getHours()<<11|s.getMinutes()<<5|s.getSeconds()>>1,date:e-1980<<9|s.getMonth()+1<<5|s.getDate()}}function mS(s){return s.replace(/[^\x20-\x7e]/g,"_")}function _p(s){let e=new TextEncoder,t=pS(new Date),n=s.map(l=>({name:e.encode(mS(l.name)),data:l.data,crc:fS(l.data)})),i=[],r=[],o=0;for(let l of n){let h=new DataView(new ArrayBuffer(30));h.setUint32(0,67324752,!0),h.setUint16(4,20,!0),h.setUint16(6,0,!0),h.setUint16(8,0,!0),h.setUint16(10,t.time,!0),h.setUint16(12,t.date,!0),h.setUint32(14,l.crc,!0),h.setUint32(18,l.data.length,!0),h.setUint32(22,l.data.length,!0),h.setUint16(26,l.name.length,!0),h.setUint16(28,0,!0),i.push(h.buffer,l.name,l.data);let u=new DataView(new ArrayBuffer(46));u.setUint32(0,33639248,!0),u.setUint16(4,20,!0),u.setUint16(6,20,!0),u.setUint16(8,0,!0),u.setUint16(10,0,!0),u.setUint16(12,t.time,!0),u.setUint16(14,t.date,!0),u.setUint32(16,l.crc,!0),u.setUint32(20,l.data.length,!0),u.setUint32(24,l.data.length,!0),u.setUint16(28,l.name.length,!0),u.setUint16(30,0,!0),u.setUint16(32,0,!0),u.setUint16(34,0,!0),u.setUint16(36,0,!0),u.setUint32(38,0,!0),u.setUint32(42,o,!0),r.push(u.buffer,l.name),o+=30+l.name.length+l.data.length}let a=r.reduce((l,h)=>l+h.byteLength,0),c=new DataView(new ArrayBuffer(22));return c.setUint32(0,101010256,!0),c.setUint16(4,0,!0),c.setUint16(6,0,!0),c.setUint16(8,n.length,!0),c.setUint16(10,n.length,!0),c.setUint32(12,a,!0),c.setUint32(16,o,!0),c.setUint16(20,0,!0),new Blob([...i,...r,c.buffer],{type:"application/zip"})}function sh(s,e){if(e===sf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Nr||e===ha){let t=s.getIndex();if(t===null){let o=[],a=s.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===Nr)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var Na=class extends Un{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new uh(t)}),this.register(function(t){return new yh(t)}),this.register(function(t){return new Mh(t)}),this.register(function(t){return new Sh(t)}),this.register(function(t){return new fh(t)}),this.register(function(t){return new ph(t)}),this.register(function(t){return new mh(t)}),this.register(function(t){return new gh(t)}),this.register(function(t){return new hh(t)}),this.register(function(t){return new vh(t)}),this.register(function(t){return new dh(t)}),this.register(function(t){return new xh(t)}),this.register(function(t){return new _h(t)}),this.register(function(t){return new ch(t)}),this.register(function(t){return new Eh(t)}),this.register(function(t){return new wh(t)})}load(e,t,n,i){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Oi.extractUrlBase(e);o=Oi.resolveURL(l,this.path)}else o=Oi.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new gi(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Ep){try{o[at.KHR_BINARY_GLTF]=new bh(e)}catch(u){i&&i(u);return}r=JSON.parse(o[at.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Ih(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case at.KHR_MATERIALS_UNLIT:o[u]=new lh;break;case at.KHR_DRACO_MESH_COMPRESSION:o[u]=new Th(r,this.dracoLoader);break;case at.KHR_TEXTURE_TRANSFORM:o[u]=new Ah;break;case at.KHR_MESH_QUANTIZATION:o[u]=new Rh;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function gS(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}var at={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},ch=class{constructor(e){this.parser=e,this.name=at.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Ie(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Tt);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ia(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new na(h),l.distance=u;break;case"spot":l=new Ys(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Gi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},lh=class{constructor(){this.name=at.KHR_MATERIALS_UNLIT}getMaterialType(){return zt}extendParams(e,t,n){let i=[];e.color=new Ie(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Tt),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,ht))}return Promise.all(i)}},hh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},uh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Re(a,a)}return Promise.all(r)}},dh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},fh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Ie(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Tt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,ht)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},ph=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},mh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ie().setRGB(a[0],a[1],a[2],Tt),Promise.all(r)}},gh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},vh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ie().setRGB(a[0],a[1],a[2],Tt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,ht)),Promise.all(r)}},_h=class{constructor(e){this.parser=e,this.name=at.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},xh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},yh=class{constructor(e){this.parser=e,this.name=at.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Mh=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Sh=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Eh=class{constructor(e){this.name=at.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(p){return p.buffer}):o.ready.then(function(){let p=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(p),h,u,d,i.mode,i.filter),p})})}else return null}},wh=class{constructor(e){this.name=at.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==On.TRIANGLES&&l.mode!==On.TRIANGLE_STRIP&&l.mode!==On.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,p=[];for(let g of u){let _=new $e,m=new B,f=new _n,S=new B(1,1,1),y=new is(g.geometry,g.material,d);for(let R=0;R<d;R++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,R),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,R),c.SCALE&&S.fromBufferAttribute(c.SCALE,R),y.setMatrixAt(R,_.compose(m,f,S));for(let R in c)if(R==="_COLOR_0"){let F=c[R];y.instanceColor=new ns(F.array,F.itemSize,F.normalized)}else R!=="TRANSLATION"&&R!=="ROTATION"&&R!=="SCALE"&&g.geometry.setAttribute(R,c[R]);Ut.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),p.push(y)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},Ep="glTF",qr=12,xp={JSON:1313821514,BIN:5130562},bh=class{constructor(e){this.name=at.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,qr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ep)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-qr,r=new DataView(e,qr),o=0;for(;o<i;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===xp.JSON){let l=new Uint8Array(e,qr+o,a);this.content=n.decode(l)}else if(c===xp.BIN){let l=qr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Th=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=at.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=Ph[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=Ph[h]||h.toLowerCase();if(o[h]!==void 0){let d=n.accessors[e.attributes[h]],p=er[d.componentType];l[u]=p.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(p){for(let g in p.attributes){let _=p.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(p)},a,l,Tt,d)})})}},Ah=class{constructor(){this.name=at.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Rh=class{constructor(){this.name=at.KHR_MESH_QUANTIZATION}},Oa=class extends Ii{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-t,u=(n-t)/h,d=u*u,p=d*u,g=e*l,_=g-l,m=-2*p+3*d,f=p-d,S=1-m,y=f-d+u;for(let R=0;R!==a;R++){let F=o[_+R+a],L=o[_+R+c]*h,P=o[g+R+a],k=o[g+R]*h;r[R]=S*F+y*L+m*P+f*k}return r}},vS=new _n,Ch=class extends Oa{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return vS.fromArray(r).normalize().toArray(r),r}},On={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},er={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},yp={9728:It,9729:bt,9984:Lo,9985:_l,9986:fr,9987:Vn},Mp={33071:Ot,33648:_r,10497:Gt},rh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ph={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Vi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},_S={CUBICSPLINE:void 0,LINEAR:ts,STEP:Bs},oh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function xS(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Xs({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ln})),s.DefaultMaterial}function us(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Gi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function yS(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],d=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function MS(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function SS(s){let e,t=s.extensions&&s.extensions[at.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ah(t.attributes):e=s.indices+":"+ah(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+ah(s.targets[n]);return e}function ah(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Lh(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ES(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var wS=new $e,Ih=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new gS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&r<98?this.textureLoader=new Ni(this.options.manager):this.textureLoader=new sa(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new gi(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return us(r,a,i),Gi(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[at.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,o){n.load(Oi.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=rh[i.type],a=er[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new Ct(l,o,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=rh[i.type],l=er[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,_,m;if(p&&p!==u){let f=Math.floor(d/p),S="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+f+":"+i.count,y=t.cache.get(S);y||(_=new l(a,f*p,i.count*p/h),y=new br(_,p/h),t.cache.add(S,y)),m=new Tr(y,c,d%p/h,g)}else a===null?_=new l(i.count*c):_=new l(a,d,i.count*c),m=new Ct(_,c,g);if(i.sparse!==void 0){let f=rh.SCALAR,S=er[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,R=i.sparse.values.byteOffset||0,F=new S(o[1],y,i.sparse.count*f),L=new l(o[2],R,i.sparse.count*c);a!==null&&(m=new Ct(m.array.slice(),m.itemSize,m.normalized));for(let P=0,k=F.length;P<k;P++){let M=F[P];if(m.setX(M,L[P*c]),c>=2&&m.setY(M,L[P*c+1]),c>=3&&m.setZ(M,L[P*c+2]),c>=4&&m.setW(M,L[P*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let i=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let d=(r.samplers||{})[o.sampler]||{};return h.magFilter=yp[d.magFilter]||bt,h.minFilter=yp[d.minFilter]||Vn,h.wrapS=Mp[d.wrapS]||Gt,h.wrapT=Mp[d.wrapT]||Gt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=i.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){let m=new Wt(_);m.needsUpdate=!0,d(m)}),t.load(Oi.resolveURL(u,r.path),g,void 0,p)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),u.userData.mimeType=o.mimeType||ES(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[at.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[at.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[at.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Cr,vn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Rr,vn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Xs}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[at.KHR_MATERIALS_UNLIT]){let u=i[at.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new Ie(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Tt),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,ht)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=wn);let h=r.alphaMode||oh.OPAQUE;if(h===oh.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===oh.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==zt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Re(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==zt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==zt){let u=r.emissiveFactor;a.emissive=new Ie().setRGB(u[0],u[1],u[2],Tt)}return r.emissiveTexture!==void 0&&o!==zt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,ht)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),Gi(u,r),t.associations.set(u,{materials:e}),r.extensions&&us(i,u,r),u})}createUniqueName(e){let t=wt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[at.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Sp(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=SS(l),u=i[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[at.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=Sp(new qt,l,t),i[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?xS(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let p=0,g=h.length;p<g;p++){let _=h[p],m=o[p],f,S=l[p];if(m.mode===On.TRIANGLES||m.mode===On.TRIANGLE_STRIP||m.mode===On.TRIANGLE_FAN||m.mode===void 0)f=r.isSkinnedMesh===!0?new Xo(_,S):new ct(_,S),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===On.TRIANGLE_STRIP?f.geometry=sh(f.geometry,ha):m.mode===On.TRIANGLE_FAN&&(f.geometry=sh(f.geometry,Nr));else if(m.mode===On.LINES)f=new Yo(_,S);else if(m.mode===On.LINE_STRIP)f=new Gs(_,S);else if(m.mode===On.LINE_LOOP)f=new Zo(_,S);else if(m.mode===On.POINTS)f=new Ko(_,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&MS(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),Gi(f,r),m.extensions&&us(i,f,m),t.assignFinalMaterial(f),u.push(f)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return r.extensions&&us(i,u[0],r),u[0];let d=new Ht;r.extensions&&us(i,d,r),t.associations.set(d,{meshes:e});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new kt(Kt.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new jn(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Gi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let d=new $e;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new qo(a,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let p=i.channels[u],g=i.samplers[p.sampler],_=p.target,m=_.node,f=i.parameters!==void 0?i.parameters[g.input]:g.input,S=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),c.push(this.getDependency("accessor",S)),l.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],p=u[1],g=u[2],_=u[3],m=u[4],f=[];for(let S=0,y=d.length;S<y;S++){let R=d[S],F=p[S],L=g[S],P=_[S],k=m[S];if(R===void 0)continue;R.updateMatrix&&R.updateMatrix();let M=n._createAnimationTracks(R,F,L,P,k);if(M)for(let b=0;b<M.length;b++)f.push(M[b])}return new ta(r,void 0,f)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,wS)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Ar:l.length>1?h=new Ht:l.length===1?h=l[0]:h=new Ut,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Gi(h,r),r.extensions&&us(n,h,r),r.matrix!==void 0){let u=new $e;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Ht;n.name&&(r.name=i.createUniqueName(n.name)),Gi(r,n),n.extensions&&us(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[d,p]of i.associations)(d instanceof vn||d instanceof Wt)&&u.set(d,p);return h.traverse(d=>{let p=i.associations.get(d);p!=null&&u.set(d,p)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let o=[],a=e.name?e.name:e.uuid,c=[];Vi[r.path]===Vi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(Vi[r.path]){case Vi.weights:l=pi;break;case Vi.rotation:l=Qn;break;case Vi.position:case Vi.scale:l=mi;break;default:switch(n.itemSize){case 1:l=pi;break;case 2:case 3:default:l=mi;break}break}let h=i.interpolation!==void 0?_S[i.interpolation]:ts,u=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){let g=new l(c[d]+"."+Vi[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Lh(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Qn?Ch:Oa;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function bS(s,e,t){let n=e.attributes,i=new sn;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new B(c[0],c[1],c[2]),new B(l[0],l[1],l[2])),a.normalized){let h=Lh(er[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new B,c=new B;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){let _=Lh(er[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;let o=new bn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function Sp(s,e,t){let n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){s.setAttribute(a,c)})}for(let o in n){let a=Ph[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){let o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return ft.workingColorSpace!==Tt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ft.workingColorSpace}" not supported.`),Gi(s,e),bS(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?yS(s,e.targets,t):s})}var Dh=new WeakMap,Fa=class extends Un{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){let r=new gi(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,o=>{this.parse(o,t,i)},n,i)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,ht).catch(n)}decodeDracoFile(e,t,n,i,r=Tt,o=()=>{}){let a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:r};return this.decodeGeometry(e,a).then(t).catch(o)}decodeGeometry(e,t){let n=JSON.stringify(t);if(Dh.has(e)){let c=Dh.get(e);if(c.key===n)return c.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i,r=this.workerNextTaskID++,o=e.byteLength,a=this._getWorker(r,o).then(c=>(i=c,new Promise((l,h)=>{i._callbacks[r]={resolve:l,reject:h},i.postMessage({type:"decode",id:r,taskConfig:t,buffer:e},[e])}))).then(c=>this._createGeometry(c.geometry));return a.catch(()=>!0).then(()=>{i&&r&&this._releaseTask(i,r)}),Dh.set(e,{key:n,promise:a}),a}_createGeometry(e){let t=new qt;e.index&&t.setIndex(new Ct(e.index.array,1));for(let n=0;n<e.attributes.length;n++){let i=e.attributes[n],r=i.name,o=i.array,a=i.itemSize,c=new Ct(o,a);r==="color"&&(this._assignVertexColorSpace(c,i.vertexColorSpace),c.normalized=!(o instanceof Float32Array)),t.setAttribute(r,c)}return t}_assignVertexColorSpace(e,t){if(t!==ht)return;let n=new Ie;for(let i=0,r=e.count;i<r;i++)n.fromBufferAttribute(e,i).convertSRGBToLinear(),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){let n=new gi(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,r)=>{n.load(e,i,void 0,r)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{let i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);let r=TS.toString(),o=["/* draco decoder */",i,"","/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([o]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(r){let o=r.data;switch(o.type){case"decode":i._callbacks[o.id].resolve(o);break;case"error":i._callbacks[o.id].reject(o);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+o.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,r){return i._taskLoad>r._taskLoad?-1:1});let n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}};function TS(){let s,e;onmessage=function(o){let a=o.data;switch(a.type){case"init":s=a.decoderConfig,e=new Promise(function(h){s.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(s)});break;case"decode":let c=a.buffer,l=a.taskConfig;e.then(h=>{let u=h.draco,d=new u.Decoder;try{let p=t(u,d,new Int8Array(c),l),g=p.attributes.map(_=>_.array.buffer);p.index&&g.push(p.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:p},g)}catch(p){console.error(p),self.postMessage({type:"error",id:a.id,error:p.message})}finally{u.destroy(d)}});break}};function t(o,a,c,l){let h=l.attributeIDs,u=l.attributeTypes,d,p,g=a.GetEncodedGeometryType(c);if(g===o.TRIANGULAR_MESH)d=new o.Mesh,p=a.DecodeArrayToMesh(c,c.byteLength,d);else if(g===o.POINT_CLOUD)d=new o.PointCloud,p=a.DecodeArrayToPointCloud(c,c.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!p.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+p.error_msg());let _={index:null,attributes:[]};for(let m in h){let f=self[u[m]],S,y;if(l.useUniqueIDs)y=h[m],S=a.GetAttributeByUniqueId(d,y);else{if(y=a.GetAttributeId(d,o[h[m]]),y===-1)continue;S=a.GetAttribute(d,y)}let R=i(o,a,d,m,f,S);m==="color"&&(R.vertexColorSpace=l.vertexColorSpace),_.attributes.push(R)}return g===o.TRIANGULAR_MESH&&(_.index=n(o,a,d)),o.destroy(d),_}function n(o,a,c){let h=c.num_faces()*3,u=h*4,d=o._malloc(u);a.GetTrianglesUInt32Array(c,u,d);let p=new Uint32Array(o.HEAPF32.buffer,d,h).slice();return o._free(d),{array:p,itemSize:1}}function i(o,a,c,l,h,u){let d=u.num_components(),g=c.num_points()*d,_=g*h.BYTES_PER_ELEMENT,m=r(o,h),f=o._malloc(_);a.GetAttributeDataArrayForAllPoints(c,u,m,_,f);let S=new h(o.HEAPF32.buffer,f,g).slice();return o._free(f),{name:l,array:S,itemSize:d}}function r(o,a){switch(a){case Float32Array:return o.DT_FLOAT32;case Int8Array:return o.DT_INT8;case Int16Array:return o.DT_INT16;case Int32Array:return o.DT_INT32;case Uint8Array:return o.DT_UINT8;case Uint16Array:return o.DT_UINT16;case Uint32Array:return o.DT_UINT32}}}function wp(s){s.traverse(e=>{if(e.geometry&&e.geometry.dispose(),!e.material)return;let t=Array.isArray(e.material)?e.material:[e.material];for(let n of t)AS(n)})}function AS(s){for(let e of Object.values(s))e&&e.isTexture&&e.dispose();s.dispose()}function Uh(s){let e=new sn().setFromObject(s);return{box:e,center:e.getCenter(new B),size:e.getSize(new B)}}function bp(s,e,t,n=1.3,i=0){let r=t.getCenter(new B),o=t.getSize(new B);r.y+=o.y*i;let c=Math.max(o.x,o.y,o.z)/(2*Math.tan(Math.PI*s.fov/360)),l=Number.isFinite(s.aspect)&&s.aspect>0?s.aspect:1,h=Math.max(o.x,o.z)/(2*Math.tan(Math.PI*s.fov/360)*l),u=n*Math.max(c,h),d=Number.isFinite(u)&&u>0?u:1,p=s.position.clone().sub(e.target).normalize();e.target.copy(r),s.position.copy(r).addScaledVector(p,d),s.near=d/20,s.far=d*20,s.updateProjectionMatrix(),e.update()}var Nh=512,Ap=6;function RS(s,e){let t=new Float32Array(s*e),n=[{cells:32,weight:.4},{cells:96,weight:.35},{cells:192,weight:.25}];for(let{cells:i,weight:r}of n){let o=new Float32Array((i+1)*(i+1));for(let c=0;c<o.length;c++)o[c]=Math.random();let a=c=>c*c*(3-2*c);for(let c=0;c<e;c++)for(let l=0;l<s;l++){let h=l/s*i,u=c/e*i,d=Math.floor(h),p=Math.floor(u),g=a(h-d),_=a(u-p),m=F=>F%i,f=F=>F%i,S=(F,L)=>o[f(L)*(i+1)+m(F)],y=S(d,p)*(1-g)+S(d+1,p)*g,R=S(d,p+1)*(1-g)+S(d+1,p+1)*g;t[c*s+l]+=(y*(1-_)+R*_)*r}}return t}function CS(s,e){let t=document.createElement("canvas");t.width=e,t.height=e;let n=t.getContext("2d"),i=n.createImageData(e,e),r=(a,c)=>s[(c+e)%e*e+(a+e)%e],o=1.4;for(let a=0;a<e;a++)for(let c=0;c<e;c++){let l=(r(c+1,a)-r(c-1,a))*o,h=(r(c,a+1)-r(c,a-1))*o,u=Math.hypot(l,h,1),d=(a*e+c)*4;i.data[d]=(-l/u*.5+.5)*255,i.data[d+1]=(-h/u*.5+.5)*255,i.data[d+2]=1/u*.5*255+127.5,i.data[d+3]=255}return n.putImageData(i,0,0),t}var Oh=null,Tp=new Map;function PS(s=Ap){let e=Math.round(s*100)/100,t=Tp.get(e);if(t)return t;Oh||(Oh=RS(Nh,Nh));let n=new Li(CS(Oh,Nh));return n.wrapS=Gt,n.wrapT=Gt,n.repeat.set(e,e),n.colorSpace=un,n.anisotropy=4,Tp.set(e,n),n}function Rp(s,e,t=Ap,n=1){var r;if(!("normalScale"in s))return!1;let i=(r=s.userData)==null?void 0:r.sourceNormalMap;return i?(s.normalMap=i,s.normalScale.set(n,n),s.needsUpdate=!0,!0):e?(s.normalMap=PS(t),s.normalScale=new Re(e,e),s.needsUpdate=!0,!0):(s.normalMap=null,s.needsUpdate=!0,!0)}var LS=1,IS=2,xn,Cp,Pp,Lp,Ip,Dp,Up,Ba=class{constructor({scene:e,camera:t,controls:n,config:i,maxAnisotropy:r=1}){an(this,xn);this.scene=e,this.camera=t,this.controls=n,this.config=i,this.maxAnisotropy=r,this.loader=new Na,this.draco=new Fa,this.draco.setDecoderPath(i.assets.dracoDecoder),this.loader.setDRACOLoader(this.draco),this.currentModel=null,this.cup=null,this.print=Da,this.printMaterials=[],this.wallOpacity=1}load(e,t,n=null){return new Promise((i,r)=>{this.loader.load(e,o=>i(V(this,xn,Cp).call(this,o.scene,n)),o=>t==null?void 0:t(o.total>0?o.loaded/o.total*100:-1),o=>r(new Error(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u044C "${e}": ${o.message??o}`)))})}applySurfaceFinish(e=Ia()){var i;let t=((i=this.cup)==null?void 0:i.finish)??"paper";if(t==="own")return 0;if(t==="plastic")return V(this,xn,Pp).call(this);if(!e)return 0;this.wallOpacity=1;let n=0;for(let r of this.printMaterials)"roughness"in r&&(e.roughness!=null&&(r.roughness=e.roughness),e.metalness!=null&&(r.metalness=e.metalness),e.relief!=null&&Rp(r,e.relief,e.reliefScale,e.normalScale??1),r.needsUpdate=!0,n++);return n}frameCurrentModel(){this.currentModel&&bp(this.camera,this.controls,Uh(this.currentModel).box,this.config.model.cameraFitOffset,this.config.model.cameraAim)}normalize(e=this.currentModel){if(!e||!this.sourceSize)return;let{x:t,y:n,z:i}=this.sourceSize,r=Math.max(t,n,i);e.scale.setScalar(r>0?this.config.model.targetSize/r:1),e.position.set(0,0,0)}setNaturalHeight(e,t=[0,0,0]){let n=this.currentModel;if(!n||!this.sourceSize||!(this.sourceSize.y>0))return 0;let i=e/this.sourceSize.y;return n.scale.setScalar(i),n.position.set(t[0],t[1]+this.sourceSize.y*i/2,t[2]),i}dispose(){this.currentModel&&(this.scene.remove(this.currentModel),wp(this.currentModel),this.currentModel=null,this.sourceSize=null,this.cup=null,this.print=Da,this.printMaterials=[],this.wallOpacity=1)}destroy(){this.dispose(),this.draco.dispose()}};xn=new WeakSet,Cp=function(e,t){var i;this.dispose(),this.cup=t,this.print=(t==null?void 0:t.print)??Da,V(this,xn,Dp).call(this,e),((i=this.cup)==null?void 0:i.finish)==="plastic"&&V(this,xn,Lp).call(this,e);let n=V(this,xn,Ip).call(this,e);return this.scene.add(n),this.currentModel=n,this.applySurfaceFinish(),this.frameCurrentModel(),n},Pp=function(){let e=0;for(let t of this.printMaterials)"roughness"in t&&(t.color.set(ti.color),t.roughness=ti.roughness,t.metalness=ti.metalness,"transmission"in t&&(t.transmission=0,t.thickness=0,t.clearcoat=ti.clearcoat,t.clearcoatRoughness=ti.clearcoatRoughness,t.sheen=ti.sheen,t.sheenRoughness=ti.sheenRoughness,t.sheenColor.set(ti.color)),t.transparent=!0,t.opacity=1,t.depthWrite=!0,t.side=t.userData.backSide?dn:Ln,t.needsUpdate=!0,e++);return this.wallOpacity=ti.opacity,e},Lp=function(e){let t=[];e.traverse(n=>{if(!n.isMesh)return;(Array.isArray(n.material)?n.material:[n.material]).some(r=>this.printMaterials.includes(r))&&t.push(n)});for(let n of t){let r=(Array.isArray(n.material)?n.material[0]:n.material).clone();r.userData.backSide=!0;let o=new ct(n.geometry,r);o.name=`${n.name}__back`,o.castShadow=!1,o.receiveShadow=!0,o.renderOrder=LS,n.renderOrder=IS,n.parent.add(o),this.printMaterials.push(r)}},Ip=function(e){let{center:t,size:n}=Uh(e);e.position.sub(t);let i=new Ht;return i.name="ModelPivot",i.add(e),this.sourceSize=n.clone(),this.normalize(i),i},Dp=function(e){this.printMaterials=[];let t=new Set(this.print.materials??[]),n=new Set;e.traverse(i=>{if(!i.isMesh)return;i.castShadow=!0,i.receiveShadow=!0;let r=Array.isArray(i.material)?i.material:[i.material];for(let o of r){if(!o||n.has(o))continue;n.add(o),V(this,xn,Up).call(this,o),o.userData.sourceNormalMap===void 0&&(o.userData.sourceNormalMap=o.normalMap??null),(t.size>0?t.has(o.name):!!o.map)&&this.printMaterials.push(o)}}),t.size>0&&this.printMaterials.length===0&&console.warn(`\u041A\u0430\u0442\u0430\u043B\u043E\u0433: \u0432 \u043C\u043E\u0434\u0435\u043B\u0438 \u043D\u0435\u0442 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \xAB${[...t].join("\xBB, \xAB")}\xBB \u2014 \u043C\u0430\u043A\u0435\u0442 \u043A\u043B\u0430\u0441\u0442\u044C \u043D\u0435\u043A\u0443\u0434\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 print.materials \u0432 js/data/models.js.`)},Up=function(e){for(let t of Object.values(e))t!=null&&t.isTexture&&(t.anisotropy=this.maxAnisotropy,t.needsUpdate=!0)};var ds=.1,Np=64,$t,Op,Fp,Bp,za,zp,kp,Fh,ka=class{constructor({modelLoader:e,config:t,maxAnisotropy:n=1,maxTextureSize:i=4096}){an(this,$t);var r;this.modelLoader=e,this.config=t,this.maxAnisotropy=n,this.maxSize=Math.min(((r=t.texture)==null?void 0:r.maxSize)??2048,i),this.loader=new Ni,this.ownedTextures=new Set}async loadTexture(e){var a;let t=((a=this.modelLoader.print)==null?void 0:a.sheet)===!0,n=t?Math.round(this.maxSize*(1-2*ds)):this.maxSize,r=t&&e===hs()?null:await V(this,$t,Fp).call(this,e,n),o=new Wt(t?V(this,$t,Op).call(this,r):r);return o.needsUpdate=!0,V(this,$t,zp).call(this,o)}async loadFromFile(e){if(!e.type.startsWith("image/"))throw new Error(`"${e.name}" \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435\u043C`);let t=URL.createObjectURL(e);try{return await this.loadTexture(t)}finally{URL.revokeObjectURL(t)}}applyTexture(e){let t=this.modelLoader.printMaterials;if(t.length===0)return 0;let n=0;for(let i of t)i.map!==e&&(V(this,$t,kp).call(this,i.map),i.map=e,i.needsUpdate=!0),n++;return n}async replaceTexture(e){return this.applyTexture(await this.loadTexture(e))}dispose(){for(let e of this.ownedTextures)V(this,$t,Fh).call(this,e);this.ownedTextures.clear()}};$t=new WeakSet,Op=function(e){var c;let t=this.modelLoader.wallOpacity??1,n=1-2*ds,i=e?e.naturalWidth??e.width:Np,r=e?e.naturalHeight??e.height:Np,o=document.createElement("canvas");o.width=Math.round(i/n),o.height=Math.round(r/n);let a=o.getContext("2d");return a.fillStyle=`rgba(255, 255, 255, ${t})`,a.fillRect(0,0,o.width,o.height),e&&(a.drawImage(e,Math.round(o.width*ds),Math.round(o.height*ds),i,r),(c=e.close)==null||c.call(e)),o},Fp=async function(e,t){if(e.startsWith("data:"))return V(this,$t,za).call(this,e);if(typeof createImageBitmap!="function")return V(this,$t,za).call(this,e);try{let n=await fetch(e,{credentials:"same-origin"});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.blob(),r=await createImageBitmap(i),o=Math.max(r.width,r.height);if(o<=t)return r;let a=t/o,c=Math.max(1,Math.round(r.width*a)),l=Math.max(1,Math.round(r.height*a)),h=await createImageBitmap(i,{resizeWidth:c,resizeHeight:l,resizeQuality:"high"});if(r.close(),r=h,Math.max(r.width,r.height)>t){let u=V(this,$t,Bp).call(this,r,c,l);r.close(),r=u}return console.info(`\u041C\u0430\u043A\u0435\u0442 \u0443\u043C\u0435\u043D\u044C\u0448\u0435\u043D \u0434\u043E ${r.width}\xD7${r.height} \u0434\u043B\u044F 3D (\u043F\u0440\u0435\u0434\u0435\u043B ${t}px). \u041A\u0440\u0443\u043F\u043D\u044B\u0439 \u0438\u0441\u0445\u043E\u0434\u043D\u0438\u043A \u0434\u043B\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043C\u0435\u043B\u043A\u043E\u0433\u043E \u0442\u0435\u043A\u0441\u0442\u0430 \u043F\u0435\u0440\u0435\u0434\u0430\u0451\u0442\u0441\u044F \u043F\u043E\u043B\u0435\u043C "unwrap".`),r}catch(n){return console.warn(`\u0411\u044B\u0441\u0442\u0440\u043E\u0435 \u0434\u0435\u043A\u043E\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043C\u0430\u043A\u0435\u0442\u0430 \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C (${n.message}), \u0433\u0440\u0443\u0437\u0438\u043C \u0447\u0435\u0440\u0435\u0437 <img>.`),V(this,$t,za).call(this,e)}},Bp=function(e,t,n){let i=document.createElement("canvas");i.width=t,i.height=n;let r=i.getContext("2d");return r.imageSmoothingEnabled=!0,r.imageSmoothingQuality="high",r.drawImage(e,0,0,t,n),i},za=function(e){return new Promise((t,n)=>{this.loader.load(e,i=>{let r=i.image;i.dispose(),t(r)},void 0,()=>n(new Error(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0442\u0435\u043A\u0441\u0442\u0443\u0440\u0443 "${e}"`)))})},zp=function(e){let t=this.modelLoader.print??{};if(e.colorSpace=ht,e.channel=t.uv??0,t.sheet){let n=1-2*ds;e.wrapS=Ot,e.wrapT=Ot,e.repeat.set(n,n),e.offset.set(ds,ds)}else e.wrapS=Gt,e.wrapT=Gt;return e.flipY=!1,e.anisotropy=this.maxAnisotropy,e.generateMipmaps=!0,e.minFilter=Vn,e.magFilter=bt,this.ownedTextures.add(e),e},kp=function(e){this.ownedTextures.has(e)&&(V(this,$t,Fh).call(this,e),this.ownedTextures.delete(e))},Fh=function(e){e.dispose();let t=e.image;t&&typeof t.close=="function"&&t.close()};var on={width:96,height:104,padding:6},Hp=.17,DS=1.1,US="http://www.w3.org/2000/svg",Vp=s=>String(s??"").toLowerCase().replace(/ё/g,"\u0435");function NS(){let s=Math.max(...ls.map(e=>{var t;return((t=e.size)==null?void 0:t.height)??0}),1);return(on.height-on.padding*2)/(s*DS)}function yn(s,e){let t=document.createElementNS(US,s);for(let[n,i]of Object.entries(e))t.setAttribute(n,i);return t}function OS(s,e){let t=yn("svg",{class:`cup-card__art cup-card__art--${s.wall??"single"}`,viewBox:`0 0 ${on.width} ${on.height}`,"aria-hidden":"true"}),n=s.size;if(!n)return t;let i=n.height*e,r=n.top/2*e,o=n.bottom/2*e,a=on.width/2,c=on.height-on.padding,l=c-i,h=r*Hp,u=o*Hp,d=`M${a-r} ${l} L${a-o} ${c} A${o} ${u} 0 0 0 ${a+o} ${c} L${a+r} ${l} Z`;t.append(yn("line",{class:"cup-card__floor",x1:on.padding,y1:c+u,x2:on.width-on.padding,y2:c+u}),yn("ellipse",{class:"cup-card__shadow",cx:a,cy:c+u*.5,rx:o*1.25,ry:u*1.1}),yn("path",{class:"cup-card__body",d}));let p=`cup-clip-${s.id}`,g=yn("defs",{}),_=yn("clipPath",{id:p});_.appendChild(yn("path",{d})),g.appendChild(_),t.appendChild(g);let m=yn("g",{"clip-path":`url(#${p})`});if(s.wall==="double"){let f=l+i*.03,S=c-i*.11;m.append(yn("path",{class:"cup-card__sleeve",d:`M${a-r} ${f} L${a-o} ${S} L${a+o} ${S} L${a+r} ${f} Z`}),yn("line",{class:"cup-card__seam",x1:a-o,y1:S,x2:a+o,y2:S}))}if(s.wall==="embossed"){let S=yn("g",{class:"cup-card__emboss"});for(let y=-on.height;y<on.width+on.height;y+=7)S.append(yn("line",{x1:y,y1:0,x2:y+on.height,y2:on.height}),yn("line",{x1:y,y1:on.height,x2:y+on.height,y2:0}));m.appendChild(S)}return t.appendChild(m),t.appendChild(yn("ellipse",{class:"cup-card__rim",cx:a,cy:l,rx:r,ry:h})),t}var pt,Gp,Bh,zh,Wp,tr,Xp,qp,Yp,kh,Hh,Vh,Ha=class{constructor(e,{backdrop:t,onSelect:n,onToggle:i}={}){an(this,pt);this.root=e,this.backdrop=t??null,this.onSelect=n??null,this.onToggle=i??null,this.search=e.querySelector(".cup-search"),this.filters=e.querySelector(".cup-filters"),this.list=e.querySelector(".cup-list"),this.empty=e.querySelector(".cup-empty"),this.closeButton=e.querySelector(".cup-dialog__close"),this.opener=null,this.cards=[],this.sections=[],this.filterButtons=[],this.activeId=null,this.group="",V(this,pt,Gp).call(this),V(this,pt,Wp).call(this)}get isOpen(){return this.root.hidden===!1}setActive(e){this.activeId=e??null;for(let{cup:t,card:n}of this.cards){let i=t.id===e;n.classList.toggle("is-active",i),n.setAttribute("aria-pressed",String(i))}}open(e=null){var n,i;if(this.isOpen)return;this.opener=e,this.root.hidden=!1,this.backdrop&&(this.backdrop.hidden=!1),this.search&&(this.search.value=""),V(this,pt,zh).call(this,"");let t=this.cards.find(({cup:r})=>r.id===this.activeId);window.matchMedia("(hover: hover) and (pointer: fine)").matches&&((n=this.search)==null||n.focus()),t==null||t.card.scrollIntoView({block:"nearest"}),(i=this.onToggle)==null||i.call(this,!0)}close(){var e,t;this.isOpen&&(this.root.hidden=!0,this.backdrop&&(this.backdrop.hidden=!0),(e=this.opener)==null||e.focus(),this.opener=null,(t=this.onToggle)==null||t.call(this,!1))}toggle(e=null){this.isOpen?this.close():this.open(e)}};pt=new WeakSet,Gp=function(){var n,i;let e=NS();this.list.replaceChildren(),(n=this.filters)==null||n.replaceChildren();let t=mp();if(this.filters){V(this,pt,Bh).call(this,"","\u0412\u0441\u0435",ls.length);for(let{group:r,cups:o}of t)V(this,pt,Bh).call(this,r,r,o.length)}for(let{group:r,cups:o}of t){let a=document.createElement("section");if(a.className="cup-group",r){let h=document.createElement("h3");h.className="cup-group__title",h.textContent=r,a.appendChild(h)}let c=document.createElement("div");c.className="cup-grid";let l=[];for(let h of o){let u=document.createElement("button");u.type="button",u.className="cup-card",u.dataset.id=h.id,u.setAttribute("aria-pressed","false"),u.tabIndex=-1;let d=document.createElement("span");d.className="cup-card__name",d.textContent=h.label??h.id;let p=document.createElement("span");p.className="cup-card__meta";let g=document.createElement("b");g.className="cup-card__volume",g.textContent=h.volume?`${h.volume} \u043C\u043B`:"",p.appendChild(g),(i=h.size)!=null&&i.height&&p.append(document.createTextNode(` \xB7 ${Math.round(h.size.height)} \u043C\u043C`)),u.append(OS(h,e),d,p),u.addEventListener("click",()=>V(this,pt,Hh).call(this,h.id)),c.appendChild(u),l.push(u),this.cards.push({cup:h,card:u,grid:c})}a.appendChild(c),this.list.appendChild(a),this.sections.push({section:a,group:r,cards:l})}},Bh=function(e,t,n){let i=document.createElement("button");i.type="button",i.className="cup-filter",i.dataset.group=e,i.setAttribute("aria-pressed",String(e===this.group)),i.classList.toggle("is-active",e===this.group);let r=document.createElement("span");r.textContent=t;let o=document.createElement("span");o.className="cup-filter__count",o.textContent=String(n),i.append(r,o),i.addEventListener("click",()=>V(this,pt,zh).call(this,e)),this.filters.appendChild(i),this.filterButtons.push(i)},zh=function(e){var t;this.group=e;for(let n of this.filterButtons){let i=n.dataset.group===e;n.classList.toggle("is-active",i),n.setAttribute("aria-pressed",String(i))}V(this,pt,Vh).call(this,((t=this.search)==null?void 0:t.value)??"")},Wp=function(){var e,t,n,i;(e=this.closeButton)==null||e.addEventListener("click",()=>this.close()),(t=this.backdrop)==null||t.addEventListener("click",()=>this.close()),(n=this.search)==null||n.addEventListener("input",()=>V(this,pt,Vh).call(this,this.search.value)),(i=this.search)==null||i.addEventListener("keydown",r=>{if(r.key==="Enter"){let o=V(this,pt,tr).call(this);o.length===1&&V(this,pt,Hh).call(this,o[0].cup.id);return}r.key==="ArrowDown"&&(r.preventDefault(),V(this,pt,kh).call(this,0))}),this.list.addEventListener("keydown",r=>V(this,pt,qp).call(this,r)),window.addEventListener("keydown",r=>{r.key==="Escape"&&this.isOpen&&this.close()}),this.root.addEventListener("keydown",r=>{if(r.key!=="Tab")return;let o=V(this,pt,Xp).call(this);if(o.length===0)return;let a=o[0],c=o[o.length-1],l=document.activeElement;r.shiftKey&&(l===a||!this.root.contains(l))?(r.preventDefault(),c.focus()):!r.shiftKey&&l===c&&(r.preventDefault(),a.focus())})},tr=function(){return this.cards.filter(({card:e})=>!e.hidden)},Xp=function(){let e=[this.search,...this.filterButtons,this.closeButton].filter(Boolean),t=V(this,pt,tr).call(this).find(({card:n})=>n.tabIndex===0);return t&&e.splice(1,0,t.card),e.filter(n=>!n.hidden)},qp=function(e){if(!["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Home","End"].includes(e.key))return;let n=V(this,pt,tr).call(this);if(n.length===0)return;let i=n.findIndex(({card:a})=>a===document.activeElement);if(i<0)return;e.preventDefault();let r=V(this,pt,Yp).call(this,n[i].grid),o={ArrowRight:i+1,ArrowLeft:i-1,ArrowDown:i+r,ArrowUp:i-r,Home:0,End:n.length-1}[e.key];V(this,pt,kh).call(this,Math.min(Math.max(o,0),n.length-1))},Yp=function(e){let t=getComputedStyle(e).gridTemplateColumns.split(" ").filter(Boolean);return Math.max(1,t.length)},kh=function(e){let n=V(this,pt,tr).call(this)[e];if(n){for(let{card:i}of this.cards)i.tabIndex=-1;n.card.tabIndex=0,n.card.focus(),n.card.scrollIntoView({block:"nearest"})}},Hh=function(e){var t;this.close(),(t=this.onSelect)==null||t.call(this,e)},Vh=function(e){var o;let t=Vp(e).trim(),n=0;for(let{cup:a,card:c}of this.cards){let l=((o=ih[a.wall])==null?void 0:o.label)??"",h=Vp(`${a.id} ${a.label} ${a.note} ${a.group} ${l} ${a.volume??""} \u043C\u043B`),u=(t===""||h.includes(t))&&(this.group===""||a.group===this.group);c.hidden=!u,u&&(n+=1)}for(let{section:a,cards:c}of this.sections)a.hidden=c.every(l=>l.hidden);this.empty&&(this.empty.hidden=n>0);let i=V(this,pt,tr).call(this);for(let{card:a}of this.cards)a.tabIndex=-1;let r=i.find(({cup:a})=>a.id===this.activeId)??i[0];r&&(r.card.tabIndex=0)};var FS=[".glb",".gltf"],BS={b:"onChangeBackground",a:"onToggleAutoRotate",s:"onScreenshot",f:"onToggleFullscreen"},zS={v:"toggleExportMenu"},kS=new Set(["INPUT","TEXTAREA","SELECT","OPTION"]);function HS(s){return!s||s.nodeType!==1?!1:kS.has(s.tagName)||s.isContentEditable===!0}var st,Zp,Kp,$p,jp,Jp,fn,Qp,em,tm,nm,Gh,Va=class{constructor(e){an(this,st);this.config=e,this.dom=V(this,st,Zp).call(this),this.handlers={},this.dragDepth=0}setActivePaper(e){for(let[t,n]of this.paperChips??[]){let i=t===e;n.classList.toggle("is-active",i),n.setAttribute("aria-pressed",String(i))}}setPaperAvailable(e){this.dom.paperPicker&&(this.dom.paperPicker.hidden=!e)}setActiveCup(e){var i;(i=this.cupPicker)==null||i.setActive(e);let t=this.dom.cupBtn;if(!t)return;let n=e?Hi(e):null;t.dataset.tip=n?`\u0421\u0442\u0430\u043A\u0430\u043D: ${n.label}`:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u0442\u0430\u043A\u0430\u043D"}bind(e){this.handlers=e;let{buttons:t,textureInput:n,rotateWrap:i,rotateSlider:r}=this.dom;V(this,st,Kp).call(this),V(this,st,$p).call(this),V(this,st,jp).call(this),t.background.addEventListener("click",()=>V(this,st,fn).call(this,"onChangeBackground")),t.autorotate.addEventListener("click",()=>V(this,st,fn).call(this,"onToggleAutoRotate")),t.screenshot.addEventListener("click",()=>V(this,st,fn).call(this,"onScreenshot")),t.fullscreen.addEventListener("click",()=>V(this,st,fn).call(this,"onToggleFullscreen")),t.texture.hidden=this.config.ui.uploadButton===!1,t.texture.addEventListener("click",()=>n.click()),n.addEventListener("change",o=>V(this,st,em).call(this,o)),V(this,st,Jp).call(this),i&&r&&(i.addEventListener("mouseenter",()=>V(this,st,fn).call(this,"onManualRotateStart")),i.addEventListener("mouseleave",()=>V(this,st,fn).call(this,"onManualRotateEnd")),r.addEventListener("input",()=>V(this,st,fn).call(this,"onManualRotate",Number(r.value)))),window.addEventListener("keydown",o=>V(this,st,Qp).call(this,o)),this.config.ui.dragAndDrop!==!1&&V(this,st,tm).call(this)}toggleExportMenu(e){let{exportBtn:t,exportPopover:n}=this.dom;if(!t||!n||t.disabled)return;let i=e??n.hidden;n.hidden=!i,t.classList.toggle("is-active",i),t.setAttribute("aria-expanded",String(i))}setExportBusy(e){let{exportBtn:t,exportStart:n}=this.dom;e&&this.toggleExportMenu(!1),t&&(t.disabled=e),n&&(n.disabled=e)}showLoader(e="\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026"){this.dom.loaderText.textContent=e,this.dom.loader.hidden=!1}updateProgress(e,t="\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026"){this.dom.loaderText.textContent=e>=0?`${t} ${Math.round(e)}%`:t}hideLoader(){this.dom.loader.hidden=!0}showToast(e,t="success"){var r;(r=document.querySelector(".toast"))==null||r.remove();let n=document.createElement("div");n.className=t==="error"?"toast toast--error":"toast",n.setAttribute("role","status"),n.textContent=e,document.body.appendChild(n);let i=this.config.ui.toastDuration;setTimeout(()=>n.classList.add("is-leaving"),Math.max(i-300,0)),setTimeout(()=>n.remove(),i)}setToggleState(e,t){let n=this.dom.buttons[e];n.classList.toggle("is-active",t),n.setAttribute("aria-pressed",String(t))}setActiveBackground(e){var t;(t=this.swatches)==null||t.forEach((n,i)=>{n.classList.toggle("is-active",i===e)})}setRotationSlider(e){this.dom.rotateSlider&&(this.dom.rotateSlider.value=String(Math.round(e)))}};st=new WeakSet,Zp=function(){let e=t=>{let n=document.getElementById(t);if(!n)throw new Error(`UIManager: \u043D\u0435\u0442 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 #${t}`);return n};return{loader:e("loader"),loaderText:e("loader-text"),dropOverlay:e("drop-overlay"),textureInput:e("texture-input"),bgSwatches:e("bg-swatches"),paperPicker:document.getElementById("paper-picker"),cupBtn:document.getElementById("cup-btn"),cupDialog:document.getElementById("cup-dialog"),cupBackdrop:document.getElementById("cup-backdrop"),rotateWrap:document.getElementById("rotate-wrap"),rotateSlider:document.getElementById("rotate-slider"),exportBtn:document.getElementById("export-btn"),exportPopover:document.getElementById("export-popover"),exportPhotos:document.getElementById("export-photos"),exportStart:document.getElementById("export-start"),buttons:{background:e("bg-btn"),autorotate:e("autorotate-btn"),screenshot:e("screenshot-btn"),fullscreen:e("fullscreen-btn"),texture:e("texture-btn")}}},Kp=function(){this.dom.bgSwatches.replaceChildren(),this.swatches=this.config.backgrounds.map((e,t)=>{let n=document.createElement("button");return n.type="button",n.className="swatch",n.style.background=e,n.setAttribute("role","menuitem"),n.setAttribute("aria-label",`\u0424\u043E\u043D ${e}`),n.addEventListener("click",()=>V(this,st,fn).call(this,"onSelectBackground",t)),this.dom.bgSwatches.appendChild(n),n})},$p=function(){let e=this.dom.paperPicker;if(e){e.replaceChildren(),this.paperChips=new Map;for(let[t,n]of Object.entries(_i)){let i=document.createElement("button");i.type="button",i.className="paper-chip",i.dataset.paper=t,i.setAttribute("aria-pressed","false"),i.title=n.note?`${n.label}: ${n.note.toLowerCase()}`:n.label;let r=document.createElement("span");r.className="paper-chip__dot",r.dataset.paper=t,r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="paper-chip__full",o.textContent=n.label;let a=document.createElement("span");a.className="paper-chip__short",a.textContent=n.short??n.label,i.append(r,o,a),i.addEventListener("click",()=>V(this,st,fn).call(this,"onSelectPaper",t)),e.appendChild(i),this.paperChips.set(t,i)}}},jp=function(){let{cupBtn:e,cupDialog:t,cupBackdrop:n}=this.dom;if(e){if(this.config.ui.modelPicker===!1||!t){e.hidden=!0;return}this.cupPicker=new Ha(t,{backdrop:n,onSelect:i=>V(this,st,fn).call(this,"onSelectCup",i),onToggle:i=>{e.classList.toggle("is-active",i),e.setAttribute("aria-expanded",String(i))}}),e.addEventListener("click",()=>this.cupPicker.toggle(e))}},Jp=function(){let{exportBtn:e,exportPopover:t,exportPhotos:n,exportStart:i}=this.dom;!e||!t||(e.addEventListener("click",()=>this.toggleExportMenu()),i==null||i.addEventListener("click",()=>{this.toggleExportMenu(!1),V(this,st,fn).call(this,"onExportTurn",{photos:(n==null?void 0:n.checked)===!0})}),document.addEventListener("click",r=>{t.hidden||t.contains(r.target)||e.contains(r.target)||this.toggleExportMenu(!1)},!0),window.addEventListener("keydown",r=>{r.key==="Escape"&&!t.hidden&&this.toggleExportMenu(!1)}))},fn=function(e,...t){var n,i;(i=(n=this.handlers)[e])==null||i.call(n,...t)},Qp=function(e){if(e.metaKey||e.ctrlKey||e.altKey||HS(e.target)||e.isComposing||e.keyCode===229)return;let t=e.key.toLowerCase(),n=zS[t];if(n){this[n]();return}let i=BS[t];i&&V(this,st,fn).call(this,i)},em=function(e){var n;let t=(n=e.target.files)==null?void 0:n[0];t&&V(this,st,fn).call(this,"onImageFile",t),e.target.value=""},tm=function(){window.addEventListener("dragenter",e=>{e.preventDefault(),++this.dragDepth===1&&(this.dom.dropOverlay.hidden=!1)}),window.addEventListener("dragover",e=>e.preventDefault()),window.addEventListener("dragleave",e=>{e.preventDefault(),--this.dragDepth<=0&&V(this,st,Gh).call(this)}),window.addEventListener("drop",e=>V(this,st,nm).call(this,e))},nm=function(e){var i,r;e.preventDefault(),V(this,st,Gh).call(this);let t=(r=(i=e.dataTransfer)==null?void 0:i.files)==null?void 0:r[0];if(!t)return;let n=t.name.toLowerCase();FS.some(o=>n.endsWith(o))?V(this,st,fn).call(this,"onModelFile",t):t.type.startsWith("image/")?V(this,st,fn).call(this,"onImageFile",t):this.showToast("\u041D\u0435\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043C\u044B\u0439 \u0442\u0438\u043F \u0444\u0430\u0439\u043B\u0430","error")},Gh=function(){this.dragDepth=0,this.dom.dropOverlay.hidden=!0};var VS=.1;function im(s){return(s==null?void 0:s.environmentIntensity)??1}function Yr(s,e){let t=s/e;return Number.isFinite(t)&&t>0?t:1}var me,sm,rm,Zr,Kr,om,am,cm,lm,Ga,hm,um,dm,Wa,Wh,Xa,$r,fm,Xh,qh,pm,Yh,Zh,mm,Kh,gm,qa,vm,Ya,_m,xm,ym,jr,Za=class{constructor(e,t){an(this,me);this.container=e,this.config=t,this.backgroundIndex=0,this.frameId=null,this.autoRotate=t.autoRotate.enabled,this.manualRotate=!1,this.exporting=!1,this.photo=null,this.needsRender=!0,this.modelDirty=!0,V(this,me,sm).call(this),V(this,me,rm).call(this)}async startEnvironment(){V(this,me,am).call(this),V(this,me,cm).call(this),V(this,me,om).call(this),V(this,me,lm).call(this),V(this,me,Zr).call(this),await this.loadHDRI(),this.invalidateModel()}async applyTexture(e){try{let t=await this.textureManager.replaceTexture(e||hs());return this.invalidateModel(),t}catch(t){return console.warn(`\u0414\u0438\u0437\u0430\u0439\u043D \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D: ${t.message}`),0}}invalidate(){this.needsRender=!0}invalidateModel(){this.modelDirty=!0,this.needsRender=!0}resize(){var r;let{clientWidth:e,clientHeight:t}=this.container;if(e===0||t===0)return;let[n,i]=this.photo?V(this,me,fm).call(this,e,t):[e,t];this.camera.aspect=Yr(n,i),this.camera.updateProjectionMatrix(),(r=this.backdropScreen)==null||r.fit(this.camera),this.renderer.setSize(n,i),this.pipeline.setSize(n,i),this.photo&&V(this,me,Xh).call(this),this.invalidate()}async loadHDRI(){let e=this.config.lighting.environment==="hdri";e&&this.ui.showLoader("\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F\u2026");try{await this.loadEnvironmentMap()}catch(t){console.error(t),this.ui.showToast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u0435","error")}finally{e&&this.ui.hideLoader()}}async loadEnvironmentMap(){var n;let{envMap:e,sun:t}=this.config.lighting.environment==="hdri"?await Xf(this.scene,this.renderer,this.config,i=>this.ui.updateProgress(i,"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F\u2026")):Yl(this.scene,this.renderer,this.config,(n=this.backdrop)==null?void 0:n.base);return this.sun=t,Al(this.lightingRig,t,this.config),this.invalidateModel(),e}describeKeyLight(){if(!this.sun)return null;let{direction:e,color:t,irradiance:n,angularRadius:i}=this.sun,r=180/Math.PI,o=this.lightingRig.getObjectByName("KeyLight");return{elevation:+(Math.asin(e.y)*r).toFixed(1),azimuth:+(Math.atan2(e.z,e.x)*r).toFixed(1),color:`#${t.getHexString()}`,softboxIntensity:+n.toFixed(2),lightIntensity:+((o==null?void 0:o.intensity)??0).toFixed(2),angularRadius:+(i*r).toFixed(2)}}async loadModel(e,t=null){this.ui.showLoader("\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043C\u043E\u0434\u0435\u043B\u0438\u2026");try{await this.modelLoader.load(e,n=>this.ui.updateProgress(n),t),this.textureManager.dispose(),this.photo?(Hr(this.modelLoader.currentModel,im(this.photo.data)),V(this,me,Wa).call(this),V(this,me,Wh).call(this)):(Hr(this.modelLoader.currentModel,this.config.lighting.environmentIntensity),V(this,me,Ga).call(this),V(this,me,qa).call(this)),this.ui.setActiveCup((t==null?void 0:t.id)??null),this.ui.setPaperAvailable(this.cupTakesPaper()),this.invalidateModel()}catch(n){throw console.error(n),this.ui.showToast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u044C","error"),n}finally{this.ui.hideLoader()}}async enterPhotoScene(e=Ra){this.ui.showLoader("\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u0446\u0435\u043D\u044B\u2026");try{let t=await rp(e,this.renderer,n=>this.ui.updateProgress(n,"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u0446\u0435\u043D\u044B\u2026"));return V(this,me,hm).call(this,t),t}catch(t){return console.error(t),this.ui.showToast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0446\u0435\u043D\u0443","error"),null}finally{this.ui.hideLoader()}}async exitPhotoScene(){this.photo&&(this.photo=null,V(this,me,Xa).call(this),this.renderer.toneMapping=this.baseToneMapping,this.renderer.toneMappingExposure=this.config.renderer.toneMappingExposure,this.pipeline.setBackdrop(null),this.photoShadow=null,V(this,me,qh).call(this,!1),this.pipeline.setGrain(0),this.controls.enabled=!0,this.container.classList.remove("has-photo"),this.container.style.removeProperty("--photo-width"),this.container.style.removeProperty("--photo-height"),this.modelLoader.normalize(),V(this,me,$r).call(this,1),V(this,me,Ga).call(this),V(this,me,qa).call(this),this.camera.fov=this.config.camera.fov,this.resize(),V(this,me,dm).call(this),this.selectBackground(this.backgroundIndex),await this.loadEnvironmentMap(),Hr(this.modelLoader.currentModel,this.config.lighting.environmentIntensity),this.invalidateModel())}selectCup(e){return this.pendingCupId=e,this.cupSwitch||(this.cupSwitch=(async()=>{for(;this.pendingCupId;){let t=this.pendingCupId;this.pendingCupId=null,await V(this,me,mm).call(this,t)}})().finally(()=>{this.cupSwitch=null})),this.cupSwitch}async loadModelFromFile(e){let t=URL.createObjectURL(e),n=this.order;try{await this.loadModel(t),(n==null?void 0:n.roughness)!=null&&this.setSurfaceFinish({roughness:n.roughness,relief:n.relief,reliefScale:n.reliefScale}),await this.applyTexture(n==null?void 0:n.texture),this.ui.showToast(`\u041C\u043E\u0434\u0435\u043B\u044C \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430: ${e.name}`)}catch(i){console.error(i)}finally{setTimeout(()=>URL.revokeObjectURL(t),0)}}async replaceTextureFromFile(e){var t;try{let n=await this.textureManager.loadFromFile(e),i=this.textureManager.applyTexture(n);this.invalidateModel(),(t=this.unwrap)==null||t.setSourceFromFile(e),this.ui.showToast(i>0?`\u0414\u0438\u0437\u0430\u0439\u043D \u043F\u0440\u0438\u043C\u0435\u043D\u0451\u043D: ${e.name}`:"\u0412 \u043C\u043E\u0434\u0435\u043B\u0438 \u043D\u0435\u0442 \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u0438 \u0434\u043B\u044F \u0434\u0438\u0437\u0430\u0439\u043D\u0430",i>0?"success":"error")}catch(n){console.error(n),this.ui.showToast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u0438\u0437\u0430\u0439\u043D","error")}}setOrder(e){var t;this.order=e,this.paperKey=((t=e==null?void 0:e.paper)==null?void 0:t.key)??this.paperKey??xi,this.ui.setActivePaper(this.paperKey)}selectPaper(e){_i[e]&&(this.paperKey=e,this.ui.setActivePaper(e),V(this,me,Kh).call(this))}cupTakesPaper(){var t;return(((t=this.modelLoader.cup)==null?void 0:t.finish)??"paper")==="paper"}attachUnwrap(e){this.unwrap=e}setSurfaceFinish(e){let t=this.modelLoader.applySurfaceFinish({...Ia(),...e});return t>0&&this.invalidate(),t}cycleBackground(){let{backgrounds:e}=this.config;this.selectBackground((this.backgroundIndex+1)%e.length)}selectBackground(e){var i;this.backgroundIndex=e;let t=this.config.backgrounds[e];this.backdrop=ep(t,this.config.backgroundSweep),this.backdropScreen.setColors(this.backdrop),this.backdropScreen.mesh.visible=!this.photo,this.scene.background=new Ie(this.backdrop.base);let n=this.container.closest(".stage")??this.container;n.style.background=tp(this.backdrop),(i=this.turntable)==null||i.setBackground(new Ie(t)),this.ui.setActiveBackground(e),V(this,me,gm).call(this),this.invalidateModel()}toggleAutoRotate(){this.autoRotate=!this.autoRotate,this.ui.setToggleState("autorotate",this.autoRotate),this.invalidate()}setManualRotate(e){this.manualRotate=e,e&&V(this,me,vm).call(this)}rotateModelTo(e){let t=this.modelLoader.currentModel;t&&(t.rotation.y=Kt.degToRad(e),this.invalidateModel())}getModelRotation(){let e=this.modelLoader.currentModel;return e?(Kt.radToDeg(e.rotation.y)%360+360)%360:0}resetView(){this.photo?V(this,me,Wa).call(this):this.modelLoader.frameCurrentModel(),this.invalidate()}async takeScreenshot(){var i,r,o;if(this.exporting||this.screenshotting)return;this.screenshotting=!0,(i=this.turntable)==null||i.setHiddenForCapture(!0);let e=this.config.ui.screenshotName,t;try{(r=this.ambientShadow)==null||r.update(this.renderer,this.scene),this.pipeline.render(),t=await V(this,me,xm).call(this)}finally{(o=this.turntable)==null||o.setHiddenForCapture(!1),this.screenshotting=!1,this.invalidate()}if(!t){this.ui.showToast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u043D\u0438\u043C\u043E\u043A","error");return}let n=await V(this,me,Ya).call(this,t,e,"image/png");n!=="shared"&&this.ui.showToast(n==="opened"?"\u0421\u043D\u0438\u043C\u043E\u043A \u043E\u0442\u043A\u0440\u044B\u0442 \u0432 \u043D\u043E\u0432\u043E\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u0435":"\u0421\u043D\u0438\u043C\u043E\u043A \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D")}async exportTurn({photos:e=!1}={}){var r,o;if(this.exporting||this.screenshotting)return;let t=this.modelLoader.currentModel;if(!t){this.ui.showToast("\u041C\u043E\u0434\u0435\u043B\u044C \u0435\u0449\u0451 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430","error");return}if(!jl()&&!e){this.ui.showToast("\u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u0443\u043C\u0435\u0435\u0442 \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0442\u044C \u0432\u0438\u0434\u0435\u043E","error");return}let n=this.config.turnExport,i=this.getModelRotation();this.exporting=!0,this.ui.setExportBusy(!0),this.ui.showLoader("\u0412\u044B\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0431\u043E\u0440\u043E\u0442\u0430"),V(this,me,Kr).call(this),(r=this.turntable)==null||r.setHiddenForCapture(!0);try{let a=await sp({source:this.renderer.domElement,backdrop:this.backdrop,settings:n,startAngle:i,setAngle:c=>{t.rotation.y=Kt.degToRad(c),t.updateMatrixWorld(!0)},renderFrame:()=>{var c;(c=this.ambientShadow)==null||c.update(this.renderer,this.scene),this.pipeline.render()},photos:e,onProgress:(c,l)=>this.ui.updateProgress(c*100,l)});await V(this,me,ym).call(this,a,n)}catch(a){console.error(a),this.ui.showToast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043E\u0431\u043E\u0440\u043E\u0442","error")}finally{t.rotation.y=Kt.degToRad(i),(o=this.turntable)==null||o.setHiddenForCapture(!1),this.exporting=!1,this.ui.setExportBusy(!1),this.ui.hideLoader(),this.invalidateModel(),V(this,me,Zr).call(this)}}toggleFullscreen(){var n,i,r,o;let e=this.container.closest(".stage")??this.container;if(e.classList.contains("is-fullscreen")){((n=document.exitFullscreen)==null?void 0:n.call(document))??((i=document.webkitExitFullscreen)==null||i.call(document)),V(this,me,jr).call(this,e,!1);return}V(this,me,jr).call(this,e,!0);let t=((r=e.requestFullscreen)==null?void 0:r.bind(e))??((o=e.webkitRequestFullscreen)==null?void 0:o.bind(e));t&&Promise.resolve(t()).catch(()=>{})}dispose(){var e,t,n,i,r;V(this,me,Kr).call(this),(e=this.resizeObserver)==null||e.disconnect(),this.onVisibilityChange&&document.removeEventListener("visibilitychange",this.onVisibilityChange),this.onFullscreenChange&&(document.removeEventListener("fullscreenchange",this.onFullscreenChange),document.removeEventListener("webkitfullscreenchange",this.onFullscreenChange)),this.onEscape&&window.removeEventListener("keydown",this.onEscape),this.modelLoader.destroy(),this.textureManager.dispose(),(t=this.backdropScreen)==null||t.dispose(),(n=this.ambientShadow)==null||n.dispose(),(i=this.turntable)==null||i.dispose(),(r=this.scene.environment)==null||r.dispose(),this.controls.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}};me=new WeakSet,sm=function(){var n,i;let{clientWidth:e,clientHeight:t}=this.container;this.scene=vf(),this.camera=_f(this.config,Yr(e,t)),this.renderer=xf(this.config),this.renderer.setSize(e,t),this.container.appendChild(this.renderer.domElement),this.baseToneMapping=this.renderer.toneMapping,this.lightingRig=yf(this.scene,this.config),this.controls=wf(this.camera,this.renderer.domElement,this.config),this.controls.addEventListener("change",()=>this.invalidate()),(n=this.config.shadowCatcher)!=null&&n.enabled&&(this.shadowCatcher=bf(this.config),this.scene.add(this.shadowCatcher.plane)),(i=this.config.ambientShadow)!=null&&i.enabled&&(this.ambientShadow=Cf(this.config),this.scene.add(this.ambientShadow.group)),this.backdropScreen=ip(),this.backdropScreen.fit(this.camera),this.camera.add(this.backdropScreen.mesh),this.scene.add(this.camera),this.camera.layers.enable(1),this.config.turntable.enabled&&(this.turntable=Of({scene:this.scene,camera:this.camera,controls:this.controls,domElement:this.renderer.domElement,config:this.config,onRotate:r=>this.rotateModelTo(r),onDragStart:()=>this.setManualRotate(!0),onDragEnd:()=>this.setManualRotate(!1)}))},rm=function(){let e=this.renderer.capabilities.getMaxAnisotropy(),t=this.renderer.capabilities.maxTextureSize;this.modelLoader=new Ba({scene:this.scene,camera:this.camera,controls:this.controls,config:this.config,maxAnisotropy:e}),this.textureManager=new ka({modelLoader:this.modelLoader,config:this.config,maxAnisotropy:e,maxTextureSize:t}),this.pipeline=new ba({renderer:this.renderer,scene:this.scene,camera:this.camera,config:this.config}),V(this,me,Xa).call(this),this.ui=new Va(this.config),this.ui.bind({onChangeBackground:()=>this.cycleBackground(),onSelectBackground:n=>this.selectBackground(n),onToggleAutoRotate:()=>this.toggleAutoRotate(),onManualRotateStart:()=>this.setManualRotate(!0),onManualRotateEnd:()=>this.setManualRotate(!1),onManualRotate:n=>this.rotateModelTo(n),onScreenshot:()=>this.takeScreenshot(),onExportTurn:n=>this.exportTurn(n),onToggleFullscreen:()=>this.toggleFullscreen(),onImageFile:n=>this.replaceTextureFromFile(n),onModelFile:n=>this.loadModelFromFile(n),onSelectCup:n=>this.selectCup(n),onSelectPaper:n=>this.selectPaper(n)}),this.selectBackground(this.backgroundIndex)},Zr=function(){if(this.frameId||document.hidden||this.exporting)return;let e=new Zs,t=()=>{var o,a;this.frameId=requestAnimationFrame(t);let n=Math.min(e.getDelta(),VS);this.autoRotate&&!this.manualRotate&&this.modelLoader.currentModel&&(this.modelLoader.currentModel.rotation.y+=this.config.autoRotate.speed*n,this.invalidateModel());let i=this.controls.update(n),r=(o=this.turntable)==null?void 0:o.update(this.getModelRotation(),n);(i||r)&&this.invalidate(),this.needsRender&&(this.modelDirty&&((a=this.ambientShadow)==null||a.update(this.renderer,this.scene),this.modelDirty=!1),this.pipeline.render(),this.needsRender=!1)};t()},Kr=function(){this.frameId&&(cancelAnimationFrame(this.frameId),this.frameId=null)},om=function(){this.onVisibilityChange=()=>{document.hidden?V(this,me,Kr).call(this):(this.invalidateModel(),V(this,me,Zr).call(this))},document.addEventListener("visibilitychange",this.onVisibilityChange)},am=function(){this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container)},cm=function(){let e=()=>this.container.closest(".stage")??this.container;this.onFullscreenChange=()=>{document.fullscreenElement||document.webkitFullscreenElement?requestAnimationFrame(()=>this.resize()):V(this,me,jr).call(this,e(),!1)},document.addEventListener("fullscreenchange",this.onFullscreenChange),document.addEventListener("webkitfullscreenchange",this.onFullscreenChange),this.onEscape=t=>{if(t.key!=="Escape"||document.fullscreenElement||document.webkitFullscreenElement)return;let n=e();n.classList.contains("is-fullscreen")&&V(this,me,jr).call(this,n,!1)},window.addEventListener("keydown",this.onEscape)},lm=function(){let e=this.renderer.domElement;e.addEventListener("webglcontextlost",t=>{t.preventDefault(),V(this,me,Kr).call(this),this.ui.showToast("\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 WebGL \u043F\u043E\u0442\u0435\u0440\u044F\u043D \u2014 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435\u2026","error")}),e.addEventListener("webglcontextrestored",()=>{this.invalidateModel(),V(this,me,Zr).call(this),this.ui.showToast("\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 WebGL \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D")})},Ga=function(){var t;if(!this.modelLoader.currentModel)return;let e=new sn().setFromObject(this.modelLoader.currentModel);(t=this.shadowCatcher)==null||t.setHeight(e.min.y),this.ambientShadow&&(this.ambientShadow.group.position.y=e.min.y)},hm=function(e){var n,i,r;let{data:t}=e;this.photo||V(this,me,um).call(this),this.photo=e,V(this,me,Xa).call(this),this.renderer.toneMapping=((n=t.view)==null?void 0:n.transform)==="Standard"?Ur:os,this.renderer.toneMappingExposure=2**(((i=t.view)==null?void 0:i.exposure)??0),this.scene.environment=e.envMap,Hr(this.modelLoader.currentModel,im(t)),this.sun=e.sun,Al(this.lightingRig,e.sun,{...this.config,lighting:{...this.config.lighting,keyLight:{...this.config.lighting.keyLight,intensityScale:((r=t.shadow)==null?void 0:r.keyScale)??.5}}}),this.scene.background=null,this.backdropScreen.mesh.visible=!1,V(this,me,Wa).call(this),this.pipeline.setGrain(t.grain??.03),V(this,me,Wh).call(this),this.resize(),V(this,me,pm).call(this),this.invalidateModel()},um=function(){this.studioView={model:this.modelLoader.currentModel,position:this.camera.position.clone(),target:this.controls.target.clone(),fov:this.camera.fov,near:this.camera.near,far:this.camera.far}},dm=function(){let e=this.studioView;if(this.studioView=null,!e||e.model!==this.modelLoader.currentModel){this.modelLoader.frameCurrentModel();return}this.camera.fov=e.fov,this.camera.near=e.near,this.camera.far=e.far,this.camera.position.copy(e.position),this.controls.target.copy(e.target),this.camera.updateProjectionMatrix(),this.controls.update()},Wa=function(){let{data:e}=this.photo??{};e&&(this.controls.enabled=!1,this.camera.position.set(...e.camera.position),this.controls.target.set(...e.camera.target),this.camera.lookAt(this.controls.target))},Wh=function(){var r,o;let{data:e}=this.photo??{};if(!e)return;let t=this.modelLoader.cup,n=lp(e,t),i=((r=e.cup)==null?void 0:r.origin)??[0,((o=e.floor)==null?void 0:o.y)??0,0];if(n){let a=this.modelLoader.setNaturalHeight(n,i),{x:c,y:l,z:h}=this.modelLoader.sourceSize;V(this,me,$r).call(this,Math.max(c,l,h)*a/this.config.model.targetSize)}else this.modelLoader.normalize(),V(this,me,$r).call(this,1);V(this,me,Ga).call(this),V(this,me,qa).call(this)},Xa=function(){var i,r,o,a;let e=this.photo?null:this.config.studioShading;(i=this.shadowCatcher)==null||i.setOpacity((e==null?void 0:e.shadowOpacity)??this.config.shadowCatcher.opacity),(r=this.shadowCatcher)==null||r.setPenumbra(e==null?void 0:e.shadowPenumbra);let t=e==null?void 0:e.shadowFalloff;(o=this.shadowCatcher)==null||o.setFalloff((t==null?void 0:t.start)??this.config.shadowCatcher.falloffStart,(t==null?void 0:t.end)??this.config.shadowCatcher.falloffEnd),(a=this.ambientShadow)==null||a.setAppearance((e==null?void 0:e.contact)??{});let n=this.lightingRig.getObjectByName("KeyLight");n&&(n.shadow.radius=(e==null?void 0:e.shadowRadius)??this.config.lighting.shadow.radius,n.shadow.normalBias=(e==null?void 0:e.shadowNormalBias)??this.config.lighting.shadow.normalBias),V(this,me,$r).call(this,1)},$r=function(e){var n,i;let t={...(n=this.config.quality)==null?void 0:n.ambientOcclusion,...this.photo?null:(i=this.config.studioShading)==null?void 0:i.ambientOcclusion};this.pipeline.setAmbientOcclusion({...t,radius:(t.radius??.06)*e,thickness:(t.thickness??.3)*e})},fm=function(e,t){let n=La(this.photo.data,th(Yr(e,t)));return e/t>=n?[Math.max(1,Math.round(t*n)),t]:[e,Math.max(1,Math.round(e/n))]},Xh=function(){var h;let{data:e,backdrops:t}=this.photo??{};if(!e)return;let{clientWidth:n,clientHeight:i}=this.container,r=th(Yr(n,i)),o=this.renderer.getSize(new Re),a=Yr(o.x,o.y),c=t[r]??t.wide;this.container.classList.add("has-photo"),this.container.style.setProperty("--photo-width",`${o.x}px`),this.container.style.setProperty("--photo-height",`${o.y}px`),this.camera.fov=ap(e,r,a),this.camera.aspect=a,this.camera.updateProjectionMatrix();let l=((h=this.photoShadow)==null?void 0:h[r])??null;V(this,me,qh).call(this,!!l),this.pipeline.setBackdrop({texture:c,frameSize:cp(a,La(e,r)),shadow:l,shadowOpacity:e.shadowOpacity??1}),this.invalidate()},qh=function(e){this.shadowCatcher&&(this.shadowCatcher.plane.visible=!e),this.ambientShadow&&(this.ambientShadow.group.visible=!e)},pm=async function(){V(this,me,Zh).call(this,await V(this,me,Yh).call(this,this.modelLoader.cup))},Yh=async function(e){let{id:t,data:n}=this.photo??{};if(!n)return null;let i=op(e),[r,o]=await Promise.all([eh(t,n,i,"wide"),eh(t,n,i,"tall")]);return r||o?{wide:r,tall:o}:null},Zh=function(e){this.photo&&(this.photoShadow=e,V(this,me,Xh).call(this),this.invalidateModel())},mm=async function(e){var r,o;let t=Hi(e);if(!t)return;let n=this.photo?V(this,me,Yh).call(this,t):null;try{await this.loadModel(t.file,t)}catch{this.ui.setActiveCup(((r=this.modelLoader.cup)==null?void 0:r.id)??null);return}n&&V(this,me,Zh).call(this,await n),V(this,me,Kh).call(this);let i=hs();await this.applyTexture(i),(o=this.unwrap)==null||o.setSource(i)},Kh=function(){let e=this.cupTakesPaper();return this.ui.setPaperAvailable(e),e?this.setSurfaceFinish(nh(this.paperKey??xi)):0},gm=function(){var t;if(this.config.lighting.environment!=="studio"||!this.sun)return;let e=this.scene.environment;Yl(this.scene,this.renderer,this.config,(t=this.backdrop)==null?void 0:t.base),e==null||e.dispose()},qa=function(){if(!this.turntable)return;let e=this.modelLoader.currentModel;if(!e){this.turntable.setMetrics(null);return}let t=e.rotation.y;e.rotation.y=0,e.updateMatrixWorld(!0);let n=new sn().setFromObject(e);if(e.rotation.y=t,e.updateMatrixWorld(!0),n.isEmpty()){this.turntable.setMetrics(null);return}let i=n.getSize(new B),r=n.getCenter(new B),o=Math.max(i.x,i.z)/2*this.config.turntable.radiusScale;this.turntable.setMetrics({center:r,baseY:n.min.y,radius:o})},vm=function(){this.modelLoader.currentModel&&this.ui.setRotationSlider(this.getModelRotation())},Ya=async function(e,t,n){var a;if(V(this,me,_m).call(this)){let c=new File([e],t,{type:n??e.type});if((a=navigator.canShare)!=null&&a.call(navigator,{files:[c]}))try{return await navigator.share({files:[c],title:t}),"shared"}catch(l){if((l==null?void 0:l.name)==="AbortError")return"shared"}}let i=URL.createObjectURL(e),r=document.createElement("a"),o="download"in r;return r.href=i,r.download=t,r.rel="noopener",o||(r.target="_blank"),document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(i),6e4),o?"downloaded":"opened"},_m=function(){let e=this.config.ui.screenshotShare??"auto";if(e==="always")return!0;if(e==="never")return!1;let t=navigator.userAgent;return/iP(hone|ad|od)/.test(t)||/Macintosh/.test(t)&&navigator.maxTouchPoints>1},xm=function(){return new Promise(e=>{try{let t=this.renderer.domElement,n=document.createElement("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");Ta(i,n.width,n.height,this.backdrop),i.drawImage(t,0,0),n.toBlob(r=>e(r),"image/png")}catch(t){console.error(t),e(null)}})},ym=async function({video:e,videoExt:t,photos:n},i){let r=i.name;if(!e&&n.length===0){this.ui.showToast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043E\u0431\u043E\u0440\u043E\u0442","error");return}if(e&&n.length===0){let c=await V(this,me,Ya).call(this,e,`${r}.${t}`,e.type);if(c==="shared")return;this.ui.showToast(c==="opened"?"\u0420\u043E\u043B\u0438\u043A \u043E\u0442\u043A\u0440\u044B\u0442 \u0432 \u043D\u043E\u0432\u043E\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u0435":"\u0420\u043E\u043B\u0438\u043A \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D");return}let o=[...n];e&&o.unshift({name:`${r}.${t}`,data:new Uint8Array(await e.arrayBuffer())});let a=await V(this,me,Ya).call(this,_p(o),`${r}.zip`,"application/zip");if(a!=="shared"){if(a==="opened"){this.ui.showToast("\u0410\u0440\u0445\u0438\u0432 \u043E\u0442\u043A\u0440\u044B\u0442 \u0432 \u043D\u043E\u0432\u043E\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u0435");return}this.ui.showToast(e?`\u0410\u0440\u0445\u0438\u0432 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D: \u0440\u043E\u043B\u0438\u043A \u0438 ${n.length} \u0444\u043E\u0442\u043E`:`\u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043B \u0432\u0438\u0434\u0435\u043E \u2014 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B \u0442\u043E\u043B\u044C\u043A\u043E \u0444\u043E\u0442\u043E (${n.length})`,e?"success":"error")}},jr=function(e,t){e.classList.toggle("is-fullscreen",t),document.body.classList.toggle("has-fullscreen-stage",t),this.ui.setToggleState("fullscreen",t),requestAnimationFrame(()=>this.resize())};var Wi={sku:64,paper:64,status:160,title:200,lead:1e3,note:1e3,url:2048,specRows:24,specText:160,checklistItems:24,checklistText:400},GS=["sku","paper","status","title","lead","note"],WS=new Set(["lead","note"]),XS=["model","texture","unwrap"],qS=/[\u0000-\u001F\u007F]/g,YS=/[\u0000-\u001F\u007F]/,ZS=/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;function $h(s,e){if(typeof s!="string")return null;let t=s.replace(qS," ").trim();return t?t.slice(0,e):null}function Sm(s,e){if(typeof s!="string")return null;let t=s.replace(ZS," ").trim();return t?t.slice(0,e):null}function KS(s,e=[]){if(typeof s!="string")return!1;let t=s.trim();if(!t||t.length>Wi.url||YS.test(t)||t.startsWith("//")||t.includes("..")||/%2e%2e/i.test(t))return!1;if(/^[a-z][a-z0-9+.-]*:/i.test(t)){let n;try{n=new URL(t,window.location.href)}catch{return!1}return n.protocol!=="http:"&&n.protocol!=="https:"||n.origin!==window.location.origin?!1:Mm(n.pathname,e)}return Mm(t,e)}function Mm(s,e){return!e||e.length===0?!0:e.some(t=>s.startsWith(t))}var $S=["roughness","relief"];function jS(s){if(s==null||s==="")return null;let e=Number(s);return Number.isFinite(e)?Math.min(Math.max(e,0),1):null}function JS(s){if(!Array.isArray(s))return null;let e=s.slice(0,Wi.specRows).map(t=>{if(!t||typeof t!="object")return null;let n=$h(t.label,Wi.specText),i=$h(t.value,Wi.specText);return n||i?{label:n??"",value:i??""}:null}).filter(Boolean);return e.length>0?e:null}function QS(s){if(!Array.isArray(s))return null;let e=s.slice(0,Wi.checklistItems).map(t=>Sm(t,Wi.checklistText)).filter(Boolean);return e.length>0?e:null}function Jr(s,{allowedAssetPrefixes:e=[]}={}){if(!s||typeof s!="object"||Array.isArray(s))return null;let t={};for(let r of GS){let o=WS.has(r)?Sm(s[r],Wi[r]):$h(s[r],Wi[r]);o!==null&&(t[r]=o)}for(let r of XS){let o=typeof s[r]=="string"?s[r].trim():null;o&&(KS(o,e)?t[r]=o:console.warn(`\u0417\u0430\u043A\u0430\u0437: \u043F\u043E\u043B\u0435 "${r}" \u043E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u043E \u2014 \u043D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u043F\u0443\u0442\u044C \u043A \u0444\u0430\u0439\u043B\u0443.`))}for(let r of $S){let o=jS(s[r]);o!==null&&(t[r]=o)}let n=JS(s.spec);n&&(t.spec=n);let i=QS(s.checklist);return i&&(t.checklist=i),t}var Em=Object.freeze({sku:"DW80-280",model:null,texture:null,unwrap:null,paper:xi,roughness:null,status:"\u041E\u0436\u0438\u0434\u0430\u0435\u0442 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u044F",title:"\u041E\u0446\u0435\u043D\u0438\u0442\u0435 \u0431\u0443\u0434\u0443\u0449\u0438\u0439 \u0441\u0442\u0430\u043A\u0430\u043D",lead:"\u042D\u0442\u043E \u0444\u0438\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u0438\u0434 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u0442\u0430\u043A\u0430\u043D\u0430. \u041E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0435\u0433\u043E \u0441\u043E \u0432\u0441\u0435\u0445 \u0441\u0442\u043E\u0440\u043E\u043D \u0438 \u0441\u043E\u0433\u043B\u0430\u0441\u0443\u0439\u0442\u0435, \u0435\u0441\u043B\u0438 \u0432\u0441\u0451 \u0432 \u043F\u043E\u0440\u044F\u0434\u043A\u0435.",spec:[{label:"\u0422\u0438\u043F",value:"\u0414\u0432\u0443\u0445\u0441\u043B\u043E\u0439\u043D\u044B\u0439"},{label:"\u041E\u0431\u044A\u0451\u043C",value:"250 \u043C\u043B (\u0434\u043E 280 \u043C\u043B)"},{label:"\u041F\u0435\u0447\u0430\u0442\u044C",value:"\u041E\u0444\u0441\u0435\u0442"}],checklist:["\u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432 \u043C\u0435\u043D\u044F \u0443\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442","\u0426\u0432\u0435\u0442\u043E\u0432\u043E\u0435 \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F\u043C","\u0422\u0435\u043A\u0441\u0442, \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u044B \u0432\u0435\u0440\u043D\u043E"],note:"\u0421\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0444\u0438\u043A\u0441\u0438\u0440\u0443\u0435\u0442 \u043C\u0430\u043A\u0435\u0442: \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u0432 \u043F\u0435\u0447\u0430\u0442\u044C \u043F\u0440\u0430\u0432\u043A\u0438 \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B."}),eE=["sku","model","texture","unwrap","paper","roughness","title","status"];function tE(s){var n;let e=((n=s.security)==null?void 0:n.urlOverrides)??"never";if(e==="always")return!0;if(e==="never")return!1;let{hostname:t}=window.location;return t==="localhost"||t==="127.0.0.1"||t==="[::1]"}function wm(s){var n;if(!tE(s))return{};let e=new URLSearchParams(window.location.search),t={};for(let i of eE){let r=e.get(i);r!==null&&r!==""&&(t[i]=r)}return Jr(t,{allowedAssetPrefixes:(n=s.security)==null?void 0:n.allowedAssetPrefixes})??{}}async function nE(s){var n;let e=(n=s.order)==null?void 0:n.endpoint,t=new URLSearchParams(window.location.search).get("order");if(!e||!t)return null;try{let i=await fetch(e.replace("{id}",encodeURIComponent(t)),{headers:{Accept:"application/json"},credentials:"same-origin",cache:"no-store"});if(!i.ok)throw new Error(`HTTP ${i.status}`);let r=i.headers.get("content-type")??"";if(!r.includes("json"))throw new Error(`\u043D\u0435\u043E\u0436\u0438\u0434\u0430\u043D\u043D\u044B\u0439 Content-Type: ${r||"\u043D\u0435\u0442"}`);return await i.json()}catch(i){return console.warn("\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D, \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u043D\u0430 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F\u0445 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E:",i.message),null}}function Ka(s){let e=hp(s.paper),t=s.model?{cup:fp(s.model),matchedBy:"explicit"}:null,{cup:n,matchedBy:i}=t??pp(s.sku),r=s.model??(n==null?void 0:n.file)??null,o=(h,u)=>{if(h==null||h==="")return u;let d=Number(h);return Number.isFinite(d)?Math.min(Math.max(d,0),1):u},a=o(s.roughness,e.roughness),c=o(s.relief,e.relief),l=e.reliefScale;return{...s,model:r,cup:n,modelMatchedBy:i,paper:e,roughness:a,relief:c,reliefScale:l,input:s}}function bm(s){var t;let e={allowedAssetPrefixes:(t=s.security)==null?void 0:t.allowedAssetPrefixes};return Ka({...Em,...Jr(window.ORDER_DATA,e)??{},...wm(s)})}async function Tm(s){var i;let e={allowedAssetPrefixes:(i=s.security)==null?void 0:i.allowedAssetPrefixes},t=Jr(window.ORDER_DATA,e),n=t?null:Jr(await nE(s),e);return Ka({...Em,...n??{},...t??{},...wm(s)})}function $a(s,e){if(e==null||e==="")return;let t=document.querySelector(s);t&&(t.textContent=e)}function iE(s){let e=document.querySelector(".spec");!e||!Array.isArray(s)||e.replaceChildren(...s.filter(t=>t&&(t.label||t.value)).map(({label:t,value:n})=>{let i=document.createElement("div");i.className="spec__row";let r=document.createElement("dt");r.textContent=t??"";let o=document.createElement("dd");return o.textContent=n??"",i.append(r,o),i}))}function sE(s){let e=document.getElementById("checklist");if(!(!e||!Array.isArray(s))){e.querySelectorAll(".check").forEach(t=>t.remove());for(let t of s.filter(Boolean)){let n=document.createElement("label");n.className="check";let i=document.createElement("input");i.type="checkbox",i.checked=!0;let r=document.createElement("span");r.className="check__box",r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="check__text",o.textContent=t,n.append(i,r,o),e.appendChild(n)}}}function jh(s){$a(".status-chip__text",s.status),$a(".approve-panel__title",s.title),$a(".approve-panel__lead",s.lead),$a(".approve-panel__note",s.note),iE(s.spec),sE(s.checklist)}var Jh=new Set,Qh=new Set,Fn={viewer:null,order:null,unwrap:null};function nr(){return Fn.viewer}function Qr(){return Fn.order}function Am(s){if(Fn.viewer){s(Fn.viewer);return}Jh.add(s)}function Rm(s){Fn.viewer=s,Fn.unwrap&&s.attachUnwrap(Fn.unwrap);for(let e of Jh)e(s);Jh.clear()}function Cm(s){return Qh.add(s),Fn.order&&s(Fn.order),()=>Qh.delete(s)}function Pm(s){Fn.order=s;for(let e of Qh)e(s)}function Lm(s){var e;Fn.unwrap=s,(e=Fn.viewer)==null||e.attachUnwrap(s)}var et,Im,Dm,Um,Nm,Om,eu,tu,nu,ja,Fm,Bm,Ja,ir,iu,Qa=class{constructor(e){an(this,et);var t,n;this.root=e,this.canvas=e.querySelector(".unwrap__canvas"),this.ctx=((t=this.canvas)==null?void 0:t.getContext("2d"))??null,this.hint=e.querySelector(".unwrap__hint"),this.hintText=((n=this.hint)==null?void 0:n.textContent)??"",this.image=null,this.zoom=1,this.x=0,this.y=0,this.width=0,this.height=0,this.dpr=0,this.fitScale=1,this.pointers=new Map,this.pinchDistance=0,this.dragging=!1,V(this,et,Im).call(this),V(this,et,ja).call(this),V(this,et,ir).call(this)}setSource(e,t){if(!e){t==null||t();return}let n=new Image;n.decoding="async",n.addEventListener("load",()=>{this.image=n,this.hint&&(this.hint.textContent=this.hintText),this.reset(),t==null||t()}),n.addEventListener("error",()=>{this.hint&&(this.hint.textContent="\u0420\u0430\u0437\u0432\u0451\u0440\u0442\u043A\u0430 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u0430\u0441\u044C"),t==null||t()}),n.src=e}setSourceFromFile(e){let t=URL.createObjectURL(e);this.setSource(t,()=>URL.revokeObjectURL(t))}reset(){this.zoom=1,this.x=0,this.y=0,V(this,et,ja).call(this),V(this,et,ir).call(this)}dispose(){var e;(e=this.observer)==null||e.disconnect(),window.removeEventListener("resize",this.onWindowResize)}};et=new WeakSet,Im=function(){let e=this.root;e.addEventListener("wheel",n=>V(this,et,Dm).call(this,n),{passive:!1}),e.addEventListener("pointerdown",n=>V(this,et,Um).call(this,n)),e.addEventListener("pointermove",n=>V(this,et,Nm).call(this,n));let t=n=>V(this,et,Om).call(this,n);e.addEventListener("pointerup",t),e.addEventListener("pointercancel",t),e.addEventListener("dblclick",()=>this.reset()),typeof ResizeObserver=="function"&&(this.observer=new ResizeObserver(()=>V(this,et,nu).call(this)),this.observer.observe(e)),this.onWindowResize=()=>V(this,et,nu).call(this),window.addEventListener("resize",this.onWindowResize)},Dm=function(e){e.preventDefault(),V(this,et,tu).call(this,e.clientX,e.clientY,Math.exp(-e.deltaY*.0016))},Um=function(e){var t,n;if(this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),(n=(t=this.root).setPointerCapture)==null||n.call(t,e.pointerId),this.pointers.size===2){this.pinchDistance=V(this,et,eu).call(this),this.dragging=!1;return}this.dragging=!0,this.root.classList.add("is-dragging")},Nm=function(e){let t=this.pointers.get(e.pointerId);if(t){if(this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),this.pointers.size===2){let n=V(this,et,eu).call(this);if(this.pinchDistance>0&&n>0){let[i,r]=[...this.pointers.values()];V(this,et,tu).call(this,(i.x+r.x)/2,(i.y+r.y)/2,n/this.pinchDistance)}this.pinchDistance=n;return}this.dragging&&(this.x+=e.clientX-t.x,this.y+=e.clientY-t.y,V(this,et,Ja).call(this),V(this,et,ir).call(this))}},Om=function(e){var t,n;this.pointers.delete(e.pointerId),(n=(t=this.root).releasePointerCapture)==null||n.call(t,e.pointerId),this.pointers.size<2&&(this.pinchDistance=0),this.pointers.size===0&&(this.dragging=!1,this.root.classList.remove("is-dragging"))},eu=function(){let[e,t]=[...this.pointers.values()];return Math.hypot(e.x-t.x,e.y-t.y)},tu=function(e,t,n){let i=Math.min(Math.max(this.zoom*n,1),V(this,et,Bm).call(this));if(i===this.zoom)return;let r=this.root.getBoundingClientRect(),o=e-r.left-r.width/2,a=t-r.top-r.height/2,c=i/this.zoom;this.x=o-(o-this.x)*c,this.y=a-(a-this.y)*c,this.zoom=i,V(this,et,Ja).call(this),V(this,et,ir).call(this)},nu=function(){V(this,et,ja).call(this)&&(V(this,et,Ja).call(this),V(this,et,ir).call(this))},ja=function(){let e=this.root.clientWidth,t=this.root.clientHeight,n=window.devicePixelRatio||1;if(!e||!t||!this.canvas)return!1;this.width=e,this.height=t,this.dpr=n;let i=Math.round(e*n),r=Math.round(t*n);return(this.canvas.width!==i||this.canvas.height!==r)&&(this.canvas.width=i,this.canvas.height=r),this.image&&(this.fitScale=Math.min(e*.82/this.image.naturalWidth,t*.78/this.image.naturalHeight)),!0},Fm=function(){return!this.image||!this.fitScale?1:1/(this.fitScale*this.dpr)},Bm=function(){return this.image?Math.min(Math.max(V(this,et,Fm).call(this)*1.5,2),40):2},Ja=function(){if(!this.image)return;let e=this.fitScale*this.zoom,t=Math.max((this.image.naturalWidth*e-this.width)/2,0),n=Math.max((this.image.naturalHeight*e-this.height)/2,0);this.x=Math.min(Math.max(this.x,-t),t),this.y=Math.min(Math.max(this.y,-n),n)},ir=function(){let e=this.ctx;if(!e||!this.width||!this.height||(e.setTransform(this.dpr,0,0,this.dpr,0,0),e.clearRect(0,0,this.width,this.height),this.root.classList.toggle("is-zoomed",this.zoom>1),!this.image))return;let t=this.fitScale*this.zoom,n=this.image.naturalWidth*t,i=this.image.naturalHeight*t,r=(this.width-n)/2+this.x,o=(this.height-i)/2+this.y;e.save(),e.shadowColor="rgba(0, 0, 0, 0.12)",e.shadowBlur=30,e.shadowOffsetY=10,e.fillStyle="#fff",V(this,et,iu).call(this,e,r,o,n,i),e.fill(),e.restore(),e.save(),V(this,et,iu).call(this,e,r,o,n,i),e.clip(),e.imageSmoothingEnabled=!0,e.imageSmoothingQuality="high",e.drawImage(this.image,r,o,n,i),e.restore()},iu=function(e,t,n,i,r){let o=Math.min(4,i/2,r/2);e.beginPath(),typeof e.roundRect=="function"?e.roundRect(t,n,i,r,o):e.rect(t,n,i,r)};function sr(s,e="success"){var i,r;let t=(i=nr())==null?void 0:i.ui;if(t){t.showToast(s,e);return}(r=document.querySelector(".toast"))==null||r.remove();let n=document.createElement("div");n.className=e==="error"?"toast toast--error":"toast",n.setAttribute("role","status"),n.textContent=s,document.body.appendChild(n),setTimeout(()=>n.classList.add("is-leaving"),2200),setTimeout(()=>n.remove(),2500)}function rE(){let s=Array.from(document.querySelectorAll(".stage-tab")),e=document.getElementById("unwrap"),t=document.querySelector(".stage-controls"),n=document.querySelector(".stage-swatches"),i=document.getElementById("scene-picker"),r=document.querySelector(".stage"),o=a=>{var c;r==null||r.classList.toggle("is-photo",a==="scene"),r==null||r.classList.toggle("is-unwrap",a==="unwrap"),e&&(e.hidden=a!=="unwrap"),t&&(t.hidden=a==="unwrap"),n&&(n.hidden=a!=="3d"),i&&(i.hidden=a!=="scene"),(c=nr())==null||c.setManualRotate(a==="unwrap")};s.forEach(a=>{a.addEventListener("click",()=>{let c=a.dataset.tab;s.forEach(h=>{let u=h===a;h.classList.toggle("is-active",u),h.setAttribute("aria-selected",String(u))}),o(c);let l=nr();l&&(c==="scene"?Hm(l,ec):l.exitPhotoScene())})})}var ec=Ra;async function Hm(s,e){var t;ec=e,Vm(e),await s.enterPhotoScene(e),(t=document.querySelector(".stage"))!=null&&t.classList.contains("is-photo")||s.exitPhotoScene()}function Vm(s){for(let e of document.querySelectorAll(".scene-chip")){let t=e.dataset.scene===s;e.classList.toggle("is-active",t),e.setAttribute("aria-pressed",String(t))}}function oE(){var e;let s=document.getElementById("scene-picker");if(s){if(qi.ui.photoScene===!1){(e=document.querySelector('.stage-tab[data-tab="scene"]'))==null||e.remove(),s.remove();return}if(Aa.length<2){s.remove();return}s.replaceChildren();for(let t of Aa){let n=document.createElement("button");n.type="button",n.className="scene-chip",n.dataset.scene=t.id,n.setAttribute("aria-pressed",String(t.id===ec)),n.title=t.note??"";let i=document.createElement("span");i.className="scene-chip__label",i.textContent=t.label,n.appendChild(i),n.addEventListener("click",()=>{let r=nr();r&&Hm(r,t.id)}),s.appendChild(n)}Vm(ec)}}function aE(){let s=document.getElementById("unwrap");if(!s)return;let e=new Qa(s);Lm(e),Cm(t=>e.setSource((t==null?void 0:t.unwrap)||(t==null?void 0:t.texture)||hs()))}function cE(){let s=document.getElementById("stage"),e=document.getElementById("turntable-btn");s&&Am(t=>{let n=t.turntable;n&&(e==null||e.addEventListener("click",()=>{let i=n.togglePinned();e.classList.toggle("is-active",i),e.setAttribute("aria-pressed",String(i))}),s.addEventListener("dblclick",()=>t.resetView()))})}function lE(){let s=document.getElementById("info-btn"),e=document.getElementById("help-popover"),t=document.getElementById("help-backdrop"),n=document.getElementById("help-close");if(!s||!e)return;let i=()=>window.matchMedia("(max-width: 640px)").matches,r=()=>{if(i())return;let l=s.getBoundingClientRect(),h=e.getBoundingClientRect(),u=12,d=l.right-h.width;d=Math.min(Math.max(d,u),window.innerWidth-h.width-u);let p=l.top-h.height-u,g=p>=u?p:Math.min(l.bottom+u,window.innerHeight-h.height-u);e.style.left=`${Math.round(d)}px`,e.style.top=`${Math.round(g)}px`},o=()=>{e.hidden=!1,t&&(t.hidden=!1),r(),requestAnimationFrame(()=>{e.classList.add("is-open"),r()}),s.setAttribute("aria-expanded","true")},a=()=>{e.classList.remove("is-open"),s.setAttribute("aria-expanded","false"),t&&(t.hidden=!0),setTimeout(()=>{e.classList.contains("is-open")||(e.hidden=!0)},180)},c=()=>e.hidden?o():a();s.addEventListener("click",l=>{l.stopPropagation(),c()}),n==null||n.addEventListener("click",a),t==null||t.addEventListener("click",a),document.addEventListener("click",l=>{e.hidden||e.contains(l.target)||s.contains(l.target)||a()}),window.addEventListener("keydown",l=>{l.key==="Escape"&&!e.hidden&&a()}),window.addEventListener("resize",()=>{e.hidden||r()}),window.addEventListener("scroll",()=>{e.hidden||r()},{passive:!0})}function hE(){let s=document.getElementById("approve-btn"),e=document.getElementById("checklist"),t=document.getElementById("status-chip");if(!s||!e)return;let n=!1,i=(o,a)=>s.dataset[o]??a,r=(o,a)=>{let c=s.querySelector(".cta__full"),l=s.querySelector(".cta__short");c&&(c.textContent=o),l&&(l.textContent=a),!c&&!l&&(s.textContent=o)};s.addEventListener("click",()=>{var c;if(!n){n=!0,e.hidden=!1,r(i("labelConfirm","\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0432 \u043F\u0435\u0447\u0430\u0442\u044C"),i("labelConfirmShort","\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C"));return}if(!Array.from(e.querySelectorAll('input[type="checkbox"]')).every(l=>l.checked)){sr("\u0421\u043D\u044F\u0442\u0430\u044F \u0433\u0430\u043B\u043E\u0447\u043A\u0430 \u2014 \u0437\u043D\u0430\u0447\u0438\u0442, \u043D\u0443\u0436\u043D\u044B \u043F\u0440\u0430\u0432\u043A\u0438","error");return}if(t){t.classList.add("is-done");let l=t.querySelector(".status-chip__text"),h=t.dataset.labelDone;l&&h&&(l.textContent=h)}e.hidden=!0,s.disabled=!0;let a=i("labelDone","\u0421\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u043E \u2713");r(a,a),(c=document.getElementById("edits-btn"))==null||c.setAttribute("disabled",""),sr("\u0417\u0430\u043A\u0430\u0437 \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u0432 \u043F\u0435\u0447\u0430\u0442\u044C")})}function uE(){let s=document.getElementById("approve-actions"),e=document.getElementById("edits-form"),t=document.getElementById("edits-btn"),n=document.getElementById("edits-cancel"),i=document.getElementById("edits-text");if(!s||!e)return;let r=()=>{e.hidden=!0,s.hidden=!1};t==null||t.addEventListener("click",()=>{s.hidden=!0,e.hidden=!1,i==null||i.focus()}),n==null||n.addEventListener("click",r),e.addEventListener("submit",o=>{if(o.preventDefault(),!(i!=null&&i.value.trim())){sr("\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435, \u0447\u0442\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C","error"),i==null||i.focus();return}r(),i&&(i.value=""),sr("\u041F\u0440\u0430\u0432\u043A\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u044B \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0443")})}var zm="cup-viewer:panel-collapsed";function dE(){let s=document.querySelector(".approve-grid"),e=document.getElementById("panel-toggle"),t=document.getElementById("approve-panel");if(!s||!e||!t)return;let n=e.querySelector(".panel-toggle__text"),i=o=>{s.classList.toggle("is-panel-collapsed",o),e.setAttribute("aria-expanded",String(!o)),t.inert=o;let a=o?e.dataset.labelExpand??"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0430\u043D\u0435\u043B\u044C":e.dataset.labelCollapse??"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u043F\u0430\u043D\u0435\u043B\u044C";e.setAttribute("aria-label",a),e.title=a,n&&(n.textContent=o?"\u0417\u0430\u043A\u0430\u0437":"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C")},r=!1;try{r=localStorage.getItem(zm)==="1"}catch{}i(r),e.addEventListener("click",()=>{r=!r,i(r);try{localStorage.setItem(zm,r?"1":"0")}catch{}}),s.addEventListener("transitionend",o=>{var a;o.propertyName==="grid-template-columns"&&((a=nr())==null||a.resize())})}function fE(){var s;(s=document.getElementById("share-btn"))==null||s.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(window.location.href),sr("\u0421\u0441\u044B\u043B\u043A\u0430 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430")}catch{sr("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443","error")}})}function km(){rE(),oE(),aE(),cE(),lE(),hE(),uE(),fE(),dE()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",km,{once:!0}):km();function pE(s){var n;let e=((n=s.security)==null?void 0:n.debugApi)??"never";if(e==="always")return!0;if(e==="never")return!1;let{hostname:t}=window.location;return t==="localhost"||t==="127.0.0.1"||t==="[::1]"}async function mE(){let s=document.getElementById("canvas-container");if(!s)throw new Error("\u041D\u0435\u0442 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 #canvas-container");jh(bm(qi));let e=new Za(s,qi);Rm(e),pE(qi)&&gE(e);let[t]=await Promise.all([Tm(qi),e.startEnvironment()]);await Wm(e,t)}async function Wm(s,e){var t;return s.setOrder(e),Pm(e),jh(e),await s.loadModel(e.model,e.cup),s.setSurfaceFinish({roughness:e.roughness,relief:e.relief,reliefScale:e.reliefScale,normalScale:(t=e.paper)==null?void 0:t.normalScale}),await s.applyTexture(e.texture),e}function gE(s){window.cupViewer={viewer:s,get order(){return Qr()},applyOrder:e=>{var t;return Wm(s,Ka({...(t=Qr())==null?void 0:t.input,...e}))},loadModel:e=>s.loadModel(e),selectCup:e=>s.selectCup(e),selectPaper:e=>s.selectPaper(e),replaceTexture:e=>s.applyTexture(e),setRoughness:e=>s.setSurfaceFinish({roughness:e}),setMetalness:e=>s.setSurfaceFinish({metalness:e}),setRelief:e=>{var t;return s.setSurfaceFinish({relief:e,reliefScale:(t=Qr())==null?void 0:t.reliefScale})},setReliefScale:e=>{var t;return s.setSurfaceFinish({relief:(t=Qr())==null?void 0:t.relief,reliefScale:e})},describeKeyLight:()=>s.describeKeyLight(),debugAO:(e=!0)=>s.pipeline.showAmbientOcclusionOnly(e)}}function vE(s){console.error("\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0449\u0438\u043A \u043D\u0435 \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u0441\u044F:",s);let e=document.getElementById("stage")??document.body;if(e.querySelector(".startup-error"))return;let t=document.createElement("div");t.className="startup-error",t.setAttribute("role","alert");let n=document.createElement("p");n.className="startup-error__title",n.textContent="\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C 3D-\u043C\u043E\u0434\u0435\u043B\u044C";let i=document.createElement("p");i.className="startup-error__text",i.textContent="\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \xAB\u0420\u0430\u0437\u0432\u0451\u0440\u0442\u043A\u0430\xBB \u2014 \u043C\u0430\u043A\u0435\u0442 \u0442\u0430\u043C \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u043B\u043E\u0441\u043A\u043E. \u0415\u0441\u043B\u0438 3D \u043D\u0435 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0438 \u043F\u043E\u0441\u043B\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B, \u0441\u043E\u043E\u0431\u0449\u0438\u0442\u0435 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0443.",t.append(n,i),e.appendChild(t)}function Gm(){mE().catch(vE)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Gm,{once:!0}):Gm();
