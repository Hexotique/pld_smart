import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationMixin, BelongsToManyRemoveAssociationMixin } from "sequelize";
import { Produit } from "./Produit";


export class ListeCourses extends Model {
  public id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getProduits!: BelongsToManyGetAssociationsMixin<Produit>;
  public addProduit!: BelongsToManyAddAssociationMixin<Produit, number>;
  public removeProduit!: BelongsToManyRemoveAssociationMixin<Produit, number>;

}

export const init_model_listecourses = (sequelize: Sequelize) => {
  ListeCourses.init(
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

