import jwt from "jsonwebtoken";

const Session = (inToken: string | null, data: any) => {
  const generateToken = (data: any) => {
    return jwt.sign(data, "secret", {expiresIn: "1h"});
  }
  
  if (inToken) {
    const token = inToken;  
  
  try {
    return jwt.verify(token, "secret");
    } catch (jsonWebTokenError: any) {
      return null;
    }
  } else {
    return generateToken(data);
  }
}

export default Session;