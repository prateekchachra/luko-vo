import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { colors, UserContracts } from '../../../constants';

const { width, height } = Dimensions.get('window');



export type CategoryType = {
    type: string;
    name: string;
}

export const Categories: CategoryType[] = [
    {
        type: "ART",
        name: "Art"
    }, 
    {
        type: "ELECTRONICS",
        name: "Electronics"
    }, 
    {
        type: "JEWELRY",
        name: "Jewelry"
    }, 
    {
        type: "MUSICAL_INSTRUMENTS",
        name: "Musical Instruments"
    },
]
export interface ValueObject {
    name: string;
    category: string;
    purchasePrice: number;
    description?: string;
    photoUrl: string;
    invoiceUrl: string;
    contractMapping: string;
}


export interface ValueCardProps {
    valueObject: ValueObject;
}

const ValueCard = (props: ValueCardProps) =>  {
    const { name, purchasePrice, photoUrl } = props.valueObject;

    const leftNum = purchasePrice / 10000 < 0 ? '' : String((purchasePrice / 10000).toFixed(2));

    return (
        <View style={styles.cardContainer}>
            <Image source={{uri: photoUrl}} style={styles.valueImage} />
            <View style={styles.detailsContainer}>
                <Text style={styles.labelText}>{name}</Text>
                <Text style={styles.invoiceText}>{leftNum} {purchasePrice % 10000} €</Text>
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
