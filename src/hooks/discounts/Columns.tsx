const Columns = [
  {
    field: "discountType",
    header: "Discount Type",
    body: (row: any) => {
      return <div>{row.discountType}</div>;
    },
    width: 10,
  },
  {
    field: "noOfProducts",
    header: "No. of Products",
    body: (row: any) => {
      return <div>{row.noOfProducts}</div>;
    },
    width: 15,
  },
  {
    field: "discountValue",
    header: "Discount Value",
    body: (row: any) => {
      return <div>{row.discountValue}</div>;
    },
    width: 15,
  },
  {
    field: "discountPercentage",
    header: "Discount Percentage",
    body: (row: any) => {
      return <div>{row.discountPercentage}%</div>;
    },
    width: 15,
  },
  {
    field: "discountPrice",
    header: "Discount Price",
    body: (row: any) => {
      return <div>{row.discountPrice}</div>;
    },
    width: 15,
  },
  {
    field: "productVariableResponse.name",
    header: "Product Name",
    body: (row: any) => {
      return <div>{row.productVariableResponse?.name || "N/A"}</div>;
    },
    width: 20,
  },
  {
    field: "productVariableResponse.active",
    header: "Product Status",
    body: (row: any) => {
      return (
        <div className="flex">
          {row.productVariableResponse?.active ? (
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
  {
    field: "businessLocation",
    header: "Business Location",
    body: (row: any) => {
      return <div>{row.businessLocation}</div>;
    },
    width: 20,
  },
];

export default Columns;
