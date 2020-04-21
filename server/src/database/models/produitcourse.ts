import { Sequelize, Model, DataTypes } from "sequelize";


export class ProduitCourse extends Model {

  public quantite!: number;

}

export const init_model_produitcourse = (sequelize: Sequelize) => {
  ProduitCourse.init(
    {
      quantite: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      }
    },
    {
      tableName: "produitcourse",
      sequelize
    }
  );
}

