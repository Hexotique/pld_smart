import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationMixin, BelongsToManyRemoveAssociationMixin } from "sequelize";
import { Article } from "./Article";
import { Item } from "./Item";
import { ListeCourses } from "./ListeCourses";

export class Produit extends Model {
  public id!: number;
  public nom!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getArticles!: HasManyGetAssociationsMixin<Article>;
  public addArticle!: HasManyAddAssociationMixin<Article, number>;

  public getListeCourses!: BelongsToManyGetAssociationsMixin<ListeCourses>;
  // public addListeCourse!: BelongsToManyAddAssociationMixin<ListeCourses, number>;
  // public removeListeCourse!: BelongsToManyRemoveAssociationMixin<ListeCourses, number>;


  public getItems!: HasManyGetAssociationsMixin<Item>;
  public addItem!: HasManyAddAssociationMixin<Item, number>;
  public removeItem!: HasManyRemoveAssociationMixin<Item, number>;
}

export const init_model_produit = (sequelize: Sequelize) => {
  Produit.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize
    }
  );

}

