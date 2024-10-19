const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  fileName: String,
  overall_health_status: String,
  health_score: Number,
  pest_identification: String,
  disease_identification: String,
  weed_presence: String,
  recommendations: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analysis', AnalysisSchema);