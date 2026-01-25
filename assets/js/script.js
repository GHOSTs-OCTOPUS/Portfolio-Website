'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


/*
// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}*/

// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', function () {
  console.log('Portfolio filter script loaded');

  // Filter variables
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const filterItems = document.querySelectorAll('[data-filter-item]');
  const select = document.querySelector('[data-select]');
  const selectItems = document.querySelectorAll('[data-select-item]');
  const selectValue = document.querySelector('[data-select-value]');

  // Filter function
  const filterFunc = function (selectedValue) {
    console.log('Filtering by:', selectedValue);

    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === 'all') {
        filterItems[i].classList.add('active');
        filterItems[i].style.display = 'block';
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add('active');
        filterItems[i].style.display = 'block';
      } else {
        filterItems[i].classList.remove('active');
        filterItems[i].style.display = 'none';
      }
    }

    // Update select dropdown value
    if (selectValue) {
      const buttonText = selectedValue === 'all' ? 'All' :
        selectedValue === 'personal project' ? 'Personal Project' :
          selectedValue === 'client project' ? 'Client Project' : 'Other';
      selectValue.innerText = buttonText;
    }
  };

  // Add click event to all filter buttons
  let lastClickedBtn = filterButtons[0];

  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', function () {
      const selectedValue = this.dataset.filter;
      console.log('Button clicked:', selectedValue);

      filterFunc(selectedValue);

      // Update active state of buttons
      lastClickedBtn.classList.remove('active');
      this.classList.add('active');
      lastClickedBtn = this;

      // Close select dropdown if open
      if (select) {
        select.classList.remove('active');
      }
    });
  }

  // Select dropdown functionality
  if (select) {
    select.addEventListener('click', function () {
      this.classList.toggle('active');
    });

    // Add event to all select items
    for (let i = 0; i < selectItems.length; i++) {
      selectItems[i].addEventListener('click', function () {
        const selectedValue = this.dataset.filter;
        console.log('Select item clicked:', selectedValue);

        selectValue.innerText = this.innerText;
        select.classList.remove('active');
        filterFunc(selectedValue);

        // Update active state of filter buttons
        filterButtons.forEach(btn => {
          if (btn.dataset.filter === selectedValue) {
            lastClickedBtn.classList.remove('active');
            btn.classList.add('active');
            lastClickedBtn = btn;
          }
        });
      });
    }
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function (event) {
    if (select && !select.contains(event.target)) {
      select.classList.remove('active');
    }
  });

  // Initialize with 'all' filter
  filterFunc('all');
});

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Enable/disable submit button based on form validity
formInputs.forEach(input => {
  input.addEventListener("input", () => {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// Form submission with fetch API
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Disable button and show loading state
  formBtn.textContent = "Sending...";
  formBtn.setAttribute("disabled", "");

  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
  })
    .then(response => {
      if (response.ok) {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
        form.reset(); // Reset form fields
        formBtn.textContent = "Send Message"; // Reset button text
        formBtn.setAttribute("disabled", ""); // Disable button again
      } else {
        throw new Error("Form submission failed.");
      }
    })
    .catch(error => {
      Swal.fire({
        title: "Message Sent!",
        text: "Thank you for contacting us. We will get back to you soon.",
        icon: "success",
      });
      formBtn.textContent = "Send Message"; // Reset button text
      formBtn.removeAttribute("disabled"); // Re-enable button
    });
});


// File upload preview functionality
document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('file-upload');
  const fileInfo = document.getElementById('file-info');

  if (fileInput) {
    fileInput.addEventListener('change', function () {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        const fileSize = (file.size / (1024 * 1024)).toFixed(2); // Convert to MB

        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          alert('File size exceeds 10MB limit. Please choose a smaller file.');
          this.value = ''; // Clear the input
          fileInfo.textContent = 'No file chosen';
          return;
        }

        fileInfo.textContent = `${file.name} (${fileSize} MB)`;
        fileInfo.style.color = 'var(--orange-yellow-crayola)';
      } else {
        fileInfo.textContent = 'No file chosen';
        fileInfo.style.color = 'var(--light-gray)';
      }
    });
  }

  // Form validation to enable/disable submit button
  const form = document.querySelector('[data-form]');
  const submitBtn = document.querySelector('[data-form-btn]');

  if (form && submitBtn) {
    const requiredInputs = form.querySelectorAll('[required]');

    function checkFormValidity() {
      let allValid = true;
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          allValid = false;
        }
      });

      submitBtn.disabled = !allValid;
    }

    // Check form validity on input
    requiredInputs.forEach(input => {
      input.addEventListener('input', checkFormValidity);
    });

    // Initial check
    checkFormValidity();
  }
});



// Visitor counter
// Unique namespace/key for your counter (replace with your GitHub username)
const NAMESPACE = "ghosts-octopus-portfolio";
const KEY = "visitor-count";

// Function to update the counter
function updateCounter() {
  // 1. Try to get existing count from localStorage (for repeat visits)
  let count = localStorage.getItem('siteVisits');

  // 2. If first visit, call API
  if (!count) {
    fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.value) {
          // Update display
          document.getElementById('visitorCount').textContent = data.value;
          // Store in localStorage
          localStorage.setItem('siteVisits', data.value);
          // Add animation
          document.querySelector('.visitor-counter').classList.add('pulse');
          setTimeout(() => {
            document.querySelector('.visitor-counter').classList.remove('pulse');
          }, 500);
        }
      })
      .catch(error => console.error("Counter error:", error));
  } else {
    // 3. Show existing count from localStorage
    document.getElementById('visitorCount').textContent = count;
  }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', updateCounter);


