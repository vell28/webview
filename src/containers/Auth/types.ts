import { 
    Response, GetForgotPassword, GetLogin, GetSignUp 
} from '@/models';

export interface Props {
    pathname: string;
    location: any;
    search: string;
    getSignUpAction: ({}: GetSignUp) => void;
    getLoginAction: ({}: GetLogin) => void;
    getForgotPassAction: ({}: GetForgotPassword) => void;
    getResetPassAction: ({}: any) => void;
    history: any;
    response: Response;
    onClickOutsideInput: () => void;
    onInputFocus: () => void;
    setResponseAction: ({}: any) => void;
    handleBlur: () => void;
}

export interface ContextProps {
    pathname: string;
    handleSubmit: (obj: any) => void;
    response: Response;
    history: any;
    onClickOutsideInput: () => void;
    setResponseAction: ({}: any) => void;
    onInputFocus: () => void;
    handleBlur: () => void;
}
