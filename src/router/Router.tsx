import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
// import { isAuthorized as useAuthorized } from 'selectors/auth';
import * as routes from 'constants/routes';
import { LazyPage, NotFound } from 'components';
import { Layout } from 'layout';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducer';

const Router = () => {
  const { auth } = useSelector((state: RootState) => state.auth);

  const token = auth?.token;
  // const signupToken = signup?.token;
  const isAuthorized = token;
  const location = useLocation();

  const PrivateRoute = ({ children }: any) => {
    if (!isAuthorized) {
      return <Navigate to={routes.LOGIN} state={{ from: location }} replace />;
    }

    return children;
  };
  return (
    <React.Fragment>
      <Routes>
        <Route
          path={routes.DASHBOARD}
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path={routes.MENU} element={<LazyPage page="Products" />} />
          <Route
            path={routes.PRODUCTS}
            element={<LazyPage page="Products" />}
          />

          <Route
            path={routes.PRODUCT_CREATE}
            element={<LazyPage page={'Products/Create'} />}
          />
          <Route
            path={`${routes.PRODUCT_EDIT}/:id`}
            element={<LazyPage page="Products/Edit" />}
          />
          <Route
            path={routes.PURCHASE}
            element={<LazyPage page="Purchase" />}
          />
          <Route
            path={routes.PURCHASE_RETURN}
            element={<LazyPage page="PurchaseReturn" />}
          />
          <Route
            path={routes.SOCIAL_MEDIA}
            element={<LazyPage page="SocialMedia" />}
          />
          <Route
            path={routes.PROMOTION}
            element={<LazyPage page="Promotion" />}
          />
          <Route
            path={routes.PROMOTION_CREATE}
            element={<LazyPage page="Promotion/Create" />}
          />
          <Route
            // path={routes.EDIT_PROMOTION}
            path={`${routes.EDIT_PROMOTION}/:id`}
            element={<LazyPage page="Promotion/Edit" />}
          />
          <Route
            path={`${routes.SOCIAL_MEDIA_EDIT}/:id`}
            element={<LazyPage page="SocialMedia/Edit" />}
          />
          <Route
            path={routes.PURCHASE_RETURN_CREATE}
            element={<LazyPage page="PurchaseReturn/Create" />}
          />
          <Route
            path={`${routes.PURCHASE_RETURN_EDIT}/:id`}
            element={<LazyPage page="PurchaseReturn/Edit" />}
          />
          <Route
            path={routes.PURCHASE_CREATE}
            element={<LazyPage page="Purchase/Create" />}
          />

          <Route
            path={`${routes.PURCHASE_EDIT}/:id`}
            element={<LazyPage page="Purchase/Edit" />}
          />

          <Route path={routes.BRANDS} element={<LazyPage page="Brands" />} />

          <Route
            path={routes.CATEGORIES}
            element={<LazyPage page="Category" />}
          />

          <Route path={routes.UNITS} element={<LazyPage page="Units" />} />

          <Route path={routes.TAXS} element={<LazyPage page="Taxs" />} />

          <Route
            path={routes.CREATE_UNIT}
            element={<LazyPage page="Unit/Create" />}
          />
          <Route
            path={routes.CREATE_TAX}
            element={<LazyPage page="Tax/Create" />}
          />
          <Route path={routes.CITIES} element={<LazyPage page="City" />} />
          <Route
            path={routes.VARIATIONS}
            element={<LazyPage page="Variations" />}
          />
          <Route
            path={routes.WARRANTIES}
            element={<LazyPage page="Warranty" />}
          />
          <Route
            path={routes.CREATE_WARRANTY}
            element={<LazyPage page="Warranty/Create" />}
          />
          <Route
            path={routes.CATEGORYTAX}
            element={<LazyPage page="CategoryTax" />}
          />
          <Route
            path={routes.BUSINESS_LOCATIONS}
            element={<LazyPage page="BusinessLocations" />}
          />
          <Route
            path={routes.SHOPS}
            element={<LazyPage page="BusinessLocations" />}
          />

          <Route
            path={routes.CONTACTS}
            element={<LazyPage page="BusinessLocations" />}
          />

          <Route
            path={routes.SUPPLIERS}
            element={<LazyPage page="Suppliers" />}
          />

          <Route
            path={routes.CREATE_SUPPLIERS}
            element={<LazyPage page="Suppliers/Create" />}
          />
          <Route
            path={`${routes.EDIT_SUPPLIERS}/:id`}
            element={<LazyPage page="Suppliers/Edit" />}
          />

          <Route
            path={routes.STOCKTRANSFER}
            element={<LazyPage page="StockTransfer" />}
          />
          <Route
            path={routes.STOCKSTOCKTRANSFER_CREATE}
            element={<LazyPage page="StockTransfer/Create" />}
          />
          <Route
            path={`${routes.EDIT_STOCKTRANSFER}/:id`}
            element={<LazyPage page="StockTransfer/Edit" />}
          />

          <Route
            path={routes.STOCKADJUSTMENTS}
            element={<LazyPage page="StockAdjustment" />}
          />
          <Route
            path={routes.STOCKADJUSTMENTS_CREATE}
            element={<LazyPage page="StockAdjustment/Create" />}
          />

          <Route
            path={routes.DISCOUNT}
            element={<LazyPage page="Discount" />}
          />
          <Route
            path={routes.DISCOUNT_CREATE}
            element={<LazyPage page="Discount/Create" />}
          />
          <Route
            path={`${routes.EDIT_DISCOUNT}/:id`}
            element={<LazyPage page="Discount/Edit" />}
          />

          <Route
            path={routes.DELIVERYCHARGES}
            element={<LazyPage page="DeliveryCharges" />}
          />
          <Route
            path={routes.DELIVERYCHARGES_CREATE}
            element={<LazyPage page="DeliveryCharges/Create" />}
          />
          <Route
            path={`${routes.EDIT_DELIVERYCHARGES}/:id`}
            element={<LazyPage page="DeliveryCharges/Edit" />}
          />

          <Route path={routes.SALES} element={<LazyPage page="Sales" />} />
          <Route path={routes.PAYMENT} element={<LazyPage page="Payment" />} />

          <Route path={routes.ROLE} element={<LazyPage page="Role" />} />

          <Route path={routes.USER} element={<LazyPage page="User" />} />
          <Route
            path={routes.USER_CREATE}
            element={<LazyPage page="User/Create" />}
          />

          <Route
            path={routes.PURCHASE_SELL_REPORT}
            element={<LazyPage page="Report/PurchaseAndSales" />}
          />
          <Route path={routes.SALES} element={<LazyPage page="Sales" />} />
        </Route>
        <Route path={routes.LOGIN} element={<LazyPage page="Login" />} />
        <Route path={routes.SIGNUP} element={<LazyPage page="SignUp" />} />
        <Route
          path={routes.FORGOT_PASSWORD}
          element={<LazyPage page="ForgotPassword" />}
        />
        <Route
          path={routes.RESET_PASSWORD}
          element={<LazyPage page="ResetPassword" />}
        />
        <Route
          path={routes.CHANGE_PASSWORD}
          element={<LazyPage page="ChangePassword" />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default Router;
