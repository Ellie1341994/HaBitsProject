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

class App extends React.Component<AIP, AIS> {
    constructor(props: any) {
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
                <WebIndex className={"p-10 m-1 w-2/4 h-2/4 bg-yellow-50 rounded-xl shadow-lg  flex justify-center items-center  text-center"}
                          title={"HaBits"}
                          onPageChange={this.getPageTitle}/>
                <div className="flex w-2/4"
                     id="SLInterface">
                    <AuthUpInterface type={"Sign Up"}
                                     fields={["username","email","password"]}
                                     className={"m-1 w-2/4 rounded-xl shadow-lg bg-yellow-50 p-2"}/>
                    <AuthUpInterface type={"Log In"}
                                     fields={["username","password"]}
                                     className={"m-1 w-2/4 rounded-xl shadow-lg bg-yellow-50 p-2"}/>
                </div>
            </div>
        );
    }
};

class WebIndex extends React.Component< any > {
    constructor(props: any){
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
            <div className={this.props.className}>
                <h1 className=" text-7xl font-bold tracking-widest text-gray-700"> {this.props.title} </h1>
            </div>
        )
    }
};
class AuthUpInterface extends React.Component<any> {

    makeFieldsData() {
        const fieldNames: any = this.props.fields;
        const fieldsData: any = [];
        const inputContainerClasses = "rounded-lg p-1";
        const labelContainerClasses = "flex flex-row justify-start  items-center";
        let iType = ""

        for (let name of fieldNames) {
            name === "username" ? iType = "texT" : iType = name;

            fieldsData.push({ label: name[0].toUpperCase() + name.slice( 1 ),
                            labelClasses : labelContainerClasses,
                            iClasses: inputContainerClasses,
                            iPlaceholder: "Write a " + name,
                            iType : iType});
        }

        return fieldsData;
    }
    buildForm() {
        const fieldContainerClasses = "flex flex-row m-1 justify-between items-center";
        let fieldsData: any = this.makeFieldsData();
        const formElements: any = [];
        for (const data of fieldsData) {
            let formElement: any = (
                              <div className={ fieldContainerClasses }>
                                  <label htmlFor="" className={data.labelClasses}>{data.label}</label>
                                  <input type={data.iType}
                                    className={data.iClasses}
                                    placeholder={data.iPlaceholder}/>
                              </div>
                             )
                formElements.push(formElement)
        }
        const formBtn: any = <button className="text-shadow-sm m-1 w-full text-center text-3xl" type="submit">{this.props.type}!</button>
        formElements.unshift(formBtn);
        return <form action="">{formElements}</form>;
    }
    render() {
        return (
            <div className={this.props.className}>
                {this.buildForm()}
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
