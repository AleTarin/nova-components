import { Component, Prop, h } from '@stencil/core';
import moment from 'moment';

@Component({
  tag: 'nova-calendar',
  styleUrl: 'nova-calendar.scss',
  shadow: true
})
export class NovaCalendar {
  @Prop() name: string;
  @Prop() content: any;
  @Prop() header: string;
  @Prop() defaultValue:moment;
  @Prop() disabledDate:boolean;
  @Prop() fullscreen:boolean;
  @Prop() locale:object;
  @Prop() mode:string="month";


  

  render() {
    // https://momentjs.com/docs/#/displaying/format/
    let now = moment().format('LLLL');
    console.log(this.content, now)
    return [
      <slot>
        {/* Aqui van los custom headers */}
      </slot>,
      
      <div>
        {/* Barra que va arriba del calendario */}
        {/* De los años */}
        <select>
          <option>2009</option>
          <option>2010</option>
          <option>2011</option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
          <option>2019</option>
          <option>2020</option>
        </select>
        {/* De los meses */}
        <select>
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>

        {/* Para cambiar meses/años */}
        <button>M</button>
        <button>Y</button>
      </div>,

      <div class="wrapper">
        {/* El wrapper del calendario */}
        <div class="semana">
          <div class="dia">Ha</div>
          <div class="dia">Ha</div>
          <div class="dia">Ha</div>
          <div class="dia">Ha</div>
          <div class="dia">Ha</div>
        </div>
        <div class="semana">
          <div class="dia">He</div>
          <div class="dia">He</div>
          <div class="dia">He</div>
          <div class="dia">He</div>
          <div class="dia">He</div>
        </div>
        <div class="semana">
          <div class="dia">Hi</div>
          <div class="dia">Hi</div>
          <div class="dia">Hi</div>
          <div class="dia">Hi</div>
          <div class="dia">Hi</div>
        </div>
        <div class="semana">
          <div class="dia">Ho</div>
          <div class="dia">Ho</div>
          <div class="dia">Ho</div>
          <div class="dia">Ho</div>
          <div class="dia">Ho</div>
        </div>
        <div class="semana">
          <div class="dia">Hu</div>
          <div class="dia">Hu</div>
          <div class="dia">Hu</div>
          <div class="dia">Hu</div>
          <div class="dia">Hu</div>
        </div>
      </div>
    ]
  }
}

