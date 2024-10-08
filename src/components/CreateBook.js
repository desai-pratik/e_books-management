import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateBook = ({ onAdd, onClose, initialData }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [publishingDate, setPublishingDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setImage(initialData.image);
      setPublishingDate(initialData.publishingDate);
      setDescription(initialData.description || "");
    } else {
      setPublishingDate(new Date().toISOString().slice(0, 10));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !image) {
      alert("Please fill all the fields.");
      return;
    }

    const newBook = {
      id: initialData ? initialData.id : Math.floor(Math.random() * 1000),
      title,
      author,
      image,
      publishingDate,
      description,
    };
    onAdd(newBook);
    toast.success(initialData ? "Book updated successfully!" : "Book added successfully!");
    onClose();
    setTitle("");
    setAuthor("");
    setImage("");
  };

  return (
    <div className="p-4 py-3">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4 ">{initialData ? "Edit Book" : "Add a New Book"}</h2>
        <h2 className="text-xl cursor-pointer text-red-700" onClick={() => onClose()}>
          &#x2715;
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded-lg p-2 w-full" />
        </div>
        <div>
          <label className="block mb-2">Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="border border-gray-300 rounded-lg p-2 w-full" />
        </div>
        <div>
          <label className="block mb-2">Image URL</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="border border-gray-300 rounded-lg p-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter book description"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          {initialData ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
