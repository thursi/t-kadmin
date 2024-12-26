
const Columns = [

  
  {
    field: 'id',
    header: ' Id',
    body: (row: any) => {
      return <div className="font-bold">{row.id}</div>;
    },
    width: 10,
  },

  {
    field: 'name',
    header: ' Name',
    body: (row: any) => {
      return <div className="font-bold">{row.firstName} {row.lastName}</div>;
    },
    width: 10,
  },
  {
    field: 'email',
    header: ' Email',
    body: (row: any) => {
      return <div className="font-bold">{row.email}</div>;
    },
    width: 10,
  },

  {
    field: 'phoneNo',
    header: ' PhoneNo',
    body: (row: any) => {
      return <div className="font-bold">{row.phoneNo}</div>;
    },
    width: 10,
  },


 
 
];

export default Columns;
