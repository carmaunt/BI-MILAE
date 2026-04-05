import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

type Props = {
  heatPoints: [number, number, number][];
};

export default function MilaeHeatMap({ heatPoints }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [-12.97, -38.5],
      zoom: 11,
    });

    const normal = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    });

    const relevo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenTopoMap contributors",
    });

    const sateliteBase = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "Tiles &copy; Esri", maxZoom: 19 }
    );

    const sateliteRuas = L.tileLayer(
      "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}",
      { attribution: "Labels &copy; Esri", maxZoom: 19, opacity: 0.9 }
    );

    const sateliteNomes = L.tileLayer(
      "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { attribution: "Places &copy; Esri", maxZoom: 19, opacity: 0.9 }
    );

    const hibrido = L.layerGroup([sateliteBase, sateliteRuas, sateliteNomes]);

    hibrido.addTo(map);
    L.control
      .layers({
        "Mapa padrão": normal,
        Relevo: relevo,
        Satélite: sateliteBase,
        Híbrido: hibrido,
      })
      .addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const heatLayer = (L as any).heatLayer(heatPoints, {
      radius: 18,
      blur: 12,
      maxZoom: 18,
      minOpacity: 0.35,
      gradient: {
        0.2: "#fef08a",
        0.45: "#f59e0b",
        0.75: "#f97316",
        1.0: "#dc2626",
      },
    }).addTo(map);

    const debugPoints = L.layerGroup(
      heatPoints.map(([lat, lng]) =>
        L.circleMarker([lat, lng], {
          radius: 4,
          weight: 1,
          color: "#111827",
          fillColor: "#ffffff",
          fillOpacity: 0.9,
        })
      )
    ).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
      map.removeLayer(debugPoints);
    };
  }, [heatPoints]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "420px", borderRadius: "16px", overflow: "hidden" }}
    />
  );
}