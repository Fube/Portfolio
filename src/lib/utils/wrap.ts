export default function wrap(fn: (...args: unknown[]) => unknown, ...args: unknown[]): unknown {
	return () => fn(...args);
}
