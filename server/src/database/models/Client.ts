import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, HasOneCreateAssociationMixin, HasManyAddAssociationMixin, HasManySetAssociationsMixin, HasManyRemoveAssociationMixin } from 'sequelize';
import { Ticket } from './Ticket';
import { GardeManger } from './GardeManger';
import { ListeCourses } from './ListeCourses';

export class Client extends Model {
    public id!: number;
    public email!: string;
    public mdp!: string;
    public nom!: string;
    public prenom!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    public getTickets!: HasManyGetAssociationsMixin<Ticket>;
    public createTicket!: HasManyCreateAssociationMixin<Ticket>;
    public addTicket!: HasManyAddAssociationMixin<Ticket, number>;
    public removeTicket!: HasManyRemoveAssociationMixin<Ticket, number>;

    public getGardeManger!: HasOneGetAssociationMixin<GardeManger>;
    public setGardeManger!: HasOneSetAssociationMixin<GardeManger, number>;
    public createGardeManger!: HasOneCreateAssociationMixin<GardeManger>;

    public getListeCourses!: HasOneGetAssociationMixin<ListeCourses>;
    public setListeCourses!: HasOneSetAssociationMixin<ListeCourses, number>;
    public createListeCourses!: HasOneCreateAssociationMixin<ListeCourses>;

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
            allowNull: false,
            unique: true
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
        sequelize
    });
}