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
    },
    configuration: {
      fullscreen: true
    }
  };
  @Prop() disabledDate:boolean;

  @Prop() activeMonth = Number(moment().format('M'));
  @Prop() activeYear = Number(moment().format('YYYY'));

  @Prop() yearMonthSwitch: boolean = true;
  
  // Props changeable by methods
  @Prop({mutable: true}) value: any = moment(); //moment
  @Prop({mutable: true}) type: "month" | "year" = "month";
  @Prop({mutable: true}) card: boolean = false;
  @Prop({mutable: true}) validRange: [any, any];
  // Locale - update by @method

 

  // Callbacks
  @Prop({mutable: true}) _onSelect = function(_date: any){};
  @Prop({mutable: true}) _onChange = function(_date: any){};
  
  @State() calendar : any[] = [];
  @State() monthCalendar : any[] = [];

  // https://momentjs.com/docs/#/displaying/format/
  @State() now: any = moment();
  @State() eventsByYear: {};
  @State() eventsByMonth: {};
  @State() generalEvents: {};
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

  toggleType(type){
      this.type = type;
  }

  fillCalendar() {
    this.calendar = [];
    this.monthCalendar = [];

    const startDay = this.now.clone().startOf('month').startOf('week');
    const endDay = this.now.clone().endOf('month').endOf('week');
    let date = startDay.clone().subtract(1, 'day');

    const startMonth = this.now.clone().startOf('year');
    const endMonth = this.now.clone().endOf('year');
    let dateMonth = startMonth.clone().subtract(1, 'month');

    while (date.isBefore(endDay, 'day')) {
        this.calendar.push(Array(7).fill(0).map(() => {
              const d = date.add(1, 'day').clone();
              return {day: d.format('D'), month: Number(d.format('M'))}
            }))
    }

    while (dateMonth.isBefore(endMonth, 'month')){ 
      this.monthCalendar.push(Array(4).fill(0).map(() => {
        const d = dateMonth.add(1, 'month').clone();
        return d;
        }))
    }
  }

  setData(){
    this.months = moment.monthsShort();
    this.days = moment.weekdaysShort();
    this.years = range(this.activeYear-10, this.activeYear+10);
  }

  componentDidLoad() {
    this.fillCalendar();
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
    return (this.eventsByMonth && this.eventsByMonth[day]) || [];
  }

  getGeneralEventByMonth(month){
    this.eventsByMonth = this.eventsByYear[month] || {};
    return this.eventsByMonth["event"];

  }

  getCellClass({month, day}) {
    if (this.activeMonth != month)
      return 'inactive';
    else {
      let date = moment(new Date(`${this.activeYear}-${month}-${day}`)).format("YYYY/MM/DD");
      if (date === this.value.format("YYYY/MM/DD"))
        return 'selected';
    }
    return '';
  }

  fullscreen(){       
    this.host.requestFullscreen();  
  }

  render() {
    return [
      <button onClick={()=> this.fullscreen()}>pantalla completa</button>,
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
            <button 
              class={`calendar__controls__months ${this.type === "month" ? "active" : ""}`}
              onClick={ _ => this.toggleType("month")}>
                Month
            </button>
            <button 
              class={`calendar__controls__years ${this.type === "year" ? "active" : ""}`}
              onClick={ _ => this.toggleType("year")}>
                Year
            </button>
          </div>
        </div>
        
        {this.type === "month" ? 
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
      : this.type == "year"?
          <div class="calendar">
            {this.monthCalendar.map( row =>
            <div class="calendar__week">
              {row.map( cell =>
                <div 
                  class={`calendar__day ${this.value.format("YYYY/MM") === cell.format("YYYY/MM") ? "selected" : ""}`}
                  tabIndex={0}>
                <div class="calendar__number">
                  {cell.format('MMM')}
                </div>
                <p class="calendar__events">
                  {this.getGeneralEventByMonth(cell.format('M'))}
                  </p>
                </div>
              )}
            </div>
            )}
          </div>
          :""}
      </section>
    ]
  }
}

