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
import Find from "./pages/Find";
import Login1 from './pages/Login';
import CustomSearch from "./pages/CustomSearch";
import Result from "./pages/Result";
import Calendar from "./components/Calendar";
import ChaTest from "./components/ChaTest";
import ModalPopup from "./components/ModalPopup";
import MemberOut from './pages/MemberOut'

function App() {
  return (
    <div className="App" style={{height: '100%'}}>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path='/join' element={<Join />} />
              <Route path='/info' element={<IndividualInfo />} />
              <Route path={'/customSearch'} element={<CustomSearch />} />
              <Route path='/join1' element={<Join1 />} />
              <Route path={'/detail'} element={<Details />} />
              <Route path={'/search'} element={<Search />} />
              <Route path={'/showInfo'} element={<ShowInfo />} />
              <Route path={'/member'} element={<MemberModify />} />
              <Route path={'/bookmark'} element={<Bookmark />} />
              <Route path={'/find/*'} element={<Find />} />
              <Route path={'/login1'} element={<Login1 />} />
              <Route path={'/searchResult'} element={<Result />} />
              <Route path={'/calendar'} element={<Calendar />} />
              <Route path={'/chaTest'} element={<ChaTest />} />
              <Route path={'/a'} element={<ModalPopup />} />
              <Route path={'/MemberOut'} element={<MemberOut />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
