import React from 'react';

type State = {
  today: Date;
};

type Props = {
  name: string;
};

export class Clock extends React.PureComponent<Props> {
  state: State = {
    today: new Date(),
  };

  interval: number | null = null;

  handleTimeChange = () => {
    this.setState({ today: new Date() });

    // eslint-disable-next-line no-console
    console.log(new Date().toUTCString().slice(-12, -4));
  };

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.name !== this.props.name) {
      // eslint-disable-next-line no-console
      console.warn(`Renamed from ${prevProps.name} to ${this.props.name}`);
    }
  }

  componentDidMount(): void {
    this.interval = window.setInterval(this.handleTimeChange, 1000);
  }

  componentWillUnmount(): void {
    if (this.interval !== null) {
      window.clearInterval(this.interval);
    }
  }

  render() {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.name}</strong>

        {' time is '}

        <span className="Clock__time">
          {this.state.today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
