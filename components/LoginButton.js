import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';

export default function LoginButton(props) {
    return (
        <View>
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')} style={{ backgroundColor:props.backgroundColor }}  >
               {props.name}
            </Button>
        </View>
    )
}