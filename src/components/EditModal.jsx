import { useDispatch } from "react-redux";
import { updateStudent } from "../features/studentsSlice";
import { toast } from "react-toastify";
import { useState } from "react";

const EditModal = ({ student, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...student });

  const TOAST_OPTIONS = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { hoTen, sdt, email } = formData;

    if (!hoTen.trim()) {
      toast.error("Họ Tên không được để trống!", TOAST_OPTIONS);
      return false;
    }

    if (!/^[0-9]{10}$/.test(sdt)) {
      toast.error("Số Điện Thoại phải là 10 chữ số!", TOAST_OPTIONS);
      return false;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast.error("Email không hợp lệ!", TOAST_OPTIONS);
      return false;
    }

    return true;
  };

  const handleUpdate = () => {
    if (!validateForm()) {
      return;
    }

    dispatch(updateStudent(formData));
    toast.success("Cập nhật thành công!", TOAST_OPTIONS);
    onClose();
  };

  const renderInput = (label, name, type = "text", disabled = false) => (
    <div>
      <label className="block text-gray-700 font-bold mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        disabled={disabled}
        className="border rounded p-2 w-full"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-lg font-bold mb-4">Cập nhật thông tin sinh viên</h2>
        <div className="grid gap-4">
          {renderInput("Mã SV", "maSV", "text", true)}
          {renderInput("Họ Tên", "hoTen")}
          {renderInput("Số Điện Thoại", "sdt")}
          {renderInput("Email", "email", "email")}
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
