// const StatusBar = ({ status }: { status: boolean }) => {
//   function getStatus(status: any) {
//     switch (status) {
//       case "LOW_STOCK":
//         return (
//           <div className="text-[#FFB303] py-1 bg-[##FFFAF0] rounded-full px-2">
//             In Stock
//           </div>
//         );
//       case "OUT_OF_STOCK":
//         return (
//           <div className="text-danger py-1 bg-[#FFEBEB] rounded-full  px-2">
//             In Stock
//           </div>
//         );
//       default:
//         return (
//           <div className="text-success py-1 bg-[#EFFFF1] rounded-full  px-2">
//             In Stock
//           </div>
//         );
//     }
//   }
//   return <>{getStatus(status)}</>;
// };


const StatusBar = ({ status }: { status: boolean }) => {
  function getStatus(status: boolean) {
    switch (status) {
      case true:
        return (
          <div className="text-[#0CAF60] bg-[#E7F7EF] px-3 py-1 rounded-lg whitespace-nowrap">
          {/* <div className="text-success py-1 bg-[#FFFAF0] rounded-full px-2 whitespace-nowrap"> */}
            In Stock
          </div>
        );
      case false:
        return (
          <div className="text-[#FD6A6A] bg-[#FFF0F0] px-3 py-1 rounded-lg whitespace-nowrap">
          {/* <div className="text-danger py-1 bg-[#FFEBEB] rounded-full px-2 whitespace-nowrap"> */}
            Out Of Stock
          </div>
        );
      default:
        return (
          <div className="text-muted py-1 bg-[#F0F0F0] rounded-full px-2 whitespace-nowrap">
            Unknown Status
          </div>
        );
    }
  }

  return <>{getStatus(status)}</>;
};

export default StatusBar;

