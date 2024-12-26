import StatusBadge from "./StatusBadge ";

const Columns = [
  {
    field: "date",
    header: "Date",
    body: (row: any) => {
      return <div>{row.date}</div>;
    },
    width: 10,
  },
  {
    field: "referenceNumber",
    header: "Reference No",
    body: (row: any) => {
      return <div>{row.referenceNumber}</div>;
    },
    width: 12,
  },
  {
    field: "locationTo",
    header: "Location To",
    body: (row: any) => {
      return (
        <div className="text-[#111827] font-semibold">
          {row.locationTo?.businessName}
        </div>
      );
    },
    width: 16,
  },
  {
    field: "city",
    header: "City",
    body: (row: any) => {
      return <div>{row.locationTo?.city}</div>;
    },
    width: 17,
  },
  {
    field: "TotalAmount",
    header: "Total Amount",
    body: (row: any) => {
      return <div>{row.stockTransferTotalAmount}</div>;
    },
    width:11,
  },
  {
    field: "shippingChargeAmount",
    header: "Shipping Charge",
    body: (row: any) => {
      return <div>{row?.shippingChargeAmount}</div>;
    },
    width: 11,
  },
  {
    field: "Status",
    header: "Status",
    body: (row: any) => {
      return (
        <div className="flex justify-start items-start">
          <StatusBadge
            id={row.id} 
            status={row.stockTransferStatus} // The initial status to display
            onStatusChange={(newStatus) => {
              console.log(`Status for ID ${row.id} changed to ${row.stockTransferStatus}`);
            }}
          />
        </div>
      );
    },
    width: 10,
  }
  
];

export default Columns;
