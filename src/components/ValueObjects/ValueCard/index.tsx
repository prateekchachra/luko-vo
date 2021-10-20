import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../constants';

const { width, height } = Dimensions.get('window');



export type CategoryType = {[k: string] : string}

export const Categories: CategoryType = {
    "ART": "Art", 
    "ELECTRONICS": "Electronics", 
    "JEWELRY": "Jewelry", 
    "MUSICAL_INSTRUMENTS": "Musical Instruments",
}
export interface ValueObject {
    name: string;
    category: string;
    purchasePrice: number;
    description?: string;
    photoUrl: string;
    invoiceUrl: string;
}


export interface ValueCardProps {
    valueObject: ValueObject;
}

const ValueCard = (props: ValueCardProps) =>  {
    const { name, category, purchasePrice, description, photoUrl } = props.valueObject;
    return (
        <View style={styles.cardContainer}>
            <Image source={{uri: photoUrl}} style={styles.valueImage} />
            <View style={styles.detailsContainer}>
                <Text style={styles.labelText}>{name}</Text>
                <Text style={styles.invoiceText}>{Number(purchasePrice / 10000).toFixed(0)} {purchasePrice % 10000} €</Text>
            </View>
        </View>
    )
}

export default ValueCard;

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: colors.DEFAULT_WHITE,
        shadowColor: colors.DEFAULT_BLACK,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        borderRadius: 16,
        maxWidth: width / 2 - 24,
        marginVertical: 12,
    },
    detailsContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 12,
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 0.8
    },
    invoiceText: {
        fontSize: 12,
        fontWeight: '600',
        opacity: 0.6
    },
    valueImage: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: width / 2 - 24,
        height: width / 2 - 24,
    }
});
