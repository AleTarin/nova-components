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
 
 
  doHomework(callback) {
    callback();
  }
  

  

 openTab(evt, cityName, funcion, nombreFunc) {
  
  var i,tabcontent,tablinks;

  tabcontent = this.el.shadowRoot.querySelectorAll(".tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = this.el.shadowRoot.querySelectorAll(".tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  this.el.shadowRoot.getElementById(cityName).style.display = "block";
  console.log(funcion)
  console.log(nombreFunc)  
  

  
  if(funcion!="" && nombreFunc!="")
{
    this.el.shadowRoot.getElementById("yei").innerHTML = "<script>" + funcion +'</' +"script>";
    this.doHomework(eval(nombreFunc));
    
}
   evt.currentTarget.className += " active";
} 

closeTab()
{

 this.el.parentElement.style.display='none';


}



componentWillLoad()
{
  console.log(this.datajson)
}
 
  render() {
    return[

      
      
      //se generan los onclicks
      <div class="tab">
        {JSON.parse(this.datajson).items.map((entra)=>
        <button disabled={!entra.enableTab} class="tablinks" onClick={() => this.openTab(this.event,entra.title,entra.function,entra.nameFunction)} id={entra.default}>
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

    <div id="yei">

    </div>
 




    
      ]

      
      
    
  
  }
}