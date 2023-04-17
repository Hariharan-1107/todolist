import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { Query } from 'mongoose';

mongoose.set("strictQuery", false);

const mongoDB = "mongodb+srv://hariharan:2Hkbt2IzVXTqE9gd@cluster0.ohbg1oq.mongodb.net/todolist?retryWrites=true&w=majority";

async function main() {
  await mongoose.connect(mongoDB);
}


main().catch((err) => console.log(err));

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
});

const Item = mongoose.model("item", itemSchema);

const item1 = new Item({
  name: 'Eat food',
});

const item2 = new Item({
  name: 'Hello world',
});

const item3 = new Item({
  name: 'Exit World',
});

const defaultitems = [item1, item2, item3];

async function create(i)
{
    await Item.create({name:i});
}

app.get("/", async (req, res) => {
  const query = Item.find();
  let founditems=[]
  founditems=await query.find();
  if(founditems.length===0)
  {
    Item.insertMany(defaultitems);
    res.redirect("/");
  }
  else
  {
    res.render('lists', {listTitle:'Today', item:founditems});
  }
  
});

app.get("/work", (req, res) => {
  res.render('lists', {listTitle: 'Work', item: workitems});
});

app.post("/", (req, res) => {
  let item = req.body.item;
  if (req.body.button === "Work") {
    workitems.push(item);
    res.redirect("/work");
  } else {
    create(item);
    res.redirect("/");
  }
});

app.get("/about", (req, res) => {
  res.render('about');
});

app.listen(3000, () => {
  console.log("Server is Up and running");
});
