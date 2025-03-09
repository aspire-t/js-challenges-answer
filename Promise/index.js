function mySetInterval (fn, a, b) {
	let count = 0
	let timer = null
	function execute () {
		fn()
		const delay = a + count * b
		count++
		timer = setTimeout(execute, delay)
	}

	timer = setTimeout(execute, a)
	return {
		clear: () => clearTimeout(timer)
	}
}

const interval = mySetInterval(
	() => console.log("执行"),
	1000,  // a=1秒
	2000    // b=2秒
)
