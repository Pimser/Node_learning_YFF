const express = require("express");

const app = express();

//register view engine
app.set("view engine", "ejs");

//listen for requests

app.listen(3000);

//{root: __dirname} setter rooten til directory name slik at den skrevne path-en fungerer

app.get("/", (req, res) => {
    //res.send("<p>Home page</p>");
    res.render("index");
});

app.get("/about", (req, res) => {
    //res.send("<p>About page</p>");
    res.render("about");
});


app.get("/blogs/create", (req, res) =>{
    res.render("create");
})

//404 page
app.use((req, res) => {
    res.status(404).render("404");
})

