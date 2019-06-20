import { Component, Prop,h,Element,State} from "@stencil/core";

/**
 * JSdocs
 * @author Arturo & Armando
 */
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


/**
  * @description funcion que se encarga de mostrar el contenido de una pestaña cuando se le da click,
  * carga el css y ejecuta el script al hacer click en el boton(en caso de mandar codigo)
  * @param {string} cityName (nombre de la tab), nombre(nombre de la funcion), funcion(funcion mandada desde el json)
  * 
*/
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

/** 
  @description funcion que se encarga de cerrar la pestaña elegida, se elimina la pestaña entera asi como
  el contenido de la misma
*/
closeTab(){
  this.activeContent = null;
}
 
  render() {
    return[  
      /*
        se genera el html necesario que hace los botones de las pestañas, se manda a llamar la funcion openTab
        y poner iconos en caso de existir.
      */
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
      /*
        se genera el html necesario que hace los botones de las pestañas, se manda a llamar la funcion openTab
        y poner iconos en caso de existir.
      */      
     this.activeContent && <div id={this.activeContent.title} class="tabcontent">
        <span onClick={() => this.closeTab()} class="topright">x</span>
        <h3>{this.activeContent.title}</h3>
        <p>{this.activeContent.content}</p>          
      </div>
    ]
  }
}