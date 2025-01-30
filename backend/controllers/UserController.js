import UserModel from "../models/UserModel.js";

export const getUser = async (req, res) => {
    const users = await UserModel.find({},{_id:1,name:1,email:1});
    res.status(200).json(users);
}

export const postUser = async (req, res) => {
    const {name, email, password} = req.body;
    const newUser = new UserModel({name, email, password});
    await newUser.save();
    res.status(201).json(newUser);
}

export const getUserById = async (req, res) => {
    const {id} = req.params;
    const user = await UserModel.findById(id);
    res.status(200).json(user);
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, email, password} = req.body;
    const user = await UserModel.findByIdAndUpdate(id, {name, email, password});
    res.status(200).json(user);
}

export const deleteUser = async (req, res) => { 
    const {id} = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    res.status(200).json(user);
}