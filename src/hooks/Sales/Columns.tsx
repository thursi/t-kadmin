import moment from "moment";

const Columns = [
  {
    field: "referenceNo",
    header: "Refer Number",
    body: (row: any) => {
      return <div>{row.referenceNo}</div>;
    },
    width: 10,
  },
  {
    field: "orderDate",
    header: "Date",
    body: (row: any) => {
      return <div>{moment(row.orderDate).format("DD-MM-YYYY hh:mm:A")}</div>;
    },
    width: 10,
  },
  // {
  //   field: "contactType",
  //   header: "Contact Type",
  //   body: (row: any) => {

  //   width: 10,
  // },

  {
    field: "customerResponse",
    header: "Customer Name",
    body: (row: any) => {
      return (
        <div>
          {/* {`${row?.customerResponse?.contactPersons[0]?.firstName} ${row?.customerResponse?.contactPersons[0]?.firstName}`} */}
          {`${row?.userResponse?.firstName} ${row?.userResponse?.lastName ? row?.userResponse?.lastName : ''}`}

        </div>
      );
    },
    width: 10,
  },
  {
    field: "paymentGatewayStatus",
    header: "Payment Status",
    body: (row: any) => {
      return (
        <div className="flex justify-center">
          {row.paymentGatewayStatus === "PAID" && (
            <div className="text-[#0CAF60] bg-[#E7F7EF] px-3 py-1.5 rounded-lg">
              {row.paymentGatewayStatus}
            </div>
          )}
          {row.paymentGatewayStatus === "PENDING" && (
            <div className="text-[#FE964A] bg-[#FFF0E6] px-3 py-1.5 rounded-lg">
              {row.paymentGatewayStatus}
            </div>
          )}
          {row.paymentGatewayStatus === "FAILED" && (
            <div className="text-[#FD6A6A] bg-[#FFF0F0] px-3 py-1.5 rounded-lg">
              {row.paymentGatewayStatus}
            </div>
          )}
          {row.paymentGatewayStatus === "REFUND" && (
            <div className="text-[#8C62FF] bg-[#F4F0FF]  px-3 py-1.5 rounded-lg">
              {row.paymentGatewayStatus}
            </div>
          )}
        </div>
      );
    },
    width: 10,
  },

  {
    field: "paymentType",
    header: "Payment Type",
    body: (row: any) => {
      return (
        <div>
          {row.paymentType
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char: string) => char.toUpperCase())}
        </div>
      );
    },
    width: 10,
  },
  {
    field: "subTotal",
    header: "Sub Total",
    body: (row: any) => {
      return <div>{row.subTotal.toFixed(2)}</div>;
    },
    width: 10,
  },
  {
    field: "total",
    header: "Total",
    body: (row: any) => {
      return <div>{row.total.toFixed(2)}</div>;
    },
    width: 10,
  },
];

export default Columns;
