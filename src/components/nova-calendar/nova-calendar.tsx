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

@Component({
  tag: "nova-calendar",
  styleUrl: "nova-calendar.scss",
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
  @Prop() disabledDate: boolean;

  @Prop() activeMonth: number = Number(moment().format("M"));
  @Prop() activeYear: number = Number(moment().format("YYYY"));
  @Prop() yearMonthSwitch: boolean = true;

  // Props changeable by methods
  @Prop({ mutable: true }) value: Moment = moment(); //moment
  @Prop({ mutable: true }) type: "month" | "year" = "month";
  @Prop({ mutable: true }) card: boolean = false;
  @Prop({ mutable: true }) validRange: [Moment, Moment];
  // Locale - update by @method

  // Callbacks
  @Prop({ mutable: true }) _onSelect: Function = function (_date: Moment) { };
  @Prop({ mutable: true }) _onChange: Function = function (_date: Moment) { };

  @State() calendar: any[] = [];
  @State() monthCalendar: any[] = [];

  // https://momentjs.com/docs/#/displaying/format/
  @State() now: Moment = moment();
  @State() eventsByYear: {};
  @State() eventsByMonth: {};
  @State() generalEvents: {};
  @State() months: string[];
  @State() years: number[];
  @State() days: string[];

  @Element() public host: HTMLElement;

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

  nowSetYear(event) {
    this.activeYear = event.target.value;
    this.now = moment(this.now).year(this.activeYear);
    this.fillCalendar();
  }

  nowSetMonth(event) {
    this.activeMonth = Number(event.target.value);
    this.now = moment(this.now).month(this.activeMonth - 1);
    this.fillCalendar();
  }

  toggleType(type: "month" | "year") {
    this.type = type;
  }

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

  setData() {
    this.months = moment.monthsShort();
    this.days = moment.weekdaysShort();
    this.years = range(
      Number(this.validRange[0].format("Y")),
      Number(this.validRange[1].format("Y"))
    );
  }

  componentDidLoad() {
    this.fillCalendar();
  }

  componentWillLoad() {
    this.validRange = [
      this.value.clone().subtract(10, "years"),
      this.value.clone().add(10, "years")
    ];
    this.setData();
  }

  @Watch("content")
  watchContent() {
    this.getEventsByYear();
    this.getEventsByMonth();
  }

  @Watch("activeYear")
  getEventsByYear() {
    this.eventsByYear = this.content.data.items[this.activeYear] || {};
    this.getEventsByMonth();
  }

  @Watch("activeMonth")
  getEventsByMonth() {
    this.eventsByMonth = this.eventsByYear[this.activeMonth] || {};
  }

  getEventsByDay(day) {
    return (this.eventsByMonth && this.eventsByMonth[day]) || [];
  }

  getGeneralEventByMonth(month) {
    this.eventsByMonth = this.eventsByYear[month] || {};
    return this.eventsByMonth["event"];
  }

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

  @Method()
  async fullscreen() {
    this.host.requestFullscreen();
  }

  @Method()
  async onChangeValue(Callback: Function) {
    this._onChange = Callback;
  }

  @Method()
  async onSelectValue(Callback: Function) {
    this._onSelect = Callback;
  }

  @Method()
  async changeValue(newValue: any) {
    this.value = newValue;
    this._onChange(this.value);
  }

  @Method()
  async changeType(newType: "month" | "year") {
    this.type = newType;
  }

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
          <nova-icon class="btn_full" name="fas fa-expand fa-2x" onClick={() => this.fullscreen()}></nova-icon>
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
