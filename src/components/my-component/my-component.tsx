import { Component, Prop,h,Element,State} from "@stencil/core";


@Component({
    tag: 'nova-tabs',
    styleUrl: 'my-component.css',
    shadow: true
})

export class NovaTabs {
  
  @Prop() datajson :string;
  @Element() el: HTMLElement;
  @State() event:any;
  @Prop() styleVertical:string = 'verticalTab.css'
 
 
  

  

  

 openTab(evt, cityName) {
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
  evt.currentTarget.className += " active";
  console.log(evt);
} 

closeTab()
{

 this.el.parentElement.style.display='none';
 


}
 
  render() {
    return[

      
      
      //se generan los onclicks
      <div class="tab">
        {JSON.parse(this.datajson).items.map((entra)=>
        <button disabled={!entra.enableTab} class="tablinks" onClick={() => this.openTab(this.event,entra.title)} id={entra.default}>
          <span><img src={entra.icon}></img></span>{entra.title}</button>        
        )      
        }

      </div>,      
      
      
   
   
      //se obtienen datos del json para generar el contenido de las tabs
    <div>
      {JSON.parse(this.datajson).items.map((entra)=>        
        <div id={entra.title} class="tabcontent">
          <span onClick={() => this.closeTab()} class="topright">x</span>
          <h3>{entra.title}</h3>
          <p>{entra.content}</p>          
        </div>
        
      )}
    </div>,

    <slot></slot>
 




    
      ]

      
      
    
  
  }
}