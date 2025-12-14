# FAQ Accordion Section - Documentation

## Overview

This project is a Frequently Asked Questions (FAQ) accordion component built with HTML, CSS, and JavaScript. The implementation provides a responsive, accessible interface that allows users to view answers by clicking on questions. Only one answer is displayed at a time, following standard accordion behavior.

## Project Requirements

The following requirements were specified and met:

- Create pixel perfect design
- Mobile responsive
- Functional accordion behavior
- Font Family: Noto Sans

## Technologies

- HTML5
- CSS3
- JavaScript (ES6)
- Google Fonts (Noto Sans)
- SVG for icons

## File Structure

```
project/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Installation

1. Download all project files to a single directory
2. Ensure the following files are present:
   - index.html
   - style.css
   - script.js
3. Open index.html in a web browser

No additional dependencies or build tools are required.

## HTML Structure

### Main Container
The FAQ section uses a two-column layout with a left column for the heading and description, and a right column for the accordion items.

### FAQ Items
Each FAQ item consists of:
- A button element containing the question text and icon
- A div element containing the answer content
- The active class is used to show/hide answers

### Accessibility Attributes
- aria-expanded: Indicates whether content is expanded or collapsed
- aria-controls: Links the button to the content it controls
- role="button": Reinforces button semantics for assistive technologies

## CSS Implementation

### Layout System
The layout uses CSS Flexbox for the two-column design on desktop, which converts to a single-column stack on mobile devices.

### Responsive Breakpoints
- Desktop: Default styles, two-column layout
- Tablet: 1024px and below
- Mobile: 768px and below
- Small Mobile: 480px and below

### Color Scheme
- Background: #B8E6D5 (light mint green)
- Heading: #2C4270 (dark blue)
- Description text: #4A7C6C (teal)
- Answer text: #5A6C7D (gray-blue)
- Card background: #FFFFFF (white)

### Typography
- Font Family: Noto Sans (weights: 400, 600, 700)
- Heading size: 48px (desktop), scales down for mobile
- Body text: 16px (desktop), scales down for mobile

### Animations
All transitions use cubic-bezier(0.4, 0, 0.2, 1) easing with 0.3s duration for smooth animations.

## JavaScript Functionality

### Core Functions

**closeAllFAQs()**
Closes all FAQ items by removing the active class and updating aria-expanded attributes.

**openFAQ(item)**
Opens a specific FAQ item by adding the active class and updating aria-expanded to true.

**toggleFAQ(item)**
Handles the accordion logic. Closes all items first, then opens the clicked item if it was previously closed.

### Event Handling

**Click Events**
Each question button has a click event listener that triggers the toggleFAQ function.

**Keyboard Events**
The following keyboard interactions are supported:
- Enter: Toggle FAQ item
- Space: Toggle FAQ item
- Arrow Down: Move focus to next question
- Arrow Up: Move focus to previous question

### Initialization
On page load, the script:
1. Selects all FAQ questions
2. Attaches event listeners
3. Sets initial ARIA attributes
4. Configures keyboard navigation

## Browser Support

The component works in all modern browsers that support:
- CSS Flexbox
- CSS Transitions
- SVG
- ES6 JavaScript (const, let, arrow functions)

Tested and compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility Features

### ARIA Implementation
All interactive elements include appropriate ARIA attributes to ensure screen reader compatibility.

### Keyboard Navigation
Full keyboard support allows users to navigate and interact without a mouse.

### Focus Management
Visible focus indicators help keyboard users understand their current position.

### Motion Preferences
The component respects the prefers-reduced-motion media query, providing minimal animations for users who have indicated motion sensitivity.

## Customization

### Changing Colors
Edit the color values in style.css:
```css
.faq-section { background-color: #B8E6D5; }
.faq-title { color: #2C4270; }
```

### Modifying Spacing
Adjust padding and gap values in style.css:
```css
.faq-section { padding: 80px 100px; }
.faq-container { gap: 100px; }
```

### Adding FAQ Items
Copy the faq-item HTML structure and paste it within the faq-right div. Update the question and answer text as needed.

### Changing Fonts
Update the Google Fonts link in index.html and modify the font-family in style.css.

## Code Comments

All files include detailed inline comments explaining:
- The purpose of each section
- How the code functions
- Why specific approaches were chosen
- Technical concepts and terminology

## Implementation Details

### HTML
- Semantic markup using appropriate HTML5 elements
- SVG icons for scalable graphics
- Proper document structure with meta tags for responsiveness

### CSS
- Mobile-first responsive design approach
- Flexbox for layout management
- CSS transitions for smooth animations
- Media queries for breakpoint handling

### JavaScript
- IIFE (Immediately Invoked Function Expression) pattern to avoid global scope pollution
- Strict mode enabled for better error handling
- Event delegation for efficient event handling
- Helper functions for code organization

## Testing

The component should be tested on:
- Multiple browsers (Chrome, Firefox, Safari, Edge)
- Various screen sizes (desktop, tablet, mobile)
- Keyboard-only navigation
- Screen reader compatibility

## Known Limitations

- Requires JavaScript to be enabled for accordion functionality
- Requires internet connection for Google Fonts to load
- SVG icons may not render in very old browsers

## Future Enhancements

Possible improvements could include:
- Animation customization options
- Multiple open items mode (non-accordion behavior)
- Search/filter functionality
- Deep linking to specific questions
- Print stylesheet optimization

## Maintenance

To maintain this component:
1. Test across browsers after making changes
2. Validate HTML and CSS
3. Ensure all comments remain accurate if code changes
4. Update documentation if new features are added

## License

This project is created for educational purposes.

## Version

Version 1.0 - December 2025
