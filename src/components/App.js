import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './common';
import LoginForm from './LoginForm';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: null
        }
    }

    componentWillMount() {
        let config = {
            apiKey: "AIzaSyDTpphAXcKt2LL5q_-5JknemV1b2OSdOMQ",
            authDomain: "auth-b9760.firebaseapp.com",
            databaseURL: "https://auth-b9760.firebaseio.com",
            projectId: "auth-b9760",
            storageBucket: "auth-b9760.appspot.com",
            messagingSenderId: "864929195087"
        };
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ loggedIn: user ? true : false })
        })
    }

    handleLogOutPress() {
        firebase.auth().signOut();
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={ this.handleLogOutPress }>
                            Log out
                        </Button>
                    </CardSection>
                );

            case false:
                return <LoginForm />;

            default:
                return (
                    <CardSection>
                        <Spinner size="large" />
                    </CardSection>
                );
        }


    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                { this.renderContent() }
            </View>
        )
    }
}

export default App;