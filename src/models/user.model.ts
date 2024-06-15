import mongoose, { Document, Model } from "mongoose";

export interface UserDocument extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
}

// interface for user mongoose model (static methods)
interface UserModel extends Model<UserDocument> {
    findByUsername(username: string): Promise<UserDocument | null>;
    findByEmail(email: string): Promise<UserDocument | null>;
}

// Define mongoose schema for User
const UserSchema = new mongoose.Schema<UserDocument, UserModel>(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String
        }
    },
    { timestamps: true }
);

// Static methods
UserSchema.statics.findByUsername = async function(username: string): Promise<UserDocument | null> {
    return this.findOne({ username });
}

UserSchema.statics.fndByEmail = async function(email: string) : Promise<UserDocument | null> {
    return this.findOne({ email });
}

// Define and export User model
const User = mongoose.model<UserDocument, UserModel>('User', UserSchema);
export default User;