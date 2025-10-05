import { atom, useAtom } from 'jotai'

export const pyPenAtom = atom('')

export const usePyPen = () => {
	const [pyPenContent, setPyPenContent] = useAtom(pyPenAtom)

	return [pyPenContent, { setPyPenContent }]
}
