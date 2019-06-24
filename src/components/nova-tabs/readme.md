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
                    "icon":"",
                    "enable":true,                
                    "closable": true,
                    "content":"<p>Content of Tab Pane 1</p><p>This is the default active tab.</p>"  
    
            }            
    
            ]
        },
    
        "configuration": {
            "defaultActiveKey": 0,
            "tabPosition": "horizontal",
            "tabType": "line",
            "addTab": true
          },
    
        "styling": {
            
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
| `newTabData`           | `newTabData`             |             | `any[]`  | `"title":"New tab",
                                                                                "icon":"plus-square",
                                                                                "enable":true,
                                                                                "addTab":true,
                                                                                "content":"<p>Content of NewTab Pane</p><p>This is an added tab.</p>"`      |

---------------------------------------
## Elements

| Event           | Description | Type                |
| --------------- | ----------- | ------------------- |
| `el`            |             | `HTMLElement`       |

## States

| Property               | Attribute                | Description | Type     | Default     |
| ---------------------- | ------------------------ | ----------- | -------- | ----------- |
| `activeKey`            | `activeKey`              |             | `number` | `0`          |
| `tabType`              | `tabType`                |             | `string` | `undefinded`|
| `tabPosition`          | `tabPosition`            |             | `string` | `undefinded`|
| `onEditCallBack`       | `onEditCallBack`         |             | `any`    | `undefinded`|
| `onClickCallBack`      | `onClickCallBack`        |             | `any`    | `undefinded`|





----------------------------------------------

## Methods

```javascript
/**
   * openTab
   * @description Public API method to open a Tab and display its content.
   * @param keyIndex index to identify which tab was clicked
   * @param event event that triggered the call
   * @async
   */
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

/**
   * closeTab
   * @description Public API method to close a selected tab
   * @param index index to identify which tab was clicked
   * @async
   */
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
/**
   * addTab
   * @description Public API method to add a new Tab with preconfigured content.
   * @param tabData struct from where the tab content is read
   * @async
   */
  @Method() 
  async addTab(tabData: any) {
    this.datajson.items.push(tabData);
    this.onEditCallback && this.onEditCallback(this.datajson.items.length, 'add');
    this.updater = !this.updater

  }

```
### Parameters

| Name        | Type  | Description |
| ----------- | ----- | ----------- |
| `tabData`   | `any` |             |


### Return

Type: `void`

---------------------------------------------------

```javascript
 /**
   * onEdit
   * @description Set fired callback when an edit is performed on the component
   * @param callback callback sended with the Public API
   * @async
   * @callback
   */
  @Method()
  async onEdit(callback: Function){
    this.onEditCallback = callback;
  }

```
### Parameters

| Name        | Type  | Description |
| ----------- | ----- | ----------- |
| `callback`  | `Function` |        |


### Return

Type: `void`

------------------------------------------------------

```javascript
/**
   * onTabClick
   * @description Set fired callback when a click is performed on the tab
   * @param callback callback sended with the Public API
   * @async
   * @callback
   */
  @Method()
  async onTabClick(callback: Function){
    // this.onClickCallback(keyIndex, event)
    this.onClickCallback = callback;
  }

```
### Parameters

| Name        | Type  | Description |
| ----------- | ----- | ----------- |
| `callback`  | `Function` |        |


### Return

Type: `void`