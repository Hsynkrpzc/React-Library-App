import React, { useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import axios from "axios";
import CategoriesList from "./pages/CategoriesList";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import "./App.css"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //categories
    dispatch({ type: "FETCH_CATEGORIES_START" });
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_CATEGORIES_FAIL",
          payload: "Kategorileri çekme hatası",
        });
      });
    //books
    dispatch({ type: "FETCH_BOOKS_START" });
    axios
      .get("http://localhost:3004/books")
      .then((res) => {
        dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_BOOKS_FAIL",
          payload: "Kitaplar çekilirken bir hata ile oluştu.",
        });
      });
  }, []);
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:bookId" element={<EditBook />} />
        <Route path="/categories" element={<CategoriesList/>}/>
        <Route path="/add-category" element ={<AddCategory/>} />
        <Route path="/edit-category/:categoryId" element ={<EditCategory/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
