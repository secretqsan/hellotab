import { MongoClient, ObjectId } from 'mongodb'
export default defineEventHandler(async (event) => {
    var { id } = event.context.params;
    id = id.replace('.webp', '');
    
    let objectId;
    try {
        objectId = new ObjectId(id);
    } catch (error) {
        throw createError({
            statusCode: 400,
            message: 'Invalid ObjectId',
        })
    }

    const mongodbUrl = process.env.NUXT_MONGODB_CONNECTION_STRING;
    const client = new MongoClient(mongodbUrl);
    await client.connect();
    const db = client.db('hellotab');
    const collection = db.collection('image');
    const image = await collection.findOne({ _id: objectId });
    await client.close();
    if (!image) {
        throw createError({
            statusCode: 404,
            message: 'Image not found',
        });
    }
    else if (image.url) {
        return await $fetch(image.url);
    }
    else {
        const matches = image.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);        
        if (!matches) {
            throw createError({
                statusCode: 400,
                message: 'Invalid image data URL format',
            });
        }
        
        const contentType = matches[1];
        const base64Data = matches[2];
        const imageBuffer = Buffer.from(base64Data, 'base64');
        
        event.node.res.setHeader('Content-Type', contentType);
        return imageBuffer;
    }
    
})