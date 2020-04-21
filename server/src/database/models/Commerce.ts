import { Sequelize, Model, DataTypes } from "sequelize";
export class Commerce extends Model {
  public id!: number;
  public nom!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


export const init_model_commerce = (sequelize: Sequelize) => {
  Commerce.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },

    },
    {
      tableName: "commerce",
      sequelize
    }
  );

}

