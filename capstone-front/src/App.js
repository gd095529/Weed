import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from './pages/LoginPage';
import Join from './pages/Join';


function App() {
  return (
    <div className="App" style={{height: '100%'}}>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path='/join' element={<Join />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
