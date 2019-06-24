import { Component, Prop, h } from '@stencil/core';
import moment from 'moment';

@Component({
  tag: 'nova-calendar',
  shadow: true
})
export class NovaCalendar {
  @Prop() name: string;
  @Prop() content: any;

  render() {
    // https://momentjs.com/docs/#/displaying/format/
    let now = moment().format('LLLL');
    console.log(this.content, now)
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

