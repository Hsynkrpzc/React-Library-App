import React, { useEffect } from "react";
import AddBookForm from "../components/AddBookForm";
import Header from "../components/Header";

const AddBook = (props) => {
  useEffect(() => {
    document.title = "Kitaplık - Kitap Ekle";
  }, []);

  return (
    <div>
      <Header />
      <AddBookForm />
    </div>
  );
};
export default AddBook;
