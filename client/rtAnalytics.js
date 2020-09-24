document.addEventListener("DOMContentLoaded", () => {
    let isLoggedIn = false;
    let data;
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
                    isLoggedIn = true;
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
    function execute(cap) {
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
                    if (data < cap) {
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
                    } else {
                        console.log(
                            "All OK, the real time users are",
                            data,
                            "The cap is",
                            cap
                        );
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

    (function () {
        const initializeScan = (cap, scanObject) => {
            setTimeout(() => {
                if (isLoggedIn) {
                    execute(cap);
                    console.log("clicked");
                } else {
                    console.error("Please Log in");
                }
            }, scanObject.timeBeforeScan);
        };

        class Scan {
            constructor(hour, minute = 0, second = 0) {
                this.hour = hour;
                this.minute = minute;
                this.second = second;
                this.now = new Date();
                this.timeBeforeScan =
                    new Date(
                        this.now.getFullYear(),
                        this.now.getMonth(),
                        this.now.getDate(),
                        this.hour,
                        this.minute,
                        this.second,
                        0 //milliseconds
                    ) - this.now;
            }
        }

        let scan10 = new Scan(10, 0);
        initializeScan(2000, scan10);

        let scan10_25 = new Scan(10, 25);
        initializeScan(2000, scan10_25);

        let scan10_27 = new Scan(10, 27);
        initializeScan(2000, scan10_27);

        let scan10_30 = new Scan(10, 30);
        initializeScan(2000, scan10_30);

        let scan10_40 = new Scan(10, 40);
        initializeScan(2000, scan10_40);

        let scan11 = new Scan(11, 0);
        initializeScan(4000, scan11);

        let scan12 = new Scan(12, 0);
        initializeScan(6000, scan12);

        let scan13 = new Scan(13, 0);
        initializeScan(7000, scan13);

        let scan14 = new Scan(17, 28);
        initializeScan(8000, scan14);
        console.log(scan14);
    })();
});
