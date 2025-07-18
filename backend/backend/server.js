require('dotenv').config();
console.log("Loaded MongoDB URI:", process.env.MONGODB_URI);

const app = require('./app');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI, {
    dbName: "Urlshortener",
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch(err => {
    console.error("Failed to connect MongoDB:", err);
});

