// leetcode 20: Valid Parentheses

function isBalancedParentheses (str) {
	const stack = []
	const matchingBrackets = {
		")": "(",
		"]": "[",
		"}": "{"
	}

	for (let i = 0; i < str.length; i++) {
		const char = str[i]

		// 如果是左括号，压入栈中
		if (char === "(" || char === "[" || char === "{") {
			stack.push(char)
		}
		// 如果是右括号，检查栈顶是否有对应的左括号
		else if (char === ")" || char === "]" || char === "}") {
			if (stack.length === 0 || stack.pop() !== matchingBrackets[char]) {
				return false // 没有匹配的左括号
			}
		}
	}

	// 如果栈为空，说明所有括号都匹配
	return stack.length === 0
}

// 测试用例
console.log(isBalancedParentheses("[]()")) // true
console.log(isBalancedParentheses("{[]()}")) // true
console.log(isBalancedParentheses("{[()]()}")) // true
console.log(isBalancedParentheses("{[]()")) // false
console.log(isBalancedParentheses("({[)]")) // false
console.log(isBalancedParentheses("((()))")) // true
console.log(isBalancedParentheses("((())")) // false