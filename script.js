
const esp32CamIP = "http://192.168.50.225"; // Змініть на IP вашої ESP32-CAM

function login(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Перевірка логіна і пароля
    if (username === "muliarskiy" && password === "1111") {
        alert("Login successful!");
        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").style.display = "block";

        // Показ потоку відео
        const cameraFeed = document.getElementById("camera-feed");
        cameraFeed.src = `${esp32CamIP}/stream`; // Потік з ESP32-CAM
    } else {
        alert("Invalid username or password!");
    }
}

function changeResolution(resolution) {
    fetch(`${esp32CamIP}/control?var=framesize&val=${resolution}`)
        .then(response => {
            if (response.ok) {
                alert("Resolution changed successfully!");
            } else {
                alert("Failed to change resolution.");
            }
        })
        .catch(err => console.error("Error changing resolution:", err));
}
