<p align="center">
  <img src="./.oratory/logo.png" width="560px" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/drowsy">
    <img src="https://img.shields.io/npm/v/drowsy.svg?style=flat-square" />
  </a>
  <a href="https://travis-ci.org/iainreid820/drowsy">
    <img src="https://img.shields.io/travis/iainreid820/drowsy/master.svg?style=flat-square" />
  </a>
  <a href="https://codecov.io/gh/iainreid820/drowsy">
    <img src="https://img.shields.io/codecov/c/github/iainreid820/drowsy.svg?style=flat-square" />
  </a>
  <a href="https://lgtm.com/projects/g/iainreid820/drowsy">
    <img src="https://img.shields.io/lgtm/grade/javascript/github/iainreid820/drowsy.svg?style=flat-square">
  </a>
  <a href="#">
    <img src="https://img.shields.io/depfu/iainreid820/drowsy.svg?style=flat-square" />
  </a>
</p>

## Description

Drowsy is a universal REST client that can make integrating with an API wonderfully simple, and it takes little to no
time at all to setup. Here's a super small example of just how easy it can be to create an API client for virtually
_any_ RESTful interface!

```javascript
const github = drowsy(request, "https://api.github.com/");

github.getGists({
  headers: {
    "User-Agent": "Octo-app"
  }
});
```

In this example we've targeted the GitHub API, and we're trying to pull down a list of Gists. With a little magic,
thanks to Proxies, Drowsy is able to interpret function calls as a combination of request method, and pathname. So as
you can guess from the above, we've just made a GET request to the GitHub API "/gists" endpoint.

> Featured on [Changelog](https://changelog.com/news/drowsy-the-laziest-rest-client-youll-ever-see-wwn0)

## Usage

Setting up a Drowsy client is really easy, pick your favourite request handler, and you're off. Given it's popularity,
we're going to use Request in these examples.

```javascript
const apiClient = drowsy(request, "https://api.example.com")
```

## License

This _awesome_ project is released under the [MIT License](./LICENSE). Enjoy responsibly ✌️
