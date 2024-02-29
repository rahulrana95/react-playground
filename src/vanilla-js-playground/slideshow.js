// Create a function to generate the slideshow
function createSlideshow() {
  // Create slideshow container
  const slideshowContainer = document.createElement("div");
  slideshowContainer.classList.add("slideshow-container");

  // Create slides
  const images = [
    "https://picsum.photos/200",
    "https://picsum.photos/300",
    "https://picsum.photos/400",
  ];
  images.forEach((image, index) => {
    const slide = document.createElement("div");
    slide.classList.add("slide", "fade");
    slide.innerHTML = `<img src="${image}" alt="Slide ${index + 1}">`;
    slideshowContainer.appendChild(slide);
  });

  // Append slideshow to content area
  const contentArea = document.getElementById("v_content-area");
  contentArea.innerHTML = "";
  contentArea.appendChild(slideshowContainer);

  // Start slideshow
  let currentIndex = 0;
  const slides = slideshowContainer.querySelectorAll(".slide");
  setInterval(() => {
    slides[currentIndex].classList.remove("show");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("show");
  }, 2000); // Change the interval as needed
}

// Dynamically append CSS styles for the slideshow
const style = document.createElement("style");
style.textContent = `
  .slideshow-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: auto;
  }

  .slide {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: opacity 2s ease-in-out;
  }

  .fade {
    opacity: 0;
  }

  .fade.show {
    display: block;
    opacity: 1;
  }
`;
document.head.appendChild(style);

function createSlideshowStart() {
  document.addEventListener("SlideShow", () => {
    // Execute the function to create the slideshow
    createSlideshow();
  });
}

createSlideshowStart();

export default createSlideshowStart;
