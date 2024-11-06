import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Index";

export default function App() {
  return (
    <div className=" w-full min-h-screen">
      <Routes>
        <Route element={<Home />} path="/"></Route>
      </Routes>
    </div>
  );
}
