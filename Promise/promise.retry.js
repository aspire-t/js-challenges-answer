
function retry (task, maxRetries = 3, delay = 1000) {
	return new Promise((resolve, reject) => {
		const attempt = (retryCount = 0) => {
			task()
				.then(resolve)
				.catch((err) => {
					if (retryCount >= maxRetries) {
						reject(err)
					} else {
						console.log(`第 ${retryCount + 1} 次重试，剩余次数: ${maxRetries - retryCount}`)
						setTimeout(() => attempt(++retryCount), delay)
					}
				})
		}
		attempt(0)
	})
}

function request (content, time) {
	return () =>
		new Promise((_, reject) => {
			setTimeout(() => {
				reject(content)
			}, time)
		})
}

const task = request("error", 500)

retry(task, 5, 1000)
	.then((res) => {
		console.log(res)
	})
	.catch((err) => {
		console.log("err:", err)
	})