import Header from "./components/Header";
import Form from "./components/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="bg-indigo-800 pt-5 pb-10">
      <ToastContainer position="top-right" />
      <Header />
      <Form />
    </div>
  );
}

export default App;
