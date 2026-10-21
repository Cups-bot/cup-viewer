// Шейдер печати бумажного стакана: как ложится краска и чем отделан лист.
//
// ПЕЧАТЬ БЕЗ БЕЛИЛ (крафт, §14): краска ложится на цветной картон и работает
// как светофильтр — цвет картона умножается на цвет макета. Белое и
// прозрачное в макете показывают картон, а не белила. define PRINT_WITHOUT_WHITE.
//
// МЕТАЛЛИЗИРОВАННЫЙ КАРТОН (BOARD_METAL): ламинат с металлом. Прозрачное в
// макете — голый металл, белое — белила (глухой белый, без блеска металла),
// цветное — краска по металлу: металл просвечивает сквозь неё и окрашивается.
// BOARD_HOLO — голографический ламинат: толщина интерференционной плёнки
// бежит полосами, цвет перелива меняется по стенке и с поворотом.
//
// ОТДЕЛКИ (USE_FINISH) — одна служебная текстура в координатах листа макета:
//   R — фольга (тиснение фольгой, блестит сильнее всего, вдавлена на 0,2 мм);
//   G — металлизированная краска (металлик-пантон: серебро, золото — мягче фольги);
//   B — высота: 0,5 — лист, выше — конгрев, ниже — вдавленная фольга;
//   A — фактура фольги (мелкая неровность — фольга «чуть-чуть фактурная»).
// Нормаль из высоты считается по экранным производным, как бамп three.js, но
// с ненормированными приращениями положения: высота задана в единицах сцены, и
// рельеф выглядит одинаково при любом приближении.
//
// Без этих define шейдер собирается из того же кода, что раньше, — кадры
// прежних материалов не меняются (render:check).

const MAP_CHUNK = /* glsl */ `
#if defined( PRINT_WITHOUT_WHITE ) && defined( USE_MAP )
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	diffuseColor.rgb *= mix( vec3( 1.0 ), sampledDiffuseColor.rgb, sampledDiffuseColor.a );
#elif defined( BOARD_METAL ) && defined( USE_MAP )
	vec4 boardArt = texture2D( map, vMapUv );
	// Белила — белое и почти белое там, где в макете есть краска.
	float boardWhite = boardArt.a * smoothstep( 0.72, 0.9, min( min( boardArt.r, boardArt.g ), boardArt.b ) );
	vec3 boardMetal = boardTone * mix( vec3( 1.0 ), boardArt.rgb, boardArt.a );
	diffuseColor.rgb *= mix( boardMetal, boardArt.rgb, boardWhite );
#else
	#include <map_fragment>
#endif
`;

const PARS_CHUNK = /* glsl */ `
#include <common>
#ifdef BOARD_METAL
	uniform vec3 boardTone;
#endif
#if defined( BOARD_METAL ) || defined( USE_FINISH )
	// Пятна перелива: плавные волны по листу, а не мелкий узор — у радужного
	// ламината цвет плывёт крупными пятнами (см. фото владельца, 2026-10-21).
	float finishWaves( vec2 uv, float k ) {
		return 0.5
			+ 0.27 * sin( uv.x * k * 6.28 + sin( uv.y * k * 3.1 ) * 2.2 )
			+ 0.23 * sin( uv.y * k * 4.7 + uv.x * k * 2.3 + 1.3 );
	}
#endif
#ifdef USE_FINISH
	uniform sampler2D finishMap;
	uniform vec3 foilColor;
	uniform vec3 inkColor;
	uniform float reliefScale;
	uniform float foilIridescence;
	vec3 finishPerturb( vec3 surfPos, vec3 surfNorm, vec2 uv, float faceDirection ) {
		vec2 dSTdx = dFdx( uv );
		vec2 dSTdy = dFdy( uv );
		float h0 = texture2D( finishMap, uv ).b;
		float dBx = reliefScale * ( texture2D( finishMap, uv + dSTdx ).b - h0 );
		float dBy = reliefScale * ( texture2D( finishMap, uv + dSTdy ).b - h0 );
		vec3 sigmaX = dFdx( surfPos );
		vec3 sigmaY = dFdy( surfPos );
		vec3 r1 = cross( sigmaY, surfNorm );
		vec3 r2 = cross( surfNorm, sigmaX );
		float det = dot( sigmaX, r1 ) * faceDirection;
		vec3 grad = sign( det ) * ( dBx * r1 + dBy * r2 );
		return normalize( abs( det ) * surfNorm - grad );
	}
#endif
`;

// После metalness/roughness: здесь краска, металл и фольга решают, чем
// поверхность отражает.
const SURFACE_CHUNK = /* glsl */ `
#include <metalnessmap_fragment>
#if defined( BOARD_METAL ) && defined( USE_MAP )
	// Белила глушат металл; под краской металл блестит чуть слабее голого.
	metalnessFactor *= 1.0 - boardWhite;
	roughnessFactor = mix( roughnessFactor + 0.08 * boardArt.a, 0.6, boardWhite );
#endif
#ifdef USE_FINISH
	vec4 finish = texture2D( finishMap, vMapUv );
	float finishFoil = finish.r;
	float finishInk = finish.g * ( 1.0 - finishFoil );
	diffuseColor.rgb = mix( diffuseColor.rgb, inkColor, finishInk );
	// Металлик-пантон — сатиновый: широкий мягкий блик, без зеркала.
	metalnessFactor = mix( metalnessFactor, 0.85, finishInk );
	roughnessFactor = mix( roughnessFactor, 0.42, finishInk );
	diffuseColor.rgb = mix( diffuseColor.rgb, foilColor, finishFoil );
	metalnessFactor = mix( metalnessFactor, 1.0, finishFoil );
	roughnessFactor = mix( roughnessFactor, 0.07 + 0.1 * abs( finish.a - 0.5 ), finishFoil );
#endif
`;

const NORMAL_CHUNK = /* glsl */ `
#include <normal_fragment_maps>
#ifdef USE_FINISH
	normal = finishPerturb( - vViewPosition, normal, vMapUv, faceDirection );
#endif
`;

// Перелив: у голого перламутра и голографии — по всему металлу, у
// перламутровой фольги — только на ней.
const IRIDESCENCE_CHUNK = /* glsl */ `
#include <lights_physical_fragment>
#ifdef USE_IRIDESCENCE
	float iridescenceMask = 1.0;
	#if defined( BOARD_METAL ) && defined( USE_MAP )
		iridescenceMask = 1.0 - boardWhite;
	#else
		iridescenceMask = 0.0;
	#endif
	#ifdef USE_FINISH
		iridescenceMask = mix( iridescenceMask * ( 1.0 - finishInk ), foilIridescence, finishFoil );
	#endif
	material.iridescence *= iridescenceMask;
	#if defined( BOARD_METAL ) || defined( USE_FINISH )
		#ifdef BOARD_HOLO
			float irWaves = finishWaves( vMapUv, 1.4 );
		#else
			float irWaves = finishWaves( vMapUv, 0.9 );
		#endif
		material.iridescenceThickness = mix( iridescenceThicknessMinimum, iridescenceThicknessMaximum, clamp( irWaves, 0.0, 1.0 ) );
	#endif
#endif
`;

// Металл виден только отражением. Окружение студии нарочно тёмное по стенам —
// так бумага держит объём, — и фольга с металлизированным картоном выходили
// тускло-серыми. На предметной съёмке металл снимают в светлом окружении:
// у металлических мест отражение окружения сильнее (только там).
const METAL_CHUNK = /* glsl */ `
#include <lights_fragment_end>
#if defined( BOARD_METAL ) || defined( USE_FINISH )
	reflectedLight.indirectSpecular *= 1.0 + 1.8 * metalnessFactor;
#endif
`;

function printShading(shader) {
  const finish = this.userData.finishUniforms;
  if (finish) Object.assign(shader.uniforms, finish);
  shader.fragmentShader = shader.fragmentShader
    .replace('#include <common>', PARS_CHUNK)
    .replace('#include <map_fragment>', MAP_CHUNK)
    .replace('#include <metalnessmap_fragment>', SURFACE_CHUNK)
    .replace('#include <normal_fragment_maps>', NORMAL_CHUNK)
    .replace('#include <lights_physical_fragment>', IRIDESCENCE_CHUNK)
    .replace('#include <lights_fragment_end>', METAL_CHUNK);
}

// Общие uniform'ы материала печати: задаются ModelLoader'ом, шейдер берёт
// их по ссылке — смена цвета фольги не пересобирает программу.
function finishUniforms() {
  return {
    boardTone: { value: { r: 1, g: 1, b: 1, isColor: true } },
    finishMap: { value: null },
    foilColor: { value: null },
    inkColor: { value: null },
    reliefScale: { value: 0 },
    foilIridescence: { value: 0 },
  };
}

export function installPrintShading(material) {
  material.userData.finishUniforms ??= finishUniforms();
  material.onBeforeCompile = printShading;
  // Ключ программы — по набору define: печать и отделки собирают разные шейдеры.
  material.customProgramCacheKey = () => `print|${Object.keys(material.defines ?? {}).sort().join(',')}`;
}

function setDefine(material, name, on) {
  const has = name in (material.defines ?? {});
  if (has === on) return;
  material.defines = { ...material.defines };
  if (on) material.defines[name] = '';
  else delete material.defines[name];
  material.needsUpdate = true;
}

export function setPrintWithoutWhite(material, on) {
  setDefine(material, 'PRINT_WITHOUT_WHITE', on);
}

// Металлизированный картон: kind — 'silver' | 'pearl' | 'holo' | null.
export function setBoardMetal(material, kind, tone) {
  setDefine(material, 'BOARD_METAL', Boolean(kind));
  setDefine(material, 'BOARD_HOLO', kind === 'holo');
  if (tone) material.userData.finishUniforms.boardTone.value = tone;
}

// Отделки: map — служебная текстура (см. начало файла) или null.
export function setFinish(material, map, { foilColor, inkColor, reliefScale, foilIridescence } = {}) {
  const u = material.userData.finishUniforms;
  setDefine(material, 'USE_FINISH', Boolean(map));
  u.finishMap.value = map;
  if (foilColor) u.foilColor.value = foilColor;
  if (inkColor) u.inkColor.value = inkColor;
  if (reliefScale != null) u.reliefScale.value = reliefScale;
  if (foilIridescence != null) u.foilIridescence.value = foilIridescence;
}
