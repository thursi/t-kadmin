

import moment from 'moment';
import default_image from '../../../assets/images/png/defaultImage.png';


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
      return <div className="font-bold">{row.name}</div>;
    },
    width: 10,
  },

 
 
];

export default Columns;
