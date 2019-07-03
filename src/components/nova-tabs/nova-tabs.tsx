import {Component, Prop,h, Element, State, Method} from "@stencil/core";

/**
 * JSdocs
 * @author Arturo & Armando
 */
@Component({
  tag: "nova-tabs",
  styleUrl: "nova-tabs.scss",
  shadow: true
})
export class NovaTabs {
  //Props
  @Prop({ mutable: true }) datajson: {
    items: any[];
  };
  @Prop({ mutable: true }) confjson: any;
  @Prop() updater: boolean = true;
  @Prop() newTabData = {
    title: "New tab",
    icon: "plus-square",
    enable: true,
    closable: false,
    content: "<p>Content of NewTab Pane</p><p>This is an added tab.</p>"
  };

  @Element() el: HTMLElement;

  // States
  @State() event: any;
  @State() activeKey: number = 0;
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
    this.updater = !this.updater;
  }

  /**
   * closeTab
   * @description Public API method to close a selected tab
   * @param keyIndex index to identify which tab was clicked
   * @async
   */
  @Method()
  async closeTab(keyIndex: number){
    this.datajson.items.splice(keyIndex, 1);
    this.onEditCallback && this.onEditCallback(keyIndex, 'close');
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
    this.onEditCallback &&
      this.onEditCallback(this.datajson.items.length, "add");
    this.updater = !this.updater;
  }

  /**
   * onEdit
   * @description Set fired callback when an edit is performed on the component
   * @param callback callback sended with the Public API
   * @async
   * @callback
   */
  @Method()
  async onEdit(callback: Function) {
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
  async onTabClick(callback: Function) {
    // this.onClickCallback(keyIndex, event)
    this.onClickCallback = callback;
  }
 
  componentDidUpdate(){
    //Properties assignments from configure data
    this.tabType = this.confjson.tabType;
    if (this.tabType === "card") {
      this.tabPosition = "horizontal";
    } else {
      this.tabPosition = this.confjson.tabPosition;
    }
  }

  render() {
    //HTML shadow DOM render
    return [
      //Button for adding new tabs. If property addTab is false the button is not displayed.
      <button
        style={
          this.confjson && this.confjson.addTab ? { display: "block" } : { display: "none" }
        }
        class="addTab addTab_circulo"
        onClick={() => this.addTab(this.newTabData)}
      >
        new tab
      </button>,

      //Tab buttons container
      <div class="tab_container">
        {this.datajson &&
          this.datajson.items.map((tabButton, index) => (
            //Tab creation from json data
            [<div
              id={"bt_" + String(index)}
              class={`tab_button ${this.activeKey === index ? " active" : ""} ${this.tabPosition === "horizontal" ? " horizontal" : " vertical"} `}  
              onClick={event => this.openTab(index, event)}>
              <span>
                <nova-icon name={tabButton.icon} />
                {tabButton.title}
                <span onClick={() => this.closeTab(index)} class="closeTab" style={tabButton.closable ? {display: "in-line block"} : {display: "none"}}>X</span>
              </span>
              </div>,
              <div 
                id={"pn_" + String(index)}
                class={`tab_pane ${this.activeKey === index ? " active" : ""}`}
                innerHTML={tabButton.content}>
              </div>]
           
          ))}
      </div>,
      <div class="deadspace"/>
    ]};
}
