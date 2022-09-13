import { Index } from "./pages/index";
import { HashRouter, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<Index />} />
      </Routes>
    </HashRouter>
  );
};
