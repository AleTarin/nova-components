import { Component, Prop,h,Element,State} from "@stencil/core";


@Component({
    tag: 'nova-tabs',
    styleUrl: 'nova-tabs.css',
    shadow: true
})

export class NovaTabs {
  
  @Prop() datajson :any;
  @Element() el: HTMLElement;
  @State() event:any;
  @State() activeContent: any = null;

  @Prop() styleVertical:string = 'verticalTab.css'
  @Prop() funcion:string;
  @Prop() nombreFuncion:string;

 openTab(tabIndex, nombre, funcion) {
  this.activeContent = this.datajson.items[tabIndex];
  this.nombreFuncion = nombre;
  this.funcion = funcion;

  if(this.funcion != "" && this.nombreFuncion!='')
  {
    var btn = document.createElement("script");   // Create a <button> element
    btn.innerHTML = this.funcion + this.nombreFuncion;                 // Insert text
    document.body.appendChild(btn);
  } 
} 

closeTab(){
  this.activeContent = null;
}
 
  render() {
    return[  
      //se generan los onclicks
      <div id="div_tab" class="tab">
        { this.datajson && this.datajson.items.map((entra, index)=> 
          <button 
            id={entra.default}
            class="tablinks"
            onClick={() => this.openTab(index,entra.nameFunction,entra.function)} 
            disabled={!entra.enableTab}> 
            <img src={entra.icon}/>
            {entra.title}
          </button>)      
        }
      </div>,      
      //se obtienen datos del json para generar el contenido de las tabs 
      this.activeContent && <div id={this.activeContent.title} class="tabcontent">
        <span onClick={() => this.closeTab()} class="topright">x</span>
        <h3>{this.activeContent.title}</h3>
        <p>{this.activeContent.content}</p>          
      </div>
    ]
  }
}