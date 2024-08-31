import { authenticate } from '../services/UserService.js';

// validate inputs
export const accessToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  const token = authHeader;
  // console.log('auth', authHeader);
  if (!token) {
      res.status(401).json({ success: false, error: 'No token found' });
  } else {
      const auth = await authenticate(token);
      if (auth.success === true) {
          req.user = auth.user;
          next();
      } else {
          res.status(401).json({ success: false, error: 'Invalid token' });;
      }
  }
}