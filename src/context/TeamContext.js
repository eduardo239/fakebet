import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';

const TeamContext = React.createContext();

const TeamProvider = TeamContext.Provider;

const TeamContextContent = ({ children }) => {
  const [team, setTeam] = useState({ name: '', shortName: '', type: '' });
  const [teams, setTeams] = useState([]);
  const [files, setFiles] = React.useState([]);

  const [isUpdating, setIsUpdating] = React.useState(false);

  const resetTeam = () => {
    setTeam({ ...team, name: '', shortName: '' });
  };

  const {
    data: sportsData,
    loading: sportsLoading,
    error: sportsError,
  } = useFetch(`/sports/all`);

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
        sportsData,
        sportsLoading,
        sportsError,
      }}
    >
      {children}
    </TeamProvider>
  );
};

export { TeamContext, TeamContextContent };
