const tasks = [
	() => new Promise((resolve, reject) => setTimeout(resolve, 1000, '任务1完成')),
	() => new Promise((resolve, reject) => setTimeout(reject, 1000, '任务2失败')),
	() => new Promise((resolve, reject) => setTimeout(resolve, 1000, '任务3完成')),
	() => new Promise((resolve, reject) => reject('任务4失败')),
]

async function execute (tasks, retries) {
	for (let task of tasks) {
		let attempts = 0
		while (attempts < retries) {
			try {
				await task()
				break
			} catch (error) {
				attempts++
				if (attempts >= retries) {
					throw new Error(error)
				}
			}
		}
	}
}

execute(tasks, 3).then(() => {
	console.log('All tasks completed successfully')
}).catch((error) => {
	console.error(`任务执行失败：${error}`)
})
