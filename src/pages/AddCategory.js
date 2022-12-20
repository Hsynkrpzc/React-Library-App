import React, { useEffect } from "react";
import Header from "../components/Header";
import AddCategoryForm from "../components/AddCategoryForm";

const AddCategory = (props) => {
  useEffect(() => {
    document.title = "Kitaplık - Kategori Ekle";
  }, []);

  return (
    // <> </> , div yerine kullanılabilir
    <div>
      <Header />
      <AddCategoryForm/>
    </div>
  );
};
export default AddCategory;