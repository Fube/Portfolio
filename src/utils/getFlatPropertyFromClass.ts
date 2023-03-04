export default function getFlatPropertyFromClass(
	prop: string,
	className: string,
	fallback = undefined
): string | undefined {
	try {
		if (!('getComputedStyle' in globalThis)) return fallback;
		return globalThis
			.getComputedStyle(document.querySelector('.' + className))
			.getPropertyValue(prop);
	} catch (e) {
		return fallback;
	}
}
