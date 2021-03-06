import React, {useContext, useEffect} from "react";
import { View, ScrollView, Text, TouchableOpacity,  StyleSheet } from "react-native";
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Ionicons} from '@expo/vector-icons';

import SubmitButton from "../../components/AddObject/SubmitButton";
import { colors, literals, UserContracts } from "../../constants";
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
  contractMapping: Yup.string().required('Please select a contract to map to')
});

const AddObject = ({navigation} : any) => {

  const { state: valueObjectsState, dispatch } = useContext(ValueObjectsContext);

  const { handleChange, handleSubmit, handleBlur, values, setFieldValue, errors, touched } = useFormik<ValueObject>({
    
    validationSchema: ValueObjectSchema,
    initialValues: {
      name: '',
      category: Categories[0].name,
      purchasePrice: 0,
      description: '',
      invoiceUrl: '',
      photoUrl: '',
      contractMapping: UserContracts[0].name
    },
    onSubmit: values => {


      // Getting the total value of the Value Objects

      const totalValue = valueObjectsState.valueObjects.filter((item) => item.contractMapping 
      === values.contractMapping).reduce((a,b) => a + b.purchasePrice, 0);

      // Making sure the limit stays till 40000

      if(totalValue + values.purchasePrice <= 40000){
        dispatch({
          type: ADD_OBJECT,
          valueObject: values,
      });
      navigation.goBack();
      }
      else alert(`Cannot save more value objects to ${values.contractMapping}. Price exceeding 40,000 Euros`)
     
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

  const onPriceUpdate = (value: string) => setFieldValue('purchasePrice', value === '' ? 0 : parseFloat(value));

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
        <SubmitButton data-testid="save-button" label="Save" disabled={values.name === '' || values.purchasePrice === 0
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
        {Categories.map((item) => <Picker.Item key={item.type} label={item.name} value={item.type} />)}
      </Picker>

      <Text style={styles.inputLabelText}>Contract</Text>
      <Picker
      style={styles.pickerContainer}
        selectedValue={values.contractMapping}
        onValueChange={(itemValue, itemIndex) =>
          setFieldValue('contractMapping', itemValue)
        }
        itemStyle={styles.pickerItem}
      >
        {UserContracts.map((item) => <Picker.Item key={item.type} label={item.name} value={item.type} />)}
      </Picker>
      <InputField 
      label="Purchase Value"
      keyboardType="numeric"
      onChangeText={onPriceUpdate}
      value={String(values.purchasePrice)}
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
