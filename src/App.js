import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { TopNav } from "./components/Navigator";
import { Footer } from "./components/Footer";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import { ShopContextProvider } from "./context/shop-context";
import Cart from "./pages/Cart";

function App() {
	return (
		<div className='App'>
			<ShopContextProvider>
				<Router>
					<TopNav />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/shop' element={<Shop />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/:id/reset/:token' element={<ResetPassword />} />
						<Route path='/forgot' element={<ForgotPassword />} />
					</Routes>
					<Footer />
				</Router>
			</ShopContextProvider>
		</div>
	);
}

export default App;
