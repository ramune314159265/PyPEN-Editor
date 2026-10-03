import * as monaco from 'monaco-editor'

const statements = [
	{
		label: 'print() 表示',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: '表示する(${1:値})',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '値を表示する',
		sortText: 'print() 1'
	},
	{
		label: 'print() 改行なしで表示',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: '改行無しで表示する(${1:値})',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '値を改行なしで表示する'
	},
	{
		label: 'int(input()) 整数入力',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: '${1:変数名} に整数を入力する',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '変数に整数を入力する'
	},
	{
		label: 'float(input()) 実数入力',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: '${1:変数名} に実数を入力する',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '変数に実数を入力する'
	},
	{
		label: 'input() 文字列入力',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: '${1:変数名} に文字列を入力する',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '変数に文字列を入力する'
	},
	{
		label: 'bool(input()) 真偽入力',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: '${1:変数名} に真偽を入力する',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '変数に真偽を入力する'
	},
	{
		label: 'if もし',
		kind: monaco.languages.CompletionItemKind.Keyword,
		insertText: 'もし ${1:条件式} ならば：\n\t',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '条件分岐(if)'
	},
	{
		label: 'else if そうでなくもし',
		kind: monaco.languages.CompletionItemKind.Keyword,
		insertText: 'そうでなくもし ${1:条件式} ならば：\n\t',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '条件分岐(else if)'
	},
	{
		label: 'else そうでなければ',
		kind: monaco.languages.CompletionItemKind.Keyword,
		insertText: 'そうでなければ：\n\t',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '条件分岐(else)'
	},
	{
		label: 'while ～の間',
		kind: monaco.languages.CompletionItemKind.Keyword,
		insertText: '${1:条件式} の間：\n\t',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: 'ループ(while)'
	},
	{
		label: 'for 増やしながら',
		kind: monaco.languages.CompletionItemKind.Keyword,
		insertText: '${1:変数名} を ${2:数値} から ${3:数値} まで ${4:数値} ずつ増やしながら：\n\t',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: 'ループ(for)'
	},
	{
		label: 'for 減らしながら',
		kind: monaco.languages.CompletionItemKind.Keyword,
		insertText: '${1:変数名} を ${2:数値} から ${3:数値} まで ${4:数値} ずつ減らしながら：\n\t',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: 'ループ(for)'
	},
	{
		label: 'for in 配列の要素を取り出しながら',
		kind: monaco.languages.CompletionItemKind.Keyword,
		insertText: '${1:配列} の要素 ${2:変数名} について繰り返す：\n\t',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: 'ループ(for in)'
	},
	{
		label: 'break 繰り返しを抜ける',
		kind: monaco.languages.CompletionItemKind.Keyword,
		insertText: '繰り返しを抜ける',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '繰り返しを抜ける(break)'
	},
	{
		label: 'def function 関数定義',
		kind: monaco.languages.CompletionItemKind.Keyword,
		insertText: '関数 ${1:関数名}(${2:引数})：\n\t',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '関数定義(def)'
	},
	{
		label: 'return 値を返す',
		kind: monaco.languages.CompletionItemKind.Keyword,
		insertText: '${1:値} を返す',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '値を返す(return)'
	},
	{
		label: 'append 配列に値を追加',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: '${1:変数配列} に ${2:値} を追加する',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '配列に値を追加(append)'
	},
	{
		label: 'extend concat 配列に配列を連結',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: '${1:変数配列} に ${2:配列} を連結する',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '配列と配列を連結(extend)'
	},
	{
		label: 'in includes 配列に値が含まれるか',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: '${1:配列} の中に ${2:値}',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: '配列に値が含まれるか(in)'
	}
]

const buildInFuncs = [
	{
		"label": "abs(値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "abs(${1:値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "絶対値\n例: abs(-3)→3"
	},
	{
		"label": "random()",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "random()",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "実数の乱数\n例: random()→0以上1未満の乱数（実数）"
	},
	{
		"label": "random(整数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "random(${1:整数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "整数の乱数\n例: random(5)→0以上5以下の乱数（整数）"
	},
	{
		"label": "ceil(実数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "ceil(${1:実数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "小数部分切り上げ\n例: ceil(3.14)→4"
	},
	{
		"label": "floor(実数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "floor(${1:実数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "小数部分切り捨て\n例: floor(3.14)→3"
	},
	{
		"label": "round(実数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "round(${1:実数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "小数部分四捨五入\n例: round(3.14)→3"
	},
	{
		"label": "sin(実数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "sin(${1:実数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "三角関数のサイン（単位はラジアン）\n例: sin(0)→0"
	},
	{
		"label": "cos(実数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "cos(${1:実数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "三角関数のコサイン（単位はラジアン）\n例: cos(0)→1"
	},
	{
		"label": "tan(実数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "tan(${1:実数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "三角関数のタンジェント（単位はラジアン）\n例: tan(0)→0"
	},
	{
		"label": "asin(実数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "asin(${1:実数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "逆三角関数のアークサイン（単位はラジアン）\n例: asin(1)→1.5707963267948966"
	},
	{
		"label": "acos(実数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "acos(${1:実数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "逆三角関数のアークコサイン（単位はラジアン）\n例: acos(0)→1.5707963267948966"
	},
	{
		"label": "atan(実数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "atan(${1:実数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "逆三角関数のアークタンジェント（単位はラジアン）\n例: atan(1)→0.7853981633974483"
	},
	{
		"label": "atan2(実数, 実数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "atan2(${1:実数}, ${2:実数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "逆三角関数のアークタンジェント（単位はラジアン）\n例: atan(1,0)→1.5707963267948966"
	},
	{
		"label": "sqrt(実数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "sqrt(${1:実数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "ルート\n例: sqrt(2)→1.414…"
	},
	{
		"label": "log(実数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "log(${1:実数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "自然対数\n例: log(10)→2.302…"
	},
	{
		"label": "exp(実数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "exp(${1:実数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "指数関数（底は自然対数の底）\n例: exp(1)→2.718…"
	},
	{
		"label": "pow(実数, 実数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "pow(${1:実数}, ${2:実数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "累乗\n例: pow(2,3)→8"
	},
	{
		"label": "length(文字列)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "length(${1:文字列})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "文字列の長さ（文字数）\n例: length(\"こんにちは\")→5"
	},
	{
		"label": "length(リスト)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "length(${1:リスト})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "リストの長さ\n例: length([1,2,3,4,5])→5"
	},
	{
		"label": "append(文字列, 文字列)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "append(${1:文字列}, ${2:文字列})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "文字列結合\n例: append(\"Wa\",\"PEN\")→\"WaPEN\""
	},
	{
		"label": "substring(文字列, 開始位置)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "substring(${1:文字列}, ${2:開始位置})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "部分文字列（最後まで）\n例: substring(\"こんにちは\",2)→\"にちは\""
	},
	{
		"label": "substring(文字列, 開始位置, 長さ)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "substring(${1:文字列}, ${2:開始位置}, ${3:長さ})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "部分文字列（長さ指定）\n例: substring(\"こんにちは\",2,1)→\"に\""
	},
	{
		"label": "split(文字列)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "split(${1:文字列})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "文字列分割\n例: split(\"abcd\")→[\"a\",\"b,\"c\",\"d\"]（リスト）"
	},
	{
		"label": "split(文字列, 区切文字列)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "split(${1:文字列}, ${2:区切文字列})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "文字列分割\n例: split(\"a:b:c:d\",\":\")→[\"a\",\"b,\"c\",\"d\"]（リスト）"
	},
	{
		"label": "join(文字列, リスト)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "join(${1:文字列}, ${2:リスト})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "文字列結合\n例: join(\"-\", [\"a\",\"b\",\"c\"])→\"a-b-c\""
	},
	{
		"label": "extract(文字列, 区切文字列, 番号)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "extract(${1:文字列}, ${2:区切文字列}, ${3:番号})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "文字列分割（番号指定）\n例: extract(\"a:b:c:d\",\":\",2)→\"c\""
	},
	{
		"label": "insert(文字列, 位置, 文字列)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "insert(${1:文字列}, ${2:位置}, ${3:文字列})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "文字列挿入\n例: insert(\"こんは\",2,\"にち\")→\"こんにちは\""
	},
	{
		"label": "replace(文字列, 位置, 長さ, 文字列)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "replace(${1:文字列}, ${2:位置}, ${3:長さ}, ${4:文字列})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "文字列置換\n例: replace(\"こんにちは\",2,2,\"ばん\")→\"こんばんは\""
	},
	{
		"label": "整数(値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "整数(${1:値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "整数への変換\n例: 整数(3.5)→3，整数(\"3.14\")→3"
	},
	{
		"label": "実数(値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "実数(${1:値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "実数への変換\n例: 実数(3)→3.0，実数(\"3.14\")→3.14"
	},
	{
		"label": "文字列(値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "文字列(${1:値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "文字列への変換\n例: 文字列(3.5)→\"3.5\"，文字列(1=1)→\"true\""
	},
	{
		"label": "真偽(値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "真偽(${1:値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "真偽への変換\n例: 真偽(0)→false，真偽(1)→true"
	},
	{
		"label": "int(値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "int(${1:値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "整数への変換\n例: int(3.5)→3，int(\"3.14\")→3"
	},
	{
		"label": "float(値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "float(${1:値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "実数への変換\n例: float(3)→3.0，float(\"3.14\")→3.14"
	},
	{
		"label": "str(値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "str(${1:値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "文字列への変換\n例: str(3.5)→\"3.5\"，str(1==1)→\"true\""
	},
	{
		"label": "bool(値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "bool(${1:値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "真偽への変換\n例: bool(0)→false，bool(1)→true"
	},
	{
		"label": "pop(リスト)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "pop(${1:リスト})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "リストの末尾を取り出して削除\n例: a=[1,2,3]でpop(a)→3（aは[1,2]になる）"
	},
	{
		"label": "shift(リスト)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "shift(${1:リスト})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "リストの先頭を取り出して削除\n例: a=[1,2,3]でshift(a)→1（aは[2,3]になる）"
	},
	{
		"label": "push(リスト, 値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "push(${1:リスト}, ${2:値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "リストの末尾に値を追加\n例: a=[1,2,3]でpush(a,4)→aは[1,2,3,4]になる"
	},
	{
		"label": "unshift(リスト, 値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "unshift(${1:リスト}, ${2:値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "リストの先頭に値を追加\n例: a=[1,2,3]でunshift(a,4)→aは[4,1,2,3]になる"
	},
	{
		"label": "typeof(値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "typeof(${1:値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "値の型（整数，実数，文字列，真偽，リスト，辞書）\n例: typeof(3)→\"整数\""
	},
	{
		"label": "typeis(値, 型名)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "typeis(${1:値}, ${2:型名})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "値がこの型かどうか\n例: typeis(3,\"実数\")→False"
	},
	{
		"label": "range(値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "range(${1:値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "Pythonのrangeで生成される値のリスト。range(start, stop, step)にも対応\n例: range(3)→[0,1,2]"
	},
	{
		"label": "match(正規表現, 文字列)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "match(${1:正規表現}, ${2:文字列})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "マッチしたらマッチ部分とカッコで一致した部分のリストを返す。マッチしなければ空リスト。\n例: b = match(\"(.*is)\\sis a (.*)\\.\",\"This is a pen.\")→[\"This is a pen.\",\"This is\",\"pen\"]"
	},
	{
		"label": "max(複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "max(${1:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "最大値\n例: max(1,5,3)→5max([1,5,3])→5（他の関数も同様）"
	},
	{
		"label": "min(複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "min(${1:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "最小値\n例: min(1,5,3)→1"
	},
	{
		"label": "median(複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "median(${1:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "中央値\n例: median(1,5,3)→3"
	},
	{
		"label": "sum(複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "sum(${1:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "総和\n例: sum(1,5,3)→9"
	},
	{
		"label": "prod(複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "prod(${1:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "総積\n例: prod(1,5,3)→15"
	},
	{
		"label": "sumprod(複数の値, 複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "sumprod(${1:複数の値}, ${2:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "積の和\n例: sumprod([1,2,3],[4,5,6])→32"
	},
	{
		"label": "factorial(非負整数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "factorial(${1:非負整数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "階乗\n例: factorial(5)→120"
	},
	{
		"label": "comb(非負整数, 非負整数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "comb(${1:非負整数}, ${2:非負整数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "組み合わせ\n例: comb(6, 2)→15"
	},
	{
		"label": "perm(非負整数, 非負整数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "perm(${1:非負整数}, ${2:非負整数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "順列\n例: perm(6, 2)→30"
	},
	{
		"label": "mean(複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "mean(${1:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "平均値\n例: mean(1,5,3)→3.0"
	},
	{
		"label": "average(複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "average(${1:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "平均値\n例: average(1,5,3)→3.0"
	},
	{
		"label": "pvariance(複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "pvariance(${1:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "分散（nでわる）\n例: pvariance(1,3,5)→2.666…"
	},
	{
		"label": "variance(複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "variance(${1:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "分散（n-1でわる）\n例: variance(1,3,5)→4.0"
	},
	{
		"label": "pstdev(複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "pstdev(${1:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "標準偏差（nでわる）\n例: pstdev(1,3,5)→1.632…"
	},
	{
		"label": "etdev(複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "etdev(${1:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "標準偏差（n-1でわる）\n例: stdev(1,3,5)→2.0"
	},
	{
		"label": "pcovariance(複数の値, 複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "pcovariance(${1:複数の値}, ${2:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "共分散（nでわる）\n例: p([1,2,3],[4,5,6])→0.666…"
	},
	{
		"label": "covariance(複数の値, 複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "covariance(${1:複数の値}, ${2:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "共分散（n-1でわる）\n例: p([1,2,3],[4,5,6])→1.0"
	},
	{
		"label": "linear_regression(複数の値, 複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "linear_regression(${1:複数の値}, ${2:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "回帰直線の傾きと切片のリスト\n例: linear_regression([1,2,3],[3,4,6])→[1.5, 1.333…]"
	},
	{
		"label": "dnorm(実数値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "dnorm(${1:実数値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "標準正規分布の確率密度関数の値\n例: dnorm(0)→0.399"
	},
	{
		"label": "pnorm(実数値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "pnorm(${1:実数値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "標準正規分布の累積分布関数の値\n例: pnorm(1.96)→0.975"
	},
	{
		"label": "qnorm(実数値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "qnorm(${1:実数値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "pnormの逆関数\n例: qnorm(0.975)→1.96"
	},
	{
		"label": "correl(複数の値, 複数の値)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "correl(${1:複数の値}, ${2:複数の値})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "相関係数\n例: p([1,2,3],[4,5,6])→1.0"
	},
	{
		"label": "sorted(リスト)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "sorted(${1:リスト})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "ソートしたリストを返す（元のリストはそのまま）\n例: sorted([3,1,2])→[1,2,3]"
	},
	{
		"label": "shuffled(リスト)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "shuffled(${1:リスト})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "シャッフルしたリストを返す（元のリストはそのまま）\n例: shuffled([3,1,2])→[2,3,1]など"
	},
	{
		"label": "reversed(リスト)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "reversed(${1:リスト})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "逆順のリストを返す（元のリストはそのまま）\n例: reversed([3,1,2])→[2,1,3]"
	},
	{
		"label": "next_permutation(リスト)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "next_permutation(${1:リスト})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "辞書順で次の順番の順列（元のリストはそのまま。終了時は空リスト）\n例: next_permutation([1,2,3])→[1,3,2]"
	},
	{
		"label": "ord(文字)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "ord(${1:文字})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "文字に対応する文字コード\n例: ord('情')→24773"
	},
	{
		"label": "chr(整数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "chr(${1:整数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "文字コードに対応する文字\n例: chr(24773)→'情'"
	},
	{
		"label": "gcd(非負整数, 非負整数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "gcd(${1:非負整数}, ${2:非負整数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "最大公約数\n例: gcd(32, 48)→16"
	},
	{
		"label": "lcm(非負整数, 非負整数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "lcm(${1:非負整数}, ${2:非負整数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "最小公倍数\n例: lcm(32, 48)→96"
	},
	{
		"label": "all(リスト)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "all(${1:リスト})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "複数のAND\n例: all(True, True, False)→False"
	},
	{
		"label": "any(リスト)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "any(${1:リスト})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "複数のOR\n例: any(True, True, False)→True"
	},
	{
		"label": "swap(変数, 変数)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "swap(${1:変数}, ${2:変数})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "値を入れ替える\n例: a = 3, b =4のときswap(a, b)→a=4, b = 3"
	},
	{
		"label": "sort(リスト)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "sort(${1:リスト})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "ソートする\n例: a =[3,1,2]でsort(a)→aは[1,2,3]になる"
	},
	{
		"label": "shuffle(リスト)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "shuffle(${1:リスト})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "シャッフルする\n例: a = [3,1,2]でshuffle(a)→aは[2,3,1]など"
	},
	{
		"label": "reverse(リスト)",
		"kind": monaco.languages.CompletionItemKind.Function,
		"insertText": "reverse(${1:リスト})",
		"insertTextRules": monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		"documentation": "逆順にする\n例: a=[3,1,2]でreverse(a)→aは[2,1,3]になる"
	}
]

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
		suggestions.push(...structuredClone(statements))
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
	suggestions.push(...structuredClone(buildInFuncs))
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
