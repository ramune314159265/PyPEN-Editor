import EventEmitter2 from 'eventemitter2'

export class PyPenRunner extends EventEmitter2 {
	static async convert(code) {
		const { promise, resolve, reject } = Promise.withResolvers()
		const pyPenWorker = new Worker('./run.js')

		const handle = e => {
			if (e.data.type === 'output') {
				pyPenWorker.removeEventListener('message', handle)
				reject(e.data.content)
			}
			if (e.data.type !== 'convert_output') {
				return
			}
			pyPenWorker.removeEventListener('message', handle)
			resolve(e.data.content)
		}
		pyPenWorker.addEventListener('message', handle)

		pyPenWorker.postMessage({
			type: 'convert',
			content: code
		})
		return promise
	}

	constructor(code) {
		super()
		this.code = code
		this.pyPenWorker = new Worker('./run.js')
	}

	run() {
		const { promise, resolve } = Promise.withResolvers()

		this.pyPenWorker.onmessage = e => {
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

		this.pyPenWorker.onerror = e => {
			this.emit('error', e.message)
			resolve()
		}

		this.on('input', e => {
			this.pyPenWorker.postMessage({
				type: 'input',
				content: e
			})
		})

		this.pyPenWorker.postMessage({
			type: 'run',
			content: this.code
		})
		return promise
	}

	abort() {
		this.pyPenWorker.terminate()
	}
}
