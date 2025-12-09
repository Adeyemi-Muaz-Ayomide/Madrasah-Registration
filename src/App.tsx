import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import RegistrationPage from "./pages/RegistrationPage";
import PaymentPage from "./pages/PaymentPage";
import AccessCardPage from "./pages/AccessCardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/payment/:studentId" element={<PaymentPage />} />
        <Route path="/access-card/:studentId" element={<AccessCardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
