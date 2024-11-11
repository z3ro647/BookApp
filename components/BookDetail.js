import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Alert, StyleSheet } from 'react-native';
import { db } from '../services/firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

const BookDetail = ({ route, navigation }) => {
  const { book } = route.params;
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  // Fetch borrowed books to check the borrow limit
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const borrowedBooksQuery = query(
          collection(db, 'borrowedBooks'),
          where("userId", "==", "currentUserId") // Replace "currentUserId" with the actual user ID
        );
        const querySnapshot = await getDocs(borrowedBooksQuery);
        const books = querySnapshot.docs.map(doc => doc.data());
        setBorrowedBooks(books);
      } catch (error) {
        console.error("Error fetching borrowed books: ", error);
      }
    };
    fetchBorrowedBooks();
  }, []);

  const borrowBook = async () => {
    if (borrowedBooks.length >= 3) {
      Alert.alert("Limit reached", "You can only borrow up to three books at a time.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'borrowedBooks'), { 
        ...book, 
        userId: "currentUserId" // Replace with the actual user ID 
      });
      Alert.alert("Book borrowed successfully!");
      navigation.navigate('Borrowed');
    } catch (error) {
      console.error("Error borrowing book: ", error);
      Alert.alert("Error", "Could not borrow the book. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.name}</Text>
      <Image source={{ uri: book.coverUrl }} style={styles.coverImage} />
      <Text style={styles.author}>Author: {book.author}</Text>
      <Text style={styles.rating}>Rating: {book.rating}</Text>
      <Text style={styles.summary}>{book.summary}</Text>
      <Button title="Borrow" onPress={borrowBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  coverImage: {
    width: 150,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  author: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  summary: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
});

export default BookDetail;
