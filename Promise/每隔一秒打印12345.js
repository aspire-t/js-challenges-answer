// 每隔一秒打印12345.js

// 方案一：
function sleep (count) {
	return new Promise(resolve => {
		setTimeout(() => {
			console.log(count)
			resolve()
		}, 1000)
	})
}

async function print () {
	for (let i = 1; i <= 5; i++) {
		await sleep(i)
	}
}

print()

// 方案二：
function run (count = 1) {
	const timer = setTimeout(() => {
		console.log(count)
		clearTimeout(timer)
		count < 5 && run(count + 1)
	}, 1000)
}
run(1)
