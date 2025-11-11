// src/routes/weatherRoutes.js
import { Router } from "express";
import createError from "http-errors";
import { Weather } from "../models/Weather.js";
import { weatherSchema } from "../validation.js";
import { fetchWeather } from "../weatherService.js";

const router = Router();

/**
 * @openapi
 * /api/weather:
 *   get:
 *     summary: Retrieve all weather records.
 *     description: Returns a list of weather entries from MongoDB, optionally filtered by city.
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter results by city name.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Limit number of results.
 *     responses:
 *       200:
 *         description: List of weather records retrieved successfully.
 *   post:
 *     summary: Add new weather data.
 *     description: Create a weather record either manually or by fetching from OpenWeather using a city name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               city: "Philadelphia"
 *     responses:
 *       201:
 *         description: Weather record created successfully.
 */

/**
 * @openapi
 * /api/weather/fetch:
 *   post:
 *     summary: Fetch and store weather by city name.
 *     description: Fetch current weather from OpenWeather API and save to MongoDB.
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: City to fetch weather data for.
 *     responses:
 *       201:
 *         description: Weather fetched and saved successfully.
 */

/**
 * @openapi
 * /api/weather/{id}:
 *   get:
 *     summary: Get a specific weather record.
 *     description: Retrieve a single weather entry by its unique MongoDB ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Weather record found.
 *       404:
 *         description: Record not found.
 *   put:
 *     summary: Update a weather record.
 *     description: Update one or more fields of an existing weather record.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               description: "clear sky"
 *               temp: 25
 *     responses:
 *       200:
 *         description: Weather record updated successfully.
 *       404:
 *         description: Record not found.
 *   delete:
 *     summary: Delete a weather record.
 *     description: Remove a weather record by its MongoDB ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record deleted successfully.
 *       404:
 *         description: Record not found.
 */

// ------------------ ROUTES ------------------

/**
 * GET /api/weather
 * Optional: ?city=Philadelphia&limit=20
 * Lists recent weather documents (newest first).
 */
router.get("/", async (req, res, next) => {
  try {
    const { city, limit = 50 } = req.query;
    const filter = city ? { city } : {};
    const docs = await Weather.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit));
    res.json(docs);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/weather/:id
 * Returns a single weather document by Mongo _id.
 */
router.get("/:id", async (req, res, next) => {
  try {
    const doc = await Weather.findById(req.params.id);
    if (!doc) throw createError(404, "Weather document not found");
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/weather
 * Body option A: { "city": "Philadelphia" }
 *   -> Fetches from OpenWeather, validates, saves.
 * Body option B: full normalized payload that matches weatherSchema.
 */
router.post("/", async (req, res, next) => {
  try {
    let payload = req.body;

    if (
      payload &&
      typeof payload.city === "string" &&
      Object.keys(payload).length === 1
    ) {
      const { OPENWEATHER_API_KEY } = process.env;
      if (!OPENWEATHER_API_KEY) {
        throw createError(500, "Missing OPENWEATHER_API_KEY");
      }
      payload = await fetchWeather({
        city: payload.city,
        apiKey: OPENWEATHER_API_KEY,
      });
    }

    const parsed = weatherSchema.parse(payload);
    const saved = await Weather.create(parsed);
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/weather/:id
 * Body: any subset of allowed fields to update.
 */
router.put("/:id", async (req, res, next) => {
  try {
    const allowed = [
      "city",
      "country",
      "coordinates",
      "temp",
      "feelsLike",
      "humidity",
      "pressure",
      "windSpeed",
      "condition",
      "description",
      "fetchedAt",
    ];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => allowed.includes(k))
    );

    const updated = await Weather.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updated) throw createError(404, "Weather document not found");
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/weather/:id
 * Removes a weather document.
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const removed = await Weather.findByIdAndDelete(req.params.id);
    if (!removed) throw createError(404, "Weather document not found");
    res.json({ deleted: true, id: removed._id });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/weather/fetch?city=Philadelphia
 * Convenience endpoint: fetch from OpenWeather by query param and save.
 */
router.post("/fetch", async (req, res, next) => {
  try {
    const city = req.query.city || process.env.DEFAULT_CITY || "Philadelphia";
    const { OPENWEATHER_API_KEY } = process.env;
    if (!OPENWEATHER_API_KEY) throw createError(500, "Missing OPENWEATHER_API_KEY");

    const normalized = await fetchWeather({ city, apiKey: OPENWEATHER_API_KEY });
    const parsed = weatherSchema.parse(normalized);
    const saved = await Weather.create(parsed);
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

export default router;
