import test from 'ava';

import { getDiffByBFS, getPropsAmount, isDiffSimply, joinPath } from './bfs';

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

test('BFS() diff by string value in object', (t) => {
	const oldValue = {
		name: 'input',
		attributes: {
			class: 'className-1',
			style: 'color: red',
		},
		props: {
			value: {
				option: {
					value: '',
				},
			},
			placeholder: 'Please input your name',
		},
	};
	const newValue = {
		name: 'input',
		attributes: {
			class: 'className-1',
			style: 'color: red',
		},
		props: {
			value: {
				option: {
					value: 'Nail',
				},
			},
			placeholder: 'Please input your name',
		},
	};
	const result = getDiffByBFS(newValue, oldValue);
	t.deepEqual(result, {
		path: 'props.value.option.value',
		oldValue: '',
		newValue: 'Nail',
	});
});

test('BFS() diff by string value in simple object', (t) => {
	const oldValue = {
		name: 'input',
		attributes: {
			class: 'className-1',
			style: 'color: red',
		},
		props: {
			value: '',
			placeholder: 'Please input your name',
		},
	};
	const newValue = {
		name: 'input',
		attributes: {
			class: 'className-1',
			style: 'color: red',
		},
		props: {
			value: 'Nail',
			placeholder: 'Please input your name',
		},
	};
	const result = getDiffByBFS(newValue, oldValue);
	t.deepEqual(result, {
		path: 'props.value',
		oldValue: '',
		newValue: 'Nail',
	});
});

test('BFS() diff by object value in object', (t) => {
	const oldValue = {
		name: 'input',
		attributes: {
			class: 'className-1',
			style: 'color: red',
		},
		props: {
			value: '',
			placeholder: 'Please input your name',
		},
	};
	const newValue = {
		name: 'input',
		attributes: {
			class: 'className-1',
			style: 'color: red',
		},
		props: {
			value: {
				option: {
					value: 'Nail',
				},
			},
			placeholder: 'Please input your name',
		},
	};
	const result = getDiffByBFS(newValue, oldValue);
	t.deepEqual(result, {
		path: 'props.value',
		oldValue: '',
		newValue: {
			option: {
				value: 'Nail',
			},
		},
	});
});

test('BFS() diff by object value in simple object', (t) => {
	const oldValue = {
		name: 'input',
		attributes: {
			class: 'className-1',
			style: 'color: red',
		},
		props: {
			value: {
				option: {
					value: '',
				},
			},
			placeholder: 'Please input your name',
		},
	};
	const newValue = {
		name: 'input',
		attributes: {
			class: 'className-1',
			style: 'color: red',
		},
		props: {
			value: 'Nail',
			placeholder: 'Please input your name',
		},
	};
	const result = getDiffByBFS(newValue, oldValue);
	t.deepEqual(result, {
		path: 'props.value',
		oldValue: {
			option: {
				value: '',
			},
		},
		newValue: 'Nail',
	});
});

test('BFS() diff by string value in simple array(do not change array)', (t) => {
	const oldValue = {
		children: [
			{
				name: 'input',
				attributes: {
					class: 'className-1',
					style: 'color: red',
				},
				props: {
					value: '',
					placeholder: 'Please input your name',
				},
			}
		]
	};
	const newValue = {
		children: [
			{
				name: 'input',
				attributes: {
					class: 'className-1',
					style: 'color: red',
				},
				props: {
					value: 'Nail',
					placeholder: 'Please input your name',
				},
			}
		]
	};
	const result = getDiffByBFS(newValue, oldValue);
	t.deepEqual(result, {
		path: 'children.0.props.value',
		oldValue: '',
		newValue: 'Nail',
	});
});

test('BFS() diff by remove prop in object', (t) => {
	const oldValue = {
		name: 'input',
		attributes: {
			class: 'className-1',
			style: 'color: red',
		},
		props: {
			value: '',
			placeholder: 'Please input your name',
		},
	};
	const newValue = {
		name: 'input',
		attributes: {
			class: 'className-1',
			style: 'color: red',
		},
	};
	const result = getDiffByBFS(newValue, oldValue);
	t.deepEqual(result, {
		path: 'props',
		newValue: undefined,
		oldValue: {
			value: '',
			placeholder: 'Please input your name',
		},
	});
});

test('BFS() diff by add new prop in object', (t) => {
	const oldValue = {
		name: 'input',
		attributes: {
			class: 'className-1',
			style: 'color: red',
		},
	};
	const newValue = {
		name: 'input',
		attributes: {
			class: 'className-1',
			style: 'color: red',
		},
		props: {
			value: '',
			placeholder: 'Please input your name',
		},
	};
	const result = getDiffByBFS(newValue, oldValue);
	t.deepEqual(result, {
		path: 'props',
		oldValue: undefined,
		newValue: {
			value: '',
			placeholder: 'Please input your name',
		},
	});
});
