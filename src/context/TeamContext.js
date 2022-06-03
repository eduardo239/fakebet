import React, { useState } from 'react';

const TeamContext = React.createContext();

const TeamProvider = TeamContext.Provider;

const TeamContextContent = ({ children }) => {
  const [team, setTeam] = useState({ name: '', shortName: '', type: '' });
  const [teams, setTeams] = useState(null);
  const [files, setFiles] = React.useState([]);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const resetTeam = () => {
    setTeam({ name: '', shortName: '', type: '' });
  };

  return (
    <TeamProvider
      value={{
        team,
        teams,
        setTeam,
        setTeams,
        resetTeam,
        files,
        setFiles,
        isUpdating,
        setIsUpdating,
      }}
    >
      {children}
    </TeamProvider>
  );
};

export { TeamContext, TeamContextContent };
