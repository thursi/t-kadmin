import { Button, DataTable, Modal } from 'components';
import Columns from 'hooks/PurchaseReturn/Columns';  // Update to correct columns hook for purchase returns
import { RootState } from 'store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import PurchaseReturnForm from './Create';  // Update to correct form for purchase returns
import { loadFilterPurchasesReturnRequested } from 'features/purchaseReturn/purchaseReturnSlice';  // Update to correct action for purchase returns
import {  useStorePurchaseReturn ,useEditPurchaseReturn} from 'hooks/PurchaseReturn';  // Update to correct hooks for purchase returns
import { PURCHASE_RETURN_CREATE, PURCHASE_RETURN_EDIT } from 'constants/routes';
import DetailsFrom from 'pages/PurchaseReturn/DetailsForm';



interface Filters {
  purchaseStatus?: string;
  // discountType?: string;
  // purchaseDate?: string;
}
function Index() {
  const dispatch = useDispatch();
  const [createModal, setCreateModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [archiveModal, setArchiveModal] = React.useState(false);
  const [item, setItem] = useState<any>({});
  
  const [request, setRequest] = useState<any>({
    purchaseStatus: undefined,
    // discountType: undefined,
    // purchaseDate: undefined,
    pageSize: 10,
    pageCount: 1,
  });

  const {filterpurchasesReturn, purchaseLoading,purchaseReturn,createdPurchaseReturn,purchasesReturn} = useSelector(
    (state: RootState) => state.purchaseReturn
  );
console.log(purchasesReturn)
useMemo(() => {
  if (createdPurchaseReturn) {
    setCreateModal(false);
    dispatch(loadFilterPurchasesReturnRequested(request));
  }
}, [createdPurchaseReturn]);

   const { onStore } = useStorePurchaseReturn();
 // const { onUpdate } = useEditPurchaseReturn();
  // const { onArchive } = useArchivePurchaseReturn();

  useEffect(() => {
    dispatch(loadFilterPurchasesReturnRequested(request));
  }, [dispatch]);

  const handleFilter = (
    filters: Filters,
    pageNumber: number,
    pageSize: number
  ) => {
    const updatedRequest = {
      ...request,
      // discountType: filters?.discountType ?? request.discountType,
      // purchaseDate: filters?.purchaseDate ?? request.purchaseDate,
      purchaseStatus: filters?.purchaseStatus ?? request.purchaseStatus,
      pageCount: pageNumber,
      pageSize: pageSize,
    };

    setRequest(updatedRequest);
    dispatch(loadFilterPurchasesReturnRequested(updatedRequest));
  };
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Purchase Return</div>
      
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}

        columns={Columns}  
        data={filterpurchasesReturn}  
        createModal={setCreateModal}
        loading={purchaseLoading}
        modalData={setItem}
        editModal={setUpdateModal}
        rowViewModal={setViewModal}
        archiveModal={setArchiveModal}
        create_route={PURCHASE_RETURN_CREATE}
        edit_route={PURCHASE_RETURN_EDIT}
        handleFilter={(filters, pageNumber: any, pageSize: any) => {
          handleFilter(filters, pageNumber, pageSize);
        }}
      />
      
      <div className="flex align-top justify-start top-0  ">
        <Modal
          isOpen={viewModal}
          setISOpen={setViewModal}
          title={item?.name}
          content={
            <div className="flex align-top justify-start top-0  ">
              <DetailsFrom item={item} setModal={setViewModal} />
            </div>
          }
        />
      </div>

      {/* Modal for updating an existing purchase return */}
      {/* <Modal
        isOpen={updateModal}
        setISOpen={setUpdateModal}
        title="Update Purchase Return"
        content={
          <PurchaseReturnForm
            onSubmit={onUpdate}
            setModal={setCreateModal}
            item={item}
          />
        }
      />  */}

      {/* Modal for archiving (changing status) of a purchase return */}
      <Modal
        isOpen={archiveModal}
        setISOpen={setArchiveModal}
        title="Change Status?"
        content={
          <div className="flex flex-col justify-center gap-4 p-5">
            <div>Do you really want to change the status of this purchase return?</div>
            <div className="flex justify-center gap-8 p-2">
              <Button
                name="Yes"
                //onClick={() => onArchive(item.id)}
                className="text-xs text-white bg-primary text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
              />
              <Button
                name="No"
                onClick={() => setArchiveModal(false)}
                className="text-xs text-black bg-white border-[1px] text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
              />
            </div>
          </div>
        }
      />
    </div>
  );
}

export default Index;
