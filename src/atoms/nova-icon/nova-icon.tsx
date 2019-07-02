import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "nova-icon",
  styleUrls: ["../../assets/all.css", "nova-icon.scss"],
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
  @Prop() color?: string =  "inherit";

  render() {
    return <i style={{color: this.color}}class={`${this.pre} fa-${this.name} ${this.options}`} />;
  }
}
