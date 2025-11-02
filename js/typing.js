document.addEventListener('DOMContentLoaded', () => {
  const outputDisplay = document.getElementById('output-display');
  const keys = document.querySelectorAll('.key');
  const clearButton = document.getElementById('clear-button');
  const cursor = document.getElementById('cursor'); // Get cursor
  const shiftToggleBtn = document.getElementById('shift-toggle-button'); // Get shift toggle button

  // Create a map for quick lookup of keys by their 'data-key' (which corresponds to event.code)
  const keyMap = new Map();
  keys.forEach(key => {
      keyMap.set(key.dataset.key, key);
  });

  // Handle key down event
  window.addEventListener('keydown', (e) => {
      // Prevent default browser behavior for keys like Tab or Space (scrolling)
      e.preventDefault();

      const keyElement = keyMap.get(e.code);
      let char = e.key;

      // 1. Highlight the pressed key
      if (keyElement) {
          keyElement.classList.add('active');
      }

      // 2. Update the output display
      if (char.length === 1) {
          // Normal character keys (a, b, 1, 2, $, %, etc.)
          const textNode = document.createTextNode(char);
          outputDisplay.insertBefore(textNode, cursor);
      } else if (e.code === 'Backspace') {
          // Handle Backspace
          const lastNode = cursor.previousSibling;
          if (lastNode && lastNode.nodeType === Node.TEXT_NODE) {
              if (lastNode.textContent.length > 1) {
                  lastNode.textContent = lastNode.textContent.slice(0, -1);
              } else {
                  outputDisplay.removeChild(lastNode);
              }
          } else if (lastNode && lastNode.tagName === 'BR') {
              outputDisplay.removeChild(lastNode);
          }
      } else if (e.code === 'Space') {
          // Handle Space
          const textNode = document.createTextNode(' ');
          outputDisplay.insertBefore(textNode, cursor);
      } else if (e.code === 'Enter') {
          // Handle Enter
          const br = document.createElement('br');
          outputDisplay.insertBefore(br, cursor);
      } else if (e.code === 'Tab') {
          // Handle Tab (insert 4 spaces)
          const textNode = document.createTextNode('    ');
          outputDisplay.insertBefore(textNode, cursor);
      }

      // Auto-scroll to the bottom of the output display
      outputDisplay.scrollTop = outputDisplay.scrollHeight;
  });

  // Handle key up event
  window.addEventListener('keyup', (e) => {
      const keyElement = keyMap.get(e.code);

      // Remove the 'active' class to un-highlight the key
      if (keyElement) {
          keyElement.classList.remove('active');
      }
  });

  // --- NEW: Add click/touch listeners to virtual keys ---
  keys.forEach(key => {
      // Use 'mousedown' and 'mouseup' to better simulate key press/release
      // and 'touchstart'/'touchend' for mobile

      const handlePress = (e) => {
          e.preventDefault(); // Prevent focus shift on click
          const code = key.dataset.key;
          let char; // Map 'code' to the character or action

          // Manual mapping based on the existing HTML
          // This determines what character to print or action to take
          switch(code) {
              case 'Backspace': char = 'Backspace'; break;
              case 'Tab': char = 'Tab'; break;
              case 'Enter': char = 'Enter'; break;
              case 'Space': char = ' '; break; // 'key' is " " for space
              case 'KeyQ': char = 'q'; break;
              case 'KeyW': char = 'w'; break;
              case 'KeyE': char = 'e'; break;
              case 'KeyR': char = 'r'; break;
              case 'KeyT': char = 't'; break;
              case 'KeyY': char = 'y'; break;
              case 'KeyU': char = 'u'; break;
              case 'KeyI': char = 'i'; break;
              case 'KeyO': char = 'o'; break;
              case 'KeyP': char = 'p'; break;
              case 'KeyA': char = 'a'; break;
              case 'KeyS': char = 's'; break;
              case 'KeyD': char = 'd'; break;
              case 'KeyF': char = 'f'; break;
              case 'KeyG': char = 'g'; break;
              case 'KeyH': char = 'h'; break;
              case 'KeyJ': char = 'j'; break;
              case 'KeyK': char = 'k'; break;
              case 'KeyL': char = 'l'; break;
              case 'KeyZ': char = 'z'; break;
              case 'KeyX': char = 'x'; break;
              case 'KeyC': char = 'c'; break;
              case 'KeyV': char = 'v'; break;
              case 'KeyB': char = 'b'; break;
              case 'KeyN': char = 'n'; break;
              case 'KeyM': char = 'm'; break;
              case 'Digit1': char = '1'; break;
              case 'Digit2': char = '2'; break;
              case 'Digit3': char = '3'; break;
              case 'Digit4': char = '4'; break;
              case 'Digit5': char = '5'; break;
              case 'Digit6': char = '6'; break;
              case 'Digit7': char = '7'; break;
              case 'Digit8': char = '8'; break;
              case 'Digit9': char = '9'; break;
              case 'Digit0': char = '0'; break;
              case 'Backquote': char = '`'; break;
              case 'Minus': char = '-'; break;
              case 'Equal': char = '='; break;
              case 'BracketLeft': char = '['; break;
              case 'BracketRight': char = ']'; break;
              case 'Backslash': char = '\\'; break;
              case 'Semicolon': char = ';'; break;
              case 'Quote': char = '\''; break;
              case 'Comma': char = ','; break;
              case 'Period': char = '.'; break;
              case 'Slash': char = '/'; break;

              // Keys that do nothing on click (for this simple app)
              case 'CapsLock':
              case 'ShiftLeft':
              case 'ShiftRight':
              case 'ControlLeft':
              case 'ControlRight':
              case 'AltLeft':
              case 'AltRight':
                  char = 'Functional'; // A placeholder for non-printing keys
                  break;
              default:
                  char = 'Functional'; // Fallback for any other keys
          }

          // 1. Simulate visual press
          key.classList.add('active');

          // 2. Update the output display (re-using logic from keydown)
          if (char.length === 1) {
            if (shiftToggleBtn.checked){
              char = char.toUpperCase();
            }

            const textNode = document.createTextNode(char);
            outputDisplay.insertBefore(textNode, cursor);
          } else if (code === 'Backspace') {
              const lastNode = cursor.previousSibling;
              if (lastNode && lastNode.nodeType === Node.TEXT_NODE) {
                  if (lastNode.textContent.length > 1) {
                      lastNode.textContent = lastNode.textContent.slice(0, -1);
                  } else {
                      outputDisplay.removeChild(lastNode);
                  }
              } else if (lastNode && lastNode.tagName === 'BR') {
                  outputDisplay.removeChild(lastNode);
              }
          } else if (code === 'Space') {
              // 'char' is ' ' but we check 'code' for clarity
              const textNode = document.createTextNode(' ');
              outputDisplay.insertBefore(textNode, cursor);
          } else if (code === 'Enter') {
              const br = document.createElement('br');
              outputDisplay.insertBefore(br, cursor);
          } else if (code === 'Tab') {
              const textNode = document.createTextNode('    ');
              outputDisplay.insertBefore(textNode, cursor);
          }

          // Auto-scroll to the bottom
          outputDisplay.scrollTop = outputDisplay.scrollHeight;
      };

      const handleRelease = () => {
          // Remove visual press
          key.classList.remove('active');
      };

      // Add listeners for mouse and touch
      key.addEventListener('mousedown', handlePress);
      key.addEventListener('mouseup', handleRelease);
      key.addEventListener('mouseleave', handleRelease); // In case mouse slides off

      key.addEventListener('touchstart', handlePress, { passive: false });
      key.addEventListener('touchend', handleRelease);
  });

  // --- NEW: Add click listener for clear button ---
  clearButton.addEventListener('click', () => {
      // Remove all children except the cursor
      while (outputDisplay.firstChild && outputDisplay.firstChild !== cursor) {
          outputDisplay.removeChild(outputDisplay.firstChild);
      }
      window.focus(); // Re-focus the window to continue typing
  });

  shiftToggleBtn.addEventListener('click', () => {
    let spanElement;

    keys.forEach(key => {
      console.log(key);
      key.classList.toggle('shift');

      spanElement = key.querySelector('span');
      if(spanElement) {
        spanElement.classList.toggle('shift');
      }
    });
  });


  // Focus the window to start capturing keys immediately
  window.focus();
  // Optional: Click anywhere to focus
  document.body.addEventListener('click', () => {
      window.focus();
  });
});
