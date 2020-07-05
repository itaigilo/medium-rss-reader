const { v4: uuid } = require('uuid');

const db = require('../../data/db');

const DEFAULT_LIMIT = 5;
const DB_COLLECTION = 'history';

const getHistoryItems = (req, res) => {
	const { limit = DEFAULT_LIMIT } = req.query;
	const userId = _getUserId(req);
	const items = db.findItems(DB_COLLECTION, { userId }, limit, 'feedId');
	console.log(`Found ${items.length} history items for user ${userId}`);
	res.send({ userId, items });
};

const _getUserId = req => req.query.userId || uuid();

const saveHistoryItem = (req, res) => {
	const { userId, feedId } = req.query;
	const item = { userId, feedId };
	const result = db.createItem(DB_COLLECTION, item);
	console.log(`Saved feed ${feedId} to history for user ${userId}`);
	res.send(result);
};

module.exports = { getHistoryItems, saveHistoryItem };