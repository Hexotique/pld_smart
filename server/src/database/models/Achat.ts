import { Sequelize, Model, DataTypes } from "sequelize";


export class Achat extends Model {

  public prix!: number;

}

export const init_model_achat = (sequelize: Sequelize) => {
  Achat.init(
    {
      prix: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      }
    },
    {
      tableName: "achat",
      sequelize
    }
  );
}

