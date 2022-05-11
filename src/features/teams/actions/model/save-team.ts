import {
  CreateTeamDto,
  Flag,
  Region,
  UpdateTeamDto,
} from '@api';
import { teamsModel } from '@entities/teams';
import { createForm } from '@lib';
import { createModal, ModalState } from '@ui';
import { createEvent, sample, split } from 'effector';
import { teamPlayersModel } from './team-players';

const mapParams = (modalData: ModalState) => {
  return {
    id: modalData.data,
  };
};

export const saveTeamModal = createModal({
  name: 'save-team',
  initFx: teamsModel.effects.getOneFx,
  mapParams,
});

teamPlayersModel.$teamPlayers.reset(saveTeamModal.closed);

export interface SaveTeamFormValues {
  name: string;
  countryCode: string;
  region: Region;
  flag: Flag | null;
  id?: number;
}

const teamCreated = createEvent<SaveTeamFormValues>();
const teamUpdated = createEvent<SaveTeamFormValues>();

export const saveTeamModel = {
  events: {
    ...createForm<SaveTeamFormValues>().events,
    teamCreated,
    teamUpdated,
  },
};

sample({
  clock: teamsModel.effects.getOneFx.doneData,
  target: teamPlayersModel.$teamPlayers,
  fn: ({ response }) => {
    return response.players.reduce((acc, key) => {
      return {
        ...acc,
        [key.displayId]: key,
      };
    }, {});
  },
});

split({
  source: saveTeamModel.events.formValidated,
  match: {
    created: (formValues: SaveTeamFormValues) => !formValues.id,
    updated: (formValues: SaveTeamFormValues) => Boolean(formValues.id),
  },
  cases: {
    created: teamCreated,
    updated: teamUpdated,
  },
});

sample({
  clock: saveTeamModel.events.teamCreated,
  source: teamPlayersModel.$teamPlayersList,
  target: [teamsModel.effects.createOneFx, saveTeamModal.closed],
  fn: (teamPlayers, formValues) => {
    const dto: CreateTeamDto = {
      countryCode: formValues.countryCode,
      name: formValues.name,
      regionId: formValues.region.id,
      players: teamPlayers,
    };
    if (formValues.flag) {
      dto.flagId = formValues.flag.id;
    }
    return dto;
  },
});

sample({
  clock: saveTeamModel.events.teamUpdated,
  source: [teamPlayersModel.$teamPlayers, teamPlayersModel.$deletedPlayers],
  target: [teamsModel.effects.updateOneFx, saveTeamModal.closed],
  fn: ([changedPlayers, deletedPlayers], formValues) => {
    const dto: UpdateTeamDto = {
      countryCode: formValues.countryCode,
      name: formValues.name,
      regionId: formValues.region.id,
      id: formValues.id as number,
      players: {
        changed: Object.values(changedPlayers),
        deleted: Object.values(deletedPlayers),
      },
    };
    if (formValues.flag) {
      dto.flagId = formValues.flag.id;
    }
    return dto;
  },
});
