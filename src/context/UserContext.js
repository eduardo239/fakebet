import React, { useState } from 'react';
import { userLogout } from '../api/user';

const UserContext = React.createContext();

const UserProvider = UserContext.Provider;

const UserContextContent = ({ children }) => {
  const [user, setUser] = useState(null);
  const [user_, setUser_] = useState({
    userId: '',
    username: '',
    password: '',
    password2: '',
    email: '',
  });

  const logout = async () => {
    localStorage.removeItem('user');
    await userLogout();
    setUser(null);
  };

  return (
    <UserProvider
      value={{
        user,
        setUser,
        logout,
        user_,
        setUser_,
      }}
    >
      {children}
    </UserProvider>
  );
};

export { UserContext, UserContextContent };
