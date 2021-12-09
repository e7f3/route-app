import axios from "axios";

// Api для запроса к Google Geocode Api для получения адреса из координат точки

export default async function handler(req, res) {
  const { lat, lng } = req.body;
  const params = {
    latlng: `${lat},${lng}`,
    key: process.env.NEXT_PUBLIC_API_KEY,
  };
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      { params }
    );
    const formattedAddress = await response.data?.results[0][
      "formatted_address"
    ];
    const addressComponents = await response.data?.results[0][
      "address_components"
    ];
    return res.status(200).json({ formattedAddress, addressComponents });
  } catch (err) {
    console.log(err.message);
    return res.status(500);
  }
}
