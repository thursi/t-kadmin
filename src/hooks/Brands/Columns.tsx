const Columns = [
  {
    field: "uniCode",
    header: "Uni Code",
    body: (row: any) => {
      return <div>{row.uniCode}</div>;
    },
    width: 15,
  },
  {
    field: "brandName",
    header: "Brand Name",
    body: (row: any) => {
      return <div  className="text-[#111827] font-semibold">{row.brandName}</div>;
    },
    width: 20,
  },
  {
    field: "description",
    header: "Description",
    body: (row: any) => {
      return <div>{row.description}</div>;
    },
    width: 20,
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
    field: "active",
    header: "Status",
    body: (row: any) => {
      return (
        <div className="flex">
          {row.active ? (
           <div className="text-[#0CAF60] bg-[#E7F7EF] px-3 py-1 rounded-lg text-sm font-thin p-1">
              Active
            </div>
          ) : (
            <div className="text-[#FD6A6A] bg-[#FFF0F0] px-3 py-1 rounded-lg text-sm font-thin p-1">
              In Active
            </div>
          )}
        </div>
      );
    },
    width: 20,
  },
];

export default Columns;
