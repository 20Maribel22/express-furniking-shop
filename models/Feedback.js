import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Feedback', feedbackSchema);
