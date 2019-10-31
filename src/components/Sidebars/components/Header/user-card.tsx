import * as React from 'react'
import { NavLink } from 'react-router-dom';

import routings from '@/routing/constants';
// tmp object just for test data
const UserTmp = {
  firstName: 'Andrew',
  lastName: 'Levchenko',
  role: 'User',
  balance: 530,
  photo: 'https://cdn.zeplin.io/5d0093522f25b319dc969b8f/assets/2bbbfbf1-041f-4375-8426-3ff18aa5edb5.png'
}

const UserCard: React.FunctionComponent<any> = (props) => {
  const { user, onChangeMenu } = props;
  
  const { email, firstName, lastName, image } = user;

  return (
    <div className="user-card">
      <NavLink
        onClick={ onChangeMenu }
        to={ routings.profile }
      >
        <div className="user-photo-container">
          <img src={image} alt="User" className="user-photo" />
        </div>
      </NavLink>
        
        <div className="user-info">
          <div>
            <NavLink
              onClick={ onChangeMenu }
              to={ routings.profile }
            >
              <div className="user-name">

                {firstName && lastName 
                  ? `${firstName} ${lastName}`.substr(0, 20) 
                    : email && email.length < 17 ? email 
                  : `${email.substr(0, 17)}...`
                }

              </div>
            </NavLink>  
            <div className="user-role">{UserTmp.role}</div>
          </div>

          <div className="user-balance">{UserTmp.balance}</div>
        </div>
    </div>
  )
}

export default React.memo(UserCard);
