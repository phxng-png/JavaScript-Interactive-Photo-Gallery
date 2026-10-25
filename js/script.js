(function () {
  const previewImage = document.getElementById("image");
  const previewCaption = document.getElementById("image-caption");
  const previewCount = document.getElementById("preview-count");
  const resetButton = document.getElementById("gallery-reset");
  const thumbRow = document.getElementById("gallery-thumbs");
  const thumbs = thumbRow ? Array.from(thumbRow.querySelectorAll(".thumb")) : [];

  if (!previewImage || !thumbs.length) return;

  const initialPreview = {
    src: previewImage.getAttribute("src"),
    alt: previewImage.getAttribute("alt"),
    caption: previewCaption ? previewCaption.textContent : "",
    count: previewCount ? previewCount.textContent : "",
    thumb: thumbRow.querySelector(".thumb.is-active") || thumbs[0]
  };

  function upDate(previewPic) {
    if (!previewPic) return;

    const sourceImage = previewPic.tagName === "IMG" ? previewPic : previewPic.querySelector("img");
    if (!sourceImage) return;

    const thumb = sourceImage.closest(".thumb");

    previewImage.src = sourceImage.currentSrc || sourceImage.src;
    previewImage.alt = sourceImage.alt;

    if (previewCaption) {
      previewCaption.textContent = thumb && thumb.dataset.caption ? thumb.dataset.caption : sourceImage.alt;
    }

    if (previewCount) {
      previewCount.textContent = thumb && thumb.dataset.number ? thumb.dataset.number : "";
    }

    thumbs.forEach(function (item) {
      item.classList.toggle("is-active", item === thumb);
    });
  }

  function undo() {
    previewImage.src = initialPreview.src;
    previewImage.alt = initialPreview.alt;

    if (previewCaption) previewCaption.textContent = initialPreview.caption;
    if (previewCount) previewCount.textContent = initialPreview.count;

    thumbs.forEach(function (item) {
      item.classList.toggle("is-active", item === initialPreview.thumb);
    });
  }

  window.upDate = upDate;
  window.undo = undo;

  thumbs.forEach(function (thumb) {
    thumb.addEventListener("mouseenter", function () {
      upDate(thumb);
    });

    thumb.addEventListener("focus", function () {
      upDate(thumb);
    });

    thumb.addEventListener("click", function () {
      upDate(thumb);
    });

    thumb.addEventListener("mouseleave", function () {
      if (document.activeElement !== thumb) undo();
    });

    thumb.addEventListener("blur", function () {
      undo();
    });
  });

  if (resetButton) {
    resetButton.addEventListener("click", undo);
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
