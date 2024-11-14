import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://www.google.com/imgres?q=profile%20images&imgurl=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F3135%2F3135715.png&imgrefurl=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fprofile_3135715&docid=cO4ej6ajxZUMVM&tbnid=dJxfuI6obnHK_M&vet=12ahUKEwiV8tmbzdaFAxVhVmwGHRqKAYEQM3oECBwQAA..i&w=512&h=512&hcb=2&ved=2ahUKEwiV8tmbzdaFAxVhVmwGHRqKAYEQM3oECBwQAA"
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;