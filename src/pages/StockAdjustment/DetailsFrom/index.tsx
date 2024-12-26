import { Button, Modal } from 'components';
import default_image from '../../../assets/images/png/defaultImage.png';

import { useState } from 'react';
import { EditIcon } from 'lucide-react';
import { useStatusAdjustment } from 'hooks/StockAdjustment';

const Index = (props: { onSubmit?: any; item?: any; setModal?: any }) => {
  const businessLocation = props.item?.businessLocationResponse;
  const productVariable = props.item?.productVariableResponse;
  const [statusChangeModel, setStatusChangeModel] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(
    props.item?.active ? 'ACTIVE' : 'INACTIVE'
  );
  const { onStatus } = useStatusAdjustment();

  const confirmStatusChange = () => {
    // props.onActiveStatusChange(selectedStatus === 'ACTIVE');
    setStatusChangeModel(false);
  };

  return (
    <div className="w-full flex-col py-2">
      <div className="flex justify-between mb-1">
        <div className="px-5">
          <img
            src={productVariable?.image || default_image}
            alt={productVariable?.name || 'Product'}
            className="w-32 h-32 object-cover rounded-md"
            style={{ borderRadius: '16px' }}
          />
        </div>

        <div className="flex-1 grid grid-cols-3 gap-4 px-5">
          <div>
            <strong className="text-sm">Shop Quantity:</strong>{' '}
            {props.item?.shopQuantity || '--'}
          </div>
          <div>
            <strong className="text-sm">Selling Price:</strong>{' '}
            {props.item?.sellingPrice || '--'}
          </div>
          <div>
            <strong className="text-sm">Selling Price with Tax:</strong>{' '}
            {props.item?.sellingPriceWithTax || '--'}
          </div>
          <div>
            <strong className="text-sm">Margin Percentage:</strong>{' '}
            {props.item?.marginPercentage || '--'}
          </div>
          <div>
            <strong className="text-sm">Product Tax Name:</strong>{' '}
            {props.item?.productTaxResponse?.taxName || '--'}
          </div>
          <div>
            <strong className="text-sm">Product Tax Amount:</strong>{' '}
            {props.item?.productTaxResponse?.tax || '--'}
          </div>
          <div>
            <strong className="text-sm">Margin Type:</strong>{' '}
            {props.item?.marginType || '--'}
          </div>
          {/* <div>
            <strong className="text-sm">Active:</strong>{' '}
            {props.item?.active ? 'Yes' : 'No'}
          </div> */}

          <div className="">
            <div>
              <strong className="text-sm">Active:</strong>{' '}
              {props.item?.active ? 'Yes' : 'No'}
              {/* <div className="mt-1 flex"> */}
              <button
                type="button"
                className="text-gray-500 ml-2 hover:text-indigo-500 cursor-pointer"
                onClick={() => setStatusChangeModel(true)}
              >
                <EditIcon className="w-4 h-4" />
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-4 border p-4">
        <h3 className="font-semibold text-lg">Business Location</h3>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-sm font-semibold">
                Business Name
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Description
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">City</th>
              <th className="border px-2 py-1 text-sm font-semibold">Active</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1 text-xs font-normal">
                {businessLocation?.businessName || '--'}
              </td>
              <td className="border px-2 py-1 text-xs font-normal">
                {businessLocation?.description || '--'}
              </td>
              <td className="border px-2 py-1 text-xs font-normal">
                {businessLocation?.city || '--'}
              </td>
              <td className="border px-2 py-1 text-xs font-normal">
                {businessLocation?.active ? 'Yes' : 'No'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full mt-4 border p-4">
        <h3 className="font-semibold text-lg">Product Variable</h3>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-sm font-semibold">
                Product Name
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">SKU</th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Quantity
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Purchase Price
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                In Stock
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1 text-xs font-normal">
                {productVariable?.name || '--'}
              </td>
              <td className="border px-2 py-1 text-xs font-normal">
                {productVariable?.sku || '--'}
              </td>
              <td className="border px-2 py-1 text-xs font-normal">
                {productVariable?.quantity || '--'}
              </td>
              <td className="border px-2 py-1 text-xs font-normal">
                {productVariable?.purchasePrice || '--'}
              </td>
              <td className="border px-2 py-1 text-xs font-normal">
                {productVariable?.inStock ? 'Yes' : 'No'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={statusChangeModel}
        setISOpen={setStatusChangeModel}
        title="Change Status?"
        content={
          <div className="flex flex-col justify-center gap-4 p-5">
            <div>Do you really want to change the status of this product?</div>
            <div className="py-1 rounded-md text-xs flex-1 mb-10">
              <label className="block mb-3 text-sm font-medium text-gray-700">
                Product Status:
              </label>
              <select
                name="productStatus"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full px-2 py-2  border text-xs border-[#b0afb3] focus:outline-none rounded-md"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end gap-8 p-2">
              <Button
                name="No"
                onClick={() => setStatusChangeModel(false)}
                className="text-xs text-black bg-white border-[1px] text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
              />
              <Button
                name="Yes"
                // onClick={confirmStatusChange}
                onClick={() => {
                  onStatus(props?.item?.id);
                  setStatusChangeModel(false);
                }}
                className="text-xs text-white bg-primary text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
              />
            </div>
          </div>
        }
      />

      <div className="mt-8 flex justify-end space-x-4">
        <Button
          onClick={async () => props?.setModal(false)}
          name={'Close'}
          className="bg-primary text-white font-bold py-2 px-4 rounded"
        />
        <Button
          onClick={async () => {}}
          name={'print'}
          className="bg-primary text-white font-bold py-2 px-4 rounded"
        />
      </div>
    </div>
  );
};

export default Index;
