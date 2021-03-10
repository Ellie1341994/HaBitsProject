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
            <div className="font-serif flex flex-col justify-center items-center min-h-screen bg-yellow-200 text-gray-800">
                <Helmet>
                    <title>{this.state.pageTitle}</title>
                </Helmet>
                <WebIndex title={"HaBits"} onPageChange={this.getPageTitle}/>
                <div className="flex w-2/4" id="SLInterface">
                    <SignUpInterface className={"m-1 w-2/4 rounded-xl shadow-lg bg-yellow-50 p-2"}/>
                    <LogInInterface className={"m-1 w-2/4 rounded-xl shadow-lg bg-yellow-50 p-2"}/>
                </div>
            </div>
        );
    }
};

class WebIndex extends React.Component<IP, IS> {
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
            <div className="p-6 w-2/4 h-2/4 bg-yellow-50 rounded-xl shadow-lg  flex justify-center items-center  text-center">
                <h1 className=" text-7xl font-bold tracking-widest text-gray-700"> {this.props.title} </h1>
            </div>
        )
    }
};
class LogInInterface extends React.Component<any> {
    render() {
        return (
            <div className={this.props.className}>
                <form id="logInForm" className="flex flex-col" action="" method="post">
                    <label htmlFor="">E-Mail
                        <input className="m-1 rounded-xl p-1" type="text" placeholder="Enter Your electronic mail" id="username"/>
                    </label>
                    <label htmlFor="">Password
                        <input className="m-1 rounded-xl p-1 " type="password" placeholder="Enter your secret sequence of characters" name="password" id="password"/>
                    </label>
                    <button className="text-shadow-sm text-3xl m-1 text-3xl" form="logInForm" type="submit">Log In!</button>
                </form>
            </div>
        )
    }
}
class SignUpInterface extends React.Component<any> {
    render() {
        return ( 
            <div className={this.props.className}>
                <form className="flex flex-col" action="" method="post">
                    <label htmlFor="">E-Mail
                        <input className="m-1 rounded-xl p-1" type="email" placeholder="Your electronic mail" id="email"/>
                    </label>
                    <label htmlFor="">Password
                        <input className="m-1 rounded-xl p-1" type="password" placeholder="Write a secret sequence of characters" name="password" id="password"/>
                    </label>
                    <button className="text-shadow-sm m-1 text-3xl" type="submit">Sign Up!</button>
                </form>
            </div>
        )
    }
}
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
