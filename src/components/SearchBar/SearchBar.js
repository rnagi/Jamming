import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.state = {term:''};
    }

    handleTermChange(e){
       // console.log(e.target.value);
        this.setState({term: e.target.value});   
    }

    search(term) {
       // console.log('pressed search button in Search Bar Compononent');
        this.props.onSearch(this.state.term);
    }

    render() {
        return (
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
                <a onClick={this.search} >SEARCH</a>
            </div>
        )
    }
}

export default SearchBar;