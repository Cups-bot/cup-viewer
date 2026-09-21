/* cup-viewer — собрано npm run build. Исходники в js/, править нужно там. */
var eu=s=>{throw TypeError(s)};var zm=(s,e,t)=>e.has(s)||eu("Cannot "+t);var an=(s,e,t)=>e.has(s)?eu("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t);var V=(s,e,t)=>(zm(s,e,"access private method"),t);var Xi=Object.freeze({assets:{hdri:"assets/hdri/main.hdr",dracoDecoder:"vendor/draco/"},texture:{maxSize:2048},order:{endpoint:null},security:{urlOverrides:"localhost",allowedAssetPrefixes:["assets/","/upload/"],debugApi:"localhost"},renderer:{antialias:!0,preserveDrawingBuffer:!0,alpha:!0,maxPixelRatio:2,toneMapping:"none",toneMappingExposure:1,shadows:!0},camera:{fov:40,position:{x:0,y:.35,z:1.2}},controls:{enableDamping:!0,dampingFactor:.08,minDistance:.4,maxDistance:3,maxPolarAngle:Math.PI,enablePan:!0},autoRotate:{enabled:!0,speed:.45},quality:{postProcessing:!0,msaaSamples:4,ambientOcclusion:{enabled:!0,intensity:1,radius:.07,thickness:.3,scale:1.35,samples:32}},lighting:{environment:"studio",environmentIntensity:.7,keyLight:{enabled:!0,distance:3,intensityScale:.133,useColor:!0},shadow:{mapSize:1024,near:1,far:8,frustum:1.6,bias:0,normalBias:.0015,radius:8,blurSamples:8}},floor:{enabled:!0,size:24},shadowCatcher:{enabled:!0,size:3,opacity:.32},ambientShadow:{enabled:!0,size:1.7,resolution:512,height:.13,darkness:2.2,blur:2.6,opacity:.85},model:{targetSize:.5,cameraFitOffset:2.1},turntable:{enabled:!0,radiusScale:1,lift:.012},backgrounds:["#eaf5ff","#ffffff","#777777","#1c1c1e"],turnExport:{duration:6,fps:30,bitrate:8e6,photoStep:45,name:"cup-360"},ui:{toastDuration:2500,screenshotName:"cup-viewer.png",screenshotShare:"auto",dragAndDrop:!0,uploadButton:!0,photoScene:!0,modelPicker:!0}});var is={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ss={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},km=0,tu=1,Hm=2;var Gd=1,Vm=2,Hn=3,Pn=0,dn=1,bn=2;var Vt=0,Ls=1,nu=2,iu=3,su=4,fl=5,Cn=100,Gm=101,Wm=102,ru=103,ou=104,Zs=200,Xm=201,qm=202,Ym=203,Dc=204,Uc=205,oa=206,Zm=207,aa=208,Km=209,$m=210,jm=211,Jm=212,Qm=213,eg=214,tg=0,ng=1,ig=2,Co=3,sg=4,rg=5,og=6,ag=7,Wd=0,cg=1,lg=2,Kn=0,Dr=1,pl=2,ml=3,Ks=4,hg=5,rs=6,au="attached",ug="detached",Xd=300,Ns=301,Os=302,Nc=303,Oc=304,ca=306,Gt=1e3,Ot=1001,vr=1002,It=1003,Po=1004;var dr=1005;var wt=1006,gl=1007;var Gn=1008;var $n=1009,dg=1010,fg=1011,vl=1012,qd=1013,Ai=1014,nn=1015,Dt=1016,Yd=1017,Zd=1018,di=1020,pg=1021,hn=1023,mg=1024,gg=1025,Ji=1026,Ci=1027,_l=1028,Kd=1029,vg=1030,$d=1031,jd=1033,ec=33776,tc=33777,nc=33778,ic=33779,cu=35840,lu=35841,hu=35842,uu=35843,Jd=36196,du=37492,fu=37496,pu=37808,mu=37809,gu=37810,vu=37811,_u=37812,xu=37813,yu=37814,Mu=37815,Su=37816,Eu=37817,bu=37818,wu=37819,Tu=37820,Au=37821,sc=36492,Ru=36494,Cu=36495,_g=36283,Pu=36284,Iu=36285,Lu=36286;var Fs=2300,es=2301,rc=2302,Du=2400,Uu=2401,Nu=2402,xg=2500;var Qd=0,la=1,Ur=2,ef=3e3,Qi=3001,yg=3200,Mg=3201,xl=0,Sg=1,un="",mt="srgb",Tt="srgb-linear",yl="display-p3",ha="display-p3-linear",Io="linear",St="srgb",Lo="rec709",Do="p3";var ds=7680;var Ou=519,Eg=512,bg=513,wg=514,tf=515,Tg=516,Ag=517,Rg=518,Cg=519,Fc=35044;var Fu="300 es",Bc=1035,ui=2e3,Uo=2001,jn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bu=1234567,fr=Math.PI/180,Bs=180/Math.PI;function Vn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(cn[s&255]+cn[s>>8&255]+cn[s>>16&255]+cn[s>>24&255]+"-"+cn[e&255]+cn[e>>8&255]+"-"+cn[e>>16&15|64]+cn[e>>24&255]+"-"+cn[t&63|128]+cn[t>>8&255]+"-"+cn[t>>16&255]+cn[t>>24&255]+cn[n&255]+cn[n>>8&255]+cn[n>>16&255]+cn[n>>24&255]).toLowerCase()}function jt(s,e,t){return Math.max(e,Math.min(t,s))}function Ml(s,e){return(s%e+e)%e}function Pg(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Ig(s,e,t){return s!==e?(t-s)/(e-s):0}function pr(s,e,t){return(1-t)*s+t*e}function Lg(s,e,t,n){return pr(s,e,1-Math.exp(-t*n))}function Dg(s,e=1){return e-Math.abs(Ml(s,e*2)-e)}function Ug(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Ng(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Og(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Fg(s,e){return s+Math.random()*(e-s)}function Bg(s){return s*(.5-Math.random())}function zg(s){s!==void 0&&(Bu=s);let e=Bu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function kg(s){return s*fr}function Hg(s){return s*Bs}function zc(s){return(s&s-1)===0&&s!==0}function Vg(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function No(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Gg(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,c*u,c*d,a*l);break;case"YZY":s.set(c*d,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*d,a*h,a*l);break;case"XZX":s.set(a*h,c*g,c*p,a*l);break;case"YXY":s.set(c*p,a*h,c*g,a*l);break;case"ZYZ":s.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Zn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function yt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var rn={DEG2RAD:fr,RAD2DEG:Bs,generateUUID:Vn,clamp:jt,euclideanModulo:Ml,mapLinear:Pg,inverseLerp:Ig,lerp:pr,damp:Lg,pingpong:Dg,smoothstep:Ug,smootherstep:Ng,randInt:Og,randFloat:Fg,randFloatSpread:Bg,seededRandom:zg,degToRad:kg,radToDeg:Hg,isPowerOfTwo:zc,ceilPowerOfTwo:Vg,floorPowerOfTwo:No,setQuaternionFromProperEuler:Gg,normalize:yt,denormalize:Zn},Pe=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(jt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},rt=class s{constructor(e,t,n,i,r,o,a,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l)}set(e,t,n,i,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],_=i[0],m=i[3],f=i[6],S=i[1],y=i[4],R=i[7],F=i[2],I=i[5],P=i[8];return r[0]=o*_+a*S+c*F,r[3]=o*m+a*y+c*I,r[6]=o*f+a*R+c*P,r[1]=l*_+h*S+u*F,r[4]=l*m+h*y+u*I,r[7]=l*f+h*R+u*P,r[2]=d*_+p*S+g*F,r[5]=d*m+p*y+g*I,r[8]=d*f+p*R+g*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,p=l*r-o*c,g=t*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*r-a*t)*_,e[6]=p*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(oc.makeScale(e,t)),this}rotate(e){return this.premultiply(oc.makeRotation(-e)),this}translate(e,t){return this.premultiply(oc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},oc=new rt;function nf(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function _r(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Wg(){let s=_r("canvas");return s.style.display="block",s}var zu={};function mr(s){s in zu||(zu[s]=!0,console.warn(s))}var ku=new rt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Hu=new rt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),eo={[Tt]:{transfer:Io,primaries:Lo,toReference:s=>s,fromReference:s=>s},[mt]:{transfer:St,primaries:Lo,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[ha]:{transfer:Io,primaries:Do,toReference:s=>s.applyMatrix3(Hu),fromReference:s=>s.applyMatrix3(ku)},[yl]:{transfer:St,primaries:Do,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Hu),fromReference:s=>s.applyMatrix3(ku).convertLinearToSRGB()}},Xg=new Set([Tt,ha]),dt={enabled:!0,_workingColorSpace:Tt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Xg.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;let n=eo[e].toReference,i=eo[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return eo[s].primaries},getTransfer:function(s){return s===un?Io:eo[s].transfer}};function Ds(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ac(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var fs,Oo=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{fs===void 0&&(fs=_r("canvas")),fs.width=e.width,fs.height=e.height;let n=fs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=fs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=_r("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ds(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ds(t[n]/255)*255):t[n]=Ds(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},qg=0,Fo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qg++}),this.uuid=Vn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(cc(i[o].image)):r.push(cc(i[o]))}else r=cc(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function cc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Oo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Yg=0,Wt=class s extends jn{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Ot,i=Ot,r=wt,o=Gn,a=hn,c=$n,l=s.DEFAULT_ANISOTROPY,h=un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=Vn(),this.name="",this.source=new Fo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(mr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Qi?mt:un),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Xd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gt:e.x=e.x-Math.floor(e.x);break;case Ot:e.x=e.x<0?0:1;break;case vr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gt:e.y=e.y-Math.floor(e.y);break;case Ot:e.y=e.y<0?0:1;break;case vr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return mr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===mt?Qi:ef}set encoding(e){mr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Qi?mt:un}};Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=Xd;Wt.DEFAULT_ANISOTROPY=1;var Et=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,R=(p+1)/2,F=(f+1)/2,I=(h+d)/4,P=(u+_)/4,k=(g+m)/4;return y>R&&y>F?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=I/n,r=P/n):R>F?R<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(R),n=I/i,r=k/i):F<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(F),n=P/r,i=k/r),this.set(n,i,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-_)/S,this.z=(d-h)/S,this.w=Math.acos((l+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},kc=class extends jn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Et(0,0,e,t),this.scissorTest=!1,this.viewport=new Et(0,0,e,t);let i={width:e,height:t,depth:1};n.encoding!==void 0&&(mr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Qi?mt:un),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Wt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Fo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xt=class extends kc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Bo=class extends Wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=It,this.minFilter=It,this.wrapR=Ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Hc=class extends Wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=It,this.minFilter=It,this.wrapR=Ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var _n=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==p||h!==g){let m=1-a,f=c*d+l*p+h*g+u*_,S=f>=0?1:-1,y=1-f*f;if(y>Number.EPSILON){let F=Math.sqrt(y),I=Math.atan2(F,f*S);m=Math.sin(m*I)/F,a=Math.sin(a*I)/F}let R=a*S;if(c=c*m+d*R,l=l*m+p*R,h=h*m+g*R,u=u*m+_*R,m===1-a){let F=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=F,l*=F,h*=F,u*=F}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*p-l*d,e[t+1]=c*g+h*d+l*u-a*p,e[t+2]=l*g+h*p+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(r/2),d=c(n/2),p=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-i)*p}else if(n>a&&n>u){let p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(r+l)/p}else if(a>u){let p=2*Math.sqrt(1+a-n-u);this._w=(r-l)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-n-a);this._w=(o-i)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(jt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Vu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Vu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=i+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return lc.copy(this).projectOnVector(e),this.sub(lc)}reflect(e){return this.sub(lc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(jt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},lc=new B,Vu=new _n,sn=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Bn):Bn.fromBufferAttribute(r,o),Bn.applyMatrix4(e.matrixWorld),this.expandByPoint(Bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),to.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),to.copy(n.boundingBox)),to.applyMatrix4(e.matrixWorld),this.union(to)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Bn),Bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(rr),no.subVectors(this.max,rr),ps.subVectors(e.a,rr),ms.subVectors(e.b,rr),gs.subVectors(e.c,rr),Si.subVectors(ms,ps),Ei.subVectors(gs,ms),qi.subVectors(ps,gs);let t=[0,-Si.z,Si.y,0,-Ei.z,Ei.y,0,-qi.z,qi.y,Si.z,0,-Si.x,Ei.z,0,-Ei.x,qi.z,0,-qi.x,-Si.y,Si.x,0,-Ei.y,Ei.x,0,-qi.y,qi.x,0];return!hc(t,ps,ms,gs,no)||(t=[1,0,0,0,1,0,0,0,1],!hc(t,ps,ms,gs,no))?!1:(io.crossVectors(Si,Ei),t=[io.x,io.y,io.z],hc(t,ps,ms,gs,no))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},si=[new B,new B,new B,new B,new B,new B,new B,new B],Bn=new B,to=new sn,ps=new B,ms=new B,gs=new B,Si=new B,Ei=new B,qi=new B,rr=new B,no=new B,io=new B,Yi=new B;function hc(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Yi.fromArray(s,r);let a=i.x*Math.abs(Yi.x)+i.y*Math.abs(Yi.y)+i.z*Math.abs(Yi.z),c=e.dot(Yi),l=t.dot(Yi),h=n.dot(Yi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Zg=new sn,or=new B,uc=new B,wn=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Zg.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;or.subVectors(e,this.center);let t=or.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(or,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(uc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(or.copy(e.center).add(uc)),this.expandByPoint(or.copy(e.center).sub(uc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},ri=new B,dc=new B,so=new B,bi=new B,fc=new B,ro=new B,pc=new B,fi=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ri.copy(this.origin).addScaledVector(this.direction,t),ri.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){dc.copy(e).add(t).multiplyScalar(.5),so.copy(t).sub(e).normalize(),bi.copy(this.origin).sub(dc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(so),a=bi.dot(this.direction),c=-bi.dot(so),l=bi.lengthSq(),h=Math.abs(1-o*o),u,d,p,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(dc).addScaledVector(so,d),p}intersectSphere(e,t){ri.subVectors(e.center,this.origin);let n=ri.dot(this.direction),i=ri.dot(ri)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ri)!==null}intersectTriangle(e,t,n,i,r){fc.subVectors(t,e),ro.subVectors(n,e),pc.crossVectors(fc,ro);let o=this.direction.dot(pc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;bi.subVectors(this.origin,e);let c=a*this.direction.dot(ro.crossVectors(bi,ro));if(c<0)return null;let l=a*this.direction.dot(fc.cross(bi));if(l<0||c+l>o)return null;let h=-a*bi.dot(pc);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},$e=class s{constructor(e,t,n,i,r,o,a,c,l,h,u,d,p,g,_,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l,h,u,d,p,g,_,m)}set(e,t,n,i,r,o,a,c,l,h,u,d,p,g,_,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=i,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/vs.setFromMatrixColumn(e,0).length(),r=1/vs.setFromMatrixColumn(e,1).length(),o=1/vs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,p=c*u,g=l*h,_=l*u;t[0]=d+_*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,p=c*u,g=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-p,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+g,t[10]=d-_*u}else if(e.order==="XZY"){let d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kg,e,$g)}lookAt(e,t,n){let i=this.elements;return Mn.subVectors(e,t),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),wi.crossVectors(n,Mn),wi.lengthSq()===0&&(Math.abs(n.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),wi.crossVectors(n,Mn)),wi.normalize(),oo.crossVectors(Mn,wi),i[0]=wi.x,i[4]=oo.x,i[8]=Mn.x,i[1]=wi.y,i[5]=oo.y,i[9]=Mn.y,i[2]=wi.z,i[6]=oo.z,i[10]=Mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],S=n[3],y=n[7],R=n[11],F=n[15],I=i[0],P=i[4],k=i[8],M=i[12],w=i[1],H=i[5],X=i[9],ie=i[13],D=i[2],G=i[6],W=i[10],te=i[14],ne=i[3],J=i[7],ee=i[11],oe=i[15];return r[0]=o*I+a*w+c*D+l*ne,r[4]=o*P+a*H+c*G+l*J,r[8]=o*k+a*X+c*W+l*ee,r[12]=o*M+a*ie+c*te+l*oe,r[1]=h*I+u*w+d*D+p*ne,r[5]=h*P+u*H+d*G+p*J,r[9]=h*k+u*X+d*W+p*ee,r[13]=h*M+u*ie+d*te+p*oe,r[2]=g*I+_*w+m*D+f*ne,r[6]=g*P+_*H+m*G+f*J,r[10]=g*k+_*X+m*W+f*ee,r[14]=g*M+_*ie+m*te+f*oe,r[3]=S*I+y*w+R*D+F*ne,r[7]=S*P+y*H+R*G+F*J,r[11]=S*k+y*X+R*W+F*ee,r[15]=S*M+y*ie+R*te+F*oe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+r*c*u-i*l*u-r*a*d+n*l*d+i*a*p-n*c*p)+_*(+t*c*p-t*l*d+r*o*d-i*o*p+i*l*h-r*c*h)+m*(+t*l*u-t*a*p-r*o*u+n*o*p+r*a*h-n*l*h)+f*(-i*a*h-t*c*u+t*a*d+i*o*u-n*o*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],S=u*m*l-_*d*l+_*c*p-a*m*p-u*c*f+a*d*f,y=g*d*l-h*m*l-g*c*p+o*m*p+h*c*f-o*d*f,R=h*_*l-g*u*l+g*a*p-o*_*p-h*a*f+o*u*f,F=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,I=t*S+n*y+i*R+r*F;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/I;return e[0]=S*P,e[1]=(_*d*r-u*m*r-_*i*p+n*m*p+u*i*f-n*d*f)*P,e[2]=(a*m*r-_*c*r+_*i*l-n*m*l-a*i*f+n*c*f)*P,e[3]=(u*c*r-a*d*r-u*i*l+n*d*l+a*i*p-n*c*p)*P,e[4]=y*P,e[5]=(h*m*r-g*d*r+g*i*p-t*m*p-h*i*f+t*d*f)*P,e[6]=(g*c*r-o*m*r-g*i*l+t*m*l+o*i*f-t*c*f)*P,e[7]=(o*d*r-h*c*r+h*i*l-t*d*l-o*i*p+t*c*p)*P,e[8]=R*P,e[9]=(g*u*r-h*_*r-g*n*p+t*_*p+h*n*f-t*u*f)*P,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*f+t*a*f)*P,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*p-t*a*p)*P,e[12]=F*P,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*P,e[14]=(g*a*i-o*_*i-g*n*c+t*_*c+o*n*m-t*a*m)*P,e[15]=(o*u*i-h*a*i+h*n*c-t*u*c-o*n*d+t*a*d)*P,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,p=r*h,g=r*u,_=o*h,m=o*u,f=a*u,S=c*l,y=c*h,R=c*u,F=n.x,I=n.y,P=n.z;return i[0]=(1-(_+f))*F,i[1]=(p+R)*F,i[2]=(g-y)*F,i[3]=0,i[4]=(p-R)*I,i[5]=(1-(d+f))*I,i[6]=(m+S)*I,i[7]=0,i[8]=(g+y)*P,i[9]=(m-S)*P,i[10]=(1-(d+_))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=vs.set(i[0],i[1],i[2]).length(),o=vs.set(i[4],i[5],i[6]).length(),a=vs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],zn.copy(this);let l=1/r,h=1/o,u=1/a;return zn.elements[0]*=l,zn.elements[1]*=l,zn.elements[2]*=l,zn.elements[4]*=h,zn.elements[5]*=h,zn.elements[6]*=h,zn.elements[8]*=u,zn.elements[9]*=u,zn.elements[10]*=u,t.setFromRotationMatrix(zn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=ui){let c=this.elements,l=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i),p,g;if(a===ui)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Uo)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=ui){let c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*l,p=(n+i)*h,g,_;if(a===ui)g=(o+r)*u,_=-2*u;else if(a===Uo)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},vs=new B,zn=new $e,Kg=new B(0,0,0),$g=new B(1,1,1),wi=new B,oo=new B,Mn=new B,Gu=new $e,Wu=new _n,zo=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(jt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-jt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(jt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Gu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wu.setFromEuler(this),this.setFromQuaternion(Wu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};zo.DEFAULT_ORDER="XYZ";var xr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},jg=0,Xu=new B,_s=new _n,oi=new $e,ao=new B,ar=new B,Jg=new B,Qg=new _n,qu=new B(1,0,0),Yu=new B(0,1,0),Zu=new B(0,0,1),e0={type:"added"},t0={type:"removed"},Ut=class s extends jn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jg++}),this.uuid=Vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new B,t=new zo,n=new _n,i=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new $e},normalMatrix:{value:new rt}}),this.matrix=new $e,this.matrixWorld=new $e,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.multiply(_s),this}rotateOnWorldAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.premultiply(_s),this}rotateX(e){return this.rotateOnAxis(qu,e)}rotateY(e){return this.rotateOnAxis(Yu,e)}rotateZ(e){return this.rotateOnAxis(Zu,e)}translateOnAxis(e,t){return Xu.copy(e).applyQuaternion(this.quaternion),this.position.add(Xu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(qu,e)}translateY(e){return this.translateOnAxis(Yu,e)}translateZ(e){return this.translateOnAxis(Zu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(oi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ao.copy(e):ao.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oi.lookAt(ar,ao,this.up):oi.lookAt(ao,ar,this.up),this.quaternion.setFromRotationMatrix(oi),i&&(oi.extractRotation(i.matrixWorld),_s.setFromRotationMatrix(oi),this.quaternion.premultiply(_s.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(e0)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(t0)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(oi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,e,Jg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,Qg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++){let a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};Ut.DEFAULT_UP=new B(0,1,0);Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var kn=new B,ai=new B,mc=new B,ci=new B,xs=new B,ys=new B,Ku=new B,gc=new B,vc=new B,_c=new B,co=!1,Cs=class s{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),kn.subVectors(e,t),i.cross(kn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){kn.subVectors(i,t),ai.subVectors(n,t),mc.subVectors(e,t);let o=kn.dot(kn),a=kn.dot(ai),c=kn.dot(mc),l=ai.dot(ai),h=ai.dot(mc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ci)===null?!1:ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getUV(e,t,n,i,r,o,a,c){return co===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),co=!0),this.getInterpolation(e,t,n,i,r,o,a,c)}static getInterpolation(e,t,n,i,r,o,a,c){return this.getBarycoord(e,t,n,i,ci)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ci.x),c.addScaledVector(o,ci.y),c.addScaledVector(a,ci.z),c)}static isFrontFacing(e,t,n,i){return kn.subVectors(n,t),ai.subVectors(e,t),kn.cross(ai).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kn.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),kn.cross(ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return co===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),co=!0),s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;xs.subVectors(i,n),ys.subVectors(r,n),gc.subVectors(e,n);let c=xs.dot(gc),l=ys.dot(gc);if(c<=0&&l<=0)return t.copy(n);vc.subVectors(e,i);let h=xs.dot(vc),u=ys.dot(vc);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(xs,o);_c.subVectors(e,r);let p=xs.dot(_c),g=ys.dot(_c);if(g>=0&&p<=g)return t.copy(r);let _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(ys,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Ku.subVectors(r,i),a=(u-h)/(u-h+(p-g)),t.copy(i).addScaledVector(Ku,a);let f=1/(m+_+d);return o=_*f,a=d*f,t.copy(n).addScaledVector(xs,o).addScaledVector(ys,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},sf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},lo={h:0,s:0,l:0};function xc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Ce=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=dt.workingColorSpace){if(e=Ml(e,1),t=jt(t,0,1),n=jt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=xc(o,r,e+1/3),this.g=xc(o,r,e),this.b=xc(o,r,e-1/3)}return dt.toWorkingColorSpace(this,i),this}setStyle(e,t=mt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=mt){let n=sf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ds(e.r),this.g=Ds(e.g),this.b=Ds(e.b),this}copyLinearToSRGB(e){return this.r=ac(e.r),this.g=ac(e.g),this.b=ac(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=mt){return dt.fromWorkingColorSpace(ln.copy(this),e),Math.round(jt(ln.r*255,0,255))*65536+Math.round(jt(ln.g*255,0,255))*256+Math.round(jt(ln.b*255,0,255))}getHexString(e=mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(ln.copy(this),t);let n=ln.r,i=ln.g,r=ln.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(ln.copy(this),t),e.r=ln.r,e.g=ln.g,e.b=ln.b,e}getStyle(e=mt){dt.fromWorkingColorSpace(ln.copy(this),e);let t=ln.r,n=ln.g,i=ln.b;return e!==mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ti),this.setHSL(Ti.h+e,Ti.s+t,Ti.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ti),e.getHSL(lo);let n=pr(Ti.h,lo.h,t),i=pr(Ti.s,lo.s,t),r=pr(Ti.l,lo.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ln=new Ce;Ce.NAMES=sf;var n0=0,vn=class extends jn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:n0++}),this.uuid=Vn(),this.name="",this.type="Material",this.blending=Ls,this.side=Pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Dc,this.blendDst=Uc,this.blendEquation=Cn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ce(0,0,0),this.blendAlpha=0,this.depthFunc=Co,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ou,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ds,this.stencilZFail=ds,this.stencilZPass=ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ls&&(n.blending=this.blending),this.side!==Pn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Dc&&(n.blendSrc=this.blendSrc),this.blendDst!==Uc&&(n.blendDst=this.blendDst),this.blendEquation!==Cn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Co&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ou&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ds&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ds&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ds&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},zt=class extends vn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Wd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},hi=i0();function i0(){let s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[c|256]=32768,i[c]=24,i[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,i[c]=-l-1,i[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,i[c]=13,i[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,i[c]=24,i[c|256]=24):(n[c]=31744,n[c|256]=64512,i[c]=13,i[c|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;(l&8388608)===0;)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function s0(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=jt(s,-65504,65504),hi.floatView[0]=s;let e=hi.uint32View[0],t=e>>23&511;return hi.baseTable[t]+((e&8388607)>>hi.shiftTable[t])}function r0(s){let e=s>>10;return hi.uint32View[0]=hi.mantissaTable[hi.offsetTable[e]+(s&1023)]+hi.exponentTable[e],hi.floatView[0]}var Oi={toHalfFloat:s0,fromHalfFloat:r0},Bt=new B,ho=new Pe,Lt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Fc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ho.fromBufferAttribute(this,t),ho.applyMatrix3(e),this.setXY(t,ho.x,ho.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Zn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zn(t,this.array)),t}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zn(t,this.array)),t}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zn(t,this.array)),t}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array),r=yt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Fc&&(e.usage=this.usage),e}};var ko=class extends Lt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ho=class extends Lt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ct=class extends Lt{constructor(e,t,n){super(new Float32Array(e),t,n)}};var o0=0,Rn=new $e,yc=new Ut,Ms=new B,Sn=new sn,cr=new sn,$t=new B,qt=class s extends jn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:o0++}),this.uuid=Vn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nf(e)?Ho:ko)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new rt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Rn.makeRotationFromQuaternion(e),this.applyMatrix4(Rn),this}rotateX(e){return Rn.makeRotationX(e),this.applyMatrix4(Rn),this}rotateY(e){return Rn.makeRotationY(e),this.applyMatrix4(Rn),this}rotateZ(e){return Rn.makeRotationZ(e),this.applyMatrix4(Rn),this}translate(e,t,n){return Rn.makeTranslation(e,t,n),this.applyMatrix4(Rn),this}scale(e,t,n){return Rn.makeScale(e,t,n),this.applyMatrix4(Rn),this}lookAt(e){return yc.lookAt(e),yc.updateMatrix(),this.applyMatrix4(yc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ms).negate(),this.translate(Ms.x,Ms.y,Ms.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Ct(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];Sn.setFromBufferAttribute(r),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];cr.setFromBufferAttribute(a),this.morphTargetsRelative?($t.addVectors(Sn.min,cr.min),Sn.expandByPoint($t),$t.addVectors(Sn.max,cr.max),Sn.expandByPoint($t)):(Sn.expandByPoint(cr.min),Sn.expandByPoint(cr.max))}Sn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)$t.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared($t));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)$t.fromBufferAttribute(a,l),c&&(Ms.fromBufferAttribute(e,l),$t.add(Ms)),i=Math.max(i,n.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,i=t.position.array,r=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Lt(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let w=0;w<a;w++)l[w]=new B,h[w]=new B;let u=new B,d=new B,p=new B,g=new Pe,_=new Pe,m=new Pe,f=new B,S=new B;function y(w,H,X){u.fromArray(i,w*3),d.fromArray(i,H*3),p.fromArray(i,X*3),g.fromArray(o,w*2),_.fromArray(o,H*2),m.fromArray(o,X*2),d.sub(u),p.sub(u),_.sub(g),m.sub(g);let ie=1/(_.x*m.y-m.x*_.y);isFinite(ie)&&(f.copy(d).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(ie),S.copy(p).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(ie),l[w].add(f),l[H].add(f),l[X].add(f),h[w].add(S),h[H].add(S),h[X].add(S))}let R=this.groups;R.length===0&&(R=[{start:0,count:n.length}]);for(let w=0,H=R.length;w<H;++w){let X=R[w],ie=X.start,D=X.count;for(let G=ie,W=ie+D;G<W;G+=3)y(n[G+0],n[G+1],n[G+2])}let F=new B,I=new B,P=new B,k=new B;function M(w){P.fromArray(r,w*3),k.copy(P);let H=l[w];F.copy(H),F.sub(P.multiplyScalar(P.dot(H))).normalize(),I.crossVectors(k,H);let ie=I.dot(h[w])<0?-1:1;c[w*4]=F.x,c[w*4+1]=F.y,c[w*4+2]=F.z,c[w*4+3]=ie}for(let w=0,H=R.length;w<H;++w){let X=R[w],ie=X.start,D=X.count;for(let G=ie,W=ie+D;G<W;G+=3)M(n[G+0]),M(n[G+1]),M(n[G+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Lt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new B,r=new B,o=new B,a=new B,c=new B,l=new B,h=new B,u=new B;if(e)for(let d=0,p=e.count;d<p;d+=3){let g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*h;for(let f=0;f<h;f++)d[g++]=l[p++]}return new Lt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],p=e(d,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},$u=new $e,Zi=new fi,uo=new wn,ju=new B,Ss=new B,Es=new B,bs=new B,Mc=new B,fo=new B,po=new Pe,mo=new Pe,go=new Pe,Ju=new B,Qu=new B,ed=new B,vo=new B,_o=new B,lt=class extends Ut{constructor(e=new qt,t=new zt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){fo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Mc.fromBufferAttribute(u,e),o?fo.addScaledVector(Mc,h):fo.addScaledVector(Mc.sub(t),h))}t.add(fo)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),uo.copy(n.boundingSphere),uo.applyMatrix4(r),Zi.copy(e.ray).recast(e.near),!(uo.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(uo,ju)===null||Zi.origin.distanceToSquared(ju)>(e.far-e.near)**2))&&($u.copy(r).invert(),Zi.copy(e.ray).applyMatrix4($u),!(n.boundingBox!==null&&Zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zi)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],f=o[m.materialIndex],S=Math.max(m.start,p.start),y=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let R=S,F=y;R<F;R+=3){let I=a.getX(R),P=a.getX(R+1),k=a.getX(R+2);i=xo(this,f,e,n,l,h,u,I,P,k),i&&(i.faceIndex=Math.floor(R/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let S=a.getX(m),y=a.getX(m+1),R=a.getX(m+2);i=xo(this,o,e,n,l,h,u,S,y,R),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],f=o[m.materialIndex],S=Math.max(m.start,p.start),y=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let R=S,F=y;R<F;R+=3){let I=R,P=R+1,k=R+2;i=xo(this,f,e,n,l,h,u,I,P,k),i&&(i.faceIndex=Math.floor(R/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let S=m,y=m+1,R=m+2;i=xo(this,o,e,n,l,h,u,S,y,R),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function a0(s,e,t,n,i,r,o,a){let c;if(e.side===dn?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,e.side===Pn,a),c===null)return null;_o.copy(a),_o.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(_o);return l<t.near||l>t.far?null:{distance:l,point:_o.clone(),object:s}}function xo(s,e,t,n,i,r,o,a,c,l){s.getVertexPosition(a,Ss),s.getVertexPosition(c,Es),s.getVertexPosition(l,bs);let h=a0(s,e,t,n,Ss,Es,bs,vo);if(h){i&&(po.fromBufferAttribute(i,a),mo.fromBufferAttribute(i,c),go.fromBufferAttribute(i,l),h.uv=Cs.getInterpolation(vo,Ss,Es,bs,po,mo,go,new Pe)),r&&(po.fromBufferAttribute(r,a),mo.fromBufferAttribute(r,c),go.fromBufferAttribute(r,l),h.uv1=Cs.getInterpolation(vo,Ss,Es,bs,po,mo,go,new Pe),h.uv2=h.uv1),o&&(Ju.fromBufferAttribute(o,a),Qu.fromBufferAttribute(o,c),ed.fromBufferAttribute(o,l),h.normal=Cs.getInterpolation(vo,Ss,Es,bs,Ju,Qu,ed,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new B,materialIndex:0};Cs.getNormal(Ss,Es,bs,u.normal),h.face=u}return h}var yr=class s extends qt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Ct(l,3)),this.setAttribute("normal",new Ct(h,3)),this.setAttribute("uv",new Ct(u,2));function g(_,m,f,S,y,R,F,I,P,k,M){let w=R/P,H=F/k,X=R/2,ie=F/2,D=I/2,G=P+1,W=k+1,te=0,ne=0,J=new B;for(let ee=0;ee<W;ee++){let oe=ee*H-ie;for(let he=0;he<G;he++){let K=he*w-X;J[_]=K*S,J[m]=oe*y,J[f]=D,l.push(J.x,J.y,J.z),J[_]=0,J[m]=0,J[f]=I>0?1:-1,h.push(J.x,J.y,J.z),u.push(he/P),u.push(1-ee/k),te+=1}}for(let ee=0;ee<k;ee++)for(let oe=0;oe<P;oe++){let he=d+oe+G*ee,K=d+oe+G*(ee+1),se=d+(oe+1)+G*(ee+1),Se=d+(oe+1)+G*ee;c.push(he,K,Se),c.push(K,se,Se),ne+=6}a.addGroup(p,ne,M),p+=ne,d+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function zs(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function gn(s){let e={};for(let t=0;t<s.length;t++){let n=zs(s[t]);for(let i in n)e[i]=n[i]}return e}function c0(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function rf(s){return s.getRenderTarget()===null?s.outputColorSpace:dt.workingColorSpace}var Wn={clone:zs,merge:gn},l0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,h0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Nt=class extends vn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=l0,this.fragmentShader=h0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zs(e.uniforms),this.uniformsGroups=c0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Vo=class extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $e,this.projectionMatrix=new $e,this.projectionMatrixInverse=new $e,this.coordinateSystem=ui}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},kt=class extends Vo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(fr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bs*2*Math.atan(Math.tan(fr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(fr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ws=-90,Ts=1,Vc=class extends Ut{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new kt(ws,Ts,e,t);i.layers=this.layers,this.add(i);let r=new kt(ws,Ts,e,t);r.layers=this.layers,this.add(r);let o=new kt(ws,Ts,e,t);o.layers=this.layers,this.add(o);let a=new kt(ws,Ts,e,t);a.layers=this.layers,this.add(a);let c=new kt(ws,Ts,e,t);c.layers=this.layers,this.add(c);let l=new kt(ws,Ts,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===ui)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Uo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Go=class extends Wt{constructor(e,t,n,i,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Ns,super(e,t,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Gc=class extends Xt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(mr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Qi?mt:un),this.texture=new Go(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:wt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new yr(5,5,5),r=new Nt({name:"CubemapFromEquirect",uniforms:zs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:dn,blending:Vt});r.uniforms.tEquirect.value=t;let o=new lt(i,r),a=t.minFilter;return t.minFilter===Gn&&(t.minFilter=wt),new Vc(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},Sc=new B,u0=new B,d0=new rt,En=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Sc.subVectors(n,t).cross(u0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Sc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||d0.getNormalMatrix(e),i=this.coplanarPoint(Sc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ki=new wn,yo=new B,Mr=class{constructor(e=new En,t=new En,n=new En,i=new En,r=new En,o=new En){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ui){let n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],p=i[8],g=i[9],_=i[10],m=i[11],f=i[12],S=i[13],y=i[14],R=i[15];if(n[0].setComponents(c-r,d-l,m-p,R-f).normalize(),n[1].setComponents(c+r,d+l,m+p,R+f).normalize(),n[2].setComponents(c+o,d+h,m+g,R+S).normalize(),n[3].setComponents(c-o,d-h,m-g,R-S).normalize(),n[4].setComponents(c-a,d-u,m-_,R-y).normalize(),t===ui)n[5].setComponents(c+a,d+u,m+_,R+y).normalize();else if(t===Uo)n[5].setComponents(a,u,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ki)}intersectsSprite(e){return Ki.center.set(0,0,0),Ki.radius=.7071067811865476,Ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ki)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(yo.x=i.normal.x>0?e.max.x:e.min.x,yo.y=i.normal.y>0?e.max.y:e.min.y,yo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(yo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function of(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function f0(s,e){let t=e.isWebGL2,n=new WeakMap;function i(l,h){let u=l.array,d=l.usage,p=u.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,u,d),l.onUploadCallback();let _;if(u instanceof Float32Array)_=s.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=s.SHORT;else if(u instanceof Uint32Array)_=s.UNSIGNED_INT;else if(u instanceof Int32Array)_=s.INT;else if(u instanceof Int8Array)_=s.BYTE;else if(u instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:p}}function r(l,h,u){let d=h.array,p=h._updateRange,g=h.updateRanges;if(s.bindBuffer(u,l),p.count===-1&&g.length===0&&s.bufferSubData(u,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){let f=g[_];t?s.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d,f.start,f.count):s.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}p.count!==-1&&(t?s.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):s.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);h&&(s.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);if(u===void 0)n.set(l,i(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}var In=class s extends qt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=e/a,d=t/c,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){let S=f*d-o;for(let y=0;y<l;y++){let R=y*u-r;g.push(R,-S,0),_.push(0,0,1),m.push(y/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let S=0;S<a;S++){let y=S+l*f,R=S+l*(f+1),F=S+1+l*(f+1),I=S+1+l*f;p.push(y,R,I),p.push(R,F,I)}this.setIndex(p),this.setAttribute("position",new Ct(g,3)),this.setAttribute("normal",new Ct(_,3)),this.setAttribute("uv",new Ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},p0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,m0=`#ifdef USE_ALPHAHASH
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
#endif`,g0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,v0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_0=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,x0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,y0=`#ifdef USE_AOMAP
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
#endif`,M0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,S0=`#ifdef USE_BATCHING
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
#endif`,E0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,b0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,w0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,T0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,A0=`#ifdef USE_IRIDESCENCE
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
#endif`,R0=`#ifdef USE_BUMPMAP
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
#endif`,C0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,P0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,I0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,L0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,D0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,U0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,N0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,O0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,F0=`#define PI 3.141592653589793
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
} // validated`,B0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,z0=`vec3 transformedNormal = objectNormal;
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
#endif`,k0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,H0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,V0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,G0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,W0="gl_FragColor = linearToOutputTexel( gl_FragColor );",X0=`
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
}`,q0=`#ifdef USE_ENVMAP
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
#endif`,Y0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Z0=`#ifdef USE_ENVMAP
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
#endif`,K0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$0=`#ifdef USE_ENVMAP
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
#endif`,j0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,J0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Q0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ev=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tv=`#ifdef USE_GRADIENTMAP
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
}`,nv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,iv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ov=`uniform bool receiveShadow;
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
#endif`,av=`#ifdef USE_ENVMAP
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
#endif`,cv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,uv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dv=`PhysicalMaterial material;
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
#endif`,fv=`struct PhysicalMaterial {
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
}`,pv=`
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
#endif`,mv=`#if defined( RE_IndirectDiffuse )
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
#endif`,gv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_v=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,yv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Mv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ev=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,bv=`#if defined( USE_POINTS_UV )
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
#endif`,wv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Av=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rv=`#ifdef USE_MORPHNORMALS
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
#endif`,Cv=`#ifdef USE_MORPHTARGETS
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
#endif`,Pv=`#ifdef USE_MORPHTARGETS
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
#endif`,Iv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Lv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Dv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ov=`#ifdef USE_NORMALMAP
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
#endif`,Fv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Gv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$v=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Jv=`float getShadowMask() {
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
}`,Qv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,e_=`#ifdef USE_SKINNING
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
#endif`,t_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,n_=`#ifdef USE_SKINNING
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
#endif`,i_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,s_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,r_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,o_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,a_=`#ifdef USE_TRANSMISSION
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
#endif`,c_=`#ifdef USE_TRANSMISSION
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
#endif`,l_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,h_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,u_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,d_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,f_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,p_=`uniform sampler2D t2D;
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
}`,m_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,v_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,__=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,x_=`#include <common>
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
}`,y_=`#if DEPTH_PACKING == 3200
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
}`,M_=`#define DISTANCE
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
}`,S_=`#define DISTANCE
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
}`,E_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,b_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w_=`uniform float scale;
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
}`,T_=`uniform vec3 diffuse;
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
}`,A_=`#include <common>
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
}`,R_=`uniform vec3 diffuse;
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
}`,C_=`#define LAMBERT
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
}`,P_=`#define LAMBERT
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
}`,I_=`#define MATCAP
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
}`,L_=`#define MATCAP
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
}`,D_=`#define NORMAL
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
}`,U_=`#define NORMAL
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
}`,N_=`#define PHONG
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
}`,O_=`#define PHONG
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
}`,F_=`#define STANDARD
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
}`,B_=`#define STANDARD
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
}`,z_=`#define TOON
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
}`,k_=`#define TOON
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
}`,H_=`uniform float size;
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
}`,V_=`uniform vec3 diffuse;
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
}`,G_=`#include <common>
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
}`,W_=`uniform vec3 color;
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
}`,X_=`uniform float rotation;
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
}`,q_=`uniform vec3 diffuse;
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
}`,it={alphahash_fragment:p0,alphahash_pars_fragment:m0,alphamap_fragment:g0,alphamap_pars_fragment:v0,alphatest_fragment:_0,alphatest_pars_fragment:x0,aomap_fragment:y0,aomap_pars_fragment:M0,batching_pars_vertex:S0,batching_vertex:E0,begin_vertex:b0,beginnormal_vertex:w0,bsdfs:T0,iridescence_fragment:A0,bumpmap_pars_fragment:R0,clipping_planes_fragment:C0,clipping_planes_pars_fragment:P0,clipping_planes_pars_vertex:I0,clipping_planes_vertex:L0,color_fragment:D0,color_pars_fragment:U0,color_pars_vertex:N0,color_vertex:O0,common:F0,cube_uv_reflection_fragment:B0,defaultnormal_vertex:z0,displacementmap_pars_vertex:k0,displacementmap_vertex:H0,emissivemap_fragment:V0,emissivemap_pars_fragment:G0,colorspace_fragment:W0,colorspace_pars_fragment:X0,envmap_fragment:q0,envmap_common_pars_fragment:Y0,envmap_pars_fragment:Z0,envmap_pars_vertex:K0,envmap_physical_pars_fragment:av,envmap_vertex:$0,fog_vertex:j0,fog_pars_vertex:J0,fog_fragment:Q0,fog_pars_fragment:ev,gradientmap_pars_fragment:tv,lightmap_fragment:nv,lightmap_pars_fragment:iv,lights_lambert_fragment:sv,lights_lambert_pars_fragment:rv,lights_pars_begin:ov,lights_toon_fragment:cv,lights_toon_pars_fragment:lv,lights_phong_fragment:hv,lights_phong_pars_fragment:uv,lights_physical_fragment:dv,lights_physical_pars_fragment:fv,lights_fragment_begin:pv,lights_fragment_maps:mv,lights_fragment_end:gv,logdepthbuf_fragment:vv,logdepthbuf_pars_fragment:_v,logdepthbuf_pars_vertex:xv,logdepthbuf_vertex:yv,map_fragment:Mv,map_pars_fragment:Sv,map_particle_fragment:Ev,map_particle_pars_fragment:bv,metalnessmap_fragment:wv,metalnessmap_pars_fragment:Tv,morphcolor_vertex:Av,morphnormal_vertex:Rv,morphtarget_pars_vertex:Cv,morphtarget_vertex:Pv,normal_fragment_begin:Iv,normal_fragment_maps:Lv,normal_pars_fragment:Dv,normal_pars_vertex:Uv,normal_vertex:Nv,normalmap_pars_fragment:Ov,clearcoat_normal_fragment_begin:Fv,clearcoat_normal_fragment_maps:Bv,clearcoat_pars_fragment:zv,iridescence_pars_fragment:kv,opaque_fragment:Hv,packing:Vv,premultiplied_alpha_fragment:Gv,project_vertex:Wv,dithering_fragment:Xv,dithering_pars_fragment:qv,roughnessmap_fragment:Yv,roughnessmap_pars_fragment:Zv,shadowmap_pars_fragment:Kv,shadowmap_pars_vertex:$v,shadowmap_vertex:jv,shadowmask_pars_fragment:Jv,skinbase_vertex:Qv,skinning_pars_vertex:e_,skinning_vertex:t_,skinnormal_vertex:n_,specularmap_fragment:i_,specularmap_pars_fragment:s_,tonemapping_fragment:r_,tonemapping_pars_fragment:o_,transmission_fragment:a_,transmission_pars_fragment:c_,uv_pars_fragment:l_,uv_pars_vertex:h_,uv_vertex:u_,worldpos_vertex:d_,background_vert:f_,background_frag:p_,backgroundCube_vert:m_,backgroundCube_frag:g_,cube_vert:v_,cube_frag:__,depth_vert:x_,depth_frag:y_,distanceRGBA_vert:M_,distanceRGBA_frag:S_,equirect_vert:E_,equirect_frag:b_,linedashed_vert:w_,linedashed_frag:T_,meshbasic_vert:A_,meshbasic_frag:R_,meshlambert_vert:C_,meshlambert_frag:P_,meshmatcap_vert:I_,meshmatcap_frag:L_,meshnormal_vert:D_,meshnormal_frag:U_,meshphong_vert:N_,meshphong_frag:O_,meshphysical_vert:F_,meshphysical_frag:B_,meshtoon_vert:z_,meshtoon_frag:k_,points_vert:H_,points_frag:V_,shadow_vert:G_,shadow_frag:W_,sprite_vert:X_,sprite_frag:q_},we={common:{diffuse:{value:new Ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new rt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new rt},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0},uvTransform:{value:new rt}},sprite:{diffuse:{value:new Ce(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}}},Yn={basic:{uniforms:gn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:gn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Ce(0)}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:gn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Ce(0)},specular:{value:new Ce(1118481)},shininess:{value:30}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:gn([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new Ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:gn([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new Ce(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:gn([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:gn([we.points,we.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:gn([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:gn([we.common,we.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:gn([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:gn([we.sprite,we.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distanceRGBA:{uniforms:gn([we.common,we.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distanceRGBA_vert,fragmentShader:it.distanceRGBA_frag},shadow:{uniforms:gn([we.lights,we.fog,{color:{value:new Ce(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};Yn.physical={uniforms:gn([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new rt},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new rt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new rt},sheen:{value:0},sheenColor:{value:new Ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new rt},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new rt},attenuationDistance:{value:0},attenuationColor:{value:new Ce(0)},specularColor:{value:new Ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new rt},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new rt}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};var Mo={r:0,b:0,g:0};function Y_(s,e,t,n,i,r,o){let a=new Ce(0),c=r===!0?0:1,l,h,u=null,d=0,p=null;function g(m,f){let S=!1,y=f.isScene===!0?f.background:null;y&&y.isTexture&&(y=(f.backgroundBlurriness>0?t:e).get(y)),y===null?_(a,c):y&&y.isColor&&(_(y,1),S=!0);let R=s.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||S)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),y&&(y.isCubeTexture||y.mapping===ca)?(h===void 0&&(h=new lt(new yr(1,1,1),new Nt({name:"BackgroundCubeMaterial",uniforms:zs(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(F,I,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=dt.getTransfer(y.colorSpace)!==St,(u!==y||d!==y.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,p=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new lt(new In(2,2),new Nt({name:"BackgroundMaterial",uniforms:zs(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=dt.getTransfer(y.colorSpace)!==St,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||p!==s.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,p=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,f){m.getRGB(Mo,rf(s)),n.buffers.color.setClear(Mo.r,Mo.g,Mo.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),c=f,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(a,c)},render:g}}function Z_(s,e,t,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null),l=c,h=!1;function u(D,G,W,te,ne){let J=!1;if(o){let ee=_(te,W,G);l!==ee&&(l=ee,p(l.object)),J=f(D,te,W,ne),J&&S(D,te,W,ne)}else{let ee=G.wireframe===!0;(l.geometry!==te.id||l.program!==W.id||l.wireframe!==ee)&&(l.geometry=te.id,l.program=W.id,l.wireframe=ee,J=!0)}ne!==null&&t.update(ne,s.ELEMENT_ARRAY_BUFFER),(J||h)&&(h=!1,k(D,G,W,te),ne!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(ne).buffer))}function d(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function p(D){return n.isWebGL2?s.bindVertexArray(D):r.bindVertexArrayOES(D)}function g(D){return n.isWebGL2?s.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function _(D,G,W){let te=W.wireframe===!0,ne=a[D.id];ne===void 0&&(ne={},a[D.id]=ne);let J=ne[G.id];J===void 0&&(J={},ne[G.id]=J);let ee=J[te];return ee===void 0&&(ee=m(d()),J[te]=ee),ee}function m(D){let G=[],W=[],te=[];for(let ne=0;ne<i;ne++)G[ne]=0,W[ne]=0,te[ne]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:W,attributeDivisors:te,object:D,attributes:{},index:null}}function f(D,G,W,te){let ne=l.attributes,J=G.attributes,ee=0,oe=W.getAttributes();for(let he in oe)if(oe[he].location>=0){let se=ne[he],Se=J[he];if(Se===void 0&&(he==="instanceMatrix"&&D.instanceMatrix&&(Se=D.instanceMatrix),he==="instanceColor"&&D.instanceColor&&(Se=D.instanceColor)),se===void 0||se.attribute!==Se||Se&&se.data!==Se.data)return!0;ee++}return l.attributesNum!==ee||l.index!==te}function S(D,G,W,te){let ne={},J=G.attributes,ee=0,oe=W.getAttributes();for(let he in oe)if(oe[he].location>=0){let se=J[he];se===void 0&&(he==="instanceMatrix"&&D.instanceMatrix&&(se=D.instanceMatrix),he==="instanceColor"&&D.instanceColor&&(se=D.instanceColor));let Se={};Se.attribute=se,se&&se.data&&(Se.data=se.data),ne[he]=Se,ee++}l.attributes=ne,l.attributesNum=ee,l.index=te}function y(){let D=l.newAttributes;for(let G=0,W=D.length;G<W;G++)D[G]=0}function R(D){F(D,0)}function F(D,G){let W=l.newAttributes,te=l.enabledAttributes,ne=l.attributeDivisors;W[D]=1,te[D]===0&&(s.enableVertexAttribArray(D),te[D]=1),ne[D]!==G&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,G),ne[D]=G)}function I(){let D=l.newAttributes,G=l.enabledAttributes;for(let W=0,te=G.length;W<te;W++)G[W]!==D[W]&&(s.disableVertexAttribArray(W),G[W]=0)}function P(D,G,W,te,ne,J,ee){ee===!0?s.vertexAttribIPointer(D,G,W,ne,J):s.vertexAttribPointer(D,G,W,te,ne,J)}function k(D,G,W,te){if(n.isWebGL2===!1&&(D.isInstancedMesh||te.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();let ne=te.attributes,J=W.getAttributes(),ee=G.defaultAttributeValues;for(let oe in J){let he=J[oe];if(he.location>=0){let K=ne[oe];if(K===void 0&&(oe==="instanceMatrix"&&D.instanceMatrix&&(K=D.instanceMatrix),oe==="instanceColor"&&D.instanceColor&&(K=D.instanceColor)),K!==void 0){let se=K.normalized,Se=K.itemSize,_e=t.get(K);if(_e===void 0)continue;let Te=_e.buffer,Ue=_e.type,Ge=_e.bytesPerElement,Ne=n.isWebGL2===!0&&(Ue===s.INT||Ue===s.UNSIGNED_INT||K.gpuType===qd);if(K.isInterleavedBufferAttribute){let tt=K.data,Z=tt.stride,At=K.offset;if(tt.isInstancedInterleavedBuffer){for(let Oe=0;Oe<he.locationSize;Oe++)F(he.location+Oe,tt.meshPerAttribute);D.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Oe=0;Oe<he.locationSize;Oe++)R(he.location+Oe);s.bindBuffer(s.ARRAY_BUFFER,Te);for(let Oe=0;Oe<he.locationSize;Oe++)P(he.location+Oe,Se/he.locationSize,Ue,se,Z*Ge,(At+Se/he.locationSize*Oe)*Ge,Ne)}else{if(K.isInstancedBufferAttribute){for(let tt=0;tt<he.locationSize;tt++)F(he.location+tt,K.meshPerAttribute);D.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let tt=0;tt<he.locationSize;tt++)R(he.location+tt);s.bindBuffer(s.ARRAY_BUFFER,Te);for(let tt=0;tt<he.locationSize;tt++)P(he.location+tt,Se/he.locationSize,Ue,se,Se*Ge,Se/he.locationSize*tt*Ge,Ne)}}else if(ee!==void 0){let se=ee[oe];if(se!==void 0)switch(se.length){case 2:s.vertexAttrib2fv(he.location,se);break;case 3:s.vertexAttrib3fv(he.location,se);break;case 4:s.vertexAttrib4fv(he.location,se);break;default:s.vertexAttrib1fv(he.location,se)}}}}I()}function M(){X();for(let D in a){let G=a[D];for(let W in G){let te=G[W];for(let ne in te)g(te[ne].object),delete te[ne];delete G[W]}delete a[D]}}function w(D){if(a[D.id]===void 0)return;let G=a[D.id];for(let W in G){let te=G[W];for(let ne in te)g(te[ne].object),delete te[ne];delete G[W]}delete a[D.id]}function H(D){for(let G in a){let W=a[G];if(W[D.id]===void 0)continue;let te=W[D.id];for(let ne in te)g(te[ne].object),delete te[ne];delete W[D.id]}}function X(){ie(),h=!0,l!==c&&(l=c,p(l.object))}function ie(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:X,resetDefaultState:ie,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfProgram:H,initAttributes:y,enableAttribute:R,disableUnusedAttributes:I}}function K_(s,e,t,n){let i=n.isWebGL2,r;function o(h){r=h}function a(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,d){if(d===0)return;let p,g;if(i)p=s,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,h,u,d),t.update(u,r,d)}function l(h,u,d){if(d===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{p.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function $_(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext",a=t.precision!==void 0?t.precision:"highp",c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),f=s.getParameter(s.MAX_VARYING_VECTORS),S=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=d>0,R=o||e.has("OES_texture_float"),F=y&&R,I=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:S,vertexTextures:y,floatFragmentTextures:R,floatVertexTextures:F,maxSamples:I}}function j_(s){let e=this,t=null,n=0,i=!1,r=!1,o=new En,a=new rt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{let S=r?0:n,y=S*4,R=f.clippingState||null;c.value=R,R=h(g,d,y,p);for(let F=0;F!==y;++F)R[F]=t[F];f.clippingState=R,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,p,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let f=p+_*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let y=0,R=p;y!==_;++y,R+=4)o.copy(u[y]).applyMatrix4(S,a),o.normal.toArray(m,R),m[R+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function J_(s){let e=new WeakMap;function t(o,a){return a===Nc?o.mapping=Ns:a===Oc&&(o.mapping=Os),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Nc||a===Oc)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Gc(c.height/2);return l.fromEquirectangularTexture(s,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Jn=class extends Vo{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ps=4,td=[.125,.215,.35,.446,.526,.582],ji=20,Ec=new Jn,nd=new Ce,bc=null,wc=0,Tc=0,$i=(1+Math.sqrt(5))/2,As=1/$i,id=[new B(1,1,1),new B(-1,1,1),new B(1,1,-1),new B(-1,1,-1),new B(0,$i,As),new B(0,$i,-As),new B(As,0,$i),new B(-As,0,$i),new B($i,As,0),new B(-$i,As,0)],Qn=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){bc=this._renderer.getRenderTarget(),wc=this._renderer.getActiveCubeFace(),Tc=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=od(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(bc,wc,Tc),e.scissorTest=!1,So(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ns||e.mapping===Os?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bc=this._renderer.getRenderTarget(),wc=this._renderer.getActiveCubeFace(),Tc=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:wt,minFilter:wt,generateMipmaps:!1,type:Dt,format:hn,colorSpace:Tt,depthBuffer:!1},i=sd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sd(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Q_(r)),this._blurMaterial=ex(r,e,t)}return i}_compileMaterial(e){let t=new lt(this._lodPlanes[0],e);this._renderer.compile(t,Ec)}_sceneToCubeUV(e,t,n,i){let a=new kt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(nd),h.toneMapping=Kn,h.autoClear=!1;let p=new zt({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1}),g=new lt(new yr,p),_=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(nd),_=!0);for(let f=0;f<6;f++){let S=f%3;S===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):S===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));let y=this._cubeSize;So(i,S*y,f>2?y:0,y,y),h.setRenderTarget(i),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Ns||e.mapping===Os;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=od()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rd());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new lt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;So(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Ec)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=id[(i-1)%id.length];this._blur(e,i-1,i,r,o)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new lt(this._lodPlanes[i],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ji-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ji;m>ji&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ji}`);let f=[],S=0;for(let P=0;P<ji;++P){let k=P/_,M=Math.exp(-k*k/2);f.push(M),P===0?S+=M:P<m&&(S+=2*M)}for(let P=0;P<f.length;P++)f[P]=f[P]/S;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;let R=this._sizeLods[i],F=3*R*(i>y-Ps?i-y+Ps:0),I=4*(this._cubeSize-R);So(t,F,I,3*R,2*R),c.setRenderTarget(t),c.render(u,Ec)}};function Q_(s){let e=[],t=[],n=[],i=s,r=s-Ps+1+td.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let c=1/a;o>s-Ps?c=td[o-s+Ps-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,S=new Float32Array(_*g*p),y=new Float32Array(m*g*p),R=new Float32Array(f*g*p);for(let I=0;I<p;I++){let P=I%3*2/3-1,k=I>2?0:-1,M=[P,k,0,P+2/3,k,0,P+2/3,k+1,0,P,k,0,P+2/3,k+1,0,P,k+1,0];S.set(M,_*g*I),y.set(d,m*g*I);let w=[I,I,I,I,I,I];R.set(w,f*g*I)}let F=new qt;F.setAttribute("position",new Lt(S,_)),F.setAttribute("uv",new Lt(y,m)),F.setAttribute("faceIndex",new Lt(R,f)),e.push(F),i>Ps&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function sd(s,e,t){let n=new Xt(s,e,t);return n.texture.mapping=ca,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function So(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function ex(s,e,t){let n=new Float32Array(ji),i=new B(0,1,0);return new Nt({name:"SphericalGaussianBlur",defines:{n:ji,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Sl(),fragmentShader:`

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
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function rd(){return new Nt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sl(),fragmentShader:`

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
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function od(){return new Nt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function Sl(){return`

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
	`}function tx(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Nc||c===Oc,h=c===Ns||c===Os;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new Qn(s)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{let u=a.image;if(l&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new Qn(s));let d=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function i(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function nx(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function ix(s,e,t,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete i[d.id];let p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let g in d)e.update(d[g],s.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],s.ARRAY_BUFFER)}}function l(u){let d=[],p=u.index,g=u.attributes.position,_=0;if(p!==null){let S=p.array;_=p.version;for(let y=0,R=S.length;y<R;y+=3){let F=S[y+0],I=S[y+1],P=S[y+2];d.push(F,I,I,P,P,F)}}else if(g!==void 0){let S=g.array;_=g.version;for(let y=0,R=S.length/3-1;y<R;y+=3){let F=y+0,I=y+1,P=y+2;d.push(F,I,I,P,P,F)}}else return;let m=new(nf(d)?Ho:ko)(d,1);m.version=_;let f=r.get(u);f&&e.remove(f),r.set(u,m)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function sx(s,e,t,n){let i=n.isWebGL2,r;function o(p){r=p}let a,c;function l(p){a=p.type,c=p.bytesPerElement}function h(p,g){s.drawElements(r,g,a,p*c),t.update(g,r,1)}function u(p,g,_){if(_===0)return;let m,f;if(i)m=s,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](r,g,a,p*c,_),t.update(g,r,_)}function d(p,g,_){if(_===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<_;f++)this.render(p[f]/c,g[f]);else{m.multiDrawElementsWEBGL(r,g,0,a,p,0,_);let f=0;for(let S=0;S<_;S++)f+=g[S];t.update(f,r,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function rx(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function ox(s,e){return s[0]-e[0]}function ax(s,e){return Math.abs(e[1])-Math.abs(s[1])}function cx(s,e,t){let n={},i=new Float32Array(8),r=new WeakMap,o=new Et,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){let d=l.morphTargetInfluences;if(e.isWebGL2===!0){let p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=p!==void 0?p.length:0,_=r.get(h);if(_===void 0||_.count!==g){let D=function(){X.dispose(),r.delete(h),h.removeEventListener("dispose",D)};_!==void 0&&_.texture.dispose();let S=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,R=h.morphAttributes.color!==void 0,F=h.morphAttributes.position||[],I=h.morphAttributes.normal||[],P=h.morphAttributes.color||[],k=0;S===!0&&(k=1),y===!0&&(k=2),R===!0&&(k=3);let M=h.attributes.position.count*k,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let H=new Float32Array(M*w*4*g),X=new Bo(H,M,w,g);X.type=nn,X.needsUpdate=!0;let ie=k*4;for(let G=0;G<g;G++){let W=F[G],te=I[G],ne=P[G],J=M*w*4*G;for(let ee=0;ee<W.count;ee++){let oe=ee*ie;S===!0&&(o.fromBufferAttribute(W,ee),H[J+oe+0]=o.x,H[J+oe+1]=o.y,H[J+oe+2]=o.z,H[J+oe+3]=0),y===!0&&(o.fromBufferAttribute(te,ee),H[J+oe+4]=o.x,H[J+oe+5]=o.y,H[J+oe+6]=o.z,H[J+oe+7]=0),R===!0&&(o.fromBufferAttribute(ne,ee),H[J+oe+8]=o.x,H[J+oe+9]=o.y,H[J+oe+10]=o.z,H[J+oe+11]=ne.itemSize===4?o.w:1)}}_={count:g,texture:X,size:new Pe(M,w)},r.set(h,_),h.addEventListener("dispose",D)}let m=0;for(let S=0;S<d.length;S++)m+=d[S];let f=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(s,"morphTargetBaseInfluence",f),u.getUniforms().setValue(s,"morphTargetInfluences",d),u.getUniforms().setValue(s,"morphTargetsTexture",_.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",_.size)}else{let p=d===void 0?0:d.length,g=n[h.id];if(g===void 0||g.length!==p){g=[];for(let y=0;y<p;y++)g[y]=[y,0];n[h.id]=g}for(let y=0;y<p;y++){let R=g[y];R[0]=y,R[1]=d[y]}g.sort(ax);for(let y=0;y<8;y++)y<p&&g[y][1]?(a[y][0]=g[y][0],a[y][1]=g[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(ox);let _=h.morphAttributes.position,m=h.morphAttributes.normal,f=0;for(let y=0;y<8;y++){let R=a[y],F=R[0],I=R[1];F!==Number.MAX_SAFE_INTEGER&&I?(_&&h.getAttribute("morphTarget"+y)!==_[F]&&h.setAttribute("morphTarget"+y,_[F]),m&&h.getAttribute("morphNormal"+y)!==m[F]&&h.setAttribute("morphNormal"+y,m[F]),i[y]=I,f+=I):(_&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),m&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),i[y]=0)}let S=h.morphTargetsRelative?1:1-f;u.getUniforms().setValue(s,"morphTargetBaseInfluence",S),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function lx(s,e,t,n){let i=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var ks=class extends Wt{constructor(e,t,n,i,r,o,a,c,l,h){if(h=h!==void 0?h:Ji,h!==Ji&&h!==Ci)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ji&&(n=Ai),n===void 0&&h===Ci&&(n=di),super(null,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:It,this.minFilter=c!==void 0?c:It,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},af=new Wt,cf=new ks(1,1);cf.compareFunction=tf;var lf=new Bo,hf=new Hc,uf=new Go,ad=[],cd=[],ld=new Float32Array(16),hd=new Float32Array(9),ud=new Float32Array(4);function $s(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=ad[i];if(r===void 0&&(r=new Float32Array(i),ad[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Yt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Zt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function ua(s,e){let t=cd[e];t===void 0&&(t=new Int32Array(e),cd[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function hx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function ux(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;s.uniform2fv(this.addr,e),Zt(t,e)}}function dx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;s.uniform3fv(this.addr,e),Zt(t,e)}}function fx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;s.uniform4fv(this.addr,e),Zt(t,e)}}function px(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;ud.set(n),s.uniformMatrix2fv(this.addr,!1,ud),Zt(t,n)}}function mx(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;hd.set(n),s.uniformMatrix3fv(this.addr,!1,hd),Zt(t,n)}}function gx(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;ld.set(n),s.uniformMatrix4fv(this.addr,!1,ld),Zt(t,n)}}function vx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function _x(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;s.uniform2iv(this.addr,e),Zt(t,e)}}function xx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;s.uniform3iv(this.addr,e),Zt(t,e)}}function yx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;s.uniform4iv(this.addr,e),Zt(t,e)}}function Mx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Sx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;s.uniform2uiv(this.addr,e),Zt(t,e)}}function Ex(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;s.uniform3uiv(this.addr,e),Zt(t,e)}}function bx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;s.uniform4uiv(this.addr,e),Zt(t,e)}}function wx(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?cf:af;t.setTexture2D(e||r,i)}function Tx(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||hf,i)}function Ax(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||uf,i)}function Rx(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||lf,i)}function Cx(s){switch(s){case 5126:return hx;case 35664:return ux;case 35665:return dx;case 35666:return fx;case 35674:return px;case 35675:return mx;case 35676:return gx;case 5124:case 35670:return vx;case 35667:case 35671:return _x;case 35668:case 35672:return xx;case 35669:case 35673:return yx;case 5125:return Mx;case 36294:return Sx;case 36295:return Ex;case 36296:return bx;case 35678:case 36198:case 36298:case 36306:case 35682:return wx;case 35679:case 36299:case 36307:return Tx;case 35680:case 36300:case 36308:case 36293:return Ax;case 36289:case 36303:case 36311:case 36292:return Rx}}function Px(s,e){s.uniform1fv(this.addr,e)}function Ix(s,e){let t=$s(e,this.size,2);s.uniform2fv(this.addr,t)}function Lx(s,e){let t=$s(e,this.size,3);s.uniform3fv(this.addr,t)}function Dx(s,e){let t=$s(e,this.size,4);s.uniform4fv(this.addr,t)}function Ux(s,e){let t=$s(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Nx(s,e){let t=$s(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Ox(s,e){let t=$s(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Fx(s,e){s.uniform1iv(this.addr,e)}function Bx(s,e){s.uniform2iv(this.addr,e)}function zx(s,e){s.uniform3iv(this.addr,e)}function kx(s,e){s.uniform4iv(this.addr,e)}function Hx(s,e){s.uniform1uiv(this.addr,e)}function Vx(s,e){s.uniform2uiv(this.addr,e)}function Gx(s,e){s.uniform3uiv(this.addr,e)}function Wx(s,e){s.uniform4uiv(this.addr,e)}function Xx(s,e,t){let n=this.cache,i=e.length,r=ua(t,i);Yt(n,r)||(s.uniform1iv(this.addr,r),Zt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||af,r[o])}function qx(s,e,t){let n=this.cache,i=e.length,r=ua(t,i);Yt(n,r)||(s.uniform1iv(this.addr,r),Zt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||hf,r[o])}function Yx(s,e,t){let n=this.cache,i=e.length,r=ua(t,i);Yt(n,r)||(s.uniform1iv(this.addr,r),Zt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||uf,r[o])}function Zx(s,e,t){let n=this.cache,i=e.length,r=ua(t,i);Yt(n,r)||(s.uniform1iv(this.addr,r),Zt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||lf,r[o])}function Kx(s){switch(s){case 5126:return Px;case 35664:return Ix;case 35665:return Lx;case 35666:return Dx;case 35674:return Ux;case 35675:return Nx;case 35676:return Ox;case 5124:case 35670:return Fx;case 35667:case 35671:return Bx;case 35668:case 35672:return zx;case 35669:case 35673:return kx;case 5125:return Hx;case 36294:return Vx;case 36295:return Gx;case 36296:return Wx;case 35678:case 36198:case 36298:case 36306:case 35682:return Xx;case 35679:case 36299:case 36307:return qx;case 35680:case 36300:case 36308:case 36293:return Yx;case 36289:case 36303:case 36311:case 36292:return Zx}}var Wc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Cx(t.type)}},Xc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Kx(t.type)}},qc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},Ac=/(\w+)(\])?(\[|\.)?/g;function dd(s,e){s.seq.push(e),s.map[e.id]=e}function $x(s,e,t){let n=s.name,i=n.length;for(Ac.lastIndex=0;;){let r=Ac.exec(n),o=Ac.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){dd(t,l===void 0?new Wc(a,s,e):new Xc(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new qc(a),dd(t,u)),t=u}}}var Us=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);$x(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function fd(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var jx=37297,Jx=0;function Qx(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function ey(s){let e=dt.getPrimaries(dt.workingColorSpace),t=dt.getPrimaries(s),n;switch(e===t?n="":e===Do&&t===Lo?n="LinearDisplayP3ToLinearSRGB":e===Lo&&t===Do&&(n="LinearSRGBToLinearDisplayP3"),s){case Tt:case ha:return[n,"LinearTransferOETF"];case mt:case yl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function pd(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+Qx(s.getShaderSource(e),o)}else return i}function ty(s,e){let t=ey(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function ny(s,e){let t;switch(e){case Dr:t="Linear";break;case pl:t="Reinhard";break;case ml:t="OptimizedCineon";break;case Ks:t="ACESFilmic";break;case rs:t="AgX";break;case hg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function iy(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Is).join(`
`)}function sy(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Is).join(`
`)}function ry(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function oy(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Is(s){return s!==""}function md(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gd(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var ay=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yc(s){return s.replace(ay,ly)}var cy=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ly(s,e){let t=it[e];if(t===void 0){let n=cy.get(e);if(n!==void 0)t=it[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Yc(t)}var hy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vd(s){return s.replace(hy,uy)}function uy(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function _d(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function dy(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Gd?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Vm?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Hn&&(e="SHADOWMAP_TYPE_VSM"),e}function fy(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ns:case Os:e="ENVMAP_TYPE_CUBE";break;case ca:e="ENVMAP_TYPE_CUBE_UV";break}return e}function py(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Os:e="ENVMAP_MODE_REFRACTION";break}return e}function my(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Wd:e="ENVMAP_BLENDING_MULTIPLY";break;case cg:e="ENVMAP_BLENDING_MIX";break;case lg:e="ENVMAP_BLENDING_ADD";break}return e}function gy(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function vy(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=dy(t),l=fy(t),h=py(t),u=my(t),d=gy(t),p=t.isWebGL2?"":iy(t),g=sy(t),_=ry(r),m=i.createProgram(),f,S,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Is).join(`
`),f.length>0&&(f+=`
`),S=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Is).join(`
`),S.length>0&&(S+=`
`)):(f=[_d(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Is).join(`
`),S=[p,_d(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Kn?"#define TONE_MAPPING":"",t.toneMapping!==Kn?it.tonemapping_pars_fragment:"",t.toneMapping!==Kn?ny("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,ty("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Is).join(`
`)),o=Yc(o),o=md(o,t),o=gd(o,t),a=Yc(a),a=md(a,t),a=gd(a,t),o=vd(o),a=vd(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,S=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Fu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);let R=y+f+o,F=y+S+a,I=fd(i,i.VERTEX_SHADER,R),P=fd(i,i.FRAGMENT_SHADER,F);i.attachShader(m,I),i.attachShader(m,P),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function k(X){if(s.debug.checkShaderErrors){let ie=i.getProgramInfoLog(m).trim(),D=i.getShaderInfoLog(I).trim(),G=i.getShaderInfoLog(P).trim(),W=!0,te=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(W=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,I,P);else{let ne=pd(i,I,"vertex"),J=pd(i,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+ie+`
`+ne+`
`+J)}else ie!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ie):(D===""||G==="")&&(te=!1);te&&(X.diagnostics={runnable:W,programLog:ie,vertexShader:{log:D,prefix:f},fragmentShader:{log:G,prefix:S}})}i.deleteShader(I),i.deleteShader(P),M=new Us(i,m),w=oy(i,m)}let M;this.getUniforms=function(){return M===void 0&&k(this),M};let w;this.getAttributes=function(){return w===void 0&&k(this),w};let H=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=i.getProgramParameter(m,jx)),H},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Jx++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=I,this.fragmentShader=P,this}var _y=0,Zc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Kc(e),t.set(e,n)),n}},Kc=class{constructor(e){this.id=_y++,this.code=e,this.usedTimes=0}};function xy(s,e,t,n,i,r,o){let a=new xr,c=new Zc,l=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures,p=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function m(M,w,H,X,ie){let D=X.fog,G=ie.geometry,W=M.isMeshStandardMaterial?X.environment:null,te=(M.isMeshStandardMaterial?t:e).get(M.envMap||W),ne=te&&te.mapping===ca?te.image.height:null,J=g[M.type];M.precision!==null&&(p=i.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));let ee=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,oe=ee!==void 0?ee.length:0,he=0;G.morphAttributes.position!==void 0&&(he=1),G.morphAttributes.normal!==void 0&&(he=2),G.morphAttributes.color!==void 0&&(he=3);let K,se,Se,_e;if(J){let Qt=Yn[J];K=Qt.vertexShader,se=Qt.fragmentShader}else K=M.vertexShader,se=M.fragmentShader,c.update(M),Se=c.getVertexShaderID(M),_e=c.getFragmentShaderID(M);let Te=s.getRenderTarget(),Ue=ie.isInstancedMesh===!0,Ge=ie.isBatchedMesh===!0,Ne=!!M.map,tt=!!M.matcap,Z=!!te,At=!!M.aoMap,Oe=!!M.lightMap,We=!!M.bumpMap,De=!!M.normalMap,gt=!!M.displacementMap,Ze=!!M.emissiveMap,T=!!M.metalnessMap,E=!!M.roughnessMap,$=M.anisotropy>0,fe=M.clearcoat>0,le=M.iridescence>0,de=M.sheen>0,Ie=M.transmission>0,be=$&&!!M.anisotropyMap,Ae=fe&&!!M.clearcoatMap,Fe=fe&&!!M.clearcoatNormalMap,Xe=fe&&!!M.clearcoatRoughnessMap,ce=le&&!!M.iridescenceMap,Je=le&&!!M.iridescenceThicknessMap,L=de&&!!M.sheenColorMap,re=de&&!!M.sheenRoughnessMap,pe=!!M.specularMap,me=!!M.specularColorMap,Le=!!M.specularIntensityMap,ze=Ie&&!!M.transmissionMap,Be=Ie&&!!M.thicknessMap,Ke=!!M.gradientMap,q=!!M.alphaMap,z=M.alphaTest>0,xe=!!M.alphaHash,ye=!!M.extensions,qe=!!G.attributes.uv1,ke=!!G.attributes.uv2,ct=!!G.attributes.uv3,ht=Kn;return M.toneMapped&&(Te===null||Te.isXRRenderTarget===!0)&&(ht=s.toneMapping),{isWebGL2:h,shaderID:J,shaderType:M.type,shaderName:M.name,vertexShader:K,fragmentShader:se,defines:M.defines,customVertexShaderID:Se,customFragmentShaderID:_e,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Ge,instancing:Ue,instancingColor:Ue&&ie.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Te===null?s.outputColorSpace:Te.isXRRenderTarget===!0?Te.texture.colorSpace:Tt,map:Ne,matcap:tt,envMap:Z,envMapMode:Z&&te.mapping,envMapCubeUVHeight:ne,aoMap:At,lightMap:Oe,bumpMap:We,normalMap:De,displacementMap:d&&gt,emissiveMap:Ze,normalMapObjectSpace:De&&M.normalMapType===Sg,normalMapTangentSpace:De&&M.normalMapType===xl,metalnessMap:T,roughnessMap:E,anisotropy:$,anisotropyMap:be,clearcoat:fe,clearcoatMap:Ae,clearcoatNormalMap:Fe,clearcoatRoughnessMap:Xe,iridescence:le,iridescenceMap:ce,iridescenceThicknessMap:Je,sheen:de,sheenColorMap:L,sheenRoughnessMap:re,specularMap:pe,specularColorMap:me,specularIntensityMap:Le,transmission:Ie,transmissionMap:ze,thicknessMap:Be,gradientMap:Ke,opaque:M.transparent===!1&&M.blending===Ls,alphaMap:q,alphaTest:z,alphaHash:xe,combine:M.combine,mapUv:Ne&&_(M.map.channel),aoMapUv:At&&_(M.aoMap.channel),lightMapUv:Oe&&_(M.lightMap.channel),bumpMapUv:We&&_(M.bumpMap.channel),normalMapUv:De&&_(M.normalMap.channel),displacementMapUv:gt&&_(M.displacementMap.channel),emissiveMapUv:Ze&&_(M.emissiveMap.channel),metalnessMapUv:T&&_(M.metalnessMap.channel),roughnessMapUv:E&&_(M.roughnessMap.channel),anisotropyMapUv:be&&_(M.anisotropyMap.channel),clearcoatMapUv:Ae&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Fe&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Xe&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:L&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:re&&_(M.sheenRoughnessMap.channel),specularMapUv:pe&&_(M.specularMap.channel),specularColorMapUv:me&&_(M.specularColorMap.channel),specularIntensityMapUv:Le&&_(M.specularIntensityMap.channel),transmissionMapUv:ze&&_(M.transmissionMap.channel),thicknessMapUv:Be&&_(M.thicknessMap.channel),alphaMapUv:q&&_(M.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(De||$),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,vertexUv1s:qe,vertexUv2s:ke,vertexUv3s:ct,pointsUvs:ie.isPoints===!0&&!!G.attributes.uv&&(Ne||q),fog:!!D,useFog:M.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:ie.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:he,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&H.length>0,shadowMapType:s.shadowMap.type,toneMapping:ht,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Ne&&M.map.isVideoTexture===!0&&dt.getTransfer(M.map.colorSpace)===St,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===bn,flipSided:M.side===dn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ye&&M.extensions.derivatives===!0,extensionFragDepth:ye&&M.extensions.fragDepth===!0,extensionDrawBuffers:ye&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ye&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ye&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function f(M){let w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(let H in M.defines)w.push(H),w.push(M.defines[H]);return M.isRawShaderMaterial===!1&&(S(w,M),y(w,M),w.push(s.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function S(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function y(M,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),M.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function R(M){let w=g[M.type],H;if(w){let X=Yn[w];H=Wn.clone(X.uniforms)}else H=M.uniforms;return H}function F(M,w){let H;for(let X=0,ie=l.length;X<ie;X++){let D=l[X];if(D.cacheKey===w){H=D,++H.usedTimes;break}}return H===void 0&&(H=new vy(s,w,M,r),l.push(H)),H}function I(M){if(--M.usedTimes===0){let w=l.indexOf(M);l[w]=l[l.length-1],l.pop(),M.destroy()}}function P(M){c.remove(M)}function k(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:R,acquireProgram:F,releaseProgram:I,releaseShaderCache:P,programs:l,dispose:k}}function yy(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function My(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function xd(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function yd(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,p,g,_,m){let f=s[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),e++,f}function a(u,d,p,g,_,m){let f=o(u,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):t.push(f)}function c(u,d,p,g,_,m){let f=o(u,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):t.unshift(f)}function l(u,d){t.length>1&&t.sort(u||My),n.length>1&&n.sort(d||xd),i.length>1&&i.sort(d||xd)}function h(){for(let u=e,d=s.length;u<d;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function Sy(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new yd,s.set(n,[o])):i>=r.length?(o=new yd,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Ey(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new Ce};break;case"SpotLight":t={position:new B,direction:new B,color:new Ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Ce,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Ce,groundColor:new Ce};break;case"RectAreaLight":t={color:new Ce,position:new B,halfWidth:new B,halfHeight:new B};break}return s[e.id]=t,t}}}function by(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var wy=0;function Ty(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Ay(s,e){let t=new Ey,n=by(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new B);let r=new B,o=new $e,a=new $e;function c(h,u){let d=0,p=0,g=0;for(let X=0;X<9;X++)i.probe[X].set(0,0,0);let _=0,m=0,f=0,S=0,y=0,R=0,F=0,I=0,P=0,k=0,M=0;h.sort(Ty);let w=u===!0?Math.PI:1;for(let X=0,ie=h.length;X<ie;X++){let D=h[X],G=D.color,W=D.intensity,te=D.distance,ne=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=G.r*W*w,p+=G.g*W*w,g+=G.b*W*w;else if(D.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(D.sh.coefficients[J],W);M++}else if(D.isDirectionalLight){let J=t.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity*w),D.castShadow){let ee=D.shadow,oe=n.get(D);oe.shadowBias=ee.bias,oe.shadowNormalBias=ee.normalBias,oe.shadowRadius=ee.radius,oe.shadowMapSize=ee.mapSize,i.directionalShadow[_]=oe,i.directionalShadowMap[_]=ne,i.directionalShadowMatrix[_]=D.shadow.matrix,R++}i.directional[_]=J,_++}else if(D.isSpotLight){let J=t.get(D);J.position.setFromMatrixPosition(D.matrixWorld),J.color.copy(G).multiplyScalar(W*w),J.distance=te,J.coneCos=Math.cos(D.angle),J.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),J.decay=D.decay,i.spot[f]=J;let ee=D.shadow;if(D.map&&(i.spotLightMap[P]=D.map,P++,ee.updateMatrices(D),D.castShadow&&k++),i.spotLightMatrix[f]=ee.matrix,D.castShadow){let oe=n.get(D);oe.shadowBias=ee.bias,oe.shadowNormalBias=ee.normalBias,oe.shadowRadius=ee.radius,oe.shadowMapSize=ee.mapSize,i.spotShadow[f]=oe,i.spotShadowMap[f]=ne,I++}f++}else if(D.isRectAreaLight){let J=t.get(D);J.color.copy(G).multiplyScalar(W),J.halfWidth.set(D.width*.5,0,0),J.halfHeight.set(0,D.height*.5,0),i.rectArea[S]=J,S++}else if(D.isPointLight){let J=t.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity*w),J.distance=D.distance,J.decay=D.decay,D.castShadow){let ee=D.shadow,oe=n.get(D);oe.shadowBias=ee.bias,oe.shadowNormalBias=ee.normalBias,oe.shadowRadius=ee.radius,oe.shadowMapSize=ee.mapSize,oe.shadowCameraNear=ee.camera.near,oe.shadowCameraFar=ee.camera.far,i.pointShadow[m]=oe,i.pointShadowMap[m]=ne,i.pointShadowMatrix[m]=D.shadow.matrix,F++}i.point[m]=J,m++}else if(D.isHemisphereLight){let J=t.get(D);J.skyColor.copy(D.color).multiplyScalar(W*w),J.groundColor.copy(D.groundColor).multiplyScalar(W*w),i.hemi[y]=J,y++}}S>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=we.LTC_FLOAT_1,i.rectAreaLTC2=we.LTC_FLOAT_2):(i.rectAreaLTC1=we.LTC_HALF_1,i.rectAreaLTC2=we.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=we.LTC_FLOAT_1,i.rectAreaLTC2=we.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=we.LTC_HALF_1,i.rectAreaLTC2=we.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=g;let H=i.hash;(H.directionalLength!==_||H.pointLength!==m||H.spotLength!==f||H.rectAreaLength!==S||H.hemiLength!==y||H.numDirectionalShadows!==R||H.numPointShadows!==F||H.numSpotShadows!==I||H.numSpotMaps!==P||H.numLightProbes!==M)&&(i.directional.length=_,i.spot.length=f,i.rectArea.length=S,i.point.length=m,i.hemi.length=y,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.pointShadow.length=F,i.pointShadowMap.length=F,i.spotShadow.length=I,i.spotShadowMap.length=I,i.directionalShadowMatrix.length=R,i.pointShadowMatrix.length=F,i.spotLightMatrix.length=I+P-k,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=k,i.numLightProbes=M,H.directionalLength=_,H.pointLength=m,H.spotLength=f,H.rectAreaLength=S,H.hemiLength=y,H.numDirectionalShadows=R,H.numPointShadows=F,H.numSpotShadows=I,H.numSpotMaps=P,H.numLightProbes=M,i.version=wy++)}function l(h,u){let d=0,p=0,g=0,_=0,m=0,f=u.matrixWorldInverse;for(let S=0,y=h.length;S<y;S++){let R=h[S];if(R.isDirectionalLight){let F=i.directional[d];F.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),F.direction.sub(r),F.direction.transformDirection(f),d++}else if(R.isSpotLight){let F=i.spot[g];F.position.setFromMatrixPosition(R.matrixWorld),F.position.applyMatrix4(f),F.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),F.direction.sub(r),F.direction.transformDirection(f),g++}else if(R.isRectAreaLight){let F=i.rectArea[_];F.position.setFromMatrixPosition(R.matrixWorld),F.position.applyMatrix4(f),a.identity(),o.copy(R.matrixWorld),o.premultiply(f),a.extractRotation(o),F.halfWidth.set(R.width*.5,0,0),F.halfHeight.set(0,R.height*.5,0),F.halfWidth.applyMatrix4(a),F.halfHeight.applyMatrix4(a),_++}else if(R.isPointLight){let F=i.point[p];F.position.setFromMatrixPosition(R.matrixWorld),F.position.applyMatrix4(f),p++}else if(R.isHemisphereLight){let F=i.hemi[m];F.direction.setFromMatrixPosition(R.matrixWorld),F.direction.transformDirection(f),m++}}}return{setup:c,setupView:l,state:i}}function Md(s,e){let t=new Ay(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Ry(s,e){let t=new WeakMap;function n(r,o=0){let a=t.get(r),c;return a===void 0?(c=new Md(s,e),t.set(r,[c])):o>=a.length?(c=new Md(s,e),a.push(c)):c=a[o],c}function i(){t=new WeakMap}return{get:n,dispose:i}}var Sr=class extends vn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},$c=class extends vn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Cy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Py=`uniform sampler2D shadow_pass;
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
}`;function Iy(s,e,t){let n=new Mr,i=new Pe,r=new Pe,o=new Et,a=new Sr({depthPacking:Mg}),c=new $c,l={},h=t.maxTextureSize,u={[Pn]:dn,[dn]:Pn,[bn]:bn},d=new Nt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:Cy,fragmentShader:Py}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new qt;g.setAttribute("position",new Lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new lt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gd;let f=this.type;this.render=function(I,P,k){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||I.length===0)return;let M=s.getRenderTarget(),w=s.getActiveCubeFace(),H=s.getActiveMipmapLevel(),X=s.state;X.setBlending(Vt),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);let ie=f!==Hn&&this.type===Hn,D=f===Hn&&this.type!==Hn;for(let G=0,W=I.length;G<W;G++){let te=I[G],ne=te.shadow;if(ne===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(ne.autoUpdate===!1&&ne.needsUpdate===!1)continue;i.copy(ne.mapSize);let J=ne.getFrameExtents();if(i.multiply(J),r.copy(ne.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/J.x),i.x=r.x*J.x,ne.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/J.y),i.y=r.y*J.y,ne.mapSize.y=r.y)),ne.map===null||ie===!0||D===!0){let oe=this.type!==Hn?{minFilter:It,magFilter:It}:{};ne.map!==null&&ne.map.dispose(),ne.map=new Xt(i.x,i.y,oe),ne.map.texture.name=te.name+".shadowMap",ne.camera.updateProjectionMatrix()}s.setRenderTarget(ne.map),s.clear();let ee=ne.getViewportCount();for(let oe=0;oe<ee;oe++){let he=ne.getViewport(oe);o.set(r.x*he.x,r.y*he.y,r.x*he.z,r.y*he.w),X.viewport(o),ne.updateMatrices(te,oe),n=ne.getFrustum(),R(P,k,ne.camera,te,this.type)}ne.isPointLightShadow!==!0&&this.type===Hn&&S(ne,k),ne.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(M,w,H)};function S(I,P){let k=e.update(_);d.defines.VSM_SAMPLES!==I.blurSamples&&(d.defines.VSM_SAMPLES=I.blurSamples,p.defines.VSM_SAMPLES=I.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new Xt(i.x,i.y)),d.uniforms.shadow_pass.value=I.map.texture,d.uniforms.resolution.value=I.mapSize,d.uniforms.radius.value=I.radius,s.setRenderTarget(I.mapPass),s.clear(),s.renderBufferDirect(P,null,k,d,_,null),p.uniforms.shadow_pass.value=I.mapPass.texture,p.uniforms.resolution.value=I.mapSize,p.uniforms.radius.value=I.radius,s.setRenderTarget(I.map),s.clear(),s.renderBufferDirect(P,null,k,p,_,null)}function y(I,P,k,M){let w=null,H=k.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(H!==void 0)w=H;else if(w=k.isPointLight===!0?c:a,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){let X=w.uuid,ie=P.uuid,D=l[X];D===void 0&&(D={},l[X]=D);let G=D[ie];G===void 0&&(G=w.clone(),D[ie]=G,P.addEventListener("dispose",F)),w=G}if(w.visible=P.visible,w.wireframe=P.wireframe,M===Hn?w.side=P.shadowSide!==null?P.shadowSide:P.side:w.side=P.shadowSide!==null?P.shadowSide:u[P.side],w.alphaMap=P.alphaMap,w.alphaTest=P.alphaTest,w.map=P.map,w.clipShadows=P.clipShadows,w.clippingPlanes=P.clippingPlanes,w.clipIntersection=P.clipIntersection,w.displacementMap=P.displacementMap,w.displacementScale=P.displacementScale,w.displacementBias=P.displacementBias,w.wireframeLinewidth=P.wireframeLinewidth,w.linewidth=P.linewidth,k.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let X=s.properties.get(w);X.light=k}return w}function R(I,P,k,M,w){if(I.visible===!1)return;if(I.layers.test(P.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&w===Hn)&&(!I.frustumCulled||n.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,I.matrixWorld);let ie=e.update(I),D=I.material;if(Array.isArray(D)){let G=ie.groups;for(let W=0,te=G.length;W<te;W++){let ne=G[W],J=D[ne.materialIndex];if(J&&J.visible){let ee=y(I,J,M,w);I.onBeforeShadow(s,I,P,k,ie,ee,ne),s.renderBufferDirect(k,null,ie,ee,I,ne),I.onAfterShadow(s,I,P,k,ie,ee,ne)}}}else if(D.visible){let G=y(I,D,M,w);I.onBeforeShadow(s,I,P,k,ie,G,null),s.renderBufferDirect(k,null,ie,G,I,null),I.onAfterShadow(s,I,P,k,ie,G,null)}}let X=I.children;for(let ie=0,D=X.length;ie<D;ie++)R(X[ie],P,k,M,w)}function F(I){I.target.removeEventListener("dispose",F);for(let k in l){let M=l[k],w=I.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}function Ly(s,e,t){let n=t.isWebGL2;function i(){let z=!1,xe=new Et,ye=null,qe=new Et(0,0,0,0);return{setMask:function(ke){ye!==ke&&!z&&(s.colorMask(ke,ke,ke,ke),ye=ke)},setLocked:function(ke){z=ke},setClear:function(ke,ct,ht,Ft,Qt){Qt===!0&&(ke*=Ft,ct*=Ft,ht*=Ft),xe.set(ke,ct,ht,Ft),qe.equals(xe)===!1&&(s.clearColor(ke,ct,ht,Ft),qe.copy(xe))},reset:function(){z=!1,ye=null,qe.set(-1,0,0,0)}}}function r(){let z=!1,xe=null,ye=null,qe=null;return{setTest:function(ke){ke?Ge(s.DEPTH_TEST):Ne(s.DEPTH_TEST)},setMask:function(ke){xe!==ke&&!z&&(s.depthMask(ke),xe=ke)},setFunc:function(ke){if(ye!==ke){switch(ke){case tg:s.depthFunc(s.NEVER);break;case ng:s.depthFunc(s.ALWAYS);break;case ig:s.depthFunc(s.LESS);break;case Co:s.depthFunc(s.LEQUAL);break;case sg:s.depthFunc(s.EQUAL);break;case rg:s.depthFunc(s.GEQUAL);break;case og:s.depthFunc(s.GREATER);break;case ag:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ye=ke}},setLocked:function(ke){z=ke},setClear:function(ke){qe!==ke&&(s.clearDepth(ke),qe=ke)},reset:function(){z=!1,xe=null,ye=null,qe=null}}}function o(){let z=!1,xe=null,ye=null,qe=null,ke=null,ct=null,ht=null,Ft=null,Qt=null;return{setTest:function(xt){z||(xt?Ge(s.STENCIL_TEST):Ne(s.STENCIL_TEST))},setMask:function(xt){xe!==xt&&!z&&(s.stencilMask(xt),xe=xt)},setFunc:function(xt,en,An){(ye!==xt||qe!==en||ke!==An)&&(s.stencilFunc(xt,en,An),ye=xt,qe=en,ke=An)},setOp:function(xt,en,An){(ct!==xt||ht!==en||Ft!==An)&&(s.stencilOp(xt,en,An),ct=xt,ht=en,Ft=An)},setLocked:function(xt){z=xt},setClear:function(xt){Qt!==xt&&(s.clearStencil(xt),Qt=xt)},reset:function(){z=!1,xe=null,ye=null,qe=null,ke=null,ct=null,ht=null,Ft=null,Qt=null}}}let a=new i,c=new r,l=new o,h=new WeakMap,u=new WeakMap,d={},p={},g=new WeakMap,_=[],m=null,f=!1,S=null,y=null,R=null,F=null,I=null,P=null,k=null,M=new Ce(0,0,0),w=0,H=!1,X=null,ie=null,D=null,G=null,W=null,te=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ne=!1,J=0,ee=s.getParameter(s.VERSION);ee.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(ee)[1]),ne=J>=1):ee.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),ne=J>=2);let oe=null,he={},K=s.getParameter(s.SCISSOR_BOX),se=s.getParameter(s.VIEWPORT),Se=new Et().fromArray(K),_e=new Et().fromArray(se);function Te(z,xe,ye,qe){let ke=new Uint8Array(4),ct=s.createTexture();s.bindTexture(z,ct),s.texParameteri(z,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(z,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ht=0;ht<ye;ht++)n&&(z===s.TEXTURE_3D||z===s.TEXTURE_2D_ARRAY)?s.texImage3D(xe,0,s.RGBA,1,1,qe,0,s.RGBA,s.UNSIGNED_BYTE,ke):s.texImage2D(xe+ht,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ke);return ct}let Ue={};Ue[s.TEXTURE_2D]=Te(s.TEXTURE_2D,s.TEXTURE_2D,1),Ue[s.TEXTURE_CUBE_MAP]=Te(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ue[s.TEXTURE_2D_ARRAY]=Te(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ue[s.TEXTURE_3D]=Te(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Ge(s.DEPTH_TEST),c.setFunc(Co),Ze(!1),T(tu),Ge(s.CULL_FACE),De(Vt);function Ge(z){d[z]!==!0&&(s.enable(z),d[z]=!0)}function Ne(z){d[z]!==!1&&(s.disable(z),d[z]=!1)}function tt(z,xe){return p[z]!==xe?(s.bindFramebuffer(z,xe),p[z]=xe,n&&(z===s.DRAW_FRAMEBUFFER&&(p[s.FRAMEBUFFER]=xe),z===s.FRAMEBUFFER&&(p[s.DRAW_FRAMEBUFFER]=xe)),!0):!1}function Z(z,xe){let ye=_,qe=!1;if(z)if(ye=g.get(xe),ye===void 0&&(ye=[],g.set(xe,ye)),z.isWebGLMultipleRenderTargets){let ke=z.texture;if(ye.length!==ke.length||ye[0]!==s.COLOR_ATTACHMENT0){for(let ct=0,ht=ke.length;ct<ht;ct++)ye[ct]=s.COLOR_ATTACHMENT0+ct;ye.length=ke.length,qe=!0}}else ye[0]!==s.COLOR_ATTACHMENT0&&(ye[0]=s.COLOR_ATTACHMENT0,qe=!0);else ye[0]!==s.BACK&&(ye[0]=s.BACK,qe=!0);qe&&(t.isWebGL2?s.drawBuffers(ye):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ye))}function At(z){return m!==z?(s.useProgram(z),m=z,!0):!1}let Oe={[Cn]:s.FUNC_ADD,[Gm]:s.FUNC_SUBTRACT,[Wm]:s.FUNC_REVERSE_SUBTRACT};if(n)Oe[ru]=s.MIN,Oe[ou]=s.MAX;else{let z=e.get("EXT_blend_minmax");z!==null&&(Oe[ru]=z.MIN_EXT,Oe[ou]=z.MAX_EXT)}let We={[Zs]:s.ZERO,[Xm]:s.ONE,[qm]:s.SRC_COLOR,[Dc]:s.SRC_ALPHA,[$m]:s.SRC_ALPHA_SATURATE,[aa]:s.DST_COLOR,[oa]:s.DST_ALPHA,[Ym]:s.ONE_MINUS_SRC_COLOR,[Uc]:s.ONE_MINUS_SRC_ALPHA,[Km]:s.ONE_MINUS_DST_COLOR,[Zm]:s.ONE_MINUS_DST_ALPHA,[jm]:s.CONSTANT_COLOR,[Jm]:s.ONE_MINUS_CONSTANT_COLOR,[Qm]:s.CONSTANT_ALPHA,[eg]:s.ONE_MINUS_CONSTANT_ALPHA};function De(z,xe,ye,qe,ke,ct,ht,Ft,Qt,xt){if(z===Vt){f===!0&&(Ne(s.BLEND),f=!1);return}if(f===!1&&(Ge(s.BLEND),f=!0),z!==fl){if(z!==S||xt!==H){if((y!==Cn||I!==Cn)&&(s.blendEquation(s.FUNC_ADD),y=Cn,I=Cn),xt)switch(z){case Ls:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case nu:s.blendFunc(s.ONE,s.ONE);break;case iu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case su:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Ls:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case nu:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case iu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case su:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}R=null,F=null,P=null,k=null,M.set(0,0,0),w=0,S=z,H=xt}return}ke=ke||xe,ct=ct||ye,ht=ht||qe,(xe!==y||ke!==I)&&(s.blendEquationSeparate(Oe[xe],Oe[ke]),y=xe,I=ke),(ye!==R||qe!==F||ct!==P||ht!==k)&&(s.blendFuncSeparate(We[ye],We[qe],We[ct],We[ht]),R=ye,F=qe,P=ct,k=ht),(Ft.equals(M)===!1||Qt!==w)&&(s.blendColor(Ft.r,Ft.g,Ft.b,Qt),M.copy(Ft),w=Qt),S=z,H=!1}function gt(z,xe){z.side===bn?Ne(s.CULL_FACE):Ge(s.CULL_FACE);let ye=z.side===dn;xe&&(ye=!ye),Ze(ye),z.blending===Ls&&z.transparent===!1?De(Vt):De(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),c.setFunc(z.depthFunc),c.setTest(z.depthTest),c.setMask(z.depthWrite),a.setMask(z.colorWrite);let qe=z.stencilWrite;l.setTest(qe),qe&&(l.setMask(z.stencilWriteMask),l.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),l.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),$(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?Ge(s.SAMPLE_ALPHA_TO_COVERAGE):Ne(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ze(z){X!==z&&(z?s.frontFace(s.CW):s.frontFace(s.CCW),X=z)}function T(z){z!==km?(Ge(s.CULL_FACE),z!==ie&&(z===tu?s.cullFace(s.BACK):z===Hm?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ne(s.CULL_FACE),ie=z}function E(z){z!==D&&(ne&&s.lineWidth(z),D=z)}function $(z,xe,ye){z?(Ge(s.POLYGON_OFFSET_FILL),(G!==xe||W!==ye)&&(s.polygonOffset(xe,ye),G=xe,W=ye)):Ne(s.POLYGON_OFFSET_FILL)}function fe(z){z?Ge(s.SCISSOR_TEST):Ne(s.SCISSOR_TEST)}function le(z){z===void 0&&(z=s.TEXTURE0+te-1),oe!==z&&(s.activeTexture(z),oe=z)}function de(z,xe,ye){ye===void 0&&(oe===null?ye=s.TEXTURE0+te-1:ye=oe);let qe=he[ye];qe===void 0&&(qe={type:void 0,texture:void 0},he[ye]=qe),(qe.type!==z||qe.texture!==xe)&&(oe!==ye&&(s.activeTexture(ye),oe=ye),s.bindTexture(z,xe||Ue[z]),qe.type=z,qe.texture=xe)}function Ie(){let z=he[oe];z!==void 0&&z.type!==void 0&&(s.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function be(){try{s.compressedTexImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ae(){try{s.compressedTexImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Fe(){try{s.texSubImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Xe(){try{s.texSubImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ce(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Je(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function L(){try{s.texStorage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function re(){try{s.texStorage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function pe(){try{s.texImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function me(){try{s.texImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Le(z){Se.equals(z)===!1&&(s.scissor(z.x,z.y,z.z,z.w),Se.copy(z))}function ze(z){_e.equals(z)===!1&&(s.viewport(z.x,z.y,z.z,z.w),_e.copy(z))}function Be(z,xe){let ye=u.get(xe);ye===void 0&&(ye=new WeakMap,u.set(xe,ye));let qe=ye.get(z);qe===void 0&&(qe=s.getUniformBlockIndex(xe,z.name),ye.set(z,qe))}function Ke(z,xe){let qe=u.get(xe).get(z);h.get(xe)!==qe&&(s.uniformBlockBinding(xe,qe,z.__bindingPointIndex),h.set(xe,qe))}function q(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},oe=null,he={},p={},g=new WeakMap,_=[],m=null,f=!1,S=null,y=null,R=null,F=null,I=null,P=null,k=null,M=new Ce(0,0,0),w=0,H=!1,X=null,ie=null,D=null,G=null,W=null,Se.set(0,0,s.canvas.width,s.canvas.height),_e.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Ge,disable:Ne,bindFramebuffer:tt,drawBuffers:Z,useProgram:At,setBlending:De,setMaterial:gt,setFlipSided:Ze,setCullFace:T,setLineWidth:E,setPolygonOffset:$,setScissorTest:fe,activeTexture:le,bindTexture:de,unbindTexture:Ie,compressedTexImage2D:be,compressedTexImage3D:Ae,texImage2D:pe,texImage3D:me,updateUBOMapping:Be,uniformBlockBinding:Ke,texStorage2D:L,texStorage3D:re,texSubImage2D:Fe,texSubImage3D:Xe,compressedTexSubImage2D:ce,compressedTexSubImage3D:Je,scissor:Le,viewport:ze,reset:q}}function Dy(s,e,t,n,i,r,o){let a=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,E){return p?new OffscreenCanvas(T,E):_r("canvas")}function _(T,E,$,fe){let le=1;if((T.width>fe||T.height>fe)&&(le=fe/Math.max(T.width,T.height)),le<1||E===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){let de=E?No:Math.floor,Ie=de(le*T.width),be=de(le*T.height);u===void 0&&(u=g(Ie,be));let Ae=$?g(Ie,be):u;return Ae.width=Ie,Ae.height=be,Ae.getContext("2d").drawImage(T,0,0,Ie,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+Ie+"x"+be+")."),Ae}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function m(T){return zc(T.width)&&zc(T.height)}function f(T){return a?!1:T.wrapS!==Ot||T.wrapT!==Ot||T.minFilter!==It&&T.minFilter!==wt}function S(T,E){return T.generateMipmaps&&E&&T.minFilter!==It&&T.minFilter!==wt}function y(T){s.generateMipmap(T)}function R(T,E,$,fe,le=!1){if(a===!1)return E;if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let de=E;if(E===s.RED&&($===s.FLOAT&&(de=s.R32F),$===s.HALF_FLOAT&&(de=s.R16F),$===s.UNSIGNED_BYTE&&(de=s.R8)),E===s.RED_INTEGER&&($===s.UNSIGNED_BYTE&&(de=s.R8UI),$===s.UNSIGNED_SHORT&&(de=s.R16UI),$===s.UNSIGNED_INT&&(de=s.R32UI),$===s.BYTE&&(de=s.R8I),$===s.SHORT&&(de=s.R16I),$===s.INT&&(de=s.R32I)),E===s.RG&&($===s.FLOAT&&(de=s.RG32F),$===s.HALF_FLOAT&&(de=s.RG16F),$===s.UNSIGNED_BYTE&&(de=s.RG8)),E===s.RGBA){let Ie=le?Io:dt.getTransfer(fe);$===s.FLOAT&&(de=s.RGBA32F),$===s.HALF_FLOAT&&(de=s.RGBA16F),$===s.UNSIGNED_BYTE&&(de=Ie===St?s.SRGB8_ALPHA8:s.RGBA8),$===s.UNSIGNED_SHORT_4_4_4_4&&(de=s.RGBA4),$===s.UNSIGNED_SHORT_5_5_5_1&&(de=s.RGB5_A1)}return(de===s.R16F||de===s.R32F||de===s.RG16F||de===s.RG32F||de===s.RGBA16F||de===s.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function F(T,E,$){return S(T,$)===!0||T.isFramebufferTexture&&T.minFilter!==It&&T.minFilter!==wt?Math.log2(Math.max(E.width,E.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?E.mipmaps.length:1}function I(T){return T===It||T===Po||T===dr?s.NEAREST:s.LINEAR}function P(T){let E=T.target;E.removeEventListener("dispose",P),M(E),E.isVideoTexture&&h.delete(E)}function k(T){let E=T.target;E.removeEventListener("dispose",k),H(E)}function M(T){let E=n.get(T);if(E.__webglInit===void 0)return;let $=T.source,fe=d.get($);if(fe){let le=fe[E.__cacheKey];le.usedTimes--,le.usedTimes===0&&w(T),Object.keys(fe).length===0&&d.delete($)}n.remove(T)}function w(T){let E=n.get(T);s.deleteTexture(E.__webglTexture);let $=T.source,fe=d.get($);delete fe[E.__cacheKey],o.memory.textures--}function H(T){let E=T.texture,$=n.get(T),fe=n.get(E);if(fe.__webglTexture!==void 0&&(s.deleteTexture(fe.__webglTexture),o.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray($.__webglFramebuffer[le]))for(let de=0;de<$.__webglFramebuffer[le].length;de++)s.deleteFramebuffer($.__webglFramebuffer[le][de]);else s.deleteFramebuffer($.__webglFramebuffer[le]);$.__webglDepthbuffer&&s.deleteRenderbuffer($.__webglDepthbuffer[le])}else{if(Array.isArray($.__webglFramebuffer))for(let le=0;le<$.__webglFramebuffer.length;le++)s.deleteFramebuffer($.__webglFramebuffer[le]);else s.deleteFramebuffer($.__webglFramebuffer);if($.__webglDepthbuffer&&s.deleteRenderbuffer($.__webglDepthbuffer),$.__webglMultisampledFramebuffer&&s.deleteFramebuffer($.__webglMultisampledFramebuffer),$.__webglColorRenderbuffer)for(let le=0;le<$.__webglColorRenderbuffer.length;le++)$.__webglColorRenderbuffer[le]&&s.deleteRenderbuffer($.__webglColorRenderbuffer[le]);$.__webglDepthRenderbuffer&&s.deleteRenderbuffer($.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let le=0,de=E.length;le<de;le++){let Ie=n.get(E[le]);Ie.__webglTexture&&(s.deleteTexture(Ie.__webglTexture),o.memory.textures--),n.remove(E[le])}n.remove(E),n.remove(T)}let X=0;function ie(){X=0}function D(){let T=X;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),X+=1,T}function G(T){let E=[];return E.push(T.wrapS),E.push(T.wrapT),E.push(T.wrapR||0),E.push(T.magFilter),E.push(T.minFilter),E.push(T.anisotropy),E.push(T.internalFormat),E.push(T.format),E.push(T.type),E.push(T.generateMipmaps),E.push(T.premultiplyAlpha),E.push(T.flipY),E.push(T.unpackAlignment),E.push(T.colorSpace),E.join()}function W(T,E){let $=n.get(T);if(T.isVideoTexture&&gt(T),T.isRenderTargetTexture===!1&&T.version>0&&$.__version!==T.version){let fe=T.image;if(fe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(fe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Se($,T,E);return}}t.bindTexture(s.TEXTURE_2D,$.__webglTexture,s.TEXTURE0+E)}function te(T,E){let $=n.get(T);if(T.version>0&&$.__version!==T.version){Se($,T,E);return}t.bindTexture(s.TEXTURE_2D_ARRAY,$.__webglTexture,s.TEXTURE0+E)}function ne(T,E){let $=n.get(T);if(T.version>0&&$.__version!==T.version){Se($,T,E);return}t.bindTexture(s.TEXTURE_3D,$.__webglTexture,s.TEXTURE0+E)}function J(T,E){let $=n.get(T);if(T.version>0&&$.__version!==T.version){_e($,T,E);return}t.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture,s.TEXTURE0+E)}let ee={[Gt]:s.REPEAT,[Ot]:s.CLAMP_TO_EDGE,[vr]:s.MIRRORED_REPEAT},oe={[It]:s.NEAREST,[Po]:s.NEAREST_MIPMAP_NEAREST,[dr]:s.NEAREST_MIPMAP_LINEAR,[wt]:s.LINEAR,[gl]:s.LINEAR_MIPMAP_NEAREST,[Gn]:s.LINEAR_MIPMAP_LINEAR},he={[Eg]:s.NEVER,[Cg]:s.ALWAYS,[bg]:s.LESS,[tf]:s.LEQUAL,[wg]:s.EQUAL,[Rg]:s.GEQUAL,[Tg]:s.GREATER,[Ag]:s.NOTEQUAL};function K(T,E,$){if($?(s.texParameteri(T,s.TEXTURE_WRAP_S,ee[E.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,ee[E.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,ee[E.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,oe[E.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,oe[E.minFilter])):(s.texParameteri(T,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(T,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(E.wrapS!==Ot||E.wrapT!==Ot)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(T,s.TEXTURE_MAG_FILTER,I(E.magFilter)),s.texParameteri(T,s.TEXTURE_MIN_FILTER,I(E.minFilter)),E.minFilter!==It&&E.minFilter!==wt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,he[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let fe=e.get("EXT_texture_filter_anisotropic");if(E.magFilter===It||E.minFilter!==dr&&E.minFilter!==Gn||E.type===nn&&e.has("OES_texture_float_linear")===!1||a===!1&&E.type===Dt&&e.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||n.get(E).__currentAnisotropy)&&(s.texParameterf(T,fe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy)}}function se(T,E){let $=!1;T.__webglInit===void 0&&(T.__webglInit=!0,E.addEventListener("dispose",P));let fe=E.source,le=d.get(fe);le===void 0&&(le={},d.set(fe,le));let de=G(E);if(de!==T.__cacheKey){le[de]===void 0&&(le[de]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,$=!0),le[de].usedTimes++;let Ie=le[T.__cacheKey];Ie!==void 0&&(le[T.__cacheKey].usedTimes--,Ie.usedTimes===0&&w(E)),T.__cacheKey=de,T.__webglTexture=le[de].texture}return $}function Se(T,E,$){let fe=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(fe=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(fe=s.TEXTURE_3D);let le=se(T,E),de=E.source;t.bindTexture(fe,T.__webglTexture,s.TEXTURE0+$);let Ie=n.get(de);if(de.version!==Ie.__version||le===!0){t.activeTexture(s.TEXTURE0+$);let be=dt.getPrimaries(dt.workingColorSpace),Ae=E.colorSpace===un?null:dt.getPrimaries(E.colorSpace),Fe=E.colorSpace===un||be===Ae?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);let Xe=f(E)&&m(E.image)===!1,ce=_(E.image,Xe,!1,i.maxTextureSize);ce=Ze(E,ce);let Je=m(ce)||a,L=r.convert(E.format,E.colorSpace),re=r.convert(E.type),pe=R(E.internalFormat,L,re,E.colorSpace,E.isVideoTexture);K(fe,E,Je);let me,Le=E.mipmaps,ze=a&&E.isVideoTexture!==!0&&pe!==Jd,Be=Ie.__version===void 0||le===!0,Ke=F(E,ce,Je);if(E.isDepthTexture)pe=s.DEPTH_COMPONENT,a?E.type===nn?pe=s.DEPTH_COMPONENT32F:E.type===Ai?pe=s.DEPTH_COMPONENT24:E.type===di?pe=s.DEPTH24_STENCIL8:pe=s.DEPTH_COMPONENT16:E.type===nn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===Ji&&pe===s.DEPTH_COMPONENT&&E.type!==vl&&E.type!==Ai&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=Ai,re=r.convert(E.type)),E.format===Ci&&pe===s.DEPTH_COMPONENT&&(pe=s.DEPTH_STENCIL,E.type!==di&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=di,re=r.convert(E.type))),Be&&(ze?t.texStorage2D(s.TEXTURE_2D,1,pe,ce.width,ce.height):t.texImage2D(s.TEXTURE_2D,0,pe,ce.width,ce.height,0,L,re,null));else if(E.isDataTexture)if(Le.length>0&&Je){ze&&Be&&t.texStorage2D(s.TEXTURE_2D,Ke,pe,Le[0].width,Le[0].height);for(let q=0,z=Le.length;q<z;q++)me=Le[q],ze?t.texSubImage2D(s.TEXTURE_2D,q,0,0,me.width,me.height,L,re,me.data):t.texImage2D(s.TEXTURE_2D,q,pe,me.width,me.height,0,L,re,me.data);E.generateMipmaps=!1}else ze?(Be&&t.texStorage2D(s.TEXTURE_2D,Ke,pe,ce.width,ce.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,ce.width,ce.height,L,re,ce.data)):t.texImage2D(s.TEXTURE_2D,0,pe,ce.width,ce.height,0,L,re,ce.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ze&&Be&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ke,pe,Le[0].width,Le[0].height,ce.depth);for(let q=0,z=Le.length;q<z;q++)me=Le[q],E.format!==hn?L!==null?ze?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,me.width,me.height,ce.depth,L,me.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,q,pe,me.width,me.height,ce.depth,0,me.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?t.texSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,me.width,me.height,ce.depth,L,re,me.data):t.texImage3D(s.TEXTURE_2D_ARRAY,q,pe,me.width,me.height,ce.depth,0,L,re,me.data)}else{ze&&Be&&t.texStorage2D(s.TEXTURE_2D,Ke,pe,Le[0].width,Le[0].height);for(let q=0,z=Le.length;q<z;q++)me=Le[q],E.format!==hn?L!==null?ze?t.compressedTexSubImage2D(s.TEXTURE_2D,q,0,0,me.width,me.height,L,me.data):t.compressedTexImage2D(s.TEXTURE_2D,q,pe,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?t.texSubImage2D(s.TEXTURE_2D,q,0,0,me.width,me.height,L,re,me.data):t.texImage2D(s.TEXTURE_2D,q,pe,me.width,me.height,0,L,re,me.data)}else if(E.isDataArrayTexture)ze?(Be&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ke,pe,ce.width,ce.height,ce.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,L,re,ce.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,pe,ce.width,ce.height,ce.depth,0,L,re,ce.data);else if(E.isData3DTexture)ze?(Be&&t.texStorage3D(s.TEXTURE_3D,Ke,pe,ce.width,ce.height,ce.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,L,re,ce.data)):t.texImage3D(s.TEXTURE_3D,0,pe,ce.width,ce.height,ce.depth,0,L,re,ce.data);else if(E.isFramebufferTexture){if(Be)if(ze)t.texStorage2D(s.TEXTURE_2D,Ke,pe,ce.width,ce.height);else{let q=ce.width,z=ce.height;for(let xe=0;xe<Ke;xe++)t.texImage2D(s.TEXTURE_2D,xe,pe,q,z,0,L,re,null),q>>=1,z>>=1}}else if(Le.length>0&&Je){ze&&Be&&t.texStorage2D(s.TEXTURE_2D,Ke,pe,Le[0].width,Le[0].height);for(let q=0,z=Le.length;q<z;q++)me=Le[q],ze?t.texSubImage2D(s.TEXTURE_2D,q,0,0,L,re,me):t.texImage2D(s.TEXTURE_2D,q,pe,L,re,me);E.generateMipmaps=!1}else ze?(Be&&t.texStorage2D(s.TEXTURE_2D,Ke,pe,ce.width,ce.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,L,re,ce)):t.texImage2D(s.TEXTURE_2D,0,pe,L,re,ce);S(E,Je)&&y(fe),Ie.__version=de.version,E.onUpdate&&E.onUpdate(E)}T.__version=E.version}function _e(T,E,$){if(E.image.length!==6)return;let fe=se(T,E),le=E.source;t.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+$);let de=n.get(le);if(le.version!==de.__version||fe===!0){t.activeTexture(s.TEXTURE0+$);let Ie=dt.getPrimaries(dt.workingColorSpace),be=E.colorSpace===un?null:dt.getPrimaries(E.colorSpace),Ae=E.colorSpace===un||Ie===be?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let Fe=E.isCompressedTexture||E.image[0].isCompressedTexture,Xe=E.image[0]&&E.image[0].isDataTexture,ce=[];for(let q=0;q<6;q++)!Fe&&!Xe?ce[q]=_(E.image[q],!1,!0,i.maxCubemapSize):ce[q]=Xe?E.image[q].image:E.image[q],ce[q]=Ze(E,ce[q]);let Je=ce[0],L=m(Je)||a,re=r.convert(E.format,E.colorSpace),pe=r.convert(E.type),me=R(E.internalFormat,re,pe,E.colorSpace),Le=a&&E.isVideoTexture!==!0,ze=de.__version===void 0||fe===!0,Be=F(E,Je,L);K(s.TEXTURE_CUBE_MAP,E,L);let Ke;if(Fe){Le&&ze&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Be,me,Je.width,Je.height);for(let q=0;q<6;q++){Ke=ce[q].mipmaps;for(let z=0;z<Ke.length;z++){let xe=Ke[z];E.format!==hn?re!==null?Le?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z,0,0,xe.width,xe.height,re,xe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z,me,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Le?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z,0,0,xe.width,xe.height,re,pe,xe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z,me,xe.width,xe.height,0,re,pe,xe.data)}}}else{Ke=E.mipmaps,Le&&ze&&(Ke.length>0&&Be++,t.texStorage2D(s.TEXTURE_CUBE_MAP,Be,me,ce[0].width,ce[0].height));for(let q=0;q<6;q++)if(Xe){Le?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ce[q].width,ce[q].height,re,pe,ce[q].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,me,ce[q].width,ce[q].height,0,re,pe,ce[q].data);for(let z=0;z<Ke.length;z++){let ye=Ke[z].image[q].image;Le?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z+1,0,0,ye.width,ye.height,re,pe,ye.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z+1,me,ye.width,ye.height,0,re,pe,ye.data)}}else{Le?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,re,pe,ce[q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,me,re,pe,ce[q]);for(let z=0;z<Ke.length;z++){let xe=Ke[z];Le?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z+1,0,0,re,pe,xe.image[q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z+1,me,re,pe,xe.image[q])}}}S(E,L)&&y(s.TEXTURE_CUBE_MAP),de.__version=le.version,E.onUpdate&&E.onUpdate(E)}T.__version=E.version}function Te(T,E,$,fe,le,de){let Ie=r.convert($.format,$.colorSpace),be=r.convert($.type),Ae=R($.internalFormat,Ie,be,$.colorSpace);if(!n.get(E).__hasExternalTextures){let Xe=Math.max(1,E.width>>de),ce=Math.max(1,E.height>>de);le===s.TEXTURE_3D||le===s.TEXTURE_2D_ARRAY?t.texImage3D(le,de,Ae,Xe,ce,E.depth,0,Ie,be,null):t.texImage2D(le,de,Ae,Xe,ce,0,Ie,be,null)}t.bindFramebuffer(s.FRAMEBUFFER,T),De(E)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,fe,le,n.get($).__webglTexture,0,We(E)):(le===s.TEXTURE_2D||le>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,fe,le,n.get($).__webglTexture,de),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ue(T,E,$){if(s.bindRenderbuffer(s.RENDERBUFFER,T),E.depthBuffer&&!E.stencilBuffer){let fe=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if($||De(E)){let le=E.depthTexture;le&&le.isDepthTexture&&(le.type===nn?fe=s.DEPTH_COMPONENT32F:le.type===Ai&&(fe=s.DEPTH_COMPONENT24));let de=We(E);De(E)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,de,fe,E.width,E.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,de,fe,E.width,E.height)}else s.renderbufferStorage(s.RENDERBUFFER,fe,E.width,E.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,T)}else if(E.depthBuffer&&E.stencilBuffer){let fe=We(E);$&&De(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,fe,s.DEPTH24_STENCIL8,E.width,E.height):De(E)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,fe,s.DEPTH24_STENCIL8,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,T)}else{let fe=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let le=0;le<fe.length;le++){let de=fe[le],Ie=r.convert(de.format,de.colorSpace),be=r.convert(de.type),Ae=R(de.internalFormat,Ie,be,de.colorSpace),Fe=We(E);$&&De(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Fe,Ae,E.width,E.height):De(E)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Fe,Ae,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,Ae,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ge(T,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,T),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),W(E.depthTexture,0);let fe=n.get(E.depthTexture).__webglTexture,le=We(E);if(E.depthTexture.format===Ji)De(E)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,fe,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,fe,0);else if(E.depthTexture.format===Ci)De(E)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,fe,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,fe,0);else throw new Error("Unknown depthTexture format")}function Ne(T){let E=n.get(T),$=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!E.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");Ge(E.__webglFramebuffer,T)}else if($){E.__webglDepthbuffer=[];for(let fe=0;fe<6;fe++)t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[fe]),E.__webglDepthbuffer[fe]=s.createRenderbuffer(),Ue(E.__webglDepthbuffer[fe],T,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=s.createRenderbuffer(),Ue(E.__webglDepthbuffer,T,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function tt(T,E,$){let fe=n.get(T);E!==void 0&&Te(fe.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),$!==void 0&&Ne(T)}function Z(T){let E=T.texture,$=n.get(T),fe=n.get(E);T.addEventListener("dispose",k),T.isWebGLMultipleRenderTargets!==!0&&(fe.__webglTexture===void 0&&(fe.__webglTexture=s.createTexture()),fe.__version=E.version,o.memory.textures++);let le=T.isWebGLCubeRenderTarget===!0,de=T.isWebGLMultipleRenderTargets===!0,Ie=m(T)||a;if(le){$.__webglFramebuffer=[];for(let be=0;be<6;be++)if(a&&E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer[be]=[];for(let Ae=0;Ae<E.mipmaps.length;Ae++)$.__webglFramebuffer[be][Ae]=s.createFramebuffer()}else $.__webglFramebuffer[be]=s.createFramebuffer()}else{if(a&&E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer=[];for(let be=0;be<E.mipmaps.length;be++)$.__webglFramebuffer[be]=s.createFramebuffer()}else $.__webglFramebuffer=s.createFramebuffer();if(de)if(i.drawBuffers){let be=T.texture;for(let Ae=0,Fe=be.length;Ae<Fe;Ae++){let Xe=n.get(be[Ae]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&T.samples>0&&De(T)===!1){let be=de?E:[E];$.__webglMultisampledFramebuffer=s.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let Ae=0;Ae<be.length;Ae++){let Fe=be[Ae];$.__webglColorRenderbuffer[Ae]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,$.__webglColorRenderbuffer[Ae]);let Xe=r.convert(Fe.format,Fe.colorSpace),ce=r.convert(Fe.type),Je=R(Fe.internalFormat,Xe,ce,Fe.colorSpace,T.isXRRenderTarget===!0),L=We(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,L,Je,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,$.__webglColorRenderbuffer[Ae])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&($.__webglDepthRenderbuffer=s.createRenderbuffer(),Ue($.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(le){t.bindTexture(s.TEXTURE_CUBE_MAP,fe.__webglTexture),K(s.TEXTURE_CUBE_MAP,E,Ie);for(let be=0;be<6;be++)if(a&&E.mipmaps&&E.mipmaps.length>0)for(let Ae=0;Ae<E.mipmaps.length;Ae++)Te($.__webglFramebuffer[be][Ae],T,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ae);else Te($.__webglFramebuffer[be],T,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0);S(E,Ie)&&y(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){let be=T.texture;for(let Ae=0,Fe=be.length;Ae<Fe;Ae++){let Xe=be[Ae],ce=n.get(Xe);t.bindTexture(s.TEXTURE_2D,ce.__webglTexture),K(s.TEXTURE_2D,Xe,Ie),Te($.__webglFramebuffer,T,Xe,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,0),S(Xe,Ie)&&y(s.TEXTURE_2D)}t.unbindTexture()}else{let be=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(a?be=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(be,fe.__webglTexture),K(be,E,Ie),a&&E.mipmaps&&E.mipmaps.length>0)for(let Ae=0;Ae<E.mipmaps.length;Ae++)Te($.__webglFramebuffer[Ae],T,E,s.COLOR_ATTACHMENT0,be,Ae);else Te($.__webglFramebuffer,T,E,s.COLOR_ATTACHMENT0,be,0);S(E,Ie)&&y(be),t.unbindTexture()}T.depthBuffer&&Ne(T)}function At(T){let E=m(T)||a,$=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let fe=0,le=$.length;fe<le;fe++){let de=$[fe];if(S(de,E)){let Ie=T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,be=n.get(de).__webglTexture;t.bindTexture(Ie,be),y(Ie),t.unbindTexture()}}}function Oe(T){if(a&&T.samples>0&&De(T)===!1){let E=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],$=T.width,fe=T.height,le=s.COLOR_BUFFER_BIT,de=[],Ie=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=n.get(T),Ae=T.isWebGLMultipleRenderTargets===!0;if(Ae)for(let Fe=0;Fe<E.length;Fe++)t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Fe=0;Fe<E.length;Fe++){de.push(s.COLOR_ATTACHMENT0+Fe),T.depthBuffer&&de.push(Ie);let Xe=be.__ignoreDepthValues!==void 0?be.__ignoreDepthValues:!1;if(Xe===!1&&(T.depthBuffer&&(le|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&(le|=s.STENCIL_BUFFER_BIT)),Ae&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,be.__webglColorRenderbuffer[Fe]),Xe===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Ie]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Ie])),Ae){let ce=n.get(E[Fe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ce,0)}s.blitFramebuffer(0,0,$,fe,0,0,$,fe,le,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,de)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Ae)for(let Fe=0;Fe<E.length;Fe++){t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,be.__webglColorRenderbuffer[Fe]);let Xe=n.get(E[Fe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,Xe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}}function We(T){return Math.min(i.maxSamples,T.samples)}function De(T){let E=n.get(T);return a&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function gt(T){let E=o.render.frame;h.get(T)!==E&&(h.set(T,E),T.update())}function Ze(T,E){let $=T.colorSpace,fe=T.format,le=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===Bc||$!==Tt&&$!==un&&(dt.getTransfer($)===St?a===!1?e.has("EXT_sRGB")===!0&&fe===hn?(T.format=Bc,T.minFilter=wt,T.generateMipmaps=!1):E=Oo.sRGBToLinear(E):(fe!==hn||le!==$n)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),E}this.allocateTextureUnit=D,this.resetTextureUnits=ie,this.setTexture2D=W,this.setTexture2DArray=te,this.setTexture3D=ne,this.setTextureCube=J,this.rebindTextures=tt,this.setupRenderTarget=Z,this.updateRenderTargetMipmap=At,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=De}function Uy(s,e,t){let n=t.isWebGL2;function i(r,o=un){let a,c=dt.getTransfer(o);if(r===$n)return s.UNSIGNED_BYTE;if(r===Yd)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Zd)return s.UNSIGNED_SHORT_5_5_5_1;if(r===dg)return s.BYTE;if(r===fg)return s.SHORT;if(r===vl)return s.UNSIGNED_SHORT;if(r===qd)return s.INT;if(r===Ai)return s.UNSIGNED_INT;if(r===nn)return s.FLOAT;if(r===Dt)return n?s.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===pg)return s.ALPHA;if(r===hn)return s.RGBA;if(r===mg)return s.LUMINANCE;if(r===gg)return s.LUMINANCE_ALPHA;if(r===Ji)return s.DEPTH_COMPONENT;if(r===Ci)return s.DEPTH_STENCIL;if(r===Bc)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===_l)return s.RED;if(r===Kd)return s.RED_INTEGER;if(r===vg)return s.RG;if(r===$d)return s.RG_INTEGER;if(r===jd)return s.RGBA_INTEGER;if(r===ec||r===tc||r===nc||r===ic)if(c===St)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===ec)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===tc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===nc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===ic)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===ec)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===tc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===nc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===ic)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===cu||r===lu||r===hu||r===uu)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===cu)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===lu)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===hu)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===uu)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Jd)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===du||r===fu)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===du)return c===St?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===fu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===pu||r===mu||r===gu||r===vu||r===_u||r===xu||r===yu||r===Mu||r===Su||r===Eu||r===bu||r===wu||r===Tu||r===Au)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===pu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===mu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===gu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===vu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===_u)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===xu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===yu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Mu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Su)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Eu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===bu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===wu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Tu)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Au)return c===St?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===sc||r===Ru||r===Cu)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===sc)return c===St?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ru)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Cu)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===_g||r===Pu||r===Iu||r===Lu)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===sc)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Pu)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Iu)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Lu)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===di?n?s.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}var jc=class extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Ht=class extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ny={type:"move"},gr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ht,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ht,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ht,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ny)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ht;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Jc=class extends jn{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null,_=t.getContextAttributes(),m=null,f=null,S=[],y=[],R=new Pe,F=null,I=new kt;I.layers.enable(1),I.viewport=new Et;let P=new kt;P.layers.enable(2),P.viewport=new Et;let k=[I,P],M=new jc;M.layers.enable(1),M.layers.enable(2);let w=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let se=S[K];return se===void 0&&(se=new gr,S[K]=se),se.getTargetRaySpace()},this.getControllerGrip=function(K){let se=S[K];return se===void 0&&(se=new gr,S[K]=se),se.getGripSpace()},this.getHand=function(K){let se=S[K];return se===void 0&&(se=new gr,S[K]=se),se.getHandSpace()};function X(K){let se=y.indexOf(K.inputSource);if(se===-1)return;let Se=S[se];Se!==void 0&&(Se.update(K.inputSource,K.frame,l||o),Se.dispatchEvent({type:K.type,data:K.inputSource}))}function ie(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",ie),i.removeEventListener("inputsourceschange",D);for(let K=0;K<S.length;K++){let se=y[K];se!==null&&(y[K]=null,S[K].disconnect(se))}w=null,H=null,e.setRenderTarget(m),p=null,d=null,u=null,i=null,f=null,he.stop(),n.isPresenting=!1,e.setPixelRatio(F),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",ie),i.addEventListener("inputsourceschange",D),_.xrCompatible!==!0&&await t.makeXRCompatible(),F=e.getPixelRatio(),e.getSize(R),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let se={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,t,se),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new Xt(p.framebufferWidth,p.framebufferHeight,{format:hn,type:$n,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let se=null,Se=null,_e=null;_.depth&&(_e=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=_.stencil?Ci:Ji,Se=_.stencil?di:Ai);let Te={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Te),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),f=new Xt(d.textureWidth,d.textureHeight,{format:hn,type:$n,depthTexture:new ks(d.textureWidth,d.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});let Ue=e.properties.get(f);Ue.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),he.setContext(i),he.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function D(K){for(let se=0;se<K.removed.length;se++){let Se=K.removed[se],_e=y.indexOf(Se);_e>=0&&(y[_e]=null,S[_e].disconnect(Se))}for(let se=0;se<K.added.length;se++){let Se=K.added[se],_e=y.indexOf(Se);if(_e===-1){for(let Ue=0;Ue<S.length;Ue++)if(Ue>=y.length){y.push(Se),_e=Ue;break}else if(y[Ue]===null){y[Ue]=Se,_e=Ue;break}if(_e===-1)break}let Te=S[_e];Te&&Te.connect(Se)}}let G=new B,W=new B;function te(K,se,Se){G.setFromMatrixPosition(se.matrixWorld),W.setFromMatrixPosition(Se.matrixWorld);let _e=G.distanceTo(W),Te=se.projectionMatrix.elements,Ue=Se.projectionMatrix.elements,Ge=Te[14]/(Te[10]-1),Ne=Te[14]/(Te[10]+1),tt=(Te[9]+1)/Te[5],Z=(Te[9]-1)/Te[5],At=(Te[8]-1)/Te[0],Oe=(Ue[8]+1)/Ue[0],We=Ge*At,De=Ge*Oe,gt=_e/(-At+Oe),Ze=gt*-At;se.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Ze),K.translateZ(gt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert();let T=Ge+gt,E=Ne+gt,$=We-Ze,fe=De+(_e-Ze),le=tt*Ne/E*T,de=Z*Ne/E*T;K.projectionMatrix.makePerspective($,fe,le,de,T,E),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}function ne(K,se){se===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(se.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;M.near=P.near=I.near=K.near,M.far=P.far=I.far=K.far,(w!==M.near||H!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),w=M.near,H=M.far);let se=K.parent,Se=M.cameras;ne(M,se);for(let _e=0;_e<Se.length;_e++)ne(Se[_e],se);Se.length===2?te(M,I,P):M.projectionMatrix.copy(I.projectionMatrix),J(K,M,se)};function J(K,se,Se){Se===null?K.matrix.copy(se.matrixWorld):(K.matrix.copy(Se.matrixWorld),K.matrix.invert(),K.matrix.multiply(se.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(se.projectionMatrix),K.projectionMatrixInverse.copy(se.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Bs*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(K){c=K,d!==null&&(d.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)};let ee=null;function oe(K,se){if(h=se.getViewerPose(l||o),g=se,h!==null){let Se=h.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let _e=!1;Se.length!==M.cameras.length&&(M.cameras.length=0,_e=!0);for(let Te=0;Te<Se.length;Te++){let Ue=Se[Te],Ge=null;if(p!==null)Ge=p.getViewport(Ue);else{let tt=u.getViewSubImage(d,Ue);Ge=tt.viewport,Te===0&&(e.setRenderTargetTextures(f,tt.colorTexture,d.ignoreDepthValues?void 0:tt.depthStencilTexture),e.setRenderTarget(f))}let Ne=k[Te];Ne===void 0&&(Ne=new kt,Ne.layers.enable(Te),Ne.viewport=new Et,k[Te]=Ne),Ne.matrix.fromArray(Ue.transform.matrix),Ne.matrix.decompose(Ne.position,Ne.quaternion,Ne.scale),Ne.projectionMatrix.fromArray(Ue.projectionMatrix),Ne.projectionMatrixInverse.copy(Ne.projectionMatrix).invert(),Ne.viewport.set(Ge.x,Ge.y,Ge.width,Ge.height),Te===0&&(M.matrix.copy(Ne.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),_e===!0&&M.cameras.push(Ne)}}for(let Se=0;Se<S.length;Se++){let _e=y[Se],Te=S[Se];_e!==null&&Te!==void 0&&Te.update(_e,se,l||o)}ee&&ee(K,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),g=null}let he=new of;he.setAnimationLoop(oe),this.setAnimationLoop=function(K){ee=K},this.dispose=function(){}}};function Oy(s,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,rf(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,S,y,R){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,R)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,S,y):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===dn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===dn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let S=e.get(f).envMap;if(S&&(m.envMap.value=S,m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;let y=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*y,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,S,y){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=y*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===dn&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){let S=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Fy(s,e,t,n){let i={},r={},o=[],a=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(S,y){let R=y.program;n.uniformBlockBinding(S,R)}function l(S,y){let R=i[S.id];R===void 0&&(g(S),R=h(S),i[S.id]=R,S.addEventListener("dispose",m));let F=y.program;n.updateUBOMapping(S,F);let I=e.render.frame;r[S.id]!==I&&(d(S),r[S.id]=I)}function h(S){let y=u();S.__bindingPointIndex=y;let R=s.createBuffer(),F=S.__size,I=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,R),s.bufferData(s.UNIFORM_BUFFER,F,I),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,R),R}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){let y=i[S.id],R=S.uniforms,F=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let I=0,P=R.length;I<P;I++){let k=Array.isArray(R[I])?R[I]:[R[I]];for(let M=0,w=k.length;M<w;M++){let H=k[M];if(p(H,I,M,F)===!0){let X=H.__offset,ie=Array.isArray(H.value)?H.value:[H.value],D=0;for(let G=0;G<ie.length;G++){let W=ie[G],te=_(W);typeof W=="number"||typeof W=="boolean"?(H.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,X+D,H.__data)):W.isMatrix3?(H.__data[0]=W.elements[0],H.__data[1]=W.elements[1],H.__data[2]=W.elements[2],H.__data[3]=0,H.__data[4]=W.elements[3],H.__data[5]=W.elements[4],H.__data[6]=W.elements[5],H.__data[7]=0,H.__data[8]=W.elements[6],H.__data[9]=W.elements[7],H.__data[10]=W.elements[8],H.__data[11]=0):(W.toArray(H.__data,D),D+=te.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,X,H.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(S,y,R,F){let I=S.value,P=y+"_"+R;if(F[P]===void 0)return typeof I=="number"||typeof I=="boolean"?F[P]=I:F[P]=I.clone(),!0;{let k=F[P];if(typeof I=="number"||typeof I=="boolean"){if(k!==I)return F[P]=I,!0}else if(k.equals(I)===!1)return k.copy(I),!0}return!1}function g(S){let y=S.uniforms,R=0,F=16;for(let P=0,k=y.length;P<k;P++){let M=Array.isArray(y[P])?y[P]:[y[P]];for(let w=0,H=M.length;w<H;w++){let X=M[w],ie=Array.isArray(X.value)?X.value:[X.value];for(let D=0,G=ie.length;D<G;D++){let W=ie[D],te=_(W),ne=R%F;ne!==0&&F-ne<te.boundary&&(R+=F-ne),X.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=R,R+=te.storage}}}let I=R%F;return I>0&&(R+=F-I),S.__size=R,S.__cache={},this}function _(S){let y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function m(S){let y=S.target;y.removeEventListener("dispose",m);let R=o.indexOf(y.__bindingPointIndex);o.splice(R,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function f(){for(let S in i)s.deleteBuffer(i[S]);o=[],i={},r={}}return{bind:c,update:l,dispose:f}}var Er=class{constructor(e={}){let{canvas:t=Wg(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;let p=new Uint32Array(4),g=new Int32Array(4),_=null,m=null,f=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=mt,this._useLegacyLights=!1,this.toneMapping=Kn,this.toneMappingExposure=1;let y=this,R=!1,F=0,I=0,P=null,k=-1,M=null,w=new Et,H=new Et,X=null,ie=new Ce(0),D=0,G=t.width,W=t.height,te=1,ne=null,J=null,ee=new Et(0,0,G,W),oe=new Et(0,0,G,W),he=!1,K=new Mr,se=!1,Se=!1,_e=null,Te=new $e,Ue=new Pe,Ge=new B,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function tt(){return P===null?te:1}let Z=n;function At(v,A){for(let C=0;C<v.length;C++){let U=v[C],N=t.getContext(U,A);if(N!==null)return N}return null}try{let v={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r160"),t.addEventListener("webglcontextlost",q,!1),t.addEventListener("webglcontextrestored",z,!1),t.addEventListener("webglcontextcreationerror",xe,!1),Z===null){let A=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&A.shift(),Z=At(A,v),Z===null)throw At(A)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&Z instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),Z.getShaderPrecisionFormat===void 0&&(Z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Oe,We,De,gt,Ze,T,E,$,fe,le,de,Ie,be,Ae,Fe,Xe,ce,Je,L,re,pe,me,Le,ze;function Be(){Oe=new nx(Z),We=new $_(Z,Oe,e),Oe.init(We),me=new Uy(Z,Oe,We),De=new Ly(Z,Oe,We),gt=new rx(Z),Ze=new yy,T=new Dy(Z,Oe,De,Ze,We,me,gt),E=new J_(y),$=new tx(y),fe=new f0(Z,We),Le=new Z_(Z,Oe,fe,We),le=new ix(Z,fe,gt,Le),de=new lx(Z,le,fe,gt),L=new cx(Z,We,T),Xe=new j_(Ze),Ie=new xy(y,E,$,Oe,We,Le,Xe),be=new Oy(y,Ze),Ae=new Sy,Fe=new Ry(Oe,We),Je=new Y_(y,E,$,De,de,d,c),ce=new Iy(y,de,We),ze=new Fy(Z,gt,We,De),re=new K_(Z,Oe,gt,We),pe=new sx(Z,Oe,gt,We),gt.programs=Ie.programs,y.capabilities=We,y.extensions=Oe,y.properties=Ze,y.renderLists=Ae,y.shadowMap=ce,y.state=De,y.info=gt}Be();let Ke=new Jc(y,Z);this.xr=Ke,this.getContext=function(){return Z},this.getContextAttributes=function(){return Z.getContextAttributes()},this.forceContextLoss=function(){let v=Oe.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Oe.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(v){v!==void 0&&(te=v,this.setSize(G,W,!1))},this.getSize=function(v){return v.set(G,W)},this.setSize=function(v,A,C=!0){if(Ke.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=v,W=A,t.width=Math.floor(v*te),t.height=Math.floor(A*te),C===!0&&(t.style.width=v+"px",t.style.height=A+"px"),this.setViewport(0,0,v,A)},this.getDrawingBufferSize=function(v){return v.set(G*te,W*te).floor()},this.setDrawingBufferSize=function(v,A,C){G=v,W=A,te=C,t.width=Math.floor(v*C),t.height=Math.floor(A*C),this.setViewport(0,0,v,A)},this.getCurrentViewport=function(v){return v.copy(w)},this.getViewport=function(v){return v.copy(ee)},this.setViewport=function(v,A,C,U){v.isVector4?ee.set(v.x,v.y,v.z,v.w):ee.set(v,A,C,U),De.viewport(w.copy(ee).multiplyScalar(te).floor())},this.getScissor=function(v){return v.copy(oe)},this.setScissor=function(v,A,C,U){v.isVector4?oe.set(v.x,v.y,v.z,v.w):oe.set(v,A,C,U),De.scissor(H.copy(oe).multiplyScalar(te).floor())},this.getScissorTest=function(){return he},this.setScissorTest=function(v){De.setScissorTest(he=v)},this.setOpaqueSort=function(v){ne=v},this.setTransparentSort=function(v){J=v},this.getClearColor=function(v){return v.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor.apply(Je,arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha.apply(Je,arguments)},this.clear=function(v=!0,A=!0,C=!0){let U=0;if(v){let N=!1;if(P!==null){let j=P.texture.format;N=j===jd||j===$d||j===Kd}if(N){let j=P.texture.type,Y=j===$n||j===Ai||j===vl||j===di||j===Yd||j===Zd,Q=Je.getClearColor(),ae=Je.getClearAlpha(),ue=Q.r,ge=Q.g,Me=Q.b;Y?(p[0]=ue,p[1]=ge,p[2]=Me,p[3]=ae,Z.clearBufferuiv(Z.COLOR,0,p)):(g[0]=ue,g[1]=ge,g[2]=Me,g[3]=ae,Z.clearBufferiv(Z.COLOR,0,g))}else U|=Z.COLOR_BUFFER_BIT}A&&(U|=Z.DEPTH_BUFFER_BIT),C&&(U|=Z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z.clear(U)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",q,!1),t.removeEventListener("webglcontextrestored",z,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),Ae.dispose(),Fe.dispose(),Ze.dispose(),E.dispose(),$.dispose(),de.dispose(),Le.dispose(),ze.dispose(),Ie.dispose(),Ke.dispose(),Ke.removeEventListener("sessionstart",Qt),Ke.removeEventListener("sessionend",xt),_e&&(_e.dispose(),_e=null),en.stop()};function q(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function z(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let v=gt.autoReset,A=ce.enabled,C=ce.autoUpdate,U=ce.needsUpdate,N=ce.type;Be(),gt.autoReset=v,ce.enabled=A,ce.autoUpdate=C,ce.needsUpdate=U,ce.type=N}function xe(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function ye(v){let A=v.target;A.removeEventListener("dispose",ye),qe(A)}function qe(v){ke(v),Ze.remove(v)}function ke(v){let A=Ze.get(v).programs;A!==void 0&&(A.forEach(function(C){Ie.releaseProgram(C)}),v.isShaderMaterial&&Ie.releaseShaderCache(v))}this.renderBufferDirect=function(v,A,C,U,N,j){A===null&&(A=Ne);let Y=N.isMesh&&N.matrixWorld.determinant()<0,Q=x(v,A,C,U,N);De.setMaterial(U,Y);let ae=C.index,ue=1;if(U.wireframe===!0){if(ae=le.getWireframeAttribute(C),ae===void 0)return;ue=2}let ge=C.drawRange,Me=C.attributes.position,Ee=ge.start*ue,Re=(ge.start+ge.count)*ue;j!==null&&(Ee=Math.max(Ee,j.start*ue),Re=Math.min(Re,(j.start+j.count)*ue)),ae!==null?(Ee=Math.max(Ee,0),Re=Math.min(Re,ae.count)):Me!=null&&(Ee=Math.max(Ee,0),Re=Math.min(Re,Me.count));let He=Re-Ee;if(He<0||He===1/0)return;Le.setup(N,U,Q,C,ae);let pt,je=re;if(ae!==null&&(pt=fe.get(ae),je=pe,je.setIndex(pt)),N.isMesh)U.wireframe===!0?(De.setLineWidth(U.wireframeLinewidth*tt()),je.setMode(Z.LINES)):je.setMode(Z.TRIANGLES);else if(N.isLine){let Ye=U.linewidth;Ye===void 0&&(Ye=1),De.setLineWidth(Ye*tt()),N.isLineSegments?je.setMode(Z.LINES):N.isLineLoop?je.setMode(Z.LINE_LOOP):je.setMode(Z.LINE_STRIP)}else N.isPoints?je.setMode(Z.POINTS):N.isSprite&&je.setMode(Z.TRIANGLES);if(N.isBatchedMesh)je.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else if(N.isInstancedMesh)je.renderInstances(Ee,He,N.count);else if(C.isInstancedBufferGeometry){let Ye=C._maxInstanceCount!==void 0?C._maxInstanceCount:1/0,_t=Math.min(C.instanceCount,Ye);je.renderInstances(Ee,He,_t)}else je.render(Ee,He)};function ct(v,A,C){v.transparent===!0&&v.side===bn&&v.forceSinglePass===!1?(v.side=dn,v.needsUpdate=!0,nt(v,A,C),v.side=Pn,v.needsUpdate=!0,nt(v,A,C),v.side=bn):nt(v,A,C)}this.compile=function(v,A,C=null){C===null&&(C=v),m=Fe.get(C),m.init(),S.push(m),C.traverseVisible(function(N){N.isLight&&N.layers.test(A.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),v!==C&&v.traverseVisible(function(N){N.isLight&&N.layers.test(A.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),m.setupLights(y._useLegacyLights);let U=new Set;return v.traverse(function(N){let j=N.material;if(j)if(Array.isArray(j))for(let Y=0;Y<j.length;Y++){let Q=j[Y];ct(Q,C,N),U.add(Q)}else ct(j,C,N),U.add(j)}),S.pop(),m=null,U},this.compileAsync=function(v,A,C=null){let U=this.compile(v,A,C);return new Promise(N=>{function j(){if(U.forEach(function(Y){Ze.get(Y).currentProgram.isReady()&&U.delete(Y)}),U.size===0){N(v);return}setTimeout(j,10)}Oe.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let ht=null;function Ft(v){ht&&ht(v)}function Qt(){en.stop()}function xt(){en.start()}let en=new of;en.setAnimationLoop(Ft),typeof self<"u"&&en.setContext(self),this.setAnimationLoop=function(v){ht=v,Ke.setAnimationLoop(v),v===null?en.stop():en.start()},Ke.addEventListener("sessionstart",Qt),Ke.addEventListener("sessionend",xt),this.render=function(v,A){if(A!==void 0&&A.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),A.parent===null&&A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),Ke.enabled===!0&&Ke.isPresenting===!0&&(Ke.cameraAutoUpdate===!0&&Ke.updateCamera(A),A=Ke.getCamera()),v.isScene===!0&&v.onBeforeRender(y,v,A,P),m=Fe.get(v,S.length),m.init(),S.push(m),Te.multiplyMatrices(A.projectionMatrix,A.matrixWorldInverse),K.setFromProjectionMatrix(Te),Se=this.localClippingEnabled,se=Xe.init(this.clippingPlanes,Se),_=Ae.get(v,f.length),_.init(),f.push(_),An(v,A,0,y.sortObjects),_.finish(),y.sortObjects===!0&&_.sort(ne,J),this.info.render.frame++,se===!0&&Xe.beginShadows();let C=m.state.shadowsArray;if(ce.render(C,v,A),se===!0&&Xe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Je.render(_,v),m.setupLights(y._useLegacyLights),A.isArrayCamera){let U=A.cameras;for(let N=0,j=U.length;N<j;N++){let Y=U[N];Wi(_,v,Y,Y.viewport)}}else Wi(_,v,A);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),v.isScene===!0&&v.onAfterRender(y,v,A),Le.resetDefaultState(),k=-1,M=null,S.pop(),S.length>0?m=S[S.length-1]:m=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function An(v,A,C,U){if(v.visible===!1)return;if(v.layers.test(A.layers)){if(v.isGroup)C=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(A);else if(v.isLight)m.pushLight(v),v.castShadow&&m.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||K.intersectsSprite(v)){U&&Ge.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Te);let Y=de.update(v),Q=v.material;Q.visible&&_.push(v,Y,Q,C,Ge.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||K.intersectsObject(v))){let Y=de.update(v),Q=v.material;if(U&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Ge.copy(v.boundingSphere.center)):(Y.boundingSphere===null&&Y.computeBoundingSphere(),Ge.copy(Y.boundingSphere.center)),Ge.applyMatrix4(v.matrixWorld).applyMatrix4(Te)),Array.isArray(Q)){let ae=Y.groups;for(let ue=0,ge=ae.length;ue<ge;ue++){let Me=ae[ue],Ee=Q[Me.materialIndex];Ee&&Ee.visible&&_.push(v,Y,Ee,C,Ge.z,Me)}}else Q.visible&&_.push(v,Y,Q,C,Ge.z,null)}}let j=v.children;for(let Y=0,Q=j.length;Y<Q;Y++)An(j[Y],A,C,U)}function Wi(v,A,C,U){let N=v.opaque,j=v.transmissive,Y=v.transparent;m.setupLightsView(C),se===!0&&Xe.setGlobalState(y.clippingPlanes,C),j.length>0&&Qa(N,j,A,C),U&&De.viewport(w.copy(U)),N.length>0&&qn(N,A,C),j.length>0&&qn(j,A,C),Y.length>0&&qn(Y,A,C),De.buffers.depth.setTest(!0),De.buffers.depth.setMask(!0),De.buffers.color.setMask(!0),De.setPolygonOffset(!1)}function Qa(v,A,C,U){if((C.isScene===!0?C.overrideMaterial:null)!==null)return;let j=We.isWebGL2;_e===null&&(_e=new Xt(1,1,{generateMipmaps:!0,type:Oe.has("EXT_color_buffer_half_float")?Dt:$n,minFilter:Gn,samples:j?4:0})),y.getDrawingBufferSize(Ue),j?_e.setSize(Ue.x,Ue.y):_e.setSize(No(Ue.x),No(Ue.y));let Y=y.getRenderTarget();y.setRenderTarget(_e),y.getClearColor(ie),D=y.getClearAlpha(),D<1&&y.setClearColor(16777215,.5),y.clear();let Q=y.toneMapping;y.toneMapping=Kn,qn(v,C,U),T.updateMultisampleRenderTarget(_e),T.updateRenderTargetMipmap(_e);let ae=!1;for(let ue=0,ge=A.length;ue<ge;ue++){let Me=A[ue],Ee=Me.object,Re=Me.geometry,He=Me.material,pt=Me.group;if(He.side===bn&&Ee.layers.test(U.layers)){let je=He.side;He.side=dn,He.needsUpdate=!0,yi(Ee,C,U,Re,He,pt),He.side=je,He.needsUpdate=!0,ae=!0}}ae===!0&&(T.updateMultisampleRenderTarget(_e),T.updateRenderTargetMipmap(_e)),y.setRenderTarget(Y),y.setClearColor(ie,D),y.toneMapping=Q}function qn(v,A,C){let U=A.isScene===!0?A.overrideMaterial:null;for(let N=0,j=v.length;N<j;N++){let Y=v[N],Q=Y.object,ae=Y.geometry,ue=U===null?Y.material:U,ge=Y.group;Q.layers.test(C.layers)&&yi(Q,A,C,ae,ue,ge)}}function yi(v,A,C,U,N,j){v.onBeforeRender(y,A,C,U,N,j),v.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),N.onBeforeRender(y,A,C,U,v,j),N.transparent===!0&&N.side===bn&&N.forceSinglePass===!1?(N.side=dn,N.needsUpdate=!0,y.renderBufferDirect(C,A,U,N,v,j),N.side=Pn,N.needsUpdate=!0,y.renderBufferDirect(C,A,U,N,v,j),N.side=bn):y.renderBufferDirect(C,A,U,N,v,j),v.onAfterRender(y,A,C,U,N,j)}function nt(v,A,C){A.isScene!==!0&&(A=Ne);let U=Ze.get(v),N=m.state.lights,j=m.state.shadowsArray,Y=N.state.version,Q=Ie.getParameters(v,N.state,j,A,C),ae=Ie.getProgramCacheKey(Q),ue=U.programs;U.environment=v.isMeshStandardMaterial?A.environment:null,U.fog=A.fog,U.envMap=(v.isMeshStandardMaterial?$:E).get(v.envMap||U.environment),ue===void 0&&(v.addEventListener("dispose",ye),ue=new Map,U.programs=ue);let ge=ue.get(ae);if(ge!==void 0){if(U.currentProgram===ge&&U.lightsStateVersion===Y)return Qr(v,Q),ge}else Q.uniforms=Ie.getUniforms(v),v.onBuild(C,Q,y),v.onBeforeCompile(Q,y),ge=Ie.acquireProgram(Q,ae),ue.set(ae,ge),U.uniforms=Q.uniforms;let Me=U.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Me.clippingPlanes=Xe.uniform),Qr(v,Q),U.needsLights=O(v),U.lightsStateVersion=Y,U.needsLights&&(Me.ambientLightColor.value=N.state.ambient,Me.lightProbe.value=N.state.probe,Me.directionalLights.value=N.state.directional,Me.directionalLightShadows.value=N.state.directionalShadow,Me.spotLights.value=N.state.spot,Me.spotLightShadows.value=N.state.spotShadow,Me.rectAreaLights.value=N.state.rectArea,Me.ltc_1.value=N.state.rectAreaLTC1,Me.ltc_2.value=N.state.rectAreaLTC2,Me.pointLights.value=N.state.point,Me.pointLightShadows.value=N.state.pointShadow,Me.hemisphereLights.value=N.state.hemi,Me.directionalShadowMap.value=N.state.directionalShadowMap,Me.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Me.spotShadowMap.value=N.state.spotShadowMap,Me.spotLightMatrix.value=N.state.spotLightMatrix,Me.spotLightMap.value=N.state.spotLightMap,Me.pointShadowMap.value=N.state.pointShadowMap,Me.pointShadowMatrix.value=N.state.pointShadowMatrix),U.currentProgram=ge,U.uniformsList=null,ge}function sr(v){if(v.uniformsList===null){let A=v.currentProgram.getUniforms();v.uniformsList=Us.seqWithValue(A.seq,v.uniforms)}return v.uniformsList}function Qr(v,A){let C=Ze.get(v);C.outputColorSpace=A.outputColorSpace,C.batching=A.batching,C.instancing=A.instancing,C.instancingColor=A.instancingColor,C.skinning=A.skinning,C.morphTargets=A.morphTargets,C.morphNormals=A.morphNormals,C.morphColors=A.morphColors,C.morphTargetsCount=A.morphTargetsCount,C.numClippingPlanes=A.numClippingPlanes,C.numIntersection=A.numClipIntersection,C.vertexAlphas=A.vertexAlphas,C.vertexTangents=A.vertexTangents,C.toneMapping=A.toneMapping}function x(v,A,C,U,N){A.isScene!==!0&&(A=Ne),T.resetTextureUnits();let j=A.fog,Y=U.isMeshStandardMaterial?A.environment:null,Q=P===null?y.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Tt,ae=(U.isMeshStandardMaterial?$:E).get(U.envMap||Y),ue=U.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,ge=!!C.attributes.tangent&&(!!U.normalMap||U.anisotropy>0),Me=!!C.morphAttributes.position,Ee=!!C.morphAttributes.normal,Re=!!C.morphAttributes.color,He=Kn;U.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(He=y.toneMapping);let pt=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,je=pt!==void 0?pt.length:0,Ye=Ze.get(U),_t=m.state.lights;if(se===!0&&(Se===!0||v!==M)){let Pt=v===M&&U.id===k;Xe.setState(U,v,Pt)}let Ve=!1;U.version===Ye.__version?(Ye.needsLights&&Ye.lightsStateVersion!==_t.state.version||Ye.outputColorSpace!==Q||N.isBatchedMesh&&Ye.batching===!1||!N.isBatchedMesh&&Ye.batching===!0||N.isInstancedMesh&&Ye.instancing===!1||!N.isInstancedMesh&&Ye.instancing===!0||N.isSkinnedMesh&&Ye.skinning===!1||!N.isSkinnedMesh&&Ye.skinning===!0||N.isInstancedMesh&&Ye.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ye.instancingColor===!1&&N.instanceColor!==null||Ye.envMap!==ae||U.fog===!0&&Ye.fog!==j||Ye.numClippingPlanes!==void 0&&(Ye.numClippingPlanes!==Xe.numPlanes||Ye.numIntersection!==Xe.numIntersection)||Ye.vertexAlphas!==ue||Ye.vertexTangents!==ge||Ye.morphTargets!==Me||Ye.morphNormals!==Ee||Ye.morphColors!==Re||Ye.toneMapping!==He||We.isWebGL2===!0&&Ye.morphTargetsCount!==je)&&(Ve=!0):(Ve=!0,Ye.__version=U.version);let Mt=Ye.currentProgram;Ve===!0&&(Mt=nt(U,A,N));let pn=!1,Rt=!1,ut=!1,Qe=Mt.getUniforms(),tn=Ye.uniforms;if(De.useProgram(Mt.program)&&(pn=!0,Rt=!0,ut=!0),U.id!==k&&(k=U.id,Rt=!0),pn||M!==v){Qe.setValue(Z,"projectionMatrix",v.projectionMatrix),Qe.setValue(Z,"viewMatrix",v.matrixWorldInverse);let Pt=Qe.map.cameraPosition;Pt!==void 0&&Pt.setValue(Z,Ge.setFromMatrixPosition(v.matrixWorld)),We.logarithmicDepthBuffer&&Qe.setValue(Z,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshLambertMaterial||U.isMeshBasicMaterial||U.isMeshStandardMaterial||U.isShaderMaterial)&&Qe.setValue(Z,"isOrthographic",v.isOrthographicCamera===!0),M!==v&&(M=v,Rt=!0,ut=!0)}if(N.isSkinnedMesh){Qe.setOptional(Z,N,"bindMatrix"),Qe.setOptional(Z,N,"bindMatrixInverse");let Pt=N.skeleton;Pt&&(We.floatVertexTextures?(Pt.boneTexture===null&&Pt.computeBoneTexture(),Qe.setValue(Z,"boneTexture",Pt.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}N.isBatchedMesh&&(Qe.setOptional(Z,N,"batchingTexture"),Qe.setValue(Z,"batchingTexture",N._matricesTexture,T));let ii=C.morphAttributes;if((ii.position!==void 0||ii.normal!==void 0||ii.color!==void 0&&We.isWebGL2===!0)&&L.update(N,C,Mt),(Rt||Ye.receiveShadow!==N.receiveShadow)&&(Ye.receiveShadow=N.receiveShadow,Qe.setValue(Z,"receiveShadow",N.receiveShadow)),U.isMeshGouraudMaterial&&U.envMap!==null&&(tn.envMap.value=ae,tn.flipEnvMap.value=ae.isCubeTexture&&ae.isRenderTargetTexture===!1?-1:1),Rt&&(Qe.setValue(Z,"toneMappingExposure",y.toneMappingExposure),Ye.needsLights&&b(tn,ut),j&&U.fog===!0&&be.refreshFogUniforms(tn,j),be.refreshMaterialUniforms(tn,U,te,W,_e),Us.upload(Z,sr(Ye),tn,T)),U.isShaderMaterial&&U.uniformsNeedUpdate===!0&&(Us.upload(Z,sr(Ye),tn,T),U.uniformsNeedUpdate=!1),U.isSpriteMaterial&&Qe.setValue(Z,"center",N.center),Qe.setValue(Z,"modelViewMatrix",N.modelViewMatrix),Qe.setValue(Z,"normalMatrix",N.normalMatrix),Qe.setValue(Z,"modelMatrix",N.matrixWorld),U.isShaderMaterial||U.isRawShaderMaterial){let Pt=U.uniformsGroups;for(let Mi=0,Bm=Pt.length;Mi<Bm;Mi++)if(We.isWebGL2){let Qh=Pt[Mi];ze.update(Qh,Mt),ze.bind(Qh,Mt)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Mt}function b(v,A){v.ambientLightColor.needsUpdate=A,v.lightProbe.needsUpdate=A,v.directionalLights.needsUpdate=A,v.directionalLightShadows.needsUpdate=A,v.pointLights.needsUpdate=A,v.pointLightShadows.needsUpdate=A,v.spotLights.needsUpdate=A,v.spotLightShadows.needsUpdate=A,v.rectAreaLights.needsUpdate=A,v.hemisphereLights.needsUpdate=A}function O(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(v,A,C){Ze.get(v.texture).__webglTexture=A,Ze.get(v.depthTexture).__webglTexture=C;let U=Ze.get(v);U.__hasExternalTextures=!0,U.__hasExternalTextures&&(U.__autoAllocateDepthBuffer=C===void 0,U.__autoAllocateDepthBuffer||Oe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),U.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(v,A){let C=Ze.get(v);C.__webglFramebuffer=A,C.__useDefaultFramebuffer=A===void 0},this.setRenderTarget=function(v,A=0,C=0){P=v,F=A,I=C;let U=!0,N=null,j=!1,Y=!1;if(v){let ae=Ze.get(v);ae.__useDefaultFramebuffer!==void 0?(De.bindFramebuffer(Z.FRAMEBUFFER,null),U=!1):ae.__webglFramebuffer===void 0?T.setupRenderTarget(v):ae.__hasExternalTextures&&T.rebindTextures(v,Ze.get(v.texture).__webglTexture,Ze.get(v.depthTexture).__webglTexture);let ue=v.texture;(ue.isData3DTexture||ue.isDataArrayTexture||ue.isCompressedArrayTexture)&&(Y=!0);let ge=Ze.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(ge[A])?N=ge[A][C]:N=ge[A],j=!0):We.isWebGL2&&v.samples>0&&T.useMultisampledRTT(v)===!1?N=Ze.get(v).__webglMultisampledFramebuffer:Array.isArray(ge)?N=ge[C]:N=ge,w.copy(v.viewport),H.copy(v.scissor),X=v.scissorTest}else w.copy(ee).multiplyScalar(te).floor(),H.copy(oe).multiplyScalar(te).floor(),X=he;if(De.bindFramebuffer(Z.FRAMEBUFFER,N)&&We.drawBuffers&&U&&De.drawBuffers(v,N),De.viewport(w),De.scissor(H),De.setScissorTest(X),j){let ae=Ze.get(v.texture);Z.framebufferTexture2D(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_CUBE_MAP_POSITIVE_X+A,ae.__webglTexture,C)}else if(Y){let ae=Ze.get(v.texture),ue=A||0;Z.framebufferTextureLayer(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,ae.__webglTexture,C||0,ue)}k=-1},this.readRenderTargetPixels=function(v,A,C,U,N,j,Y){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Q=Ze.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Y!==void 0&&(Q=Q[Y]),Q){De.bindFramebuffer(Z.FRAMEBUFFER,Q);try{let ae=v.texture,ue=ae.format,ge=ae.type;if(ue!==hn&&me.convert(ue)!==Z.getParameter(Z.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Me=ge===Dt&&(Oe.has("EXT_color_buffer_half_float")||We.isWebGL2&&Oe.has("EXT_color_buffer_float"));if(ge!==$n&&me.convert(ge)!==Z.getParameter(Z.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ge===nn&&(We.isWebGL2||Oe.has("OES_texture_float")||Oe.has("WEBGL_color_buffer_float")))&&!Me){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}A>=0&&A<=v.width-U&&C>=0&&C<=v.height-N&&Z.readPixels(A,C,U,N,me.convert(ue),me.convert(ge),j)}finally{let ae=P!==null?Ze.get(P).__webglFramebuffer:null;De.bindFramebuffer(Z.FRAMEBUFFER,ae)}}},this.copyFramebufferToTexture=function(v,A,C=0){let U=Math.pow(2,-C),N=Math.floor(A.image.width*U),j=Math.floor(A.image.height*U);T.setTexture2D(A,0),Z.copyTexSubImage2D(Z.TEXTURE_2D,C,0,0,v.x,v.y,N,j),De.unbindTexture()},this.copyTextureToTexture=function(v,A,C,U=0){let N=A.image.width,j=A.image.height,Y=me.convert(C.format),Q=me.convert(C.type);T.setTexture2D(C,0),Z.pixelStorei(Z.UNPACK_FLIP_Y_WEBGL,C.flipY),Z.pixelStorei(Z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),Z.pixelStorei(Z.UNPACK_ALIGNMENT,C.unpackAlignment),A.isDataTexture?Z.texSubImage2D(Z.TEXTURE_2D,U,v.x,v.y,N,j,Y,Q,A.image.data):A.isCompressedTexture?Z.compressedTexSubImage2D(Z.TEXTURE_2D,U,v.x,v.y,A.mipmaps[0].width,A.mipmaps[0].height,Y,A.mipmaps[0].data):Z.texSubImage2D(Z.TEXTURE_2D,U,v.x,v.y,Y,Q,A.image),U===0&&C.generateMipmaps&&Z.generateMipmap(Z.TEXTURE_2D),De.unbindTexture()},this.copyTextureToTexture3D=function(v,A,C,U,N=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let j=v.max.x-v.min.x+1,Y=v.max.y-v.min.y+1,Q=v.max.z-v.min.z+1,ae=me.convert(U.format),ue=me.convert(U.type),ge;if(U.isData3DTexture)T.setTexture3D(U,0),ge=Z.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)T.setTexture2DArray(U,0),ge=Z.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}Z.pixelStorei(Z.UNPACK_FLIP_Y_WEBGL,U.flipY),Z.pixelStorei(Z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),Z.pixelStorei(Z.UNPACK_ALIGNMENT,U.unpackAlignment);let Me=Z.getParameter(Z.UNPACK_ROW_LENGTH),Ee=Z.getParameter(Z.UNPACK_IMAGE_HEIGHT),Re=Z.getParameter(Z.UNPACK_SKIP_PIXELS),He=Z.getParameter(Z.UNPACK_SKIP_ROWS),pt=Z.getParameter(Z.UNPACK_SKIP_IMAGES),je=C.isCompressedTexture?C.mipmaps[N]:C.image;Z.pixelStorei(Z.UNPACK_ROW_LENGTH,je.width),Z.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,je.height),Z.pixelStorei(Z.UNPACK_SKIP_PIXELS,v.min.x),Z.pixelStorei(Z.UNPACK_SKIP_ROWS,v.min.y),Z.pixelStorei(Z.UNPACK_SKIP_IMAGES,v.min.z),C.isDataTexture||C.isData3DTexture?Z.texSubImage3D(ge,N,A.x,A.y,A.z,j,Y,Q,ae,ue,je.data):C.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),Z.compressedTexSubImage3D(ge,N,A.x,A.y,A.z,j,Y,Q,ae,je.data)):Z.texSubImage3D(ge,N,A.x,A.y,A.z,j,Y,Q,ae,ue,je),Z.pixelStorei(Z.UNPACK_ROW_LENGTH,Me),Z.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,Ee),Z.pixelStorei(Z.UNPACK_SKIP_PIXELS,Re),Z.pixelStorei(Z.UNPACK_SKIP_ROWS,He),Z.pixelStorei(Z.UNPACK_SKIP_IMAGES,pt),N===0&&U.generateMipmaps&&Z.generateMipmap(ge),De.unbindTexture()},this.initTexture=function(v){v.isCubeTexture?T.setTextureCube(v,0):v.isData3DTexture?T.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?T.setTexture2DArray(v,0):T.setTexture2D(v,0),De.unbindTexture()},this.resetState=function(){F=0,I=0,P=null,De.reset(),Le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===yl?"display-p3":"srgb",t.unpackColorSpace=dt.workingColorSpace===ha?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===mt?Qi:ef}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Qi?mt:Tt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},Qc=class extends Er{};Qc.prototype.isWebGL1Renderer=!0;var Hs=class extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},br=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Fc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Vn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},mn=new B,wr=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix4(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyNormalMatrix(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.transformDirection(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Zn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Zn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Zn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Zn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array),r=yt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Lt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Sd=new B,Ed=new Et,bd=new Et,By=new B,wd=new $e,Eo=new B,Rc=new wn,Td=new $e,Cc=new fi,Wo=class extends lt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=au,this.bindMatrix=new $e,this.bindMatrixInverse=new $e,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new sn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Eo),this.boundingBox.expandByPoint(Eo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new wn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Eo),this.boundingSphere.expandByPoint(Eo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rc.copy(this.boundingSphere),Rc.applyMatrix4(i),e.ray.intersectsSphere(Rc)!==!1&&(Td.copy(i).invert(),Cc.copy(e.ray).applyMatrix4(Td),!(this.boundingBox!==null&&Cc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Cc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Et,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===au?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ug?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Ed.fromBufferAttribute(i.attributes.skinIndex,e),bd.fromBufferAttribute(i.attributes.skinWeight,e),Sd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=bd.getComponent(r);if(o!==0){let a=Ed.getComponent(r);wd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(By.copy(Sd).applyMatrix4(wd),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},Tr=class extends Ut{constructor(){super(),this.isBone=!0,this.type="Bone"}},Pi=class extends Wt{constructor(e=null,t=1,n=1,i,r,o,a,c,l=It,h=It,u,d){super(null,o,a,c,l,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ad=new $e,zy=new $e,Xo=class s{constructor(e=[],t=[]){this.uuid=Vn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new $e)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new $e;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:zy;Ad.multiplyMatrices(a,t[r]),Ad.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Pi(t,e,e,hn,nn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Tr),this.bones.push(o),this.boneInverses.push(new $e().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},ts=class extends Lt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Rs=new $e,Rd=new $e,bo=[],Cd=new sn,ky=new $e,lr=new lt,hr=new wn,ns=class extends lt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ts(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,ky)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new sn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rs),Cd.copy(e.boundingBox).applyMatrix4(Rs),this.boundingBox.union(Cd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new wn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rs),hr.copy(e.boundingSphere).applyMatrix4(Rs),this.boundingSphere.union(hr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,i=this.count;if(lr.geometry=this.geometry,lr.material=this.material,lr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hr.copy(this.boundingSphere),hr.applyMatrix4(n),e.ray.intersectsSphere(hr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Rs),Rd.multiplyMatrices(n,Rs),lr.matrixWorld=Rd,lr.raycast(e,bo);for(let o=0,a=bo.length;o<a;o++){let c=bo[o];c.instanceId=r,c.object=this,t.push(c)}bo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ts(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Ar=class extends vn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ce(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Pd=new B,Id=new B,Ld=new $e,Pc=new fi,wo=new wn,Vs=class extends Ut{constructor(e=new qt,t=new Ar){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Pd.fromBufferAttribute(t,i-1),Id.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Pd.distanceTo(Id);e.setAttribute("lineDistance",new Ct(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wo.copy(n.boundingSphere),wo.applyMatrix4(i),wo.radius+=r,e.ray.intersectsSphere(wo)===!1)return;Ld.copy(i).invert(),Pc.copy(e.ray).applyMatrix4(Ld);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new B,h=new B,u=new B,d=new B,p=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let f=Math.max(0,o.start),S=Math.min(g.count,o.start+o.count);for(let y=f,R=S-1;y<R;y+=p){let F=g.getX(y),I=g.getX(y+1);if(l.fromBufferAttribute(m,F),h.fromBufferAttribute(m,I),Pc.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);let k=e.ray.origin.distanceTo(d);k<e.near||k>e.far||t.push({distance:k,point:u.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{let f=Math.max(0,o.start),S=Math.min(m.count,o.start+o.count);for(let y=f,R=S-1;y<R;y+=p){if(l.fromBufferAttribute(m,y),h.fromBufferAttribute(m,y+1),Pc.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);let I=e.ray.origin.distanceTo(d);I<e.near||I>e.far||t.push({distance:I,point:u.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},Dd=new B,Ud=new B,qo=class extends Vs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Dd.fromBufferAttribute(t,i),Ud.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Dd.distanceTo(Ud);e.setAttribute("lineDistance",new Ct(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Yo=class extends Vs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Rr=class extends vn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ce(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Nd=new $e,el=new fi,To=new wn,Ao=new B,Zo=class extends Ut{constructor(e=new qt,t=new Rr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),To.copy(n.boundingSphere),To.applyMatrix4(i),To.radius+=r,e.ray.intersectsSphere(To)===!1)return;Nd.copy(i).invert(),el.copy(e.ray).applyMatrix4(Nd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=d,_=p;g<_;g++){let m=l.getX(g);Ao.fromBufferAttribute(u,m),Od(Ao,m,c,i,e,t,this)}}else{let d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,_=p;g<_;g++)Ao.fromBufferAttribute(u,g),Od(Ao,g,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Od(s,e,t,n,i,r,o){let a=el.distanceSqToPoint(s);if(a<t){let c=new B;el.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}var Ko=class extends Wt{constructor(e,t,n,i,r,o,a,c,l){super(e,t,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Cr=class s extends qt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new B,h=new Pe;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let p=n+u/t*i;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ct(o,3)),this.setAttribute("normal",new Ct(a,3)),this.setAttribute("uv",new Ct(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}};var Gs=class s extends qt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new B,d=new B,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){let S=[],y=f/n,R=0;f===0&&o===0?R=.5/t:f===n&&c===Math.PI&&(R=-.5/t);for(let F=0;F<=t;F++){let I=F/t;u.x=-e*Math.cos(i+I*r)*Math.sin(o+y*a),u.y=e*Math.cos(o+y*a),u.z=e*Math.sin(i+I*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(I+R,1-y),S.push(l++)}h.push(S)}for(let f=0;f<n;f++)for(let S=0;S<t;S++){let y=h[f][S+1],R=h[f][S],F=h[f+1][S],I=h[f+1][S+1];(f!==0||o>0)&&p.push(y,R,I),(f!==n-1||c<Math.PI)&&p.push(R,F,I)}this.setIndex(p),this.setAttribute("position",new Ct(g,3)),this.setAttribute("normal",new Ct(_,3)),this.setAttribute("uv",new Ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var $o=class s extends qt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let o=[],a=[],c=[],l=[],h=new B,u=new B,d=new B;for(let p=0;p<=n;p++)for(let g=0;g<=i;g++){let _=g/i*r,m=p/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/i),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=i;g++){let _=(i+1)*p+g-1,m=(i+1)*(p-1)+g-1,f=(i+1)*(p-1)+g,S=(i+1)*p+g;o.push(_,m,S),o.push(m,f,S)}this.setIndex(o),this.setAttribute("position",new Ct(a,3)),this.setAttribute("normal",new Ct(c,3)),this.setAttribute("uv",new Ct(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var jo=class extends vn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ce(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}},Jo=class extends Nt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ws=class extends vn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ce(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xl,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ln=class extends Ws{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return jt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ce(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ce(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ce(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Qo=class extends vn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xl,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}};function Ro(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Hy(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Vy(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Fd(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)i[o++]=s[a+c]}return i}function df(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}var Ii=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},tl=class extends Ii{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Du,endingEnd:Du}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Uu:r=e,a=2*t-n;break;case Nu:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Uu:o=e,c=2*n-t;break;case Nu:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,f=-d*m+2*d*_-d*g,S=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,y=(-1-p)*m+(1.5+p)*_+.5*g,R=p*m-p*_;for(let F=0;F!==a;++F)r[F]=f*o[h+F]+S*o[l+F]+y*o[c+F]+R*o[u+F];return r}},nl=class extends Ii{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},il=class extends Ii{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Dn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ro(t,this.TimeBufferType),this.values=Ro(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ro(e.times,Array),values:Ro(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new il(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new nl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new tl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Fs:t=this.InterpolantFactoryMethodDiscrete;break;case es:t=this.InterpolantFactoryMethodLinear;break;case rc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fs;case this.InterpolantFactoryMethodLinear:return es;case this.InterpolantFactoryMethodSmooth:return rc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&Hy(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===rc,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(i)c=!0;else{let u=a*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){let _=t[u+g];if(_!==t[d+g]||_!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let p=0;p!==n;++p)t[d+p]=t[u+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Dn.prototype.TimeBufferType=Float32Array;Dn.prototype.ValueBufferType=Float32Array;Dn.prototype.DefaultInterpolation=es;var Li=class extends Dn{};Li.prototype.ValueTypeName="bool";Li.prototype.ValueBufferType=Array;Li.prototype.DefaultInterpolation=Fs;Li.prototype.InterpolantFactoryMethodLinear=void 0;Li.prototype.InterpolantFactoryMethodSmooth=void 0;var ea=class extends Dn{};ea.prototype.ValueTypeName="color";var pi=class extends Dn{};pi.prototype.ValueTypeName="number";var sl=class extends Ii{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t),l=e*a;for(let h=l+a;l!==h;l+=4)_n.slerpFlat(r,0,o,l-a,o,l,c);return r}},ei=class extends Dn{InterpolantFactoryMethodLinear(e){return new sl(this.times,this.values,this.getValueSize(),e)}};ei.prototype.ValueTypeName="quaternion";ei.prototype.DefaultInterpolation=es;ei.prototype.InterpolantFactoryMethodSmooth=void 0;var Di=class extends Dn{};Di.prototype.ValueTypeName="string";Di.prototype.ValueBufferType=Array;Di.prototype.DefaultInterpolation=Fs;Di.prototype.InterpolantFactoryMethodLinear=void 0;Di.prototype.InterpolantFactoryMethodSmooth=void 0;var mi=class extends Dn{};mi.prototype.ValueTypeName="vector";var ta=class{constructor(e,t=-1,n,i=xg){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Vn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Wy(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Dn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=Vy(c);c=Fd(c,1,h),l=Fd(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new pi(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(l)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,p,g,_){if(p.length!==0){let m=[],f=[];df(p,m,f,g),m.length!==0&&_.push(new u(d,m,f))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let p={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)p[d[g].morphTargets[_]]=-1;for(let _ in p){let m=[],f=[];for(let S=0;S!==d[g].morphTargets.length;++S){let y=d[g];m.push(y.time),f.push(y.morphTarget===_?1:0)}i.push(new pi(".morphTargetInfluence["+_+"]",m,f))}c=p.length*o}else{let p=".bones["+t[u].name+"]";n(mi,p+".position",d,"pos",i),n(ei,p+".quaternion",d,"rot",i),n(mi,p+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function Gy(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return pi;case"vector":case"vector2":case"vector3":case"vector4":return mi;case"color":return ea;case"quaternion":return ei;case"bool":case"boolean":return Li;case"string":return Di}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Wy(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Gy(s.type);if(s.times===void 0){let t=[],n=[];df(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var Ri={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},rl=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},Xy=new rl,Un=class{constructor(e){this.manager=e!==void 0?e:Xy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Un.DEFAULT_MATERIAL_NAME="__DEFAULT";var li={},ol=class extends Error{constructor(e,t){super(e),this.response=t}},gi=class extends Un{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Ri.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(li[e]!==void 0){li[e].push({onLoad:t,onProgress:n,onError:i});return}li[e]=[],li[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=li[e],u=l.body.getReader(),d=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),p=d?parseInt(d):0,g=p!==0,_=0,m=new ReadableStream({start(f){S();function S(){u.read().then(({done:y,value:R})=>{if(y)f.close();else{_+=R.byteLength;let F=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let I=0,P=h.length;I<P;I++){let k=h[I];k.onProgress&&k.onProgress(F)}f.enqueue(R),S()}})}}});return new Response(m)}else throw new ol(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(d);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{Ri.add(e,l);let h=li[e];delete li[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onLoad&&p.onLoad(l)}}).catch(l=>{let h=li[e];if(h===void 0)throw this.manager.itemError(e),l;delete li[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var al=class extends Un{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Ri.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=_r("img");function c(){h(),Ri.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var Xs=class extends Un{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new Pi,a=new gi(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(c){let l;try{l=r.parse(c)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}l.image!==void 0?o.image=l.image:l.data!==void 0&&(o.image.width=l.width,o.image.height=l.height,o.image.data=l.data),o.wrapS=l.wrapS!==void 0?l.wrapS:Ot,o.wrapT=l.wrapT!==void 0?l.wrapT:Ot,o.magFilter=l.magFilter!==void 0?l.magFilter:wt,o.minFilter=l.minFilter!==void 0?l.minFilter:wt,o.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0?o.colorSpace=l.colorSpace:l.encoding!==void 0&&(o.encoding=l.encoding),l.flipY!==void 0&&(o.flipY=l.flipY),l.format!==void 0&&(o.format=l.format),l.type!==void 0&&(o.type=l.type),l.mipmaps!==void 0&&(o.mipmaps=l.mipmaps,o.minFilter=Gn),l.mipmapCount===1&&(o.minFilter=wt),l.generateMipmaps!==void 0&&(o.generateMipmaps=l.generateMipmaps),o.needsUpdate=!0,t&&t(o,l)},n,i),o}},Ui=class extends Un{constructor(e){super(e)}load(e,t,n,i){let r=new Wt,o=new al(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},Pr=class extends Ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ce(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}};var Ic=new $e,Bd=new B,zd=new B,Ir=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pe(512,512),this.map=null,this.mapPass=null,this.matrix=new $e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mr,this._frameExtents=new Pe(1,1),this._viewportCount=1,this._viewports=[new Et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Bd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bd),zd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zd),t.updateMatrixWorld(),Ic.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ic),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ic)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},cl=class extends Ir{constructor(){super(new kt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Bs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},na=class extends Pr{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new cl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},kd=new $e,ur=new B,Lc=new B,ll=class extends Ir{constructor(){super(new kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Pe(4,2),this._viewportCount=6,this._viewports=[new Et(2,1,1,1),new Et(0,1,1,1),new Et(3,1,1,1),new Et(1,1,1,1),new Et(3,0,1,1),new Et(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ur.setFromMatrixPosition(e.matrixWorld),n.position.copy(ur),Lc.copy(n.position),Lc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Lc),n.updateMatrixWorld(),i.makeTranslation(-ur.x,-ur.y,-ur.z),kd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kd)}},ia=class extends Pr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ll}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},hl=class extends Ir{constructor(){super(new Jn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},qs=class extends Pr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.shadow=new hl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Ni=class{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var sa=class extends Un{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Ri.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ri.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Ri.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Ri.add(e,c),r.manager.itemStart(e)}};var Ys=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Hd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=Hd();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function Hd(){return(typeof performance>"u"?Date:performance).now()}var El="\\[\\]\\.:\\/",qy=new RegExp("["+El+"]","g"),bl="[^"+El+"]",Yy="[^"+El.replace("\\.","")+"]",Zy=/((?:WC+[\/:])*)/.source.replace("WC",bl),Ky=/(WCOD+)?/.source.replace("WCOD",Yy),$y=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",bl),jy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",bl),Jy=new RegExp("^"+Zy+Ky+$y+jy+"$"),Qy=["material","materials","bones","map"],ul=class{constructor(e,t,n){let i=n||bt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},bt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(qy,"")}static parseTrackName(e){let t=Jy.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Qy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[i];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};bt.Composite=ul;bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};bt.prototype.GetterByBindingType=[bt.prototype._getValue_direct,bt.prototype._getValue_array,bt.prototype._getValue_arrayElement,bt.prototype._getValue_toArray];bt.prototype.SetterByBindingTypeAndVersioning=[[bt.prototype._setValue_direct,bt.prototype._setValue_direct_setNeedsUpdate,bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_array,bt.prototype._setValue_array_setNeedsUpdate,bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_arrayElement,bt.prototype._setValue_arrayElement_setNeedsUpdate,bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_fromArray,bt.prototype._setValue_fromArray_setNeedsUpdate,bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var lE=new Float32Array(1);var ra=class{constructor(e,t,n=0,i=1/0){this.ray=new fi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new xr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return dl(e,this,n,t),n.sort(Vd),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)dl(e[i],this,n,t);return n.sort(Vd),n}};function Vd(s,e){return s.distance-e.distance}function dl(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){let i=s.children;for(let r=0,o=i.length;r<o;r++)dl(i[r],e,t,!0)}}var Lr=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(jt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");function ff(){return new Hs}var eM=.1,tM=100;function pf(s,e){let{fov:t,position:n}=s.camera,i=new kt(t,e,eM,tM);return i.position.set(n.x,n.y,n.z),i}var nM={aces:Ks,agx:rs,none:Kn};function mf(s){let{antialias:e,preserveDrawingBuffer:t,alpha:n,maxPixelRatio:i,toneMappingExposure:r,shadows:o}=s.renderer,a=new Er({antialias:e,preserveDrawingBuffer:t,alpha:n,powerPreference:"high-performance"});return a.setPixelRatio(Math.min(window.devicePixelRatio,i)),a.setClearAlpha(0),a.outputColorSpace=mt,a.toneMapping=nM[s.renderer.toneMapping]??Ks,a.toneMappingExposure=r,o&&(a.shadowMap.enabled=!0,a.shadowMap.type=Hn),a}function gf(s,e){let{shadow:t}=e.lighting,n=new Ht;n.name="LightingRig";let i=new qs(16777215,0);if(i.name="KeyLight",e.renderer.shadows){i.castShadow=!0,i.shadow.mapSize.set(t.mapSize,t.mapSize),i.shadow.radius=t.radius,i.shadow.blurSamples=t.blurSamples;let r=i.shadow.camera;r.near=t.near,r.far=t.far,r.left=-t.frustum,r.right=t.frustum,r.top=t.frustum,r.bottom=-t.frustum,r.updateProjectionMatrix(),i.shadow.bias=t.bias,i.shadow.normalBias=t.normalBias}return n.add(i),n.add(i.target),s.add(n),n}function wl(s,e,t){let n=t.lighting.keyLight;if(!(n!=null&&n.enabled))return null;let i=s.getObjectByName("KeyLight");return i?(i.position.copy(e.direction).multiplyScalar(n.distance),i.target.position.set(0,0,0),i.target.updateMatrixWorld(),n.useColor&&i.color.copy(e.color),i.intensity=e.irradiance*n.intensityScale,i):null}var vf={type:"change"},Tl={type:"start"},_f={type:"end"},da=new fi,xf=new En,iM=Math.cos(70*rn.DEG2RAD),fa=class extends jn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:is.ROTATE,MIDDLE:is.DOLLY,RIGHT:is.PAN},this.touches={ONE:ss.ROTATE,TWO:ss.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(L){L.addEventListener("keydown",de),this._domElementKeyEvents=L},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",de),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(vf),n.update(),r=i.NONE},this.update=(function(){let L=new B,re=new _n().setFromUnitVectors(e.up,new B(0,1,0)),pe=re.clone().invert(),me=new B,Le=new _n,ze=new B,Be=2*Math.PI;return function(q=null){let z=n.object.position;L.copy(z).sub(n.target),L.applyQuaternion(re),a.setFromVector3(L),n.autoRotate&&r===i.NONE&&H(M(q)),n.enableDamping?(a.theta+=c.theta*n.dampingFactor,a.phi+=c.phi*n.dampingFactor):(a.theta+=c.theta,a.phi+=c.phi);let xe=n.minAzimuthAngle,ye=n.maxAzimuthAngle;isFinite(xe)&&isFinite(ye)&&(xe<-Math.PI?xe+=Be:xe>Math.PI&&(xe-=Be),ye<-Math.PI?ye+=Be:ye>Math.PI&&(ye-=Be),xe<=ye?a.theta=Math.max(xe,Math.min(ye,a.theta)):a.theta=a.theta>(xe+ye)/2?Math.max(xe,a.theta):Math.min(ye,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&I||n.object.isOrthographicCamera?a.radius=J(a.radius):a.radius=J(a.radius*l),L.setFromSpherical(a),L.applyQuaternion(pe),z.copy(n.target).add(L),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),h.set(0,0,0));let qe=!1;if(n.zoomToCursor&&I){let ke=null;if(n.object.isPerspectiveCamera){let ct=L.length();ke=J(ct*l);let ht=ct-ke;n.object.position.addScaledVector(R,ht),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let ct=new B(F.x,F.y,0);ct.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),qe=!0;let ht=new B(F.x,F.y,0);ht.unproject(n.object),n.object.position.sub(ht).add(ct),n.object.updateMatrixWorld(),ke=L.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;ke!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(ke).add(n.object.position):(da.origin.copy(n.object.position),da.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(da.direction))<iM?e.lookAt(n.target):(xf.setFromNormalAndCoplanarPoint(n.object.up,n.target),da.intersectPlane(xf,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),qe=!0);return l=1,I=!1,qe||me.distanceToSquared(n.object.position)>o||8*(1-Le.dot(n.object.quaternion))>o||ze.distanceToSquared(n.target)>0?(n.dispatchEvent(vf),me.copy(n.object.position),Le.copy(n.object.quaternion),ze.copy(n.target),!0):!1}})(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Ae),n.domElement.removeEventListener("pointerdown",Ze),n.domElement.removeEventListener("pointercancel",E),n.domElement.removeEventListener("wheel",le),n.domElement.removeEventListener("pointermove",T),n.domElement.removeEventListener("pointerup",E),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",de),n._domElementKeyEvents=null)};let n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},r=i.NONE,o=1e-6,a=new Lr,c=new Lr,l=1,h=new B,u=new Pe,d=new Pe,p=new Pe,g=new Pe,_=new Pe,m=new Pe,f=new Pe,S=new Pe,y=new Pe,R=new B,F=new Pe,I=!1,P=[],k={};function M(L){return L!==null?2*Math.PI/60*n.autoRotateSpeed*L:2*Math.PI/60/60*n.autoRotateSpeed}function w(L){let re=Math.abs(L)/(100*(window.devicePixelRatio|0));return Math.pow(.95,n.zoomSpeed*re)}function H(L){c.theta-=L}function X(L){c.phi-=L}let ie=(function(){let L=new B;return function(pe,me){L.setFromMatrixColumn(me,0),L.multiplyScalar(-pe),h.add(L)}})(),D=(function(){let L=new B;return function(pe,me){n.screenSpacePanning===!0?L.setFromMatrixColumn(me,1):(L.setFromMatrixColumn(me,0),L.crossVectors(n.object.up,L)),L.multiplyScalar(pe),h.add(L)}})(),G=(function(){let L=new B;return function(pe,me){let Le=n.domElement;if(n.object.isPerspectiveCamera){let ze=n.object.position;L.copy(ze).sub(n.target);let Be=L.length();Be*=Math.tan(n.object.fov/2*Math.PI/180),ie(2*pe*Be/Le.clientHeight,n.object.matrix),D(2*me*Be/Le.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(ie(pe*(n.object.right-n.object.left)/n.object.zoom/Le.clientWidth,n.object.matrix),D(me*(n.object.top-n.object.bottom)/n.object.zoom/Le.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function W(L){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=L:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function te(L){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=L:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ne(L,re){if(!n.zoomToCursor)return;I=!0;let pe=n.domElement.getBoundingClientRect(),me=L-pe.left,Le=re-pe.top,ze=pe.width,Be=pe.height;F.x=me/ze*2-1,F.y=-(Le/Be)*2+1,R.set(F.x,F.y,1).unproject(n.object).sub(n.object.position).normalize()}function J(L){return Math.max(n.minDistance,Math.min(n.maxDistance,L))}function ee(L){u.set(L.clientX,L.clientY)}function oe(L){ne(L.clientX,L.clientX),f.set(L.clientX,L.clientY)}function he(L){g.set(L.clientX,L.clientY)}function K(L){d.set(L.clientX,L.clientY),p.subVectors(d,u).multiplyScalar(n.rotateSpeed);let re=n.domElement;H(2*Math.PI*p.x/re.clientHeight),X(2*Math.PI*p.y/re.clientHeight),u.copy(d),n.update()}function se(L){S.set(L.clientX,L.clientY),y.subVectors(S,f),y.y>0?W(w(y.y)):y.y<0&&te(w(y.y)),f.copy(S),n.update()}function Se(L){_.set(L.clientX,L.clientY),m.subVectors(_,g).multiplyScalar(n.panSpeed),G(m.x,m.y),g.copy(_),n.update()}function _e(L){ne(L.clientX,L.clientY),L.deltaY<0?te(w(L.deltaY)):L.deltaY>0&&W(w(L.deltaY)),n.update()}function Te(L){let re=!1;switch(L.code){case n.keys.UP:L.ctrlKey||L.metaKey||L.shiftKey?X(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(0,n.keyPanSpeed),re=!0;break;case n.keys.BOTTOM:L.ctrlKey||L.metaKey||L.shiftKey?X(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(0,-n.keyPanSpeed),re=!0;break;case n.keys.LEFT:L.ctrlKey||L.metaKey||L.shiftKey?H(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(n.keyPanSpeed,0),re=!0;break;case n.keys.RIGHT:L.ctrlKey||L.metaKey||L.shiftKey?H(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(-n.keyPanSpeed,0),re=!0;break}re&&(L.preventDefault(),n.update())}function Ue(L){if(P.length===1)u.set(L.pageX,L.pageY);else{let re=Je(L),pe=.5*(L.pageX+re.x),me=.5*(L.pageY+re.y);u.set(pe,me)}}function Ge(L){if(P.length===1)g.set(L.pageX,L.pageY);else{let re=Je(L),pe=.5*(L.pageX+re.x),me=.5*(L.pageY+re.y);g.set(pe,me)}}function Ne(L){let re=Je(L),pe=L.pageX-re.x,me=L.pageY-re.y,Le=Math.sqrt(pe*pe+me*me);f.set(0,Le)}function tt(L){n.enableZoom&&Ne(L),n.enablePan&&Ge(L)}function Z(L){n.enableZoom&&Ne(L),n.enableRotate&&Ue(L)}function At(L){if(P.length==1)d.set(L.pageX,L.pageY);else{let pe=Je(L),me=.5*(L.pageX+pe.x),Le=.5*(L.pageY+pe.y);d.set(me,Le)}p.subVectors(d,u).multiplyScalar(n.rotateSpeed);let re=n.domElement;H(2*Math.PI*p.x/re.clientHeight),X(2*Math.PI*p.y/re.clientHeight),u.copy(d)}function Oe(L){if(P.length===1)_.set(L.pageX,L.pageY);else{let re=Je(L),pe=.5*(L.pageX+re.x),me=.5*(L.pageY+re.y);_.set(pe,me)}m.subVectors(_,g).multiplyScalar(n.panSpeed),G(m.x,m.y),g.copy(_)}function We(L){let re=Je(L),pe=L.pageX-re.x,me=L.pageY-re.y,Le=Math.sqrt(pe*pe+me*me);S.set(0,Le),y.set(0,Math.pow(S.y/f.y,n.zoomSpeed)),W(y.y),f.copy(S);let ze=(L.pageX+re.x)*.5,Be=(L.pageY+re.y)*.5;ne(ze,Be)}function De(L){n.enableZoom&&We(L),n.enablePan&&Oe(L)}function gt(L){n.enableZoom&&We(L),n.enableRotate&&At(L)}function Ze(L){n.enabled!==!1&&(P.length===0&&(n.domElement.setPointerCapture(L.pointerId),n.domElement.addEventListener("pointermove",T),n.domElement.addEventListener("pointerup",E)),Fe(L),L.pointerType==="touch"?Ie(L):$(L))}function T(L){n.enabled!==!1&&(L.pointerType==="touch"?be(L):fe(L))}function E(L){Xe(L),P.length===0&&(n.domElement.releasePointerCapture(L.pointerId),n.domElement.removeEventListener("pointermove",T),n.domElement.removeEventListener("pointerup",E)),n.dispatchEvent(_f),r=i.NONE}function $(L){let re;switch(L.button){case 0:re=n.mouseButtons.LEFT;break;case 1:re=n.mouseButtons.MIDDLE;break;case 2:re=n.mouseButtons.RIGHT;break;default:re=-1}switch(re){case is.DOLLY:if(n.enableZoom===!1)return;oe(L),r=i.DOLLY;break;case is.ROTATE:if(L.ctrlKey||L.metaKey||L.shiftKey){if(n.enablePan===!1)return;he(L),r=i.PAN}else{if(n.enableRotate===!1)return;ee(L),r=i.ROTATE}break;case is.PAN:if(L.ctrlKey||L.metaKey||L.shiftKey){if(n.enableRotate===!1)return;ee(L),r=i.ROTATE}else{if(n.enablePan===!1)return;he(L),r=i.PAN}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(Tl)}function fe(L){switch(r){case i.ROTATE:if(n.enableRotate===!1)return;K(L);break;case i.DOLLY:if(n.enableZoom===!1)return;se(L);break;case i.PAN:if(n.enablePan===!1)return;Se(L);break}}function le(L){n.enabled===!1||n.enableZoom===!1||r!==i.NONE||(L.preventDefault(),n.dispatchEvent(Tl),_e(L),n.dispatchEvent(_f))}function de(L){n.enabled===!1||n.enablePan===!1||Te(L)}function Ie(L){switch(ce(L),P.length){case 1:switch(n.touches.ONE){case ss.ROTATE:if(n.enableRotate===!1)return;Ue(L),r=i.TOUCH_ROTATE;break;case ss.PAN:if(n.enablePan===!1)return;Ge(L),r=i.TOUCH_PAN;break;default:r=i.NONE}break;case 2:switch(n.touches.TWO){case ss.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;tt(L),r=i.TOUCH_DOLLY_PAN;break;case ss.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Z(L),r=i.TOUCH_DOLLY_ROTATE;break;default:r=i.NONE}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(Tl)}function be(L){switch(ce(L),r){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;At(L),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;Oe(L),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;De(L),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;gt(L),n.update();break;default:r=i.NONE}}function Ae(L){n.enabled!==!1&&L.preventDefault()}function Fe(L){P.push(L.pointerId)}function Xe(L){delete k[L.pointerId];for(let re=0;re<P.length;re++)if(P[re]==L.pointerId){P.splice(re,1);return}}function ce(L){let re=k[L.pointerId];re===void 0&&(re=new Pe,k[L.pointerId]=re),re.set(L.pageX,L.pageY)}function Je(L){let re=L.pointerId===P[0]?P[1]:P[0];return k[re]}n.domElement.addEventListener("contextmenu",Ae),n.domElement.addEventListener("pointerdown",Ze),n.domElement.addEventListener("pointercancel",E),n.domElement.addEventListener("wheel",le,{passive:!1}),this.update()}};function yf(s,e,t){let n=t.controls,i=new fa(s,e);return i.enableDamping=n.enableDamping,i.dampingFactor=n.dampingFactor,i.minDistance=n.minDistance,i.maxDistance=n.maxDistance,i.maxPolarAngle=n.maxPolarAngle,i.enablePan=n.enablePan,i.autoRotate=!1,i.update(),i}function Mf(s){let e=s.floor,t=new zt({color:16777215,fog:!1,depthWrite:!1}),n=new lt(new In(e.size,e.size),t);return n.rotation.x=-Math.PI/2,n.name="Floor",n.layers.set(1),n.userData.excludeFromShadow=!0,n.renderOrder=-3,{mesh:n,setColor(i){t.color.set(i)},setHeight(i){n.position.y=i-.0015},dispose(){n.geometry.dispose(),t.dispose(),n.removeFromParent()}}}function Sf(s){let e=s.shadowCatcher,t=s.lighting.shadow.frustum*2;e.size>t&&console.warn(`shadowCatcher.size (${e.size}) \u0431\u043E\u043B\u044C\u0448\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043A\u0430\u0440\u0442\u044B \u0442\u0435\u043D\u0435\u0439 (${t}). \u041F\u043E \u043A\u0430\u0434\u0440\u0443 \u043F\u043E\u0439\u0434\u0451\u0442 \u0431\u043B\u0435\u0434\u043D\u0430\u044F \u043F\u043E\u043B\u043E\u0441\u0430 \u2014 \u0443\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u0435 \u0440\u0430\u0437\u043C\u0435\u0440 \u0438\u043B\u0438 \u043F\u043E\u0434\u043D\u0438\u043C\u0438\u0442\u0435 lighting.shadow.frustum.`);let n=new jo;n.opacity=e.opacity,n.transparent=!0,n.depthWrite=!1;let i=new lt(new In(e.size,e.size),n);return i.rotation.x=-Math.PI/2,i.receiveShadow=!0,i.renderOrder=-1,i.layers.set(1),i.name="ShadowCatcher",{plane:i,setHeight(r){i.position.y=r},setOpacity(r){n.opacity=r},dispose(){i.geometry.dispose(),n.dispose(),i.removeFromParent()}}}var Ef={name:"HorizontalBlurShader",uniforms:{tDiffuse:{value:null},h:{value:.001953125}},vertexShader:`

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

		}`};var bf={name:"VerticalBlurShader",uniforms:{tDiffuse:{value:null},v:{value:.001953125}},vertexShader:`

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

		}`};var os,wf,Rl,Al=class{constructor(e){an(this,os);let{size:t,resolution:n,height:i,blur:r,opacity:o,darkness:a}=e.ambientShadow;this.config=e,this.blurAmount=r,this.group=new Ht,this.group.name="AmbientContactShadow";let c={depthBuffer:!1,stencilBuffer:!1};this.target=new Xt(n,n,c),this.blurTarget=new Xt(n,n,c),this.target.texture.generateMipmaps=!1,this.blurTarget.texture.generateMipmaps=!1;let l=new In(t,t).rotateX(Math.PI/2);this.plane=new lt(l,new zt({map:this.target.texture,opacity:o,transparent:!0,depthWrite:!1})),this.plane.scale.y=-1,this.plane.renderOrder=-2,this.plane.layers.set(1),this.group.add(this.plane),this.blurPlane=new lt(l),this.blurPlane.visible=!1,this.group.add(this.blurPlane),this.camera=new Jn(-t/2,t/2,t/2,-t/2,0,i),this.camera.rotation.x=Math.PI/2,this.group.add(this.camera),this.blurCamera=this.camera.clone(),this.group.add(this.blurCamera),this.depthMaterial=V(this,os,wf).call(this,a),this.horizontalBlur=new Nt(Ef),this.verticalBlur=new Nt(bf)}update(e,t){let n=e.shadowMap.autoUpdate;e.shadowMap.autoUpdate=!1;let i=t.background;this.plane.visible=!1,t.background=null,t.overrideMaterial=this.depthMaterial;let r=[];t.traverse(o=>{o.visible&&o.userData.excludeFromShadow&&(o.visible=!1,r.push(o))}),e.setRenderTarget(this.target),e.render(t,this.camera);for(let o of r)o.visible=!0;t.overrideMaterial=null,V(this,os,Rl).call(this,e,this.blurAmount),V(this,os,Rl).call(this,e,this.blurAmount*.4),e.setRenderTarget(null),t.background=i,this.plane.visible=!0,e.shadowMap.autoUpdate=n}dispose(){this.target.dispose(),this.blurTarget.dispose(),this.plane.geometry.dispose(),this.plane.material.dispose(),this.depthMaterial.dispose(),this.horizontalBlur.dispose(),this.verticalBlur.dispose()}};os=new WeakSet,wf=function(e){let t=new Sr;return t.userData.darkness={value:e},t.onBeforeCompile=n=>{n.uniforms.darkness=t.userData.darkness;let i="gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );",r="gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * darkness );";if(!n.fragmentShader.includes(i)){console.warn("AmbientContactShadow: \u0448\u0435\u0439\u0434\u0435\u0440 MeshDepthMaterial \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F \u2014 \u0442\u0435\u043D\u044C \u0431\u0443\u0434\u0435\u0442 \u043D\u0435\u0432\u0435\u0440\u043D\u043E\u0439.");return}n.fragmentShader=`uniform float darkness;
${n.fragmentShader}`.replace(i,r)},t},Rl=function(e,t){this.blurPlane.visible=!0,this.blurPlane.material=this.horizontalBlur,this.horizontalBlur.uniforms.tDiffuse.value=this.target.texture,this.horizontalBlur.uniforms.h.value=t/256,e.setRenderTarget(this.blurTarget),e.render(this.blurPlane,this.blurCamera),this.blurPlane.material=this.verticalBlur,this.verticalBlur.uniforms.tDiffuse.value=this.blurTarget.texture,this.verticalBlur.uniforms.v.value=t/256,e.setRenderTarget(this.target),e.render(this.blurPlane,this.blurCamera),this.blurPlane.visible=!1};function Tf(s){return new Al(s)}var Nr=24,sM=128,Pl=1842206,rM=16777215,oM=15214860,Cl={light:{color:Pl,ring:.18,ticks:.3},dark:{color:rM,ring:.32,ticks:.55}},aM=.45,cM=s=>-s,Af=s=>-s,ot,Rf,Or,Cf,pa,Ll,Dl,Pf,If,Lf,Ul,Nl,Ol,Il=class{constructor({scene:e,camera:t,controls:n,domElement:i,config:r,onRotate:o,onDragStart:a,onDragEnd:c}){an(this,ot);this.camera=t,this.controls=n,this.domElement=i,this.options=r.turntable,this.onRotate=o,this.onDragStart=a,this.onDragEnd=c,this.metrics=null,this.visible=!1,this.pinned=!1,this.dragging=!1,this.capturing=!1,this.fade=0,this.theme=Cl.light,this.snap=null,this.raycaster=new ra,this.pointer=new Pe,this.floor=new En(new B(0,1,0),0),this.hit=new B,this.group=new Ht,this.group.name="Turntable",this.group.visible=!1,this.group.userData.excludeFromShadow=!0,V(this,ot,Rf).call(this),this.group.traverse(l=>l.layers.set(1)),this.raycaster.layers.enable(1),e.add(this.group),V(this,ot,Cf).call(this)}setBackground(e){let t=.2126*e.r+.7152*e.g+.0722*e.b;this.theme=t<.4?Cl.dark:Cl.light,this.materials.ring.color.setHex(this.theme.color),this.materials.ticks.color.setHex(this.theme.color),V(this,ot,Ol).call(this)}setMetrics(e){if(this.metrics=e,!e){this.group.visible=!1;return}let{center:t,baseY:n,radius:i}=e;this.group.position.set(t.x,n+i*this.options.lift,t.z),this.group.scale.setScalar(i),this.floor.constant=-this.group.position.y}togglePinned(){return this.pinned=!this.pinned,this.pinned?this.show():this.dragging||this.hide(),this.pinned}show(){this.visible=!0}setHiddenForCapture(e){this.capturing=e,e&&(this.group.visible=!1)}hide(){this.dragging||this.pinned||(this.visible=!1,this.domElement.style.cursor="")}update(e,t=.016){var o,a;this.currentRotation=e;let n=!1,i=this.visible?1:0;if(this.fade!==i){let c=t/.2;this.fade=i>this.fade?Math.min(this.fade+c,1):Math.max(this.fade-c,0),V(this,ot,Ol).call(this),n=!0}if(this.snap){this.snap.time+=t;let c=Math.min(this.snap.time/aM,1),l=1-(1-c)**3;(o=this.onRotate)==null||o.call(this,this.snap.from+(this.snap.to-this.snap.from)*l),c>=1&&(this.snap=null,(a=this.onDragEnd)==null||a.call(this)),n=!0}if(this.group.visible=!this.capturing&&this.fade>.001&&!!this.metrics,!this.group.visible)return n;let r=cM(e)*Math.PI/180;return this.knob.position.set(Math.cos(r),0,Math.sin(r)),this.knob.quaternion.copy(this.camera.quaternion),n}dispose(){this.group.traverse(e=>{e.geometry&&e.geometry.dispose()});for(let e of Object.values(this.materials))e.dispose();this.knobTarget.material.dispose(),this.tickTargets.material.dispose(),this.group.removeFromParent()}};ot=new WeakSet,Rf=function(){this.materials={ring:V(this,ot,Or).call(this,Pl,.18),ticks:V(this,ot,Or).call(this,Pl,.3),knob:V(this,ot,Or).call(this,oM,1),knobRing:V(this,ot,Or).call(this,16777215,1)};let e=new lt(new $o(1,.006,6,sM).rotateX(Math.PI/2),this.materials.ring);this.group.add(e);let t=[],n=new $e;for(let a=0;a<Nr;a++){let c=a/Nr*Math.PI*2;n.setPosition(Math.cos(c),0,Math.sin(c)),t.push(n.clone())}let i=a=>(t.forEach((c,l)=>a.setMatrixAt(l,c)),a.instanceMatrix.needsUpdate=!0,this.group.add(a),a);this.dots=i(new ns(new Gs(.018,8,6),this.materials.ticks,Nr)),this.tickTargets=i(new ns(new Gs(.075,6,4),new zt({visible:!1}),Nr)),this.knob=new Ht;let r=new lt(new Cr(.085,32),this.materials.knobRing),o=new lt(new Cr(.062,32),this.materials.knob);o.position.z=.001,this.knob.add(r,o),this.group.add(this.knob),this.knobTarget=new lt(new Gs(.16,8,6),new zt({visible:!1})),this.knob.add(this.knobTarget)},Or=function(e,t){return new zt({color:e,opacity:t,transparent:!0,toneMapped:!1})},Cf=function(){let e=this.domElement;e.addEventListener("pointerdown",t=>V(this,ot,Pf).call(this,t)),e.addEventListener("pointermove",t=>V(this,ot,Lf).call(this,t)),e.addEventListener("pointerup",t=>V(this,ot,Ul).call(this,t)),e.addEventListener("pointercancel",t=>V(this,ot,Ul).call(this,t))},pa=function(e){let t=this.domElement.getBoundingClientRect();this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera)},Ll=function(e){return!this.visible||!this.metrics?!1:(V(this,ot,pa).call(this,e),this.raycaster.intersectObject(this.knobTarget,!1).length>0)},Dl=function(e){if(!this.visible||!this.metrics)return null;V(this,ot,pa).call(this,e);let[t]=this.raycaster.intersectObject(this.tickTargets,!1);return t?t.instanceId??null:null},Pf=function(e){var n,i,r;if(V(this,ot,Ll).call(this,e)){e.preventDefault(),this.dragging=!0,this.snap=null,(i=(n=this.domElement).setPointerCapture)==null||i.call(n,e.pointerId),this.controls.enabled=!1,(r=this.onDragStart)==null||r.call(this),V(this,ot,Nl).call(this,e);return}let t=V(this,ot,Dl).call(this,e);t!==null&&(e.preventDefault(),V(this,ot,If).call(this,Af(t/Nr*360)))},If=function(e){var i;let t=this.currentRotation??0,n=((e-t)%360+540)%360-180;Math.abs(n)<.1||(this.snap={from:t,to:t+n,time:0},(i=this.onDragStart)==null||i.call(this))},Lf=function(e){if(this.dragging){V(this,ot,Nl).call(this,e);return}this.visible&&(V(this,ot,Ll).call(this,e)?this.domElement.style.cursor="grab":this.domElement.style.cursor=V(this,ot,Dl).call(this,e)!==null?"pointer":"")},Ul=function(e){var t,n,i;this.dragging&&(this.dragging=!1,(n=(t=this.domElement).releasePointerCapture)==null||n.call(t,e.pointerId),this.controls.enabled=!0,this.domElement.style.cursor="",(i=this.onDragEnd)==null||i.call(this),this.pinned||this.hide())},Nl=function(e){var i;if(!this.metrics||(V(this,ot,pa).call(this,e),!this.raycaster.ray.intersectPlane(this.floor,this.hit)))return;let t=this.hit.x-this.group.position.x,n=this.hit.z-this.group.position.z;(i=this.onRotate)==null||i.call(this,Af(Math.atan2(n,t)*180/Math.PI))},Ol=function(){let{ring:e,ticks:t,knob:n,knobRing:i}=this.materials;e.opacity=this.theme.ring*this.fade,t.opacity=this.theme.ticks*this.fade,n.opacity=this.fade,i.opacity=this.fade};function Df(s){return new Il(s)}var Uf=function(s){return URL.createObjectURL(new Blob([s],{type:"text/javascript"}))},lM=function(s){return new Worker(s)};try{URL.revokeObjectURL(Uf(""))}catch{Uf=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)},lM=function(e){return new Worker(e,{type:"module"})}}var Nn=Uint8Array,Fi=Uint16Array,zl=Uint32Array,Nf=new Nn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Of=new Nn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),hM=new Nn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ff=function(s,e){for(var t=new Fi(31),n=0;n<31;++n)t[n]=e+=1<<s[n-1];for(var i=new zl(t[30]),n=1;n<30;++n)for(var r=t[n];r<t[n+1];++r)i[r]=r-t[n]<<5|n;return[t,i]},Bf=Ff(Nf,2),zf=Bf[0],uM=Bf[1];zf[28]=258,uM[258]=28;var kf=Ff(Of,0),dM=kf[0],DE=kf[1],kl=new Fi(32768);for(vt=0;vt<32768;++vt)vi=(vt&43690)>>>1|(vt&21845)<<1,vi=(vi&52428)>>>2|(vi&13107)<<2,vi=(vi&61680)>>>4|(vi&3855)<<4,kl[vt]=((vi&65280)>>>8|(vi&255)<<8)>>>1;var vi,vt,Fr=(function(s,e,t){for(var n=s.length,i=0,r=new Fi(e);i<n;++i)++r[s[i]-1];var o=new Fi(e);for(i=0;i<e;++i)o[i]=o[i-1]+r[i-1]<<1;var a;if(t){a=new Fi(1<<e);var c=15-e;for(i=0;i<n;++i)if(s[i])for(var l=i<<4|s[i],h=e-s[i],u=o[s[i]-1]++<<h,d=u|(1<<h)-1;u<=d;++u)a[kl[u]>>>c]=l}else for(a=new Fi(n),i=0;i<n;++i)s[i]&&(a[i]=kl[o[s[i]-1]++]>>>15-s[i]);return a}),Br=new Nn(288);for(vt=0;vt<144;++vt)Br[vt]=8;var vt;for(vt=144;vt<256;++vt)Br[vt]=9;var vt;for(vt=256;vt<280;++vt)Br[vt]=7;var vt;for(vt=280;vt<288;++vt)Br[vt]=8;var vt,Hf=new Nn(32);for(vt=0;vt<32;++vt)Hf[vt]=5;var vt;var fM=Fr(Br,9,1);var pM=Fr(Hf,5,1),Fl=function(s){for(var e=s[0],t=1;t<s.length;++t)s[t]>e&&(e=s[t]);return e},Xn=function(s,e,t){var n=e/8|0;return(s[n]|s[n+1]<<8)>>(e&7)&t},Bl=function(s,e){var t=e/8|0;return(s[t]|s[t+1]<<8|s[t+2]<<16)>>(e&7)},mM=function(s){return(s/8|0)+(s&7&&1)},gM=function(s,e,t){(e==null||e<0)&&(e=0),(t==null||t>s.length)&&(t=s.length);var n=new(s instanceof Fi?Fi:s instanceof zl?zl:Nn)(t-e);return n.set(s.subarray(e,t)),n},vM=function(s,e,t){var n=s.length;if(!n||t&&!t.l&&n<5)return e||new Nn(0);var i=!e||t,r=!t||t.i;t||(t={}),e||(e=new Nn(n*3));var o=function(_e){var Te=e.length;if(_e>Te){var Ue=new Nn(Math.max(Te*2,_e));Ue.set(e),e=Ue}},a=t.f||0,c=t.p||0,l=t.b||0,h=t.l,u=t.d,d=t.m,p=t.n,g=n*8;do{if(!h){t.f=a=Xn(s,c,1);var _=Xn(s,c+1,3);if(c+=3,_)if(_==1)h=fM,u=pM,d=9,p=5;else if(_==2){var y=Xn(s,c,31)+257,R=Xn(s,c+10,15)+4,F=y+Xn(s,c+5,31)+1;c+=14;for(var I=new Nn(F),P=new Nn(19),k=0;k<R;++k)P[hM[k]]=Xn(s,c+k*3,7);c+=R*3;for(var M=Fl(P),w=(1<<M)-1,H=Fr(P,M,1),k=0;k<F;){var X=H[Xn(s,c,w)];c+=X&15;var m=X>>>4;if(m<16)I[k++]=m;else{var ie=0,D=0;for(m==16?(D=3+Xn(s,c,3),c+=2,ie=I[k-1]):m==17?(D=3+Xn(s,c,7),c+=3):m==18&&(D=11+Xn(s,c,127),c+=7);D--;)I[k++]=ie}}var G=I.subarray(0,y),W=I.subarray(y);d=Fl(G),p=Fl(W),h=Fr(G,d,1),u=Fr(W,p,1)}else throw"invalid block type";else{var m=mM(c)+4,f=s[m-4]|s[m-3]<<8,S=m+f;if(S>n){if(r)throw"unexpected EOF";break}i&&o(l+f),e.set(s.subarray(m,S),l),t.b=l+=f,t.p=c=S*8;continue}if(c>g){if(r)throw"unexpected EOF";break}}i&&o(l+131072);for(var te=(1<<d)-1,ne=(1<<p)-1,J=c;;J=c){var ie=h[Bl(s,c)&te],ee=ie>>>4;if(c+=ie&15,c>g){if(r)throw"unexpected EOF";break}if(!ie)throw"invalid length/literal";if(ee<256)e[l++]=ee;else if(ee==256){J=c,h=null;break}else{var oe=ee-254;if(ee>264){var k=ee-257,he=Nf[k];oe=Xn(s,c,(1<<he)-1)+zf[k],c+=he}var K=u[Bl(s,c)&ne],se=K>>>4;if(!K)throw"invalid distance";c+=K&15;var W=dM[se];if(se>3){var he=Of[se];W+=Bl(s,c)&(1<<he)-1,c+=he}if(c>g){if(r)throw"unexpected EOF";break}i&&o(l+131072);for(var Se=l+oe;l<Se;l+=4)e[l]=e[l-W],e[l+1]=e[l+1-W],e[l+2]=e[l+2-W],e[l+3]=e[l+3-W];l=Se}}t.l=h,t.p=J,t.b=l,h&&(a=1,t.m=d,t.d=u,t.n=p)}while(!a);return l==e.length?e:gM(e,0,l)};var _M=new Nn(0);var xM=function(s){if((s[0]&15)!=8||s[0]>>>4>7||(s[0]<<8|s[1])%31)throw"invalid zlib data";if(s[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function zr(s,e){return vM((xM(s),s.subarray(2,-4)),e)}var yM=typeof TextDecoder<"u"&&new TextDecoder,MM=0;try{yM.decode(_M,{stream:!0}),MM=1}catch{}var ma=class extends Xs{constructor(e){super(e),this.type=Dt}parse(e){let M=Math.pow(2.7182818,2.2);function w(x,b){let O=0;for(let A=0;A<65536;++A)(A==0||x[A>>3]&1<<(A&7))&&(b[O++]=A);let v=O-1;for(;O<65536;)b[O++]=0;return v}function H(x){for(let b=0;b<16384;b++)x[b]={},x[b].len=0,x[b].lit=0,x[b].p=null}let X={l:0,c:0,lc:0};function ie(x,b,O,v,A){for(;O<x;)b=b<<8|me(v,A),O+=8;O-=x,X.l=b>>O&(1<<x)-1,X.c=b,X.lc=O}let D=new Array(59);function G(x){for(let O=0;O<=58;++O)D[O]=0;for(let O=0;O<65537;++O)D[x[O]]+=1;let b=0;for(let O=58;O>0;--O){let v=b+D[O]>>1;D[O]=b,b=v}for(let O=0;O<65537;++O){let v=x[O];v>0&&(x[O]=v|D[v]++<<6)}}function W(x,b,O,v,A,C){let U=b,N=0,j=0;for(;v<=A;v++){if(U.value-b.value>O)return!1;ie(6,N,j,x,U);let Y=X.l;if(N=X.c,j=X.lc,C[v]=Y,Y==63){if(U.value-b.value>O)throw new Error("Something wrong with hufUnpackEncTable");ie(8,N,j,x,U);let Q=X.l+6;if(N=X.c,j=X.lc,v+Q>A+1)throw new Error("Something wrong with hufUnpackEncTable");for(;Q--;)C[v++]=0;v--}else if(Y>=59){let Q=Y-59+2;if(v+Q>A+1)throw new Error("Something wrong with hufUnpackEncTable");for(;Q--;)C[v++]=0;v--}}G(C)}function te(x){return x&63}function ne(x){return x>>6}function J(x,b,O,v){for(;b<=O;b++){let A=ne(x[b]),C=te(x[b]);if(A>>C)throw new Error("Invalid table entry");if(C>14){let U=v[A>>C-14];if(U.len)throw new Error("Invalid table entry");if(U.lit++,U.p){let N=U.p;U.p=new Array(U.lit);for(let j=0;j<U.lit-1;++j)U.p[j]=N[j]}else U.p=new Array(1);U.p[U.lit-1]=b}else if(C){let U=0;for(let N=1<<14-C;N>0;N--){let j=v[(A<<14-C)+U];if(j.len||j.p)throw new Error("Invalid table entry");j.len=C,j.lit=b,U++}}}return!0}let ee={c:0,lc:0};function oe(x,b,O,v){x=x<<8|me(O,v),b+=8,ee.c=x,ee.lc=b}let he={c:0,lc:0};function K(x,b,O,v,A,C,U,N,j){if(x==b){v<8&&(oe(O,v,A,C),O=ee.c,v=ee.lc),v-=8;let Y=O>>v;if(Y=new Uint8Array([Y])[0],N.value+Y>j)return!1;let Q=U[N.value-1];for(;Y-- >0;)U[N.value++]=Q}else if(N.value<j)U[N.value++]=x;else return!1;he.c=O,he.lc=v}function se(x){return x&65535}function Se(x){let b=se(x);return b>32767?b-65536:b}let _e={a:0,b:0};function Te(x,b){let O=Se(x),A=Se(b),C=O+(A&1)+(A>>1),U=C,N=C-A;_e.a=U,_e.b=N}function Ue(x,b){let O=se(x),v=se(b),A=O-(v>>1)&65535,C=v+A-32768&65535;_e.a=C,_e.b=A}function Ge(x,b,O,v,A,C,U){let N=U<16384,j=O>A?A:O,Y=1,Q,ae;for(;Y<=j;)Y<<=1;for(Y>>=1,Q=Y,Y>>=1;Y>=1;){ae=0;let ue=ae+C*(A-Q),ge=C*Y,Me=C*Q,Ee=v*Y,Re=v*Q,He,pt,je,Ye;for(;ae<=ue;ae+=Me){let _t=ae,Ve=ae+v*(O-Q);for(;_t<=Ve;_t+=Re){let Mt=_t+Ee,pn=_t+ge,Rt=pn+Ee;N?(Te(x[_t+b],x[pn+b]),He=_e.a,je=_e.b,Te(x[Mt+b],x[Rt+b]),pt=_e.a,Ye=_e.b,Te(He,pt),x[_t+b]=_e.a,x[Mt+b]=_e.b,Te(je,Ye),x[pn+b]=_e.a,x[Rt+b]=_e.b):(Ue(x[_t+b],x[pn+b]),He=_e.a,je=_e.b,Ue(x[Mt+b],x[Rt+b]),pt=_e.a,Ye=_e.b,Ue(He,pt),x[_t+b]=_e.a,x[Mt+b]=_e.b,Ue(je,Ye),x[pn+b]=_e.a,x[Rt+b]=_e.b)}if(O&Y){let Mt=_t+ge;N?Te(x[_t+b],x[Mt+b]):Ue(x[_t+b],x[Mt+b]),He=_e.a,x[Mt+b]=_e.b,x[_t+b]=He}}if(A&Y){let _t=ae,Ve=ae+v*(O-Q);for(;_t<=Ve;_t+=Re){let Mt=_t+Ee;N?Te(x[_t+b],x[Mt+b]):Ue(x[_t+b],x[Mt+b]),He=_e.a,x[Mt+b]=_e.b,x[_t+b]=He}}Q=Y,Y>>=1}return ae}function Ne(x,b,O,v,A,C,U,N,j){let Y=0,Q=0,ae=U,ue=Math.trunc(v.value+(A+7)/8);for(;v.value<ue;)for(oe(Y,Q,O,v),Y=ee.c,Q=ee.lc;Q>=14;){let Me=Y>>Q-14&16383,Ee=b[Me];if(Ee.len)Q-=Ee.len,K(Ee.lit,C,Y,Q,O,v,N,j,ae),Y=he.c,Q=he.lc;else{if(!Ee.p)throw new Error("hufDecode issues");let Re;for(Re=0;Re<Ee.lit;Re++){let He=te(x[Ee.p[Re]]);for(;Q<He&&v.value<ue;)oe(Y,Q,O,v),Y=ee.c,Q=ee.lc;if(Q>=He&&ne(x[Ee.p[Re]])==(Y>>Q-He&(1<<He)-1)){Q-=He,K(Ee.p[Re],C,Y,Q,O,v,N,j,ae),Y=he.c,Q=he.lc;break}}if(Re==Ee.lit)throw new Error("hufDecode issues")}}let ge=8-A&7;for(Y>>=ge,Q-=ge;Q>0;){let Me=b[Y<<14-Q&16383];if(Me.len)Q-=Me.len,K(Me.lit,C,Y,Q,O,v,N,j,ae),Y=he.c,Q=he.lc;else throw new Error("hufDecode issues")}return!0}function tt(x,b,O,v,A,C){let U={value:0},N=O.value,j=pe(b,O),Y=pe(b,O);O.value+=4;let Q=pe(b,O);if(O.value+=4,j<0||j>=65537||Y<0||Y>=65537)throw new Error("Something wrong with HUF_ENCSIZE");let ae=new Array(65537),ue=new Array(16384);H(ue);let ge=v-(O.value-N);if(W(x,O,ge,j,Y,ae),Q>8*(v-(O.value-N)))throw new Error("Something wrong with hufUncompress");J(ae,j,Y,ue),Ne(ae,ue,x,O,Q,Y,C,A,U)}function Z(x,b,O){for(let v=0;v<O;++v)b[v]=x[b[v]]}function At(x){for(let b=1;b<x.length;b++){let O=x[b-1]+x[b]-128;x[b]=O}}function Oe(x,b){let O=0,v=Math.floor((x.length+1)/2),A=0,C=x.length-1;for(;!(A>C||(b[A++]=x[O++],A>C));)b[A++]=x[v++]}function We(x){let b=x.byteLength,O=new Array,v=0,A=new DataView(x);for(;b>0;){let C=A.getInt8(v++);if(C<0){let U=-C;b-=U+1;for(let N=0;N<U;N++)O.push(A.getUint8(v++))}else{let U=C;b-=2;let N=A.getUint8(v++);for(let j=0;j<U+1;j++)O.push(N)}}return O}function De(x,b,O,v,A,C){let U=new DataView(C.buffer),N=O[x.idx[0]].width,j=O[x.idx[0]].height,Y=3,Q=Math.floor(N/8),ae=Math.ceil(N/8),ue=Math.ceil(j/8),ge=N-(ae-1)*8,Me=j-(ue-1)*8,Ee={value:0},Re=new Array(Y),He=new Array(Y),pt=new Array(Y),je=new Array(Y),Ye=new Array(Y);for(let Ve=0;Ve<Y;++Ve)Ye[Ve]=b[x.idx[Ve]],Re[Ve]=Ve<1?0:Re[Ve-1]+ae*ue,He[Ve]=new Float32Array(64),pt[Ve]=new Uint16Array(64),je[Ve]=new Uint16Array(ae*64);for(let Ve=0;Ve<ue;++Ve){let Mt=8;Ve==ue-1&&(Mt=Me);let pn=8;for(let ut=0;ut<ae;++ut){ut==ae-1&&(pn=ge);for(let Qe=0;Qe<Y;++Qe)pt[Qe].fill(0),pt[Qe][0]=A[Re[Qe]++],gt(Ee,v,pt[Qe]),Ze(pt[Qe],He[Qe]),T(He[Qe]);Y==3&&E(He);for(let Qe=0;Qe<Y;++Qe)$(He[Qe],je[Qe],ut*64)}let Rt=0;for(let ut=0;ut<Y;++ut){let Qe=O[x.idx[ut]].type;for(let tn=8*Ve;tn<8*Ve+Mt;++tn){Rt=Ye[ut][tn];for(let ii=0;ii<Q;++ii){let Pt=ii*64+(tn&7)*8;U.setUint16(Rt+0*Qe,je[ut][Pt+0],!0),U.setUint16(Rt+2*Qe,je[ut][Pt+1],!0),U.setUint16(Rt+4*Qe,je[ut][Pt+2],!0),U.setUint16(Rt+6*Qe,je[ut][Pt+3],!0),U.setUint16(Rt+8*Qe,je[ut][Pt+4],!0),U.setUint16(Rt+10*Qe,je[ut][Pt+5],!0),U.setUint16(Rt+12*Qe,je[ut][Pt+6],!0),U.setUint16(Rt+14*Qe,je[ut][Pt+7],!0),Rt+=16*Qe}}if(Q!=ae)for(let tn=8*Ve;tn<8*Ve+Mt;++tn){let ii=Ye[ut][tn]+8*Q*2*Qe,Pt=Q*64+(tn&7)*8;for(let Mi=0;Mi<pn;++Mi)U.setUint16(ii+Mi*2*Qe,je[ut][Pt+Mi],!0)}}}let _t=new Uint16Array(N);U=new DataView(C.buffer);for(let Ve=0;Ve<Y;++Ve){O[x.idx[Ve]].decoded=!0;let Mt=O[x.idx[Ve]].type;if(O[Ve].type==2)for(let pn=0;pn<j;++pn){let Rt=Ye[Ve][pn];for(let ut=0;ut<N;++ut)_t[ut]=U.getUint16(Rt+ut*2*Mt,!0);for(let ut=0;ut<N;++ut)U.setFloat32(Rt+ut*2*Mt,q(_t[ut]),!0)}}}function gt(x,b,O){let v,A=1;for(;A<64;)v=b[x.value],v==65280?A=64:v>>8==255?A+=v&255:(O[A]=v,A++),x.value++}function Ze(x,b){b[0]=q(x[0]),b[1]=q(x[1]),b[2]=q(x[5]),b[3]=q(x[6]),b[4]=q(x[14]),b[5]=q(x[15]),b[6]=q(x[27]),b[7]=q(x[28]),b[8]=q(x[2]),b[9]=q(x[4]),b[10]=q(x[7]),b[11]=q(x[13]),b[12]=q(x[16]),b[13]=q(x[26]),b[14]=q(x[29]),b[15]=q(x[42]),b[16]=q(x[3]),b[17]=q(x[8]),b[18]=q(x[12]),b[19]=q(x[17]),b[20]=q(x[25]),b[21]=q(x[30]),b[22]=q(x[41]),b[23]=q(x[43]),b[24]=q(x[9]),b[25]=q(x[11]),b[26]=q(x[18]),b[27]=q(x[24]),b[28]=q(x[31]),b[29]=q(x[40]),b[30]=q(x[44]),b[31]=q(x[53]),b[32]=q(x[10]),b[33]=q(x[19]),b[34]=q(x[23]),b[35]=q(x[32]),b[36]=q(x[39]),b[37]=q(x[45]),b[38]=q(x[52]),b[39]=q(x[54]),b[40]=q(x[20]),b[41]=q(x[22]),b[42]=q(x[33]),b[43]=q(x[38]),b[44]=q(x[46]),b[45]=q(x[51]),b[46]=q(x[55]),b[47]=q(x[60]),b[48]=q(x[21]),b[49]=q(x[34]),b[50]=q(x[37]),b[51]=q(x[47]),b[52]=q(x[50]),b[53]=q(x[56]),b[54]=q(x[59]),b[55]=q(x[61]),b[56]=q(x[35]),b[57]=q(x[36]),b[58]=q(x[48]),b[59]=q(x[49]),b[60]=q(x[57]),b[61]=q(x[58]),b[62]=q(x[62]),b[63]=q(x[63])}function T(x){let b=.5*Math.cos(.7853975),O=.5*Math.cos(3.14159/16),v=.5*Math.cos(3.14159/8),A=.5*Math.cos(3*3.14159/16),C=.5*Math.cos(5*3.14159/16),U=.5*Math.cos(3*3.14159/8),N=.5*Math.cos(7*3.14159/16),j=new Array(4),Y=new Array(4),Q=new Array(4),ae=new Array(4);for(let ue=0;ue<8;++ue){let ge=ue*8;j[0]=v*x[ge+2],j[1]=U*x[ge+2],j[2]=v*x[ge+6],j[3]=U*x[ge+6],Y[0]=O*x[ge+1]+A*x[ge+3]+C*x[ge+5]+N*x[ge+7],Y[1]=A*x[ge+1]-N*x[ge+3]-O*x[ge+5]-C*x[ge+7],Y[2]=C*x[ge+1]-O*x[ge+3]+N*x[ge+5]+A*x[ge+7],Y[3]=N*x[ge+1]-C*x[ge+3]+A*x[ge+5]-O*x[ge+7],Q[0]=b*(x[ge+0]+x[ge+4]),Q[3]=b*(x[ge+0]-x[ge+4]),Q[1]=j[0]+j[3],Q[2]=j[1]-j[2],ae[0]=Q[0]+Q[1],ae[1]=Q[3]+Q[2],ae[2]=Q[3]-Q[2],ae[3]=Q[0]-Q[1],x[ge+0]=ae[0]+Y[0],x[ge+1]=ae[1]+Y[1],x[ge+2]=ae[2]+Y[2],x[ge+3]=ae[3]+Y[3],x[ge+4]=ae[3]-Y[3],x[ge+5]=ae[2]-Y[2],x[ge+6]=ae[1]-Y[1],x[ge+7]=ae[0]-Y[0]}for(let ue=0;ue<8;++ue)j[0]=v*x[16+ue],j[1]=U*x[16+ue],j[2]=v*x[48+ue],j[3]=U*x[48+ue],Y[0]=O*x[8+ue]+A*x[24+ue]+C*x[40+ue]+N*x[56+ue],Y[1]=A*x[8+ue]-N*x[24+ue]-O*x[40+ue]-C*x[56+ue],Y[2]=C*x[8+ue]-O*x[24+ue]+N*x[40+ue]+A*x[56+ue],Y[3]=N*x[8+ue]-C*x[24+ue]+A*x[40+ue]-O*x[56+ue],Q[0]=b*(x[ue]+x[32+ue]),Q[3]=b*(x[ue]-x[32+ue]),Q[1]=j[0]+j[3],Q[2]=j[1]-j[2],ae[0]=Q[0]+Q[1],ae[1]=Q[3]+Q[2],ae[2]=Q[3]-Q[2],ae[3]=Q[0]-Q[1],x[0+ue]=ae[0]+Y[0],x[8+ue]=ae[1]+Y[1],x[16+ue]=ae[2]+Y[2],x[24+ue]=ae[3]+Y[3],x[32+ue]=ae[3]-Y[3],x[40+ue]=ae[2]-Y[2],x[48+ue]=ae[1]-Y[1],x[56+ue]=ae[0]-Y[0]}function E(x){for(let b=0;b<64;++b){let O=x[0][b],v=x[1][b],A=x[2][b];x[0][b]=O+1.5747*A,x[1][b]=O-.1873*v-.4682*A,x[2][b]=O+1.8556*v}}function $(x,b,O){for(let v=0;v<64;++v)b[O+v]=Oi.toHalfFloat(fe(x[v]))}function fe(x){return x<=1?Math.sign(x)*Math.pow(Math.abs(x),2.2):Math.sign(x)*Math.pow(M,Math.abs(x)-1)}function le(x){return new DataView(x.array.buffer,x.offset.value,x.size)}function de(x){let b=x.viewer.buffer.slice(x.offset.value,x.offset.value+x.size),O=new Uint8Array(We(b)),v=new Uint8Array(O.length);return At(O),Oe(O,v),new DataView(v.buffer)}function Ie(x){let b=x.array.slice(x.offset.value,x.offset.value+x.size),O=zr(b),v=new Uint8Array(O.length);return At(O),Oe(O,v),new DataView(v.buffer)}function be(x){let b=x.viewer,O={value:x.offset.value},v=new Uint16Array(x.width*x.scanlineBlockSize*(x.channels*x.type)),A=new Uint8Array(8192),C=0,U=new Array(x.channels);for(let Me=0;Me<x.channels;Me++)U[Me]={},U[Me].start=C,U[Me].end=U[Me].start,U[Me].nx=x.width,U[Me].ny=x.lines,U[Me].size=x.type,C+=U[Me].nx*U[Me].ny*U[Me].size;let N=z(b,O),j=z(b,O);if(j>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(N<=j)for(let Me=0;Me<j-N+1;Me++)A[Me+N]=Le(b,O);let Y=new Uint16Array(65536),Q=w(A,Y),ae=pe(b,O);tt(x.array,b,O,ae,v,C);for(let Me=0;Me<x.channels;++Me){let Ee=U[Me];for(let Re=0;Re<U[Me].size;++Re)Ge(v,Ee.start+Re,Ee.nx,Ee.size,Ee.ny,Ee.nx*Ee.size,Q)}Z(Y,v,C);let ue=0,ge=new Uint8Array(v.buffer.byteLength);for(let Me=0;Me<x.lines;Me++)for(let Ee=0;Ee<x.channels;Ee++){let Re=U[Ee],He=Re.nx*Re.size,pt=new Uint8Array(v.buffer,Re.end*2,He*2);ge.set(pt,ue),ue+=He*2,Re.end+=He}return new DataView(ge.buffer)}function Ae(x){let b=x.array.slice(x.offset.value,x.offset.value+x.size),O=zr(b),v=x.lines*x.channels*x.width,A=x.type==1?new Uint16Array(v):new Uint32Array(v),C=0,U=0,N=new Array(4);for(let j=0;j<x.lines;j++)for(let Y=0;Y<x.channels;Y++){let Q=0;switch(x.type){case 1:N[0]=C,N[1]=N[0]+x.width,C=N[1]+x.width;for(let ae=0;ae<x.width;++ae){let ue=O[N[0]++]<<8|O[N[1]++];Q+=ue,A[U]=Q,U++}break;case 2:N[0]=C,N[1]=N[0]+x.width,N[2]=N[1]+x.width,C=N[2]+x.width;for(let ae=0;ae<x.width;++ae){let ue=O[N[0]++]<<24|O[N[1]++]<<16|O[N[2]++]<<8;Q+=ue,A[U]=Q,U++}break}}return new DataView(A.buffer)}function Fe(x){let b=x.viewer,O={value:x.offset.value},v=new Uint8Array(x.width*x.lines*(x.channels*x.type*2)),A={version:ze(b,O),unknownUncompressedSize:ze(b,O),unknownCompressedSize:ze(b,O),acCompressedSize:ze(b,O),dcCompressedSize:ze(b,O),rleCompressedSize:ze(b,O),rleUncompressedSize:ze(b,O),rleRawSize:ze(b,O),totalAcUncompressedCount:ze(b,O),totalDcUncompressedCount:ze(b,O),acCompression:ze(b,O)};if(A.version<2)throw new Error("EXRLoader.parse: "+yi.compression+" version "+A.version+" is unsupported");let C=new Array,U=z(b,O)-2;for(;U>0;){let Ee=Xe(b.buffer,O),Re=Le(b,O),He=Re>>2&3,pt=(Re>>4)-1,je=new Int8Array([pt])[0],Ye=Le(b,O);C.push({name:Ee,index:je,type:Ye,compression:He}),U-=Ee.length+3}let N=yi.channels,j=new Array(x.channels);for(let Ee=0;Ee<x.channels;++Ee){let Re=j[Ee]={},He=N[Ee];Re.name=He.name,Re.compression=0,Re.decoded=!1,Re.type=He.pixelType,Re.pLinear=He.pLinear,Re.width=x.width,Re.height=x.lines}let Y={idx:new Array(3)};for(let Ee=0;Ee<x.channels;++Ee){let Re=j[Ee];for(let He=0;He<C.length;++He){let pt=C[He];Re.name==pt.name&&(Re.compression=pt.compression,pt.index>=0&&(Y.idx[pt.index]=Ee),Re.offset=Ee)}}let Q,ae,ue;if(A.acCompressedSize>0)switch(A.acCompression){case 0:Q=new Uint16Array(A.totalAcUncompressedCount),tt(x.array,b,O,A.acCompressedSize,Q,A.totalAcUncompressedCount);break;case 1:let Ee=x.array.slice(O.value,O.value+A.totalAcUncompressedCount),Re=zr(Ee);Q=new Uint16Array(Re.buffer),O.value+=A.totalAcUncompressedCount;break}if(A.dcCompressedSize>0){let Ee={array:x.array,offset:O,size:A.dcCompressedSize};ae=new Uint16Array(Ie(Ee).buffer),O.value+=A.dcCompressedSize}if(A.rleRawSize>0){let Ee=x.array.slice(O.value,O.value+A.rleCompressedSize),Re=zr(Ee);ue=We(Re.buffer),O.value+=A.rleCompressedSize}let ge=0,Me=new Array(j.length);for(let Ee=0;Ee<Me.length;++Ee)Me[Ee]=new Array;for(let Ee=0;Ee<x.lines;++Ee)for(let Re=0;Re<j.length;++Re)Me[Re].push(ge),ge+=j[Re].width*x.type*2;De(Y,Me,j,Q,ae,v);for(let Ee=0;Ee<j.length;++Ee){let Re=j[Ee];if(!Re.decoded)switch(Re.compression){case 2:let He=0,pt=0;for(let je=0;je<x.lines;++je){let Ye=Me[Ee][He];for(let _t=0;_t<Re.width;++_t){for(let Ve=0;Ve<2*Re.type;++Ve)v[Ye++]=ue[pt+Ve*Re.width*Re.height];pt++}He++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(v.buffer)}function Xe(x,b){let O=new Uint8Array(x),v=0;for(;O[b.value+v]!=0;)v+=1;let A=new TextDecoder().decode(O.slice(b.value,b.value+v));return b.value=b.value+v+1,A}function ce(x,b,O){let v=new TextDecoder().decode(new Uint8Array(x).slice(b.value,b.value+O));return b.value=b.value+O,v}function Je(x,b){let O=re(x,b),v=pe(x,b);return[O,v]}function L(x,b){let O=pe(x,b),v=pe(x,b);return[O,v]}function re(x,b){let O=x.getInt32(b.value,!0);return b.value=b.value+4,O}function pe(x,b){let O=x.getUint32(b.value,!0);return b.value=b.value+4,O}function me(x,b){let O=x[b.value];return b.value=b.value+1,O}function Le(x,b){let O=x.getUint8(b.value);return b.value=b.value+1,O}let ze=function(x,b){let O;return"getBigInt64"in DataView.prototype?O=Number(x.getBigInt64(b.value,!0)):O=x.getUint32(b.value+4,!0)+Number(x.getUint32(b.value,!0)<<32),b.value+=8,O};function Be(x,b){let O=x.getFloat32(b.value,!0);return b.value+=4,O}function Ke(x,b){return Oi.toHalfFloat(Be(x,b))}function q(x){let b=(x&31744)>>10,O=x&1023;return(x>>15?-1:1)*(b?b===31?O?NaN:1/0:Math.pow(2,b-15)*(1+O/1024):6103515625e-14*(O/1024))}function z(x,b){let O=x.getUint16(b.value,!0);return b.value+=2,O}function xe(x,b){return q(z(x,b))}function ye(x,b,O,v){let A=O.value,C=[];for(;O.value<A+v-1;){let U=Xe(b,O),N=re(x,O),j=Le(x,O);O.value+=3;let Y=re(x,O),Q=re(x,O);C.push({name:U,pixelType:N,pLinear:j,xSampling:Y,ySampling:Q})}return O.value+=1,C}function qe(x,b){let O=Be(x,b),v=Be(x,b),A=Be(x,b),C=Be(x,b),U=Be(x,b),N=Be(x,b),j=Be(x,b),Y=Be(x,b);return{redX:O,redY:v,greenX:A,greenY:C,blueX:U,blueY:N,whiteX:j,whiteY:Y}}function ke(x,b){let O=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],v=Le(x,b);return O[v]}function ct(x,b){let O=pe(x,b),v=pe(x,b),A=pe(x,b),C=pe(x,b);return{xMin:O,yMin:v,xMax:A,yMax:C}}function ht(x,b){let O=["INCREASING_Y"],v=Le(x,b);return O[v]}function Ft(x,b){let O=Be(x,b),v=Be(x,b);return[O,v]}function Qt(x,b){let O=Be(x,b),v=Be(x,b),A=Be(x,b);return[O,v,A]}function xt(x,b,O,v,A){if(v==="string"||v==="stringvector"||v==="iccProfile")return ce(b,O,A);if(v==="chlist")return ye(x,b,O,A);if(v==="chromaticities")return qe(x,O);if(v==="compression")return ke(x,O);if(v==="box2i")return ct(x,O);if(v==="lineOrder")return ht(x,O);if(v==="float")return Be(x,O);if(v==="v2f")return Ft(x,O);if(v==="v3f")return Qt(x,O);if(v==="int")return re(x,O);if(v==="rational")return Je(x,O);if(v==="timecode")return L(x,O);if(v==="preview")return O.value+=A,"skipped";O.value+=A}function en(x,b,O){let v={};if(x.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");v.version=x.getUint8(4);let A=x.getUint8(5);v.spec={singleTile:!!(A&2),longName:!!(A&4),deepFormat:!!(A&8),multiPart:!!(A&16)},O.value=8;let C=!0;for(;C;){let U=Xe(b,O);if(U==0)C=!1;else{let N=Xe(b,O),j=pe(x,O),Y=xt(x,b,O,N,j);Y===void 0?console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${N}'.`):v[U]=Y}}if((A&-5)!=0)throw console.error("THREE.EXRHeader:",v),new Error("THREE.EXRLoader: Provided file is currently unsupported.");return v}function An(x,b,O,v,A){let C={size:0,viewer:b,array:O,offset:v,width:x.dataWindow.xMax-x.dataWindow.xMin+1,height:x.dataWindow.yMax-x.dataWindow.yMin+1,channels:x.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:x.channels[0].pixelType,uncompress:null,getter:null,format:null,colorSpace:Tt};switch(x.compression){case"NO_COMPRESSION":C.lines=1,C.uncompress=le;break;case"RLE_COMPRESSION":C.lines=1,C.uncompress=de;break;case"ZIPS_COMPRESSION":C.lines=1,C.uncompress=Ie;break;case"ZIP_COMPRESSION":C.lines=16,C.uncompress=Ie;break;case"PIZ_COMPRESSION":C.lines=32,C.uncompress=be;break;case"PXR24_COMPRESSION":C.lines=16,C.uncompress=Ae;break;case"DWAA_COMPRESSION":C.lines=32,C.uncompress=Fe;break;case"DWAB_COMPRESSION":C.lines=256,C.uncompress=Fe;break;default:throw new Error("EXRLoader.parse: "+x.compression+" is unsupported")}if(C.scanlineBlockSize=C.lines,C.type==1)switch(A){case nn:C.getter=xe,C.inputSize=2;break;case Dt:C.getter=z,C.inputSize=2;break}else if(C.type==2)switch(A){case nn:C.getter=Be,C.inputSize=4;break;case Dt:C.getter=Ke,C.inputSize=4}else throw new Error("EXRLoader.parse: unsupported pixelType "+C.type+" for "+x.compression+".");C.blockCount=(x.dataWindow.yMax+1)/C.scanlineBlockSize;for(let N=0;N<C.blockCount;N++)ze(b,v);C.outputChannels=C.channels==3?4:C.channels;let U=C.width*C.height*C.outputChannels;switch(A){case nn:C.byteArray=new Float32Array(U),C.channels<C.outputChannels&&C.byteArray.fill(1,0,U);break;case Dt:C.byteArray=new Uint16Array(U),C.channels<C.outputChannels&&C.byteArray.fill(15360,0,U);break;default:console.error("THREE.EXRLoader: unsupported type: ",A);break}return C.bytesPerLine=C.width*C.inputSize*C.channels,C.outputChannels==4?(C.format=hn,C.colorSpace=Tt):(C.format=_l,C.colorSpace=un),C}let Wi=new DataView(e),Qa=new Uint8Array(e),qn={value:0},yi=en(Wi,e,qn),nt=An(yi,Wi,Qa,qn,this.type),sr={value:0},Qr={R:0,G:1,B:2,A:3,Y:0};for(let x=0;x<nt.height/nt.scanlineBlockSize;x++){let b=pe(Wi,qn);nt.size=pe(Wi,qn),nt.lines=b+nt.scanlineBlockSize>nt.height?nt.height-b:nt.scanlineBlockSize;let v=nt.size<nt.lines*nt.bytesPerLine?nt.uncompress(nt):le(nt);qn.value+=nt.size;for(let A=0;A<nt.scanlineBlockSize;A++){let C=A+x*nt.scanlineBlockSize;if(C>=nt.height)break;for(let U=0;U<nt.channels;U++){let N=Qr[yi.channels[U].name];for(let j=0;j<nt.width;j++){sr.value=(A*(nt.channels*nt.width)+U*nt.width+j)*nt.inputSize;let Y=(nt.height-1-C)*(nt.width*nt.outputChannels)+j*nt.outputChannels+N;nt.byteArray[Y]=nt.getter(v,sr)}}}}return{header:yi,width:nt.width,height:nt.height,data:nt.byteArray,format:nt.format,colorSpace:nt.colorSpace,type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(o,a){o.colorSpace=a.colorSpace,o.minFilter=wt,o.magFilter=wt,o.generateMipmaps=!1,o.flipY=!1,t&&t(o,a)}return super.load(e,r,n,i)}};var js=class extends Xs{constructor(e){super(e),this.type=Dt}parse(e){let o=function(k,M){switch(k){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(M||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(M||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(M||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(M||""))}},u=function(k,M,w){M=M||1024;let X=k.pos,ie=-1,D=0,G="",W=String.fromCharCode.apply(null,new Uint16Array(k.subarray(X,X+128)));for(;0>(ie=W.indexOf(`
`))&&D<M&&X<k.byteLength;)G+=W,D+=W.length,X+=128,W+=String.fromCharCode.apply(null,new Uint16Array(k.subarray(X,X+128)));return-1<ie?(w!==!1&&(k.pos+=D+ie+1),G+W.slice(0,ie)):!1},d=function(k){let M=/^#\?(\S+)/,w=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,H=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,X=/^\s*FORMAT=(\S+)\s*$/,ie=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,D={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},G,W;for((k.pos>=k.byteLength||!(G=u(k)))&&o(1,"no header found"),(W=G.match(M))||o(3,"bad initial token"),D.valid|=1,D.programtype=W[1],D.string+=G+`
`;G=u(k),G!==!1;){if(D.string+=G+`
`,G.charAt(0)==="#"){D.comments+=G+`
`;continue}if((W=G.match(w))&&(D.gamma=parseFloat(W[1])),(W=G.match(H))&&(D.exposure=parseFloat(W[1])),(W=G.match(X))&&(D.valid|=2,D.format=W[1]),(W=G.match(ie))&&(D.valid|=4,D.height=parseInt(W[1],10),D.width=parseInt(W[2],10)),D.valid&2&&D.valid&4)break}return D.valid&2||o(3,"missing format specifier"),D.valid&4||o(3,"missing image size specifier"),D},p=function(k,M,w){let H=M;if(H<8||H>32767||k[0]!==2||k[1]!==2||k[2]&128)return new Uint8Array(k);H!==(k[2]<<8|k[3])&&o(3,"wrong scanline width");let X=new Uint8Array(4*M*w);X.length||o(4,"unable to allocate buffer space");let ie=0,D=0,G=4*H,W=new Uint8Array(4),te=new Uint8Array(G),ne=w;for(;ne>0&&D<k.byteLength;){D+4>k.byteLength&&o(1),W[0]=k[D++],W[1]=k[D++],W[2]=k[D++],W[3]=k[D++],(W[0]!=2||W[1]!=2||(W[2]<<8|W[3])!=H)&&o(3,"bad rgbe scanline format");let J=0,ee;for(;J<G&&D<k.byteLength;){ee=k[D++];let he=ee>128;if(he&&(ee-=128),(ee===0||J+ee>G)&&o(3,"bad scanline data"),he){let K=k[D++];for(let se=0;se<ee;se++)te[J++]=K}else te.set(k.subarray(D,D+ee),J),J+=ee,D+=ee}let oe=H;for(let he=0;he<oe;he++){let K=0;X[ie]=te[he+K],K+=H,X[ie+1]=te[he+K],K+=H,X[ie+2]=te[he+K],K+=H,X[ie+3]=te[he+K],ie+=4}ne--}return X},g=function(k,M,w,H){let X=k[M+3],ie=Math.pow(2,X-128)/255;w[H+0]=k[M+0]*ie,w[H+1]=k[M+1]*ie,w[H+2]=k[M+2]*ie,w[H+3]=1},_=function(k,M,w,H){let X=k[M+3],ie=Math.pow(2,X-128)/255;w[H+0]=Oi.toHalfFloat(Math.min(k[M+0]*ie,65504)),w[H+1]=Oi.toHalfFloat(Math.min(k[M+1]*ie,65504)),w[H+2]=Oi.toHalfFloat(Math.min(k[M+2]*ie,65504)),w[H+3]=Oi.toHalfFloat(1)},m=new Uint8Array(e);m.pos=0;let f=d(m),S=f.width,y=f.height,R=p(m.subarray(m.pos),S,y),F,I,P;switch(this.type){case nn:P=R.length/4;let k=new Float32Array(P*4);for(let w=0;w<P;w++)g(R,w*4,k,w*4);F=k,I=nn;break;case Dt:P=R.length/4;let M=new Uint16Array(P*4);for(let w=0;w<P;w++)_(R,w*4,M,w*4);F=M,I=Dt;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:S,height:y,data:F,header:f.string,gamma:f.gamma,exposure:f.exposure,type:I}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(o,a){switch(o.type){case nn:case Dt:o.colorSpace=Tt,o.minFilter=wt,o.magFilter=wt,o.generateMipmaps=!1,o.flipY=!0;break}t&&t(o,a)}return super.load(e,r,n,i)}};var EM=.25,bM=.06;function wM(s){return s.toLowerCase().endsWith(".exr")?new ma:new js}function TM(s){let e=(s&32768)>>15,t=(s&31744)>>10,n=s&1023;return t===0?(e?-1:1)*2**-14*(n/1024):t===31?n?NaN:(e?-1:1)*(1/0):(e?-1:1)*2**(t-15)*(1+n/1024)}function Hl(s){let{width:e,height:t,data:n}=s.image,i=n instanceof Uint16Array,r=P=>i?TM(n[P]):n[P],o=n.length/(e*t),a=new Float32Array(e*t),c=0,l=0,h=0;for(let P=0;P<e*t;P++){let k=P*o,M=.2126*r(k)+.7152*r(k+1)+.0722*r(k+2);a[P]=M,h+=M,M>c&&(c=M,l=P)}h/=e*t;let u=c*EM,d=Math.floor(l/e),p=l%e,g=Math.max(4,Math.round(t*bM)),_=new B,m=new Ce(0,0,0),f=2*Math.PI/e*(Math.PI/t),S=0,y=0,R=0;for(let P=Math.max(0,d-g);P<Math.min(t,d+g);P++)for(let k=p-g;k<p+g;k++){let M=(k+e)%e,w=P*e+M,H=a[w];if(H<u)continue;let X=(M+.5)/e,ie=1-(P+.5)/t,D=(X-.5)*2*Math.PI,G=(ie-.5)*Math.PI,W=Math.cos(G);_.x+=H*W*Math.cos(D),_.y+=H*Math.sin(G),_.z+=H*W*Math.sin(D),S+=H;let te=w*o;m.r+=r(te),m.g+=r(te+1),m.b+=r(te+2),y+=H*f*W,R++}if(S===0)return{direction:new B(0,1,0),color:new Ce(1,1,1),irradiance:0,angularRadius:0,peak:c,mean:h};_.normalize();let F=Math.max(m.r,m.g,m.b)||1;m.multiplyScalar(1/F);let I=Math.sqrt(R*f/Math.PI);return{direction:_,color:m,irradiance:y,angularRadius:I,peak:c,mean:h}}function Vf(s,e,t,n){let i=t.assets.hdri;return new Promise((r,o)=>{wM(i).load(i,a=>{let c=Hl(a),l=new Qn(e);l.compileEquirectangularShader();let h=l.fromEquirectangular(a).texture;a.dispose(),l.dispose(),s.environment=h,"environmentIntensity"in s&&(s.environmentIntensity=t.lighting.environmentIntensity),r({envMap:h,sun:c})},a=>n==null?void 0:n(a.total>0?a.loaded/a.total*100:-1),a=>o(new Error(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C HDRI "${i}": ${(a==null?void 0:a.message)??a}`)))})}function kr(s,e){s.traverse(t=>{if(!t.isMesh||!t.material)return;let n=Array.isArray(t.material)?t.material:[t.material];for(let i of n)"envMapIntensity"in i&&(i.envMapIntensity=e,i.needsUpdate=!0)})}var Hr={ceiling:.82,walls:.46,floor:.22,size:14},Wf=[{name:"key",width:6,height:8,distance:6,rotationY:62,elevation:40,intensity:5.2},{name:"fill",width:8,height:8,distance:7,rotationY:-68,elevation:10,intensity:.9},{name:"rim",width:5,height:2.5,distance:6,rotationY:172,elevation:46,intensity:1.6},{name:"streak-near",width:.4,height:8,distance:5,rotationY:80,elevation:14,intensity:1.5},{name:"streak-far",width:.28,height:6,distance:5,rotationY:40,elevation:26,intensity:1.1}];function Xf(s){let e=new zt;return typeof s=="number"?e.color.setScalar(s):e.color.copy(s),e.side=bn,e}function AM(s,e){let{width:t,height:n,distance:i,rotationY:r,elevation:o,intensity:a}=e,c=new lt(new In(t,n),Xf(a)),l=rn.degToRad(r),h=rn.degToRad(o);return c.position.set(Math.sin(l)*Math.cos(h)*i,Math.sin(h)*i,Math.cos(l)*Math.cos(h)*i),c.lookAt(0,0,0),c.name=e.name,s.add(c),c}var Gf={walls:.5,floor:1};function RM(s,e,t){let n=new Ce().setScalar(s);return!e||t<=0?n:n.lerp(e.clone().multiplyScalar(s/Hr.walls),t)}function CM(s,e){let{size:t,ceiling:n,walls:i,floor:r}=Hr,o=t/2,a=e?e.clone().multiplyScalar(Gf.floor):new Ce().setScalar(r),c=h=>RM(h,e,Gf.walls),l=[{color:n,position:[0,o,0],rotation:[Math.PI/2,0,0]},{color:a,position:[0,-o,0],rotation:[-Math.PI/2,0,0]},{color:c(i),position:[0,0,-o],rotation:[0,0,0]},{color:c(i*.85),position:[0,0,o],rotation:[0,Math.PI,0]},{color:c(i*1.1),position:[-o,0,0],rotation:[0,Math.PI/2,0]},{color:c(i*.9),position:[o,0,0],rotation:[0,-Math.PI/2,0]}];for(let h of l){let u=new lt(new In(t,t),Xf(h.color));u.position.set(...h.position),u.rotation.set(...h.rotation),s.add(u)}}function PM(){let s=Wf[0],e=rn.degToRad(s.rotationY),t=rn.degToRad(s.elevation),n=new B(Math.sin(e)*Math.cos(t),Math.sin(t),Math.cos(e)*Math.cos(t)).normalize(),i=Math.atan(Math.sqrt(s.width*s.height/Math.PI)/s.distance),r=(Hr.ceiling+Hr.walls*4+Hr.floor)/6;return{direction:n,color:new Ce(1,1,1),irradiance:s.intensity,angularRadius:i,peak:s.intensity,mean:r}}function Vl(s,e,t,n=null){let i=n?new Ce(n).convertSRGBToLinear():null,r=new Hs;CM(r,i);for(let c of Wf)AM(r,c);let o=new Qn(e);o.compileEquirectangularShader();let a=o.fromScene(r,0,.1,100).texture;return o.dispose(),r.traverse(c=>{c.isMesh&&(c.geometry.dispose(),c.material.dispose())}),s.environment=a,"environmentIntensity"in s&&(s.environmentIntensity=t.lighting.environmentIntensity),{envMap:a,sun:PM()}}var Js={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var Tn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},IM=new Jn(-1,1,1,-1,0,1),Gl=class extends qt{constructor(){super(),this.setAttribute("position",new Ct([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ct([0,2,0,0,2,0],2))}},LM=new Gl,Bi=class{constructor(e){this._mesh=new lt(LM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,IM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var as=class extends Tn{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Nt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Wn.clone(e.uniforms),this.material=new Nt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Bi(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Vr=class extends Tn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}},ga=class extends Tn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var va=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new Pe);this._width=n.width,this._height=n.height,t=new Xt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Dt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new as(Js),this.copyPass.material.blending=Vt,this.clock=new Ys}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let i=0,r=this.passes.length;i<r;i++){let o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){let a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Vr!==void 0&&(o instanceof Vr?n=!0:o instanceof ga&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new Pe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var _a=class extends Tn{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ce}render(e,t,n){let i=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}};var Gr={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Pe},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new $e},cameraProjectionMatrixInverse:{value:new $e},cameraWorldMatrix:{value:new $e},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new B(-1,-1,-1)},sceneBoxMax:{value:new B(1,1,1)}},vertexShader:`

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

		}`},xa={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function qf(s=5){let e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=DM(e),n=t.length,i=new Uint8Array(n*4);for(let o=0;o<n;++o){let a=t[o],c=2*Math.PI*a/n,l=new B(Math.cos(c),Math.sin(c),0).normalize();i[o*4]=(l.x*.5+.5)*255,i[o*4+1]=(l.y*.5+.5)*255,i[o*4+2]=127,i[o*4+3]=255}let r=new Pi(i,e,e);return r.wrapS=Gt,r.wrapT=Gt,r.needsUpdate=!0,r}function DM(s){let e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=e*e,n=Array(t).fill(0),i=Math.floor(e/2),r=e-1;for(let o=1;o<=t;){if(i===-1&&r===e?(r=e-2,i=0):(r===e&&(r=0),i<0&&(i=e-1)),n[i*e+r]!==0){r-=2,i++;continue}else n[i*e+r]=o++;r++,i--}return n}var Xr={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:Wl(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Pe},cameraProjectionMatrixInverse:{value:new $e},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Wl(s,e,t){let n=UM(s,e,t),i="vec3[SAMPLES](";for(let r=0;r<s;r++){let o=n[r];i+=`vec3(${o.x}, ${o.y}, ${o.z})${r<s-1?",":")"}`}return i}function UM(s,e,t){let n=[];for(let i=0;i<s;i++){let r=2*Math.PI*e*i/s,o=Math.pow(i/(s-1),t);n.push(new B(Math.cos(r),Math.sin(r),o))}return n}var ya=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(e,t,n){return e[0]*t+e[1]*n}dot3(e,t,n,i){return e[0]*t+e[1]*n+e[2]*i}dot4(e,t,n,i,r){return e[0]*t+e[1]*n+e[2]*i+e[3]*r}noise(e,t){let n,i,r,o=.5*(Math.sqrt(3)-1),a=(e+t)*o,c=Math.floor(e+a),l=Math.floor(t+a),h=(3-Math.sqrt(3))/6,u=(c+l)*h,d=c-u,p=l-u,g=e-d,_=t-p,m,f;g>_?(m=1,f=0):(m=0,f=1);let S=g-m+h,y=_-f+h,R=g-1+2*h,F=_-1+2*h,I=c&255,P=l&255,k=this.perm[I+this.perm[P]]%12,M=this.perm[I+m+this.perm[P+f]]%12,w=this.perm[I+1+this.perm[P+1]]%12,H=.5-g*g-_*_;H<0?n=0:(H*=H,n=H*H*this.dot(this.grad3[k],g,_));let X=.5-S*S-y*y;X<0?i=0:(X*=X,i=X*X*this.dot(this.grad3[M],S,y));let ie=.5-R*R-F*F;return ie<0?r=0:(ie*=ie,r=ie*ie*this.dot(this.grad3[w],R,F)),70*(n+i+r)}noise3d(e,t,n){let i,r,o,a,l=(e+t+n)*.3333333333333333,h=Math.floor(e+l),u=Math.floor(t+l),d=Math.floor(n+l),p=1/6,g=(h+u+d)*p,_=h-g,m=u-g,f=d-g,S=e-_,y=t-m,R=n-f,F,I,P,k,M,w;S>=y?y>=R?(F=1,I=0,P=0,k=1,M=1,w=0):S>=R?(F=1,I=0,P=0,k=1,M=0,w=1):(F=0,I=0,P=1,k=1,M=0,w=1):y<R?(F=0,I=0,P=1,k=0,M=1,w=1):S<R?(F=0,I=1,P=0,k=0,M=1,w=1):(F=0,I=1,P=0,k=1,M=1,w=0);let H=S-F+p,X=y-I+p,ie=R-P+p,D=S-k+2*p,G=y-M+2*p,W=R-w+2*p,te=S-1+3*p,ne=y-1+3*p,J=R-1+3*p,ee=h&255,oe=u&255,he=d&255,K=this.perm[ee+this.perm[oe+this.perm[he]]]%12,se=this.perm[ee+F+this.perm[oe+I+this.perm[he+P]]]%12,Se=this.perm[ee+k+this.perm[oe+M+this.perm[he+w]]]%12,_e=this.perm[ee+1+this.perm[oe+1+this.perm[he+1]]]%12,Te=.6-S*S-y*y-R*R;Te<0?i=0:(Te*=Te,i=Te*Te*this.dot3(this.grad3[K],S,y,R));let Ue=.6-H*H-X*X-ie*ie;Ue<0?r=0:(Ue*=Ue,r=Ue*Ue*this.dot3(this.grad3[se],H,X,ie));let Ge=.6-D*D-G*G-W*W;Ge<0?o=0:(Ge*=Ge,o=Ge*Ge*this.dot3(this.grad3[Se],D,G,W));let Ne=.6-te*te-ne*ne-J*J;return Ne<0?a=0:(Ne*=Ne,a=Ne*Ne*this.dot3(this.grad3[_e],te,ne,J)),32*(i+r+o+a)}noise4d(e,t,n,i){let r=this.grad4,o=this.simplex,a=this.perm,c=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20,h,u,d,p,g,_=(e+t+n+i)*c,m=Math.floor(e+_),f=Math.floor(t+_),S=Math.floor(n+_),y=Math.floor(i+_),R=(m+f+S+y)*l,F=m-R,I=f-R,P=S-R,k=y-R,M=e-F,w=t-I,H=n-P,X=i-k,ie=M>w?32:0,D=M>H?16:0,G=w>H?8:0,W=M>X?4:0,te=w>X?2:0,ne=H>X?1:0,J=ie+D+G+W+te+ne,ee=o[J][0]>=3?1:0,oe=o[J][1]>=3?1:0,he=o[J][2]>=3?1:0,K=o[J][3]>=3?1:0,se=o[J][0]>=2?1:0,Se=o[J][1]>=2?1:0,_e=o[J][2]>=2?1:0,Te=o[J][3]>=2?1:0,Ue=o[J][0]>=1?1:0,Ge=o[J][1]>=1?1:0,Ne=o[J][2]>=1?1:0,tt=o[J][3]>=1?1:0,Z=M-ee+l,At=w-oe+l,Oe=H-he+l,We=X-K+l,De=M-se+2*l,gt=w-Se+2*l,Ze=H-_e+2*l,T=X-Te+2*l,E=M-Ue+3*l,$=w-Ge+3*l,fe=H-Ne+3*l,le=X-tt+3*l,de=M-1+4*l,Ie=w-1+4*l,be=H-1+4*l,Ae=X-1+4*l,Fe=m&255,Xe=f&255,ce=S&255,Je=y&255,L=a[Fe+a[Xe+a[ce+a[Je]]]]%32,re=a[Fe+ee+a[Xe+oe+a[ce+he+a[Je+K]]]]%32,pe=a[Fe+se+a[Xe+Se+a[ce+_e+a[Je+Te]]]]%32,me=a[Fe+Ue+a[Xe+Ge+a[ce+Ne+a[Je+tt]]]]%32,Le=a[Fe+1+a[Xe+1+a[ce+1+a[Je+1]]]]%32,ze=.6-M*M-w*w-H*H-X*X;ze<0?h=0:(ze*=ze,h=ze*ze*this.dot4(r[L],M,w,H,X));let Be=.6-Z*Z-At*At-Oe*Oe-We*We;Be<0?u=0:(Be*=Be,u=Be*Be*this.dot4(r[re],Z,At,Oe,We));let Ke=.6-De*De-gt*gt-Ze*Ze-T*T;Ke<0?d=0:(Ke*=Ke,d=Ke*Ke*this.dot4(r[pe],De,gt,Ze,T));let q=.6-E*E-$*$-fe*fe-le*le;q<0?p=0:(q*=q,p=q*q*this.dot4(r[me],E,$,fe,le));let z=.6-de*de-Ie*Ie-be*be-Ae*Ae;return z<0?g=0:(z*=z,g=z*z*this.dot4(r[Le],de,Ie,be,Ae)),27*(h+u+d+p+g)}};var zi=class s extends Tn{constructor(e,t,n,i,r,o,a){super(),this.width=n!==void 0?n:512,this.height=i!==void 0?i:512,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=qf(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Xt(this.width,this.height,{type:Dt}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Nt({defines:Object.assign({},Gr.defines),uniforms:Wn.clone(Gr.uniforms),vertexShader:Gr.vertexShader,fragmentShader:Gr.fragmentShader,blending:Vt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.definesPERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Qo,this.normalMaterial.blending=Vt,this.pdMaterial=new Nt({defines:Object.assign({},Xr.defines),uniforms:Wn.clone(Xr.uniforms),vertexShader:Xr.vertexShader,fragmentShader:Xr.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Nt({defines:Object.assign({},Wr.defines),uniforms:Wn.clone(Wr.uniforms),vertexShader:Wr.vertexShader,fragmentShader:Wr.fragmentShader,blending:Vt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Nt({uniforms:Wn.clone(Js.uniforms),vertexShader:Js.vertexShader,fragmentShader:Js.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:aa,blendDst:Zs,blendEquation:Cn,blendSrcAlpha:oa,blendDstAlpha:Zs,blendEquationAlpha:Cn}),this.blendMaterial=new Nt({uniforms:Wn.clone(xa.uniforms),vertexShader:xa.vertexShader,fragmentShader:xa.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:fl,blendSrc:aa,blendDst:Zs,blendEquation:Cn,blendSrcAlpha:oa,blendDstAlpha:Zs,blendEquationAlpha:Cn}),this.fsQuad=new Bi(null),this.originalClearColor=new Ce,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),o!==void 0&&this.updateGtaoMaterial(o),a!==void 0&&this.updatePdMaterial(a)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new ks,this.depthTexture.format=Ci,this.depthTexture.type=di,this.normalRenderTarget=new Xt(this.width,this.height,{minFilter:It,magFilter:It,type:Dt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let n=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Wl(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case s.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Vt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Vt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Vt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Vt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Vt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(e,t,n,i,r){e.getClearColor(this.originalClearColor);let o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=a,e.setClearColor(this.originalClearColor),e.setClearAlpha(o)}renderOverride(e,t,n,i,r){e.getClearColor(this.originalClearColor);let o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i=t.clearColor||i,r=t.clearAlpha||r,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=a,e.setClearColor(this.originalClearColor),e.setClearAlpha(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){t.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){let i=t.get(n);n.visible=i}),t.clear()}generateNoise(e=64){let t=new ya,n=e*e*4,i=new Uint8Array(n);for(let o=0;o<e;o++)for(let a=0;a<e;a++){let c=o,l=a;i[(o*e+a)*4]=(t.noise(c,l)*.5+.5)*255,i[(o*e+a)*4+1]=(t.noise(c+e,l)*.5+.5)*255,i[(o*e+a)*4+2]=(t.noise(c,l+e)*.5+.5)*255,i[(o*e+a)*4+3]=(t.noise(c+e,l+e)*.5+.5)*255}let r=new Pi(i,e,e,hn,$n);return r.wrapS=Gt,r.wrapT=Gt,r.needsUpdate=!0,r}};zi.OUTPUT={Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Ma={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var Sa=class extends Tn{constructor(){super();let e=Ma;this.uniforms=Wn.clone(e.uniforms),this.material=new Jo({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Bi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},dt.getTransfer(this._outputColorSpace)===St&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Dr?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===pl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ml?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ks?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===rs&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Zf={uniforms:{tDiffuse:{value:null},amount:{value:0}},vertexShader:`
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
  `},NM=`
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
`,Xl=class extends Sa{constructor(){super(),this.material.fragmentShader=NM,this.material.vertexShader=Ma.vertexShader}},OM={uniforms:{tDiffuse:{value:null},backdrop:{value:null},shadow:{value:null},hasBackdrop:{value:!1},hasShadow:{value:!1},shadowOpacity:{value:1},frameSize:{value:new Pe(1,1)}},vertexShader:Zf.vertexShader,fragmentShader:`
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
  `},Ea=class{constructor({renderer:e,scene:t,camera:n,config:i}){this.renderer=e,this.scene=t,this.camera=n,this.config=i;let r=i.quality??{};if(this.enabled=r.postProcessing!==!1,!this.enabled)return;let o=e.getDrawingBufferSize(new Pe);this.target=new Xt(o.x,o.y,{type:Dt,samples:r.msaaSamples??4}),this.composer=new va(e,this.target),this.composer.setPixelRatio(e.getPixelRatio()),this.renderPass=new _a(t,n),this.composer.addPass(this.renderPass),this.aoCamera=n.clone(),this.aoCamera.layers.set(0),this.gtao=new zi(t,this.aoCamera,o.x,o.y),this.gtao.output=zi.OUTPUT.Default,this.gtao.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:8,rings:4,samples:16}),this.setAmbientOcclusion(r.ambientOcclusion??{}),this.composer.addPass(this.gtao),this.composer.addPass(new Xl),this.backdrop=new as(OM),this.backdrop.enabled=!1,this.composer.addPass(this.backdrop),this.grain=new as(Zf),this.composer.addPass(this.grain)}setAmbientOcclusion(e={}){var n;if(!this.gtao)return;let t={...((n=this.config.quality)==null?void 0:n.ambientOcclusion)??{},...e};this.gtao.enabled=t.enabled!==!1,this.gtao.blendIntensity=t.intensity??1,this.gtao.updateGtaoMaterial({radius:t.radius??.06,distanceExponent:t.distanceExponent??1,thickness:t.thickness??.3,scale:t.scale??1,samples:t.samples??16,screenSpaceRadius:!1})}showAmbientOcclusionOnly(e){this.gtao&&(this.gtao.output=e?zi.OUTPUT.Denoise:zi.OUTPUT.Default)}setBackdrop(e){if(!this.backdrop)return;let t=this.backdrop.uniforms;this.backdrop.enabled=!!(e!=null&&e.texture),t.backdrop.value=(e==null?void 0:e.texture)??null,t.hasBackdrop.value=!!(e!=null&&e.texture),t.shadow.value=(e==null?void 0:e.shadow)??null,t.hasShadow.value=!!(e!=null&&e.shadow),t.shadowOpacity.value=(e==null?void 0:e.shadowOpacity)??1,t.frameSize.value.set(...(e==null?void 0:e.frameSize)??[1,1])}setGrain(e){this.grain&&(this.grain.uniforms.amount.value=Math.max(0,e??0))}render(){if(!this.enabled){this.renderer.render(this.scene,this.camera);return}this.aoCamera.copy(this.camera),this.aoCamera.layers.set(0),this.composer.render()}setSize(e,t){if(!this.enabled)return;let n=this.renderer.getPixelRatio();this.composer.setPixelRatio(n),this.composer.setSize(e,t),this.gtao.setSize(e*n,t*n)}dispose(){var e,t,n,i;this.enabled&&((t=(e=this.gtao).dispose)==null||t.call(e),(i=(n=this.composer).dispose)==null||i.call(n),this.target.dispose())}};function Kf(s){return{base:`#${new Ce(s).getHexString()}`}}function $f({base:s}){return s}function ba(s,e,t,{base:n}){s.fillStyle=n,s.fillRect(0,0,e,t)}var FM=[{mime:"video/mp4;codecs=avc1.42E01E",ext:"mp4"},{mime:"video/mp4",ext:"mp4"},{mime:"video/webm;codecs=vp9",ext:"webm"},{mime:"video/webm;codecs=vp8",ext:"webm"},{mime:"video/webm",ext:"webm"}];function ql(){var s;if(typeof MediaRecorder>"u")return null;for(let e of FM)if((s=MediaRecorder.isTypeSupported)!=null&&s.call(MediaRecorder,e.mime))return e;return null}function BM(s,e){let t=Math.max(2,s.width-s.width%2),n=Math.max(2,s.height-s.height%2),i=document.createElement("canvas");i.width=t,i.height=n;let r=i.getContext("2d");return{canvas:i,draw(){ba(r,t,n,e),r.drawImage(s,0,0)}}}function zM(s,e="image/png"){return new Promise(t=>{try{s.toBlob(n=>t(n),e)}catch(n){console.error(n),t(null)}})}var kM=s=>new Promise(e=>setTimeout(e,s)),HM=250;async function VM({compositor:s,type:e,settings:t,startAngle:n,setAngle:i,renderFrame:r,onProgress:o}){let{fps:a,bitrate:c,duration:l}=t,h=s.canvas.captureStream(a),u=new MediaRecorder(h,{mimeType:e.mime,videoBitsPerSecond:c}),d=[];u.addEventListener("dataavailable",S=>{var y;(y=S.data)!=null&&y.size&&d.push(S.data)});let p=new Promise((S,y)=>{u.addEventListener("stop",S,{once:!0}),u.addEventListener("error",R=>y(R.error??new Error("\u0417\u0430\u043F\u0438\u0441\u044C \u043F\u0440\u0435\u0440\u0432\u0430\u043D\u0430")),{once:!0})});i(n),r(),s.draw(),u.start();let g=1e3/a,_=l*1e3,m=0,f=performance.now();return await new Promise(S=>{let y=()=>{let R=performance.now();if(document.hidden){u.state==="recording"&&u.pause(),f=R,setTimeout(y,200);return}u.state==="paused"&&u.resume(),m+=Math.min(R-f,HM),f=R;let F=Math.min(m/_,1);if(i(n+F*360),r(),s.draw(),o==null||o(F),F>=1){S();return}setTimeout(y,Math.max(0,g-(performance.now()-R)))};y()}),await kM(Math.ceil(1e3/a)+60),u.stop(),await p,h.getTracks().forEach(S=>S.stop()),new Blob(d,{type:e.mime})}async function GM({compositor:s,step:e,prefix:t,setAngle:n,renderFrame:i,onProgress:r}){let o=Math.max(1,Math.round(360/e)),a=360/o,c=[];for(let l=0;l<o;l+=1){let h=l*a;n(h),i(),s.draw();let u=await zM(s.canvas);if(u){let d=String(Math.round(h)).padStart(3,"0");c.push({name:`${t}-${d}.png`,data:new Uint8Array(await u.arrayBuffer())})}r==null||r((l+1)/o)}return c}async function jf({source:s,backdrop:e,settings:t,startAngle:n,setAngle:i,renderFrame:r,photos:o=!1,onProgress:a}){let c=BM(s,e),l=ql(),h=l?o?.85:1:0,u=null;l&&(u=await VM({compositor:c,type:l,settings:t,startAngle:n,setAngle:i,renderFrame:r,onProgress:p=>a==null?void 0:a(p*h,"\u0417\u0430\u043F\u0438\u0441\u044C \u043E\u0431\u043E\u0440\u043E\u0442\u0430")}));let d=[];return o&&(d=await GM({compositor:c,step:t.photoStep,prefix:t.name,setAngle:i,renderFrame:r,onProgress:p=>a==null?void 0:a(h+p*(1-h),"\u0421\u044A\u0451\u043C\u043A\u0430 \u043A\u0430\u0434\u0440\u043E\u0432")})),{video:u,videoExt:(l==null?void 0:l.ext)??null,photos:d}}var wa=Object.freeze([{id:"cafe",label:"\u041A\u043E\u0444\u0435\u0439\u043D\u044F",note:"\u0423\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u0441\u0432\u0435\u0442 \u0438\u0437 \u043E\u043A\u043D\u0430"}]),Yl="assets/scenes",Ta=wa[0].id;var WM=.85,Aa=new Map;function Zl(s){return new Promise((e,t)=>{new Ui().load(s,n=>{n.colorSpace=mt,n.wrapS=Ot,n.wrapT=Ot,e(n)},void 0,()=>t(new Error(`\u0444\u043E\u043D \u0441\u0446\u0435\u043D\u044B \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u0441\u044F: ${s}`)))})}function XM(s,e,t){return new Promise((n,i)=>{new js().load(s,r=>{let o=Hl(r),a=new Qn(e);a.compileEquirectangularShader();let c=a.fromEquirectangular(r).texture;r.dispose(),a.dispose(),n({envMap:c,sun:o})},r=>t==null?void 0:t(r.total>0?r.loaded/r.total*100:-1),()=>i(new Error(`\u0441\u0432\u0435\u0442 \u0441\u0446\u0435\u043D\u044B \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u0441\u044F: ${s}`)))})}async function qM(s,e,t){let n=`${Yl}/${s}`,i=await fetch(`${n}/scene.json`,{credentials:"same-origin"});if(!i.ok)throw new Error(`\u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u0446\u0435\u043D\u044B ${s}: HTTP ${i.status}`);let r=await i.json(),[o,a,c]=await Promise.all([Zl(`${n}/${r.backdrop.wide}`),Zl(`${n}/${r.backdrop.tall}`),XM(`${n}/${r.environment}`,e,t)]);return{id:s,data:r,backdrops:{wide:o,tall:a},envMap:c.envMap,sun:c.sun}}function Jf(s,e,t){return Aa.has(s)||Aa.set(s,qM(s,e,t).catch(n=>{throw Aa.delete(s),n})),Aa.get(s)}var Ra=new Map;function Qf(s){return(s==null?void 0:s.id)??null}function Kl(s,e,t,n="wide"){let i=t&&e.shadows?e.shadows[t]:null,r=typeof i=="string"?n==="wide"?i:null:i==null?void 0:i[n];if(!r)return Promise.resolve(null);let o=`${Yl}/${s}/${r}`;return Ra.has(o)||Ra.set(o,Zl(o).catch(a=>(console.warn(`\u0421\u043B\u043E\u0439 \u0442\u0435\u043D\u0438 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u0441\u044F: ${a.message}`),Ra.delete(o),null))),Ra.get(o)}function $l(s){return s<WM?"tall":"wide"}function Ca(s,e){let[t,n]=s.frames[e];return t/n}function ep(s,e,t){let n=s.camera.fov[e];if(t>=Ca(s,e))return n.y;let i=rn.degToRad(n.x)/2;return rn.radToDeg(2*Math.atan(Math.tan(i)/t))}function tp(s,e){return s>=e?[e/s,1]:[1,s/e]}function np(s,e){var i,r;let t=(i=e==null?void 0:e.size)==null?void 0:i.height,n=(r=s.floor)==null?void 0:r.mmPerUnit;return!(t>0)||!(n>0)?null:t/n}var _i={coated:{label:"\u041C\u0435\u043B\u043E\u0432\u0430\u043D\u043D\u044B\u0439",roughness:.18,relief:.009,reliefScale:90,normalScale:.3,short:"\u0413\u043B\u044F\u043D\u0435\u0446",note:"\u0413\u043B\u0430\u0434\u043A\u0438\u0439, \u0441\u043E\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u0431\u043B\u0438\u043A"},uncoated:{label:"\u041D\u0435\u043C\u0435\u043B\u043E\u0432\u0430\u043D\u043D\u044B\u0439",roughness:.85,relief:.1,reliefScale:10,normalScale:1.4,short:"\u041C\u0430\u0442",note:"\u041C\u0430\u0442\u043E\u0432\u044B\u0439, \u0432\u0438\u0434\u043D\u043E \u0432\u043E\u043B\u043E\u043A\u043D\u043E"}},xi="uncoated";function Pa(){let s=_i[xi];return jl(xi)}function jl(s){let e=_i[s]??_i[xi];return{roughness:e.roughness,metalness:0,relief:e.relief,reliefScale:e.reliefScale,normalScale:e.normalScale}}var ni=Object.freeze({color:"#ffffff",opacity:.65,roughness:.62,metalness:0,clearcoat:.35,clearcoatRoughness:.3,sheen:.5,sheenRoughness:.6}),YM={coated:"coated",\u043C\u0435\u043B\u043E\u0432\u0430\u043D\u043D\u044B\u0439:"coated",\u043C\u0435\u043B\u043E\u0432\u0430\u043D\u043D\u0430\u044F:"coated",\u0433\u043B\u044F\u043D\u0446\u0435\u0432\u044B\u0439:"coated",uncoated:"uncoated",\u043D\u0435\u043C\u0435\u043B\u043E\u0432\u0430\u043D\u043D\u044B\u0439:"uncoated",\u043D\u0435\u043C\u0435\u043B\u043E\u0432\u0430\u043D\u043D\u0430\u044F:"uncoated",\u043A\u0440\u0430\u0444\u0442:"uncoated",\u043C\u0430\u0442\u043E\u0432\u044B\u0439:"uncoated"};function ip(s){let e=String(s??"").trim().toLowerCase(),t=YM[e]??(_i[e]?e:xi);return{key:t,..._i[t]}}var Ia=Object.freeze({materials:[],uv:0,sheet:!1}),ZM=Object.freeze({materials:["Paper_Print"],uv:0,sheet:!1}),Jl=Object.freeze({single:{label:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0439",short:"1 \u0441\u043B\u043E\u0439"},double:{label:"\u0414\u0432\u0443\u0445\u0441\u043B\u043E\u0439\u043D\u044B\u0439",short:"2 \u0441\u043B\u043E\u044F"},embossed:{label:"\u0421 \u0442\u0438\u0441\u043D\u0435\u043D\u0438\u0435\u043C",short:"\u0442\u0438\u0441\u043D\u0435\u043D\u0438\u0435"},plastic:{label:"\u041F\u043E\u043B\u0438\u043F\u0440\u043E\u043F\u0438\u043B\u0435\u043D",short:"\u043F\u043B\u0430\u0441\u0442\u0438\u043A"}});function KM({id:s,group:e,wall:t,volume:n,size:i}){return{id:s,label:s,group:e,wall:t,volume:n,note:`${Jl[t].label} \xB7 \xD8${Math.round(i.top)} \u043C\u043C`,file:`assets/models/cups/${s}.glb`,size:i,finish:"paper",print:ZM}}var $M=[{id:"HB62-120",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:120,size:{height:63,top:62,bottom:45.2}},{id:"HB70-180",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:180,size:{height:80,top:70,bottom:45.6}},{id:"HB70-195",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:195,size:{height:79.5,top:70.4,bottom:49.4}},{id:"HB72-205",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:205,size:{height:81,top:71.9,bottom:50.9}},{id:"HB70-210",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:210,size:{height:93,top:70,bottom:45.7}},{id:"HB73-260",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:260,size:{height:103.5,top:72.7,bottom:48.1}},{id:"HB80-280",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:280,size:{height:88,top:80.1,bottom:57.1}},{id:"HB80-340",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:340,size:{height:116,top:80,bottom:50.3}},{id:"HB80-360",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:360,size:{height:116.9,top:80.8,bottom:53.7}},{id:"HB90-430",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:430,size:{height:111.6,top:89.4,bottom:60.1}},{id:"HB90-530",group:"\u041E\u0434\u043D\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"single",volume:530,size:{height:135.7,top:89.7,bottom:60.2}},{id:"DW80-280",group:"\u0414\u0432\u0443\u0445\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"double",volume:280,size:{height:88,top:80.1,bottom:57.1}},{id:"DW90-430",group:"\u0414\u0432\u0443\u0445\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"double",volume:430,size:{height:111.6,top:89.4,bottom:60.1}},{id:"DW90-530",group:"\u0414\u0432\u0443\u0445\u0441\u043B\u043E\u0439\u043D\u044B\u0435",wall:"double",volume:530,size:{height:135.7,top:89.7,bottom:60.2}},{id:"EM80-280",group:"\u0421 \u0442\u0438\u0441\u043D\u0435\u043D\u0438\u0435\u043C",wall:"embossed",volume:280,size:{height:88,top:80.1,bottom:57.1}},{id:"EM90-430",group:"\u0421 \u0442\u0438\u0441\u043D\u0435\u043D\u0438\u0435\u043C",wall:"embossed",volume:430,size:{height:111.6,top:89.4,bottom:60.1}}].map(KM),jM=[{id:"PP-410",label:"PP-410",group:"\u041F\u043B\u0430\u0441\u0442\u0438\u043A\u043E\u0432\u044B\u0435",wall:"plastic",volume:410,note:"\u041F\u043E\u043B\u0438\u043F\u0440\u043E\u043F\u0438\u043B\u0435\u043D \xB7 \xD889 \u043C\u043C",file:"assets/models/Cup_410ml.glb",size:{height:112,top:89,bottom:57},finish:"plastic",print:{materials:["Cup_PP"],uv:1,sheet:!0}},{id:"PP-500",label:"PP-500",group:"\u041F\u043B\u0430\u0441\u0442\u0438\u043A\u043E\u0432\u044B\u0435",wall:"plastic",volume:500,note:"\u041F\u043E\u043B\u0438\u043F\u0440\u043E\u043F\u0438\u043B\u0435\u043D \xB7 \xD889 \u043C\u043C",file:"assets/models/Cup_500ml.glb",size:{height:135,top:89,bottom:57},finish:"plastic",print:{materials:["Cup_PP"],uv:1,sheet:!0}},{id:"PP-650",label:"PP-650",group:"\u041F\u043B\u0430\u0441\u0442\u0438\u043A\u043E\u0432\u044B\u0435",wall:"plastic",volume:650,note:"\u041F\u043E\u043B\u0438\u043F\u0440\u043E\u043F\u0438\u043B\u0435\u043D \xB7 \xD889 \u043C\u043C",file:"assets/models/Cup_650ml.glb",size:{height:179,top:89,bottom:57},finish:"plastic",print:{materials:["Cup_PP"],uv:1,sheet:!0}}],cs=Object.freeze([...$M,...jM]),sp="HB80-280",JM=[{test:/^DW/i,id:"DW80-280"},{test:/^EM/i,id:"EM80-280"},{test:/^HB/i,id:"HB80-280"},{test:/^PP/i,id:"PP-500"}],QM=new Map(cs.map(s=>[s.id.toUpperCase(),s])),eS=new Map(cs.map(s=>[s.file,s])),rp=s=>String(s??"").toUpperCase().replace(/[^A-ZА-Я0-9]/g,"");function ki(s){return QM.get(String(s??"").trim().toUpperCase())??null}function op(s){return eS.get(String(s??"").trim())??null}function ap(s){let e=String(s??"").trim();if(!e)return{cup:ki(sp),matchedBy:"fallback"};let t=ki(e);if(t)return{cup:t,matchedBy:"sku"};let n=rp(e),i=cs.filter(o=>n.startsWith(rp(o.id))).sort((o,a)=>a.id.length-o.id.length)[0];if(i)return{cup:i,matchedBy:"sku"};let r=JM.find(o=>o.test.test(e));return r?{cup:ki(r.id),matchedBy:"pattern"}:(console.warn(`\u041A\u0430\u0442\u0430\u043B\u043E\u0433: \u043D\u043E\u043C\u0435\u043D\u043A\u043B\u0430\u0442\u0443\u0440\u0430 "${e}" \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430 \u2014 \u0433\u0440\u0443\u0437\u0438\u043C \u043C\u043E\u0434\u0435\u043B\u044C \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E.`),{cup:ki(sp),matchedBy:"fallback"})}function cp(){let s=new Map;for(let e of cs){let t=e.group??"";s.has(t)||s.set(t,[]),s.get(t).push(e)}return[...s].map(([e,t])=>({group:e,cups:t}))}var lp={width:297,height:210},hp=1024,La=null;function ls(){if(La)return La;let s=document.createElement("canvas");s.width=hp,s.height=Math.round(hp*lp.height/lp.width);let e=s.getContext("2d");return e.fillStyle="#ffffff",e.fillRect(0,0,s.width,s.height),La=s.toDataURL("image/png"),La}var tS=(()=>{let s=new Uint32Array(256);for(let e=0;e<256;e+=1){let t=e;for(let n=0;n<8;n+=1)t=t&1?3988292384^t>>>1:t>>>1;s[e]=t>>>0}return s})();function nS(s){let e=4294967295;for(let t=0;t<s.length;t+=1)e=tS[(e^s[t])&255]^e>>>8;return(e^4294967295)>>>0}function iS(s){let e=Math.max(s.getFullYear(),1980);return{time:s.getHours()<<11|s.getMinutes()<<5|s.getSeconds()>>1,date:e-1980<<9|s.getMonth()+1<<5|s.getDate()}}function sS(s){return s.replace(/[^\x20-\x7e]/g,"_")}function up(s){let e=new TextEncoder,t=iS(new Date),n=s.map(l=>({name:e.encode(sS(l.name)),data:l.data,crc:nS(l.data)})),i=[],r=[],o=0;for(let l of n){let h=new DataView(new ArrayBuffer(30));h.setUint32(0,67324752,!0),h.setUint16(4,20,!0),h.setUint16(6,0,!0),h.setUint16(8,0,!0),h.setUint16(10,t.time,!0),h.setUint16(12,t.date,!0),h.setUint32(14,l.crc,!0),h.setUint32(18,l.data.length,!0),h.setUint32(22,l.data.length,!0),h.setUint16(26,l.name.length,!0),h.setUint16(28,0,!0),i.push(h.buffer,l.name,l.data);let u=new DataView(new ArrayBuffer(46));u.setUint32(0,33639248,!0),u.setUint16(4,20,!0),u.setUint16(6,20,!0),u.setUint16(8,0,!0),u.setUint16(10,0,!0),u.setUint16(12,t.time,!0),u.setUint16(14,t.date,!0),u.setUint32(16,l.crc,!0),u.setUint32(20,l.data.length,!0),u.setUint32(24,l.data.length,!0),u.setUint16(28,l.name.length,!0),u.setUint16(30,0,!0),u.setUint16(32,0,!0),u.setUint16(34,0,!0),u.setUint16(36,0,!0),u.setUint32(38,0,!0),u.setUint32(42,o,!0),r.push(u.buffer,l.name),o+=30+l.name.length+l.data.length}let a=r.reduce((l,h)=>l+h.byteLength,0),c=new DataView(new ArrayBuffer(22));return c.setUint32(0,101010256,!0),c.setUint16(4,0,!0),c.setUint16(6,0,!0),c.setUint16(8,n.length,!0),c.setUint16(10,n.length,!0),c.setUint32(12,a,!0),c.setUint32(16,o,!0),c.setUint16(20,0,!0),new Blob([...i,...r,c.buffer],{type:"application/zip"})}function Ql(s,e){if(e===Qd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Ur||e===la){let t=s.getIndex();if(t===null){let o=[],a=s.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===Ur)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var Da=class extends Un{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new oh(t)}),this.register(function(t){return new mh(t)}),this.register(function(t){return new gh(t)}),this.register(function(t){return new vh(t)}),this.register(function(t){return new ch(t)}),this.register(function(t){return new lh(t)}),this.register(function(t){return new hh(t)}),this.register(function(t){return new uh(t)}),this.register(function(t){return new rh(t)}),this.register(function(t){return new dh(t)}),this.register(function(t){return new ah(t)}),this.register(function(t){return new ph(t)}),this.register(function(t){return new fh(t)}),this.register(function(t){return new ih(t)}),this.register(function(t){return new _h(t)}),this.register(function(t){return new xh(t)})}load(e,t,n,i){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Ni.extractUrlBase(e);o=Ni.resolveURL(l,this.path)}else o=Ni.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new gi(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===gp){try{o[at.KHR_BINARY_GLTF]=new yh(e)}catch(u){i&&i(u);return}r=JSON.parse(o[at.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Ah(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case at.KHR_MATERIALS_UNLIT:o[u]=new sh;break;case at.KHR_DRACO_MESH_COMPRESSION:o[u]=new Mh(r,this.dracoLoader);break;case at.KHR_TEXTURE_TRANSFORM:o[u]=new Sh;break;case at.KHR_MESH_QUANTIZATION:o[u]=new Eh;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function rS(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}var at={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},ih=class{constructor(e){this.parser=e,this.name=at.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Ce(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Tt);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new qs(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ia(h),l.distance=u;break;case"spot":l=new na(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Vi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},sh=class{constructor(){this.name=at.KHR_MATERIALS_UNLIT}getMaterialType(){return zt}extendParams(e,t,n){let i=[];e.color=new Ce(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Tt),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,mt))}return Promise.all(i)}},rh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},oh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Pe(a,a)}return Promise.all(r)}},ah=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},ch=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Ce(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Tt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,mt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},lh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},hh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ce().setRGB(a[0],a[1],a[2],Tt),Promise.all(r)}},uh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},dh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ce().setRGB(a[0],a[1],a[2],Tt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,mt)),Promise.all(r)}},fh=class{constructor(e){this.parser=e,this.name=at.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},ph=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},mh=class{constructor(e){this.parser=e,this.name=at.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},gh=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},vh=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},_h=class{constructor(e){this.name=at.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(p){return p.buffer}):o.ready.then(function(){let p=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(p),h,u,d,i.mode,i.filter),p})})}else return null}},xh=class{constructor(e){this.name=at.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==On.TRIANGLES&&l.mode!==On.TRIANGLE_STRIP&&l.mode!==On.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,p=[];for(let g of u){let _=new $e,m=new B,f=new _n,S=new B(1,1,1),y=new ns(g.geometry,g.material,d);for(let R=0;R<d;R++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,R),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,R),c.SCALE&&S.fromBufferAttribute(c.SCALE,R),y.setMatrixAt(R,_.compose(m,f,S));for(let R in c)if(R==="_COLOR_0"){let F=c[R];y.instanceColor=new ts(F.array,F.itemSize,F.normalized)}else R!=="TRANSLATION"&&R!=="ROTATION"&&R!=="SCALE"&&g.geometry.setAttribute(R,c[R]);Ut.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),p.push(y)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},gp="glTF",qr=12,dp={JSON:1313821514,BIN:5130562},yh=class{constructor(e){this.name=at.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,qr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==gp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-qr,r=new DataView(e,qr),o=0;for(;o<i;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===dp.JSON){let l=new Uint8Array(e,qr+o,a);this.content=n.decode(l)}else if(c===dp.BIN){let l=qr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Mh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=at.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=wh[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=wh[h]||h.toLowerCase();if(o[h]!==void 0){let d=n.accessors[e.attributes[h]],p=Qs[d.componentType];l[u]=p.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(p){for(let g in p.attributes){let _=p.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(p)},a,l,Tt,d)})})}},Sh=class{constructor(){this.name=at.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Eh=class{constructor(){this.name=at.KHR_MESH_QUANTIZATION}},Ua=class extends Ii{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-t,u=(n-t)/h,d=u*u,p=d*u,g=e*l,_=g-l,m=-2*p+3*d,f=p-d,S=1-m,y=f-d+u;for(let R=0;R!==a;R++){let F=o[_+R+a],I=o[_+R+c]*h,P=o[g+R+a],k=o[g+R]*h;r[R]=S*F+y*I+m*P+f*k}return r}},oS=new _n,bh=class extends Ua{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return oS.fromArray(r).normalize().toArray(r),r}},On={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Qs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},fp={9728:It,9729:wt,9984:Po,9985:gl,9986:dr,9987:Gn},pp={33071:Ot,33648:vr,10497:Gt},eh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},wh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Hi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},aS={CUBICSPLINE:void 0,LINEAR:es,STEP:Fs},th={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function cS(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Ws({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Pn})),s.DefaultMaterial}function hs(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Vi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function lS(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],d=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function hS(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function uS(s){let e,t=s.extensions&&s.extensions[at.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+nh(t.attributes):e=s.indices+":"+nh(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+nh(s.targets[n]);return e}function nh(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Th(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function dS(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var fS=new $e,Ah=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new rS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&r<98?this.textureLoader=new Ui(this.options.manager):this.textureLoader=new sa(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new gi(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return hs(r,a,i),Vi(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[at.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,o){n.load(Ni.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=eh[i.type],a=Qs[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new Lt(l,o,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=eh[i.type],l=Qs[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,_,m;if(p&&p!==u){let f=Math.floor(d/p),S="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+f+":"+i.count,y=t.cache.get(S);y||(_=new l(a,f*p,i.count*p/h),y=new br(_,p/h),t.cache.add(S,y)),m=new wr(y,c,d%p/h,g)}else a===null?_=new l(i.count*c):_=new l(a,d,i.count*c),m=new Lt(_,c,g);if(i.sparse!==void 0){let f=eh.SCALAR,S=Qs[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,R=i.sparse.values.byteOffset||0,F=new S(o[1],y,i.sparse.count*f),I=new l(o[2],R,i.sparse.count*c);a!==null&&(m=new Lt(m.array.slice(),m.itemSize,m.normalized));for(let P=0,k=F.length;P<k;P++){let M=F[P];if(m.setX(M,I[P*c]),c>=2&&m.setY(M,I[P*c+1]),c>=3&&m.setZ(M,I[P*c+2]),c>=4&&m.setW(M,I[P*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let i=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let d=(r.samplers||{})[o.sampler]||{};return h.magFilter=fp[d.magFilter]||wt,h.minFilter=fp[d.minFilter]||Gn,h.wrapS=pp[d.wrapS]||Gt,h.wrapT=pp[d.wrapT]||Gt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=i.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){let m=new Wt(_);m.needsUpdate=!0,d(m)}),t.load(Ni.resolveURL(u,r.path),g,void 0,p)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),u.userData.mimeType=o.mimeType||dS(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[at.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[at.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[at.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Rr,vn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Ar,vn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Ws}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[at.KHR_MATERIALS_UNLIT]){let u=i[at.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new Ce(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Tt),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,mt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=bn);let h=r.alphaMode||th.OPAQUE;if(h===th.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===th.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==zt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Pe(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==zt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==zt){let u=r.emissiveFactor;a.emissive=new Ce().setRGB(u[0],u[1],u[2],Tt)}return r.emissiveTexture!==void 0&&o!==zt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,mt)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),Vi(u,r),t.associations.set(u,{materials:e}),r.extensions&&hs(i,u,r),u})}createUniqueName(e){let t=bt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[at.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return mp(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=uS(l),u=i[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[at.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=mp(new qt,l,t),i[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?cS(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let p=0,g=h.length;p<g;p++){let _=h[p],m=o[p],f,S=l[p];if(m.mode===On.TRIANGLES||m.mode===On.TRIANGLE_STRIP||m.mode===On.TRIANGLE_FAN||m.mode===void 0)f=r.isSkinnedMesh===!0?new Wo(_,S):new lt(_,S),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===On.TRIANGLE_STRIP?f.geometry=Ql(f.geometry,la):m.mode===On.TRIANGLE_FAN&&(f.geometry=Ql(f.geometry,Ur));else if(m.mode===On.LINES)f=new qo(_,S);else if(m.mode===On.LINE_STRIP)f=new Vs(_,S);else if(m.mode===On.LINE_LOOP)f=new Yo(_,S);else if(m.mode===On.POINTS)f=new Zo(_,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&hS(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),Vi(f,r),m.extensions&&hs(i,f,m),t.assignFinalMaterial(f),u.push(f)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return r.extensions&&hs(i,u[0],r),u[0];let d=new Ht;r.extensions&&hs(i,d,r),t.associations.set(d,{meshes:e});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new kt(rn.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Jn(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Vi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let d=new $e;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Xo(a,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let p=i.channels[u],g=i.samplers[p.sampler],_=p.target,m=_.node,f=i.parameters!==void 0?i.parameters[g.input]:g.input,S=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),c.push(this.getDependency("accessor",S)),l.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],p=u[1],g=u[2],_=u[3],m=u[4],f=[];for(let S=0,y=d.length;S<y;S++){let R=d[S],F=p[S],I=g[S],P=_[S],k=m[S];if(R===void 0)continue;R.updateMatrix&&R.updateMatrix();let M=n._createAnimationTracks(R,F,I,P,k);if(M)for(let w=0;w<M.length;w++)f.push(M[w])}return new ta(r,void 0,f)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,fS)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Tr:l.length>1?h=new Ht:l.length===1?h=l[0]:h=new Ut,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Vi(h,r),r.extensions&&hs(n,h,r),r.matrix!==void 0){let u=new $e;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Ht;n.name&&(r.name=i.createUniqueName(n.name)),Vi(r,n),n.extensions&&hs(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[d,p]of i.associations)(d instanceof vn||d instanceof Wt)&&u.set(d,p);return h.traverse(d=>{let p=i.associations.get(d);p!=null&&u.set(d,p)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let o=[],a=e.name?e.name:e.uuid,c=[];Hi[r.path]===Hi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(Hi[r.path]){case Hi.weights:l=pi;break;case Hi.rotation:l=ei;break;case Hi.position:case Hi.scale:l=mi;break;default:switch(n.itemSize){case 1:l=pi;break;case 2:case 3:default:l=mi;break}break}let h=i.interpolation!==void 0?aS[i.interpolation]:es,u=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){let g=new l(c[d]+"."+Hi[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Th(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof ei?bh:Ua;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function pS(s,e,t){let n=e.attributes,i=new sn;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new B(c[0],c[1],c[2]),new B(l[0],l[1],l[2])),a.normalized){let h=Th(Qs[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new B,c=new B;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){let _=Th(Qs[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;let o=new wn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function mp(s,e,t){let n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){s.setAttribute(a,c)})}for(let o in n){let a=wh[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){let o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return dt.workingColorSpace!==Tt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${dt.workingColorSpace}" not supported.`),Vi(s,e),pS(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?lS(s,e.targets,t):s})}var Rh=new WeakMap,Na=class extends Un{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){let r=new gi(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,o=>{this.parse(o,t,i)},n,i)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,mt).catch(n)}decodeDracoFile(e,t,n,i,r=Tt,o=()=>{}){let a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:r};return this.decodeGeometry(e,a).then(t).catch(o)}decodeGeometry(e,t){let n=JSON.stringify(t);if(Rh.has(e)){let c=Rh.get(e);if(c.key===n)return c.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i,r=this.workerNextTaskID++,o=e.byteLength,a=this._getWorker(r,o).then(c=>(i=c,new Promise((l,h)=>{i._callbacks[r]={resolve:l,reject:h},i.postMessage({type:"decode",id:r,taskConfig:t,buffer:e},[e])}))).then(c=>this._createGeometry(c.geometry));return a.catch(()=>!0).then(()=>{i&&r&&this._releaseTask(i,r)}),Rh.set(e,{key:n,promise:a}),a}_createGeometry(e){let t=new qt;e.index&&t.setIndex(new Lt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){let i=e.attributes[n],r=i.name,o=i.array,a=i.itemSize,c=new Lt(o,a);r==="color"&&(this._assignVertexColorSpace(c,i.vertexColorSpace),c.normalized=!(o instanceof Float32Array)),t.setAttribute(r,c)}return t}_assignVertexColorSpace(e,t){if(t!==mt)return;let n=new Ce;for(let i=0,r=e.count;i<r;i++)n.fromBufferAttribute(e,i).convertSRGBToLinear(),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){let n=new gi(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,r)=>{n.load(e,i,void 0,r)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{let i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);let r=mS.toString(),o=["/* draco decoder */",i,"","/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([o]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(r){let o=r.data;switch(o.type){case"decode":i._callbacks[o.id].resolve(o);break;case"error":i._callbacks[o.id].reject(o);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+o.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,r){return i._taskLoad>r._taskLoad?-1:1});let n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}};function mS(){let s,e;onmessage=function(o){let a=o.data;switch(a.type){case"init":s=a.decoderConfig,e=new Promise(function(h){s.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(s)});break;case"decode":let c=a.buffer,l=a.taskConfig;e.then(h=>{let u=h.draco,d=new u.Decoder;try{let p=t(u,d,new Int8Array(c),l),g=p.attributes.map(_=>_.array.buffer);p.index&&g.push(p.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:p},g)}catch(p){console.error(p),self.postMessage({type:"error",id:a.id,error:p.message})}finally{u.destroy(d)}});break}};function t(o,a,c,l){let h=l.attributeIDs,u=l.attributeTypes,d,p,g=a.GetEncodedGeometryType(c);if(g===o.TRIANGULAR_MESH)d=new o.Mesh,p=a.DecodeArrayToMesh(c,c.byteLength,d);else if(g===o.POINT_CLOUD)d=new o.PointCloud,p=a.DecodeArrayToPointCloud(c,c.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!p.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+p.error_msg());let _={index:null,attributes:[]};for(let m in h){let f=self[u[m]],S,y;if(l.useUniqueIDs)y=h[m],S=a.GetAttributeByUniqueId(d,y);else{if(y=a.GetAttributeId(d,o[h[m]]),y===-1)continue;S=a.GetAttribute(d,y)}let R=i(o,a,d,m,f,S);m==="color"&&(R.vertexColorSpace=l.vertexColorSpace),_.attributes.push(R)}return g===o.TRIANGULAR_MESH&&(_.index=n(o,a,d)),o.destroy(d),_}function n(o,a,c){let h=c.num_faces()*3,u=h*4,d=o._malloc(u);a.GetTrianglesUInt32Array(c,u,d);let p=new Uint32Array(o.HEAPF32.buffer,d,h).slice();return o._free(d),{array:p,itemSize:1}}function i(o,a,c,l,h,u){let d=u.num_components(),g=c.num_points()*d,_=g*h.BYTES_PER_ELEMENT,m=r(o,h),f=o._malloc(_);a.GetAttributeDataArrayForAllPoints(c,u,m,_,f);let S=new h(o.HEAPF32.buffer,f,g).slice();return o._free(f),{name:l,array:S,itemSize:d}}function r(o,a){switch(a){case Float32Array:return o.DT_FLOAT32;case Int8Array:return o.DT_INT8;case Int16Array:return o.DT_INT16;case Int32Array:return o.DT_INT32;case Uint8Array:return o.DT_UINT8;case Uint16Array:return o.DT_UINT16;case Uint32Array:return o.DT_UINT32}}}function vp(s){s.traverse(e=>{if(e.geometry&&e.geometry.dispose(),!e.material)return;let t=Array.isArray(e.material)?e.material:[e.material];for(let n of t)gS(n)})}function gS(s){for(let e of Object.values(s))e&&e.isTexture&&e.dispose();s.dispose()}function Ch(s){let e=new sn().setFromObject(s);return{box:e,center:e.getCenter(new B),size:e.getSize(new B)}}function _p(s,e,t,n=1.3){let i=t.getCenter(new B),r=t.getSize(new B),a=Math.max(r.x,r.y,r.z)/(2*Math.tan(Math.PI*s.fov/360)),c=Number.isFinite(s.aspect)&&s.aspect>0?s.aspect:1,l=a/c,h=n*Math.max(a,l),u=Number.isFinite(h)&&h>0?h:1,d=s.position.clone().sub(e.target).normalize();e.target.copy(i),s.position.copy(i).addScaledVector(d,u),s.near=u/20,s.far=u*20,s.updateProjectionMatrix(),e.update()}var Ph=512,yp=6;function vS(s,e){let t=new Float32Array(s*e),n=[{cells:32,weight:.4},{cells:96,weight:.35},{cells:192,weight:.25}];for(let{cells:i,weight:r}of n){let o=new Float32Array((i+1)*(i+1));for(let c=0;c<o.length;c++)o[c]=Math.random();let a=c=>c*c*(3-2*c);for(let c=0;c<e;c++)for(let l=0;l<s;l++){let h=l/s*i,u=c/e*i,d=Math.floor(h),p=Math.floor(u),g=a(h-d),_=a(u-p),m=F=>F%i,f=F=>F%i,S=(F,I)=>o[f(I)*(i+1)+m(F)],y=S(d,p)*(1-g)+S(d+1,p)*g,R=S(d,p+1)*(1-g)+S(d+1,p+1)*g;t[c*s+l]+=(y*(1-_)+R*_)*r}}return t}function _S(s,e){let t=document.createElement("canvas");t.width=e,t.height=e;let n=t.getContext("2d"),i=n.createImageData(e,e),r=(a,c)=>s[(c+e)%e*e+(a+e)%e],o=1.4;for(let a=0;a<e;a++)for(let c=0;c<e;c++){let l=(r(c+1,a)-r(c-1,a))*o,h=(r(c,a+1)-r(c,a-1))*o,u=Math.hypot(l,h,1),d=(a*e+c)*4;i.data[d]=(-l/u*.5+.5)*255,i.data[d+1]=(-h/u*.5+.5)*255,i.data[d+2]=1/u*.5*255+127.5,i.data[d+3]=255}return n.putImageData(i,0,0),t}var Ih=null,xp=new Map;function xS(s=yp){let e=Math.round(s*100)/100,t=xp.get(e);if(t)return t;Ih||(Ih=vS(Ph,Ph));let n=new Ko(_S(Ih,Ph));return n.wrapS=Gt,n.wrapT=Gt,n.repeat.set(e,e),n.colorSpace=un,n.anisotropy=4,xp.set(e,n),n}function Mp(s,e,t=yp,n=1){var r;if(!("normalScale"in s))return!1;let i=(r=s.userData)==null?void 0:r.sourceNormalMap;return i?(s.normalMap=i,s.normalScale.set(n,n),s.needsUpdate=!0,!0):e?(s.normalMap=xS(t),s.normalScale=new Pe(e,e),s.needsUpdate=!0,!0):(s.normalMap=null,s.needsUpdate=!0,!0)}var yS=1,MS=2,xn,Sp,Ep,bp,wp,Tp,Ap,Oa=class{constructor({scene:e,camera:t,controls:n,config:i,maxAnisotropy:r=1}){an(this,xn);this.scene=e,this.camera=t,this.controls=n,this.config=i,this.maxAnisotropy=r,this.loader=new Da,this.draco=new Na,this.draco.setDecoderPath(i.assets.dracoDecoder),this.loader.setDRACOLoader(this.draco),this.currentModel=null,this.cup=null,this.print=Ia,this.printMaterials=[],this.wallOpacity=1}load(e,t,n=null){return new Promise((i,r)=>{this.loader.load(e,o=>i(V(this,xn,Sp).call(this,o.scene,n)),o=>t==null?void 0:t(o.total>0?o.loaded/o.total*100:-1),o=>r(new Error(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u044C "${e}": ${o.message??o}`)))})}applySurfaceFinish(e=Pa()){var i;let t=((i=this.cup)==null?void 0:i.finish)??"paper";if(t==="own")return 0;if(t==="plastic")return V(this,xn,Ep).call(this);if(!e)return 0;this.wallOpacity=1;let n=0;for(let r of this.printMaterials)"roughness"in r&&(e.roughness!=null&&(r.roughness=e.roughness),e.metalness!=null&&(r.metalness=e.metalness),e.relief!=null&&Mp(r,e.relief,e.reliefScale,e.normalScale??1),r.needsUpdate=!0,n++);return n}frameCurrentModel(){this.currentModel&&_p(this.camera,this.controls,Ch(this.currentModel).box,this.config.model.cameraFitOffset)}normalize(e=this.currentModel){if(!e||!this.sourceSize)return;let{x:t,y:n,z:i}=this.sourceSize,r=Math.max(t,n,i);e.scale.setScalar(r>0?this.config.model.targetSize/r:1),e.position.set(0,0,0)}setNaturalHeight(e,t=[0,0,0]){let n=this.currentModel;if(!n||!this.sourceSize||!(this.sourceSize.y>0))return 0;let i=e/this.sourceSize.y;return n.scale.setScalar(i),n.position.set(t[0],t[1]+this.sourceSize.y*i/2,t[2]),i}dispose(){this.currentModel&&(this.scene.remove(this.currentModel),vp(this.currentModel),this.currentModel=null,this.sourceSize=null,this.cup=null,this.print=Ia,this.printMaterials=[],this.wallOpacity=1)}destroy(){this.dispose(),this.draco.dispose()}};xn=new WeakSet,Sp=function(e,t){var i;this.dispose(),this.cup=t,this.print=(t==null?void 0:t.print)??Ia,V(this,xn,Tp).call(this,e),((i=this.cup)==null?void 0:i.finish)==="plastic"&&V(this,xn,bp).call(this,e);let n=V(this,xn,wp).call(this,e);return this.scene.add(n),this.currentModel=n,this.applySurfaceFinish(),this.frameCurrentModel(),n},Ep=function(){let e=0;for(let t of this.printMaterials)"roughness"in t&&(t.color.set(ni.color),t.roughness=ni.roughness,t.metalness=ni.metalness,"transmission"in t&&(t.transmission=0,t.thickness=0,t.clearcoat=ni.clearcoat,t.clearcoatRoughness=ni.clearcoatRoughness,t.sheen=ni.sheen,t.sheenRoughness=ni.sheenRoughness,t.sheenColor.set(ni.color)),t.transparent=!0,t.opacity=1,t.depthWrite=!0,t.side=t.userData.backSide?dn:Pn,t.needsUpdate=!0,e++);return this.wallOpacity=ni.opacity,e},bp=function(e){let t=[];e.traverse(n=>{if(!n.isMesh)return;(Array.isArray(n.material)?n.material:[n.material]).some(r=>this.printMaterials.includes(r))&&t.push(n)});for(let n of t){let r=(Array.isArray(n.material)?n.material[0]:n.material).clone();r.userData.backSide=!0;let o=new lt(n.geometry,r);o.name=`${n.name}__back`,o.castShadow=!1,o.receiveShadow=!0,o.renderOrder=yS,n.renderOrder=MS,n.parent.add(o),this.printMaterials.push(r)}},wp=function(e){let{center:t,size:n}=Ch(e);e.position.sub(t);let i=new Ht;return i.name="ModelPivot",i.add(e),this.sourceSize=n.clone(),this.normalize(i),i},Tp=function(e){this.printMaterials=[];let t=new Set(this.print.materials??[]),n=new Set;e.traverse(i=>{if(!i.isMesh)return;i.castShadow=!0,i.receiveShadow=!0;let r=Array.isArray(i.material)?i.material:[i.material];for(let o of r){if(!o||n.has(o))continue;n.add(o),V(this,xn,Ap).call(this,o),o.userData.sourceNormalMap===void 0&&(o.userData.sourceNormalMap=o.normalMap??null),(t.size>0?t.has(o.name):!!o.map)&&this.printMaterials.push(o)}}),t.size>0&&this.printMaterials.length===0&&console.warn(`\u041A\u0430\u0442\u0430\u043B\u043E\u0433: \u0432 \u043C\u043E\u0434\u0435\u043B\u0438 \u043D\u0435\u0442 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \xAB${[...t].join("\xBB, \xAB")}\xBB \u2014 \u043C\u0430\u043A\u0435\u0442 \u043A\u043B\u0430\u0441\u0442\u044C \u043D\u0435\u043A\u0443\u0434\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 print.materials \u0432 js/data/models.js.`)},Ap=function(e){for(let t of Object.values(e))t!=null&&t.isTexture&&(t.anisotropy=this.maxAnisotropy,t.needsUpdate=!0)};var us=.1,Rp=64,Kt,Cp,Pp,Ip,Fa,Lp,Dp,Lh,Ba=class{constructor({modelLoader:e,config:t,maxAnisotropy:n=1,maxTextureSize:i=4096}){an(this,Kt);var r;this.modelLoader=e,this.config=t,this.maxAnisotropy=n,this.maxSize=Math.min(((r=t.texture)==null?void 0:r.maxSize)??2048,i),this.loader=new Ui,this.ownedTextures=new Set}async loadTexture(e){var a;let t=((a=this.modelLoader.print)==null?void 0:a.sheet)===!0,n=t?Math.round(this.maxSize*(1-2*us)):this.maxSize,r=t&&e===ls()?null:await V(this,Kt,Pp).call(this,e,n),o=new Wt(t?V(this,Kt,Cp).call(this,r):r);return o.needsUpdate=!0,V(this,Kt,Lp).call(this,o)}async loadFromFile(e){if(!e.type.startsWith("image/"))throw new Error(`"${e.name}" \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435\u043C`);let t=URL.createObjectURL(e);try{return await this.loadTexture(t)}finally{URL.revokeObjectURL(t)}}applyTexture(e){let t=this.modelLoader.printMaterials;if(t.length===0)return 0;let n=0;for(let i of t)i.map!==e&&(V(this,Kt,Dp).call(this,i.map),i.map=e,i.needsUpdate=!0),n++;return n}async replaceTexture(e){return this.applyTexture(await this.loadTexture(e))}dispose(){for(let e of this.ownedTextures)V(this,Kt,Lh).call(this,e);this.ownedTextures.clear()}};Kt=new WeakSet,Cp=function(e){var c;let t=this.modelLoader.wallOpacity??1,n=1-2*us,i=e?e.naturalWidth??e.width:Rp,r=e?e.naturalHeight??e.height:Rp,o=document.createElement("canvas");o.width=Math.round(i/n),o.height=Math.round(r/n);let a=o.getContext("2d");return a.fillStyle=`rgba(255, 255, 255, ${t})`,a.fillRect(0,0,o.width,o.height),e&&(a.drawImage(e,Math.round(o.width*us),Math.round(o.height*us),i,r),(c=e.close)==null||c.call(e)),o},Pp=async function(e,t){if(e.startsWith("data:"))return V(this,Kt,Fa).call(this,e);if(typeof createImageBitmap!="function")return V(this,Kt,Fa).call(this,e);try{let n=await fetch(e,{credentials:"same-origin"});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.blob(),r=await createImageBitmap(i),o=Math.max(r.width,r.height);if(o<=t)return r;let a=t/o,c=Math.max(1,Math.round(r.width*a)),l=Math.max(1,Math.round(r.height*a)),h=await createImageBitmap(i,{resizeWidth:c,resizeHeight:l,resizeQuality:"high"});if(r.close(),r=h,Math.max(r.width,r.height)>t){let u=V(this,Kt,Ip).call(this,r,c,l);r.close(),r=u}return console.info(`\u041C\u0430\u043A\u0435\u0442 \u0443\u043C\u0435\u043D\u044C\u0448\u0435\u043D \u0434\u043E ${r.width}\xD7${r.height} \u0434\u043B\u044F 3D (\u043F\u0440\u0435\u0434\u0435\u043B ${t}px). \u041A\u0440\u0443\u043F\u043D\u044B\u0439 \u0438\u0441\u0445\u043E\u0434\u043D\u0438\u043A \u0434\u043B\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043C\u0435\u043B\u043A\u043E\u0433\u043E \u0442\u0435\u043A\u0441\u0442\u0430 \u043F\u0435\u0440\u0435\u0434\u0430\u0451\u0442\u0441\u044F \u043F\u043E\u043B\u0435\u043C "unwrap".`),r}catch(n){return console.warn(`\u0411\u044B\u0441\u0442\u0440\u043E\u0435 \u0434\u0435\u043A\u043E\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043C\u0430\u043A\u0435\u0442\u0430 \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C (${n.message}), \u0433\u0440\u0443\u0437\u0438\u043C \u0447\u0435\u0440\u0435\u0437 <img>.`),V(this,Kt,Fa).call(this,e)}},Ip=function(e,t,n){let i=document.createElement("canvas");i.width=t,i.height=n;let r=i.getContext("2d");return r.imageSmoothingEnabled=!0,r.imageSmoothingQuality="high",r.drawImage(e,0,0,t,n),i},Fa=function(e){return new Promise((t,n)=>{this.loader.load(e,i=>{let r=i.image;i.dispose(),t(r)},void 0,()=>n(new Error(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0442\u0435\u043A\u0441\u0442\u0443\u0440\u0443 "${e}"`)))})},Lp=function(e){let t=this.modelLoader.print??{};if(e.colorSpace=mt,e.channel=t.uv??0,t.sheet){let n=1-2*us;e.wrapS=Ot,e.wrapT=Ot,e.repeat.set(n,n),e.offset.set(us,us)}else e.wrapS=Gt,e.wrapT=Gt;return e.flipY=!1,e.anisotropy=this.maxAnisotropy,e.generateMipmaps=!0,e.minFilter=Gn,e.magFilter=wt,this.ownedTextures.add(e),e},Dp=function(e){this.ownedTextures.has(e)&&(V(this,Kt,Lh).call(this,e),this.ownedTextures.delete(e))},Lh=function(e){e.dispose();let t=e.image;t&&typeof t.close=="function"&&t.close()};var on={width:96,height:104,padding:6},Up=.17,SS=1.1,ES="http://www.w3.org/2000/svg",Np=s=>String(s??"").toLowerCase().replace(/ё/g,"\u0435");function bS(){let s=Math.max(...cs.map(e=>{var t;return((t=e.size)==null?void 0:t.height)??0}),1);return(on.height-on.padding*2)/(s*SS)}function yn(s,e){let t=document.createElementNS(ES,s);for(let[n,i]of Object.entries(e))t.setAttribute(n,i);return t}function wS(s,e){let t=yn("svg",{class:`cup-card__art cup-card__art--${s.wall??"single"}`,viewBox:`0 0 ${on.width} ${on.height}`,"aria-hidden":"true"}),n=s.size;if(!n)return t;let i=n.height*e,r=n.top/2*e,o=n.bottom/2*e,a=on.width/2,c=on.height-on.padding,l=c-i,h=r*Up,u=o*Up,d=`M${a-r} ${l} L${a-o} ${c} A${o} ${u} 0 0 0 ${a+o} ${c} L${a+r} ${l} Z`;t.append(yn("line",{class:"cup-card__floor",x1:on.padding,y1:c+u,x2:on.width-on.padding,y2:c+u}),yn("ellipse",{class:"cup-card__shadow",cx:a,cy:c+u*.5,rx:o*1.25,ry:u*1.1}),yn("path",{class:"cup-card__body",d}));let p=`cup-clip-${s.id}`,g=yn("defs",{}),_=yn("clipPath",{id:p});_.appendChild(yn("path",{d})),g.appendChild(_),t.appendChild(g);let m=yn("g",{"clip-path":`url(#${p})`});if(s.wall==="double"){let f=l+i*.03,S=c-i*.11;m.append(yn("path",{class:"cup-card__sleeve",d:`M${a-r} ${f} L${a-o} ${S} L${a+o} ${S} L${a+r} ${f} Z`}),yn("line",{class:"cup-card__seam",x1:a-o,y1:S,x2:a+o,y2:S}))}if(s.wall==="embossed"){let S=yn("g",{class:"cup-card__emboss"});for(let y=-on.height;y<on.width+on.height;y+=7)S.append(yn("line",{x1:y,y1:0,x2:y+on.height,y2:on.height}),yn("line",{x1:y,y1:on.height,x2:y+on.height,y2:0}));m.appendChild(S)}return t.appendChild(m),t.appendChild(yn("ellipse",{class:"cup-card__rim",cx:a,cy:l,rx:r,ry:h})),t}var ft,Op,Dh,Uh,Fp,er,Bp,zp,kp,Nh,Oh,Fh,za=class{constructor(e,{backdrop:t,onSelect:n,onToggle:i}={}){an(this,ft);this.root=e,this.backdrop=t??null,this.onSelect=n??null,this.onToggle=i??null,this.search=e.querySelector(".cup-search"),this.filters=e.querySelector(".cup-filters"),this.list=e.querySelector(".cup-list"),this.empty=e.querySelector(".cup-empty"),this.closeButton=e.querySelector(".cup-dialog__close"),this.opener=null,this.cards=[],this.sections=[],this.filterButtons=[],this.activeId=null,this.group="",V(this,ft,Op).call(this),V(this,ft,Fp).call(this)}get isOpen(){return this.root.hidden===!1}setActive(e){this.activeId=e??null;for(let{cup:t,card:n}of this.cards){let i=t.id===e;n.classList.toggle("is-active",i),n.setAttribute("aria-pressed",String(i))}}open(e=null){var n,i;if(this.isOpen)return;this.opener=e,this.root.hidden=!1,this.backdrop&&(this.backdrop.hidden=!1),this.search&&(this.search.value=""),V(this,ft,Uh).call(this,"");let t=this.cards.find(({cup:r})=>r.id===this.activeId);window.matchMedia("(hover: hover) and (pointer: fine)").matches&&((n=this.search)==null||n.focus()),t==null||t.card.scrollIntoView({block:"nearest"}),(i=this.onToggle)==null||i.call(this,!0)}close(){var e,t;this.isOpen&&(this.root.hidden=!0,this.backdrop&&(this.backdrop.hidden=!0),(e=this.opener)==null||e.focus(),this.opener=null,(t=this.onToggle)==null||t.call(this,!1))}toggle(e=null){this.isOpen?this.close():this.open(e)}};ft=new WeakSet,Op=function(){var n,i;let e=bS();this.list.replaceChildren(),(n=this.filters)==null||n.replaceChildren();let t=cp();if(this.filters){V(this,ft,Dh).call(this,"","\u0412\u0441\u0435",cs.length);for(let{group:r,cups:o}of t)V(this,ft,Dh).call(this,r,r,o.length)}for(let{group:r,cups:o}of t){let a=document.createElement("section");if(a.className="cup-group",r){let h=document.createElement("h3");h.className="cup-group__title",h.textContent=r,a.appendChild(h)}let c=document.createElement("div");c.className="cup-grid";let l=[];for(let h of o){let u=document.createElement("button");u.type="button",u.className="cup-card",u.dataset.id=h.id,u.setAttribute("aria-pressed","false"),u.tabIndex=-1;let d=document.createElement("span");d.className="cup-card__name",d.textContent=h.label??h.id;let p=document.createElement("span");p.className="cup-card__meta";let g=document.createElement("b");g.className="cup-card__volume",g.textContent=h.volume?`${h.volume} \u043C\u043B`:"",p.appendChild(g),(i=h.size)!=null&&i.height&&p.append(document.createTextNode(` \xB7 ${Math.round(h.size.height)} \u043C\u043C`)),u.append(wS(h,e),d,p),u.addEventListener("click",()=>V(this,ft,Oh).call(this,h.id)),c.appendChild(u),l.push(u),this.cards.push({cup:h,card:u,grid:c})}a.appendChild(c),this.list.appendChild(a),this.sections.push({section:a,group:r,cards:l})}},Dh=function(e,t,n){let i=document.createElement("button");i.type="button",i.className="cup-filter",i.dataset.group=e,i.setAttribute("aria-pressed",String(e===this.group)),i.classList.toggle("is-active",e===this.group);let r=document.createElement("span");r.textContent=t;let o=document.createElement("span");o.className="cup-filter__count",o.textContent=String(n),i.append(r,o),i.addEventListener("click",()=>V(this,ft,Uh).call(this,e)),this.filters.appendChild(i),this.filterButtons.push(i)},Uh=function(e){var t;this.group=e;for(let n of this.filterButtons){let i=n.dataset.group===e;n.classList.toggle("is-active",i),n.setAttribute("aria-pressed",String(i))}V(this,ft,Fh).call(this,((t=this.search)==null?void 0:t.value)??"")},Fp=function(){var e,t,n,i;(e=this.closeButton)==null||e.addEventListener("click",()=>this.close()),(t=this.backdrop)==null||t.addEventListener("click",()=>this.close()),(n=this.search)==null||n.addEventListener("input",()=>V(this,ft,Fh).call(this,this.search.value)),(i=this.search)==null||i.addEventListener("keydown",r=>{if(r.key==="Enter"){let o=V(this,ft,er).call(this);o.length===1&&V(this,ft,Oh).call(this,o[0].cup.id);return}r.key==="ArrowDown"&&(r.preventDefault(),V(this,ft,Nh).call(this,0))}),this.list.addEventListener("keydown",r=>V(this,ft,zp).call(this,r)),window.addEventListener("keydown",r=>{r.key==="Escape"&&this.isOpen&&this.close()}),this.root.addEventListener("keydown",r=>{if(r.key!=="Tab")return;let o=V(this,ft,Bp).call(this);if(o.length===0)return;let a=o[0],c=o[o.length-1],l=document.activeElement;r.shiftKey&&(l===a||!this.root.contains(l))?(r.preventDefault(),c.focus()):!r.shiftKey&&l===c&&(r.preventDefault(),a.focus())})},er=function(){return this.cards.filter(({card:e})=>!e.hidden)},Bp=function(){let e=[this.search,...this.filterButtons,this.closeButton].filter(Boolean),t=V(this,ft,er).call(this).find(({card:n})=>n.tabIndex===0);return t&&e.splice(1,0,t.card),e.filter(n=>!n.hidden)},zp=function(e){if(!["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Home","End"].includes(e.key))return;let n=V(this,ft,er).call(this);if(n.length===0)return;let i=n.findIndex(({card:a})=>a===document.activeElement);if(i<0)return;e.preventDefault();let r=V(this,ft,kp).call(this,n[i].grid),o={ArrowRight:i+1,ArrowLeft:i-1,ArrowDown:i+r,ArrowUp:i-r,Home:0,End:n.length-1}[e.key];V(this,ft,Nh).call(this,Math.min(Math.max(o,0),n.length-1))},kp=function(e){let t=getComputedStyle(e).gridTemplateColumns.split(" ").filter(Boolean);return Math.max(1,t.length)},Nh=function(e){let n=V(this,ft,er).call(this)[e];if(n){for(let{card:i}of this.cards)i.tabIndex=-1;n.card.tabIndex=0,n.card.focus(),n.card.scrollIntoView({block:"nearest"})}},Oh=function(e){var t;this.close(),(t=this.onSelect)==null||t.call(this,e)},Fh=function(e){var o;let t=Np(e).trim(),n=0;for(let{cup:a,card:c}of this.cards){let l=((o=Jl[a.wall])==null?void 0:o.label)??"",h=Np(`${a.id} ${a.label} ${a.note} ${a.group} ${l} ${a.volume??""} \u043C\u043B`),u=(t===""||h.includes(t))&&(this.group===""||a.group===this.group);c.hidden=!u,u&&(n+=1)}for(let{section:a,cards:c}of this.sections)a.hidden=c.every(l=>l.hidden);this.empty&&(this.empty.hidden=n>0);let i=V(this,ft,er).call(this);for(let{card:a}of this.cards)a.tabIndex=-1;let r=i.find(({cup:a})=>a.id===this.activeId)??i[0];r&&(r.card.tabIndex=0)};var TS=[".glb",".gltf"],AS={b:"onChangeBackground",a:"onToggleAutoRotate",s:"onScreenshot",f:"onToggleFullscreen"},RS={v:"toggleExportMenu"},CS=new Set(["INPUT","TEXTAREA","SELECT","OPTION"]);function PS(s){return!s||s.nodeType!==1?!1:CS.has(s.tagName)||s.isContentEditable===!0}var st,Hp,Vp,Gp,Wp,Xp,fn,qp,Yp,Zp,Kp,Bh,ka=class{constructor(e){an(this,st);this.config=e,this.dom=V(this,st,Hp).call(this),this.handlers={},this.dragDepth=0}setActivePaper(e){for(let[t,n]of this.paperChips??[]){let i=t===e;n.classList.toggle("is-active",i),n.setAttribute("aria-pressed",String(i))}}setPaperAvailable(e){this.dom.paperPicker&&(this.dom.paperPicker.hidden=!e)}setActiveCup(e){var i;(i=this.cupPicker)==null||i.setActive(e);let t=this.dom.cupBtn;if(!t)return;let n=e?ki(e):null;t.dataset.tip=n?`\u0421\u0442\u0430\u043A\u0430\u043D: ${n.label}`:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u0442\u0430\u043A\u0430\u043D"}bind(e){this.handlers=e;let{buttons:t,textureInput:n,rotateWrap:i,rotateSlider:r}=this.dom;V(this,st,Vp).call(this),V(this,st,Gp).call(this),V(this,st,Wp).call(this),t.background.addEventListener("click",()=>V(this,st,fn).call(this,"onChangeBackground")),t.autorotate.addEventListener("click",()=>V(this,st,fn).call(this,"onToggleAutoRotate")),t.screenshot.addEventListener("click",()=>V(this,st,fn).call(this,"onScreenshot")),t.fullscreen.addEventListener("click",()=>V(this,st,fn).call(this,"onToggleFullscreen")),t.texture.hidden=this.config.ui.uploadButton===!1,t.texture.addEventListener("click",()=>n.click()),n.addEventListener("change",o=>V(this,st,Yp).call(this,o)),V(this,st,Xp).call(this),i&&r&&(i.addEventListener("mouseenter",()=>V(this,st,fn).call(this,"onManualRotateStart")),i.addEventListener("mouseleave",()=>V(this,st,fn).call(this,"onManualRotateEnd")),r.addEventListener("input",()=>V(this,st,fn).call(this,"onManualRotate",Number(r.value)))),window.addEventListener("keydown",o=>V(this,st,qp).call(this,o)),this.config.ui.dragAndDrop!==!1&&V(this,st,Zp).call(this)}toggleExportMenu(e){let{exportBtn:t,exportPopover:n}=this.dom;if(!t||!n||t.disabled)return;let i=e??n.hidden;n.hidden=!i,t.classList.toggle("is-active",i),t.setAttribute("aria-expanded",String(i))}setExportBusy(e){let{exportBtn:t,exportStart:n}=this.dom;e&&this.toggleExportMenu(!1),t&&(t.disabled=e),n&&(n.disabled=e)}showLoader(e="\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026"){this.dom.loaderText.textContent=e,this.dom.loader.hidden=!1}updateProgress(e,t="\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026"){this.dom.loaderText.textContent=e>=0?`${t} ${Math.round(e)}%`:t}hideLoader(){this.dom.loader.hidden=!0}showToast(e,t="success"){var r;(r=document.querySelector(".toast"))==null||r.remove();let n=document.createElement("div");n.className=t==="error"?"toast toast--error":"toast",n.setAttribute("role","status"),n.textContent=e,document.body.appendChild(n);let i=this.config.ui.toastDuration;setTimeout(()=>n.classList.add("is-leaving"),Math.max(i-300,0)),setTimeout(()=>n.remove(),i)}setToggleState(e,t){let n=this.dom.buttons[e];n.classList.toggle("is-active",t),n.setAttribute("aria-pressed",String(t))}setActiveBackground(e){var t;(t=this.swatches)==null||t.forEach((n,i)=>{n.classList.toggle("is-active",i===e)})}setRotationSlider(e){this.dom.rotateSlider&&(this.dom.rotateSlider.value=String(Math.round(e)))}};st=new WeakSet,Hp=function(){let e=t=>{let n=document.getElementById(t);if(!n)throw new Error(`UIManager: \u043D\u0435\u0442 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 #${t}`);return n};return{loader:e("loader"),loaderText:e("loader-text"),dropOverlay:e("drop-overlay"),textureInput:e("texture-input"),bgSwatches:e("bg-swatches"),paperPicker:document.getElementById("paper-picker"),cupBtn:document.getElementById("cup-btn"),cupDialog:document.getElementById("cup-dialog"),cupBackdrop:document.getElementById("cup-backdrop"),rotateWrap:document.getElementById("rotate-wrap"),rotateSlider:document.getElementById("rotate-slider"),exportBtn:document.getElementById("export-btn"),exportPopover:document.getElementById("export-popover"),exportPhotos:document.getElementById("export-photos"),exportStart:document.getElementById("export-start"),buttons:{background:e("bg-btn"),autorotate:e("autorotate-btn"),screenshot:e("screenshot-btn"),fullscreen:e("fullscreen-btn"),texture:e("texture-btn")}}},Vp=function(){this.dom.bgSwatches.replaceChildren(),this.swatches=this.config.backgrounds.map((e,t)=>{let n=document.createElement("button");return n.type="button",n.className="swatch",n.style.background=e,n.setAttribute("role","menuitem"),n.setAttribute("aria-label",`\u0424\u043E\u043D ${e}`),n.addEventListener("click",()=>V(this,st,fn).call(this,"onSelectBackground",t)),this.dom.bgSwatches.appendChild(n),n})},Gp=function(){let e=this.dom.paperPicker;if(e){e.replaceChildren(),this.paperChips=new Map;for(let[t,n]of Object.entries(_i)){let i=document.createElement("button");i.type="button",i.className="paper-chip",i.dataset.paper=t,i.setAttribute("aria-pressed","false"),i.title=n.note?`${n.label}: ${n.note.toLowerCase()}`:n.label;let r=document.createElement("span");r.className="paper-chip__dot",r.dataset.paper=t,r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="paper-chip__full",o.textContent=n.label;let a=document.createElement("span");a.className="paper-chip__short",a.textContent=n.short??n.label,i.append(r,o,a),i.addEventListener("click",()=>V(this,st,fn).call(this,"onSelectPaper",t)),e.appendChild(i),this.paperChips.set(t,i)}}},Wp=function(){let{cupBtn:e,cupDialog:t,cupBackdrop:n}=this.dom;if(e){if(this.config.ui.modelPicker===!1||!t){e.hidden=!0;return}this.cupPicker=new za(t,{backdrop:n,onSelect:i=>V(this,st,fn).call(this,"onSelectCup",i),onToggle:i=>{e.classList.toggle("is-active",i),e.setAttribute("aria-expanded",String(i))}}),e.addEventListener("click",()=>this.cupPicker.toggle(e))}},Xp=function(){let{exportBtn:e,exportPopover:t,exportPhotos:n,exportStart:i}=this.dom;!e||!t||(e.addEventListener("click",()=>this.toggleExportMenu()),i==null||i.addEventListener("click",()=>{this.toggleExportMenu(!1),V(this,st,fn).call(this,"onExportTurn",{photos:(n==null?void 0:n.checked)===!0})}),document.addEventListener("click",r=>{t.hidden||t.contains(r.target)||e.contains(r.target)||this.toggleExportMenu(!1)},!0),window.addEventListener("keydown",r=>{r.key==="Escape"&&!t.hidden&&this.toggleExportMenu(!1)}))},fn=function(e,...t){var n,i;(i=(n=this.handlers)[e])==null||i.call(n,...t)},qp=function(e){if(e.metaKey||e.ctrlKey||e.altKey||PS(e.target)||e.isComposing||e.keyCode===229)return;let t=e.key.toLowerCase(),n=RS[t];if(n){this[n]();return}let i=AS[t];i&&V(this,st,fn).call(this,i)},Yp=function(e){var n;let t=(n=e.target.files)==null?void 0:n[0];t&&V(this,st,fn).call(this,"onImageFile",t),e.target.value=""},Zp=function(){window.addEventListener("dragenter",e=>{e.preventDefault(),++this.dragDepth===1&&(this.dom.dropOverlay.hidden=!1)}),window.addEventListener("dragover",e=>e.preventDefault()),window.addEventListener("dragleave",e=>{e.preventDefault(),--this.dragDepth<=0&&V(this,st,Bh).call(this)}),window.addEventListener("drop",e=>V(this,st,Kp).call(this,e))},Kp=function(e){var i,r;e.preventDefault(),V(this,st,Bh).call(this);let t=(r=(i=e.dataTransfer)==null?void 0:i.files)==null?void 0:r[0];if(!t)return;let n=t.name.toLowerCase();TS.some(o=>n.endsWith(o))?V(this,st,fn).call(this,"onModelFile",t):t.type.startsWith("image/")?V(this,st,fn).call(this,"onImageFile",t):this.showToast("\u041D\u0435\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043C\u044B\u0439 \u0442\u0438\u043F \u0444\u0430\u0439\u043B\u0430","error")},Bh=function(){this.dragDepth=0,this.dom.dropOverlay.hidden=!0};var IS=.1;function $p(s){return(s==null?void 0:s.environmentIntensity)??1}function Yr(s,e){let t=s/e;return Number.isFinite(t)&&t>0?t:1}var ve,jp,Jp,Zr,Kr,Qp,em,tm,nm,Ha,im,sm,rm,Va,zh,Ga,om,kh,Hh,am,Vh,Gh,cm,Wh,lm,Wa,hm,Xa,um,dm,fm,$r,qa=class{constructor(e,t){an(this,ve);this.container=e,this.config=t,this.backgroundIndex=0,this.frameId=null,this.autoRotate=t.autoRotate.enabled,this.manualRotate=!1,this.exporting=!1,this.photo=null,this.needsRender=!0,this.modelDirty=!0,V(this,ve,jp).call(this),V(this,ve,Jp).call(this)}async startEnvironment(){V(this,ve,em).call(this),V(this,ve,tm).call(this),V(this,ve,Qp).call(this),V(this,ve,nm).call(this),V(this,ve,Zr).call(this),await this.loadHDRI(),this.invalidateModel()}async applyTexture(e){try{let t=await this.textureManager.replaceTexture(e||ls());return this.invalidateModel(),t}catch(t){return console.warn(`\u0414\u0438\u0437\u0430\u0439\u043D \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D: ${t.message}`),0}}invalidate(){this.needsRender=!0}invalidateModel(){this.modelDirty=!0,this.needsRender=!0}resize(){let{clientWidth:e,clientHeight:t}=this.container;if(e===0||t===0)return;let[n,i]=this.photo?V(this,ve,om).call(this,e,t):[e,t];this.camera.aspect=Yr(n,i),this.camera.updateProjectionMatrix(),this.renderer.setSize(n,i),this.pipeline.setSize(n,i),this.photo&&V(this,ve,kh).call(this),this.invalidate()}async loadHDRI(){let e=this.config.lighting.environment==="hdri";e&&this.ui.showLoader("\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F\u2026");try{await this.loadEnvironmentMap()}catch(t){console.error(t),this.ui.showToast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u0435","error")}finally{e&&this.ui.hideLoader()}}async loadEnvironmentMap(){var n;let{envMap:e,sun:t}=this.config.lighting.environment==="hdri"?await Vf(this.scene,this.renderer,this.config,i=>this.ui.updateProgress(i,"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F\u2026")):Vl(this.scene,this.renderer,this.config,(n=this.backdrop)==null?void 0:n.base);return this.sun=t,wl(this.lightingRig,t,this.config),this.invalidateModel(),e}describeKeyLight(){if(!this.sun)return null;let{direction:e,color:t,irradiance:n,angularRadius:i}=this.sun,r=180/Math.PI,o=this.lightingRig.getObjectByName("KeyLight");return{elevation:+(Math.asin(e.y)*r).toFixed(1),azimuth:+(Math.atan2(e.z,e.x)*r).toFixed(1),color:`#${t.getHexString()}`,softboxIntensity:+n.toFixed(2),lightIntensity:+((o==null?void 0:o.intensity)??0).toFixed(2),angularRadius:+(i*r).toFixed(2)}}async loadModel(e,t=null){this.ui.showLoader("\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043C\u043E\u0434\u0435\u043B\u0438\u2026");try{await this.modelLoader.load(e,n=>this.ui.updateProgress(n),t),this.textureManager.dispose(),this.photo?(kr(this.modelLoader.currentModel,$p(this.photo.data)),V(this,ve,Va).call(this),V(this,ve,zh).call(this)):(kr(this.modelLoader.currentModel,this.config.lighting.environmentIntensity),V(this,ve,Ha).call(this),V(this,ve,Wa).call(this)),this.ui.setActiveCup((t==null?void 0:t.id)??null),this.ui.setPaperAvailable(this.cupTakesPaper()),this.invalidateModel()}catch(n){throw console.error(n),this.ui.showToast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u044C","error"),n}finally{this.ui.hideLoader()}}async enterPhotoScene(e=Ta){this.ui.showLoader("\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u0446\u0435\u043D\u044B\u2026");try{let t=await Jf(e,this.renderer,n=>this.ui.updateProgress(n,"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u0446\u0435\u043D\u044B\u2026"));return V(this,ve,im).call(this,t),t}catch(t){return console.error(t),this.ui.showToast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0446\u0435\u043D\u0443","error"),null}finally{this.ui.hideLoader()}}async exitPhotoScene(){this.photo&&(this.photo=null,this.renderer.toneMapping=this.baseToneMapping,this.renderer.toneMappingExposure=this.config.renderer.toneMappingExposure,this.floor&&(this.floor.mesh.visible=!0),this.pipeline.setBackdrop(null),this.photoShadow=null,V(this,ve,Hh).call(this,!1),this.pipeline.setGrain(0),this.controls.enabled=!0,this.container.classList.remove("has-photo"),this.container.style.removeProperty("--photo-width"),this.container.style.removeProperty("--photo-height"),this.modelLoader.normalize(),V(this,ve,Ga).call(this,1),V(this,ve,Ha).call(this),V(this,ve,Wa).call(this),this.camera.fov=this.config.camera.fov,this.resize(),V(this,ve,rm).call(this),this.selectBackground(this.backgroundIndex),await this.loadEnvironmentMap(),kr(this.modelLoader.currentModel,this.config.lighting.environmentIntensity),this.invalidateModel())}selectCup(e){return this.pendingCupId=e,this.cupSwitch||(this.cupSwitch=(async()=>{for(;this.pendingCupId;){let t=this.pendingCupId;this.pendingCupId=null,await V(this,ve,cm).call(this,t)}})().finally(()=>{this.cupSwitch=null})),this.cupSwitch}async loadModelFromFile(e){let t=URL.createObjectURL(e),n=this.order;try{await this.loadModel(t),(n==null?void 0:n.roughness)!=null&&this.setSurfaceFinish({roughness:n.roughness,relief:n.relief,reliefScale:n.reliefScale}),await this.applyTexture(n==null?void 0:n.texture),this.ui.showToast(`\u041C\u043E\u0434\u0435\u043B\u044C \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430: ${e.name}`)}catch(i){console.error(i)}finally{setTimeout(()=>URL.revokeObjectURL(t),0)}}async replaceTextureFromFile(e){var t;try{let n=await this.textureManager.loadFromFile(e),i=this.textureManager.applyTexture(n);this.invalidateModel(),(t=this.unwrap)==null||t.setSourceFromFile(e),this.ui.showToast(i>0?`\u0414\u0438\u0437\u0430\u0439\u043D \u043F\u0440\u0438\u043C\u0435\u043D\u0451\u043D: ${e.name}`:"\u0412 \u043C\u043E\u0434\u0435\u043B\u0438 \u043D\u0435\u0442 \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u0438 \u0434\u043B\u044F \u0434\u0438\u0437\u0430\u0439\u043D\u0430",i>0?"success":"error")}catch(n){console.error(n),this.ui.showToast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u0438\u0437\u0430\u0439\u043D","error")}}setOrder(e){var t;this.order=e,this.paperKey=((t=e==null?void 0:e.paper)==null?void 0:t.key)??this.paperKey??xi,this.ui.setActivePaper(this.paperKey)}selectPaper(e){_i[e]&&(this.paperKey=e,this.ui.setActivePaper(e),V(this,ve,Wh).call(this))}cupTakesPaper(){var t;return(((t=this.modelLoader.cup)==null?void 0:t.finish)??"paper")==="paper"}attachUnwrap(e){this.unwrap=e}setSurfaceFinish(e){let t=this.modelLoader.applySurfaceFinish({...Pa(),...e});return t>0&&this.invalidate(),t}cycleBackground(){let{backgrounds:e}=this.config;this.selectBackground((this.backgroundIndex+1)%e.length)}selectBackground(e){var i,r;this.backgroundIndex=e;let t=this.config.backgrounds[e];this.backdrop=Kf(t),this.scene.background=new Ce(t);let n=this.container.closest(".stage")??this.container;n.style.background=$f(this.backdrop),(i=this.floor)==null||i.setColor(t),(r=this.turntable)==null||r.setBackground(new Ce(t)),this.ui.setActiveBackground(e),V(this,ve,lm).call(this),this.invalidateModel()}toggleAutoRotate(){this.autoRotate=!this.autoRotate,this.ui.setToggleState("autorotate",this.autoRotate),this.invalidate()}setManualRotate(e){this.manualRotate=e,e&&V(this,ve,hm).call(this)}rotateModelTo(e){let t=this.modelLoader.currentModel;t&&(t.rotation.y=rn.degToRad(e),this.invalidateModel())}getModelRotation(){let e=this.modelLoader.currentModel;return e?(rn.radToDeg(e.rotation.y)%360+360)%360:0}resetView(){this.photo?V(this,ve,Va).call(this):this.modelLoader.frameCurrentModel(),this.invalidate()}async takeScreenshot(){var i;(i=this.ambientShadow)==null||i.update(this.renderer,this.scene),this.pipeline.render();let e=this.config.ui.screenshotName,t=await V(this,ve,dm).call(this);if(!t){this.ui.showToast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u043D\u0438\u043C\u043E\u043A","error");return}let n=await V(this,ve,Xa).call(this,t,e,"image/png");n!=="shared"&&this.ui.showToast(n==="opened"?"\u0421\u043D\u0438\u043C\u043E\u043A \u043E\u0442\u043A\u0440\u044B\u0442 \u0432 \u043D\u043E\u0432\u043E\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u0435":"\u0421\u043D\u0438\u043C\u043E\u043A \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D")}async exportTurn({photos:e=!1}={}){var r,o;if(this.exporting)return;let t=this.modelLoader.currentModel;if(!t){this.ui.showToast("\u041C\u043E\u0434\u0435\u043B\u044C \u0435\u0449\u0451 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430","error");return}if(!ql()&&!e){this.ui.showToast("\u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u0443\u043C\u0435\u0435\u0442 \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0442\u044C \u0432\u0438\u0434\u0435\u043E","error");return}let n=this.config.turnExport,i=this.getModelRotation();this.exporting=!0,this.ui.setExportBusy(!0),this.ui.showLoader("\u0412\u044B\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0431\u043E\u0440\u043E\u0442\u0430"),V(this,ve,Kr).call(this),(r=this.turntable)==null||r.setHiddenForCapture(!0);try{let a=await jf({source:this.renderer.domElement,backdrop:this.backdrop,settings:n,startAngle:i,setAngle:c=>{t.rotation.y=rn.degToRad(c),t.updateMatrixWorld(!0)},renderFrame:()=>{var c;(c=this.ambientShadow)==null||c.update(this.renderer,this.scene),this.pipeline.render()},photos:e,onProgress:(c,l)=>this.ui.updateProgress(c*100,l)});await V(this,ve,fm).call(this,a,n)}catch(a){console.error(a),this.ui.showToast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043E\u0431\u043E\u0440\u043E\u0442","error")}finally{t.rotation.y=rn.degToRad(i),(o=this.turntable)==null||o.setHiddenForCapture(!1),this.exporting=!1,this.ui.setExportBusy(!1),this.ui.hideLoader(),this.invalidateModel(),V(this,ve,Zr).call(this)}}toggleFullscreen(){var n,i,r,o;let e=this.container.closest(".stage")??this.container;if(e.classList.contains("is-fullscreen")){((n=document.exitFullscreen)==null?void 0:n.call(document))??((i=document.webkitExitFullscreen)==null||i.call(document)),V(this,ve,$r).call(this,e,!1);return}V(this,ve,$r).call(this,e,!0);let t=((r=e.requestFullscreen)==null?void 0:r.bind(e))??((o=e.webkitRequestFullscreen)==null?void 0:o.bind(e));t&&Promise.resolve(t()).catch(()=>{})}dispose(){var e,t,n,i,r;V(this,ve,Kr).call(this),(e=this.resizeObserver)==null||e.disconnect(),this.onVisibilityChange&&document.removeEventListener("visibilitychange",this.onVisibilityChange),this.onFullscreenChange&&(document.removeEventListener("fullscreenchange",this.onFullscreenChange),document.removeEventListener("webkitfullscreenchange",this.onFullscreenChange)),this.onEscape&&window.removeEventListener("keydown",this.onEscape),this.modelLoader.destroy(),this.textureManager.dispose(),(t=this.floor)==null||t.dispose(),(n=this.ambientShadow)==null||n.dispose(),(i=this.turntable)==null||i.dispose(),(r=this.scene.environment)==null||r.dispose(),this.controls.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}};ve=new WeakSet,jp=function(){var n,i,r;let{clientWidth:e,clientHeight:t}=this.container;this.scene=ff(),this.camera=pf(this.config,Yr(e,t)),this.renderer=mf(this.config),this.renderer.setSize(e,t),this.container.appendChild(this.renderer.domElement),this.baseToneMapping=this.renderer.toneMapping,this.lightingRig=gf(this.scene,this.config),this.controls=yf(this.camera,this.renderer.domElement,this.config),this.controls.addEventListener("change",()=>this.invalidate()),(n=this.config.floor)!=null&&n.enabled&&(this.floor=Mf(this.config),this.scene.add(this.floor.mesh)),(i=this.config.shadowCatcher)!=null&&i.enabled&&(this.shadowCatcher=Sf(this.config),this.scene.add(this.shadowCatcher.plane)),(r=this.config.ambientShadow)!=null&&r.enabled&&(this.ambientShadow=Tf(this.config),this.scene.add(this.ambientShadow.group)),this.scene.add(this.camera),this.camera.layers.enable(1),this.config.turntable.enabled&&(this.turntable=Df({scene:this.scene,camera:this.camera,controls:this.controls,domElement:this.renderer.domElement,config:this.config,onRotate:o=>this.rotateModelTo(o),onDragStart:()=>this.setManualRotate(!0),onDragEnd:()=>this.setManualRotate(!1)}))},Jp=function(){let e=this.renderer.capabilities.getMaxAnisotropy(),t=this.renderer.capabilities.maxTextureSize;this.modelLoader=new Oa({scene:this.scene,camera:this.camera,controls:this.controls,config:this.config,maxAnisotropy:e}),this.textureManager=new Ba({modelLoader:this.modelLoader,config:this.config,maxAnisotropy:e,maxTextureSize:t}),this.pipeline=new Ea({renderer:this.renderer,scene:this.scene,camera:this.camera,config:this.config}),this.ui=new ka(this.config),this.ui.bind({onChangeBackground:()=>this.cycleBackground(),onSelectBackground:n=>this.selectBackground(n),onToggleAutoRotate:()=>this.toggleAutoRotate(),onManualRotateStart:()=>this.setManualRotate(!0),onManualRotateEnd:()=>this.setManualRotate(!1),onManualRotate:n=>this.rotateModelTo(n),onScreenshot:()=>this.takeScreenshot(),onExportTurn:n=>this.exportTurn(n),onToggleFullscreen:()=>this.toggleFullscreen(),onImageFile:n=>this.replaceTextureFromFile(n),onModelFile:n=>this.loadModelFromFile(n),onSelectCup:n=>this.selectCup(n),onSelectPaper:n=>this.selectPaper(n)}),this.selectBackground(this.backgroundIndex)},Zr=function(){if(this.frameId||document.hidden||this.exporting)return;let e=new Ys,t=()=>{var o,a;this.frameId=requestAnimationFrame(t);let n=Math.min(e.getDelta(),IS);this.autoRotate&&!this.manualRotate&&this.modelLoader.currentModel&&(this.modelLoader.currentModel.rotation.y+=this.config.autoRotate.speed*n,this.invalidateModel());let i=this.controls.update(n),r=(o=this.turntable)==null?void 0:o.update(this.getModelRotation(),n);(i||r)&&this.invalidate(),this.needsRender&&(this.modelDirty&&((a=this.ambientShadow)==null||a.update(this.renderer,this.scene),this.modelDirty=!1),this.pipeline.render(),this.needsRender=!1)};t()},Kr=function(){this.frameId&&(cancelAnimationFrame(this.frameId),this.frameId=null)},Qp=function(){this.onVisibilityChange=()=>{document.hidden?V(this,ve,Kr).call(this):(this.invalidateModel(),V(this,ve,Zr).call(this))},document.addEventListener("visibilitychange",this.onVisibilityChange)},em=function(){this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container)},tm=function(){let e=()=>this.container.closest(".stage")??this.container;this.onFullscreenChange=()=>{document.fullscreenElement||document.webkitFullscreenElement?requestAnimationFrame(()=>this.resize()):V(this,ve,$r).call(this,e(),!1)},document.addEventListener("fullscreenchange",this.onFullscreenChange),document.addEventListener("webkitfullscreenchange",this.onFullscreenChange),this.onEscape=t=>{if(t.key!=="Escape"||document.fullscreenElement||document.webkitFullscreenElement)return;let n=e();n.classList.contains("is-fullscreen")&&V(this,ve,$r).call(this,n,!1)},window.addEventListener("keydown",this.onEscape)},nm=function(){let e=this.renderer.domElement;e.addEventListener("webglcontextlost",t=>{t.preventDefault(),V(this,ve,Kr).call(this),this.ui.showToast("\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 WebGL \u043F\u043E\u0442\u0435\u0440\u044F\u043D \u2014 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435\u2026","error")}),e.addEventListener("webglcontextrestored",()=>{this.invalidateModel(),V(this,ve,Zr).call(this),this.ui.showToast("\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 WebGL \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D")})},Ha=function(){var t,n;if(!this.modelLoader.currentModel)return;let e=new sn().setFromObject(this.modelLoader.currentModel);(t=this.floor)==null||t.setHeight(e.min.y),(n=this.shadowCatcher)==null||n.setHeight(e.min.y),this.ambientShadow&&(this.ambientShadow.group.position.y=e.min.y)},im=function(e){var n,i,r;let{data:t}=e;this.photo||V(this,ve,sm).call(this),this.photo=e,this.renderer.toneMapping=((n=t.view)==null?void 0:n.transform)==="Standard"?Dr:rs,this.renderer.toneMappingExposure=2**(((i=t.view)==null?void 0:i.exposure)??0),this.scene.environment=e.envMap,"environmentIntensity"in this.scene&&(this.scene.environmentIntensity=1),kr(this.modelLoader.currentModel,$p(t)),this.sun=e.sun,wl(this.lightingRig,e.sun,{...this.config,lighting:{...this.config.lighting,keyLight:{...this.config.lighting.keyLight,intensityScale:((r=t.shadow)==null?void 0:r.keyScale)??.5}}}),this.floor&&(this.floor.mesh.visible=!1),this.scene.background=null,V(this,ve,Va).call(this),this.pipeline.setGrain(t.grain??.03),V(this,ve,zh).call(this),this.resize(),V(this,ve,am).call(this),this.invalidateModel()},sm=function(){this.studioView={model:this.modelLoader.currentModel,position:this.camera.position.clone(),target:this.controls.target.clone(),fov:this.camera.fov,near:this.camera.near,far:this.camera.far}},rm=function(){let e=this.studioView;if(this.studioView=null,!e||e.model!==this.modelLoader.currentModel){this.modelLoader.frameCurrentModel();return}this.camera.fov=e.fov,this.camera.near=e.near,this.camera.far=e.far,this.camera.position.copy(e.position),this.controls.target.copy(e.target),this.camera.updateProjectionMatrix(),this.controls.update()},Va=function(){let{data:e}=this.photo??{};e&&(this.controls.enabled=!1,this.camera.position.set(...e.camera.position),this.controls.target.set(...e.camera.target),this.camera.lookAt(this.controls.target))},zh=function(){var r,o;let{data:e}=this.photo??{};if(!e)return;let t=this.modelLoader.cup,n=np(e,t),i=((r=e.cup)==null?void 0:r.origin)??[0,((o=e.floor)==null?void 0:o.y)??0,0];if(n){let a=this.modelLoader.setNaturalHeight(n,i),{x:c,y:l,z:h}=this.modelLoader.sourceSize;V(this,ve,Ga).call(this,Math.max(c,l,h)*a/this.config.model.targetSize)}else this.modelLoader.normalize(),V(this,ve,Ga).call(this,1);V(this,ve,Ha).call(this),V(this,ve,Wa).call(this)},Ga=function(e){var n;let t=((n=this.config.quality)==null?void 0:n.ambientOcclusion)??{};this.pipeline.setAmbientOcclusion({radius:(t.radius??.06)*e,thickness:(t.thickness??.3)*e})},om=function(e,t){let n=Ca(this.photo.data,$l(Yr(e,t)));return e/t>=n?[Math.max(1,Math.round(t*n)),t]:[e,Math.max(1,Math.round(e/n))]},kh=function(){var h;let{data:e,backdrops:t}=this.photo??{};if(!e)return;let{clientWidth:n,clientHeight:i}=this.container,r=$l(Yr(n,i)),o=this.renderer.getSize(new Pe),a=Yr(o.x,o.y),c=t[r]??t.wide;this.container.classList.add("has-photo"),this.container.style.setProperty("--photo-width",`${o.x}px`),this.container.style.setProperty("--photo-height",`${o.y}px`),this.camera.fov=ep(e,r,a),this.camera.aspect=a,this.camera.updateProjectionMatrix();let l=((h=this.photoShadow)==null?void 0:h[r])??null;V(this,ve,Hh).call(this,!!l),this.pipeline.setBackdrop({texture:c,frameSize:tp(a,Ca(e,r)),shadow:l,shadowOpacity:e.shadowOpacity??1}),this.invalidate()},Hh=function(e){this.shadowCatcher&&(this.shadowCatcher.plane.visible=!e),this.ambientShadow&&(this.ambientShadow.group.visible=!e)},am=async function(){V(this,ve,Gh).call(this,await V(this,ve,Vh).call(this,this.modelLoader.cup))},Vh=async function(e){let{id:t,data:n}=this.photo??{};if(!n)return null;let i=Qf(e),[r,o]=await Promise.all([Kl(t,n,i,"wide"),Kl(t,n,i,"tall")]);return r||o?{wide:r,tall:o}:null},Gh=function(e){this.photo&&(this.photoShadow=e,V(this,ve,kh).call(this),this.invalidateModel())},cm=async function(e){var r,o;let t=ki(e);if(!t)return;let n=this.photo?V(this,ve,Vh).call(this,t):null;try{await this.loadModel(t.file,t)}catch{this.ui.setActiveCup(((r=this.modelLoader.cup)==null?void 0:r.id)??null);return}n&&V(this,ve,Gh).call(this,await n),V(this,ve,Wh).call(this);let i=ls();await this.applyTexture(i),(o=this.unwrap)==null||o.setSource(i)},Wh=function(){let e=this.cupTakesPaper();return this.ui.setPaperAvailable(e),e?this.setSurfaceFinish(jl(this.paperKey??xi)):0},lm=function(){var t;if(this.config.lighting.environment!=="studio"||!this.sun)return;let e=this.scene.environment;Vl(this.scene,this.renderer,this.config,(t=this.backdrop)==null?void 0:t.base),e==null||e.dispose()},Wa=function(){if(!this.turntable)return;let e=this.modelLoader.currentModel;if(!e){this.turntable.setMetrics(null);return}let t=e.rotation.y;e.rotation.y=0,e.updateMatrixWorld(!0);let n=new sn().setFromObject(e);if(e.rotation.y=t,e.updateMatrixWorld(!0),n.isEmpty()){this.turntable.setMetrics(null);return}let i=n.getSize(new B),r=n.getCenter(new B),o=Math.max(i.x,i.z)/2*this.config.turntable.radiusScale;this.turntable.setMetrics({center:r,baseY:n.min.y,radius:o})},hm=function(){this.modelLoader.currentModel&&this.ui.setRotationSlider(this.getModelRotation())},Xa=async function(e,t,n){var a;if(V(this,ve,um).call(this)){let c=new File([e],t,{type:n??e.type});if((a=navigator.canShare)!=null&&a.call(navigator,{files:[c]}))try{return await navigator.share({files:[c],title:t}),"shared"}catch(l){if((l==null?void 0:l.name)==="AbortError")return"shared"}}let i=URL.createObjectURL(e),r=document.createElement("a"),o="download"in r;return r.href=i,r.download=t,r.rel="noopener",o||(r.target="_blank"),document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(i),6e4),o?"downloaded":"opened"},um=function(){let e=this.config.ui.screenshotShare??"auto";if(e==="always")return!0;if(e==="never")return!1;let t=navigator.userAgent;return/iP(hone|ad|od)/.test(t)||/Macintosh/.test(t)&&navigator.maxTouchPoints>1},dm=function(){return new Promise(e=>{try{let t=this.renderer.domElement,n=document.createElement("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");ba(i,n.width,n.height,this.backdrop),i.drawImage(t,0,0),n.toBlob(r=>e(r),"image/png")}catch(t){console.error(t),e(null)}})},fm=async function({video:e,videoExt:t,photos:n},i){let r=i.name;if(!e&&n.length===0){this.ui.showToast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043E\u0431\u043E\u0440\u043E\u0442","error");return}if(e&&n.length===0){let c=await V(this,ve,Xa).call(this,e,`${r}.${t}`,e.type);if(c==="shared")return;this.ui.showToast(c==="opened"?"\u0420\u043E\u043B\u0438\u043A \u043E\u0442\u043A\u0440\u044B\u0442 \u0432 \u043D\u043E\u0432\u043E\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u0435":"\u0420\u043E\u043B\u0438\u043A \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D");return}let o=[...n];e&&o.unshift({name:`${r}.${t}`,data:new Uint8Array(await e.arrayBuffer())});let a=await V(this,ve,Xa).call(this,up(o),`${r}.zip`,"application/zip");if(a!=="shared"){if(a==="opened"){this.ui.showToast("\u0410\u0440\u0445\u0438\u0432 \u043E\u0442\u043A\u0440\u044B\u0442 \u0432 \u043D\u043E\u0432\u043E\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u0435");return}this.ui.showToast(e?`\u0410\u0440\u0445\u0438\u0432 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D: \u0440\u043E\u043B\u0438\u043A \u0438 ${n.length} \u0444\u043E\u0442\u043E`:`\u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043B \u0432\u0438\u0434\u0435\u043E \u2014 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B \u0442\u043E\u043B\u044C\u043A\u043E \u0444\u043E\u0442\u043E (${n.length})`,e?"success":"error")}},$r=function(e,t){e.classList.toggle("is-fullscreen",t),document.body.classList.toggle("has-fullscreen-stage",t),this.ui.setToggleState("fullscreen",t),requestAnimationFrame(()=>this.resize())};var Gi={sku:64,paper:64,status:160,title:200,lead:1e3,note:1e3,url:2048,specRows:24,specText:160,checklistItems:24,checklistText:400},LS=["sku","paper","status","title","lead","note"],DS=new Set(["lead","note"]),US=["model","texture","unwrap"],NS=/[\u0000-\u001F\u007F]/g,OS=/[\u0000-\u001F\u007F]/,FS=/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;function Xh(s,e){if(typeof s!="string")return null;let t=s.replace(NS," ").trim();return t?t.slice(0,e):null}function mm(s,e){if(typeof s!="string")return null;let t=s.replace(FS," ").trim();return t?t.slice(0,e):null}function BS(s,e=[]){if(typeof s!="string")return!1;let t=s.trim();if(!t||t.length>Gi.url||OS.test(t)||t.startsWith("//")||t.includes("..")||/%2e%2e/i.test(t))return!1;if(/^[a-z][a-z0-9+.-]*:/i.test(t)){let n;try{n=new URL(t,window.location.href)}catch{return!1}return n.protocol!=="http:"&&n.protocol!=="https:"||n.origin!==window.location.origin?!1:pm(n.pathname,e)}return pm(t,e)}function pm(s,e){return!e||e.length===0?!0:e.some(t=>s.startsWith(t))}var zS=["roughness","relief"];function kS(s){if(s==null||s==="")return null;let e=Number(s);return Number.isFinite(e)?Math.min(Math.max(e,0),1):null}function HS(s){if(!Array.isArray(s))return null;let e=s.slice(0,Gi.specRows).map(t=>{if(!t||typeof t!="object")return null;let n=Xh(t.label,Gi.specText),i=Xh(t.value,Gi.specText);return n||i?{label:n??"",value:i??""}:null}).filter(Boolean);return e.length>0?e:null}function VS(s){if(!Array.isArray(s))return null;let e=s.slice(0,Gi.checklistItems).map(t=>mm(t,Gi.checklistText)).filter(Boolean);return e.length>0?e:null}function jr(s,{allowedAssetPrefixes:e=[]}={}){if(!s||typeof s!="object"||Array.isArray(s))return null;let t={};for(let r of LS){let o=DS.has(r)?mm(s[r],Gi[r]):Xh(s[r],Gi[r]);o!==null&&(t[r]=o)}for(let r of US){let o=typeof s[r]=="string"?s[r].trim():null;o&&(BS(o,e)?t[r]=o:console.warn(`\u0417\u0430\u043A\u0430\u0437: \u043F\u043E\u043B\u0435 "${r}" \u043E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u043E \u2014 \u043D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u043F\u0443\u0442\u044C \u043A \u0444\u0430\u0439\u043B\u0443.`))}for(let r of zS){let o=kS(s[r]);o!==null&&(t[r]=o)}let n=HS(s.spec);n&&(t.spec=n);let i=VS(s.checklist);return i&&(t.checklist=i),t}var gm=Object.freeze({sku:"DW80-280",model:null,texture:null,unwrap:null,paper:xi,roughness:null,status:"\u041E\u0436\u0438\u0434\u0430\u0435\u0442 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u044F",title:"\u041E\u0446\u0435\u043D\u0438\u0442\u0435 \u0431\u0443\u0434\u0443\u0449\u0438\u0439 \u0441\u0442\u0430\u043A\u0430\u043D",lead:"\u042D\u0442\u043E \u0444\u0438\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u0438\u0434 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u0442\u0430\u043A\u0430\u043D\u0430. \u041E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0435\u0433\u043E \u0441\u043E \u0432\u0441\u0435\u0445 \u0441\u0442\u043E\u0440\u043E\u043D \u0438 \u0441\u043E\u0433\u043B\u0430\u0441\u0443\u0439\u0442\u0435, \u0435\u0441\u043B\u0438 \u0432\u0441\u0451 \u0432 \u043F\u043E\u0440\u044F\u0434\u043A\u0435.",spec:[{label:"\u0422\u0438\u043F",value:"\u0414\u0432\u0443\u0445\u0441\u043B\u043E\u0439\u043D\u044B\u0439"},{label:"\u041E\u0431\u044A\u0451\u043C",value:"250 \u043C\u043B (\u0434\u043E 280 \u043C\u043B)"},{label:"\u041F\u0435\u0447\u0430\u0442\u044C",value:"\u041E\u0444\u0441\u0435\u0442"}],checklist:["\u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432 \u043C\u0435\u043D\u044F \u0443\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442","\u0426\u0432\u0435\u0442\u043E\u0432\u043E\u0435 \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F\u043C","\u0422\u0435\u043A\u0441\u0442, \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u044B \u0432\u0435\u0440\u043D\u043E"],note:"\u0421\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0444\u0438\u043A\u0441\u0438\u0440\u0443\u0435\u0442 \u043C\u0430\u043A\u0435\u0442: \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u0432 \u043F\u0435\u0447\u0430\u0442\u044C \u043F\u0440\u0430\u0432\u043A\u0438 \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B."}),GS=["sku","model","texture","unwrap","paper","roughness","title","status"];function WS(s){var n;let e=((n=s.security)==null?void 0:n.urlOverrides)??"never";if(e==="always")return!0;if(e==="never")return!1;let{hostname:t}=window.location;return t==="localhost"||t==="127.0.0.1"||t==="[::1]"}function vm(s){var n;if(!WS(s))return{};let e=new URLSearchParams(window.location.search),t={};for(let i of GS){let r=e.get(i);r!==null&&r!==""&&(t[i]=r)}return jr(t,{allowedAssetPrefixes:(n=s.security)==null?void 0:n.allowedAssetPrefixes})??{}}async function XS(s){var n;let e=(n=s.order)==null?void 0:n.endpoint,t=new URLSearchParams(window.location.search).get("order");if(!e||!t)return null;try{let i=await fetch(e.replace("{id}",encodeURIComponent(t)),{headers:{Accept:"application/json"},credentials:"same-origin",cache:"no-store"});if(!i.ok)throw new Error(`HTTP ${i.status}`);let r=i.headers.get("content-type")??"";if(!r.includes("json"))throw new Error(`\u043D\u0435\u043E\u0436\u0438\u0434\u0430\u043D\u043D\u044B\u0439 Content-Type: ${r||"\u043D\u0435\u0442"}`);return await i.json()}catch(i){return console.warn("\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D, \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u043D\u0430 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F\u0445 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E:",i.message),null}}function Ya(s){let e=ip(s.paper),t=s.model?{cup:op(s.model),matchedBy:"explicit"}:null,{cup:n,matchedBy:i}=t??ap(s.sku),r=s.model??(n==null?void 0:n.file)??null,o=(h,u)=>{if(h==null||h==="")return u;let d=Number(h);return Number.isFinite(d)?Math.min(Math.max(d,0),1):u},a=o(s.roughness,e.roughness),c=o(s.relief,e.relief),l=e.reliefScale;return{...s,model:r,cup:n,modelMatchedBy:i,paper:e,roughness:a,relief:c,reliefScale:l,input:s}}function _m(s){var t;let e={allowedAssetPrefixes:(t=s.security)==null?void 0:t.allowedAssetPrefixes};return Ya({...gm,...jr(window.ORDER_DATA,e)??{},...vm(s)})}async function xm(s){var i;let e={allowedAssetPrefixes:(i=s.security)==null?void 0:i.allowedAssetPrefixes},t=jr(window.ORDER_DATA,e),n=t?null:jr(await XS(s),e);return Ya({...gm,...n??{},...t??{},...vm(s)})}function Za(s,e){if(e==null||e==="")return;let t=document.querySelector(s);t&&(t.textContent=e)}function qS(s){let e=document.querySelector(".spec");!e||!Array.isArray(s)||e.replaceChildren(...s.filter(t=>t&&(t.label||t.value)).map(({label:t,value:n})=>{let i=document.createElement("div");i.className="spec__row";let r=document.createElement("dt");r.textContent=t??"";let o=document.createElement("dd");return o.textContent=n??"",i.append(r,o),i}))}function YS(s){let e=document.getElementById("checklist");if(!(!e||!Array.isArray(s))){e.querySelectorAll(".check").forEach(t=>t.remove());for(let t of s.filter(Boolean)){let n=document.createElement("label");n.className="check";let i=document.createElement("input");i.type="checkbox",i.checked=!0;let r=document.createElement("span");r.className="check__box",r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="check__text",o.textContent=t,n.append(i,r,o),e.appendChild(n)}}}function qh(s){Za(".status-chip__text",s.status),Za(".approve-panel__title",s.title),Za(".approve-panel__lead",s.lead),Za(".approve-panel__note",s.note),qS(s.spec),YS(s.checklist)}var Yh=new Set,Zh=new Set,Fn={viewer:null,order:null,unwrap:null};function tr(){return Fn.viewer}function Jr(){return Fn.order}function ym(s){if(Fn.viewer){s(Fn.viewer);return}Yh.add(s)}function Mm(s){Fn.viewer=s,Fn.unwrap&&s.attachUnwrap(Fn.unwrap);for(let e of Yh)e(s);Yh.clear()}function Sm(s){return Zh.add(s),Fn.order&&s(Fn.order),()=>Zh.delete(s)}function Em(s){Fn.order=s;for(let e of Zh)e(s)}function bm(s){var e;Fn.unwrap=s,(e=Fn.viewer)==null||e.attachUnwrap(s)}var et,wm,Tm,Am,Rm,Cm,Kh,$h,jh,Ka,Pm,Im,$a,nr,Jh,ja=class{constructor(e){an(this,et);var t,n;this.root=e,this.canvas=e.querySelector(".unwrap__canvas"),this.ctx=((t=this.canvas)==null?void 0:t.getContext("2d"))??null,this.hint=e.querySelector(".unwrap__hint"),this.hintText=((n=this.hint)==null?void 0:n.textContent)??"",this.image=null,this.zoom=1,this.x=0,this.y=0,this.width=0,this.height=0,this.dpr=0,this.fitScale=1,this.pointers=new Map,this.pinchDistance=0,this.dragging=!1,V(this,et,wm).call(this),V(this,et,Ka).call(this),V(this,et,nr).call(this)}setSource(e,t){if(!e){t==null||t();return}let n=new Image;n.decoding="async",n.addEventListener("load",()=>{this.image=n,this.hint&&(this.hint.textContent=this.hintText),this.reset(),t==null||t()}),n.addEventListener("error",()=>{this.hint&&(this.hint.textContent="\u0420\u0430\u0437\u0432\u0451\u0440\u0442\u043A\u0430 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u0430\u0441\u044C"),t==null||t()}),n.src=e}setSourceFromFile(e){let t=URL.createObjectURL(e);this.setSource(t,()=>URL.revokeObjectURL(t))}reset(){this.zoom=1,this.x=0,this.y=0,V(this,et,Ka).call(this),V(this,et,nr).call(this)}dispose(){var e;(e=this.observer)==null||e.disconnect(),window.removeEventListener("resize",this.onWindowResize)}};et=new WeakSet,wm=function(){let e=this.root;e.addEventListener("wheel",n=>V(this,et,Tm).call(this,n),{passive:!1}),e.addEventListener("pointerdown",n=>V(this,et,Am).call(this,n)),e.addEventListener("pointermove",n=>V(this,et,Rm).call(this,n));let t=n=>V(this,et,Cm).call(this,n);e.addEventListener("pointerup",t),e.addEventListener("pointercancel",t),e.addEventListener("dblclick",()=>this.reset()),typeof ResizeObserver=="function"&&(this.observer=new ResizeObserver(()=>V(this,et,jh).call(this)),this.observer.observe(e)),this.onWindowResize=()=>V(this,et,jh).call(this),window.addEventListener("resize",this.onWindowResize)},Tm=function(e){e.preventDefault(),V(this,et,$h).call(this,e.clientX,e.clientY,Math.exp(-e.deltaY*.0016))},Am=function(e){var t,n;if(this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),(n=(t=this.root).setPointerCapture)==null||n.call(t,e.pointerId),this.pointers.size===2){this.pinchDistance=V(this,et,Kh).call(this),this.dragging=!1;return}this.dragging=!0,this.root.classList.add("is-dragging")},Rm=function(e){let t=this.pointers.get(e.pointerId);if(t){if(this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),this.pointers.size===2){let n=V(this,et,Kh).call(this);if(this.pinchDistance>0&&n>0){let[i,r]=[...this.pointers.values()];V(this,et,$h).call(this,(i.x+r.x)/2,(i.y+r.y)/2,n/this.pinchDistance)}this.pinchDistance=n;return}this.dragging&&(this.x+=e.clientX-t.x,this.y+=e.clientY-t.y,V(this,et,$a).call(this),V(this,et,nr).call(this))}},Cm=function(e){var t,n;this.pointers.delete(e.pointerId),(n=(t=this.root).releasePointerCapture)==null||n.call(t,e.pointerId),this.pointers.size<2&&(this.pinchDistance=0),this.pointers.size===0&&(this.dragging=!1,this.root.classList.remove("is-dragging"))},Kh=function(){let[e,t]=[...this.pointers.values()];return Math.hypot(e.x-t.x,e.y-t.y)},$h=function(e,t,n){let i=Math.min(Math.max(this.zoom*n,1),V(this,et,Im).call(this));if(i===this.zoom)return;let r=this.root.getBoundingClientRect(),o=e-r.left-r.width/2,a=t-r.top-r.height/2,c=i/this.zoom;this.x=o-(o-this.x)*c,this.y=a-(a-this.y)*c,this.zoom=i,V(this,et,$a).call(this),V(this,et,nr).call(this)},jh=function(){V(this,et,Ka).call(this)&&(V(this,et,$a).call(this),V(this,et,nr).call(this))},Ka=function(){let e=this.root.clientWidth,t=this.root.clientHeight,n=window.devicePixelRatio||1;if(!e||!t||!this.canvas)return!1;this.width=e,this.height=t,this.dpr=n;let i=Math.round(e*n),r=Math.round(t*n);return(this.canvas.width!==i||this.canvas.height!==r)&&(this.canvas.width=i,this.canvas.height=r),this.image&&(this.fitScale=Math.min(e*.82/this.image.naturalWidth,t*.78/this.image.naturalHeight)),!0},Pm=function(){return!this.image||!this.fitScale?1:1/(this.fitScale*this.dpr)},Im=function(){return this.image?Math.min(Math.max(V(this,et,Pm).call(this)*1.5,2),40):2},$a=function(){if(!this.image)return;let e=this.fitScale*this.zoom,t=Math.max((this.image.naturalWidth*e-this.width)/2,0),n=Math.max((this.image.naturalHeight*e-this.height)/2,0);this.x=Math.min(Math.max(this.x,-t),t),this.y=Math.min(Math.max(this.y,-n),n)},nr=function(){let e=this.ctx;if(!e||!this.width||!this.height||(e.setTransform(this.dpr,0,0,this.dpr,0,0),e.clearRect(0,0,this.width,this.height),this.root.classList.toggle("is-zoomed",this.zoom>1),!this.image))return;let t=this.fitScale*this.zoom,n=this.image.naturalWidth*t,i=this.image.naturalHeight*t,r=(this.width-n)/2+this.x,o=(this.height-i)/2+this.y;e.save(),e.shadowColor="rgba(0, 0, 0, 0.12)",e.shadowBlur=30,e.shadowOffsetY=10,e.fillStyle="#fff",V(this,et,Jh).call(this,e,r,o,n,i),e.fill(),e.restore(),e.save(),V(this,et,Jh).call(this,e,r,o,n,i),e.clip(),e.imageSmoothingEnabled=!0,e.imageSmoothingQuality="high",e.drawImage(this.image,r,o,n,i),e.restore()},Jh=function(e,t,n,i,r){let o=Math.min(4,i/2,r/2);e.beginPath(),typeof e.roundRect=="function"?e.roundRect(t,n,i,r,o):e.rect(t,n,i,r)};function ir(s,e="success"){var i,r;let t=(i=tr())==null?void 0:i.ui;if(t){t.showToast(s,e);return}(r=document.querySelector(".toast"))==null||r.remove();let n=document.createElement("div");n.className=e==="error"?"toast toast--error":"toast",n.setAttribute("role","status"),n.textContent=s,document.body.appendChild(n),setTimeout(()=>n.classList.add("is-leaving"),2200),setTimeout(()=>n.remove(),2500)}function ZS(){let s=Array.from(document.querySelectorAll(".stage-tab")),e=document.getElementById("unwrap"),t=document.querySelector(".stage-controls"),n=document.querySelector(".stage-swatches"),i=document.getElementById("scene-picker"),r=document.querySelector(".stage"),o=a=>{var c;r==null||r.classList.toggle("is-photo",a==="scene"),r==null||r.classList.toggle("is-unwrap",a==="unwrap"),e&&(e.hidden=a!=="unwrap"),t&&(t.hidden=a==="unwrap"),n&&(n.hidden=a!=="3d"),i&&(i.hidden=a!=="scene"),(c=tr())==null||c.setManualRotate(a==="unwrap")};s.forEach(a=>{a.addEventListener("click",()=>{let c=a.dataset.tab;s.forEach(h=>{let u=h===a;h.classList.toggle("is-active",u),h.setAttribute("aria-selected",String(u))}),o(c);let l=tr();l&&(c==="scene"?Um(l,Ja):l.exitPhotoScene())})})}var Ja=Ta;async function Um(s,e){var t;Ja=e,Nm(e),await s.enterPhotoScene(e),(t=document.querySelector(".stage"))!=null&&t.classList.contains("is-photo")||s.exitPhotoScene()}function Nm(s){for(let e of document.querySelectorAll(".scene-chip")){let t=e.dataset.scene===s;e.classList.toggle("is-active",t),e.setAttribute("aria-pressed",String(t))}}function KS(){var e;let s=document.getElementById("scene-picker");if(s){if(Xi.ui.photoScene===!1){(e=document.querySelector('.stage-tab[data-tab="scene"]'))==null||e.remove(),s.remove();return}if(wa.length<2){s.remove();return}s.replaceChildren();for(let t of wa){let n=document.createElement("button");n.type="button",n.className="scene-chip",n.dataset.scene=t.id,n.setAttribute("aria-pressed",String(t.id===Ja)),n.title=t.note??"";let i=document.createElement("span");i.className="scene-chip__label",i.textContent=t.label,n.appendChild(i),n.addEventListener("click",()=>{let r=tr();r&&Um(r,t.id)}),s.appendChild(n)}Nm(Ja)}}function $S(){let s=document.getElementById("unwrap");if(!s)return;let e=new ja(s);bm(e),Sm(t=>e.setSource((t==null?void 0:t.unwrap)||(t==null?void 0:t.texture)||ls()))}function jS(){let s=document.getElementById("stage"),e=document.getElementById("turntable-btn");s&&ym(t=>{let n=t.turntable;n&&(e==null||e.addEventListener("click",()=>{let i=n.togglePinned();e.classList.toggle("is-active",i),e.setAttribute("aria-pressed",String(i))}),s.addEventListener("dblclick",()=>t.resetView()))})}function JS(){let s=document.getElementById("info-btn"),e=document.getElementById("help-popover"),t=document.getElementById("help-backdrop"),n=document.getElementById("help-close");if(!s||!e)return;let i=()=>window.matchMedia("(max-width: 640px)").matches,r=()=>{if(i())return;let l=s.getBoundingClientRect(),h=e.getBoundingClientRect(),u=12,d=l.right-h.width;d=Math.min(Math.max(d,u),window.innerWidth-h.width-u);let p=l.top-h.height-u,g=p>=u?p:Math.min(l.bottom+u,window.innerHeight-h.height-u);e.style.left=`${Math.round(d)}px`,e.style.top=`${Math.round(g)}px`},o=()=>{e.hidden=!1,t&&(t.hidden=!1),r(),requestAnimationFrame(()=>{e.classList.add("is-open"),r()}),s.setAttribute("aria-expanded","true")},a=()=>{e.classList.remove("is-open"),s.setAttribute("aria-expanded","false"),t&&(t.hidden=!0),setTimeout(()=>{e.classList.contains("is-open")||(e.hidden=!0)},180)},c=()=>e.hidden?o():a();s.addEventListener("click",l=>{l.stopPropagation(),c()}),n==null||n.addEventListener("click",a),t==null||t.addEventListener("click",a),document.addEventListener("click",l=>{e.hidden||e.contains(l.target)||s.contains(l.target)||a()}),window.addEventListener("keydown",l=>{l.key==="Escape"&&!e.hidden&&a()}),window.addEventListener("resize",()=>{e.hidden||r()}),window.addEventListener("scroll",()=>{e.hidden||r()},{passive:!0})}function QS(){let s=document.getElementById("approve-btn"),e=document.getElementById("checklist"),t=document.getElementById("status-chip");if(!s||!e)return;let n=!1,i=(o,a)=>s.dataset[o]??a,r=(o,a)=>{let c=s.querySelector(".cta__full"),l=s.querySelector(".cta__short");c&&(c.textContent=o),l&&(l.textContent=a),!c&&!l&&(s.textContent=o)};s.addEventListener("click",()=>{var c;if(!n){n=!0,e.hidden=!1,r(i("labelConfirm","\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0432 \u043F\u0435\u0447\u0430\u0442\u044C"),i("labelConfirmShort","\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C"));return}if(!Array.from(e.querySelectorAll('input[type="checkbox"]')).every(l=>l.checked)){ir("\u0421\u043D\u044F\u0442\u0430\u044F \u0433\u0430\u043B\u043E\u0447\u043A\u0430 \u2014 \u0437\u043D\u0430\u0447\u0438\u0442, \u043D\u0443\u0436\u043D\u044B \u043F\u0440\u0430\u0432\u043A\u0438","error");return}if(t){t.classList.add("is-done");let l=t.querySelector(".status-chip__text"),h=t.dataset.labelDone;l&&h&&(l.textContent=h)}e.hidden=!0,s.disabled=!0;let a=i("labelDone","\u0421\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u043E \u2713");r(a,a),(c=document.getElementById("edits-btn"))==null||c.setAttribute("disabled",""),ir("\u0417\u0430\u043A\u0430\u0437 \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u0432 \u043F\u0435\u0447\u0430\u0442\u044C")})}function eE(){let s=document.getElementById("approve-actions"),e=document.getElementById("edits-form"),t=document.getElementById("edits-btn"),n=document.getElementById("edits-cancel"),i=document.getElementById("edits-text");if(!s||!e)return;let r=()=>{e.hidden=!0,s.hidden=!1};t==null||t.addEventListener("click",()=>{s.hidden=!0,e.hidden=!1,i==null||i.focus()}),n==null||n.addEventListener("click",r),e.addEventListener("submit",o=>{if(o.preventDefault(),!(i!=null&&i.value.trim())){ir("\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435, \u0447\u0442\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C","error"),i==null||i.focus();return}r(),i&&(i.value=""),ir("\u041F\u0440\u0430\u0432\u043A\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u044B \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0443")})}var Lm="cup-viewer:panel-collapsed";function tE(){let s=document.querySelector(".approve-grid"),e=document.getElementById("panel-toggle"),t=document.getElementById("approve-panel");if(!s||!e||!t)return;let n=e.querySelector(".panel-toggle__text"),i=o=>{s.classList.toggle("is-panel-collapsed",o),e.setAttribute("aria-expanded",String(!o)),t.inert=o;let a=o?e.dataset.labelExpand??"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0430\u043D\u0435\u043B\u044C":e.dataset.labelCollapse??"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u043F\u0430\u043D\u0435\u043B\u044C";e.setAttribute("aria-label",a),e.title=a,n&&(n.textContent=o?"\u0417\u0430\u043A\u0430\u0437":"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C")},r=!1;try{r=localStorage.getItem(Lm)==="1"}catch{}i(r),e.addEventListener("click",()=>{r=!r,i(r);try{localStorage.setItem(Lm,r?"1":"0")}catch{}}),s.addEventListener("transitionend",o=>{var a;o.propertyName==="grid-template-columns"&&((a=tr())==null||a.resize())})}function nE(){var s;(s=document.getElementById("share-btn"))==null||s.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(window.location.href),ir("\u0421\u0441\u044B\u043B\u043A\u0430 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430")}catch{ir("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443","error")}})}function Dm(){ZS(),KS(),$S(),jS(),JS(),QS(),eE(),nE(),tE()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Dm,{once:!0}):Dm();function iE(s){var n;let e=((n=s.security)==null?void 0:n.debugApi)??"never";if(e==="always")return!0;if(e==="never")return!1;let{hostname:t}=window.location;return t==="localhost"||t==="127.0.0.1"||t==="[::1]"}async function sE(){let s=document.getElementById("canvas-container");if(!s)throw new Error("\u041D\u0435\u0442 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 #canvas-container");qh(_m(Xi));let e=new qa(s,Xi);Mm(e),iE(Xi)&&rE(e);let[t]=await Promise.all([xm(Xi),e.startEnvironment()]);await Fm(e,t)}async function Fm(s,e){var t;return s.setOrder(e),Em(e),qh(e),await s.loadModel(e.model,e.cup),s.setSurfaceFinish({roughness:e.roughness,relief:e.relief,reliefScale:e.reliefScale,normalScale:(t=e.paper)==null?void 0:t.normalScale}),await s.applyTexture(e.texture),e}function rE(s){window.cupViewer={viewer:s,get order(){return Jr()},applyOrder:e=>{var t;return Fm(s,Ya({...(t=Jr())==null?void 0:t.input,...e}))},loadModel:e=>s.loadModel(e),selectCup:e=>s.selectCup(e),selectPaper:e=>s.selectPaper(e),replaceTexture:e=>s.applyTexture(e),setRoughness:e=>s.setSurfaceFinish({roughness:e}),setMetalness:e=>s.setSurfaceFinish({metalness:e}),setRelief:e=>{var t;return s.setSurfaceFinish({relief:e,reliefScale:(t=Jr())==null?void 0:t.reliefScale})},setReliefScale:e=>{var t;return s.setSurfaceFinish({relief:(t=Jr())==null?void 0:t.relief,reliefScale:e})},describeKeyLight:()=>s.describeKeyLight(),debugAO:(e=!0)=>s.pipeline.showAmbientOcclusionOnly(e)}}function oE(s){console.error("\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0449\u0438\u043A \u043D\u0435 \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u0441\u044F:",s);let e=document.getElementById("stage")??document.body;if(e.querySelector(".startup-error"))return;let t=document.createElement("div");t.className="startup-error",t.setAttribute("role","alert");let n=document.createElement("p");n.className="startup-error__title",n.textContent="\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C 3D-\u043C\u043E\u0434\u0435\u043B\u044C";let i=document.createElement("p");i.className="startup-error__text",i.textContent="\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \xAB\u0420\u0430\u0437\u0432\u0451\u0440\u0442\u043A\u0430\xBB \u2014 \u043C\u0430\u043A\u0435\u0442 \u0442\u0430\u043C \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u043B\u043E\u0441\u043A\u043E. \u0415\u0441\u043B\u0438 3D \u043D\u0435 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0438 \u043F\u043E\u0441\u043B\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B, \u0441\u043E\u043E\u0431\u0449\u0438\u0442\u0435 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0443.",t.append(n,i),e.appendChild(t)}function Om(){sE().catch(oE)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Om,{once:!0}):Om();
