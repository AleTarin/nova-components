import { Component, h, Prop, State, Element, Method } from '@stencil/core';
import { ClickOutside } from "stencil-click-outside";

@Component({
  tag: 'nova-cascader',
  styleUrl: 'nova-cascader.scss',
  shadow: true
})
export class NovaCascader {
  @Prop() content: cascader;
  @Prop() expandTrigger: string = 'click';
  
  @State() isActive: boolean = false; 
  @State() result: string = null;
  @State() data: any[];
  @State() path: string[] = [];


  @Element() host: HTMLElement;
  clickHandler(list: cascaderItem[], level: number, item: cascaderItem) {
    this.updateCascader(list, level, item);
  }

  hoverHandler(list: cascaderItem[], level: number, item: cascaderItem) {
    if (item.children)
      this.updateCascader(list, level, item);
  }
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

  componentDidLoad(){
    this.data = [this.content.data.items]
    this.path = [null]

    let { 
      configuration: {
      autofocus, defaultValue
    } } = this.content;
    
    if (autofocus) {
      this.focusCascader()
    }
    if (defaultValue) {
      this.path = defaultValue;
      this.setSearch();
    }
  }
  
  @Method()
  async focusCascader() {
    this.host.shadowRoot.getElementById('js-search').focus();
  }

  @ClickOutside()
  ClickOutsideHandler() {
    this.data = [this.content.data.items]
    this.path = [null];
    this.isActive = false;
  }


  // Search methods
  toggleCascader() {
    this.isActive = !this.isActive;
  }

  clearSearch() {
    this.result = '';
  }

  setSearch(){
    this.result = this.path.slice(1).join(` ${this.content.configuration.separator || '/'} `);
  }

  render() {
    return [
      <span class="cascader__search"> 
        <input id="js-search" value={this.result} onClick={_ => this.toggleCascader()}></input>
        <nova-icon name="times-circle" onClick={_ =>this.clearSearch()}/>
        <nova-icon name="chevron-down" />
      </span>,
      <section class={`cascader__menu ${this.isActive ? 'cascader__menu--active' : ''}`}>
        { this.data && this.data.map( (list: cascaderItem[], level: number) => 
          <ul class="cascader__menu__list"> 
            { list.map((item:cascaderItem) => 
              <li 
                class={`cascader__menu__item ${item.disabled ? 'cascader__menu__item--disabled' : ''}`}
                onMouseEnter={ _ => item.disabled || this.hoverHandler(list, level, item)} 
                onClick=     { _ => item.disabled || this.clickHandler(list, level, item)}> 
                  {item.label} 
                  {item.children && <nova-icon name="chevron-right"/>}
              </li>)
            }
          </ul>)}
      </section>
    ];
  }
}