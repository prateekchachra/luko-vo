import React, {useContext, useEffect} from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Ionicons} from '@expo/vector-icons';

import SubmitButton from "../../components/AddObject/SubmitButton";
import { colors, literals } from "../../constants";
import { Categories, ValueObject } from "../../components/ValueObjects/ValueCard";
import { ValueObjectsContext } from "../../context/ValueObjects";
import { ADD_OBJECT } from "../../context/ValueObjects/constants";
import InputField from "../../components/AddObject/InputField";
import AddPhotoButton from "../../components/AddObject/AddPhotoButton";
import { Platform } from "react-native";
import ImagePreview from "../../components/AddObject/ImagePreview";


const ValueObjectSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  category: Yup.string().required('Category is Required'),
  purchasePrice: Yup.number().required('Price cannot be empty'),
  description: Yup.string().notRequired(),
  photoUrl: Yup.string().required('Please add a Photo'),
  invoiceUrl: Yup.string().required('Please add an Invoice'),
});

const AddObject = ({navigation} : any) => {

  const { dispatch } = useContext(ValueObjectsContext);

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
    onSubmit: values => {
      dispatch({
        type: ADD_OBJECT,
        valueObject: values,
    });
    navigation.goBack();
  }
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, [])

  const goBack = () => navigation.goBack();
  
  const removePhotoUrl = () => setFieldValue('photoUrl', '');
  const removeInvoiceUrl = () => setFieldValue('invoiceUrl', '');

  const onAddPhotoPress = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        // firebase link
        setFieldValue('photoUrl', result.uri);
      }
  };
  const onAddInvoicePress = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        // firebase link
        setFieldValue('invoiceUrl', result.uri);
      }
  };
  
  const CancelButton = () => (
    <TouchableOpacity onPress={goBack}>
      <Ionicons name="close" size={24} color={colors.DEFAULT_BLACK} />
    </TouchableOpacity>
  );


  const AddObjectHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <CancelButton />
        <Text style={styles.labelText}>{literals.ADD_HEADER_TEXT}</Text>
        <SubmitButton label="Save" disabled={values.name === '' || values.purchasePrice === 0
      || values.photoUrl === '' || values.invoiceUrl ===''} outline onSubmit={handleSubmit}/>
      </View>
    )
  }
  

  return (
    <ScrollView contentContainerStyle={styles.viewContainer}>
      <AddObjectHeader />
      {values.photoUrl ? <ImagePreview
        imageUri={values.photoUrl} 
        onCancelPress={removePhotoUrl}
      />:
        <AddPhotoButton 
      label="Add Photo" 
      onButtonPress={onAddPhotoPress}
      error={errors['photoUrl']}/>}

      <InputField 
      label="Name"
      onChangeText={handleChange('name')}
      onBlur={handleBlur('name')}
      error={errors['name']}
      touched={touched['name']}
      />
      <Text style={styles.inputLabelText}>Category</Text>
      <Picker
      style={styles.pickerContainer}
        selectedValue={values.category}
        onValueChange={(itemValue, itemIndex) =>
          setFieldValue('category', itemValue)
        }
        itemStyle={styles.pickerItem}
      >
        {Object.keys(Categories).map((item) => <Picker.Item key={item} label={Categories[item]} value={item} />)}
      </Picker>
      <InputField 
      label="Purchase Value"
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
     {values.invoiceUrl ? 
     <ImagePreview
      imageUri={values.invoiceUrl} 
      onCancelPress={removeInvoiceUrl}
      />
     : <AddPhotoButton 
      label="Add Invoice" 
      onButtonPress={onAddInvoicePress}
      error={errors['invoiceUrl']}/>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flexGrow: 1,
    paddingVertical: 24,
    backgroundColor: colors.DEFAULT_WHITE,
    paddingHorizontal: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 24,
    paddingBottom: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.SECONDARY_GRAY
  },
  pickerContainer: {
    marginVertical: 12,
  },
  labelText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  },
  inputLabelText: {
    fontSize: 18,
    color: colors.DEFAULT_GRAY,
    opacity: 0.5,
    marginVertical: 12,  
  },
  pickerItem: {
    fontSize: 18,
    fontWeight: '700',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})

export default AddObject;
