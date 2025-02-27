const obj = {
  a: {
    b: {
      c: 1,
    },
    d: 2,
		e: ['a', 'b']
  },
  j: {
		k:{
			l: 3,
		}
	}
};


function flattenObject(obj) {
	let result = {};
	function flatten (currentObj, prefix = '') {
		for (let key in currentObj) {
			if (currentObj.hasOwnProperty(key)) {
				const newKey = prefix ? `${prefix}.${key}` : key
				if (typeof currentObj[key] === 'object' && currentObj[key] !== null && !Array.isArray(currentObj[key])) {
					flatten(currentObj[key], newKey)
				} else {
					result[newKey] = currentObj[key]
				}
			}
		}
	}
	flatten(obj);
  return result;
}

console.log(flattenObject(obj)); // { 'a.b.c': 1, 'a.d': 2, 'a.e': [ 'a', 'b' ], 'j.k.l': 3 }