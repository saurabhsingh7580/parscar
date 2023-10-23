import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { color, size } from '../../assets/theme/theme';
import Header from '../../components/PartInfection/Header';
import { useNavigation } from '@react-navigation/native';

const SelectInspactIssue = props => {
    const navigation = useNavigation();
    const { title, modalValues } = props.route.params;
    const { OrderId } = props.route.params;
    const HeaderName = title;
    const Status = 'Done';

    const [state, setState] = useState({
        SelectedValue: [],
        Check: {
            value: null,
        },
        StatusVisible: false,
    });

    const isCheck = () => {
        if (state.Check.value) {
            setState(prevState => ({
                ...prevState,
                StatusVisible: true,
            }));
        }
    };
    useEffect(() => {
        isCheck();
    }, [state.Check.value]);
    return (
        <View style={styles.container}>
            <Header
                HeaderName={HeaderName}
                OrderId={''}
                Status={Status}
                StatusVisible={state.StatusVisible}
                Screen={'InteriorInspact'}
                SelectedValue={state.Check.value}
            />
            <View style={styles.containerInner}>
                <TextInput
                    placeholder="Search"
                    style={styles.search}
                    placeholderTextColor={color.gray}
                />
                {modalValues.map(item => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                if (item == 'Ok') {
                                    navigation.navigate('InteriorInspact', { SelectedValue: item });
                                } else {
                                    let data = [];
                                    data.push(...state.SelectedValue, item);
                                    setState(prevState => ({
                                        ...prevState,
                                        Check: {
                                            ...prevState.Check,
                                            value: item,
                                        },
                                        SelectedValue: data,
                                    }));
                                }
                            }}
                            style={styles.list}>
                            <Text style={styles.text}>{item}</Text>
                            {state.Check.value === item ? (
                                <Image
                                    source={require('../../assets/icons/done.png')}
                                    style={styles.icon}
                                />
                            ) : null}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default SelectInspactIssue;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.secondary,
    },
    containerInner: {
        width: '90%',
        alignSelf: 'center',
    },
    search: {
        borderBottomWidth: 0.5,
        borderColor: color.gray,
        marginBottom: 20,
        fontSize: Platform.isPad ? size.font12 : size.font14,
        color: color.black,
    },
    list: {
        borderBottomWidth: 0.5,
        borderColor: color.gray,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: Platform.isPad ? size.font12 : size.font14,
        color: color.black,
        fontFamily: 'ITCAvantGardeStd-Bk',
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
});
