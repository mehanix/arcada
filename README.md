<p align="center">
  <img src="public/logo.png">
</p>

## Introduction

Even had to redesign a room, a floor, or your entire house, and you spent hours drawing floor plans by hand, on graph paper, trying to make sure your sofa will fit next to the dresser? I certainly have, and it's a frustrating experience. I think we can do better than that.

As the vast majority of floor planner apps are available as part of a paid service, or too complicated to use for my needs, I decided to write my own. 
Enter Arcada, an open-source floor planner app.


[![Demo - arcada.nicoleta.cc](https://img.shields.io/badge/Demo_available-arcada.nicoleta.cc-blue?style=for-the-badge)](https://arcada.nicoleta.cc)


![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB) 
![Pixi.JS](https://img.shields.io/badge/Pixi.JS-EF2D5E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3de5b28f-5cc8-4fbf-a6d8-6b89a941ebf4/deploy-status)](https://app.netlify.com/projects/mellow-cobbler-3a9fb9/deploys)

<img width="600" height="500" alt="image" src="https://github.com/user-attachments/assets/bb9949c1-8c95-4c5b-a805-a06c55689d3c" />

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
<p>
  <img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/8ffb23a8-d9a4-46e4-8875-85360cdfce19" />
</p>

#### 🌟 Print your designs
<img width="600" height="500" alt="image" src="https://github.com/user-attachments/assets/d12ea2ac-94f1-457a-96c0-b6fa15300759" />

#### 🌟 Save/load support

<p>
  <img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/1fcf9aa3-48a4-4208-ac12-fdc323dbe9b1" />
</p>

#### 🌟 Component library with plenty of options

<p>
  <img width="250" height="500" alt="image" src="https://github.com/user-attachments/assets/76cb0f3f-78fc-44a6-8b1b-a69ce17fc936" />

</p>

#### 🌟 Cross-platform

## Tech stack and docs

Client built using React, Pixi.js, Zustand, with Mantine as the component library for the UI. The floor plan engine is custom built. 

Server-side powered by Express.js, using MongoDB with Mongoose as ODM. 

[![server - source code](https://img.shields.io/badge/server-source_code-blue?style=for-the-badge)](https://github.com/mehanix/arcada-backend)
[![view - (New!) Documentation](https://img.shields.io/badge/view-Documentation-blue?style=for-the-badge)](https://github.com/mehanix/arcada/blob/4ab6e5d267bd901d2c8b962a782df3f422358d86/docs/Docs%20-%20Bachelor's%20thesis.pdf "Go to project documentation")

## Quick setup

If you want to run the app for yourself the easiest way to to is to use the following [docker-compose setup](https://github.com/perguth/arcada-setup). Have fun!

Alternatively:

Clone this repo and the `arcada-backend` repo. Run the following:
```
npm i 
npm run start
```

Launch the back-end using `node app.js`.
