import { Component, Prop,h} from "@stencil/core";

@Component({
    tag: 'nova-tabs',
    styleUrl: 'my-component.css',
    shadow: true
})

export class NovaTabs {
  
  
  @Prop() datajson :string;
 
  
  
  componentWillLoad(){
    var parsedjson = JSON.parse(this.datajson);
    parsedjson.items.forEach(function (value){
      console.log(value.title);
    });
   
  }
  /*
  private _openTab() {
    
  }*/

  render() {
    return(<div></div>)
      
    
  
  }
}