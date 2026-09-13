const userModel = require("../models/user.model.js");
const Joi = require("joi");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res, next) => {

    const registerSchema = Joi.object({
        name: Joi.string().min(5).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });

    const {error} = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    };

    try {
    const {name, email, password} = req.body;

    const existingUser = await userModel.findOne({email: email});
    if (existingUser) {
        return res.status(400).json({message: "User already exists"});
    }

    const salt = await bycrypt.genSalt(12);
    const hashed = await bycrypt.hash(password, salt);

    const user = new userModel({
        name: name,
        email: email,
        password: hashed
    });
    await user.save();
    return res.status(200).json({message: "User registered successfully"});
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });

    const {error} = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    };

    try {
    const{email, password} = req.body;
    const user = await userModel.findOne({email: email});
    if (!user) {
        return res.status(400).json({message: "User does not exist"});
    }

    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
        {userId: user._id, name: user.name},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );

    const resUser = {
        _id: user._id,
        email: user.email,
        name: user.name
    };

    return res.status(200).json({message: "User logged in successfully", resUser, token});
    
    } catch (error) {
        next(error);
    };
};

module.exports = {registerUser, loginUser};
