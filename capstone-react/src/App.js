import logo from './logo.svg';
import './App.css';
import HeaderHome from './components/HeaderHome/HeaderHome';
import { Outlet } from 'react-router-dom';
import FooterHome from './components/FooterHome/FooterHome';
import NavbarHome from './components/NavbarHome/NavbarHome';

function App() {
  return (
    <div className="App">
      <HeaderHome />
      <NavbarHome />
      <Outlet />
      <FooterHome />
    </div>
  );
}

export default App;
