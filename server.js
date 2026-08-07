const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Store switch status
let switchStatus = false;

// Home Page
app.get("/", (req, res) => {
    res.send(`
        <h1>Smart Switch Server</h1>
        <p>Status: <b>${switchStatus ? "ON" : "OFF"}</b></p>

        <form action="/toggle" method="post">
            <button type="submit">
                ${switchStatus ? "Turn OFF" : "Turn ON"}
            </button>
        </form>
    `);
});

// Get current status
app.get("/status", (req, res) => {
    res.json({
        success: true,
        status: switchStatus ? "ON" : "OFF"
    });
});

// Toggle switch
app.post("/toggle", (req, res) => {
    switchStatus = !switchStatus;

    res.json({
        success: true,
        newStatus: switchStatus ? "ON" : "OFF"
    });
});

// Update status from ESP32
app.post("/update", (req, res) => {

    if (req.body.status === "ON") {
        switchStatus = true;
    }

    if (req.body.status === "OFF") {
        switchStatus = false;
    }

    res.json({
        success: true,
        status: switchStatus ? "ON" : "OFF"
    });
});

// OAuth Authorize (Dummy)
app.get("/oauth/authorize", (req, res) => {
    res.send("OAuth Authorize Endpoint");
});

// OAuth Token (Dummy)
app.post("/oauth/token", (req, res) => {
    res.json({
        access_token: "demo-token",
        token_type: "Bearer",
        expires_in: 3600
    });
});

// Google Fulfillment (Dummy)
app.post("/google-fulfillment", (req, res) => {

    console.log("Google Request:");
    console.log(req.body);

    res.json({
        requestId: req.body.requestId || "123",
        payload: {}
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
