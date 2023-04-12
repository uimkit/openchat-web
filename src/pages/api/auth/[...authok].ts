import { handleAuth } from '@authok/nextjs-authok';

export default handleAuth({
  onError(req, res, error) {
    // Add your own custom error handling
    console.log('onError fuck');
    res.status(error.status || 400).end();
  }
});