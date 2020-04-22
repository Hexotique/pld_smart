import { Sequelize, Model, DataTypes, HasManyAddAssociationMixin } from "sequelize";


export class Achat extends Model {

  public id!: number;
  public prix!: number;
  public quantite!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const init_model_achat = (sequelize: Sequelize) => {
  Achat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      prix: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      quantite: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize
    }
  );
}

