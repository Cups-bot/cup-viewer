/* cup-viewer — собрано npm run build. Исходники в js/, править нужно там. */
import{b as js,c as gn,e as G}from"./chunk-3HB4IAZ7.js";var Ks=Object.freeze({assets:{hdri:"assets/hdri/main.hdr",dracoDecoder:"vendor/draco/"},texture:{maxSize:2048},security:{debugApi:"localhost"},renderer:{antialias:!0,preserveDrawingBuffer:!0,alpha:!0,maxPixelRatio:2,toneMapping:"none",toneMappingExposure:1,shadows:!0},camera:{fov:32,position:{x:0,y:.4,z:1.2}},controls:{enableDamping:!0,dampingFactor:.08,minDistance:.4,maxDistance:3,maxPolarAngle:Math.PI,enablePan:!0},autoRotate:{enabled:!0,speed:.45},quality:{postProcessing:!0,msaaSamples:4,ambientOcclusion:{enabled:!0,intensity:1,radius:.07,thickness:.3,scale:1.35,samples:32}},lighting:{environment:"studio",environmentIntensity:.5,keyLight:{enabled:!0,distance:2.2,intensityScale:.2,useColor:!0},shadow:{mapSize:1024,near:.4,far:6,frustum:1.6,bias:0,normalBias:.0015,radius:4}},shadowCatcher:{enabled:!0,size:3,opacity:.32,tint:"#0a1526",falloffStart:.16,falloffEnd:.95},ambientShadow:{enabled:!0,size:1.7,resolution:512,height:.13,darkness:2.2,falloff:2.4,blur:2.6,opacity:.85},studioShading:{ambientOcclusion:{intensity:.7,radius:.045,scale:1.15},shadowOpacity:.6,shadowRadius:4,shadowPenumbra:{near:3,far:40},shadowNormalBias:.008,shadowFalloff:{start:.12,end:.95},contact:{height:.07,darkness:1.6,blur:.6,opacity:.78,falloff:2.2,nearestSurface:!0,resolution:1024}},model:{targetSize:.5,cameraFitOffset:1.6,cameraAim:-.015},turntable:{enabled:!0,radiusScale:1,lift:.012},turnExport:{duration:12,fps:30,bitrate:8e6,photoStep:45,name:"cup-360"},ui:{toastDuration:2500,screenshotName:"cup-viewer.png",screenshotShare:"auto",dragAndDrop:!0,uploadButton:!0}});var Ki={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},$i={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},nm=0,Bh=1,im=2;var Jo=1,sm=2,ri=3,Rn=0,cn=1,yn=2;var Ht=0,Es=1,zh=2,kh=3,Hh=4,el=5,An=100,rm=101,om=102,Vh=103,Gh=104,ks=200,am=201,cm=202,lm=203,yc=204,Mc=205,Qo=206,hm=207,ea=208,um=209,dm=210,fm=211,pm=212,mm=213,gm=214,vm=0,_m=1,xm=2,So=3,ym=4,Mm=5,Sm=6,bm=7,Td=0,Em=1,wm=2,Wn=0,wr=1,tl=2,nl=3,Hs=4,Tm=5,Ji=6,Wh="attached",Am="detached",Ad=300,As=301,Rs=302,Sc=303,bc=304,ta=306,Vt=1e3,Nt=1001,lr=1002,Pt=1003,bo=1004;var sr=1005;var bt=1006,il=1007;var Bn=1008;var Xn=1009,Rm=1010,Cm=1011,sl=1012,Rd=1013,Si=1014,tn=1015,It=1016,Cd=1017,Pd=1018,ci=1020,Pm=1021,on=1023,Im=1024,Lm=1025,Xi=1026,Ei=1027,rl=1028,Id=1029,Dm=1030,Ld=1031,Dd=1033,Ha=33776,Va=33777,Ga=33778,Wa=33779,Xh=35840,qh=35841,Yh=35842,Zh=35843,Ud=36196,jh=37492,Kh=37496,$h=37808,Jh=37809,Qh=37810,eu=37811,tu=37812,nu=37813,iu=37814,su=37815,ru=37816,ou=37817,au=37818,cu=37819,lu=37820,hu=37821,Xa=36492,uu=36494,du=36495,Um=36283,fu=36284,pu=36285,mu=36286;var Cs=2300,Yi=2301,qa=2302,gu=2400,vu=2401,_u=2402,Nm=2500;var Nd=0,na=1,Tr=2,Od=3e3,qi=3001,Om=3200,Fm=3201,ol=0,Bm=1,an="",lt="srgb",Et="srgb-linear",al="display-p3",ia="display-p3-linear",Eo="linear",yt="srgb",wo="rec709",To="p3";var ss=7680;var xu=519,zm=512,km=513,Hm=514,Fd=515,Vm=516,Gm=517,Wm=518,Xm=519,Ec=35044;var yu="300 es",wc=1035,ai=2e3,Ao=2001,qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Mu=1234567,rr=Math.PI/180,Ps=180/Math.PI;function Fn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(sn[s&255]+sn[s>>8&255]+sn[s>>16&255]+sn[s>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[t&63|128]+sn[t>>8&255]+"-"+sn[t>>16&255]+sn[t>>24&255]+sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]).toLowerCase()}function Kt(s,e,t){return Math.max(e,Math.min(t,s))}function cl(s,e){return(s%e+e)%e}function qm(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Ym(s,e,t){return s!==e?(t-s)/(e-s):0}function or(s,e,t){return(1-t)*s+t*e}function Zm(s,e,t,n){return or(s,e,1-Math.exp(-t*n))}function jm(s,e=1){return e-Math.abs(cl(s,e*2)-e)}function Km(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function $m(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Jm(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Qm(s,e){return s+Math.random()*(e-s)}function eg(s){return s*(.5-Math.random())}function tg(s){s!==void 0&&(Mu=s);let e=Mu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ng(s){return s*rr}function ig(s){return s*Ps}function Tc(s){return(s&s-1)===0&&s!==0}function sg(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Ro(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function rg(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,c*u,c*d,a*l);break;case"YZY":s.set(c*d,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*d,a*h,a*l);break;case"XZX":s.set(a*h,c*g,c*f,a*l);break;case"YXY":s.set(c*f,a*h,c*g,a*l);break;case"ZYZ":s.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Gn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function _t(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Ut={DEG2RAD:rr,RAD2DEG:Ps,generateUUID:Fn,clamp:Kt,euclideanModulo:cl,mapLinear:qm,inverseLerp:Ym,lerp:or,damp:Zm,pingpong:jm,smoothstep:Km,smootherstep:$m,randInt:Jm,randFloat:Qm,randFloatSpread:eg,seededRandom:tg,degToRad:ng,radToDeg:ig,isPowerOfTwo:Tc,ceilPowerOfTwo:sg,floorPowerOfTwo:Ro,setQuaternionFromProperEuler:rg,normalize:_t,denormalize:Gn},Re=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},st=class s{constructor(e,t,n,i,r,o,a,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l)}set(e,t,n,i,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=i[0],m=i[3],p=i[6],S=i[1],y=i[4],A=i[7],O=i[2],I=i[5],P=i[8];return r[0]=o*v+a*S+c*O,r[3]=o*m+a*y+c*I,r[6]=o*p+a*A+c*P,r[1]=l*v+h*S+u*O,r[4]=l*m+h*y+u*I,r[7]=l*p+h*A+u*P,r[2]=d*v+f*S+g*O,r[5]=d*m+f*y+g*I,r[8]=d*p+f*A+g*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=u*v,e[1]=(i*l-h*n)*v,e[2]=(a*n-i*o)*v,e[3]=d*v,e[4]=(h*t-i*c)*v,e[5]=(i*r-a*t)*v,e[6]=f*v,e[7]=(n*c-l*t)*v,e[8]=(o*t-n*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ya.makeScale(e,t)),this}rotate(e){return this.premultiply(Ya.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ya.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ya=new st;function Bd(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function hr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function og(){let s=hr("canvas");return s.style.display="block",s}var Su={};function ar(s){s in Su||(Su[s]=!0,console.warn(s))}var bu=new st().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Eu=new st().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Yr={[Et]:{transfer:Eo,primaries:wo,toReference:s=>s,fromReference:s=>s},[lt]:{transfer:yt,primaries:wo,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[ia]:{transfer:Eo,primaries:To,toReference:s=>s.applyMatrix3(Eu),fromReference:s=>s.applyMatrix3(bu)},[al]:{transfer:yt,primaries:To,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Eu),fromReference:s=>s.applyMatrix3(bu).convertLinearToSRGB()}},ag=new Set([Et,ia]),dt={enabled:!0,_workingColorSpace:Et,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!ag.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;let n=Yr[e].toReference,i=Yr[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Yr[s].primaries},getTransfer:function(s){return s===an?Eo:Yr[s].transfer}};function ws(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Za(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var rs,Co=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{rs===void 0&&(rs=hr("canvas")),rs.width=e.width,rs.height=e.height;let n=rs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=rs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=hr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=ws(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ws(t[n]/255)*255):t[n]=ws(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},cg=0,Po=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cg++}),this.uuid=Fn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(ja(i[o].image)):r.push(ja(i[o]))}else r=ja(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function ja(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Co.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var lg=0,Gt=class s extends qn{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Nt,i=Nt,r=bt,o=Bn,a=on,c=Xn,l=s.DEFAULT_ANISOTROPY,h=an){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lg++}),this.uuid=Fn(),this.name="",this.source=new Po(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Re(0,0),this.repeat=new Re(1,1),this.center=new Re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(ar("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===qi?lt:an),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ad)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vt:e.x=e.x-Math.floor(e.x);break;case Nt:e.x=e.x<0?0:1;break;case lr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Vt:e.y=e.y-Math.floor(e.y);break;case Nt:e.y=e.y<0?0:1;break;case lr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ar("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===lt?qi:Od}set encoding(e){ar("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===qi?lt:an}};Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=Ad;Gt.DEFAULT_ANISOTROPY=1;var Mt=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,A=(f+1)/2,O=(p+1)/2,I=(h+d)/4,P=(u+v)/4,k=(g+m)/4;return y>A&&y>O?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=I/n,r=P/n):A>O?A<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(A),n=I/i,r=k/i):O<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(O),n=P/r,i=k/r),this.set(n,i,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-v)/S,this.z=(d-h)/S,this.w=Math.acos((l+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ac=class extends qn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t);let i={width:e,height:t,depth:1};n.encoding!==void 0&&(ar("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===qi?lt:an),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Gt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Po(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Wt=class extends Ac{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Io=class extends Gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=Nt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rc=class extends Gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=Nt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var pn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(u!==v||c!==d||l!==f||h!==g){let m=1-a,p=c*d+l*f+h*g+u*v,S=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let O=Math.sqrt(y),I=Math.atan2(O,p*S);m=Math.sin(m*I)/O,a=Math.sin(a*I)/O}let A=a*S;if(c=c*m+d*A,l=l*m+f*A,h=h*m+g*A,u=u*m+v*A,m===1-a){let O=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=O,l*=O,h*=O,u*=O}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-a*f,e[t+2]=l*g+h*f+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(r/2),d=c(n/2),f=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Kt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(wu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(wu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=i+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ka.copy(this).projectOnVector(e),this.sub(Ka)}reflect(e){return this.sub(Ka.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ka=new B,wu=new pn,nn=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Un):Un.fromBufferAttribute(r,o),Un.applyMatrix4(e.matrixWorld),this.expandByPoint(Un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Zr.copy(n.boundingBox)),Zr.applyMatrix4(e.matrixWorld),this.union(Zr)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Un),Un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($s),jr.subVectors(this.max,$s),os.subVectors(e.a,$s),as.subVectors(e.b,$s),cs.subVectors(e.c,$s),vi.subVectors(as,os),_i.subVectors(cs,as),zi.subVectors(os,cs);let t=[0,-vi.z,vi.y,0,-_i.z,_i.y,0,-zi.z,zi.y,vi.z,0,-vi.x,_i.z,0,-_i.x,zi.z,0,-zi.x,-vi.y,vi.x,0,-_i.y,_i.x,0,-zi.y,zi.x,0];return!$a(t,os,as,cs,jr)||(t=[1,0,0,0,1,0,0,0,1],!$a(t,os,as,cs,jr))?!1:(Kr.crossVectors(vi,_i),t=[Kr.x,Kr.y,Kr.z],$a(t,os,as,cs,jr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Qn=[new B,new B,new B,new B,new B,new B,new B,new B],Un=new B,Zr=new nn,os=new B,as=new B,cs=new B,vi=new B,_i=new B,zi=new B,$s=new B,jr=new B,Kr=new B,ki=new B;function $a(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ki.fromArray(s,r);let a=i.x*Math.abs(ki.x)+i.y*Math.abs(ki.y)+i.z*Math.abs(ki.z),c=e.dot(ki),l=t.dot(ki),h=n.dot(ki);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var hg=new nn,Js=new B,Ja=new B,Mn=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):hg.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Js.subVectors(e,this.center);let t=Js.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Js,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ja.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Js.copy(e.center).add(Ja)),this.expandByPoint(Js.copy(e.center).sub(Ja))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},ei=new B,Qa=new B,$r=new B,xi=new B,ec=new B,Jr=new B,tc=new B,li=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Qa.copy(e).add(t).multiplyScalar(.5),$r.copy(t).sub(e).normalize(),xi.copy(this.origin).sub(Qa);let r=e.distanceTo(t)*.5,o=-this.direction.dot($r),a=xi.dot(this.direction),c=-xi.dot($r),l=xi.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Qa).addScaledVector($r,d),f}intersectSphere(e,t){ei.subVectors(e.center,this.origin);let n=ei.dot(this.direction),i=ei.dot(ei)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,n,i,r){ec.subVectors(t,e),Jr.subVectors(n,e),tc.crossVectors(ec,Jr);let o=this.direction.dot(tc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;xi.subVectors(this.origin,e);let c=a*this.direction.dot(Jr.crossVectors(xi,Jr));if(c<0)return null;let l=a*this.direction.dot(ec.cross(xi));if(l<0||c+l>o)return null;let h=-a*xi.dot(tc);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ke=class s{constructor(e,t,n,i,r,o,a,c,l,h,u,d,f,g,v,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l,h,u,d,f,g,v,m)}set(e,t,n,i,r,o,a,c,l,h,u,d,f,g,v,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/ls.setFromMatrixColumn(e,0).length(),r=1/ls.setFromMatrixColumn(e,1).length(),o=1/ls.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,g=a*h,v=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-v*l,t[9]=-a*c,t[2]=v-d*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,g=l*h,v=l*u;t[0]=d+v*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=v+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,g=l*h,v=l*u;t[0]=d-v*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=v-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,f=o*u,g=a*h,v=a*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+v,t[1]=c*u,t[5]=v*l+d,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,f=o*l,g=a*c,v=a*l;t[0]=c*h,t[4]=v-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-v*u}else if(e.order==="XZY"){let d=o*c,f=o*l,g=a*c,v=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+v,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ug,e,dg)}lookAt(e,t,n){let i=this.elements;return vn.subVectors(e,t),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),yi.crossVectors(n,vn),yi.lengthSq()===0&&(Math.abs(n.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),yi.crossVectors(n,vn)),yi.normalize(),Qr.crossVectors(vn,yi),i[0]=yi.x,i[4]=Qr.x,i[8]=vn.x,i[1]=yi.y,i[5]=Qr.y,i[9]=vn.y,i[2]=yi.z,i[6]=Qr.z,i[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],S=n[3],y=n[7],A=n[11],O=n[15],I=i[0],P=i[4],k=i[8],M=i[12],w=i[1],H=i[5],X=i[9],se=i[13],D=i[2],V=i[6],W=i[10],ne=i[14],ie=i[3],J=i[7],te=i[11],ae=i[15];return r[0]=o*I+a*w+c*D+l*ie,r[4]=o*P+a*H+c*V+l*J,r[8]=o*k+a*X+c*W+l*te,r[12]=o*M+a*se+c*ne+l*ae,r[1]=h*I+u*w+d*D+f*ie,r[5]=h*P+u*H+d*V+f*J,r[9]=h*k+u*X+d*W+f*te,r[13]=h*M+u*se+d*ne+f*ae,r[2]=g*I+v*w+m*D+p*ie,r[6]=g*P+v*H+m*V+p*J,r[10]=g*k+v*X+m*W+p*te,r[14]=g*M+v*se+m*ne+p*ae,r[3]=S*I+y*w+A*D+O*ie,r[7]=S*P+y*H+A*V+O*J,r[11]=S*k+y*X+A*W+O*te,r[15]=S*M+y*se+A*ne+O*ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*c*u-i*l*u-r*a*d+n*l*d+i*a*f-n*c*f)+v*(+t*c*f-t*l*d+r*o*d-i*o*f+i*l*h-r*c*h)+m*(+t*l*u-t*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-i*a*h-t*c*u+t*a*d+i*o*u-n*o*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],S=u*m*l-v*d*l+v*c*f-a*m*f-u*c*p+a*d*p,y=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,A=h*v*l-g*u*l+g*a*f-o*v*f-h*a*p+o*u*p,O=g*u*c-h*v*c-g*a*d+o*v*d+h*a*m-o*u*m,I=t*S+n*y+i*A+r*O;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/I;return e[0]=S*P,e[1]=(v*d*r-u*m*r-v*i*f+n*m*f+u*i*p-n*d*p)*P,e[2]=(a*m*r-v*c*r+v*i*l-n*m*l-a*i*p+n*c*p)*P,e[3]=(u*c*r-a*d*r-u*i*l+n*d*l+a*i*f-n*c*f)*P,e[4]=y*P,e[5]=(h*m*r-g*d*r+g*i*f-t*m*f-h*i*p+t*d*p)*P,e[6]=(g*c*r-o*m*r-g*i*l+t*m*l+o*i*p-t*c*p)*P,e[7]=(o*d*r-h*c*r+h*i*l-t*d*l-o*i*f+t*c*f)*P,e[8]=A*P,e[9]=(g*u*r-h*v*r-g*n*f+t*v*f+h*n*p-t*u*p)*P,e[10]=(o*v*r-g*a*r+g*n*l-t*v*l-o*n*p+t*a*p)*P,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*f-t*a*f)*P,e[12]=O*P,e[13]=(h*v*i-g*u*i+g*n*d-t*v*d-h*n*m+t*u*m)*P,e[14]=(g*a*i-o*v*i-g*n*c+t*v*c+o*n*m-t*a*m)*P,e[15]=(o*u*i-h*a*i+h*n*c-t*u*c-o*n*d+t*a*d)*P,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,v=o*h,m=o*u,p=a*u,S=c*l,y=c*h,A=c*u,O=n.x,I=n.y,P=n.z;return i[0]=(1-(v+p))*O,i[1]=(f+A)*O,i[2]=(g-y)*O,i[3]=0,i[4]=(f-A)*I,i[5]=(1-(d+p))*I,i[6]=(m+S)*I,i[7]=0,i[8]=(g+y)*P,i[9]=(m-S)*P,i[10]=(1-(d+v))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=ls.set(i[0],i[1],i[2]).length(),o=ls.set(i[4],i[5],i[6]).length(),a=ls.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Nn.copy(this);let l=1/r,h=1/o,u=1/a;return Nn.elements[0]*=l,Nn.elements[1]*=l,Nn.elements[2]*=l,Nn.elements[4]*=h,Nn.elements[5]*=h,Nn.elements[6]*=h,Nn.elements[8]*=u,Nn.elements[9]*=u,Nn.elements[10]*=u,t.setFromRotationMatrix(Nn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=ai){let c=this.elements,l=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i),f,g;if(a===ai)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ao)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=ai){let c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*l,f=(n+i)*h,g,v;if(a===ai)g=(o+r)*u,v=-2*u;else if(a===Ao)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ls=new B,Nn=new Ke,ug=new B(0,0,0),dg=new B(1,1,1),yi=new B,Qr=new B,vn=new B,Tu=new Ke,Au=new pn,Lo=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Kt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Kt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Kt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Tu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Tu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Au.setFromEuler(this),this.setFromQuaternion(Au,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Lo.DEFAULT_ORDER="XYZ";var ur=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},fg=0,Ru=new B,hs=new pn,ti=new Ke,eo=new B,Qs=new B,pg=new B,mg=new pn,Cu=new B(1,0,0),Pu=new B(0,1,0),Iu=new B(0,0,1),gg={type:"added"},vg={type:"removed"},Lt=class s extends qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fg++}),this.uuid=Fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new B,t=new Lo,n=new pn,i=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ke},normalMatrix:{value:new st}}),this.matrix=new Ke,this.matrixWorld=new Ke,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ur,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hs.setFromAxisAngle(e,t),this.quaternion.multiply(hs),this}rotateOnWorldAxis(e,t){return hs.setFromAxisAngle(e,t),this.quaternion.premultiply(hs),this}rotateX(e){return this.rotateOnAxis(Cu,e)}rotateY(e){return this.rotateOnAxis(Pu,e)}rotateZ(e){return this.rotateOnAxis(Iu,e)}translateOnAxis(e,t){return Ru.copy(e).applyQuaternion(this.quaternion),this.position.add(Ru.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Cu,e)}translateY(e){return this.translateOnAxis(Pu,e)}translateZ(e){return this.translateOnAxis(Iu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?eo.copy(e):eo.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(Qs,eo,this.up):ti.lookAt(eo,Qs,this.up),this.quaternion.setFromRotationMatrix(ti),i&&(ti.extractRotation(i.matrixWorld),hs.setFromRotationMatrix(ti),this.quaternion.premultiply(hs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(gg)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(vg)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(ti),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,e,pg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,mg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++){let a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};Lt.DEFAULT_UP=new B(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var On=new B,ni=new B,nc=new B,ii=new B,us=new B,ds=new B,Lu=new B,ic=new B,sc=new B,rc=new B,to=!1,Ms=class s{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),On.subVectors(e,t),i.cross(On);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){On.subVectors(i,t),ni.subVectors(n,t),nc.subVectors(e,t);let o=On.dot(On),a=On.dot(ni),c=On.dot(nc),l=ni.dot(ni),h=ni.dot(nc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ii)===null?!1:ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getUV(e,t,n,i,r,o,a,c){return to===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),to=!0),this.getInterpolation(e,t,n,i,r,o,a,c)}static getInterpolation(e,t,n,i,r,o,a,c){return this.getBarycoord(e,t,n,i,ii)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ii.x),c.addScaledVector(o,ii.y),c.addScaledVector(a,ii.z),c)}static isFrontFacing(e,t,n,i){return On.subVectors(n,t),ni.subVectors(e,t),On.cross(ni).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return On.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),On.cross(ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return to===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),to=!0),s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;us.subVectors(i,n),ds.subVectors(r,n),ic.subVectors(e,n);let c=us.dot(ic),l=ds.dot(ic);if(c<=0&&l<=0)return t.copy(n);sc.subVectors(e,i);let h=us.dot(sc),u=ds.dot(sc);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(us,o);rc.subVectors(e,r);let f=us.dot(rc),g=ds.dot(rc);if(g>=0&&f<=g)return t.copy(r);let v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(ds,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Lu.subVectors(r,i),a=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(Lu,a);let p=1/(m+v+d);return o=v*p,a=d*p,t.copy(n).addScaledVector(us,o).addScaledVector(ds,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},zd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mi={h:0,s:0,l:0},no={h:0,s:0,l:0};function oc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Le=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=lt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=dt.workingColorSpace){if(e=cl(e,1),t=Kt(t,0,1),n=Kt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=oc(o,r,e+1/3),this.g=oc(o,r,e),this.b=oc(o,r,e-1/3)}return dt.toWorkingColorSpace(this,i),this}setStyle(e,t=lt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=lt){let n=zd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ws(e.r),this.g=ws(e.g),this.b=ws(e.b),this}copyLinearToSRGB(e){return this.r=Za(e.r),this.g=Za(e.g),this.b=Za(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=lt){return dt.fromWorkingColorSpace(rn.copy(this),e),Math.round(Kt(rn.r*255,0,255))*65536+Math.round(Kt(rn.g*255,0,255))*256+Math.round(Kt(rn.b*255,0,255))}getHexString(e=lt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(rn.copy(this),t);let n=rn.r,i=rn.g,r=rn.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(rn.copy(this),t),e.r=rn.r,e.g=rn.g,e.b=rn.b,e}getStyle(e=lt){dt.fromWorkingColorSpace(rn.copy(this),e);let t=rn.r,n=rn.g,i=rn.b;return e!==lt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Mi),this.setHSL(Mi.h+e,Mi.s+t,Mi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mi),e.getHSL(no);let n=or(Mi.h,no.h,t),i=or(Mi.s,no.s,t),r=or(Mi.l,no.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},rn=new Le;Le.NAMES=zd;var _g=0,fn=class extends qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_g++}),this.uuid=Fn(),this.name="",this.type="Material",this.blending=Es,this.side=Rn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yc,this.blendDst=Mc,this.blendEquation=An,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Le(0,0,0),this.blendAlpha=0,this.depthFunc=So,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ss,this.stencilZFail=ss,this.stencilZPass=ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Es&&(n.blending=this.blending),this.side!==Rn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==yc&&(n.blendSrc=this.blendSrc),this.blendDst!==Mc&&(n.blendDst=this.blendDst),this.blendEquation!==An&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==So&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ss&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ss&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ss&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Bt=class extends fn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Td,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},oi=xg();function xg(){let s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[c|256]=32768,i[c]=24,i[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,i[c]=-l-1,i[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,i[c]=13,i[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,i[c]=24,i[c|256]=24):(n[c]=31744,n[c|256]=64512,i[c]=13,i[c|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;(l&8388608)===0;)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function yg(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=Kt(s,-65504,65504),oi.floatView[0]=s;let e=oi.uint32View[0],t=e>>23&511;return oi.baseTable[t]+((e&8388607)>>oi.shiftTable[t])}function Mg(s){let e=s>>10;return oi.uint32View[0]=oi.mantissaTable[oi.offsetTable[e]+(s&1023)]+oi.exponentTable[e],oi.floatView[0]}var Li={toHalfFloat:yg,fromHalfFloat:Mg},Ft=new B,io=new Re,At=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ec,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=tn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)io.fromBufferAttribute(this,t),io.applyMatrix3(e),this.setXY(t,io.x,io.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Gn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Gn(t,this.array)),t}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Gn(t,this.array)),t}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Gn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Gn(t,this.array)),t}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array),r=_t(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ec&&(e.usage=this.usage),e}};var Do=class extends At{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Uo=class extends At{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Rt=class extends At{constructor(e,t,n){super(new Float32Array(e),t,n)}};var Sg=0,Tn=new Ke,ac=new Lt,fs=new B,_n=new nn,er=new nn,jt=new B,Xt=class s extends qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sg++}),this.uuid=Fn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bd(e)?Uo:Do)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new st().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Tn.makeRotationFromQuaternion(e),this.applyMatrix4(Tn),this}rotateX(e){return Tn.makeRotationX(e),this.applyMatrix4(Tn),this}rotateY(e){return Tn.makeRotationY(e),this.applyMatrix4(Tn),this}rotateZ(e){return Tn.makeRotationZ(e),this.applyMatrix4(Tn),this}translate(e,t,n){return Tn.makeTranslation(e,t,n),this.applyMatrix4(Tn),this}scale(e,t,n){return Tn.makeScale(e,t,n),this.applyMatrix4(Tn),this}lookAt(e){return ac.lookAt(e),ac.updateMatrix(),this.applyMatrix4(ac.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Rt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new nn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];er.setFromBufferAttribute(a),this.morphTargetsRelative?(jt.addVectors(_n.min,er.min),_n.expandByPoint(jt),jt.addVectors(_n.max,er.max),_n.expandByPoint(jt)):(_n.expandByPoint(er.min),_n.expandByPoint(er.max))}_n.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)jt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(jt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)jt.fromBufferAttribute(a,l),c&&(fs.fromBufferAttribute(e,l),jt.add(fs)),i=Math.max(i,n.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,i=t.position.array,r=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new At(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let w=0;w<a;w++)l[w]=new B,h[w]=new B;let u=new B,d=new B,f=new B,g=new Re,v=new Re,m=new Re,p=new B,S=new B;function y(w,H,X){u.fromArray(i,w*3),d.fromArray(i,H*3),f.fromArray(i,X*3),g.fromArray(o,w*2),v.fromArray(o,H*2),m.fromArray(o,X*2),d.sub(u),f.sub(u),v.sub(g),m.sub(g);let se=1/(v.x*m.y-m.x*v.y);isFinite(se)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-v.y).multiplyScalar(se),S.copy(f).multiplyScalar(v.x).addScaledVector(d,-m.x).multiplyScalar(se),l[w].add(p),l[H].add(p),l[X].add(p),h[w].add(S),h[H].add(S),h[X].add(S))}let A=this.groups;A.length===0&&(A=[{start:0,count:n.length}]);for(let w=0,H=A.length;w<H;++w){let X=A[w],se=X.start,D=X.count;for(let V=se,W=se+D;V<W;V+=3)y(n[V+0],n[V+1],n[V+2])}let O=new B,I=new B,P=new B,k=new B;function M(w){P.fromArray(r,w*3),k.copy(P);let H=l[w];O.copy(H),O.sub(P.multiplyScalar(P.dot(H))).normalize(),I.crossVectors(k,H);let se=I.dot(h[w])<0?-1:1;c[w*4]=O.x,c[w*4+1]=O.y,c[w*4+2]=O.z,c[w*4+3]=se}for(let w=0,H=A.length;w<H;++w){let X=A[w],se=X.start,D=X.count;for(let V=se,W=se+D;V<W;V+=3)M(n[V+0]),M(n[V+1]),M(n[V+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new At(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new B,r=new B,o=new B,a=new B,c=new B,l=new B,h=new B,u=new B;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)jt.fromBufferAttribute(e,t),jt.normalize(),e.setXYZ(t,jt.x,jt.y,jt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,g=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?f=c[v]*a.data.stride+a.offset:f=c[v]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new At(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Du=new Ke,Hi=new li,so=new Mn,Uu=new B,ps=new B,ms=new B,gs=new B,cc=new B,ro=new B,oo=new Re,ao=new Re,co=new Re,Nu=new B,Ou=new B,Fu=new B,lo=new B,ho=new B,at=class extends Lt{constructor(e=new Xt,t=new Bt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){ro.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(cc.fromBufferAttribute(u,e),o?ro.addScaledVector(cc,h):ro.addScaledVector(cc.sub(t),h))}t.add(ro)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(r),Hi.copy(e.ray).recast(e.near),!(so.containsPoint(Hi.origin)===!1&&(Hi.intersectSphere(so,Uu)===null||Hi.origin.distanceToSquared(Uu)>(e.far-e.near)**2))&&(Du.copy(r).invert(),Hi.copy(e.ray).applyMatrix4(Du),!(n.boundingBox!==null&&Hi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Hi)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){let m=d[g],p=o[m.materialIndex],S=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let A=S,O=y;A<O;A+=3){let I=a.getX(A),P=a.getX(A+1),k=a.getX(A+2);i=uo(this,p,e,n,l,h,u,I,P,k),i&&(i.faceIndex=Math.floor(A/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){let S=a.getX(m),y=a.getX(m+1),A=a.getX(m+2);i=uo(this,o,e,n,l,h,u,S,y,A),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){let m=d[g],p=o[m.materialIndex],S=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let A=S,O=y;A<O;A+=3){let I=A,P=A+1,k=A+2;i=uo(this,p,e,n,l,h,u,I,P,k),i&&(i.faceIndex=Math.floor(A/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){let S=m,y=m+1,A=m+2;i=uo(this,o,e,n,l,h,u,S,y,A),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function bg(s,e,t,n,i,r,o,a){let c;if(e.side===cn?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,e.side===Rn,a),c===null)return null;ho.copy(a),ho.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(ho);return l<t.near||l>t.far?null:{distance:l,point:ho.clone(),object:s}}function uo(s,e,t,n,i,r,o,a,c,l){s.getVertexPosition(a,ps),s.getVertexPosition(c,ms),s.getVertexPosition(l,gs);let h=bg(s,e,t,n,ps,ms,gs,lo);if(h){i&&(oo.fromBufferAttribute(i,a),ao.fromBufferAttribute(i,c),co.fromBufferAttribute(i,l),h.uv=Ms.getInterpolation(lo,ps,ms,gs,oo,ao,co,new Re)),r&&(oo.fromBufferAttribute(r,a),ao.fromBufferAttribute(r,c),co.fromBufferAttribute(r,l),h.uv1=Ms.getInterpolation(lo,ps,ms,gs,oo,ao,co,new Re),h.uv2=h.uv1),o&&(Nu.fromBufferAttribute(o,a),Ou.fromBufferAttribute(o,c),Fu.fromBufferAttribute(o,l),h.normal=Ms.getInterpolation(lo,ps,ms,gs,Nu,Ou,Fu,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new B,materialIndex:0};Ms.getNormal(ps,ms,gs,u.normal),h.face=u}return h}var dr=class s extends Xt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Rt(l,3)),this.setAttribute("normal",new Rt(h,3)),this.setAttribute("uv",new Rt(u,2));function g(v,m,p,S,y,A,O,I,P,k,M){let w=A/P,H=O/k,X=A/2,se=O/2,D=I/2,V=P+1,W=k+1,ne=0,ie=0,J=new B;for(let te=0;te<W;te++){let ae=te*H-se;for(let ue=0;ue<V;ue++){let j=ue*w-X;J[v]=j*S,J[m]=ae*y,J[p]=D,l.push(J.x,J.y,J.z),J[v]=0,J[m]=0,J[p]=I>0?1:-1,h.push(J.x,J.y,J.z),u.push(ue/P),u.push(1-te/k),ne+=1}}for(let te=0;te<k;te++)for(let ae=0;ae<P;ae++){let ue=d+ae+V*te,j=d+ae+V*(te+1),re=d+(ae+1)+V*(te+1),Se=d+(ae+1)+V*te;c.push(ue,j,Se),c.push(j,re,Se),ie+=6}a.addGroup(f,ie,M),f+=ie,d+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Is(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function dn(s){let e={};for(let t=0;t<s.length;t++){let n=Is(s[t]);for(let i in n)e[i]=n[i]}return e}function Eg(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function kd(s){return s.getRenderTarget()===null?s.outputColorSpace:dt.workingColorSpace}var zn={clone:Is,merge:dn},wg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Dt=class extends fn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wg,this.fragmentShader=Tg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Is(e.uniforms),this.uniformsGroups=Eg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},No=class extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ke,this.projectionMatrix=new Ke,this.projectionMatrixInverse=new Ke,this.coordinateSystem=ai}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},zt=class extends No{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ps*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(rr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ps*2*Math.atan(Math.tan(rr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(rr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},vs=-90,_s=1,Cc=class extends Lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new zt(vs,_s,e,t);i.layers=this.layers,this.add(i);let r=new zt(vs,_s,e,t);r.layers=this.layers,this.add(r);let o=new zt(vs,_s,e,t);o.layers=this.layers,this.add(o);let a=new zt(vs,_s,e,t);a.layers=this.layers,this.add(a);let c=new zt(vs,_s,e,t);c.layers=this.layers,this.add(c);let l=new zt(vs,_s,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===ai)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ao)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Oo=class extends Gt{constructor(e,t,n,i,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:As,super(e,t,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Pc=class extends Wt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(ar("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===qi?lt:an),this.texture=new Oo(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:bt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new dr(5,5,5),r=new Dt({name:"CubemapFromEquirect",uniforms:Is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:cn,blending:Ht});r.uniforms.tEquirect.value=t;let o=new at(i,r),a=t.minFilter;return t.minFilter===Bn&&(t.minFilter=bt),new Cc(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},lc=new B,Ag=new B,Rg=new st,xn=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=lc.subVectors(n,t).cross(Ag.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(lc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Rg.getNormalMatrix(e),i=this.coplanarPoint(lc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Vi=new Mn,fo=new B,fr=class{constructor(e=new xn,t=new xn,n=new xn,i=new xn,r=new xn,o=new xn){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ai){let n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],v=i[10],m=i[11],p=i[12],S=i[13],y=i[14],A=i[15];if(n[0].setComponents(c-r,d-l,m-f,A-p).normalize(),n[1].setComponents(c+r,d+l,m+f,A+p).normalize(),n[2].setComponents(c+o,d+h,m+g,A+S).normalize(),n[3].setComponents(c-o,d-h,m-g,A-S).normalize(),n[4].setComponents(c-a,d-u,m-v,A-y).normalize(),t===ai)n[5].setComponents(c+a,d+u,m+v,A+y).normalize();else if(t===Ao)n[5].setComponents(a,u,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(e){return Vi.center.set(0,0,0),Vi.radius=.7071067811865476,Vi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(fo.x=i.normal.x>0?e.max.x:e.min.x,fo.y=i.normal.y>0?e.max.y:e.min.y,fo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(fo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Hd(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Cg(s,e){let t=e.isWebGL2,n=new WeakMap;function i(l,h){let u=l.array,d=l.usage,f=u.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,u,d),l.onUploadCallback();let v;if(u instanceof Float32Array)v=s.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)v=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)v=s.SHORT;else if(u instanceof Uint32Array)v=s.UNSIGNED_INT;else if(u instanceof Int32Array)v=s.INT;else if(u instanceof Int8Array)v=s.BYTE;else if(u instanceof Uint8Array)v=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)v=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:v,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:f}}function r(l,h,u){let d=h.array,f=h._updateRange,g=h.updateRanges;if(s.bindBuffer(u,l),f.count===-1&&g.length===0&&s.bufferSubData(u,0,d),g.length!==0){for(let v=0,m=g.length;v<m;v++){let p=g[v];t?s.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):s.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(t?s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);h&&(s.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);if(u===void 0)n.set(l,i(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}var Sn=class s extends Xt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=e/a,d=t/c,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){let S=p*d-o;for(let y=0;y<l;y++){let A=y*u-r;g.push(A,-S,0),v.push(0,0,1),m.push(y/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<a;S++){let y=S+l*p,A=S+l*(p+1),O=S+1+l*(p+1),I=S+1+l*p;f.push(y,A,I),f.push(A,O,I)}this.setIndex(f),this.setAttribute("position",new Rt(g,3)),this.setAttribute("normal",new Rt(v,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},Pg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ig=`#ifdef USE_ALPHAHASH
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
#endif`,Lg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ug=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ng=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Og=`#ifdef USE_AOMAP
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
#endif`,Fg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bg=`#ifdef USE_BATCHING
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
#endif`,zg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,kg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gg=`#ifdef USE_IRIDESCENCE
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
#endif`,Wg=`#ifdef USE_BUMPMAP
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
#endif`,Xg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,qg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Kg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$g=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Jg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Qg=`#define PI 3.141592653589793
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
} // validated`,e0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,t0=`vec3 transformedNormal = objectNormal;
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
#endif`,n0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,i0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,s0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,r0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,o0="gl_FragColor = linearToOutputTexel( gl_FragColor );",a0=`
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
}`,c0=`#ifdef USE_ENVMAP
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
#endif`,l0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,h0=`#ifdef USE_ENVMAP
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
#endif`,u0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,d0=`#ifdef USE_ENVMAP
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
#endif`,f0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,p0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,m0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,g0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,v0=`#ifdef USE_GRADIENTMAP
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
}`,_0=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,x0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,y0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,M0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,S0=`uniform bool receiveShadow;
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
#endif`,b0=`#ifdef USE_ENVMAP
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
#endif`,E0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,w0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,T0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,A0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,R0=`PhysicalMaterial material;
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
#endif`,C0=`struct PhysicalMaterial {
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
}`,P0=`
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
#endif`,I0=`#if defined( RE_IndirectDiffuse )
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
#endif`,L0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,D0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,U0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,N0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,O0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,F0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,B0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,z0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,k0=`#if defined( USE_POINTS_UV )
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
#endif`,H0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,V0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,G0=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,W0=`#ifdef USE_MORPHNORMALS
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
#endif`,X0=`#ifdef USE_MORPHTARGETS
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
#endif`,q0=`#ifdef USE_MORPHTARGETS
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
#endif`,Y0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Z0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,j0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,K0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,J0=`#ifdef USE_NORMALMAP
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
#endif`,Q0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ev=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,nv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,iv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,rv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ov=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,av=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,pv=`float getShadowMask() {
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
}`,mv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gv=`#ifdef USE_SKINNING
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
#endif`,vv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_v=`#ifdef USE_SKINNING
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
#endif`,xv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,bv=`#ifdef USE_TRANSMISSION
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
#endif`,Ev=`#ifdef USE_TRANSMISSION
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
#endif`,wv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Av=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Cv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pv=`uniform sampler2D t2D;
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
}`,Iv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Dv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nv=`#include <common>
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
}`,Ov=`#if DEPTH_PACKING == 3200
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
}`,Fv=`#define DISTANCE
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
}`,Bv=`#define DISTANCE
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
}`,zv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hv=`uniform float scale;
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
}`,Vv=`uniform vec3 diffuse;
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
}`,Gv=`#include <common>
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
}`,Wv=`uniform vec3 diffuse;
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
}`,Xv=`#define LAMBERT
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
}`,qv=`#define LAMBERT
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
}`,Yv=`#define MATCAP
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
}`,Zv=`#define MATCAP
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
}`,jv=`#define NORMAL
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
}`,Kv=`#define NORMAL
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
}`,$v=`#define PHONG
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
}`,Jv=`#define PHONG
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
}`,Qv=`#define STANDARD
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
}`,e_=`#define STANDARD
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
}`,t_=`#define TOON
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
}`,n_=`#define TOON
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
}`,i_=`uniform float size;
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
}`,s_=`uniform vec3 diffuse;
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
}`,r_=`#include <common>
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
}`,o_=`uniform vec3 color;
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
}`,a_=`uniform float rotation;
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
}`,c_=`uniform vec3 diffuse;
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
}`,it={alphahash_fragment:Pg,alphahash_pars_fragment:Ig,alphamap_fragment:Lg,alphamap_pars_fragment:Dg,alphatest_fragment:Ug,alphatest_pars_fragment:Ng,aomap_fragment:Og,aomap_pars_fragment:Fg,batching_pars_vertex:Bg,batching_vertex:zg,begin_vertex:kg,beginnormal_vertex:Hg,bsdfs:Vg,iridescence_fragment:Gg,bumpmap_pars_fragment:Wg,clipping_planes_fragment:Xg,clipping_planes_pars_fragment:qg,clipping_planes_pars_vertex:Yg,clipping_planes_vertex:Zg,color_fragment:jg,color_pars_fragment:Kg,color_pars_vertex:$g,color_vertex:Jg,common:Qg,cube_uv_reflection_fragment:e0,defaultnormal_vertex:t0,displacementmap_pars_vertex:n0,displacementmap_vertex:i0,emissivemap_fragment:s0,emissivemap_pars_fragment:r0,colorspace_fragment:o0,colorspace_pars_fragment:a0,envmap_fragment:c0,envmap_common_pars_fragment:l0,envmap_pars_fragment:h0,envmap_pars_vertex:u0,envmap_physical_pars_fragment:b0,envmap_vertex:d0,fog_vertex:f0,fog_pars_vertex:p0,fog_fragment:m0,fog_pars_fragment:g0,gradientmap_pars_fragment:v0,lightmap_fragment:_0,lightmap_pars_fragment:x0,lights_lambert_fragment:y0,lights_lambert_pars_fragment:M0,lights_pars_begin:S0,lights_toon_fragment:E0,lights_toon_pars_fragment:w0,lights_phong_fragment:T0,lights_phong_pars_fragment:A0,lights_physical_fragment:R0,lights_physical_pars_fragment:C0,lights_fragment_begin:P0,lights_fragment_maps:I0,lights_fragment_end:L0,logdepthbuf_fragment:D0,logdepthbuf_pars_fragment:U0,logdepthbuf_pars_vertex:N0,logdepthbuf_vertex:O0,map_fragment:F0,map_pars_fragment:B0,map_particle_fragment:z0,map_particle_pars_fragment:k0,metalnessmap_fragment:H0,metalnessmap_pars_fragment:V0,morphcolor_vertex:G0,morphnormal_vertex:W0,morphtarget_pars_vertex:X0,morphtarget_vertex:q0,normal_fragment_begin:Y0,normal_fragment_maps:Z0,normal_pars_fragment:j0,normal_pars_vertex:K0,normal_vertex:$0,normalmap_pars_fragment:J0,clearcoat_normal_fragment_begin:Q0,clearcoat_normal_fragment_maps:ev,clearcoat_pars_fragment:tv,iridescence_pars_fragment:nv,opaque_fragment:iv,packing:sv,premultiplied_alpha_fragment:rv,project_vertex:ov,dithering_fragment:av,dithering_pars_fragment:cv,roughnessmap_fragment:lv,roughnessmap_pars_fragment:hv,shadowmap_pars_fragment:uv,shadowmap_pars_vertex:dv,shadowmap_vertex:fv,shadowmask_pars_fragment:pv,skinbase_vertex:mv,skinning_pars_vertex:gv,skinning_vertex:vv,skinnormal_vertex:_v,specularmap_fragment:xv,specularmap_pars_fragment:yv,tonemapping_fragment:Mv,tonemapping_pars_fragment:Sv,transmission_fragment:bv,transmission_pars_fragment:Ev,uv_pars_fragment:wv,uv_pars_vertex:Tv,uv_vertex:Av,worldpos_vertex:Rv,background_vert:Cv,background_frag:Pv,backgroundCube_vert:Iv,backgroundCube_frag:Lv,cube_vert:Dv,cube_frag:Uv,depth_vert:Nv,depth_frag:Ov,distanceRGBA_vert:Fv,distanceRGBA_frag:Bv,equirect_vert:zv,equirect_frag:kv,linedashed_vert:Hv,linedashed_frag:Vv,meshbasic_vert:Gv,meshbasic_frag:Wv,meshlambert_vert:Xv,meshlambert_frag:qv,meshmatcap_vert:Yv,meshmatcap_frag:Zv,meshnormal_vert:jv,meshnormal_frag:Kv,meshphong_vert:$v,meshphong_frag:Jv,meshphysical_vert:Qv,meshphysical_frag:e_,meshtoon_vert:t_,meshtoon_frag:n_,points_vert:i_,points_frag:s_,shadow_vert:r_,shadow_frag:o_,sprite_vert:a_,sprite_frag:c_},we={common:{diffuse:{value:new Le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new Re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new Le(16777215)},opacity:{value:1},center:{value:new Re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},Vn={basic:{uniforms:dn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:dn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Le(0)}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:dn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Le(0)},specular:{value:new Le(1118481)},shininess:{value:30}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:dn([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new Le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:dn([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new Le(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:dn([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:dn([we.points,we.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:dn([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:dn([we.common,we.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:dn([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:dn([we.sprite,we.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distanceRGBA:{uniforms:dn([we.common,we.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distanceRGBA_vert,fragmentShader:it.distanceRGBA_frag},shadow:{uniforms:dn([we.lights,we.fog,{color:{value:new Le(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};Vn.physical={uniforms:dn([Vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new Re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new Le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new Re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new Le(0)},specularColor:{value:new Le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new Re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};var po={r:0,b:0,g:0};function l_(s,e,t,n,i,r,o){let a=new Le(0),c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(m,p){let S=!1,y=p.isScene===!0?p.background:null;y&&y.isTexture&&(y=(p.backgroundBlurriness>0?t:e).get(y)),y===null?v(a,c):y&&y.isColor&&(v(y,1),S=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||S)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),y&&(y.isCubeTexture||y.mapping===ta)?(h===void 0&&(h=new at(new dr(1,1,1),new Dt({name:"BackgroundCubeMaterial",uniforms:Is(Vn.backgroundCube.uniforms),vertexShader:Vn.backgroundCube.vertexShader,fragmentShader:Vn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(O,I,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=dt.getTransfer(y.colorSpace)!==yt,(u!==y||d!==y.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,f=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new at(new Sn(2,2),new Dt({name:"BackgroundMaterial",uniforms:Is(Vn.background.uniforms),vertexShader:Vn.background.vertexShader,fragmentShader:Vn.background.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=dt.getTransfer(y.colorSpace)!==yt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,f=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function v(m,p){m.getRGB(po,kd(s)),n.buffers.color.setClear(po.r,po.g,po.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,v(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,v(a,c)},render:g}}function h_(s,e,t,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null),l=c,h=!1;function u(D,V,W,ne,ie){let J=!1;if(o){let te=v(ne,W,V);l!==te&&(l=te,f(l.object)),J=p(D,ne,W,ie),J&&S(D,ne,W,ie)}else{let te=V.wireframe===!0;(l.geometry!==ne.id||l.program!==W.id||l.wireframe!==te)&&(l.geometry=ne.id,l.program=W.id,l.wireframe=te,J=!0)}ie!==null&&t.update(ie,s.ELEMENT_ARRAY_BUFFER),(J||h)&&(h=!1,k(D,V,W,ne),ie!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(ie).buffer))}function d(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function f(D){return n.isWebGL2?s.bindVertexArray(D):r.bindVertexArrayOES(D)}function g(D){return n.isWebGL2?s.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function v(D,V,W){let ne=W.wireframe===!0,ie=a[D.id];ie===void 0&&(ie={},a[D.id]=ie);let J=ie[V.id];J===void 0&&(J={},ie[V.id]=J);let te=J[ne];return te===void 0&&(te=m(d()),J[ne]=te),te}function m(D){let V=[],W=[],ne=[];for(let ie=0;ie<i;ie++)V[ie]=0,W[ie]=0,ne[ie]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:W,attributeDivisors:ne,object:D,attributes:{},index:null}}function p(D,V,W,ne){let ie=l.attributes,J=V.attributes,te=0,ae=W.getAttributes();for(let ue in ae)if(ae[ue].location>=0){let re=ie[ue],Se=J[ue];if(Se===void 0&&(ue==="instanceMatrix"&&D.instanceMatrix&&(Se=D.instanceMatrix),ue==="instanceColor"&&D.instanceColor&&(Se=D.instanceColor)),re===void 0||re.attribute!==Se||Se&&re.data!==Se.data)return!0;te++}return l.attributesNum!==te||l.index!==ne}function S(D,V,W,ne){let ie={},J=V.attributes,te=0,ae=W.getAttributes();for(let ue in ae)if(ae[ue].location>=0){let re=J[ue];re===void 0&&(ue==="instanceMatrix"&&D.instanceMatrix&&(re=D.instanceMatrix),ue==="instanceColor"&&D.instanceColor&&(re=D.instanceColor));let Se={};Se.attribute=re,re&&re.data&&(Se.data=re.data),ie[ue]=Se,te++}l.attributes=ie,l.attributesNum=te,l.index=ne}function y(){let D=l.newAttributes;for(let V=0,W=D.length;V<W;V++)D[V]=0}function A(D){O(D,0)}function O(D,V){let W=l.newAttributes,ne=l.enabledAttributes,ie=l.attributeDivisors;W[D]=1,ne[D]===0&&(s.enableVertexAttribArray(D),ne[D]=1),ie[D]!==V&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,V),ie[D]=V)}function I(){let D=l.newAttributes,V=l.enabledAttributes;for(let W=0,ne=V.length;W<ne;W++)V[W]!==D[W]&&(s.disableVertexAttribArray(W),V[W]=0)}function P(D,V,W,ne,ie,J,te){te===!0?s.vertexAttribIPointer(D,V,W,ie,J):s.vertexAttribPointer(D,V,W,ne,ie,J)}function k(D,V,W,ne){if(n.isWebGL2===!1&&(D.isInstancedMesh||ne.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();let ie=ne.attributes,J=W.getAttributes(),te=V.defaultAttributeValues;for(let ae in J){let ue=J[ae];if(ue.location>=0){let j=ie[ae];if(j===void 0&&(ae==="instanceMatrix"&&D.instanceMatrix&&(j=D.instanceMatrix),ae==="instanceColor"&&D.instanceColor&&(j=D.instanceColor)),j!==void 0){let re=j.normalized,Se=j.itemSize,_e=t.get(j);if(_e===void 0)continue;let Te=_e.buffer,Ue=_e.type,Ge=_e.bytesPerElement,Ne=n.isWebGL2===!0&&(Ue===s.INT||Ue===s.UNSIGNED_INT||j.gpuType===Rd);if(j.isInterleavedBufferAttribute){let tt=j.data,Z=tt.stride,wt=j.offset;if(tt.isInstancedInterleavedBuffer){for(let Oe=0;Oe<ue.locationSize;Oe++)O(ue.location+Oe,tt.meshPerAttribute);D.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Oe=0;Oe<ue.locationSize;Oe++)A(ue.location+Oe);s.bindBuffer(s.ARRAY_BUFFER,Te);for(let Oe=0;Oe<ue.locationSize;Oe++)P(ue.location+Oe,Se/ue.locationSize,Ue,re,Z*Ge,(wt+Se/ue.locationSize*Oe)*Ge,Ne)}else{if(j.isInstancedBufferAttribute){for(let tt=0;tt<ue.locationSize;tt++)O(ue.location+tt,j.meshPerAttribute);D.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let tt=0;tt<ue.locationSize;tt++)A(ue.location+tt);s.bindBuffer(s.ARRAY_BUFFER,Te);for(let tt=0;tt<ue.locationSize;tt++)P(ue.location+tt,Se/ue.locationSize,Ue,re,Se*Ge,Se/ue.locationSize*tt*Ge,Ne)}}else if(te!==void 0){let re=te[ae];if(re!==void 0)switch(re.length){case 2:s.vertexAttrib2fv(ue.location,re);break;case 3:s.vertexAttrib3fv(ue.location,re);break;case 4:s.vertexAttrib4fv(ue.location,re);break;default:s.vertexAttrib1fv(ue.location,re)}}}}I()}function M(){X();for(let D in a){let V=a[D];for(let W in V){let ne=V[W];for(let ie in ne)g(ne[ie].object),delete ne[ie];delete V[W]}delete a[D]}}function w(D){if(a[D.id]===void 0)return;let V=a[D.id];for(let W in V){let ne=V[W];for(let ie in ne)g(ne[ie].object),delete ne[ie];delete V[W]}delete a[D.id]}function H(D){for(let V in a){let W=a[V];if(W[D.id]===void 0)continue;let ne=W[D.id];for(let ie in ne)g(ne[ie].object),delete ne[ie];delete W[D.id]}}function X(){se(),h=!0,l!==c&&(l=c,f(l.object))}function se(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:X,resetDefaultState:se,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfProgram:H,initAttributes:y,enableAttribute:A,disableUnusedAttributes:I}}function u_(s,e,t,n){let i=n.isWebGL2,r;function o(h){r=h}function a(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,d){if(d===0)return;let f,g;if(i)f=s,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,u,d),t.update(u,r,d)}function l(h,u,d){if(d===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=u[v];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function d_(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext",a=t.precision!==void 0?t.precision:"highp",c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),S=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=d>0,A=o||e.has("OES_texture_float"),O=y&&A,I=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:S,vertexTextures:y,floatFragmentTextures:A,floatVertexTextures:O,maxSamples:I}}function f_(s){let e=this,t=null,n=0,i=!1,r=!1,o=new xn,a=new st,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{let S=r?0:n,y=S*4,A=p.clippingState||null;c.value=A,A=h(g,d,y,f);for(let O=0;O!==y;++O)A[O]=t[O];p.clippingState=A,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let v=u!==null?u.length:0,m=null;if(v!==0){if(m=c.value,g!==!0||m===null){let p=f+v*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,A=f;y!==v;++y,A+=4)o.copy(u[y]).applyMatrix4(S,a),o.normal.toArray(m,A),m[A+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function p_(s){let e=new WeakMap;function t(o,a){return a===Sc?o.mapping=As:a===bc&&(o.mapping=Rs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Sc||a===bc)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Pc(c.height/2);return l.fromEquirectangularTexture(s,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Yn=class extends No{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ss=4,Bu=[.125,.215,.35,.446,.526,.582],Wi=20,hc=new Yn,zu=new Le,uc=null,dc=0,fc=0,Gi=(1+Math.sqrt(5))/2,xs=1/Gi,ku=[new B(1,1,1),new B(-1,1,1),new B(1,1,-1),new B(-1,1,-1),new B(0,Gi,xs),new B(0,Gi,-xs),new B(xs,0,Gi),new B(-xs,0,Gi),new B(Gi,xs,0),new B(-Gi,xs,0)],Zn=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){uc=this._renderer.getRenderTarget(),dc=this._renderer.getActiveCubeFace(),fc=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(uc,dc,fc),e.scissorTest=!1,mo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===As||e.mapping===Rs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),uc=this._renderer.getRenderTarget(),dc=this._renderer.getActiveCubeFace(),fc=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:bt,minFilter:bt,generateMipmaps:!1,type:It,format:on,colorSpace:Et,depthBuffer:!1},i=Hu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hu(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=m_(r)),this._blurMaterial=g_(r,e,t)}return i}_compileMaterial(e){let t=new at(this._lodPlanes[0],e);this._renderer.compile(t,hc)}_sceneToCubeUV(e,t,n,i){let a=new zt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(zu),h.toneMapping=Wn,h.autoClear=!1;let f=new Bt({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),g=new at(new dr,f),v=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,v=!0):(f.color.copy(zu),v=!0);for(let p=0;p<6;p++){let S=p%3;S===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):S===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let y=this._cubeSize;mo(i,S*y,p>2?y:0,y,y),h.setRenderTarget(i),v&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===As||e.mapping===Rs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vu());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new at(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;mo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,hc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=ku[(i-1)%ku.length];this._blur(e,i-1,i,r,o)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new at(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Wi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):Wi;m>Wi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Wi}`);let p=[],S=0;for(let P=0;P<Wi;++P){let k=P/v,M=Math.exp(-k*k/2);p.push(M),P===0?S+=M:P<m&&(S+=2*M)}for(let P=0;P<p.length;P++)p[P]=p[P]/S;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;let A=this._sizeLods[i],O=3*A*(i>y-Ss?i-y+Ss:0),I=4*(this._cubeSize-A);mo(t,O,I,3*A,2*A),c.setRenderTarget(t),c.render(u,hc)}};function m_(s){let e=[],t=[],n=[],i=s,r=s-Ss+1+Bu.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let c=1/a;o>s-Ss?c=Bu[o-s+Ss-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,S=new Float32Array(v*g*f),y=new Float32Array(m*g*f),A=new Float32Array(p*g*f);for(let I=0;I<f;I++){let P=I%3*2/3-1,k=I>2?0:-1,M=[P,k,0,P+2/3,k,0,P+2/3,k+1,0,P,k,0,P+2/3,k+1,0,P,k+1,0];S.set(M,v*g*I),y.set(d,m*g*I);let w=[I,I,I,I,I,I];A.set(w,p*g*I)}let O=new Xt;O.setAttribute("position",new At(S,v)),O.setAttribute("uv",new At(y,m)),O.setAttribute("faceIndex",new At(A,p)),e.push(O),i>Ss&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Hu(s,e,t){let n=new Wt(s,e,t);return n.texture.mapping=ta,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function mo(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function g_(s,e,t){let n=new Float32Array(Wi),i=new B(0,1,0);return new Dt({name:"SphericalGaussianBlur",defines:{n:Wi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ll(),fragmentShader:`

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
		`,blending:Ht,depthTest:!1,depthWrite:!1})}function Vu(){return new Dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ll(),fragmentShader:`

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
		`,blending:Ht,depthTest:!1,depthWrite:!1})}function Gu(){return new Dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ht,depthTest:!1,depthWrite:!1})}function ll(){return`

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
	`}function v_(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Sc||c===bc,h=c===As||c===Rs;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new Zn(s)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{let u=a.image;if(l&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new Zn(s));let d=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function i(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function __(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function x_(s,e,t,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let v=d.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)e.remove(v[m])}d.removeEventListener("dispose",o),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let g in d)e.update(d[g],s.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let v=f[g];for(let m=0,p=v.length;m<p;m++)e.update(v[m],s.ARRAY_BUFFER)}}function l(u){let d=[],f=u.index,g=u.attributes.position,v=0;if(f!==null){let S=f.array;v=f.version;for(let y=0,A=S.length;y<A;y+=3){let O=S[y+0],I=S[y+1],P=S[y+2];d.push(O,I,I,P,P,O)}}else if(g!==void 0){let S=g.array;v=g.version;for(let y=0,A=S.length/3-1;y<A;y+=3){let O=y+0,I=y+1,P=y+2;d.push(O,I,I,P,P,O)}}else return;let m=new(Bd(d)?Uo:Do)(d,1);m.version=v;let p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function y_(s,e,t,n){let i=n.isWebGL2,r;function o(f){r=f}let a,c;function l(f){a=f.type,c=f.bytesPerElement}function h(f,g){s.drawElements(r,g,a,f*c),t.update(g,r,1)}function u(f,g,v){if(v===0)return;let m,p;if(i)m=s,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,f*c,v),t.update(g,r,v)}function d(f,g,v){if(v===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<v;p++)this.render(f[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,f,0,v);let p=0;for(let S=0;S<v;S++)p+=g[S];t.update(p,r,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function M_(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function S_(s,e){return s[0]-e[0]}function b_(s,e){return Math.abs(e[1])-Math.abs(s[1])}function E_(s,e,t){let n={},i=new Float32Array(8),r=new WeakMap,o=new Mt,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){let d=l.morphTargetInfluences;if(e.isWebGL2===!0){let f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=f!==void 0?f.length:0,v=r.get(h);if(v===void 0||v.count!==g){let D=function(){X.dispose(),r.delete(h),h.removeEventListener("dispose",D)};v!==void 0&&v.texture.dispose();let S=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,A=h.morphAttributes.color!==void 0,O=h.morphAttributes.position||[],I=h.morphAttributes.normal||[],P=h.morphAttributes.color||[],k=0;S===!0&&(k=1),y===!0&&(k=2),A===!0&&(k=3);let M=h.attributes.position.count*k,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let H=new Float32Array(M*w*4*g),X=new Io(H,M,w,g);X.type=tn,X.needsUpdate=!0;let se=k*4;for(let V=0;V<g;V++){let W=O[V],ne=I[V],ie=P[V],J=M*w*4*V;for(let te=0;te<W.count;te++){let ae=te*se;S===!0&&(o.fromBufferAttribute(W,te),H[J+ae+0]=o.x,H[J+ae+1]=o.y,H[J+ae+2]=o.z,H[J+ae+3]=0),y===!0&&(o.fromBufferAttribute(ne,te),H[J+ae+4]=o.x,H[J+ae+5]=o.y,H[J+ae+6]=o.z,H[J+ae+7]=0),A===!0&&(o.fromBufferAttribute(ie,te),H[J+ae+8]=o.x,H[J+ae+9]=o.y,H[J+ae+10]=o.z,H[J+ae+11]=ie.itemSize===4?o.w:1)}}v={count:g,texture:X,size:new Re(M,w)},r.set(h,v),h.addEventListener("dispose",D)}let m=0;for(let S=0;S<d.length;S++)m+=d[S];let p=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(s,"morphTargetBaseInfluence",p),u.getUniforms().setValue(s,"morphTargetInfluences",d),u.getUniforms().setValue(s,"morphTargetsTexture",v.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",v.size)}else{let f=d===void 0?0:d.length,g=n[h.id];if(g===void 0||g.length!==f){g=[];for(let y=0;y<f;y++)g[y]=[y,0];n[h.id]=g}for(let y=0;y<f;y++){let A=g[y];A[0]=y,A[1]=d[y]}g.sort(b_);for(let y=0;y<8;y++)y<f&&g[y][1]?(a[y][0]=g[y][0],a[y][1]=g[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(S_);let v=h.morphAttributes.position,m=h.morphAttributes.normal,p=0;for(let y=0;y<8;y++){let A=a[y],O=A[0],I=A[1];O!==Number.MAX_SAFE_INTEGER&&I?(v&&h.getAttribute("morphTarget"+y)!==v[O]&&h.setAttribute("morphTarget"+y,v[O]),m&&h.getAttribute("morphNormal"+y)!==m[O]&&h.setAttribute("morphNormal"+y,m[O]),i[y]=I,p+=I):(v&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),m&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),i[y]=0)}let S=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(s,"morphTargetBaseInfluence",S),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function w_(s,e,t,n){let i=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var Ls=class extends Gt{constructor(e,t,n,i,r,o,a,c,l,h){if(h=h!==void 0?h:Xi,h!==Xi&&h!==Ei)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Xi&&(n=Si),n===void 0&&h===Ei&&(n=ci),super(null,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Pt,this.minFilter=c!==void 0?c:Pt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Vd=new Gt,Gd=new Ls(1,1);Gd.compareFunction=Fd;var Wd=new Io,Xd=new Rc,qd=new Oo,Wu=[],Xu=[],qu=new Float32Array(16),Yu=new Float32Array(9),Zu=new Float32Array(4);function Vs(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=Wu[i];if(r===void 0&&(r=new Float32Array(i),Wu[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function qt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Yt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function sa(s,e){let t=Xu[e];t===void 0&&(t=new Int32Array(e),Xu[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function T_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function A_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;s.uniform2fv(this.addr,e),Yt(t,e)}}function R_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(qt(t,e))return;s.uniform3fv(this.addr,e),Yt(t,e)}}function C_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;s.uniform4fv(this.addr,e),Yt(t,e)}}function P_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,n))return;Zu.set(n),s.uniformMatrix2fv(this.addr,!1,Zu),Yt(t,n)}}function I_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,n))return;Yu.set(n),s.uniformMatrix3fv(this.addr,!1,Yu),Yt(t,n)}}function L_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,n))return;qu.set(n),s.uniformMatrix4fv(this.addr,!1,qu),Yt(t,n)}}function D_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function U_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;s.uniform2iv(this.addr,e),Yt(t,e)}}function N_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;s.uniform3iv(this.addr,e),Yt(t,e)}}function O_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;s.uniform4iv(this.addr,e),Yt(t,e)}}function F_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function B_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;s.uniform2uiv(this.addr,e),Yt(t,e)}}function z_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;s.uniform3uiv(this.addr,e),Yt(t,e)}}function k_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;s.uniform4uiv(this.addr,e),Yt(t,e)}}function H_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?Gd:Vd;t.setTexture2D(e||r,i)}function V_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Xd,i)}function G_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||qd,i)}function W_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Wd,i)}function X_(s){switch(s){case 5126:return T_;case 35664:return A_;case 35665:return R_;case 35666:return C_;case 35674:return P_;case 35675:return I_;case 35676:return L_;case 5124:case 35670:return D_;case 35667:case 35671:return U_;case 35668:case 35672:return N_;case 35669:case 35673:return O_;case 5125:return F_;case 36294:return B_;case 36295:return z_;case 36296:return k_;case 35678:case 36198:case 36298:case 36306:case 35682:return H_;case 35679:case 36299:case 36307:return V_;case 35680:case 36300:case 36308:case 36293:return G_;case 36289:case 36303:case 36311:case 36292:return W_}}function q_(s,e){s.uniform1fv(this.addr,e)}function Y_(s,e){let t=Vs(e,this.size,2);s.uniform2fv(this.addr,t)}function Z_(s,e){let t=Vs(e,this.size,3);s.uniform3fv(this.addr,t)}function j_(s,e){let t=Vs(e,this.size,4);s.uniform4fv(this.addr,t)}function K_(s,e){let t=Vs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function $_(s,e){let t=Vs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function J_(s,e){let t=Vs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Q_(s,e){s.uniform1iv(this.addr,e)}function ex(s,e){s.uniform2iv(this.addr,e)}function tx(s,e){s.uniform3iv(this.addr,e)}function nx(s,e){s.uniform4iv(this.addr,e)}function ix(s,e){s.uniform1uiv(this.addr,e)}function sx(s,e){s.uniform2uiv(this.addr,e)}function rx(s,e){s.uniform3uiv(this.addr,e)}function ox(s,e){s.uniform4uiv(this.addr,e)}function ax(s,e,t){let n=this.cache,i=e.length,r=sa(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),Yt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Vd,r[o])}function cx(s,e,t){let n=this.cache,i=e.length,r=sa(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),Yt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Xd,r[o])}function lx(s,e,t){let n=this.cache,i=e.length,r=sa(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),Yt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||qd,r[o])}function hx(s,e,t){let n=this.cache,i=e.length,r=sa(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),Yt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Wd,r[o])}function ux(s){switch(s){case 5126:return q_;case 35664:return Y_;case 35665:return Z_;case 35666:return j_;case 35674:return K_;case 35675:return $_;case 35676:return J_;case 5124:case 35670:return Q_;case 35667:case 35671:return ex;case 35668:case 35672:return tx;case 35669:case 35673:return nx;case 5125:return ix;case 36294:return sx;case 36295:return rx;case 36296:return ox;case 35678:case 36198:case 36298:case 36306:case 35682:return ax;case 35679:case 36299:case 36307:return cx;case 35680:case 36300:case 36308:case 36293:return lx;case 36289:case 36303:case 36311:case 36292:return hx}}var Ic=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=X_(t.type)}},Lc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ux(t.type)}},Dc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},pc=/(\w+)(\])?(\[|\.)?/g;function ju(s,e){s.seq.push(e),s.map[e.id]=e}function dx(s,e,t){let n=s.name,i=n.length;for(pc.lastIndex=0;;){let r=pc.exec(n),o=pc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){ju(t,l===void 0?new Ic(a,s,e):new Lc(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new Dc(a),ju(t,u)),t=u}}}var Ts=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);dx(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function Ku(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var fx=37297,px=0;function mx(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function gx(s){let e=dt.getPrimaries(dt.workingColorSpace),t=dt.getPrimaries(s),n;switch(e===t?n="":e===To&&t===wo?n="LinearDisplayP3ToLinearSRGB":e===wo&&t===To&&(n="LinearSRGBToLinearDisplayP3"),s){case Et:case ia:return[n,"LinearTransferOETF"];case lt:case al:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function $u(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+mx(s.getShaderSource(e),o)}else return i}function vx(s,e){let t=gx(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function _x(s,e){let t;switch(e){case wr:t="Linear";break;case tl:t="Reinhard";break;case nl:t="OptimizedCineon";break;case Hs:t="ACESFilmic";break;case Ji:t="AgX";break;case Tm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function xx(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(bs).join(`
`)}function yx(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(bs).join(`
`)}function Mx(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Sx(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function bs(s){return s!==""}function Ju(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qu(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var bx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uc(s){return s.replace(bx,wx)}var Ex=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function wx(s,e){let t=it[e];if(t===void 0){let n=Ex.get(e);if(n!==void 0)t=it[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Uc(t)}var Tx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ed(s){return s.replace(Tx,Ax)}function Ax(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function td(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Rx(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Jo?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===sm?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ri&&(e="SHADOWMAP_TYPE_VSM"),e}function Cx(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case As:case Rs:e="ENVMAP_TYPE_CUBE";break;case ta:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Px(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Rs:e="ENVMAP_MODE_REFRACTION";break}return e}function Ix(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Td:e="ENVMAP_BLENDING_MULTIPLY";break;case Em:e="ENVMAP_BLENDING_MIX";break;case wm:e="ENVMAP_BLENDING_ADD";break}return e}function Lx(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Dx(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Rx(t),l=Cx(t),h=Px(t),u=Ix(t),d=Lx(t),f=t.isWebGL2?"":xx(t),g=yx(t),v=Mx(r),m=i.createProgram(),p,S,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(bs).join(`
`),p.length>0&&(p+=`
`),S=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(bs).join(`
`),S.length>0&&(S+=`
`)):(p=[td(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(bs).join(`
`),S=[f,td(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Wn?"#define TONE_MAPPING":"",t.toneMapping!==Wn?it.tonemapping_pars_fragment:"",t.toneMapping!==Wn?_x("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,vx("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(bs).join(`
`)),o=Uc(o),o=Ju(o,t),o=Qu(o,t),a=Uc(a),a=Ju(a,t),a=Qu(a,t),o=ed(o),a=ed(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,S=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===yu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);let A=y+p+o,O=y+S+a,I=Ku(i,i.VERTEX_SHADER,A),P=Ku(i,i.FRAGMENT_SHADER,O);i.attachShader(m,I),i.attachShader(m,P),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function k(X){if(s.debug.checkShaderErrors){let se=i.getProgramInfoLog(m).trim(),D=i.getShaderInfoLog(I).trim(),V=i.getShaderInfoLog(P).trim(),W=!0,ne=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(W=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,I,P);else{let ie=$u(i,I,"vertex"),J=$u(i,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+se+`
`+ie+`
`+J)}else se!==""?console.warn("THREE.WebGLProgram: Program Info Log:",se):(D===""||V==="")&&(ne=!1);ne&&(X.diagnostics={runnable:W,programLog:se,vertexShader:{log:D,prefix:p},fragmentShader:{log:V,prefix:S}})}i.deleteShader(I),i.deleteShader(P),M=new Ts(i,m),w=Sx(i,m)}let M;this.getUniforms=function(){return M===void 0&&k(this),M};let w;this.getAttributes=function(){return w===void 0&&k(this),w};let H=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=i.getProgramParameter(m,fx)),H},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=px++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=I,this.fragmentShader=P,this}var Ux=0,Nc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Oc(e),t.set(e,n)),n}},Oc=class{constructor(e){this.id=Ux++,this.code=e,this.usedTimes=0}};function Nx(s,e,t,n,i,r,o){let a=new ur,c=new Nc,l=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return M===0?"uv":`uv${M}`}function m(M,w,H,X,se){let D=X.fog,V=se.geometry,W=M.isMeshStandardMaterial?X.environment:null,ne=(M.isMeshStandardMaterial?t:e).get(M.envMap||W),ie=ne&&ne.mapping===ta?ne.image.height:null,J=g[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let te=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ae=te!==void 0?te.length:0,ue=0;V.morphAttributes.position!==void 0&&(ue=1),V.morphAttributes.normal!==void 0&&(ue=2),V.morphAttributes.color!==void 0&&(ue=3);let j,re,Se,_e;if(J){let Jt=Vn[J];j=Jt.vertexShader,re=Jt.fragmentShader}else j=M.vertexShader,re=M.fragmentShader,c.update(M),Se=c.getVertexShaderID(M),_e=c.getFragmentShaderID(M);let Te=s.getRenderTarget(),Ue=se.isInstancedMesh===!0,Ge=se.isBatchedMesh===!0,Ne=!!M.map,tt=!!M.matcap,Z=!!ne,wt=!!M.aoMap,Oe=!!M.lightMap,We=!!M.bumpMap,De=!!M.normalMap,pt=!!M.displacementMap,Ze=!!M.emissiveMap,T=!!M.metalnessMap,b=!!M.roughnessMap,K=M.anisotropy>0,pe=M.clearcoat>0,he=M.iridescence>0,fe=M.sheen>0,Pe=M.transmission>0,Ee=K&&!!M.anisotropyMap,Ae=pe&&!!M.clearcoatMap,Fe=pe&&!!M.clearcoatNormalMap,Xe=pe&&!!M.clearcoatRoughnessMap,le=he&&!!M.iridescenceMap,Je=he&&!!M.iridescenceThicknessMap,L=fe&&!!M.sheenColorMap,oe=fe&&!!M.sheenRoughnessMap,me=!!M.specularMap,ge=!!M.specularColorMap,Ie=!!M.specularIntensityMap,ze=Pe&&!!M.transmissionMap,Be=Pe&&!!M.thicknessMap,je=!!M.gradientMap,q=!!M.alphaMap,z=M.alphaTest>0,xe=!!M.alphaHash,ye=!!M.extensions,qe=!!V.attributes.uv1,ke=!!V.attributes.uv2,ct=!!V.attributes.uv3,ht=Wn;return M.toneMapped&&(Te===null||Te.isXRRenderTarget===!0)&&(ht=s.toneMapping),{isWebGL2:h,shaderID:J,shaderType:M.type,shaderName:M.name,vertexShader:j,fragmentShader:re,defines:M.defines,customVertexShaderID:Se,customFragmentShaderID:_e,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Ge,instancing:Ue,instancingColor:Ue&&se.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Te===null?s.outputColorSpace:Te.isXRRenderTarget===!0?Te.texture.colorSpace:Et,map:Ne,matcap:tt,envMap:Z,envMapMode:Z&&ne.mapping,envMapCubeUVHeight:ie,aoMap:wt,lightMap:Oe,bumpMap:We,normalMap:De,displacementMap:d&&pt,emissiveMap:Ze,normalMapObjectSpace:De&&M.normalMapType===Bm,normalMapTangentSpace:De&&M.normalMapType===ol,metalnessMap:T,roughnessMap:b,anisotropy:K,anisotropyMap:Ee,clearcoat:pe,clearcoatMap:Ae,clearcoatNormalMap:Fe,clearcoatRoughnessMap:Xe,iridescence:he,iridescenceMap:le,iridescenceThicknessMap:Je,sheen:fe,sheenColorMap:L,sheenRoughnessMap:oe,specularMap:me,specularColorMap:ge,specularIntensityMap:Ie,transmission:Pe,transmissionMap:ze,thicknessMap:Be,gradientMap:je,opaque:M.transparent===!1&&M.blending===Es,alphaMap:q,alphaTest:z,alphaHash:xe,combine:M.combine,mapUv:Ne&&v(M.map.channel),aoMapUv:wt&&v(M.aoMap.channel),lightMapUv:Oe&&v(M.lightMap.channel),bumpMapUv:We&&v(M.bumpMap.channel),normalMapUv:De&&v(M.normalMap.channel),displacementMapUv:pt&&v(M.displacementMap.channel),emissiveMapUv:Ze&&v(M.emissiveMap.channel),metalnessMapUv:T&&v(M.metalnessMap.channel),roughnessMapUv:b&&v(M.roughnessMap.channel),anisotropyMapUv:Ee&&v(M.anisotropyMap.channel),clearcoatMapUv:Ae&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:Fe&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Xe&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:L&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:oe&&v(M.sheenRoughnessMap.channel),specularMapUv:me&&v(M.specularMap.channel),specularColorMapUv:ge&&v(M.specularColorMap.channel),specularIntensityMapUv:Ie&&v(M.specularIntensityMap.channel),transmissionMapUv:ze&&v(M.transmissionMap.channel),thicknessMapUv:Be&&v(M.thicknessMap.channel),alphaMapUv:q&&v(M.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(De||K),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,vertexUv1s:qe,vertexUv2s:ke,vertexUv3s:ct,pointsUvs:se.isPoints===!0&&!!V.attributes.uv&&(Ne||q),fog:!!D,useFog:M.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:se.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:ue,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&H.length>0,shadowMapType:s.shadowMap.type,toneMapping:ht,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Ne&&M.map.isVideoTexture===!0&&dt.getTransfer(M.map.colorSpace)===yt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===yn,flipSided:M.side===cn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ye&&M.extensions.derivatives===!0,extensionFragDepth:ye&&M.extensions.fragDepth===!0,extensionDrawBuffers:ye&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ye&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ye&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){let w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(let H in M.defines)w.push(H),w.push(M.defines[H]);return M.isRawShaderMaterial===!1&&(S(w,M),y(w,M),w.push(s.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function S(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function y(M,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),M.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function A(M){let w=g[M.type],H;if(w){let X=Vn[w];H=zn.clone(X.uniforms)}else H=M.uniforms;return H}function O(M,w){let H;for(let X=0,se=l.length;X<se;X++){let D=l[X];if(D.cacheKey===w){H=D,++H.usedTimes;break}}return H===void 0&&(H=new Dx(s,w,M,r),l.push(H)),H}function I(M){if(--M.usedTimes===0){let w=l.indexOf(M);l[w]=l[l.length-1],l.pop(),M.destroy()}}function P(M){c.remove(M)}function k(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:A,acquireProgram:O,releaseProgram:I,releaseShaderCache:P,programs:l,dispose:k}}function Ox(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Fx(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function nd(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function id(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,g,v,m){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),e++,p}function a(u,d,f,g,v,m){let p=o(u,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(u,d,f,g,v,m){let p=o(u,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||Fx),n.length>1&&n.sort(d||nd),i.length>1&&i.sort(d||nd)}function h(){for(let u=e,d=s.length;u<d;u++){let f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function Bx(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new id,s.set(n,[o])):i>=r.length?(o=new id,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function zx(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new Le};break;case"SpotLight":t={position:new B,direction:new B,color:new Le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Le,groundColor:new Le};break;case"RectAreaLight":t={color:new Le,position:new B,halfWidth:new B,halfHeight:new B};break}return s[e.id]=t,t}}}function kx(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Hx=0;function Vx(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Gx(s,e){let t=new zx,n=kx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new B);let r=new B,o=new Ke,a=new Ke;function c(h,u){let d=0,f=0,g=0;for(let X=0;X<9;X++)i.probe[X].set(0,0,0);let v=0,m=0,p=0,S=0,y=0,A=0,O=0,I=0,P=0,k=0,M=0;h.sort(Vx);let w=u===!0?Math.PI:1;for(let X=0,se=h.length;X<se;X++){let D=h[X],V=D.color,W=D.intensity,ne=D.distance,ie=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=V.r*W*w,f+=V.g*W*w,g+=V.b*W*w;else if(D.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(D.sh.coefficients[J],W);M++}else if(D.isDirectionalLight){let J=t.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity*w),D.castShadow){let te=D.shadow,ae=n.get(D);ae.shadowBias=te.bias,ae.shadowNormalBias=te.normalBias,ae.shadowRadius=te.radius,ae.shadowMapSize=te.mapSize,i.directionalShadow[v]=ae,i.directionalShadowMap[v]=ie,i.directionalShadowMatrix[v]=D.shadow.matrix,A++}i.directional[v]=J,v++}else if(D.isSpotLight){let J=t.get(D);J.position.setFromMatrixPosition(D.matrixWorld),J.color.copy(V).multiplyScalar(W*w),J.distance=ne,J.coneCos=Math.cos(D.angle),J.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),J.decay=D.decay,i.spot[p]=J;let te=D.shadow;if(D.map&&(i.spotLightMap[P]=D.map,P++,te.updateMatrices(D),D.castShadow&&k++),i.spotLightMatrix[p]=te.matrix,D.castShadow){let ae=n.get(D);ae.shadowBias=te.bias,ae.shadowNormalBias=te.normalBias,ae.shadowRadius=te.radius,ae.shadowMapSize=te.mapSize,i.spotShadow[p]=ae,i.spotShadowMap[p]=ie,I++}p++}else if(D.isRectAreaLight){let J=t.get(D);J.color.copy(V).multiplyScalar(W),J.halfWidth.set(D.width*.5,0,0),J.halfHeight.set(0,D.height*.5,0),i.rectArea[S]=J,S++}else if(D.isPointLight){let J=t.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity*w),J.distance=D.distance,J.decay=D.decay,D.castShadow){let te=D.shadow,ae=n.get(D);ae.shadowBias=te.bias,ae.shadowNormalBias=te.normalBias,ae.shadowRadius=te.radius,ae.shadowMapSize=te.mapSize,ae.shadowCameraNear=te.camera.near,ae.shadowCameraFar=te.camera.far,i.pointShadow[m]=ae,i.pointShadowMap[m]=ie,i.pointShadowMatrix[m]=D.shadow.matrix,O++}i.point[m]=J,m++}else if(D.isHemisphereLight){let J=t.get(D);J.skyColor.copy(D.color).multiplyScalar(W*w),J.groundColor.copy(D.groundColor).multiplyScalar(W*w),i.hemi[y]=J,y++}}S>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=we.LTC_FLOAT_1,i.rectAreaLTC2=we.LTC_FLOAT_2):(i.rectAreaLTC1=we.LTC_HALF_1,i.rectAreaLTC2=we.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=we.LTC_FLOAT_1,i.rectAreaLTC2=we.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=we.LTC_HALF_1,i.rectAreaLTC2=we.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=g;let H=i.hash;(H.directionalLength!==v||H.pointLength!==m||H.spotLength!==p||H.rectAreaLength!==S||H.hemiLength!==y||H.numDirectionalShadows!==A||H.numPointShadows!==O||H.numSpotShadows!==I||H.numSpotMaps!==P||H.numLightProbes!==M)&&(i.directional.length=v,i.spot.length=p,i.rectArea.length=S,i.point.length=m,i.hemi.length=y,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=O,i.pointShadowMap.length=O,i.spotShadow.length=I,i.spotShadowMap.length=I,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=O,i.spotLightMatrix.length=I+P-k,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=k,i.numLightProbes=M,H.directionalLength=v,H.pointLength=m,H.spotLength=p,H.rectAreaLength=S,H.hemiLength=y,H.numDirectionalShadows=A,H.numPointShadows=O,H.numSpotShadows=I,H.numSpotMaps=P,H.numLightProbes=M,i.version=Hx++)}function l(h,u){let d=0,f=0,g=0,v=0,m=0,p=u.matrixWorldInverse;for(let S=0,y=h.length;S<y;S++){let A=h[S];if(A.isDirectionalLight){let O=i.directional[d];O.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),O.direction.sub(r),O.direction.transformDirection(p),d++}else if(A.isSpotLight){let O=i.spot[g];O.position.setFromMatrixPosition(A.matrixWorld),O.position.applyMatrix4(p),O.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),O.direction.sub(r),O.direction.transformDirection(p),g++}else if(A.isRectAreaLight){let O=i.rectArea[v];O.position.setFromMatrixPosition(A.matrixWorld),O.position.applyMatrix4(p),a.identity(),o.copy(A.matrixWorld),o.premultiply(p),a.extractRotation(o),O.halfWidth.set(A.width*.5,0,0),O.halfHeight.set(0,A.height*.5,0),O.halfWidth.applyMatrix4(a),O.halfHeight.applyMatrix4(a),v++}else if(A.isPointLight){let O=i.point[f];O.position.setFromMatrixPosition(A.matrixWorld),O.position.applyMatrix4(p),f++}else if(A.isHemisphereLight){let O=i.hemi[m];O.direction.setFromMatrixPosition(A.matrixWorld),O.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:i}}function sd(s,e){let t=new Gx(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Wx(s,e){let t=new WeakMap;function n(r,o=0){let a=t.get(r),c;return a===void 0?(c=new sd(s,e),t.set(r,[c])):o>=a.length?(c=new sd(s,e),a.push(c)):c=a[o],c}function i(){t=new WeakMap}return{get:n,dispose:i}}var pr=class extends fn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Om,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Fc=class extends fn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Xx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qx=`uniform sampler2D shadow_pass;
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
}`;function Yx(s,e,t){let n=new fr,i=new Re,r=new Re,o=new Mt,a=new pr({depthPacking:Fm}),c=new Fc,l={},h=t.maxTextureSize,u={[Rn]:cn,[cn]:Rn,[yn]:yn},d=new Dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Re},radius:{value:4}},vertexShader:Xx,fragmentShader:qx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Xt;g.setAttribute("position",new At(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new at(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jo;let p=this.type;this.render=function(I,P,k){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||I.length===0)return;let M=s.getRenderTarget(),w=s.getActiveCubeFace(),H=s.getActiveMipmapLevel(),X=s.state;X.setBlending(Ht),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);let se=p!==ri&&this.type===ri,D=p===ri&&this.type!==ri;for(let V=0,W=I.length;V<W;V++){let ne=I[V],ie=ne.shadow;if(ie===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(ie.autoUpdate===!1&&ie.needsUpdate===!1)continue;i.copy(ie.mapSize);let J=ie.getFrameExtents();if(i.multiply(J),r.copy(ie.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/J.x),i.x=r.x*J.x,ie.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/J.y),i.y=r.y*J.y,ie.mapSize.y=r.y)),ie.map===null||se===!0||D===!0){let ae=this.type!==ri?{minFilter:Pt,magFilter:Pt}:{};ie.map!==null&&ie.map.dispose(),ie.map=new Wt(i.x,i.y,ae),ie.map.texture.name=ne.name+".shadowMap",ie.camera.updateProjectionMatrix()}s.setRenderTarget(ie.map),s.clear();let te=ie.getViewportCount();for(let ae=0;ae<te;ae++){let ue=ie.getViewport(ae);o.set(r.x*ue.x,r.y*ue.y,r.x*ue.z,r.y*ue.w),X.viewport(o),ie.updateMatrices(ne,ae),n=ie.getFrustum(),A(P,k,ie.camera,ne,this.type)}ie.isPointLightShadow!==!0&&this.type===ri&&S(ie,k),ie.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(M,w,H)};function S(I,P){let k=e.update(v);d.defines.VSM_SAMPLES!==I.blurSamples&&(d.defines.VSM_SAMPLES=I.blurSamples,f.defines.VSM_SAMPLES=I.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new Wt(i.x,i.y)),d.uniforms.shadow_pass.value=I.map.texture,d.uniforms.resolution.value=I.mapSize,d.uniforms.radius.value=I.radius,s.setRenderTarget(I.mapPass),s.clear(),s.renderBufferDirect(P,null,k,d,v,null),f.uniforms.shadow_pass.value=I.mapPass.texture,f.uniforms.resolution.value=I.mapSize,f.uniforms.radius.value=I.radius,s.setRenderTarget(I.map),s.clear(),s.renderBufferDirect(P,null,k,f,v,null)}function y(I,P,k,M){let w=null,H=k.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(H!==void 0)w=H;else if(w=k.isPointLight===!0?c:a,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){let X=w.uuid,se=P.uuid,D=l[X];D===void 0&&(D={},l[X]=D);let V=D[se];V===void 0&&(V=w.clone(),D[se]=V,P.addEventListener("dispose",O)),w=V}if(w.visible=P.visible,w.wireframe=P.wireframe,M===ri?w.side=P.shadowSide!==null?P.shadowSide:P.side:w.side=P.shadowSide!==null?P.shadowSide:u[P.side],w.alphaMap=P.alphaMap,w.alphaTest=P.alphaTest,w.map=P.map,w.clipShadows=P.clipShadows,w.clippingPlanes=P.clippingPlanes,w.clipIntersection=P.clipIntersection,w.displacementMap=P.displacementMap,w.displacementScale=P.displacementScale,w.displacementBias=P.displacementBias,w.wireframeLinewidth=P.wireframeLinewidth,w.linewidth=P.linewidth,k.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let X=s.properties.get(w);X.light=k}return w}function A(I,P,k,M,w){if(I.visible===!1)return;if(I.layers.test(P.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&w===ri)&&(!I.frustumCulled||n.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,I.matrixWorld);let se=e.update(I),D=I.material;if(Array.isArray(D)){let V=se.groups;for(let W=0,ne=V.length;W<ne;W++){let ie=V[W],J=D[ie.materialIndex];if(J&&J.visible){let te=y(I,J,M,w);I.onBeforeShadow(s,I,P,k,se,te,ie),s.renderBufferDirect(k,null,se,te,I,ie),I.onAfterShadow(s,I,P,k,se,te,ie)}}}else if(D.visible){let V=y(I,D,M,w);I.onBeforeShadow(s,I,P,k,se,V,null),s.renderBufferDirect(k,null,se,V,I,null),I.onAfterShadow(s,I,P,k,se,V,null)}}let X=I.children;for(let se=0,D=X.length;se<D;se++)A(X[se],P,k,M,w)}function O(I){I.target.removeEventListener("dispose",O);for(let k in l){let M=l[k],w=I.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}function Zx(s,e,t){let n=t.isWebGL2;function i(){let z=!1,xe=new Mt,ye=null,qe=new Mt(0,0,0,0);return{setMask:function(ke){ye!==ke&&!z&&(s.colorMask(ke,ke,ke,ke),ye=ke)},setLocked:function(ke){z=ke},setClear:function(ke,ct,ht,Ot,Jt){Jt===!0&&(ke*=Ot,ct*=Ot,ht*=Ot),xe.set(ke,ct,ht,Ot),qe.equals(xe)===!1&&(s.clearColor(ke,ct,ht,Ot),qe.copy(xe))},reset:function(){z=!1,ye=null,qe.set(-1,0,0,0)}}}function r(){let z=!1,xe=null,ye=null,qe=null;return{setTest:function(ke){ke?Ge(s.DEPTH_TEST):Ne(s.DEPTH_TEST)},setMask:function(ke){xe!==ke&&!z&&(s.depthMask(ke),xe=ke)},setFunc:function(ke){if(ye!==ke){switch(ke){case vm:s.depthFunc(s.NEVER);break;case _m:s.depthFunc(s.ALWAYS);break;case xm:s.depthFunc(s.LESS);break;case So:s.depthFunc(s.LEQUAL);break;case ym:s.depthFunc(s.EQUAL);break;case Mm:s.depthFunc(s.GEQUAL);break;case Sm:s.depthFunc(s.GREATER);break;case bm:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ye=ke}},setLocked:function(ke){z=ke},setClear:function(ke){qe!==ke&&(s.clearDepth(ke),qe=ke)},reset:function(){z=!1,xe=null,ye=null,qe=null}}}function o(){let z=!1,xe=null,ye=null,qe=null,ke=null,ct=null,ht=null,Ot=null,Jt=null;return{setTest:function(vt){z||(vt?Ge(s.STENCIL_TEST):Ne(s.STENCIL_TEST))},setMask:function(vt){xe!==vt&&!z&&(s.stencilMask(vt),xe=vt)},setFunc:function(vt,Qt,wn){(ye!==vt||qe!==Qt||ke!==wn)&&(s.stencilFunc(vt,Qt,wn),ye=vt,qe=Qt,ke=wn)},setOp:function(vt,Qt,wn){(ct!==vt||ht!==Qt||Ot!==wn)&&(s.stencilOp(vt,Qt,wn),ct=vt,ht=Qt,Ot=wn)},setLocked:function(vt){z=vt},setClear:function(vt){Jt!==vt&&(s.clearStencil(vt),Jt=vt)},reset:function(){z=!1,xe=null,ye=null,qe=null,ke=null,ct=null,ht=null,Ot=null,Jt=null}}}let a=new i,c=new r,l=new o,h=new WeakMap,u=new WeakMap,d={},f={},g=new WeakMap,v=[],m=null,p=!1,S=null,y=null,A=null,O=null,I=null,P=null,k=null,M=new Le(0,0,0),w=0,H=!1,X=null,se=null,D=null,V=null,W=null,ne=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ie=!1,J=0,te=s.getParameter(s.VERSION);te.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(te)[1]),ie=J>=1):te.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),ie=J>=2);let ae=null,ue={},j=s.getParameter(s.SCISSOR_BOX),re=s.getParameter(s.VIEWPORT),Se=new Mt().fromArray(j),_e=new Mt().fromArray(re);function Te(z,xe,ye,qe){let ke=new Uint8Array(4),ct=s.createTexture();s.bindTexture(z,ct),s.texParameteri(z,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(z,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ht=0;ht<ye;ht++)n&&(z===s.TEXTURE_3D||z===s.TEXTURE_2D_ARRAY)?s.texImage3D(xe,0,s.RGBA,1,1,qe,0,s.RGBA,s.UNSIGNED_BYTE,ke):s.texImage2D(xe+ht,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ke);return ct}let Ue={};Ue[s.TEXTURE_2D]=Te(s.TEXTURE_2D,s.TEXTURE_2D,1),Ue[s.TEXTURE_CUBE_MAP]=Te(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ue[s.TEXTURE_2D_ARRAY]=Te(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ue[s.TEXTURE_3D]=Te(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Ge(s.DEPTH_TEST),c.setFunc(So),Ze(!1),T(Bh),Ge(s.CULL_FACE),De(Ht);function Ge(z){d[z]!==!0&&(s.enable(z),d[z]=!0)}function Ne(z){d[z]!==!1&&(s.disable(z),d[z]=!1)}function tt(z,xe){return f[z]!==xe?(s.bindFramebuffer(z,xe),f[z]=xe,n&&(z===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=xe),z===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=xe)),!0):!1}function Z(z,xe){let ye=v,qe=!1;if(z)if(ye=g.get(xe),ye===void 0&&(ye=[],g.set(xe,ye)),z.isWebGLMultipleRenderTargets){let ke=z.texture;if(ye.length!==ke.length||ye[0]!==s.COLOR_ATTACHMENT0){for(let ct=0,ht=ke.length;ct<ht;ct++)ye[ct]=s.COLOR_ATTACHMENT0+ct;ye.length=ke.length,qe=!0}}else ye[0]!==s.COLOR_ATTACHMENT0&&(ye[0]=s.COLOR_ATTACHMENT0,qe=!0);else ye[0]!==s.BACK&&(ye[0]=s.BACK,qe=!0);qe&&(t.isWebGL2?s.drawBuffers(ye):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ye))}function wt(z){return m!==z?(s.useProgram(z),m=z,!0):!1}let Oe={[An]:s.FUNC_ADD,[rm]:s.FUNC_SUBTRACT,[om]:s.FUNC_REVERSE_SUBTRACT};if(n)Oe[Vh]=s.MIN,Oe[Gh]=s.MAX;else{let z=e.get("EXT_blend_minmax");z!==null&&(Oe[Vh]=z.MIN_EXT,Oe[Gh]=z.MAX_EXT)}let We={[ks]:s.ZERO,[am]:s.ONE,[cm]:s.SRC_COLOR,[yc]:s.SRC_ALPHA,[dm]:s.SRC_ALPHA_SATURATE,[ea]:s.DST_COLOR,[Qo]:s.DST_ALPHA,[lm]:s.ONE_MINUS_SRC_COLOR,[Mc]:s.ONE_MINUS_SRC_ALPHA,[um]:s.ONE_MINUS_DST_COLOR,[hm]:s.ONE_MINUS_DST_ALPHA,[fm]:s.CONSTANT_COLOR,[pm]:s.ONE_MINUS_CONSTANT_COLOR,[mm]:s.CONSTANT_ALPHA,[gm]:s.ONE_MINUS_CONSTANT_ALPHA};function De(z,xe,ye,qe,ke,ct,ht,Ot,Jt,vt){if(z===Ht){p===!0&&(Ne(s.BLEND),p=!1);return}if(p===!1&&(Ge(s.BLEND),p=!0),z!==el){if(z!==S||vt!==H){if((y!==An||I!==An)&&(s.blendEquation(s.FUNC_ADD),y=An,I=An),vt)switch(z){case Es:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case zh:s.blendFunc(s.ONE,s.ONE);break;case kh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Hh:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Es:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case zh:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case kh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Hh:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}A=null,O=null,P=null,k=null,M.set(0,0,0),w=0,S=z,H=vt}return}ke=ke||xe,ct=ct||ye,ht=ht||qe,(xe!==y||ke!==I)&&(s.blendEquationSeparate(Oe[xe],Oe[ke]),y=xe,I=ke),(ye!==A||qe!==O||ct!==P||ht!==k)&&(s.blendFuncSeparate(We[ye],We[qe],We[ct],We[ht]),A=ye,O=qe,P=ct,k=ht),(Ot.equals(M)===!1||Jt!==w)&&(s.blendColor(Ot.r,Ot.g,Ot.b,Jt),M.copy(Ot),w=Jt),S=z,H=!1}function pt(z,xe){z.side===yn?Ne(s.CULL_FACE):Ge(s.CULL_FACE);let ye=z.side===cn;xe&&(ye=!ye),Ze(ye),z.blending===Es&&z.transparent===!1?De(Ht):De(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),c.setFunc(z.depthFunc),c.setTest(z.depthTest),c.setMask(z.depthWrite),a.setMask(z.colorWrite);let qe=z.stencilWrite;l.setTest(qe),qe&&(l.setMask(z.stencilWriteMask),l.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),l.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),K(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?Ge(s.SAMPLE_ALPHA_TO_COVERAGE):Ne(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ze(z){X!==z&&(z?s.frontFace(s.CW):s.frontFace(s.CCW),X=z)}function T(z){z!==nm?(Ge(s.CULL_FACE),z!==se&&(z===Bh?s.cullFace(s.BACK):z===im?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ne(s.CULL_FACE),se=z}function b(z){z!==D&&(ie&&s.lineWidth(z),D=z)}function K(z,xe,ye){z?(Ge(s.POLYGON_OFFSET_FILL),(V!==xe||W!==ye)&&(s.polygonOffset(xe,ye),V=xe,W=ye)):Ne(s.POLYGON_OFFSET_FILL)}function pe(z){z?Ge(s.SCISSOR_TEST):Ne(s.SCISSOR_TEST)}function he(z){z===void 0&&(z=s.TEXTURE0+ne-1),ae!==z&&(s.activeTexture(z),ae=z)}function fe(z,xe,ye){ye===void 0&&(ae===null?ye=s.TEXTURE0+ne-1:ye=ae);let qe=ue[ye];qe===void 0&&(qe={type:void 0,texture:void 0},ue[ye]=qe),(qe.type!==z||qe.texture!==xe)&&(ae!==ye&&(s.activeTexture(ye),ae=ye),s.bindTexture(z,xe||Ue[z]),qe.type=z,qe.texture=xe)}function Pe(){let z=ue[ae];z!==void 0&&z.type!==void 0&&(s.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function Ee(){try{s.compressedTexImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ae(){try{s.compressedTexImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Fe(){try{s.texSubImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Xe(){try{s.texSubImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function le(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Je(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function L(){try{s.texStorage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function oe(){try{s.texStorage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function me(){try{s.texImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ge(){try{s.texImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ie(z){Se.equals(z)===!1&&(s.scissor(z.x,z.y,z.z,z.w),Se.copy(z))}function ze(z){_e.equals(z)===!1&&(s.viewport(z.x,z.y,z.z,z.w),_e.copy(z))}function Be(z,xe){let ye=u.get(xe);ye===void 0&&(ye=new WeakMap,u.set(xe,ye));let qe=ye.get(z);qe===void 0&&(qe=s.getUniformBlockIndex(xe,z.name),ye.set(z,qe))}function je(z,xe){let qe=u.get(xe).get(z);h.get(xe)!==qe&&(s.uniformBlockBinding(xe,qe,z.__bindingPointIndex),h.set(xe,qe))}function q(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},ae=null,ue={},f={},g=new WeakMap,v=[],m=null,p=!1,S=null,y=null,A=null,O=null,I=null,P=null,k=null,M=new Le(0,0,0),w=0,H=!1,X=null,se=null,D=null,V=null,W=null,Se.set(0,0,s.canvas.width,s.canvas.height),_e.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Ge,disable:Ne,bindFramebuffer:tt,drawBuffers:Z,useProgram:wt,setBlending:De,setMaterial:pt,setFlipSided:Ze,setCullFace:T,setLineWidth:b,setPolygonOffset:K,setScissorTest:pe,activeTexture:he,bindTexture:fe,unbindTexture:Pe,compressedTexImage2D:Ee,compressedTexImage3D:Ae,texImage2D:me,texImage3D:ge,updateUBOMapping:Be,uniformBlockBinding:je,texStorage2D:L,texStorage3D:oe,texSubImage2D:Fe,texSubImage3D:Xe,compressedTexSubImage2D:le,compressedTexSubImage3D:Je,scissor:Ie,viewport:ze,reset:q}}function jx(s,e,t,n,i,r,o){let a=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,b){return f?new OffscreenCanvas(T,b):hr("canvas")}function v(T,b,K,pe){let he=1;if((T.width>pe||T.height>pe)&&(he=pe/Math.max(T.width,T.height)),he<1||b===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){let fe=b?Ro:Math.floor,Pe=fe(he*T.width),Ee=fe(he*T.height);u===void 0&&(u=g(Pe,Ee));let Ae=K?g(Pe,Ee):u;return Ae.width=Pe,Ae.height=Ee,Ae.getContext("2d").drawImage(T,0,0,Pe,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+Pe+"x"+Ee+")."),Ae}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function m(T){return Tc(T.width)&&Tc(T.height)}function p(T){return a?!1:T.wrapS!==Nt||T.wrapT!==Nt||T.minFilter!==Pt&&T.minFilter!==bt}function S(T,b){return T.generateMipmaps&&b&&T.minFilter!==Pt&&T.minFilter!==bt}function y(T){s.generateMipmap(T)}function A(T,b,K,pe,he=!1){if(a===!1)return b;if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let fe=b;if(b===s.RED&&(K===s.FLOAT&&(fe=s.R32F),K===s.HALF_FLOAT&&(fe=s.R16F),K===s.UNSIGNED_BYTE&&(fe=s.R8)),b===s.RED_INTEGER&&(K===s.UNSIGNED_BYTE&&(fe=s.R8UI),K===s.UNSIGNED_SHORT&&(fe=s.R16UI),K===s.UNSIGNED_INT&&(fe=s.R32UI),K===s.BYTE&&(fe=s.R8I),K===s.SHORT&&(fe=s.R16I),K===s.INT&&(fe=s.R32I)),b===s.RG&&(K===s.FLOAT&&(fe=s.RG32F),K===s.HALF_FLOAT&&(fe=s.RG16F),K===s.UNSIGNED_BYTE&&(fe=s.RG8)),b===s.RGBA){let Pe=he?Eo:dt.getTransfer(pe);K===s.FLOAT&&(fe=s.RGBA32F),K===s.HALF_FLOAT&&(fe=s.RGBA16F),K===s.UNSIGNED_BYTE&&(fe=Pe===yt?s.SRGB8_ALPHA8:s.RGBA8),K===s.UNSIGNED_SHORT_4_4_4_4&&(fe=s.RGBA4),K===s.UNSIGNED_SHORT_5_5_5_1&&(fe=s.RGB5_A1)}return(fe===s.R16F||fe===s.R32F||fe===s.RG16F||fe===s.RG32F||fe===s.RGBA16F||fe===s.RGBA32F)&&e.get("EXT_color_buffer_float"),fe}function O(T,b,K){return S(T,K)===!0||T.isFramebufferTexture&&T.minFilter!==Pt&&T.minFilter!==bt?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function I(T){return T===Pt||T===bo||T===sr?s.NEAREST:s.LINEAR}function P(T){let b=T.target;b.removeEventListener("dispose",P),M(b),b.isVideoTexture&&h.delete(b)}function k(T){let b=T.target;b.removeEventListener("dispose",k),H(b)}function M(T){let b=n.get(T);if(b.__webglInit===void 0)return;let K=T.source,pe=d.get(K);if(pe){let he=pe[b.__cacheKey];he.usedTimes--,he.usedTimes===0&&w(T),Object.keys(pe).length===0&&d.delete(K)}n.remove(T)}function w(T){let b=n.get(T);s.deleteTexture(b.__webglTexture);let K=T.source,pe=d.get(K);delete pe[b.__cacheKey],o.memory.textures--}function H(T){let b=T.texture,K=n.get(T),pe=n.get(b);if(pe.__webglTexture!==void 0&&(s.deleteTexture(pe.__webglTexture),o.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let he=0;he<6;he++){if(Array.isArray(K.__webglFramebuffer[he]))for(let fe=0;fe<K.__webglFramebuffer[he].length;fe++)s.deleteFramebuffer(K.__webglFramebuffer[he][fe]);else s.deleteFramebuffer(K.__webglFramebuffer[he]);K.__webglDepthbuffer&&s.deleteRenderbuffer(K.__webglDepthbuffer[he])}else{if(Array.isArray(K.__webglFramebuffer))for(let he=0;he<K.__webglFramebuffer.length;he++)s.deleteFramebuffer(K.__webglFramebuffer[he]);else s.deleteFramebuffer(K.__webglFramebuffer);if(K.__webglDepthbuffer&&s.deleteRenderbuffer(K.__webglDepthbuffer),K.__webglMultisampledFramebuffer&&s.deleteFramebuffer(K.__webglMultisampledFramebuffer),K.__webglColorRenderbuffer)for(let he=0;he<K.__webglColorRenderbuffer.length;he++)K.__webglColorRenderbuffer[he]&&s.deleteRenderbuffer(K.__webglColorRenderbuffer[he]);K.__webglDepthRenderbuffer&&s.deleteRenderbuffer(K.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let he=0,fe=b.length;he<fe;he++){let Pe=n.get(b[he]);Pe.__webglTexture&&(s.deleteTexture(Pe.__webglTexture),o.memory.textures--),n.remove(b[he])}n.remove(b),n.remove(T)}let X=0;function se(){X=0}function D(){let T=X;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),X+=1,T}function V(T){let b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function W(T,b){let K=n.get(T);if(T.isVideoTexture&&pt(T),T.isRenderTargetTexture===!1&&T.version>0&&K.__version!==T.version){let pe=T.image;if(pe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(pe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Se(K,T,b);return}}t.bindTexture(s.TEXTURE_2D,K.__webglTexture,s.TEXTURE0+b)}function ne(T,b){let K=n.get(T);if(T.version>0&&K.__version!==T.version){Se(K,T,b);return}t.bindTexture(s.TEXTURE_2D_ARRAY,K.__webglTexture,s.TEXTURE0+b)}function ie(T,b){let K=n.get(T);if(T.version>0&&K.__version!==T.version){Se(K,T,b);return}t.bindTexture(s.TEXTURE_3D,K.__webglTexture,s.TEXTURE0+b)}function J(T,b){let K=n.get(T);if(T.version>0&&K.__version!==T.version){_e(K,T,b);return}t.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture,s.TEXTURE0+b)}let te={[Vt]:s.REPEAT,[Nt]:s.CLAMP_TO_EDGE,[lr]:s.MIRRORED_REPEAT},ae={[Pt]:s.NEAREST,[bo]:s.NEAREST_MIPMAP_NEAREST,[sr]:s.NEAREST_MIPMAP_LINEAR,[bt]:s.LINEAR,[il]:s.LINEAR_MIPMAP_NEAREST,[Bn]:s.LINEAR_MIPMAP_LINEAR},ue={[zm]:s.NEVER,[Xm]:s.ALWAYS,[km]:s.LESS,[Fd]:s.LEQUAL,[Hm]:s.EQUAL,[Wm]:s.GEQUAL,[Vm]:s.GREATER,[Gm]:s.NOTEQUAL};function j(T,b,K){if(K?(s.texParameteri(T,s.TEXTURE_WRAP_S,te[b.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,te[b.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,te[b.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,ae[b.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,ae[b.minFilter])):(s.texParameteri(T,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(T,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(b.wrapS!==Nt||b.wrapT!==Nt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(T,s.TEXTURE_MAG_FILTER,I(b.magFilter)),s.texParameteri(T,s.TEXTURE_MIN_FILTER,I(b.minFilter)),b.minFilter!==Pt&&b.minFilter!==bt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),b.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,ue[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let pe=e.get("EXT_texture_filter_anisotropic");if(b.magFilter===Pt||b.minFilter!==sr&&b.minFilter!==Bn||b.type===tn&&e.has("OES_texture_float_linear")===!1||a===!1&&b.type===It&&e.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||n.get(b).__currentAnisotropy)&&(s.texParameterf(T,pe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy)}}function re(T,b){let K=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",P));let pe=b.source,he=d.get(pe);he===void 0&&(he={},d.set(pe,he));let fe=V(b);if(fe!==T.__cacheKey){he[fe]===void 0&&(he[fe]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,K=!0),he[fe].usedTimes++;let Pe=he[T.__cacheKey];Pe!==void 0&&(he[T.__cacheKey].usedTimes--,Pe.usedTimes===0&&w(b)),T.__cacheKey=fe,T.__webglTexture=he[fe].texture}return K}function Se(T,b,K){let pe=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(pe=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(pe=s.TEXTURE_3D);let he=re(T,b),fe=b.source;t.bindTexture(pe,T.__webglTexture,s.TEXTURE0+K);let Pe=n.get(fe);if(fe.version!==Pe.__version||he===!0){t.activeTexture(s.TEXTURE0+K);let Ee=dt.getPrimaries(dt.workingColorSpace),Ae=b.colorSpace===an?null:dt.getPrimaries(b.colorSpace),Fe=b.colorSpace===an||Ee===Ae?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);let Xe=p(b)&&m(b.image)===!1,le=v(b.image,Xe,!1,i.maxTextureSize);le=Ze(b,le);let Je=m(le)||a,L=r.convert(b.format,b.colorSpace),oe=r.convert(b.type),me=A(b.internalFormat,L,oe,b.colorSpace,b.isVideoTexture);j(pe,b,Je);let ge,Ie=b.mipmaps,ze=a&&b.isVideoTexture!==!0&&me!==Ud,Be=Pe.__version===void 0||he===!0,je=O(b,le,Je);if(b.isDepthTexture)me=s.DEPTH_COMPONENT,a?b.type===tn?me=s.DEPTH_COMPONENT32F:b.type===Si?me=s.DEPTH_COMPONENT24:b.type===ci?me=s.DEPTH24_STENCIL8:me=s.DEPTH_COMPONENT16:b.type===tn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===Xi&&me===s.DEPTH_COMPONENT&&b.type!==sl&&b.type!==Si&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=Si,oe=r.convert(b.type)),b.format===Ei&&me===s.DEPTH_COMPONENT&&(me=s.DEPTH_STENCIL,b.type!==ci&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=ci,oe=r.convert(b.type))),Be&&(ze?t.texStorage2D(s.TEXTURE_2D,1,me,le.width,le.height):t.texImage2D(s.TEXTURE_2D,0,me,le.width,le.height,0,L,oe,null));else if(b.isDataTexture)if(Ie.length>0&&Je){ze&&Be&&t.texStorage2D(s.TEXTURE_2D,je,me,Ie[0].width,Ie[0].height);for(let q=0,z=Ie.length;q<z;q++)ge=Ie[q],ze?t.texSubImage2D(s.TEXTURE_2D,q,0,0,ge.width,ge.height,L,oe,ge.data):t.texImage2D(s.TEXTURE_2D,q,me,ge.width,ge.height,0,L,oe,ge.data);b.generateMipmaps=!1}else ze?(Be&&t.texStorage2D(s.TEXTURE_2D,je,me,le.width,le.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,le.width,le.height,L,oe,le.data)):t.texImage2D(s.TEXTURE_2D,0,me,le.width,le.height,0,L,oe,le.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){ze&&Be&&t.texStorage3D(s.TEXTURE_2D_ARRAY,je,me,Ie[0].width,Ie[0].height,le.depth);for(let q=0,z=Ie.length;q<z;q++)ge=Ie[q],b.format!==on?L!==null?ze?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,ge.width,ge.height,le.depth,L,ge.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,q,me,ge.width,ge.height,le.depth,0,ge.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?t.texSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,ge.width,ge.height,le.depth,L,oe,ge.data):t.texImage3D(s.TEXTURE_2D_ARRAY,q,me,ge.width,ge.height,le.depth,0,L,oe,ge.data)}else{ze&&Be&&t.texStorage2D(s.TEXTURE_2D,je,me,Ie[0].width,Ie[0].height);for(let q=0,z=Ie.length;q<z;q++)ge=Ie[q],b.format!==on?L!==null?ze?t.compressedTexSubImage2D(s.TEXTURE_2D,q,0,0,ge.width,ge.height,L,ge.data):t.compressedTexImage2D(s.TEXTURE_2D,q,me,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?t.texSubImage2D(s.TEXTURE_2D,q,0,0,ge.width,ge.height,L,oe,ge.data):t.texImage2D(s.TEXTURE_2D,q,me,ge.width,ge.height,0,L,oe,ge.data)}else if(b.isDataArrayTexture)ze?(Be&&t.texStorage3D(s.TEXTURE_2D_ARRAY,je,me,le.width,le.height,le.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,L,oe,le.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,me,le.width,le.height,le.depth,0,L,oe,le.data);else if(b.isData3DTexture)ze?(Be&&t.texStorage3D(s.TEXTURE_3D,je,me,le.width,le.height,le.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,L,oe,le.data)):t.texImage3D(s.TEXTURE_3D,0,me,le.width,le.height,le.depth,0,L,oe,le.data);else if(b.isFramebufferTexture){if(Be)if(ze)t.texStorage2D(s.TEXTURE_2D,je,me,le.width,le.height);else{let q=le.width,z=le.height;for(let xe=0;xe<je;xe++)t.texImage2D(s.TEXTURE_2D,xe,me,q,z,0,L,oe,null),q>>=1,z>>=1}}else if(Ie.length>0&&Je){ze&&Be&&t.texStorage2D(s.TEXTURE_2D,je,me,Ie[0].width,Ie[0].height);for(let q=0,z=Ie.length;q<z;q++)ge=Ie[q],ze?t.texSubImage2D(s.TEXTURE_2D,q,0,0,L,oe,ge):t.texImage2D(s.TEXTURE_2D,q,me,L,oe,ge);b.generateMipmaps=!1}else ze?(Be&&t.texStorage2D(s.TEXTURE_2D,je,me,le.width,le.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,L,oe,le)):t.texImage2D(s.TEXTURE_2D,0,me,L,oe,le);S(b,Je)&&y(pe),Pe.__version=fe.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function _e(T,b,K){if(b.image.length!==6)return;let pe=re(T,b),he=b.source;t.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+K);let fe=n.get(he);if(he.version!==fe.__version||pe===!0){t.activeTexture(s.TEXTURE0+K);let Pe=dt.getPrimaries(dt.workingColorSpace),Ee=b.colorSpace===an?null:dt.getPrimaries(b.colorSpace),Ae=b.colorSpace===an||Pe===Ee?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let Fe=b.isCompressedTexture||b.image[0].isCompressedTexture,Xe=b.image[0]&&b.image[0].isDataTexture,le=[];for(let q=0;q<6;q++)!Fe&&!Xe?le[q]=v(b.image[q],!1,!0,i.maxCubemapSize):le[q]=Xe?b.image[q].image:b.image[q],le[q]=Ze(b,le[q]);let Je=le[0],L=m(Je)||a,oe=r.convert(b.format,b.colorSpace),me=r.convert(b.type),ge=A(b.internalFormat,oe,me,b.colorSpace),Ie=a&&b.isVideoTexture!==!0,ze=fe.__version===void 0||pe===!0,Be=O(b,Je,L);j(s.TEXTURE_CUBE_MAP,b,L);let je;if(Fe){Ie&&ze&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Be,ge,Je.width,Je.height);for(let q=0;q<6;q++){je=le[q].mipmaps;for(let z=0;z<je.length;z++){let xe=je[z];b.format!==on?oe!==null?Ie?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z,0,0,xe.width,xe.height,oe,xe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z,ge,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ie?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z,0,0,xe.width,xe.height,oe,me,xe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z,ge,xe.width,xe.height,0,oe,me,xe.data)}}}else{je=b.mipmaps,Ie&&ze&&(je.length>0&&Be++,t.texStorage2D(s.TEXTURE_CUBE_MAP,Be,ge,le[0].width,le[0].height));for(let q=0;q<6;q++)if(Xe){Ie?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,le[q].width,le[q].height,oe,me,le[q].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,ge,le[q].width,le[q].height,0,oe,me,le[q].data);for(let z=0;z<je.length;z++){let ye=je[z].image[q].image;Ie?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z+1,0,0,ye.width,ye.height,oe,me,ye.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z+1,ge,ye.width,ye.height,0,oe,me,ye.data)}}else{Ie?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,oe,me,le[q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,ge,oe,me,le[q]);for(let z=0;z<je.length;z++){let xe=je[z];Ie?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z+1,0,0,oe,me,xe.image[q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,z+1,ge,oe,me,xe.image[q])}}}S(b,L)&&y(s.TEXTURE_CUBE_MAP),fe.__version=he.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function Te(T,b,K,pe,he,fe){let Pe=r.convert(K.format,K.colorSpace),Ee=r.convert(K.type),Ae=A(K.internalFormat,Pe,Ee,K.colorSpace);if(!n.get(b).__hasExternalTextures){let Xe=Math.max(1,b.width>>fe),le=Math.max(1,b.height>>fe);he===s.TEXTURE_3D||he===s.TEXTURE_2D_ARRAY?t.texImage3D(he,fe,Ae,Xe,le,b.depth,0,Pe,Ee,null):t.texImage2D(he,fe,Ae,Xe,le,0,Pe,Ee,null)}t.bindFramebuffer(s.FRAMEBUFFER,T),De(b)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pe,he,n.get(K).__webglTexture,0,We(b)):(he===s.TEXTURE_2D||he>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&he<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,pe,he,n.get(K).__webglTexture,fe),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ue(T,b,K){if(s.bindRenderbuffer(s.RENDERBUFFER,T),b.depthBuffer&&!b.stencilBuffer){let pe=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(K||De(b)){let he=b.depthTexture;he&&he.isDepthTexture&&(he.type===tn?pe=s.DEPTH_COMPONENT32F:he.type===Si&&(pe=s.DEPTH_COMPONENT24));let fe=We(b);De(b)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,fe,pe,b.width,b.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,fe,pe,b.width,b.height)}else s.renderbufferStorage(s.RENDERBUFFER,pe,b.width,b.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,T)}else if(b.depthBuffer&&b.stencilBuffer){let pe=We(b);K&&De(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,pe,s.DEPTH24_STENCIL8,b.width,b.height):De(b)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,pe,s.DEPTH24_STENCIL8,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,T)}else{let pe=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let he=0;he<pe.length;he++){let fe=pe[he],Pe=r.convert(fe.format,fe.colorSpace),Ee=r.convert(fe.type),Ae=A(fe.internalFormat,Pe,Ee,fe.colorSpace),Fe=We(b);K&&De(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Fe,Ae,b.width,b.height):De(b)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Fe,Ae,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,Ae,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ge(T,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),W(b.depthTexture,0);let pe=n.get(b.depthTexture).__webglTexture,he=We(b);if(b.depthTexture.format===Xi)De(b)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,pe,0,he):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,pe,0);else if(b.depthTexture.format===Ei)De(b)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,pe,0,he):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,pe,0);else throw new Error("Unknown depthTexture format")}function Ne(T){let b=n.get(T),K=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!b.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");Ge(b.__webglFramebuffer,T)}else if(K){b.__webglDepthbuffer=[];for(let pe=0;pe<6;pe++)t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[pe]),b.__webglDepthbuffer[pe]=s.createRenderbuffer(),Ue(b.__webglDepthbuffer[pe],T,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer=s.createRenderbuffer(),Ue(b.__webglDepthbuffer,T,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function tt(T,b,K){let pe=n.get(T);b!==void 0&&Te(pe.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),K!==void 0&&Ne(T)}function Z(T){let b=T.texture,K=n.get(T),pe=n.get(b);T.addEventListener("dispose",k),T.isWebGLMultipleRenderTargets!==!0&&(pe.__webglTexture===void 0&&(pe.__webglTexture=s.createTexture()),pe.__version=b.version,o.memory.textures++);let he=T.isWebGLCubeRenderTarget===!0,fe=T.isWebGLMultipleRenderTargets===!0,Pe=m(T)||a;if(he){K.__webglFramebuffer=[];for(let Ee=0;Ee<6;Ee++)if(a&&b.mipmaps&&b.mipmaps.length>0){K.__webglFramebuffer[Ee]=[];for(let Ae=0;Ae<b.mipmaps.length;Ae++)K.__webglFramebuffer[Ee][Ae]=s.createFramebuffer()}else K.__webglFramebuffer[Ee]=s.createFramebuffer()}else{if(a&&b.mipmaps&&b.mipmaps.length>0){K.__webglFramebuffer=[];for(let Ee=0;Ee<b.mipmaps.length;Ee++)K.__webglFramebuffer[Ee]=s.createFramebuffer()}else K.__webglFramebuffer=s.createFramebuffer();if(fe)if(i.drawBuffers){let Ee=T.texture;for(let Ae=0,Fe=Ee.length;Ae<Fe;Ae++){let Xe=n.get(Ee[Ae]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&T.samples>0&&De(T)===!1){let Ee=fe?b:[b];K.__webglMultisampledFramebuffer=s.createFramebuffer(),K.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let Ae=0;Ae<Ee.length;Ae++){let Fe=Ee[Ae];K.__webglColorRenderbuffer[Ae]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,K.__webglColorRenderbuffer[Ae]);let Xe=r.convert(Fe.format,Fe.colorSpace),le=r.convert(Fe.type),Je=A(Fe.internalFormat,Xe,le,Fe.colorSpace,T.isXRRenderTarget===!0),L=We(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,L,Je,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,K.__webglColorRenderbuffer[Ae])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(K.__webglDepthRenderbuffer=s.createRenderbuffer(),Ue(K.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(he){t.bindTexture(s.TEXTURE_CUBE_MAP,pe.__webglTexture),j(s.TEXTURE_CUBE_MAP,b,Pe);for(let Ee=0;Ee<6;Ee++)if(a&&b.mipmaps&&b.mipmaps.length>0)for(let Ae=0;Ae<b.mipmaps.length;Ae++)Te(K.__webglFramebuffer[Ee][Ae],T,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,Ae);else Te(K.__webglFramebuffer[Ee],T,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0);S(b,Pe)&&y(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){let Ee=T.texture;for(let Ae=0,Fe=Ee.length;Ae<Fe;Ae++){let Xe=Ee[Ae],le=n.get(Xe);t.bindTexture(s.TEXTURE_2D,le.__webglTexture),j(s.TEXTURE_2D,Xe,Pe),Te(K.__webglFramebuffer,T,Xe,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,0),S(Xe,Pe)&&y(s.TEXTURE_2D)}t.unbindTexture()}else{let Ee=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(a?Ee=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Ee,pe.__webglTexture),j(Ee,b,Pe),a&&b.mipmaps&&b.mipmaps.length>0)for(let Ae=0;Ae<b.mipmaps.length;Ae++)Te(K.__webglFramebuffer[Ae],T,b,s.COLOR_ATTACHMENT0,Ee,Ae);else Te(K.__webglFramebuffer,T,b,s.COLOR_ATTACHMENT0,Ee,0);S(b,Pe)&&y(Ee),t.unbindTexture()}T.depthBuffer&&Ne(T)}function wt(T){let b=m(T)||a,K=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let pe=0,he=K.length;pe<he;pe++){let fe=K[pe];if(S(fe,b)){let Pe=T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Ee=n.get(fe).__webglTexture;t.bindTexture(Pe,Ee),y(Pe),t.unbindTexture()}}}function Oe(T){if(a&&T.samples>0&&De(T)===!1){let b=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],K=T.width,pe=T.height,he=s.COLOR_BUFFER_BIT,fe=[],Pe=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ee=n.get(T),Ae=T.isWebGLMultipleRenderTargets===!0;if(Ae)for(let Fe=0;Fe<b.length;Fe++)t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let Fe=0;Fe<b.length;Fe++){fe.push(s.COLOR_ATTACHMENT0+Fe),T.depthBuffer&&fe.push(Pe);let Xe=Ee.__ignoreDepthValues!==void 0?Ee.__ignoreDepthValues:!1;if(Xe===!1&&(T.depthBuffer&&(he|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&(he|=s.STENCIL_BUFFER_BIT)),Ae&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ee.__webglColorRenderbuffer[Fe]),Xe===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Pe]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Pe])),Ae){let le=n.get(b[Fe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,le,0)}s.blitFramebuffer(0,0,K,pe,0,0,K,pe,he,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,fe)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Ae)for(let Fe=0;Fe<b.length;Fe++){t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,Ee.__webglColorRenderbuffer[Fe]);let Xe=n.get(b[Fe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,Xe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}}function We(T){return Math.min(i.maxSamples,T.samples)}function De(T){let b=n.get(T);return a&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function pt(T){let b=o.render.frame;h.get(T)!==b&&(h.set(T,b),T.update())}function Ze(T,b){let K=T.colorSpace,pe=T.format,he=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===wc||K!==Et&&K!==an&&(dt.getTransfer(K)===yt?a===!1?e.has("EXT_sRGB")===!0&&pe===on?(T.format=wc,T.minFilter=bt,T.generateMipmaps=!1):b=Co.sRGBToLinear(b):(pe!==on||he!==Xn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),b}this.allocateTextureUnit=D,this.resetTextureUnits=se,this.setTexture2D=W,this.setTexture2DArray=ne,this.setTexture3D=ie,this.setTextureCube=J,this.rebindTextures=tt,this.setupRenderTarget=Z,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=De}function Kx(s,e,t){let n=t.isWebGL2;function i(r,o=an){let a,c=dt.getTransfer(o);if(r===Xn)return s.UNSIGNED_BYTE;if(r===Cd)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Pd)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Rm)return s.BYTE;if(r===Cm)return s.SHORT;if(r===sl)return s.UNSIGNED_SHORT;if(r===Rd)return s.INT;if(r===Si)return s.UNSIGNED_INT;if(r===tn)return s.FLOAT;if(r===It)return n?s.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Pm)return s.ALPHA;if(r===on)return s.RGBA;if(r===Im)return s.LUMINANCE;if(r===Lm)return s.LUMINANCE_ALPHA;if(r===Xi)return s.DEPTH_COMPONENT;if(r===Ei)return s.DEPTH_STENCIL;if(r===wc)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===rl)return s.RED;if(r===Id)return s.RED_INTEGER;if(r===Dm)return s.RG;if(r===Ld)return s.RG_INTEGER;if(r===Dd)return s.RGBA_INTEGER;if(r===Ha||r===Va||r===Ga||r===Wa)if(c===yt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Ha)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Va)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Ga)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Wa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Ha)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Va)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Ga)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Wa)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Xh||r===qh||r===Yh||r===Zh)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Xh)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===qh)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Yh)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Zh)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ud)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===jh||r===Kh)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===jh)return c===yt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Kh)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===$h||r===Jh||r===Qh||r===eu||r===tu||r===nu||r===iu||r===su||r===ru||r===ou||r===au||r===cu||r===lu||r===hu)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===$h)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Jh)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Qh)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===eu)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===tu)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===nu)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===iu)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===su)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ru)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===ou)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===au)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===cu)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===lu)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===hu)return c===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Xa||r===uu||r===du)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===Xa)return c===yt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===uu)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===du)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Um||r===fu||r===pu||r===mu)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===Xa)return a.COMPRESSED_RED_RGTC1_EXT;if(r===fu)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===pu)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===mu)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===ci?n?s.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}var Bc=class extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},kt=class extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}},$x={type:"move"},cr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent($x)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new kt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},zc=class extends qn{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null,v=t.getContextAttributes(),m=null,p=null,S=[],y=[],A=new Re,O=null,I=new zt;I.layers.enable(1),I.viewport=new Mt;let P=new zt;P.layers.enable(2),P.viewport=new Mt;let k=[I,P],M=new Bc;M.layers.enable(1),M.layers.enable(2);let w=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let re=S[j];return re===void 0&&(re=new cr,S[j]=re),re.getTargetRaySpace()},this.getControllerGrip=function(j){let re=S[j];return re===void 0&&(re=new cr,S[j]=re),re.getGripSpace()},this.getHand=function(j){let re=S[j];return re===void 0&&(re=new cr,S[j]=re),re.getHandSpace()};function X(j){let re=y.indexOf(j.inputSource);if(re===-1)return;let Se=S[re];Se!==void 0&&(Se.update(j.inputSource,j.frame,l||o),Se.dispatchEvent({type:j.type,data:j.inputSource}))}function se(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",se),i.removeEventListener("inputsourceschange",D);for(let j=0;j<S.length;j++){let re=y[j];re!==null&&(y[j]=null,S[j].disconnect(re))}w=null,H=null,e.setRenderTarget(m),f=null,d=null,u=null,i=null,p=null,ue.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",se),i.addEventListener("inputsourceschange",D),v.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(A),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let re={antialias:i.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,re),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Wt(f.framebufferWidth,f.framebufferHeight,{format:on,type:Xn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let re=null,Se=null,_e=null;v.depth&&(_e=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=v.stencil?Ei:Xi,Se=v.stencil?ci:Si);let Te={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Te),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new Wt(d.textureWidth,d.textureHeight,{format:on,type:Xn,depthTexture:new Ls(d.textureWidth,d.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});let Ue=e.properties.get(p);Ue.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),ue.setContext(i),ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function D(j){for(let re=0;re<j.removed.length;re++){let Se=j.removed[re],_e=y.indexOf(Se);_e>=0&&(y[_e]=null,S[_e].disconnect(Se))}for(let re=0;re<j.added.length;re++){let Se=j.added[re],_e=y.indexOf(Se);if(_e===-1){for(let Ue=0;Ue<S.length;Ue++)if(Ue>=y.length){y.push(Se),_e=Ue;break}else if(y[Ue]===null){y[Ue]=Se,_e=Ue;break}if(_e===-1)break}let Te=S[_e];Te&&Te.connect(Se)}}let V=new B,W=new B;function ne(j,re,Se){V.setFromMatrixPosition(re.matrixWorld),W.setFromMatrixPosition(Se.matrixWorld);let _e=V.distanceTo(W),Te=re.projectionMatrix.elements,Ue=Se.projectionMatrix.elements,Ge=Te[14]/(Te[10]-1),Ne=Te[14]/(Te[10]+1),tt=(Te[9]+1)/Te[5],Z=(Te[9]-1)/Te[5],wt=(Te[8]-1)/Te[0],Oe=(Ue[8]+1)/Ue[0],We=Ge*wt,De=Ge*Oe,pt=_e/(-wt+Oe),Ze=pt*-wt;re.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ze),j.translateZ(pt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();let T=Ge+pt,b=Ne+pt,K=We-Ze,pe=De+(_e-Ze),he=tt*Ne/b*T,fe=Z*Ne/b*T;j.projectionMatrix.makePerspective(K,pe,he,fe,T,b),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}function ie(j,re){re===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(re.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;M.near=P.near=I.near=j.near,M.far=P.far=I.far=j.far,(w!==M.near||H!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),w=M.near,H=M.far);let re=j.parent,Se=M.cameras;ie(M,re);for(let _e=0;_e<Se.length;_e++)ie(Se[_e],re);Se.length===2?ne(M,I,P):M.projectionMatrix.copy(I.projectionMatrix),J(j,M,re)};function J(j,re,Se){Se===null?j.matrix.copy(re.matrixWorld):(j.matrix.copy(Se.matrixWorld),j.matrix.invert(),j.matrix.multiply(re.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(re.projectionMatrix),j.projectionMatrixInverse.copy(re.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ps*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)};let te=null;function ae(j,re){if(h=re.getViewerPose(l||o),g=re,h!==null){let Se=h.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let _e=!1;Se.length!==M.cameras.length&&(M.cameras.length=0,_e=!0);for(let Te=0;Te<Se.length;Te++){let Ue=Se[Te],Ge=null;if(f!==null)Ge=f.getViewport(Ue);else{let tt=u.getViewSubImage(d,Ue);Ge=tt.viewport,Te===0&&(e.setRenderTargetTextures(p,tt.colorTexture,d.ignoreDepthValues?void 0:tt.depthStencilTexture),e.setRenderTarget(p))}let Ne=k[Te];Ne===void 0&&(Ne=new zt,Ne.layers.enable(Te),Ne.viewport=new Mt,k[Te]=Ne),Ne.matrix.fromArray(Ue.transform.matrix),Ne.matrix.decompose(Ne.position,Ne.quaternion,Ne.scale),Ne.projectionMatrix.fromArray(Ue.projectionMatrix),Ne.projectionMatrixInverse.copy(Ne.projectionMatrix).invert(),Ne.viewport.set(Ge.x,Ge.y,Ge.width,Ge.height),Te===0&&(M.matrix.copy(Ne.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),_e===!0&&M.cameras.push(Ne)}}for(let Se=0;Se<S.length;Se++){let _e=y[Se],Te=S[Se];_e!==null&&Te!==void 0&&Te.update(_e,re,l||o)}te&&te(j,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),g=null}let ue=new Hd;ue.setAnimationLoop(ae),this.setAnimationLoop=function(j){te=j},this.dispose=function(){}}};function Jx(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,kd(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,S,y,A){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,A)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,S,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===cn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===cn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let S=e.get(p).envMap;if(S&&(m.envMap.value=S,m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let y=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*y,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,S,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===cn&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){let S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Qx(s,e,t,n){let i={},r={},o=[],a=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(S,y){let A=y.program;n.uniformBlockBinding(S,A)}function l(S,y){let A=i[S.id];A===void 0&&(g(S),A=h(S),i[S.id]=A,S.addEventListener("dispose",m));let O=y.program;n.updateUBOMapping(S,O);let I=e.render.frame;r[S.id]!==I&&(d(S),r[S.id]=I)}function h(S){let y=u();S.__bindingPointIndex=y;let A=s.createBuffer(),O=S.__size,I=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,A),s.bufferData(s.UNIFORM_BUFFER,O,I),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,A),A}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){let y=i[S.id],A=S.uniforms,O=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let I=0,P=A.length;I<P;I++){let k=Array.isArray(A[I])?A[I]:[A[I]];for(let M=0,w=k.length;M<w;M++){let H=k[M];if(f(H,I,M,O)===!0){let X=H.__offset,se=Array.isArray(H.value)?H.value:[H.value],D=0;for(let V=0;V<se.length;V++){let W=se[V],ne=v(W);typeof W=="number"||typeof W=="boolean"?(H.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,X+D,H.__data)):W.isMatrix3?(H.__data[0]=W.elements[0],H.__data[1]=W.elements[1],H.__data[2]=W.elements[2],H.__data[3]=0,H.__data[4]=W.elements[3],H.__data[5]=W.elements[4],H.__data[6]=W.elements[5],H.__data[7]=0,H.__data[8]=W.elements[6],H.__data[9]=W.elements[7],H.__data[10]=W.elements[8],H.__data[11]=0):(W.toArray(H.__data,D),D+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,X,H.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(S,y,A,O){let I=S.value,P=y+"_"+A;if(O[P]===void 0)return typeof I=="number"||typeof I=="boolean"?O[P]=I:O[P]=I.clone(),!0;{let k=O[P];if(typeof I=="number"||typeof I=="boolean"){if(k!==I)return O[P]=I,!0}else if(k.equals(I)===!1)return k.copy(I),!0}return!1}function g(S){let y=S.uniforms,A=0,O=16;for(let P=0,k=y.length;P<k;P++){let M=Array.isArray(y[P])?y[P]:[y[P]];for(let w=0,H=M.length;w<H;w++){let X=M[w],se=Array.isArray(X.value)?X.value:[X.value];for(let D=0,V=se.length;D<V;D++){let W=se[D],ne=v(W),ie=A%O;ie!==0&&O-ie<ne.boundary&&(A+=O-ie),X.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=A,A+=ne.storage}}}let I=A%O;return I>0&&(A+=O-I),S.__size=A,S.__cache={},this}function v(S){let y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function m(S){let y=S.target;y.removeEventListener("dispose",m);let A=o.indexOf(y.__bindingPointIndex);o.splice(A,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(let S in i)s.deleteBuffer(i[S]);o=[],i={},r={}}return{bind:c,update:l,dispose:p}}var mr=class{constructor(e={}){let{canvas:t=og(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;let f=new Uint32Array(4),g=new Int32Array(4),v=null,m=null,p=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=lt,this._useLegacyLights=!1,this.toneMapping=Wn,this.toneMappingExposure=1;let y=this,A=!1,O=0,I=0,P=null,k=-1,M=null,w=new Mt,H=new Mt,X=null,se=new Le(0),D=0,V=t.width,W=t.height,ne=1,ie=null,J=null,te=new Mt(0,0,V,W),ae=new Mt(0,0,V,W),ue=!1,j=new fr,re=!1,Se=!1,_e=null,Te=new Ke,Ue=new Re,Ge=new B,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function tt(){return P===null?ne:1}let Z=n;function wt(_,R){for(let C=0;C<_.length;C++){let U=_[C],N=t.getContext(U,R);if(N!==null)return N}return null}try{let _={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r160"),t.addEventListener("webglcontextlost",q,!1),t.addEventListener("webglcontextrestored",z,!1),t.addEventListener("webglcontextcreationerror",xe,!1),Z===null){let R=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&R.shift(),Z=wt(R,_),Z===null)throw wt(R)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&Z instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),Z.getShaderPrecisionFormat===void 0&&(Z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(_){throw console.error("THREE.WebGLRenderer: "+_.message),_}let Oe,We,De,pt,Ze,T,b,K,pe,he,fe,Pe,Ee,Ae,Fe,Xe,le,Je,L,oe,me,ge,Ie,ze;function Be(){Oe=new __(Z),We=new d_(Z,Oe,e),Oe.init(We),ge=new Kx(Z,Oe,We),De=new Zx(Z,Oe,We),pt=new M_(Z),Ze=new Ox,T=new jx(Z,Oe,De,Ze,We,ge,pt),b=new p_(y),K=new v_(y),pe=new Cg(Z,We),Ie=new h_(Z,Oe,pe,We),he=new x_(Z,pe,pt,Ie),fe=new w_(Z,he,pe,pt),L=new E_(Z,We,T),Xe=new f_(Ze),Pe=new Nx(y,b,K,Oe,We,Ie,Xe),Ee=new Jx(y,Ze),Ae=new Bx,Fe=new Wx(Oe,We),Je=new l_(y,b,K,De,fe,d,c),le=new Yx(y,fe,We),ze=new Qx(Z,pt,We,De),oe=new u_(Z,Oe,pt,We),me=new y_(Z,Oe,pt,We),pt.programs=Pe.programs,y.capabilities=We,y.extensions=Oe,y.properties=Ze,y.renderLists=Ae,y.shadowMap=le,y.state=De,y.info=pt}Be();let je=new zc(y,Z);this.xr=je,this.getContext=function(){return Z},this.getContextAttributes=function(){return Z.getContextAttributes()},this.forceContextLoss=function(){let _=Oe.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=Oe.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(_){_!==void 0&&(ne=_,this.setSize(V,W,!1))},this.getSize=function(_){return _.set(V,W)},this.setSize=function(_,R,C=!0){if(je.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=_,W=R,t.width=Math.floor(_*ne),t.height=Math.floor(R*ne),C===!0&&(t.style.width=_+"px",t.style.height=R+"px"),this.setViewport(0,0,_,R)},this.getDrawingBufferSize=function(_){return _.set(V*ne,W*ne).floor()},this.setDrawingBufferSize=function(_,R,C){V=_,W=R,ne=C,t.width=Math.floor(_*C),t.height=Math.floor(R*C),this.setViewport(0,0,_,R)},this.getCurrentViewport=function(_){return _.copy(w)},this.getViewport=function(_){return _.copy(te)},this.setViewport=function(_,R,C,U){_.isVector4?te.set(_.x,_.y,_.z,_.w):te.set(_,R,C,U),De.viewport(w.copy(te).multiplyScalar(ne).floor())},this.getScissor=function(_){return _.copy(ae)},this.setScissor=function(_,R,C,U){_.isVector4?ae.set(_.x,_.y,_.z,_.w):ae.set(_,R,C,U),De.scissor(H.copy(ae).multiplyScalar(ne).floor())},this.getScissorTest=function(){return ue},this.setScissorTest=function(_){De.setScissorTest(ue=_)},this.setOpaqueSort=function(_){ie=_},this.setTransparentSort=function(_){J=_},this.getClearColor=function(_){return _.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor.apply(Je,arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha.apply(Je,arguments)},this.clear=function(_=!0,R=!0,C=!0){let U=0;if(_){let N=!1;if(P!==null){let $=P.texture.format;N=$===Dd||$===Ld||$===Id}if(N){let $=P.texture.type,Y=$===Xn||$===Si||$===sl||$===ci||$===Cd||$===Pd,Q=Je.getClearColor(),ce=Je.getClearAlpha(),de=Q.r,ve=Q.g,Me=Q.b;Y?(f[0]=de,f[1]=ve,f[2]=Me,f[3]=ce,Z.clearBufferuiv(Z.COLOR,0,f)):(g[0]=de,g[1]=ve,g[2]=Me,g[3]=ce,Z.clearBufferiv(Z.COLOR,0,g))}else U|=Z.COLOR_BUFFER_BIT}R&&(U|=Z.DEPTH_BUFFER_BIT),C&&(U|=Z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z.clear(U)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",q,!1),t.removeEventListener("webglcontextrestored",z,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),Ae.dispose(),Fe.dispose(),Ze.dispose(),b.dispose(),K.dispose(),fe.dispose(),Ie.dispose(),ze.dispose(),Pe.dispose(),je.dispose(),je.removeEventListener("sessionstart",Jt),je.removeEventListener("sessionend",vt),_e&&(_e.dispose(),_e=null),Qt.stop()};function q(_){_.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function z(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let _=pt.autoReset,R=le.enabled,C=le.autoUpdate,U=le.needsUpdate,N=le.type;Be(),pt.autoReset=_,le.enabled=R,le.autoUpdate=C,le.needsUpdate=U,le.type=N}function xe(_){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function ye(_){let R=_.target;R.removeEventListener("dispose",ye),qe(R)}function qe(_){ke(_),Ze.remove(_)}function ke(_){let R=Ze.get(_).programs;R!==void 0&&(R.forEach(function(C){Pe.releaseProgram(C)}),_.isShaderMaterial&&Pe.releaseShaderCache(_))}this.renderBufferDirect=function(_,R,C,U,N,$){R===null&&(R=Ne);let Y=N.isMesh&&N.matrixWorld.determinant()<0,Q=x(_,R,C,U,N);De.setMaterial(U,Y);let ce=C.index,de=1;if(U.wireframe===!0){if(ce=he.getWireframeAttribute(C),ce===void 0)return;de=2}let ve=C.drawRange,Me=C.attributes.position,be=ve.start*de,Ce=(ve.start+ve.count)*de;$!==null&&(be=Math.max(be,$.start*de),Ce=Math.min(Ce,($.start+$.count)*de)),ce!==null?(be=Math.max(be,0),Ce=Math.min(Ce,ce.count)):Me!=null&&(be=Math.max(be,0),Ce=Math.min(Ce,Me.count));let He=Ce-be;if(He<0||He===1/0)return;Ie.setup(N,U,Q,C,ce);let ft,$e=oe;if(ce!==null&&(ft=pe.get(ce),$e=me,$e.setIndex(ft)),N.isMesh)U.wireframe===!0?(De.setLineWidth(U.wireframeLinewidth*tt()),$e.setMode(Z.LINES)):$e.setMode(Z.TRIANGLES);else if(N.isLine){let Ye=U.linewidth;Ye===void 0&&(Ye=1),De.setLineWidth(Ye*tt()),N.isLineSegments?$e.setMode(Z.LINES):N.isLineLoop?$e.setMode(Z.LINE_LOOP):$e.setMode(Z.LINE_STRIP)}else N.isPoints?$e.setMode(Z.POINTS):N.isSprite&&$e.setMode(Z.TRIANGLES);if(N.isBatchedMesh)$e.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else if(N.isInstancedMesh)$e.renderInstances(be,He,N.count);else if(C.isInstancedBufferGeometry){let Ye=C._maxInstanceCount!==void 0?C._maxInstanceCount:1/0,gt=Math.min(C.instanceCount,Ye);$e.renderInstances(be,He,gt)}else $e.render(be,He)};function ct(_,R,C){_.transparent===!0&&_.side===yn&&_.forceSinglePass===!1?(_.side=cn,_.needsUpdate=!0,nt(_,R,C),_.side=Rn,_.needsUpdate=!0,nt(_,R,C),_.side=yn):nt(_,R,C)}this.compile=function(_,R,C=null){C===null&&(C=_),m=Fe.get(C),m.init(),S.push(m),C.traverseVisible(function(N){N.isLight&&N.layers.test(R.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),_!==C&&_.traverseVisible(function(N){N.isLight&&N.layers.test(R.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),m.setupLights(y._useLegacyLights);let U=new Set;return _.traverse(function(N){let $=N.material;if($)if(Array.isArray($))for(let Y=0;Y<$.length;Y++){let Q=$[Y];ct(Q,C,N),U.add(Q)}else ct($,C,N),U.add($)}),S.pop(),m=null,U},this.compileAsync=function(_,R,C=null){let U=this.compile(_,R,C);return new Promise(N=>{function $(){if(U.forEach(function(Y){Ze.get(Y).currentProgram.isReady()&&U.delete(Y)}),U.size===0){N(_);return}setTimeout($,10)}Oe.get("KHR_parallel_shader_compile")!==null?$():setTimeout($,10)})};let ht=null;function Ot(_){ht&&ht(_)}function Jt(){Qt.stop()}function vt(){Qt.start()}let Qt=new Hd;Qt.setAnimationLoop(Ot),typeof self<"u"&&Qt.setContext(self),this.setAnimationLoop=function(_){ht=_,je.setAnimationLoop(_),_===null?Qt.stop():Qt.start()},je.addEventListener("sessionstart",Jt),je.addEventListener("sessionend",vt),this.render=function(_,R){if(R!==void 0&&R.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),R.parent===null&&R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),je.enabled===!0&&je.isPresenting===!0&&(je.cameraAutoUpdate===!0&&je.updateCamera(R),R=je.getCamera()),_.isScene===!0&&_.onBeforeRender(y,_,R,P),m=Fe.get(_,S.length),m.init(),S.push(m),Te.multiplyMatrices(R.projectionMatrix,R.matrixWorldInverse),j.setFromProjectionMatrix(Te),Se=this.localClippingEnabled,re=Xe.init(this.clippingPlanes,Se),v=Ae.get(_,p.length),v.init(),p.push(v),wn(_,R,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(ie,J),this.info.render.frame++,re===!0&&Xe.beginShadows();let C=m.state.shadowsArray;if(le.render(C,_,R),re===!0&&Xe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Je.render(v,_),m.setupLights(y._useLegacyLights),R.isArrayCamera){let U=R.cameras;for(let N=0,$=U.length;N<$;N++){let Y=U[N];Bi(v,_,Y,Y.viewport)}}else Bi(v,_,R);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),_.isScene===!0&&_.onAfterRender(y,_,R),Ie.resetDefaultState(),k=-1,M=null,S.pop(),S.length>0?m=S[S.length-1]:m=null,p.pop(),p.length>0?v=p[p.length-1]:v=null};function wn(_,R,C,U){if(_.visible===!1)return;if(_.layers.test(R.layers)){if(_.isGroup)C=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(R);else if(_.isLight)m.pushLight(_),_.castShadow&&m.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||j.intersectsSprite(_)){U&&Ge.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Te);let Y=fe.update(_),Q=_.material;Q.visible&&v.push(_,Y,Q,C,Ge.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||j.intersectsObject(_))){let Y=fe.update(_),Q=_.material;if(U&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),Ge.copy(_.boundingSphere.center)):(Y.boundingSphere===null&&Y.computeBoundingSphere(),Ge.copy(Y.boundingSphere.center)),Ge.applyMatrix4(_.matrixWorld).applyMatrix4(Te)),Array.isArray(Q)){let ce=Y.groups;for(let de=0,ve=ce.length;de<ve;de++){let Me=ce[de],be=Q[Me.materialIndex];be&&be.visible&&v.push(_,Y,be,C,Ge.z,Me)}}else Q.visible&&v.push(_,Y,Q,C,Ge.z,null)}}let $=_.children;for(let Y=0,Q=$.length;Y<Q;Y++)wn($[Y],R,C,U)}function Bi(_,R,C,U){let N=_.opaque,$=_.transmissive,Y=_.transparent;m.setupLightsView(C),re===!0&&Xe.setGlobalState(y.clippingPlanes,C),$.length>0&&ka(N,$,R,C),U&&De.viewport(w.copy(U)),N.length>0&&Hn(N,R,C),$.length>0&&Hn($,R,C),Y.length>0&&Hn(Y,R,C),De.buffers.depth.setTest(!0),De.buffers.depth.setMask(!0),De.buffers.color.setMask(!0),De.setPolygonOffset(!1)}function ka(_,R,C,U){if((C.isScene===!0?C.overrideMaterial:null)!==null)return;let $=We.isWebGL2;_e===null&&(_e=new Wt(1,1,{generateMipmaps:!0,type:Oe.has("EXT_color_buffer_half_float")?It:Xn,minFilter:Bn,samples:$?4:0})),y.getDrawingBufferSize(Ue),$?_e.setSize(Ue.x,Ue.y):_e.setSize(Ro(Ue.x),Ro(Ue.y));let Y=y.getRenderTarget();y.setRenderTarget(_e),y.getClearColor(se),D=y.getClearAlpha(),D<1&&y.setClearColor(16777215,.5),y.clear();let Q=y.toneMapping;y.toneMapping=Wn,Hn(_,C,U),T.updateMultisampleRenderTarget(_e),T.updateRenderTargetMipmap(_e);let ce=!1;for(let de=0,ve=R.length;de<ve;de++){let Me=R[de],be=Me.object,Ce=Me.geometry,He=Me.material,ft=Me.group;if(He.side===yn&&be.layers.test(U.layers)){let $e=He.side;He.side=cn,He.needsUpdate=!0,mi(be,C,U,Ce,He,ft),He.side=$e,He.needsUpdate=!0,ce=!0}}ce===!0&&(T.updateMultisampleRenderTarget(_e),T.updateRenderTargetMipmap(_e)),y.setRenderTarget(Y),y.setClearColor(se,D),y.toneMapping=Q}function Hn(_,R,C){let U=R.isScene===!0?R.overrideMaterial:null;for(let N=0,$=_.length;N<$;N++){let Y=_[N],Q=Y.object,ce=Y.geometry,de=U===null?Y.material:U,ve=Y.group;Q.layers.test(C.layers)&&mi(Q,R,C,ce,de,ve)}}function mi(_,R,C,U,N,$){_.onBeforeRender(y,R,C,U,N,$),_.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),N.onBeforeRender(y,R,C,U,_,$),N.transparent===!0&&N.side===yn&&N.forceSinglePass===!1?(N.side=cn,N.needsUpdate=!0,y.renderBufferDirect(C,R,U,N,_,$),N.side=Rn,N.needsUpdate=!0,y.renderBufferDirect(C,R,U,N,_,$),N.side=yn):y.renderBufferDirect(C,R,U,N,_,$),_.onAfterRender(y,R,C,U,N,$)}function nt(_,R,C){R.isScene!==!0&&(R=Ne);let U=Ze.get(_),N=m.state.lights,$=m.state.shadowsArray,Y=N.state.version,Q=Pe.getParameters(_,N.state,$,R,C),ce=Pe.getProgramCacheKey(Q),de=U.programs;U.environment=_.isMeshStandardMaterial?R.environment:null,U.fog=R.fog,U.envMap=(_.isMeshStandardMaterial?K:b).get(_.envMap||U.environment),de===void 0&&(_.addEventListener("dispose",ye),de=new Map,U.programs=de);let ve=de.get(ce);if(ve!==void 0){if(U.currentProgram===ve&&U.lightsStateVersion===Y)return qr(_,Q),ve}else Q.uniforms=Pe.getUniforms(_),_.onBuild(C,Q,y),_.onBeforeCompile(Q,y),ve=Pe.acquireProgram(Q,ce),de.set(ce,ve),U.uniforms=Q.uniforms;let Me=U.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(Me.clippingPlanes=Xe.uniform),qr(_,Q),U.needsLights=F(_),U.lightsStateVersion=Y,U.needsLights&&(Me.ambientLightColor.value=N.state.ambient,Me.lightProbe.value=N.state.probe,Me.directionalLights.value=N.state.directional,Me.directionalLightShadows.value=N.state.directionalShadow,Me.spotLights.value=N.state.spot,Me.spotLightShadows.value=N.state.spotShadow,Me.rectAreaLights.value=N.state.rectArea,Me.ltc_1.value=N.state.rectAreaLTC1,Me.ltc_2.value=N.state.rectAreaLTC2,Me.pointLights.value=N.state.point,Me.pointLightShadows.value=N.state.pointShadow,Me.hemisphereLights.value=N.state.hemi,Me.directionalShadowMap.value=N.state.directionalShadowMap,Me.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Me.spotShadowMap.value=N.state.spotShadowMap,Me.spotLightMatrix.value=N.state.spotLightMatrix,Me.spotLightMap.value=N.state.spotLightMap,Me.pointShadowMap.value=N.state.pointShadowMap,Me.pointShadowMatrix.value=N.state.pointShadowMatrix),U.currentProgram=ve,U.uniformsList=null,ve}function Zs(_){if(_.uniformsList===null){let R=_.currentProgram.getUniforms();_.uniformsList=Ts.seqWithValue(R.seq,_.uniforms)}return _.uniformsList}function qr(_,R){let C=Ze.get(_);C.outputColorSpace=R.outputColorSpace,C.batching=R.batching,C.instancing=R.instancing,C.instancingColor=R.instancingColor,C.skinning=R.skinning,C.morphTargets=R.morphTargets,C.morphNormals=R.morphNormals,C.morphColors=R.morphColors,C.morphTargetsCount=R.morphTargetsCount,C.numClippingPlanes=R.numClippingPlanes,C.numIntersection=R.numClipIntersection,C.vertexAlphas=R.vertexAlphas,C.vertexTangents=R.vertexTangents,C.toneMapping=R.toneMapping}function x(_,R,C,U,N){R.isScene!==!0&&(R=Ne),T.resetTextureUnits();let $=R.fog,Y=U.isMeshStandardMaterial?R.environment:null,Q=P===null?y.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Et,ce=(U.isMeshStandardMaterial?K:b).get(U.envMap||Y),de=U.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,ve=!!C.attributes.tangent&&(!!U.normalMap||U.anisotropy>0),Me=!!C.morphAttributes.position,be=!!C.morphAttributes.normal,Ce=!!C.morphAttributes.color,He=Wn;U.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(He=y.toneMapping);let ft=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,$e=ft!==void 0?ft.length:0,Ye=Ze.get(U),gt=m.state.lights;if(re===!0&&(Se===!0||_!==M)){let Ct=_===M&&U.id===k;Xe.setState(U,_,Ct)}let Ve=!1;U.version===Ye.__version?(Ye.needsLights&&Ye.lightsStateVersion!==gt.state.version||Ye.outputColorSpace!==Q||N.isBatchedMesh&&Ye.batching===!1||!N.isBatchedMesh&&Ye.batching===!0||N.isInstancedMesh&&Ye.instancing===!1||!N.isInstancedMesh&&Ye.instancing===!0||N.isSkinnedMesh&&Ye.skinning===!1||!N.isSkinnedMesh&&Ye.skinning===!0||N.isInstancedMesh&&Ye.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ye.instancingColor===!1&&N.instanceColor!==null||Ye.envMap!==ce||U.fog===!0&&Ye.fog!==$||Ye.numClippingPlanes!==void 0&&(Ye.numClippingPlanes!==Xe.numPlanes||Ye.numIntersection!==Xe.numIntersection)||Ye.vertexAlphas!==de||Ye.vertexTangents!==ve||Ye.morphTargets!==Me||Ye.morphNormals!==be||Ye.morphColors!==Ce||Ye.toneMapping!==He||We.isWebGL2===!0&&Ye.morphTargetsCount!==$e)&&(Ve=!0):(Ve=!0,Ye.__version=U.version);let xt=Ye.currentProgram;Ve===!0&&(xt=nt(U,R,N));let hn=!1,Tt=!1,ut=!1,Qe=xt.getUniforms(),en=Ye.uniforms;if(De.useProgram(xt.program)&&(hn=!0,Tt=!0,ut=!0),U.id!==k&&(k=U.id,Tt=!0),hn||M!==_){Qe.setValue(Z,"projectionMatrix",_.projectionMatrix),Qe.setValue(Z,"viewMatrix",_.matrixWorldInverse);let Ct=Qe.map.cameraPosition;Ct!==void 0&&Ct.setValue(Z,Ge.setFromMatrixPosition(_.matrixWorld)),We.logarithmicDepthBuffer&&Qe.setValue(Z,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshLambertMaterial||U.isMeshBasicMaterial||U.isMeshStandardMaterial||U.isShaderMaterial)&&Qe.setValue(Z,"isOrthographic",_.isOrthographicCamera===!0),M!==_&&(M=_,Tt=!0,ut=!0)}if(N.isSkinnedMesh){Qe.setOptional(Z,N,"bindMatrix"),Qe.setOptional(Z,N,"bindMatrixInverse");let Ct=N.skeleton;Ct&&(We.floatVertexTextures?(Ct.boneTexture===null&&Ct.computeBoneTexture(),Qe.setValue(Z,"boneTexture",Ct.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}N.isBatchedMesh&&(Qe.setOptional(Z,N,"batchingTexture"),Qe.setValue(Z,"batchingTexture",N._matricesTexture,T));let Jn=C.morphAttributes;if((Jn.position!==void 0||Jn.normal!==void 0||Jn.color!==void 0&&We.isWebGL2===!0)&&L.update(N,C,xt),(Tt||Ye.receiveShadow!==N.receiveShadow)&&(Ye.receiveShadow=N.receiveShadow,Qe.setValue(Z,"receiveShadow",N.receiveShadow)),U.isMeshGouraudMaterial&&U.envMap!==null&&(en.envMap.value=ce,en.flipEnvMap.value=ce.isCubeTexture&&ce.isRenderTargetTexture===!1?-1:1),Tt&&(Qe.setValue(Z,"toneMappingExposure",y.toneMappingExposure),Ye.needsLights&&E(en,ut),$&&U.fog===!0&&Ee.refreshFogUniforms(en,$),Ee.refreshMaterialUniforms(en,U,ne,W,_e),Ts.upload(Z,Zs(Ye),en,T)),U.isShaderMaterial&&U.uniformsNeedUpdate===!0&&(Ts.upload(Z,Zs(Ye),en,T),U.uniformsNeedUpdate=!1),U.isSpriteMaterial&&Qe.setValue(Z,"center",N.center),Qe.setValue(Z,"modelViewMatrix",N.modelViewMatrix),Qe.setValue(Z,"normalMatrix",N.normalMatrix),Qe.setValue(Z,"modelMatrix",N.matrixWorld),U.isShaderMaterial||U.isRawShaderMaterial){let Ct=U.uniformsGroups;for(let gi=0,tm=Ct.length;gi<tm;gi++)if(We.isWebGL2){let Fh=Ct[gi];ze.update(Fh,xt),ze.bind(Fh,xt)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return xt}function E(_,R){_.ambientLightColor.needsUpdate=R,_.lightProbe.needsUpdate=R,_.directionalLights.needsUpdate=R,_.directionalLightShadows.needsUpdate=R,_.pointLights.needsUpdate=R,_.pointLightShadows.needsUpdate=R,_.spotLights.needsUpdate=R,_.spotLightShadows.needsUpdate=R,_.rectAreaLights.needsUpdate=R,_.hemisphereLights.needsUpdate=R}function F(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(_,R,C){Ze.get(_.texture).__webglTexture=R,Ze.get(_.depthTexture).__webglTexture=C;let U=Ze.get(_);U.__hasExternalTextures=!0,U.__hasExternalTextures&&(U.__autoAllocateDepthBuffer=C===void 0,U.__autoAllocateDepthBuffer||Oe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),U.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(_,R){let C=Ze.get(_);C.__webglFramebuffer=R,C.__useDefaultFramebuffer=R===void 0},this.setRenderTarget=function(_,R=0,C=0){P=_,O=R,I=C;let U=!0,N=null,$=!1,Y=!1;if(_){let ce=Ze.get(_);ce.__useDefaultFramebuffer!==void 0?(De.bindFramebuffer(Z.FRAMEBUFFER,null),U=!1):ce.__webglFramebuffer===void 0?T.setupRenderTarget(_):ce.__hasExternalTextures&&T.rebindTextures(_,Ze.get(_.texture).__webglTexture,Ze.get(_.depthTexture).__webglTexture);let de=_.texture;(de.isData3DTexture||de.isDataArrayTexture||de.isCompressedArrayTexture)&&(Y=!0);let ve=Ze.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(ve[R])?N=ve[R][C]:N=ve[R],$=!0):We.isWebGL2&&_.samples>0&&T.useMultisampledRTT(_)===!1?N=Ze.get(_).__webglMultisampledFramebuffer:Array.isArray(ve)?N=ve[C]:N=ve,w.copy(_.viewport),H.copy(_.scissor),X=_.scissorTest}else w.copy(te).multiplyScalar(ne).floor(),H.copy(ae).multiplyScalar(ne).floor(),X=ue;if(De.bindFramebuffer(Z.FRAMEBUFFER,N)&&We.drawBuffers&&U&&De.drawBuffers(_,N),De.viewport(w),De.scissor(H),De.setScissorTest(X),$){let ce=Ze.get(_.texture);Z.framebufferTexture2D(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_CUBE_MAP_POSITIVE_X+R,ce.__webglTexture,C)}else if(Y){let ce=Ze.get(_.texture),de=R||0;Z.framebufferTextureLayer(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,ce.__webglTexture,C||0,de)}k=-1},this.readRenderTargetPixels=function(_,R,C,U,N,$,Y){if(!(_&&_.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Q=Ze.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&Y!==void 0&&(Q=Q[Y]),Q){De.bindFramebuffer(Z.FRAMEBUFFER,Q);try{let ce=_.texture,de=ce.format,ve=ce.type;if(de!==on&&ge.convert(de)!==Z.getParameter(Z.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Me=ve===It&&(Oe.has("EXT_color_buffer_half_float")||We.isWebGL2&&Oe.has("EXT_color_buffer_float"));if(ve!==Xn&&ge.convert(ve)!==Z.getParameter(Z.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ve===tn&&(We.isWebGL2||Oe.has("OES_texture_float")||Oe.has("WEBGL_color_buffer_float")))&&!Me){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}R>=0&&R<=_.width-U&&C>=0&&C<=_.height-N&&Z.readPixels(R,C,U,N,ge.convert(de),ge.convert(ve),$)}finally{let ce=P!==null?Ze.get(P).__webglFramebuffer:null;De.bindFramebuffer(Z.FRAMEBUFFER,ce)}}},this.copyFramebufferToTexture=function(_,R,C=0){let U=Math.pow(2,-C),N=Math.floor(R.image.width*U),$=Math.floor(R.image.height*U);T.setTexture2D(R,0),Z.copyTexSubImage2D(Z.TEXTURE_2D,C,0,0,_.x,_.y,N,$),De.unbindTexture()},this.copyTextureToTexture=function(_,R,C,U=0){let N=R.image.width,$=R.image.height,Y=ge.convert(C.format),Q=ge.convert(C.type);T.setTexture2D(C,0),Z.pixelStorei(Z.UNPACK_FLIP_Y_WEBGL,C.flipY),Z.pixelStorei(Z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),Z.pixelStorei(Z.UNPACK_ALIGNMENT,C.unpackAlignment),R.isDataTexture?Z.texSubImage2D(Z.TEXTURE_2D,U,_.x,_.y,N,$,Y,Q,R.image.data):R.isCompressedTexture?Z.compressedTexSubImage2D(Z.TEXTURE_2D,U,_.x,_.y,R.mipmaps[0].width,R.mipmaps[0].height,Y,R.mipmaps[0].data):Z.texSubImage2D(Z.TEXTURE_2D,U,_.x,_.y,Y,Q,R.image),U===0&&C.generateMipmaps&&Z.generateMipmap(Z.TEXTURE_2D),De.unbindTexture()},this.copyTextureToTexture3D=function(_,R,C,U,N=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let $=_.max.x-_.min.x+1,Y=_.max.y-_.min.y+1,Q=_.max.z-_.min.z+1,ce=ge.convert(U.format),de=ge.convert(U.type),ve;if(U.isData3DTexture)T.setTexture3D(U,0),ve=Z.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)T.setTexture2DArray(U,0),ve=Z.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}Z.pixelStorei(Z.UNPACK_FLIP_Y_WEBGL,U.flipY),Z.pixelStorei(Z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),Z.pixelStorei(Z.UNPACK_ALIGNMENT,U.unpackAlignment);let Me=Z.getParameter(Z.UNPACK_ROW_LENGTH),be=Z.getParameter(Z.UNPACK_IMAGE_HEIGHT),Ce=Z.getParameter(Z.UNPACK_SKIP_PIXELS),He=Z.getParameter(Z.UNPACK_SKIP_ROWS),ft=Z.getParameter(Z.UNPACK_SKIP_IMAGES),$e=C.isCompressedTexture?C.mipmaps[N]:C.image;Z.pixelStorei(Z.UNPACK_ROW_LENGTH,$e.width),Z.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,$e.height),Z.pixelStorei(Z.UNPACK_SKIP_PIXELS,_.min.x),Z.pixelStorei(Z.UNPACK_SKIP_ROWS,_.min.y),Z.pixelStorei(Z.UNPACK_SKIP_IMAGES,_.min.z),C.isDataTexture||C.isData3DTexture?Z.texSubImage3D(ve,N,R.x,R.y,R.z,$,Y,Q,ce,de,$e.data):C.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),Z.compressedTexSubImage3D(ve,N,R.x,R.y,R.z,$,Y,Q,ce,$e.data)):Z.texSubImage3D(ve,N,R.x,R.y,R.z,$,Y,Q,ce,de,$e),Z.pixelStorei(Z.UNPACK_ROW_LENGTH,Me),Z.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,be),Z.pixelStorei(Z.UNPACK_SKIP_PIXELS,Ce),Z.pixelStorei(Z.UNPACK_SKIP_ROWS,He),Z.pixelStorei(Z.UNPACK_SKIP_IMAGES,ft),N===0&&U.generateMipmaps&&Z.generateMipmap(ve),De.unbindTexture()},this.initTexture=function(_){_.isCubeTexture?T.setTextureCube(_,0):_.isData3DTexture?T.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?T.setTexture2DArray(_,0):T.setTexture2D(_,0),De.unbindTexture()},this.resetState=function(){O=0,I=0,P=null,De.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===al?"display-p3":"srgb",t.unpackColorSpace=dt.workingColorSpace===ia?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===lt?qi:Od}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===qi?lt:Et}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},kc=class extends mr{};kc.prototype.isWebGL1Renderer=!0;var Ds=class extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},gr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ec,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Fn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},un=new B,vr=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyMatrix4(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyNormalMatrix(e),this.setXYZ(t,un.x,un.y,un.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.transformDirection(e),this.setXYZ(t,un.x,un.y,un.z);return this}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Gn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Gn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Gn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Gn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array),r=_t(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new At(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var rd=new B,od=new Mt,ad=new Mt,ey=new B,cd=new Ke,go=new B,mc=new Mn,ld=new Ke,gc=new li,Fo=class extends at{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Wh,this.bindMatrix=new Ke,this.bindMatrixInverse=new Ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new nn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,go),this.boundingBox.expandByPoint(go)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Mn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,go),this.boundingSphere.expandByPoint(go)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mc.copy(this.boundingSphere),mc.applyMatrix4(i),e.ray.intersectsSphere(mc)!==!1&&(ld.copy(i).invert(),gc.copy(e.ray).applyMatrix4(ld),!(this.boundingBox!==null&&gc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,gc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Mt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Wh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Am?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;od.fromBufferAttribute(i.attributes.skinIndex,e),ad.fromBufferAttribute(i.attributes.skinWeight,e),rd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=ad.getComponent(r);if(o!==0){let a=od.getComponent(r);cd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(ey.copy(rd).applyMatrix4(cd),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},_r=class extends Lt{constructor(){super(),this.isBone=!0,this.type="Bone"}},wi=class extends Gt{constructor(e=null,t=1,n=1,i,r,o,a,c,l=Pt,h=Pt,u,d){super(null,o,a,c,l,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},hd=new Ke,ty=new Ke,Bo=class s{constructor(e=[],t=[]){this.uuid=Fn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ke;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:ty;hd.multiplyMatrices(a,t[r]),hd.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new wi(t,e,e,on,tn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new _r),this.bones.push(o),this.boneInverses.push(new Ke().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},Zi=class extends At{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ys=new Ke,ud=new Ke,vo=[],dd=new nn,ny=new Ke,tr=new at,nr=new Mn,ji=class extends at{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Zi(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,ny)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new nn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ys),dd.copy(e.boundingBox).applyMatrix4(ys),this.boundingBox.union(dd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Mn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ys),nr.copy(e.boundingSphere).applyMatrix4(ys),this.boundingSphere.union(nr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,i=this.count;if(tr.geometry=this.geometry,tr.material=this.material,tr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),nr.copy(this.boundingSphere),nr.applyMatrix4(n),e.ray.intersectsSphere(nr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ys),ud.multiplyMatrices(n,ys),tr.matrixWorld=ud,tr.raycast(e,vo);for(let o=0,a=vo.length;o<a;o++){let c=vo[o];c.instanceId=r,c.object=this,t.push(c)}vo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Zi(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var xr=class extends fn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},fd=new B,pd=new B,md=new Ke,vc=new li,_o=new Mn,Us=class extends Lt{constructor(e=new Xt,t=new xr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)fd.fromBufferAttribute(t,i-1),pd.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=fd.distanceTo(pd);e.setAttribute("lineDistance",new Rt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_o.copy(n.boundingSphere),_o.applyMatrix4(i),_o.radius+=r,e.ray.intersectsSphere(_o)===!1)return;md.copy(i).invert(),vc.copy(e.ray).applyMatrix4(md);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new B,h=new B,u=new B,d=new B,f=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let p=Math.max(0,o.start),S=Math.min(g.count,o.start+o.count);for(let y=p,A=S-1;y<A;y+=f){let O=g.getX(y),I=g.getX(y+1);if(l.fromBufferAttribute(m,O),h.fromBufferAttribute(m,I),vc.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);let k=e.ray.origin.distanceTo(d);k<e.near||k>e.far||t.push({distance:k,point:u.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{let p=Math.max(0,o.start),S=Math.min(m.count,o.start+o.count);for(let y=p,A=S-1;y<A;y+=f){if(l.fromBufferAttribute(m,y),h.fromBufferAttribute(m,y+1),vc.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);let I=e.ray.origin.distanceTo(d);I<e.near||I>e.far||t.push({distance:I,point:u.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},gd=new B,vd=new B,zo=class extends Us{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)gd.fromBufferAttribute(t,i),vd.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+gd.distanceTo(vd);e.setAttribute("lineDistance",new Rt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ko=class extends Us{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},yr=class extends fn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},_d=new Ke,Hc=new li,xo=new Mn,yo=new B,Ho=class extends Lt{constructor(e=new Xt,t=new yr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xo.copy(n.boundingSphere),xo.applyMatrix4(i),xo.radius+=r,e.ray.intersectsSphere(xo)===!1)return;_d.copy(i).invert(),Hc.copy(e.ray).applyMatrix4(_d);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=d,v=f;g<v;g++){let m=l.getX(g);yo.fromBufferAttribute(u,m),xd(yo,m,c,i,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,v=f;g<v;g++)yo.fromBufferAttribute(u,g),xd(yo,g,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function xd(s,e,t,n,i,r,o){let a=Hc.distanceSqToPoint(s);if(a<t){let c=new B;Hc.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}var Ti=class extends Gt{constructor(e,t,n,i,r,o,a,c,l){super(e,t,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Mr=class s extends Xt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new B,h=new Re;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Rt(o,3)),this.setAttribute("normal",new Rt(a,3)),this.setAttribute("uv",new Rt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}};var Ns=class s extends Xt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new B,d=new B,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){let S=[],y=p/n,A=0;p===0&&o===0?A=.5/t:p===n&&c===Math.PI&&(A=-.5/t);for(let O=0;O<=t;O++){let I=O/t;u.x=-e*Math.cos(i+I*r)*Math.sin(o+y*a),u.y=e*Math.cos(o+y*a),u.z=e*Math.sin(i+I*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(I+A,1-y),S.push(l++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<t;S++){let y=h[p][S+1],A=h[p][S],O=h[p+1][S],I=h[p+1][S+1];(p!==0||o>0)&&f.push(y,A,I),(p!==n-1||c<Math.PI)&&f.push(A,O,I)}this.setIndex(f),this.setAttribute("position",new Rt(g,3)),this.setAttribute("normal",new Rt(v,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Vo=class s extends Xt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let o=[],a=[],c=[],l=[],h=new B,u=new B,d=new B;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){let v=g/i*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){let v=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,S=(i+1)*f+g;o.push(v,m,S),o.push(m,p,S)}this.setIndex(o),this.setAttribute("position",new Rt(a,3)),this.setAttribute("normal",new Rt(c,3)),this.setAttribute("uv",new Rt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Go=class extends fn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Le(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}},Wo=class extends Dt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Os=class extends fn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ol,this.normalScale=new Re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Cn=class extends Os{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Kt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Le(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Le(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Le(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Xo=class extends fn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ol,this.normalScale=new Re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}};function Mo(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function iy(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function sy(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function yd(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)i[o++]=s[a+c]}return i}function Yd(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}var Ai=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Vc=class extends Ai{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:gu,endingEnd:gu}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case vu:r=e,a=2*t-n;break;case _u:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case vu:o=e,c=2*n-t;break;case _u:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),v=g*g,m=v*g,p=-d*m+2*d*v-d*g,S=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*v+.5*g,A=f*m-f*v;for(let O=0;O!==a;++O)r[O]=p*o[h+O]+S*o[l+O]+y*o[c+O]+A*o[u+O];return r}},Gc=class extends Ai{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},Wc=class extends Ai{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Pn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Mo(t,this.TimeBufferType),this.values=Mo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Mo(e.times,Array),values:Mo(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Wc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Gc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Vc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Cs:t=this.InterpolantFactoryMethodDiscrete;break;case Yi:t=this.InterpolantFactoryMethodLinear;break;case qa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Cs;case this.InterpolantFactoryMethodLinear:return Yi;case this.InterpolantFactoryMethodSmooth:return qa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&iy(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===qa,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(i)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let v=t[u+g];if(v!==t[d+g]||v!==t[f+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Pn.prototype.TimeBufferType=Float32Array;Pn.prototype.ValueBufferType=Float32Array;Pn.prototype.DefaultInterpolation=Yi;var Ri=class extends Pn{};Ri.prototype.ValueTypeName="bool";Ri.prototype.ValueBufferType=Array;Ri.prototype.DefaultInterpolation=Cs;Ri.prototype.InterpolantFactoryMethodLinear=void 0;Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var qo=class extends Pn{};qo.prototype.ValueTypeName="color";var hi=class extends Pn{};hi.prototype.ValueTypeName="number";var Xc=class extends Ai{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t),l=e*a;for(let h=l+a;l!==h;l+=4)pn.slerpFlat(r,0,o,l-a,o,l,c);return r}},jn=class extends Pn{InterpolantFactoryMethodLinear(e){return new Xc(this.times,this.values,this.getValueSize(),e)}};jn.prototype.ValueTypeName="quaternion";jn.prototype.DefaultInterpolation=Yi;jn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ci=class extends Pn{};Ci.prototype.ValueTypeName="string";Ci.prototype.ValueBufferType=Array;Ci.prototype.DefaultInterpolation=Cs;Ci.prototype.InterpolantFactoryMethodLinear=void 0;Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var ui=class extends Pn{};ui.prototype.ValueTypeName="vector";var Yo=class{constructor(e,t=-1,n,i=Nm){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Fn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(oy(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Pn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=sy(c);c=yd(c,1,h),l=yd(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new hi(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(l)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,f,g,v){if(f.length!==0){let m=[],p=[];Yd(f,m,p,g),m.length!==0&&v.push(new u(d,m,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let v=0;v<d[g].morphTargets.length;v++)f[d[g].morphTargets[v]]=-1;for(let v in f){let m=[],p=[];for(let S=0;S!==d[g].morphTargets.length;++S){let y=d[g];m.push(y.time),p.push(y.morphTarget===v?1:0)}i.push(new hi(".morphTargetInfluence["+v+"]",m,p))}c=f.length*o}else{let f=".bones["+t[u].name+"]";n(ui,f+".position",d,"pos",i),n(jn,f+".quaternion",d,"rot",i),n(ui,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function ry(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return hi;case"vector":case"vector2":case"vector3":case"vector4":return ui;case"color":return qo;case"quaternion":return jn;case"bool":case"boolean":return Ri;case"string":return Ci}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function oy(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=ry(s.type);if(s.times===void 0){let t=[],n=[];Yd(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var bi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},qc=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},ay=new qc,In=class{constructor(e){this.manager=e!==void 0?e:ay,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};In.DEFAULT_MATERIAL_NAME="__DEFAULT";var si={},Yc=class extends Error{constructor(e,t){super(e),this.response=t}},di=class extends In{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=bi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(si[e]!==void 0){si[e].push({onLoad:t,onProgress:n,onError:i});return}si[e]=[],si[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=si[e],u=l.body.getReader(),d=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),f=d?parseInt(d):0,g=f!==0,v=0,m=new ReadableStream({start(p){S();function S(){u.read().then(({done:y,value:A})=>{if(y)p.close();else{v+=A.byteLength;let O=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:f});for(let I=0,P=h.length;I<P;I++){let k=h[I];k.onProgress&&k.onProgress(O)}p.enqueue(A),S()}})}}});return new Response(m)}else throw new Yc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{bi.add(e,l);let h=si[e];delete si[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=si[e];if(h===void 0)throw this.manager.itemError(e),l;delete si[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Zc=class extends In{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=bi.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=hr("img");function c(){h(),bi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var Fs=class extends In{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new wi,a=new di(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(c){let l;try{l=r.parse(c)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}l.image!==void 0?o.image=l.image:l.data!==void 0&&(o.image.width=l.width,o.image.height=l.height,o.image.data=l.data),o.wrapS=l.wrapS!==void 0?l.wrapS:Nt,o.wrapT=l.wrapT!==void 0?l.wrapT:Nt,o.magFilter=l.magFilter!==void 0?l.magFilter:bt,o.minFilter=l.minFilter!==void 0?l.minFilter:bt,o.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0?o.colorSpace=l.colorSpace:l.encoding!==void 0&&(o.encoding=l.encoding),l.flipY!==void 0&&(o.flipY=l.flipY),l.format!==void 0&&(o.format=l.format),l.type!==void 0&&(o.type=l.type),l.mipmaps!==void 0&&(o.mipmaps=l.mipmaps,o.minFilter=Bn),l.mipmapCount===1&&(o.minFilter=bt),l.generateMipmaps!==void 0&&(o.generateMipmaps=l.generateMipmaps),o.needsUpdate=!0,t&&t(o,l)},n,i),o}},Pi=class extends In{constructor(e){super(e)}load(e,t,n,i){let r=new Gt,o=new Zc(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},Sr=class extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Le(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}};var _c=new Ke,Md=new B,Sd=new B,br=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Re(512,512),this.map=null,this.mapPass=null,this.matrix=new Ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fr,this._frameExtents=new Re(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Md.setFromMatrixPosition(e.matrixWorld),t.position.copy(Md),Sd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sd),t.updateMatrixWorld(),_c.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_c),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(_c)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},jc=class extends br{constructor(){super(new zt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Ps*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Bs=class extends Sr{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new jc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},bd=new Ke,ir=new B,xc=new B,Kc=class extends br{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Re(4,2),this._viewportCount=6,this._viewports=[new Mt(2,1,1,1),new Mt(0,1,1,1),new Mt(3,1,1,1),new Mt(1,1,1,1),new Mt(3,0,1,1),new Mt(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ir.setFromMatrixPosition(e.matrixWorld),n.position.copy(ir),xc.copy(n.position),xc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(xc),n.updateMatrixWorld(),i.makeTranslation(-ir.x,-ir.y,-ir.z),bd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bd)}},Zo=class extends Sr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Kc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},$c=class extends br{constructor(){super(new Yn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},jo=class extends Sr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new $c}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Ii=class{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Ko=class extends In{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=bi.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return bi.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),bi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});bi.add(e,c),r.manager.itemStart(e)}};var zs=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ed(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=Ed();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function Ed(){return(typeof performance>"u"?Date:performance).now()}var hl="\\[\\]\\.:\\/",cy=new RegExp("["+hl+"]","g"),ul="[^"+hl+"]",ly="[^"+hl.replace("\\.","")+"]",hy=/((?:WC+[\/:])*)/.source.replace("WC",ul),uy=/(WCOD+)?/.source.replace("WCOD",ly),dy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ul),fy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ul),py=new RegExp("^"+hy+uy+dy+fy+"$"),my=["material","materials","bones","map"],Jc=class{constructor(e,t,n){let i=n||St.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},St=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(cy,"")}static parseTrackName(e){let t=py.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);my.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[i];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};St.Composite=Jc;St.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};St.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};St.prototype.GetterByBindingType=[St.prototype._getValue_direct,St.prototype._getValue_array,St.prototype._getValue_arrayElement,St.prototype._getValue_toArray];St.prototype.SetterByBindingTypeAndVersioning=[[St.prototype._setValue_direct,St.prototype._setValue_direct_setNeedsUpdate,St.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[St.prototype._setValue_array,St.prototype._setValue_array_setNeedsUpdate,St.prototype._setValue_array_setMatrixWorldNeedsUpdate],[St.prototype._setValue_arrayElement,St.prototype._setValue_arrayElement_setNeedsUpdate,St.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[St.prototype._setValue_fromArray,St.prototype._setValue_fromArray_setNeedsUpdate,St.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var uS=new Float32Array(1);var $o=class{constructor(e,t,n=0,i=1/0){this.ray=new li(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new ur,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Qc(e,this,n,t),n.sort(wd),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Qc(e[i],this,n,t);return n.sort(wd),n}};function wd(s,e){return s.distance-e.distance}function Qc(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){let i=s.children;for(let r=0,o=i.length;r<o;r++)Qc(i[r],e,t,!0)}}var Er=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Kt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");function Zd(){return new Ds}var gy=.1,vy=100;function jd(s,e){let{fov:t,position:n}=s.camera,i=new zt(t,e,gy,vy);return i.position.set(n.x,n.y,n.z),i}var _y={aces:Hs,agx:Ji,none:Wn};function Kd(s){let{antialias:e,preserveDrawingBuffer:t,alpha:n,maxPixelRatio:i,toneMappingExposure:r,shadows:o}=s.renderer,a=new mr({antialias:e,preserveDrawingBuffer:t,alpha:n,powerPreference:"high-performance"});return a.setPixelRatio(Math.min(window.devicePixelRatio,i)),a.setClearAlpha(0),a.outputColorSpace=lt,a.toneMapping=_y[s.renderer.toneMapping]??Hs,a.toneMappingExposure=r,o&&(a.shadowMap.enabled=!0,a.shadowMap.type=Jo),a}function $d(s,e){let{shadow:t}=e.lighting,n=new kt;n.name="LightingRig";let i=new Bs(16777215,0);return i.name="KeyLight",i.decay=2,i.distance=0,i.penumbra=1,e.renderer.shadows&&(i.castShadow=!0,i.shadow.mapSize.set(t.mapSize,t.mapSize),i.shadow.radius=t.radius,i.shadow.camera.near=t.near,i.shadow.camera.far=t.far,i.shadow.bias=t.bias,i.shadow.normalBias=t.normalBias),n.add(i),n.add(i.target),s.add(n),n}function dl(s,e,t){let n=t.lighting.keyLight;if(!(n!=null&&n.enabled))return null;let i=s.getObjectByName("KeyLight");if(!i)return null;let r=n.distance;return i.position.copy(e.direction).multiplyScalar(r),i.target.position.set(0,0,0),i.target.updateMatrixWorld(),i.angle=Math.atan(t.lighting.shadow.frustum/r),n.useColor&&i.color.copy(e.color),i.intensity=e.irradiance*n.intensityScale*r*r,i}var Jd={type:"change"},fl={type:"start"},Qd={type:"end"},ra=new li,ef=new xn,xy=Math.cos(70*Ut.DEG2RAD),oa=class extends qn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ki.ROTATE,MIDDLE:Ki.DOLLY,RIGHT:Ki.PAN},this.touches={ONE:$i.ROTATE,TWO:$i.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(L){L.addEventListener("keydown",fe),this._domElementKeyEvents=L},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",fe),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Jd),n.update(),r=i.NONE},this.update=(function(){let L=new B,oe=new pn().setFromUnitVectors(e.up,new B(0,1,0)),me=oe.clone().invert(),ge=new B,Ie=new pn,ze=new B,Be=2*Math.PI;return function(q=null){let z=n.object.position;L.copy(z).sub(n.target),L.applyQuaternion(oe),a.setFromVector3(L),n.autoRotate&&r===i.NONE&&H(M(q)),n.enableDamping?(a.theta+=c.theta*n.dampingFactor,a.phi+=c.phi*n.dampingFactor):(a.theta+=c.theta,a.phi+=c.phi);let xe=n.minAzimuthAngle,ye=n.maxAzimuthAngle;isFinite(xe)&&isFinite(ye)&&(xe<-Math.PI?xe+=Be:xe>Math.PI&&(xe-=Be),ye<-Math.PI?ye+=Be:ye>Math.PI&&(ye-=Be),xe<=ye?a.theta=Math.max(xe,Math.min(ye,a.theta)):a.theta=a.theta>(xe+ye)/2?Math.max(xe,a.theta):Math.min(ye,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&I||n.object.isOrthographicCamera?a.radius=J(a.radius):a.radius=J(a.radius*l),L.setFromSpherical(a),L.applyQuaternion(me),z.copy(n.target).add(L),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),h.set(0,0,0));let qe=!1;if(n.zoomToCursor&&I){let ke=null;if(n.object.isPerspectiveCamera){let ct=L.length();ke=J(ct*l);let ht=ct-ke;n.object.position.addScaledVector(A,ht),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let ct=new B(O.x,O.y,0);ct.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),qe=!0;let ht=new B(O.x,O.y,0);ht.unproject(n.object),n.object.position.sub(ht).add(ct),n.object.updateMatrixWorld(),ke=L.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;ke!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(ke).add(n.object.position):(ra.origin.copy(n.object.position),ra.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(ra.direction))<xy?e.lookAt(n.target):(ef.setFromNormalAndCoplanarPoint(n.object.up,n.target),ra.intersectPlane(ef,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),qe=!0);return l=1,I=!1,qe||ge.distanceToSquared(n.object.position)>o||8*(1-Ie.dot(n.object.quaternion))>o||ze.distanceToSquared(n.target)>0?(n.dispatchEvent(Jd),ge.copy(n.object.position),Ie.copy(n.object.quaternion),ze.copy(n.target),!0):!1}})(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Ae),n.domElement.removeEventListener("pointerdown",Ze),n.domElement.removeEventListener("pointercancel",b),n.domElement.removeEventListener("wheel",he),n.domElement.removeEventListener("pointermove",T),n.domElement.removeEventListener("pointerup",b),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",fe),n._domElementKeyEvents=null)};let n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},r=i.NONE,o=1e-6,a=new Er,c=new Er,l=1,h=new B,u=new Re,d=new Re,f=new Re,g=new Re,v=new Re,m=new Re,p=new Re,S=new Re,y=new Re,A=new B,O=new Re,I=!1,P=[],k={};function M(L){return L!==null?2*Math.PI/60*n.autoRotateSpeed*L:2*Math.PI/60/60*n.autoRotateSpeed}function w(L){let oe=Math.abs(L)/(100*(window.devicePixelRatio|0));return Math.pow(.95,n.zoomSpeed*oe)}function H(L){c.theta-=L}function X(L){c.phi-=L}let se=(function(){let L=new B;return function(me,ge){L.setFromMatrixColumn(ge,0),L.multiplyScalar(-me),h.add(L)}})(),D=(function(){let L=new B;return function(me,ge){n.screenSpacePanning===!0?L.setFromMatrixColumn(ge,1):(L.setFromMatrixColumn(ge,0),L.crossVectors(n.object.up,L)),L.multiplyScalar(me),h.add(L)}})(),V=(function(){let L=new B;return function(me,ge){let Ie=n.domElement;if(n.object.isPerspectiveCamera){let ze=n.object.position;L.copy(ze).sub(n.target);let Be=L.length();Be*=Math.tan(n.object.fov/2*Math.PI/180),se(2*me*Be/Ie.clientHeight,n.object.matrix),D(2*ge*Be/Ie.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(se(me*(n.object.right-n.object.left)/n.object.zoom/Ie.clientWidth,n.object.matrix),D(ge*(n.object.top-n.object.bottom)/n.object.zoom/Ie.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function W(L){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=L:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ne(L){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=L:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ie(L,oe){if(!n.zoomToCursor)return;I=!0;let me=n.domElement.getBoundingClientRect(),ge=L-me.left,Ie=oe-me.top,ze=me.width,Be=me.height;O.x=ge/ze*2-1,O.y=-(Ie/Be)*2+1,A.set(O.x,O.y,1).unproject(n.object).sub(n.object.position).normalize()}function J(L){return Math.max(n.minDistance,Math.min(n.maxDistance,L))}function te(L){u.set(L.clientX,L.clientY)}function ae(L){ie(L.clientX,L.clientX),p.set(L.clientX,L.clientY)}function ue(L){g.set(L.clientX,L.clientY)}function j(L){d.set(L.clientX,L.clientY),f.subVectors(d,u).multiplyScalar(n.rotateSpeed);let oe=n.domElement;H(2*Math.PI*f.x/oe.clientHeight),X(2*Math.PI*f.y/oe.clientHeight),u.copy(d),n.update()}function re(L){S.set(L.clientX,L.clientY),y.subVectors(S,p),y.y>0?W(w(y.y)):y.y<0&&ne(w(y.y)),p.copy(S),n.update()}function Se(L){v.set(L.clientX,L.clientY),m.subVectors(v,g).multiplyScalar(n.panSpeed),V(m.x,m.y),g.copy(v),n.update()}function _e(L){ie(L.clientX,L.clientY),L.deltaY<0?ne(w(L.deltaY)):L.deltaY>0&&W(w(L.deltaY)),n.update()}function Te(L){let oe=!1;switch(L.code){case n.keys.UP:L.ctrlKey||L.metaKey||L.shiftKey?X(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):V(0,n.keyPanSpeed),oe=!0;break;case n.keys.BOTTOM:L.ctrlKey||L.metaKey||L.shiftKey?X(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):V(0,-n.keyPanSpeed),oe=!0;break;case n.keys.LEFT:L.ctrlKey||L.metaKey||L.shiftKey?H(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):V(n.keyPanSpeed,0),oe=!0;break;case n.keys.RIGHT:L.ctrlKey||L.metaKey||L.shiftKey?H(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):V(-n.keyPanSpeed,0),oe=!0;break}oe&&(L.preventDefault(),n.update())}function Ue(L){if(P.length===1)u.set(L.pageX,L.pageY);else{let oe=Je(L),me=.5*(L.pageX+oe.x),ge=.5*(L.pageY+oe.y);u.set(me,ge)}}function Ge(L){if(P.length===1)g.set(L.pageX,L.pageY);else{let oe=Je(L),me=.5*(L.pageX+oe.x),ge=.5*(L.pageY+oe.y);g.set(me,ge)}}function Ne(L){let oe=Je(L),me=L.pageX-oe.x,ge=L.pageY-oe.y,Ie=Math.sqrt(me*me+ge*ge);p.set(0,Ie)}function tt(L){n.enableZoom&&Ne(L),n.enablePan&&Ge(L)}function Z(L){n.enableZoom&&Ne(L),n.enableRotate&&Ue(L)}function wt(L){if(P.length==1)d.set(L.pageX,L.pageY);else{let me=Je(L),ge=.5*(L.pageX+me.x),Ie=.5*(L.pageY+me.y);d.set(ge,Ie)}f.subVectors(d,u).multiplyScalar(n.rotateSpeed);let oe=n.domElement;H(2*Math.PI*f.x/oe.clientHeight),X(2*Math.PI*f.y/oe.clientHeight),u.copy(d)}function Oe(L){if(P.length===1)v.set(L.pageX,L.pageY);else{let oe=Je(L),me=.5*(L.pageX+oe.x),ge=.5*(L.pageY+oe.y);v.set(me,ge)}m.subVectors(v,g).multiplyScalar(n.panSpeed),V(m.x,m.y),g.copy(v)}function We(L){let oe=Je(L),me=L.pageX-oe.x,ge=L.pageY-oe.y,Ie=Math.sqrt(me*me+ge*ge);S.set(0,Ie),y.set(0,Math.pow(S.y/p.y,n.zoomSpeed)),W(y.y),p.copy(S);let ze=(L.pageX+oe.x)*.5,Be=(L.pageY+oe.y)*.5;ie(ze,Be)}function De(L){n.enableZoom&&We(L),n.enablePan&&Oe(L)}function pt(L){n.enableZoom&&We(L),n.enableRotate&&wt(L)}function Ze(L){n.enabled!==!1&&(P.length===0&&(n.domElement.setPointerCapture(L.pointerId),n.domElement.addEventListener("pointermove",T),n.domElement.addEventListener("pointerup",b)),Fe(L),L.pointerType==="touch"?Pe(L):K(L))}function T(L){n.enabled!==!1&&(L.pointerType==="touch"?Ee(L):pe(L))}function b(L){Xe(L),P.length===0&&(n.domElement.releasePointerCapture(L.pointerId),n.domElement.removeEventListener("pointermove",T),n.domElement.removeEventListener("pointerup",b)),n.dispatchEvent(Qd),r=i.NONE}function K(L){let oe;switch(L.button){case 0:oe=n.mouseButtons.LEFT;break;case 1:oe=n.mouseButtons.MIDDLE;break;case 2:oe=n.mouseButtons.RIGHT;break;default:oe=-1}switch(oe){case Ki.DOLLY:if(n.enableZoom===!1)return;ae(L),r=i.DOLLY;break;case Ki.ROTATE:if(L.ctrlKey||L.metaKey||L.shiftKey){if(n.enablePan===!1)return;ue(L),r=i.PAN}else{if(n.enableRotate===!1)return;te(L),r=i.ROTATE}break;case Ki.PAN:if(L.ctrlKey||L.metaKey||L.shiftKey){if(n.enableRotate===!1)return;te(L),r=i.ROTATE}else{if(n.enablePan===!1)return;ue(L),r=i.PAN}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(fl)}function pe(L){switch(r){case i.ROTATE:if(n.enableRotate===!1)return;j(L);break;case i.DOLLY:if(n.enableZoom===!1)return;re(L);break;case i.PAN:if(n.enablePan===!1)return;Se(L);break}}function he(L){n.enabled===!1||n.enableZoom===!1||r!==i.NONE||(L.preventDefault(),n.dispatchEvent(fl),_e(L),n.dispatchEvent(Qd))}function fe(L){n.enabled===!1||n.enablePan===!1||Te(L)}function Pe(L){switch(le(L),P.length){case 1:switch(n.touches.ONE){case $i.ROTATE:if(n.enableRotate===!1)return;Ue(L),r=i.TOUCH_ROTATE;break;case $i.PAN:if(n.enablePan===!1)return;Ge(L),r=i.TOUCH_PAN;break;default:r=i.NONE}break;case 2:switch(n.touches.TWO){case $i.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;tt(L),r=i.TOUCH_DOLLY_PAN;break;case $i.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Z(L),r=i.TOUCH_DOLLY_ROTATE;break;default:r=i.NONE}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(fl)}function Ee(L){switch(le(L),r){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;wt(L),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;Oe(L),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;De(L),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;pt(L),n.update();break;default:r=i.NONE}}function Ae(L){n.enabled!==!1&&L.preventDefault()}function Fe(L){P.push(L.pointerId)}function Xe(L){delete k[L.pointerId];for(let oe=0;oe<P.length;oe++)if(P[oe]==L.pointerId){P.splice(oe,1);return}}function le(L){let oe=k[L.pointerId];oe===void 0&&(oe=new Re,k[L.pointerId]=oe),oe.set(L.pageX,L.pageY)}function Je(L){let oe=L.pointerId===P[0]?P[1]:P[0];return k[oe]}n.domElement.addEventListener("contextmenu",Ae),n.domElement.addEventListener("pointerdown",Ze),n.domElement.addEventListener("pointercancel",b),n.domElement.addEventListener("wheel",he,{passive:!1}),this.update()}};function tf(s,e,t){let n=t.controls,i=new oa(s,e);return i.enableDamping=n.enableDamping,i.dampingFactor=n.dampingFactor,i.minDistance=n.minDistance,i.maxDistance=n.maxDistance,i.maxPolarAngle=n.maxPolarAngle,i.enablePan=n.enablePan,i.autoRotate=!1,i.update(),i}var pl={from:"#include <begin_vertex>",to:`#include <begin_vertex>
	vPlanePos = position.xy;`},ml={from:"gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );",to:`float dist = length( vPlanePos );
    float reach = 1.0 - smoothstep( falloffStart, falloffEnd, dist );
    gl_FragColor = vec4( color, opacity * reach * ( 1.0 - studioShadowMask() ) );`},yy=`
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
`;function nf(s){let e=s.shadowCatcher,t=s.lighting.shadow.frustum*2;e.size>t&&console.warn(`shadowCatcher.size (${e.size}) больше области карты теней (${t}). По кадру пойдёт бледная полоса — уменьшите размер или поднимите lighting.shadow.frustum.`);let n=new Go;n.color.set(e.tint??"#000000"),n.opacity=e.opacity,n.transparent=!0,n.depthWrite=!1;let i={falloffStart:{value:e.falloffStart??.2},falloffEnd:{value:e.falloffEnd??1},studioPenumbra:{value:new Re(2,42)},studioShadowCamera:{value:new Re(s.lighting.shadow.near,s.lighting.shadow.far)},studioShadowEnabled:{value:!1}};n.onBeforeCompile=o=>{if(o.uniforms.falloffStart=i.falloffStart,o.uniforms.falloffEnd=i.falloffEnd,o.uniforms.studioPenumbra=i.studioPenumbra,o.uniforms.studioShadowCamera=i.studioShadowCamera,o.uniforms.studioShadowEnabled=i.studioShadowEnabled,!o.vertexShader.includes(pl.from)||!o.fragmentShader.includes(ml.from)){console.warn("ShadowCatcher: шейдер ShadowMaterial изменился — тень будет без затухания.");return}o.vertexShader=`varying vec2 vPlanePos;
${o.vertexShader}`.replace(pl.from,pl.to),o.fragmentShader=`uniform float falloffStart;
uniform float falloffEnd;
varying vec2 vPlanePos;
${o.fragmentShader}`.replace(ml.from,ml.to).replace("#include <shadowmask_pars_fragment>",`#include <shadowmask_pars_fragment>
`+yy)};let r=new at(new Sn(e.size,e.size),n);return r.rotation.x=-Math.PI/2,r.receiveShadow=!0,r.renderOrder=-1,r.layers.set(1),r.name="ShadowCatcher",{plane:r,setHeight(o){r.position.y=o},setOpacity(o){n.opacity=o},setPenumbra(o){i.studioShadowEnabled.value=!!o,o&&i.studioPenumbra.value.set(o.near,o.far)},setFalloff(o,a){o!=null&&(i.falloffStart.value=o),a!=null&&(i.falloffEnd.value=a)},dispose(){r.geometry.dispose(),n.dispose(),r.removeFromParent()}}}var sf={name:"HorizontalBlurShader",uniforms:{tDiffuse:{value:null},h:{value:.001953125}},vertexShader:`

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

		}`};var rf={name:"VerticalBlurShader",uniforms:{tDiffuse:{value:null},v:{value:.001953125}},vertexShader:`

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

		}`};var Qi,of,vl,gl=class{constructor(e){gn(this,Qi);let{size:t,resolution:n,height:i,blur:r,opacity:o,darkness:a,falloff:c}=e.ambientShadow;this.config=e,this.blurAmount=r,this.group=new kt,this.group.name="AmbientContactShadow";let l={depthBuffer:!1,stencilBuffer:!1};this.target=new Wt(n,n,{...l,depthBuffer:!0}),this.blurTarget=new Wt(n,n,l),this.target.texture.generateMipmaps=!1,this.blurTarget.texture.generateMipmaps=!1;let h=new Sn(t,t).rotateX(Math.PI/2);this.plane=new at(h,new Bt({map:this.target.texture,opacity:o,transparent:!0,depthWrite:!1})),this.plane.scale.y=-1,this.plane.renderOrder=-2,this.plane.layers.set(1),this.group.add(this.plane),this.blurPlane=new at(h),this.blurPlane.visible=!1,this.group.add(this.blurPlane),this.camera=new Yn(-t/2,t/2,t/2,-t/2,0,i),this.camera.rotation.x=Math.PI/2,this.group.add(this.camera),this.blurCamera=this.camera.clone(),this.group.add(this.blurCamera),this.depthMaterial=G(this,Qi,of).call(this,a,c),this.horizontalBlur=new Dt(sf),this.verticalBlur=new Dt(rf)}setAppearance(e){let{height:t,darkness:n,blur:i,opacity:r,falloff:o,resolution:a,nearestSurface:c=!1}={...this.config.ambientShadow,...e};this.target.setSize(a,a),this.blurTarget.setSize(a,a),this.depthMaterial.depthTest=c,this.camera.position.y=c?-1e-4:0,this.camera.far=t,this.camera.updateProjectionMatrix(),this.blurCamera.far=t,this.blurCamera.updateProjectionMatrix(),this.depthMaterial.userData.darkness.value=n,this.depthMaterial.userData.falloff.value=o??1,this.blurAmount=i,this.plane.material.opacity=r}update(e,t){let n=e.shadowMap.autoUpdate;e.shadowMap.autoUpdate=!1;let i=t.background;this.plane.visible=!1,t.background=null,t.overrideMaterial=this.depthMaterial;let r=[];t.traverse(o=>{o.visible&&o.userData.excludeFromShadow&&(o.visible=!1,r.push(o))}),e.setRenderTarget(this.target),e.render(t,this.camera);for(let o of r)o.visible=!0;t.overrideMaterial=null,G(this,Qi,vl).call(this,e,this.blurAmount),G(this,Qi,vl).call(this,e,this.blurAmount*.4),e.setRenderTarget(null),t.background=i,this.plane.visible=!0,e.shadowMap.autoUpdate=n}dispose(){this.target.dispose(),this.blurTarget.dispose(),this.plane.geometry.dispose(),this.plane.material.dispose(),this.depthMaterial.dispose(),this.horizontalBlur.dispose(),this.verticalBlur.dispose()}};Qi=new WeakSet,of=function(e,t){let n=new pr;return n.userData.darkness={value:e},n.userData.falloff={value:t??1},n.onBeforeCompile=i=>{i.uniforms.darkness=n.userData.darkness,i.uniforms.falloff=n.userData.falloff;let r="gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );",o="gl_FragColor = vec4( vec3( 0.0 ), pow( 1.0 - fragCoordZ, falloff ) * darkness );";if(!i.fragmentShader.includes(r)){console.warn("AmbientContactShadow: шейдер MeshDepthMaterial изменился — тень будет неверной.");return}i.fragmentShader=`uniform float darkness;
uniform float falloff;
${i.fragmentShader}`.replace(r,o)},n},vl=function(e,t){this.blurPlane.visible=!0,this.blurPlane.material=this.horizontalBlur,this.horizontalBlur.uniforms.tDiffuse.value=this.target.texture,this.horizontalBlur.uniforms.h.value=t/256,e.setRenderTarget(this.blurTarget),e.render(this.blurPlane,this.blurCamera),this.blurPlane.material=this.verticalBlur,this.verticalBlur.uniforms.tDiffuse.value=this.blurTarget.texture,this.verticalBlur.uniforms.v.value=t/256,e.setRenderTarget(this.target),e.render(this.blurPlane,this.blurCamera),this.blurPlane.visible=!1};function af(s){return new gl(s)}var Ar=24,My=128,xl=1842206,Sy=16777215,by=15214860,_l={light:{color:xl,ring:.18,ticks:.3},dark:{color:Sy,ring:.32,ticks:.55}},Ey=.45,wy=s=>-s,cf=s=>-s,rt,lf,Rr,hf,aa,Ml,Sl,uf,df,ff,bl,El,wl,yl=class{constructor({scene:e,camera:t,controls:n,domElement:i,config:r,onRotate:o,onDragStart:a,onDragEnd:c}){gn(this,rt);this.camera=t,this.controls=n,this.domElement=i,this.options=r.turntable,this.onRotate=o,this.onDragStart=a,this.onDragEnd=c,this.metrics=null,this.visible=!1,this.pinned=!1,this.dragging=!1,this.capturing=!1,this.fade=0,this.theme=_l.light,this.snap=null,this.raycaster=new $o,this.pointer=new Re,this.floor=new xn(new B(0,1,0),0),this.hit=new B,this.group=new kt,this.group.name="Turntable",this.group.visible=!1,this.group.userData.excludeFromShadow=!0,G(this,rt,lf).call(this),this.group.traverse(l=>l.layers.set(1)),this.raycaster.layers.enable(1),e.add(this.group),G(this,rt,hf).call(this)}setBackground(e){let t=.2126*e.r+.7152*e.g+.0722*e.b;this.theme=t<.4?_l.dark:_l.light,this.materials.ring.color.setHex(this.theme.color),this.materials.ticks.color.setHex(this.theme.color),G(this,rt,wl).call(this)}setMetrics(e){if(this.metrics=e,!e){this.group.visible=!1;return}let{center:t,baseY:n,radius:i}=e;this.group.position.set(t.x,n+i*this.options.lift,t.z),this.group.scale.setScalar(i),this.floor.constant=-this.group.position.y}togglePinned(){return this.pinned=!this.pinned,this.pinned?this.show():this.dragging||this.hide(),this.pinned}show(){this.visible=!0}setHiddenForCapture(e){this.capturing=e,this.group.visible=!e&&this.fade>.001&&!!this.metrics}hide(){this.dragging||this.pinned||(this.visible=!1,this.domElement.style.cursor="")}update(e,t=.016){var o,a;this.currentRotation=e;let n=!1,i=this.visible?1:0;if(this.fade!==i){let c=t/.2;this.fade=i>this.fade?Math.min(this.fade+c,1):Math.max(this.fade-c,0),G(this,rt,wl).call(this),n=!0}if(this.snap){this.snap.time+=t;let c=Math.min(this.snap.time/Ey,1),l=1-(1-c)**3;(o=this.onRotate)==null||o.call(this,this.snap.from+(this.snap.to-this.snap.from)*l),c>=1&&(this.snap=null,(a=this.onDragEnd)==null||a.call(this)),n=!0}if(this.group.visible=!this.capturing&&this.fade>.001&&!!this.metrics,!this.group.visible)return n;let r=wy(e)*Math.PI/180;return this.knob.position.set(Math.cos(r),0,Math.sin(r)),this.knob.quaternion.copy(this.camera.quaternion),n}dispose(){this.group.traverse(e=>{e.geometry&&e.geometry.dispose()});for(let e of Object.values(this.materials))e.dispose();this.knobTarget.material.dispose(),this.tickTargets.material.dispose(),this.group.removeFromParent()}};rt=new WeakSet,lf=function(){this.materials={ring:G(this,rt,Rr).call(this,xl,.18),ticks:G(this,rt,Rr).call(this,xl,.3),knob:G(this,rt,Rr).call(this,by,1),knobRing:G(this,rt,Rr).call(this,16777215,1)};let e=new at(new Vo(1,.006,6,My).rotateX(Math.PI/2),this.materials.ring);this.group.add(e);let t=[],n=new Ke;for(let a=0;a<Ar;a++){let c=a/Ar*Math.PI*2;n.setPosition(Math.cos(c),0,Math.sin(c)),t.push(n.clone())}let i=a=>(t.forEach((c,l)=>a.setMatrixAt(l,c)),a.instanceMatrix.needsUpdate=!0,this.group.add(a),a);this.dots=i(new ji(new Ns(.018,8,6),this.materials.ticks,Ar)),this.tickTargets=i(new ji(new Ns(.075,6,4),new Bt({visible:!1}),Ar)),this.knob=new kt;let r=new at(new Mr(.085,32),this.materials.knobRing),o=new at(new Mr(.062,32),this.materials.knob);o.position.z=.001,this.knob.add(r,o),this.group.add(this.knob),this.knobTarget=new at(new Ns(.16,8,6),new Bt({visible:!1})),this.knob.add(this.knobTarget)},Rr=function(e,t){return new Bt({color:e,opacity:t,transparent:!0,toneMapped:!1})},hf=function(){let e=this.domElement;e.addEventListener("pointerdown",t=>G(this,rt,uf).call(this,t)),e.addEventListener("pointermove",t=>G(this,rt,ff).call(this,t)),e.addEventListener("pointerup",t=>G(this,rt,bl).call(this,t)),e.addEventListener("pointercancel",t=>G(this,rt,bl).call(this,t))},aa=function(e){let t=this.domElement.getBoundingClientRect();this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera)},Ml=function(e){return!this.visible||!this.metrics?!1:(G(this,rt,aa).call(this,e),this.raycaster.intersectObject(this.knobTarget,!1).length>0)},Sl=function(e){if(!this.visible||!this.metrics)return null;G(this,rt,aa).call(this,e);let[t]=this.raycaster.intersectObject(this.tickTargets,!1);return t?t.instanceId??null:null},uf=function(e){var n,i,r;if(G(this,rt,Ml).call(this,e)){e.preventDefault(),this.dragging=!0,this.snap=null,(i=(n=this.domElement).setPointerCapture)==null||i.call(n,e.pointerId),this.controls.enabled=!1,(r=this.onDragStart)==null||r.call(this),G(this,rt,El).call(this,e);return}let t=G(this,rt,Sl).call(this,e);t!==null&&(e.preventDefault(),G(this,rt,df).call(this,cf(t/Ar*360)))},df=function(e){var i;let t=this.currentRotation??0,n=((e-t)%360+540)%360-180;Math.abs(n)<.1||(this.snap={from:t,to:t+n,time:0},(i=this.onDragStart)==null||i.call(this))},ff=function(e){if(this.dragging){G(this,rt,El).call(this,e);return}this.visible&&(G(this,rt,Ml).call(this,e)?this.domElement.style.cursor="grab":this.domElement.style.cursor=G(this,rt,Sl).call(this,e)!==null?"pointer":"")},bl=function(e){var t,n,i;this.dragging&&(this.dragging=!1,(n=(t=this.domElement).releasePointerCapture)==null||n.call(t,e.pointerId),this.controls.enabled=!0,this.domElement.style.cursor="",(i=this.onDragEnd)==null||i.call(this),this.pinned||this.hide())},El=function(e){var i;if(!this.metrics||(G(this,rt,aa).call(this,e),!this.raycaster.ray.intersectPlane(this.floor,this.hit)))return;let t=this.hit.x-this.group.position.x,n=this.hit.z-this.group.position.z;(i=this.onRotate)==null||i.call(this,cf(Math.atan2(n,t)*180/Math.PI))},wl=function(){let{ring:e,ticks:t,knob:n,knobRing:i}=this.materials;e.opacity=this.theme.ring*this.fade,t.opacity=this.theme.ticks*this.fade,n.opacity=this.fade,i.opacity=this.fade};function pf(s){return new yl(s)}var mf=function(s){return URL.createObjectURL(new Blob([s],{type:"text/javascript"}))},Ty=function(s){return new Worker(s)};try{URL.revokeObjectURL(mf(""))}catch{mf=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)},Ty=function(e){return new Worker(e,{type:"module"})}}var Ln=Uint8Array,Di=Uint16Array,Rl=Uint32Array,gf=new Ln([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),vf=new Ln([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ay=new Ln([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),_f=function(s,e){for(var t=new Di(31),n=0;n<31;++n)t[n]=e+=1<<s[n-1];for(var i=new Rl(t[30]),n=1;n<30;++n)for(var r=t[n];r<t[n+1];++r)i[r]=r-t[n]<<5|n;return[t,i]},xf=_f(gf,2),yf=xf[0],Ry=xf[1];yf[28]=258,Ry[258]=28;var Mf=_f(vf,0),Cy=Mf[0],DS=Mf[1],Cl=new Di(32768);for(mt=0;mt<32768;++mt)fi=(mt&43690)>>>1|(mt&21845)<<1,fi=(fi&52428)>>>2|(fi&13107)<<2,fi=(fi&61680)>>>4|(fi&3855)<<4,Cl[mt]=((fi&65280)>>>8|(fi&255)<<8)>>>1;var fi,mt,Cr=(function(s,e,t){for(var n=s.length,i=0,r=new Di(e);i<n;++i)++r[s[i]-1];var o=new Di(e);for(i=0;i<e;++i)o[i]=o[i-1]+r[i-1]<<1;var a;if(t){a=new Di(1<<e);var c=15-e;for(i=0;i<n;++i)if(s[i])for(var l=i<<4|s[i],h=e-s[i],u=o[s[i]-1]++<<h,d=u|(1<<h)-1;u<=d;++u)a[Cl[u]>>>c]=l}else for(a=new Di(n),i=0;i<n;++i)s[i]&&(a[i]=Cl[o[s[i]-1]++]>>>15-s[i]);return a}),Pr=new Ln(288);for(mt=0;mt<144;++mt)Pr[mt]=8;var mt;for(mt=144;mt<256;++mt)Pr[mt]=9;var mt;for(mt=256;mt<280;++mt)Pr[mt]=7;var mt;for(mt=280;mt<288;++mt)Pr[mt]=8;var mt,Sf=new Ln(32);for(mt=0;mt<32;++mt)Sf[mt]=5;var mt;var Py=Cr(Pr,9,1);var Iy=Cr(Sf,5,1),Tl=function(s){for(var e=s[0],t=1;t<s.length;++t)s[t]>e&&(e=s[t]);return e},kn=function(s,e,t){var n=e/8|0;return(s[n]|s[n+1]<<8)>>(e&7)&t},Al=function(s,e){var t=e/8|0;return(s[t]|s[t+1]<<8|s[t+2]<<16)>>(e&7)},Ly=function(s){return(s/8|0)+(s&7&&1)},Dy=function(s,e,t){(e==null||e<0)&&(e=0),(t==null||t>s.length)&&(t=s.length);var n=new(s instanceof Di?Di:s instanceof Rl?Rl:Ln)(t-e);return n.set(s.subarray(e,t)),n},Uy=function(s,e,t){var n=s.length;if(!n||t&&!t.l&&n<5)return e||new Ln(0);var i=!e||t,r=!t||t.i;t||(t={}),e||(e=new Ln(n*3));var o=function(_e){var Te=e.length;if(_e>Te){var Ue=new Ln(Math.max(Te*2,_e));Ue.set(e),e=Ue}},a=t.f||0,c=t.p||0,l=t.b||0,h=t.l,u=t.d,d=t.m,f=t.n,g=n*8;do{if(!h){t.f=a=kn(s,c,1);var v=kn(s,c+1,3);if(c+=3,v)if(v==1)h=Py,u=Iy,d=9,f=5;else if(v==2){var y=kn(s,c,31)+257,A=kn(s,c+10,15)+4,O=y+kn(s,c+5,31)+1;c+=14;for(var I=new Ln(O),P=new Ln(19),k=0;k<A;++k)P[Ay[k]]=kn(s,c+k*3,7);c+=A*3;for(var M=Tl(P),w=(1<<M)-1,H=Cr(P,M,1),k=0;k<O;){var X=H[kn(s,c,w)];c+=X&15;var m=X>>>4;if(m<16)I[k++]=m;else{var se=0,D=0;for(m==16?(D=3+kn(s,c,3),c+=2,se=I[k-1]):m==17?(D=3+kn(s,c,7),c+=3):m==18&&(D=11+kn(s,c,127),c+=7);D--;)I[k++]=se}}var V=I.subarray(0,y),W=I.subarray(y);d=Tl(V),f=Tl(W),h=Cr(V,d,1),u=Cr(W,f,1)}else throw"invalid block type";else{var m=Ly(c)+4,p=s[m-4]|s[m-3]<<8,S=m+p;if(S>n){if(r)throw"unexpected EOF";break}i&&o(l+p),e.set(s.subarray(m,S),l),t.b=l+=p,t.p=c=S*8;continue}if(c>g){if(r)throw"unexpected EOF";break}}i&&o(l+131072);for(var ne=(1<<d)-1,ie=(1<<f)-1,J=c;;J=c){var se=h[Al(s,c)&ne],te=se>>>4;if(c+=se&15,c>g){if(r)throw"unexpected EOF";break}if(!se)throw"invalid length/literal";if(te<256)e[l++]=te;else if(te==256){J=c,h=null;break}else{var ae=te-254;if(te>264){var k=te-257,ue=gf[k];ae=kn(s,c,(1<<ue)-1)+yf[k],c+=ue}var j=u[Al(s,c)&ie],re=j>>>4;if(!j)throw"invalid distance";c+=j&15;var W=Cy[re];if(re>3){var ue=vf[re];W+=Al(s,c)&(1<<ue)-1,c+=ue}if(c>g){if(r)throw"unexpected EOF";break}i&&o(l+131072);for(var Se=l+ae;l<Se;l+=4)e[l]=e[l-W],e[l+1]=e[l+1-W],e[l+2]=e[l+2-W],e[l+3]=e[l+3-W];l=Se}}t.l=h,t.p=J,t.b=l,h&&(a=1,t.m=d,t.d=u,t.n=f)}while(!a);return l==e.length?e:Dy(e,0,l)};var Ny=new Ln(0);var Oy=function(s){if((s[0]&15)!=8||s[0]>>>4>7||(s[0]<<8|s[1])%31)throw"invalid zlib data";if(s[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function Ir(s,e){return Uy((Oy(s),s.subarray(2,-4)),e)}var Fy=typeof TextDecoder<"u"&&new TextDecoder,By=0;try{Fy.decode(Ny,{stream:!0}),By=1}catch{}var ca=class extends Fs{constructor(e){super(e),this.type=It}parse(e){let M=Math.pow(2.7182818,2.2);function w(x,E){let F=0;for(let R=0;R<65536;++R)(R==0||x[R>>3]&1<<(R&7))&&(E[F++]=R);let _=F-1;for(;F<65536;)E[F++]=0;return _}function H(x){for(let E=0;E<16384;E++)x[E]={},x[E].len=0,x[E].lit=0,x[E].p=null}let X={l:0,c:0,lc:0};function se(x,E,F,_,R){for(;F<x;)E=E<<8|ge(_,R),F+=8;F-=x,X.l=E>>F&(1<<x)-1,X.c=E,X.lc=F}let D=new Array(59);function V(x){for(let F=0;F<=58;++F)D[F]=0;for(let F=0;F<65537;++F)D[x[F]]+=1;let E=0;for(let F=58;F>0;--F){let _=E+D[F]>>1;D[F]=E,E=_}for(let F=0;F<65537;++F){let _=x[F];_>0&&(x[F]=_|D[_]++<<6)}}function W(x,E,F,_,R,C){let U=E,N=0,$=0;for(;_<=R;_++){if(U.value-E.value>F)return!1;se(6,N,$,x,U);let Y=X.l;if(N=X.c,$=X.lc,C[_]=Y,Y==63){if(U.value-E.value>F)throw new Error("Something wrong with hufUnpackEncTable");se(8,N,$,x,U);let Q=X.l+6;if(N=X.c,$=X.lc,_+Q>R+1)throw new Error("Something wrong with hufUnpackEncTable");for(;Q--;)C[_++]=0;_--}else if(Y>=59){let Q=Y-59+2;if(_+Q>R+1)throw new Error("Something wrong with hufUnpackEncTable");for(;Q--;)C[_++]=0;_--}}V(C)}function ne(x){return x&63}function ie(x){return x>>6}function J(x,E,F,_){for(;E<=F;E++){let R=ie(x[E]),C=ne(x[E]);if(R>>C)throw new Error("Invalid table entry");if(C>14){let U=_[R>>C-14];if(U.len)throw new Error("Invalid table entry");if(U.lit++,U.p){let N=U.p;U.p=new Array(U.lit);for(let $=0;$<U.lit-1;++$)U.p[$]=N[$]}else U.p=new Array(1);U.p[U.lit-1]=E}else if(C){let U=0;for(let N=1<<14-C;N>0;N--){let $=_[(R<<14-C)+U];if($.len||$.p)throw new Error("Invalid table entry");$.len=C,$.lit=E,U++}}}return!0}let te={c:0,lc:0};function ae(x,E,F,_){x=x<<8|ge(F,_),E+=8,te.c=x,te.lc=E}let ue={c:0,lc:0};function j(x,E,F,_,R,C,U,N,$){if(x==E){_<8&&(ae(F,_,R,C),F=te.c,_=te.lc),_-=8;let Y=F>>_;if(Y=new Uint8Array([Y])[0],N.value+Y>$)return!1;let Q=U[N.value-1];for(;Y-- >0;)U[N.value++]=Q}else if(N.value<$)U[N.value++]=x;else return!1;ue.c=F,ue.lc=_}function re(x){return x&65535}function Se(x){let E=re(x);return E>32767?E-65536:E}let _e={a:0,b:0};function Te(x,E){let F=Se(x),R=Se(E),C=F+(R&1)+(R>>1),U=C,N=C-R;_e.a=U,_e.b=N}function Ue(x,E){let F=re(x),_=re(E),R=F-(_>>1)&65535,C=_+R-32768&65535;_e.a=C,_e.b=R}function Ge(x,E,F,_,R,C,U){let N=U<16384,$=F>R?R:F,Y=1,Q,ce;for(;Y<=$;)Y<<=1;for(Y>>=1,Q=Y,Y>>=1;Y>=1;){ce=0;let de=ce+C*(R-Q),ve=C*Y,Me=C*Q,be=_*Y,Ce=_*Q,He,ft,$e,Ye;for(;ce<=de;ce+=Me){let gt=ce,Ve=ce+_*(F-Q);for(;gt<=Ve;gt+=Ce){let xt=gt+be,hn=gt+ve,Tt=hn+be;N?(Te(x[gt+E],x[hn+E]),He=_e.a,$e=_e.b,Te(x[xt+E],x[Tt+E]),ft=_e.a,Ye=_e.b,Te(He,ft),x[gt+E]=_e.a,x[xt+E]=_e.b,Te($e,Ye),x[hn+E]=_e.a,x[Tt+E]=_e.b):(Ue(x[gt+E],x[hn+E]),He=_e.a,$e=_e.b,Ue(x[xt+E],x[Tt+E]),ft=_e.a,Ye=_e.b,Ue(He,ft),x[gt+E]=_e.a,x[xt+E]=_e.b,Ue($e,Ye),x[hn+E]=_e.a,x[Tt+E]=_e.b)}if(F&Y){let xt=gt+ve;N?Te(x[gt+E],x[xt+E]):Ue(x[gt+E],x[xt+E]),He=_e.a,x[xt+E]=_e.b,x[gt+E]=He}}if(R&Y){let gt=ce,Ve=ce+_*(F-Q);for(;gt<=Ve;gt+=Ce){let xt=gt+be;N?Te(x[gt+E],x[xt+E]):Ue(x[gt+E],x[xt+E]),He=_e.a,x[xt+E]=_e.b,x[gt+E]=He}}Q=Y,Y>>=1}return ce}function Ne(x,E,F,_,R,C,U,N,$){let Y=0,Q=0,ce=U,de=Math.trunc(_.value+(R+7)/8);for(;_.value<de;)for(ae(Y,Q,F,_),Y=te.c,Q=te.lc;Q>=14;){let Me=Y>>Q-14&16383,be=E[Me];if(be.len)Q-=be.len,j(be.lit,C,Y,Q,F,_,N,$,ce),Y=ue.c,Q=ue.lc;else{if(!be.p)throw new Error("hufDecode issues");let Ce;for(Ce=0;Ce<be.lit;Ce++){let He=ne(x[be.p[Ce]]);for(;Q<He&&_.value<de;)ae(Y,Q,F,_),Y=te.c,Q=te.lc;if(Q>=He&&ie(x[be.p[Ce]])==(Y>>Q-He&(1<<He)-1)){Q-=He,j(be.p[Ce],C,Y,Q,F,_,N,$,ce),Y=ue.c,Q=ue.lc;break}}if(Ce==be.lit)throw new Error("hufDecode issues")}}let ve=8-R&7;for(Y>>=ve,Q-=ve;Q>0;){let Me=E[Y<<14-Q&16383];if(Me.len)Q-=Me.len,j(Me.lit,C,Y,Q,F,_,N,$,ce),Y=ue.c,Q=ue.lc;else throw new Error("hufDecode issues")}return!0}function tt(x,E,F,_,R,C){let U={value:0},N=F.value,$=me(E,F),Y=me(E,F);F.value+=4;let Q=me(E,F);if(F.value+=4,$<0||$>=65537||Y<0||Y>=65537)throw new Error("Something wrong with HUF_ENCSIZE");let ce=new Array(65537),de=new Array(16384);H(de);let ve=_-(F.value-N);if(W(x,F,ve,$,Y,ce),Q>8*(_-(F.value-N)))throw new Error("Something wrong with hufUncompress");J(ce,$,Y,de),Ne(ce,de,x,F,Q,Y,C,R,U)}function Z(x,E,F){for(let _=0;_<F;++_)E[_]=x[E[_]]}function wt(x){for(let E=1;E<x.length;E++){let F=x[E-1]+x[E]-128;x[E]=F}}function Oe(x,E){let F=0,_=Math.floor((x.length+1)/2),R=0,C=x.length-1;for(;!(R>C||(E[R++]=x[F++],R>C));)E[R++]=x[_++]}function We(x){let E=x.byteLength,F=new Array,_=0,R=new DataView(x);for(;E>0;){let C=R.getInt8(_++);if(C<0){let U=-C;E-=U+1;for(let N=0;N<U;N++)F.push(R.getUint8(_++))}else{let U=C;E-=2;let N=R.getUint8(_++);for(let $=0;$<U+1;$++)F.push(N)}}return F}function De(x,E,F,_,R,C){let U=new DataView(C.buffer),N=F[x.idx[0]].width,$=F[x.idx[0]].height,Y=3,Q=Math.floor(N/8),ce=Math.ceil(N/8),de=Math.ceil($/8),ve=N-(ce-1)*8,Me=$-(de-1)*8,be={value:0},Ce=new Array(Y),He=new Array(Y),ft=new Array(Y),$e=new Array(Y),Ye=new Array(Y);for(let Ve=0;Ve<Y;++Ve)Ye[Ve]=E[x.idx[Ve]],Ce[Ve]=Ve<1?0:Ce[Ve-1]+ce*de,He[Ve]=new Float32Array(64),ft[Ve]=new Uint16Array(64),$e[Ve]=new Uint16Array(ce*64);for(let Ve=0;Ve<de;++Ve){let xt=8;Ve==de-1&&(xt=Me);let hn=8;for(let ut=0;ut<ce;++ut){ut==ce-1&&(hn=ve);for(let Qe=0;Qe<Y;++Qe)ft[Qe].fill(0),ft[Qe][0]=R[Ce[Qe]++],pt(be,_,ft[Qe]),Ze(ft[Qe],He[Qe]),T(He[Qe]);Y==3&&b(He);for(let Qe=0;Qe<Y;++Qe)K(He[Qe],$e[Qe],ut*64)}let Tt=0;for(let ut=0;ut<Y;++ut){let Qe=F[x.idx[ut]].type;for(let en=8*Ve;en<8*Ve+xt;++en){Tt=Ye[ut][en];for(let Jn=0;Jn<Q;++Jn){let Ct=Jn*64+(en&7)*8;U.setUint16(Tt+0*Qe,$e[ut][Ct+0],!0),U.setUint16(Tt+2*Qe,$e[ut][Ct+1],!0),U.setUint16(Tt+4*Qe,$e[ut][Ct+2],!0),U.setUint16(Tt+6*Qe,$e[ut][Ct+3],!0),U.setUint16(Tt+8*Qe,$e[ut][Ct+4],!0),U.setUint16(Tt+10*Qe,$e[ut][Ct+5],!0),U.setUint16(Tt+12*Qe,$e[ut][Ct+6],!0),U.setUint16(Tt+14*Qe,$e[ut][Ct+7],!0),Tt+=16*Qe}}if(Q!=ce)for(let en=8*Ve;en<8*Ve+xt;++en){let Jn=Ye[ut][en]+8*Q*2*Qe,Ct=Q*64+(en&7)*8;for(let gi=0;gi<hn;++gi)U.setUint16(Jn+gi*2*Qe,$e[ut][Ct+gi],!0)}}}let gt=new Uint16Array(N);U=new DataView(C.buffer);for(let Ve=0;Ve<Y;++Ve){F[x.idx[Ve]].decoded=!0;let xt=F[x.idx[Ve]].type;if(F[Ve].type==2)for(let hn=0;hn<$;++hn){let Tt=Ye[Ve][hn];for(let ut=0;ut<N;++ut)gt[ut]=U.getUint16(Tt+ut*2*xt,!0);for(let ut=0;ut<N;++ut)U.setFloat32(Tt+ut*2*xt,q(gt[ut]),!0)}}}function pt(x,E,F){let _,R=1;for(;R<64;)_=E[x.value],_==65280?R=64:_>>8==255?R+=_&255:(F[R]=_,R++),x.value++}function Ze(x,E){E[0]=q(x[0]),E[1]=q(x[1]),E[2]=q(x[5]),E[3]=q(x[6]),E[4]=q(x[14]),E[5]=q(x[15]),E[6]=q(x[27]),E[7]=q(x[28]),E[8]=q(x[2]),E[9]=q(x[4]),E[10]=q(x[7]),E[11]=q(x[13]),E[12]=q(x[16]),E[13]=q(x[26]),E[14]=q(x[29]),E[15]=q(x[42]),E[16]=q(x[3]),E[17]=q(x[8]),E[18]=q(x[12]),E[19]=q(x[17]),E[20]=q(x[25]),E[21]=q(x[30]),E[22]=q(x[41]),E[23]=q(x[43]),E[24]=q(x[9]),E[25]=q(x[11]),E[26]=q(x[18]),E[27]=q(x[24]),E[28]=q(x[31]),E[29]=q(x[40]),E[30]=q(x[44]),E[31]=q(x[53]),E[32]=q(x[10]),E[33]=q(x[19]),E[34]=q(x[23]),E[35]=q(x[32]),E[36]=q(x[39]),E[37]=q(x[45]),E[38]=q(x[52]),E[39]=q(x[54]),E[40]=q(x[20]),E[41]=q(x[22]),E[42]=q(x[33]),E[43]=q(x[38]),E[44]=q(x[46]),E[45]=q(x[51]),E[46]=q(x[55]),E[47]=q(x[60]),E[48]=q(x[21]),E[49]=q(x[34]),E[50]=q(x[37]),E[51]=q(x[47]),E[52]=q(x[50]),E[53]=q(x[56]),E[54]=q(x[59]),E[55]=q(x[61]),E[56]=q(x[35]),E[57]=q(x[36]),E[58]=q(x[48]),E[59]=q(x[49]),E[60]=q(x[57]),E[61]=q(x[58]),E[62]=q(x[62]),E[63]=q(x[63])}function T(x){let E=.5*Math.cos(.7853975),F=.5*Math.cos(3.14159/16),_=.5*Math.cos(3.14159/8),R=.5*Math.cos(3*3.14159/16),C=.5*Math.cos(5*3.14159/16),U=.5*Math.cos(3*3.14159/8),N=.5*Math.cos(7*3.14159/16),$=new Array(4),Y=new Array(4),Q=new Array(4),ce=new Array(4);for(let de=0;de<8;++de){let ve=de*8;$[0]=_*x[ve+2],$[1]=U*x[ve+2],$[2]=_*x[ve+6],$[3]=U*x[ve+6],Y[0]=F*x[ve+1]+R*x[ve+3]+C*x[ve+5]+N*x[ve+7],Y[1]=R*x[ve+1]-N*x[ve+3]-F*x[ve+5]-C*x[ve+7],Y[2]=C*x[ve+1]-F*x[ve+3]+N*x[ve+5]+R*x[ve+7],Y[3]=N*x[ve+1]-C*x[ve+3]+R*x[ve+5]-F*x[ve+7],Q[0]=E*(x[ve+0]+x[ve+4]),Q[3]=E*(x[ve+0]-x[ve+4]),Q[1]=$[0]+$[3],Q[2]=$[1]-$[2],ce[0]=Q[0]+Q[1],ce[1]=Q[3]+Q[2],ce[2]=Q[3]-Q[2],ce[3]=Q[0]-Q[1],x[ve+0]=ce[0]+Y[0],x[ve+1]=ce[1]+Y[1],x[ve+2]=ce[2]+Y[2],x[ve+3]=ce[3]+Y[3],x[ve+4]=ce[3]-Y[3],x[ve+5]=ce[2]-Y[2],x[ve+6]=ce[1]-Y[1],x[ve+7]=ce[0]-Y[0]}for(let de=0;de<8;++de)$[0]=_*x[16+de],$[1]=U*x[16+de],$[2]=_*x[48+de],$[3]=U*x[48+de],Y[0]=F*x[8+de]+R*x[24+de]+C*x[40+de]+N*x[56+de],Y[1]=R*x[8+de]-N*x[24+de]-F*x[40+de]-C*x[56+de],Y[2]=C*x[8+de]-F*x[24+de]+N*x[40+de]+R*x[56+de],Y[3]=N*x[8+de]-C*x[24+de]+R*x[40+de]-F*x[56+de],Q[0]=E*(x[de]+x[32+de]),Q[3]=E*(x[de]-x[32+de]),Q[1]=$[0]+$[3],Q[2]=$[1]-$[2],ce[0]=Q[0]+Q[1],ce[1]=Q[3]+Q[2],ce[2]=Q[3]-Q[2],ce[3]=Q[0]-Q[1],x[0+de]=ce[0]+Y[0],x[8+de]=ce[1]+Y[1],x[16+de]=ce[2]+Y[2],x[24+de]=ce[3]+Y[3],x[32+de]=ce[3]-Y[3],x[40+de]=ce[2]-Y[2],x[48+de]=ce[1]-Y[1],x[56+de]=ce[0]-Y[0]}function b(x){for(let E=0;E<64;++E){let F=x[0][E],_=x[1][E],R=x[2][E];x[0][E]=F+1.5747*R,x[1][E]=F-.1873*_-.4682*R,x[2][E]=F+1.8556*_}}function K(x,E,F){for(let _=0;_<64;++_)E[F+_]=Li.toHalfFloat(pe(x[_]))}function pe(x){return x<=1?Math.sign(x)*Math.pow(Math.abs(x),2.2):Math.sign(x)*Math.pow(M,Math.abs(x)-1)}function he(x){return new DataView(x.array.buffer,x.offset.value,x.size)}function fe(x){let E=x.viewer.buffer.slice(x.offset.value,x.offset.value+x.size),F=new Uint8Array(We(E)),_=new Uint8Array(F.length);return wt(F),Oe(F,_),new DataView(_.buffer)}function Pe(x){let E=x.array.slice(x.offset.value,x.offset.value+x.size),F=Ir(E),_=new Uint8Array(F.length);return wt(F),Oe(F,_),new DataView(_.buffer)}function Ee(x){let E=x.viewer,F={value:x.offset.value},_=new Uint16Array(x.width*x.scanlineBlockSize*(x.channels*x.type)),R=new Uint8Array(8192),C=0,U=new Array(x.channels);for(let Me=0;Me<x.channels;Me++)U[Me]={},U[Me].start=C,U[Me].end=U[Me].start,U[Me].nx=x.width,U[Me].ny=x.lines,U[Me].size=x.type,C+=U[Me].nx*U[Me].ny*U[Me].size;let N=z(E,F),$=z(E,F);if($>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(N<=$)for(let Me=0;Me<$-N+1;Me++)R[Me+N]=Ie(E,F);let Y=new Uint16Array(65536),Q=w(R,Y),ce=me(E,F);tt(x.array,E,F,ce,_,C);for(let Me=0;Me<x.channels;++Me){let be=U[Me];for(let Ce=0;Ce<U[Me].size;++Ce)Ge(_,be.start+Ce,be.nx,be.size,be.ny,be.nx*be.size,Q)}Z(Y,_,C);let de=0,ve=new Uint8Array(_.buffer.byteLength);for(let Me=0;Me<x.lines;Me++)for(let be=0;be<x.channels;be++){let Ce=U[be],He=Ce.nx*Ce.size,ft=new Uint8Array(_.buffer,Ce.end*2,He*2);ve.set(ft,de),de+=He*2,Ce.end+=He}return new DataView(ve.buffer)}function Ae(x){let E=x.array.slice(x.offset.value,x.offset.value+x.size),F=Ir(E),_=x.lines*x.channels*x.width,R=x.type==1?new Uint16Array(_):new Uint32Array(_),C=0,U=0,N=new Array(4);for(let $=0;$<x.lines;$++)for(let Y=0;Y<x.channels;Y++){let Q=0;switch(x.type){case 1:N[0]=C,N[1]=N[0]+x.width,C=N[1]+x.width;for(let ce=0;ce<x.width;++ce){let de=F[N[0]++]<<8|F[N[1]++];Q+=de,R[U]=Q,U++}break;case 2:N[0]=C,N[1]=N[0]+x.width,N[2]=N[1]+x.width,C=N[2]+x.width;for(let ce=0;ce<x.width;++ce){let de=F[N[0]++]<<24|F[N[1]++]<<16|F[N[2]++]<<8;Q+=de,R[U]=Q,U++}break}}return new DataView(R.buffer)}function Fe(x){let E=x.viewer,F={value:x.offset.value},_=new Uint8Array(x.width*x.lines*(x.channels*x.type*2)),R={version:ze(E,F),unknownUncompressedSize:ze(E,F),unknownCompressedSize:ze(E,F),acCompressedSize:ze(E,F),dcCompressedSize:ze(E,F),rleCompressedSize:ze(E,F),rleUncompressedSize:ze(E,F),rleRawSize:ze(E,F),totalAcUncompressedCount:ze(E,F),totalDcUncompressedCount:ze(E,F),acCompression:ze(E,F)};if(R.version<2)throw new Error("EXRLoader.parse: "+mi.compression+" version "+R.version+" is unsupported");let C=new Array,U=z(E,F)-2;for(;U>0;){let be=Xe(E.buffer,F),Ce=Ie(E,F),He=Ce>>2&3,ft=(Ce>>4)-1,$e=new Int8Array([ft])[0],Ye=Ie(E,F);C.push({name:be,index:$e,type:Ye,compression:He}),U-=be.length+3}let N=mi.channels,$=new Array(x.channels);for(let be=0;be<x.channels;++be){let Ce=$[be]={},He=N[be];Ce.name=He.name,Ce.compression=0,Ce.decoded=!1,Ce.type=He.pixelType,Ce.pLinear=He.pLinear,Ce.width=x.width,Ce.height=x.lines}let Y={idx:new Array(3)};for(let be=0;be<x.channels;++be){let Ce=$[be];for(let He=0;He<C.length;++He){let ft=C[He];Ce.name==ft.name&&(Ce.compression=ft.compression,ft.index>=0&&(Y.idx[ft.index]=be),Ce.offset=be)}}let Q,ce,de;if(R.acCompressedSize>0)switch(R.acCompression){case 0:Q=new Uint16Array(R.totalAcUncompressedCount),tt(x.array,E,F,R.acCompressedSize,Q,R.totalAcUncompressedCount);break;case 1:let be=x.array.slice(F.value,F.value+R.totalAcUncompressedCount),Ce=Ir(be);Q=new Uint16Array(Ce.buffer),F.value+=R.totalAcUncompressedCount;break}if(R.dcCompressedSize>0){let be={array:x.array,offset:F,size:R.dcCompressedSize};ce=new Uint16Array(Pe(be).buffer),F.value+=R.dcCompressedSize}if(R.rleRawSize>0){let be=x.array.slice(F.value,F.value+R.rleCompressedSize),Ce=Ir(be);de=We(Ce.buffer),F.value+=R.rleCompressedSize}let ve=0,Me=new Array($.length);for(let be=0;be<Me.length;++be)Me[be]=new Array;for(let be=0;be<x.lines;++be)for(let Ce=0;Ce<$.length;++Ce)Me[Ce].push(ve),ve+=$[Ce].width*x.type*2;De(Y,Me,$,Q,ce,_);for(let be=0;be<$.length;++be){let Ce=$[be];if(!Ce.decoded)switch(Ce.compression){case 2:let He=0,ft=0;for(let $e=0;$e<x.lines;++$e){let Ye=Me[be][He];for(let gt=0;gt<Ce.width;++gt){for(let Ve=0;Ve<2*Ce.type;++Ve)_[Ye++]=de[ft+Ve*Ce.width*Ce.height];ft++}He++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(_.buffer)}function Xe(x,E){let F=new Uint8Array(x),_=0;for(;F[E.value+_]!=0;)_+=1;let R=new TextDecoder().decode(F.slice(E.value,E.value+_));return E.value=E.value+_+1,R}function le(x,E,F){let _=new TextDecoder().decode(new Uint8Array(x).slice(E.value,E.value+F));return E.value=E.value+F,_}function Je(x,E){let F=oe(x,E),_=me(x,E);return[F,_]}function L(x,E){let F=me(x,E),_=me(x,E);return[F,_]}function oe(x,E){let F=x.getInt32(E.value,!0);return E.value=E.value+4,F}function me(x,E){let F=x.getUint32(E.value,!0);return E.value=E.value+4,F}function ge(x,E){let F=x[E.value];return E.value=E.value+1,F}function Ie(x,E){let F=x.getUint8(E.value);return E.value=E.value+1,F}let ze=function(x,E){let F;return"getBigInt64"in DataView.prototype?F=Number(x.getBigInt64(E.value,!0)):F=x.getUint32(E.value+4,!0)+Number(x.getUint32(E.value,!0)<<32),E.value+=8,F};function Be(x,E){let F=x.getFloat32(E.value,!0);return E.value+=4,F}function je(x,E){return Li.toHalfFloat(Be(x,E))}function q(x){let E=(x&31744)>>10,F=x&1023;return(x>>15?-1:1)*(E?E===31?F?NaN:1/0:Math.pow(2,E-15)*(1+F/1024):6103515625e-14*(F/1024))}function z(x,E){let F=x.getUint16(E.value,!0);return E.value+=2,F}function xe(x,E){return q(z(x,E))}function ye(x,E,F,_){let R=F.value,C=[];for(;F.value<R+_-1;){let U=Xe(E,F),N=oe(x,F),$=Ie(x,F);F.value+=3;let Y=oe(x,F),Q=oe(x,F);C.push({name:U,pixelType:N,pLinear:$,xSampling:Y,ySampling:Q})}return F.value+=1,C}function qe(x,E){let F=Be(x,E),_=Be(x,E),R=Be(x,E),C=Be(x,E),U=Be(x,E),N=Be(x,E),$=Be(x,E),Y=Be(x,E);return{redX:F,redY:_,greenX:R,greenY:C,blueX:U,blueY:N,whiteX:$,whiteY:Y}}function ke(x,E){let F=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],_=Ie(x,E);return F[_]}function ct(x,E){let F=me(x,E),_=me(x,E),R=me(x,E),C=me(x,E);return{xMin:F,yMin:_,xMax:R,yMax:C}}function ht(x,E){let F=["INCREASING_Y"],_=Ie(x,E);return F[_]}function Ot(x,E){let F=Be(x,E),_=Be(x,E);return[F,_]}function Jt(x,E){let F=Be(x,E),_=Be(x,E),R=Be(x,E);return[F,_,R]}function vt(x,E,F,_,R){if(_==="string"||_==="stringvector"||_==="iccProfile")return le(E,F,R);if(_==="chlist")return ye(x,E,F,R);if(_==="chromaticities")return qe(x,F);if(_==="compression")return ke(x,F);if(_==="box2i")return ct(x,F);if(_==="lineOrder")return ht(x,F);if(_==="float")return Be(x,F);if(_==="v2f")return Ot(x,F);if(_==="v3f")return Jt(x,F);if(_==="int")return oe(x,F);if(_==="rational")return Je(x,F);if(_==="timecode")return L(x,F);if(_==="preview")return F.value+=R,"skipped";F.value+=R}function Qt(x,E,F){let _={};if(x.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");_.version=x.getUint8(4);let R=x.getUint8(5);_.spec={singleTile:!!(R&2),longName:!!(R&4),deepFormat:!!(R&8),multiPart:!!(R&16)},F.value=8;let C=!0;for(;C;){let U=Xe(E,F);if(U==0)C=!1;else{let N=Xe(E,F),$=me(x,F),Y=vt(x,E,F,N,$);Y===void 0?console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${N}'.`):_[U]=Y}}if((R&-5)!=0)throw console.error("THREE.EXRHeader:",_),new Error("THREE.EXRLoader: Provided file is currently unsupported.");return _}function wn(x,E,F,_,R){let C={size:0,viewer:E,array:F,offset:_,width:x.dataWindow.xMax-x.dataWindow.xMin+1,height:x.dataWindow.yMax-x.dataWindow.yMin+1,channels:x.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:x.channels[0].pixelType,uncompress:null,getter:null,format:null,colorSpace:Et};switch(x.compression){case"NO_COMPRESSION":C.lines=1,C.uncompress=he;break;case"RLE_COMPRESSION":C.lines=1,C.uncompress=fe;break;case"ZIPS_COMPRESSION":C.lines=1,C.uncompress=Pe;break;case"ZIP_COMPRESSION":C.lines=16,C.uncompress=Pe;break;case"PIZ_COMPRESSION":C.lines=32,C.uncompress=Ee;break;case"PXR24_COMPRESSION":C.lines=16,C.uncompress=Ae;break;case"DWAA_COMPRESSION":C.lines=32,C.uncompress=Fe;break;case"DWAB_COMPRESSION":C.lines=256,C.uncompress=Fe;break;default:throw new Error("EXRLoader.parse: "+x.compression+" is unsupported")}if(C.scanlineBlockSize=C.lines,C.type==1)switch(R){case tn:C.getter=xe,C.inputSize=2;break;case It:C.getter=z,C.inputSize=2;break}else if(C.type==2)switch(R){case tn:C.getter=Be,C.inputSize=4;break;case It:C.getter=je,C.inputSize=4}else throw new Error("EXRLoader.parse: unsupported pixelType "+C.type+" for "+x.compression+".");C.blockCount=(x.dataWindow.yMax+1)/C.scanlineBlockSize;for(let N=0;N<C.blockCount;N++)ze(E,_);C.outputChannels=C.channels==3?4:C.channels;let U=C.width*C.height*C.outputChannels;switch(R){case tn:C.byteArray=new Float32Array(U),C.channels<C.outputChannels&&C.byteArray.fill(1,0,U);break;case It:C.byteArray=new Uint16Array(U),C.channels<C.outputChannels&&C.byteArray.fill(15360,0,U);break;default:console.error("THREE.EXRLoader: unsupported type: ",R);break}return C.bytesPerLine=C.width*C.inputSize*C.channels,C.outputChannels==4?(C.format=on,C.colorSpace=Et):(C.format=rl,C.colorSpace=an),C}let Bi=new DataView(e),ka=new Uint8Array(e),Hn={value:0},mi=Qt(Bi,e,Hn),nt=wn(mi,Bi,ka,Hn,this.type),Zs={value:0},qr={R:0,G:1,B:2,A:3,Y:0};for(let x=0;x<nt.height/nt.scanlineBlockSize;x++){let E=me(Bi,Hn);nt.size=me(Bi,Hn),nt.lines=E+nt.scanlineBlockSize>nt.height?nt.height-E:nt.scanlineBlockSize;let _=nt.size<nt.lines*nt.bytesPerLine?nt.uncompress(nt):he(nt);Hn.value+=nt.size;for(let R=0;R<nt.scanlineBlockSize;R++){let C=R+x*nt.scanlineBlockSize;if(C>=nt.height)break;for(let U=0;U<nt.channels;U++){let N=qr[mi.channels[U].name];for(let $=0;$<nt.width;$++){Zs.value=(R*(nt.channels*nt.width)+U*nt.width+$)*nt.inputSize;let Y=(nt.height-1-C)*(nt.width*nt.outputChannels)+$*nt.outputChannels+N;nt.byteArray[Y]=nt.getter(_,Zs)}}}}return{header:mi,width:nt.width,height:nt.height,data:nt.byteArray,format:nt.format,colorSpace:nt.colorSpace,type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(o,a){o.colorSpace=a.colorSpace,o.minFilter=bt,o.magFilter=bt,o.generateMipmaps=!1,o.flipY=!1,t&&t(o,a)}return super.load(e,r,n,i)}};var Gs=class extends Fs{constructor(e){super(e),this.type=It}parse(e){let o=function(k,M){switch(k){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(M||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(M||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(M||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(M||""))}},u=function(k,M,w){M=M||1024;let X=k.pos,se=-1,D=0,V="",W=String.fromCharCode.apply(null,new Uint16Array(k.subarray(X,X+128)));for(;0>(se=W.indexOf(`
`))&&D<M&&X<k.byteLength;)V+=W,D+=W.length,X+=128,W+=String.fromCharCode.apply(null,new Uint16Array(k.subarray(X,X+128)));return-1<se?(w!==!1&&(k.pos+=D+se+1),V+W.slice(0,se)):!1},d=function(k){let M=/^#\?(\S+)/,w=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,H=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,X=/^\s*FORMAT=(\S+)\s*$/,se=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,D={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},V,W;for((k.pos>=k.byteLength||!(V=u(k)))&&o(1,"no header found"),(W=V.match(M))||o(3,"bad initial token"),D.valid|=1,D.programtype=W[1],D.string+=V+`
`;V=u(k),V!==!1;){if(D.string+=V+`
`,V.charAt(0)==="#"){D.comments+=V+`
`;continue}if((W=V.match(w))&&(D.gamma=parseFloat(W[1])),(W=V.match(H))&&(D.exposure=parseFloat(W[1])),(W=V.match(X))&&(D.valid|=2,D.format=W[1]),(W=V.match(se))&&(D.valid|=4,D.height=parseInt(W[1],10),D.width=parseInt(W[2],10)),D.valid&2&&D.valid&4)break}return D.valid&2||o(3,"missing format specifier"),D.valid&4||o(3,"missing image size specifier"),D},f=function(k,M,w){let H=M;if(H<8||H>32767||k[0]!==2||k[1]!==2||k[2]&128)return new Uint8Array(k);H!==(k[2]<<8|k[3])&&o(3,"wrong scanline width");let X=new Uint8Array(4*M*w);X.length||o(4,"unable to allocate buffer space");let se=0,D=0,V=4*H,W=new Uint8Array(4),ne=new Uint8Array(V),ie=w;for(;ie>0&&D<k.byteLength;){D+4>k.byteLength&&o(1),W[0]=k[D++],W[1]=k[D++],W[2]=k[D++],W[3]=k[D++],(W[0]!=2||W[1]!=2||(W[2]<<8|W[3])!=H)&&o(3,"bad rgbe scanline format");let J=0,te;for(;J<V&&D<k.byteLength;){te=k[D++];let ue=te>128;if(ue&&(te-=128),(te===0||J+te>V)&&o(3,"bad scanline data"),ue){let j=k[D++];for(let re=0;re<te;re++)ne[J++]=j}else ne.set(k.subarray(D,D+te),J),J+=te,D+=te}let ae=H;for(let ue=0;ue<ae;ue++){let j=0;X[se]=ne[ue+j],j+=H,X[se+1]=ne[ue+j],j+=H,X[se+2]=ne[ue+j],j+=H,X[se+3]=ne[ue+j],se+=4}ie--}return X},g=function(k,M,w,H){let X=k[M+3],se=Math.pow(2,X-128)/255;w[H+0]=k[M+0]*se,w[H+1]=k[M+1]*se,w[H+2]=k[M+2]*se,w[H+3]=1},v=function(k,M,w,H){let X=k[M+3],se=Math.pow(2,X-128)/255;w[H+0]=Li.toHalfFloat(Math.min(k[M+0]*se,65504)),w[H+1]=Li.toHalfFloat(Math.min(k[M+1]*se,65504)),w[H+2]=Li.toHalfFloat(Math.min(k[M+2]*se,65504)),w[H+3]=Li.toHalfFloat(1)},m=new Uint8Array(e);m.pos=0;let p=d(m),S=p.width,y=p.height,A=f(m.subarray(m.pos),S,y),O,I,P;switch(this.type){case tn:P=A.length/4;let k=new Float32Array(P*4);for(let w=0;w<P;w++)g(A,w*4,k,w*4);O=k,I=tn;break;case It:P=A.length/4;let M=new Uint16Array(P*4);for(let w=0;w<P;w++)v(A,w*4,M,w*4);O=M,I=It;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:S,height:y,data:O,header:p.string,gamma:p.gamma,exposure:p.exposure,type:I}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(o,a){switch(o.type){case tn:case It:o.colorSpace=Et,o.minFilter=bt,o.magFilter=bt,o.generateMipmaps=!1,o.flipY=!0;break}t&&t(o,a)}return super.load(e,r,n,i)}};var ky=.25,Hy=.06;function Vy(s){return s.toLowerCase().endsWith(".exr")?new ca:new Gs}function Gy(s){let e=(s&32768)>>15,t=(s&31744)>>10,n=s&1023;return t===0?(e?-1:1)*2**-14*(n/1024):t===31?n?NaN:(e?-1:1)*(1/0):(e?-1:1)*2**(t-15)*(1+n/1024)}function Pl(s){let{width:e,height:t,data:n}=s.image,i=n instanceof Uint16Array,r=P=>i?Gy(n[P]):n[P],o=n.length/(e*t),a=new Float32Array(e*t),c=0,l=0,h=0;for(let P=0;P<e*t;P++){let k=P*o,M=.2126*r(k)+.7152*r(k+1)+.0722*r(k+2);a[P]=M,h+=M,M>c&&(c=M,l=P)}h/=e*t;let u=c*ky,d=Math.floor(l/e),f=l%e,g=Math.max(4,Math.round(t*Hy)),v=new B,m=new Le(0,0,0),p=2*Math.PI/e*(Math.PI/t),S=0,y=0,A=0;for(let P=Math.max(0,d-g);P<Math.min(t,d+g);P++)for(let k=f-g;k<f+g;k++){let M=(k+e)%e,w=P*e+M,H=a[w];if(H<u)continue;let X=(M+.5)/e,se=1-(P+.5)/t,D=(X-.5)*2*Math.PI,V=(se-.5)*Math.PI,W=Math.cos(V);v.x+=H*W*Math.cos(D),v.y+=H*Math.sin(V),v.z+=H*W*Math.sin(D),S+=H;let ne=w*o;m.r+=r(ne),m.g+=r(ne+1),m.b+=r(ne+2),y+=H*p*W,A++}if(S===0)return{direction:new B(0,1,0),color:new Le(1,1,1),irradiance:0,angularRadius:0,peak:c,mean:h};v.normalize();let O=Math.max(m.r,m.g,m.b)||1;m.multiplyScalar(1/O);let I=Math.sqrt(A*p/Math.PI);return{direction:v,color:m,irradiance:y,angularRadius:I,peak:c,mean:h}}function bf(s,e,t,n){let i=t.assets.hdri;return new Promise((r,o)=>{Vy(i).load(i,a=>{let c=Pl(a),l=new Zn(e);l.compileEquirectangularShader();let h=l.fromEquirectangular(a).texture;a.dispose(),l.dispose(),s.environment=h,r({envMap:h,sun:c})},a=>n==null?void 0:n(a.total>0?a.loaded/a.total*100:-1),a=>o(new Error(`Не удалось загрузить HDRI "${i}": ${(a==null?void 0:a.message)??a}`)))})}function Lr(s,e){s.traverse(t=>{if(!t.isMesh||!t.material)return;let n=Array.isArray(t.material)?t.material:[t.material];for(let i of n)"envMapIntensity"in i&&(i.envMapIntensity=e,i.needsUpdate=!0)})}var wf={size:14,ceiling:.46,floor:.12,wallKey:.36,wallShadow:.5,wallFront:.42,wallBack:.3,wallGradient:.55},Tf=[{name:"key",width:6.5,height:7.5,distance:5.4,rotationY:58,elevation:50,intensity:5.4},{name:"fill",width:8,height:7,distance:6.5,rotationY:-108,elevation:14,intensity:4},{name:"bounce",width:10,height:8,distance:6,rotationY:16,elevation:22,intensity:3.2},{name:"rim",width:4,height:2.2,distance:5.5,rotationY:-150,elevation:34,intensity:2.4},{name:"streak-near",width:.4,height:7.5,distance:4.6,rotationY:62,elevation:12,intensity:3.6},{name:"streak-far",width:.25,height:6,distance:4.6,rotationY:138,elevation:20,intensity:2.6}],la=null;function Wy(){if(la)return la;let s=64,e=document.createElement("canvas");e.width=s,e.height=s;let t=e.getContext("2d"),n=t.createImageData(s,s);for(let i=0;i<s;i++)for(let r=0;r<s;r++){let o=Math.abs((r+.5)/s-.5)*2,a=Math.abs((i+.5)/s-.5)*2,c=Math.max(o,a),l=Math.min(1,Math.max(0,(1-c)/.35)),h=.42+.58*(l*l*(3-2*l)),u=Math.round(h*255),d=(i*s+r)*4;n.data[d]=u,n.data[d+1]=u,n.data[d+2]=u,n.data[d+3]=255}return t.putImageData(n,0,0),la=new Ti(e),la}function Il(s,{mask:e=!1,gradient:t=!1}={}){let n=new Bt;return typeof s=="number"?n.color.setScalar(s):n.color.copy(s),n.side=yn,e&&(n.map=Wy()),t&&(n.vertexColors=!0),n}function Xy(s,e){let{width:t,height:n,distance:i,rotationY:r,elevation:o,intensity:a}=e,c=new at(new Sn(t,n),Il(a,{mask:!0})),l=Ut.degToRad(r),h=Ut.degToRad(o);return c.position.set(Math.sin(l)*Math.cos(h)*i,Math.sin(h)*i,Math.cos(l)*Math.cos(h)*i),c.lookAt(0,0,0),c.name=e.name,s.add(c),c}var qy={floor:.5,ceiling:0,key:.18,shadow:.1,front:.28,back:.42};function Ef(s,e,t){let n=new Le().setScalar(s);return e&&t>0&&(n.r+=e.r*t,n.g+=e.g*t,n.b+=e.b*t),n}function Yy(s,e,t){let n=new Sn(s,s,1,8),i=n.attributes.position,r=new Float32Array(i.count*3),o=s/2;for(let a=0;a<i.count;a++){let c=(i.getY(a)+o)/s,l=1-t*(1-c);r[a*3]=l,r[a*3+1]=l,r[a*3+2]=l}return n.setAttribute("color",new At(r,3)),new at(n,Il(e,{gradient:!0}))}function Zy(s,e){let{size:t,ceiling:n,floor:i,wallKey:r,wallShadow:o,wallFront:a,wallBack:c,wallGradient:l}=wf,h=t/2,u=qy,d=[{level:n,tint:u.ceiling,position:[0,h,0],rotation:[Math.PI/2,0,0]},{level:i,tint:u.floor,position:[0,-h,0],rotation:[-Math.PI/2,0,0]}];for(let g of d){let v=new at(new Sn(t,t),Il(Ef(g.level,e,g.tint)));v.position.set(...g.position),v.rotation.set(...g.rotation),s.add(v)}let f=[{level:c,tint:u.back,position:[0,0,-h],rotation:[0,0,0]},{level:a,tint:u.front,position:[0,0,h],rotation:[0,Math.PI,0]},{level:o,tint:u.shadow,position:[-h,0,0],rotation:[0,Math.PI/2,0]},{level:r,tint:u.key,position:[h,0,0],rotation:[0,-Math.PI/2,0]}];for(let g of f){let v=Yy(t,Ef(g.level,e,g.tint),l);v.position.set(...g.position),v.rotation.set(...g.rotation),s.add(v)}}function jy(){let s=Tf[0],e=Ut.degToRad(s.rotationY),t=Ut.degToRad(s.elevation),n=new B(Math.sin(e)*Math.cos(t),Math.sin(t),Math.cos(e)*Math.cos(t)).normalize(),i=Math.atan(Math.sqrt(s.width*s.height/Math.PI)/s.distance),{ceiling:r,floor:o,wallKey:a,wallShadow:c,wallFront:l,wallBack:h}=wf,u=(r+o+a+c+l+h)/6;return{direction:n,color:new Le(1,1,1),irradiance:s.intensity,angularRadius:i,peak:s.intensity,mean:u}}function Ll(s,e,t,n=null){let i=n?new Le(n).convertSRGBToLinear():null,r=new Ds;Zy(r,i);for(let c of Tf)Xy(r,c);let o=new Zn(e);o.compileEquirectangularShader();let a=o.fromScene(r,0,.1,100).texture;return o.dispose(),r.traverse(c=>{c.isMesh&&(c.geometry.dispose(),c.material.dispose())}),s.environment=a,{envMap:a,sun:jy()}}var Ws={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var bn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Ky=new Yn(-1,1,1,-1,0,1),Dl=class extends Xt{constructor(){super(),this.setAttribute("position",new Rt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Rt([0,2,0,0,2,0],2))}},$y=new Dl,Ui=class{constructor(e){this._mesh=new at($y,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ky)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var es=class extends bn{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Dt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=zn.clone(e.uniforms),this.material=new Dt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Ui(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Dr=class extends bn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}},ha=class extends bn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var ua=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new Re);this._width=n.width,this._height=n.height,t=new Wt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:It}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new es(Ws),this.copyPass.material.blending=Ht,this.clock=new zs}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let i=0,r=this.passes.length;i<r;i++){let o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){let a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Dr!==void 0&&(o instanceof Dr?n=!0:o instanceof ha&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new Re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var da=class extends bn{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Le}render(e,t,n){let i=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}};var Ur={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Re},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Ke},cameraProjectionMatrixInverse:{value:new Ke},cameraWorldMatrix:{value:new Ke},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new B(-1,-1,-1)},sceneBoxMax:{value:new B(1,1,1)}},vertexShader:`

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
		}`},Nr={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},fa={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function Af(s=5){let e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=Jy(e),n=t.length,i=new Uint8Array(n*4);for(let o=0;o<n;++o){let a=t[o],c=2*Math.PI*a/n,l=new B(Math.cos(c),Math.sin(c),0).normalize();i[o*4]=(l.x*.5+.5)*255,i[o*4+1]=(l.y*.5+.5)*255,i[o*4+2]=127,i[o*4+3]=255}let r=new wi(i,e,e);return r.wrapS=Vt,r.wrapT=Vt,r.needsUpdate=!0,r}function Jy(s){let e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=e*e,n=Array(t).fill(0),i=Math.floor(e/2),r=e-1;for(let o=1;o<=t;){if(i===-1&&r===e?(r=e-2,i=0):(r===e&&(r=0),i<0&&(i=e-1)),n[i*e+r]!==0){r-=2,i++;continue}else n[i*e+r]=o++;r++,i--}return n}var Or={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:Ul(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Re},cameraProjectionMatrixInverse:{value:new Ke},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Ul(s,e,t){let n=Qy(s,e,t),i="vec3[SAMPLES](";for(let r=0;r<s;r++){let o=n[r];i+=`vec3(${o.x}, ${o.y}, ${o.z})${r<s-1?",":")"}`}return i}function Qy(s,e,t){let n=[];for(let i=0;i<s;i++){let r=2*Math.PI*e*i/s,o=Math.pow(i/(s-1),t);n.push(new B(Math.cos(r),Math.sin(r),o))}return n}var pa=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(e,t,n){return e[0]*t+e[1]*n}dot3(e,t,n,i){return e[0]*t+e[1]*n+e[2]*i}dot4(e,t,n,i,r){return e[0]*t+e[1]*n+e[2]*i+e[3]*r}noise(e,t){let n,i,r,o=.5*(Math.sqrt(3)-1),a=(e+t)*o,c=Math.floor(e+a),l=Math.floor(t+a),h=(3-Math.sqrt(3))/6,u=(c+l)*h,d=c-u,f=l-u,g=e-d,v=t-f,m,p;g>v?(m=1,p=0):(m=0,p=1);let S=g-m+h,y=v-p+h,A=g-1+2*h,O=v-1+2*h,I=c&255,P=l&255,k=this.perm[I+this.perm[P]]%12,M=this.perm[I+m+this.perm[P+p]]%12,w=this.perm[I+1+this.perm[P+1]]%12,H=.5-g*g-v*v;H<0?n=0:(H*=H,n=H*H*this.dot(this.grad3[k],g,v));let X=.5-S*S-y*y;X<0?i=0:(X*=X,i=X*X*this.dot(this.grad3[M],S,y));let se=.5-A*A-O*O;return se<0?r=0:(se*=se,r=se*se*this.dot(this.grad3[w],A,O)),70*(n+i+r)}noise3d(e,t,n){let i,r,o,a,l=(e+t+n)*.3333333333333333,h=Math.floor(e+l),u=Math.floor(t+l),d=Math.floor(n+l),f=1/6,g=(h+u+d)*f,v=h-g,m=u-g,p=d-g,S=e-v,y=t-m,A=n-p,O,I,P,k,M,w;S>=y?y>=A?(O=1,I=0,P=0,k=1,M=1,w=0):S>=A?(O=1,I=0,P=0,k=1,M=0,w=1):(O=0,I=0,P=1,k=1,M=0,w=1):y<A?(O=0,I=0,P=1,k=0,M=1,w=1):S<A?(O=0,I=1,P=0,k=0,M=1,w=1):(O=0,I=1,P=0,k=1,M=1,w=0);let H=S-O+f,X=y-I+f,se=A-P+f,D=S-k+2*f,V=y-M+2*f,W=A-w+2*f,ne=S-1+3*f,ie=y-1+3*f,J=A-1+3*f,te=h&255,ae=u&255,ue=d&255,j=this.perm[te+this.perm[ae+this.perm[ue]]]%12,re=this.perm[te+O+this.perm[ae+I+this.perm[ue+P]]]%12,Se=this.perm[te+k+this.perm[ae+M+this.perm[ue+w]]]%12,_e=this.perm[te+1+this.perm[ae+1+this.perm[ue+1]]]%12,Te=.6-S*S-y*y-A*A;Te<0?i=0:(Te*=Te,i=Te*Te*this.dot3(this.grad3[j],S,y,A));let Ue=.6-H*H-X*X-se*se;Ue<0?r=0:(Ue*=Ue,r=Ue*Ue*this.dot3(this.grad3[re],H,X,se));let Ge=.6-D*D-V*V-W*W;Ge<0?o=0:(Ge*=Ge,o=Ge*Ge*this.dot3(this.grad3[Se],D,V,W));let Ne=.6-ne*ne-ie*ie-J*J;return Ne<0?a=0:(Ne*=Ne,a=Ne*Ne*this.dot3(this.grad3[_e],ne,ie,J)),32*(i+r+o+a)}noise4d(e,t,n,i){let r=this.grad4,o=this.simplex,a=this.perm,c=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20,h,u,d,f,g,v=(e+t+n+i)*c,m=Math.floor(e+v),p=Math.floor(t+v),S=Math.floor(n+v),y=Math.floor(i+v),A=(m+p+S+y)*l,O=m-A,I=p-A,P=S-A,k=y-A,M=e-O,w=t-I,H=n-P,X=i-k,se=M>w?32:0,D=M>H?16:0,V=w>H?8:0,W=M>X?4:0,ne=w>X?2:0,ie=H>X?1:0,J=se+D+V+W+ne+ie,te=o[J][0]>=3?1:0,ae=o[J][1]>=3?1:0,ue=o[J][2]>=3?1:0,j=o[J][3]>=3?1:0,re=o[J][0]>=2?1:0,Se=o[J][1]>=2?1:0,_e=o[J][2]>=2?1:0,Te=o[J][3]>=2?1:0,Ue=o[J][0]>=1?1:0,Ge=o[J][1]>=1?1:0,Ne=o[J][2]>=1?1:0,tt=o[J][3]>=1?1:0,Z=M-te+l,wt=w-ae+l,Oe=H-ue+l,We=X-j+l,De=M-re+2*l,pt=w-Se+2*l,Ze=H-_e+2*l,T=X-Te+2*l,b=M-Ue+3*l,K=w-Ge+3*l,pe=H-Ne+3*l,he=X-tt+3*l,fe=M-1+4*l,Pe=w-1+4*l,Ee=H-1+4*l,Ae=X-1+4*l,Fe=m&255,Xe=p&255,le=S&255,Je=y&255,L=a[Fe+a[Xe+a[le+a[Je]]]]%32,oe=a[Fe+te+a[Xe+ae+a[le+ue+a[Je+j]]]]%32,me=a[Fe+re+a[Xe+Se+a[le+_e+a[Je+Te]]]]%32,ge=a[Fe+Ue+a[Xe+Ge+a[le+Ne+a[Je+tt]]]]%32,Ie=a[Fe+1+a[Xe+1+a[le+1+a[Je+1]]]]%32,ze=.6-M*M-w*w-H*H-X*X;ze<0?h=0:(ze*=ze,h=ze*ze*this.dot4(r[L],M,w,H,X));let Be=.6-Z*Z-wt*wt-Oe*Oe-We*We;Be<0?u=0:(Be*=Be,u=Be*Be*this.dot4(r[oe],Z,wt,Oe,We));let je=.6-De*De-pt*pt-Ze*Ze-T*T;je<0?d=0:(je*=je,d=je*je*this.dot4(r[me],De,pt,Ze,T));let q=.6-b*b-K*K-pe*pe-he*he;q<0?f=0:(q*=q,f=q*q*this.dot4(r[ge],b,K,pe,he));let z=.6-fe*fe-Pe*Pe-Ee*Ee-Ae*Ae;return z<0?g=0:(z*=z,g=z*z*this.dot4(r[Ie],fe,Pe,Ee,Ae)),27*(h+u+d+f+g)}};var Ni=class s extends bn{constructor(e,t,n,i,r,o,a){super(),this.width=n!==void 0?n:512,this.height=i!==void 0?i:512,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Af(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Wt(this.width,this.height,{type:It}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Dt({defines:Object.assign({},Ur.defines),uniforms:zn.clone(Ur.uniforms),vertexShader:Ur.vertexShader,fragmentShader:Ur.fragmentShader,blending:Ht,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.definesPERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Xo,this.normalMaterial.blending=Ht,this.pdMaterial=new Dt({defines:Object.assign({},Or.defines),uniforms:zn.clone(Or.uniforms),vertexShader:Or.vertexShader,fragmentShader:Or.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Dt({defines:Object.assign({},Nr.defines),uniforms:zn.clone(Nr.uniforms),vertexShader:Nr.vertexShader,fragmentShader:Nr.fragmentShader,blending:Ht}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Dt({uniforms:zn.clone(Ws.uniforms),vertexShader:Ws.vertexShader,fragmentShader:Ws.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:ea,blendDst:ks,blendEquation:An,blendSrcAlpha:Qo,blendDstAlpha:ks,blendEquationAlpha:An}),this.blendMaterial=new Dt({uniforms:zn.clone(fa.uniforms),vertexShader:fa.vertexShader,fragmentShader:fa.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:el,blendSrc:ea,blendDst:ks,blendEquation:An,blendSrcAlpha:Qo,blendDstAlpha:ks,blendEquationAlpha:An}),this.fsQuad=new Ui(null),this.originalClearColor=new Le,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),o!==void 0&&this.updateGtaoMaterial(o),a!==void 0&&this.updatePdMaterial(a)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new Ls,this.depthTexture.format=Ei,this.depthTexture.type=ci,this.normalRenderTarget=new Wt(this.width,this.height,{minFilter:Pt,magFilter:Pt,type:It,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let n=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Ul(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case s.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Ht,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Ht,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Ht,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Ht,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case s.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Ht,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(e,t,n,i,r){e.getClearColor(this.originalClearColor);let o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=a,e.setClearColor(this.originalClearColor),e.setClearAlpha(o)}renderOverride(e,t,n,i,r){e.getClearColor(this.originalClearColor);let o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i=t.clearColor||i,r=t.clearAlpha||r,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=a,e.setClearColor(this.originalClearColor),e.setClearAlpha(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){t.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){let i=t.get(n);n.visible=i}),t.clear()}generateNoise(e=64){let t=new pa,n=e*e*4,i=new Uint8Array(n);for(let o=0;o<e;o++)for(let a=0;a<e;a++){let c=o,l=a;i[(o*e+a)*4]=(t.noise(c,l)*.5+.5)*255,i[(o*e+a)*4+1]=(t.noise(c+e,l)*.5+.5)*255,i[(o*e+a)*4+2]=(t.noise(c,l+e)*.5+.5)*255,i[(o*e+a)*4+3]=(t.noise(c+e,l+e)*.5+.5)*255}let r=new wi(i,e,e,on,Xn);return r.wrapS=Vt,r.wrapT=Vt,r.needsUpdate=!0,r}};Ni.OUTPUT={Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var ma={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var ga=class extends bn{constructor(){super();let e=ma;this.uniforms=zn.clone(e.uniforms),this.material=new Wo({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Ui(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},dt.getTransfer(this._outputColorSpace)===yt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===wr?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===tl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===nl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Hs?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ji&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Cf={uniforms:{tDiffuse:{value:null},amount:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float amount;
    varying vec2 vUv;

    // Зерно неподвижно: кадр перерисовывается по требованию, и «живой» шум
    // мерцал бы при каждом повороте, притягивая к себе всё внимание.
    float grain(vec2 uv) {
      return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      if (amount > 0.0) {
        float n = grain(vUv) - 0.5;
        // В тенях зерно заметнее, чем в светах, — как на плёнке.
        float weight = 1.0 - 0.6 * dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
        // Кадр с умноженной на покрытие альфой: на пустых полях холста зерну
        // места нет, иначе там проступает цветной шум поверх страницы.
        color.rgb += n * amount * weight * color.a;
      }
      gl_FragColor = color;
    }
  `},eM=`
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
`,Nl=class extends ga{constructor(){super(),this.material.fragmentShader=eM,this.material.vertexShader=ma.vertexShader}},tM={uniforms:{tDiffuse:{value:null},backdrop:{value:null},shadow:{value:null},hasBackdrop:{value:!1},hasShadow:{value:!1},shadowOpacity:{value:1},frameSize:{value:new Re(1,1)}},vertexShader:Cf.vertexShader,fragmentShader:`
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
      // Выборки — до ветвления: уровни мипмапа считаются по производным, а
      // внутри условия они не определены.
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
  `},va=class{constructor({renderer:e,scene:t,camera:n,config:i}){this.renderer=e,this.scene=t,this.camera=n,this.config=i;let r=i.quality??{};if(this.enabled=r.postProcessing!==!1,!this.enabled)return;let o=e.getDrawingBufferSize(new Re);this.target=new Wt(o.x,o.y,{type:It,samples:r.msaaSamples??4}),this.composer=new ua(e,this.target),this.composer.setPixelRatio(e.getPixelRatio()),this.renderPass=new da(t,n),this.composer.addPass(this.renderPass),this.aoCamera=n.clone(),this.aoCamera.layers.set(0),this.gtao=new Ni(t,this.aoCamera,o.x,o.y),this.gtao.output=Ni.OUTPUT.Default,this.gtao.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:8,rings:4,samples:16}),this.setAmbientOcclusion(r.ambientOcclusion??{}),this.composer.addPass(this.gtao),this.composer.addPass(new Nl),this.backdrop=new es(tM),this.backdrop.enabled=!1,this.composer.addPass(this.backdrop),this.grain=new es(Cf),this.composer.addPass(this.grain)}setAmbientOcclusion(e={}){var n;if(!this.gtao)return;let t={...((n=this.config.quality)==null?void 0:n.ambientOcclusion)??{},...e};this.gtao.enabled=t.enabled!==!1,this.gtao.blendIntensity=t.intensity??1,this.gtao.updateGtaoMaterial({radius:t.radius??.06,distanceExponent:t.distanceExponent??1,thickness:t.thickness??.3,scale:t.scale??1,samples:t.samples??16,screenSpaceRadius:!1})}showAmbientOcclusionOnly(e){this.gtao&&(this.gtao.output=e?Ni.OUTPUT.Denoise:Ni.OUTPUT.Default)}setBackdrop(e){if(!this.backdrop)return;let t=this.backdrop.uniforms;this.backdrop.enabled=!!(e!=null&&e.texture),t.backdrop.value=(e==null?void 0:e.texture)??null,t.hasBackdrop.value=!!(e!=null&&e.texture),t.shadow.value=(e==null?void 0:e.shadow)??null,t.hasShadow.value=!!(e!=null&&e.shadow),t.shadowOpacity.value=(e==null?void 0:e.shadowOpacity)??1,t.frameSize.value.set(...(e==null?void 0:e.frameSize)??[1,1])}setGrain(e){this.grain&&(this.grain.uniforms.amount.value=Math.max(0,e??0))}render(){if(!this.enabled){this.renderer.render(this.scene,this.camera);return}this.aoCamera.copy(this.camera),this.aoCamera.layers.set(0),this.composer.render()}setSize(e,t){if(!this.enabled)return;let n=this.renderer.getPixelRatio();this.composer.setPixelRatio(n),this.composer.setSize(e,t),this.gtao.setSize(e*n,t*n)}dispose(){var e,t,n,i;this.enabled&&((t=(e=this.gtao).dispose)==null||t.call(e),(i=(n=this.composer).dispose)==null||i.call(n),this.target.dispose())}};var If=.62,nM=.35;function Lf(s,e=0){let t=new Le(s),n=Math.max(0,Math.min(.4,e??0)),i=r=>`#${t.clone().convertSRGBToLinear().multiplyScalar(r).convertLinearToSRGB().getHexString()}`;return{base:`#${t.getHexString()}`,top:i(1-n),bottom:i(1+n*nM),flat:n===0}}function Df(s){return s.flat?s.base:`linear-gradient(180deg, ${s.top} 0%, ${s.base} ${Math.round(If*100)}%, ${s.bottom} 100%)`}function Uf(s,e,t,n){if(n.flat)s.fillStyle=n.base;else{let i=s.createLinearGradient(0,0,0,t);i.addColorStop(0,n.top),i.addColorStop(If,n.base),i.addColorStop(1,n.bottom),s.fillStyle=i}s.fillRect(0,0,e,t)}function _a(s,e,t,n){Uf(s,e,t,n)}var Pf=1;function Nf(){let s=document.createElement("canvas");s.width=1,s.height=256;let e=s.getContext("2d"),t=new Ti(s);t.colorSpace=lt;let n=new Bt({map:t,depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!0}),i=new at(new Sn(1,1),n);return i.name="Backdrop",i.position.z=-Pf,i.renderOrder=-1e3,i.frustumCulled=!1,i.layers.set(1),{mesh:i,setColors(r){Uf(e,1,256,r),t.needsUpdate=!0},fit(r){let o=2*Pf*Math.tan(Ut.degToRad(r.fov)/2);i.scale.set(o*r.aspect,o,1)},dispose(){i.geometry.dispose(),n.dispose(),t.dispose(),i.removeFromParent()}}}var iM=[{mime:"video/mp4;codecs=avc1.42E01E",ext:"mp4"},{mime:"video/mp4",ext:"mp4"},{mime:"video/webm;codecs=vp9",ext:"webm"},{mime:"video/webm;codecs=vp8",ext:"webm"},{mime:"video/webm",ext:"webm"}];function Ol(){var s;if(typeof MediaRecorder>"u")return null;for(let e of iM)if((s=MediaRecorder.isTypeSupported)!=null&&s.call(MediaRecorder,e.mime))return e;return null}function sM(s,e){let t=Math.max(2,s.width-s.width%2),n=Math.max(2,s.height-s.height%2),i=document.createElement("canvas");i.width=t,i.height=n;let r=i.getContext("2d");return{canvas:i,draw(){_a(r,t,n,e),r.drawImage(s,0,0)}}}function rM(s,e="image/png"){return new Promise(t=>{try{s.toBlob(n=>t(n),e)}catch(n){console.error(n),t(null)}})}var oM=s=>new Promise(e=>setTimeout(e,s)),aM=250;async function cM({compositor:s,type:e,settings:t,startAngle:n,setAngle:i,renderFrame:r,onProgress:o}){let{fps:a,bitrate:c,duration:l}=t,h=s.canvas.captureStream(a),u=new MediaRecorder(h,{mimeType:e.mime,videoBitsPerSecond:c}),d=[];u.addEventListener("dataavailable",S=>{var y;(y=S.data)!=null&&y.size&&d.push(S.data)});let f=new Promise((S,y)=>{u.addEventListener("stop",S,{once:!0}),u.addEventListener("error",A=>y(A.error??new Error("Запись прервана")),{once:!0})});i(n),r(),s.draw(),u.start();let g=1e3/a,v=l*1e3,m=0,p=performance.now();return await new Promise(S=>{let y=()=>{let A=performance.now();if(document.hidden){u.state==="recording"&&u.pause(),p=A,setTimeout(y,200);return}u.state==="paused"&&u.resume(),m+=Math.min(A-p,aM),p=A;let O=Math.min(m/v,1);if(i(n+O*360),r(),s.draw(),o==null||o(O),O>=1){S();return}setTimeout(y,Math.max(0,g-(performance.now()-A)))};y()}),await oM(Math.ceil(1e3/a)+60),u.stop(),await f,h.getTracks().forEach(S=>S.stop()),new Blob(d,{type:e.mime})}async function lM({compositor:s,step:e,prefix:t,setAngle:n,renderFrame:i,onProgress:r}){let o=Math.max(1,Math.round(360/e)),a=360/o,c=[];for(let l=0;l<o;l+=1){let h=l*a;n(h),i(),s.draw();let u=await rM(s.canvas);if(u){let d=String(Math.round(h)).padStart(3,"0");c.push({name:`${t}-${d}.png`,data:new Uint8Array(await u.arrayBuffer())})}r==null||r((l+1)/o)}return c}async function Of({source:s,backdrop:e,settings:t,startAngle:n,setAngle:i,renderFrame:r,photos:o=!1,onProgress:a}){let c=sM(s,e),l=Ol(),h=l?o?.85:1:0,u=null;l&&(u=await cM({compositor:c,type:l,settings:t,startAngle:n,setAngle:i,renderFrame:r,onProgress:f=>a==null?void 0:a(f*h,"Запись оборота")}));let d=[];return o&&(d=await lM({compositor:c,step:t.photoStep,prefix:t.name,setAngle:i,renderFrame:r,onProgress:f=>a==null?void 0:a(h+f*(1-h),"Съёмка кадров")})),{video:u,videoExt:(l==null?void 0:l.ext)??null,photos:d}}var Fl=Object.freeze({front:{azimuth:0,elevation:null},right:{azimuth:90,elevation:null},back:{azimuth:180,elevation:null},left:{azimuth:270,elevation:null},top:{azimuth:0,elevation:62},seam:{azimuth:"seam",elevation:null}}),Bl=Object.freeze(Object.keys(Fl)),hM=320,xa=Math.PI/180;function zl(s,e,t,n){let i=t*xa,r=n*xa;return new B(s.x+e*Math.cos(r)*Math.sin(i),s.y+e*Math.sin(r),s.z+e*Math.cos(r)*Math.cos(i))}function ya(s,e){let t=s.clone().sub(e),n=t.length();return{distance:n,azimuth:Math.atan2(t.x,t.z)/xa,elevation:Math.asin(Ut.clamp(t.y/(n||1),-1,1))/xa}}var uM=s=>s<.5?4*s*s*s:1-(-2*s+2)**3/2;function Ff({camera:s,controls:e,to:t,duration:n=hM,now:i=performance.now()}){let r=e.target.clone(),o=ya(s.position,r),a=ya(t.position,t.target),c=(a.azimuth-o.azimuth)%360;c>180&&(c-=360),c<-180&&(c+=360);let l=i;return{step(h=performance.now()){let u=Math.min(1,(h-l)/n),d=uM(u),f=r.clone().lerp(t.target,d),g=o.azimuth+c*d,v=o.elevation+(a.elevation-o.elevation)*d,m=o.distance+(a.distance-o.distance)*d;return e.target.copy(f),s.position.copy(zl(f,m,g,v)),s.lookAt(f),u>=1}}}var Bf=["paper","pp","pet"],zf=["paper","plastic"],Hl=/^#[0-9a-f]{6}$/i,En=s=>typeof s=="string"&&s.trim()!=="",Fr=s=>typeof s=="number"&&Number.isFinite(s)&&s>0,kf=s=>typeof s=="number"&&s>=0&&s<=1,kl=s=>Array.isArray(s)&&s.every(En);function dM(s,e){for(let[t,n,i]of e){let r=t.split(".").reduce((o,a)=>o==null?void 0:o[a],s);if(!n(r,s))return`поле ${t} — ожидается ${i}`}return null}function Br(s,e,t,n,i){if(!Array.isArray(e))return i.push(`${s}: нет массива «${t}»`),[];let r=new Set,o=[];return e.forEach((a,c)=>{let l=`${s}: ${t}[${c}]${En(a==null?void 0:a.id)?` (${a.id})`:""}`;if(!a||typeof a!="object"){i.push(`${l}: запись не объект`);return}let h=dM(a,[["id",En,"непустая строка"],...n]);if(h){i.push(`${l}: ${h}`);return}if(r.has(a.id)){i.push(`${l}: id повторяется`);return}r.add(a.id),o.push(a)}),o}var fM=[["name",En,"непустая строка"],["kind",s=>zf.includes(s),zf.join(" | ")],["params",s=>s&&typeof s=="object"&&!Array.isArray(s),"объект параметров"],["params.roughness",kf,"число 0…1"],["swatch",s=>s===void 0||typeof s=="string"&&Hl.test(s),"цвет образца #rrggbb"]];function pM(s){let e=t=>kl(t)&&t.length>0&&t.every(n=>s.has(n));return[["name",En,"непустая строка"],["type",t=>Bf.includes(t),Bf.join(" | ")],["volumeMl",Fr,"число > 0"],["file",En,"путь к .glb"],["size.heightMm",Fr,"число > 0"],["size.topMm",Fr,"число > 0"],["size.bottomMm",Fr,"число > 0"],["textureMapping.materials",t=>kl(t)&&t.length>0,"непустой список имён материалов GLB"],["textureMapping.uv",t=>Number.isInteger(t)&&t>=0,"целое ≥ 0"],["textureMapping.sheet",t=>typeof t=="boolean","true | false"],["textureMapping.unwrapMm",t=>Array.isArray(t)&&t.length===2&&t.every(Fr),"[ширина, высота] в мм"],["textureMapping.seamDeg",t=>typeof t=="number"&&t>=0&&t<360,"азимут шва 0…359°"],["materialCompatibility",e,"непустой список известных материалов"],["defaultMaterial",(t,n)=>n.materialCompatibility.includes(t),"материал из materialCompatibility"],["printType",En,"непустая строка"],["searchTerms",kl,"список строк"]]}var mM=[["name",En,"непустая строка"],["color",s=>typeof s=="string"&&Hl.test(s),"цвет #rrggbb"],["sweep",kf,"число 0…1"],["client",s=>s===void 0||typeof s=="boolean","true | false"]],gM=[["name",En,"непустая строка"]],vM=[["name",En,"непустая строка"],["title",En,"непустая строка"],["logo",En,"путь к логотипу"],["favicon",En,"путь к иконке"],["accent",s=>typeof s=="string"&&Hl.test(s),"цвет #rrggbb"]];function Hf(s){var c,l,h,u,d;let e=[],t=Br("catalog/materials.json",(c=s.materials)==null?void 0:c.materials,"materials",fM,e),n=new Set(t.map(f=>f.id)),i=Br("catalog/models.json",(l=s.models)==null?void 0:l.models,"models",pM(n),e),r=Br("catalog/backgrounds.json",(h=s.backgrounds)==null?void 0:h.backgrounds,"backgrounds",mM,e),o=Br("catalog/scenes/index.json",(u=s.scenes)==null?void 0:u.scenes,"scenes",gM,e),a=Br("catalog/brands.json",(d=s.brands)==null?void 0:d.brands,"brands",vM,e);return{models:i,materials:t,backgrounds:r,scenes:o,brands:a,errors:e}}function _M(s){var v,m;let{models:e,materials:t,backgrounds:n,scenes:i,brands:r,errors:o}=Hf(s),a=p=>new Map(p.map(S=>[S.id,S])),c=a(e),l=a(t),h=a(n),u=a(i),d=a(r),f=(v=s.models)==null?void 0:v.defaultModel,g=c.has(f)?f:((m=e[0])==null?void 0:m.id)??null;return Object.freeze({defaultModelId:g,models:e,materials:t,backgrounds:n,scenes:i,brands:r,errors:o,model:p=>c.get(p)??null,material:p=>l.get(p)??null,background:p=>h.get(p)??null,scene:p=>u.get(p)??null,brand:p=>d.get(p)??null,materialsFor:p=>{var S;return(((S=c.get(p))==null?void 0:S.materialCompatibility)??[]).map(y=>l.get(y))}})}var xM={models:"catalog/models.json",materials:"catalog/materials.json",backgrounds:"catalog/backgrounds.json",scenes:"catalog/scenes/index.json",brands:"catalog/brands.json"},Vl=s=>`catalog/scenes/${s}`;async function Vf(s=fetch){let e=await Promise.all(Object.entries(xM).map(async([n,i])=>{try{let r=await s(i,{credentials:"same-origin"});if(!r.ok)throw new Error(`HTTP ${r.status}`);return[n,await r.json()]}catch(r){return console.error(`Каталог ${i} не загрузился: ${r.message}`),[n,void 0]}})),t=_M(Object.fromEntries(e));for(let n of t.errors)console.error(`Каталог: ${n}`);return t}var yM=.85,Ma=new Map;function Gl(s){return new Promise((e,t)=>{new Pi().load(s,n=>{n.colorSpace=lt,n.wrapS=Nt,n.wrapT=Nt,e(n)},void 0,()=>t(new Error(`фон сцены не загрузился: ${s}`)))})}function MM(s,e,t){return new Promise((n,i)=>{new Gs().load(s,r=>{let o=Pl(r),a=new Zn(e);a.compileEquirectangularShader();let c=a.fromEquirectangular(r).texture;r.dispose(),a.dispose(),n({envMap:c,sun:o})},r=>t==null?void 0:t(r.total>0?r.loaded/r.total*100:-1),()=>i(new Error(`свет сцены не загрузился: ${s}`)))})}async function SM(s,e,t){let n=Vl(s),i=await fetch(`${n}/scene.json`,{credentials:"same-origin"});if(!i.ok)throw new Error(`описание сцены ${s}: HTTP ${i.status}`);let r=await i.json(),[o,a,c]=await Promise.all([Gl(`${n}/${r.backdrop.wide}`),Gl(`${n}/${r.backdrop.tall}`),MM(`${n}/${r.environment}`,e,t)]);return{id:s,data:r,backdrops:{wide:o,tall:a},envMap:c.envMap,sun:c.sun}}function Gf(s,e,t){return Ma.has(s)||Ma.set(s,SM(s,e,t).catch(n=>{throw Ma.delete(s),n})),Ma.get(s)}var Sa=new Map;function Wf(s){return(s==null?void 0:s.id)??null}function Wl(s,e,t,n="wide"){let i=t&&e.shadows?e.shadows[t]:null,r=typeof i=="string"?n==="wide"?i:null:i==null?void 0:i[n];if(!r)return Promise.resolve(null);let o=`${Vl(s)}/${r}`;return Sa.has(o)||Sa.set(o,Gl(o).catch(a=>(console.warn(`Слой тени не загрузился: ${a.message}`),Sa.delete(o),null))),Sa.get(o)}function Xl(s){return s<yM?"tall":"wide"}function ba(s,e){let[t,n]=s.frames[e];return t/n}function Xf(s,e,t){let n=s.camera.fov[e];if(t>=ba(s,e))return n.y;let i=Ut.degToRad(n.x)/2;return Ut.radToDeg(2*Math.atan(Math.tan(i)/t))}function qf(s,e){return s>=e?[e/s,1]:[1,s/e]}function Yf(s,e){var i,r;let t=(i=e==null?void 0:e.size)==null?void 0:i.heightMm,n=(r=s.floor)==null?void 0:r.mmPerUnit;return!(t>0)||!(n>0)?null:t/n}var Zf={width:297,height:210},jf=1024,Ea=null;function Xs(){if(Ea)return Ea;let s=document.createElement("canvas");s.width=jf,s.height=Math.round(jf*Zf.height/Zf.width);let e=s.getContext("2d");return e.fillStyle="#ffffff",e.fillRect(0,0,s.width,s.height),Ea=s.toDataURL("image/png"),Ea}var bM=(()=>{let s=new Uint32Array(256);for(let e=0;e<256;e+=1){let t=e;for(let n=0;n<8;n+=1)t=t&1?3988292384^t>>>1:t>>>1;s[e]=t>>>0}return s})();function EM(s){let e=4294967295;for(let t=0;t<s.length;t+=1)e=bM[(e^s[t])&255]^e>>>8;return(e^4294967295)>>>0}function wM(s){let e=Math.max(s.getFullYear(),1980);return{time:s.getHours()<<11|s.getMinutes()<<5|s.getSeconds()>>1,date:e-1980<<9|s.getMonth()+1<<5|s.getDate()}}function TM(s){return s.replace(/[^\x20-\x7e]/g,"_")}function Kf(s){let e=new TextEncoder,t=wM(new Date),n=s.map(l=>({name:e.encode(TM(l.name)),data:l.data,crc:EM(l.data)})),i=[],r=[],o=0;for(let l of n){let h=new DataView(new ArrayBuffer(30));h.setUint32(0,67324752,!0),h.setUint16(4,20,!0),h.setUint16(6,0,!0),h.setUint16(8,0,!0),h.setUint16(10,t.time,!0),h.setUint16(12,t.date,!0),h.setUint32(14,l.crc,!0),h.setUint32(18,l.data.length,!0),h.setUint32(22,l.data.length,!0),h.setUint16(26,l.name.length,!0),h.setUint16(28,0,!0),i.push(h.buffer,l.name,l.data);let u=new DataView(new ArrayBuffer(46));u.setUint32(0,33639248,!0),u.setUint16(4,20,!0),u.setUint16(6,20,!0),u.setUint16(8,0,!0),u.setUint16(10,0,!0),u.setUint16(12,t.time,!0),u.setUint16(14,t.date,!0),u.setUint32(16,l.crc,!0),u.setUint32(20,l.data.length,!0),u.setUint32(24,l.data.length,!0),u.setUint16(28,l.name.length,!0),u.setUint16(30,0,!0),u.setUint16(32,0,!0),u.setUint16(34,0,!0),u.setUint16(36,0,!0),u.setUint32(38,0,!0),u.setUint32(42,o,!0),r.push(u.buffer,l.name),o+=30+l.name.length+l.data.length}let a=r.reduce((l,h)=>l+h.byteLength,0),c=new DataView(new ArrayBuffer(22));return c.setUint32(0,101010256,!0),c.setUint16(4,0,!0),c.setUint16(6,0,!0),c.setUint16(8,n.length,!0),c.setUint16(10,n.length,!0),c.setUint32(12,a,!0),c.setUint32(16,o,!0),c.setUint16(20,0,!0),new Blob([...i,...r,c.buffer],{type:"application/zip"})}function ql(s,e){if(e===Nd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Tr||e===na){let t=s.getIndex();if(t===null){let o=[],a=s.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===Tr)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var wa=class extends In{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Ql(t)}),this.register(function(t){return new ch(t)}),this.register(function(t){return new lh(t)}),this.register(function(t){return new hh(t)}),this.register(function(t){return new th(t)}),this.register(function(t){return new nh(t)}),this.register(function(t){return new ih(t)}),this.register(function(t){return new sh(t)}),this.register(function(t){return new Jl(t)}),this.register(function(t){return new rh(t)}),this.register(function(t){return new eh(t)}),this.register(function(t){return new ah(t)}),this.register(function(t){return new oh(t)}),this.register(function(t){return new Kl(t)}),this.register(function(t){return new uh(t)}),this.register(function(t){return new dh(t)})}load(e,t,n,i){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Ii.extractUrlBase(e);o=Ii.resolveURL(l,this.path)}else o=Ii.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new di(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===tp){try{o[ot.KHR_BINARY_GLTF]=new fh(e)}catch(u){i&&i(u);return}r=JSON.parse(o[ot.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new yh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case ot.KHR_MATERIALS_UNLIT:o[u]=new $l;break;case ot.KHR_DRACO_MESH_COMPRESSION:o[u]=new ph(r,this.dracoLoader);break;case ot.KHR_TEXTURE_TRANSFORM:o[u]=new mh;break;case ot.KHR_MESH_QUANTIZATION:o[u]=new gh;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function AM(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}var ot={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Kl=class{constructor(e){this.parser=e,this.name=ot.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Le(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Et);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new jo(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Zo(h),l.distance=u;break;case"spot":l=new Bs(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Fi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},$l=class{constructor(){this.name=ot.KHR_MATERIALS_UNLIT}getMaterialType(){return Bt}extendParams(e,t,n){let i=[];e.color=new Le(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Et),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,lt))}return Promise.all(i)}},Jl=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Ql=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Re(a,a)}return Promise.all(r)}},eh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},th=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Le(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Et)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,lt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},nh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},ih=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Le().setRGB(a[0],a[1],a[2],Et),Promise.all(r)}},sh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},rh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Le().setRGB(a[0],a[1],a[2],Et),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,lt)),Promise.all(r)}},oh=class{constructor(e){this.parser=e,this.name=ot.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},ah=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},ch=class{constructor(e){this.parser=e,this.name=ot.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},lh=class{constructor(e){this.parser=e,this.name=ot.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},hh=class{constructor(e){this.parser=e,this.name=ot.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},uh=class{constructor(e){this.name=ot.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}},dh=class{constructor(e){this.name=ot.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==Dn.TRIANGLES&&l.mode!==Dn.TRIANGLE_STRIP&&l.mode!==Dn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(let g of u){let v=new Ke,m=new B,p=new pn,S=new B(1,1,1),y=new ji(g.geometry,g.material,d);for(let A=0;A<d;A++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,A),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,A),c.SCALE&&S.fromBufferAttribute(c.SCALE,A),y.setMatrixAt(A,v.compose(m,p,S));for(let A in c)if(A==="_COLOR_0"){let O=c[A];y.instanceColor=new Zi(O.array,O.itemSize,O.normalized)}else A!=="TRANSLATION"&&A!=="ROTATION"&&A!=="SCALE"&&g.geometry.setAttribute(A,c[A]);Lt.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},tp="glTF",zr=12,$f={JSON:1313821514,BIN:5130562},fh=class{constructor(e){this.name=ot.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,zr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==tp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-zr,r=new DataView(e,zr),o=0;for(;o<i;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===$f.JSON){let l=new Uint8Array(e,zr+o,a);this.content=n.decode(l)}else if(c===$f.BIN){let l=zr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},ph=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ot.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=_h[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=_h[h]||h.toLowerCase();if(o[h]!==void 0){let d=n.accessors[e.attributes[h]],f=qs[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(let g in f.attributes){let v=f.attributes[g],m=c[g];m!==void 0&&(v.normalized=m)}u(f)},a,l,Et,d)})})}},mh=class{constructor(){this.name=ot.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},gh=class{constructor(){this.name=ot.KHR_MESH_QUANTIZATION}},Ta=class extends Ai{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*l,v=g-l,m=-2*f+3*d,p=f-d,S=1-m,y=p-d+u;for(let A=0;A!==a;A++){let O=o[v+A+a],I=o[v+A+c]*h,P=o[g+A+a],k=o[g+A]*h;r[A]=S*O+y*I+m*P+p*k}return r}},RM=new pn,vh=class extends Ta{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return RM.fromArray(r).normalize().toArray(r),r}},Dn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},qs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Jf={9728:Pt,9729:bt,9984:bo,9985:il,9986:sr,9987:Bn},Qf={33071:Nt,33648:lr,10497:Vt},Yl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},_h={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Oi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},CM={CUBICSPLINE:void 0,LINEAR:Yi,STEP:Cs},Zl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function PM(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Os({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Rn})),s.DefaultMaterial}function ts(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Fi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function IM(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],d=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function LM(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function DM(s){let e,t=s.extensions&&s.extensions[ot.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+jl(t.attributes):e=s.indices+":"+jl(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+jl(s.targets[n]);return e}function jl(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function xh(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function UM(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var NM=new Ke,yh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new AM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&r<98?this.textureLoader=new Pi(this.options.manager):this.textureLoader=new Ko(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new di(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return ts(r,a,i),Fi(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ot.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,o){n.load(Ii.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=Yl[i.type],a=qs[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new At(l,o,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=Yl[i.type],l=qs[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,v,m;if(f&&f!==u){let p=Math.floor(d/f),S="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,y=t.cache.get(S);y||(v=new l(a,p*f,i.count*f/h),y=new gr(v,f/h),t.cache.add(S,y)),m=new vr(y,c,d%f/h,g)}else a===null?v=new l(i.count*c):v=new l(a,d,i.count*c),m=new At(v,c,g);if(i.sparse!==void 0){let p=Yl.SCALAR,S=qs[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,A=i.sparse.values.byteOffset||0,O=new S(o[1],y,i.sparse.count*p),I=new l(o[2],A,i.sparse.count*c);a!==null&&(m=new At(m.array.slice(),m.itemSize,m.normalized));for(let P=0,k=O.length;P<k;P++){let M=O[P];if(m.setX(M,I[P*c]),c>=2&&m.setY(M,I[P*c+1]),c>=3&&m.setZ(M,I[P*c+2]),c>=4&&m.setW(M,I[P*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let i=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let d=(r.samplers||{})[o.sampler]||{};return h.magFilter=Jf[d.magFilter]||bt,h.minFilter=Jf[d.minFilter]||Bn,h.wrapS=Qf[d.wrapS]||Vt,h.wrapT=Qf[d.wrapT]||Vt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=i.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(v){let m=new Gt(v);m.needsUpdate=!0,d(m)}),t.load(Ii.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),u.userData.mimeType=o.mimeType||UM(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[ot.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[ot.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[ot.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new yr,fn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new xr,fn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Os}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[ot.KHR_MATERIALS_UNLIT]){let u=i[ot.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new Le(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Et),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,lt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=yn);let h=r.alphaMode||Zl.OPAQUE;if(h===Zl.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Zl.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Bt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Re(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Bt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Bt){let u=r.emissiveFactor;a.emissive=new Le().setRGB(u[0],u[1],u[2],Et)}return r.emissiveTexture!==void 0&&o!==Bt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,lt)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),Fi(u,r),t.associations.set(u,{materials:e}),r.extensions&&ts(i,u,r),u})}createUniqueName(e){let t=St.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[ot.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return ep(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=DM(l),u=i[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[ot.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=ep(new Xt,l,t),i[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?PM(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,g=h.length;f<g;f++){let v=h[f],m=o[f],p,S=l[f];if(m.mode===Dn.TRIANGLES||m.mode===Dn.TRIANGLE_STRIP||m.mode===Dn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Fo(v,S):new at(v,S),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Dn.TRIANGLE_STRIP?p.geometry=ql(p.geometry,na):m.mode===Dn.TRIANGLE_FAN&&(p.geometry=ql(p.geometry,Tr));else if(m.mode===Dn.LINES)p=new zo(v,S);else if(m.mode===Dn.LINE_STRIP)p=new Us(v,S);else if(m.mode===Dn.LINE_LOOP)p=new ko(v,S);else if(m.mode===Dn.POINTS)p=new Ho(v,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&LM(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Fi(p,r),m.extensions&&ts(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&ts(i,u[0],r),u[0];let d=new kt;r.extensions&&ts(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new zt(Ut.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Yn(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Fi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let d=new Ke;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Bo(a,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let f=i.channels[u],g=i.samplers[f.sampler],v=f.target,m=v.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,S=i.parameters!==void 0?i.parameters[g.output]:g.output;v.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",S)),l.push(g),h.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],g=u[2],v=u[3],m=u[4],p=[];for(let S=0,y=d.length;S<y;S++){let A=d[S],O=f[S],I=g[S],P=v[S],k=m[S];if(A===void 0)continue;A.updateMatrix&&A.updateMatrix();let M=n._createAnimationTracks(A,O,I,P,k);if(M)for(let w=0;w<M.length;w++)p.push(M[w])}return new Yo(r,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,NM)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new _r:l.length>1?h=new kt:l.length===1?h=l[0]:h=new Lt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Fi(h,r),r.extensions&&ts(n,h,r),r.matrix!==void 0){let u=new Ke;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new kt;n.name&&(r.name=i.createUniqueName(n.name)),Fi(r,n),n.extensions&&ts(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[d,f]of i.associations)(d instanceof fn||d instanceof Gt)&&u.set(d,f);return h.traverse(d=>{let f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let o=[],a=e.name?e.name:e.uuid,c=[];Oi[r.path]===Oi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(Oi[r.path]){case Oi.weights:l=hi;break;case Oi.rotation:l=jn;break;case Oi.position:case Oi.scale:l=ui;break;default:switch(n.itemSize){case 1:l=hi;break;case 2:case 3:default:l=ui;break}break}let h=i.interpolation!==void 0?CM[i.interpolation]:Yi,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){let g=new l(c[d]+"."+Oi[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=xh(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof jn?vh:Ta;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function OM(s,e,t){let n=e.attributes,i=new nn;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new B(c[0],c[1],c[2]),new B(l[0],l[1],l[2])),a.normalized){let h=xh(qs[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new B,c=new B;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let v=xh(qs[d.componentType]);c.multiplyScalar(v)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;let o=new Mn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function ep(s,e,t){let n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){s.setAttribute(a,c)})}for(let o in n){let a=_h[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){let o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return dt.workingColorSpace!==Et&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${dt.workingColorSpace}" not supported.`),Fi(s,e),OM(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?IM(s,e.targets,t):s})}var Mh=new WeakMap,Aa=class extends In{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){let r=new di(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,o=>{this.parse(o,t,i)},n,i)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,lt).catch(n)}decodeDracoFile(e,t,n,i,r=Et,o=()=>{}){let a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:r};return this.decodeGeometry(e,a).then(t).catch(o)}decodeGeometry(e,t){let n=JSON.stringify(t);if(Mh.has(e)){let c=Mh.get(e);if(c.key===n)return c.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i,r=this.workerNextTaskID++,o=e.byteLength,a=this._getWorker(r,o).then(c=>(i=c,new Promise((l,h)=>{i._callbacks[r]={resolve:l,reject:h},i.postMessage({type:"decode",id:r,taskConfig:t,buffer:e},[e])}))).then(c=>this._createGeometry(c.geometry));return a.catch(()=>!0).then(()=>{i&&r&&this._releaseTask(i,r)}),Mh.set(e,{key:n,promise:a}),a}_createGeometry(e){let t=new Xt;e.index&&t.setIndex(new At(e.index.array,1));for(let n=0;n<e.attributes.length;n++){let i=e.attributes[n],r=i.name,o=i.array,a=i.itemSize,c=new At(o,a);r==="color"&&(this._assignVertexColorSpace(c,i.vertexColorSpace),c.normalized=!(o instanceof Float32Array)),t.setAttribute(r,c)}return t}_assignVertexColorSpace(e,t){if(t!==lt)return;let n=new Le;for(let i=0,r=e.count;i<r;i++)n.fromBufferAttribute(e,i).convertSRGBToLinear(),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){let n=new di(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,r)=>{n.load(e,i,void 0,r)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{let i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);let r=FM.toString(),o=["/* draco decoder */",i,"","/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([o]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(r){let o=r.data;switch(o.type){case"decode":i._callbacks[o.id].resolve(o);break;case"error":i._callbacks[o.id].reject(o);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+o.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,r){return i._taskLoad>r._taskLoad?-1:1});let n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}};function FM(){let s,e;onmessage=function(o){let a=o.data;switch(a.type){case"init":s=a.decoderConfig,e=new Promise(function(h){s.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(s)});break;case"decode":let c=a.buffer,l=a.taskConfig;e.then(h=>{let u=h.draco,d=new u.Decoder;try{let f=t(u,d,new Int8Array(c),l),g=f.attributes.map(v=>v.array.buffer);f.index&&g.push(f.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:f},g)}catch(f){console.error(f),self.postMessage({type:"error",id:a.id,error:f.message})}finally{u.destroy(d)}});break}};function t(o,a,c,l){let h=l.attributeIDs,u=l.attributeTypes,d,f,g=a.GetEncodedGeometryType(c);if(g===o.TRIANGULAR_MESH)d=new o.Mesh,f=a.DecodeArrayToMesh(c,c.byteLength,d);else if(g===o.POINT_CLOUD)d=new o.PointCloud,f=a.DecodeArrayToPointCloud(c,c.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());let v={index:null,attributes:[]};for(let m in h){let p=self[u[m]],S,y;if(l.useUniqueIDs)y=h[m],S=a.GetAttributeByUniqueId(d,y);else{if(y=a.GetAttributeId(d,o[h[m]]),y===-1)continue;S=a.GetAttribute(d,y)}let A=i(o,a,d,m,p,S);m==="color"&&(A.vertexColorSpace=l.vertexColorSpace),v.attributes.push(A)}return g===o.TRIANGULAR_MESH&&(v.index=n(o,a,d)),o.destroy(d),v}function n(o,a,c){let h=c.num_faces()*3,u=h*4,d=o._malloc(u);a.GetTrianglesUInt32Array(c,u,d);let f=new Uint32Array(o.HEAPF32.buffer,d,h).slice();return o._free(d),{array:f,itemSize:1}}function i(o,a,c,l,h,u){let d=u.num_components(),g=c.num_points()*d,v=g*h.BYTES_PER_ELEMENT,m=r(o,h),p=o._malloc(v);a.GetAttributeDataArrayForAllPoints(c,u,m,v,p);let S=new h(o.HEAPF32.buffer,p,g).slice();return o._free(p),{name:l,array:S,itemSize:d}}function r(o,a){switch(a){case Float32Array:return o.DT_FLOAT32;case Int8Array:return o.DT_INT8;case Int16Array:return o.DT_INT16;case Int32Array:return o.DT_INT32;case Uint8Array:return o.DT_UINT8;case Uint16Array:return o.DT_UINT16;case Uint32Array:return o.DT_UINT32}}}function np(s){s.traverse(e=>{if(e.geometry&&e.geometry.dispose(),!e.material)return;let t=Array.isArray(e.material)?e.material:[e.material];for(let n of t)BM(n)})}function BM(s){for(let e of Object.values(s))e&&e.isTexture&&e.dispose();s.dispose()}function Sh(s){let e=new nn().setFromObject(s);return{box:e,center:e.getCenter(new B),size:e.getSize(new B)}}function ip(s,e,t,n=1.3,i=0){let r=t.getCenter(new B),o=t.getSize(new B);r.y+=o.y*i;let c=Math.max(o.x,o.y,o.z)/(2*Math.tan(Math.PI*s.fov/360)),l=Number.isFinite(s.aspect)&&s.aspect>0?s.aspect:1,h=Math.max(o.x,o.z)/(2*Math.tan(Math.PI*s.fov/360)*l),u=n*Math.max(c,h),d=Number.isFinite(u)&&u>0?u:1,f=s.position.clone().sub(e.target).normalize();e.target.copy(r),s.position.copy(r).addScaledVector(f,d),s.near=d/20,s.far=d*20,s.updateProjectionMatrix(),e.update()}var bh=512,rp=6;function zM(s,e){let t=new Float32Array(s*e),n=[{cells:32,weight:.4},{cells:96,weight:.35},{cells:192,weight:.25}];for(let{cells:i,weight:r}of n){let o=new Float32Array((i+1)*(i+1));for(let c=0;c<o.length;c++)o[c]=Math.random();let a=c=>c*c*(3-2*c);for(let c=0;c<e;c++)for(let l=0;l<s;l++){let h=l/s*i,u=c/e*i,d=Math.floor(h),f=Math.floor(u),g=a(h-d),v=a(u-f),m=O=>O%i,p=O=>O%i,S=(O,I)=>o[p(I)*(i+1)+m(O)],y=S(d,f)*(1-g)+S(d+1,f)*g,A=S(d,f+1)*(1-g)+S(d+1,f+1)*g;t[c*s+l]+=(y*(1-v)+A*v)*r}}return t}function kM(s,e){let t=document.createElement("canvas");t.width=e,t.height=e;let n=t.getContext("2d"),i=n.createImageData(e,e),r=(a,c)=>s[(c+e)%e*e+(a+e)%e],o=1.4;for(let a=0;a<e;a++)for(let c=0;c<e;c++){let l=(r(c+1,a)-r(c-1,a))*o,h=(r(c,a+1)-r(c,a-1))*o,u=Math.hypot(l,h,1),d=(a*e+c)*4;i.data[d]=(-l/u*.5+.5)*255,i.data[d+1]=(-h/u*.5+.5)*255,i.data[d+2]=1/u*.5*255+127.5,i.data[d+3]=255}return n.putImageData(i,0,0),t}var Eh=null,sp=new Map;function HM(s=rp){let e=Math.round(s*100)/100,t=sp.get(e);if(t)return t;Eh||(Eh=zM(bh,bh));let n=new Ti(kM(Eh,bh));return n.wrapS=Vt,n.wrapT=Vt,n.repeat.set(e,e),n.colorSpace=an,n.anisotropy=4,sp.set(e,n),n}function op(s,e,t=rp,n=1){var r;if(!("normalScale"in s))return!1;let i=(r=s.userData)==null?void 0:r.sourceNormalMap;return i?(s.normalMap=i,s.normalScale.set(n,n),s.needsUpdate=!0,!0):e?(s.normalMap=HM(t),s.normalScale=new Re(e,e),s.needsUpdate=!0,!0):(s.normalMap=null,s.needsUpdate=!0,!0)}var wh=Object.freeze({materials:[],uv:0,sheet:!1}),VM=1,GM=2,mn,ap,cp,lp,hp,up,dp,Ra=class{constructor({scene:e,camera:t,controls:n,config:i,maxAnisotropy:r=1}){gn(this,mn);this.scene=e,this.camera=t,this.controls=n,this.config=i,this.maxAnisotropy=r,this.loader=new wa,this.draco=new Aa,this.draco.setDecoderPath(i.assets.dracoDecoder),this.loader.setDRACOLoader(this.draco),this.currentModel=null,this.cup=null,this.print=wh,this.printMaterials=[],this.wallOpacity=1}load(e,t,n=null,i=null){return new Promise((r,o)=>{this.loader.load(e,a=>r(G(this,mn,ap).call(this,a.scene,n,i)),a=>t==null?void 0:t(a.total>0?a.loaded/a.total*100:-1),a=>o(new Error(`Не удалось загрузить модель "${e}": ${a.message??a}`)))})}applyMaterial(e){if(this.material=e??null,!e)return 0;if(e.kind==="plastic")return G(this,mn,cp).call(this,e.params);let t=e.params;this.wallOpacity=1;let n=0;for(let i of this.printMaterials)"roughness"in i&&(t.roughness!=null&&(i.roughness=t.roughness),t.metalness!=null&&(i.metalness=t.metalness),t.relief!=null&&op(i,t.relief,t.reliefScale,t.normalScale??1),i.needsUpdate=!0,n++);return n}frameCurrentModel(){this.currentModel&&(ip(this.camera,this.controls,Sh(this.currentModel).box,this.config.model.cameraFitOffset,this.config.model.cameraAim),this.framing={target:this.controls.target.clone(),distance:this.camera.position.distanceTo(this.controls.target)})}normalize(e=this.currentModel){if(!e||!this.sourceSize)return;let{x:t,y:n,z:i}=this.sourceSize,r=Math.max(t,n,i);e.scale.setScalar(r>0?this.config.model.targetSize/r:1),e.position.set(0,0,0)}setNaturalHeight(e,t=[0,0,0]){let n=this.currentModel;if(!n||!this.sourceSize||!(this.sourceSize.y>0))return 0;let i=e/this.sourceSize.y;return n.scale.setScalar(i),n.position.set(t[0],t[1]+this.sourceSize.y*i/2,t[2]),i}dispose(){this.currentModel&&(this.scene.remove(this.currentModel),np(this.currentModel),this.currentModel=null,this.sourceSize=null,this.cup=null,this.material=null,this.print=wh,this.printMaterials=[],this.wallOpacity=1)}destroy(){this.dispose(),this.draco.dispose()}};mn=new WeakSet,ap=function(e,t,n){this.dispose(),this.cup=t,this.print=(t==null?void 0:t.textureMapping)??wh,G(this,mn,up).call(this,e),t&&t.type!=="paper"&&G(this,mn,lp).call(this,e);let i=G(this,mn,hp).call(this,e);return this.scene.add(i),this.currentModel=i,this.applyMaterial(n),this.frameCurrentModel(),i},cp=function(e){let t=0;for(let n of this.printMaterials)"roughness"in n&&(n.color.set(e.color),n.roughness=e.roughness,n.metalness=e.metalness,"transmission"in n&&(n.transmission=0,n.thickness=0,n.clearcoat=e.clearcoat,n.clearcoatRoughness=e.clearcoatRoughness,n.sheen=e.sheen,n.sheenRoughness=e.sheenRoughness,n.sheenColor.set(e.color)),n.transparent=!0,n.opacity=1,n.depthWrite=!0,n.side=n.userData.backSide?cn:Rn,n.needsUpdate=!0,t++);return this.wallOpacity=e.opacity,t},lp=function(e){let t=[];e.traverse(n=>{if(!n.isMesh)return;(Array.isArray(n.material)?n.material:[n.material]).some(r=>this.printMaterials.includes(r))&&t.push(n)});for(let n of t){let r=(Array.isArray(n.material)?n.material[0]:n.material).clone();r.userData.backSide=!0;let o=new at(n.geometry,r);o.name=`${n.name}__back`,o.castShadow=!1,o.receiveShadow=!0,o.renderOrder=VM,n.renderOrder=GM,n.parent.add(o),this.printMaterials.push(r)}},hp=function(e){let{center:t,size:n}=Sh(e);e.position.sub(t);let i=new kt;return i.name="ModelPivot",i.add(e),this.sourceSize=n.clone(),this.normalize(i),i},up=function(e){this.printMaterials=[];let t=new Set(this.print.materials??[]),n=new Set;e.traverse(i=>{if(!i.isMesh)return;i.castShadow=!0,i.receiveShadow=!0;let r=Array.isArray(i.material)?i.material:[i.material];for(let o of r){if(!o||n.has(o))continue;n.add(o),G(this,mn,dp).call(this,o),o.userData.sourceNormalMap===void 0&&(o.userData.sourceNormalMap=o.normalMap??null),(t.size>0?t.has(o.name):!!o.map)&&this.printMaterials.push(o)}}),t.size>0&&this.printMaterials.length===0&&console.warn(`Каталог: в модели нет материалов «${[...t].join("», «")}» — макет класть некуда. Проверьте print.materials в js/data/models.js.`)},dp=function(e){for(let t of Object.values(e))t!=null&&t.isTexture&&(t.anisotropy=this.maxAnisotropy,t.needsUpdate=!0)};var ns=.1,fp=64,Zt,pp,mp,gp,Ca,vp,_p,Th,Pa=class{constructor({modelLoader:e,config:t,maxAnisotropy:n=1,maxTextureSize:i=4096}){gn(this,Zt);var r;this.modelLoader=e,this.config=t,this.maxAnisotropy=n,this.maxSize=Math.min(((r=t.texture)==null?void 0:r.maxSize)??2048,i),this.loader=new Pi,this.ownedTextures=new Set}async loadTexture(e){var a;let t=((a=this.modelLoader.print)==null?void 0:a.sheet)===!0,n=t?Math.round(this.maxSize*(1-2*ns)):this.maxSize,r=t&&e===Xs()?null:await G(this,Zt,mp).call(this,e,n),o=new Gt(t?G(this,Zt,pp).call(this,r):r);return o.needsUpdate=!0,G(this,Zt,vp).call(this,o)}async loadFromFile(e){if(!e.type.startsWith("image/"))throw new Error(`"${e.name}" не является изображением`);let t=URL.createObjectURL(e);try{return await this.loadTexture(t)}finally{URL.revokeObjectURL(t)}}applyTexture(e){let t=this.modelLoader.printMaterials;if(t.length===0)return 0;let n=0;for(let i of t)i.map!==e&&(G(this,Zt,_p).call(this,i.map),i.map=e,i.needsUpdate=!0),n++;return n}async replaceTexture(e){return this.applyTexture(await this.loadTexture(e))}dispose(){for(let e of this.ownedTextures)G(this,Zt,Th).call(this,e);this.ownedTextures.clear()}};Zt=new WeakSet,pp=function(e){var c;let t=this.modelLoader.wallOpacity??1,n=1-2*ns,i=e?e.naturalWidth??e.width:fp,r=e?e.naturalHeight??e.height:fp,o=document.createElement("canvas");o.width=Math.round(i/n),o.height=Math.round(r/n);let a=o.getContext("2d");return a.fillStyle=`rgba(255, 255, 255, ${t})`,a.fillRect(0,0,o.width,o.height),e&&(a.drawImage(e,Math.round(o.width*ns),Math.round(o.height*ns),i,r),(c=e.close)==null||c.call(e)),o},mp=async function(e,t){if(e.startsWith("data:"))return G(this,Zt,Ca).call(this,e);if(typeof createImageBitmap!="function")return G(this,Zt,Ca).call(this,e);try{let n=await fetch(e,{credentials:"same-origin"});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.blob(),r=await createImageBitmap(i),o=Math.max(r.width,r.height);if(o<=t)return r;let a=t/o,c=Math.max(1,Math.round(r.width*a)),l=Math.max(1,Math.round(r.height*a)),h=await createImageBitmap(i,{resizeWidth:c,resizeHeight:l,resizeQuality:"high"});if(r.close(),r=h,Math.max(r.width,r.height)>t){let u=G(this,Zt,gp).call(this,r,c,l);r.close(),r=u}return console.info(`Макет уменьшен до ${r.width}×${r.height} для 3D (предел ${t}px). Крупный исходник для проверки мелкого текста передаётся полем "unwrap".`),r}catch(n){return console.warn(`Быстрое декодирование макета не удалось (${n.message}), грузим через <img>.`),G(this,Zt,Ca).call(this,e)}},gp=function(e,t,n){let i=document.createElement("canvas");i.width=t,i.height=n;let r=i.getContext("2d");return r.imageSmoothingEnabled=!0,r.imageSmoothingQuality="high",r.drawImage(e,0,0,t,n),i},Ca=function(e){return new Promise((t,n)=>{this.loader.load(e,i=>{let r=i.image;i.dispose(),t(r)},void 0,()=>n(new Error(`Не удалось загрузить текстуру "${e}"`)))})},vp=function(e){let t=this.modelLoader.print??{};if(e.colorSpace=lt,e.channel=t.uv??0,t.sheet){let n=1-2*ns;e.wrapS=Nt,e.wrapT=Nt,e.repeat.set(n,n),e.offset.set(ns,ns)}else e.wrapS=Vt,e.wrapT=Vt;return e.flipY=!1,e.anisotropy=this.maxAnisotropy,e.generateMipmaps=!0,e.minFilter=Bn,e.magFilter=bt,this.ownedTextures.add(e),e},_p=function(e){this.ownedTextures.has(e)&&(G(this,Zt,Th).call(this,e),this.ownedTextures.delete(e))},Th=function(e){e.dispose();let t=e.image;t&&typeof t.close=="function"&&t.close()};var WM=.1;function xp(s){return(s==null?void 0:s.environmentIntensity)??1}function kr(s,e){let t=s/e;return Number.isFinite(t)&&t>0?t:1}var is,ee,Ah,yp,Mp,Sp,$n,pi,ln,Hr,Vr,bp,Ep,wp,Tp,Ia,Ap,Rp,Cp,La,Rh,Da,Gr,Pp,Ch,Ph,Ip,Ih,Lh,Lp,Dh,Dp,Ua,Wr,Up,Np,Op,Xr,Na=class{constructor(e,t,{catalog:n,hooks:i={}}={}){gn(this,ee);gn(this,is,new Set);this.container=e,this.config=t,this.catalog=n,this.hooks=i,this.frameId=null,this.autoRotate=t.autoRotate.enabled,this.manualRotate=!1,this.exporting=!1,this.photo=null,this.needsRender=!0,this.modelDirty=!0,G(this,ee,Mp).call(this),G(this,ee,Sp).call(this),G(this,ee,yp).call(this,["loadHDRI","loadModel","applyTexture","enterPhotoScene","exitPhotoScene","present"])}async whenReady(){for(;js(this,is).size>0;)await Promise.allSettled([...js(this,is)])}async startEnvironment(){G(this,ee,Ep).call(this),G(this,ee,wp).call(this),G(this,ee,bp).call(this),G(this,ee,Tp).call(this),G(this,ee,Hr).call(this),await this.loadHDRI(),this.invalidateModel()}async applyTexture(e){try{let t=await this.textureManager.replaceTexture(e||Xs());return this.invalidateModel(),t}catch(t){return console.warn(`Дизайн не загружен: ${t.message}`),null}}invalidate(){this.needsRender=!0}invalidateModel(){this.modelDirty=!0,this.needsRender=!0}resize(){var r;let{clientWidth:e,clientHeight:t}=this.container;if(e===0||t===0)return;let[n,i]=this.photo?G(this,ee,Pp).call(this,e,t):[e,t];this.camera.aspect=kr(n,i),this.camera.updateProjectionMatrix(),(r=this.backdropScreen)==null||r.fit(this.camera),this.renderer.setSize(n,i),this.pipeline.setSize(n,i),this.photo&&G(this,ee,Ch).call(this),this.invalidate()}async loadHDRI(){let e=this.config.lighting.environment==="hdri";e&&G(this,ee,pi).call(this,"Загрузка окружения…");try{await this.loadEnvironmentMap()}catch(t){console.error(t),G(this,ee,ln).call(this,"Не удалось загрузить окружение","error")}finally{e&&G(this,ee,$n).call(this,"onLoaded")}}async loadEnvironmentMap(){var n;let{envMap:e,sun:t}=this.config.lighting.environment==="hdri"?await bf(this.scene,this.renderer,this.config,i=>G(this,ee,pi).call(this,"Загрузка окружения…",i)):Ll(this.scene,this.renderer,this.config,(n=this.backdrop)==null?void 0:n.base);return this.sun=t,dl(this.lightingRig,t,this.config),this.invalidateModel(),e}describeKeyLight(){if(!this.sun)return null;let{direction:e,color:t,irradiance:n,angularRadius:i}=this.sun,r=180/Math.PI,o=this.lightingRig.getObjectByName("KeyLight");return{elevation:+(Math.asin(e.y)*r).toFixed(1),azimuth:+(Math.atan2(e.z,e.x)*r).toFixed(1),color:`#${t.getHexString()}`,softboxIntensity:+n.toFixed(2),lightIntensity:+((o==null?void 0:o.intensity)??0).toFixed(2),angularRadius:+(i*r).toFixed(2)}}async loadModel(e,t=null,n=null){G(this,ee,pi).call(this,"Загрузка модели…");try{await this.modelLoader.load(e,i=>G(this,ee,pi).call(this,"Загрузка модели…",i),t,n),this.textureManager.dispose(),this.photo?(Lr(this.modelLoader.currentModel,xp(this.photo.data)),G(this,ee,La).call(this),G(this,ee,Rh).call(this)):(Lr(this.modelLoader.currentModel,this.config.lighting.environmentIntensity),G(this,ee,Ia).call(this),G(this,ee,Ua).call(this)),this.invalidateModel()}catch(i){throw console.error(i),G(this,ee,ln).call(this,"Не удалось загрузить модель","error"),i}finally{G(this,ee,$n).call(this,"onLoaded")}}async enterPhotoScene(e){G(this,ee,pi).call(this,"Загрузка сцены…");try{let t=await Gf(e,this.renderer,n=>G(this,ee,pi).call(this,"Загрузка сцены…",n));return G(this,ee,Ap).call(this,t),t}catch(t){return console.error(t),G(this,ee,ln).call(this,"Не удалось открыть сцену","error"),null}finally{G(this,ee,$n).call(this,"onLoaded")}}async exitPhotoScene(){this.photo&&(this.photo=null,G(this,ee,Da).call(this),this.renderer.toneMapping=this.baseToneMapping,this.renderer.toneMappingExposure=this.config.renderer.toneMappingExposure,this.pipeline.setBackdrop(null),this.photoShadow=null,G(this,ee,Ph).call(this,!1),this.pipeline.setGrain(0),this.controls.enabled=!0,this.container.classList.remove("has-photo"),this.container.style.removeProperty("--photo-width"),this.container.style.removeProperty("--photo-height"),this.modelLoader.normalize(),G(this,ee,Gr).call(this,1),G(this,ee,Ia).call(this),G(this,ee,Ua).call(this),this.camera.fov=this.config.camera.fov,this.resize(),G(this,ee,Cp).call(this),this.setBackground(this.background),await this.loadEnvironmentMap(),Lr(this.modelLoader.currentModel,this.config.lighting.environmentIntensity),this.invalidateModel())}present(e){return this.target={...this.target,...e},this.presenting||(this.presenting=G(this,ee,Lp).call(this).finally(()=>{this.presenting=null})),this.presenting}setSurfaceFinish(e){let t=this.modelLoader.material;return t?G(this,ee,Dh).call(this,{...t,params:{...t.params,...e}}):0}setBackground(e){var i;this.background=e;let t=e.color;this.backdrop=Lf(t,e.sweep),this.backdropScreen.setColors(this.backdrop),this.backdropScreen.mesh.visible=!this.photo,this.scene.background=new Le(this.backdrop.base);let n=this.container.closest(".stage")??this.container;n.style.background=Df(this.backdrop),(i=this.turntable)==null||i.setBackground(new Le(t)),G(this,ee,Dp).call(this),this.invalidateModel()}setAutoRotate(e){this.autoRotate=e,this.invalidate()}setManualRotate(e){this.manualRotate=e}rotateModelTo(e){let t=this.modelLoader.currentModel;t&&(t.rotation.y=Ut.degToRad(e),this.invalidateModel())}getModelRotation(){let e=this.modelLoader.currentModel;return e?(Ut.radToDeg(e.rotation.y)%360+360)%360:0}resetView(){if(this.photo){G(this,ee,La).call(this),this.invalidate();return}this.setView("front")}viewCamera(e){var l,h;let t=Fl[e],n=this.modelLoader.currentModel,i=this.modelLoader.framing;if(!t||!n||!i)return null;let r=((h=(l=this.modelLoader.cup)==null?void 0:l.textureMapping)==null?void 0:h.seamDeg)??180,o=ya(new B().copy(this.config.camera.position),new B),a=(t.azimuth==="seam"?r:t.azimuth)+Ut.radToDeg(n.rotation.y),c=t.elevation??o.elevation;return{target:i.target.clone(),position:zl(i.target,i.distance,a,c)}}setView(e,{animate:t=!0}={}){if(this.photo)return!1;let n=this.viewCamera(e);return n?(this.cameraTween=null,t?(this.cameraTween=Ff({camera:this.camera,controls:this.controls,to:n}),this.invalidate(),!0):(this.controls.target.copy(n.target),this.camera.position.copy(n.position),this.camera.lookAt(n.target),this.controls.update(),this.invalidate(),!0)):!1}async takeScreenshot(){var i,r,o;if(this.exporting||this.screenshotting)return;this.screenshotting=!0,(i=this.turntable)==null||i.setHiddenForCapture(!0);let e=this.config.ui.screenshotName,t;try{(r=this.ambientShadow)==null||r.update(this.renderer,this.scene),this.pipeline.render(),t=await G(this,ee,Np).call(this)}finally{(o=this.turntable)==null||o.setHiddenForCapture(!1),this.screenshotting=!1,this.invalidate()}if(!t){G(this,ee,ln).call(this,"Не удалось сделать снимок","error");return}let n=await G(this,ee,Wr).call(this,t,e,"image/png");n!=="shared"&&G(this,ee,ln).call(this,n==="opened"?"Снимок открыт в новой вкладке":"Снимок сохранён")}async deliverFile(e,t,n){let i=await G(this,ee,Wr).call(this,e,t,n);i!=="shared"&&G(this,ee,ln).call(this,i==="opened"?"Файл открыт в новой вкладке":"Файл сохранён")}async exportTurn({photos:e=!1}={}){var r,o;if(this.exporting||this.screenshotting)return;let t=this.modelLoader.currentModel;if(!t){G(this,ee,ln).call(this,"Модель ещё не загружена","error");return}if(!Ol()&&!e){G(this,ee,ln).call(this,"Браузер не умеет записывать видео","error");return}let n=this.config.turnExport,i=this.getModelRotation();this.exporting=!0,G(this,ee,$n).call(this,"onExportBusy",!0),G(this,ee,pi).call(this,"Выгрузка оборота"),G(this,ee,Vr).call(this),(r=this.turntable)==null||r.setHiddenForCapture(!0);try{let a=await Of({source:this.renderer.domElement,backdrop:this.backdrop,settings:n,startAngle:i,setAngle:c=>{t.rotation.y=Ut.degToRad(c),t.updateMatrixWorld(!0)},renderFrame:()=>{var c;(c=this.ambientShadow)==null||c.update(this.renderer,this.scene),this.pipeline.render()},photos:e,onProgress:(c,l)=>G(this,ee,pi).call(this,l,c*100)});await G(this,ee,Op).call(this,a,n)}catch(a){console.error(a),G(this,ee,ln).call(this,"Не удалось выгрузить оборот","error")}finally{t.rotation.y=Ut.degToRad(i),(o=this.turntable)==null||o.setHiddenForCapture(!1),this.exporting=!1,G(this,ee,$n).call(this,"onExportBusy",!1),G(this,ee,$n).call(this,"onLoaded"),this.invalidateModel(),G(this,ee,Hr).call(this)}}toggleFullscreen(){var n,i,r,o;let e=this.container.closest(".stage")??this.container;if(e.classList.contains("is-fullscreen")){((n=document.exitFullscreen)==null?void 0:n.call(document))??((i=document.webkitExitFullscreen)==null||i.call(document)),G(this,ee,Xr).call(this,e,!1);return}G(this,ee,Xr).call(this,e,!0);let t=((r=e.requestFullscreen)==null?void 0:r.bind(e))??((o=e.webkitRequestFullscreen)==null?void 0:o.bind(e));t&&Promise.resolve(t()).catch(()=>{})}setFullscreen(e){(this.container.closest(".stage")??this.container).classList.contains("is-fullscreen")!==e&&this.toggleFullscreen()}dispose(){var e,t,n,i,r;G(this,ee,Vr).call(this),(e=this.resizeObserver)==null||e.disconnect(),this.onVisibilityChange&&document.removeEventListener("visibilitychange",this.onVisibilityChange),this.onFullscreenChange&&(document.removeEventListener("fullscreenchange",this.onFullscreenChange),document.removeEventListener("webkitfullscreenchange",this.onFullscreenChange)),this.onEscape&&window.removeEventListener("keydown",this.onEscape),this.modelLoader.destroy(),this.textureManager.dispose(),(t=this.backdropScreen)==null||t.dispose(),(n=this.ambientShadow)==null||n.dispose(),(i=this.turntable)==null||i.dispose(),(r=this.scene.environment)==null||r.dispose(),this.controls.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}};is=new WeakMap,ee=new WeakSet,Ah=function(e){js(this,is).add(e);let t=()=>js(this,is).delete(e);return e.then(t,t),e},yp=function(e){for(let t of e){let n=this[t].bind(this);this[t]=(...i)=>G(this,ee,Ah).call(this,n(...i))}},Mp=function(){var n,i;let{clientWidth:e,clientHeight:t}=this.container;this.scene=Zd(),this.camera=jd(this.config,kr(e,t)),this.renderer=Kd(this.config),this.renderer.setSize(e,t),this.container.appendChild(this.renderer.domElement),this.baseToneMapping=this.renderer.toneMapping,this.lightingRig=$d(this.scene,this.config),this.controls=tf(this.camera,this.renderer.domElement,this.config),this.controls.addEventListener("change",()=>this.invalidate()),this.controls.addEventListener("start",()=>{this.cameraTween=null}),(n=this.config.shadowCatcher)!=null&&n.enabled&&(this.shadowCatcher=nf(this.config),this.scene.add(this.shadowCatcher.plane)),(i=this.config.ambientShadow)!=null&&i.enabled&&(this.ambientShadow=af(this.config),this.scene.add(this.ambientShadow.group)),this.backdropScreen=Nf(),this.backdropScreen.fit(this.camera),this.camera.add(this.backdropScreen.mesh),this.scene.add(this.camera),this.camera.layers.enable(1),this.config.turntable.enabled&&(this.turntable=pf({scene:this.scene,camera:this.camera,controls:this.controls,domElement:this.renderer.domElement,config:this.config,onRotate:r=>this.rotateModelTo(r),onDragStart:()=>this.setManualRotate(!0),onDragEnd:()=>this.setManualRotate(!1)}))},Sp=function(){var i;let e=this.renderer.capabilities.getMaxAnisotropy(),t=this.renderer.capabilities.maxTextureSize;this.modelLoader=new Ra({scene:this.scene,camera:this.camera,controls:this.controls,config:this.config,maxAnisotropy:e}),this.textureManager=new Pa({modelLoader:this.modelLoader,config:this.config,maxAnisotropy:e,maxTextureSize:t}),this.pipeline=new va({renderer:this.renderer,scene:this.scene,camera:this.camera,config:this.config}),G(this,ee,Da).call(this);let n=(i=this.catalog)==null?void 0:i.backgrounds[0];n&&this.setBackground(n)},$n=function(e,...t){var n,i;(i=(n=this.hooks)[e])==null||i.call(n,...t)},pi=function(e,t=null){G(this,ee,$n).call(this,"onLoading",e,t)},ln=function(e,t="success"){G(this,ee,$n).call(this,"onToast",e,t)},Hr=function(){if(this.frameId||document.hidden||this.exporting)return;let e=new zs,t=()=>{var o,a;this.frameId=requestAnimationFrame(t);let n=Math.min(e.getDelta(),WM);this.autoRotate&&!this.manualRotate&&this.modelLoader.currentModel&&(this.modelLoader.currentModel.rotation.y+=this.config.autoRotate.speed*n,this.invalidateModel()),this.cameraTween&&(this.cameraTween.step()&&(this.cameraTween=null),this.invalidate());let i=this.controls.update(n),r=(o=this.turntable)==null?void 0:o.update(this.getModelRotation(),n);(i||r)&&this.invalidate(),this.needsRender&&(this.modelDirty&&((a=this.ambientShadow)==null||a.update(this.renderer,this.scene),this.modelDirty=!1),this.pipeline.render(),this.needsRender=!1)};t()},Vr=function(){this.frameId&&(cancelAnimationFrame(this.frameId),this.frameId=null)},bp=function(){this.onVisibilityChange=()=>{document.hidden?G(this,ee,Vr).call(this):(this.invalidateModel(),G(this,ee,Hr).call(this))},document.addEventListener("visibilitychange",this.onVisibilityChange)},Ep=function(){this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container)},wp=function(){let e=()=>this.container.closest(".stage")??this.container;this.onFullscreenChange=()=>{document.fullscreenElement||document.webkitFullscreenElement?requestAnimationFrame(()=>this.resize()):G(this,ee,Xr).call(this,e(),!1)},document.addEventListener("fullscreenchange",this.onFullscreenChange),document.addEventListener("webkitfullscreenchange",this.onFullscreenChange),this.onEscape=t=>{if(t.key!=="Escape"||document.fullscreenElement||document.webkitFullscreenElement)return;let n=e();n.classList.contains("is-fullscreen")&&G(this,ee,Xr).call(this,n,!1)},window.addEventListener("keydown",this.onEscape)},Tp=function(){let e=this.renderer.domElement;e.addEventListener("webglcontextlost",t=>{t.preventDefault(),G(this,ee,Vr).call(this),G(this,ee,ln).call(this,"Контекст WebGL потерян — восстановление…","error")}),e.addEventListener("webglcontextrestored",()=>{this.invalidateModel(),G(this,ee,Hr).call(this),G(this,ee,ln).call(this,"Контекст WebGL восстановлен")})},Ia=function(){var t;if(!this.modelLoader.currentModel)return;let e=new nn().setFromObject(this.modelLoader.currentModel);(t=this.shadowCatcher)==null||t.setHeight(e.min.y),this.ambientShadow&&(this.ambientShadow.group.position.y=e.min.y)},Ap=function(e){var n,i,r;let{data:t}=e;this.photo||G(this,ee,Rp).call(this),this.photo=e,G(this,ee,Da).call(this),this.renderer.toneMapping=((n=t.view)==null?void 0:n.transform)==="Standard"?wr:Ji,this.renderer.toneMappingExposure=2**(((i=t.view)==null?void 0:i.exposure)??0),this.scene.environment=e.envMap,Lr(this.modelLoader.currentModel,xp(t)),this.sun=e.sun,dl(this.lightingRig,e.sun,{...this.config,lighting:{...this.config.lighting,keyLight:{...this.config.lighting.keyLight,intensityScale:((r=t.shadow)==null?void 0:r.keyScale)??.5}}}),this.scene.background=null,this.backdropScreen.mesh.visible=!1,G(this,ee,La).call(this),this.pipeline.setGrain(t.grain??.03),G(this,ee,Rh).call(this),this.resize(),G(this,ee,Ah).call(this,G(this,ee,Ip).call(this)),this.invalidateModel()},Rp=function(){this.studioView={model:this.modelLoader.currentModel,position:this.camera.position.clone(),target:this.controls.target.clone(),fov:this.camera.fov,near:this.camera.near,far:this.camera.far}},Cp=function(){let e=this.studioView;if(this.studioView=null,!e||e.model!==this.modelLoader.currentModel){this.modelLoader.frameCurrentModel();return}this.camera.fov=e.fov,this.camera.near=e.near,this.camera.far=e.far,this.camera.position.copy(e.position),this.controls.target.copy(e.target),this.camera.updateProjectionMatrix(),this.controls.update()},La=function(){let{data:e}=this.photo??{};e&&(this.controls.enabled=!1,this.camera.position.set(...e.camera.position),this.controls.target.set(...e.camera.target),this.camera.lookAt(this.controls.target))},Rh=function(){var r,o;let{data:e}=this.photo??{};if(!e)return;let t=this.modelLoader.cup,n=Yf(e,t),i=((r=e.cup)==null?void 0:r.origin)??[0,((o=e.floor)==null?void 0:o.y)??0,0];if(n){let a=this.modelLoader.setNaturalHeight(n,i),{x:c,y:l,z:h}=this.modelLoader.sourceSize;G(this,ee,Gr).call(this,Math.max(c,l,h)*a/this.config.model.targetSize)}else this.modelLoader.normalize(),G(this,ee,Gr).call(this,1);G(this,ee,Ia).call(this),G(this,ee,Ua).call(this)},Da=function(){var i,r,o,a;let e=this.photo?null:this.config.studioShading;(i=this.shadowCatcher)==null||i.setOpacity((e==null?void 0:e.shadowOpacity)??this.config.shadowCatcher.opacity),(r=this.shadowCatcher)==null||r.setPenumbra(e==null?void 0:e.shadowPenumbra);let t=e==null?void 0:e.shadowFalloff;(o=this.shadowCatcher)==null||o.setFalloff((t==null?void 0:t.start)??this.config.shadowCatcher.falloffStart,(t==null?void 0:t.end)??this.config.shadowCatcher.falloffEnd),(a=this.ambientShadow)==null||a.setAppearance((e==null?void 0:e.contact)??{});let n=this.lightingRig.getObjectByName("KeyLight");n&&(n.shadow.radius=(e==null?void 0:e.shadowRadius)??this.config.lighting.shadow.radius,n.shadow.normalBias=(e==null?void 0:e.shadowNormalBias)??this.config.lighting.shadow.normalBias),G(this,ee,Gr).call(this,1)},Gr=function(e){var n,i;let t={...(n=this.config.quality)==null?void 0:n.ambientOcclusion,...this.photo?null:(i=this.config.studioShading)==null?void 0:i.ambientOcclusion};this.pipeline.setAmbientOcclusion({...t,radius:(t.radius??.06)*e,thickness:(t.thickness??.3)*e})},Pp=function(e,t){let n=ba(this.photo.data,Xl(kr(e,t)));return e/t>=n?[Math.max(1,Math.round(t*n)),t]:[e,Math.max(1,Math.round(e/n))]},Ch=function(){var h;let{data:e,backdrops:t}=this.photo??{};if(!e)return;let{clientWidth:n,clientHeight:i}=this.container,r=Xl(kr(n,i)),o=this.renderer.getSize(new Re),a=kr(o.x,o.y),c=t[r]??t.wide;this.container.classList.add("has-photo"),this.container.style.setProperty("--photo-width",`${o.x}px`),this.container.style.setProperty("--photo-height",`${o.y}px`),this.camera.fov=Xf(e,r,a),this.camera.aspect=a,this.camera.updateProjectionMatrix();let l=((h=this.photoShadow)==null?void 0:h[r])??null;G(this,ee,Ph).call(this,!!l),this.pipeline.setBackdrop({texture:c,frameSize:qf(a,ba(e,r)),shadow:l,shadowOpacity:e.shadowOpacity??1}),this.invalidate()},Ph=function(e){this.shadowCatcher&&(this.shadowCatcher.plane.visible=!e),this.ambientShadow&&(this.ambientShadow.group.visible=!e)},Ip=async function(){G(this,ee,Lh).call(this,await G(this,ee,Ih).call(this,this.modelLoader.cup))},Ih=async function(e){let{id:t,data:n}=this.photo??{};if(!n)return null;let i=Wf(e),[r,o]=await Promise.all([Wl(t,n,i,"wide"),Wl(t,n,i,"tall")]);return r||o?{wide:r,tall:o}:null},Lh=function(e){this.photo&&(this.photoShadow=e,G(this,ee,Ch).call(this),this.invalidateModel())},Lp=async function(){this.shown??(this.shown={model:null,material:null,designUrl:void 0});let e=this.shown,t=null;for(;;){let n=this.target;if(n.model&&n.model!==e.model){let i=this.photo?G(this,ee,Ih).call(this,n.model):null;try{await this.loadModel(n.model.file,n.model,n.material)}catch{this.target={...this.target,model:e.model,material:e.material};continue}i&&G(this,ee,Lh).call(this,await i),e.model=n.model,e.material=n.material,e.designUrl=void 0;continue}if(n.material&&n.material!==e.material){G(this,ee,Dh).call(this,n.material),e.material=n.material;continue}if(e.model&&n.designUrl!==e.designUrl){let i=n.designUrl;t=await this.applyTexture(i),e.designUrl=i;continue}return{updated:t,model:e.model}}},Dh=function(e){let t=this.modelLoader.applyMaterial(e);return t>0&&this.invalidate(),t},Dp=function(){var t;if(this.config.lighting.environment!=="studio"||!this.sun)return;let e=this.scene.environment;Ll(this.scene,this.renderer,this.config,(t=this.backdrop)==null?void 0:t.base),e==null||e.dispose()},Ua=function(){if(!this.turntable)return;let e=this.modelLoader.currentModel;if(!e){this.turntable.setMetrics(null);return}let t=e.rotation.y;e.rotation.y=0,e.updateMatrixWorld(!0);let n=new nn().setFromObject(e);if(e.rotation.y=t,e.updateMatrixWorld(!0),n.isEmpty()){this.turntable.setMetrics(null);return}let i=n.getSize(new B),r=n.getCenter(new B),o=Math.max(i.x,i.z)/2*this.config.turntable.radiusScale;this.turntable.setMetrics({center:r,baseY:n.min.y,radius:o})},Wr=async function(e,t,n){var a;if(G(this,ee,Up).call(this)){let c=new File([e],t,{type:n??e.type});if((a=navigator.canShare)!=null&&a.call(navigator,{files:[c]}))try{return await navigator.share({files:[c],title:t}),"shared"}catch(l){if((l==null?void 0:l.name)==="AbortError")return"shared"}}let i=URL.createObjectURL(e),r=document.createElement("a"),o="download"in r;return r.href=i,r.download=t,r.rel="noopener",o||(r.target="_blank"),document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(i),6e4),o?"downloaded":"opened"},Up=function(){let e=this.config.ui.screenshotShare??"auto";if(e==="always")return!0;if(e==="never")return!1;let t=navigator.userAgent;return/iP(hone|ad|od)/.test(t)||/Macintosh/.test(t)&&navigator.maxTouchPoints>1},Np=function(){return new Promise(e=>{try{let t=this.renderer.domElement,n=document.createElement("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");_a(i,n.width,n.height,this.backdrop),i.drawImage(t,0,0),n.toBlob(r=>e(r),"image/png")}catch(t){console.error(t),e(null)}})},Op=async function({video:e,videoExt:t,photos:n},i){let r=i.name;if(!e&&n.length===0){G(this,ee,ln).call(this,"Не удалось выгрузить оборот","error");return}if(e&&n.length===0){let c=await G(this,ee,Wr).call(this,e,`${r}.${t}`,e.type);if(c==="shared")return;G(this,ee,ln).call(this,c==="opened"?"Ролик открыт в новой вкладке":"Ролик сохранён");return}let o=[...n];e&&o.unshift({name:`${r}.${t}`,data:new Uint8Array(await e.arrayBuffer())});let a=await G(this,ee,Wr).call(this,Kf(o),`${r}.zip`,"application/zip");if(a!=="shared"){if(a==="opened"){G(this,ee,ln).call(this,"Архив открыт в новой вкладке");return}G(this,ee,ln).call(this,e?`Архив сохранён: ролик и ${n.length} фото`:`Браузер не записал видео — сохранены только фото (${n.length})`,e?"success":"error")}},Xr=function(e,t){e.classList.toggle("is-fullscreen",t),document.body.classList.toggle("has-fullscreen-stage",t),G(this,ee,$n).call(this,"onFullscreen",t),requestAnimationFrame(()=>this.resize())};var XM=Object.freeze(["modelId","materialId","backgroundId","sceneId","brandId","title","design","tab","autoRotate","view","fullscreen"]),Fp=Object.freeze(["3d","unwrap","scene"]),qM=Object.freeze({modelId:null,materialId:null,backgroundId:null,sceneId:null,brandId:null,title:null,design:null,tab:"3d",autoRotate:!0,view:null,fullscreen:!1}),YM=new Set(XM);function Bp({catalog:s,initial:e={},dev:t=!1,warn:n=console.warn}={}){let i=Object.freeze({...qM}),r=null,o=new Set,a=null;function c(f){throw new Error(`ViewerState: ${f}`)}function l(f,g){var y;let v={};for(let[A,O]of Object.entries(f)){if(!YM.has(A)){t&&c(`неизвестный ключ «${A}»`),n(`ViewerState: неизвестный ключ «${A}» пропущен`);continue}v[A]=O}"modelId"in v&&v.modelId!==null&&!(s!=null&&s.model(v.modelId))&&c(`модели «${v.modelId}» нет в каталоге`),"backgroundId"in v&&v.backgroundId!==null&&!((y=s==null?void 0:s.background)!=null&&y.call(s,v.backgroundId))&&c(`фона «${v.backgroundId}» нет в каталоге`),"tab"in v&&!Fp.includes(v.tab)&&c(`вкладка «${v.tab}» — ожидается ${Fp.join(" | ")}`),"design"in v&&v.design!==null&&((typeof v.design!="object"||typeof v.design.textureUrl!="string")&&c("design — ожидается { textureUrl, unwrapUrl, width, height } или null"),v.design=Object.freeze({...v.design}));let m="modelId"in v?v.modelId:g.modelId,p=m?s==null?void 0:s.model(m):null,S="materialId"in v?v.materialId:g.materialId;return p&&!p.materialCompatibility.includes(S)&&("materialId"in v&&S!==null&&n(`ViewerState: материал «${S}» не подходит модели «${p.id}» — взят «${p.defaultMaterial}»`),v.materialId=p.defaultMaterial),v}function h(){let f=a;a=null;for(let g of[...o])o.has(g)&&(g.keys&&!g.keys.some(v=>f.has(v))||g.fn(i,f))}function u(f){let g={...i},v=[];for(let[m,p]of Object.entries(f))Object.is(i[m],p)||(g[m]=p,v.push(m));if(v.length===0)return!1;i=Object.freeze(g),a||(a=new Set,queueMicrotask(h));for(let m of v)a.add(m);return!0}let d={get:()=>i,set(f){(!f||typeof f!="object")&&c("set() ждёт объект");let g=l(f,i);return r&&!r(g,i)?!1:u(g)},subscribe(f,g){let v={keys:f?[...f]:null,fn:g};return o.add(v),()=>o.delete(v)},setGuard(f){r=f}};return Object.keys(e).length&&d.set(e),Object.freeze(d)}var ZM=Object.freeze({design:Object.freeze({changeModel:!0,changeMaterial:!0,uploadDesign:!0,publish:!0,export:"full",changeBackground:"all",openScene:!0,openUnwrap:!0,camera:!0,autoRotate:!0,fullscreen:!0}),client:Object.freeze({changeModel:!1,changeMaterial:!1,uploadDesign:!1,publish:!1,export:"limited",changeBackground:"client",openScene:!0,openUnwrap:!0,camera:!0,autoRotate:!0,fullscreen:!0})}),jM=Object.freeze({full:Object.freeze(["image","angles","turn","unwrap","preview"]),limited:Object.freeze(["current","unwrap","turn","preview"])}),KM=Object.freeze({modelId:"changeModel",materialId:"changeMaterial",design:"uploadDesign"});function zp(s,{warn:e=console.warn}={}){let t=ZM[s];if(!t)throw new Error(`ModeController: неизвестный режим «${s}»`);let n=!1,i={mode:s,capabilities:t,can(r){let o=t[r];return o!==void 0&&o!==!1},check(r,o=r){return i.can(r)?!0:(e(`ModeController(${s}): «${o}» запрещено (${r})`),!1)},canExport(r){var o;return((o=jM[t.export])==null?void 0:o.includes(r))??!1},canUseBackground(r){return r?t.changeBackground==="all"?!0:t.changeBackground==="client"&&r.client===!0:!1},attach(r,o){r.setGuard((a,c)=>{if(!n)return!0;for(let[l,h]of Object.entries(KM))if(l in a&&!Object.is(a[l],c[l])&&!i.check(h,`изменить ${l}`))return!1;if("backgroundId"in a&&a.backgroundId!==c.backgroundId){let l=o.background(a.backgroundId);if(!i.canUseBackground(l))return e(`ModeController(${s}): фон «${a.backgroundId}» недоступен`),!1}return!0})},lock(){n=!0}};return Object.freeze(i)}function kp({state:s,mode:e,catalog:t,viewer:n}){let i=()=>t.backgrounds.filter(r=>e.canUseBackground(r));return{setTab(r){var a;if(r==="scene"&&!e.check("openScene")||r==="unwrap"&&!e.check("openUnwrap"))return;let o={tab:r};r==="scene"&&!s.get().sceneId&&(o.sceneId=((a=t.scenes[0])==null?void 0:a.id)??null),s.set(o)},selectScene(r){e.check("openScene")&&s.set({sceneId:r,tab:"scene"})},selectBackground(r){s.set({backgroundId:r})},cycleBackground(){let r=i();if(r.length===0)return;let o=r.findIndex(a=>a.id===s.get().backgroundId);s.set({backgroundId:r[(o+1)%r.length].id})},toggleAutoRotate(){e.check("autoRotate")&&s.set({autoRotate:!s.get().autoRotate})},toggleFullscreen(){e.check("fullscreen")&&s.set({fullscreen:!s.get().fullscreen})},resetView(){e.check("camera")&&(n.resetView(),s.set({view:"front"}))},setView(r){e.check("camera")&&n.setView(r)&&s.set({view:r,autoRotate:!1})},async downloadUnwrap(r){var h,u;if(!e.canExport("unwrap")){e.check("export","скачать развёртку");return}let o=r==null?void 0:r.image;if(!o)return;let a=document.createElement("canvas");a.width=o.naturalWidth??o.width,a.height=o.naturalHeight??o.height,a.getContext("2d").drawImage(o,0,0);let c=await new Promise(d=>a.toBlob(d,"image/png"));if(a.width=0,!c){(u=(h=n.hooks).onToast)==null||u.call(h,"Не удалось сохранить файл. Попробуйте ещё раз.","error");return}let l=`${s.get().modelId??"cup"}_unwrap.png`;await n.deliverFile(c,l,"image/png")},screenshot(){e.check("export","снимок")&&n.takeScreenshot()},exportTurn(r){e.canExport("turn")?n.exportTurn(r):e.check("export","запись оборота")}}}function Hp({state:s,viewer:e,catalog:t,unwrap:n,onSceneFailed:i}){let r=async l=>{var d,f;let h=await e.present({model:t.model(l.modelId),material:t.material(l.materialId),designUrl:((d=l.design)==null?void 0:d.textureUrl)??null}),u=((f=h.model)==null?void 0:f.id)??null;return!e.presenting&&u&&u!==s.get().modelId&&s.set({modelId:u}),h};s.subscribe(["modelId","materialId","design"],r),s.subscribe(["backgroundId"],l=>{let h=t.background(l.backgroundId);h&&e.setBackground(h)}),s.subscribe(["autoRotate"],l=>e.setAutoRotate(l.autoRotate)),s.subscribe(["fullscreen"],l=>e.setFullscreen(l.fullscreen));let o=l=>{var h;return n==null?void 0:n.setSource(((h=l.design)==null?void 0:h.unwrapUrl)??Xs())};s.subscribe(["design"],o),o(s.get());let a=Promise.resolve(),c=()=>(a=a.then(async()=>{let l=s.get();if(e.setManualRotate(l.tab==="unwrap"),l.tab!=="scene"){await e.exitPhotoScene();return}if(!await e.enterPhotoScene(l.sceneId)){i==null||i();return}s.get().tab!=="scene"&&await e.exitPhotoScene()}),a);return s.subscribe(["tab","sceneId"],c),e.hooks.onFullscreen=l=>s.set({fullscreen:l}),{present:()=>r(s.get())}}function Vp({toastDuration:s=2500}={}){let e=document.getElementById("loader"),t=document.getElementById("loader-text");return{onLoading(i="Загрузка…",r=null){e&&(t.textContent=r!=null&&r>=0?`${i} ${Math.round(r)}%`:i,e.hidden=!1)},onLoaded(){e&&(e.hidden=!0)},onToast(i,r="success"){var c;(c=document.querySelector(".toast"))==null||c.remove();let o=document.createElement("div");o.className=r==="success"?"toast":`toast toast--${r}`,o.setAttribute("role","status"),o.textContent=i,document.body.appendChild(o);let a=r==="success"?s:s*2;setTimeout(()=>o.classList.add("is-leaving"),Math.max(a-300,0)),setTimeout(()=>o.remove(),a)}}}var et,Gp,Wp,Xp,qp,Yp,Uh,Oa,Nh,Fa,Zp,jp,Ba,Ys,Oh,za=class{constructor(e){gn(this,et);var t,n;this.root=e,this.canvas=e.querySelector(".unwrap__canvas"),this.ctx=((t=this.canvas)==null?void 0:t.getContext("2d"))??null,this.hint=e.querySelector(".unwrap__hint"),this.hintText=((n=this.hint)==null?void 0:n.textContent)??"",this.image=null,this.zoom=1,this.x=0,this.y=0,this.width=0,this.height=0,this.dpr=0,this.fitScale=1,this.pointers=new Map,this.pinchDistance=0,this.dragging=!1,G(this,et,Gp).call(this),G(this,et,Fa).call(this),G(this,et,Ys).call(this)}setSource(e,t){if(!e){t==null||t();return}let n=new Image;n.decoding="async",n.addEventListener("load",()=>{this.image=n,this.hint&&(this.hint.textContent=this.hintText),this.reset(),t==null||t()}),n.addEventListener("error",()=>{this.hint&&(this.hint.textContent="Развёртка не загрузилась"),t==null||t()}),n.src=e}setSourceFromFile(e){let t=URL.createObjectURL(e);this.setSource(t,()=>URL.revokeObjectURL(t))}zoomBy(e){let t=this.root.getBoundingClientRect();G(this,et,Oa).call(this,t.left+t.width/2,t.top+t.height/2,e)}get nativePercent(){return!this.image||!this.fitScale?null:this.fitScale*this.zoom*this.dpr*100}reset(){this.zoom=1,this.x=0,this.y=0,G(this,et,Fa).call(this),G(this,et,Ys).call(this)}dispose(){var e;(e=this.observer)==null||e.disconnect(),window.removeEventListener("resize",this.onWindowResize)}};et=new WeakSet,Gp=function(){let e=this.root;e.addEventListener("wheel",n=>G(this,et,Wp).call(this,n),{passive:!1}),e.addEventListener("pointerdown",n=>G(this,et,Xp).call(this,n)),e.addEventListener("pointermove",n=>G(this,et,qp).call(this,n));let t=n=>G(this,et,Yp).call(this,n);e.addEventListener("pointerup",t),e.addEventListener("pointercancel",t),e.addEventListener("dblclick",()=>this.reset()),typeof ResizeObserver=="function"&&(this.observer=new ResizeObserver(()=>G(this,et,Nh).call(this)),this.observer.observe(e)),this.onWindowResize=()=>G(this,et,Nh).call(this),window.addEventListener("resize",this.onWindowResize)},Wp=function(e){e.preventDefault(),G(this,et,Oa).call(this,e.clientX,e.clientY,Math.exp(-e.deltaY*.0016))},Xp=function(e){var t,n;if(this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),(n=(t=this.root).setPointerCapture)==null||n.call(t,e.pointerId),this.pointers.size===2){this.pinchDistance=G(this,et,Uh).call(this),this.dragging=!1;return}this.dragging=!0,this.root.classList.add("is-dragging")},qp=function(e){let t=this.pointers.get(e.pointerId);if(t){if(this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),this.pointers.size===2){let n=G(this,et,Uh).call(this);if(this.pinchDistance>0&&n>0){let[i,r]=[...this.pointers.values()];G(this,et,Oa).call(this,(i.x+r.x)/2,(i.y+r.y)/2,n/this.pinchDistance)}this.pinchDistance=n;return}this.dragging&&(this.x+=e.clientX-t.x,this.y+=e.clientY-t.y,G(this,et,Ba).call(this),G(this,et,Ys).call(this))}},Yp=function(e){var t,n;this.pointers.delete(e.pointerId),(n=(t=this.root).releasePointerCapture)==null||n.call(t,e.pointerId),this.pointers.size<2&&(this.pinchDistance=0),this.pointers.size===0&&(this.dragging=!1,this.root.classList.remove("is-dragging"))},Uh=function(){let[e,t]=[...this.pointers.values()];return Math.hypot(e.x-t.x,e.y-t.y)},Oa=function(e,t,n){let i=Math.min(Math.max(this.zoom*n,1),G(this,et,jp).call(this));if(i===this.zoom)return;let r=this.root.getBoundingClientRect(),o=e-r.left-r.width/2,a=t-r.top-r.height/2,c=i/this.zoom;this.x=o-(o-this.x)*c,this.y=a-(a-this.y)*c,this.zoom=i,G(this,et,Ba).call(this),G(this,et,Ys).call(this)},Nh=function(){G(this,et,Fa).call(this)&&(G(this,et,Ba).call(this),G(this,et,Ys).call(this))},Fa=function(){let e=this.root.clientWidth,t=this.root.clientHeight,n=window.devicePixelRatio||1;if(!e||!t||!this.canvas)return!1;this.width=e,this.height=t,this.dpr=n;let i=Math.round(e*n),r=Math.round(t*n);return(this.canvas.width!==i||this.canvas.height!==r)&&(this.canvas.width=i,this.canvas.height=r),this.image&&(this.fitScale=Math.min(e*.82/this.image.naturalWidth,t*.78/this.image.naturalHeight)),!0},Zp=function(){return!this.image||!this.fitScale?1:1/(this.fitScale*this.dpr)},jp=function(){return this.image?Math.min(Math.max(G(this,et,Zp).call(this)*1.5,2),40):2},Ba=function(){if(!this.image)return;let e=this.fitScale*this.zoom,t=Math.max((this.image.naturalWidth*e-this.width)/2,0),n=Math.max((this.image.naturalHeight*e-this.height)/2,0);this.x=Math.min(Math.max(this.x,-t),t),this.y=Math.min(Math.max(this.y,-n),n)},Ys=function(){var a;let e=this.ctx;if(!e||!this.width||!this.height||(e.setTransform(this.dpr,0,0,this.dpr,0,0),e.clearRect(0,0,this.width,this.height),this.root.classList.toggle("is-zoomed",this.zoom>1),(a=this.onChange)==null||a.call(this,this),!this.image))return;let t=this.fitScale*this.zoom,n=this.image.naturalWidth*t,i=this.image.naturalHeight*t,r=(this.width-n)/2+this.x,o=(this.height-i)/2+this.y;e.save(),e.shadowColor="rgba(0, 0, 0, 0.12)",e.shadowBlur=30,e.shadowOffsetY=10,e.fillStyle="#fff",G(this,et,Oh).call(this,e,r,o,n,i),e.fill(),e.restore(),e.save(),G(this,et,Oh).call(this,e,r,o,n,i),e.clip(),e.imageSmoothingEnabled=!0,e.imageSmoothingQuality="high",e.drawImage(this.image,r,o,n,i),e.restore()},Oh=function(e,t,n,i,r){let o=Math.min(4,i/2,r/2);e.beginPath(),typeof e.roundRect=="function"?e.roundRect(t,n,i,r,o):e.rect(t,n,i,r)};function Kp({state:s,viewer:e,catalog:t,actions:n}){var r;$M(s,n),JM(s,t,n);let i=QM(n);return eS(e),tS(),(r=document.getElementById("stage"))==null||r.addEventListener("dblclick",()=>n.resetView()),{unwrap:i}}function $M(s,e){let t=Array.from(document.querySelectorAll(".stage-tab")),n=document.querySelector(".stage"),i=document.getElementById("unwrap"),r=document.querySelector(".stage-controls"),o=document.querySelector(".stage-swatches"),a=document.getElementById("scene-picker");t.forEach(l=>l.addEventListener("click",()=>e.setTab(l.dataset.tab)));let c=({tab:l})=>{for(let h of t){let u=h.dataset.tab===l;h.classList.toggle("is-active",u),h.setAttribute("aria-selected",String(u))}n==null||n.classList.toggle("is-photo",l==="scene"),n==null||n.classList.toggle("is-unwrap",l==="unwrap"),i&&(i.hidden=l!=="unwrap"),r&&(r.hidden=l==="unwrap"),o&&(o.hidden=l!=="3d"),a&&(a.hidden=l!=="scene")};s.subscribe(["tab"],c),c(s.get())}function JM(s,e,t){var o;let n=document.getElementById("scene-picker");if(!n)return;if(e.scenes.length===0){(o=document.querySelector('.stage-tab[data-tab="scene"]'))==null||o.remove(),n.remove();return}if(e.scenes.length<2){n.remove();return}n.replaceChildren();let i=e.scenes.map(a=>{let c=document.createElement("button");c.type="button",c.className="scene-chip",c.dataset.scene=a.id,c.title=a.note??"";let l=document.createElement("span");return l.className="scene-chip__label",l.textContent=a.name,c.appendChild(l),c.addEventListener("click",()=>t.selectScene(a.id)),n.appendChild(c),c}),r=({sceneId:a})=>{for(let c of i){let l=c.dataset.scene===a;c.classList.toggle("is-active",l),c.setAttribute("aria-pressed",String(l))}};s.subscribe(["sceneId"],r),r(s.get())}function QM(s){var r,o,a,c,l,h,u;let e=document.getElementById("unwrap");if(!e)return null;let t=new za(e),n=document.getElementById("unwrap-zoom"),i=d=>document.getElementById(d);return t.onChange=()=>{if(!n)return;let d=t.nativePercent;n.textContent=d==null?"—":`${Math.round(d)}%`},(r=i("unwrap-zoom-in"))==null||r.addEventListener("click",()=>t.zoomBy(1.5)),(o=i("unwrap-zoom-out"))==null||o.addEventListener("click",()=>t.zoomBy(1/1.5)),(a=i("unwrap-fit"))==null||a.addEventListener("click",()=>t.reset()),(c=i("unwrap-fullscreen"))==null||c.addEventListener("click",()=>s.toggleFullscreen()),(l=i("unwrap-download"))==null||l.addEventListener("click",()=>s.downloadUnwrap(t)),(h=e.querySelector(".unwrap-bar"))==null||h.addEventListener("pointerdown",d=>d.stopPropagation()),(u=e.querySelector(".unwrap-bar"))==null||u.addEventListener("dblclick",d=>d.stopPropagation()),t}function eS(s){let e=document.getElementById("turntable-btn"),t=s.turntable;if(e){if(!t){e.hidden=!0;return}e.addEventListener("click",()=>{let n=t.togglePinned();e.setAttribute("aria-pressed",String(n))})}}function tS(){let s=document.getElementById("info-btn"),e=document.getElementById("help-popover"),t=document.getElementById("help-backdrop"),n=document.getElementById("help-close");if(!s||!e)return;let i=null,r=()=>{i=document.activeElement,e.hidden=!1,t&&(t.hidden=!1),n==null||n.focus()},o=()=>{var a;e.hidden||(e.hidden=!0,t&&(t.hidden=!0),(a=i==null?void 0:i.focus)==null||a.call(i))};s.addEventListener("click",r),n==null||n.addEventListener("click",o),t==null||t.addEventListener("click",o),window.addEventListener("keydown",a=>{a.key==="Escape"&&o()})}var nS={b:"cycleBackground",a:"toggleAutoRotate",s:"screenshot",f:"toggleFullscreen"},$p=Object.freeze({front:"Спереди",right:"Справа",back:"Сзади",left:"Слева",top:"Сверху",seam:"Шов"}),iS=new Set(["INPUT","TEXTAREA","SELECT","OPTION"]);function sS(s){return!s||s.nodeType!==1?!1:iS.has(s.tagName)||s.isContentEditable===!0}function Jp(s,e,{onOpen:t}={}){if(!s||!e)return{toggle(){},close(){}};let n=i=>{e.hidden=!i,s.setAttribute("aria-expanded",String(i)),i&&(t==null||t())};return s.addEventListener("click",()=>{s.disabled||n(e.hidden)}),document.addEventListener("click",i=>{e.hidden||e.contains(i.target)||s.contains(i.target)||n(!1)},!0),window.addEventListener("keydown",i=>{i.key==="Escape"&&!e.hidden&&(n(!1),s.focus())}),{toggle:()=>!s.disabled&&n(e.hidden),close:()=>n(!1)}}function Qp({state:s,catalog:e,mode:t,actions:n}){var l,h,u;let i=document.getElementById("autorotate-btn"),r=document.getElementById("fullscreen-btn"),o=aS(n);Jp(document.getElementById("more-btn"),document.getElementById("more-menu")),(l=document.getElementById("reset-btn"))==null||l.addEventListener("click",()=>n.resetView()),i==null||i.addEventListener("click",()=>n.toggleAutoRotate()),r==null||r.addEventListener("click",()=>n.toggleFullscreen()),(h=document.getElementById("screenshot-btn"))==null||h.addEventListener("click",()=>n.screenshot()),(u=document.getElementById("bg-btn"))==null||u.addEventListener("click",()=>n.cycleBackground());let a=(d,f)=>{d&&(d.classList.toggle("is-active",f),d.setAttribute("aria-pressed",String(f)))},c=d=>{a(i,d.autoRotate),a(r,d.fullscreen)};return s.subscribe(["autoRotate","fullscreen"],c),c(s.get()),rS({state:s,catalog:e,mode:t,actions:n}),oS({state:s,actions:n}),window.addEventListener("keydown",d=>{if(d.metaKey||d.ctrlKey||d.altKey||sS(d.target)||d.isComposing||d.keyCode===229||document.querySelector(".dialog:not([hidden])"))return;let f=d.key.toLowerCase();if(f==="v"){o.toggle();return}let g=Bl[Number(f)-1];if(/^[1-6]$/.test(f)&&g){n.setView(g);return}let v=nS[f];v&&n[v]()}),{setExportBusy:o.setBusy}}function rS({state:s,catalog:e,mode:t,actions:n}){let i=document.getElementById("bg-swatches");if(!i)return;i.replaceChildren();let r=e.backgrounds.filter(a=>t.canUseBackground(a)).map(a=>{let c=document.createElement("button");return c.type="button",c.className="swatch",c.style.background=a.color,c.dataset.background=a.id,c.title=a.name,c.setAttribute("aria-label",`Фон: ${a.name}`),c.addEventListener("click",()=>n.selectBackground(a.id)),i.appendChild(c),c}),o=({backgroundId:a})=>{for(let c of r){let l=c.dataset.background===a;c.classList.toggle("is-active",l),c.setAttribute("aria-pressed",String(l))}};s.subscribe(["backgroundId"],o),o(s.get())}function oS({state:s,actions:e}){let t=document.getElementById("view-presets");if(!t)return;t.replaceChildren();let n=Bl.map((r,o)=>{let a=document.createElement("button");return a.type="button",a.className="view-btn",a.dataset.view=r,a.textContent=$p[r],a.title=`${$p[r]} · ${o+1}`,a.addEventListener("click",()=>e.setView(r)),t.appendChild(a),a}),i=({view:r})=>{for(let o of n)o.classList.toggle("is-active",o.dataset.view===r)};s.subscribe(["view"],i),i(s.get())}function aS(s){let e=document.getElementById("export-btn"),t=document.getElementById("export-popover"),n=document.getElementById("export-photos"),i=document.getElementById("export-start"),r=Jp(e,t);i==null||i.addEventListener("click",()=>{r.close(),s.exportTurn({photos:(n==null?void 0:n.checked)===!0})});let o=!1;return{toggle:()=>!o&&r.toggle(),setBusy(a){o=a,a&&r.close(),i&&(i.disabled=a)}}}var em=()=>["localhost","127.0.0.1","[::1]"].includes(window.location.hostname);function cS(){var e;let s=((e=Ks.security)==null?void 0:e.debugApi)??"never";return s==="always"?!0:s==="never"?!1:em()}async function JE({mode:s,initialState:e}){var f;let t=document.getElementById("canvas-container");if(!t)throw new Error("Нет элемента #canvas-container");let n=await Vf(),i=Bp({catalog:n,dev:em()}),r=zp(s);r.attach(i,n);let o=Vp({toastDuration:Ks.ui.toastDuration}),a=null,c={...o,onExportBusy:g=>a==null?void 0:a.setExportBusy(g)},l=new Na(t,Ks,{catalog:n,hooks:c}),h=kp({state:i,mode:r,catalog:n,viewer:l}),{unwrap:u}=Kp({state:i,viewer:l,catalog:n,actions:h});a=Qp({state:i,catalog:n,mode:r,actions:h}),Hp({state:i,viewer:l,catalog:n,unwrap:u,onSceneFailed:()=>i.set({tab:"3d"})}),await l.startEnvironment(),i.set({backgroundId:((f=n.backgrounds[0])==null?void 0:f.id)??null,autoRotate:Ks.autoRotate.enabled,...await e(n)}),r.lock();let d={catalog:n,state:i,mode:r,viewer:l,actions:h,feedback:o};return cS()&&lS(d),d}function lS({catalog:s,state:e,mode:t,viewer:n}){window.ViewerState=e,window.cupViewer={viewer:n,state:e,mode:t,catalog:s,setRoughness:i=>n.setSurfaceFinish({roughness:i}),setMetalness:i=>n.setSurfaceFinish({metalness:i}),setRelief:i=>n.setSurfaceFinish({relief:i}),setReliefScale:i=>n.setSurfaceFinish({reliefScale:i}),describeKeyLight:()=>n.describeKeyLight(),debugAO:(i=!0)=>n.pipeline.showAmbientOcclusionOnly(i)}}function QE(s){console.error("Просмотрщик не запустился:",s);let e=document.getElementById("stage")??document.body;if(e.querySelector(".startup-error"))return;let t=document.createElement("div");t.className="startup-error",t.setAttribute("role","alert");let n=document.createElement("p");n.className="startup-error__title",n.textContent="Не удалось показать 3D-модель";let i=document.createElement("p");i.className="startup-error__text",i.textContent="Проверьте вкладку «Развёртка» — макет там открывается плоско. Если 3D не появится и после обновления страницы, напишите разработчику.",t.append(n,i),e.appendChild(t)}function ew(s){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",s,{once:!0}):s()}export{Ks as a,Jp as b,JE as c,QE as d,ew as e};
