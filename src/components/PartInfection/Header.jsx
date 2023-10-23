import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { color, size } from '../../assets/theme/theme';
import { useNavigation } from '@react-navigation/native';

const Header = ({ HeaderName, OrderId, Status, StatusVisible, Screen,SelectedValue }) => {
    console.log(Status, '///////////')
    const navigation = useNavigation()
    const handleBack = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <View style={styles.containerInner}>
                <View style={styles.inner}>
                    <Icon
                        name="arrow-back-outline"
                        size={Platform.isPad ? size.font18 : size.font24}
                        color={color.white}
                        onPress={handleBack}
                    />
                    <View style={styles.content}>
                        <Text style={styles.text}>{HeaderName}</Text>
                        {OrderId === '' ? null :
                            <Text style={styles.order}>{OrderId}</Text>}
                    </View>
                </View>
                <TouchableOpacity
                    disabled={StatusVisible === true ? false : true}
                    onPress={() => {
                        navigation.navigate(Screen, { OrderId: OrderId, Status: Status,SelectedValue:SelectedValue });
                    }}>
                    <Text
                        style={[
                            styles.status,
                            {
                                opacity: StatusVisible === true ? 1 : 0.5,
                            },
                        ]}>
                        {Status}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Platform.isPad ? 60 : 40,
        backgroundColor: color.primary,
    },
    containerInner: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        marginLeft: 20,
    },
    text: {
        fontSize: Platform.isPad ? size.font12 : size.font14,
        color: color.white,
        textTransform: 'capitalize',
        fontFamily: 'ITCAvantGardeStd-Bk',
    },
    order: {
        fontSize: Platform.isPad ? size.font10 : size.font12,
        color: color.white,
        textTransform: 'capitalize',
        fontFamily: 'ITCAvantGardeStd-Bk',
        lineHeight: Platform.isPad ? 30 : 20,
        opacity: 0.6,
    },
    status: {
        fontSize: Platform.isPad ? size.font12 : size.font14,
        color: color.white,
        textTransform: 'uppercase',
        fontFamily: 'ITCAvantGardeStd-Bk',
        lineHeight: Platform.isPad ? 30 : 20,
        opacity: 0.6,
    },
});
