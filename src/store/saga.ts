import { all } from "redux-saga/effects";
import {
  categorySaga,
  unitSaga,
  brandSaga,
  productSaga,
  citySaga,
  warrantySaga,
  taxSaga,
  variationSaga,
  categoryTaxSaga,
  businessLocationSaga,
  contactSaga,
  customerGroupsSaga,
  stockTransferSaga,
  stockAdjustmentSaga,
  salesSaga,
  forgotPasswordsSaga,
  resetPasswordsSaga,
  authSaga,
  socialMediaSaga,
  deliveryChargeSaga,
  roleSaga,
  userSaga,
} from "features";
import { purchaseSaga } from "features/purchase/sagas";
import { paymentsaga } from "features/payment/sagas";
import {purchaseReturnSaga} from"features/purchaseReturn/sagas";
import{promotionSaga} from 'features/promotion/sagas';
import{discountSaga} from 'features/discount/sagas';


export function* rootSaga() {
  yield all([
    categorySaga(),
    brandSaga(),
    unitSaga(),
    productSaga(),
    citySaga(),
    warrantySaga(),
    taxSaga(),
    variationSaga(),
    categoryTaxSaga(),
    businessLocationSaga(),
    contactSaga(),
    customerGroupsSaga(),
    purchaseSaga(),
    purchaseReturnSaga(),
    stockTransferSaga(),
    stockAdjustmentSaga(),
    salesSaga(),
    paymentsaga(),
    authSaga(),
    forgotPasswordsSaga(),
    resetPasswordsSaga(),
    socialMediaSaga(),
    promotionSaga(),
    discountSaga(),
    deliveryChargeSaga(),
    roleSaga(),
    userSaga()

    ]);
   
  
}
