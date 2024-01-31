/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { MSG_ERR_AUTH } from '../utils/messages.js';
import { UnauthorizedError } from '../utils/errors.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((document) => {
      if (!document) {
        throw new UnauthorizedError(MSG_ERR_AUTH);
      }
      return bcrypt.compare(password, document.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(MSG_ERR_AUTH);
        }

        const user = document.toObject();
        delete user.password;
        return user;
      });
    });
};

export default mongoose.model('User', userSchema);
