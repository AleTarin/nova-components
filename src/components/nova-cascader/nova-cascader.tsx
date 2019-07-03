import {
  Component,
  h,
  Prop,
  State,
  Element,
  Method,
  Watch
} from "@stencil/core";
import { ClickOutside } from "stencil-click-outside";
/**
 * @author Alejandro Tarin, Alejandro Roiz
 */

/**
 * @todo
 * Documentacion:
 *    Explicar dentro del README mas externo (del proyecto) como se manejaría un tema nuevo
 * CSS-Animations (SOLO SI QUEDA TIEMPO):
 *    animations.css -> agregar el sass que tiene ya animaciones "out of the box"
 */

@Component({
  tag: "nova-cascader",
  styleUrls: {
    default: "nova-cascader.default.scss",
    dark: "nova-cascader.dark.scss"
  },
  shadow: true
})
export class NovaCascader {
  @Prop() content: cascader = {
    data: {
      items: []
    },
    configuration: {
      expandTrigger: "click",
      name: "",
      placeholder: "Select",
      autofocus: false,
      readonly: false,
      disabled: false,
      separator: " / ",
      defaultValue: [],
      changeOnSelect: false,
      ariaParagraph: "No content selected"
    }
  };
  @Prop() size: string;

  // States
  @State() private isActive: boolean = false;
  @State() private result: string = null;
  @State() private data: cascaderItem[][] = [];
  @State() private path: string[] = [];
  @State() customTrigger: any;

  // Callbacks
  @State() private onPopupVisibleChange: cascaderCallback = null;
  @State() private onSelect: cascaderCallback = null;

  // The nova cascader custom element itself
  @Element() public host: HTMLElement;

  // Life cycle methods
  /**
   * @description
   */
  componentDidLoad() {
    if (this.size) {
      const element = this.host.shadowRoot.querySelector("input");
      element.style.minHeight = this.size;
    }
    this.content && this.setComponentData();
  }

  /**
   * setComponentData
   *
   * @description Set component's initial data and configuration
   * @listens prop:content
   */
  @Watch("content")
  setComponentData() {
    this.data = [this.content.data.items];
    this.path = [null];

    const defaultValue = this.content.configuration.defaultValue;
    if (defaultValue.length) {
      this.path = [null, ...defaultValue];
      this.setSearch();
    }
  }

  /**
   * Update cascader
   * @description Updated the path of the item and the data. If it's a final item, sets the searchbar's text.
   * @param list { cascaderItem[] } list of items where the event was fired
   * @param level { number } level of the list of items that fired the event
   * @param item  { cascaderItem } item that fired the event
   */
  updateCascader(
    list: cascaderItem[],
    level: number,
    item: cascaderItem,
    event: "click" | "hover"
  ) {
    if (!item.disabled) {
      const { expandTrigger } = this.content.configuration;
      if (expandTrigger === event || expandTrigger === "hover") {
        let next = list.find(
          (element: cascaderItem) => element.value === item.value
        );
        this.path = [...this.path.slice(0, level + 1), item.value];
        if (next.children) {
          this.data = [...this.data.slice(0, level + 1), next.children];
        }
        if (event === "click") {
          this.setSearch();
          if (!next.children) this.Cascader();
        }
      }
    }
  }

  /**
   * focusCascader
   * @description Public API method to focus the cascader's input
   * @async
   */
  @Method()
  async focusCascader() {
    this.host.shadowRoot.querySelector("input").focus();
  }

  /**
   * blurCascader
   * @description Public API method to blur the cascader's input
   * @async
   */
  @Method()
  async blurCascader() {
    this.host.shadowRoot.querySelector("input").blur();
  }

  /**
   * onPopupChange
   * @description Sets the callback that is fired when the cascader appears or disappears
   * @param callback callback sended with the Public API
   * @async
   * @callback
   */
  @Method()
  async onPopupChange(callback: cascaderCallback) {
    this.onPopupVisibleChange = callback;
  }
  /**
   * onCascaderSelect
   * @description Sets the callback that is fired when an item is selected
   * @param callback callback sended with the Public API
   * @async
   * @callback
   */
  @Method()
  async onCascaderSelect(callback: cascaderCallback) {
    this.onSelect = callback;
  }

  @Method()
  async addCustomTrigger(el: HTMLElement) {
    this.customTrigger = el;
  }
  // Ends Public API methods

  /**
   * onCascaderSelect
   * @description Clears the data and fires onPopupVisibleChange when clicking outside the component.
   * @event
   * @requires stencil-click-outside module
   * @requires ClickOutside
   */
  @ClickOutside()
  ClickOutsideHandler() {
    this.data = [this.content.data.items];
    this.path = [null];
    this.isActive = false;
    this.onPopupVisibleChange && this.onPopupVisibleChange(this.result);
  }

  // Search methods
  /**
   * Cascader
   * @description Toggle cascader visibility on click
   */
  Cascader() {
    this.isActive = !this.isActive;
    this.onSelect && this.onPopupVisibleChange(this.result);
  }

  /**
   * clearSearch
   * @description clears the search result
   */
  clearSearch() {
    this.result = "";
  }

  /**
   * setSearch
   * @description combine the search path with the separator and fires onSelect callback
   * @todo add prop to just use last item and verify search
   */
  setSearch() {
    if (this.content.configuration.changeOnSelect) {
      this.result = this.path[this.path.length - 1];
    } else {
      this.result = this.path
        .slice(1)
        .join(this.content.configuration.separator);
    }
    this.onSelect && this.onSelect(this.result);
  }

  /**
   * disable Event
   * @param event
   * @event
   */
  disableEvent(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    const {
      configuration: { name, placeholder, readonly, autofocus }
    } = this.content;
    return [
      // Search bar
      <section class="cascader">
        <span class="cascader__search">
          <input
            onKeyDown={e => readonly ? this.disableEvent(e) : e.key === 'Enter' && this.Cascader()} 
            autoFocus={autofocus}
            
            name={name}
            value={this.result}
            onClick={_ => this.Cascader()}
            placeholder={placeholder}

            role="combobox"
            aria-readonly={readonly}
            aria-controls="Enter"
            aria-haspopup="true"
            aria-expanded={this.isActive}
            aria-label={this.result ? this.result : this.content.configuration.ariaParagraph}
          />
          <nova-icon name="times-circle" onClick={_ => this.clearSearch()} />
          <nova-icon
            name={`${this.isActive ? "chevron-up" : "chevron-down"}`}
          />
          
        </span>

        {/* Cascader options */}
        <div
          class={`cascader__menu ${
            this.isActive ? "cascader__menu--active" : ""
            }`}
        >
          {this.data.map((list: cascaderItem[], level: number) => (
            <ul role="listbox" class="cascader__menu__list" id={`js-cascader-list-${level}`}>
              {list.map((item: cascaderItem) => (
                <li
                  id={`js-cascader-list-${level}-${item.value}`}
                  role="option" 
                  aria-haspopup={ item.children ? "true" : "false"}
                  aria-label={item.value}
                  aria-selected={this.path[this.path.length - 1] === item.value ? "true" : "false"}
                  tabIndex={item.disabled ? -1 : 0}
                  class={`cascader__menu__item ${
                    item.disabled ? "cascader__menu__item--disabled" : ""
                    }`}
                  onMouseEnter={_ =>
                    this.updateCascader(list, level, item, "hover")
                  }
                  onClick={_ => this.updateCascader(list, level, item, "click")}
                  onKeyDown={_event => _event.key === 'Enter' && this.updateCascader(list, level, item, "click")}
                >
                  {item.label}
                  {item.children && <nova-icon name="chevron-right" />}
                </li>
              ))}
            </ul>
          ))}
        </div>
        <p class="accessibility-paragraph"></p>
      </section>
    ];
  }
}
