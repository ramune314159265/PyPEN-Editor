import { atom, useAtom } from 'jotai'

export const pythonAtom = atom('')

export const usePython = () => {
	const [pythonContent, setPythonContent] = useAtom(pythonAtom)

	return [pythonContent, { setPythonContent }]
}
