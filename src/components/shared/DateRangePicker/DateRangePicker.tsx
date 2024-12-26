import { DateRangePicker } from "react-date-range";
import { Modal } from "../Modal";
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "../Button";

interface IDateRangePickerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  filters: any;
  setFilters: (filters: any) => void;
  pushFilter: (filters: any) => void;
  setButtonName: (name: string) => void;
}

const DateRangePickerComponent = (props: IDateRangePickerProps) => {
  const [dateRange, setDateRange] = useState({ ...props.filters });

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDateChange = (item: any) => {
    const updatedFilters = { ...props.filters };
    updatedFilters.dateRange = {
      start_date: format(item.selection.startDate, "yyyy-MM-dd"),
      end_date: format(item.selection.endDate, "yyyy-MM-dd"),
    };

    setState([item.selection]);
    setDateRange(updatedFilters);
  };

  const handleClear = (open: boolean) => {
    setState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    props.setOpen(open);
    props.setButtonName("Date Range Filter");
  };

  const handleApply = (open: boolean) => {
    props.setFilters(dateRange);
    setState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    props.setOpen(open);
  };

  return (
    <div>
      <Modal
        isOpen={props.open}
        setISOpen={(open) => props.setOpen(open)}
        title={"Select Date Range"}
        content={
          <div>
            <DateRangePicker
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
            />
            <div className="flex items-end justify-end">
              <div className="p-4">
                <Button
                  name="Clear"
                  onClick={() => {
                    handleClear(false);
                  }}
                  className="text-[12px] font-bold text-white bg-blue-500 text-center p-2 w-[100px] rounded-md cursor-pointer"
                />
              </div>
              <div className="p-4">
                <Button
                  name="Apply"
                  onClick={() => handleApply(false)}
                  className="text-[12px] font-bold text-white bg-blue-500 text-center p-2 w-[100px] rounded-md cursor-pointer"
                />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DateRangePickerComponent;
