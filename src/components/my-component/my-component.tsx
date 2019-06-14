import { Component,h,Prop} from '@stencil/core';


@Component({
  tag: 'nova-tabs',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @Prop() titulo: string;
  @Prop() descripcion: string;

  componentWillLoad()
  {
    console.log(this.titulo);
    console.log(this.descripcion);
  }

  

  
  
  
  render() {
    return (
      <p></p>
    )
  }

    
    
  
}
