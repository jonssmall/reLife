var React = require("react");
var ReactDom = require("react-dom");

const boardParams = {
  width: 70,
  height: 50,
  generation: 0
};

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state({
      width: props.width,
      height: props.height,
      generation: props.generation
    });
  };

  componentDidMount() {

  };

  render() {
    return (
      <div>
        Hello, Life.
      </div>
    );
  };
}

ReactDom.render(
  <GameContainer {...boardParams} />,
  document.getElementById("app")
);