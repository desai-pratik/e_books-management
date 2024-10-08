import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import BookDetails from "./components/BookDetails";
import Home from "./home/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
      <ToastContainer autoClose={3000} hideProgressBar={true} closeOnClick draggable pauseOnHover/>
    </>
  );
}

export default App;
