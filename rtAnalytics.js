function authenticate() {
    return gapi.auth2
        .getAuthInstance()
        .signIn({
            scope:
                "https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly",
        })
        .then(
            function () {
                console.log("Sign-in successful");
            },
            function (err) {
                console.error("Error signing in", err);
            }
        );
}

function loadClient() {
    gapi.client.setApiKey("AIzaSyA_bD-L4IDSZM_sT6dZbMIYwoIC3YGQCOg");
    return gapi.client
        .load(
            "https://content.googleapis.com/discovery/v1/apis/analytics/v3/rest"
        )
        .then(
            function () {
                console.log("GAPI client loaded for API");
            },
            function (err) {
                console.error("Error loading GAPI client for API", err);
            }
        );
}
function execute() {
    return gapi.client.analytics.data.realtime
        .get({
            ids: "ga:104376025",
            metrics: "rt:activeUsers",
        })
        .then(
            function (response) {
                // Handle the results here (response.result has the parsed body).
                const data =
                    response.result.totalsForAllResults["rt:activeUsers"];
                if (data < 20000) {
                    fetch("http://localhost:4200/sendtome", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: "Real Time Alert Analytics App",
                            email: "testmaddaluno@gmail.com",
                            text: ` 
                            This is an automated message from Real Time Alert App


                            Real Time Active Users : ${data}`,
                            subject: "Testing The Real time alert App",
                        }),
                    });
                }
            },
            function (err) {
                console.error("Execute error", err);
            }
        );
}
gapi.load("client:auth2", function () {
    gapi.auth2.init({
        client_id:
            "1045052146140-954msai0k6m23s85m3gku8dc5m23ji65.apps.googleusercontent.com",
    });
});

(function () {
    document.querySelector("#auth_load").addEventListener("click", () => {
        authenticate().then(loadClient);
    });

    document.querySelector("#execute").addEventListener("click", execute);
})();
