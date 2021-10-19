import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../constants';

const { width, height } = Dimensions.get('window');

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
                <Text style={styles.labelText}>{name} | {category}</Text>
                <Text style={styles.invoiceText}>{Number(purchasePrice / 10000)} {purchasePrice % 10000} €</Text>
                {description && <Text style={styles.descriptionText}>{description}</Text>}
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
        borderRadius: 12,
        marginHorizontal: 16,
        height: height/3,
        position: 'relative' 
    },
    detailsContainer: {
        position: 'absolute',
        bottom: 12,
        left: 8,
        right: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.DEFAULT_WHITE,
        opacity: 0.8
    },
    invoiceText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.DEFAULT_WHITE,
        opacity: 0.6
    },
    descriptionText: {
        fontSize: 10,
        fontWeight: '300',
        color: colors.DEFAULT_WHITE,
        opacity: 0.5
    },
    valueImage: {
        borderRadius: 12,
        width: '100%',
        height: '100%'
    }
});
