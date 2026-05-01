const getAddress = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: { "User-Agent": "your-app" }
      }
    );

    const data = await res.json();

    const area =
      data.address?.suburb ||
      data.address?.neighbourhood ||
      data.address?.village ||
      "";

    const city =
      data.address?.city ||
      data.address?.town ||
      data.address?.county ||
      "";

    const country = data.address?.country || "";

    // ✅ Clean short format
    return `${area}, ${city}, ${country}`.replace(/^,|,$/g, "");

  } catch (error) {
    console.log(error);
    return "Unknown location";
  }
};

export default getAddress