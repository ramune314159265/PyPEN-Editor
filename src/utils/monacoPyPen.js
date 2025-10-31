import * as monaco from 'monaco-editor'

export const getPyPenVars = content => {
	const lines = content.split('\n')
	const vars = lines.map(c => {
		const contentTrimmed = c.trim()
		const patterns = [
			/^\s*(.*?)\s*=\s*.*/,
			/^(\S+)\s*に.*を入力する$/,
			/^(\S+)\s*を.*しながら：?$/,
			/.*の要素(\S+)\s*について繰り返す：?$/,
			/^(?:関数|手続き)\s+(\S+)\s*\(.*\)：?$/
		]

		for (const p of patterns) {
			const m = contentTrimmed.match(p)
			if (m) {
				return m[1]
			}
		}
	}).filter(c => c && !c.includes(' '))
	return Array.from(new Set(vars))
}

// https://watayan.net/prog/PyPEN/manual/syntax.html
export const pyPenProvideCompletionItems = (model, position) => {
	const lineText = model.getLineContent(position.lineNumber)
	const text = model.getValue()
	const beforeCursor = lineText.substring(0, position.column - 1)
	const afterCursor = lineText.substring(position.column - 1)

	const trimmedBefore = beforeCursor.trimStart()

	const suggestions = []

	if (trimmedBefore.length <= 3 && afterCursor.trim().length === 0) {
		suggestions.push(
			{
				label: '表示 print()',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: '表示する(${1:値})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '値を表示する'
			},
			{
				label: '改行なしで表示 print()',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: '改行無しで表示する(${1:値})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '値を改行なしで表示する'
			},
			{
				label: '整数入力 int(input())',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: '${1:変数名} に整数を入力する',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '変数に整数を入力する'
			},
			{
				label: '実数入力 float(input())',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: '${1:変数名} に実数を入力する',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '変数に実数を入力する'
			},
			{
				label: '文字列入力 input()',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: '${1:変数名} に文字列を入力する',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '変数に文字列を入力する'
			},
			{
				label: '真偽入力 bool(input())',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: '${1:変数名} に真偽を入力する',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '変数に真偽を入力する'
			},
			{
				label: 'もし if',
				kind: monaco.languages.CompletionItemKind.Keyword,
				insertText: 'もし ${1:条件式} ならば：\n\t',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '条件分岐(if)'
			},
			{
				label: 'そうでなくもし else if',
				kind: monaco.languages.CompletionItemKind.Keyword,
				insertText: 'そうでなくもし ${1:条件式} ならば：\n\t',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '条件分岐(else if)'
			},
			{
				label: 'そうでなければ else',
				kind: monaco.languages.CompletionItemKind.Keyword,
				insertText: 'そうでなければ：\n\t',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '条件分岐(else)'
			},
			{
				label: '～の間 while',
				kind: monaco.languages.CompletionItemKind.Keyword,
				insertText: '${1:条件式} の間：\n\t',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'ループ(while)'
			},
			{
				label: '増やしながら for',
				kind: monaco.languages.CompletionItemKind.Keyword,
				insertText: '${1:変数名} を ${2:数値} から ${3:数値} まで ${4:数値} ずつ増やしながら：\n\t',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'ループ(for)'
			},
			{
				label: '減らしながら for',
				kind: monaco.languages.CompletionItemKind.Keyword,
				insertText: '${1:変数名} を ${2:数値} から ${3:数値} まで ${4:数値} ずつ減らしながら：\n\t',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'ループ(for)'
			},
			{
				label: '配列の要素を取り出しながら for in',
				kind: monaco.languages.CompletionItemKind.Keyword,
				insertText: '${1:配列} の要素 ${2:変数名} について繰り返す：\n\t',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'ループ(for in)'
			},
			{
				label: '繰り返しを抜ける break',
				kind: monaco.languages.CompletionItemKind.Keyword,
				insertText: '繰り返しを抜ける',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '繰り返しを抜ける(break)'
			},
			{
				label: '関数定義 def function',
				kind: monaco.languages.CompletionItemKind.Keyword,
				insertText: '関数 ${1:関数名}(${2:引数})：\n\t',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '関数定義(def)'
			},
			{
				label: '値を返す return',
				kind: monaco.languages.CompletionItemKind.Keyword,
				insertText: '${1:値} を返す',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '値を返す(return)'
			},
			{
				label: '配列に値を追加 append',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: '${1:変数配列} に ${2:値} を追加する',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '配列に値を追加(append)'
			},
			{
				label: '配列に配列を連結 extend concat',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: '${1:変数配列} に ${2:配列} を連結する',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '配列と配列を連結(extend)'
			},
			{
				label: '配列に値が含まれるか in includes',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: '${1:配列} の中に ${2:値}',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: '配列に値が含まれるか(in)'
			}
		)
	}

	suggestions.push(
		{
			label: 'True',
			kind: monaco.languages.CompletionItemKind.Constant,
			insertText: 'True',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			documentation: 'True'
		},
		{
			label: 'False',
			kind: monaco.languages.CompletionItemKind.Constant,
			insertText: 'False',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			documentation: 'False'
		},
	)
	const vars = getPyPenVars(text)
	console.log(vars)
	vars.forEach(v => {
		suggestions.push(
			{
				label: v,
				kind: monaco.languages.CompletionItemKind.Variable,
				insertText: v,
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: v
			}
		)
	})
	return { suggestions }
}

export const pyPenLanguageConfiguration = {
	brackets: [['(', ')'], ['[', ']'], ['{', '}']],
	autoClosingPairs: [
		{ open: '(', close: ')' },
		{ open: '[', close: ']' },
		{ open: '{', close: '}' },
		{ open: '"', close: '"' }
	],
	surroundingPairs: [
		{ open: '(', close: ')' },
		{ open: '[', close: ']' },
		{ open: '{', close: '}' },
		{ open: '"', close: '"' }
	],
	comments: { lineComment: '#' },
	indentationRules: {
		increaseIndentPattern: /：\s*$/,
	}
}

export const pyPenTokenizer = {
	root: [
		[/#.*$/, 'comment'],
		[/".*?"/, 'string'],
		[/(もし|ならば|そうでなくもし|そうでなければ|の間|を|から|まで|ずつ増やしながら|ずつ減らしながら|の要素|について繰り返す|関数|を連結する|を追加する|を返す|繰り返しを抜ける)/, 'keyword'],
		[/\b(True|False)\b/, 'constant'],
		[/\b\d+(\.\d+)?\b/, 'number'],
		[/[a-zA-Z_]\w*/, 'identifier'],
	]
}
