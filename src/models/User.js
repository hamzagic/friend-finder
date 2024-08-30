import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    },
    premium: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    },
    deletedAt: {
        type: Date
    },
    token: {
        type: String
    },
    forgot: {
        type: String,
    },
    attempts: {
        type: Number,
        default: 0
    },
    lastAttempt: {
        type: Date
    }
});

export default mongoose.model('User', userSchema);