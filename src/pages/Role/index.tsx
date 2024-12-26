import { Button, DataTable, Modal } from 'components';
import { DISCOUNT_CREATE, EDIT_DISCOUNT } from 'constants/routes';
import { loadRoleRequested } from 'features';

import {
  useArchiveCity,
  useCityStore,
  useFilterCity,
  useUpdateCity,
} from 'hooks/Cities';
import Columns from 'hooks/Role/Columns';
import { ArrowLeft, FileDown, Upload, X } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';

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
  const { onStore } = useCityStore();
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
  const {
    roles,

    roleLoading,
  } = useSelector((state: RootState) => state.role);

  console.log("thusCCCCCCCCCCCCCCCCCCC..............",roles)
  useEffect(() => {
    // dispatch(loadFilterDiscountsRequested(request));
    dispatch(loadRoleRequested());
  }, [dispatch]);

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Roles</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        import_csv={() => setImportModal(true)}
        columns={Columns}
        // data={cities}
        data={roles}
        createModal={setCreateModal}
        loading={roleLoading}
        create_route={DISCOUNT_CREATE}
        edit_route={EDIT_DISCOUNT}
        modalData={setItem}
        editModal={setUpdateModal}
        archiveModal={setArchiveModal}
      />
    </div>
  );
}

export default Index;
