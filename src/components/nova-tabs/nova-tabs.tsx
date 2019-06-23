import { Component, Prop,h,Element,State, Method} from "@stencil/core";

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
  
  @Prop({mutable: true}) datajson: {
    items: any[];
  };
  @Prop({mutable: true}) confjson: any;
  @Element() el: HTMLElement;
  @State() event:any;
  /** 
   * States used to manage component properties and Callback functions.
  */
  @State() activeKey:number = 0;
  @State() tabType: string;
  @State() tabPosition: string;
  @State() onEditCallback: any;
  @State() onClickCallback: any;

  @Prop() updater: boolean = true;
  @Prop() funcion:string;
  @Prop() nombreFuncion:string;

  /**
    * @description funcion que se encarga de mostrar el contenido de una pestaña cuando se le da click,
    * carga el css y ejecuta el script al hacer click en el boton(en caso de mandar codigo) 
    * 
  */
  @Method()
  async openTab(keyIndex, event?: UIEvent) {
    this.activeKey = keyIndex;
    this.onClickCallback && this.onClickCallback(keyIndex, event);
    this.updater = !this.updater
  }

  /** 
    @description funcion que se encarga de cerrar la pestaña elegida, se elimina la pestaña entera asi como
    el contenido de la misma
  */

  @Method()
  async closeTab(index: number){
    this.datajson.items.splice(index, 1);
    this.onEditCallback && this.onEditCallback(index, 'close');
    this.updater = !this.updater
    
  }

  /** 
    @description funcion que se encarga de abrir nuevas pestañas.
  */
  @Method() 
  async addTab(tabData: any) {
    this.datajson.items.push(tabData);
    this.onEditCallback && this.onEditCallback(this.datajson.items.length, 'add');
    this.updater = !this.updater

  }

  /*
    @description funcion que se encarga de editar la tab
  */

  @Method()
  async onEdit(callback: Function){
    // this.onEditCallback(keyIndex, eventName: 'close' | 'add')
    this.onEditCallback = callback;
  }

  /* 
    funcion que se ebcarga de ejecutar una funcion cuando se da click en la tab
  */
  @Method()
  async onTabClick(callback: Function){
    // this.onClickCallback(keyIndex, event)
    this.onClickCallback = callback;
  }
 
  componentDidUpdate(){
    this.tabType = this.confjson.tabType;
    if (this.tabType === "card"){
      this.tabPosition = "horizontal";
    }else{
      this.tabPosition = this.confjson.tabPosition;
    }
  }

  render() {
    return[  
      /*
        se genera el html necesario que hace los botones de las pestañas, se manda a llamar la funcion openTab
        y poner iconos en caso de existir.
      */
     
      <button class="addTab addTab_circulo" onClick={() => this.addTab({
        "title":"New tab",
        "icon":"address-book",
        "enableTab":true,
        "content":"<p>New Tab</p>"
      })}> new tab
      </button>,
      
      <div id="tab_container" class={this.tabPosition + " " + this.tabType}>
        { this.datajson && this.datajson.items.map((tabButton, index)=> 
          <button
            class={this.activeKey === index ? this.tabPosition + " " + this.tabType + " active" : this.tabPosition + " " + this.tabType}
            
            onClick={event => this.openTab(index, event)} 
            disabled={!tabButton.enableTab}>
            <span> 
              <nova-icon name={tabButton.icon} />
              {tabButton.title}
              <span onClick={() => this.closeTab(index)} class= "closeTab"> X </span>
            </span>
          </button>    
        )}
      </div>, 

      /*
        se genera el html necesario que hace los botones de las pestañas, se manda a llamar la funcion openTab
        y poner iconos en caso de existir.
      */      
     <div id="tabcontent_container" class={this.tabPosition + " " + this.tabType}>
        { this.datajson && this.datajson.items.map((tabContent, index)=> 
      <div class={this.activeKey === index ? this.tabPosition + " active" : this.tabPosition} innerHTML={tabContent.content}/>
        )}
    </div>
    ]
  }
}