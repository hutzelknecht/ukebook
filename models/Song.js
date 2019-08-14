const Sequelize = require('sequelize');
const sequelize = require('../database');

const Song = sequelize.define('song', {
    tab: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    author: {
        type: Sequelize.STRING
    },
    owner: {
        type: Sequelize.STRING
    }
},{
    tableName: 'song',
});

module.exports = Song;