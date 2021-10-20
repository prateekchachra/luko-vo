import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { colors, literals } from '../../../constants';

export interface SearchBarProps {
    searchText: string,
    onSearchTextChange: (value: string) => void;
}


const SearchBar = (props: SearchBarProps) =>  {

    return (
        <View style={styles.searchContainer}>
            <Ionicons name="search" size={16} color={colors.DEFAULT_GRAY}
            style={styles.searchIcon}/>
            <TextInput
            value={props.searchText} 
            style={styles.searchInput}
            placeholder={literals.INPUT_PLACEHOLDER}
            onChangeText={props.onSearchTextChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.PRIMARY_GRAY,
        borderRadius: 4,
        padding: 2,
        width: '100%',
    },
    searchIcon: {
        marginHorizontal: 4,
    },
    searchInput: {
        color: colors.DEFAULT_GRAY,
        fontSize: 12
    },
});

export default React.memo(SearchBar);