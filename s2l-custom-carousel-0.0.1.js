/**
https://github.com/rajatsingla/S2l_custom_carousel
@description
	Creates a carousel which works by scrolling x-axis of an element,
  and you can also choose to give x-scroll bar to user,
  which will work in sync with x-scroll by arrows
@guide
	1. Add or link this script to the bottom of your body tag, or after the DOM has
	   completely loaded.
  2. Add a div or ul as a container containing an ID say "exampleID",
     and two sibling buttons containing IDs id="exampleID-left" and id="exampleID-right"
	3. After this script, create a new object by passing container id and width of each carousel object.
	:: var custom_carousel = new S2l_custom_carousel("exampleID","30%");
  4. It will bind left and right functionality to the buttons.
  5. It is a minimalist script, it introduces no fancy CSS or classes of itself, only scrolling functionality.

@author		rajatsingla.in
@company	Navyuginfo, India
@created	01-04-2018
*/
// CAROUSEL OBJECT

(function(){

  window.S2l_custom_carousel = function(containerID,width) {
    this.id=containerID;
    this.width=width || "100%";
    this.time=0.2;
  	this.container = document.getElementById(containerID);
    if(!this.id || !this.container){console.log("no ID provided");return {}};
    // binding this on next and previous arrow callbacks
    this.next_binded=this.next.bind(this);
    this.previous_binded=this.previous.bind(this);
    this.scroll_handler_binded=this.scroll_handler.bind(this);
    this.addCssOnContainer();
    this.addCssForChild();
    this.bindEvents();
    this.disableArrowButtonIfAtExtreme();
  }

  S2l_custom_carousel.prototype.addCssOnContainer = function () {
    // adding css on container to make it scrollable on x-axis
    var styles = { width: "100%", "overflow-y": "hidden", "white-space": "nowrap", position: "relative"};
    this.addCss(styles,this.container);
  };

  S2l_custom_carousel.prototype.addCssForChild = function () {
    // adding css node for children elements '>' this
    // will make sure it applies on next siblings only and not on children of children
    var styles = '#'+this.id+' > * {width:'+this.width+';display:inline-block;}';
    var style_id = 'style-'+this.id;
    this.addStyleNode(styles,style_id,document.head);
  };

  S2l_custom_carousel.prototype.bindEvents = function () {
    this.addEvent(document.getElementById(this.id+"-right"), 'click', this.next_binded);
    this.addEvent(document.getElementById(this.id+"-left"), 'click',this.previous_binded);
    this.ticking=false;
    this.addEvent(this.container, 'scroll',this.scroll_handler_binded);
  };

  S2l_custom_carousel.prototype.previous = function(){
    this.scroll(-1);
  };

  S2l_custom_carousel.prototype.next = function(){
    this.scroll(1);
  };

  S2l_custom_carousel.prototype.removecarousel = function () {
    // removing events binded on arrows, although browsers automatically
    // remove events, when element is removed from DOM, playing safe
    this.removeEvent(document.getElementById(this.id+"-right"), 'click', this.next_binded);
    this.removeEvent(document.getElementById(this.id+"-left"), 'click',this.previous_binded);
    this.removeEvent(this.container, 'scroll',this.scroll_handler_binded);
    // removing style node from head
    var style_node=document.getElementById('style-'+this.id);style_node?style_node.remove():"";
    // removing style from container
    this.addCss({ width: "", "overflow-y": "", "white-space": "", position: ""},this.container);
  };

  S2l_custom_carousel.prototype.scroll_handler = function() {
      // throttling scroll events
      var that = this;
      if (!that.ticking){
        setTimeout(function(){
          that.disableArrowButtonIfAtExtreme.call(that);
          that.ticking = false;
        },66);
        that.ticking = true;
      }
  };



  // utility methods

  S2l_custom_carousel.prototype.addCss = function (styles,el) {
    if (el){
      for (var property in styles){
          el.style[property] = styles[property];
      }
    }
  };

  S2l_custom_carousel.prototype.addStyleNode = function (styles,id,container) {
    var css = document.createElement('style');
    css.type = 'text/css';
    css.id = id;

    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));

    container.appendChild(css);
  };

  S2l_custom_carousel.prototype.addEvent = function (el,type,handler) {
    if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
  };

  S2l_custom_carousel.prototype.removeEvent = function (el, type, handler) {
    if(el)
    {
      if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
    }
  }

  S2l_custom_carousel.prototype.scroll = function(direction) {
    var scrolled_value,child,child_width,left;
    scrolled_value=this.container.scrollLeft;
    child=this.container.children[0];
    if(child){child_width=child.offsetWidth};

    if(!(scrolled_value==undefined || child_width==undefined)){
      var on_element=Math.round(scrolled_value/child_width);
      // whatever element we are scrolled to we scroll to next or previous depending on direction
      left=(on_element+(direction*1))*child_width;
      this.scrollTo(scrolled_value,left);
    };
  };

  S2l_custom_carousel.prototype.scrollTo = function(fromX,toX) {
    var that,scrollCount;
    that=this;
    scrollCount = 0;
    function step () {
        var time=that.time;
        // per second 60 frames
        scrollCount += 1/60;
        var p = scrollCount/time;
        if(p<1 && that.container.scrollLeft!=toX){
          // provided as browser api to make animations smooth
          window.requestAnimationFrame(step);
          // using sin ease function to calculate how much we should add at each step
          that.container.scrollLeft=Math.round(fromX + (toX-fromX)*Math.sin(p * (Math.PI / 2)));
        }else{
          that.container.scrollLeft=toX;
        }
    }
    window.requestAnimationFrame(step);
  };

  S2l_custom_carousel.prototype.disableArrowButtonIfAtExtreme = function(left) {
    if(this.container && this.id && this.container.scrollLeft!=undefined){
      var left=this.container.scrollLeft;
      document.getElementById(this.id+"-right").disabled=false;
      document.getElementById(this.id+"-left").disabled=false;
      // added 3 to handle cases with elements having width in float points
      //  and remaining 2 3 pixels avoid disabling button
      if (this.container.scrollWidth-this.container.offsetWidth<=left+3){
        document.getElementById(this.id+"-right").disabled="disabled";
      }else if (this.container && this.id && left<=3) {
        document.getElementById(this.id+"-left").disabled="disabled";
      }
    }
  };

})();
