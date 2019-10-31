import { User } from '@/models/user';

export interface Props {
    pathname: string;
    user: User;
    onChangeMenu: () => void;
    logOut: () => void
}
