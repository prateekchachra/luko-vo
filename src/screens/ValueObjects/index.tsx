import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import ValueCard, { ValueObject } from "../../components/ValueObjects/ValueCard";
import SearchBar from "../../components/ValueObjects/SearchBar";
import AddButton from "../../components/ValueObjects/AddButton";
import { literals } from "../../constants";

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

  return (
     
      <FlatList
        ListHeaderComponent={InventoryHeader}
        data={filteredValueObjects}
        renderItem={renderValueObjects}
        maxToRenderPerBatch={3}
        initialNumToRender={5}
        extraData={filteredValueObjects}
        contentContainerStyle={styles.listContainer}
      />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    margin: 12
  },
  headerContainer: {
    alignItems: 'center'
  },
  headerRowContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default ValueObjects;
