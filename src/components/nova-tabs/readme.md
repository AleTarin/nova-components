# nova-tabs



<!-- Auto Generated Below -->


## How do I do? (HTML Markup)

```html
<nova-tabs></nova-tabs>
```
---------------------------------------

## SEND JSON AS PROP

```javascript
fetch('./assets/tabs.json')
            .then(function (response) {
                //transforme to json
                return response.json();
            })
            .then(function (json) {
                    //send json as prop
                const tabsInfo = document.querySelector("nova-tabs");
                tabsInfo.datajson = json.data;
    

      
                              
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });

```


---------------------------------------


## JSON DATA MODEL

```json
{   
    "data": {
        "items":[{
                "title":"Tab 1",
                "icon":"address-book",
                "enableTab":true,                
                "closableTab": true,
                "content":"<p>Content of Tab Pane 1</p>"  

        }      

        ]
    },
    "configuration": {
        "defaultActiveKey": 0,
        "tabPosition": "top",
        "tabType": "line"
    }
}

```
-------------------------------------


## Properties

| Property               | Attribute                | Description | Type     | Default     |
| ---------------------- | ------------------------ | ----------- | -------- | ----------- |
| `datajson`             | `datajson`               |             | `any[]`  | `json`      |
| `confjson`             | `confjson`               |             | `any`    | `undefinded`|
| `updater`              | `updater`                |             | `boolean`| `true`      |

---------------------------------------
## Elements

| Event           | Description | Type                |
| --------------- | ----------- | ------------------- |
| `el`            |             | `HTMLElement`       |

## States

| Property               | Attribute                | Description | Type     | Default     |
| ---------------------- | ------------------------ | ----------- | -------- | ----------- |
| `activeKey`            | `activeKey`              |             | `number` | `undefinded`|
| `tabType`              | `tabType`                |             | `string` | `undefinded`|
| `tabPosition`          | `tabPosition`            |             | `string` | `undefinded`|
| `onEditCallBack`       | `onEditCallBack`         |             | `any`    | `undefinded`|
| `onClickCallBack`      | `onClickCallBack`        |             | `any`    | `undefinded`|





----------------------------------------------

## Methods

```javascript

@Method()
  async openTab(keyIndex, event?: UIEvent) {
    this.activeKey = keyIndex;
    this.onClickCallback && this.onClickCallback(keyIndex, event);
    this.updater = !this.updater
}

```
### Parameters

| Name        | Type  | Description |
| ----------- | ----- | ----------- |
| `keyIndex`  | `number`|             |
| `event`     | `UIEvent` |             |


### Return

Type: `void`

----------------------------------------

```javascript

@Method()
  async closeTab(index: number){
    this.datajson.items.splice(index, 1);
    this.onEditCallback && this.onEditCallback(index, 'close');
    this.updater = !this.updater
    
  }

```
### Parameters

| Name        | Type  | Description |
| ----------- | ----- | ----------- |
| `index`     | `number` |             |


### Return

Type: `void`

---------------------------------------------

```javascript
 @Method() 
  async addTab(tabData: any) {
    this.datajson.items.push(tabData);
    this.onEditCallback && this.onEditCallback(this.datajson.items.length, 'add');
    this.updater = !this.updater

```
### Parameters

| Name        | Type  | Description |
| ----------- | ----- | ----------- |
| `tabData`   | `any` |             |


### Return

Type: `void`

---------------------------------------------------

```javascript
 @Method()
  async onEdit(callback: Function){
    // this.onEditCallback(keyIndex, eventName: 'close' | 'add')
    this.onEditCallback = callback;
  }

```
### Parameters

| Name        | Type  | Description |
| ----------- | ----- | ----------- |
| `callback`  | `function` |        |


### Return

Type: `void`

------------------------------------------------------

```javascript
 @Method()
  async onTabClick(callback: Function){
    // this.onClickCallback(keyIndex, event)
    this.onClickCallback = callback;
  }

```
### Parameters

| Name        | Type  | Description |
| ----------- | ----- | ----------- |
| `callback`  | `function` |        |


### Return

Type: `void`