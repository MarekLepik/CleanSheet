import "../styles/globals.css";
import persistedReducers from "../reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

function MyApp({ Component, pageProps }) {
  //const store = createStore(persistedReducers, applyMiddleware(thunk));
  const store = configureStore({
    reducer: persistedReducers,
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <BrowserRouter>
          <Component {...pageProps} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
