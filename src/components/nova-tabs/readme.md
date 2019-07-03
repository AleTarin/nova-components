# nova-tabs



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute  | Description | Type                                                                                    | Default                                                                                                                                                                |
| ------------ | ---------- | ----------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `confjson`   | `confjson` |             | `any`                                                                                   | `undefined`                                                                                                                                                            |
| `datajson`   | --         |             | `{ items: any[]; }`                                                                     | `undefined`                                                                                                                                                            |
| `newTabData` | --         |             | `{ title: string; icon: string; enable: boolean; closable: boolean; content: string; }` | `{     title: "New tab",     icon: "plus-square",     enable: true,     closable: false,     content: "<p>Content of NewTab Pane</p><p>This is an added tab.</p>"   }` |
| `updater`    | `updater`  |             | `boolean`                                                                               | `true`                                                                                                                                                                 |


## Methods

### `addTab(tabData: any) => Promise<void>`

addTab

#### Returns

Type: `Promise<void>`



### `closeTab(keyIndex: number) => Promise<void>`

closeTab

#### Returns

Type: `Promise<void>`



### `onEdit(callback: Function) => Promise<void>`

onEdit

#### Returns

Type: `Promise<void>`



### `onTabClick(callback: Function) => Promise<void>`

onTabClick

#### Returns

Type: `Promise<void>`



### `openTab(keyIndex: any, event?: UIEvent) => Promise<void>`

openTab

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [nova-icon](..\..\atoms\nova-icon)

### Graph
```mermaid
graph TD;
  nova-tabs --> nova-icon
  style nova-tabs fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
