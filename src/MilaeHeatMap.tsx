// src/components/MilaeHeatMap.tsx
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

export default function MilaeHeatMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
        center: [-12.97, -38.5],
        zoom: 12,
    });

    // camadas de mapa
    const normal = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
    });

    const relevo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenTopoMap contributors",
    });

    const sateliteBase = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
            attribution: "Tiles &copy; Esri",
            maxZoom: 19,
        }
    );

    const sateliteRuas = L.tileLayer(
        "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}",
        {
            attribution: "Labels &copy; Esri",
            maxZoom: 19,
            opacity: 0.9,
        }
    );

    const sateliteNomes = L.tileLayer(
        "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
        {
            attribution: "Places &copy; Esri",
            maxZoom: 19,
            opacity: 0.9,
        }
    );

    const hibrido = L.layerGroup([sateliteBase, sateliteRuas, sateliteNomes]);

    // adiciona padrão
    hibrido.addTo(map);

    // controle de camadas (igual Google Maps / Power BI)
    L.control
        .layers({
            "Mapa padrão": normal,
            Relevo: relevo,
            Satélite: sateliteBase,
            Híbrido: hibrido,
        })
        .addTo(map);

    // heatmap
    const heatPoints = [
        [-12.9714, -38.5014, 1.0],
        [-12.9500, -38.4800, 0.9],
        [-12.9900, -38.4700, 0.8],
        [-12.8200, -38.3200, 0.7],
        [-12.7300, -38.3300, 0.6],
        [-12.6500, -38.3200, 0.5],
        [-12.6700, -38.4800, 0.6],
        [-12.7400, -38.4500, 0.5],
    ];

    const heatLayer = (L as any).heatLayer(heatPoints, {
        radius: 45,
        blur: 30,
        maxZoom: 17,
        minOpacity: 0.5,
        gradient: {
            0.2: "#fef08a",
            0.4: "#f59e0b",
            0.7: "#f97316",
            1.0: "#dc2626",
        },
    });

    heatLayer.addTo(map);

    map.setView([-12.97, -38.5], 11);

    return () => {
        map.remove();
    };
    }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "420px",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    />
  );
}