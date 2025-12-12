import mongoose from "mongoose";
import { authenticationService } from "../../common";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

userSchema.pre('save', async function() {
    if(this.isModified('password') || this.isNew){
        const hashedPwd = await authenticationService.pwdToHash(this.get('password') as string);
        this.set('password, hashed')
    }
    
})

export const User = mongoose.model('User', userSchema)