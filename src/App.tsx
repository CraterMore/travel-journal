import { useState, useEffect, useCallback } from 'react';
import LocationEntry from './assets/components/LocationEntry';
import { Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { FaArrowLeft } from "react-icons/fa";
import FilterModal from './assets/components/FilterModal';
type Poi ={ key: string, location: google.maps.LatLngLiteral }

const App = () => {


  interface NotionData {
    object: string;
    results: any[];
  }

  const [locations, setLocations] = useState<any[]>([]);

  const [selected, setSelected] = useState<string | null>(null);

  const [databaseProps, setDatabaseProps] = useState<any | null>(null);
  const [data, setData] = useState<NotionData | null>(null);

  function compileLocations(data: any[]) {
    const locations = data.map((item: any) => {
      return {
        key: item.properties.Name.title[0].text.content,
        location: {
          lat: item.properties.Latitude.number,
          lng: item.properties.Longitude.number,
        }
      };
    });
    setLocations(locations);
  }

    useEffect(() => {
        fetch('/api/getNotionData?databaseId=179841179fa380349062c49a3cb5429f')
            .then((response) => response.json())
            .then((data) => {
              setData(data);
              compileLocations(data.results);
            })
            .catch((error) => console.error("Error fetching database pages:", error));
        fetch('/api/getNotionDatabaseProps?databaseId=179841179fa380349062c49a3cb5429f')
            .then((response) => response.json())
            .then((data) => {
              setDatabaseProps(data);
            })
            .catch((error) => console.error("Error fetching database:", error));
    }, []);

  // async function fetchData() {
  //   try {
  //     const databaseId : string = process.env.NOTION_PAGE_ID || '';
  //     const response = await notion.databases.retrieve({ database_id: databaseId });
  //     console.log(response);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }
  

  return (
    <div className="bg-lionsmane">
      <div className="max-w-screen-xl mx-auto bg-slate-300 flex h-screen">
        <div className="w-1/3 bg-lionsmane flex flex-col">
          <h1 className="font-bold text-4xl p-2 text-center">Carter's Travel Log</h1>
          <FilterModal isOpen={true} onClose={() => console.log("close")} options={{type: ["Type 1", "Type 2"], price: ["-", "$"], tags: ["Cool", "Upscale"]}} onApply={(data) => console.log("Saved")}/>
          <div className="flex flex-col gap-2 px-2">
            {data && data.results.map((item: any, index: number) => (
              <a className="cursor-pointer" key={index} onClick={() => {setSelected(item.properties.Name.title[0].text.content)}}>
                <LocationEntry details={item} selected={selected==item.properties.Name.title[0].text.content}/>
              </a>
            ))}
          </div>
        </div>
        <div className="w-2/3 bg-midnight relative flex flex-col justify-end px-4">
          <div className="w-full h-full absolute inset-0">
            <Map
            defaultZoom={14}
            defaultCenter={ { lat: 51.509865, lng: -0.118092 } }
            streetViewControl={false}
            fullscreenControl={false}
            mapId="c43f84728610854c"
            // onCameraChanged={ (ev: MapCameraChangedEvent) =>
            //   console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            // }
            >
              <PoiMarkers pois={locations} setSelected={setSelected} />
              
            </Map>
            
          </div>
          {selected &&
          <div className="bg-white drop-shadow-xl h-2/3 w-96 rounded-t-3xl relative z-10">
            <div className="absolute flex flex-row gap-3 justify-start px-4 -top-10 -right-5 w-[110%] rounded-2xl rotate-1 h-24 bg-marigold">
              <FaArrowLeft size={32} className="my-auto cursor-pointer" onClick={() => setSelected(null)}/>
              <div className="my-auto h-fit w-fit text-3xl">
                {selected}
              </div>
            </div>
            {selected}
          </div>
          }
        </div>
      </div>
    </div>
  );
};



const PoiMarkers = (props: {pois: Poi[], setSelected: (place: string | null) => void}) => {
  const map = useMap();
  
  const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
    if(!map) return;
    if(!ev.latLng) return;
    console.log('marker clicked:', ev.latLng.toString());
    map.panTo(ev.latLng);
  }, []);

  return (
    <>
      {props.pois.map( (poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          clickable={true}
          onClick={(ev: google.maps.MapMouseEvent) => {
            props.setSelected(poi.key);
            handleClick(ev);
          }}>
        <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default App;