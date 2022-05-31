import React, { useState } from 'react';
import { userLogout } from '../api/game';

const UserContext = React.createContext();

const UserProvider = UserContext.Provider;

const UserContextContent = ({ children }) => {
  const [user, setUser] = useState(null);

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
      }}
    >
      {children}
    </UserProvider>
  );
};

export { UserContext, UserContextContent };
