# HaBits 
## Introduction
HaBits is a Web Application that can help you build habits and track data related to them

## Features
- Habits tracking by daily reviews
- Habit reviews easily visualized
- Responsive behaviour
- Clean and attractive Design
- Light and Dark Mode

## Description
The HaBits Web Aplication allows to store chronological information about one's habit by reviewing the day that that habit was scheduled. The stored data can be visualized on a Calendar Panel whose entries are colored by how the user had described its humour at the time of the habit review.
Finally, the Calendar entries are all clickable and will display more information about that particular review.

## Application Previews
- [Demonstrations On YouTube](https://www.youtube.com/playlist?list=PL5-tfLwc7d7HnUji9f3UjgYvCu4KNwOsT)
    <div>
<a href="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p1.png?raw=true">
    <img src="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p1.png?raw=true" width="25%"/>
</a>
<a href="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p2.png?raw=true">
    <img src="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p2.png?raw=true" width="25%"/>
</a>
<a href="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p3.png?raw=true">
    <img src="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p3.png?raw=true" width="25%"/>
</a>
<a href="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p4.png?raw=true">
    <img src="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p4.png?raw=true" width="20%"/>
</a>
<div>
    <div>
<a href="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p7.png?raw=true">
    <img src="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p7.png?raw=true" width="25%"/>
</a>
<a href="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p6.png?raw=true">
    <img src="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p6.png?raw=true" width="25%"/>
</a>
<a href="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p5.png?raw=true">
    <img src="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p5.png?raw=true" width="25%"/>
</a>
<a href="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p8.png?raw=true">
    <img src="https://github.com/Ellie1341994/HaBitsProject/blob/main/AppScreenshots/p8.png?raw=true" width="25%"/>
</a>
<div>

## Instructions
### for Users
In order to be able to take advantage of the Application features
an account is needed.
To create an account you need a username, a password and a third-party e-mail provider. You
can do so, by clicking on the link named "Sign Up instead" at the bottom of the form, which will show the Sign Up form.
Once an account is created it can be accessed to start adding and tracking habits in addition to make use of the graphical calendar to visualize a habits data

### Application Installation for Developers
In Linux Ubuntu 20 with Python 3.8.5 installed, run the following commands to install all the projects dependencies in the directory you want the project on
```
clone https://github.com/Ellie1341994/HaBitsProject HaBitsProject
cd HaBitsProject
pip3 install --user pipenv
pipenv install -dev
./manage migrate
./manage testData
cd habitsreactclient
npm install
```
In order to run the server in dev mode execute (assuming you're in the HaBitsProject directory)
```
python3 manage.py runserver
```
and to run the creat-react-app in dev mode (assuming you're in the habitsreactclient directory)
```
npm run start
```

## Technologies used to build this Web Application
### Server Side
- [DJango](https://www.djangoproject.com/start/overview/)
- [DJango Rest](https://www.django-rest-framework.org/)
- [Dj-rest-auth](https://dj-rest-auth.readthedocs.io/en/latest/index.html)
- [DJango-cors-headers](https://github.com/adamchainz/django-cors-headers)
- [DJango-allauth](https://django-allauth.readthedocs.io/en/latest/index.html)

### Client Side
- [H.T.M.L](https://html.spec.whatwg.org/)
- [C.S.S](https://www.w3.org/Style/CSS/specs.en.html)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/docs/handbook/jsx.html)
- [React](https://reactjs.org/)
- [Create React App](https://create-react-app.dev/docs/adding-typescript/)
- [Axios](https://www.npmjs.com/package/axios)
- [React-Helmet-Async](https://www.npmjs.com/package/react-helmet-async?activeTab=readme)
- [Nivo Charts](https://nivo.rocks/)
- [Chakra UI](https://chakra-ui.com/)
- [Framer Motion](https://www.framer.com/api/motion/)
- [React-Router](https://www.framer.com/api/motion/)

## Other
This project was started as the capstone assignment of [CS50 Web Programming with Python and JavaScrpt course](https://www.edx.org/course/cs50s-web-programming-with-python-and-javascript)
Special thanks to Peter that I met on this course who helped me build this App
