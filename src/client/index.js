import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Geonames from './components/geonames';
import './styles/style.scss';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Geonames />
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app') );