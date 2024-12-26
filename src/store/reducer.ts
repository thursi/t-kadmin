import { combineReducers } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import categoryReducer from 'features/category/categorySlice';
import brandReducer from 'features/brand/brandSlice';
import unitReducer from 'features/unit/unitSlice';
import variationReducer from 'features/variation/variationSlice';
import productReducer from 'features/product/productSlice';
import cityReducer from 'features/city/citySlice';
import warrantyReducer from 'features/warranty/warrantySlice';
import taxReducer from 'features/tax/taxSlice';
import categoryTaxReducer from 'features/categoryTax/categoryTaxSlice';
import businessLocationReducer from 'features/businessLocation/businessLocationSlice';
import contactReducer from 'features/contacts/contactsSlice';
import customerGroupReducer from 'features/customerGroups/customerGroupsSlice';
import purchaseReducer from 'features/purchase/purchaseSlice';
import purchaseReturnReducer from 'features/purchaseReturn/purchaseReturnSlice';
import stocktransferReducer from 'features/stockTransfer/stockTransferSlice';
import stockadjustmentReducer from 'features/stockAdjustment/stockadjustSlice';
import saleadjustmentReducer from "features/sales/salesSlice";
import paymentReducer from 'features/payment/paymentsSlice';
import authReducer from 'features/auth/authSlice';
import { persistReducer } from 'redux-persist';
import persistConfig from "persist";
import forgotPasswordReducer from 'features/forgotPassword/forgotPasswordSlice';
import resetPasswordReducer from 'features/resetPassword/resetPasswordSlice';
import changePasswordReducer from 'features/changePassword/changePasswordSlice';
import socialMediaReducer from 'features/socialMedia/socialMediaSlice';
import promotionReducer from 'features/promotion/promotionSlice';
import discountReducer from 'features/discount/discountSlice';
import deliveryChargeReducer from 'features/deliveryCharge/deliveryChargeSlice';
import roleReducer from 'features/role/roleSlice';
import userReducer from 'features/user/userSlice';



const appReducer = combineReducers({
  dashboard: dashboardReducer,
  category: categoryReducer,
  brand: brandReducer,
  unit: unitReducer,
  variation: variationReducer,
  product: productReducer,
  city: cityReducer,
  warranty: warrantyReducer,
  tax: taxReducer,
  categoryTax: categoryTaxReducer,
  businessLocation: businessLocationReducer,
  contact: contactReducer,
  customerGroup: customerGroupReducer,
  purchase: purchaseReducer,
  purchaseReturn: purchaseReturnReducer,
  stocktransfer: stocktransferReducer,
  stockadjustment: stockadjustmentReducer,
  sales: saleadjustmentReducer,
  payment:paymentReducer,
  auth: persistReducer(persistConfig, authReducer),
  forgotPassword:forgotPasswordReducer,
  resetPassword:resetPasswordReducer,
  changePassword:changePasswordReducer,
  socialMedia:socialMediaReducer,
  promotions:promotionReducer,
  discount:discountReducer,
  deliveryCharge:deliveryChargeReducer,
  role:roleReducer,
  user:userReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === PURGE) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
