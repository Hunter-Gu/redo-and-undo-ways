import test from 'ava';

import { getPropsAmount, isDiffSimply, joinPath } from './utils';

test('joinPath()', (t) => {
	t.deepEqual(joinPath('join1', 'join2'), 'join1.join2');
	t.deepEqual(joinPath('join1.join2', 'join3'), 'join1.join2.join3');
});

test('getPropsAmount()', (t) => {
	t.deepEqual(getPropsAmount({}), 0);
	t.deepEqual(getPropsAmount({ a: 'a' }), 1);
	t.deepEqual(getPropsAmount({ a: { b: 'b' } }), 1);
});

test("checkDiffSimply()", t => {
	t.is(isDiffSimply('nail', 1), true)
	t.is(isDiffSimply('nail', "hunter"), true)
	t.is(isDiffSimply({ name: 'string' }, { age: 18 }), false)
})
