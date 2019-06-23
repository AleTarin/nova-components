import { Component, Prop,h,Element,State} from "@stencil/core";


@Component({
    tag: 'nova-tabs',
    styleUrl: 'nova-tabs.css',
    shadow: true
})

export class NovaTabs {
  
  @Prop() datajson :string;
  @Element() el: HTMLElement;
  @State() event:any;
  @Prop() styleVertical:string = 'verticalTab.css'
  @Prop() funcion:string;
  @Prop() nombreFuncion:string;

 openTab(cityName, nombre, funcion) {
  
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
  
  this.nombreFuncion = nombre;
  this.funcion = funcion;

  //this.el.shadowRoot.getElementById(this.contador).innerHTML = this.funcion + this.nombreFuncion;
  //this.el.shadowRoot.getElementById(this.contador).innerHTML = "";

  if(this.funcion != "" && this.nombreFuncion!='')
  {
    var btn = document.createElement("script");   // Create a <button> element
    btn.innerHTML = this.funcion + this.nombreFuncion;                 // Insert text
    document.body.appendChild(btn);
  }
  

  

   //evt.currentTarget.className += " active";
} 

closeTab()
{

 //this.el.parentElement.style.display='none';
 var i,tabcontent;

 tabcontent = this.el.shadowRoot.querySelectorAll(".tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

}


/*componentWillUpdate()
{
  var btn = document.createElement("script");   // Create a <button> element
  btn.innerHTML = this.funcion + this.nombreFuncion;                 // Insert text
  document.body.appendChild(btn);               // Append <button> to <body>  

}*/

 
  render() {
    return[  
      
      //se generan los onclicks
      <div id="div_tab" class="tab">
        {JSON.parse(this.datajson).items.map((entra)=>
        <button disabled={!entra.enableTab} class="tablinks" onClick={() => this.openTab(entra.title,entra.nameFunction,entra.function)} id={entra.default}>
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
    </div>

    


 




    
      ]
  }
}