# ng-preload-src
> Distributed via

[![Version     ](https://img.shields.io/gem/v/ng-preload-src.svg)                                   ](https://rubygems.org/gems/ng-preload-src)
[![Bower version](https://badge.fury.io/bo/ng-preload-src.svg)                                      ](https://badge.fury.io/bo/ng-preload-src)

> Image preload directive for AngularJS

[![Travis CI   ](https://travis-ci.org/tomchentw/ng-preload-src.svg?branch=master)                  ](https://travis-ci.org/tomchentw/ng-preload-src)
[![Quality     ](https://img.shields.io/codeclimate/github/tomchentw/ng-preload-src.svg)            ](https://codeclimate.com/github/tomchentw/ng-preload-src)
[![Coverage    ](https://img.shields.io/coveralls/tomchentw/ng-preload-src.svg)                     ](https://coveralls.io/r/tomchentw/ng-preload-src)
[![Dependencies](https://gemnasium.com/tomchentw/ng-preload-src.svg)                                ](https://gemnasium.com/tomchentw/ng-preload-src)


## Project philosophy

### Develop in LiveScript
[LiveScript](http://livescript.net/) is a compile-to-js language, which provides us more robust way to write JavaScript.  
It also has great readibility and lots of syntax sugar just like you're writting python/ruby.


## Installation

### Just use it

* Download and include [`ng-preload-src.js`](https://github.com/tomchentw/ng-preload-src/blob/master/ng-preload-src.js) OR [`ng-preload-src.min.js`](https://github.com/tomchentw/ng-preload-src/blob/master/ng-preload-src.min.js).  

Then include them through script tag in your HTML.

### **Rails** projects (Only support 3.1+)

Add this line to your application's Gemfile:

```ruby
gem 'ng-preload-src'
```

And then execute:

    $ bundle

Then add these lines to the top of your `app/assets/javascripts/application.js` file:

```javascript
//= require angular
//= require ng-preload-src
```

And include in your `angular` module definition:

```javascript
var module = angular.module('my-awesome-project', ['ng-preload-src']).
```


## Usage


## Contributing

[![devDependency Status](https://david-dm.org/tomchentw/ng-preload-src/dev-status.svg?theme=shields.io)](https://david-dm.org/tomchentw/ng-preload-src#info=devDependencies)

1. Fork it ( https://github.com/tomchentw/ng-preload-src/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request