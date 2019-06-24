/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface NovaCalendar {
    'name': string;
  }
  interface NovaCascader {
    'addCustomTrigger': (el: HTMLElement) => Promise<void>;
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
    'trigger': "hover" | "focus" | "click";
  }
  interface NovaTabs {
    /**
    * addTab
    */
    'addTab': (tabData: any) => Promise<void>;
    /**
    * closeTab
    */
    'closeTab': (index: number) => Promise<void>;
    'confjson': any;
    'datajson': {
      items: any[];};
      'funcion': string;
      'newTabData': { "title": string; "icon": string; "enableTab": boolean; "closableTab": boolean; "content": string; };
      'nombreFuncion': string;
      /**
      * onEdit
      */
      'onEdit': (callback: Function) => Promise<void>;
      /**
      * onEdit
      */
      'onTabClick': (callback: Function) => Promise<void>;
      /**
      * openTab
      */
      'openTab': (keyIndex: any, event?: UIEvent) => Promise<void>;
      'updater': boolean;
    }
  }

  declare global {


    interface HTMLNovaCalendarElement extends Components.NovaCalendar, HTMLStencilElement {}
    var HTMLNovaCalendarElement: {
      prototype: HTMLNovaCalendarElement;
      new (): HTMLNovaCalendarElement;
    };

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
      'nova-calendar': HTMLNovaCalendarElement;
      'nova-cascader': HTMLNovaCascaderElement;
      'nova-icon': HTMLNovaIconElement;
      'nova-popover': HTMLNovaPopoverElement;
      'nova-tabs': HTMLNovaTabsElement;
    }
  }

  declare namespace LocalJSX {
    interface NovaCalendar extends JSXBase.HTMLAttributes<HTMLNovaCalendarElement> {
      'name'?: string;
    }
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
      'trigger'?: "hover" | "focus" | "click";
    }
    interface NovaTabs extends JSXBase.HTMLAttributes<HTMLNovaTabsElement> {
      'confjson'?: any;
      'datajson'?: {
        items: any[];};
        'funcion'?: string;
        'newTabData'?: { "title": string; "icon": string; "enableTab": boolean; "closableTab": boolean; "content": string; };
        'nombreFuncion'?: string;
        'updater'?: boolean;
      }

      interface IntrinsicElements {
        'nova-calendar': NovaCalendar;
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


