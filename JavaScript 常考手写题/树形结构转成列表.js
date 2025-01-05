const data = [
	{
		id: '1',
		name: '父节点1',
		children: [
			{
				id: '1-1',
				name: '子节点1-1',
				children: [
					{
						id: '1-1-1',
						name: '子节点1-1-1'
					},
					{
						id: '1-1-2',
						name: '子节点1-1-2'
					}
				]
			}
		]
	},
	{
		id: '2',
		name: '父节点2',
		children: [
			{
				id: '2-1',
				name: '子节点2-1'
			}
		]
	}
]

const result = data.reduce(function (acc, cur) {
	acc.push({
		id: cur.id,
		name: cur.name,
		parentId: cur.parentId
	})
	cur.children && cur.children.forEach(child => {
		child.parentId = cur.id
		arguments.callee(acc, child)
	})
	return acc
}, []);

console.log(result)
// [{id: 1, name: '父节点1', parentId: null}, {id: '1-1', name: '子节点1-1', parentId: '1'}, {id: '1-1-1', name: '子节点1-1-1', parentId: '1-1'}, {id: '1-1-2', name: '子节点1-1-2', parentId: '1-1'}, {id: 2, name: '父节点2', parentId: null}, {id: '2-1', name: '子节点2-1', parentId: '2'}]

function treeToList (data) {
	let res = []

	function dfs (node) {
		node.forEach(item => {
			if (item.children) {
				dfs(item.children)
				delete item.children
			}
			res.push(item)
		})
	}
	dfs(data)
	return res
}

const res = treeToList(data)

console.log(res)