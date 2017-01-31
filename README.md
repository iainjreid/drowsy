# Drowsy

Lazy integrations tool for RESTful interfaces

[![npm](https://img.shields.io/npm/v/drowsy.svg?style=flat-square)](https://www.npmjs.com/package/drowsy)

### Description

This is the perfect tool for any prototype project or proof-of-concept application needing to integrate quickly with Third-party APIs, but it's also ideally suited as a convenience tool in larger projects. Gone are the days of defining an API client with restricted and sets of methods, and gone too are the days of boilerplate request handling in small or large code bases.

Drowsy just needs to know the hostname for the API you wish to interface with, and off you go.

### Usage

Below is a super simple example demonstrating how to retrieve the first page of public Gists available on GitHub.

```javascript
const github = drowsy('https://api.github.com/')

// Retrieve a list of public Gists from GitHub
github.getGists({
  headers: {
    "User-Agent": "Octo-app"
  }
})
```

By calling the method `getGists` you are infact performing a GET request to the endpoint "/gists" through the default handler provided by Request. The handler returns a Promise that will, hopefully, resolve in a timely fashion with the first page of public Gists found on GitHub.

Notice that a User-Agent header was supplied as an argument to the method. This is something that GitHub like to have in all requests hitting their public API, and could be optimised if more than one request is hoping to be made. As said previously, boilerplate code is a huge no-no whilst using this library, so instead of the above example try this.

```javascript
const github = drowsy('https://api.github.com/', 'request', {
  headers: {
    "User-Agent": "Octo-app"
  }
})

github.getGists()
```

Here we have defined a default list of headers for all future requests.

