import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../../assets/theme/theme'
import BackHeader from '../../components/BackHeader'
import axios from 'axios'
import { Url } from '../../utils/Urls'

const Insurance = () => {
    const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Url.InsuranceInfo);
        setData(response.data);
        console.log(response.responseHeaders.timeout,'*******')
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(data)

  return (
    <View style={styles.container}>
        <BackHeader  title = 'Insurance Info' subTitle ='' />
      <Text>Insurance</Text>
    </View>
  )
}

export default Insurance

const styles = StyleSheet.create({
    container : {
        backgroundColor:color.secondary
    }
})