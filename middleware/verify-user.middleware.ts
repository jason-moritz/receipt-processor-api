import { RequestHandler } from 'express'
import Utils from '../utils/utils'

// This is a custom middleware to simulate authenticating a user before proceeding with the main handler logic.
const authenticateUser: RequestHandler = (req, res, next) => {
    // try {
    //     const token = req.headers.authorization.split(" ")[1];
    //     if (jwt.verify(token, TOKEN_KEY)) {
    //       next();
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     res.status(403).json({ message: 'Unauthorized' });
    //   }
    try {
        console.log('Verifying user...')
        
        const receipt = req.body
        receipt.userID = Utils.getRandomID()
        console.log('User verified.')
        next()
    } catch(error: any) {
        console.error(error.message)
        res.status(403).json({ message: 'Unauthorized.' })
    } 
}

export default authenticateUser