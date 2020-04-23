import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin } from "sequelize";
import { Produit } from "./Produit";

export class Liste extends Model {
    public id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getProduits!: HasManyGetAssociationsMixin<Produit>;
    public addProduit!: HasManyAddAssociationMixin<Produit, number>;
    public removeProduit!: HasManyRemoveAssociationMixin<Produit, number>;

}


export const init_model_liste = (sequelize: Sequelize) => {
    Liste.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            }
        },
        {
            sequelize
        }
    );
}