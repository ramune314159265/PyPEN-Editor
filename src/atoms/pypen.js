import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { debounce } from '../utils/debounce'

export const pyPenAtom = atom(localStorage.getItem('ramune314159265.pypeneditor.pypencontent') === null ?
	'' :
	localStorage.getItem('ramune314159265.pypeneditor.pypencontent')
)

export const usePyPen = () => {
	const [pyPenContent, setPyPenContent] = useAtom(pyPenAtom)

	useEffect(() => {
		debounce('pypen', () => {
			localStorage.setItem('ramune314159265.pypeneditor.pypencontent', pyPenContent)
		}, 1000)
	}, [pyPenContent])

	return [pyPenContent, { setPyPenContent }]
}
