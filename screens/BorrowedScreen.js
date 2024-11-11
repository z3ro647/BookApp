import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { db } from '../services/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const BorrowedScreen = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const isFocused = useIsFocused();

  // Function to fetch borrowed books
  const fetchBorrowedBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'borrowedBooks'));
      const booksData = querySnapshot.docs.map(docSnapshot => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }));
      setBorrowedBooks(booksData);
    } catch (error) {
      console.error("Error fetching borrowed books: ", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchBorrowedBooks();
    }
  }, [isFocused]);

  const returnBook = async (bookId) => {
    console.log("Attempting to delete book with ID:", bookId); // Debug log
    try {
      await deleteDoc(doc(db, 'borrowedBooks', bookId)); // Try deleting the book from Firestore
      Alert.alert("Book returned successfully!");

      // Update state directly to reflect UI changes
      setBorrowedBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
    } catch (error) {
      console.error("Error returning book: ", error);
      Alert.alert("Error", "Could not return the book. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {borrowedBooks.map(book => (
        <View key={book.id} style={styles.bookItem}>
          <Text style={styles.bookTitle}>{book.name}</Text>
          <Text style={styles.bookAuthor}>By {book.author}</Text>
          <TouchableOpacity style={styles.returnButton} onPress={() => returnBook(book.id)}>
            <Text style={styles.returnButtonText}>Return</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  bookItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android shadow
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  returnButton: {
    paddingVertical: 10,
    backgroundColor: '#ff6347',
    borderRadius: 5,
    alignItems: 'center',
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BorrowedScreen;
