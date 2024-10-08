import React from "react";
import { Link } from "react-router-dom";

const BookList = ({ books, onBorrow }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {books.map((book) => (
          <div key={book.id} className="p-2 rounded-lg  flex flex-col items-center">
            <Link to={`/book/${book.id}`} className="w-full overflow-hidden rounded-lg">
              <img src={book.image} alt={book.title} className="w-full h-64 overflow-hidden object-cover rounded-lg  transition-transform transform hover:scale-105" />
            </Link>
            <button onClick={() => onBorrow(book.id)} className={` py-1 mt-2 w-full rounded-lg ${book.borrowed ? "bg-green-500" : "bg-[#0376b8]"} text-white`}>
              {book.borrowed ? "Return" : "Borrow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
