let rootList = [
	{ id: 1, name: '部门1', pid: 0 },
	{ id: 2, name: '部门2', pid: 1 },
	{ id: 3, name: '部门3', pid: 1 },
	{ id: 4, name: '部门4', pid: 3 },
	{ id: 5, name: '部门5', pid: 4 },
	{ id: 6, name: '部门6', pid: 0 },
]

function getTreeList (rootList, id, list) {
	for (const item of rootList) {
		if (item.pid === id) {
			list.push(item)
		}
	}

	for (const l of list) {
		l.children = []
		getTreeList(rootList, l.id, l.children)
		if (l.children.length === 0) {
			delete l.children
		}
	}

	return list
}

const res = getTreeList(rootList, 0, [])
console.log("res", res)



function get_tree (arr) {
	const list = []

	arr.forEach(element => {
		const children_arr = arr.filter(ele => {
			return element.id === ele.pid
		})

		if (children_arr.length > 0) {
			element.children = children_arr
		}

		if (element.pid === 0) {
			list.push(element)
		}
	})

	return list
}

// console.log(get_tree(rootList))

function get_tree (arr) {
	const list = []
	const hashmap = {}

	for (let i = 0; i < arr.length; i++) {
		// 存储每个id下的子元素
		let pid = arr[i].pid
		let id = arr[i].id


		if (!hashmap[id]) {
			hashmap[id] = { children: [] }
		}

		hashmap[id] = { ...arr[i], children: hashmap[id].children }

		if (pid === 0) {
			list.push(hashmap[id])
		} else {
			if (!hashmap[pid]) {
				hashmap[pid] = {
					children: []
				}
			}

			hashmap[pid].children.push(hashmap[id])
		}
	}
	return list
}

// const ans = get_tree(rootList)
// console.log(ans) 