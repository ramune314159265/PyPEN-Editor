import { atom, useAtom } from 'jotai'

export const outputAtom = atom([])

export const useOutput = () => {
	const [outputData, setOutputData] = useAtom(outputAtom)

	const clearOutput = () => {
		setOutputData([])
	}

	const addOutputData = data => {
		setOutputData(prev => [...prev, data])
	}

	return [outputData, { clearOutput, addOutputData, setOutputData }]
}
