// Печать без белой подложки (крафт, §14): краска ложится на цветной картон и
// работает как светофильтр — цвет картона умножается на цвет макета. Белое
// и прозрачное в макете показывают картон, а не белила.
//
// Хук ставится на материалы печати один раз; без define PRINT_WITHOUT_WHITE
// шейдер собирается из того же map_fragment, что и раньше, — кадры прежних
// материалов не меняются.

const PRINT_CHUNK = /* glsl */ `
#if defined( PRINT_WITHOUT_WHITE ) && defined( USE_MAP )
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	diffuseColor.rgb *= mix( vec3( 1.0 ), sampledDiffuseColor.rgb, sampledDiffuseColor.a );
#else
	#include <map_fragment>
#endif
`;

function printShading(shader) {
  shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', PRINT_CHUNK);
}

export function installPrintShading(material) {
  material.onBeforeCompile = printShading;
}

export function setPrintWithoutWhite(material, on) {
  const has = 'PRINT_WITHOUT_WHITE' in (material.defines ?? {});
  if (has === on) return;
  material.defines = { ...material.defines };
  if (on) material.defines.PRINT_WITHOUT_WHITE = '';
  else delete material.defines.PRINT_WITHOUT_WHITE;
  material.needsUpdate = true;
}
