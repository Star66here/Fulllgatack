const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';  // URI ของ MongoDB (สามารถใช้ MongoDB Atlas URL ได้)
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        // เชื่อมต่อ MongoDB
        await client.connect();
        console.log("Connected to MongoDB!");

        // เลือกฐานข้อมูล
        const db = client.db('mydatabase');
        
        // เลือกคอลเลกชัน
        const collection = db.collection('mycollection');
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToMongoDB();
