import Sequelize from 'sequelize';
import sequelize from '../configs/database.js';

const User = sequelize.define(
	'user_master',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
	{ freezeTableName: true }
);
// User.sync({ force: true })
export default User;