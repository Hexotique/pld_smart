import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin } from "sequelize";
import { Produit } from "./Produit";
import { Client } from "./Client";

export class AchatRegulier extends Model {
    public id!: number;
    public coefficient!: number;
    public intervales!: string;
    public moyenne!: number;
    public ecart_type!: number; 
    public date_dernier_achat! : Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


}

export const init_model_achatregulier = (sequelize: Sequelize) => {
    AchatRegulier.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            coefficient: {
                type: DataTypes.INTEGER,
                // allowNull: false
            },
            intervales: {
                type: DataTypes.STRING,
                // allowNull: false
            },
            moyenne: {
                type: DataTypes.FLOAT,
                // allowNull: false
            },
            ecart_type: {
                type: DataTypes.FLOAT,
                // allowNull: false
            },
            date_dernier_achat: {
                type: DataTypes.DATE,
                // allowNull: false
            }
        },
        {
            sequelize
        }
    );
}