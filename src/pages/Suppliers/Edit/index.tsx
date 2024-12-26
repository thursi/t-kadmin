import {
  useArchiveSupplier,
  useStoreSuppliers,
  useUpdateSupplier,
} from 'hooks/Suppliers';
import Form from '../Form';
import { SUPPLIERS } from 'constants/routes';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { loadByIdRequested } from 'features';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';

const Index = (props: {
  onSubmit: any;
  item?: any;
  setModal?: any;
  navigation?: any;
  head?: any;
}) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    // Dispatching the action with the id from useParams
    dispatch(loadByIdRequested({ id }));
  }, [dispatch, id]);

  const { onUpdate } = useUpdateSupplier();
  const {
    contactById,
    conLoading,
  } = useSelector((state: RootState) => state.contact);



  
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="w-full pb-5">
        <Form
          onSubmit={onUpdate}
          navigation={SUPPLIERS}
          setModal={false}
          item={contactById}
          buttonName={'Update'}
        />
      </div>
    </div>
  );
};

export default Index;
