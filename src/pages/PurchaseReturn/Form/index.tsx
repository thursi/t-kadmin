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
import { MdDeleteForever } from "react-icons/md";
import { Button } from "components";
import DatePicker from "pages/Products/Form/components/DatePicker";
import { TiPlus } from "react-icons/ti";
import DocumentUpload from "components/shared/DocumentUpload/DocumentUpload";

interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
}

function Form(props: IFormProps) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<any>({
    contactId: 0,
    productPurchaseReturnRequests: [],
    purchaseStatus: "ORDERED",
    purchaseReturnDate: "",
    
  });

  console.log(formData, "formDataPurchasee");

  const { products, searchedProduct, productLoading } = useSelector(
    (state: RootState) => state.product
  );
  

  const allProductVariableResponses = searchedProduct?.flatMap(
    (product: any) => product?.productVariableResponses
  );
  console.log(formData, "searchedProduct11");
  const { suppliers, conLoading } = useSelector(
    (state: RootState) => state.contact
  );

  useEffect(() => {
    if (props.item) {
      const updatedEditBody = {
        contactId: props?.item?.contactId,
        productPurchaseReturnRequests:
          props?.item?.productPurchaseReturnResponses?.map((product: any) => ({
            productVariableId: product.productVariableResponse.id,
            purchaseQuantity: product.purchaseQuantity,
            unitCostBeforeDiscount: product.unitCostBeforeDiscount,
          })),

        purchaseStatus: props?.item?.purchaseStatus,
        purchaseReturnDate: props?.item?.purchaseReturnDate,

        image: props?.item?.docUrl,
      };

      setFormData({ ...updatedEditBody, id: props?.item?.id });

      console.log(
        { ...updatedEditBody, id: props?.item?.id },
        "updatedEditBody122"
      );
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
    console.log(name, value, "sssss");

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
    const updatedProductRequests: any = [
      ...formData.productPurchaseReturnRequests,
    ];
    updatedProductRequests[index][name] = value;
    setFormData({
      ...formData,
      productPurchaseReturnRequests: updatedProductRequests,
    });
  };

  const removeProductRequest = (index: number) => {
    const updatedProductRequests =
      formData.productPurchaseReturnRequests.filter(
        (_: any, i: number) => i !== index
      );
    setFormData({
      ...formData,
      productPurchaseReturnRequests: updatedProductRequests,
    });
  };
  console.log(formData);
  const handleSelectProduct = (value: any) => {
    dispatch(loadOneProductsRequested(value));
    // let name = product?.name;
    console.log(value, "ssssss");

    // if (product?.name) {
    console.log(setFormData);
    setFormData((prevBody: any) => ({
      ...prevBody,
      productPurchaseReturnRequests: [
        ...(prevBody.productPurchaseReturnRequests || []),
        {
          productVariableId: value?.target?.value,
          purchaseQuantity: 0,
          unitCostBeforeDiscount: 0,
        },
      ],
    }));
    // }
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
          name="purchaseReturnDate"
          value={formData?.purchaseReturnDate}
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
            { name: "Requested", value: "REQUESTED" },
            { name: "Completed", value: "COMPLETED" },
          ]}
          required
          onChange={handleInputChange}
          placeholder="Select a purchase status"
          label="Purchase Status :"
        />
        <div className="col-span-2">
          <DocumentUpload
            onFileSelect={(file) => {
              if (file) {
                handleSelectProduct(file);
              } else {
                console.warn("No file uploaded");
              }
            }}
            onError={(error: string) => {
              console.error("Document Upload Error: ", error);
            }}
          />
        </div>
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
            name={formData?.productPurchaseReturnRequests?.map(
              (val: any) => val.productVariableId
            )}
            // value={selectedProducts}
            value={formData?.productPurchaseReturnRequests.map(
              (val: any) => val.productVariableId
            )}
            inputOnChange={(value) => {
              dispatch(productSearch(value));
            }}
            optionsFromAPI={allProductVariableResponses?.map(
              (product: any) => ({
                name: product?.name,
                value: product?.id,
              })
            )}
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
                  Return Quantity<span className="text-red-500 text-sm">*</span>
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  {`Unit Cost (Before Discount)`}
                  <span className="text-red-500 text-sm">*</span>
                </th>

                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <MdDeleteForever size={25} />
                </th>
              </tr>
            </thead>
            <tbody>
              {formData?.productPurchaseReturnRequests?.map(
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
                          formData?.productPurchaseReturnRequests[index]
                            ?.purchaseQuantity
                        }
                        onChange={(e: any) =>
                          handleProductRequestChange(e, index)
                        }
                        placeholder="Quantity"
                        type="number"
                        className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                      />
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      <Input
                        name="unitCostBeforeDiscount"
                        value={
                          formData?.productPurchaseReturnRequests[index]
                            ?.unitCostBeforeDiscount
                        }
                        onChange={(e: any) =>
                          handleProductRequestChange(e, index)
                        }
                        placeholder="Unit Cost (Before Discount)"
                        type="number"
                        className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                      />
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
              {formData?.productPurchaseReturnRequests?.length ?? 0}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-medium">Net Total Amount:</p>
            <p className="ml-5 text-right">0.00</p>
          </div>
        </div>
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
