import { CellRendererProps, ColumnConfig } from 'shared/types/data-table';
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
}

const TeamsTable = ({ teams }: Props) => {
  return (
    <div>
      <DataTable columns={columns} data={teams} />
    </div>
  );
};

export default TeamsTable;
