// 该代码为上面同学提交的，虽然考虑到了边界条件，更加严谨，但是是有问题的，会使始终指向全局对象window
// 问题就出在这个箭头函数，因为箭头函数的特性，会无法获得到正确的this，即调用call的函数
//  ！！！处理方式：更改为function(){}即可
Function.prototype._myCall = (thisArg, ...args) => {
	thisArg =
		thisArg !== null && thisArg !== undefined ? Object(thisArg) : window
	let fn = Symbol()
	thisArg[fn] = this
	const res = thisArg[fn](...args)
	delete thisArg[fn]
	return res
}
// 同理
Function.prototype._myapply = (thisArg, args = []) => {
	thisArg =
		thisArg !== null && thisArg !== undefined ? Object(thisArg) : window
	let fn = Symbol()
	thisArg[fn] = this
	const res = thisArg[fn](...args)
	delete thisArg[fn]
	return res
}
// 同理
Function.prototype._mybind = (thisArg, ...args) => {
	let fn = this
	return (...args) => {
		return fn._myCall(thisArg, ...args)
	}
}
//最好使用symbol进行处理一下，以及对于apply传递的数组考虑一下为空的情况