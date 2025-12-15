import mongoose from "mongoose";
import { authenticationService } from "../../common";
import { PostDoc } from "./post";

export interface UserDoc extends mongoose.Document {
    email: string,
    password: string,
    posts?: Array<PostDoc>
}

export interface CreateUserDto {
    email: string,
    password: string
}

export interface UserModel extends mongoose.Model<UserDoc> {
    build(dto: CreateUserDto): UserDoc
}

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

userSchema.statics.build = (createUserDto: CreateUserDto) => {
    return new User(createUserDto)
}

export const User = mongoose.model<UserDoc, UserModel>('User', userSchema)