/* eslint-disable functional/no-loop-statement */
import { Obj, Result } from "./types";
import { getPropsAmount, isDiffSimply, joinPath } from "./utils";

export function getDiffByDFS(newObj: Obj, oldObj: Obj, path = ''): Result | null {
	const newObjPropsAmount = getPropsAmount(newObj)
	const oldObjPropsAmount = getPropsAmount(oldObj)
	const targetObj = newObjPropsAmount >= oldObjPropsAmount ? newObj : oldObj;

	for (const key in targetObj) {
		const newValue = newObj[key] as Obj
		const oldValue = oldObj[key] as Obj
		if (isDiffSimply(newValue, oldValue)) {
			return {
				path: joinPath(path, key),
				newValue,
				oldValue
			}
		} else if (typeof newValue === 'object') {
			const result = getDiffByDFS(newValue, oldValue, joinPath(path, key));
			if (result) {
				return result
			} else {
				continue
			}
		}
	}

	return null;
}
