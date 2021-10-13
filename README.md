# redo-and-undo-ways

Some ways to achieve redo and undo operations.

The key of redo and undo operations are diff - diff between every operation.

So the problem is how to get diff between operations.

## traversal

We can get diff by [BFS](./src/traversal/bfs.ts)/[DFS](./src/traversal/dfs.ts), but this way is not good for some operations of array:

- move
- add
- delete

and also this way has performance defect.

## interceptor

If you used [get](https://lodash.com/docs/4.17.15#get)/[set](https://lodash.com/docs/4.17.15#set) of lodash, you must be familiar with the string path style:

```js
const obj = {}

set(obj, 'a.b.c', 'a')

get(obj, 'a.b.c', 'default')
```

We can provide some [utils](./src/access-interceptor/access-interceptor.ts) extend from get/set, and intercept to get diff.

## Command

The [Command pattern](https://en.wikipedia.org/wiki/Command_pattern) is the classic way to do redo and undo operation.

## proxy

If you want to intercept assign operation of a object, you may think of [proxy](./src/proxy/proxy.ts) which is a meta way to do that.
