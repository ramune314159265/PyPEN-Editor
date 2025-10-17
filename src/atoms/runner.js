import { atom, useAtom } from 'jotai'

export const runnerAtom = atom(null)

export const useRunner = () => {
	const [runner, setRunner] = useAtom(runnerAtom)

	const abortRunner = () => {
		if (!runner) {
			return
		}
		runner.abort()
		setRunner(null)
	}

	return [runner, { setRunner, abortRunner }]
}
