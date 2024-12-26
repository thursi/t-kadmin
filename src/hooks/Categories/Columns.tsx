import default_image from '../../assets/images/png/defaultImage.png';

const Columns = [
  {
    field: 'image',
    header: 'Image',
    body: (row: any) => {
      const imageSrc =
        row.image ?row.image : default_image;

      return (
        <div>
          <img
            src={imageSrc}
            className="w-15 h-12 object-cover p-1 rounded-md items-center justify-center content-center"
            style={{ borderRadius: '20px' }}
            alt="Product"
          />
        </div>
      );
    },
    width: 13,
  },
  {
    field: "uniCode",
    header: "Category Code",
    body: (row: any) => {
      return <div>{row.uniCode}</div>;
    },
    width: 20,
  },
  {
    field: "name",
    header: "Name",
    body: (row: any) => {
      return <div  className="text-[#111827] font-semibold">{row.name}</div>;
    },
    width: 20,
  },
  {
    field: "featuredCategory",
    header: "Featured",
    body: (row: any) => {
      const featuredCategory = row.featuredCategory 
        ? row.featuredCategory.charAt(0).toUpperCase() + row.featuredCategory.slice(1).toLowerCase() 
        : "None";
      
      return (
        <div className="text-[#111827] font-semibold">
          {featuredCategory}
        </div>
      );
    },
    width: 10,
  },
  

  {
    field: "parentResponse",
    header: "Parent Category",
    body: (row: any) => {
      return (
        <div className="flex">
          {row.parentResponse ? (
            <div className="py-1 px-2 font-semibold bg-primary w-fit text-white rounded-lg">
              {row.parentResponse.name}
            </div>
          ) : (
            <div className="font-bold">---</div>
          )}
        </div>
      );
    },
    width: 15,
  },
  {
    field: "active",
    header: "Status",
    body: (row: any) => {
      return (
        <div className="flex ">
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
