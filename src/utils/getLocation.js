let timeout;

const getCoordinates = (address) => {
  clearTimeout(timeout);

  return new Promise((resolve, reject) => {
    timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );

        const data = await res.json();

        if (!data.length) return reject("Invalid address");

        resolve([
          parseFloat(data[0].lon),
          parseFloat(data[0].lat),
        ]);
      } catch (err) {
        reject(err);
      }
    }, 1000); // 👈 delay requests
  });
};

export default getCoordinates