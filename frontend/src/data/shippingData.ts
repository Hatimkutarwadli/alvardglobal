export interface ShippingLocation {
    name: string;
    lat: number;
    lng: number;
    color: string;
}

export const shippingDestinations: ShippingLocation[] = [
    { name: "New York", lat: 40.7128, lng: -74.0060, color: '#ff5733' },
    { name: "Dubai", lat: 25.2048, lng: 55.2708, color: '#f3ff33' },
    { name: "Los Angeles", lat: 34.0522, lng: -118.2437, color: '#f54291' },
    { name: "Canada", lat: 56.1304, lng: -106.3468, color: '#ff0000' },
    { name: "Kenya", lat: -1.2921, lng: 36.8219, color: '#006400' },
    { name: "Sri Lanka", lat: 7.8731, lng: 80.7718, color: '#ffbe00' },
    { name: "Iraq", lat: 33.3152, lng: 44.3661, color: '#007a3d' },
    { name: "England", lat: 52.3555, lng: -1.1743, color: '#ffffff' },
    { name: "Australia", lat: -25.2744, lng: 133.7751, color: '#00008b' },
    { name: "Kuwait", lat: 29.3759, lng: 47.9774, color: '#cedc00' },
    { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792, color: '#006c35' },
];