const initSlider = () => {
  const imagelist = document.querySelector(".wrapper .img-list");
  const slideButtons = document.querySelectorAll(".wrapper .slide-button");
  const sliderScrollbar = document.querySelector(
    ".container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imagelist.scrollWidth - imagelist.clientWidth;

  sliderScrollbar.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    const handleMouseMove = (e) => {
      const deltax = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltax;
      const maxThumbPosition =
        sliderScrollbar.getBoundingClientRect().width -
        scrollbarThumb.offsetWidth;

      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imagelist.scrollLeft = scrollPosition;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imagelist.clientWidth * direction;
      imagelist.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });
  const handleSlideButtons = () => {
    slideButtons[0].style.display =
      imagelist.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display =
      imagelist.scrollLeft >= maxScrollLeft ? "none" : "block";
  };
  const updateScrollThumbPosition = () => {
    const scrollPosition = imagelist.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };
  imagelist.addEventListener("scroll", () => {
    handleSlideButtons();
    updateScrollThumbPosition();
  });
};
window.addEventListener("load", initSlider);
