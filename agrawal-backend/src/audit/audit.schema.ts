import mongoose from 'mongoose';

export const AuditSchema = new mongoose.Schema({
  collection: String,
  documentId: String,
  action: String,
  oldValue: Object,
  newValue: Object,
  changedBy: String,
},{
  timestamps: true
});