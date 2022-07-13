const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

router.route('/')
    .get(getAllThoughts)
    .post(createThought)

router.route('/:id')
    .get(getSingleThought)
    .delete(deleteThought)
    .put(updateThought)

module.exports = router;