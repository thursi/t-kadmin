import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ErrorBoundary, Loading } from "components";
import { Toaster } from "react-hot-toast";
import { lang, name } from "config";
import store, { persistor } from "store";
import { FaCircleCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";

export interface IAppProviderProps {
  children: React.ReactNode;
}
export default function AppProvider(props: IAppProviderProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        {/* <PersistGate loading={<Loading sgtring="provider..."/>} persistor={persistor}> */}
          <HelmetProvider>
            <Helmet>
              <html lang={lang} />
              <title>{name}</title>
            </Helmet>

            <Toaster
              toastOptions={{
                success: {
                  className:
                    "text-green-900 text-xs font-semibold tracking-widest bg-green-100 w-auto",
                  icon: <FaCircleCheck className="text-green-900 w-6 h-6" />,
                  duration: 5000,
                },
                error: {
                  className:
                    "text-red-900 text-xs font-semibold tracking-widest bg-red-100 w-auto",
                  icon: <MdError className="text-red-900 w-6 h-6" />,
                  position: "top-right",
                  duration: 5000,
                },
              }}
            />
            <BrowserRouter>{props.children}</BrowserRouter>
          </HelmetProvider>
        {/* </PersistGate> */}
      </Provider>
    </ErrorBoundary>
  );
}
