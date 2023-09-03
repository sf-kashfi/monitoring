import React from "react"
import { MaterialUiCacheProvider } from "./components/MaterialUiCacheProvider";
import { AppRoutes } from "./components/AppRoutes";

function App() {

  return (
    <MaterialUiCacheProvider>
    <AppRoutes/>
    </MaterialUiCacheProvider>
  );
}

export default App;
