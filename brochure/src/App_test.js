import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "./layout/LayOut";

function App_test() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayOut/>}>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App_test;
