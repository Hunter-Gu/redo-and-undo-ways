/* eslint-disable functional/immutable-data */
import test from 'ava'

import { proxy } from "./proxy";

test('proxy() get diff produced by simple add operation', (t) => {
	const object = {}
	const { target, getDiff } = proxy(object)

	target.a = 'c';

	const diff = getDiff()

	t.deepEqual(diff, {
		path: 'a',
		oldValue: undefined,
		newValue: 'c'
	})
});

test('proxy() get diff produced by complex add operation', (t) => {
	const object = {}
	const { target, getDiff } = proxy(object)

	target.a = {
		b: 'b'
	};

	target.a.c = 'c';

	const diff = getDiff()

	t.deepEqual(diff, {
		path: 'a.c',
		oldValue: undefined,
		newValue: 'c'
	})
});

test('proxy() get diff produced by simple update operation', (t) => {
	const object = {
		a: {
			b: 'b'
		}
	}
	const { target, getDiff } = proxy(object)
	target.a.b = {
		c: "c"
	};

	const diff = getDiff()

	t.deepEqual(diff, {
		path: 'a.b',
		oldValue: 'b',
		newValue: {
			c: "c"
		}
	})
});

test('proxy() get diff produced by simple delete operation', (t) => {
	const object = {
		a: {
			b: 'b'
		}
	}

	const { target, getDiff } = proxy(object)

	delete target.a.b

	t.deepEqual(getDiff(), {
		path: 'a.b',
		newValue: undefined,
		oldValue: 'b'
	})
});

test('proxy() test a simple demo', t => {
	const object = {}
	const { target, getDiff } = proxy(object)

	target.a = 'a'

	t.deepEqual(getDiff(), {
		path: 'a',
		newValue: 'a',
		oldValue: undefined
	})

	target.b = {
		b: {
			c: "c"
		}
	}

	t.deepEqual(getDiff(), {
		path: 'b',
		newValue: {
			b: {
				c: "c"
			}
		},
		oldValue: undefined
	})

	delete target.a

	t.deepEqual(getDiff(), {
		path: 'a',
		newValue: undefined,
		oldValue: 'a'
	})
})
