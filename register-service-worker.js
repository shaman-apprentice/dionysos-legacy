"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/dionysos-legacy/expo-service-worker.js",{scope:"/dionysos-legacy/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}));