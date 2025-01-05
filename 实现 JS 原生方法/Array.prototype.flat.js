const arr = [1, [2, 3, [4, 5]], 1, 2, [6, 7]]
// Array.prototype.flat = function (deep = Infinity) {
// 	if (deep === 0) {
// 		return this
// 	}

// 	let res = []
// 	for (let i of this) {
// 		if (Array.isArray(i) && deep > 0) {
// 			res = res.concat(i.flat(deep - 1))
// 		} else {
// 			res.push(i)
// 		}
// 	}
// 	return res
// }

Array.prototype._flat = function (deep = Infinity) {
	return this.reduce((acc, val) => {
		if (Array.isArray(val) && deep > 0) {
			acc = acc.concat(val.flat(deep - 1))
		} else {
			acc.push(val)
		}
		return acc
	}, [])
}

// console.log(arr.flat(1))
console.log(arr._flat(1))