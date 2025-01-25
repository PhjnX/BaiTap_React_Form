import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "../features/studentsSlice";
import EditModal from "./EditModal";
import SearchBar from "./SearchBar"; // Import SearchBar
import { toast } from "react-toastify";
import { useState } from "react";

const Table = () => {
  const { students, search } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const TOAST_OPTIONS = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
  };

  // Lọc danh sách sinh viên dựa trên từ khóa tìm kiếm
  const filteredStudents = students.filter((student) =>
    student.hoTen.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
    toast.success("Xóa thành công!", TOAST_OPTIONS);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingStudent(null);
    setModalOpen(false);
  };

  const renderTableRow = (student) => (
    <tr key={student.id} className="hover:bg-gray-100">
      <td className="border p-2 text-center">{student.maSV}</td>
      <td className="border p-2 text-center">{student.hoTen}</td>
      <td className="border p-2 text-center">{student.sdt}</td>
      <td className="border p-2 text-center">{student.email}</td>
      <td className="border p-2 text-center">
        <button
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          onClick={() => handleEdit(student)}
        >
          Update
        </button>
        <button
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={() => handleDelete(student.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );

  return (
    <>
      {/* Thêm SearchBar */}
      <SearchBar placeholder="Tìm kiếm sinh viên..." />

      <table className="w-full border-collapse border mt-4 bg-white shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            {["Mã SV", "Họ Tên", "Số Điện Thoại", "Email", "Hành động"].map(
              (header) => (
                <th key={header} className="border p-2">
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => renderTableRow(student))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="border p-4 text-center text-gray-500 italic"
              >
                Không tìm thấy sinh viên nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <EditModal student={editingStudent} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Table;
