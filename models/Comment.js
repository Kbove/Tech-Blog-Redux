const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
// const { normalize } = require('path/posix')

class Comment extends Model {}

Comment.init(
    {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        contents: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creator_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        post_id: {
            type: DataTypes.STRING,
            references: {
                model: 'post',
                key: 'id',
            },
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true, 
        underscored: true,
        modelName: 'comment'
    }
)

module.exports = Comment