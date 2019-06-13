import { Element, Component, h} from '@stencil/core';


@Component({
  tag: 'nova-tabs',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @Element() el: HTMLElement;
  

  
  //  querySelector -> getElementsByClassName
  //  getElementById -> es lo mismo que sin shadow root
  // meter el @Element() el: HTMLElement; y shadowRoot
  openCity(evt, cityName) {
    var i,tabcontent,tablinks;
          
    tabcontent = this.el.shadowRoot.querySelector(".tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = this.el.shadowRoot.querySelector(".tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    this.el.shadowRoot.getElementById(cityName).style.display = "block";
    console.log(evt);
    (evt.currentTarget as HTMLElement).className += " active";
   
  }   

  render() {

    return [
      <div class="tab">
       <button class="tablinks" onClick={() => this.openCity(event, 'London')}>London</button>
       <button class="tablinks" onClick={() => this.openCity(event, 'Merida')}>Merida</button>         
      </div>,

      <div id="London" class="tabcontent">
      <h3>London</h3>
      <p>London is the capital city of England.</p>
      </div>,

      <div id="Merida" class="tabcontent">
        <h3>Merida</h3>
        <p>Merida is the capital city of yucatan.</p>
      </div>

      

    ];

  }


  }
        
    
  

