import moment from 'moment';
import defacltImage from '../../assets/images/png/defaultImage.png';

const Columns = [
  {
    field: 'image',
    header: 'Image',
    body: (row: any) => {
      return (
        <div>
          <img
            src={row.image ? row.image : defacltImage}
            className="w-15 h-12 object-cover p-1 rounded-md items-center justify-center content-center"
            style={{ borderRadius: '25px' }}
            // alt="Producte"
          />
        </div>
      );
    },
    width: 12,
  },
  {
    field: 'name',
    header: 'Promotion Name',
    body: (row: any) => {
      return <div className="font-bold">{row.name}</div>;
    },
    width: 10,
  },

  {
    field: 'createdAt',
    header: 'Created Date',
    body: (row: any) => {
      return <div className="">{moment(row.createdAt).format('L')}</div>;
    },
    width: 8,
  },

  {
    field: 'updatedAt',
    header: 'Updated Date',
    body: (row: any) => {
      return <div className="">{moment(row.updatedAt).format('L')}</div>;
    },
    width: 8,
  },

  {
    field: 'active',
    header: 'Status',
    body: (row: any) => {
      return (
        <div className="flex">
          {row.active ? (
            <div className="text-[#0CAF60] bg-[#E7F7EF] px-3 py-1 rounded-lg text-sm font-thin">
              Active
            </div>
          ) : (
            <div className="text-[#FD6A6A] bg-[#FFF0F0] px-3 py-1 rounded-lg text-sm font-thin">
              Inactive
            </div>
          )}
        </div>
      );
    },
    width: 10,
  },
];

export default Columns;
