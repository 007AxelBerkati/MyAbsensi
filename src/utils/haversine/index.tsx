export const haversineDistance = (coords1: any, coords2: any, isMiles: any) => {
  // Fungsi ini mengkonversi derajat ke radian
  function toRad(x: any) {
    return (x * Math.PI) / 180;
  }

  // Spesifikasi koordinat kedua titik
  const lon1 = coords1.longitude;
  const lat1 = coords1.latitude;
  const lon2 = coords2.longitude;
  const lat2 = coords2.latitude;

  // Jarak antara kedua titik dalam km (km)
  const R = 6371; // km

  // Membuat perhitungan jarak haversine
  const x1 = lat2 - lat1;
  const dLat = toRad(x1);
  const x2 = lon2 - lon1;
  const dLon = toRad(x2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  // Jika dibutuhkan hasil dalam mil
  return isMiles ? d * 0.621371 : d;
};
