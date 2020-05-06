import React from 'react';
import { View } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { FlatList } from 'react-native-gesture-handler';
import Categorie from '../../../ComposantsGénériques/CategorieListeRetractable'
import { Achat } from '../../../../api'
import LigneTicket from '../LigneTicket';

interface Propriete {
     categoriesArray: Array<String>,
     achatsMap: Map<String, Array<Achat>>
}

function ListeDetailTicket(props: Propriete) {

     console.log(props.achatsMap);
     return (
          <View>
               <FlatList
                    data={props.categoriesArray}
                    keyExtractor={(item, index) => item + index.toString()}
                    renderItem={({ item }) =>
                         <View>
                              <Collapse>
                                   <CollapseHeader>
                                        <Categorie item={item} couleur="#fbbd4c" />
                                   </CollapseHeader>
                                   <CollapseBody>
                                        <FlatList
                                             data={props.achatsMap.get(item)}
                                             keyExtractor={(achat, index) => achat.nomArticle + index.toString()}
                                             renderItem={({ item }) =>
                                                  <LigneTicket nomItem={item.nomArticle} quantite={item.quantite} prix={item.prix} />
                                             }
                                        />
                                   </CollapseBody>
                              </Collapse>
                         </View>
                    }
               />
          </View>
     );
}

export default ListeDetailTicket;