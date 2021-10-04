# cnft-python front-end

This repo enables the use of react as frontend integrated with django apps to run in the backend python scripts. 
##

### Configure Django

Assuming that main prerequesites like python3, pip3, virtualenv and virtualenvwrapper are installed and configured.

    mkdir cnft-python-front
    cd cnft-python-front
    mkvritualenv cnft-front

With the virtual environment active....

    pip install django
    django-admin.py startproject cnft-python-front
    python3 manage.py migrate
    python3 manage.py createsuperuser

Test Django installation

    python3 manage.py runserver

    python3 manage.py startapp backend
    python3 manage.py startapp react

    pip3 install djangorestframework

In backend/models.py

```python
from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=70)

    def __str__(self):
        return title
```
Create new file serializers.py

In backend/serializers.py

```python
from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title',)
```
In backend/views.py

```python
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import TodoSerializer

from .models import Todo
# Create your views here.


class TodoListView(generics.ListAPIView):
    model = Todo
    serializer_class = TodoSerializer
```
In backend/urls.py

```python
from django.urls import path
from .views import TodoListView

urlpatterns = [
    path('todo', TodoListView.as_view()), 
]
```
Add to the settings.py the new apps

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # add this

    'rest_framework',
    'backend',
    'react',
    # .....

]
```
##
### Configure React

    yarn install
    npm init -y
    npm install @babel/core @babel/preset-env @babel/preset-react babel-loader react react-dom react-router-dom webpack webpack-cli react-bootstrap

In the react application folder....

    mkdir templates
    cd templates
    mkdir react
    cd react
    touch index.html

Index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Starter template</title>
    {% load static %}
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <link rel="stylesheet" type="text/css" href="{% static "css/index.css" %}"
    />
  </head>
  <body>
    <div id="main">
      <div id="app"></div>
    </div>

    <script src="{% static "react/main.js" %}"></script>
  </body>
</html>
```
Back to the react application folder...

    mkdir -p static/css/index.css
    mkdir -p static/react
    mkdir -p src/components/App.js
    mkdir -p src/components/HomePage.js
    cd src
    touch index.js

In src/index.js

```javascript
import App from "./components/App";
```
src/components/App.js
```javascript
import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HomePage />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
```
src/components/HomePage.js
```javascript
import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <p>This is the home page</p>
          </Route>
         
        </Switch>
      </Router>
    );
  }
}
```
Back to the react application folder...

touch babel.config.json
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "10"
        }
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```
touch webpack.config.js
```javascript
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
};
```
Edit the package.json file in the scripts section
```json
  "scripts": {
    
  "dev": "webpack --mode development --watch",
   
  "build": "webpack --mode production"
   
 
  },
  ```
Now some modifications in django files inside react app

react/views.py
```python
from django.shortcuts import render


def index(request, *args, **kwargs):
    return render(request, 'react/index.html')
```
react/urls.py
```python
from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
  
]
```
Back to the django project folder

cnft-python-front/urls.py
```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('backend/', include('backend.urls')),
    path('', include('react.urls'))
```
##
### Testing the app

In the react application folder...

    npm run dev

Start the django project

    python3 mange.py runserver



