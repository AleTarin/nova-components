import { Component, Prop,h,Element,State} from "@stencil/core";

/*
  Declaracion incial del componente, se tiene el nombre del tag, url del css y el 
  shadow dom activado
*/
@Component({
    tag: 'nova-tabs',
    styleUrl: 'my-component.css',
    shadow: true
})


export class NovaTabs {
  /* 
    Atributos y elementos de la clase del componente:
    @Prop() datajson :string; --> se encarga de recibir el json desde el html como string
    @Element() el: HTMLElement; -->se encarga de poder permitir el acceso a las funciones nativas de html/jss
                                   usando shadow dom
    @State() event:any; --> se encarga de recibir un evento cuando se cambia de pestaña (pestaña actual)
    @Prop() funcion:string; --> se encarga de guardar la funcion que se mando por el json
    @Prop() nombreFuncion:string; --> se encarga de guardar la nombre de la funcion.

  */
  @Prop() datajson :string;
  @Element() el: HTMLElement;
  @State() event:any;
  @Prop() funcion:string;
  @Prop() nombreFuncion:string;  

  
/*
  * funcion que se encarga de mostrar el contenido de una pestaña cuando se le da click,
  * carga el css y ejecuta el script al hacer click en el boton(en caso de mandar codigo)
  * parametros: string cityName(nombre de la tab), nombre(nombre de la funcion), funcion(funcion mandada desde el json)
  * return nada
*/
 openTab(cityName, nombre, funcion) {

  //declaracion de variables.  
  var i,tabcontent,tablinks;
  
  //esto se encarga de ocultar las tabs que no estan activadas en el momento.  
  tabcontent = this.el.shadowRoot.querySelectorAll(".tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  //se encarga de controlar cual es el link de pestaña activado
  tablinks = this.el.shadowRoot.querySelectorAll(".tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  this.el.shadowRoot.getElementById(cityName).style.display = "block";
  
  //se recibe el nombre y la funcion de la tab actual (si es que hay)  
  this.nombreFuncion = nombre;
  this.funcion = funcion;

  //this.el.shadowRoot.getElementById(this.contador).innerHTML = this.funcion + this.nombreFuncion;
  //this.el.shadowRoot.getElementById(this.contador).innerHTML = "";

  //se encarga de ejecutar la funcion recibida mediante la creacion de un <script>
  //emulacion de un callback
  if(this.funcion != "" && this.nombreFuncion!='')
  {
    var btn = document.createElement("script");   // Create a <script> element
    btn.innerHTML = this.funcion + this.nombreFuncion; // Insert text
    document.body.appendChild(btn);
  } 

   //evt.currentTarget.className += " active";
} 

/* 
  funcion que se encarga de cerrar la pestaña elegida, se elimina la pestaña entera asi como
  el contenido de la misma
  *parametros: ninguno
  *retorno: nada
*/

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
      
      /*
        se genera el html necesario que hace los botones de las pestañas, se manda a llamar la funcion openTab
        y poner iconos en caso de existir.
      */
      <div id="div_tab" class="tab">
        {JSON.parse(this.datajson).items.map((entra)=>
        <button disabled={!entra.enableTab} class="tablinks" onClick={() => this.openTab(entra.title,entra.nameFunction,entra.function)} id={entra.default}>
          <span><img src={entra.icon}></img></span>{entra.title}</button>        
        )      
        }

      </div>,      
      
      
   
   
    /* 
        se genera el html necesarion que despliega el contenido de las pestañas.
    */
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