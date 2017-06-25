var React = require("react");
var ReactDom = require("react-dom");

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
  }  

  componentDidMount() {
    
  }

  render() {
    // if(!this.state) {
    //     return (
    //         <div>Loading...</div>
    //     )
    // }
    return (
        <div>            
            Hello, Life.
        </div>        
    );
  }
}

ReactDom.render(
    <GameContainer />,
    document.getElementById("app")
);