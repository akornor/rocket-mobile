import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation';

@withNavigation
class MovieTimes extends Component{
    _onPress = () =>{
        console.log('sweet')
        this.props.navigation.navigate('Presale')
    }
    renderCards(){
        const data = this.props.data || [{id: 1, name: "Silverbird Cinema", movietimes: ["10:00a", "11:20a", "12:20p", "01:30p"]}, {id: 2, name: "Poop Town Cinema", movietimes: ["10:00a", "11:20a", "12:20p", "10:00p", "10:00b"]}, {id: 3, name: "Silverbird Cinema", movietimes: ["10:00a", "11:20a", "12:20p", "01:30p"]}, {id: 4, name: "Silverbird Cinema", movietimes: ["10:00a", "11:20a", "12:20p", "01:30p"]}]
        if(!data){
            return(
                <Card
                title="Movie times currently unavailable"
                />
            )
        }
        return data.map((item) =>{
            return(
                <Card
                key={item.id}
                title={item.name}
                containerStyle={{backgroundColor: "black"}}
                titleStyle={{ color: "white", fontWeight: "bold"}}
                >
                <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexDirection: "row", justifyContent: "space-around", flex: 1}}
                >
                {
                    item.movietimes.map(a =>{
                        return(
                            <Button
                            title={a}
                            key={a}
                            onPress={this._onPress}
                            // disabled={true}
                            titleStyle={{
                                fontWeight: "bold",
                                fontSize: 13
                            }}
                            disabledTitleStyle={{
                                fontSize: 13
                            }}
                            buttonStyle={{
                                backgroundColor: "#EA0000",
                                borderRadius: 5,
                            }}
                            />
                        )
                        
                    })
                }
                </ScrollView>
                </Card>
            )
            
        })
    }

    render(){
        return (
            <View>
            {this.renderCards()}
            </View>
        )
        
    }
}
export default MovieTimes;