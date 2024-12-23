import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)

}

// Route for user login
const loginUser = async (req, res) => {

};

// Route for user register
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        //checking user already exist or not

        const exists = await userModel.findOne({ email });
        if (exists) {

            return res.json({ success: false, message: "User Already Exist" })

        }

        //validating email format and strong password

        if (!validator.isEmail(email)) {

            return res.json({ success: false, message: "Please Enter A Valid Email" })

        }

        if (password.length < 8) {

            return res.json({ success: false, message: "Please Generate a strong password" })

        }

        //Hashing user password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt) // in this password gets added with the hash to make it more secure for users

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save() // this user info is saved in mongodb

        const token = createToken(user._id)
        res.json({ success: true, token })
    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })


    }

};

// Route for admin login
const adminLogin = async (req, res) => {


};

export { loginUser, registerUser, adminLogin }