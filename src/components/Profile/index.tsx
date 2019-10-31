import * as React from 'react';

import ProfileForm from './Form';
import messages from './messages';
import { translateText } from '@/utils/format-text';
import { Hamburger } from '../Basic';
import { context } from '@/containers/Profile/context';
import { ProgressBar } from '@/components/Basic';

const ProfileComponent: React.FunctionComponent<any> = () => {
    const { 
        onClickOutsideInput, handlerUpdate, user, progressBar
    } = React.useContext(context);

    const [ editing, setEditing ] = React.useState<boolean>(false);
    const [ avatar, setAvatar ]   = React.useState<string>('');
    const [ country, setCountry ] = React.useState<boolean>(false);

    const { email, firstName, lastName, image } = user;

    const handleChange = (e: React.SyntheticEvent) => {
        const { files, value } = e.target as HTMLInputElement;

        if(value !== avatar) {
            handlerUpdate(e);
            setAvatar(value);
        }
    }

    return (
        <>
            { progressBar >= 0 && <ProgressBar progress={ progressBar }/> }
            <div 
                className={`profile-wrapper${editing ? ' editing' : ''}`} 
                onClick={ onClickOutsideInput } 
            >
                <div className={`hamburger-bg${editing ? ' active' : ''}`}/>
                <Hamburger />
                <div className={`profile-top-bg${editing ? ' opacity' : ''}`}>
                    <div className="profile-edit-icon">
                        <span 
                            className="edit-btn"
                            onClick={ () => setEditing(true) }
                        />
                    </div>
                    <div className="profile-top-circle">
                        <div className="profile-circle-wrap">
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className="profile-photo-wrap">
                    <div className="profile-photo-block">
                        <img src={ image } alt="photo"/>
                        <span className={`photo-icon${editing ? ' active' : ''}`} >
                            <input 
                                type="file"
                                name="file"
                                value={ avatar }
                                onChange={ handleChange }
                                accept="image/*"
                            />
                        </span>
                    </div>
                </div>
                <div className={`profile-bottom-bg${editing ? ' opacity' : ''}`}>
                    <div className="profile-info-wrap">
                        <h3>
                            { firstName && lastName 
                                ? `${firstName} ${lastName}`.substr(0, 25) 
                                : email && email.substr(0, 25) 
                            }
                        </h3>
                    </div>
                </div>
                { editing && 
                    <div className={`profile-main-section${country ? ' country' : ''}`}>
                        <h3>{ translateText(messages.title) }</h3>
                        <ProfileForm 
                            country={country} 
                            setCountry={setCountry}
                        />
                    </div>
                }   
            </div>
        </>
    )
};

export default React.memo(ProfileComponent);
