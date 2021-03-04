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
      <h1 className="text-center heading">MAFS Rater<small>.com</small></h1>
      <Rater />
    </div>;
  }
}

export default App;
