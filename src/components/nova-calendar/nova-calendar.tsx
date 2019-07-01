import { Component, Prop, State, Element, h, Watch, Method } from '@stencil/core';
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
    },
    configuration: {
      fullscreen: false
    }
  };

  @Prop() disabledDate:boolean;
  
  // Props changeable by methods
  @Prop({mutable: true}) value: any = moment(); //moment
  @Prop({mutable: true}) type: "month" | "year" = "month";
  @Prop({mutable: true}) card: boolean = false;
  @Prop({mutable: true}) validRange: [any, any];
  // Locale - update by @method

  // Callbacks
  @Prop({mutable: true}) _onSelect = function(_date: any){};
  @Prop({mutable: true}) _onChange = function(_date: any){};
  
  @State() now: any = moment();
  @State() calendar : any[] = [];

  @State() eventsByYear: {};
  @State() eventsByMonth: {};

  @State() years: number[];
  @State() months: string[];
  @State() days: string[];

  // https://momentjs.com/docs/#/displaying/format/
  @State() activeMonth = Number(moment().format('M'));
  @State() activeYear = Number(moment().format('YYYY'));
  
  @Element() public host: HTMLElement;


  @Method()
  async setLocale(lang: string, definition: object ){
    moment.locale(lang, definition);
  }

  @Method()
  async nowChangeMonth(month){
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

  componentWillLoad() {
    this.validRange = [this.value.clone().subtract(10, 'years'), this.value.clone().add(10, 'years')];
    this.setData();
  }

  @Watch('content')
  watchContent(){
    this.getEventsByYear();
    this.getEventsByMonth();
  }

  @Watch('activeYear')
  getEventsByYear(){
    this.eventsByYear = this.content.data.items[this.activeYear] || {};
    this.getEventsByMonth();
  }

  @Watch('activeMonth')
  getEventsByMonth(){
    this.eventsByMonth = this.eventsByYear[this.activeMonth] || {};
  }

  getEventsByDay(day){
    return( this.eventsByMonth && this.eventsByMonth[day]) || [];
  }

  @Method()
  async setType(type: "month" | "year"){
    this.type = type;
  }

  getCellClass({month, day}) {
    if (this.activeMonth != month)
      return 'inactive';
    else {
      let date = moment( new Date(`${this.activeYear}-${month}-${day}`)).format("YYYY/MM/DD");
      if (date === this.value.format("YYYY/MM/DD"))
        return 'selected';
    }
    return '';
  }

  setData() {
    this.months = moment.monthsShort();
    this.days = moment.weekdaysShort(true);
    this.years = range(Number(this.validRange[0].format('Y')),Number(this.validRange[1].format('Y')));
    this.fillCalendar();
  }

  render() {
    return [
      <section class={this.card ? 'calendar--card' : ''}>
        <slot name="header"></slot>
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
            <button class={`calendar__controls__months ${this.type === "month" ? 'selected' : ''}`} onClick={ _ => this.setType('month')}>Month</button>
            <button class={`calendar__controls__years  ${this.type === "year"  ? 'selected' : ''}`} onClick={ _ => this.setType('year') }>Year</button>
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
              class={`calendar__day ${this.getCellClass(cell)}`}
              tabIndex={0}
              onClick={ _ => this.nowChangeMonth(cell.month)}>
             <span class="calendar__number">{cell.day}</span>
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

