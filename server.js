const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");


// choose between these 2
const { uploader,findUploadedFile } = require("./multer");
// const uploader = require("./cloudinary");


dotenv.config({path: __dirname + '/.env'})

// initialize app and port
const app = express();
const PORT = process.env.PORT || 5000;


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));


console.log(__dirname)


// routes
app.get("/", (req, res) => {
  res.send("welcome to multer api");
});

// saving to server/cloudinary
app.post('/api/upload',uploader.single("image"),(req,res)=>{
console.log(req.file);
})



app.get("/getImage",(req,res)=>{
    console.log(findUploadedFile("afa17376-f7a6-4d9c-aaee-f10135387a53.png"))
})

// make the folder accessible by all
app.use(express.static(path.join(__dirname,'./public')));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});