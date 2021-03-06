import React from 'react';

class Spinner extends React.Component {
  constructor() {
    super();

    this.state = { frame: 1 };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        frame: this.state.frame + 1
      });
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let dots = this.state.frame % (this.props.dots + 1);
    let text = '';
    while (dots > 0) {
      text += '.';
      dots--;
    }
    return (
      <h3 className="bg-info text-white font-weight-bold">{text}&nbsp;</h3>
    );
  }
}

Spinner.defaultProps = {
  interval: 300,
  dots: 3
};

export default Spinner;
