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
| `tabType`              | `tabType`                |             | `string` | `undefinded`|




----------------------------------------------

## Functions

```javascript

openTab(tab, nombre, funcion) {

        //code...

}

```
### Parameters

| Name        | Type  | Description |
| ----------- | ----- | ----------- |
| `tab`       | `string` |             |
| `nombre`    | `string` |             |
| `funcion`    | `string` |             |

### Return

Type: `none`

----------------------------------------

```javascript

closeTab()
{
        //code...
}

```
### Parameters

| Name        | Type  | Description |
| ----------- | ----- | ----------- |
| `--`       | `--` |             |


### Return

Type: `none`

---------------------------------------------
