import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
const { Schema } = mongoose;

const starSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    subgenre: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Star', starSchema);