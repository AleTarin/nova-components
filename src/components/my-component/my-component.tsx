import { Component, Prop,h,Element} from "@stencil/core";

@Component({
    tag: 'nova-tabs',
    styleUrl: 'my-component.css',
    shadow: true
})

export class NovaTabs {
  
  
  @Prop() datajson :string;
  @Prop() parsedjson : any;
  @Element() el: HTMLElement;
 
 
  
  
/*  componentDidRender(){

    //se obtienen datos del json para generar el contenido de las tabs    
    var arrincona="";
    JSON.parse(this.datajson).items.map((value) =>{

      arrincona += '<div id="' + value.title+ '"' + 'class="tabcontent">'
      +'<h3>' + value.title + '</h3>' 
      +'<p>' +value.content + '</p>' 
      + '</div>';
         
      
      
    });
    this.el.shadowRoot.getElementById('contenido').innerHTML = arrincona;   
   
  }
  */
 
  render() {
    return(<div>
      {JSON.parse(this.datajson).items.map((entra)=>
        //se obtienen datos del json para generar el contenido de las tabs 
        <div id={entra.title} class="tabcontent">
          <h3>{entra.title}</h3>
          <p>{entra.content}</p>
        </div>
        
      )}
    </div>
    
    )
      
    
  
  }
}