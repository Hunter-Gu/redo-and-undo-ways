/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/immutable-data */
import { Obj, Result } from './types';
import { getPropsAmount, isDiffSimply, joinPath } from './utils';

/**
 * !just simply consider it will only change one path in one operation!
 * !and think prop will never have function value!
 * !don't support add/remove/move item in array!
 *
 * add item:
 * {
 * 	children: []
 * }
 * to:
 * {
 * 	children: [
 * 		{ ... }
 * 	]
 * }
 *
 * remove item:
 * {
 * 	children: [{ ... }]
 * }
 * to:
 * {
 * 	children: []
 * }
 *
 * move item:
 * {
 * 	children: [
 * 		{name: 'one'},
 * 		{name: 'two'}
 * 	]
 * }
 * to:
 * {
 * 	children: [
 * 		{name: 'two'},
 * 		{name: 'one'}
 * 	]
 * }
 * @param newObj
 * @param oldObj
 */
export function getDiffByBFS(newObj: Obj, oldObj: Obj): Result | null {
	const newObjs: Obj[] = [newObj]
	const oldObjs: Obj[] = [oldObj]
	const paths: string[] = ['']

	while (newObjs.length) {
		const newTarget = newObjs.shift()!
		const oldTarget = oldObjs.shift()!
		const path = paths.shift()!

		const target = getPropsAmount(newObj) >= getPropsAmount(oldObj) ? newTarget : oldTarget

		for (const key in target) {
			const newValue = newTarget[key] as Obj
			const oldValue = oldTarget[key] as Obj

			if (isDiffSimply(newValue, oldValue)) {
				return {
					path: joinPath(path, key),
					newValue: newValue,
					oldValue: oldValue,
				}
			}

			if (typeof newValue !== 'object') {
				continue
			}
			newObjs.push(newValue)
			oldObjs.push(oldValue)
			paths.push(joinPath(path, key))
		}
	}

	return null;
}



