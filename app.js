const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { result } = require("lodash");


const app = express();

//mongoDB connection
const dbURI = "mongodb+srv://eugen101:test1234@nodebloggerz.pjhib.mongodb.net/";
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


//register view engine
app.set("view engine", "ejs");


//middleware and static files
app.use(express.static("public"));
app.use(morgan("dev"));

//mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) =>{
    const blog = new Blog({
        title: "new blog",
        snippet: "About this tester blogerz",
        body: "this is a super cool test blog for testing body"
    });

    blog.save()
        .then((result) =>{
            res.send(result)
        })
        .catch((err) =>{
            console.log(err)
        });
})

app.get("/all-blogs", (req, res) => {
    Blog.find()
        .then((result) =>{
            res.send(result);
        })
        .catch((err) =>{
            console.log(err);
        });
});

app.get("/single-blog", (req, res) => {
    Blog.findById("678e337d095bd89c13e6ea9f")
        .then((result) => {
            res.send(result);
        })
})

//{root: __dirname} setter rooten til directory name slik at den skrevne path-en fungerer

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    //res.send("<p>About page</p>");
    res.render("about", { title: "About" });
});

//blog routes
app.get("/blogs", (req,res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) =>{
            res.render("index", {title: "All Blogs", blogs: result})
        })
        .catch((err) =>{
            console.log(err);
        })
})

app.get("/blogs/create", (req, res) =>{
    res.render("create", { title: "Create" });
})

//404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
})

