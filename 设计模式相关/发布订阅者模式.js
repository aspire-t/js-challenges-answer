class EventEmitter {
	constructor() {
		// key: 事件名
		// value: callback [] 回调数组
		this.events = {}
	}
	on (name, callback) {
		if (this.events[name]) {
			this.events[name].push(callback)
		} else {
			this.events[name] = [callback]
		}
	}
	off (name, callback) {
		if (!callback) {
			// 若果fn没有值，就解绑所有 type 的函数
			this.events[name] = []
		} else {
			// 解绑单个fn
			const event = this.events[name]
			if (event) {
				this.events[name] = event.filter(e => e !== callback)
			}
		}
	}
	emit (name, ...args) {
		if (!this.events[name]) return
		this.events[name].forEach(cb => cb(...args))
	}
}

//test
let eventsBus = new EventEmitter()
let fn1 = function (name, age) {
	console.log(name, age)
}
let fn2 = function (name, age) {
	console.log('fn', name, age)
}
eventsBus.on("test", fn1)
eventsBus.on("test", fn2)
eventsBus.emit("test", "Jason", 18)
