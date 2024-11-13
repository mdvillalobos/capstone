import mongoose from 'mongoose';
const { Schema } = mongoose;

const FileSchema = new Schema({
    category: String,
    filePath: String,
    fileName: String,
    code: String,
});


const CredentialsSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    files: [FileSchema],    
})

const CredentialModel = mongoose.model('credentials', CredentialsSchema);

export default CredentialModel;
