/* eslint-disable functional/no-mixed-type */
export type Diff = {
	// alias of 'to'
	readonly path: string;
	readonly oldValue: unknown;
	readonly newValue: unknown;
	readonly from?: string;
}

export type Result = {
	// eslint-disable-next-line functional/prefer-readonly-type
	target: Record<string, any>,
	readonly getDiff: () => Diff
}
