import { Sequelize, Model, DataTypes } from "sequelize";


export class ListeCourses extends Model {
  public id!: number;
  public nom!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


export const init_model_listecourses = (sequelize: Sequelize) => {
  ListeCourses.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
    },
    {
      tableName: "listecourses",
      sequelize
    }
  );
}

