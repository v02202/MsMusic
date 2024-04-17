import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import Login from './components/Login';
import { UserList } from './components/UserList';
import Register from './components/Register';
import { Song } from './components/Song';

function App() {
  return(
  <> 
  <BrowserRouter>
    <Navbar />
      <Routes>
        <Route index element={<Login/>} />
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/users' element={<UserList/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/song' element={<Song/>}></Route>
      </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
