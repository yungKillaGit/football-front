import { teamsModel } from '@entities/teams';
import {
  attach, combine, sample,
} from 'effector';

import { tournamentsModel } from '@entities/tournaments';
import { EffectorModal } from '@ui';
import { QueryParams } from '../../../../shared/api/request-options';
import { saveTournamentModal } from '../model/save-tournament-modal';
import SaveTournamentForm from './form/SaveTournamentForm';

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
    const teamsQuery: Partial<QueryParams> = {
      sort: {
        field: 'name',
        direction: 'ASC',
      },
    };

    const initFx = attach({
      source: model.$modal,
      effect: ({ data }) => {
        if (data) {
          return Promise.all([
            teamsModel.effects.getManyFx({ query: teamsQuery }),
            tournamentsModel.effects.getOneFx({
              payload: { id: data },
            }),
          ]);
        }
        return teamsModel.effects.getManyFx({ query: teamsQuery });
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
