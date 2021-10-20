import React, {useContext} from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import {Picker} from '@react-native-picker/picker';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Ionicons} from '@expo/vector-icons';

import SubmitButton from "../../components/AddObject/SubmitButton";
import { colors, literals } from "../../constants";
import { Categories, ValueObject } from "../../components/ValueObjects/ValueCard";
import { ValueObjectsContext } from "../../context/ValueObjects";
import { ADD_OBJECT } from "../../context/ValueObjects/constants";
import InputField from "../../components/AddObject/InputField";


const ValueObjectSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  purchasePrice: Yup.string().required('Required'),
  description: Yup.string().notRequired(),
  photoUrl: Yup.string().required('Required'),
  invoiceUrl: Yup.string().required('Required'),
});

const AddObject = ({navigation} : any) => {

  const {state, dispatch} = useContext(ValueObjectsContext);

  const { handleChange, handleSubmit, handleBlur, values, setFieldValue, errors, touched } = useFormik<ValueObject>({
    
    validationSchema: ValueObjectSchema,
    initialValues: {
      name: '',
      category: '',
      purchasePrice: 0,
      description: '',
      invoiceUrl: '',
      photoUrl: '',
    },
    onSubmit: values => dispatch({
      type: ADD_OBJECT,
      valueObject: values,
    })
  });

  const goBack = () => navigation.goBack();

  const CancelButton = () => (
    <TouchableOpacity onPress={goBack}>
      <Ionicons name="close" size={32} color={colors.DEFAULT_BLACK} />
    </TouchableOpacity>
  );


  const AddObjectHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <CancelButton />
        <Text style={styles.labelText}>{literals.ADD_HEADER_TEXT}</Text>
        <SubmitButton label="Save" outline onSubmit={handleSubmit}/>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.viewContainer}>
      <AddObjectHeader />
      <InputField 
      label="Name"
      onChangeText={handleChange('name')}
      onBlur={handleBlur('name')}
      error={errors['name']}
      touched={touched['name']}
      />
      <Picker
        selectedValue={values.category}
        onValueChange={(itemValue, itemIndex) =>
          setFieldValue('category', itemValue)
        }>
        {Object.keys(Categories).map((item) => <Picker.Item label={Categories[item]} value={item} />)}
      </Picker>
      <InputField 
      label="Price"
      keyboardType="numeric"
      onChangeText={handleChange('purchasePrice')}
      onBlur={handleBlur('purchasePrice')}
      error={errors['purchasePrice']}
      touched={touched['purchasePrice']}
      />
      <InputField 
      label="Description (Optional)"
      onChangeText={handleChange('description')}
      onBlur={handleBlur('description')}
      error={errors['description']}
      touched={touched['description']}
      />
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 24,
  },
  viewContainer: {
    flexGrow: 1,
    paddingVertical: 24,
    backgroundColor: colors.DEFAULT_WHITE  },
  labelText: {
    fontSize: 24,
    fontWeight: '700'
  }
})

export default AddObject;
