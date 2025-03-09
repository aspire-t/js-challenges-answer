// 封装一个工具函数输入一个promiseA返回一个promiseB如果超过1s没返回则抛出异常如果正常则输出正确的值。

function withTimeout (promiseA, timeout = 1000) {
	// 创建超时控制的 Promise
	const timeoutPromise = new Promise((_, reject) => {
		setTimeout(() => {
			reject(new Error(`Timeout after ${timeout}ms`))
		}, timeout)
	})

	// 使用 Promise.race 实现竞速机制
	return Promise.race([promiseA, timeoutPromise])
}

// 场景1：正常返回数据
const fastRequest = new Promise(resolve =>
	setTimeout(() => resolve("数据获取成功"), 500)
)

withTimeout(fastRequest)
	.then(console.log)  // 输出："数据获取成功"
	.catch(console.error)

// 场景2：超时异常
const slowRequest = new Promise(resolve =>
	setTimeout(() => resolve("数据获取成功"), 1500)
)
withTimeout(slowRequest)
	.then(console.log)
	.catch(err => console.error(err.message))  // 输出："Timeout after 1000ms"