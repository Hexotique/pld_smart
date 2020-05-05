import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin } from "sequelize";
import { Produit } from "./Produit";
import { Client } from "./Client";

export class AchatRegulier extends Model {
    public id!: number;
    public coefficient!: number;
    public intervales!: Array<number>;
    public moyenne! : number;
    public date_dernier_achat! : Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // public getProduits!: HasManyGetAssociationsMixin<Produit>;
    // public addProduit!: HasManyAddAssociationMixin<Produit, number>;
    // public removeProduit!: HasManyRemoveAssociationMixin<Produit, number>;

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
                allowNull: false
            },
            intervales: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: false
            },
            moyenne: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            date_dernier_achat: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            sequelize
        }
    );
}