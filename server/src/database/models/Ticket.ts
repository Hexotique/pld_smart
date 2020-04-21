import { Sequelize, Model, DataTypes } from "sequelize";


export class Ticket extends Model {
  public id!: number;
  public date_achat!: Date;
  public montant!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


export const init_model_ticket = (sequelize: Sequelize) => {
  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      date_achat: {
        type: DataTypes.DATE,
        allowNull: false
      },
      montant: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      }
    },
    {
      tableName: "ticket",
      sequelize
    }
  );
}

