import { Tournament } from '@api';
import { tournamentsModel } from '@entities/tournaments';
import { saveTournamentModal, SaveTournamentModal } from '@features/tournaments';
import { formatDate } from '@lib';
import { CellRendererProps, ColumnConfig } from '@ui';
import { CrudPage } from '@widgets/crud-page';

const TournamentDate = ({ row }: CellRendererProps<any, Tournament>) => {
  return `${formatDate(row.startDate)} - ${formatDate(row.endDate)}`;
};

const columns: ColumnConfig[] = [
  {
    accessor: 'name',
    label: 'Tournament',
  },
  {
    render: TournamentDate,
    label: 'Date',
    accessor: 'date',
  },
];

export default CrudPage({
  resourceModel: tournamentsModel,
  renderModal: () => <SaveTournamentModal />,
  tableColumns: columns,
  modal: saveTournamentModal,
});
