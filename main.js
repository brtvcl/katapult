document.addEventListener('DOMContentLoaded', function() {
    const speedometer = document.getElementById('speedometer');
    const gpsSpeed = document.getElementById('gpsSpeed');
    const startButton = document.getElementById('startButton');
    const info = document.getElementById('info');
    
    let accelerometerSpeed = 0; // Speed calculated from accelerometer (m/s)
    let gpsWatchId = null;
    let acceleration = null;
    
    function startTracking() {
        if (navigator.geolocation) {
            gpsWatchId = navigator.geolocation.watchPosition(function(position) {
                // Calculate GPS speed in km/h
                let gpsSpeedKmh = position.coords.speed * 3.6 || 0;
                gpsSpeed.textContent = `GPS Speed: ${gpsSpeedKmh.toFixed(1)} km/h`;
            }, function(error) {
                console.error('Error getting GPS data:', error);
                info.innerHTML+="Error getting GPS data:"+error.message;

            });
        } else {
            console.error('Geolocation is not supported by this browser.');
            info.innerHTML+="Geolocation is not supported by this browser"
        }
        
        window.addEventListener('devicemotion', function(event) {
            acceleration = event.accelerationIncludingGravity;
            // Calculate speed from accelerometer data (simple estimation)
            accelerometerSpeed = Math.sqrt(acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2);
            accelerometerSpeed = accelerometerSpeed.toFixed(2); // Round to two decimal places
            
            // Convert accelerometer speed to km/h (assuming 1 m/s^2 = 3.6 km/h)
            let accelerometerSpeedKmh = accelerometerSpeed * 3.6;
            
            speedometer.textContent = `${accelerometerSpeedKmh.toFixed(1)} km/h`;
        });
    }
    
    startButton.addEventListener('click', function() {
        startTracking();
        startButton.disabled = true; // Disable button after starting
    });
});