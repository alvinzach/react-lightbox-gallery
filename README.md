# react-lightbox-gallery



[![NPM](https://img.shields.io/npm/v/react-lightbox-gallery.svg)](https://www.npmjs.com/package/react-lightbox-gallery) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A minimal lightbox image gallery plugin for react .


![demo gif](https://media.giphy.com/media/ylmI7RG6UobuLnBS0g/giphy.gif)

## Demo
Find demo in [codesandbox](https://codesandbox.io/s/laughing-wu-n2b3t)

## Features
* :tada:Swipe support [v2.0.0]
* :tada:Light weight [v2.0.0]
* Light/Dark Mode
* Responsiveness options in multiple devices
* Thumbnail navigation


## Install

```bash
npm install --save react-lightbox-gallery
```


## Usage

```jsx
import React, { Component } from 'react'

import Lightroom from 'react-lightbox-gallery'

export default class App extends Component {
  render() {
    var images = [
      {
        src: "https://images.unsplash.com/photo-1577279549270-b9e297533cdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
        desc: 'Person wearing shoes',
        sub: 'Gift Habeshaw'
      },
      {
        src: "https://images.unsplash.com/photo-1577277625082-36df4915ebeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        desc: 'Blonde woman wearing sunglasses smiling at the camera ',
        sub: 'Dmitriy Frantsev'
      }
    ]
    var settings = {
      columnCount:{
        default:5,
        mobile:3,
        tab:4
      },
      mode: 'dark'
    }
    return (
      <div>
        <Lightroom images={images} settings={settings} />
      </div>
    )
  }
}

}
```


## License

MIT © [alvinzach](https://github.com/alvinzach)
