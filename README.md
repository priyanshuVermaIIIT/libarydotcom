Library Book Management System

Welcome to the Library Book Management System! This application allows users to manage and view books in a library. It supports two types of users: Regular users and Admin users. Regular users can view books, while Admin users can add and delete books.


Features:-

//Login Endpoint (/login)

Authenticates users and provides a JWT token.
Supports Regular and Admin user roles.


//Home Endpoint (/home)

Lists books based on user type.
Regular users see books from regularUser.csv.
Admin users see books from both regularUser.csv and adminUser.csv.


//Add Book Endpoint (/addBook)

Allows Admin users to add new books.
Validates input: Book Name and Author should be strings, Publication Year should be a valid number.
Adds new books to regularUser.csv.


//Delete Book Endpoint (/deleteBook)

Allows Admin users to delete books by name.
Removes the book from regularUser.csv.
