import { Component, h, Prop, State, Element, Method, Watch } from '@stencil/core';
import { ClickOutside } from "stencil-click-outside";

@Component({
  tag: 'nova-cascader',
  styleUrl: 'nova-cascader.scss',
  shadow: true
})
export class NovaCascader {
  @Prop() content: cascader = null;
  @Prop() expandTrigger: string = 'click';
  
  @State() isActive: boolean = false; 
  @State() result: string = null;
  @State() data: any[] = null;
  @State() path: string[] = [];
  @State() placeholder: string = '';
  @State() onPopupVisibleChange: Function = null;
  @State() onSelect: Function = null;

  @Element() host: HTMLElement;

  // Life cycle
  componentDidLoad(){
    this.content && this.setComponentData()
  }
  @Watch('content')
  setComponentData() {
    this.data = [this.content.data.items]
    this.path = [null]

    // Set initial configuration
    let { 
      configuration: {
      autofocus, defaultValue, placeholder
    } } = this.content;

    autofocus && this.focusCascader()
    
    if (defaultValue) {
      this.path = [null, ...defaultValue];
      this.setSearch();
    }
    if(placeholder){
      this.placeholder = placeholder;
    }
  }
  // Cascader event handlers
  updateCascader(list: cascaderItem[], level: number, item: cascaderItem) {
    this.path = [...this.path.slice(0,level + 1), item.value];
    
    let next = list.find((element:cascaderItem) => element.value === item.value );
    if ( next && next.children ){
      this.data = [...this.data.slice(0,level + 1), next.children];
    }
    else {
      this.setSearch();
    }
  }
  
  // Public API methods
  @Method()
  async focusCascader() {
     this.host.shadowRoot.getElementById('js-search').focus();
  }

  @Method()
  async blurCascader() {
     this.host.shadowRoot.getElementById('js-search').blur();
  }
  
  @Method()
  async onPopupChange( callback: Function ){
    this.onPopupVisibleChange =  ( result: string ) => callback(result);
  }
  @Method()
  async onCascaderSelect( callback: Function){
    this.onSelect = ( result: string ) => callback(result);
  }

  @ClickOutside()
  ClickOutsideHandler() {
    this.data = [this.content.data.items]
    this.path = [null];
    this.isActive = false;
    this.onPopupVisibleChange && this.onPopupVisibleChange(this.result)
  }

  // Search methods
  toggleCascader() {
    this.isActive = !this.isActive;
    this.onSelect && this.onPopupVisibleChange(this.result)
  }

  clearSearch() {
    this.result = '';
  }

  setSearch(){
    this.result = this.path.slice(1).join(` ${this.content.configuration.separator || '/'} `);
    this.onSelect && this.onSelect(this.result);
  }

  render() {
    return [
      <section class="cascader">
        <span class="cascader__search"> 
          <input 
            id="js-search" 
            value={this.result} 
            onClick={_ => this.toggleCascader()}
            placeholder={this.placeholder}/>
          <nova-icon name="times-circle" onClick={_ =>this.clearSearch()}/>
          <nova-icon name="chevron-down" />
        </span>
        <div class={`cascader__menu ${this.isActive ? 'cascader__menu--active' : ''}`}>
          { this.data && this.data.map( (list: cascaderItem[], level: number) => 
            <ul class="cascader__menu__list"> 
              { list.map((item:cascaderItem) => 
                <li 
                  class={`cascader__menu__item ${item.disabled ? 'cascader__menu__item--disabled' : ''}`}
                  onMouseEnter={ _ => item.disabled && item.children || this.updateCascader(list, level, item)} 
                  onClick=     { _ => item.disabled || this.updateCascader(list, level, item)}> 
                    {item.label} 
                    {item.children && <nova-icon name="chevron-right"/>}
                </li>)
              }
            </ul>)}
        </div>
      </section>
    ];
  }
}