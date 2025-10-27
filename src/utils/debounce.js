const debounceMap = new Map()

export const debounce = (key, func, delay) => {
	if (debounceMap.has(key)) {
		clearTimeout(debounceMap.get(key))
	}

	const timer = setTimeout(() => {
		func()
		debounceMap.delete(key)
	}, delay)

	debounceMap.set(key, timer)
}
