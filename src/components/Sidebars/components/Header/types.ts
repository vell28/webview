import { User } from '@/models';

export interface Props {
    user: User;
    onChangeMenu: () => void;
}
