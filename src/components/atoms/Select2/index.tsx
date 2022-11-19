import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {COLORS, FONTS, SIZE} from '../../../theme';

function Select2({
  data,
  setFieldValue,
  initialData,
  placeholder,
  multiple,
  schema,
  mode,
  name,
}: any) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialData);
  const [items, setItems] = useState(data);

  return (
    <View style={{flexDirection: 'row'}}>
      <DropDownPicker
        schema={schema}
        multiple={multiple}
        min={0}
        max={5}
        open={open}
        value={value}
        items={items}
        onChangeValue={() => setFieldValue(name, value, true)}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        searchable
        mode={mode}
        listMode="MODAL"
        badgeDotColors={[
          '#e76f51',
          '#00b4d8',
          '#e9c46a',
          '#e76f51',
          '#8ac926',
          '#00b4d8',
          '#e9c46a',
        ]}
        placeholder={placeholder}
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
      />
    </View>
  );
}

export default Select2;

const styles = StyleSheet.create({
  placeholder: {
    fontFamily: FONTS.primary[400],
    fontSize: SIZE.font14,
    color: COLORS.text.subtitle,
  },

  dropdown: {
    width: '100%',
    height: 60,
    backgroundColor: COLORS.background.grey,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border.secondary,
  },
});
