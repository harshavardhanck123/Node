const { MongoClient } = require('mongodb');

const connectDB=async()=>{
    const uri=`mongodb+srv://Harshavardhanck:Harsha99@mongodb.ck1jhmp.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB`;
    const client=new MongoClient(uri);

    try{
        await client.connect()

        console.log("Database is connected");

        const database=client.db("sample_airbnb")

        const collection=database.collection("listingsAndReviews")

        const query = { 'address.country': 'Brazil','address.country':1};

        const curser=collection.find(query)

        const res=await curser.toArray()

        console.log(res)

    }
    catch(e){
        console.error(`error ${e}`)
    }
    finally{
        await client.close();
        console.log("Database is closed")
    }
}

connectDB()

Node server

const notes=[
    {
      "id": 1,
      "title": "Grocery List",
      "content": "Milk, Bread, Eggs, Butter, Cheese"
    },
    {
      "id": 2,
      "title": "To-Do List",
      "content": "  Finish homework, Clean room, Call mom"
    },
    {
      "id": 3,
      "title": "Meeting Notes",
      "content": "Discuss project timeline, Assign tasks, Set next meeting date"
    },
    {
      "id": 4,
      "title": "Books to Read",
      "content": "1984 by George Orwell, To Kill a Mockingbird by Harper Lee, The Great Gatsby by F. Scott Fitzgerald"
    },
    {
      "id": 5,
      "title": "Movie Ideas",
      "content": "A story about time travel, A mystery set in a small town, A comedy about roommates"
    }
  ]


const http=require('http')

const server=http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'application/json'})
    res.end(JSON.stringify(notes))
});

server.listen(3001,()=>{
    console.log("Server is running on http://127.0.0.1:3001");
})