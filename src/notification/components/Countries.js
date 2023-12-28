import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

const countries = [
  {name: 'Afghanistan', initials: 'AF'},
  {name: 'Albania', initials: 'AL'},
  {name: 'Algeria', initials: 'DZ'},
  {name: 'Andorra', initials: 'AD'},
  {name: 'Angola', initials: 'AO'},
  {name: 'Antigua and Barbuda', initials: 'AG'},
  {name: 'Argentina', initials: 'AR'},
  {name: 'Armenia', initials: 'AM'},
  {name: 'Australia', initials: 'AU'},
  {name: 'Austria', initials: 'AT'},
  {name: 'Azerbaijan', initials: 'AZ'},
  {name: 'Bahamas', initials: 'BS'},
  {name: 'Bahrain', initials: 'BH'},
  {name: 'Bangladesh', initials: 'BD'},
  {name: 'Barbados', initials: 'BB'},
  {name: 'Belarus', initials: 'BY'},
  {name: 'Belgium', initials: 'BE'},
  {name: 'Belize', initials: 'BZ'},
  {name: 'Benin', initials: 'BJ'},
  {name: 'Bhutan', initials: 'BT'},
  {name: 'Bolivia', initials: 'BO'},
  {name: 'Bosnia and Herzegovina', initials: 'BA'},
  {name: 'Botswana', initials: 'BW'},
  {name: 'Brazil', initials: 'BR'},
  {name: 'Brunei', initials: 'BN'},
  {name: 'Bulgaria', initials: 'BG'},
  {name: 'Burkina Faso', initials: 'BF'},
  {name: 'Burundi', initials: 'BI'},
  {name: 'Cabo Verde', initials: 'CV'},
  {name: 'Cambodia', initials: 'KH'},
  {name: 'Cameroon', initials: 'CM'},
  {name: 'Canada', initials: 'CA'},
  {name: 'Central African Republic', initials: 'CF'},
  {name: 'Chad', initials: 'TD'},
  {name: 'Chile', initials: 'CL'},
  {name: 'China', initials: 'CN'},
  {name: 'Colombia', initials: 'CO'},
  {name: 'Comoros', initials: 'KM'},
  {name: 'Congo', initials: 'CG'},
  {name: 'Costa Rica', initials: 'CR'},
  {name: 'Croatia', initials: 'HR'},
  {name: 'Cuba', initials: 'CU'},
  {name: 'Cyprus', initials: 'CY'},
  {name: 'Czech Republic', initials: 'CZ'},
  {name: 'Democratic Republic of the Congo', initials: 'CD'},
  {name: 'Denmark', initials: 'DK'},
  {name: 'Djibouti', initials: 'DJ'},
  {name: 'Dominica', initials: 'DM'},
  {name: 'Dominican Republic', initials: 'DO'},
  {name: 'East Timor', initials: 'TL'},
  {name: 'Ecuador', initials: 'EC'},
  {name: 'Egypt', initials: 'EG'},
  {name: 'El Salvador', initials: 'SV'},
  {name: 'Equatorial Guinea', initials: 'GQ'},
  {name: 'Eritrea', initials: 'ER'},
  {name: 'Estonia', initials: 'EE'},
  {name: 'Eswatini', initials: 'SZ'},
  {name: 'Ethiopia', initials: 'ET'},
  {name: 'Fiji', initials: 'FJ'},
  {name: 'Finland', initials: 'FI'},
  {name: 'France', initials: 'FR'},
  {name: 'Gabon', initials: 'GA'},
  {name: 'Gambia', initials: 'GM'},
  {name: 'Georgia', initials: 'GE'},
  {name: 'Germany', initials: 'DE'},
  {name: 'Ghana', initials: 'GH'},
  {name: 'Greece', initials: 'GR'},
  {name: 'Grenada', initials: 'GD'},
  {name: 'Guatemala', initials: 'GT'},
  {name: 'Guinea', initials: 'GN'},
  {name: 'Guinea-Bissau', initials: 'GW'},
  {name: 'Guyana', initials: 'GY'},
  {name: 'Haiti', initials: 'HT'},
  {name: 'Honduras', initials: 'HN'},
  {name: 'Hungary', initials: 'HU'},
  {name: 'Iceland', initials: 'IS'},
  {name: 'India', initials: 'IN'},
  {name: 'Indonesia', initials: 'ID'},
  {name: 'Iran', initials: 'IR'},
  {name: 'Iraq', initials: 'IQ'},
  {name: 'Ireland', initials: 'IE'},
  {name: 'Israel', initials: 'IL'},
  {name: 'Italy', initials: 'IT'},
  {name: 'Ivory Coast', initials: 'CI'},
  {name: 'Jamaica', initials: 'JM'},
  {name: 'Japan', initials: 'JP'},
  {name: 'Jordan', initials: 'JO'},
  {name: 'Kazakhstan', initials: 'KZ'},
  {name: 'Kenya', initials: 'KE'},
  {name: 'Kiribati', initials: 'KI'},
  {name: 'Korea, North', initials: 'KP'},
  {name: 'Korea, South', initials: 'KR'},
  {name: 'Kosovo', initials: 'XK'},
  {name: 'Kuwait', initials: 'KW'},
  {name: 'Kyrgyzstan', initials: 'KG'},
  {name: 'Laos', initials: 'LA'},
  {name: 'Latvia', initials: 'LV'},
  {name: 'Lebanon', initials: 'LB'},
  {name: 'Lesotho', initials: 'LS'},
  {name: 'Liberia', initials: 'LR'},
  {name: 'Libya', initials: 'LY'},
  {name: 'Liechtenstein', initials: 'LI'},
  {name: 'Lithuania', initials: 'LT'},
  {name: 'Luxembourg', initials: 'LU'},
  {name: 'Madagascar', initials: 'MG'},
  {name: 'Malawi', initials: 'MW'},
  {name: 'Malaysia', initials: 'MY'},
  {name: 'Maldives', initials: 'MV'},
  {name: 'Mali', initials: 'ML'},
  {name: 'Malta', initials: 'MT'},
  {name: 'Marshall Islands', initials: 'MH'},
  {name: 'Mauritania', initials: 'MR'},
  {name: 'Mauritius', initials: 'MU'},
  {name: 'Mexico', initials: 'MX'},
  {name: 'Micronesia', initials: 'FM'},
  {name: 'Moldova', initials: 'MD'},
  {name: 'Monaco', initials: 'MC'},
  {name: 'Mongolia', initials: 'MN'},
  {name: 'Montenegro', initials: 'ME'},
  {name: 'Morocco', initials: 'MA'},
  {name: 'Mozambique', initials: 'MZ'},
  {name: 'Myanmar', initials: 'MM'},
  {name: 'Namibia', initials: 'NA'},
  {name: 'Nauru', initials: 'NR'},
  {name: 'Nepal', initials: 'NP'},
  {name: 'Netherlands', initials: 'NL'},
  {name: 'New Zealand', initials: 'NZ'},
  {name: 'Nicaragua', initials: 'NI'},
  {name: 'Niger', initials: 'NE'},
  {name: 'Nigeria', initials: 'NG'},
  {name: 'North Macedonia', initials: 'MK'},
  {name: 'Norway', initials: 'NO'},
  {name: 'Oman', initials: 'OM'},
  {name: 'Pakistan', initials: 'PK'},
  {name: 'Palau', initials: 'PW'},
  {name: 'Palestine', initials: 'PS'},
  {name: 'Panama', initials: 'PA'},
  {name: 'Papua New Guinea', initials: 'PG'},
  {name: 'Paraguay', initials: 'PY'},
  {name: 'Peru', initials: 'PE'},
  {name: 'Philippines', initials: 'PH'},
  {name: 'Poland', initials: 'PL'},
  {name: 'Portugal', initials: 'PT'},
  {name: 'Qatar', initials: 'QA'},
  {name: 'Romania', initials: 'RO'},
  {name: 'Russia', initials: 'RU'},
  {name: 'Rwanda', initials: 'RW'},
  {name: 'Saint Kitts and Nevis', initials: 'KN'},
  {name: 'Saint Lucia', initials: 'LC'},
  {name: 'Saint Vincent and the Grenadines', initials: 'VC'},
  {name: 'Samoa', initials: 'WS'},
  {name: 'San Marino', initials: 'SM'},
  {name: 'Sao Tome and Principe', initials: 'ST'},
  {name: 'Saudi Arabia', initials: 'SA'},
  {name: 'Senegal', initials: 'SN'},
  {name: 'Serbia', initials: 'RS'},
  {name: 'Seychelles', initials: 'SC'},
  {name: 'Sierra Leone', initials: 'SL'},
  {name: 'Singapore', initials: 'SG'},
  {name: 'Slovakia', initials: 'SK'},
  {name: 'Slovenia', initials: 'SI'},
  {name: 'Solomon Islands', initials: 'SB'},
  {name: 'Somalia', initials: 'SO'},
  {name: 'South Africa', initials: 'ZA'},
  {name: 'South Sudan', initials: 'SS'},
  {name: 'Spain', initials: 'ES'},
  {name: 'Sri Lanka', initials: 'LK'},
  {name: 'Sudan', initials: 'SD'},
  {name: 'Suriname', initials: 'SR'},
  {name: 'Sweden', initials: 'SE'},
  {name: 'Switzerland', initials: 'CH'},
  {name: 'Syria', initials: 'SY'},
  {name: 'Taiwan', initials: 'TW'},
  {name: 'Tajikistan', initials: 'TJ'},
  {name: 'Tanzania', initials: 'TZ'},
  {name: 'Thailand', initials: 'TH'},
  {name: 'Togo', initials: 'TG'},
  {name: 'Tonga', initials: 'TO'},
  {name: 'Trinidad and Tobago', initials: 'TT'},
  {name: 'Tunisia', initials: 'TN'},
  {name: 'Turkey', initials: 'TR'},
  {name: 'Turkmenistan', initials: 'TM'},
  {name: 'Tuvalu', initials: 'TV'},
  {name: 'Uganda', initials: 'UG'},
  {name: 'Ukraine', initials: 'UA'},
  {name: 'United Arab Emirates', initials: 'AE'},
  {name: 'United Kingdom', initials: 'GB'},
  {name: 'United States', initials: 'US'},
  {name: 'Uruguay', initials: 'UY'},
  {name: 'Uzbekistan', initials: 'UZ'},
  {name: 'Vanuatu', initials: 'VU'},
  {name: 'Vatican City', initials: 'VA'},
  {name: 'Venezuela', initials: 'VE'},
  {name: 'Vietnam', initials: 'VN'},
  {name: 'Yemen', initials: 'YE'},
  {name: 'Zambia', initials: 'ZM'},
  {name: 'Zimbabwe', initials: 'ZW'},
];

const CategorySelector = ({onSelect, onClose}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = category => {
    setSelectedCategory(category.name);
    // Perform actions or state updates based on the selected category

    onSelect(category.name);
    onClose();
  };

  const renderCategoryItem = ({item}) => {
    const isSelected = selectedCategory && selectedCategory.name === item.name;

    return (
      <TouchableOpacity
        onPress={() => handleCategorySelect(item)}
        style={styles.categoryItem}>
        <Text
          style={[styles.categoryName, isSelected && styles.selectedCategory]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={countries}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.gcatrow}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  categoryItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  categoryName: {
    fontSize: 16,
  },
  selectedCategory: {
    fontWeight: 'bold',
    color: 'blue', // Change this to your desired selected color
  },
});

export default CategorySelector;
