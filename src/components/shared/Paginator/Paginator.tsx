// import React, { useState } from "react";
// import { DropDown } from "../DropDown";

// interface IPaginatorProps {
//   totalPages: number;
//   totalRecords: number;
//   pageNumber: number;
//   pageSize: number;
//   changePage: (pageNumber: number, pageSize: number) => void;
// }

// export default function Paginator(props: IPaginatorProps) {
//   const [currentPage, setCurrentPage] = useState(
//     props.pageNumber ? props.pageNumber : 1
//   );
//   const [currentPageSize, setCurrentPageSize] = useState(
//     props.pageSize ? props.pageSize : 10
//   );
//   const [pageSizeValue, setpageSizeValue] = useState({
//     PageSize: props.pageSize ? props.pageSize.toString() : "10",
//   });

//   const totalPages = Math.max(props.totalPages, 1);
//   const startIndex = (props.pageNumber - 1) * props.pageSize + 1;
//   const endIndex = Math.min(
//     props.pageNumber * props.pageSize,
//     props.totalRecords
//   );

//   const visiblePages = totalPages > 5 ? 5 : totalPages;
//   let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
//   startPage =
//     startPage > totalPages - visiblePages + 1
//       ? totalPages - visiblePages + 1
//       : startPage;
//   const endPage = Math.min(totalPages, startPage + visiblePages - 1);

//   const handleCurrentPageNumber = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//       props.changePage(pageNumber, currentPageSize);
//     }
//   };

//   const handleCurrentPageSize = (pageSize: number) => {
//     setCurrentPageSize(pageSize);

//     props.changePage(1, pageSize);
//   };

//   return (
//     <div className="py-5 flex justify-end self-end bg-gray-200">
//       <div className="px-5 self-center">Items Per Page:</div>
//       <div className="w-20">
//         <DropDown
//           name="PageSize"
//           options={[
//             {
//               name: "5",
//               value: "5",
//             },
//             {
//               name: "10",
//               value: "10",
//             },
//             {
//               name: "20",
//               value: "20",
//             },
//             {
//               name: "50",
//               value: "50",
//             },
//             {
//               name: "100",
//               value: "100",
//             },
//           ]}
//           values={pageSizeValue}
//           onChange={(selectedOptions) => {
//             handleCurrentPageSize(selectedOptions.target.value);
//           }}
//         />
//       </div>
//       <div className="flex items-center justify-center px-5 space-x-2">
//         {/* Previous Button */}
//         <button
//           onClick={() => handleCurrentPageNumber(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`h-10 w-10 text-xl border rounded-full transition ${
//             currentPage === 1
//               ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//               : "bg-white text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 active:bg-gray-200"
//           }`}
//         >
//           &lt;
//         </button>

//         {/* Page Numbers */}
//         {Array.from(
//           { length: endPage - startPage + 1 },
//           (_, index) => startPage + index
//         ).map((page) => (
//           <button
//             key={page}
//             onClick={() => handleCurrentPageNumber(page)}
//             className={`w-10 h-10 text-sm border rounded-full transition ${
//               currentPage === page
//                 ? "bg-gray-500 text-white"
//                 : "bg-white text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 active:bg-gray-200"
//             }`}
//           >
//             {page}
//           </button>
//         ))}

//         {/* Next Button */}
//         <button
//           onClick={() => handleCurrentPageNumber(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={`h-10 w-10 text-xl border rounded-full transition ${
//             currentPage === totalPages
//               ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//               : "bg-white text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 active:bg-gray-200"
//           }`}
//         >
//           &gt;
//         </button>
//       </div>
//       <div className="self-center mr-5 text-sm border">
//         {startIndex} - {endIndex} of {props.totalRecords}
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import { DropDown } from "../DropDown";

interface IPaginatorProps {
  totalPages: number;
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  changePage: (pageNumber: number, pageSize: number) => void;
}

export default function Paginator(props: IPaginatorProps) {
  const [currentPage, setCurrentPage] = useState(
    props.pageNumber ? props.pageNumber : 1
  );
  const [currentPageSize, setCurrentPageSize] = useState(
    props.pageSize ? props.pageSize : 10
  );
  const [pageSizeValue, setPageSizeValue] = useState({
    PageSize: props.pageSize ? props.pageSize.toString() : "10",
  });

  const totalPages = Math.max(props.totalPages, 1);
  const startIndex = (currentPage - 1) * currentPageSize + 1;
  const endIndex = Math.min(currentPage * currentPageSize, props.totalRecords);

  // Always show two pages
  const visiblePages = 2;
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const handleCurrentPageNumber = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      props.changePage(pageNumber, currentPageSize);
    }
  };

  const handleCurrentPageSize = (pageSize: number) => {
    setCurrentPageSize(pageSize);
    props.changePage(1, pageSize);
  };

  return (
    <div className="py-1 flex justify-end self-end bg-gray-200">
      {/* Items Per Page Dropdown */}
      <div className="px-5 self-center">Items Per Page:</div>
      <div className="w-20">
        <DropDown
          name="PageSize"
          options={[
            { name: "5", value: "5" },
            { name: "10", value: "10" },
            { name: "20", value: "20" },
            { name: "50", value: "50" },
            { name: "100", value: "100" },
          ]}
          values={pageSizeValue}
          onChange={(selectedOptions) => {
            handleCurrentPageSize(Number(selectedOptions.target.value));
          }}
        />
      </div>

      <div className="flex items-center justify-center px-5 space-x-2">
  {/* Previous Button */}
  <button
    onClick={() => handleCurrentPageNumber(currentPage - 1)}
    disabled={currentPage === 1}
    className={`h-10 px-4 text-sm border rounded-full transition ${
      currentPage === 1
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-white text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 active:bg-gray-200"
    }`}
  >
    Previous
  </button>

        {/* Page Numbers */}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        ).map((page) => (
          <button
            key={page}
            onClick={() => handleCurrentPageNumber(page)}
            className={`w-10 h-10 text-sm border rounded-full transition ${
              currentPage === page
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 active:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}

<button
    onClick={() => handleCurrentPageNumber(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`h-10 px-4 text-sm border rounded-full transition ${
      currentPage === totalPages
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-white text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 active:bg-gray-200"
    }`}
  >
    Next
  </button>
      </div>

      {/* Records Info */}
      <div className="self-center mr-5 text-sm border">
        {startIndex} - {endIndex} of {props.totalRecords}
      </div>
    </div>
  );
}
