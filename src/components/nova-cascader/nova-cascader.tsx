import { Component, h, Prop, Host } from '@stencil/core';

@Component({
  tag: 'nova-cascader',
  styleUrl: 'nova-cascader.scss',
  shadow: true
})
export class NovaCascader {
  @Prop() content: cascader;
  @Prop() expandTrigger: string = 'click'; // TODO: Pass to Configuration inside content

  componentWillLoad() {
    console.log('loading', this.content);
    console.log(this);
    const cascaderItemElement = document.querySelector('nova-cascader-item');
    cascaderItemElement.data = this.content.items;
  }

  componentDidLoad() {
    console.log('loaded', this.content);
  }

  componentWillRender() {
    console.log('rendering', this.content);
  }

  componentDidRender() {
    console.log('rendered', this.content);
  }

  componentWillUpdate() {
    console.log('updating', this.content);
  }

  componentDidUpdate() {
    console.log('updated', this.content);
  }

  render() {
    return (
      <Host>
        {this.content && 
          <nova-cascader-item 
            data={this.content.items}
            expandTrigger={this.expandTrigger}
          /> }
      </Host>
    );
  }
}