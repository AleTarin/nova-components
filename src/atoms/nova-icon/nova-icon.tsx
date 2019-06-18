import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "nova-icon",
  styleUrls:  ["../../global/all.css","nova-icon.scss"],
  shadow: false
})
export class NovaIcon {

  /**
   * Props
   */
  @Prop() name: string = "";
  @Prop() size?: string = "";
  @Prop() pre?: string = "fas";
  @Prop() options?: string = "";

  render() {
    return <i class={`${this.pre} fa-${this.name} ${this.options}`} />
  }
}