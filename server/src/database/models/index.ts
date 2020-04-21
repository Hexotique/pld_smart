import { Sequelize } from 'sequelize';
import { init_model_client } from './client';

const init_models = (sequelize: Sequelize) => {
    init_model_client(sequelize);
    sequelize.sync();
}

export default init_models;
export { Client } from './client';
