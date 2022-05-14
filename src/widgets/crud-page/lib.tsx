import { BaseModel } from '@api';
import { variant } from '@effector/reflect';
import { ResourceModel } from '@lib';
import { ColumnConfig, ModalModel } from '@ui';
import { combine } from 'effector';
import CrudPageView from './ui/CrudPageView';

export interface CrudPageOptions<Entity extends BaseModel, CreateDto, UpdateDto> {
  resourceModel: ResourceModel<Entity, CreateDto, UpdateDto>;
  renderModal: () => JSX.Element;
  tableColumns: ColumnConfig[];
  modal: ModalModel;
}

export const CrudPage = <Entity extends BaseModel, CreateDto, UpdateDto>({
  resourceModel,
  renderModal,
  tableColumns,
  modal,
}: CrudPageOptions<Entity, CreateDto, UpdateDto>) => {
  return variant({
    source: combine({
      loading: resourceModel.$areEntitiesLoading,
    }, ({
      loading,
    }) => {
      if (loading) {
        return 'loading';
      }
      return 'ready';
    }),
    cases: {
      loading: () => null,
      ready: () => (
        <CrudPageView<Entity, CreateDto, UpdateDto>
          renderModal={renderModal}
          resourceModel={resourceModel}
          tableColumns={tableColumns}
          modal={modal}
        />
      ),
    },
    hooks: {
      mounted: resourceModel.effects.getManyFx.prepend(() => ({})),
      unmounted: resourceModel.page.unmounted,
    },
  });
};
