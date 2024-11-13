import mongoose from 'mongoose';
const { Schema } = mongoose;

const VerificationTokenSchema = new Schema ({
    owner: {
        type: String,
        required: true,
        unique: true
    },
    Otp: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
})

const VerificationToken = mongoose.model("tokens", VerificationTokenSchema);

export default VerificationToken;
