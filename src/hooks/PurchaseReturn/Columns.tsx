const Columns = [
  // {
  //   field: "contactId",
  //   header: "Supplier ID",
  //   body: (row: any) => {
  //     return <div>{row.contactId}</div>;
  //   },
  //   width: 10,
  // },
  {
    field: "businessName",
    header: "Supplier",
    body: (row: any) => {
      return <div>{row.contactResponse?.businessName}</div>;
    },
    width: 10,
  },
  // {
  //   field: "purchaseId",
  //   header: "Purchase ID",
  //   body: (row: any) => {
  //     return <div>{row.purchaseId}</div>;
  //   },
  //   width: 10,
  // },
  {
    field: "referenceNumber",
    header: "Refer Number",
    body: (row: any) => {
      return <div>{row.referenceNumber}</div>;
    },
    width: 10,
  },
  {
    field: "purchaseReturnDate",
    header: "Date",
    body: (row: any) => {
      return <div className="text-[#111827] font-semibold">{row.purchaseReturnDate}</div>;
    },
    width: 10,
  },
  {
    field: "purchaseReturnQuantity",
    header: "Quantity",
    body: (row: any) => {
      return <div>{row.purchaseReturnQuantity}</div>;
    },
    width: 10,
  },
  {
    field: "grandTotal",
    header: "Total",
    body: (row: any) => {
      return <div>{row.grandTotal}</div>;
    },
    width: 10,
  },
  {
    field: "purchaseReturnStatus",
    header: "Status",
    body: (row: any) => {
      return (
        <div className="flex">
          {row.purchaseReturnStatus === 'COMPLETED' && (
          <div className="text-[#8C62FF] bg-[#F4F0FF] px-3 py-1 rounded-lg text-sm font-thin">
              {"Completed"}
            </div>
          )}
          {row.purchaseReturnStatus === 'REQUESTED' && (
            <div className="text-[#0CAF60] bg-[#E7F7EF] px-3 py-1 rounded-lg text-sm font-thin">
              {"ReQuested"}
            </div>
          )}
        </div>
      );
    },
    width: 10,
  },
];

export default Columns;
