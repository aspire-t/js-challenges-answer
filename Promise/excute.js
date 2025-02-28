// 我理解了你的需求。你需要一个 execute 函数，它接受两个参数：tasks 和 retries。这个函数需要确保每个任务都成功执行，如果失败则会重试，最多重试 retries 次。如果超过最大重试次数仍未成功，则抛出异常。此外，任务必须按顺序执行。

// 💡解答

// 分析题目要求：

// - 有一个任务数组  s = [task1, task2, task3] ，需要将其作为参数传入  execute  函数。

// -  execute  函数接受  tasks （任务数组）和  retries （每个任务最大重试次数）两个参数。

// - 每个任务执行成功返回一个  Promise  对象，失败则重试，最多重试  retries  次，超过次数抛出异常。

// - 任务必须串行执行，即前一个任务完成后再执行下一个任务。

// 实现思路：

// - 可以使用  async / await 结合  for  循环来实现任务的串行执行。

// - 对于每个任务，使用一个  for  循环来控制重试次数，在每次尝试执行任务时，将任务包装成  Promise  并处理成功和失败的情况。

// 代码实现如下：

// javascript
async function execute (tasks, retries) {
	for (let task of tasks) {
		let attempts = 0
		while (attempts <= retries) {
			try {
				await task()
				break // 任务成功，跳出循环
			} catch (error) {
				attempts++
				if (attempts > retries) {
					throw new Error(`Task failed after ${retries} retries: ${error.message}`)
				}
			}
		}
	}
}

// function execute (tasks, retries) {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			for (let i = 0; i < tasks.length; i++) {
// 				let task = tasks[i]
// 				for (let j = 0; j <= retries; j++) {
// 					try {
// 						// 执行任务并等待其完成
// 						let result = await task()
// 						// 如果任务成功，继续执行下一个任务
// 						break
// 					} catch (error) {
// 						// 如果是最后一次重试，抛出异常
// 						if (j === retries) {
// 							reject(new Error(`Task${i + 1} failed after${retries + 1} attempts`))
// 						}
// 					}
// 				}
// 			}
// 			// 所有任务都成功执行，resolve Promise
// 			resolve()
// 		} catch (error) {
// 			// 如果在执行过程中抛出异常，reject Promise
// 			reject(error)
// 		}
// 	})
// }


// 代码解释：

// - 首先， execute  函数返回一个  Promise 。

// - 外层  for  循环遍历任务数组  tasks ，每次取出一个任务  task 。

// - 内层  for  循环控制每个任务的重试次数，从  0  到  retries 。

// - 在每次内层循环中，使用  await 执行任务  task() ，如果任务成功执行， break  内层循环，继续执行下一个任务。

// - 如果任务执行失败，捕获  error ，如果是最后一次重试（ j === retries ），则  reject  整个  Promise  并抛出错误信息。

// - 如果所有任务都成功执行完毕， resolve  整个  Promise 。

// - 如果在执行过程中出现任何未处理的异常， reject  整个  Promise  并传递错误信息。

// 这样就满足了题目中任务串行执行、重试以及成功失败处理的要求。假设  task1 、 task2 、 task3  是已经定义好的函数，你可以这样调用  execute  函数：


let s = [task1, task2, task3]
execute(s, 3).then(() => {
	console.log('All tasks completed successfully')
}).catch((error) => {
	console.error(error)
});
 
 
// 这里假设最大重试次数为  3 ，你可以根据实际需求调整这个值。