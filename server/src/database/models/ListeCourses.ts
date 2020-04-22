import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin } from "sequelize";
import { ProduitCourse } from "./ProduitCourse";


export class ListeCourses extends Model {
  public id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getProduitCourses!: HasManyGetAssociationsMixin<ProduitCourse>;
  public addProduitCourse!: HasManyAddAssociationMixin<ProduitCourse, number>;
  public removeProduitCourse!: HasManyRemoveAssociationMixin<ProduitCourse, number>;

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

