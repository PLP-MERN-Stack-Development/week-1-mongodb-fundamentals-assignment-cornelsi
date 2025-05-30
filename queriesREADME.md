# 📚 PLP Bookstore MongoDB Project

This project is a MongoDB-based bookstore system with tasks covering database setup, CRUD operations, advanced queries, aggregation pipelines, and indexing. Use this guide to understand how to run the scripts and interact with your database.

---

## 📦 Task 1: MongoDB Setup

### 1.1 Create the Database and Collection

Open your MongoDB shell and run:

```js
use plp_bookstore
db.createCollection('books')
````

### 1.2 Insert Book Data

To insert book documents using Node.js:

1. Install MongoDB Node.js driver:

   ```bash
   npm install mongodb
   ```

2. Run the insert script:

   ```bash
   node insert_books.js
   ```

---

## 🛠 Task 2: Basic CRUD Operations

### Find all books in the Fiction genre:

```js
db.books.find({ genre: 'Fiction' })
```

### Find books published after 1950:

```js
db.books.find({ published_year: { $gt: 1950 } })
```

### Find books by author "J.R.R. Tolkien":

```js
db.books.find({ author: 'J.R.R. Tolkien' })
```

### Update the price of "The Hobbit":

```js
db.books.updateOne({ title: 'The Hobbit' }, { $set: { price: 12.13 } })
```

### Delete "The Great Gatsby":

```js
db.books.deleteOne({ title: 'The Great Gatsby' })
```

---

## 🔍 Task 3: Advanced Queries

### Find in-stock books published after 2010:

```js
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })
```

### Project only `title`, `author`, and `price`:

```js
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })
```

### Sort books by price:

* Ascending:

  ```js
  db.books.find().sort({ price: 1 })
  ```
* Descending:

  ```js
  db.books.find().sort({ price: -1 })
  ```

### Pagination (5 books per page):

* Page 1:

  ```js
  db.books.find().limit(5)
  ```
* Page 2:

  ```js
  db.books.find().skip(5).limit(5)
  ```

---

## 📊 Task 4: Aggregation Pipeline

### Average book price by genre:

```js
db.books.aggregate([
  { $group: { _id: '$genre', average_price_of_books: { $avg: '$price' } } }
])
```

### Author with the most books:

```js
db.books.aggregate([
  { $group: { _id: '$author', bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])
```

### Group books by publication decade:

```js
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      bookCount: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $multiply: ["$_id", 10] },
      bookCount: 1,
      _id: 0
    }
  },
  { $sort: { decade: 1 } }
])
```

---

## ⚡ Task 5: Indexing

### Create an index on the `title` field:

```js
db.books.createIndex({ title: 1 })
```

### Create a compound index on `author` and `published_year`:

```js
db.books.createIndex({ author: 1, published_year: 1 })
```

### Use `explain()` to check performance:

```js
db.books.find({ title: 'The Hobbit' }).explain("executionStats")
```

---

## ✅ Prerequisites

* Node.js and npm installed
* MongoDB server running locally
* A script file `insert_books.js` with insert statements for book data

---

## 💡 Notes

* This project is great for learning MongoDB fundamentals.
* Use MongoDB Compass or shell for visual exploration and testing.

---

