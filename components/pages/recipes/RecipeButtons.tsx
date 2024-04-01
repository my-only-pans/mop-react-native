import React from "react";
import { View, StyleSheet, Text, Platform, } from 'react-native';
import colors from "../../../theme/colors";
import { textStyles } from "../../../theme/text";
import { Icon } from "react-native-elements";
import axios from "axios";
import { Link } from "expo-router";

interface Props {
    isOwner?: boolean;
    draftId?: string;
    recipeId?: string;
}

function RecipeButtons(props: Props) {
    const { draftId, isOwner = false, recipeId } = props;
    
    //TODO : fix draft id route
    //fixx delete button
    //add bookmark route
    
    console.log(`recipeId:  ${recipeId}`);
    console.log(`isOwner: ${isOwner}`);

    const iconSize = Platform.OS === "web" ? 30 : 20;

    return (

        <View style={styles.buttonsCont}>
            {isOwner ?
                (
                    <>

                        <Link href={`./recipe/draft/${draftId}`}>
                            <Icon
                                name='edit'
                                color={colors.highlight}
                                type="material"
                                size={iconSize}
                            />
                        </Link>
                        <Link href={"./"}>
                            <Icon
                                name='delete'
                                color={colors.highlight}
                                type="material"
                                size={iconSize}
                            />
                        </Link>

                    </>
                ) : (
                    <Link href={`./recipe/save/${recipeId}`}>
                        <Icon
                            name='bookmark'
                            color={colors.highlight}
                            type="material"
                            size={iconSize}
                        />
                    </Link>
                )
            }
        </View>
    );

}


const styles = StyleSheet.create({
    buttonsCont: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 30,
    }

});


export default RecipeButtons;