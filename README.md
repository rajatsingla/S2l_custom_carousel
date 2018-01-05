# S2l_custom_carousel
Minimalist carousel to scroll x axis by both scroll bar and arrows, no css, only js functionality

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
  
  
  Example:-

```html
<div>
	<ul id="hello">
		<li>some text</li>
		<li>some text</li>
		<li>some text</li>
		<li>some text</li>
		<li>some text</li>
	</ul>
</div>	
```

```javascript
	var custom_carousel = S2l_custom_carousel("hello","300px");
	// or
	var custom_carousel = S2l_custom_carousel("hello","30%");
```

Usage in ember App:
```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  custom_crousel: null,

  didInsertElement() {
    this._super(...arguments);
    this.set('custom_crousel', new S2l_custom_carousel("hello","30%"));
  },

  willDestroyElement() {
    this._super(...arguments);
    if(this.get('custom_crousel')){
      this.get('custom_crousel').removecarousel();
    }
  },

});
```

Available methods on carousel object
* previous   //move carousel to previous element
* next   //move carousel to next element
* removecarousel
* disableArrowButtonIfAtExtreme
* scrollTo(fromX,toX)  //will scroll carousel to given value
  
 Please contribute (add event callbacks like scrolled)
