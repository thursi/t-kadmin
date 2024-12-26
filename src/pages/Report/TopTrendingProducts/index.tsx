import { Button, DatePicker, DropDown } from "components/shared";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { DateRangePicker } from "components/shared/DateRangePicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/reducer";
import {
  loadBusinessLocationsRequested,
  loadStockTransferReportRequested,
} from "features";
import { debug } from "console";

interface IDateRangePickerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  filters: any;
  setFilters: (filters: any) => void;
  pushFilter: (filters: any) => void;
}

export default function Index(props: IDateRangePickerProps) {
  const dispatch = useDispatch();
  const reportRef = useRef<HTMLDivElement>(null);
  const [buttonName, setButtonName] = useState<String>("Date Range Filter");
  const [showPicker, setShowPicker] = useState(false);
  const [request, setRequest] = useState({
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
    businessLocationId: undefined as string | undefined,
  });

  useEffect(() => {
    dispatch(loadBusinessLocationsRequested());
  }, [dispatch]);

  const { businessLocations } = useSelector(
    (state: RootState) => state.businessLocation
  );

  const locationOptions = businessLocations?.map((businessLocation: any) => ({
    name: businessLocation.businessName,
    value: businessLocation.id,
  }));

  useEffect(() => {
    dispatch(loadStockTransferReportRequested(request));
  }, []);

  const { stockTransferReport } = useSelector(
    (state: RootState) => state.stocktransfer
  );

  const handleDatePicker = (open: boolean) => {
    setShowPicker(open);
  };

  const handleApply = (filter: any) => {
    setButtonName(
      filter.dateRange.start_date + " - " + filter.dateRange.end_date
    );

    const updatedRequest = {
      ...request,
      startDate: filter.dateRange.start_date,
      endDate: filter.dateRange.end_date,
    };

    setRequest(updatedRequest);
    dispatch(loadStockTransferReportRequested(updatedRequest));
  };

  const handleDateRangeButtion = (name: string) => {
    const updatedRequest = {
      ...request,
      startDate: undefined,
      endDate: undefined,
    };
    setRequest(updatedRequest);
    setButtonName(name);
    dispatch(loadStockTransferReportRequested(updatedRequest));
  };

  const handleDropdownOnchage = (selectedOption: any) => {
    const updatedRequest = {
      ...request,
      businessLocationId: selectedOption?.target?.value,
    };

    setRequest(updatedRequest);
    dispatch(loadStockTransferReportRequested(updatedRequest));
  };

  const generatePDF = async () => {
    if (reportRef.current) {
      const pdf = new jsPDF("p", "mm", "a4");

      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.text("T & K Food mart", 105, 15, { align: "center" });

      const margin = 10;
      const reportTitleX = margin;
      const dateX = pdf.internal.pageSize.getWidth() - margin; // Right-aligned date

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text("Purchase & Sale Report", reportTitleX, 25);

      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      )}`;
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.text(formattedDate, dateX, 25, { align: "right" });

      const canvas = await html2canvas(reportRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 30, pdfWidth, pdfHeight);

      pdf.save("purchase-sale-report.pdf");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 px-4">
        <h1 className="font-bold text-2xl">
          Purchase & Sale Report&nbsp;&nbsp;
          <small className="font-thin text-sm text-gray-500">
            Purchase & sale details for the selected date range
          </small>
        </h1>
      </div>
      <div className="w-full h-28 flex flex-col lg:flex-row lg:justify-end items-center">
        <div className="w-full lg:w-1/3 flex flex-col lg:flex-row justify-end gap-4 p-4">
          <div className="w-1/2">
            <DropDown
              name="shopLocation"
              options={locationOptions}
              placeholder="ALL"
              className="border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
              label="Shop location"
              onChange={(selectedOption) =>
                handleDropdownOnchage(selectedOption)
              }
            />
          </div>

          <div className="w-1/2">
            <div className="flex items-end justify-center h-full">
              <Button
                name={buttonName}
                onClick={() => {
                  handleDatePicker(true);
                }}
                className="w-full text-[12px] font-bold text-white h-10 bg-blue-500 text-center p-2 rounded-md cursor-pointer"
              />
            </div>

            <DateRangePicker
              open={showPicker}
              setOpen={(open) => setShowPicker(false)}
              setFilters={(filter) => handleApply(filter)}
              setButtonName={(name) => handleDateRangeButtion(name)}
              filters={undefined}
              pushFilter={function (filters: any): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      </div>
      <div ref={reportRef}>
        <div className="p-4">
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/2 p-4 border rounded-lg bg-gray-200">
              <h2 className="text-left font-bold mb-4">Purchases</h2>
              <div className="px-8 overflow-x-auto">
                <table className="table w-full text-left">
                  <tbody>
                    <tr>
                      <td className="py-2 font-semibold">Total Purchase:</td>
                      <td className="py-2 text-right">
                        {(stockTransferReport?.totalPurchase ?? 0)?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">
                        Purchase Including Tax:
                      </td>
                      <td className="py-2 text-right">
                        {(
                          stockTransferReport?.purchaseIncludingTax ?? 0
                        )?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">
                        Total Purchase Return Including Tax:
                      </td>
                      <td className="py-2 text-right">
                        {(
                          stockTransferReport?.totalPurchaseReturnIncludingTax ??
                          0
                        )?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Purchase Due:</td>
                      <td className="py-2 text-right">
                        {(stockTransferReport?.purchaseDue ?? 0)?.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-4 border rounded-lg bg-gray-200">
              <h2 className="text-left font-bold mb-4">Sales</h2>
              <div className="px-8 overflow-x-auto">
                <table className="w-full text-left table">
                  <tbody>
                    <tr>
                      <td className="py-2 font-semibold">Total Sales:</td>
                      <td className="py-2 text-right">
                        {(stockTransferReport?.totalSale ?? 0)?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">
                        Sales Including Tax:
                      </td>
                      <td className="py-2 text-right">
                        {(stockTransferReport?.saleIncludingTax ?? 0)?.toFixed(
                          2
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">
                        Total Sales Return Including Tax:
                      </td>
                      <td className="py-2 text-right">
                        {(
                          stockTransferReport?.totalSellReturnIncludingTax ?? 0
                        )?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Sales Due:</td>
                      <td className="py-2 text-right">
                        {(stockTransferReport?.saleDue ?? 0)?.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="w-full">
            <div className="p-4 border rounded-lg bg-gray-300">
              <h2 className="text-left font-bold mb-4">
                Overall ((Sale - Sell Return) - (Purchase - Purchase Return))
              </h2>
              <div className="px-4 w-full lg:w-1/4 overflow-x-auto">
                <table className="table w-full text-left">
                  <tbody>
                    <tr>
                      <td className="py-2 font-semibold">Sale - Purchase:</td>
                      <td className="py-2 text-right text-red-700">
                        {(stockTransferReport?.overallDifference ?? 0)?.toFixed(
                          2
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Due amount:</td>
                      <td className="py-2 text-right text-red-700">
                        {(stockTransferReport?.dueAmount ?? 0)?.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <Button
          name="Print"
          className="text-[12px] font-bold text-white bg-blue-500 text-center p-2 w-[100px] rounded-md cursor-pointer"
          onClick={generatePDF}
        />
      </div>
    </div>
  );
}
