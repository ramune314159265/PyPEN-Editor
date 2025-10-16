import { atom, useAtom } from 'jotai'

export const layoutAtom = atom(localStorage.getItem('ramune314159265.pypeneditor.layout') === null ? {
	global: {
		tabSetEnableSingleTabStretch: true,
		tabEnableClose: false,
		tabSetEnableClose: false
	},
	borders: [],
	layout: {
		type: 'row',
		id: '1',
		children: [
			{
				"type": "row",
				"id": "#5e34abe9-5513-4a6b-b62a-98476b278309",
				"children": [
					{
						type: 'row',
						weight: 70,
						children: [
							{
								type: 'tabset',
								weight: 50,
								children: [
									{
										type: 'tab',
										name: 'PyPEN',
										component: 'pypen'
									}
								]
							},
							{
								type: 'tabset',
								weight: 50,
								children: [
									{
										type: 'tab',
										name: 'Python',
										component: 'python',
									}
								]
							}
						]
					},
					{
						type: 'tabset',
						weight: 30,
						children: [
							{
								type: 'tab',
								name: '出力',
								component: 'console',
							}
						]
					}
				]
			}
		]
	},
	popouts: {}
} : JSON.parse(localStorage.getItem('ramune314159265.pypeneditor.layout')))

export const useLayout = () => {
	const [layout, setLayout] = useAtom(layoutAtom)

	const saveLayout = data => {
		localStorage.setItem('ramune314159265.pypeneditor.layout', JSON.stringify(data))
	}

	return [layout, { setLayout, saveLayout }]
}
