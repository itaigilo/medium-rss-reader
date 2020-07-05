const express = require('express');
const cors = require('cors');
const { getFeed } = require('./services/feed');
const { getHistoryItems, saveHistoryItem } = require('./services/history');

const app = express();

const port = 4000;
const baseUrl = '/rss';

app.use(cors());

app.get('/', (req, res) => res.send('RSS Reader Server is up and running.'));

// Feed API
app.get(`${baseUrl}/feed`, getFeed);

// History API
app.get(`${baseUrl}/history`, getHistoryItems);
app.post(`${baseUrl}/history`, saveHistoryItem);

app.listen(port, () => console.log(`RSS Reader server is listening at port ${port}`));
