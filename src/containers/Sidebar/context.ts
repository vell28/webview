import * as React from 'react';
import { Context } from './types';

export const context = React.createContext<Context | any>({});

export const Provider = context.Provider;
