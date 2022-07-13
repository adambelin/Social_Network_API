const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

router.route('/')
    .get(getAllUsers)
    .post(createUser);

    router.route('/:id')
    .get(getAllUsers)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;