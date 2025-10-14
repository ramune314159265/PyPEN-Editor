import EventEmitter2 from 'eventemitter2'
import Sk from 'skulpt'

export class PythonRunner extends EventEmitter2 {
	constructor(code) {
		super()
		this.code = code
	}

	async run() {
		const readInput = p => {
			this.emit('output', p)
			this.emit('inputRequest')
			const { promise, resolve } = Promise.withResolvers()
			this.on('input', e => resolve(e))
			return promise
		}

		const builtinRead = x => {
			if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
				throw `File not found: '${x}'`
			return Sk.builtinFiles["files"][x]
		}

		Sk.configure({
			output: e => {
				this.emit('output', e)
			},
			read: builtinRead,
			inputfun: readInput,
			inputfunTakesPrompt: true,
		})
		console.log(this)

		try {
			await Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, this.code, true))
		} catch (e) {
			throw e
			this.emit('error', e.message)
		}
	}
}
