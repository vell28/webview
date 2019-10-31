export interface Props {
    error: string; 
    value: string | any;
    name: string;
    disabled: boolean;
    classname?: string;
    onChange?: () => void;
    type: string;
    placeholder: any;
    intl: any;
    onClick?: () => void;
    inputRef?: any;
    onBlur?: () => void;
    onFocus?: () => void;
}
