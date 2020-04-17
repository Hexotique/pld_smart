import React from 'react';
import { Button, Text, View } from 'react-native';

import ListeGlissable from '../../components/ListeGlissable';

import { ListeCourseProp } from "../../navigator";

function ListeCourse({ route, navigation }: ListeCourseProp) {
    return (
        <ListeGlissable />
    );
}

export default ListeCourse;