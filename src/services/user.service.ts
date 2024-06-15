import User, { UserDocument } from "../models/user.model";
import CustomError from "../utils/customError";

class UserService {
    async getUsers() {
        return await User.find();
    }

    async getUser(id: string) {
        const user = await User.findById(id);
        if(!user) throw new CustomError(404, "User not found");
        
        return user;
    }

    async createUser(userData: UserDocument) {
        return await User.create(userData);
    }

    async updateUser(id: string, userData: UserDocument) {
        return await User.findByIdAndUpdate(id, userData);
    }
}

export default UserService;