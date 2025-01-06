/*
实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

	LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
	Eat supper~

		LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
以此类推。

*/
class LazyMan {
	constructor(name) {
		this.tasks = []
		this.name = name
		this.sayHi()
		this._run()
	}

	sayHi () {
		this.tasks.push(() => console.log(`Hi!this is ${this.name}`))
		return this
	}

	sleep (ms) {
		this.tasks.push(() => this.sleepFn(ms))
		return this
	}

	eat (name) {
		this.tasks.push(() => console.log(`Eat ${name}`))
		return this
	}

	sleepFirst (ms) {
		this.tasks.unshift(() => this.sleepFn(ms))
		return this
	}

	sleepFn (time) {
		return new Promise(resolve => {
			setTimeout(() => {
				console.log(`Wake up after ${time}`)
				resolve();
			}, time * 1000)
		})
	}

	_run () {
		// setTimeout(()=>{
		//   this.tasks.forEach(async task => await task())
		// },0)

		setTimeout(async () => {
			for (const task of this.tasks) {
				await task()
			}
		}, 0)
	}
}
new LazyMan("Hank").sleep(10).eat("dinner")
// new LazyMan("Hank").eat("dinner").eat("supper")
// new LazyMan("Hank").sleepFirst(5).eat("supper")