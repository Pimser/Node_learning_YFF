const express = require("express");

const app = express();

//register view engine
app.set("view engine", "ejs");

//listen for requests

app.listen(3000);

//{root: __dirname} setter rooten til directory name slik at den skrevne path-en fungerer

app.get("/", (req, res) => {
    const blogs = [];
    res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
    //res.send("<p>About page</p>");
    res.render("about", { title: "About" });
});


app.get("/blogs/create", (req, res) =>{
    res.render("create", { title: "Create" });
})

//404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
})

