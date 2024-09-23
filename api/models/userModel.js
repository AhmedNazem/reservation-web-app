import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "user must have a name"],
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      unique: true,
      lowercase: true, // Ensures the email is stored in lowercase
      validate: {
        validator: validator.isEmail, // Use validator's isEmail function
        message: "Please enter a valid email", // Custom error message
      },
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
      min: [8, "Password must be at least 8 length"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        // This works only on CREATE and SAVE (not update)
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
export const User = mongoose.model("User", userSchema);
