import EventEmitter2 from 'eventemitter2'

export class PyPenRunner extends EventEmitter2 {
	static pypenWorker

	static startPyPen() {
		PyPenRunner.pypenWorker = new Worker('src/pypen/run.js')
	}

	constructor(code) {
		super()
		this.code = code
	}

	run() {
		const { promise, resolve } = Promise.withResolvers()
		if (!PyPenRunner.pypenWorker) {
			PyPenRunner.startPyPen()
		}

		PyPenRunner.pypenWorker.onmessage = e => {
			const data = e.data
			switch (data.type) {
				case 'output':
					this.emit('output', data.content)
					break
				case 'end':
					resolve()
					break

				default:
					break
			}
		}

		PyPenRunner.pypenWorker.postMessage({
			type: 'run',
			content: this.code
		})
		return promise
	}
}
