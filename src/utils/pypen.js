import EventEmitter2 from 'eventemitter2'

export class PyPenRunner extends EventEmitter2 {
	static pypenWorker

	static startPyPen() {
		PyPenRunner.pypenWorker = new Worker('src/pypen/run.js')
	}

	static async convert(code) {
		const { promise, resolve, reject } = Promise.withResolvers()
		if (!PyPenRunner.pypenWorker) {
			PyPenRunner.startPyPen()
		}

		const handle = e => {
			if (e.data.type === 'output') {
				PyPenRunner.pypenWorker.removeEventListener('message', handle)
				reject(e.data.content)
			}
			if (e.data.type !== 'convert_output') {
				return
			}
			PyPenRunner.pypenWorker.removeEventListener('message', handle)
			resolve(e.data.content)
		}
		PyPenRunner.pypenWorker.addEventListener('message', handle)

		PyPenRunner.pypenWorker.postMessage({
			type: 'convert',
			content: code
		})
		return promise
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
				case 'image':
					this.emit('image', data.content)
					break
				case 'inputRequest':
					this.emit('inputRequest')
					break
				case 'end':
					resolve()
					break

				default:
					break
			}
		}

		PyPenRunner.pypenWorker.onerror = e => {
			this.emit('error', e.message)
			resolve()
		}

		this.on('input', e => {
			PyPenRunner.pypenWorker.postMessage({
				type: 'input',
				content: e
			})
		})

		PyPenRunner.pypenWorker.postMessage({
			type: 'run',
			content: this.code
		})
		return promise
	}
}
