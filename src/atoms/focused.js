import { atom, useAtom } from 'jotai'

export const lastFocusedAtom = atom(null)

export const useLastFocused = () => {
	const [lastFocused, setLastFocused] = useAtom(lastFocusedAtom)

	return [lastFocused, { setLastFocused }]
}
