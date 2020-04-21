import { Sequelize, HasMany, BelongsToMany, DataTypes } from 'sequelize';
import { init_model_client, Client } from './client';
import { init_model_ticket, Ticket } from './ticket';
import { init_model_achat, Achat } from './achat';
import { init_model_article, Article } from './article';
import { init_model_produit, Produit } from './produit';
import { init_model_categorieproduit, CategorieProduit } from './categorieProduit';
import { init_model_listecourses, ListeCourses } from './listeCourses';
import { init_model_item, Item} from './item';
import { init_model_produitcourse, ProduitCourse } from './produitcourse';
import { init_model_gardemanger, GardeManger } from './gardeManger';
import { init_model_commerce, Commerce } from './commerce';
import { init_model_groupe, Groupe } from './groupe';


const init_models = (sequelize: Sequelize) => {

    init_model_client(sequelize);
    init_model_ticket(sequelize);
    init_model_achat(sequelize);
    init_model_article(sequelize);
    init_model_produit(sequelize);
    init_model_categorieproduit(sequelize);
    init_model_listecourses(sequelize);
    init_model_produitcourse(sequelize);
    init_model_item(sequelize);
    init_model_gardemanger(sequelize);
    init_model_commerce(sequelize);
    init_model_groupe(sequelize);

    Groupe.hasMany(Commerce, {as: "magasins"});
    Commerce.hasMany(Ticket, { as: "recus" });

    CategorieProduit.hasMany(Produit, {as: 'produits'});
    Produit.hasMany(Article, { as: 'articles' });

    Ticket.belongsToMany(Article, { through: Achat });
    Article.belongsToMany(Ticket, { through: Achat });

    GardeManger.belongsToMany(Produit, { through: Item });
    Produit.belongsToMany(GardeManger, { through: Item });

    ListeCourses.belongsToMany(Produit, { through: ProduitCourse });
    Produit.belongsToMany(ListeCourses, { through: ProduitCourse });

    sequelize.sync();
}

export default init_models;
export { Client } from './client';
export { Ticket } from './ticket';
export { Article } from './article';
export { Produit } from './produit';
export { CategorieProduit } from './categorieProduit';
export { ListeCourses } from './listeCourses';
export { GardeManger } from './gardeManger';
export { Commerce} from './commerce';
export { Groupe } from './groupe';

