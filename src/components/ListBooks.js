import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import "./components.css"

// npm install axios demeden kurulmaz
const ListBooks = (props) => {
  const dispatch = useDispatch();
  const { categoriesState, booksState } = useSelector((state) => state);
  console.log(categoriesState);
  console.log(booksState);

  const [filteredBooks, setFilteredBooks] = useState(null);
  // const [categories, setCategories] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [willDeleteBook, setWillDeleteBook] = useState(null);
  const [willDeleteBookName, setWillDeleteBookName] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const filtered = booksState.books.filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
    setFilteredBooks(filtered);
  }, [searchText]);

  const deleteBook = (id) => {
    console.log(`http://localhost:3004/books/${id}`);
    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((res) => {
        console.log("List Book delete res", res);
        dispatch({ type: "DELETE_BOOK", payload: id });
        setDidUpdate(!didUpdate);
        setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  if (booksState.success !== true || categoriesState.success !== true || filteredBooks === null) {
    // kitaplar kısmı boşsa çekilememişse
    return <Loading />;
  }
  return (
    <div className="container my-5 ">
      <div className="my-3 d-flex justify-content-between">
        <div className="w-75 my-3">
          <input
            type="text"
            className="form-control"
            placeholder="Aramak istediğiniz kitap ismini yazınız..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
        <Link to="/add-book" className="btn btn-primary my-3">
          Add Book (Kitap Ekle)
        </Link>
      </div>
      <table className="table">
        <thead className="textbackround">
          <tr>
            <th scope="col">Book Name (Kitap İsmi)</th>
            <th scope="col">Author (Yazar) </th>
            <th scope="col">Category (Kategori)</th>
            <th className="text-center" scope="col">
              ISBN
            </th>
            <th className="text-center" scope="col">
              Edit / Düzenle
            </th>
          </tr>
        </thead>
        <tbody className="textbackround">
          {filteredBooks.map((book) => {
            const category = categoriesState.categories.find(
              (category) => category.id == book.categoryId
            );
            return (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{category.name}</td>
                <td className="text-center">
                  {book.isbn === "" ? "-" : book.isbn}
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <Link
                      to={`edit-book/${book.id}`}
                      type="button"
                      className="btn btn-sm font-weight-bold btn-secondary mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-none btn-danger"
                      onClick={() => {
                        setShowModal(true);
                        // deleteBook(book.id)
                        setWillDeleteBook(book.id);
                        setWillDeleteBookName(book.name);
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
      {showModal === true && (
        <Modal
          title={willDeleteBookName}
          description={"Silmek istediğinize emin misiniz?"}
          //   description={`${willDeleteBookName}Silmek istediğinize emin misiniz?`}
          onConfirm={() => deleteBook(willDeleteBook)}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ListBooks;
