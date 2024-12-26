const Columns = [
  {
    field: 'businessType',
    header: 'Business Type',
    body: (row:any) => {
      return (
        <div className="text-[#111827] font-semibold">
          {row.businessType === 'INDIVIDUAL' ? 'Individual' : 'Business'}
        </div>
      );
    },
    width: 15,
  },
  {
    field: 'email',
    header: 'Email',
    body: (row: any) => {
      return <div className="whitespace-normal break-all ">{row.email}</div>;
    },
    width: 13,
  },

 
  {
    field: 'addressLine1',
    header: 'Address Line 1',
    body: (row: any) => {
      return <div>{row.addressLine1}</div>;
    },
    width: 17,
  },

  // {
  //   field: 'addressLine2',
  //   header: 'Address Line 2',
  //   body: (row: any) => {
  //     return <div>{row.addressLine2}</div>;
  //   },
  //   width: 10,
  // },
  {
    field: 'mobile',
    header: 'Mobile',
    body: (row: any) => {
      return <div>{row.mobile}</div>;
    },
    width: 10,
  },
  {
    field: 'city',
    header: 'City',
    body: (row: any) => {
      return <div>{row.city}</div>;
    },
    width: 10,
  },

  {
    field: 'country',
    header: 'Country',
    body: (row: any) => {
      return <div>{row.country}</div>;
    },
    width: 10,
  },
  {
    field: 'zipCode',
    header: 'ZipCode',
    body: (row: any) => {
      return <div>{row.zipCode}</div>;
    },
    width: 10,
  },

  {
    field: 'active',
    header: 'Status',
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
];
export default Columns;
