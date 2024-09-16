import express,{Request, Response, NextFunction} from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { errorHandler } from '../utils/error';
import { JWT_SECRET_TOKEN } from '../config/config';
import { User } from '../models/user';

interface UserDocument extends Document {
  _doc: any; // You can type this more specifically if you know the structure
}

export const authorized = async(req: Request | any, res: Response, next: NextFunction) => {
    try {
        const {authorization} = req.headers;
        if(!authorization) return res.status(401).send('User Not Authorized');

        const accessToken = authorization.split(" ")[1];
        const payload = jwt.verify(
            accessToken, 
            JWT_SECRET_TOKEN,
        );

        const {id} = payload as any;
        if(!id) return res.send('Invalid token provided');

        const user = await User.findById(id);
        if(!user) return res.status(401).send('User Not Authorized & not registered');
        
        req.user = user;
        next();
    } catch (error: any) {
       if(error.name === 'TokenExpiredError') return res.send('Token Expired!');
       return res.status(500).send('Server Error');
    }
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, confirmPassword } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);

    if (confirmPassword === password) {
        try {
            const findUser = await User.findOne({ email });
            if (findUser) {
                return res.status(403).json({message: 'User already Exist!'});
            }
           
            const newUser = new User({ email, password: hashPassword });
            await newUser.save();
            return res.status(201).json({
                message: 'User Created Successfully',
            });
        } catch (error) {
            next(error);
        }
        
    } else {
        res.status(401).json({
            message: 'Password and Confirm Password Do Not Match!',
        });
    }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser) throw next(errorHandler(404,'User does not Exist!'));
        const validPassword = bcryptjs.compareSync(password, findUser?.password);
        if(!validPassword) throw next(errorHandler(401, 'Invalid credentials!'));
        const token = jwt.sign({ id: findUser.toObject()?._id }, JWT_SECRET_TOKEN);
        const {password: pass, ...userInfo} = findUser?.toObject();
        return res.cookie('access_token', token, {httpOnly: true, expires: new Date(Date.now() +  24 * 60 * 60 * 1000)}).status(200).json({userInfo, access_token: token})
    } catch (error) {
        next(error);
    }
};

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
};
