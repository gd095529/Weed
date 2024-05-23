import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from './pages/LoginPage';
import Join from './pages/Join';
import IndividualInfo from "./pages/IndividualInfo";
import Main1 from './pages/Main1';
import Join1 from './pages/Join1';
import Details from "./pages/Details";
import Search from './pages/Search';
import ShowInfo from "./components/ShowInfo";
import MemberModify from "./pages/MemberModify";
import Bookmark from "./pages/Bookmark";

function App() {
  return (
    <div className="App" style={{height: '100%'}}>
      <BrowserRouter>
          <Routes>
              <Route path="/main" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path='/join' element={<Join />} />
              <Route path='/info' element={<IndividualInfo />} />
              <Route path='/' element={<Main1 />} />
              <Route path='/join1' element={<Join1 />} />
              <Route path={'/detail'} element={<Details />} />
              <Route path={'/search'} element={<Search />} />
              <Route path={'/showInfo'} element={<ShowInfo />} />
              <Route path={'/member'} element={<MemberModify />} />
              <Route path={'/bookmark'} element={<Bookmark />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
