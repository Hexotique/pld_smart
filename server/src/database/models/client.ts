import { Sequelize, Model, DataTypes } from 'sequelize';

export class Client extends Model {
    public id!: number;
    public email!: string;
    public mdp!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const init_model_client = (sequelize: Sequelize) => {
    Client.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mdp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "client",
        sequelize 
    });
}