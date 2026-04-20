import Query from "../models/Query.js";
import File from "../models/File.js";

const createQuery = async (req, res, next) => {
  try {
    const { fileId, question } = req.body;

    if (!fileId || !question) {
      return res.status(400).json({
        success: false,
        message: "Please provide both fileId and question.",
      });
    }

    // Ensure the referenced file exists and belongs to the requesting user
    const file = await File.findOne({ _id: fileId, userId: req.user._id });
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found or does not belong to you.",
      });
    }

    const query = await Query.create({
      userId: req.user._id,
      fileId,
      question: question.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Query stored successfully.",
      data: { query },
    });
  } catch (error) {
    next(error);
  }
};


const getUserQueries = async (req, res, next) => {
  try {
    const queries = await Query.find({ userId: req.user._id })
      .populate("fileId", "originalName mimetype createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Queries retrieved successfully.",
      count: queries.length,
      data: { queries },
    });
  } catch (error) {
    next(error);
  }
};

export { createQuery, getUserQueries };
