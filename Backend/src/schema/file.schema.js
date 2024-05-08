import mongoose from "mongoose";

const FileSchema = {
    name: String,
    bytes: Buffer,
}

const collection = mongoose.model('File', FileSchema);

export default collection;