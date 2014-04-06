# Tunnel

Tunnel is a micro-framework for Chrome extensions to provide two-way communications between a webpage's context and a chrome extension context.

## Background

So Chrome extensions are an interesting beast. At any given point you have to deal with three different javascript contexts, background/event script, content script, and web page context. Chrome gives you nice control over the first two, but the web page context is a little temperamental. Even though the web page context and the content script context share the DOM, they do not share global variables. There are a lot of good reasons for this. That being said, if you need to interact with the javascript context on a given page, it becomes impossible to have synchronized communication. That's the problem that Tunnel solves.

## Why is this useful?

Okay so lets say you're writing a Chrome extension that modifies the DOM on a dynamic single page app where the layout is controlled by javascript - a backbone app. Injecting HTML into the DOM from your content script is going to be problematic since your changes can be overwritten by the backbone app at any point. Tunnel would allow you to inject a notifier into the web page context and trigger a callback in the content script context on a backbone render event.

## Usage

To add Tunnel to your Chrome extension, simply add `tunnel.js` to your `manifest.js`:

```javascript
  ...
  "content_scripts": [ {
    "js": [ "tunnel.js" ],
    "matches": [ "*://*.google.com/*" ],
  } ],
  ...
```

`tunnel.js` will automatically install itself into the page context. That means you'll be able the `Tunnel` object both in your web page context and your content script context. For example,

```javascript

  // web_page.js
  // Send a message through a specific channel.
  Tunnel.send('testChannel', {
    foo: "bar"
  });

  // content_script.js
  // Receive a message on a specific channel.
  Tunnel.listen('testChannel', function(msg) {
    console.log(msg);
  });

```

## API

Tunnel is a extremely simple API. There are only two methods, `send()` and `receive()`. To allow for multiple separate communications, Tunnel allows you to provide a named channel to send communications through.

### .send(channel, message)

Send does exactly what you'd expect, it sends a message through a specified channel. The message can either be a string or an object.

```javascript
  // Send a message through a specific channel.
  Tunnel.send('testChannel', {
    foo: "bar"
  });
```

### .listen(channel, handler(message))

Listen registers a callback function for whenever a message is received on the specified channel. 

```javascript
  // Receive a message on a specific channel.
  Tunnel.listen('testChannel', function(msg) {
    console.log(msg);
  });
```
