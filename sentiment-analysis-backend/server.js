const express = require('express')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const cors = require('cors')

require('dotenv').config()

const PORT = 8080;

const app = express()
app.use(cors())
app.use(express.json())

const JWT_TOKEN = process.env.JWT_TOKEN

// generates the jwt-token for auth
app.get('/generate-jwt-token', (req, res) => {
    const payload = { user: "user" };
    const token = jwt.sign(payload, JWT_TOKEN, { expiresIn: '60d' });
    res.json({ token });
});

// verify the jwt-token
const verifyToken = (req, res, next) => {

    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined;

    if (!token) return res.status(401).json({ message: 'no token provided' });

    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// protected sentiment-analysis api
app.post('/sentiment-analysis', verifyToken, async (req, res) => {
    console.log(req.body)
    const text = req.body
    const jsonText = JSON.stringify(text)
    const options = {
        method: 'POST',
        url: 'https://sentiment-analysis9.p.rapidapi.com/sentiment',
        headers: {
            'Content-Type': 'application/json',
             Accept: 'application/json',
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'sentiment-analysis9.p.rapidapi.com'
        },
        data: [{ id: '1', language: 'en', text: jsonText}]
    };
    
    try {
        const response = await axios.request(options);
        res.json(response.data)
        console.log(response.data)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch sentiment analysis', error: error.message });
    }
});

app.listen(PORT, () => console.log(`server running: ${PORT}`));