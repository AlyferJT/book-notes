# BOOK NOTES PROJECT

Hi there, my name is Alyfer 🤗
This is my first FullStack project
I really struggled on that one
And i'm showing here, the BOOK NOTES PROJECT

This BOOK NOTES is a localhost server
So, it will only work for you, you can try to host that online, but it's a single user database
Or you can edit the code and add user authentication

## Installation

1 - Use [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install the project dependencies

```bash
npm i
```

2 - Download and install [PostgreSQL](https://www.pgadmin.org/download/), that's the database

3 - Check that inside the [DATABASE](https://github.com/AlyferJT/book_notes/tree/main/DATABASE) folder, contains the [database.sql](https://github.com/AlyferJT/book_notes/blob/main/DATABASE/database.sql) file

4 - Open the pgAdmin and create a database, you can call it however you want, but don't forget to change the database settings on [index.js](https://github.com/AlyferJT/book_notes/blob/main/index.js)

5 - Well, the database settings, has i mentioned before, has the following pattern
```bash
const db = new pg.Client({
    user: 'postgres',                      '---------------------------------'
    password: 'DATABASE YOU CREATED',      '---- YOU NEED TO CHANGE THIS ----'
    database: 'PASSWORD YOU CREATED',      '---- TO MATCH YOUR DATABASE  ----'
    host: 'localhost',                     '---------------------------------'
    port: 5432
});
```
6 - Finally, if all has been successfully made, the server is ready to run

7 - Open you [node.js](https://nodejs.org/en) terminal and run nodemon
```bash
nodemon ./index.js
```
8 - Open [localhost:3000](http://localhost:3000/) on your browser

This should appear on you browser, and it's ready to use

![website preview](https://cdn.discordapp.com/attachments/1208968709087957003/1208969295795589120/image.png?ex=65e53765&is=65d2c265&hm=a955b33827dec53c4cc39cbbccfe7289d5457b211919342fb708f6cb65be8161&)
