import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import ValueCard, { ValueObject } from "../../components/ValueObjects/ValueCard";
import SearchBar from "../../components/ValueObjects/SearchBar";
import AddButton from "../../components/ValueObjects/AddButton";
import { colors, literals } from "../../constants";

const ValueObjects = ( {navigation} : any ) => {

  // Search text
  const [searchText, setSearchText] = useState<string>("");

  // Initial list from React Context
  const [filteredValueObjects, setFilteredValueObjects] = useState<ValueObject[]>([]);

  useEffect(() => {
    
    const filteredObjects = [].filter((item: ValueObject, index) => {
      
      /**
       * We would like to be case insensitive with the results
       * 
       * Here we shall compare the search text to two parameters:
       * Name and Description
       * 
       */
      const lowerSearchText = searchText.toLowerCase();

      const { name, description } = item;
      return name.toLowerCase().includes(lowerSearchText) || 
        description?.toLowerCase().includes(lowerSearchText);
    })
    setFilteredValueObjects(filteredObjects);
  }, [searchText])

  const renderValueObjects = ({item, index} : any) => (
    <ValueCard key={`${item.name}${index}`} valueObject={item} />
  );

  const onSearchTextChange = useCallback((value: string) => setSearchText(value), []);
  const onAddPress = useCallback(() => navigation.navigate('AddObject'), []);


  const InventoryHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerRowContainer}>
          <Text style={styles.headerText}>{literals.HEADER_TEXT}</Text>
          <AddButton onAddPress={onAddPress} />
        </View>
         <SearchBar onSearchTextChange={onSearchTextChange}/>
      </View>
    )
  }
  const InventoryEmpty = () => (
    <Text style={styles.emptyInventoryText}>Nothing added to the inventory yet! Press the '+' icon to get started!</Text>
  )

  return (
     
      <FlatList
        ListHeaderComponent={InventoryHeader}
        data={filteredValueObjects}
        renderItem={renderValueObjects}
        maxToRenderPerBatch={3}
        initialNumToRender={5}
        extraData={filteredValueObjects}
        ListEmptyComponent={InventoryEmpty}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 12,
    backgroundColor: colors.DEFAULT_WHITE,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  headerRowContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold'
  },
  emptyInventoryText: {
    opacity: 0.8,
    alignSelf: 'center',
    marginTop: 48
  }
})

export default ValueObjects;
