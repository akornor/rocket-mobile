import React, { Component } from 'react';
import { View, Text, ScrollView, NativeModules, Platform } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

@withNavigation
class MovieTimes extends Component{
    _onPress = () =>{
        this.props.navigation.navigate('Presale', {movieId: this.props.movieId, info: this.props.info})
        // if (Platform.OS === 'ios') {
        //   NativeModules.StatusBarManager.setHidden(false, 'slide');
        // }
    }
    renderCards(){
        const data = this.props.data || [{id: 1, name: "Silverbird Cinema", movietimes: ["10:00a", "11:20a", "12:20p", "01:30p"]}, {id: 2, name: "Global Cinema", movietimes: ["10:00a", "11:20a", "12:20p", "10:00p"]}, {id: 3, name: "Silverbird Cinema Weija", movietimes: ["10:00a", "11:20a", "12:20p", "01:30p"]}, {id: 4, name: "Poop Town Cinema", movietimes: ["10:00a", "11:20a", "12:20p", "01:30p"]}]
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
                                padding:1,
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