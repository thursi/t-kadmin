import {
  useArchiveSupplier,
  useStoreSuppliers,
  useUpdateSupplier,
} from 'hooks/Suppliers';
import Form from '../Form';
import { SUPPLIERS } from 'constants/routes';

const Index = (props: {
  onSubmit: any;
  item?: any;
  setModal?: any;
  navigation?: any;
  head?: any;
}) => {
  const { onStore } = useStoreSuppliers();
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      {' '}
      <div className="w-full pb-5">
        <Form
          onSubmit={onStore}
          navigation={SUPPLIERS}
          setModal={props.setModal}
          item={props.item}
          buttonName={'Submit'}
        />
      </div>
    </div>
  );
};

export default Index;
