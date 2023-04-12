import { withApiAuthRequired, getAccessToken } from '@authok/nextjs-authok';

export default withApiAuthRequired(async function shows(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      // scopes: []
    });

    const shows = [
      {
        accessToken,
      }
    ];
    res.status(200).json(shows);
  } catch (error) {
    console.error(error);
    /*
    res.status((error as any).status || 500).json({
      code: (error as any).code,
      error: (error as any).message
    });
    */
   res.redirect('/api/auth/login');
  }
});