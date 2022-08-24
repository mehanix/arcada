<p align="center">
  <img src="public/logo.png">
</p>

## Introduction

Even had to redesign a room, a floor, or your entire house, and you spent hours drawing floor plans by hand, on graph paper, trying to make sure your sofa will fit next to the dresser? I certainly have, and it's a frustrating experience. I think we can do better than that.

As the vast majority of floor planner apps are available as part of a paid service, or too complicated to use for my needs, I decided to write my own. 
Enter Arcada, an open-source floor planner app.

## Features
### 👷‍♀️ Add walls

<p>
  <img src="src/res/add-wall.gif">
</p>

### ⚒️ Edit walls

<p>
  <img src="src/res/edit-walls.gif">
</p>

### 🛋️ Add/edit furniture

<p>
  <img src="src/res/edit-furniture.gif">
</p>

### 🚪 Add doors/windows

<p>
  <img src="src/res/add-door.gif">
</p>

### 📏 Measure tool

<p>
  <img src="src/res/measure-tool.gif">
</p>

#### 🌟 Accurate to scale
#### 🌟 Multiple floor support
#### 🌟 Print your designs
#### 🌟 Save/load support
#### 🌟 Component library with plenty of options
#### 🌟 Cross-platform

## Tech stack
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
![Pixi.JS](https://img.shields.io/badge/Pixi.JS-EF2D5E?style=for-the-badge)

Client built using React, Pixi.js, Zustand, with Mantine as the component library for the UI. The floor plan engine is custom built. 

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Server-side powered by Express.js, using MongoDB with Mongoose as ODM. 

See server source-code on the [![arcada-backend repo](https://img.shields.io/badge/arcada--backend_repo-blue)](https://github.com/mehanix/arcada-backend)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://192.168.0.171:3000](http://192.168.0.171:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
