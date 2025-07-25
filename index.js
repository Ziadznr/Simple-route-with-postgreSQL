const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool= require('./db');

const app = express();

app.use(express.json());

app.get('/books',(req,res)=>{
    try {
        return res.status(200).json({
            message: 'Welcome to the API'});
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
})

app.get('/books/:id',(req,res)=>{
    try {
        const {id} = req.params;
        return res.status(200).json({
            message: `Welcome to the API for book with ID: ${id}`});
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
})

app.post('/books',async(req,res)=>{
    try {
        const {name,description} = req.body;
        const id = uuidv4();
        // Here you would typically insert the book into the database
        const newBook=await pool.query("INSERT INTO book (id, name, description) VALUES ($1, $2, $3) RETURNING *", [id, name, description]);
        return res.status(200).json({
            message: `Welcome to the API for book :`,data:newBook.rows});
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
})
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});