import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { useDispatch } from "react-redux";

const EditCategoryForm = (props) => {
  const [category, setCategory] = useState(null);
  const params = useParams();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [allCategories, setAllCategories] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(params.categoryId);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/categories`) // 1. adım /${params.categoryId} id yi getirmek yerine hepsi getirsek allcategories stati eklendi
      .then((res) => {
        console.log("Ed.CatFormRES", res);
        setAllCategories(res.data); // 3. adım olarak setAll yaptık
        const myCategory = res.data.find(
          (item) => item.id == params.categoryId
        ); //fonksiyom oluşturuldu lgili katefgori sçildi
        setCategory(myCategory); // ilgili kategori içinden istenilen cat. düzenlenecek
        setNewCategoryName(myCategory.name); // burada tetiklendi
      })
      .catch((err) => console.log("edCatFormGetERR", err));
  }, []);
  //2. adım  if satırı sadece category idi şimdi hespi için yeniden yazdık
  if (allCategories === null) {
    return <Loading />;
  }
  const handleEdit = (event) => {
    event.preventDefault();
    if (newCategoryName === "") {
      alert("Kategori boş bırakılamaz");
      return;
    }
    const hasCategory = allCategories.find(
      (item) => item.name.toLowerCase() === newCategoryName.toLowerCase()
    );
    console.log("EdCatForm HasCat.", hasCategory);
    if (hasCategory !== undefined) {
      alert("Kategori ismi daha önce eklenmiş.");
      return;
    }
    const newCategory = {
      ...category,
      name: newCategoryName,
    };
    axios
      .put(`http://localhost:3004/categories/${category.id}`, newCategory)
      .then((res) => {
        console.log("EdCatFormPutRes", res.data);
        dispatch({ type: "EDIT_CATEGORY", payload: newCategory });
        navigate("/categories");
      })
      .catch((err) => console.log("EdCatFormPutErr", err));
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleEdit}>
        <div className="row my-4">
          <div className="col">
            <label>Kategori Düzenle</label>
            <input
              type="text"
              className="form-control"
              value={newCategoryName}
              onChange={(event) => setNewCategoryName(event.target.value)}
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
export default EditCategoryForm;
