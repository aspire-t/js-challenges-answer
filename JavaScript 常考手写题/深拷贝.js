/**
 * 深拷贝会拷贝不可枚举属性，浅拷贝不会
 * @param {*} target 
 * @param {*} map 避免循环引用
 */
function _deepClone (target, map = new Map()) {
	if (typeof target !== "object" || target === null) return target
	if (map.get(target)) return map.get(target) // 避免循环引用
	// 除了{}和[]，new target.constructor(target)都可以重新开辟内存
	if (/^(Function|RegExp|Date|Set|Map)$/.test(target.constructor.name)) {
		const res = new target.constructor(target)
		map.set(target, res)
		return res
	}
	const cloneTarget = Array.isArray(target) ? [] : {}
	Object.getOwnPropertySymbols(target).forEach(item => {
		cloneTarget[item] = _deepClone(target[item], map)
		map.set(target, cloneTarget[item])
	})
	Object.getOwnPropertyNames(target).forEach(item => {
		if (!target.propertyIsEnumerable(item)) {
			Object.defineProperty(target, item, Object.getOwnPropertyDescriptor(target, item))
		} else {
			cloneTarget[item] = _deepClone(target[item], map)
			map.set(target, cloneTarget[item])
		}
	})
	// Object.propertyIsEnumerable() 判断是否是不可枚举的属性值
	return cloneTarget
}

const arr = [1, 2, 3]
const data = {
	o: arr,
	// a: function() {},
	b: {
		a: arr
	}
}
Object.defineProperty(data, 'c', { enumerable: false, value: 2 }) // 默认设置为不可读不可写

const res = _deepClone(data)
console.log(res)
console.log(arr == res.b.a)
