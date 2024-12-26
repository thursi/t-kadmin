import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store/reducer";
import {
  loadFilterSuppilerRequested,
  loadOneProductsRequested,
  loadProductsRequested,
  productSearch,
} from "features";
import SearchDropDown from "pages/Products/Form/components/SearchDropDown";
import Input from "pages/Products/Form/components/input";
import DropDown from "pages/Products/Form/components/DropDown";
import TextArea from "pages/Products/Form/components/TextArea";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "components";
import DatePicker from "pages/Products/Form/components/DatePicker";
import { TiPlus } from "react-icons/ti";
import Uploader from "pages/Products/Form/components/Uploader";

interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
}

function Form(props: IFormProps) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<any>({
    contactId: 0,
    productPurchaseRequests: [],
    discountType: "FIXED",
    discountAmount: 0,
    discountPercentage: 0,
    additionalNote: "",
    shippingCharge: 0,
    shippingDetails: "",
    advanceAmount: 0,
    purchaseStatus: "ORDERED",
    purchaseDate: "",
    paidOn: "",
    image: "",
  });



  const { products, searchedProduct, productLoading } = useSelector(
    (state: RootState) => state.product
  );

  const allProductVariableResponses = searchedProduct?.flatMap(
    (product: any) => product?.productVariableResponses
  );

  const { suppliers, conLoading } = useSelector(
    (state: RootState) => state.contact
  );

  useEffect(() => {
    if (props.item) {
      const updatedEditBody = {
        contactId: props?.item?.contactId,
        productPurchaseRequests: props?.item?.productPurchaseResponses?.map(
          (product: any) => ({
            productVariableId: product.productVariableResponse.id,
            purchaseQuantity: product.purchaseQuantity,
            unitCostBeforeDiscount: product.unitCostBeforeDiscount,
            discountType: product.discountType,
            discountAmount: product.discountAmount,
            discountPercentage: product.discountPercentage,
          })
        ),
        discountType: props?.item?.discountType,
        discountAmount: props?.item?.discountAmount,
        discountPercentage: props?.item?.discountPercentage,
        additionalNote: props?.item?.additionalNote,
        shippingCharge: props?.item?.shippingCharge,
        shippingDetails: props?.item?.shippingDetails,
        advanceAmount: props?.item?.advanceAmount,
        purchaseStatus: props?.item?.purchaseStatus,
        purchaseDate: props?.item?.purchaseDate,
        paidOn: props?.item?.paidOn,
        image: props?.item?.docUrl,
      };

      setFormData({ ...updatedEditBody, id: props?.item?.id });

     
    }
  }, [props.item]);

  useEffect(() => {
    const updatedRequest = {
      contactType: "SUPPLIERS",
    };
    dispatch(loadProductsRequested());
    dispatch(
      loadFilterSuppilerRequested({
        ...updatedRequest,
      })
    );
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevBody: any) => ({
      ...prevBody,
      [name]: value,
    }));
  };

  const handleProductRequestChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number
  ) => {
    const { name, value } = event.target;
    const updatedProductRequests: any = [...formData.productPurchaseRequests];
    updatedProductRequests[index][name] = value;
    setFormData({
      ...formData,
      productPurchaseRequests: updatedProductRequests,
    });
  };

  const removeProductRequest = (index: number) => {
    const updatedProductRequests = formData.productPurchaseRequests.filter(
      (_: any, i: number) => i !== index
    );
    setFormData({
      ...formData,
      productPurchaseRequests: updatedProductRequests,
    });
  };

  const handleSelectProduct = (value: any) => {
    dispatch(loadOneProductsRequested(value.target.value));
    // let name = product?.name;

    // if (product?.name) {
    setFormData((prevBody: any) => ({
      ...prevBody,
      productPurchaseRequests: [
        ...(prevBody.productPurchaseRequests || []),
        {
          productVariableId: value?.target?.value,
          name: value?.target?.name,
          purchaseQuantity: 0,
          unitCostBeforeDiscount: 0,
          discountType: "FIXED",
          discountAmount: 0,
          discountPercentage: 0,
        },
      ],
    }));
    // }
  };

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  if (productLoading || conLoading) {
    return <div></div>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(formData, null);
      }}
      className="flex flex-col gap-4"
    >
      <div className="rounded-md bg-white p-8 grid grid-cols-4 gap-6 shadow-sm">
        <SearchDropDown
          name="contactId"
          value={formData?.contactId}
          options={
            suppliers
              ? suppliers?.map((product: any) => ({
                  name: product?.businessName,
                  value: product?.id,
                }))
              : []
          }
          onChange={handleInputChange}
          placeholder="Select a supplier"
          label="Supplier :"
          required
          className="h-14"
        />

        <DatePicker
          name="purchaseDate"
          value={formData?.purchaseDate}
          onChange={handleInputChange}
          // defaultValue={props?.item?.name ?? undefined}
          placeholder="Enter advance amount"
          label="Purchase date :"
          className={
            "flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] "
          }
        />

        <DropDown
          name="purchaseStatus"
          value={formData?.purchaseStatus}
          options={[
            {
              name: "Ordered",
              value: "ORDERED",
            },
            {
              name: "Pending",
              value: "PENDING",
            },
            {
              name: "Received",
              value: "RECEIVED",
            },
          ]}
          required
          onChange={handleInputChange}
          placeholder="Select a purchase status"
          label="Purchase Status :"
        />
        <Uploader
          name="image"
          value={formData?.image}
          className={""}
          alt={"Purchase Image"}
          label="Purchase Image :"
          onChange={(event) => {
            const image = event;
            setFormData((prevBody: any) => ({
              ...prevBody,
              image: image,
            }));
          }}
          required
        />
      </div>

      <div className="rounded-md bg-white p-8 flex flex-col gap-6 shadow-sm">
        <div className="flex flex-row gap-4">
          <Button
            name={"Import Products"}
            className={
              "text-sm hover:shadow-md hover:shadow-primary transition-all self-end h-full text-nowrap text-white bg-primary text-center font-[500] py-2 px-4 rounded-md cursor-pointer"
            }
            // loading={isSubmitting}
          />
          <SearchDropDown
            // name="selectedProducts"

            // value={selectedProducts}
            value={formData?.productPurchaseRequests.map(
              (val: any) => val.productVariableId
            )}
            inputOnChange={(value) => {
              dispatch(productSearch(value));
            }}
            optionsFromAPI={
              allProductVariableResponses
                ? allProductVariableResponses?.map((product: any) => ({
                    name: product?.name,
                    value: product?.id,
                  }))
                : []
            }
            onChange={(value: any) => handleSelectProduct(value)}
            placeholder="Enter product name"
          />
          <Button
            name={
              <div className="flex flex-row gap-2 items-center">
                <TiPlus size={25} />
                <h1>Add Product</h1>
              </div>
            }
            className={
              "text-sm transition-all self-end h-full text-nowrap text-primary text-center font-[500] py-2 px-4 rounded-md cursor-pointer"
            }
            // loading={isSubmitting}
          />
        </div>

        <div className="overflow-hidden rounded-md">
          <table className="min-w-full leading-normal rounded-lg">
            <thead className="rounded-lg">
              <tr>
                <th className="w-10 border-r p-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  #
                </th>
                <th className="w-52 border-r px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="w-52 border-r px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Quantity<span className="text-red-500 text-sm">*</span>
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  {`Unit Cost (Before Discount)`}
                  <span className="text-red-500 text-sm">*</span>
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Discount type<span className="text-red-500 text-sm">*</span>
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Discount Percentage %
                  <span className="text-red-500 text-sm">*</span>
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <MdDeleteForever size={25} />
                </th>
              </tr>
            </thead>
            <tbody>
              {formData?.productPurchaseRequests?.map(
                (product: any, index: number) => (
                  <tr key={index}>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      {index + 1}
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      {product?.name}
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      <Input
                        name="purchaseQuantity"
                        value={
                          formData?.productPurchaseRequests[index]
                            ?.purchaseQuantity
                        }
                        onChange={(e: any) =>
                          handleProductRequestChange(e, index)
                        }
                        placeholder="Quantity"
                        type="number"
                        className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]
"
                      />
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      <Input
                        name="unitCostBeforeDiscount"
                        value={
                          formData?.productPurchaseRequests[index]
                            ?.unitCostBeforeDiscount
                        }
                        onChange={(e: any) =>
                          handleProductRequestChange(e, index)
                        }
                        placeholder="Unit Cost (Before Discount)"
                        type="number"
                        className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]
"
                      />
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      <DropDown
                        name="discountType"
                        value={
                          formData?.productPurchaseRequests[index]?.discountType
                        }
                        className="border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                        options={[
                          {
                            name: "Fixed",
                            value: "FIXED",
                          },
                          {
                            name: "Percentage",
                            value: "PERCENTAGE",
                          },
                        ]}
                        required
                        onChange={(e: any) =>
                          handleProductRequestChange(e, index)
                        }
                        placeholder="Select a purchase status"
                      />
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      {formData?.productPurchaseRequests[index]
                        ?.discountType === "PERCENTAGE" ? (
                        <div className="flex-1 min-w-[120px]">
                          <Input
                            name="discountPercentage"
                            value={
                              formData?.productPurchaseRequests[index]
                                ?.discountPercentage
                            }
                            required
                            onChange={(e: any) =>
                              handleProductRequestChange(e, index)
                            }
                            placeholder="Discount %"
                            label="Discount % :"
                            type="number"
                            className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                          />
                        </div>
                      ) : (
                        <div className="flex-1 min-w-[120px]">
                          <Input
                            name="discountAmount"
                            value={
                              formData?.productPurchaseRequests[index]
                                ?.discountAmount
                            }
                            onChange={(e: any) =>
                              handleProductRequestChange(e, index)
                            }
                            placeholder="Selling Price"
                            type="number"
                            className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]
"
                          />
                        </div>
                      )}
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      <MdDeleteForever
                        size={25}
                        color="red"
                        className="cursor-pointer"
                        onClick={() => removeProductRequest(index)}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="border-b-2 border-gray-300 w-full" />

        <div className="flex flex-col gap-2 justify-end self-end text-sm">
          <div className="flex flex-row justify-between">
            <p className="font-semibold">Total Items:</p>
            <p className="ml-5 text-right font-normal">
              {formData?.productPurchaseRequests?.length ?? 0}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-medium">Net Total Amount:</p>
            <p className="ml-5 text-right">0.00</p>
          </div>
        </div>
      </div>

      <div className="rounded-md bg-white p-8 grid grid-cols-4 gap-6 shadow-sm">
        <DropDown
          name="discountType"
          value={formData?.discountType}
          options={[
            {
              name: "Fixed",
              value: "FIXED",
            },
            {
              name: "Percentage",
              value: "PERCENTAGE",
            },
          ]}
          required
          onChange={handleInputChange}
          placeholder="Select a discount type"
          label="Discount Type :"
        />

        {formData?.discountType === "PERCENTAGE" ? (
          <div className="flex-1 min-w-[120px]">
            <Input
              name="discountPercentage"
              value={formData?.discountPercentage}
              required
              onChange={handleInputChange}
              placeholder="Discount %"
              label="Discount % :"
              type="number"
              className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
            />
          </div>
        ) : (
          <div className="flex-1 min-w-[120px]">
            <Input
              name="discountAmount"
              value={formData?.discountAmount}
              required
              onChange={handleInputChange}
              placeholder="Selling Price"
              label="Discount Amount :"
              type="number"
              className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
            />
          </div>
        )}
        <div className="col-start-4 flex flex-row text-sm justify-end">
          <p className="font-medium">{`Discount:(-)`} </p>
          <p className="ml-5 text-right">0.00</p>
        </div>
        <div className="col-span-4">
          <TextArea
            name="additionalNote"
            value={formData?.additionalNote}
            onChange={handleInputChange}
            // defaultValue={initialValues ?? undefined}
            placeholder="Enter additional note"
            label="Additional Note :"
            className={
              "flex items-center w-full px-2 h-32 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] no-scrollbar"
            }
            required
          />
        </div>
      </div>

      <div className="rounded-md bg-white p-8 grid grid-cols-4 gap-6 shadow-sm">
        <div className="col-span-2">
          <TextArea
            name="shippingDetails"
            value={formData?.shippingDetails}
            onChange={handleInputChange}
            // defaultValue={props?.item?.name ?? undefined}
            placeholder="Enter Shippingd details"
            label="Shipping details :"
            className={
              "flex items-center w-full px-2 h-32 py-4 border text-xs border-[#b0afb3] rounded-md no-scrollbar"
            }
            required
          />
        </div>
        <Input
          name="shippingCharge"
          value={formData?.shippingCharge}
          required
          onChange={handleInputChange}
          placeholder="Shipping charge"
          label="Shipping charge :"
          type="number"
          className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
        />
      </div>

      <div className="rounded-md bg-white p-8 grid grid-cols-4 gap-6 shadow-sm">
        <Input
          name="advanceAmount"
          value={formData?.advanceAmount}
          onChange={handleInputChange}
          // defaultValue={props?.item?.name ?? undefined}
          placeholder="Enter advance amount"
          label="Advance amount :"
          className={
            "flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] "
          }
        />
        <DatePicker
          name="paidOn"
          value={formData?.paidOn}
          onChange={handleInputChange}
          defaultValue={props?.item?.paidOn ?? undefined}
          placeholder="Enter advance amount"
          label="Paid date :"
          className={
            "flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] "
          }
        />
        {/* <div className="col-span-2">
          <TextArea
            name="additionalNote"
            value={formData?.additionalNote}
            onChange={handleInputChange}
            // defaultValue={initialValues ?? undefined}
            placeholder="Enter additional note"
            label="Payment Note :"
            className={
              "flex items-center w-full px-2 h-32 py-4 border text-xs border-[#b0afb3] rounded-md no-scrollbar"
            }
            required
          />
        </div> */}
      </div>

      <div className="flex flex-row gap-3 justify-center mt-2">
        <Button
          name={props.item ? "Edit " : "Add"}
          className={
            "text-sm hover:shadow-md hover:shadow-primary transition-all self-end h-full text-nowrap text-white bg-primary text-center font-[500] py-2 px-4 rounded-md cursor-pointer"
          }
          type={"submit"}
          // loading={isSubmitting}
        />
        <Button
          name={"Cancel"}
          className={
            "text-sm text-black bg-white text-center font-[500] p-2 w-[100px] rounded-md border-[1px] border-black cursor-pointer hover:shadow-md transition-all"
          }
          onClick={() => window.history.back()}

          // loading={isSubmitting}
        />
      </div>
    </form>
  );
}

export default Form;
