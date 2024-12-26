const Columns = [
  {
    field: "uniCode",
    header: "Uni Code",
    body: (row: any) => {
      return <div>{row.uniCode}</div>;
    },
    width: 10,
  },
  {
    field: "variationName",
    header: "Variation Name",
    body: (row: any) => {
      return <div  className="text-[#111827] font-semibold">{row.variationName}</div>;
    },
    width: 20,
  },
  {
    field: "variationValueResponses",
    header: "Variation Values",
    body: (row: any) => {
      return <div className="flex  gap-1">
        {row.variationValueResponses?.length > 0 ? (
          <>
            {row?.variationValueResponses?.map((value: any) => (
              <div className="px-2 py-1 text-white bg-primary rounded-lg">
                {value?.value}
              </div>
            ))}
          </>
        ) : (
          <div>---</div>
        )}
      </div>;
    },
    width: 25,
  },
  {
    field: "categoryResponse",
    header: "Category Name",
    body: (row: any) => {
      return <div  className="text-[#111827] font-semibold">{row.categoryResponse?.name}</div>;
    },
    width: 15, 
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
    width: 20,
  },
];
export default Columns;
