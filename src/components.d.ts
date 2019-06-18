/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface NovaTabs {
    'datajson': string;
    'parsedjson': any;
  }
}

declare global {


  interface HTMLNovaTabsElement extends Components.NovaTabs, HTMLStencilElement {}
  var HTMLNovaTabsElement: {
    prototype: HTMLNovaTabsElement;
    new (): HTMLNovaTabsElement;
  };
  interface HTMLElementTagNameMap {
    'nova-tabs': HTMLNovaTabsElement;
  }
}

declare namespace LocalJSX {
  interface NovaTabs extends JSXBase.HTMLAttributes<HTMLNovaTabsElement> {
    'datajson'?: string;
    'parsedjson'?: any;
  }

  interface IntrinsicElements {
    'nova-tabs': NovaTabs;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


