import File from "../models/file.js";
const uploadFile = async (req, res, next) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded. Please attach a PDF or Word document.",
      });
    }

    const { originalname, filename, path: filePath, mimetype, size } = req.file;
    const file = await File.create({
      userId: req.user._id,
      filename,
      path: filePath,
      originalName: originalname,
      mimetype,
      size,
    });

    res.status(201).json({
      success: true,
      message: "File uploaded successfully.",
      data: { file },
    });
  } catch (error) {
    next(error);
  }
};


const getUserFiles = async (req, res, next) => {
  try {
    const files = await File.find({ userId: req.user._id })
      .select("-path") 
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Files retrieved successfully.",
      count: files.length,
      data: { files },
    });
  } catch (error) {
    next(error);
  }
};

export { uploadFile, getUserFiles };
