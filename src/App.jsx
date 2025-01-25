import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Form";
import Table from "./components/Table";

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Quản Lý Sinh Viên</h1>
      <Form />
      <Table />
      <ToastContainer />
    </div>
  );
};

export default App;
