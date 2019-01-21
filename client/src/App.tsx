import * as React from 'react';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <HelloWorld tech={"test"}/>
    );
  }
}

interface WelcomeProps {
    tech: string,
}

const HelloWorld: React.SFC<WelcomeProps> = ({tech}) => (
    <div>Hello world with {tech} </div>
);

HelloWorld.defaultProps = {
    tech: "No tech :("
};

export default App;
