const express = require("express")
const app = express();
const cors = require("cors");
const PORT = 3000

app.use(express.json());
app.use(require("morgan")("dev"));

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api", require("./api"));






app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status ?? 500;
    const message = err.message ?? 'Internal server error';
    res.status(status).json({ message });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})