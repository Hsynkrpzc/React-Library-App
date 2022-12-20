import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
import "./components.css"

const ListCategories = () => {
  const { categoriesState, booksState } = useSelector((state) => state);
  console.log(categoriesState);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCatergory, setDeleteCategory] = useState(null);
  const [deleteCatergoryName, setDeleteCategoryName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Kitaplık- Kategoriler";
  }, []);

  const categoryDelete = (id) => {
    console.log(`http://localhost:3004/categories/${id}`);
    axios
      .delete(`http://localhost:3004/categories/${id}`)
      .then((res) => {
        console.log(">>list Category Delete", res.data);
        dispatch({ type: "DELETE_CATEGORY", payload: id });
        const bookHasCategory = booksState.books.filter(
          (item) => item.categoryId == id
        );
        console.log("ListCat bookshasCategory", bookHasCategory);
        bookHasCategory.map((item) =>
          dispatch({ type: "DELETE_BOOK", payload: item.id })
        );
      })
      .catch((err) => console.log("LCJ Delete Category Err", err));
  }; //bu rada id olarak veya category.id olarakalabilirsin sana kalmış

  if (categoriesState.success !== true) {
    return <Loading />;
  }
  return (
    <div className="container my-5">
      <div className="my-3 d-flex justify-content-end">
        <Link to="/add-category" className="btn btn-sm btn-primary my-3">
          Kategori Ekle
        </Link>
      </div>
      <table className="table">
        <thead  className="textbackround">
          <tr>
            <th scope="col">Kategori</th>
            <th className="text-center" scope="col">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="textbackround">
          {categoriesState.categories.map((category) => {
            return (
              <tr key={category.id}>
                <td>{category.name}</td>

                <td className="text-center">
                  <div className="btn-group" role="group">
                    <Link
                      to={`/edit-category/${category.id}`}
                      type="button"
                      className="btn btn-sm btn-outline-secondary mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-none btn-danger"
                      onClick={() => {
                        setShowDeleteModal(true);
                        // deleteBook(book.id)
                        setDeleteCategory(category.id);
                        setDeleteCategoryName(category.name);
                      }}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showDeleteModal === true && (
        <Modal
          title={deleteCatergoryName}
          description={"Silmek istediğinize emin misiniz?"}
          //   description={`${willDeleteBookName}Silmek istediğinize emin misiniz?`}
          onConfirm={() => categoryDelete(deleteCatergory)}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};
export default ListCategories;
