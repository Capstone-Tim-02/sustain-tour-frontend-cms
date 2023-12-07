# DESTIMATE FRONTEND - CMS
<img src='public/cms-destimate.png'>

## Table of Contents
- [Project Description](#project-desctiption)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributors](#contributors) 

## Project Description
The CMS Destimate is a web application designed to effectively manage content for the Destimate mobile application and serves as a centralized platform for organizing and updating related to tours and user account settings. 

## Features
- View Dashboard
- Manage User Detail
- Manage User Routes
- Manage Contents
- Manage Destination
- Add Custom Data for OpenAI (AI Implementation) 

## Installation
To get started with the CMS Destimate, follow these steps:

1. Clone the Repository
    ```shell
    git clone https://github.com/Capstone-Tim-02/sustain-tour-frontend-cms.git
    ```    
2. Installation
    ```shell
    cd sustain-tour-frontend-cms
    npm install
    ```
3. Run the Application
    ```shell
    npm run dev
    ```

## Configuration

Please create a .env or .env.local file in the root of your project and fill it with this criteria
```
VITE_BASE_URL_API="Your API Key"
```

## Project Structure
Most of the code lives in the `src` folder and looks like this:

```sh
src
|
+-- apis              # all APIs used for feature integration
|
+-- assets            # assets folder can contain all the static files such as images, etc
|
+-- components        # shared components used across the entire application
|
+-- configs           # saving common configuration modules or external modules
|
+-- features          # features based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # all reusable modules or libraries used within the project
|
+-- providers         # all of the application providers
|
+-- routes            # routes configuration
|
+-- services          # all service logic for interating with data or external resources
|
+-- stores            # global state stores
|
+-- utils             # shared utility functions
```

## Deployment
This project is deployed using netlify. You can access the production deployment at [this link](https://cms-destimate.netlify.app).

### Contributors
- July Dwi Saputra
- Angga Saputra
- Agung Nurprasetya Putra
- Almira Eka Putri Maharani
- Alfitra Fadjri
- Ahmad Rizky Has
- Maulidaturrohmah
- Ganang Aji Suseno