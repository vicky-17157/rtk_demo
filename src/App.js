
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
// import LoginScreen from './pages/LoginScreen';
// import RegisterScreen from './pages/RegisterScreen';
// import ProtectedRoute from './routing/ProtectedRoute'
// import Auth from './components/Auth';
import {useSelector, useDispatch} from 'react-redux';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './helpers/PrivateRoute';
import Dashboard from './helpers/Dashboard';

function App() {
    
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Login />}></Route>
                        <Route path="/sign" element={<Signup />}></Route>
                        <Route path="/Home" element={<Home />}></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                        <PrivateRoute exact component={Dashboard} path="/dash" />
                        </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;