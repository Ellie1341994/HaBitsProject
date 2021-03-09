import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { Helmet } from 'react-helmet';

interface IP {
    title: string;
    onPageChange: any;
}

interface IS {
    links: Object;
}

interface AIP {}
interface AIS {
    pageTitle : string
}

class App extends React.Component<AIP, AIS> { constructor(props: any) {
        super(props);
        this.state = { pageTitle : "HaBits ~ Track & Trace" }
        this.getPageTitle = this.getPageTitle.bind(this)
    }

    getPageTitle(title: string) {
        //this.setState((state: any, props: any) => ({pageTitle: state.pageTitle + title}));
        this.setState({pageTitle: this.state.pageTitle + title});
    }
    render () {
        return (
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>{this.state.pageTitle}</title>
                </Helmet>
                <WebSiteIntro title={"HaBits"} onPageChange={this.getPageTitle}/>
            </div>
        );
    }
};

class WebSiteIntro extends React.Component<IP, IS> {
    constructor(props: IP){
        super(props);
        this.state = { links : {}};
        this.setPageTitle = this.setPageTitle.bind(this);
    }


    componentDidMount() {
        this.getIndex();
        this.setPageTitle();
    }

    setPageTitle() {
        this.props.onPageChange(" ~ Intro")
    }

    getIndex() {
        axios
            .get("http://127.0.0.1:8000")
            .then( res => this.setState({ links : res.data }))
            .catch( e => console.log(e));
    }

    render() {
        return (
            <div className="p-6 bg-color-yellow max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center txt-center space-x-4">
                <h1 className="">
                    Welcome to {this.props.title}
                </h1>
                <ul className="">
                    {Object
                        .keys(this.state.links)
                            .map(link =>
                                <li key={link}>{ link }</li>
                            )
                    }
                </ul>
            </div>
        )
    }
};


ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
