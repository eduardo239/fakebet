import React, { useState } from 'react';
import { getSports } from '../api/sport';

const TeamContext = React.createContext();

const TeamProvider = TeamContext.Provider;

const TeamContextContent = ({ children }) => {
  const [team, setTeam] = useState({ name: '', shortName: '', type: '' });
  const [teams, setTeams] = useState([]);
  const [files, setFiles] = React.useState([]);
  const [sports, setSports] = React.useState([]);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const resetTeam = () => {
    setTeam({ ...team, name: '', shortName: '' });
  };

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      (async () => {
        const { data: responseSports } = await getSports();

        if (responseSports.success) {
          setSports(responseSports.sports);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <TeamProvider
      value={{
        team,
        teams,
        sports,
        setTeam,
        setTeams,
        resetTeam,
        files,
        setFiles,
        isUpdating,
        setIsUpdating,
        setSports,
      }}
    >
      {children}
    </TeamProvider>
  );
};

export { TeamContext, TeamContextContent };
