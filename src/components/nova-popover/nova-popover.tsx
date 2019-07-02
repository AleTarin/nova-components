import { Component, Prop, State, h } from "@stencil/core";

@Component({
  tag: "nova-popover",
  styleUrls: {
    default: "nova-popover.default.scss",
    dark: "nova-popover.dark.scss"
  },
  shadow: true
})
export class Popover {
  @Prop() trigger: "hover" | "focus" | "click" = "click";
  @Prop() location: "topleft" | "top" | "topright" |
                    "botleft" | "bot" | "botright" |
                    "lefttop" | "left" | "leftbot" |
                    "righttop" | "right" | "rightbot";

  @State() popoverActive = false;

  activateClick() {
    if (this.trigger === "click") this.popoverActive = !this.popoverActive;
  }
  render() {
    return (
      <div class="popover">
        <a onClick={() => this.activateClick()}>
          <slot name="trigger" />
        </a>
        <div
          class={`popover__text popover__text__${this.location} popover__text--${this.trigger} ${
            this.popoverActive ? "popover__text--active" : ""
          }`}
        >
          <slot name="title" />
          <slot name="content" />
          <a onClick={() => this.activateClick()}>
            <slot name="close" />
          </a>
        </div>
      </div>
    );
  }
}
