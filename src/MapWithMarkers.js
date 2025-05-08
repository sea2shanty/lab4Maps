

import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 55.751244, 
  lng: 37.618423,
};

const locationsMock = [
  { name: "Красная Площадь", lat: 55.753930, lng: 37.620795 },
  { name: "ВДНХ", lat: 55.829975, lng: 37.633184 },
  { name: "МГУ", lat: 55.703297, lng: 37.530887 },
];

const MapWithMarkers = () => {
  const [locations, setLocations] = useState(locationsMock);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = locationsMock.filter((loc) =>
      loc.name.toLowerCase().includes(search.toLowerCase())
    );
    setLocations(filtered);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Поиск места"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Найти
        </button>
      </form>

      <LoadScript googleMapsApiKey="AIzaSyBDwU_88HRXOBtMI-KH0FBFeGU_JRyS-vE">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
          {locations.map((loc, index) => (
            <Marker key={index} position={{ lat: loc.lat, lng: loc.lng }} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapWithMarkers;
