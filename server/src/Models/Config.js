import mongoose from 'mongoose';
const { Schema } = mongoose;

const ConfigSchema = new Schema ({
    academicYear: String,
    isPageOpen: Boolean,
})

const ConfigModel = mongoose.model('configurations', ConfigSchema)

export default ConfigModel;