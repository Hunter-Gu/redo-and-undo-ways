export type Obj = Record<string, unknown>;

export type Result = {
	readonly path: string;
	readonly oldValue: unknown;
	readonly newValue: unknown;
};
