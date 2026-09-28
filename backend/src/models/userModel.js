import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            trim: true,
            maxlength: [50, "your name cannot ne longer than 50 character"]
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, "Please enter valid email address"]
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minlength: [6, "Password must be at least 6 characters long"],
            select: false
        },
        passwordConfirm: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "Passwords do not match"
            }
        },
        phoneNumber: {
            type: String,
            required: [true, "Please enter your phone number"],
            unique: true,
            trim: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        avatar: {
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                default: "default_avatar"
            }
        },
        passwordChangedAt: { type: Date },
        passwordResetToken: { type: String, select: false, index: true },
        passwordResetExpires: { type: Date, select: false },
    },
    { timestamps: true }
)

userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.passwordConfirm;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.__v;
        return ret;
    }
})

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    bcrypt.hash(this.password, 12)
        .then((hashed) => {
            this.password = hashed;
            this.passwordConfirm = undefined;
            next();
        })
        .catch((err) => next(err));
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model("User", userSchema);
export { User };