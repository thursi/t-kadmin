import { Button } from "components";
import default_image from '../../../assets/images/png/defaultImage.png';


const Index = (props: { onSubmit?: any; item?: any; setModal?: any }) => {
  return (
    <div className="w-full flex-col py-2">
      <div className="flex justify-between mb-1">
        <div className="grid grid-cols-1 px-20">
          <img
            src={props.item?.image || default_image}
            alt={props.item?.productName || "Product"}
            className="w-100 h-32 object-cover rounded-md "
            style={{ borderRadius: "16px" }}
          />
        </div>
        <div className="flex-1 grid grid-cols-4 gap-2">
          <div>
            <strong className="text-sm">Reference No :</strong>{" "}
            {props.item?.referenceNumber || "--"}
          </div>
          <div>
            <strong className="text-sm">Purchase Return Date :</strong>{" "}
            {props.item?.purchaseReturnDate || "--"}
          </div>
          <div>
            <strong className="text-sm">Purchase Return Status :</strong>
            {props.item?.purchaseReturnStatus === "COMPLETED" && (
              <span className="text-success bg-[#E7F7EF] px-3 py-1.5 rounded-full">
                {props.item?.purchaseReturnStatus}
              </span>
            )}
            {props.item?.purchaseReturnStatus === "PENDING" && (
              <span className="text-primary bg-[#E0F7FF] px-3 py-1.5 rounded-full">
                {props.item?.purchaseReturnStatus}
              </span>
            )}
            {props.item?.purchaseStatus === "REQUESTED" && (
              <span className="text-[#FE964A] bg-[#FFF0E6] px-3 py-1.5 rounded-full">
                {props.item?.purchaseReturnStatus}
              </span>
            )}
          </div>
          <div>
            <strong className="text-sm">Grand Total :</strong>{" "}
            {props.item?.grandTotal || "--"}
          </div>
          <div>
            <strong className="text-sm">Return Quantity :</strong>{" "}
            {props.item?.purchaseReturnQuantity || "--"}
          </div>
{/* 
          <div>
            <strong className="text-sm">Discount Type :</strong>
            {props.item?.discountType === "FIXED" && (
              <span className="text-success bg-[#E7F7EF] px-3 py-1.5 rounded-full">
                {props.item?.discountType}
              </span>
            )}
            {props.item?.discountType === "PERCENTAGE" && (
              <span className="text-primary bg-[#E0F7FF] px-3 py-1.5 rounded-full">
                {props.item?.discountType}
              </span>
            )}
          </div>
          <div>
            <strong className="text-sm">Discount Amount :</strong>{" "}
            {props.item?.discountAmount || "--"}
          </div>
          <div>
            <strong className="text-sm">Discount Percentage :</strong>{" "}
            {props.item?.discountPercentage || "--"}
          </div> */}

          {/* <div>
            <strong className="text-sm">Shipping Charge :</strong>{" "}
            {props.item?.shippingCharge || "--"}
          </div>
          <div>
            <strong className="text-sm">Shipping Details :</strong>{" "}
            {props.item?.shippingDetails || "--"}
          </div>
          <div>
            <strong className="text-sm">Purchase Total :</strong>{" "}
            {props.item?.purchaseTotal || "--"}
          </div>
          <div>
            <strong className="text-sm">Advance Amount :</strong>{" "}
            {props.item?.advanceAmount || "--"}
          </div>
          <div>
            <strong className="text-sm">Remind Amount :</strong>{" "}
            {props.item?.remindAmount || "--"}
          </div> */}
        </div>
      </div>

      <div className="w-full mt-4 border p-4">
        <h3 className="font-semibold text-lg">Product Purchase Details</h3>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-sm font-semibold">Name</th>
              <th className="border px-2 py-1 text-sm font-semibold">SKU</th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Quantity
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Purchase Price
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Margin Type
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Margin Percentage
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Selling Price
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Tax Amount
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Selling Price (Inc. Tax)
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Category Tax
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Product Tax
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                In Stock
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">Active</th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Variation
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Tax Details
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(props.item?.productPurchaseReturnResponses) ? (
              props?.item?.productPurchaseReturnResponses.map(
                (purchaseReturn: any, index: any) => {
                  const product = purchaseReturn.productVariableResponse;

                  return product ? (
                    <tr key={index}>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {product.name}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {product.sku}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {purchaseReturn.purchaseReturnQuantity}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {product.purchasePrice.toFixed(2)}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {product.marginType}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {product.marginPercentage}%
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {product.sellingPrice.toFixed(2)}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {product.taxAmount?.toFixed(2) || "--"}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {product.sellingPriceWithTax.toFixed(2)}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {product.categoryTax ? "Yes" : "No"}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {product.productTax ? "Yes" : "No"}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {product.inStock ?? "--"}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {product.active === true ? "Active" : "Inactive"}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        {product.productVariationResponse?.variationName}:{" "}
                        {product.variationValueResponse?.value}
                      </td>
                      <td className="border px-2 py-1 text-xs font-normal">
                        <strong>Tax Name:</strong>{" "}
                        {product.productTaxResponse?.taxName || "--"},
                        <strong> Amount:</strong> $
                        {product.productTaxResponse?.tax.toFixed(2) || "--"}
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={15} className="text-center">
                        No product variable
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td colSpan={15} className="text-center">
                  No product purchase
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full mt-4 border p-4">
        <h3 className=" mb-2 font-semibold text-lg">Contact Details</h3>
        <div>
          <h1 className=" font-inter mb-2 text-xs font-normal">
            Business Type : {props.item?.contactResponse?.businessType}
          </h1>
          <h1 className=" font-inter mb-2 text-xs font-normal">
            Business Name : {props.item?.contactResponse?.businessName}
          </h1>
        </div>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              {/* <th className="border px-2 py-1">Business Type</th> */}

              <th className="border px-2 py-1 text-sm font-semibold">
                First Name
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Last Name
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Mobile Number
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">Email</th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Designation
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(props.item?.contactResponse?.contactPersons) ? (
              props.item.contactResponse.contactPersons.map(
                (person: any, index: number) => (
                  <tr key={index}>
                    <td className="border px-2 py-1 text-xs font-normal">
                      {person.firstName || "--"}
                    </td>
                    <td className="border px-2 py-1 text-xs font-normal">
                      {person.lastName || "--"}
                    </td>
                    <td className="border px-2 py-1 text-xs font-normal">
                      {person.mobileNumber || "--"}
                    </td>
                    <td className="border px-2 py-1 text-xs font-normal">
                      {person.email || "--"}
                    </td>
                    <td className="border px-2 py-1 text-xs font-normal">
                      {person.designation || "--"}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No contact persons
                </td>
              </tr>
            )}
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
