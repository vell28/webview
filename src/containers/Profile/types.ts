import { User, Response } from '@/models';
import { SyntheticEvent } from 'react';

export interface Props {
    user: User;
    response: Response;
    sidebar: boolean;
    locale: any;
    progressBar: number; 
    onClickOutsideInput: () => void;
    onInputFocus: () => void;
    handleBlur: () => void;
    updateUserAction: (obj: any) => void;
    setResponseAction: (obj: any) => void;
    startProgressAction: () => void;
}

export interface Context {
    locale: any; 
    switched: Response;
    reliability: number;
    valid: { 
        text: number;
        error: boolean
    };
    progressBar: number; 
    editing: boolean;
    user: User;
    setSwitched: () => void;
    setValid: (bool: boolean) => void;
    setReliability: (num: number) => void;
    handlePasswordChange: (password: string, retype: number) => void;
    onClickOutsideInput: () => void;
    handlerUpdate: (event: SyntheticEvent) => void;
    onInputFocus: () => void;
    handleBlur: () => void;
    updateUserAction: (obj: any) => void;
    setResponseAction: (obj: any) => void;
}
