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
  @Prop() content: any = {
    data: {
      items: {}
    }
  };
  @Prop() header: any;
  @Prop() defaultValue: any; //moment
  @Prop() disabledDate:boolean;
  @Prop() fullscreen:boolean;
  @Prop() locale:object;
  @Prop({mutable: true}) type: string = "month";
  @Prop() activeMonth = Number(moment().format('M'));
  @Prop() activeYear = Number(moment().format('YYYY'));
  @Prop() calendar : any[] = [];
  @Prop() card: boolean = false;

  // https://momentjs.com/docs/#/displaying/format/
  @State() now: any = moment();
  @State() eventsByYear: {};
  @State() eventsByMonth: {};
  @State() months: string[];
  @State() years: number[]
  @State() days: string[];

  @Element() public host: HTMLElement;

  nowChangeMonth(month){
    // Check special cases
    if(this.activeMonth === 1 && month === 12){
      this.now = moment(this.now).subtract(1, 'months');
    } else if ( this.activeMonth === 12 && month === 1){
      this.now = moment(this.now).add(1, 'months')
    }
    // Then just check precedence of month
    else if(month < this.activeMonth) {
      this.now = moment(this.now).subtract(1, 'months');
    } 
    else if ( month > this.activeMonth) {
      this.now = moment(this.now).add(1, 'months')
    } else {
      return;
    }
    this.activeMonth = Number(this.now.format('M'));
    this.activeYear = Number(this.now.format('Y'));
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
    this.now = moment(this.now).month(this.activeMonth -1);
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
              return {day: d.format('D'), month: Number(d.format('M'))}
            }))
    }
  }

  componentWillLoad(){
    this.months = moment.monthsShort();
    this.days = moment.weekdaysShort();
    this.years = range(this.activeYear-10, this.activeYear+10);
  }

  componentDidLoad() {
    this.fillCalendar();
  }

  @Watch('content')
  watchContent(){
    this.getEventsByYear();
    this.getEventsByMonth();
  }

  @Watch('activeYear')
  getEventsByYear(){
    this.eventsByYear = this.content.data.items[this.activeYear] || {};
  }

  @Watch('activeMonth')
  getEventsByMonth(){
    this.eventsByMonth = this.eventsByYear[this.activeMonth] || {};
  }

  getEventsByDay(day){
    return this.eventsByMonth[day] || [];
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
          { this.years.map( year => <option selected={this.activeYear == year}>{year}</option> )}
          </select>
          {/* De los meses */}
          <select onChange={this.nowSetMonth.bind(this)}>
            { this.months.map( (month, index) => <option selected={this.activeMonth == index + 1} value={index + 1}>{month}</option> )}
          </select>

          {/* Para cambiar meses/años */}
          <div class="calendar__controls__switch">
            <button class="calendar__controls__months">Month</button>
            <button class="calendar__controls__years">Year</button>
          </div>
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
             <ul class="calendar__events">
               {this.getEventsByDay(cell.day).map(
                 event => 
                 <li>
                  <nova-icon name={event.type} color={event.color} />
                  {event.content}
                 </li>
               )}
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

