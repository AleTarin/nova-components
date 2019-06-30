import { Component, Prop, State, Element, h, Watch } from '@stencil/core';
import { range } from '../../utils/utils';
import moment from 'moment';

@Component({
  tag: 'nova-calendar',
  styleUrl: 'nova-calendar.scss',
  shadow: true
})
export class NovaCalendar {
  @Prop() name: string;
  @Prop() content: any;
  @Prop() header: any;
  @Prop() defaultValue: any; //moment
  @Prop() disabledDate:boolean;
  @Prop() fullscreen:boolean;
  @Prop() locale:object;
  @Prop() mode:string="month";
  @Prop() activeMonth = Number(moment().format('M'));
  @Prop() activeYear = Number(moment().format('YYYY'));
  
  @Prop() calendar : any[] = [];

  @Prop() card: boolean = false;

  // https://momentjs.com/docs/#/displaying/format/
  @State() now: any = moment();
  @State() calendarEvents: {};
  @State() months: string[];
  @State() years: number[]
  @State() days: string[];

  @Element() public host: HTMLElement;

  nowChangeMonth(month){
    console.log(this.activeMonth, month)
    if(month < this.activeMonth) {
      this.now = moment(this.now).subtract(1, 'months');
    } 
    else if (month > this.activeMonth) {
      this.now = moment(this.now).add(1, 'months')
    } else {
      return;
    }
    this.activeMonth = Number(this.now.format('M')) - 1;
    console.log(this.activeMonth)
    this.fillCalendar();
  }
  nowNextMonth(){
    this.now = moment(this.now).add(1, 'months')
    this.fillCalendar();
  }

  nowSetYear(event){
    this.activeYear = event.target.value;
    this.now = moment(this.now).year(this.activeYear);
    this.fillCalendar();
  }
  
  nowSetMonth(event){
    this.activeMonth = Number(event.target.value);
    this.now = moment(this.now).month(this.activeMonth);
    this.fillCalendar();
  }

  fillCalendar() {
    this.calendar = [];
    const startDay = this.now.clone().startOf('month').startOf('week');
    const endDay = this.now.clone().endOf('month').endOf('week');
    let date = startDay.clone().subtract(1, 'day');
    
    while (date.isBefore(endDay, 'day')) {
        this.calendar.push(Array(7).fill(0).map(() => {
              const d = date.add(1, 'day').clone();
              return {day: d.format('D'), month: Number(d.format('M')) - 1}
            }))
    }
    console.log('calendar:', this.calendar)
  }

  componentWillLoad(){
    this.fillCalendar();
    this.months = moment.monthsShort();
    this.days = moment.weekdaysShort();
    this.activeYear = Number(moment().format('YYYY'));
    this.activeMonth = Number(moment().format('M')) - 1;
    this.years = range(this.activeYear-10, this.activeYear+10);
  }

  @Watch('content')
  contentWatcher(){
    if(this.content && this.content.data && this.content.data.items) {
      this.calendarEvents = this.content.data.items;
    }
  }


  render() {
    return [
      <section class={this.card ? 'calendar--card' : ''}>
        <slot>
          {/* Aqui van los custom headers */}
        </slot>
        <div class="calendar__controls">
          {/* Barra que va arriba del calendario */}
          {/* De los años */}
          <select onChange={this.nowSetYear.bind(this)}>
          { this.years.map( year => <option>{year}</option> )}
          </select>
          {/* De los meses */}
          <select onChange={this.nowSetMonth.bind(this)}>
            { this.months.map( (month, index) => <option selected={this.activeMonth == index + 1} value={index + 1}>{month}</option> )}
          </select>

          {/* Para cambiar meses/años */}
          <button class="calendar__controls__months">Month</button>
          <button onClick={() => this.nowNextMonth()} class="calendar__controls__years">Year</button>
        </div>
        <div class="calendar">
          <div class="calendar__week calendar__header">
            { this.days.map( dayName => <div class="calendar__day">{dayName}</div> )}
          </div>
        {/* El wrapper del calendario */}
        {this.calendar.map( row =>
        <div class="calendar__week">
          {row.map( cell =>
            <div 
              class={`calendar__day ${this.activeMonth != cell.month ?  'inactive': ''}`}
              onClick={ _ => this.nowChangeMonth(cell.month)}>
             <div class="calendar__number">
               {cell.day}
             </div>
             <ul>
               {`${this.activeYear}-${cell.month}-${cell.day}`}
             </ul>
            </div>
          )}
        </div>
        )}
      </div>
      </section>
    ]
  }
}

