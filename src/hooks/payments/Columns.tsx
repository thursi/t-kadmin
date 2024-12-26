const Columns = [
  {
    field: 'referenceNo',
    header: 'referenceNo',
    body: (row: any) => {
      return (
        <div className="whitespace-normal break-all ">
          {row?.orderResponse?.referenceNo}
        </div>
      );
    },
    width: 15,
  },
  {
    field: 'paymentType',
    header: 'Payment Type',
    body: (row: any) => {
      return (
        <div className="whitespace-normal break-all ">
          {row?.orderResponse?.paymentType}
        </div>
      );
    },
    width: 15,
  },
  {
    field: 'paymentDate',
    header: 'Payment Date',
    body: (row: any) => {
      return (
        <div className="whitespace-normal break-all ">{row.paymentDate}</div>
      );
    },
    width: 15,
  },
  {
    field: 'transactionId',
    header: 'transactionId',
    body: (row: any) => {
      return (
        <div className="whitespace-normal break-all ">{row.transactionId}</div>
      );
    },
    width: 15,
  },
  {
    field: 'paymentGatewayStatus',
    header: 'PaymentGateway Status',
    body: (row: any) => {
      return (
        <div className="flex ">
          {row.paymentGatewayStatus === 'PAID' && (
            <div className="text-[#0CAF60] bg-[#E7F7EF] px-3 py-1 rounded-lg text-sm font-thin">
              {'Paid'}
            </div>
          )}
          {row.paymentGatewayStatus === 'FAILED' && (
            <div className="text-[#FD6A6A] bg-[#FFF0F0] px-3 py-1 rounded-lg text-sm font-thin">
              {/* <div className="text-warning bg-[#297f9c] px-3 py-1 rounded-lg text-sm font-thin"> */}
              {'Failed'}
            </div>
          )}
          {row.paymentGatewayStatus === 'PENDING' && (
            <div className="text-[#FE964A] bg-[#FFF0E6] px-3 py-1 rounded-lg text-sm font-thin">
              {'Pending'}
            </div>
          )}
          {row.paymentGatewayStatus === 'REFUND' && (
            <div className="text-[#8C62FF] bg-[#F4F0FF] px-3 py-1 rounded-lg text-sm font-thin">
              {'Refund'}
            </div>
          )}
        </div>
      );
    },
    width: 15,
  },
];
export default Columns;
