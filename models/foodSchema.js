const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  foodItemName: { type: String, required: true },
  foodGroup: { type: String, required: true },
  description: String,
  nutritionalInformation: {
    calories: Number,
    totalFats: { type: Number, required: true },
    saturatedFats: { type: Number, required: true },
    unsaturatedFats: { type: Number, required: true },
    transFats: { type: Number, required: true },
    carbohydrates: Number,
    dietaryFiber: { type: Number, required: true },
    sugars: Number,
    protein: Number,
    sodium: Number,
    cholesterol: Number,
  },
  allergens: [String],
  ingredients: [String], 
  certifications: [String], 
  dietaryRestrictions: [String],
  servingSize: String,
  countryOfOrigin: String,
  brandOrManufacturer: String,
  healthBenefits: String,
  bestPractices: String,
});

module.exports = mongoose.model('FoodItem', foodSchema);
