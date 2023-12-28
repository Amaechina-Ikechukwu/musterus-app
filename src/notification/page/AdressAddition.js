import {View, Text, SafeAreaView, TouchableOpacity, Switch} from 'react-native';
import React, {useState} from 'react';
import CategorySelector from '../components/Countries';
import {OutlinedInput} from '../../components/inputs';
import {Style} from '../../../assets/styles';
import {Color} from '../../components/theme';
const Colors = Color();
export default function AddressAddition() {
  const [select, setSelect] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    billingCountry: '',
    billingFirstName: '',
    billingLastName: '',
    billingCompanyName: '',
    billingStreet1: '',
    billingStreet2: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    isDefaultBilling: 0,
  });
  const placeholders = {
    billingCountry: 'Enter Billing Country',
    billingFirstName: 'Enter First Name',
    billingLastName: 'Enter Last Name',
    billingCompanyName: 'Enter Company Name',
    billingStreet1: 'Enter Street 1',
    billingStreet2: 'Enter Street 2',
    billingCity: 'Enter City',
    billingState: 'Enter State',
    billingZipCode: 'Enter Zip Code',
    isDefaultBilling: 'Default Billing Address',
  };
  const handleInputChange = (field, value) => {
    setBillingAddress({...billingAddress, [field]: value});
  };
  const chooseCountry = cat => {
    setBillingAddress(prev => ({...prev, billingCountry: cat}));
  };
  const toggleSwitch = () => {
    setBillingAddress({
      ...billingAddress,
      isDefaultBilling: !billingAddress.isDefaultBilling,
    });
  };
  return (
    <View>
      <SafeAreaView>
        <View style={{gap: 20}}>
          <TouchableOpacity
            onPress={() => setSelect(!select)}
            style={{
              width: '100%',
              borderWidth: 1,
              borderRadius: 10,
              height: 50,
              padding: 10,
              justifyContent: 'center',
              borderColor: 'gray',
            }}>
            <Text>{billingAddress.billingCountry || 'Select a country'}</Text>
          </TouchableOpacity>
          {select && (
            <View
              style={{
                position: 'absolute',
                zIndex: 2,
                height: '50%',
                width: '100%',
              }}>
              <CategorySelector
                onSelect={chooseCountry}
                onClose={() => setSelect(!select)}
              />
            </View>
          )}

          {Object.keys(billingAddress).map((add, index) => {
            if (index !== 0 && add !== 'isDefaultBilling') {
              return (
                <OutlinedInput
                  style={{marginBottom: 0}}
                  value={billingAddress[add]}
                  onChangeText={text => handleInputChange(add, text)}
                  placeholder={placeholders[add]}
                />
              );
            }
          })}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={Style.Text}>Use this address as default?</Text>
            <Switch
              trackColor={{
                false: Colors.inactiveButton,
                true: Colors?.primary,
              }}
              thumbColor={
                billingAddress.isDefaultBilling ? Colors.primary : '#f4f3f4'
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={billingAddress.isDefaultBilling}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
