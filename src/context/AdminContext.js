import React from 'react';

const AdminContext = React.createContext();
const AdminProvider = AdminContext.Provider;

const AdminContextContent = ({ children }) => {
  return <AdminProvider value={{}}>{children}</AdminProvider>;
};

export { AdminContext, AdminContextContent };
