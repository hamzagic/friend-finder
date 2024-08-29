import mongoose from 'mongoose';
const { Schema } = mongoose;

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    subject: {
      type: String,
      required: true
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Genre', genreSchema);