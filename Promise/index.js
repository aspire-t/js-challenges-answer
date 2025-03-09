function concurrentRequests (tasks, maxConcurrent = 10) {
	if (tasks.length === 0) {
		return Promise.resolve([])
	}

	return new Promise((resolve, reject) => {
		let nextIndex = 0 // 记录下一个任务的索引
		let finishCount = 0 // 记录已完成的任务数
		let results = []
		async function _request () {
			if (nextIndex >= tasks.length) {
				return
			}
			const i = nextIndex
			const task = await tasks[nextIndex++]()
			results[i] = task
			finishCount++
			if (finishCount === task.length) {
				resolve(results)
			}
			_request() // 递归调用，执行下一个任务
		}

		for (let i = 0; i < maxConcurrent; i++) {
			_request()
		}
	})
}

const generateTasks = (numTasks) => {
	const tasks = []
	for (let i = 0; i < numTasks; i++) {
		const delay = Math.random() * 1000
		tasks.push(() => new Promise((resolve) => {
			setTimeout(() => resolve(`Task ${i} done`), delay)
		}))
	}
	return tasks
}

const tasks = generateTasks(20)

concurrentRequests(tasks, 2)
	.then(results => console.log(results))
	.catch(error => console.error(error))

