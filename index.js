var express = require("express");
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://adminSingh:adminSingh@cluster0.omacl.mongodb.net/MongoTest?retryWrites=true&w=majority";
var router = express.Router();
const app = express();
const port = 80; //Port

app.get("/", function (req, res, next) {
  res.json({ title: "Express" });
});

app.get("/db", function (request, response) {
  MongoClient.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("MongoTest");
      dbo
        .collection("Routes")
        .find({})
        .toArray(function (err, result) {
          let finalString ="<HTML><HEAD><TITLE>MongoDB</TITLE></HEAD><BODY><Center><H1>Mongo DB COLLECTION<H1></CENTER><ul>";
          let insideString = "";
          let final2String = "</ul></BODY></HTML>";
          for (const [key, value] of Object.entries(result)) {
            insideString += "<li>" + `${value.name}` + "</li>"
          }
          if (err) throw err;
          response.send(finalString + insideString + final2String);
          db.close();
        });
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
