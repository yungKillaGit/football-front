import { PlayerPosition } from '@api';
import { reflect } from '@effector/reflect';
import {
  FormBuilder,
  FormBuilderProps,
  SelectProps,
} from '@ui';
import { playerPositionsModel } from '..';

interface Props extends FormBuilderProps {
  playerPositions: Record<number, PlayerPosition>;
  playerPositionsList: PlayerPosition[];
}

const PlayerPositionsSelect = ({
  playerPositions,
  playerPositionsList,
  ...fieldProps
}: Props) => {
  const options = playerPositionsList.map((x) => ({
    label: x.name,
    value: x.id,
  }));

  const getInputValue = (value: PlayerPosition | null) => {
    return value?.id || '';
  };

  const getFieldValue = (value: number | string) => {
    return playerPositions[+value];
  };

  return (
    <FormBuilder.Select<SelectProps<PlayerPosition | null>>
      {...fieldProps}
      options={options}
      getInputValue={getInputValue}
      getFieldValue={getFieldValue}
    />
  );
};

export default reflect({
  view: PlayerPositionsSelect,
  bind: {
    playerPositions: playerPositionsModel.$playerPositions,
    playerPositionsList: playerPositionsModel.$playerPositionsList,
  },
  hooks: {
    mounted: playerPositionsModel.effects.getPlayerPositionsFx,
  },
});
