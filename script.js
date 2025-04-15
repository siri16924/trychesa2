// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Scroll functionality
    function scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    
    // Make scrollToSection available globally
    window.scrollToSection = scrollToSection;
    
    // Event logging
    function logEvent(event, type) {
      const target = event.target;
      let elementType = "unknown";
      if (target.tagName) {
        elementType = target.tagName.toLowerCase();
      }
      console.log(`${new Date().toISOString()} , ${type} , ${elementType}`);
    }
  
    document.body.addEventListener("click", (e) => logEvent(e, "click"));
    
    // Set up reveal on scroll
    const revealElements = document.querySelectorAll('section');
    revealElements.forEach(section => {
      section.classList.add('reveal');
    });
    
    // Scroll from welcome screen to main content when arrow is clicked
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
      });
    }
    
    // Handle scroll events for revealing elements
    function checkReveal() {
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
      
      reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          element.classList.add('active');
        }
      });
    }
    
    // Initial check in case elements are already in view
    checkReveal();
    
    // Listen for scroll events
    window.addEventListener('scroll', checkReveal);
  });
  
  // Text analyzer function
  function analyzeText() {
    const text = document.getElementById("textInput").value;
    const output = document.getElementById("output");
    
    if (!text.trim()) {
      output.textContent = "Please enter some text to analyze.";
      return;
    }
    
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const words = (text.match(/\b\w+\b/g) || []).length;
    const spaces = (text.match(/ /g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = (text.match(/[!@#$%^&*()_+{}\[\]:;'"<>?,./\\|`~]/g) || []).length;
    
    const pronouns = ["he", "she", "it", "they", "we", "i", "you"];
    const prepositions = ["in", "on", "at", "since", "for", "with", "about", "against", "between", "into"];
    const articles = ["a", "an", "the"];
    
    const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    const countGroup = (group) => {
      const map = {};
      group.forEach(word => map[word] = 0);
      tokens.forEach(token => {
        if (map.hasOwnProperty(token)) map[token]++;
      });
      return map;
    };
    
    const pronounCount = countGroup(pronouns);
    const prepositionCount = countGroup(prepositions);
    const articleCount = countGroup(articles);
    
    output.textContent = `
      Letters: ${letters}
      Words: ${words}
      Spaces: ${spaces}
      Newlines: ${newlines}
      Special Symbols: ${specialSymbols}
      Pronouns:\n${JSON.stringify(pronounCount, null, 2)}
      Prepositions:\n${JSON.stringify(prepositionCount, null, 2)}
      Articles:\n${JSON.stringify(articleCount, null, 2)}
    `;
    
    // Add animation to output
    output.classList.add('pulse');
    setTimeout(() => {
      output.classList.remove('pulse');
    }, 1000);
  }