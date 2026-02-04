Module.register("MMM-BackgroundSlideshow", {
  defaults: {
    imagePaths: ["modules/MMM-BackgroundSlideshow/exampleImages/"],
    transitionImages: true,
    randomizeImageOrder: true,
    slideshowSpeed: 2000,
  },

  start: function() {
    Log.info("Starting module: " + this.name);
    this.currentImageIndex = 0;
    this.images = this.getImages();
    this.scheduleUpdate();
  },

  scheduleUpdate: function() {
    this.updateDom();
    setTimeout(() => {
      this.scheduleUpdate();
    }, this.config.slideshowSpeed);
  },

  getImages: function() {
    // For demo purposes, return some placeholder images
    return [
      "https://via.placeholder.com/800x600/FF0000/FFFFFF?text=Image+1",
      "https://via.placeholder.com/800x600/00FF00/FFFFFF?text=Image+2",
      "https://via.placeholder.com/800x600/0000FF/FFFFFF?text=Image+3"
    ];
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    `;

    var img = document.createElement("img");
    img.src = this.images[this.currentImageIndex];
    img.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
    `;

    wrapper.appendChild(img);

    // Cycle to next image
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;

    return wrapper;
  },
});
