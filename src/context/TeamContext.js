import React, { useState } from 'react';

const TeamContext = React.createContext();

const TeamProvider = TeamContext.Provider;

const TeamContextContent = ({ children }) => {
  const [team, setTeam] = useState(null);
  const [teams, setTeams] = useState(null);

  return (
    <TeamProvider
      value={{
        team,
        teams,
        setTeam,
        setTeams,
      }}
    >
      {children}
    </TeamProvider>
  );
};

export { TeamContext, TeamContextContent };
