import { Component,h} from '@stencil/core';


@Component({
  tag: 'nova-tabs',
  styleUrl: 'my-component.css',
  shadow: false
})
export class MyComponent {
  

  render() {
    return (<slot></slot>);
  }
}
