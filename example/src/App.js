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
      },
      {
        src: "https://images.unsplash.com/photo-1577278689329-1914b6814d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1140&q=80",
        desc: 'Man and woman passing by store',
        sub: 'Harry Cunningham'
      },
      {
        src: "https://images.unsplash.com/photo-1577177205947-4078546be974?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
        desc: 'Jaipur , Rajasthan India',
        sub: 'Liam Baldock'
      },
      {
        src: "https://images.unsplash.com/photo-1437326300822-01d8f13c024f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        sub: 'Verne Ho'
      },
      {
        src: "https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
        desc: 'Rann of kutch , India',
        sub: 'Hari Nandakumar'
      },
      {
        src: "https://images.unsplash.com/photo-1521859727374-9b8e0ef8c0c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        sub: 'Jyotirmoy Gupta'
      },
      {
        src: "https://images.unsplash.com/photo-1577201404214-b725e3212fc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
        sub: 'Tom & Sini'
      }
    ]
    var settings = {
      columnCount:{
        default:5,
        mobile:3,
        tab:4
      },
      mode: 'light'
    }
    return (
      <div>
        <Lightroom images={images} settings={settings} />
      </div>
    )
  }
}

