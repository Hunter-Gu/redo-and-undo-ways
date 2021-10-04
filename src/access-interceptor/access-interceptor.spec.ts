import test from 'ava'

import { AccessInterceptor } from './access-interceptor'

test('getter', t => {
	const accessor = new AccessInterceptor({
		a: {
			a: {
				a: 'a'
			}
		}
	})
	t.deepEqual(accessor.get('a.a.a'), 'a')
	t.deepEqual(accessor.get('a.a.b', 'b'), 'b')
	t.deepEqual(accessor.get('a.b', 'c'), 'c')
})

test('setter', (t) => {
	const accessor = new AccessInterceptor({
		a: {
			a: {
				a: 'a'
			}
		}
	})

	t.deepEqual(accessor.set('a.a.a', 'aa'), {
		path: 'a.a.a',
		newValue: 'aa',
		oldValue: 'a'
	})

	t.deepEqual(accessor.set('b.a.a', 'aa'), {
		path: 'b',
		newValue: {
			a: {
				a: 'aa'
			}
		},
		oldValue: undefined
	})

	t.deepEqual(accessor.set('b.b.a', 'aa'), {
		path: 'b.b',
		newValue: {
			a: 'aa'
		},
		oldValue: undefined
	})
})
