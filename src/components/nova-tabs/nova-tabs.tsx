import {Component, Prop,h, Element, State, Method} from "@stencil/core";
import { KEYCODES } from '../../utils/utils';
/**
 * JSdocs
 * @author Arturo & Armando & Tarin
 */
@Component({
  tag: "nova-tabs",
  styleUrls: {
    default: "nova-tabs.default.scss",
    dark: "nova-tabs.dark.scss"
  },
  shadow: true
})
export class NovaTabs {
  //Props
  @Prop({ mutable: true }) confjson: any;
  @Prop() updater: boolean = true;
  @Prop() defaultText: string = "tab";
  @Prop() defaultTag: string = "div";
  @Prop() default: string = null;  
  @Prop() type: string;
  @Prop() position: string = "horizontal";
  @Prop({attribute: 'add-button'}) addButton: boolean = false;

  @Element() el: HTMLElement;
  
  
  // States
  @State() _tabSlot: any[] = [];
  @State() _panelSlot: any[] = [];
  @State() activeKey: number= -1;

  // Callbacks
  @State() onEditCallback = (_index:number, _event: any) => {};
  @State() onClickCallback: (_index:number, _event: any) => {};

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
    this._tabSlot.splice(keyIndex, 1);
    this._panelSlot.splice(keyIndex, 1);
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
  async addTab(tabNode?: Node, panelNode?: Node) {
    this._tabSlot.push(tabNode);
    this._panelSlot.push(panelNode);
    this.onEditCallback && this.onEditCallback(this._tabSlot.length, "add");
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
  async onEdit(callback: any) {
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
  async onTabClick(callback: any) {
    // this.onClickCallback(keyIndex, event)
    this.onClickCallback = callback;
  }
 
  componentDidUpdate(){    
    if (this.type === "card") {
      this.position = "horizontal";
    } 
  }

  componentDidLoad() {
    this.getSlottedContent();
    this.selectDefault();
  }

  getSlottedContent() {
    const _tabSlotted = this.el.shadowRoot.querySelector('slot[name=tab]') as HTMLSlotElement;
    const _panelSlotted = this.el.shadowRoot.querySelector('slot[name=panel]') as HTMLSlotElement;
    this._panelSlot = _panelSlotted.assignedNodes().filter(node => { return node.nodeName !== '#text'; });
    this._tabSlot   = _tabSlotted.assignedNodes().filter(node => { return node.nodeName !== '#text'; });
  }

  selectDefault() {
    if(this.default){
      this.openTab(Number(this.default))
    } else {
      this.openTab(this._tabSlot.findIndex(node => node.getAttribute('selected') === "true"));
    }
  }


  handleKeyPress(index, event){
    let el = this._tabSlot[this.activeKey];
    switch(event.keyCode) {
      case(KEYCODES.ENTER):
        this.openTab(index, event);
        (this.el.shadowRoot.querySelector(`#js-tab-${this.activeKey}`) as HTMLElement).focus();
        break;
      case(KEYCODES.LEFT):
      case(KEYCODES.UP):
        do{
          this.activeKey = this.activeKey !== 0 ? this.activeKey - 1 : this._tabSlot.length - 1;
          el = this._tabSlot[this.activeKey];
        } while(el.getAttribute('disabled') === "true")
        (this.el.shadowRoot.querySelector(`#js-tab-${this.activeKey}`) as HTMLElement).focus();
        break;
      case(KEYCODES.RIGHT):
      case(KEYCODES.DOWN):
        do{
          this.activeKey = this.activeKey !== this._tabSlot.length - 1 ? this.activeKey + 1 : 0;
          el = this._tabSlot[this.activeKey];
        } while(el.getAttribute('disabled') === "true")
        (this.el.shadowRoot.querySelector(`#js-tab-${this.activeKey}`) as HTMLElement).focus();
        break;
      case(KEYCODES.HOME):
        if(this._tabSlot[0].getAttribute('disabled') !== "true"){
          this.activeKey = 0;
        }
        (this.el.shadowRoot.querySelector(`#js-tab-${this.activeKey}`) as HTMLElement).focus();
      break;
      case(KEYCODES.END):
        if(this._tabSlot[this._tabSlot.length - 1].getAttribute('disabled') !== "true"){
          this.activeKey = this._tabSlot.length - 1;
        }
        (this.el.shadowRoot.querySelector(`#js-tab-${this.activeKey}`) as HTMLElement).focus();
      break;
      default:
        break;
    }
  }

  createNewTab() {
    let tab   =  document.createElement(this.defaultTag);
    let panel = document.createElement(this.defaultTag);
    tab.innerText = this.defaultText;
    panel.innerHTML = this.defaultText;
    return [tab, panel]
  }

  render() {
    //HTML shadow DOM render
    return [
      // Button for adding new tabs. If property addTab is false the button is not displayed.
      <button
        style={
          this.addButton ? { display: "block" } : { display: "none" }
        }
        class="addTab addTab_circulo"
        onClick={ _ => this.addTab(...this.createNewTab())}
        onKeyPress={ _ =>  this.addTab(...this.createNewTab())}
      >
        ADD
      </button>,
      //Tab buttons container
      <section class={`tabs__container ${this.position === "horizontal" ? " horizontal" : " vertical"} ${this.type || ""}`}>
        <ul class="tabs__list" role="tablist">
          {this._tabSlot.map( 
            (tab, index) => {
              const isDisabled = tab.getAttribute('disabled') === "true" ? true : false;
              const isSelected = this.activeKey === index;
              const isClosable =  tab.getAttribute('closable') === "true" ? true : false;
              return (
              <li
                role="tab"
                id={`js-tab-${index}`} 
                class={`tab__button ${isSelected ? " active" : ""} ${isDisabled ? "disabled": ''}` }
                aria-selected={isSelected ? "true" : "false"}
                aria-disabled={isDisabled ? "true" : "false"}
                aria-controls={`js-panel-${index}`} 
                tabIndex={isDisabled ? -1 : 0}
                innerHTML={tab.outerHTML}
                onKeyDown={ e => !isDisabled && this.handleKeyPress(index, e)}
                onClick={event => !isDisabled && this.openTab(index, event)}
              >
                { !isDisabled && isClosable && 
                   <span 
                    class="tab__button__close" 
                    aria-label="close"
                    onClick={ _ => this.closeTab(index)}>x</span>
                }
              </li>
            )}
          )},
        </ul>
        {this._panelSlot.map( 
          (panel, index) => 
            <section 
            class={`tab__panel ${this.activeKey === index ? "active" : ""}`}
            id={`js-panel-${index}`} 
            innerHTML={panel.outerHTML}/>
        )}
      </section>,
      <div hidden>
        <slot name="tab"/>
        <slot name="panel"/>
      </div>
    ]};
}
