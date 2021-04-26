import React, { Component } from 'react'
import styles from './styles.css'
import * as Icon from 'react-feather';

export default class LightRoomComponent extends Component {
  // intial state 
  state = {
    length: 0,
    lightroomactive: false,
    thumbmenuactive: false,
    activeindex: 0,
    path: '',
    desc: '',
    sub: ''
  }
  // varibles to store props
  size = 4
  mode = 'light'
  componentDidMount() {
    this.setState({
      length: this.props.images.length,
    })
  }
  // controlling lightbox activation
  openlightroom = (e) => {
    this.setState({
      lightroomactive: true
    })
    this.getcontent(e.target.getAttribute('data-index'))
  }

  closelightroom = () => {
    this.setState({
      lightroomactive: false,
      thumbmenuactive:false
    })
  }
  //lightbox controls
  moveright = () => {
    var id = parseInt(this.state.activeindex, 10)
    if (id == this.state.length - 1)
      this.setState({
        lightroomactive: false,
        thumbmenuactive: false
      })
    else
      this.getcontent(++id)
  }
  moveleft = () => {
    var id = parseInt(this.state.activeindex, 10)
    if (id == 0)
      this.setState({
        lightroomactive: false,
        thumbmenuactive: false,
      })
    else
      this.getcontent(--id)
  }
  getcontent = (id) => {
    this.setState(
      {
        activeindex: id,
        path: this.props.images[id].src,
        sub: this.props.images[id].sub,
        desc: this.props.images[id].desc
      }
    )
  }
  thumbmenutoggle = () => {
    this.setState({
      thumbmenuactive: !this.state.thumbmenuactive
    })
  }
  calculateStyles = () => {
    var columncount = 4,
      lightroomBackground = 'rgba(255,255,255,0.95)',
      textColor = '#000'
    if (this.props.settings) {
      if (this.props.settings.columnCount&&typeof window!=undefined) {
        if (window.outerWidth <= 600)
          columncount = this.props.settings.columnCount.mobile ? this.props.settings.columnCount.mobile : 2
        else if (window.outerWidth <= 800)
          columncount = this.props.settings.columnCount.tab ? this.props.settings.columnCount.tab : 3
        else
          columncount = this.props.settings.columnCount.default ? this.props.settings.columnCount.default : 5
      }
      lightroomBackground = this.props.settings.mode == 'light' ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.95)'
      textColor = this.props.settings.mode == 'light' ? '#000' : '#fff'
      var lightroomwidth = this.state.thumbmenuactive ? '85vw' : '100vw'
    }
    return {
      row: {
        columnCount: columncount
      },
      lightroom: {
        backgroundColor: lightroomBackground,
        color: textColor,
        width: lightroomwidth
      },
      thumbpanel: {
        width: this.state.thumbmenuactive ? '15vw' : '0vw'
      }
    }
  }

  render() {
    const runtimeStyles = this.calculateStyles()
    document.onkeydown = (e) => {
      if (e.keyCode === 39)
        this.moveright()
      if (e.keyCode === 37)
        this.moveleft()
    }
    return (
      <div>

        <div className={styles.row} style={runtimeStyles.row}>

          {this.props.images.map((img, i) =>
            <div className={styles.column} >
              <img data-index={i} src={img.src} key={i} onClick={this.openlightroom} />
            </div>
          )}

        </div>

        <div className={styles.lightroom} style={{
          visibility: this.state.lightroomactive ? 'visible' : 'hidden',
          ...runtimeStyles.lightroom
        }} >

          <div className={styles.topmenu}>
            <Icon.AlignJustify className={styles.icon}  onClick={this.thumbmenutoggle} />
            <Icon.X className={styles.icon} onClick={this.closelightroom} />
          </div>
          <div className={styles.lightroomcontent} >
            <img className={styles.lightroomimg} src={this.state.path} style={{ maxWidth: "100%" }} />
          </div>
          <div className={styles.lightroomdesc}>
            <h1>{this.state.name}</h1>
            <p className={styles.desc}>{this.state.desc}</p>
            <p className={styles.sub}>{this.state.sub}</p>
          </div>
          <Icon.ArrowLeft className={styles.carouselcontrolprev} role="button" tabindex="0" onClick={this.moveleft}/>
          <Icon.ArrowRight className={styles.carouselcontrolnext} role="button" tabindex="0" onClick={this.moveright} />

        </div>
        <div className={styles.thumbpanel} style={runtimeStyles.thumbpanel}>
          {this.props.images.map((img, i) =>
            <div className={styles.thumbnail} data-index={i} key={i} onClick={this.openlightroom} style={{
              backgroundImage:`url(${img.src})`
              }}>
            </div>
          )}

        </div>
      </div>

    )
  }
}
