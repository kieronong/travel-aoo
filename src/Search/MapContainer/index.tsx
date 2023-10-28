import { GoogleMap, LoadScript } from '@react-google-maps/api';

const mapStyles = {
  height: "100vh",
  width: "100%"
};

const defaultCenter = {
  lat: 40.712776,
  lng: -74.005974
};

function MapContainer() {
  return (
    <LoadScript
      googleMapsApiKey='AIzaSyAd4qE0Arj9FNGITFuHVJpYx-FRJn31Hfc'
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
      </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer;
