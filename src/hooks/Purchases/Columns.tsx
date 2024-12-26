const Columns = [
  {
    field: "referenceNumber",
    header: "Refer Number",
    body: (row: any) => {
      return <div>{row.referenceNumber}</div>;
    },
    width: 10,
  },
  {
    field: "purchaseDate",
    header: "Purchase Date",
    body: (row: any) => {
      return <div  className="text-[#111827] font-semibold">{row.purchaseDate}</div>;
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
    field: "discountAmount",
    header: "Discount Amount",
    body: (row: any) => {
      return <div>{row.discountAmount}</div>;
    },
    width: 10,
  },
  {
    field: "remindAmount",
    header: "Remind Amount",
    body: (row: any) => {
      return <div>{row.remindAmount}</div>;
    },
    width: 10,
  },

  {
    field: "advanceAmount",
    header: "Advance Amount",
    body: (row: any) => {
      return <div>{row.advanceAmount}</div>;
    },
    width: 10,
  },
  {
    field: "purchaseTotal",
    header: "Purchase Total",
    body: (row: any) => {
      return <div>{row.purchaseTotal}</div>;
    },
    width: 10,
  },
  {
    field: "purchaseStatus",
    header: "Status",
    body: (row: any) => {
      return (
        <div className="flex">
          {row.purchaseStatus === 'ORDERED' && (
          <div className="text-[#8C62FF] bg-[#F4F0FF] px-3 py-1 rounded-lg text-sm font-thin">
              {"Ordered"}
            </div>
          )}
          {row.purchaseStatus === 'RECEIVED' && (
            <div className="text-[#0CAF60] bg-[#E7F7EF] px-3 py-1 rounded-lg text-sm font-thin">
              {"Received"}
            </div>
          )}
          {row.purchaseStatus === 'PENDING' && (
            <div className="text-[#FE964A] bg-[#FFF0E6] px-3 py-1 rounded-lg text-sm font-thin">
              {"Pending"}
            </div>
          )}
        </div>
      );
    },
    width: 10,
  },
  {
    field: "contactResponse",
    header: "Contact Persons",
    body: (row: any) => {
      return (
        <div>
          {row.contactResponse?.contactPersons?.map(
            (person: any, index: number) => (
              <div key={index}>
                {person.firstName} {person.lastName}
              </div>
            )
          )}
        </div>
      );
    },
    width: 10,
  },
  {
    field: "contactResponseNum",
    header: "Contact Persons Number",
    body: (row: any) => {
      return (
        <div>
          {row.contactResponse?.contactPersons?.map(
            (person: any, index: number) => (
              <div key={index}>{person.mobileNumber}</div>
            )
          )}
        </div>
      );
    },
    width: 10,
  },
];

export default Columns;
