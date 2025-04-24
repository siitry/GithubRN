import React, {useState} from 'react';
import {
  Alert,
  Image,
  Modal, Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type TimeSpanItem = {
  name: string;
  value: string;
};
type Props = {
  onSelect: (item: TimeSpanItem) => void;
};
const TrendingDialog: React.FC<Props> = ({ onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchName, setSearchName] = useState('');
  const TimeSpans: TimeSpanItem[] = [
    {name: '今天', value: 'since=daily'},
    {name: '本周', value: 'since=weekly'},
    {name: '本月', value: 'since=monthly'},
  ];

  const selectedTimeSpan = (item: TimeSpanItem) => {
    console.log(item);
    setSearchName(item.name);
    setSearchValue(item.value);
    setModalVisible(false);
    onSelect(item); // 💥传给父组件
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginBottom: -17.1, marginTop: 50,}}>
              <MaterialIcons name="arrow-drop-up" size={40} color="#fff" />
            </View>
            {TimeSpans.map((item: TimeSpanItem) => (
              <TouchableOpacity
                key={item.name}
                style={styles.items}
                onPress={() => selectedTimeSpan(item)}
              >
                <Text style={styles.itemsText}>{item.name}</Text>
              </TouchableOpacity>
            ))}


            <TouchableHighlight
              style={{
                ...styles.openButton,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>关 闭</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Pressable
        style={styles.openButton}
        onPress={() => setModalVisible(true)}>
        <View style={styles.modalTitle} >
          <Text style={styles.textStyle}>{searchName}</Text>
          <MaterialIcons style={[modalVisible ? styles.arrowRight : '']} name="arrow-drop-down" size={40} color="#fff" />
        </View>
      </Pressable>
      {/*下面这种点击不舒服，有背景色*/}
      {/*<TouchableHighlight*/}
      {/*  style={styles.openButton}*/}
      {/*  onPress={() => {*/}
      {/*    setModalVisible(true);*/}
      {/*  }}>*/}
      {/*  <View style={styles.modalTitle} >*/}
      {/*    <Text style={styles.textStyle}>{searchName}</Text>*/}
      {/*    <MaterialIcons name="arrow-drop-down" size={40} color="#fff" />*/}
      {/*  </View>*/}
      {/*</TouchableHighlight>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    color: '#fff',
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalText: {
    textAlign: 'center',
    color: '#fff',
  },
  items: {
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemsText: {
    textAlign: 'center',
    fontSize: 17,
  },
  modalTitle: {
    flexDirection: 'row',
    alignItems:'center',
  },
  arrowRight: {
    transform: [{ rotate: '180deg' }],
  },
});

export default TrendingDialog;
