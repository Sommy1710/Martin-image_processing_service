import sharp from "sharp";
import mime from "mime-types"
import Image from '../schema/image.schema.js'
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadImage = async (req, res) => {
  try {
    const { file } = req;
    const extension = mime.extension(file.mimetype);
    const filename = `${file.filename}.${extension}`;
    const metadata = await sharp(file.path).metadata();
    const image = new Image({
      filename,
      url: `/uploads/${filename}`,
      metadata,
    });
    fs.renameSync(file.path, path.join(file.destination, filename));
    await image.save();
    res.success(image, "Image uploaded successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const transformImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { transformations } = req.body;
    const image = await Image.findById(id);
    if (!image) {
      return res.error(new Error("Image not found"), 404);
    }

    let transformer = sharp(
      path.join(__dirname, "../../uploads", image.filename)
    );

    if (transformations.resize) {
      transformer = transformer.resize(
        transformations.resize.width,
        transformations.resize.height
      );
    }
    if (transformations.crop) {
      transformer = transformer.extract({
        width: transformations.crop.width,
        height: transformations.crop.height,
        left: transformations.crop.x,
        top: transformations.crop.y,
      });
    }
    if (transformations.rotate) {
      transformer = transformer.rotate(transformations.rotate);
    }
    if (transformations.filters) {
      if (transformations.filters.grayscale) {
        transformer = transformer.grayscale();
      }
      if (transformations.filters.sepia) {
        transformer = transformer.tint({ r: 112, g: 66, b: 20 });
      }
    }
    if (transformations.format) {
      transformer = transformer.toFormat(transformations.format);
    }

    const transformedFilename = `transformed-${image.filename}`;
    const transformedPath = path.join(
      __dirname,
      "../../uploads",
      transformedFilename
    );
    await transformer.toFile(transformedPath);

    const transformedMetadata = await sharp(transformedPath).metadata();
    const transformedImage = new Image({
      filename: transformedFilename,
      url: `/uploads/${transformedFilename}`,
      metadata: transformedMetadata,
    });
    await transformedImage.save();

    res.success(transformedImage, "Image transformed successfully");
  } catch (error) {
    res.error(error);
  }
};

const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) {
      return res.error(new Error("Image not found"), 404);
    }
    res.success(image, "Image fetched successfully");
  } catch (error) {
    res.error(error);
  }
};

const listImages = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const images = await Image.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.success(images, "Images listed successfully");
  } catch (error) {
    res.error(error);
  }
};

export { uploadImage, transformImage, getImage, listImages };
