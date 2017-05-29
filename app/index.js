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

  // default browser implementation of sort appears not to be stable,
  // so equal values will flip flop
  sortByRecent(leadersArray) {
      return leadersArray.sort((a,b) => {
          return parseInt(b.recent) - parseInt(a.recent);
      });
  }

  sortByAlltime(leadersArray) {
      return leadersArray.sort((a,b) => {
          return parseInt(b.alltime) - parseInt(a.alltime);
      });
  }

  handleSortRecent() {
      this.setState({
        leaders: this.sortByRecent(this.state.leaders)
      });
  }

  handleSortAlltime() {
      this.setState({
        leaders: this.sortByAlltime(this.state.leaders)
      });
  }  

  render() {
    if(!this.state) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div>
            <button onClick={this.handleSortAlltime}>Sort Alltime</button>
            <button onClick={this.handleSortRecent}>Sort Recent</button>
            <Leaderboard leaders={this.state.leaders}/>
        </div>        
    );
  }
}

function Leaderboard(props) {
    const leaderElements = [];
    props.leaders.forEach(l => {
        leaderElements.push(
            <Leader key={l.username} data={l}/>
        )
    });
    return (
        <div>
            {leaderElements}
        </div>
    )
}

function Leader(props) {
    return (
        <div>
            {props.data.username}
        </div>
    )
}

ReactDom.render(
    <LeaderboardContainer />,
    document.getElementById("app")
);