const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 5000; // Ensure the port is free and not conflicting
const cors = require('cors');
require('./db/conn');
const foodItem = require('./models/foodSchema');
const foodData = require('./foodData.json');


app.use(bodyParser.json());
app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/foodItemsData', async (req, res) => {
    try {
        const foodItemData = await foodItem.find({});
        res.status(200).json(foodItemData); // Correctly send JSON data with status 200
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error'); // Send error response if an exception occurs
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



// Add this route to handle deletion
app.delete('/deleteFoodItem/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecord = await foodItem.findByIdAndDelete(id);
        if (deletedRecord) {
            res.status(200).json({ message: 'Record deleted successfully' });
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/saveFoods', async (req, res) => {
    try {
        const newRecord = await foodItem.create(req.body);
        res.status(201).json({ newRecord }); // Send newly created record with status 201
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error'); // Send error response if an exception occurs
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
