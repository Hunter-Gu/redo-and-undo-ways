/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/prefer-readonly-type */
import { Obj } from "./types";

export function joinPath(...paths: string[]) {
	return paths.filter(Boolean).join('.');
}

export function getPropsAmount(obj: Obj) {
	return Object.keys(obj).length;
}

export function isDiffSimply(newValue: unknown, oldValue: unknown) {
	if (typeof newValue !== typeof oldValue) {
		return true;
	} else if (typeof newValue !== 'object') {
		return newValue !== oldValue;
	} else {
		return false;
	}
}
