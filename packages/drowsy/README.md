<p align="center">
  <a href="#">
    <img src="https://cdn.jsdelivr.net/gh/emphori/drowsy@master/.github/logo-175x122@2x.png" width="175px" />
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/drowsy">
    <img src="https://img.shields.io/npm/v/drowsy.svg?style=flat-square" />
  </a>
  <a href="https://codecov.io/gh/Emphori/drowsy">
    <img src="https://img.shields.io/codecov/c/github/Emphori/drowsy.svg?style=flat-square" />
  </a>
  <a href="https://lgtm.com/projects/g/Emphori/drowsy">
    <img src="https://img.shields.io/lgtm/grade/javascript/github/Emphori/drowsy.svg?style=flat-square" />
  </a>
</p>

Drowsy is a universal REST client that makes integrating with services so
wonderfully simple, you'll probably forget you're talking to an API after all.
Think gRPC or SOAP, but for REST.

## Description

A hugely versatile REST client and server interface, that lets you extend
libraries like Request, Express, Axios, Fastify, and many more, largely by
removing the need for the boilerplate code often inherent when using these
tools.

At its heart, Drowsy builds upon a common design pattern found in the majority
of the HTTP related tools that the community has to offer. More often than not,
the pattern looks like this.

```javascript
library.get(url[, options][, cb])
```

> This was likely inspired by the original Node.js HTTP module

Drowsy is able to simplify the above by hoisting both the method and URL into
the function name, providing a more gRPCesque interface, and cutting out any
hardcoded URL strings.

```javascript
API.getPing([, cb]);
```

This is an incredibly powerful abstraction, and one that can be stacked
endlessly. This easily leads to even further optimisations, allowing your REST
client or server to be treated as though it was nothing more than a large object
of functions.

```javascript
var UsersAPI = API.users

// Call GET hostname/users/all
UsersAPI.getAll([, cb])

// Call POST hostname/users/<userId>
UsersAPI.post[userId](options[, cb])
```

These function calls are largely identical for the client and server, only when
there are placeholders in the URL will the Drowsy syntax differ.

> Featured on [Changelog][1.1]

[1.1]: https://changelog.com/news/drowsy-the-laziest-rest-client-youll-ever-see-wwn0

## Examples

Below is a super simple example demonstrating how easy it can be to retrieve the
first page of public Gists currently available on GitHub.

```javascript
const github = drowsy(request, "https://api.github.com/");

github.getGists({
  headers: {
    "User-Agent": "Octo-app"
  }
});
```

By calling the method `getGists` you're infact performing a GET request to the
endpoint "/gists" through the handler provided (in this case, Request). The
handler returns a Promise that will, hopefully, resolve in a timely fashion with
the first page of public Gists found on GitHub.

## Usage

### Single command

The single command approach is the simplest and most human readable of the
bunch, it has some minor limitations, but nothing that can't be avoided with a
little imagination.

Each request is composed using just one lookup _(both the HTTP method and the
URL must be known at the time of writing)_. It's super elegant, and recommended
to be used when talking to an API that has collections, or otherwise grouped
endpoints exposed.

#### Limitations

This approach will only work with single word URL parts, and requires that you
know _all_ of them too, here's a breakdown of what would and wouldn't work.

```
// Yes - API.getCitiesLondon()
/cities/london

// Yes - API.getCitiesLondonPopulation()
/cities/london/population

// No - try API.getCities[cityId]()
/cities/[:cityId]

// No - try API.getCitiesLondon["is-capital"]()
/cities/london/is-capital
```

## License

This project is released under the [MIT License][4.1]. Enjoy responsibly ✌️

[4.1]: ./LICENSE
