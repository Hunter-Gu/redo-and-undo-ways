/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
import { Obj } from "../traversal/types";
import { joinPath } from "../traversal/utils";

import { Diff, Result } from "./types";

export function proxy(target: Obj): Result {
	let diff: Diff = {} as Diff;
	const paths: string[] = []
	const handler: ProxyHandler<Obj> = {
		get(target, prop: string, receiver) {
			const result = Reflect.get(target, prop, receiver)
			if (typeof prop === 'symbol') {
				return result
			}

			paths.push(prop)
			if (typeof result === 'object') {
				return target[prop];
			} else {
				return result
			}
		},
		set(target, prop: string, value, receiver) {
			if (typeof prop === 'symbol') {
				return Reflect.set(target, prop, value, receiver);
			}

			paths.push(prop)
			diff = {
				path: joinPath(...paths),
				newValue: value,
				oldValue: target[prop]
			}
			paths.length = 0
			return Reflect.set(
				target,
				prop,
				typeof value === 'object' ?
					deepObserve(value, handler) :
					value,
				receiver
			);
		},
		deleteProperty(target, prop: string) {
			if (typeof prop === 'symbol') {
				return Reflect.deleteProperty(target, prop)
			}

			paths.push(prop)
			diff = {
				path: joinPath(...paths),
				newValue: undefined,
				oldValue: target[prop]
			}

			paths.length = 0

			return Reflect.deleteProperty(target, prop)
		}
	}
	return {
		target: deepObserve(target, handler),
		getDiff: () => diff
	}
}

export function observe(target: Obj, handler: ProxyHandler<Obj>) {
	return new Proxy(target, handler)
}

export function deepObserve(object: Obj, handler: ProxyHandler<Obj>) {
	for (const prop in object) {
		const value = object[prop]

		if (typeof value === 'object' && value !== null) {
			object[prop] = deepObserve(value as Obj, handler)
		}
	}

	return observe(object, handler)
}

// TODO: not support array, should proxy methods of array
