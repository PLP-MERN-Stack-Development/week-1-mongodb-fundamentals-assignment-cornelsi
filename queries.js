// Task 1: MongoDB Setup
//creating new database called 'plp_bookstore'
admin> use plp_bookstore
//creating new collection called 'books'
plp_bookstore> db.createCollection('books')
// inserting book documents into your books collection from insert_books.js
npm install mongodb
node insert_books.js



//Task 2: Basic CRUD Operations
// Finding all books in a specific genre-fiction
db.books.find({'genre':'Fiction'})

//Find books published after a certain year-1950
db.books.find({published_year:{$gt:1950}})

//Find books by a specific author- 'J.R.R. Tolkien'
db.books.find({author: 'J.R.R. Tolkien'})

//Update the price of a specific book- THE Hobbit from 14.99 to 12.13
db.books.updateOne({title:'The Hobbit'},{$set:{price:12.13}})

//Delete a book by its title- The Great Gatsby
db.books.deleteOne({title:'The Great Gatsby'})


//Task 3: Advanced Queries
//- Write a query to find books that are both in stock and published after 2010
db.books.find({in_stock:true,published_year:{$gt:2010}})

 //Use projection to return only the title, author, and price fields in your queries
db.books.find({},{title:1,author:1,price:1,_id:0})

 //Implement sorting to display books by price (both ascending and descending)
db.books.find().sort({price: 1}) // Ascending order
db.books.find().sort({price: -1}) // Descending order

//Use the `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find().limit(5) // First page
db.books.find().skip(5).limit(5) // Second page


//Task 4: Aggregation Pipeline
//- Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([{$group:{_id:'$genre',average_price_of_books:{$avg:'$price'}}}])

//Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([{$group:{_id:'$author', bookCount:{$sum:1}}},{$sort:{bookCount:-1}},{$limit:1}])

//Implement a pipeline that groups books by publication decade and counts them
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

//Task 5: Indexing
//- Create an index on the `title` field for faster searches
db.books.createIndex({title: 1})
//Create a compound index on `author` and `published_year`
db.books.createIndex({author: 1, published_year: 1})
//Use the `explain()` method to demonstrate the performance improvement with your indexes
db.books.find({title: 'The Hobbit'}).explain("executionStats")
