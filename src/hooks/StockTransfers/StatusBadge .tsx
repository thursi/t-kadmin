import React, { useState } from "react";
import { Modal, Button } from "components";
import { useStatusStockTransfer } from ".";
import { StatusStockTransferRequested } from "features";
import { useDispatch } from "react-redux";

// Define the union type based on the valid status strings
type StatusType = "COMPLETED" | "CANCELLED" | "PENDING" | "IN_TRANSIT";

interface StatusBadgeProps {
  id: number; 
  status: StatusType;
  onStatusChange: (newStatus: StatusType) => void;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ id, status, onStatusChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusType>(status);
  const { onStatus } = useStatusStockTransfer();
  const dispatch = useDispatch();

  const statusStyles: Record<StatusType, string> = {
    COMPLETED: "text-[#0CAF60] bg-[#E7F7EF]",
    CANCELLED: "text-[#FD6A6A] bg-[#FFF0F0]",
    PENDING: "text-[#FE964A] bg-[#FFF0E6]",
    IN_TRANSIT: "text-[#8C62FF] bg-[#F4F0FF]",
  };

  return (
    <div>
      {/* Status Badge - Click to Change */}
      <div
        className={`px-3 py-1 rounded-lg text-sm font-thin cursor-pointer ${statusStyles[selectedStatus]}`}
        onClick={() => setIsModalOpen(true)} // Open modal when clicked
      >
        {selectedStatus.charAt(0) + selectedStatus.slice(1).toLowerCase().replace('_', ' ')}
      </div>

      <Modal
        isOpen={isModalOpen}
        setISOpen={setIsModalOpen}
        title="Change Status"
        content={
          <div className="flex flex-col justify-center gap-2 p-3">
            {selectedStatus === "COMPLETED" || selectedStatus === "CANCELLED" ? (
              // Show message if status can't be changed
              <div className="text-black text-xs font-medium">
                You cannot change the status because it is either "Completed" or "Cancelled".
              </div>
            ) : (
              <>
                <div className="py-1 rounded-md text-xs flex-1 mb-10">
                  <label className="block mb-3 text-sm font-medium text-gray-700">Select New Status:</label>
                  <select
                    name="stockTransferStatus"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as StatusType)} 
                    className="block w-full px-2 py-2 border text-xs border-[#b0afb3] focus:outline-none rounded-md"
                  >
                    <option value="COMPLETED">Completed</option>
                    <option value="PENDING">Pending</option>
                    <option value="IN_TRANSIT">In Transit</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>

                <div className="flex justify-end gap-8 p-2">
                  <Button
                    name="Cancel"
                    onClick={() => setIsModalOpen(false)}
                    className="text-xs text-black bg-white border-[1px] text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
                  />
                  <Button
                    name="Confirm"
                    onClick={() => {
                      // Dispatch the new status with the row ID
                      dispatch(StatusStockTransferRequested({
                        id: id,
                        status: selectedStatus,
                      }));
                      setIsModalOpen(false); // Close modal after status change
                    }}
                    className="text-xs text-white bg-primary text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>
        }
      />
    </div>
  );
};

export default StatusBadge;
