import {
  Component,
  Prop,
  State,
  Element,
  h,
  Watch,
  Method
} from "@stencil/core";
import { range } from "../../utils/utils";
import moment, { Moment } from "moment";

/**
 * @author Alejandro Tarin, Armando Aguiar, Arturo Rojas, Javier Saldivar, Alejandro Roiz
 */

@Component({
  tag: "nova-calendar",
  styleUrls: {
    default: "nova-calendar.scss"
  },
  shadow: true
})

export class NovaCalendar {
  /** Object that contains all data with the items of each date with events and configuration */
  @Prop() content: any = {
    data: {
      items: {}
    },
    configuration: {
      fullscreen: false
    }
  };

  // Props
  /** Selected moment value */
  @Prop({ mutable: true }) value: Moment = moment(); 
  /** Type of calendar, view by month or by year */
  @Prop({ mutable: true }) type: "month" | "year" = "month";
  /** Changes the view to card */
  @Prop({ mutable: true }) card: boolean = false;


  // States
  @State() calendar: any[] = [];
  @State() monthCalendar: any[] = [];
  
  // https://momentjs.com/docs/#/displaying/format/
  @State() now: Moment = moment();
  @State() activeMonth: number = Number(moment().format("M"));
  @State() activeYear: number = Number(moment().format("YYYY"));  
  /** Valid range of years to display the calendar */
  @State() validRange: [Moment, Moment];

  @State() eventsByYear: {};
  @State() eventsByMonth: {};
  @State() generalEvents: {};
  @State() months: string[];
  @State() years: number[];
  @State() days: string[];
  
  // Callbacks
  @State() _onSelect: Function = function (_date: Moment) { };
  @State() _onChange: Function = function (_date: Moment) { };

  // The Calendar Element itself
  @Element() public host: HTMLElement;

  /**
   * nowChangeMonth
   * @description Recieves an object with the month and day and changes to that date
   * @param {month, day} object with month and day we want to change to
   */
  nowChangeMonth({ month, day }) {
    // Check special cases
    if (this.activeMonth === 1 && month === 12) {
      this.now = moment(this.now).subtract(1, "months");
    } else if (this.activeMonth === 12 && month === 1) {
      this.now = moment(this.now).add(1, "months");
    }
    // Then just check precedence of month
    else if (month < this.activeMonth) {
      this.now = moment(this.now).subtract(1, "months");
    } else if (month > this.activeMonth) {
      this.now = moment(this.now).add(1, "months");
    } else {
      this._onSelect(moment(new Date(`${this.activeYear}-${month}-${day}`)));
      return;
    }
    this.activeMonth = Number(this.now.format("M"));
    this.activeYear = Number(this.now.format("Y"));
    this.fillCalendar();
  }

  /**
   * nowSetYear
   * @description recieves the event and fills the calendar (used in year mode)
   * @param event 
   */
  nowSetYear(event) {
    this.activeYear = event.target.value;
    this.now = moment(this.now).year(this.activeYear);
    this.fillCalendar();
  }

  /**
   * nowSetMonth
   * @description recieves the event and fills the calendar (used in month mode)
   * @param event 
   */
  nowSetMonth(event) {
    this.activeMonth = Number(event.target.value);
    this.now = moment(this.now).month(this.activeMonth - 1);
    this.fillCalendar();
  }

  /**
   * fillCalendar
   * @description used to fill an array with the valid dates from the month being hovered
   */
  fillCalendar() {
    this.calendar = [];
    this.monthCalendar = [];

    const startDay = this.now
      .clone()
      .startOf("month")
      .startOf("week");
    const endDay = this.now
      .clone()
      .endOf("month")
      .endOf("week");
    let date = startDay.clone().subtract(1, "day");

    const startMonth = this.now.clone().startOf("year");
    const endMonth = this.now.clone().endOf("year");
    let dateMonth = startMonth.clone().subtract(1, "month");

    while (date.isBefore(endDay, "day")) {
      this.calendar.push(
        Array(7)
          .fill(0)
          .map(() => {
            const d = date.add(1, "day").clone();
            return { day: d.format("D"), month: Number(d.format("M")) };
          })
      );
    }

    while (dateMonth.isBefore(endMonth, "month")) {
      this.monthCalendar.push(
        Array(4)
          .fill(0)
          .map(() => {
            const d = dateMonth.add(1, "month").clone();
            return d;
          })
      );
    }
  }

  /**
   * setData
   * @description sets the months days and years used to fill the selects in the calendar
   */
  setData() {
    this.months = moment.monthsShort();
    this.days = moment.weekdaysShort();
    this.years = range(
      Number(this.validRange[0].format("Y")),
      Number(this.validRange[1].format("Y"))
    );
  }

  // Life cycle methods
  /**
   * componentDidLoad
   * @description fill the calendar once the component is loaded to the browser
   */
  componentDidLoad() {
    this.fillCalendar();
  }

  /**
   * componentWillLoad
   * @description when the component will Load select the valid ranges for the years to be displayed in the calendar
   */
  componentWillLoad() {
    this.validRange = [
      this.value.clone().subtract(10, "years"),
      this.value.clone().add(10, "years")
    ];
    this.setData();
  }

  /**
   * watchContent
   * @description once the content is changed get the events we need
   * @listens prop:content
   */
  @Watch("content")
  watchContent() {
    this.getEventsByYear();
    this.getEventsByMonth();
  }

  /**
   * getEventsByYear
   * @description fill the events by year with the data from the confJSON, or an empty object
   * @listens prop:activeYear
   */
  @Watch("activeYear")
  getEventsByYear() {
    this.eventsByYear = this.content.data.items[this.activeYear] || {};
    this.getEventsByMonth();
  }

  /**
   * getEventsByMonth
   * @description fill the events by month with the data from the confJSON, or an empty object
   * @listens prop:activeMonth
   */
  @Watch("activeMonth")
  getEventsByMonth() {
    this.eventsByMonth = this.eventsByYear[this.activeMonth] || {};
  }

  /**
   * getEventsByDay
   * @description return the events in the date selected
   * @param day string with the day to check
   */
  getEventsByDay(day) {
    return (this.eventsByMonth && this.eventsByMonth[day]) || [];
  }

  /**
   * getGeneralEventByMonth
   * @description return the events in the month selected
   * @param month string with the month to check
   */
  getGeneralEventByMonth(month) {
    this.eventsByMonth = this.eventsByYear[month] || {};
    return this.eventsByMonth["event"];
  }

  /**
   * getCellClass
   * @description change class of the cell selected depending on its state
   * @param {month, day} object with month and day we want to check
   */
  getCellClass({ month, day }) {
    if (this.activeMonth != month) return "inactive";
    else {
      let date = moment(new Date(`${this.activeYear}-${month}-${day}`)).format(
        "YYYY/MM/DD"
      );
      if (date === this.value.format("YYYY/MM/DD")) return "selected";
    }
    return "";
  }

  /**
   * fullScreen
   * @description Public API method to enter fullscreen
   * @async
   */
  @Method()
  async fullscreen() {
    this.host.requestFullscreen();
  }

  /**
   * onChangeValue
   * @description Sets the callback that is fired when the value of the calendar changes
   * @param callback callback sended with the Public API
   * @async
   * @callback
   */
  @Method()
  async onChangeValue(Callback: Function) {
    this._onChange = Callback;
  }

  /**
   * onSelectValue
   * @description Sets the callback that is fired when the item is selected
   * @param callback callback sended with the Public API
   * @async
   * @callback
   */
  @Method()
  async onSelectValue(Callback: Function) {
    this._onSelect = Callback;
  }

  /**
   * changeValue
   * @description Sets the callback that is fired when any value is changed
   * @param newValue any value to change
   * @async
   */
  @Method()
  async changeValue(newValue: any) {
    this.value = newValue;
    this._onChange(this.value);
  }

  /**
   * toggleType
   * @description Sets the callback that is fired when the toggle type in the calendar changes
   * @param type the type of calendar we are viewing by month or year
   * @async
   */
  @Method()
  async toggleType(type: "month" | "year") {
    this.type = type;
  }

  /**
   * changeLocale
   * @description Sets the callback that is fired when the locale is changed
   * @param lang string that represents the language
   * @param localeSpec object that holds the specs of the locale
   * @async
   * @callback
   */
  @Method()
  async changeLocale(lang: string, localeSpec: object) {
    moment.defineLocale(lang, localeSpec);
    this.setData();
  }

  render() {
    // https://momentjs.com/docs/#/displaying/format/
    // let now = moment().format('dddd');
    return [
      
      <section class={this.card ? "calendar--card" : ""}>
        <slot>{/* Aqui van los custom headers */}</slot>
        <div class="calendar__controls">
          {/* Barra que va arriba del calendario */}
          {/* De los años */}
          { this.content.configuration.fullscreen
          ? <nova-icon class="btn_full" name="fas fa-expand fa-2x" onClick={() => this.fullscreen()}></nova-icon> : ""}
                  
          <select onChange={this.nowSetYear.bind(this)}>
            {this.years.map(year => (
              <option selected={this.activeYear == year}>{year}</option>
            ))}
          </select>
          {/* De los meses */}
          <select onChange={this.nowSetMonth.bind(this)}>
            {this.months.map((month, index) => (
              <option
                selected={this.activeMonth == index + 1}
                value={index + 1}
              >
                {month}
              </option>
            ))}
          </select>

          {/* Para cambiar meses/años */}
          <div class="calendar__controls__switch">
            <button
              class={`calendar__controls__months ${
                this.type === "month" ? "active" : ""
                }`}
              onClick={_ => this.toggleType("month")}
            >
              Month
            </button>
            <button
              class={`calendar__controls__years ${
                this.type === "year" ? "active" : ""
                }`}
              onClick={_ => this.toggleType("year")}
            >
              Year
            </button>
          </div>
        </div>

        {this.type === "month" ? 
          <div class="calendar">
            <div class="calendar__week calendar__header">
              {this.days.map(dayName => (
                <div class="calendar__day">{dayName}</div>
              ))}
            </div>
            {/* El wrapper del calendario */}
            {this.calendar.map(row => (
              <div class="calendar__week">
                {row.map(cell => (
                  <div
                    class={`calendar__day ${this.getCellClass(cell)}`}
                    tabIndex={0}
                    onClick={_ => this.nowChangeMonth(cell)}
                  >
                    <div class="calendar__number">{cell.day}</div>
                    <ul class="calendar__events">
                      {this.getEventsByDay(cell.day).map(event => (
                        <li>
                          <nova-icon name={event.type} color={event.color} />
                          {event.content}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
         :
          <div class="calendar">
            {this.monthCalendar.map(row => (
              <div class="calendar__week">
                {row.map(cell => (
                  <div
                    class={`calendar__day ${
                      this.value.format("YYYY/MM") === cell.format("YYYY/MM")
                        ? "selected"
                        : ""
                      }`}
                    tabIndex={0}
                  >
                    <div class="calendar__number">{cell.format("MMM")}</div>
                    <p class="calendar__events">
                      {this.getGeneralEventByMonth(cell.format("M"))}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        }
      </section>
    ];
  }
}
