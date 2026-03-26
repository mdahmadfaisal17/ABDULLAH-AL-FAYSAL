import cors from "cors";
import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.js";
import apiRouter from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandlers.js";
import { requireDbConnection } from "./middleware/requireDbConnection.js";

const app = express();

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

const configuredAllowedOrigins = [
  process.env.CLIENT_URL,
  process.env.WEBSITE_BASE_URL,
  process.env.CLIENT_URLS,
]
  .filter(Boolean)
  .flatMap((value) => String(value).split(","))
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...configuredAllowedOrigins]));

function isLocalDevOrigin(origin) {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
}

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || isLocalDevOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_request, response) => {
  response.json({
    message: "Abdullah Al Faysal | Brand Identity Designer & Mockup Expert API is running.",
    docs: "/api",
  });
});

app.use("/auth", authRouter);
app.use("/api/auth", authRouter);
app.use("/api", requireDbConnection, apiRouter);
app.use("/", requireDbConnection, apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
