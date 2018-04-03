# Drowsy

A lazy integration tool for RESTful interfaces

[![npm](https://img.shields.io/npm/v/drowsy.svg?style=flat-square)](https://www.npmjs.com/package/drowsy)
![travis](https://img.shields.io/travis/iainreid820/drowsy/master.svg?style=flat-square)

### Module description

This is the perfect tool for any prototype project or proof-of-concept application needing to integrate quickly with RESTful APIs, but it's also ideally suited as a convenience tool in larger projects that too rely on RESTful interfaces. Gone are the days of defining an API client with a restricted set of methods, and gone too are the days of boilerplate request handling in small and large code bases alike.

Drowsy just needs to know the hostname for the API you wish to consume, and off you go.

### Before you get started

Please note that this tool uses [Proxies](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy) internally, so unless you're able to shim this functionality suitably, you will need to use Node.js version 6.0.0 or greater.

### Simple usage examples

Below is a super simple example demonstrating how easy it can be to retrieve the first page of public Gists currently available on GitHub.

```javascript
const github = drowsy('https://api.github.com/')

github.getGists({
  headers: {
    'User-Agent': 'Octo-app'
  }
})
```

By calling the method `getGists` you're infact performing a GET request to the endpoint "/gists" through the default handler provided by Request. The handler returns a Promise that will, hopefully, resolve in a timely fashion with the first page of public Gists found on GitHub.

Notice that a User-Agent header was supplied when invoking the method. This is something that GitHub like to have in all requests hitting their public API, and could be optimised if more than one request is hoping to be made. As suggested previously, boilerplate code is a huge no-no whilst using Drowsy, so instead of the above example try this.

```javascript
const github = drowsy('https://api.github.com/', 'request', {
  headers: {
    'User-Agent': 'Octo-app'
  }
})

github.getGists()
```

Here we've defined a default list of headers for all future requests! Under the hood Drowsy has simply passed the configuration object that it recieved to the handler provided by Request, meaning that any of the parameters supported by Request, are also support by Drowsy. For more information on which parameters the Request module accepts you should have a quick look at [their documentation](https://www.npmjs.com/package/request).

