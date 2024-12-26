const Columns = [
  {
    field: "id",
    header: "Business Name",
    body: (row: any) => {
      return <div>{row.businessLocation?.businessName}</div>;
    },
    width: 10,
  },
  {
    field: "facebookUrl",
    header: "Facebook",
    body: (row: any) => {
      return (
        <div className="text-[#111827] font-semibold">
          {row.facebookUrl ? "Yes" : "No"}
        </div>
      );
    },
    width: 10,
  },
  {
    field: "intagramUrl",
    header: "Instagram",
    body: (row: any) => {
      return (
        <div className="text-[#111827] font-semibold">
          {row.instagramUrl ? "Yes" : "No"}
        </div>
      );
    },
    width: 10,
  },
  {
    field: "twitterUrl",
    header: "Twitter",
    body: (row: any) => {
      return (
        <div className="text-[#111827] font-semibold">
          {row.twitterUrl ? "Yes" : "No"}
        </div>
      );
    },
    width: 10,
  },
  {
    field: "linkedinUrl",
    header: "Linkedin",
    body: (row: any) => {
      return (
        <div className="text-[#111827] font-semibold">
          {row.linkedinUrl ? "Yes" : "No"}
        </div>
      );
    },
    width: 10,
  },
  {
    field: "youtubeUrl",
    header: "Youtube",
    body: (row: any) => {
      return (
        <div className="text-[#111827] font-semibold">
          {row.youtubeUrl ? "Yes" : "No"}
        </div>
      );
    },
    width: 10,
  },
  {
    field: "websiteUrl",
    header: "Website",
    body: (row: any) => {
      return (
        <div className="text-[#111827] font-semibold">
          {row.websiteUrl ? "Yes" : "No"}
        </div>
      );
    },
    width: 10,
  },
];

export default Columns;
