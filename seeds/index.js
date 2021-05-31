const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '60afbcc0908bc03eecaf96c3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia placeat, magnam dolor ea, quod qui cum iure molestias incidunt deleniti sapiente minima laboriosam dolores itaque, cupiditate omnis animi recusandae architecto.',
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude, cities[random1000].latitude
                ]
            },
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/gkub/image/upload/v1622486645/YelpCamp/ljluema8fejmugybu3el.jpg',
                    filename: 'YelpCamp/ljluema8fejmugybu3el'
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})