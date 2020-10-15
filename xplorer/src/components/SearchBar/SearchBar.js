import React from 'react';
import './SearchBar.css';



class SearchBar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      term: '',
      location: '',
      sprtBy: 'best_match'
    }

    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    };

    this.handleTermChange = this.handleTermChange.bind(this);

    this.handleLocationChange = this.handleLocationChange.bind(this);

    this.handleSearch = this.handleSearch.bind(this);
  }


  getSortByClass(sortByOption){
    if(this.state.sprtBy === sortByOption){
      return 'active';
    } 
    return '';
  }

  handleSortByChange(sortByOption){
    this.setState({sortBy: sortByOption })
  }

  handleTermChange(event){
    this.setState({term: event.target.value})
  }

  handleLocationChange(event){
    this.setState({location: event.target.value})
  }

  handleSearch(event){
      this.props.searchYelp(this.state.term,  this.state.location  , this.state.sprtBy);
      event.preventDefault();
    }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (<li className={this.getSortByClass(sortByOptionValue)}
                  key={sortByOptionValue}
                  onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                {sortByOption}
              </li>);
    });
  }
  componentDidMount(){
    return document.getElementsByClassName('myBtn')[0].disabled = true;
  }
  
  componentDidUpdate(){
    return document.getElementsByClassName('businessLocation')[0].value === '' ? document.getElementsByClassName('myBtn')[0].disabled = true : document.getElementsByClassName('myBtn')[0].disabled = false;
  }

    render() {
        return (
            <div className="SearchBar">
  
              <div className='example'>
                <ul >
                  <li>Restaurant</li>
                  <li>Gym</li>
                  <li>Mall</li>
                  <li>Park</li>
                </ul>
              </div>
              <div className="SearchBar-fields">
                <input className='businessSearch' onChange={this.handleTermChange} placeholder="Search Businesses" />
                <input className='businessLocation'  onChange={this.handleLocationChange} placeholder="Where? (Required)" />
              </div>
              <div className='SearchBar-submit'>
                <button className='myBtn' onClick={this.handleSearch}>Search</button>
                </div>
            </div>
        )
    }
}

export default SearchBar;