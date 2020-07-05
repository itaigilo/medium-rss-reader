const _ = require('lodash');

const COLLECTIONS = ['history'];

const simpleDb = _.mapValues(_.keyBy(COLLECTIONS), () => {
	return { nextId: 1, items: [] };
});

const findItems = (collectionId, query, limit, uniqueBy) => _.chain(simpleDb)
	.get(`${collectionId}.items`)
	.filter(item => !_.some(query, (value, field) => item[field] !== value))
	.uniqBy(uniqueBy)
	.reverse()
	.take(limit)
	.value();

const createItem = (collectionId, data) => {
	const collection = simpleDb[collectionId];
	if (!collection) throw new Error(`No such collection ${collectionId}`);
	data._id = collection.nextId++;
	collection.items.push(data);
	return data;
};

module.exports = { findItems, createItem };