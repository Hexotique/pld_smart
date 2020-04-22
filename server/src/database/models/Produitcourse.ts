import { Sequelize, Model, DataTypes } from "sequelize";


export class ProduitCourse extends Model {

  public id!: number;

}

export const init_model_produitcourse = (sequelize: Sequelize) => {
  ProduitCourse.init(
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

