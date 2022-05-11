import { CellRendererProps, ColumnConfig, TableActionHandler } from 'shared/types/data-table';
import { API_BASE_URL, Flag, Team } from 'shared/api';
import { DataTable } from 'shared/ui';

const TeamFlag = ({ value }: CellRendererProps<Flag>) => {
  return (
    <img src={`${API_BASE_URL}/${value.path}`} alt="team flag" />
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

interface Props {
  teams: Team[];
  onRowClick: TableActionHandler<Team>;
  onEdit: TableActionHandler<Team>;
  onDelete: TableActionHandler<Team>;
}

const TeamsTable = ({
  teams,
  onRowClick,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div>
      <DataTable<Team>
        columns={columns}
        data={teams}
        onRowClick={onRowClick}
        onEdit={onEdit}
        onDelete={onDelete}
        sx={{ maxHeight: 600 }}
      />
    </div>
  );
};

export default TeamsTable;
