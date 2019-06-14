import { Component, h, Prop, State, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'nova-cascader-item',
  styleUrl: 'nova-cascader-item.scss',
  shadow: true
})
export class NovaCascader {
  @Prop() path: string[] = [];
  @Prop() data: cascaderItem[] = [];
  @Prop() expandTrigger: string;
  @Prop() isVisible: boolean = true;

  @State() showChildren: boolean = false;

  @Event() clickItem: EventEmitter;


  componentWillLoad() {
    console.log('loading', this.data);
  }

  componentDidLoad() {
    console.log('loaded', this.data);
  }

  componentWillRender() {
    console.log('rendering', this.data);
  }

  componentDidRender() {
    console.log('rendered', this.data);
  }

  componentWillUpdate() {
    console.log('updating', this.data);
  }

  componentDidUpdate() {
    console.log('updated', this.data);
  }

  hoverHandler() {
    if (this.expandTrigger === 'hover')
      this.showChildren = true;
  }

  blurHandler() {
    if (this.expandTrigger === 'hover')
      this.showChildren = false;
  }

  clickHandler(event: UIEvent) {
    if (this.expandTrigger === 'click')
      this.showChildren = !this.showChildren;

    if (this.data.length === 0)
      this.clickItem.emit(event)
  }

  render() {
    return [
      this.data.map((item: cascaderItem) => {
        return (
          <ul
            class={`cascader--${this.isVisible ? 'visible' : 'hidden'}`}
            onMouseEnter={_ => this.hoverHandler()}
            onMouseLeave={_ => this.blurHandler()}
          >
            <li onClick={e => this.clickHandler(e)}>{item.value} {this.path}</li>
            {item.children &&
              <nova-cascader-item
                expandTrigger={this.expandTrigger}
                path={[...this.path, item.value]}
                data={item.children}
                isVisible={this.showChildren}
              />
            }
          </ul>)
      })
    ]
  }
}