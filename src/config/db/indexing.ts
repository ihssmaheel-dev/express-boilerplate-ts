import mongoose from "mongoose";

export const indexes = async (): Promise<void> => {
    const usersCollection = mongoose.connection.db.collection('users');
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await usersCollection.createIndex({ username: 1 }, { unique: true });

    // you can add more indexes here...
    
};