import { Component, h, Prop, State,  } from '@stencil/core';

@Component({
  tag: 'nova-cascader',
  styleUrl: 'nova-cascader.scss',
  shadow: true
})
export class NovaCascader {
  @Prop() content: cascader;
  @Prop() expandTrigger: string = 'click'; // TODO: Pass to Configuration inside content
  
  @State() result: string = '';
  @State() data: any[];
  @State() path: string[] = [];

  // @Listen('cascaderClick')
  clickHandler(list, level, item) {
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
      this.result = this.path.slice(1).join(" / ");
    }
  }

  componentWillLoad() {
    this.data = [this.content.items]
    this.path = [null]
  }

  render() {
    return [
      <input value={this.result}></input>,
      <section class="cascader__menu">
        { this.data && this.data.map( (list: cascaderItem[], level: number) => 
          <ul class="cascader__menu__list"> 
            { list.map((item:cascaderItem) => 
              <li class="cascader__menu__item"
                onMouseEnter={ _ => this.hoverHandler(list, level, item)} 
                onClick={ _ => this.clickHandler(list, level, item)}> 
                {item.label} <nova-icon name="chevron-right"></nova-icon>
              </li>)
            }
          </ul>)}
      </section>
    ];
  }
}