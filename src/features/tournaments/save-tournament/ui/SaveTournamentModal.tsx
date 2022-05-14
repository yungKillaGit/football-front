import { teamsModel } from '@entities/teams';
import {
  attach, combine,
} from 'effector';

import { tournamentsModel } from '@entities/tournaments';
import { EffectorModal } from '@ui';
import { saveTournamentModal } from '../model/save-tournament-modal';
import SaveTournamentForm from './SaveTournamentForm';

const SaveTournamentModal = EffectorModal({
  View: SaveTournamentForm,
  getTitle: (modalData) => (modalData ? 'Edit tournament' : 'Add tournament'),
  modal: saveTournamentModal,
  $modalProps: combine(saveTournamentModal.$modal, tournamentsModel.$entities, ({ data }, tournaments) => {
    if (data) {
      return {
        tournament: tournaments[data],
      };
    }
    return {};
  }),
  onInit: (model) => {
    const variativeFx = attach({
      source: model.$modal,
      effect: ({ data }) => {
        if (data) {
          return Promise.all([
            teamsModel.effects.getManyFx(),
            tournamentsModel.effects.getOneFx({ id: data }),
          ]);
        }
        return teamsModel.effects.getManyFx();
      },
    });
    return variativeFx.done;
  },
});

export default SaveTournamentModal;
