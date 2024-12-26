const Columns = [
  
  {
    field: 'uniCode',
    header: 'Uni Code',
    body: (row: any) => {
      return <div>{row.uniCode}</div>;
    },
    width: 15,
  },
  {
    field: 'warrantyName',
    header: 'Warranty Name',
    body: (row: any) => {
      return <div  className="text-[#111827] font-semibold">{row.warrantyName}</div>;
    },
    width: 15,
  },
  {
    field: 'duration',
    header: 'Duration',
    body: (row: any) => {
      return <div>{row.duration}</div>;
    },
    width: 15,
  },

  {
    field: 'durationType',
    header: 'Duration Type',
    body: (row: any) => {
      return <div>{row.durationType}</div>;
    },
    width: 15,
  },
  {
    field: "categoryResponse",
    header: "Category Name",
    body: (row: any) => {
      return <div  className="text-[#111827] font-semibold">{row.categoryResponse?.name}</div>;
    },
    width: 15, 
  },
  

  {
    field: 'active',
    header: 'Status',
    body: (row: any) => {
      return (
        <div className="flex">
          {row.active ? (
            <div className="text-success bg-[#EFFFF1] px-3 py-1 rounded-lg text-sm font-thin">
              Active
            </div>
          ) : (
            <div className="text-[#FD6A6A] bg-[#FFF0F0] px-3 py-1 rounded-lg text-sm font-thin">
              In Active
            </div>
          )}
        </div>
      );
    },
    width: 15,
  },
];
export default Columns;
