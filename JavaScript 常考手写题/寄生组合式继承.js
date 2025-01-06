function Parent (name) {
	this.name = name
}
Parent.prototype.getName = function () {
	return this.name
}

function Son (name, age) {
	// 这里其实就等于 this.name = name
	Parent.call(this, name)
	this.age = age
}

Son.prototype.getAge = function () {
	return this.age
}

Son.prototype.__proto__ = Object.create(Parent.prototype)
Son.prototype.constructor = Son

const son1 = new Son('shao', 20)

console.log(son1.getName()) // shao
console.log(son1.getAge()) // 20