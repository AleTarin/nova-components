# nova-tabs



<!-- Auto Generated Below -->


# How do I do? (HTML Markup)

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
                "title":"Tab name",
                "icon":"url icon",
                "enableTab":true/false,
                "default":"defaultOpen",
                "content":"tab content",
                "function":"function nameFunction(){ code ...}",
                "nameFunction":"nameFunction()"    

        }      

        ]
    }
}

```
-------------------------------------

## PROPERTIES.

***none***


----------------------------------------------

*Creado por Armando Aguiar y Arturo Rojas*
