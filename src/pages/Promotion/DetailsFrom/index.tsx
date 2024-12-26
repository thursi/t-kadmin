import { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from 'components';
import {
  Tag,
  Calendar,
  Package,
  Percent,
  Clock,
  CheckCircle
} from 'lucide-react';

const Index = (props: { onSubmit?: any; item?: any; setModal?: any }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [loading, setLoading] = useState(false);

  if (!props.item) {
    return <div>No data available</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg overflow-hidden">
      {loading && <p className="indicator">onBeforePrint: Loading...</p>}
      <div
        ref={contentRef}
        className="bg-white p-6 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="flex justify-between items-center">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Discount Detail</h2>
            <span className="text-gray-800 text-sm font-medium">
              Discount ID: #{props?.item?.id}
            </span>
          </div>
          <div>
            <span className={`px-3 py-1 rounded-full ${
              props.item?.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {props.item?.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="flex gap-2 items-center font-sans w-full flex-wrap mb-6">

          <img
            src={props.item?.image}
            className="w-full h-36 object-cover p-1 rounded-sm items-center justify-center content-center"
            style={{ borderRadius: '20px' }}
            // alt="Producte"
          />
        </div>

        <div className="flex gap-4 items-center font-sans w-full flex-wrap">
          <div className="flex-2 border border-gray-300 rounded-xl bg-gray-100 p-5 shadow-md w-full">
            <div className="flex items-center mb-4">
              <i className="mr-2">🏷️</i>
              <p className="font-bold m-0">{props.item?.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm flex bg-white p-2 rounded-2xl shadow-md text-gray-600">
                  <Calendar className="h-5 w-5 mr-1" />
                  Start: {new Date(props.item?.startDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-sm flex bg-white p-2 rounded-2xl shadow-md text-gray-600">
                  <Calendar className="h-5 w-5 mr-1" />
                  End: {new Date(props.item?.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 mt-6">
          <span className="text-gray-800 text-sm font-medium">Discount Details:</span>
        </div>
        
        {props.item?.discountResponses?.map((discount: any, index: number) => (
          <div key={index} className="w-full mt-4 border p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="font-semibold text-xs">
                <strong className="font-semibold text-xs text-gray-500">
                  Discount Name:
                </strong>{' '}
                {discount.discountName || '--'}
              </div>
              <div className="font-semibold text-xs">
                <strong className="font-semibold text-xs text-gray-500">
                  Type:
                </strong>{' '}
                {discount.discountType?.replace(/_/g, ' ') || '--'}
              </div>
              <div className="font-semibold text-xs">
                <strong className="font-semibold text-xs text-gray-500">
                  Margin Type:
                </strong>{' '}
                {discount.marginType || '--'}
              </div>
              <div className="font-semibold text-xs">
                <strong className="font-semibold text-xs text-gray-500">
                  Products Required:
                </strong>{' '}
                {discount.noOfProducts || '0'}
              </div>
              <div className="font-semibold text-xs">
                <strong className="font-semibold text-xs text-gray-500">
                  Value:
                </strong>{' '}
                {discount.marginType === 'FIXED' 
                  ? `$${discount.discountValue}` 
                  : `${discount.discountPercentage}%`}
              </div>
              <div className="font-semibold text-xs">
                <strong className="font-semibold text-xs text-gray-500">
                  Discount Price:
                </strong>{' '}
                ${discount.discountPrice || '0'}
              </div>
            </div>

            {/* Product Variable Details */}
            {discount.productVariableResponse && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold text-sm mb-2">Product Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg shadow-md">
                    <div className="flex items-center gap-4">
                      <img
                        src={discount.productVariableResponse.image || 'https://via.placeholder.com/150'}
                        alt={discount.productVariableResponse.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex flex-col justify-start">
                        <h3 className="font-semibold text-lg">
                          {discount.productVariableResponse.name}
                        </h3>
                        <p className="text-sm">
                          SKU: {discount.productVariableResponse.sku}
                        </p>
                        <p className="text-sm">
                          Price: ${discount.productVariableResponse.sellingPrice}
                        </p>
                        <p className="text-sm">
                          Tax: ${discount.productVariableResponse.taxAmount || '0'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {discount.freeProductVariableResponse && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold text-sm mb-2">Free Product</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg shadow-md">
                    <div className="flex items-center gap-4">
                      <img
                        src={discount.freeProductVariableResponse.image || 'https://via.placeholder.com/150'}
                        alt={discount.freeProductVariableResponse.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex flex-col justify-start">
                        <h3 className="font-semibold text-lg">
                          {discount.freeProductVariableResponse.name}
                        </h3>
                        <p className="text-sm">
                          SKU: {discount.freeProductVariableResponse.sku}
                        </p>
                        <p className="text-sm">
                          Value: ${discount.freeProductVariableResponse.sellingPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}



            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="font-semibold text-xs">
                <strong className="font-semibold text-xs text-gray-500">
                  Start Date:
                </strong>{' '}
                {new Date(discount.discountStartDate).toLocaleDateString()}
              </div>
              <div className="font-semibold text-xs">
                <strong className="font-semibold text-xs text-gray-500">
                  End Date:
                </strong>{' '}
                {new Date(discount.discountEndDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between mb-2 mt-6 flex-2 border border-gray-300 rounded-xl bg-gray-100 p-5">
          <div className="flex-1 grid grid-cols-3 gap-4 px-5">
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Created At:
              </strong>{' '}
              {new Date(props.item?.createdAt).toLocaleDateString()}
            </div>
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Updated At:
              </strong>{' '}
              {new Date(props.item?.updatedAt).toLocaleDateString()}
            </div>
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Status:
              </strong>{' '}
              <span className={`px-2 py-1 rounded-full ${
                props.item?.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {props.item?.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>


      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <Button
          onClick={() => props?.setModal(false)}
          name={'Close'}
          className="bg-primary text-white font-bold py-2 px-4 rounded"
        />
        <Button
          onClick={reactToPrintFn}
          name={'Print'}
          className="bg-primary text-white font-bold py-2 px-4 rounded"
        />
      </div>
    </div>
  );
};

export default Index;