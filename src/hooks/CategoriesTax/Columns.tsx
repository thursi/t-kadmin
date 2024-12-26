const Columns = [

  {
    field: "categoryName",
    header: "Category Name",
    body: (row: any) => {
      return <div  className="text-[#111827] font-semibold">{row.categoryName}</div>;
    },
    width: 30,
  },

  {
    field: "taxName",
    header: "Tax Name",
    body: (row: any) => {
      return <div>{row.taxName}</div>;
    },
    width: 25,
  },

  {
    field: "tax",
    header: "Tax",
    body: (row: any) => {
      return <div>{row.tax}%</div>;
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
                <div className="text-[#0CAF60] bg-[#E7F7EF] px-3 py-1 rounded-lg text-sm font-thin">
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
