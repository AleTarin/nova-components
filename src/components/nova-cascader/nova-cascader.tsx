import { Component, h, Prop, State, Element, Method, Watch } from '@stencil/core';
import { ClickOutside } from "stencil-click-outside";

/**
 * @todo
 * Default value => Verificar que exista el default value
 * Hover => Click para seleccionar el ultimo elemento
 * Change on select => Capabilidad de seleccionar opciones de "enmedio"
 * Size => Done?
 * Custom Trigger => Cambiar el trigger que abre el cascader y el textbox donde se muestran los datos
 * Custom Render =>
 * Load Options Lazily =>
 * Custom Field Names => 
 * Testing => ?
 * */

@Component({
  tag: 'nova-cascader',
  styleUrls: {
    default: 'nova-cascader.default.scss',
    dark: 'nova-cascader.dark.scss'
  },
  shadow: true
})
export class NovaCascader {
  @Prop() content: cascader = {
    data: {
      items: []
    },
    configuration: {
      expandTrigger: 'click',
      name: '',
      placeholder: 'Select',
      autofocus: false,
      readonly: false,
      disabled: false,
      separator: ' / ',
      defaultValue: [],
    }
  };
  @Prop() size: string;

  // States
  @State() private isActive: boolean = false;
  @State() private result: string = null;
  @State() private data: cascaderItem[][] = [];
  @State() private path: string[] = [];

  // Callbacks
  @State() private onPopupVisibleChange: cascaderCallback = null;
  @State() private onSelect: cascaderCallback = null;

  // The nova cascader custom element itself
  @Element() private host: HTMLElement;

  // Life cycle methods
  /**
   * @description
   */
  componentDidLoad() {
    if (this.size) {
      const element = this.host.shadowRoot.querySelector('input');
      element.style.minHeight = this.size;
    }
    this.content && this.setComponentData()
  }

  /**
   * setComponentData
   * 
   * @description Set component's initial data and configuration
   * @listens prop:content
   */
  @Watch('content')
  setComponentData() {
    this.data = [this.content.data.items]
    this.path = [null]

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
  updateCascader(list: cascaderItem[], level: number, item: cascaderItem) {
    if (!item.disabled) {
      this.path = [...this.path.slice(0, level + 1), item.value];

      let next = list.find((element: cascaderItem) => element.value === item.value);
      if (next && next.children) {
        this.data = [...this.data.slice(0, level + 1), next.children];
      }
      else {
        this.setSearch();
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
    this.host.shadowRoot.querySelector('input').focus();
  }

  /**
   * blurCascader
   * @description Public API method to blur the cascader's input
   * @async
   */
  @Method()
  async blurCascader() {
    this.host.shadowRoot.querySelector('input').blur();
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
  // Ends Public API methods

  /**
   * onCascaderSelect
   * @description Clears the data and fires onPopupVisibleChange when clicking outside the component.
   * @event
   * @requires stencil-click-outside
   */
  @ClickOutside()
  ClickOutsideHandler() {
    this.data = [this.content.data.items]
    this.path = [null];
    this.isActive = false;
    this.onPopupVisibleChange && this.onPopupVisibleChange(this.result)
  }

  // Search methods
  /**
   * toggleCascader
   * @description Toggle cascader visibility on click
   */
  toggleCascader() {
    this.isActive = !this.isActive;
    this.onSelect && this.onPopupVisibleChange(this.result)
  }

  /**
   * clearSearch
   * @description clears the search result
   */
  clearSearch() {
    this.result = '';
  }

  /**
   * setSearch 
   * @description combine the search path with the separator and fires onSelect callback
   * @todo add prop to just use last item and verify search
   */
  setSearch() {
    this.result = this.path.slice(1).join(this.content.configuration.separator);
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
    const { configuration: { expandTrigger, name, placeholder, readonly, autofocus } } = this.content;
    return [

      // Search bar
      <section class="cascader">
        <span class="cascader__search">
          <input
            onKeyDown={e => this.disableEvent(e)}
            autoFocus={autofocus}
            name={name}
            readOnly={readonly}
            value={this.result}
            onClick={_ => this.toggleCascader()}
            placeholder={placeholder} />
          <nova-icon name="times-circle" onClick={_ => this.clearSearch()} />
          <nova-icon name={`${this.isActive ? "chevron-up" : "chevron-down"}`} />
        </span>

        {/* Cascader options */}
        <div class={`cascader__menu ${this.isActive ? 'cascader__menu--active' : ''}`}>
          {this.data.map((list: cascaderItem[], level: number) =>
            <ul class="cascader__menu__list">
              {list.map((item: cascaderItem) =>
                <li
                  class={`cascader__menu__item ${item.disabled ? 'cascader__menu__item--disabled' : ''}`}
                  onMouseEnter={_ => expandTrigger === "hover" && this.updateCascader(list, level, item)}
                  onClick={_ => expandTrigger === "click" && this.updateCascader(list, level, item)}>
                  {item.label}
                  {item.children && <nova-icon name="chevron-right" />}
                </li>)
              }
            </ul>)}
        </div>

      </section>
    ];
  }
}