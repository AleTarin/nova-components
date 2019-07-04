# Nova-components

Nova Components using Nova design system and stencil.

# Zero to Hero Team:

- Armando Aguiar
- Arturo Rojas
- Alejandro Roiz
- Alejandro De la Cruz
- Javier Saldivar

# Stencil

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool. Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Getting Started

When first downloading the repository you execute the following command:

```
npm install
```

Run:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```

### USE

Tabs and Popover are more DOM driven components.
Tabs requires a secuence of tab/panel slots to work well, but each slot can be any tag and can contain another DOM elements.
Popover has a title, content and close slots.

Calendar and Cascader are JSON driven components.
Add them to your html and "feed" them in your javascript.

```html
    <!-- DOM driven -->
    <nova-tabs mode="dark" position="vertical" type="card" default="3" jsprefix="nova-tabs" limit="99" add-button>
    <h3 slot="tab" disabled="true" closable> First Tab </h1>
    <section slot="panel" >
      <p>
        Tab Panel 1
      </p>
    </section>
    <h3 slot="tab" closable="true"> Second Tab </h1>
    <div slot="panel">
      <p>
        Tab Panel 2
      </p>
    </div>
    <h3 slot="tab" closable="true" selected="true"> Third Tab </h1>
    <div slot="panel">
      <p>
        Tab Panel 3
      </p>
    </div>
    <h3 slot="tab" closable="true"> Fourth Tab </h1>
    <div slot="panel">
      <p>
        Tab Panel 4
      </p>
    </div>
  </nova-tabs>

  <nova-popover trigger="click" location="right">
    <button slot="trigger">Click me !</button>
    <p slot="title"> Hi ! </p>
    <p slot="content"> This is a popover</p>
    <p slot="close"> click here to close </p>
  </nova-popover>

  <!-- JSON driven -->
  <nova-cascader></nova-cascader>
  <nova-calendar card mode="dark">
    <slot name="header">
      <h1>
        Calendario
      </h1>
    </slot>
  </nova-calendar>
```

```javascript
// When cascader is defined
customElements.whenDefined("nova-calendar").then(_ => {
  var calendarElement = document.querySelector("nova-calendar");
  calendarElement.componentOnReady().then(instance => {
    fetch("./assets/calendar.json")
      .then(response => {
        // Transform it to JSON
        return response.json();
      })
      .then(json => {
        // Pass the prop
        instance.content = json;
        instance.toggleType("year");
        let selected;
        instance.onSelectValue(moment => {
          console.log("onSelect", moment);
          instance.changeValue(moment);
        });
        instance.onChangeValue(moment => console.log("onChange", moment));
        instance.confjsonFull = json.configuration.fullscreen;
      })
      .catch(err => {
        // If any error ocurred, pass it to the console
        console.error(err);
      });
  });
});

customElements.whenDefined("nova-cascader").then(_ => {
  var cascaderElement = document.querySelector("nova-cascader");
  cascaderElement.componentOnReady().then(instance => {
    fetch("./assets/cascader.json")
      .then(response => {
        // Transform it to JSON
        return response.json();
      })
      .then(json => {
        // Pass the prop
        instance.content = json;
        instance.addCustomTrigger(document.querySelector("p"));
        // Test public api to focus
        instance.blurCascader();
        // Test public api that adds a callback when popup is open or close
        instance.onPopupChange(result => console.log("popup", result));
        // Test public api that adds a callback when a cascader item is selected
        instance.onCascaderSelect(result => console.log("select", result));
      })
      .catch(err => {
        // If any error ocurred, pass it to the console
        console.error(err);
      });
  });
});

customElements.whenDefined("nova-tabs").then(_ => {
  var tabsElement = document.querySelector("nova-tabs");
  tabsElement.componentOnReady().then(instance => {
    // public api to add a callback on edit (close or add)
    instance.onTabClick(function(keyIndex, event) {
      console.log("onTabClick", keyIndex, event);
    });
    instance.onEdit((keyIndex, eventName) => {
      console.log("onEdit", keyIndex, eventName);
    });
    let defaultText = "Tab";
    let tab = document.createElement("p");
    let panel = document.createElement("p");
    tab.innerText = defaultText;
    panel.innerHTML = defaultText;
    instance.addTab(tab, panel);
    instance.openTab(2);
    instance.closeTab(0);
  });
});
```

### SASS THEMES

All the components on this repository accept theming.
Use the prop "mode" to change the theme.
If the mode is not specified, it will take the "default" value

```html
<nova-calendar card mode="dark"></nova-calendar>
```

To add new themes to an specific component, add it to the header of the that component.

styleUrls takes an object, where the key is the "mode" and the value is the url of the css (this object must have a "default" attribute).

To add a new theme, just add a new attribute to this object and create the corresponding css file.

```javascript
@Component({
  tag: "nova-calendar",
  styleUrls: {
    default: "nova-calendar.default.scss",
    dark: "nova-calendar.dark.scss"
  },
  shadow: true
})
```

This method changes all the css, so you can change redefine everything in the component's style.

```scss
@import "./nova-cascader.common.scss";
$primary: rgba(0, 0, 0, 0.8);
$secondary: #ffffff;
$shadow: rgba(255, 255, 255, 0.15);
$danger: rgba(255, 0, 0, 0.5);
.cascader__search {
  input {
    color: $secondary;
    border: 1px solid $secondary;
    background: $primary;
  }
  nova-icon {
    color: $secondary;
  }
}
```

Or just change the variables of another common sass file.

```scss
$primary: #1890ff;
$secondary: black;
$fontColor: white;
$borderColor: #d4d4d4;

@import "nova-calendar.common.scss";
```
###Github pages url with web components

https://armandoalamilla.github.io/web-components-demo/
