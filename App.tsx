import React from "react";
import {ThemeProvider} from "styled-components/native";
import theme from "./theme";
import Container from "./components/Container";
import DataInput from "./components/DataInput";
import {Provider} from 'react-redux'
import store from "./store/store";
import Visualisation from "./components/Visualisation";
import {SafeAreaView} from "react-native";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <SafeAreaView>
                    <Container height="100%" p={20}>
                        <DataInput/>
                        <Visualisation/>
                    </Container>
                </SafeAreaView>
            </Provider>
        </ThemeProvider>

    );
}

