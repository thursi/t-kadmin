import { Button, DataTable, Modal } from 'components';
import {
  DISCOUNT_CREATE,
  EDIT_DISCOUNT,
  EDIT_USER,
  USER_CREATE,
} from 'constants/routes';
import { loadFilterUsersRequested, loadRoleRequested } from 'features';
import UserForm from './Create';
import {
  useArchiveCity,
  useCityStore,
  useFilterCity,
  useUpdateCity,
} from 'hooks/Cities';
import Columns from 'hooks/Users/Columns';
import { ArrowLeft, FileDown, Upload, X } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import { useSignUp } from 'hooks/Login';

interface Filters {
  isActive?: { isActive: boolean };
}
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

function Index() {
  const dispatch = useDispatch();
  const { OnSignUp } = useSignUp();

  const { onUpdate } = useUpdateCity();
  const { onFilter } = useFilterCity();
  const { onArchive } = useArchiveCity();
  const [createModal, setCreateModal] = React.useState(false);
  const [item, setItem] = React.useState<any>({});
  const [updateModal, setUpdateModal] = React.useState(false);
  const [archiveModal, setArchiveModal] = React.useState(false);
  const [filterModal, setFilterModal] = React.useState(false);
  const [importModal, setImportModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [request, setRequest] = useState<any>({
    isActive: undefined,
    pageSize: 10,
    pageCount: 1,
  });
  const { usersFilter, userLoading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(loadFilterUsersRequested(request));
    // dispatch(loadFilterUsersRequested());
  }, [dispatch]);

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Users</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        import_csv={() => setImportModal(true)}
        columns={Columns}
        // data={cities}
        data={usersFilter}
        createModal={setCreateModal}
        loading={userLoading}
        // create_route={USER_CREATE}
        // edit_route={EDIT_USER}
        modalData={setItem}
        editModal={setUpdateModal}
        archiveModal={setArchiveModal}
      />

      <Modal
        isOpen={createModal}
        setISOpen={setCreateModal}
        title="Create User"
        content={<UserForm onSubmit={OnSignUp} setModal={setCreateModal} />}
      />

      <Modal
        isOpen={updateModal}
        setISOpen={setUpdateModal}
        title="Edit City"
        content={
          <UserForm onSubmit={onUpdate} setModal={setUpdateModal} item={item} />
        }
      />
    </div>
  );
}

export default Index;
