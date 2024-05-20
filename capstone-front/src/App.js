import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from './pages/LoginPage';
import Join from './pages/Join';
import IndividualInfo from "./pages/IndividualInfo";
import Main1 from './pages/Main1';

function App() {
  return (
    <div className="App" style={{height: '100%'}}>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path='/join' element={<Join />} />
              <Route path='/info' element={<IndividualInfo />} />
              <Route path='/main1' element={<Main1 />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
