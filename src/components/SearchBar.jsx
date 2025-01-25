import { useDispatch } from "react-redux";
import { setSearch } from "../features/studentsSlice";
import { useState, useEffect } from "react";

const SearchBar = ({ placeholder = "Tìm kiếm..." }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  // Sử dụng debounce để giảm tần suất dispatch
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearch(searchTerm));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleSearch}
      className="border border-gray-300 rounded-lg p-2 w-full my-4 focus:outline-none focus:ring focus:ring-blue-300"
    />
  );
};

export default SearchBar;
