import React, { useState } from 'react';
import { Button, Modal } from 'components';
import { useDispatch } from 'react-redux';
import { stockchangeProductRequested } from 'features';

interface ConfirmationModalProps {
  item: { id: number; inStock: boolean };
  onStatusChange: (newStatus: any) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  item,
  onStatusChange,
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeStatus = () => {
    console.log('Changing status for item with ID:', item.id);
    dispatch(stockchangeProductRequested({ id: item.id }));
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col justify-start gap-4 p-5">
      <div
        className={`px-1 py-1 rounded-lg text-sm font-thin cursor-pointer ${
          item.inStock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
        onClick={() => setIsModalOpen(true)}
      >
        {item.inStock ? 'In Stock' : 'Out of Stock'}
      </div>

      <Modal
        isOpen={isModalOpen}
        setISOpen={setIsModalOpen}
        title="Change Status?"
        content={
          <div className="flex flex-col justify-center gap-4 p-5">
            <div>Do you really want to change the status of this product?</div>
            <div className="flex justify-center gap-8 p-2">
              <Button
                name="Yes"
                onClick={handleChangeStatus}
                className="text-xs text-white bg-primary text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
              />
              <Button
                name="No"
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-black bg-white border-[1px] text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ConfirmationModal;
