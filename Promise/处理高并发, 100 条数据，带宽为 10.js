// 最佳答案，没有使用任何Promise的方法（all/allSettled/race）
function concurrentRequests (tasks, maxConcurrent = 10) {
	let index = 0          // 当前待处理任务的索引
	let activeCount = 0    // 当前活跃的请求数
	const results = []      // 存储所有结果（按顺序）

	// 创建外层 Promise，用于最终返回所有结果
	return new Promise((resolve) => {
		// 定义递归执行任务的函数
		const run = async () => {
			// 当所有任务已启动且无活跃任务时，结束并返回结果
			if (index === tasks.length && activeCount === 0) {
				resolve(results)
				return
			}

			// 动态填充任务，直到达到最大并发数
			while (activeCount < maxConcurrent && index < tasks.length) {
				const currentIndex = index++  // 记录当前任务索引（闭包保存）
				activeCount++

				try {
					// 执行异步任务，并将结果存入对应位置
					results[currentIndex] = await tasks[currentIndex]()
				} catch (error) {
					// 记录错误，避免阻塞其他任务
					results[currentIndex] = error
				} finally {
					console.log(`Task ${currentIndex} done. Active count: ${activeCount}`)
					activeCount--
					// 当前任务完成后，递归触发新任务
					run()
				}
			}
		}

		// 启动初始任务
		run()
	})
}

// 和上面的版本是一个意思，只是个人觉得更好理解
function concurrentRequests2 (tasks, maxConcurrent = 10) {
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

// 生成模拟任务（随机延迟 0~1s）
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

// 并发执行，最大并发数 2
concurrentRequests(tasks, 2)
	.then(results => console.log('All results:', results))
	.catch(console.error)

// 使用 Promise.allSettled + 分批次
// 缺点：必须等待每批次全部完成，无法动态填充
async function batchRequests (tasks, batchSize = 10) {
	const results = []
	for (let i = 0; i < tasks.length; i += batchSize) {
		const batch = tasks.slice(i, i + batchSize)
		results.push(...await Promise.allSettled(batch.map(task => task())))
	}
	console.log(results)
	return results
}

batchRequests(tasks, 2)