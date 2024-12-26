import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
// import { createAxios } from 'lib/axios';

//
import rootReducer from './reducer';
import { rootSaga } from './saga';
import persistConfig from 'persist';

const sagaMiddleware = createSagaMiddleware();

//logging redux actions
const loggerMiddleware = createLogger({
  collapsed: true,
  diff: true,
  duration: true,
  timestamp: false,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }) as any[];

    return middleware.concat([sagaMiddleware, loggerMiddleware]);
  },
});

sagaMiddleware.run(rootSaga);
export type State = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
// createAxios(store);

export default store;
