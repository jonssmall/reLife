var React = require("react");
var ReactDom = require("react-dom");

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
            <Leaderboard recentHandler={this.handleSortRecent} alltimeHandler={this.handleSortAlltime} leaders={this.state.leaders}/>
        </div>        
    );
  }
}

const sortStyle = {
    sort: {
        cursor: "pointer",
        color: "blue",
        textDecoration: "underline"
    },
    sortHover: {
        textDecoration: "none",
        textShadow: "1px 1px 1px #555"
    }
};

function Leaderboard(props) {
    const leaderElements = [];
    let rank = 0;
    props.leaders.forEach(l => {
        rank++
        leaderElements.push(
            <Leader rank={rank} key={rank} data={l}/>
        )
    });
    return (        
        <table className="pure-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>
                        <span onClick={props.recentHandler} style={sortStyle.sort}>Recent</span>
                    </th>
                    <th>
                        <span onClick={props.alltimeHandler} style={sortStyle.sort}>Alltime</span>                        
                    </th>
                </tr>
            </thead>
            <tbody>
                {leaderElements}
            </tbody>
        </table>
    )
}

function Leader(props) {
    return (        
        <tr>
            <td>{props.rank}</td>
            <td>{props.data.username}</td>
            <td>{props.data.recent}</td>
            <td>{props.data.alltime}</td>
        </tr>
    )
}

ReactDom.render(
    <LeaderboardContainer />,
    document.getElementById("app")
);