import { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from 'components';
import StatusBadge from './StatusBadge';
import default_image from '../../../assets/images/png/defaultImage.png';

import {
  BuildingIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  ShoppingBagIcon,
  TruckIcon,
} from 'lucide-react';

const Index = (props: { onSubmit?: any; item?: any; setModal?: any }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [loading, setLoading] = useState(false);

  if (!props.item) {
    return <div>No data available</div>;
  }
  const status = props?.item?.deliveryStatus;
  const getColor = (currentStatus: any) => {
    if (
      (status === 'READY' && currentStatus === 'PENDING') ||
      (status === 'DISPATCHED' &&
        ['PENDING', 'READY'].includes(currentStatus)) ||
      (status === 'DELIVERED' &&
        ['PENDING', 'READY', 'DISPATCHED', 'DELIVERED'].includes(currentStatus))
    ) {
      return 'text-green-500';
    }
    if (status === currentStatus) {
      return 'text-blue-500';
    }
    return 'text-gray-600';
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-lg overflow-hidden">
            {loading && <p className="indicator">onBeforePrint: Loading...</p>}
      <div
        // ref={componentRef}
        ref={contentRef}
        style={
          {
            // margin: '1in',
          }
        }
        className="bg-white p-6 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="flex justify-between items-center">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Order Detail</h2>
            <span className="text-gray-800 text-sm font-medium">
              Order ID: #{props?.item?.id}
            </span>
          </div>
          <div>
            <StatusBadge
              id={props?.item?.id}
              status={props?.item?.deliveryStatus}
              onStatusChange={(newStatus) => {
                console.log(
                  `Status for ID ${props?.item?.id} changed to ${props?.item?.deliveryStatus}`
                );
              }}
            />
          </div>
        </div>

        <div className="flex gap-4 items-center font-sans w-full flex-wrap">
          <div className="flex-2 border border-gray-300 rounded-xl bg-gray-100 p-5 shadow-md w-4/8">
            <div className="flex items-center mb-4">
              <i className="mr-2">🚚</i>
              <p className="font-bold m-0">Be user, package on deliver!</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm flex bg-white p-2 rounded-2xl shadow-md text-gray-600">
                <BuildingIcon className="h-5 w-5 mr-1" />
                {props?.item?.businessLocationResponse?.businessName}
              </span>
              <div className="flex-1 border-t border-dashed border-gray-400 mx-2"></div>
              <span className="text-sm flex bg-white p-2 rounded-2xl shadow-md text-gray-600">
                <MapPinIcon className="h-5 w-5 mr-1" />

                {props?.item?.shippingAddressResponse?.addressTittle}
              </span>
            </div>
            <div className="w-full h-2  rounded-full mt-4 mb-2 relative">
              {/* <div className="w-4/5 h-full bg-red-600 rounded-full"></div>
               */}

              <div className="flex items-center justify-between">
                {[
                  { status: 'PENDING', label: 'Pending', Icon: ClockIcon },
                  { status: 'READY', label: 'Ready', Icon: CheckCircleIcon },
                  {
                    status: 'DISPATCHED',
                    label: 'Shipping',
                    Icon: ShoppingBagIcon,
                  },
                  { status: 'DELIVERED', label: 'Delivered', Icon: TruckIcon },
                ].map((step, index, steps) => (
                  <div className="flex items-center" key={step.status}>
                    <span className={`text-sm ${getColor(step.status)}`}>
                      <step.Icon
                        className={`h-5 w-5 inline-block mr-1 ${getColor(
                          step.status
                        )}`}
                        aria-label={step.label}
                      />
                      {step.label}
                    </span>
                    {index < steps.length - 1 && (
                      <div className="flex-1 border-blue-400 text-blue-400 mx-4">
                        -----→
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-4 border border-gray-300 rounded-xl p-5 bg-gray-100 text-center shadow-md w-4/8">
            <i className="text-3xl mb-3 inline-block">📅</i>
            <p className="m-0 text-gray-500 text-sm">Estimated Arrival</p>
            <p className="m-0 font-semibold text-xs">
              {props?.item?.deliveryDate}
            </p>
          </div>

          <div className="flex-2 border border-gray-300 rounded-xl p-5 text-center bg-gray-100 shadow-md w-2/8">
            <i className="text-3xl mb-3 inline-block">⏱</i>
            <p className="m-0 text-gray-500 text-sm">Delivered in</p>
            <p className="m-0 font-semibold text-xs">
              {props?.item?.deliverDays} Days
            </p>
          </div>
        </div>

        <div className="flex justify-between mb-2 mt-6  border border-gray-300 rounded-xl bg-gray-100 p-5">
          <div className="flex-1 grid grid-cols-3 gap-4 px-5">
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Reference No:
              </strong>{' '}
              {props.item?.referenceNo || '--'}
            </div>
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Order Date :
              </strong>{' '}
              {props.item?.orderDate || '--'}
            </div>
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Order Type:
              </strong>{' '}
              {props.item?.orderType || '--'}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <span className="text-gray-800 text-sm font-medium ">Items :</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {props?.item?.orderItemResponses.map((product: any, index: any) => (
            <div key={index} className="p-4 border rounded-lg shadow-md">
              <div className="flex items-center gap-4">
                <img
                  src={product.image || 'https://via.placeholder.com/150'}
                  alt={product?.productVariableResponse?.name}
                  className="w-20 h-20 object-cover rounded-md"
                />

                <div className="flex flex-col justify-start">
                  <h3 className="font-semibold text-lg">
                    {product?.productVariableResponse?.name}
                  </h3>

                  <p className="text-sm">
                    Price:
                    {product?.productVariableResponse?.sellingPrice.toLocaleString()}
                  </p>

                  <p className="text-sm">
                    Tax:
                    {product?.productVariableResponse?.taxAmount?.toLocaleString() ||
                      '0'}
                  </p>

                  <p className="text-sm">
                    Total:
                    {product?.productVariableResponse?.sellingPriceWithTax?.toLocaleString() ||
                      '0'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-white  p-6">
          <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-medium px-3 py-1 rounded-bl-lg text-gray-800">
            ⭐ Role:{' '}
            {props.item?.userResponse?.roleResponses
              ?.map((role: any) => role.name)
              .join(', ') || 'User'}
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-xs text-gray-800 mb-4">
              User Details :
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex flex-col font-semibold text-xs ">
                <span className="text-gray-500 font-semibold text-xsfont-medium">
                  First Name:
                </span>
                <span>{props.item?.userResponse?.firstName || '--'}</span>
              </div>
              <div className="flex flex-col font-semibold text-xs">
                <span className="text-gray-500 font-semibold text-xsfont-medium">
                  Last Name:
                </span>
                <span>{props.item?.userResponse?.lastName || '--'}</span>
              </div>
              <div className="flex flex-col font-semibold text-xs">
                <span className="text-gray-500 font-semibold text-xsfont-medium">
                  Username:
                </span>
                <span>{props.item?.userResponse?.userName || '--'}</span>
              </div>
              <div className="flex flex-col font-semibold text-xs">
                <span className="text-gray-500 font-semibold text-xsfont-medium">
                  Date of Birth:
                </span>
                <span>{props.item?.userResponse?.dateOfBirth || '--'}</span>
              </div>
              <div className="flex flex-col font-semibold text-xs">
                <span className="text-gray-500 font-semibold text-xsfont-medium">
                  Phone No:
                </span>
                <span>{props.item?.userResponse?.phoneNo || '--'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <span className="text-gray-800 text-sm font-medium">
            Business Location :
          </span>
        </div>
        <div className="w-full mt-4 border p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Business Name:
              </strong>{' '}
              {props.item?.businessLocationResponse?.businessName || '--'}
            </div>
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                City:
              </strong>{' '}
              {props.item?.businessLocationResponse?.city || '--'}
            </div>
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Description:
              </strong>{' '}
              {props.item?.businessLocationResponse?.description || '--'}
            </div>
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Active:
              </strong>{' '}
              {props.item?.businessLocationResponse?.active ? 'Yes' : 'No'}
            </div>
          </div>
        </div>

        <div className="w-full mt-4 border p-4">
          <strong className="font-semibold text-xs mb-4 text-black">
            At the Delivery Address
          </strong>{' '}
          <strong className="font-semibold text-xs mb-4 text-black">
            {props.item?.differentDeliveryAddress === false
              ? 'Shipping Address and Billing Address both are same'
              : 'Shipping Address and Billing Address both are different'}
          </strong>{' '}
          <div className="grid grid-cols-2 mt-4 gap-6">
            {props.item?.differentDeliveryAddress === true && (
              <div className="border p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-sm mb-2 text-gray-700">
                  Billing Address
                </h3>
                <div className="text-xs text-gray-600 space-y-2">
                  <div>
                    <strong className="text-gray-500">Title:</strong>{' '}
                    {props.item?.billingAddressResponse?.addressTittle || '--'}
                  </div>
                  <div>
                    <strong className="text-gray-500">Contact Name:</strong>{' '}
                    {props.item?.billingAddressResponse?.contactName || '--'}
                  </div>
                  <div>
                    <strong className="text-gray-500">Contact No:</strong>{' '}
                    {props.item?.billingAddressResponse?.contactNo || '--'}
                  </div>
                  <div>
                    <strong className="text-gray-500">Address Line 1:</strong>{' '}
                    {props.item?.billingAddressResponse?.addressLine1 || '--'}
                  </div>
                  <div>
                    <strong className="text-gray-500">Address Line 2:</strong>{' '}
                    {props.item?.billingAddressResponse?.addressLine2 || '--'}
                  </div>
                  <div>
                    <strong className="text-gray-500">State:</strong>{' '}
                    {props.item?.billingAddressResponse?.state || '--'}
                  </div>
                  <div>
                    <strong className="text-gray-500">City:</strong>{' '}
                    {props.item?.billingAddressResponse?.city || '--'}
                  </div>
                </div>
              </div>
            )}

            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-sm mb-2 text-gray-700">
                Shipping Address
              </h3>
              <div className="text-xs text-gray-600 space-y-2">
                <div>
                  <strong className="text-gray-500">Title:</strong>{' '}
                  {props.item?.shippingAddressResponse?.addressTittle || '--'}
                </div>
                <div>
                  <strong className="text-gray-500">Contact Name:</strong>{' '}
                  {props.item?.shippingAddressResponse?.contactName || '--'}
                </div>
                <div>
                  <strong className="text-gray-500">Contact No:</strong>{' '}
                  {props.item?.shippingAddressResponse?.contactNo || '--'}
                </div>
                <div>
                  <strong className="text-gray-500">Address Line 1:</strong>{' '}
                  {props.item?.shippingAddressResponse?.addressLine1 || '--'}
                </div>
                <div>
                  <strong className="text-gray-500">Address Line 2:</strong>{' '}
                  {props.item?.shippingAddressResponse?.addressLine2 || '--'}
                </div>
                <div>
                  <strong className="text-gray-500">State:</strong>{' '}
                  {props.item?.shippingAddressResponse?.state || '--'}
                </div>
                <div>
                  <strong className="text-gray-500">ZipCode:</strong>{' '}
                  {props.item?.shippingAddressResponse?.zipCode || '--'}
                </div>
                <div>
                  <strong className="text-gray-500">City:</strong>{' '}
                  {props.item?.shippingAddressResponse?.city || '--'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mb-2 mt-6 flex-2 border border-gray-300 rounded-xl bg-gray-100 p-5">
          <div className="flex-1 grid grid-cols-3 gap-4 px-5">
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Payment Status:
              </strong>
              <span
                className={`font-semibold text-xs px-3 py-1.5 rounded-full ${
                  props.item?.paymentGatewayStatus === 'PENDING'
                    ? 'text-[#FE964A] bg-[#FFF0E6]'
                    : 'text-primary bg-[#3cadd3]'
                }`}
              >
                {props.item?.paymentGatewayStatus || '--'}
              </span>
            </div>
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Payment Type:
              </strong>{' '}
              {props.item?.paymentType || '--'}
            </div>
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Sub Total:
              </strong>{' '}
              {props.item?.subTotal || '--'}
            </div>
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Discount:
              </strong>{' '}
              {props.item?.discount || '--'}
            </div>
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Delivery Charge:
              </strong>{' '}
              {props.item?.deliveryCharge || '--'}
            </div>
            <div className="font-semibold text-xs">
              <strong className="font-semibold text-xs text-gray-500">
                Total:
              </strong>{' '}
              {props.item?.total || '--'}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8  flex justify-end space-x-4">
        <Button
          onClick={() => props?.setModal(false)}
          name={'Close'}
          className="bg-primary text-white font-bold py-2 px-4 rounded"
        />
        <Button
          // onClick={handleOnClick}
          onClick={reactToPrintFn}
          name={'Print'}
          className="bg-primary text-white font-bold py-2 px-4 rounded"
        />
      </div>
    </div>
  );
};

export default Index;
