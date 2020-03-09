# <img src="public/icons/icon_48.png" width="45" align="left"> Text Drain Extension

"Text Drain Extension" allows you to easily copy the text of the web page you are browsing to the clipboard.

![popup_image](https://user-images.githubusercontent.com/44139243/76146648-dc640900-60d7-11ea-8987-cd58967a5ae2.png)



## Features

- Demo (animation gif)
  - ![chrome-ext-demo](https://user-images.githubusercontent.com/44139243/76146692-4b416200-60d8-11ea-9175-ab14b513dd12.gif)


- You can copy most texts on web pages with one click the button
  - "Text Drain Extension" get these tags' textContent and URL information.
    - a
    - address
    - b
    - blockquote
    - button
    - caption
    - data
    - datalist
    - dd
    - dl
    - dt
    - em
    - h1
    - h2
    - h3
    - h4
    - h5
    - h6
    - i
    - input
    - label
    - li
    - link
    - meta
    - option
    - p
    - ruby
    - span
    - strong
    - td
    - textarea
    - thead
    - title
    - tr
    - tt
    - u
  - Unfortunately, websites that generate DOM asynchronously such as react or ajax communication are not supported.

## Install

- You can install from [Chrome Web Store](https://chrome.google.com/webstore/detail/lkdehaolnbgbhgajpfpkoobhfpoaeclj/publish-accepted?authuser=0&hl=ja)
- When you develop in chrome://extension, do like this and install unpacked extension ("build" directory) in Chrome
  ```
  $ git clone https://github.com/dand-or/text-drain-extension.git
  $ npm install
  $ npm run watch
  ```

## License

MIT

## Contribution

Suggestions and pull requests are welcomed!.

## wishlist

https://www.amazon.jp/hz/wishlist/ls/1WVWE1MGKG2DK?ref_=wl_share