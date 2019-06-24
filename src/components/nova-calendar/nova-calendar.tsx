import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'nova-calendar',
  shadow: true
})
export class NovaCalendar {
  @Prop() name: string;

  render() {
    return (
      <p>
        My name is {this.name}
      </p>
    );
  }
}

