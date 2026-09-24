/* cup-viewer — собрано npm run build. Исходники в js/, править нужно там. */
var g=`
self.onmessage = async ({ data: { id, bitmap, type, quality } }) => {
  try {
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    canvas.getContext('2d').drawImage(bitmap, 0, 0);
    bitmap.close();
    const blob = await canvas.convertToBlob({ type, quality });
    self.postMessage({ id, blob });
  } catch (error) {
    self.postMessage({ id, error: String(error) });
  }
};
`,s=null,u=0,a=new Map;function w(){if(s)return s;let n=URL.createObjectURL(new Blob([g],{type:"text/javascript"}));return s=new Worker(n),URL.revokeObjectURL(n),s.onmessage=({data:r})=>{let e=a.get(r.id);a.delete(r.id),r.blob?e==null||e.resolve(r.blob):e==null||e.reject(new Error(r.error??"кодирование не удалось"))},s}var b=()=>typeof OffscreenCanvas=="function"&&typeof OffscreenCanvas.prototype.convertToBlob=="function"&&typeof Worker=="function";function i(n,r,e){return new Promise((t,c)=>n.toBlob(o=>o?t(o):c(new Error("toBlob вернул null")),r,e))}async function d(n,r="image/png",e){var c;if(!b())return i(n,r,e);let t;try{t=await createImageBitmap(n);let o=++u,l=new Promise((f,p)=>a.set(o,{resolve:f,reject:p}));return w().postMessage({id:o,bitmap:t,type:r,quality:e},[t]),await l}catch(o){return(c=t==null?void 0:t.close)==null||c.call(t),console.warn("Кодирование в воркере не удалось, кодируем на странице:",o),i(n,r,e)}}export{d as a};
