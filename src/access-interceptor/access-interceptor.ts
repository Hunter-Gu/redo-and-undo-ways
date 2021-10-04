/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-class */
import { Obj, Result } from "../traversal/types";
import { joinPath } from "../traversal/utils";

// !can implement move(), add(), remove() to support more operations!
export class AccessInterceptor {

	constructor(private value: Obj = {}) {

	}

	private getSplitPath(path: string) {
		const SPLIT = '.'
		return path.split(SPLIT)
	}

	get(path: string, defaultValue: unknown = undefined) {
		const paths = this.getSplitPath(path)
		let target: any = this.value

		while (paths.length) {
			const key = paths.shift()!
			const isTheLast = !paths.length
			const value = target[key]
			if (isTheLast) {
				return typeof value === 'undefined' ? defaultValue : value
			}

			if (!(key in target)) {
				return defaultValue
			}

			target = target[key]
		}
	}

	set(path: string, newValue: unknown): Result {
		const paths = this.getSplitPath(path)
		let target: any = this.value
		let oldValue: any = this.value
		let pathRecord = ''
		let realPath = ''

		while (paths.length) {
			const key = paths.shift()!
			const isTheLast = !paths.length
			pathRecord = joinPath(pathRecord, key)

			oldValue = target[key]

			if (isTheLast) {
				target[key] = newValue
				break
			}

			if (!(key in target)) {
				target[key] = {}
				oldValue = undefined
				realPath = realPath || pathRecord
			}
			target = target[key]
		}

		return {
			path: realPath || path,
			newValue: this.get(realPath || path),
			oldValue
		}
	}
}
