import { Sequelize, Model, DataTypes, HasManyAddAssociationMixin } from "sequelize";
import { Ticket } from "./Ticket";
export class Commerce extends Model {
  public id!: number;
  public nom!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public addTicket!: HasManyAddAssociationMixin<Ticket, number>;
  
}


export const init_model_commerce = (sequelize: Sequelize) => {
  Commerce.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      },

    },
    {
      sequelize
    }
  );

}

