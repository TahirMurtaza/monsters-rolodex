import './App.css';
import { Component } from 'react';

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

    const {monsters,searchString} = this.state;
    const {onsearchChange} = this;
    
    const filteredMonster = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchString);
    });
    return (
      <div className="App">
        <input type="search" className='search-box' placeholder='search monsters' onChange={onsearchChange} />
        {filteredMonster.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>);
        })}
      </div>
    );
  }

}

export default App;
