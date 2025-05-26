import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d', // Token expires in 15 days
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // prevents XSS attacks by making the cookie inaccessible to client-side JS
        sameSite: "strict", // prevents CSRF attacks
        secure: process.env.NODE_ENV !== "development", // cookie only sent over HTTPS in production
    });
};

export default generateTokenAndSetCookie;