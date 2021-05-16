import React, { Component } from 'react'
import styles from './styles.css'
// icons
import closeIconLight from './images/x-light.svg';
import closeIconDark from './images/x-dark.svg';
import thumbnailLight from './images/align-justify-light.svg'
import thumbnailDark from './images/align-justify-dark.svg'
import arrowLeftLight from './images/arrow-left-light.svg'
import arrowLeftDark from './images/arrow-left-dark.svg'
import arrowRightLight from './images/arrow-right-light.svg'
import arrowRightDark from './images/arrow-right-dark.svg'

export default class LightRoomComponent extends Component {
   // intial state
   state = {
     length: 0,
     lightroomactive: false,
     thumbmenuactive: false,
     activeindex: 0,
     path: "",
     desc: "",
     sub: "",
     touchStart: 0,
     touchEnd: 0
   };
   // varibles to store props
   size = 4;
   mode = "light";
   componentDidMount() {
     this.setState({
       length: this.props.images.length
     });
   }
   // controlling lightbox activation
   openlightroom = e => {
     this.setState({
       lightroomactive: true
     });
     this.getcontent(e.target.getAttribute("data-index"));
   };

   closelightroom = () => {
     this.setState({
       lightroomactive: false,
       thumbmenuactive: false
     });
   };

   //lightbox controls

   moveright = () => {
     var id = parseInt(this.state.activeindex, 10);
     if (id == this.state.length - 1)
       this.setState({
         lightroomactive: false,
         thumbmenuactive: false
       });
     else this.getcontent(++id);
   };
   moveleft = () => {
     var id = parseInt(this.state.activeindex, 10);
     if (id == 0)
       this.setState({
         lightroomactive: false,
         thumbmenuactive: false
       });
     else this.getcontent(--id);
   };

   // get image at current active index

   getcontent = id => {
     this.setState({
       activeindex: id,
       path: this.props.images[id].src,
       sub: this.props.images[id].sub,
       desc: this.props.images[id].desc
     });
   };

   // toggle thumb menu

   thumbmenutoggle = () => {
     this.setState({
       thumbmenuactive: !this.state.thumbmenuactive
     });
   };

   // Calculate styles - reponsible for changing style based on settings

   calculateStyles = () => {
     var columncount = 4,
       lightroomBackground = "rgba(255,255,255,0.95)",
       textColor = "#000";
     if (this.props.settings) {
       if (
         this.props.settings.columnCount &&
         typeof window != undefined
       ) {
         if (window.outerWidth <= 600)
           columncount = this.props.settings.columnCount.mobile
             ? this.props.settings.columnCount.mobile
             : 2;
         else if (window.outerWidth <= 800)
           columncount = this.props.settings.columnCount.tab
             ? this.props.settings.columnCount.tab
             : 3;
         else
           columncount = this.props.settings.columnCount.default
             ? this.props.settings.columnCount.default
             : 5;
       }
       lightroomBackground =
         this.props.settings.mode == "light"
           ? "rgba(255,255,255,0.95)"
           : "rgba(0,0,0,0.95)";
       textColor =
         this.props.settings.mode == "light" ? "#000" : "#fff";
       var lightroomwidth = this.state.thumbmenuactive
         ? "85vw"
         : "100vw";
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
         width: this.state.thumbmenuactive ? "15vw" : "0vw",
         background:
           this.props.settings.mode == "light"
             ? "rgba(255,255,255,0.95)"
             : "rgba(0,0,0,0.95)"
       }
     };
   };

   // Swipe Controls

   touchstart = e => {
     this.setState({
       touchStart: e.touches[0].clientX
     });
   };

   touchmove = e => {
     this.setState({
       touchEnd: e.touches[0].clientX
     });
   };

   touchend = e => {
     const { touchStart, touchEnd } = this.state;
     if (touchStart - touchEnd > 150) this.moveright();
     if (touchStart - touchEnd < -150) this.moveleft();
   };

   render() {
     const runtimeStyles = this.calculateStyles();

     return (
       <div>
         <div className={styles.row} style={runtimeStyles.row}>
           {this.props.images.map((img, i) => (
             <div className={styles.column} key={i}>
               <img
                 data-index={i}
                 src={img.src}
                 onClick={this.openlightroom}
               />
             </div>
           ))}
         </div>

         <div
           className={styles.lightroom}
           style={{
             visibility: this.state.lightroomactive
               ? "visible"
               : "hidden",
             ...runtimeStyles.lightroom
           }}
         >
           <div className={styles.topmenu}>
             <img
               src={
                 this.props.settings.mode == "light"
                   ? thumbnailDark
                   : thumbnailLight
               }
               className={styles.icon}
               onClick={this.thumbmenutoggle}
             />
             <img
               src={
                 this.props.settings.mode == "light"
                   ? closeIconDark
                   : closeIconLight
               }
               className={styles.icon}
               onClick={this.closelightroom}
             />
           </div>
           <div
             className={styles.lightroomcontent}
             onTouchStart={this.touchstart}
             onTouchMove={this.touchmove}
             onTouchEnd={this.touchend}
           >
             <img
               className={styles.lightroomimg}
               src={this.state.path}
               style={{ maxWidth: "100%" }}
             />
           </div>
           <div className={styles.lightroomdesc}>
             <h1>{this.state.name}</h1>
             <p className={styles.desc}>{this.state.desc}</p>
             <p className={styles.sub}>{this.state.sub}</p>
           </div>
           <img
             src={
               this.props.settings.mode == "light"
                 ? arrowLeftDark
                 : arrowLeftLight
             }
             className={styles.carouselcontrolprev}
             role="button"
             onClick={this.moveleft}
           />
           <img
             src={
               this.props.settings.mode == "light"
                 ? arrowRightDark
                 : arrowRightLight
             }
             className={styles.carouselcontrolnext}
             role="button"
             onClick={this.moveright}
           />
         </div>
         <div
           className={styles.thumbpanel}
           style={runtimeStyles.thumbpanel}
         >
           {this.props.images.map((img, i) => (
             <div
               className={styles.thumbnail}
               data-index={i}
               key={i}
               onClick={this.openlightroom}
               style={{
                 backgroundImage: `url(${img.src})`
               }}
             ></div>
           ))}
         </div>
       </div>
     );
   }
 }
