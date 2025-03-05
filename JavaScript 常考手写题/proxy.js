const obj = { sum: 0 }
const add = new Proxy(obj, {
	get: function (target, prop, receiver) {
		// 1. 如果 add 对象和数字相加，则把目标对象 obj 的 sum 和数字相加
		// 2. 如果访问 add 对象的索引，则把当前索引累加到 sum 中
		console.log(target, prop, receiver)
		if (prop === Symbol.toPrimitive) {
			const ret = target.sum
			target.sum = 0 // 重置 sum
			return () => ret
		} else {
			const sum = (target.sum || 0) + Number(prop)
			target.sum = sum
			return receiver
		}
	}
})

const result1 = add[1][2] + 3 // 输出 6
const result2 = add[3][4][5] + 6 // 输出 18
console.log(result1, result2) // 6 18

/**
 * 
### 代码解析

1. ** `Proxy` 对象 **：
- `Proxy` 对象用于创建一个代理，拦截和自定义对象的行为。
- `target` 是被代理的对象，`handler` 是一个对象，定义了拦截器。

2. ** `get` 拦截器 **：
- `get` 拦截器用于拦截对象属性的访问。
- 在这个例子中，我们检查属性是否是一个数字字符串（如 `'1'`、`'2'` 等）。
- 如果是数字字符串，我们将其转换为数字并累加到 `target.sum` 中。

3. ** `Symbol.toPrimitive` **：
- 当对象需要被转换为原始值时，会调用 `Symbol.toPrimitive` 方法。
- 在这个例子中，我们重写 `Symbol.toPrimitive` 方法，使其返回 `target.sum` 的值，并将 `target.sum` 重置为 0。

4. ** 链式调用 **：
- 每次访问一个数字属性时，我们返回 `receiver`，以便继续链式调用。
 * 
 */



