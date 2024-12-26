import { Button } from 'components';

import default_image from '../../../assets/images/png/defaultImage.png';

const Index = (props: { onSubmit?: any; item?: any; setModal?: any }) => {
  return (
    <div className="w-full flex-col py-2">
      <div className="flex justify-between mb-1">
        <div className="px-5">
          <img
            src={props.item?.image || default_image}
            alt={props.item?.productName || 'Product'}
            className="w-32 h-32 object-cover rounded-md"
            style={{ borderRadius: '16px' }}
          />
        </div>

        <div className="flex-1 gap-4 px-5">
          <div className="mb-5">
            <strong className="text-sm ">Date:</strong>{' '}
            {props.item?.paymentDate || '--'}
          </div>
          <div className="mb-5">
            <strong className="text-sm ">Transaction ID:</strong>{' '}
            {props.item?.transactionId || '--'}
          </div>
          <div>
            <strong className="text-sm">Status:</strong>
            {props.item?.paymentGatewayStatus === 'PAID' && (
              <span className="text-[#0CAF60] bg-[#E7F7EF] px-3 py-1 rounded-full">
                Paid
              </span>
            )}
            {props.item?.paymentGatewayStatus === 'FAILED' && (
              <span className="text-[#FD6A6A] bg-[#FFF0F0] px-3 py-1 rounded-full">
                Failed
              </span>
            )}
            {props.item?.paymentGatewayStatus === 'PENDING' && (
              <span className="text-[#FE964A] bg-[#FFF0E6] px-3 py-1 rounded-full">
                Pending
              </span>
            )}
            {props.item?.paymentGatewayStatus === 'REFUND' && (
              <span className="text-[#8C62FF] bg-[#F4F0FF]  px-3 py-1 rounded-full">
                Refund
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="w-full mt-4 border p-4">
        <h3 className="font-semibold text-lg">Order Summary</h3>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-sm font-semibold">
                ReferenceNo
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Subtotal
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Discount
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Delivery Charge
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">Total</th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Order Date
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Payment Status
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Payment Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1 text-xs font-normal">
                {props.item?.orderResponse?.referenceNo || '--'}
              </td>
              <td className="border px-2 py-1 text-xs font-normal">
                {props.item?.orderResponse?.subTotal || '--'}
              </td>
              <td className="border px-2 py-1 text-xs font-normal">
                {props.item?.orderResponse?.discount || '--'}
              </td>
              <td className="border px-2 py-1 text-xs font-normal">
                {props.item?.orderResponse?.deliveryCharge || '--'}
              </td>
              <td className="border px-2 py-1 text-xs font-normal">
                {props.item?.orderResponse?.total || '--'}
              </td>
              <td className="border px-2 py-1 text-xs font-normal">
                {props.item?.orderResponse?.orderDate || '--'}
              </td>
              <td className="border px-2 py-1 text-xs font-normal">
                {props.item?.orderResponse?.paymentGatewayStatus || '--'}
              </td>
              <td className="border px-2 py-1 text-xs font-normal">
                {props.item?.orderResponse?.paymentType || '--'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full mt-4 border p-4">
        <h3 className="font-semibold text-lg">Order Items</h3>
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
                Unit Price
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {props.item?.orderResponse?.orderItemResponses?.length > 0 ? (
              props.item.orderResponse.orderItemResponses.map(
                (product: any, index: any) => {
                  const productDetails = product.productVariableResponse || {};
                  const unitPrice = productDetails.sellingPrice || 0;
                  const quantity = product.quantity || 0;
                  const subtotal = unitPrice * quantity;

                  return (
                    <tr key={index}>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {productDetails.name || '--'}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {productDetails.sku || '--'}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {quantity}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {unitPrice}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {subtotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td className="text-center py-2">No Order Items Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
