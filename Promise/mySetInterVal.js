// 写一个 mySetInterVal(fn, a, b)，每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal

function mySetInterval (fn, a, b) {
	let count = 0  // 记录执行次数
	let timerId = null  // 保存定时器ID

	const execute = () => {
		fn()  // 执行目标函数
		const delay = a + count * b  // 计算当前次数的延迟时间（a + n*b）
		count++  // 次数递增
		timerId = setTimeout(execute, delay)  // 递归调用
	}

	// 首次调用（初始延迟为a）
	timerId = setTimeout(execute, a)

	// 返回一个对象，包含清除方法
	return {
		clear: () => clearTimeout(timerId)
	}
}

// 使用示例
const interval = mySetInterval(
	() => console.log("执行"),
	1000,  // a=1秒
	2000    // b=2秒
)

// 停止定时器
function myClear (interval) {
	interval.clear()
}

// 调用 myClear(interval) 即可停止
