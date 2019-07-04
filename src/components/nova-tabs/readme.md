# nova-tabs



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                     | Type                         | Default        |
| ------------- | -------------- | ------------------------------------------------------------------------------- | ---------------------------- | -------------- |
| `addButton`   | `add-button`   | Enables a button to add a new tabs to the list. Remove property to hide button. | `boolean`                    | `false`        |
| `default`     | `default`      | Default initial active Tab index. Index range starts from 0.                    | `number`                     | `0`            |
| `defaultTag`  | `default-tag`  | Default tag string of new created tabs                                          | `string`                     | `"div"`        |
| `defaultText` | `default-text` | Default pane content of new created tabs                                        | `string`                     | `"tab"`        |
| `jsprefix`    | `jsprefix`     | JS prefix                                                                       | `string`                     | `"nova"`       |
| `limit`       | `limit`        | Maximum number of open tabs                                                     | `number`                     | `9`            |
| `position`    | `position`     | Orientation of tabs.                                                            | `"horizontal" \| "vertical"` | `"horizontal"` |
| `type`        | `type`         | Basic style of tabs. 'Card' style will default position property to horizontal. | `"card" \| "line"`           | `"line"`       |
| `updater`     | `updater`      | Used to force update on the render. No value.                                   | `boolean`                    | `true`         |


## Methods

### `addTab(tabNode?: Node, panelNode?: Node) => Promise<void>`

addTab

#### Returns

Type: `Promise<void>`



### `closeTab(keyIndex: number) => Promise<void>`

closeTab

#### Returns

Type: `Promise<void>`



### `onEdit(callback: any) => Promise<void>`

onEdit

#### Returns

Type: `Promise<void>`



### `onTabClick(callback: any) => Promise<void>`

onTabClick

#### Returns

Type: `Promise<void>`



### `openTab(keyIndex: any, event?: UIEvent) => Promise<void>`

openTab

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
