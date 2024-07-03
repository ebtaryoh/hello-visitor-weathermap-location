const axios = require("axios");
require("dotenv").config();

const OPENWEATHERMAP_API = process.env.OPENWEATHERMAP_API;

const getHelloVisitor = async (req, res) => {
  const visitorName = req.query.visitor_name || "Mark";
  const clientIp =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const cleanedClientIp = clientIp.includes("::") ? "127.0.0.1" : clientIp;

  let location = "Location not known";
  let temperature = "unknown";

  try {
    console.log(`Fetching location for IP: ${cleanedClientIp}`);
    const locationResponse = await axios.get(
      `http://ip-api.com/json/${cleanedClientIp}`
    );
    console.log("Location response:", locationResponse.data);

    const city = locationResponse.data.city;

    if (city) {
      console.log(`Fetching weather for city: ${city}`);
      const weatherResponse = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API}&units=metric`
      );
      console.log("Weather response:", weatherResponse.data);

      location = weatherResponse.data.name || "unknown location";
      temperature = weatherResponse.data.main.temp.toFixed(2);
    }
  } catch (error) {
    console.error("Error fetching location or weather:", error);
    return res
      .status(500)
      .json({ message: "Cannot retrieve location info or client IP", error });
  }

  console.log("Sending response");
  res.json({
    client_ip: cleanedClientIp,
    location: location,
    greeting: `Hello ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`,
  });
};

module.exports = getHelloVisitor;
