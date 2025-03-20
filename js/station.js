function onScanSuccess(decodedText, decodedResult) {
    alert("QR Code Scanned: " + decodedText);

    if (
        decodedText.includes(
            "thebetteringbranchandbytepenguinarethegoatsweareup"
        )
    ) {
        // Extract the last 7 characters (adjusting substring method)
        let queryParam = decodedText.substring(
            decodedText.length - 9,
            decodedText.length - 1
        );

        // Redirect after alert is dismissed
        window.location.replace("index.html?" + queryParam);
    }
}

function onScanFailure(error) {
    console.warn("Scan error: ", error);
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const station = params.get("station");

    let stationName = document.querySelector(".stationName");
    stationName.textContent = `Station ${station}`;

    //TODO: Change Text Content of .stationDescription

    // Request camera access first
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            console.log("Camera access granted.");

            // Now initialize the QR scanner
            let html5QrCode = new Html5Qrcode("reader");
            html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: function (viewfinderWidth, viewfinderHeight) {
                        let minSize =
                            Math.min(viewfinderWidth, viewfinderHeight) * 0.75;
                        return { width: minSize, height: minSize };
                    },
                },
                onScanSuccess,
                onScanFailure
            );
        })
        .catch((error) => {
            console.error("Camera access denied:", error);
        });
});
