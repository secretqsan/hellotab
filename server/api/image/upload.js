import { MongoClient } from 'mongodb'
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let imageUrl = body.imageUrl;
    if (imageUrl && !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
        imageUrl = 'http://' + imageUrl;
    }
    const imageData = body.imageData;
    const mongodbUrl = process.env.NUXT_MONGODB_CONNECTION_STRING;
    const client = new MongoClient(mongodbUrl);
    await client.connect();
    const db = client.db('hellotab');
    const collection = db.collection('image');

    const result = await collection.insertOne({
        createdAt: new Date(),
        url: imageUrl,
        image: imageData,
    });
    client.close();
    return {id: result.insertedId};
});