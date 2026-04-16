import React from 'react';

declare module '@google/model-viewer';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        poster?: string;
        alt?: string;
        autoplay?: boolean;
        'camera-controls'?: boolean;
        'animation-name'?: string;
        ar?: boolean;
        style?: React.CSSProperties; // Añadido para que no falle el style
      };
    }
  }
}

export {}; // <--- ESTO ES LO QUE FALTA PARA QUE TS LO LEA