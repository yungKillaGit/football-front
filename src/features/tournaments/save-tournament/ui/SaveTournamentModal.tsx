import {
  attach, combine, sample,
} from 'effector';

import { tournamentsModel } from '@entities/tournaments';
import { EffectorModal } from '@ui';
import { saveTournamentModal } from '../model/save-tournament-modal';
import { tournamentTeamsModel } from '../model/tournament-teams';
import SaveTournamentForm from './form/SaveTournamentForm';

const SaveTournamentModal = EffectorModal({
  View: SaveTournamentForm,
  getTitle: (modalData) => (modalData ? 'Edit tournament' : 'Add tournament'),
  modal: saveTournamentModal,
  $modalProps: combine(saveTournamentModal.$modal, tournamentsModel.$entitiesList, ({ data }, tournaments) => {
    if (data) {
      return {
        tournament: tournaments.find((x) => x.id === data),
      };
    }
    return {};
  }),
  onInit: (model) => {
    const initFx = attach({
      source: model.$modal,
      effect: ({ data }) => {
        if (data) {
          return Promise.all([
            tournamentTeamsModel.effects.getTeamsFx(),
            tournamentsModel.effects.getOneFx({
              payload: { id: data },
            }),
          ]);
        }
        return tournamentTeamsModel.effects.getTeamsFx();
      },
    });

    sample({
      clock: model.opened,
      target: initFx,
    });

    return initFx.done;
  },
});

export default SaveTournamentModal;
