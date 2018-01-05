/**
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
  	this.container = document.getElementById(containerID);
    if(!this.id || !this.container){console.log("no ID provided");return ""};
    this.next_binded=this.next.bind(this);
    this.previous_binded=this.previous.bind(this);
    this.addCssOnContainer();
    this.addCssForChild();
    this.bindClickOnArrows();
  }

  S2l_custom_carousel.prototype.addCssOnContainer = function () {
    var styles = { width: "100%", "overflow-y": "hidden", "white-space": "nowrap", position: "relative"};
    this.addCss(styles,this.container);
  };

  S2l_custom_carousel.prototype.addCssForChild = function () {
    var styles = '#'+this.id+' > * {width:'+this.width+';display:inline-block;}';
    var style_id = 'style-'+this.id;
    this.addStyleNode(styles,style_id,document.head);
  };

  S2l_custom_carousel.prototype.bindClickOnArrows = function () {
    this.addEvent(document.getElementById(this.id+"-right"), 'click', this.next_binded);
    this.addEvent(document.getElementById(this.id+"-left"), 'click',this.previous_binded);
  };

  S2l_custom_carousel.prototype.previous = function(){
    this.scroll(-1);
  };

  S2l_custom_carousel.prototype.next = function(){
    this.scroll(1);
  };

  S2l_custom_carousel.prototype.removecarousel = function () {
    // code for removing
  };




  // utility methods

  S2l_custom_carousel.prototype.addCss = function (styles,el) {
    for (var property in styles){
        el.style[property] = styles[property];
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

  S2l_custom_carousel.prototype.scroll = function(direction) {
    var scrolled_value,child,child_width,that,scrollCount,left;
    that=this;
    scrolled_value=this.container.scrollLeft;
    child=this.container.children[0];
    if(child){child_width=child.offsetWidth};


    scrollCount = 0;
    function step () {
        var time=0.5;
        scrollCount += 1/60;
        var p = scrollCount/time;
        if(p<1){
          window.requestAnimationFrame(step);
          that.container.scrollLeft=Math.round(scrolled_value + (left-scrolled_value)*Math.sin(p * (Math.PI / 2)));
        }else{
          that.container.scrollLeft=left;
        }
    }


    if(!(scrolled_value==undefined || child_width==undefined)){
      var on_element=scrolled_value/child_width;
      left=(on_element+(direction*1))*child_width;
      window.requestAnimationFrame(step);
    };
  };

})();
