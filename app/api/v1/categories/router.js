const express = require('express');
const router = express();
const { create, index, findOne, update, destroy } = require('./controller');

router.get('/categories', index);

router.post('/categories', create);

router.get('/categories/:id', findOne)

router.put('/categories/:id', update);

router.delete('/categories/:id', destroy);

module.exports = router;