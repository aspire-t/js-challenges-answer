/*
描述：
		将数组（nums）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 
		如果nums 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。

示例：
		输入：nums = [1,3,2,5], size = 2

		输出：result = [[1,3], [2,5]] 

		输入：nums = [2,7,11,15,13], size = 3

		输出：result = [[2,7,11], [15,13]]

应用：
		数组分块中重要性在于它可以将多个项目的处理在执行队列上分开，
		在每个项目处理之后，给予其他的浏览器处理机会运行，
		这样就可能避免长时间运行脚本的错误
*/

function chunk (arr, size) {
	let result = []
	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size))
	}
	return result
}

console.log(chunk([1, 3, 2, 5], 2)) // [[1,3], [2,5]]
console.log(chunk([2, 7, 11, 15, 13], 3)) // [[2,7,11], [15,13]]