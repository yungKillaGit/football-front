import { API_BASE_URL, Flag } from '@api';
import { teamsModel } from '@entities/teams';
import { saveTeamModal, SaveTeamModal } from '@features/teams';
import { CellRendererProps, ColumnConfig } from '@ui';
import { CrudPage } from '@widgets/crud-page';

const TeamFlag = ({ value }: CellRendererProps<Flag>) => {
  return (
    <img style={{ height: 64, width: 64 }} src={`${API_BASE_URL}/${value.path}`} alt="team flag" />
  );
};

const columns: ColumnConfig[] = [
  {
    accessor: 'flag',
    label: 'Flag',
    render: TeamFlag,
  },
  {
    accessor: 'name',
    label: 'Team',
  },
  {
    accessor: 'countryCode',
    label: 'Code',
  },
];

export default CrudPage({
  resourceModel: teamsModel,
  renderModal: () => <SaveTeamModal />,
  tableColumns: columns,
  modal: saveTeamModal,
});
