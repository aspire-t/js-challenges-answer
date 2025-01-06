const arr = [1, 2, 3]

Array.prototype.map = function (callback) {
	const res = []
	for (let i = 0; i < this.length; i++) {
		res.push(callback(this[i], i, this))
	}

	return res
}

const res = arr.map((ele, index, arr) => {
	return ele * 2
})

console.log(res)

Array.prototype._map = function (cb, thisBinding) {
	// 排除回调非函数情况
	if (typeof cb !== "function") {
		throw new TypeError(`${cb} is not a function`)
	}
	// 排除this为非可迭代对象情况
	if (this == null || typeof this[Symbol.iterator] !== "function") {
		throw new TypeError(`${this} is not a iterable`)
	}
	// 将可迭代对象转换成数组
	const array = [...this]
	const result = []
	// 执行遍历并回调
	for (let i = 0; i < array.length; i++) {
		result.push(cb.call(thisBinding, array[i], i, this))
	}
	return result
}
