const { User } = require('../models')

const userController = {
    getAllUsers(req, res) {
        User.find()
            .select('-__v')
            .then(dbUserData => {
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    
    getSingleUser({ params }, res) {
        User.findOne({ _id: params.id })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with that ID' })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => {
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID' })
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json({
                    data:dbUserData,
                    message: 'User deleted'
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendId } }, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID' }); 
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            });
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this id' });
                    return;
                }
                res.json({ 
                    data: dbUserData,
                    message: 'Friend removed'
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    }
}

module.exports = userController;