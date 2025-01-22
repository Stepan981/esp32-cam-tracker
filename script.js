document.addEventListener("DOMContentLoaded", () => {
    const cameraFeed = document.getElementById("camera-feed");

    // Переконайтеся, що IP-адреса відповідає вашому ESP32-CAM
    const esp32CamIP = "http://<ESP32-CAM-IP>";
    cameraFeed.src = `${esp32CamIP}/stream`;

    // Додаткові функції, наприклад, перевірка статусу
    fetch(`${esp32CamIP}/status`)
        .then(response => response.json())
        .then(data => console.log("Camera status:", data))
        .catch(err => console.error("Error connecting to ESP32-CAM:", err));
});
function changeResolution(resolution) {
    fetch(`http://<ESP32-CAM-IP>/control?var=framesize&val=${resolution}`)
        .then(response => response.ok ? alert("Resolution changed!") : alert("Failed to change resolution"))
        .catch(err => console.error(err));
}
