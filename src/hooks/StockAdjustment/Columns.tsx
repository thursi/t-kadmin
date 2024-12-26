const Columns = [
  {
    field: 'uniCode',
    header: 'UniCode',
    body: (row: any) => {
      return <div>{row.businessLocationResponse?.uniCode}</div>;
    },
    width: 5,
  },
  {
    field: 'businessName',
    header: 'BusinessName',
    body: (row: any) => {
      return (
        <div className="text-[#111827] font-semibold">
          {row.businessLocationResponse?.businessName}
        </div>
      );
    },
    width: 10,
  },
  {
    field: 'city',
    header: 'City',
    body: (row: any) => {
      return <div>{row.businessLocationResponse?.city}</div>;
    },
    width: 10,
  },
  {
    field: 'totalAmount',
    header: 'Total Amount',
    body: (row: any) => {
      return <div>{row.businessLocationResponse?.totalAmount ?? 'N/A'}</div>;
    },
    width: 10,
  },
  {
    field: 'totalSellingAmount',
    header: 'Total Selling Amount',
    body: (row: any) => {
      return (
        <div>{row.businessLocationResponse?.totalSellingAmount ?? 'N/A'}</div>
      );
    },
    width: 10,
  },
  // {
  //   field: 'name',
  //   header: 'Product Variable Name',
  //   body: (row: any) => {
  //     return <div>{row.productVariableResponse?.name ?? 'N/A'}</div>;
  //   },
  //   width: 10,
  // },

  {
    field: 'name',
    header: 'Product Variable Name',
    body: (row: any) => {
      const productVariables =
        row.productResponse?.productVariableResponses || [];
      return (
        <div>
          {productVariables.length > 0
            ? productVariables.map((pv: any) => pv.name).join(', ')
            : 'N/A'}
        </div>
      );
    },
    width: 10,
  },

  // },
  // {
  //   field: 'totalAmount',
  //   header: 'Total Amount',
  //   body: (row: any) => {
  //     return <div>{row.businessLocationResponse?.totalAmount}</div>;
  //   },
  //   width: 10,
  // },
  // {
  //   field: 'totalSellingAmount',
  //   header: 'Total Selling Amount',
  //   body: (row: any) => {
  //     return <div>{row.businessLocationResponse?.totalSellingAmount}</div>;
  //   },
  //   width: 10,
  // },
  // {
  //   field: 'name',
  //   header: 'Product Variable Name',
  //   body: (row: any) => {
  //     return <div>{row.productVariableResponse?.name}</div>;
  //   },
  //   width: 10,
  // },

  // {
  //   field: 'SKU',
  //   header: 'sku',
  //   body: (row: any) => {
  //     return <div>{row.productVariableResponse?.sku}</div>;
  //   },
  //   width: 10,
  // },

  {
    field: 'sku',
    header: 'Sku',
    body: (row: any) => {
      const productVariables =
        row.productResponse?.productVariableResponses || [];
      return (
        <div>
          {productVariables.length > 0
            ? productVariables.map((pv: any) => pv.sku).join(', ')
            : 'N/A'}
        </div>
      );
    },
    width: 10,
  },
  {
    field: 'purchasePrice',
    header: 'Purchase Price',
    body: (row: any) => {
      return <div>{row?.productResponse?.purchasePrice}</div>;
    },
    width: 10,
  },

  {
    field: 'sellingPrice',
    header: 'SellingPrice',
    body: (row: any) => {
      const productVariables =
        row.productResponse?.productVariableResponses || [];
      return (
        <div>
          {productVariables.length > 0
            ? productVariables.map((pv: any) => pv.sellingPrice).join(', ')
            : 'N/A'}
        </div>
      );
    },
    width: 10,
  },

  {
    field: 'shopQuantity',
    header: 'Shop Quantity',
    body: (row: any) => {
      const productVariables =
        row.productResponse?.productVariableResponses || [];
      return (
        <div>
          {productVariables.length > 0
            ? productVariables.map((pv: any) => pv.quantity).join(', ')
            : 'N/A'}
        </div>
      );
    },
    width: 5,
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
    width: 10,
  },

  // {
  //   field: 'stockTransferStatus',
  //   header: 'Status',
  //   body: (row: any) => {
  //     return (
  //       <div className="flex justify-center">
  //         {row.stockTransferStatus === 'COMPLETED' && (
  //           <div className="text-success bg-[#EFFFF1] px-3 py-1 rounded-full">
  //             {row.stockTransferStatus}
  //           </div>
  //         )}
  //         {row.stockTransferStatus === 'CANCELLED' && (
  //           <div className="text-warning bg-[#297f9c] px-3 py-1 rounded-full">
  //             {row.stockTransferStatus}
  //           </div>
  //         )}
  //         {row.stockTransferStatus === 'PENDING' && (
  //           <div className="text-secondary bg-[#e95b4c] px-3 py-1 rounded-full">
  //             {row.stockTransferStatus}
  //           </div>
  //         )}
  //         {row.stockTransferStatus === 'IN_TRANSIT' && (
  //           <div className="text-primary bg-[#eccb5d] px-3 py-1 rounded-full">
  //             {row.stockTransferStatus}
  //           </div>
  //         )}
  //       </div>
  //     );
  //   },
  //   width: 10,
  // },
];

export default Columns;
