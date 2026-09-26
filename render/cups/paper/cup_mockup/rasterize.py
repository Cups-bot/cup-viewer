"""External PDF bridge. Requires PyMuPDF; Blender itself stays dependency-free."""
import sys,json
from pathlib import Path
import fitz

def rasterize(source,dest,page=1,dpi=300,hide_guides=True):
    with fitz.open(source) as doc:
        if not 1<=page<=len(doc):raise ValueError(f'Страницы {page} нет. В PDF страниц: {len(doc)}')
        if doc.needs_pass:raise ValueError('PDF защищён паролем. Сохраните открытую копию.')
        hidden=[]
        if hide_guides:
            for layer in doc.layer_ui_configs():
                if layer['text'].strip().lower() in {'masks','info','setka'} and layer.get('on'):
                    doc.set_layer_ui_config(layer['number'],action=2);hidden.append(layer['text'])
        p=doc[page-1]
        p.get_pixmap(dpi=dpi,colorspace=fitz.csRGB,alpha=False,annots=False).save(dest)
        return {'source':str(source),'page':page,'dpi':dpi,'hidden_layers':hidden,'size_pt':list(p.rect)}

if __name__=='__main__':
    source,dest,page,dpi,hide=sys.argv[1:]
    print(json.dumps(rasterize(source,dest,int(page),int(dpi),hide=='1'),ensure_ascii=True))
