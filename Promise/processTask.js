/**
依次顺序执行一系列任务
所有任务全部完成后可以得到每个任务的执行结果
需要返回两个方法，start用于启动任务，pause用于暂停任务
每个任务具有原子性，即不可中断，只能在两个任务之间中断
@param {...Function } tasks 任务列表，每个任务无参、异步
	*/
function processTasks (...tasks) {
	let isRunning = false    // 是否正在执行
	let isPaused = false     // 是否暂停
	let currentIndex = 0     // 当前执行的任务索引
	const results = []       // 存储任务结果
	let pausePromiseResolve // 暂停状态下的 Promise 控制器

	const start = async () => {
		if (isRunning || isPaused) return
		isRunning = true
		isPaused = false

		while (currentIndex < tasks.length) {
			if (isPaused) {
				// 等待恢复执行的 Promise
				await new Promise(resolve => pausePromiseResolve = resolve)
			}

			try {
				// 执行原子性任务（不可中断）
				const result = await tasks[currentIndex]()
				results[currentIndex] = result
			} catch (error) {
				results[currentIndex] = error
			}

			currentIndex++

			// 任务间暂停检查
			if (isPaused) {
				await new Promise(resolve => pausePromiseResolve = resolve)
			}
		}

		isRunning = false
		return results
	}

	const pause = () => {
		if (!isRunning) return
		isPaused = true
		// 立即唤醒循环以响应暂停状态
		if (pausePromiseResolve) {
			const resolver = pausePromiseResolve
			pausePromiseResolve = null
			resolver()
		}
	}

	return { start, pause }
}


// function processTasks (...tasks) {
// 	let currentIndex = 0     // 当前执行的任务索引
// 	let isRunning = false    // 是否正在执行
// 	let results = []        // 存储任务结果

// 	return {
// 		start () {
// 			return new Promise(async resolve => {
// 				if (isRunning) {
// 					return
// 				}
// 				isRunning = true
// 				while (currentIndex < tasks.length) {
// 					const task = tasks[currentIndex]
// 					const result = await task()
// 					console.log(`Task ${currentIndex} done`)
// 					currentIndex++
// 					results.push(result)
// 					if (!isRunning) {
// 						return
// 					}
// 				}
// 				isRunning = false
// 				resolve(results)
// 				// return results
// 			})
// 		},
// 		pause () {
// 			isRunning = false
// 		}
// 	}
// }


// 模拟异步任务（支持成功/失败）
const task1 = () => new Promise(resolve => {
	console.log("Task0 Start")
	setTimeout(() => resolve("Task1 Done"), 1000)
})
const task2 = () => new Promise((_, reject) => {
	console.log("Task1 Start")
	setTimeout(() => reject("Task2 Failed"), 500)
})
const task3 = () => new Promise(resolve => {
	console.log("Task2 Start")
	setTimeout(() => resolve("Task3 Done"), 800)
})

const processor = processTasks(task1, task2, task3)

// 启动任务
processor.start().then(results => {
	console.log("All results:", results)
	// 输出：[ "Task1 Done", "Task2 Failed", "Task3 Done" ]
})

// 在合适时机暂停（如在事件监听中）
setTimeout(() => {
	processor.pause()
	console.log("Paused after first task")

	// 2秒后恢复
	setTimeout(() => processor.start(), 2000)
}, 1500)
