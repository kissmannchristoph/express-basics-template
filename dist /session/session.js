import jwt from "jsonwebtoken";
const Session = (inToken, data) => {
    const generateToken = (data) => {
        return jwt.sign(data, "secret", { expiresIn: "1h" });
    };
    if (inToken) {
        const token = inToken;
        try {
            return jwt.verify(token, "secret");
        }
        catch (jsonWebTokenError) {
            return null;
        }
    }
    else {
        return generateToken(data);
    }
};
export default Session;
//# sourceMappingURL=session.js.map