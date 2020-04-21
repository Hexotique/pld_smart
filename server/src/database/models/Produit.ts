import { Sequelize, Model, DataTypes } from "sequelize";

export class Produit extends Model {
  public id!: number;
  public nom!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


export const init_model_produit = (sequelize: Sequelize) => {
  Produit.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "produit",
      sequelize
    }
  );

}

