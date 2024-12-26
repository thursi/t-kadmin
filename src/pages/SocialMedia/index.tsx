import { Button, DataTable, Modal } from 'components';
import Columns from 'hooks/SocialMedia/Columns';  // Update to correct columns hook for purchase returns
import { RootState } from 'store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { useUpdateSocialMedia } from 'hooks/SocialMedia';  // Update to correct hooks for purchase returns
import { SOCIAL_MEDIA_EDIT } from 'constants/routes';
import { loadFiltereSocialMediaRequested,  } from 'features';
import Form from "./Form";



interface Filters {
  // taxId?: { taxId: string };
  // categoryId?: { categoryId: string };
}

function Index() {
  const dispatch = useDispatch();
  const [createModal, setCreateModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [archiveModal, setArchiveModal] = React.useState(false);
  const [item, setItem] = useState<any>({});
  const [request, setRequest] = useState<any>({
    // taxId: undefined,
    // categoryId: undefined,
    pageSize: 10,
    pageCount: 1,
  });
  const { mediaLoading,medias, filterSocialMedia} = useSelector(
    (state: RootState) => state.socialMedia
  );



  const { onUpdateSocialMedia } = useUpdateSocialMedia();


  useEffect(() => {
    dispatch(loadFiltereSocialMediaRequested(request));
  }, [dispatch,request]);


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
    dispatch(loadFiltereSocialMediaRequested(updatedRequest));
  };

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Social Media Links</div>
      
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}

        columns={Columns}  
        data={filterSocialMedia}  
        createModal={setCreateModal}
        loading={mediaLoading}
        modalData={setItem}
        editModal={setUpdateModal}
        rowViewModal={setViewModal}
        archiveModal={setArchiveModal}
        handleFilter={(filters, pageNumber: any, pageSize: any) => {
          console.log('Filters from DataTable:', filters);
          handleFilter(filters, pageNumber, pageSize);
        }}
       // edit_route={SOCIAL_MEDIA_EDIT}
        />
      
       <Modal
        isOpen={updateModal}
        setISOpen={setUpdateModal}
        title="Update Social Media Link"
        content={
          <Form
            onSubmit={onUpdateSocialMedia}
            setModal={(open) => setUpdateModal(open)}
            item={item}
          />
        }
      />
     

      

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
