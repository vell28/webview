import * as React from 'react';
import { ContextProps } from './types';

export const Context = React.createContext<ContextProps | any>({});

export const Provider = Context.Provider;
