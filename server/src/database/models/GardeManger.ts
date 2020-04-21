import { Sequelize, Model, DataTypes } from "sequelize";


export class GardeManger extends Model {
  public id!: number;
  public quantite!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


export const init_model_gardemanger = (sequelize: Sequelize) => {
  GardeManger.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      sequelize
    }
  );
}

