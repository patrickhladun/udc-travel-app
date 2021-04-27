import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import './styles/style.scss';

const store = createStore((state = {trips: {}}) => {
    return state;
});

store.dispatch({
    type: 'ADD_TRIP'
});

console.log(store.getState());

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <AddTrip />
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app') );