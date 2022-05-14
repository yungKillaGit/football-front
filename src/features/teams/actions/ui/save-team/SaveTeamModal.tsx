import { teamsModel } from '@entities/teams';
import { EffectorModal } from '@ui';
import { combine, sample } from 'effector';
import { saveTeamModal } from '../../model';
import SaveTeamForm from './SaveTeamForm';

const $modalProps = combine(saveTeamModal.$modal, teamsModel.$entities, ({ data }, teams) => {
  if (data) {
    return {
      currentTeam: teams[data],
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
      }),
      target: teamsModel.effects.getOneFx,
      filter: (state) => state.data,
    });

    return teamsModel.effects.getOneFx.done;
  },
});
