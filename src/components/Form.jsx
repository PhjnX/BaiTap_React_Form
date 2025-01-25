import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addStudent, updateStudent } from "../features/studentsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormModal = () => {
  const dispatch = useDispatch();
  const currentEdit = useSelector((state) => state.students.currentEdit);
  const [isModalOpen, setModalOpen] = useState(false);

  const validationSchema = Yup.object({
    maSV: Yup.string()
      .required("Mã sinh viên là bắt buộc")
      .matches(/^\d+$/, "Mã sinh viên chỉ được chứa số"),
    hoTen: Yup.string()
      .required("Họ tên là bắt buộc")
      .min(2, "Họ tên phải có ít nhất 2 ký tự"),
    sdt: Yup.string()
      .required("Số điện thoại là bắt buộc")
      .matches(/^\d{10,11}$/, "Số điện thoại phải từ 10-11 số"),
    email: Yup.string()
      .required("Email là bắt buộc")
      .email("Email không đúng định dạng"),
  });

  const formik = useFormik({
    initialValues: currentEdit || {
      id: null,
      maSV: "",
      hoTen: "",
      sdt: "",
      email: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (values.id) {
        dispatch(updateStudent(values));
        toast.success("Cập nhật sinh viên thành công!");
      } else {
        dispatch(addStudent({ ...values, id: Date.now() }));
        toast.success("Thêm sinh viên thành công!");
      }
      formik.resetForm();
      setModalOpen(false); //
    },
  });

  const fields = [
    { label: "Mã SV", name: "maSV", type: "text" },
    { label: "Họ Tên", name: "hoTen", type: "text" },
    { label: "Số Điện Thoại", name: "sdt", type: "text" },
    { label: "Email", name: "email", type: "email" },
  ];

  const renderInput = ({ label, name, type }) => (
    <div key={name}>
      <label className="block text-gray-700 font-bold mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`border rounded p-2 w-full ${
          formik.touched[name] && formik.errors[name] ? "border-red-500" : ""
        }`}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Thêm sinh viên
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {formik.values.id ? "Cập nhật sinh viên" : "Thêm sinh viên"}
            </h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {fields.map((field) => renderInput(field))}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {formik.values.id ? "Cập nhật" : "Add New"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;
