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
import static spark.Spark.*;

public class ESP32CamServer {
    public static void main(String[] args) {
        // Налаштування порту сервера
        port(8080);

        // Маршрут для перевірки логіна
        post("/login", (request, response) -> {
            String username = request.queryParams("username");
            String password = request.queryParams("password");

            if ("muliarskiy".equals(username) && "1111".equals(password)) {
                response.status(200);
                return "Login successful";
            } else {
                response.status(401);
                return "Invalid username or password";
            }
        });

        // Маршрут для зміни роздільної здатності камери
        post("/changeResolution", (request, response) -> {
            String resolution = request.queryParams("resolution");

            // Емуляція запиту до ESP32-CAM
            boolean success = sendResolutionToESP32(resolution);

            if (success) {
                response.status(200);
                return "Resolution changed successfully!";
            } else {
                response.status(500);
                return "Failed to change resolution.";
            }
        });
    }

    // Емуляція запиту до ESP32-CAM
    private static boolean sendResolutionToESP32(String resolution) {
        System.out.println("Changing resolution to: " + resolution);
        // Тут можна додати код для реального запиту до ESP32-CAM, якщо потрібно
        return true; // Повертає успішне виконання для прикладу
    }
}
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
