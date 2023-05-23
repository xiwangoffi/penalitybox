import React from 'react';
import Home from './pages/Home';
import { StyleSheet, Text, View } from 'react-native';
import { BrowserRouter as Router, Switch, Route, useParams, } from "react-router-dom";

export default function App(props) {
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

<Route path="article/:id" children={<Article />} />

function Article() {
  let {id} = useParams();

  return(
    <View>
      <Text>ID: {id}</Text>
    </View>
  )
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/