import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [
    {
      id: 1,
      maSV: "SV001",
      hoTen: "Nguyễn Văn A",
      sdt: "0938111111",
      email: "nguyenvana@gmail.com",
    },
    {
      id: 2,
      maSV: "SV002",
      hoTen: "Nguyễn Văn B",
      sdt: "0938222222",
      email: "nguyenvanb@gmail.com",
    },
  ],
  search: "",
  currentEdit: null, 
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
      state.currentEdit = null; 
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    editStudent: (state, action) => {
      state.currentEdit = action.payload; 
    },
  },
});

export const {
  addStudent,
  deleteStudent,
  updateStudent,
  setSearch,
  editStudent,
} = studentsSlice.actions;
export default studentsSlice.reducer;
