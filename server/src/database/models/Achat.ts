import { Sequelize, Model, DataTypes } from "sequelize";


export class Achat extends Model {
  public id!: number;
  public quantite!: number;
  public prix!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


export const init_model_achat = (sequelize: Sequelize) => {
  Achat.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      quantite: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      prix: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      }
    },
    {
      tableName: "achat",
      sequelize
    }
  );
}

