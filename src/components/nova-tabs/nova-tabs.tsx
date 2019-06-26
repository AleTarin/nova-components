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

  //Props
  @Prop({mutable: true}) datajson: {
    items: any[];};
  @Prop({mutable: true}) confjson: any;
  @Prop() updater: boolean = true;
  @Prop() newTabData = {
    "title":"New tab",
    "icon":"plus-square",
    "enable":true,
    "closable":false,
    "content":"<p>Content of NewTab Pane</p><p>This is an added tab.</p>"
  }

  @Element() el: HTMLElement;
 
  // States
  @State() event:any;
  @State() activeKey:number = 0;
  @State() tabType: string;
  @State() tabPosition: string;

  // Callbacks
  @State() onEditCallback: any;
  @State() onClickCallback: any;

  /**
   * openTab
   * @description Public API method to open a Tab and display its content.
   * @param keyIndex index to identify which tab was clicked
   * @param event event that triggered the call
   * @async
   */
  @Method()
  async openTab(keyIndex, event?: UIEvent) {
    this.activeKey = keyIndex;
    this.onClickCallback && this.onClickCallback(keyIndex, event);
    this.updater = !this.updater
  }

  /**
   * closeTab
   * @description Public API method to close a selected tab
   * @param index index to identify which tab was clicked
   * @async
   */
  @Method()
  async closeTab(index: number){
    this.datajson.items.splice(index, 1);
    this.onEditCallback && this.onEditCallback(index, 'close');
    this.updater = !this.updater
  }

  /**
   * addTab
   * @description Public API method to add a new Tab with preconfigured content.
   * @param tabData struct from where the tab content is read
   * @async
   */
  @Method() 
  async addTab(tabData: any) {
    this.datajson.items.push(tabData);
    this.onEditCallback && this.onEditCallback(this.datajson.items.length, 'add');
    this.updater = !this.updater

  }

  /**
   * onEdit
   * @description Set fired callback when an edit is performed on the component
   * @param callback callback sended with the Public API
   * @async
   * @callback
   */
  @Method()
  async onEdit(callback: Function){
    this.onEditCallback = callback;
  }

  /**
   * onTabClick
   * @description Set fired callback when a click is performed on the tab
   * @param callback callback sended with the Public API
   * @async
   * @callback
   */
  @Method()
  async onTabClick(callback: Function){
    // this.onClickCallback(keyIndex, event)
    this.onClickCallback = callback;
  }
 
  componentDidUpdate(){
    //Properties assignments from json configuration
    this.tabType = this.confjson.tabType;
    if (this.tabType === "card"){
      this.tabPosition = "horizontal";
    }else{
      this.tabPosition = this.confjson.tabPosition;
    }
  }

  render() {
    //HTML shadow DOM render
    return[  
      //Button for adding new tabs. If property addTab is false the button is not displayed.
      <button style={this.confjson.addTab ? {display:'block'}:{display:'none'}} class="addTab addTab_circulo" onClick={() => this.addTab(this.newTabData)}> 
        new tab
      </button>,
      
      //Tab buttons container 
      <div id="tab_container" class={this.tabPosition + " " + this.tabType}>
        { this.datajson && this.datajson.items.map((tabButton, index)=> 
          //Tab creation from json data
          <button
            class={this.activeKey === index ? this.tabPosition + " " + this.tabType + " active" : this.tabPosition + " " + this.tabType}
            onClick={event => this.openTab(index, event)} 
            disabled={!tabButton.enable}>
            <span> 
              <nova-icon name={tabButton.icon} />
              {tabButton.title}
              {tabButton.closable ? 
              <span onClick={() => this.closeTab(index)} class="closeTab"> X </span> : ""}
            </span>
          </button>    
        )}
      </div>, 

    //Tab panes container
    this.datajson && this.datajson.items.map((tabContent, index)=> 
      <div class={this.activeKey === index ? this.tabPosition + " tabcontent_container active" : this.tabPosition + " tabcontent_container"} innerHTML={tabContent.content}/>
        )
    ]
  }
}