import EventEmitter2 from 'eventemitter2'
import { loadPyodide } from 'pyodide'

export class PythonRunner extends EventEmitter2 {
	static pyodide

	static async load() {
		PythonRunner.pyodide = await loadPyodide()
	}

	constructor(code) {
		super()
		this.code = code
	}

	async run() {
		if (!PythonRunner.pyodide) {
			await PythonRunner.load()
		}

		PythonRunner.pyodide.setStdout({
			batched: e => this.emit('output', e)
		})
		PythonRunner.pyodide.setStderr({
			batched: e => this.emit('error', e)
		})
		await PythonRunner.pyodide.runPythonAsync(this.code)
	}
}
