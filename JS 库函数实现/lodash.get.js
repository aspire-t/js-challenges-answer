const obj = {
	a: {
		b: 123
	},
	arr: [
		{
			demo: 'demo'
		}
	]
}

function getKey (obj, path, defaultValue = "undefined") {
	//先将path处理成统一格式
	let newPath = []
	if (Array.isArray(path)) {
		newPath = path
	}
	else {
		// 字符串类型 obj[a] obj.a  这里把'[' 替换成'.' ']' 替换成''
		newPath = path.replace(/\[/g, '.').replace(/\]/g, '').split('.')//最后转成数组
		console.log(newPath)
	}
	//obj 替换成 obj.a 逐步调用
	return newPath.reduce((o, k) => {
		return (o || {})[k]
	}, obj) || defaultValue
}
// console.log(getKey(obj, 'a.b'))
console.log(getKey(obj, 'arr[0].demo'))