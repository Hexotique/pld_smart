import { Sequelize } from 'sequelize';
import { init_model_client } from './client';
import { init_model_ticket } from './ticket';
import { init_model_achat } from './achat';
import { init_model_article } from './article';
import { init_model_item } from './item';
import { init_model_produit } from './produit';
import { init_model_categorieproduit } from './categorieProduit';
import { init_model_listecourses } from './listeCourses';
import { init_model_gardemanger } from './gardeManger';
import { init_model_commerce } from './commerce';
import { init_model_groupe } from './groupe';


const init_models = (sequelize: Sequelize) => {

    init_model_client(sequelize);
    init_model_ticket(sequelize);
    init_model_achat(sequelize);
    init_model_article(sequelize);
    init_model_item(sequelize);
    init_model_produit(sequelize);
    init_model_categorieproduit(sequelize);
    init_model_listecourses(sequelize);
    init_model_gardemanger(sequelize);
    init_model_commerce(sequelize);
    init_model_groupe(sequelize);

    sequelize.sync();
}

export default init_models;
export { Client } from './client';
export { Ticket } from './ticket';
export { Achat } from './achat';
export { Article } from './article';
export { Item } from './item';
export { Produit } from './produit';
export { CategorieProduit } from './categorieProduit';
export { ListeCourses } from './listeCourses';
export { GardeManger } from './gardeManger';
export { Commerce} from './commerce';
export { Groupe } from './groupe';

