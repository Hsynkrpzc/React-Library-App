import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategoryForm = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const { categoriesState } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  // console.log(categoriesState);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (categoryName === "") {
      alert("Kategori boş bırakılmaz");
      return;
    }

    const hasCategory = categoriesState.categories.find(
      (item) => item.name.toLowerCase() === categoryName.toLowerCase()
    ); // category var mı yok mu ona bakıldı
    console.log(hasCategory);
    if (hasCategory !== undefined) {
      alert("Bu kategori önceden kaydedilmiş!");
      return;
    }
    // if lerde return eklenmezse kod aşağı doğru okumaya devam eder , yani kategori daha önceden ekli olsa da ekler
    const newCategory = {
      id: new Date().getTime(),
      name: categoryName[0].toUpperCase() + categoryName.substring(1), // bu önemli çünkü kullanıcı takılır.
    };
    console.log(newCategory);
    axios
      .post("http://localhost:3004/categories", newCategory)
      .then((res) => {
        console.log(">>>add cat form<<<", res.data);
        dispatch({ type: "ADD_CATEGORY", payload: newCategory });
        navigate("/categories");
      })
      .catch((err) => console.log("add cetegory err", err));
  };
  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="row my-4">
          <div className="col">
            <label className="bg-white w-100 text-center fw-bold">Kategori Ekle</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eklemek istediğiniz kategoriyi yazınız"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary btn-sm w-50">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddCategoryForm;
