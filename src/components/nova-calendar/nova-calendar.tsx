import { Component, Prop, h } from '@stencil/core';
import * as moment from 'moment';

@Component({
  tag: 'nova-calendar',
  shadow: true
})
export class NovaCalendar {
  @Prop() name: string;

  render() {
    // https://momentjs.com/docs/#/displaying/format/
    let now = moment().format('LLLL');
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

