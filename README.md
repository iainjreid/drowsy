# Drowsy

Lazy integrations tool for RESTful interfaces

[![npm](https://img.shields.io/npm/v/drowsy.svg?style=flat-square)](https://www.npmjs.com/package/drowsy)

### Description

This is the perfect tool for any prototype project, or proof of concept application. Gone are the days of defining an API client with restricted methods, and gone too are the days of boilerplate request handling in small or large code bases.

Simply define the hostname for the API you wish to interface with, and off you go.

### Usage

```javascript
const api = drowsy('https://api.github.com/')

// Retrieve a list of public Gists from GitHub
api.getGists()
```

