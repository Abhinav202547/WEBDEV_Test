/* ========================================
   FAQ ACCORDION FUNCTIONALITY
   ======================================== */

// IIFE (Immediately Invoked Function Expression) - runs code immediately
// Keeps variables private and doesn't pollute global scope
(function() {
  'use strict';  // Enables strict mode - catches common errors and unsafe actions
  
  // ========================================
  // WAIT FOR DOM TO LOAD
  // ========================================
  
  // DOMContentLoaded fires when HTML is parsed (faster than window.onload)
  // window.onload waits for images/stylesheets, DOMContentLoaded doesn't
  document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // SELECT ALL FAQ ITEMS AND QUESTIONS
    // ========================================
    
    // querySelectorAll returns a NodeList (array-like) of all matching elements
    // NodeList is NOT a true array but can use forEach
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Check if elements exist before proceeding
    // Prevents errors if HTML structure is missing
    if (!faqQuestions.length) {
      console.warn('No FAQ questions found on the page');
      return;  // Exit function early if no questions exist
    }
    
    // ========================================
    // FUNCTION: TOGGLE FAQ ITEM
    // ========================================
    
    // This function handles the open/close logic for an item
    // Parameter: item - the FAQ item to toggle
    function toggleFAQ(item) {
      // classList.contains() checks if element has a class
      // Returns true if class exists, false otherwise
      const isActive = item.classList.contains('active');
      
      // Find the button inside this item
      const button = item.querySelector('.faq-question');
      
      // Toggle the item without closing others (non-accordion behavior)
      // This allows multiple items to be open simultaneously
      if (isActive) {
        // If currently open, close it
        // classList.remove() removes a class from element
        item.classList.remove('active');
        
        // Update aria-expanded to false for screen readers
        if (button) {
          button.setAttribute('aria-expanded', 'false');
        }
      } else {
        // If currently closed, open it
        // classList.add() adds a class to element
        item.classList.add('active');
        
        // Update aria-expanded to true for screen readers
        if (button) {
          button.setAttribute('aria-expanded', 'true');
        }
      }
    }
    
    // ========================================
    // ADD CLICK EVENTS TO ALL QUESTIONS
    // ========================================
    
    // Loop through each question button
    faqQuestions.forEach(function(question) {
      
      // addEventListener() attaches an event handler
      // 'click' event fires when element is clicked
      question.addEventListener('click', function(event) {
        // event parameter contains info about the click event
        
        // Prevent default button behavior (if any)
        // preventDefault() stops default action from happening
        event.preventDefault();
        
        // Get the parent FAQ item
        // parentElement returns immediate parent of element
        const item = question.parentElement;
        
        // Toggle this FAQ item (open if closed, close if open)
        toggleFAQ(item);
      });
      
      // ========================================
      // KEYBOARD ACCESSIBILITY
      // ========================================
      
      // Add keyboard support for Enter and Space keys
      // Some screen reader users navigate with keyboard only
      question.addEventListener('keydown', function(event) {
        // event.key returns the key that was pressed
        
        // Check if Enter or Space was pressed
        // || means "OR" - true if either condition is true
        if (event.key === 'Enter' || event.key === ' ') {
          // Prevent default behavior
          // For Space key, this prevents page scrolling
          event.preventDefault();
          
          // Get parent item
          const item = question.parentElement;
          
          // Toggle the FAQ
          toggleFAQ(item);
        }
        
        // Optional: Add arrow key navigation
        // This allows users to navigate between questions with arrow keys
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          // Move focus to next question
          const nextQuestion = getNextQuestion(question);
          if (nextQuestion) {
            nextQuestion.focus();  // focus() puts keyboard focus on element
          }
        }
        
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          // Move focus to previous question
          const prevQuestion = getPreviousQuestion(question);
          if (prevQuestion) {
            prevQuestion.focus();
          }
        }
      });
    });
    
    // ========================================
    // HELPER FUNCTION: GET NEXT QUESTION
    // ========================================
    
    // Returns the next question button in the list
    // Used for arrow key navigation
    function getNextQuestion(currentQuestion) {
      // Convert NodeList to Array for easier manipulation
      // Array.from() creates a real array from array-like object
      const questionsArray = Array.from(faqQuestions);
      
      // indexOf() returns position of element in array
      // -1 if not found
      const currentIndex = questionsArray.indexOf(currentQuestion);
      
      // Get next index (wraps to 0 if at end)
      // % is modulo operator - returns remainder of division
      const nextIndex = (currentIndex + 1) % questionsArray.length;
      
      // Return the next question
      return questionsArray[nextIndex];
    }
    
    // ========================================
    // HELPER FUNCTION: GET PREVIOUS QUESTION
    // ========================================
    
    // Returns the previous question button in the list
    function getPreviousQuestion(currentQuestion) {
      const questionsArray = Array.from(faqQuestions);
      const currentIndex = questionsArray.indexOf(currentQuestion);
      
      // Get previous index (wraps to end if at start)
      // + length ensures we don't get negative number
      const prevIndex = (currentIndex - 1 + questionsArray.length) % questionsArray.length;
      
      return questionsArray[prevIndex];
    }
    
    // ========================================
    // INITIALIZE: SET ARIA ATTRIBUTES
    // ========================================
    
    // Set initial ARIA attributes for all questions
    // This improves accessibility for screen readers
    faqQuestions.forEach(function(question, index) {
      // index is the position in the array (0, 1, 2, etc.)
      
      // Get parent item
      const item = question.parentElement;
      
      // Get answer div
      const answer = item.querySelector('.faq-answer');
      
      if (answer) {
        // Create unique ID for answer
        // This links question button to its answer
        // Date.now() returns current timestamp in milliseconds
        // Math.random() adds extra uniqueness
        const answerId = 'faq-answer-' + index + '-' + Date.now();
        
        // Set ID on answer div
        // setAttribute() adds/updates an HTML attribute
        answer.setAttribute('id', answerId);
        
        // Link button to answer using aria-controls
        // Tells screen readers which content this button controls
        question.setAttribute('aria-controls', answerId);
      }
      
      // Set role="button" for better screen reader support
      // Even though it's a <button>, this reinforces the role
      question.setAttribute('role', 'button');
      
      // Set tabindex to make it keyboard focusable
      // 0 means element is in natural tab order
      question.setAttribute('tabindex', '0');
    });
    
    // ========================================
    // OPTIONAL: AUTO-CLOSE ON OUTSIDE CLICK
    // ========================================
    
    // Uncomment this section if you want FAQs to close when clicking outside
    /*
    document.addEventListener('click', function(event) {
      // event.target is the element that was clicked
      
      // Check if click was outside all FAQ items
      // closest() finds nearest ancestor matching selector
      const clickedFAQ = event.target.closest('.faq-item');
      
      if (!clickedFAQ) {
        // Click was outside - close all FAQs
        closeAllFAQs();
      }
    });
    */
    
  }); // End of DOMContentLoaded
  
})(); // End of IIFE


/* ========================================
   EXPLANATION OF KEY CONCEPTS
   ======================================== */

/*
1. IIFE (Immediately Invoked Function Expression):
   - Syntax: (function() { ... })();
   - Runs immediately when script loads
   - Creates private scope - variables inside don't leak to global scope
   - Prevents naming conflicts with other scripts

2. 'use strict':
   - Enforces stricter JavaScript rules
   - Catches common coding mistakes
   - Prevents use of undeclared variables
   - Makes code more secure and performant

3. Event Delegation:
   - Attaching events to individual elements (not parent)
   - More control but more event listeners
   - Alternative: attach to parent and check event.target

4. Accessibility (a11y):
   - aria-expanded: tells screen readers if content is expanded
   - aria-controls: links button to content it controls
   - role="button": reinforces button semantics
   - Keyboard support: Enter, Space, Arrow keys

5. classList Methods:
   - .add('class'): adds a class
   - .remove('class'): removes a class
   - .toggle('class'): adds if absent, removes if present
   - .contains('class'): checks if class exists

6. querySelector vs querySelectorAll:
   - querySelector: returns FIRST match (single element or null)
   - querySelectorAll: returns ALL matches (NodeList)
   - querySelector is faster when you only need one element

7. parentElement vs parentNode:
   - parentElement: returns parent element (skips non-elements)
   - parentNode: returns parent node (includes text nodes, comments)
   - Usually parentElement is preferred

8. Arrow Functions vs Regular Functions:
   - Arrow: const func = () => { }
   - Regular: function func() { }
   - Arrow functions don't have their own 'this'
   - Regular functions better for methods and constructors

9. Modulo Operator (%):
   - Returns remainder of division
   - Used for wrapping: (index + 1) % length
   - Example: (5 + 1) % 6 = 0 (wraps to start)

10. Event Object:
    - Automatically passed to event handlers
    - Contains info: target, key, type, etc.
    - preventDefault(): stops default action
    - stopPropagation(): stops event bubbling
*/
