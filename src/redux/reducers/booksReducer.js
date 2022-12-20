const initialState = {
  start: false,
  success: false,
  books: [], // değişken başlangıçta boş dizi ,
  fail: false,
  errorMessage: "", // we use that for users
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_START":
      return {
        ...state,
        start: true,
      };
    case "FETCH_BOOKS_SUCCESS":
      return {
        ...state,
        start: false,
        success: true,
        books: action.payload,
      };
    case "FETCH_BOOKS_FAIL":
      return {
        ...state,
        start: false,
        fail: true,
        errorMessage: action.payload,
      };
    case "ADD_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
      };
      case "DELETE_BOOK":
        const filteredBooks = state.books.filter(
          (item) => item.id !== action.payload
        );
        return {
          ...state,
          books: filteredBooks,
        };
      case "EDIT_BOOK":
        // güncellenecek kitabın o anki halini diziden çıkar ,yeni halini diziye ekle,
        const filteredBooksEdit = state.books.filter(
          (item) => item.id !== action.payload.id
        );
        return {
          ...state,
          books: [...filteredBooksEdit.action.payload],
        };

    default:
      return state; // reducer yazmaya başlamadan önce default state yazmalısın
    // eğer yazmazsan hata verir ve bulman uzun sürer.
  }
};
export default booksReducer;