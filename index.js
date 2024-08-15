const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const port = 5000; 
require('./db/conn');
const foodItem = require('./models/foodSchema');
const foodData = require('./foodData.json');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/foodItemsData', async (req, res) => {
    try {
        const foodItemData = await foodItem.find({});
        res.status(200).json(foodItemData); 
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error'); 
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


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
app.put('/updateFoodItem/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        console.log('Received data for update:', updatedData);

        const updatedRecord = await foodItem.findByIdAndUpdate(id, updatedData, { new: true });

        if (updatedRecord) {
            res.status(200).json({ message: 'Record updated successfully', updatedRecord });
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (e) {
        console.log('Error updating record:', e);
        res.status(500).json({ message: 'Internal Server Error', error: e.message });
    }
});


app.put('/updateFoodItem/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRecord = await foodItem.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (updatedRecord) {
            res.status(200).json({ message: 'Record updated successfully', updatedRecord });
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
        res.status(201).json({ newRecord }); 
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error'); 
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
