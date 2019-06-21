import { setMode } from '@stencil/core';

setMode(elm => {
    return elm.getAttribute('mode') || (elm as any).mode || 'default';
});