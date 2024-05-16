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