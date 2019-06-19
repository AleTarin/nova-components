import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {

  @Prop() hover: boolean;
  @Prop() popfocus: boolean;
  @Prop() popclick: boolean;

  @State() popoverClass = "default";

  activateClick(){
    this.popoverClass = "popovertextclicked"
    console.log(this.popoverClass)
  }

  render() {
    if(this.hover==true){
      this.popoverClass = "popovertexthover"
    }
    if(this.popfocus==true){
      this.popoverClass = "popovertextfocus"
    }
    if(this.popclick==true){
      this.popoverClass = "popovertextclick"
    }
    console.log(this.hover)
    console.log(this.popfocus)
    console.log(this.popclick)
    console.log(this.popoverClass)
    return(
      <div class="popover">
        <button type="button">Click Me!</button>
        <span class={this.popoverClass} onClick={() => this.activateClick()}>Tooltip text</span>
      </div>
    )
  }
}
