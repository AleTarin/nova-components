import { Component, Prop, State, h } from '@stencil/core';
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
  @State() now: any = moment().format('LLLL');


  getFirstWeekdayOfMonth(){
    var cDate = Number(moment().startOf('month').format('d'));
    return cDate;
  }

  fillCalendar(){
    var day = 1;
    var arr = [];
    for(var i = 0; i < 6; i++){
      for(var j = 0; j < 7; j++){
        if (i === 0 && j < this.getFirstWeekdayOfMonth()){
          arr.push(99);
        }
        else if (day > moment().daysInMonth()){
          if(j<7){
            arr.push(99);
          }
          else{
            break;
          }
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

  componentWillLoad(){
    this.fillCalendar();
  }
  render() {
    console.log(this.calendar);
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
        <div class="dia">Su</div>
        <div class="dia">Mo</div>
        <div class="dia">Tu</div>
        <div class="dia">We</div>
        <div class="dia">Th</div>
        <div class="dia">Fr</div>
        <div class="dia">Sa</div>
        {/* El wrapper del calendario */}
        {this.calendar.map((row)=>
        <div class = "semana">
          {row.map((cell)=>
            
            <div class="dia">{cell}</div>
            )}
            </div>
            )}
      </div>
    ]
  }
}

