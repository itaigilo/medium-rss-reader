const Parser = require('rss-parser');
const _ = require('lodash');

const cache = require('../../data/cache');

const ITEM_FIELDS = ['title', 'creator', 'isoDate', 'link', 'contentSnippet'];

const parser = new Parser();

const getFeed = async (req, res) => {
	const { sourceType, sourceId } = req.query;
	try {
		const cacheKey = _buildCacheKey(sourceType, sourceId);
		const cachedValue = cache.getValue(cacheKey);
		if (cachedValue) {
			console.log(`Getting feed from cache for ${sourceType}-${sourceId}`);
			res.send(cachedValue);
		} else {
			const feedUrl = _buildUrl(sourceType, sourceId);
			const feed = await parser.parseURL(feedUrl);
			cache.putValue(cacheKey, feed);

			const { title } = feed;
			const items = _.map(feed.items, item => _.pick(item, ITEM_FIELDS));
			console.log(`Feed fetched with ${items.length} items for ${sourceType}-${sourceId}`);
			res.send({ title, items });
		}
	} catch (e) {
		if (e.message === 'Status code 404') {
			console.error(`Feed not found:  ${sourceType}-${sourceId}`);
			res.status(404).send({ error: 'Feed not found' });
		} else {
			console.error(`Cannot get feed  ${sourceType}-${sourceId}`, e);
			res.status(500).send({ error: 'Cannot get feed' });
		}
	}
};

const _buildCacheKey = (sourceType, sourceId) => `${sourceType}_${sourceId}`;

const _buildUrl = (sourceType, sourceId) => {
	switch (sourceType) {
		case 'medium':
			return `https://medium.com/feed/${sourceId}`;
		default:
			throw new Error(`Unknown sourceType: ${sourceType}`);
	}
};

module.exports = { getFeed };