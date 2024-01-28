import React, { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Profile from './Profile'
import { useStoreActions, useStoreState } from 'easy-peasy';

const ProfileController = () => {
    const [navItems, setNavItems] = useOutletContext();
    const { handleLogOut } = useStoreActions(actions => actions);
    const { user } = useStoreState(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        const navItems = [
          { label: "Chat Room", path: `${user.username}` },
          {
            label: "Log Out",
            func: () => {
              handleLogOut();
              navigate("/login");
            },
          },
        ];

        setNavItems(navItems);
    }, [])
  return (
    <Profile/>
  )
}

export default ProfileController