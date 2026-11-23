
const video = document.getElementById("camera");
const canvas = document.getElementById("overlay");
const statusText = document.getElementById("status");
const startButton = document.getElementById("startCamera");
const stopButton = document.getElementById("stopCamera");
const objectCount = document.getElementById("objectCount");
const objectList = document.getElementById("objectList");

let cameraStream = null;

// BẬT CAMERA
async function startCamera() {
  try {
    statusText.textContent = "Đang kết nối camera...";

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });

    video.srcObject = cameraStream;

    await video.play();

    statusText.textContent = "YAMA CAMERA: ONLINE";

  } catch (error) {
    console.error("Camera error:", error);
    statusText.textContent = "Không thể mở camera";

    alert("Hãy cho phép Safari sử dụng camera.");
  }
}

// TẮT CAMERA
function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }

  video.srcObject = null;

  statusText.textContent = "Camera đã tắt";

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// KIỂM TRA HỆ THỐNG
function initializeYAMA() {
  objectCount.textContent = "Số vật thể: 0";
  objectList.innerHTML = "<li>Đang chờ AI nhận diện...</li>";

  console.log("YAMA Object Vision AI initialized");
}

// SỰ KIỆN NÚT BẤM
startButton.addEventListener("click", startCamera);
stopButton.addEventListener("click", stopCamera);

// KHỞI ĐỘNG
initializeYAMA();
