import { Component, Prop,h} from "@stencil/core";

@Component({
    tag: 'nova-tabs',
    styleUrl: 'my-component.css',
    shadow: true
})

export class NovaTabs {
  
  @Prop() data : string[] = [];
  @Prop() datajson :string = `{   
    "items":[{
            "title":"Merida",
            "icon":"",
            "enableTab":true,
            "default":true,
            "content":"Esta ciudad es la capital del estado de yucatan"      

    },
    {
            "title":"Monterrey",
            "icon":"",
            "enableTab":true,
            "default":false,
            "content":"Esta ciudad es la capital del estado de nuevo leon"
    },

    {
            "title":"Campeche",
            "icon":"",
            "enableTab":true,
            "default":false,
            "content":"Esta ciudad es la capital del estado de campeche"

    },

    {
            "title":"HTML de PRUEBA",
            "icon":"",
            "enableTab":true,
            "default":false,
            "content":"<h2>Soy un titulo bien sexy ðŸ˜›</h2>"
    },

    {
            "title":"Zacatecas",
            "icon":"",
            "enableTab":true,
            "default":false,
            "content":"Esta ciudad es la capital del estado de zacatecas"

    }

    ]
  }`
  ;
  
  componentWillLoad(){
    var parsedjson = JSON.parse(this.datajson)
    parsedjson.items.forEach(function (value){
      console.log(value.title);
    });
    console.log(parsedjson.items.length)
  }
  /*
  private _openTab() {
    
  }*/

  render() {
    return(<slot></slot>)
  
  }
}