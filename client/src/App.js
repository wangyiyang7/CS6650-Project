import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartComponent from "./components/Cart";
import HomeComponent from "./components/Home";
import addItemToCart from "./functions.js";
import LoginComponent from "./components/Login";
import SearchComponent from "./components/Search";
import ItemComponent from "./components/Item";
import Navigation from "./components/Navigation";
import RegisterComponent from "./components/Register";
import ProfileComponent from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import OrderHistoryComponent from "./components/OrderHistory";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav>
          <Navigation />
        </nav>

        <Routes>
          <Route
            exact
            path="/"
            element={<HomeComponent func={addItemToCart} />}
          />
          <Route
            path="/search"
            element={<SearchComponent func={addItemToCart} />}
          />
          <Route
            path="/item/:id"
            element={<ItemComponent addToCart={addItemToCart} />}
          />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/cart" element={<CartComponent />} />
          <Route path="/profile/:accountId" element={<ProfileComponent />} />
          <Route
            path="/profile/:accountId/order-history"
            element={<OrderHistoryComponent />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
