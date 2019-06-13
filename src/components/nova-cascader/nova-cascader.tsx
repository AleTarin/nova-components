import { Component, h, Prop, Host } from '@stencil/core';

@Component({
  tag: 'nova-cascader',
  styleUrl: 'nova-cascader.scss',
  shadow: true
})
export class NovaCascader {
  @Prop() content: cascader;
  @Prop() expandTrigger: string = 'click'; // TODO: Pass to Configuration inside content

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