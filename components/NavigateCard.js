import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { Icon } from '@rneui/base';


const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning Chris</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder='Where to?'
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate('RideOptionCard')
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en'
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
          />
        </View>
        <NavFavorites />
      </View>
      <View>
        <TouchableOpacity style={tw`flex flex-row w-24 bg-black px-4 py-3 rounded-full`}>
          <Icon name="car" type="font-awesome" color="white" size={26} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
   textInputContainer: {
     paddingHorizontal: 20,
     paddingBottom: 0,
   }
})