import { GroupTeamDto, Team, Tournament } from '@api';
import { Box, Grid } from '@mui/material';
import { Button, createModal, EffectorModal } from '@ui';
import { createGate, useStore } from 'effector-react';
import { chunk, shuffle } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { allocateTeamsModal, allocateTeamsModel } from '../model';
import GroupTeamsTable from './GroupTeamsTable';

interface ModalProps {
  tournament: Tournament;
}

const GROUP_SIZE = 4;

const ModalGate = createGate();

const ModalView = ({ tournament }: ModalProps) => {
  const [currentTeams, setCurrentTeams] = useState<Record<number, Team[]>>({});

  const allocateRandomly = useCallback(() => {
    const shuffledTeams = chunk(shuffle(tournament.teams), GROUP_SIZE);
    const groupTeams: Record<number, Team[]> = tournament.tournamentGroups.reduce((acc, key, index) => {
      return {
        ...acc,
        [key.id]: shuffledTeams[index],
      };
    }, {});
    setCurrentTeams(groupTeams);
  }, [tournament.teams, tournament.tournamentGroups]);

  const mounted = useStore(ModalGate.status);

  useEffect(() => {
    if (!mounted) {
      allocateRandomly();
    }
  }, [allocateRandomly, mounted]);

  if (Object.keys(currentTeams).length === 0) {
    return null;
  }

  const mapCurrentTeamsToAllocateDto = (): Record<number, GroupTeamDto[]> => {
    return Object.keys(currentTeams).reduce((acc, key) => {
      return {
        ...acc,
        [key]: currentTeams[+key].map((x, index) => {
          return {
            id: x.id,
            order: index,
          };
        }),
      };
    }, {});
  };

  const handleSave = () => {
    allocateTeamsModel.events.teamsAllocated({
      id: tournament.id,
      groupTeams: mapCurrentTeamsToAllocateDto(),
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <ModalGate />
      <div>
        <Button sx={{ mb: 2 }} onClick={allocateRandomly}>Allocate randomly</Button>
      </div>
      <Grid container sx={{ mb: 2 }}>
        <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap' }} container spacing={2}>
          {
            tournament.tournamentGroups.map((x) => {
              return (
                <Grid item sx={{ width: 'calc(100% / 3)' }}>
                  <GroupTeamsTable group={x} teams={currentTeams[x.id] || []} />
                </Grid>
              );
            })
          }
        </Grid>
        {/* <Grid item xs={3} /> */}
      </Grid>
      <Box sx={{ ml: 'auto', display: 'flex' }}>
        <Button onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

const AllocateTeamsModal = EffectorModal({
  View: ModalView,
  getTitle: () => 'Allocate Teams to Groups',
  modal: allocateTeamsModal,
});

export default AllocateTeamsModal;
