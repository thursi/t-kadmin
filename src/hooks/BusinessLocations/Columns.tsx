const Columns = [
  {
    field: "uniCode",
    header: "Uni Code",
    body: (row: any) => {
      return <div>{row.uniCode}</div>;
    },
    width: 9,
  },
  {
    field: "businessName",
    header: "Name",
    body: (row: any) => {
      return <div  className="text-[#111827] font-semibold">{row.businessName}</div>;
    },
    width: 9,
  },
  {
    field: "city",
    header: "City Name",
    body: (row: any) => {
      return <div>{row.city}</div>;
    },
    width: 9,
  },
  {
    field: "totalAmount",
    header: "Total Amount",
    body: (row: any) => {
      return <div>{row.totalAmount}</div>;
    },
    width: 9,
  },
  {
    field: "totalSellingAmount",
    header: "Total Selling Amount",
    body: (row: any) => {
      return <div>{row.totalSellingAmount}</div>;
    },
    width: 9,
  },
  {
    field: "profit",
    header: "Profit",
    body: (row: any) => {
      return <div>{row.profit}</div>;
    },
    width: 9,
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
    width: 9,
  },
];

export default Columns;
