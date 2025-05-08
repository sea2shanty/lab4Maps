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
  { name: "Красная Площадь", lat: 55.75393, lng: 37.620795 },
  { name: "ВДНХ", lat: 55.829975, lng: 37.633184 },
  { name: "МГУ", lat: 55.703297, lng: 37.530887 },
];

const MapWithMarkers = () => {
  const [locations, setLocations] = useState(locationsMock);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setError(""); // Сбрасываем ошибку перед новым поиском

    // Проверка на пустой ввод или пробелы
    if (!search.trim()) {
      setError("Введите название места для поиска");
      setLocations([]); // Очищаем маркеры
      return;
    }

    const filtered = locationsMock.filter((loc) =>
      loc.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    // Проверка результатов поиска
    if (filtered.length === 0) {
      setError("Место не найдено, попробуйте другой запрос");
      setLocations([]);
    } else {
      setLocations(filtered);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4 relative">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Поиск места"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setError(""); // Сбрасываем ошибку при изменении ввода
            }}
            className="p-2 border border-gray-300 rounded mr-2 flex-grow"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Найти
          </button>
        </div>
        
        {/* Блок для отображения ошибок */}
        {error && (
          <div className="mt-2 text-red-500 text-sm absolute bottom-[-28px] left-0">
            {error}
          </div>
        )}
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