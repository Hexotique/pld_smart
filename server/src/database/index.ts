import { Sequelize } from 'sequelize';
import init_models from './models';

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'sqlite',
    storage: process.env.DB_PATH
});

export const init_db = () => {
    init_models(sequelize);
}