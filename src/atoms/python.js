import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { debounce } from '../utils/debounce'

export const pythonAtom = atom(localStorage.getItem('ramune314159265.pypeneditor.pythoncontent') === null ?
	'' :
	localStorage.getItem('ramune314159265.pypeneditor.pythoncontent')
)

export const usePython = () => {
	const [pythonContent, setPythonContent] = useAtom(pythonAtom)

	useEffect(() => {
		debounce(() => {
			localStorage.setItem('ramune314159265.pypeneditor.pythoncontent', pythonContent)
		}, 1000)()
	}, [pythonContent])

	return [pythonContent, { setPythonContent }]
}
