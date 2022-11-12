window.onload=function () {
  let saturate = document.getElementById("saturate");
  let contrast = document.getElementById("contrast");
  let brightness = document.getElementById("brightness");
  let sepia = document.getElementById("sepia");
  let grayScale = document.getElementById("grayScale");
  let blur = document.getElementById("blur");
  let hueRotate = document.getElementById("hueRotate");

  let upload = document.getElementById("upload");
  let download = document.getElementById("download");
  let img = document.getElementById("img");

  let reset = document.querySelector("span");
  let imgBox = document.querySelector(".imgBox");

  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  function resetValue() {
    ctx.filter = "none";
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    grayScale.value = "0";
    blur.value = "0";
    hueRotate.value = "0";
  }

  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";

  upload.addEventListener("change", function () {
    resetValue();
    download.style.display = "block";
    reset.style.display = "block";
    imgBox.style.display = "block";
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.addEventListener("load", function () {
      img.setAttribute("src", file.result);
    });
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.style.display = "none";
    };
  });

  let filters = document.querySelectorAll("ul li input");
  filters.forEach(function (filter) {
    filter.addEventListener("input", function () {
      ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayScale(${grayScale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    });
  });
  reset.addEventListener("click", function () {
    resetValue();
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  });
  download.addEventListener("click", function () {
    download.href = canvas.toDataURL();
  });
};
