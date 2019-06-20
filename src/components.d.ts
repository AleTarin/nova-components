/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface NovaCascader {
    /**
    * blurCascader
    */
    'blurCascader': () => Promise<void>;
    'content': cascader;
    /**
    * focusCascader
    */
    'focusCascader': () => Promise<void>;
    /**
    * onCascaderSelect
    */
    'onCascaderSelect': (callback: cascaderCallback) => Promise<void>;
    /**
    * onPopupChange
    */
    'onPopupChange': (callback: cascaderCallback) => Promise<void>;
    'size': string;
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
  interface NovaPopover {
    'popclick': boolean;
    'popfocus': boolean;
    'pophover': boolean;
  }
  interface NovaTabs {
    'datajson': string;
    'funcion': string;
    'nombreFuncion': string;
    'styleVertical': string;
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

  interface HTMLNovaPopoverElement extends Components.NovaPopover, HTMLStencilElement {}
  var HTMLNovaPopoverElement: {
    prototype: HTMLNovaPopoverElement;
    new (): HTMLNovaPopoverElement;
  };

  interface HTMLNovaTabsElement extends Components.NovaTabs, HTMLStencilElement {}
  var HTMLNovaTabsElement: {
    prototype: HTMLNovaTabsElement;
    new (): HTMLNovaTabsElement;
  };
  interface HTMLElementTagNameMap {
    'nova-cascader': HTMLNovaCascaderElement;
    'nova-icon': HTMLNovaIconElement;
    'nova-popover': HTMLNovaPopoverElement;
    'nova-tabs': HTMLNovaTabsElement;
  }
}

declare namespace LocalJSX {
  interface NovaCascader extends JSXBase.HTMLAttributes<HTMLNovaCascaderElement> {
    'content'?: cascader;
    'size'?: string;
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
  interface NovaPopover extends JSXBase.HTMLAttributes<HTMLNovaPopoverElement> {
    'popclick'?: boolean;
    'popfocus'?: boolean;
    'pophover'?: boolean;
  }
  interface NovaTabs extends JSXBase.HTMLAttributes<HTMLNovaTabsElement> {
    'datajson'?: string;
    'funcion'?: string;
    'nombreFuncion'?: string;
    'styleVertical'?: string;
  }

  interface IntrinsicElements {
    'nova-cascader': NovaCascader;
    'nova-icon': NovaIcon;
    'nova-popover': NovaPopover;
    'nova-tabs': NovaTabs;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


