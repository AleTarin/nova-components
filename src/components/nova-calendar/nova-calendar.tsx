import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'nova-calendar',
  shadow: true
})
export class NovaCalendar {
  @Prop() name: string;

  render() {
    return [
      <slot>
        {/* Aqui van los custom headers */}
      </slot>,

      <div>
        <select>
          {/* De los meses */}
        </select>

        <button>
          {/* Para cambiar meses/años */}
        </button>
      </div>,

      <div>
        {/* El wrapper del calendario */}
      </div>
    ]
  }
}

