import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    filename: {type: String, required: true},
    url: {type: String, required: true},
    metadata: {type: Object, required: true},
});
const Image = mongoose.model("Image", imageSchema);
export default Image;
