import { User } from "../models/user.model.js";

export const createUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name|| !email|| !password) {
            return res.status(400)
             .json({ message: "Every field is required"})
        } 

        const existingUser = await User.findOne({ email});
        if(existingUser) {
            return res.status(400) 
            .json({ message: "User already exists with this email"});
        } 

        const user = new User ({
            name,
            email, 
            password,
        });

        await user.save();

        return res.status(201)
        .json({ message: " User created successfully" , user});
        
    } catch (error) {
        return res.status(500)
         .json({ message: "Internal Server Error" , error: error.message});
    }
}