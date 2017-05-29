var React = require("react");
var ReactDom = require("react-dom");

// [
//   {
//     "username": "diomed",
//     "img": "https://avatars3.githubusercontent.com/u/72777?v=3",
//     "alltime": 4339,
//     "recent": 529,
//     "lastUpdate": "2017-05-28T17:18:21.890Z"
//   },
//   {
//     "username": "sjames1958gm",
//     "img": "https://avatars.githubusercontent.com/u/4639625?v=3",
//     "alltime": 7186,
//     "recent": 516,
//     "lastUpdate": "2017-05-28T17:18:02.664Z"
//   },
// ]

class LeaderboardContainer extends React.Component {
  constructor(props) {
    super(props);    
    this.handleSortRecent = this.handleSortRecent.bind(this);
    this.handleSortAlltime = this.handleSortAlltime.bind(this);    
  }  

  componentDidMount() {
    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
    .then(response => {        
        this.setState({leaders: response.data});
    })
    .catch(error => {
        console.log(error);
    });
  }

  handleSortRecent() {
      this.setState({
        leaders: sortByRecent(leaders)
      });
  }

  handleSortAlltime() {
      this.setState({
        leaders: sortByAlltime(leaders)
      });
  }

  sortByRecent(leadersArray) {
      return leadersArray.sort((a,b) => {
          return parseInt(a.recent) - parseInt(b.recent);
      });
  }

  sortByAlltime(leadersArray) {
      return leadersArray.sort((a,b) => {
          return parseInt(a.alltime) - parseInt(b.alltime);
      });
  }

  render() {
    if(!this.state) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <Leaderboard leaders={this.state.leaders}/>
    );
  }
}

function Leaderboard(props) {
    return (
        <div>{JSON.stringify(props)}</div>
    )
}

ReactDom.render(
    <LeaderboardContainer />,
    document.getElementById("app")
);