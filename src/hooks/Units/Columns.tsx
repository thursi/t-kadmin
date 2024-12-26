import { format } from "date-fns";

const Columns = [
  {
    field: "uniCode",
    header: "Uni Code",
    body: (row: any) => {
      return <div>{row.uniCode}</div>;
    },
    width: 20, 
  },
  {
    field: "unitName",
    header: "Name",
    body: (row: any) => {
      return <div  className="text-[#111827] font-semibold">{row.unitName}</div>;
    },
    width: 20, 
  },
  {
    field: "categoryResponse",
    header: "Category Name",
    body: (row: any) => {
      return <div  className="text-[#111827] font-semibold">{row.categoryResponse?.name}</div>;
    },
    width: 25, 
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
    width: 25,
  },
];
export default Columns;
