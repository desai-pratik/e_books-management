import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "./modal/Modal";
import CreateBook from "./CreateBook";
import { toast } from "react-toastify";

const BookDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);
  const storedBooks = JSON.parse(localStorage.getItem("books"));
  const book = storedBooks.find((b) => b.id === parseInt(id));
  const navigation = useNavigate();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setBookDetails(book);
    }
  };
  const handleUpdateBook = (updatedBook) => {
    const updatedBooks = storedBooks.map((b) => (b.id === updatedBook.id ? updatedBook : b));
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setIsModalOpen(false);
  };

  const handleDeleteBook = () => {
    const updatedBooks = storedBooks.filter((b) => b.id !== book.id);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    navigation("/");
    toast.success("Book deleted successfully!");
  };

  if (!book) {
    return <div>Book not found!</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <Link to="/" className="text-blue-500 hover:underline">
        Back to Book List
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 bg-white p-6 rounded-lg shadow-lg">
        <div className="overflow-hidden rounded-lg">
          <img src={book.image} alt={book.title} className="w-full object-cover rounded-lg transition-transform transform hover:scale-105" />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-normal md:text-5xl text-gray-800">{book.title}</h2>
            <p className="text-gray-600 mt-2">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="text-gray-500 mt-2">
              <strong>Publishing Date:</strong> {book?.publishingDate}
            </p>
            <p className="mt-2 font-semibold">Description:</p>
            <p className="text-gray-700">{book.description || "No description available."}</p>
          </div>

          <div className="mt-6">
            <button
              onClick={toggleModal}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 w-full md:w-auto"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this book?")) {
                  handleDeleteBook();
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 mt-2 md:mt-0 md:ml-2 w-full md:w-auto"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <CreateBook onAdd={handleUpdateBook} onClose={toggleModal} initialData={bookDetails} />
      </Modal>
    </div>
  );
};

export default BookDetails;
