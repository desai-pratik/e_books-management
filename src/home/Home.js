import React, { useEffect, useState } from "react";
import BookList from "../components/BookList";
import CreateBook from "../components/CreateBook";
import Modal from "../components/modal/Modal";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const Home = () => {
  const loadBooksFromStorage = () => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks
      ? JSON.parse(savedBooks)
      : [
          {
            id: 1,
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            image: "https://covers.openlibrary.org/b/id/14627570-M.jpg",
            borrow: true,
            publishingDate:"2024-09-07",
            description: `Originally published from 1954 through 1956, J.R.R. Tolkien's richly complex series ushered in a new age of epic adventure storytelling. A philologist and illustrator who took inspiration from his work, Tolkien invented the modern heroic quest novel from the ground up, creating not just a world, but a domain, not just a lexicon, but a language, that would spawn countless imitators and lead to the inception of the epic fantasy genre. Today, THE LORD OF THE RINGS is      considered  'the most influential fantasy novel ever written'. (THE ENCYCLOPEDIA OF FANTASY)
            During his travels across Middle-earth, the hobbit Bilbo Baggins had found the Ring. But the simple band of gold was far from ordinary; it was in fact the One Ring - the greatest of the ancient Rings of Power. Sauron, the Dark Lord, had infused it with his own evil magic, and when it was lost, he was forced to flee into hiding.
            But now Sauron's exile has ended and his power is spreading anew, fueled by the knowledge that his treasure has been found. He has gathered all the Great Rings to him, and will stop at nothing to reclaim the One that will complete his dominion. The only way to stop him is to cast the Ruling Ring deep into the Fire-Mountain at the heart of the land of Mordor--Sauron's dark realm.
            Fate has placed the burden in the hands of Frodo Baggins, Bilbo's heir...and he is resolved to bear it to its end. Or his own.
            `,
          },
          {
            id: 2,
            title: "A Court of Mist and Fury",
            author: "Sarah J. Maas",
            image: "https://ia601601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_31.zip&file=0014315081-M.jpg",
            borrow: true,
            publishingDate:"2024-11-07",
            description: `
            Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people.
            As her marriage to Tamlin approaches, Feyre's hollowness and nightmares consume her. She finds herself split into two different people: one who upholds her bargain with Rhysand, High Lord of the feared Night Court, and one who lives out her life in the Spring Court with Tamlin. While Feyre navigates a dark web of politics, passion, and dazzling power, a greater evil looms. She might just be the key to stopping it, but only if she can harness her harrowing gifts, heal her fractured soul, and decide how she wishes to shape her future-and the future of a world in turmoil.
            Bestselling author Sarah J. Maas's masterful storytelling brings this second book in her dazzling, sexy, action-packed series to new heights.`,
          },
          {
            id: 3,
            title: "A Game of Thrones",
            author: "George R. R. Martin",
            image: "https://ia803200.us.archive.org/view_archive.php?archive=/23/items/m_covers_0009/m_covers_0009_26.zip&file=0009269962-M.jpg",
            borrow: true,
            publishingDate:"2024-02-07",
            description: `
            Here is the first volume in George R. R. Martin’s magnificent cycle of novels that includes A Clash of Kings and A Storm of Swords. As a whole, this series comprises a genuine masterpiece of modern fantasy, bringing together the best the genre has to offer. Magic, mystery, intrigue, romance, and adventure fill these pages and transport us to a world unlike any we have ever experienced. Already hailed as a classic, George R. R. Martin’s stunning series is destined to stand as one of the great achievements of imaginative fiction. 
            A GAME OF THRONES Long ago, in a time forgotten, a preternatural event threw the seasons out of balance. In a land where summers can last decades and winters a lifetime, trouble is brewing. The cold is returning, and in the frozen wastes to the north of Winterfell, sinister and supernatural forces are massing beyond the kingdom’s protective Wall. At the center of the conflict lie the Starks of Winterfell, a family as harsh and unyielding as the land they were born to. Sweeping from a land of brutal cold to a distant summertime kingdom of epicurean plenty, here is a tale of lords and ladies, soldiers and sorcerers, assassins and bastards, who come together in a time of grim omens.
            Here an enigmatic band of warriors bear swords of no human metal; a tribe of fierce wildlings carry men off into madness; a cruel young dragon prince barters his sister to win back his throne; and a determined woman undertakes the most treacherous of journeys. Amid plots and counterplots, tragedy and betrayal, victory and terror, the fate of the Starks, their allies, and their enemies hangs perilously in the balance, as each endeavors to win that deadliest of conflicts: the game of thrones.
            `,
          },
        ];
  };
  const [books, setBooks] = useState(loadBooksFromStorage);
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleSearch = (query) => {
    const searchResult = books.filter((book) => book.title.toLowerCase().includes(query.toLowerCase()));
    setFilteredBooks(searchResult);
  };

  const handleAddBook = (newBook) => {
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
  };

  const handleBorrow = (bookId) => {
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        toast.success(book.borrowed ? "Book return successfully!" : "Book borrowed successfully!");
        return { ...book, borrowed: !book.borrowed };
      }
      return book;
    });
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Navbar handleSearch={handleSearch} toggleModal={toggleModal} />
      <BookList books={filteredBooks} onBorrow={handleBorrow} />
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <CreateBook onAdd={handleAddBook} onClose={toggleModal} />
      </Modal>
    </div>
  );
};

export default Home;
