// 嵌套数组反转
// 输入：[1, [2, [3, [4, 5]]]]
// 输出：[5, [4, [3, [2, 1]]]]

// 输入：[1, [2, [3, 4], 5]]
// 输出：[[[5,[4,3]],2],1]

function reverseNestedArray (arr) {
	if (!Array.isArray(arr)) return arr

	// 先反转数组
	const reversed = [...arr].reverse()
	// 处理第一个元素
	const firstItem = reversed[0]
	let result = Array.isArray(firstItem)
		? reverseNestedArray(firstItem)
		: firstItem

	// 处理剩余元素
	for (let i = 1; i < reversed.length; i++) {
		const item = reversed[i]
		result = [result, Array.isArray(item) ? reverseNestedArray(item) : item]
	}
	console.log(result)
	return result
}

// 测试
const input = [1, [2, [3, [4, 5]]]]
// const input = [1, [2, [3, 4], 5]]
console.log(JSON.stringify(reverseNestedArray(input)))
// 输出: [[[[5,4],3],2],1]
