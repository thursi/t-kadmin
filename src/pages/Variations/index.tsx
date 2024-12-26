import { Button, DataTable, Modal } from "components";
import React, { useEffect, useMemo, useState } from "react";
import VariationForm from "./Create";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/reducer";
import Columns from "hooks/Variations/Columns";
import {
  useArchiveVariation,
  useStoreVariation,
  useUpdateVariation,
} from "hooks/Variations";
import { loadFiltereVariationRequested } from "features/variation/variationSlice";



interface Filters {
  // taxId?: { taxId: string };
  // categoryId?: { categoryId: string };
}

const Index = () => {
  const dispatch = useDispatch();
  const [createModal, setCreateModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [archiveModal, setArchiveModal] = React.useState(false);
  const [item, setItem] = useState<any>({});
  const [request, setRequest] = useState<any>({
    isActive: undefined,
    warrantyName: undefined,
    pageSize: 10,
    pageCount: 1,
  });
  const {
    filterVariation,
    variations,
    variationLoading,
    createdVariation,
    updatedVariation,
    archivedVariation,
  } = useSelector((state: RootState) => state.variation);

  console.log(item);

  useMemo(() => {
    if (createdVariation || updatedVariation || archivedVariation) {
      setCreateModal(false);
      setUpdateModal(false);
      setArchiveModal(false);
      dispatch(loadFiltereVariationRequested(request));
    }
  }, [createdVariation, updatedVariation, archivedVariation]);

  const { onStore } = useStoreVariation();
  const { onUpdate } = useUpdateVariation();
  const { onArchive } = useArchiveVariation();

  useEffect(() => {
    dispatch(loadFiltereVariationRequested(request));
  }, [dispatch]);

  const handleFilter = (
    filters: Filters,
    pageNumber: number,
    pageSize: number
  ) => {
    const updatedRequest = {
      ...request,
      // taxId: filters?.taxId ?? request.taxId,
      // categoryId: filters?.categoryId ?? request.categoryId,
      pageCount: pageNumber,
      pageSize: pageSize,
    };

    setRequest(updatedRequest);
    dispatch(loadFiltereVariationRequested(updatedRequest));
  };



  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Variations</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        columns={Columns}
        data={filterVariation}
        createModal={setCreateModal}
        loading={variationLoading}
        modalData={setItem}
        editModal={setUpdateModal}
        archiveModal={setArchiveModal}
        // dataItem={"Variation"}
      />
      <Modal
        isOpen={createModal}
        setISOpen={setCreateModal}
        title="Create Variation"
        content={<VariationForm onSubmit={onStore} setModal={setCreateModal} />}
      />
      <Modal
        isOpen={updateModal}
        setISOpen={setUpdateModal}
        title="Update Variation"
        content={
          <VariationForm
            onSubmit={onUpdate}
            setModal={setUpdateModal}
            item={item}
          />
        }
      />
      <Modal
        isOpen={archiveModal}
        setISOpen={setArchiveModal}
        title="Change Status?"
        content={
          <div className="flex flex-col justify-center  gap-4 p-5">
            <div>
              Do you really want to change the status of this variation?
            </div>
            <div className="flex justify-center gap-8 p-2">
              <Button
                name="Yes"
                onClick={() => onArchive(item.id)}
                className={
                  "text-xs text-white bg-primary text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
                }
              />
              <Button
                name="No"
                onClick={() => setArchiveModal(false)}
                className={
                  "text-xs text-black bg-white border-[1px] text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
                }
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Index;
