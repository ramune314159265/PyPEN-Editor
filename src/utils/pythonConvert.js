import { Language, Parser } from 'web-tree-sitter'

await Parser.init()
const parser = new Parser()
const Lang = await Language.load('tree-sitter-python.wasm')
parser.setLanguage(Lang)

const nodeToIR = node => {
	switch (node.type) {
		case 'assignment':
			return {
				type: 'assign',
				target: node.namedChildren[0].text,
				value: { type: 'literal', value: node.namedChildren[1].text }
			}
		case 'call':
			const func = node.namedChildren[0].text
			const args = node.namedChildren.slice(1).map(a => ({ type: 'literal', value: a.text }))
			return { type: 'call', func, args }
		default:
			break
	}
}

export const pythonToIr = code => {
	const tree = parser.parse(code)
	const root = tree.rootNode
	return root.namedChildren.map(node => nodeToIR(node))
}
