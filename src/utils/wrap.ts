export default function wrap<TIn, TOut>(fn: (...args: TIn[]) => TOut, ...args: TIn[]): () => TOut {
	return () => fn(...args);
}
