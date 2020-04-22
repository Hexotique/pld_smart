import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyCreateAssociationMixin } from "sequelize";
import { Produit } from "./Produit";

export class CategorieProduit extends Model {
  public id!: number;
  public nom!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getProduits!: HasManyGetAssociationsMixin<Produit>;
  public addProduit!: HasManyAddAssociationMixin<Produit, number>;
  public createProduit!: HasManyCreateAssociationMixin<Produit>;
}


export const init_model_categorieproduit = (sequelize: Sequelize) => {
  CategorieProduit.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize
    }
  );

}

