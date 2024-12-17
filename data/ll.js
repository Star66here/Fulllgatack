async function insertData() {
    const collection = client.db('mydatabase').collection('mycollection');
    
    // ข้อมูลที่ต้องการเพิ่ม
    const document = { name: 'Alice', age: 30, job: 'Engineer' };
    
    // เพิ่มข้อมูลลงในคอลเลกชัน
    const result = await collection.insertOne(document);
    console.log(`Inserted document with _id: ${result.insertedId}`);
}

insertData();
