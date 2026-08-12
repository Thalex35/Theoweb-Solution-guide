module.exports = (request, response) => {
    const measurementId = process.env.GOOGLE_ANALYTICS_ID || '';

    response.setHeader('Cache-Control', 'no-store');
    response.status(200).json({ measurementId });
};

