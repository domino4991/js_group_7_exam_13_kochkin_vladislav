const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const Institution = require('./models/Institution');
const Review = require('./models/Review');
const User = require('./models/User');

mongoose.connect(config.db, config.dbOpt);

const db = mongoose.connection;

db.once('open', async () => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        for(let collItem of collections) {
            await db.dropCollection(collItem.name);
        }
        const [admin, user] = await User.create({
            username: 'admin',
            password: 'testpass',
            role: 'admin',
            token: nanoid(),
        }, {
            username: 'user',
            password: 'testpass',
            role: 'user',
            token: nanoid()
        });

        const [inst1, inst2] = await Institution.create({
            title: 'Test',
            description: 'Test desc',
            mainImage: 'GcvwKOUy9FYp8SLIXzjJG.jpeg',
            agree: true,
            user: admin._id,
            rateCount: 1
        }, {
            title: 'Test 2',
            description: 'Test desc 2',
            mainImage: 'GcvwKOUy9FYp8SLIXzjJG.jpeg',
            agree: true,
            user: user._id
        });

        await Review.create({
            comment: 'Test comment',
            foodRating: 5,
            serviceRating: 3,
            interiorRating: 5,
            user: user._id,
            institution: inst1._id
        });

    } catch (e) {
        console.log(e);
    }
    await db.close();
});