function auth(req,res,next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(401).json({message:'Missing API key'});
    }
    const validKey = process.env.API_KEY || '12345';
    if (apiKey !== validKey) {
        return res.status(403).json({message: 'Invalid API key'});
    }
    next();
}
module.exports =auth;