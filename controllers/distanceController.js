exports.getDistance = async (req, res) => {
    try {
        const { Destination_Latitude, Destination_Longitude } = req.query;

        // user it basically containd the user information
        const user = req.userInfo;
        const distance = calculateDistance(user.latitude, user.longitude, Destination_Latitude, Destination_Longitude);

        res.status(200).json({ status_code: 200, message: 'Distance calculated', distance: `${distance}km` });
    } catch (err) {
        res.status(500).json({ status_code: 500, message: 'Error calculating distance', error: err.message });
    }
};

function calculateDistance(lat1, lon1, lat2, lon2) {
    // Radius of the earth in km
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
