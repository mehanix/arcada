<p align="center">
  <img src="public/logo.png">
</p>

## Introduction

Even had to redesign a room, a floor, or your entire house, and you spent hours drawing floor plans by hand, on graph paper, trying to make sure your sofa will fit next to the dresser? I certainly have, and it's a frustrating experience. I think we can do better than that.

As the vast majority of floor planner apps are available as part of a paid service, or too complicated to use for my needs, I decided to write my own. 
Enter Arcada, an open-source floor planner app.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
![Pixi.JS](https://img.shields.io/badge/Pixi.JS-EF2D5E?style=for-the-badge)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

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

## Tech stack and docs

Client built using React, Pixi.js, Zustand, with Mantine as the component library for the UI. The floor plan engine is custom built. 

Server-side powered by Express.js, using MongoDB with Mongoose as ODM. 

[![server - source code](https://img.shields.io/badge/server-source_code-blue?style=for-the-badge)](https://github.com/mehanix/arcada-backend)
[![view - Documentation](https://img.shields.io/badge/view-Documentation-blue?style=for-the-badge)](/docs/ "Go to project documentation")

## Quick setup

Clone this repo and the `arcada-backend` repo. Run the following:
```
npm i 
npm run start
```

Launch the back-end using `node app.js`.

## Demo

[![Demo available - arcada.nicoleta.cc](https://img.shields.io/badge/Demo_available-arcada.nicoleta.cc-blue?style=for-the-badge)](https://arcada.nicoleta.cc)

