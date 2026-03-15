import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { useTheme } from 'next-themes';
import { shippingDestinations } from '@/data/shippingData';

const origin = { name: "Tirupur, India", lat: 11.1085, lng: 77.3411 };

export const ShippingGlobe = () => {
    const globeRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const { theme, systemTheme } = useTheme();

    // Resolve actual theme
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight || 600,
                });
            }
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        if (globeRef.current) {
            const controls = globeRef.current?.controls?.();
            if (controls) {
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.8;
                controls.enableZoom = false;
            }

            // Reset material to allow texturing instead of solid emissive color
            const material = globeRef.current?.globeMaterial?.();
            if (material) {
                if (!isDark) {
                    // Light Mode: Light, elegant Golden hue
                    material.color.set('#F4D03F'); // Lighter, brighter gold
                    material.emissive.set('#9A7B4F'); // Soft golden glow
                    material.emissiveIntensity = 0.35;
                    material.roughness = 0.6;
                    material.metalness = 0.5; // Slightly more metallic
                } else {
                    // Dark Mode: Classic Earth
                    material.color.set('#ffffff');
                    material.emissive.set('#9A7B4F');
                    material.emissiveIntensity = 0;
                    material.roughness = 0.8;
                    material.metalness = 0.1;
                }
            }
        }
    }, [dimensions, isDark]);

    const allLocations = [origin, ...shippingDestinations];

    // Arcs styling based on theme
    const arcColor = isDark
        ? ['rgba(0, 150, 255, 0.2)', 'rgba(0, 200, 255, 1)'] // Blue/Cyan
        : ['rgba(255, 215, 0, 0.2)', 'rgba(255, 215, 0, 1)']; // Golden

    const arcsData = shippingDestinations.map(d => ({
        startLat: origin.lat,
        startLng: origin.lng,
        endLat: d.lat,
        endLng: d.lng,
        color: arcColor
    }));

    // Image assets
    // Light Mode (Golden): use the topology or color map combined with the golden material color
    // Dark Mode (Classic): beautiful high-res earth map with visible land borders 
    const globeImage = isDark
        ? "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        : "//unpkg.com/three-globe/example/img/earth-water.png";

    // Night lights or topology
    const bumpImage = "//unpkg.com/three-globe/example/img/earth-topology.png";

    return (
        <div
            ref={containerRef}
            className="w-full h-[450px] md:h-[550px] lg:h-[650px] flex items-center justify-center overflow-hidden rounded-xl relative cursor-move"
            style={{
                background: 'transparent',
                touchAction: 'pan-y' // Allows vertical page scrolling while interacting horizontally
            }}
        >
            {/* Dynamic Background Glow */}
            {!isDark && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,165,32,0.1)_0%,transparent_65%)] pointer-events-none" />
            )}
            {isDark && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,100,255,0.05)_0%,transparent_65%)] pointer-events-none" />
            )}

            {dimensions.width > 0 && typeof window !== 'undefined' && (
                <Globe
                    key={currentTheme} // Force full remount on theme change to ensure materials update
                    ref={globeRef}
                    width={dimensions.width}
                    height={dimensions.height}

                    globeImageUrl={globeImage}
                    bumpImageUrl={bumpImage}
                    backgroundColor="rgba(0,0,0,0)"

                    onGlobeReady={() => {
                        const controls = globeRef.current?.controls?.();
                        if (controls) {
                            controls.autoRotate = true;
                            controls.autoRotateSpeed = 1.5;
                            controls.enableZoom = false;
                        }

                        const material = globeRef.current?.globeMaterial?.();
                        if (material) {
                            if (!isDark) {
                                // Light Mode: Light, elegant Golden hue
                                material.color.set('#F4D03F'); // Lighter, brighter gold
                                material.emissive.set('#9A7B4F'); // Soft golden glow
                                material.emissiveIntensity = 0.35;
                                material.roughness = 0.6;
                                material.metalness = 0.5; // Slightly more metallic
                            } else {
                                // Dark Mode: Classic Earth
                                material.color.set('#ffffff');
                                material.emissive.set('#9A7B4F');
                                material.emissiveIntensity = 0;
                                material.roughness = 0.8;
                                material.metalness = 0.1;

                                // Fix for known map offsets in three-globe blue marble texture
                                if (material.map) {
                                    // material.map.offset.x = -0.25; 
                                }
                            }
                        }
                    }}

                    // Perfectly aligned 3D WebGL Markers instead of floating HTML elements
                    labelsData={allLocations}
                    labelLat={(d: any) => d.lat}
                    labelLng={(d: any) => d.lng}
                    labelText={(d: any) => d.name.toUpperCase()} // Uppercase looks bolder naturally
                    labelSize={3}
                    labelDotRadius={0.9}
                    labelDotOrientation={() => 'bottom'}
                    labelColor={() => '#fbbf24'} // Explicitly Golden for both text and dot
                    labelResolution={5}
                    labelAltitude={0.15} // Lifted significantly higher above the surface and the rings

                    // 3D Animated Glowing Rings for Premium Pulse Effect
                    ringsData={allLocations}
                    ringLat={(d: any) => d.lat}
                    ringLng={(d: any) => d.lng}
                    ringColor={(d: any) => {
                        const isOrigin = d.name === origin.name;
                        if (isDark) return isOrigin ? '#3b82f6' : '#22d3ee'; // Blue or Cyan
                        return isOrigin ? '#f97316' : '#fbbf24'; // Orange or Golden Yellow
                    }}
                    ringMaxRadius={5}
                    ringPropagationSpeed={2}
                    ringRepeatPeriod={1000}
                    ringAltitude={0.08} // Rings are lower than the text so the text isn't hidden by the wave

                    // Glowing Arcs
                    arcsData={arcsData}
                    arcDashLength={0.4}
                    arcDashGap={4}
                    arcDashInitialGap={() => Math.random() * 5}
                    arcDashAnimateTime={2500}
                    arcColor="color"
                    arcsTransitionDuration={1000}
                    arcStroke={0.5}
                    arcAltitudeAutoScale={0.5}

                    // Atmosphere
                    showAtmosphere={true}
                    atmosphereColor={isDark ? "#4b9eff" : "#ffd700"}
                    atmosphereAltitude={isDark ? 0.15 : 0.25}
                />
            )}
        </div>
    );
};

export default ShippingGlobe;
