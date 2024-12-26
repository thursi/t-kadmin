const Columns = [
  {
    field: 'businessName',
    header: 'Business Name',
    body: (row: any) => {
      return <div>{row.businessLocationResponse?.businessName || 'N/A'}</div>;
    },
    width: 20,
  },
  {
    field: 'minAmount',
    header: 'Minimum Amount',
    body: (row: any) => {
      return <div>{row.minAmount}</div>;
    },
    width: 15,
  },
  {
    field: 'deliveryAmount',
    header: 'Delivery Amount',
    body: (row: any) => {
      return <div>{row.deliveryAmount}</div>;
    },
    width: 15,
  },
  {
    field: 'fixedDeliveryCharge',
    header: 'Fixed Delivery Charge',
    body: (row: any) => {
      return <div>{row.fixedDeliveryCharge}</div>;
    },
    width: 15,
  },
  {
    field: 'deliveryDays',
    header: 'Delivery Days',
    body: (row: any) => {
      return <div>{row.deliveryDays}</div>;
    },
    width: 10,
  },
  {
    field: 'businessLocationResponse.active',
    header: 'Business Status',
    body: (row: any) => {
      return (
        <div className="flex">
          {row.businessLocationResponse?.active ? (
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
    width: 20,
  },
];

export default Columns;
