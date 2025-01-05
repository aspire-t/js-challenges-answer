/**
	 * 得到一个新的Promise，该Promise的状态取决于proms的执行
	 * proms是一个迭代器，包含多个Promise
	 * 全部Promise成功，返回的Promise才成功，数据为所有Primsise成功的数据，并且顺序时按照传入的顺序排列
	 * 只要有一个Promise失败，则=返回的Pormise失败，原因是第一个Promise失败的原因
	 * @param {iterator} proms
	 */

function MyPromiseAll (promises) {
	return new Promise((resolve, reject) => {
		if (!Array.isArray(promises)) {
			reject(new TypeError('Promise.all requires an array'))
		}

		let result = []
		let count = 0

		promises.forEach((promise, index) => {
			Promise.resolve(promise)
				.then(data => {
					result[index] = data
					count++
					if (count === promises.length) resolve(result)
				})
				.catch(reason => {
					reject(reason)
				})
		})
	})
}

/**
 * 不仅可以传数组，还可以传递迭代器。不是所有迭代器都支持for循环，所以。。。
 */
MyPromiseAll([
	Promise.resolve(1),
	Promise.resolve(2),
	Promise.resolve(3),
	4,
]).then(
	(data) => {
		// data:[1,2,3,4]
		// 传递[pro1,pro2,pro3,4]的话:内部默认处理Promise.resolve(4)
		console.log("成功", data)
	},
	(reason) => {
		// reason:reason2
		console.log("失败", reason)
	}
)