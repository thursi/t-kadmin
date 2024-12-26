import { Button } from "components";
import default_image from '../../../assets/images/png/defaultImage.png';


const Index = (props: { onSubmit?: any; item?: any; setModal?: any }) => {
  return (
    <div className="w-full flex-col py-2">
      <div className="flex justify-between mb-1">
        <div className="px-5">
          <img
            src={props.item?.image || default_image}
            alt={props.item?.productName || "Product"}
            className="w-32 h-32 object-cover rounded-md"
            style={{ borderRadius: "16px" }}
          />
        </div>

        <div className="flex-1 grid grid-cols-3 gap-4 px-5">
          <div>
            <strong className="text-sm">Date:</strong>{" "}
            {props.item?.date || "--"}
          </div>
          <div>
            <strong className="text-sm">Reference No:</strong>{" "}
            {props.item?.referenceNumber || "--"}
          </div>
          <div>
            <strong className="text-sm">Stock Transfer Status:</strong>
            {props.item?.stockTransferStatus === "ORDERED" && (
              <span className="text-success bg-[#E7F7EF] px-3 py-1.5 rounded-full">
                {props.item?.stockTransferStatus}
              </span>
            )}
            {props.item?.stockTransferStatus === "RECEIVED" && (
              <span className="text-primary bg-[#3cadd3] px-3 py-1.5 rounded-full">
                {props.item?.stockTransferStatus}
              </span>
            )}
            {props.item?.stockTransferStatus === "PENDING" && (
              <span className="text-[#FE964A] bg-[#FFF0E6] px-3 py-1.5 rounded-full">
                {props.item?.stockTransferStatus}
              </span>
            )}
          </div>
          <div>
            <strong className="text-sm">Location From:</strong>{" "}
            {props.item?.locationFrom || "--"}
          </div>
          <div>
            <strong className="text-sm">Shipping Charge Amount:</strong>{" "}
            {props.item?.shippingChargeAmount || "--"}
          </div>
          <div>
            <strong className="text-sm">Additional Notes:</strong>{" "}
            {props.item?.additionalNotes || "--"}
          </div>
          <div>
            <strong className="text-sm">Stock Transfer Total Amount:</strong>{" "}
            {props.item?.stockTransferTotalAmount || "--"}
          </div>
          <div>
            <strong className="text-sm">Business Name:</strong>{" "}
            {props.item?.locationTo?.businessName || "--"}
          </div>
          <div>
            <strong className="text-sm">City:</strong>{" "}
            {props.item?.locationTo?.city || "--"}
          </div>
          <div>
            <strong className="text-sm">Active:</strong>{" "}
            {props.item?.locationTo?.active ? "Yes" : "No"}
          </div>

          <div>
            <strong className="text-sm">Description:</strong>{" "}
            {props.item?.locationTo?.description}
          </div>
        </div>
      </div>

      <div className="w-full mt-4 border p-4">
        <h3 className="font-semibold text-lg">Stock Transfer Products</h3>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-sm font-semibold">
                Product Name
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Quantity
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Unit Price
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Sub Total
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {props.item?.stockTransferProducts ?props.item?.stockTransferProducts?.map(
              (product: any, index: any) => (
                <tr key={index}>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {product.productName || "--"}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {product.quantity || "--"}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {product.unitPrice || "--"}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {product.subTotal || "--"}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {product.total || "--"}
                  </td>
                </tr>
              )
            ):[]}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <Button
          onClick={async () => props?.setModal(false)}
          name={"Close"}
          className="bg-primary text-white font-bold py-2 px-4 rounded"
        />
        <Button
          onClick={async () => {}}
          name={"print"}
          className="bg-primary text-white font-bold py-2 px-4 rounded"
        />
      </div>
    </div>
  );
};

export default Index;
