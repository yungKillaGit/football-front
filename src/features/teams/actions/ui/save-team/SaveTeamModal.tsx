import { teamsModel } from '@entities/teams';
import { EffectorModal } from '@ui';
import { combine, sample } from 'effector';
import { saveTeamModal } from '../../model';
import SaveTeamForm from './SaveTeamForm';

const $modalProps = combine(saveTeamModal.$modal, teamsModel.$entitiesList, ({ data }, teams) => {
  if (data) {
    return {
      currentTeam: teams.find((x) => x.id === data),
    };
  }
  return {};
});

export default EffectorModal({
  View: SaveTeamForm,
  modal: saveTeamModal,
  $modalProps,
  getTitle: (modalData) => (modalData ? 'Edit Team' : 'Add team'),
  onInit: (model) => {
    sample({
      clock: model.opened,
      source: model.$modal,
      fn: (state) => ({
        payload: { id: state.data },
        query: {
          join: [
            {
              relation: 'players',
            },
            {
              relation: 'players.position',
            },
          ],
        },
      }),
      target: teamsModel.effects.getOneFx,
      filter: (state) => Boolean(state.data),
    });

    return teamsModel.effects.getOneFx.done;
  },
});
