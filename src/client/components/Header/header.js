import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/background', {method: 'GET'})
        .then(response => response.json())
        .then(response => {
            this.setState({
                url: response.url
            })
        });
    }

    render() {
        return (
            <div 
                style={{backgroundImage: `url(${this.state.url})`}}
                className='header'
            >
                <h1>This is the header</h1>
            </div>
        )
    }
}

export default Header;