document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
  
    // onclick event
    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
    });
    
    inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
    });
    
    // we add class to element on dragover
    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();             // prevent default behviour of browser
        dropZoneElement.classList.add("drop-zone--over");
    });
    
    // class will be removed from element
    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
    });
});
    
    // addeventlistener when file is droped
dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();             // prevent default behviour of browser
  
    if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }
  
      dropZoneElement.classList.remove("drop-zone--over");
    });
});
  
  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
  
    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }
  
    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }
  
    thumbnailElement.dataset.label = file.name;
  
    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
        const reader = new FileReader();
  
        reader.readAsDataURL(file);
        reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        thumbnailElement.style.backgroundImage.style = 'border-radius: 50%'
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
}