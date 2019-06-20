import { Component, Prop, State, h } from '@stencil/core';

@Component({
    tag: 'nova-popover',
    styleUrl: 'nova-popover.scss',
    shadow: true
})
export class Popover {

  @Prop() pophover: boolean;
  @Prop() popfocus: boolean;
  @Prop() popclick: boolean;

  @State() popoverClass = "popover__text";

  activateClick(){
    this.popoverClass = "popover__text--active"
  }

  setActivationClass() {
    this.popoverClass = "popover__text";
    if(this.pophover){
      this.popoverClass += " popover__text--hover"
    }
    if(this.popfocus){
      this.popoverClass += " popover__text--focus"
    }
    if(this.popclick){
      this.popoverClass += " popover__text--active"
    }
  }

  componentDidLoad() {

  }

  render() {

    return(
      <div class="popover">
        <button tabIndex={0} type="button">Click Me!</button>
        <span class={this.popoverClass} onClick={() => this.activateClick()}>Tooltip text</span>
      </div>
    )
  }
}