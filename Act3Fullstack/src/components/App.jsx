import CarritoDeCompra from './Cart/Cart';
import { Routes, Route } from "react-router-dom";
import './App.css';
import { Landing } from '../pages/LadingPage/LandingPage.jsx';
import { Login } from "../pages/LoginPage/Login.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import Footer from "./Footer/Footer.jsx";
import HomePage from '../pages/HomePage/HomePage.jsx';
import BookDetailPage from '../pages/BookDetailPage/BookDetailPage.jsx';
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import { Profile } from "./UserProfile/UserProfile.jsx";
import { OrderProvider } from "../context/OrderContext.jsx";
import ChatGemini from "../pages/ChatGeminiPage/ChatGemini";

function App() {
  return (
    <OrderProvider>
      <div className="app-container">
        <Navbar />

        <main className="content-wrapper">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/catalogo" element={<HomePage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/carrito" element={<CarritoDeCompra />} />
            <Route path="/chat" element={<ChatGemini />} />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </OrderProvider>
  );
}

export default App;