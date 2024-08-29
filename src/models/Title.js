import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
const { Schema } = mongoose;

const titleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subject_id: {
      type: { type: ObjectId, ref: 'Subject' },
    },
    genre_id: {
      type: { type: ObjectId, ref: 'Genre' },
    },
    subgenre_id: {
      type: { type: ObjectId, ref: 'Subgenre' },
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Title', titleSchema);