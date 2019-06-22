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
  @State() activeKey: number = 0;

  @Prop() funcion:string;
  @Prop() nombreFuncion:string;


/**
  * @description funcion que se encarga de mostrar el contenido de una pestaña cuando se le da click,
  * carga el css y ejecuta el script al hacer click en el boton(en caso de mandar codigo)
  * @param {string} cityName (nombre de la tab), nombre(nombre de la funcion), funcion(funcion mandada desde el json)
  * 
*/
 openTab(keyIndex, nombre, funcion) {
  this.activeKey = keyIndex;
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
closeTab(index){
  console.log("closd")
}

componentWillLoad(){

}
 
  render() {
    return[  
      /*
        se genera el html necesario que hace los botones de las pestañas, se manda a llamar la funcion openTab
        y poner iconos en caso de existir.
      */
      <div id="tab_container" class="tab">
        { this.datajson && this.datajson.items.map((tabButton, index)=> 
          <button 
            id={(index)}
            
            class={this.activeKey === index ? "active" : ""}
            onClick={() => this.openTab(index,tabButton.nameFunction,tabButton.function)} 
            disabled={!tabButton.enableTab}>
            <span> 
              <nova-icon name={tabButton.icon} />
              {tabButton.title}
              <span onClick={() => this.closeTab(index)} class= "closeButton"> X </span>
            </span>
          </button>    
        )}
      </div>,      
      /*
        se genera el html necesario que hace los botones de las pestañas, se manda a llamar la funcion openTab
        y poner iconos en caso de existir.
      */      
     <div id="tabcontent_container" class="tabcontent">
        { this.datajson && this.datajson.items.map((tabContent, index)=> 
      <div id={(index)}  class={this.activeKey === index ? "active" : ""} innerHTML={tabContent.content}/>
        )}
    </div>
    ]
  }
}