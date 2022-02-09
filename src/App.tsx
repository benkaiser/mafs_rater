import React from 'react';
import './App.css';
import Rater from './Rater';

interface AppProps {}

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return <div className="container">
      <Rater />
      <p className="footer">Made with <img width="16" src="images/heart-solid.svg" alt="love" /> by <a href="https://app.singlelink.co/u/benkaiser" target="_blank">Benjamin Kaiser</a></p>
    </div>;
  }
}

export default App;
