import "./App.css";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import Index from "./pages/index";
export default function App() {
  return (
    <Router>
      <Routes >
          <Route path='/' element={<Index/>} />
      </Routes >
    </Router>
  );
}
