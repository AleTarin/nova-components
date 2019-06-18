import { Component, Prop,h,Element} from "@stencil/core";

@Component({
    tag: 'nova-tabs',
    styleUrl: 'my-component.css',
    shadow: true
})

export class NovaTabs {
  
  
  @Prop() datajson :string;
  @Element() el: HTMLElement;
 
 
  
  
  componentDidRender(){

    //se obtienen datos del json para generar el contenido de las tabs
    var parsedjson = JSON.parse(this.datajson);
    var arrincona="";
    parsedjson.items.map(function (value){

      arrincona += '<div id="' + value.title+ '"' + 'class="tabcontent">'
      +'<h3>' + value.title + '</h3>' 
      +'<p>' +value.content + '</p>' 
      + '</div>';
         
      
      
    });
    this.el.shadowRoot.getElementById('contenido').innerHTML = arrincona;   
   
  }
  /*
  private _openTab() {
    
  }*/

  render() {
    return(<div id="contenido"></div>)
      
    
  
  }
}