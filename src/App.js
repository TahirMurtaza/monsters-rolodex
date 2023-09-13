import './App.css';
import { Component } from 'react';
import CardList from './components/card-list/card-list-component';
import SearchBox from './components/search-box/search-box-component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchString: '',

    }
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then(((users) =>
        this.setState(
          () => {
            return { monsters: users }
          },
          () => console.log(users))));
  }
  onsearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase()
    this.setState(() => { return { searchString: searchField } });
  }
  render() {

    const { monsters, searchString } = this.state;
    const { onsearchChange } = this;

    const filteredMonster = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchString);
    });
    return (
      <div className="App">
        <h1 className='app-title'>Monster Rolodex</h1>
        <SearchBox onChangeHandler={onsearchChange} />

        <CardList monsters={filteredMonster} />
      </div>
    );
  }

}

export default App;
