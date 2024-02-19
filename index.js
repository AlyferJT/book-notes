import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;
const db = new pg.Client({
    user: 'postgres',
    password: '@Zsnja8ct',
    database: 'booknote',
    host: 'localhost',
    port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET BOOK LIST - HAS A PARAMETER THAT SIGN A ORDER TO RETURN
async function getBookList(pOrderBy) {
    const result = await db.query(`SELECT * FROM booklist ORDER BY ${pOrderBy}`)
    return result.rows
}

// GET SPECIFIC BOOK BY PARSING ID AS PARAMETER
async function getSpecificBook(pBookId) {
    const result = await db.query('SELECT * FROM booklist WHERE id = $1', [pBookId])
    return result.rows
}

// ADDBOOK TO DATABASE BY THE USER PARAMETERS
async function addBook(pBookTitle, pBookRating, pBookDesc, pBookIsbn, pBookDate) {
    await db.query('INSERT INTO booklist (book_title, book_rating, book_description, book_cover, book_isbn, book_date) VALUES ($1, $2, $3, $4, $5, $6)', [
        pBookTitle,
        pBookRating,
        pBookDesc,
        `https://covers.openlibrary.org/b/isbn/${pBookIsbn}-M.jpg`,
        pBookIsbn,
        pBookDate
    ])
}

// EDIT BOOK BY PARSING ID AND EDIT INFORMATIONS
async function editBook(pBookId, pBookIsbn, pBookTitle, pBookDesc, pBookRating, pBookCover) {
    await db.query('UPDATE booklist SET book_isbn =$1, book_title =$2, book_description =$3, book_rating =$4, book_cover=$5 WHERE id =$6', [
        pBookIsbn,
        pBookTitle,
        pBookDesc,
        pBookRating,
        pBookCover,
        pBookId
    ])
}

// DELETE BOOK BY PARSING IT'S ID
async function deleteBook(pBookId) {
    await db.query('DELETE FROM booklist WHERE id = $1', [pBookId])
}

// INDEX PAGE
app.get('/', async (req, res) => {
    const bookList = await getBookList('id ASC');

    res.render('index.ejs', {
        bookList: bookList
    })
});

// REDIRECT USER TO ADD_BOOK.EJS PAGE WHEN CLICKS ON ADD BOOK
app.get('/add', (req, res) => {
    res.render('add_book.ejs')
});

// GET SORTING RESPONSE FROM GETBOOKLIST FUNCTION BY PARSING SORTING INFORMATION
app.post('/sort', async (req, res) => {
    const sortBy = req.body.by + ' ' + req.body.order;
    const bookList = await getBookList(sortBy);

    res.render('index.ejs', {
        bookList: bookList,
        by: req.body.by,
        order: req.body.order,
    })
});

// ADD BOOK TO DATABASE BY PARSING INFORMATION
app.post('/addbook', async (req, res) => {
    const dt = new Date();
    const actualDate = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()} - ${dt.getHours()}:${dt.getMinutes()}`;

    await addBook(req.body.book_title.toUpperCase(), req.body.book_rating, req.body.book_description, req.body.book_isbn, actualDate)
    res.redirect('/')
})

// RENDER EDIT_BOOK.EJS AND PARSE SPECIFIC BOOK INFORMATION BY PARSING THE ID
app.post('/edit', async (req, res) => {
    const editId = req.body.id;
    const data = await getSpecificBook(editId);

    res.render('edit_book.ejs', {
        book_id: data[0].id,
        book_isbn: data[0].book_isbn,
        book_title: data[0].book_title,
        book_description: data[0].book_description,
        book_rating: data[0].book_rating
    })
})

// SEND EDIT INFORMATION TO DATABASE BY CALLING THE FUNCTION
app.post('/editbook', async (req, res) => {
    const i = req.body
    const bookCover = `https://covers.openlibrary.org/b/isbn/${i.book_ISBN}-M.jpg`
    await editBook(i.id, i.book_ISBN, i.book_title, i.book_description, i.book_rating, bookCover)
    res.redirect('/')
})

// DELETE A BOOK BY CALLING THE FUNCTION
app.post('/deletebook', async (req, res) => {
    await deleteBook(req.body.id)
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Started server on port ${port}`)
});