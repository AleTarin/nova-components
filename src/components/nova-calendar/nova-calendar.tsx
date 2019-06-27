import { Component, Prop, State, Element, h } from '@stencil/core';
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

  // https://momentjs.com/docs/#/displaying/format/
  @State() now: any = moment();

  @Element() public host: HTMLElement;

  nowPrevMonth(){
    this.now = moment().subtract(1, 'months')
  }
  nowNextMonth(){
    this.now = moment().add(1, 'months')
  }

  cellContent(cell){
    var x;
    var nxt = 1;
    {if (cell === 98)
      x = 'prv'
    else if (cell === 99){
      x = nxt;
      nxt++;
    }
    else
      x = cell;
    }
    return x;
  }

  fillCalendar(){
    var day = 1;
    var firstDayOfMonth = this.now.startOf('month').format('d')
    var lastDayOfPrevMonth = Number(moment(this.now).subtract(1, 'M').endOf("month").format('D'));
    var dayPrevMonth = lastDayOfPrevMonth - firstDayOfMonth +1;
    var dayNextMonth = 1;
    var arr = [];

    for(var i = 0; i < 6; i++){
      for(var j = 0; j < 7; j++){
        if (i === 0 && j < firstDayOfMonth){
          arr.push(dayPrevMonth);
          dayPrevMonth++;
        }
        else if (day >this.now.daysInMonth()){
          if(j<7){
            arr.push(dayNextMonth);
            dayNextMonth++;
          }
          else
            break;
        }
        else {
          arr.push(day); 
          day++;
        }
      }
      this.calendar.push(arr);
      arr=[];
    }
  }

  // Function that changes the HTML Class to those days that are not in the selected month
  shadowDaysNotAvailable() {
    var firstDayOfMonth = Number(this.now.startOf('month').format('d'))
    var lastDayOfMonth = Number(this.now.endOf('month').format('DD'))
    var listOfDays = this.host.shadowRoot.querySelectorAll('div.calendar__week')
    var firstWeek = listOfDays[1]
    var lastWeek = listOfDays[listOfDays.length - 1]

    // Loop through the week to get each day
    firstWeek.childNodes.forEach(day => {
      // If the day is bigger than the start of the month, it is because it belongs to the earlier month
      if (Number(day.textContent) > firstDayOfMonth) {
        var inactiveDay = day.childNodes[0].firstChild
        inactiveDay.parentElement.className = 'calendar__number__inactive'   
      }
    })

    // Loop through the week to get each day
    lastWeek.childNodes.forEach(day => {
      // If the day is smaller than the end of the month, it belongs to the next month
      if (Number(day.textContent) < lastDayOfMonth) {
        var inactiveDay = day.childNodes[0].firstChild
        inactiveDay.parentElement.className = 'calendar__number__inactive'
      }
    })
    
  }

  componentWillLoad(){
    this.calendar = []
    this.fillCalendar()
    this.shadowDaysNotAvailable()
  }

  render() {
    return [
      <slot>
        {/* Aqui van los custom headers */}
      </slot>,
      
      <div class="calendar__controls">
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
        <button class="calendar__controls__months">M</button>
        <button class="calendar__controls__years">Y</button>
      </div>,
      <div class="calendar">
        <div class="calendar__week calendar__header">
          <div class="calendar__day">Su</div>
          <div class="calendar__day">Mo</div>
          <div class="calendar__day">Tu</div>
          <div class="calendar__day">We</div>
          <div class="calendar__day">Th</div>
          <div class="calendar__day">Fr</div>
          <div class="calendar__day">Sa</div>
        </div>
        {/* El wrapper del calendario */}
        {this.calendar.map((row)=>
        <div class="calendar__week">
          {row.map( cell =>
            <div class="calendar__day">
             <div class="calendar__number">
              {this.cellContent(cell)}
             </div> 
            
            </div>
            )}
            </div>
            )}
      </div>
    ]
  }
}

