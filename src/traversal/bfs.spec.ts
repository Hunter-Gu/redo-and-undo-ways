import test from 'ava';

import { getDiffByBFS } from './bfs';

test('getDiffByBFS() diff by string value in object', (t) => {
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

test('getDiffByBFS() diff by string value in simple object', (t) => {
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

test('getDiffByBFS() diff by object value in object', (t) => {
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

test('getDiffByBFS() diff by object value in simple object', (t) => {
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

test('getDiffByBFS() diff by string value in simple array(do not change array)', (t) => {
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

test('getDiffByBFS() diff by remove prop in object', (t) => {
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

test('getDiffByBFS() diff by add new prop in object', (t) => {
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
