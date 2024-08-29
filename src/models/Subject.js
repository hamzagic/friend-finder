import mongoose from 'mongoose';
const { Schema } = mongoose;

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Subject', subjectSchema);