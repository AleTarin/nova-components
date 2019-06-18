/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface NovaCascader {
    'content': cascader;
    'expandTrigger': string;
  }
  interface NovaIcon {
    /**
    * Props
    */
    'name': string;
    'options'?: string;
    'pre'?: string;
    'size'?: string;
  }
}

declare global {


  interface HTMLNovaCascaderElement extends Components.NovaCascader, HTMLStencilElement {}
  var HTMLNovaCascaderElement: {
    prototype: HTMLNovaCascaderElement;
    new (): HTMLNovaCascaderElement;
  };

  interface HTMLNovaIconElement extends Components.NovaIcon, HTMLStencilElement {}
  var HTMLNovaIconElement: {
    prototype: HTMLNovaIconElement;
    new (): HTMLNovaIconElement;
  };
  interface HTMLElementTagNameMap {
    'nova-cascader': HTMLNovaCascaderElement;
    'nova-icon': HTMLNovaIconElement;
  }
}

declare namespace LocalJSX {
  interface NovaCascader extends JSXBase.HTMLAttributes<HTMLNovaCascaderElement> {
    'content'?: cascader;
    'expandTrigger'?: string;
  }
  interface NovaIcon extends JSXBase.HTMLAttributes<HTMLNovaIconElement> {
    /**
    * Props
    */
    'name'?: string;
    'options'?: string;
    'pre'?: string;
    'size'?: string;
  }

  interface IntrinsicElements {
    'nova-cascader': NovaCascader;
    'nova-icon': NovaIcon;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


