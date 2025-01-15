import { useState, useEffect, useCallback } from 'react';
import LocationEntry from './assets/components/LocationEntry';
import { Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { FaArrowLeft } from "react-icons/fa";
import LoadingList from './assets/components/LoadingList';
import { MdLocationPin } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
type Poi ={ key: string, location: google.maps.LatLngLiteral }

const App = () => {
  const map = useMap();

  interface NotionData {
    object: string;
    results: any[];
  }

  const [locations, setLocations] = useState<any[]>([]);

  const [selected, setSelected] = useState<string | null>(null);

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
            .catch((error) => console.error("Error fetching data:", error));
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
          <h1 className="font-bold text-4xl p-2 text-center font-display">Carter's Travel Log</h1>
          <div className="flex flex-col gap-2 px-2">
            {data ? data.results.map((item: any, index: number) => (
              <a className="cursor-pointer" key={index} onClick={() => {
                setSelected(item.properties.Name.title[0].text.content)
                map?.panTo({lat: item.properties.Latitude.number, lng: item.properties.Longitude.number});
                }}>
                <LocationEntry details={item} selected={selected==item.properties.Name.title[0].text.content}/>
              </a>
            ))
            :
            <LoadingList/>
          }
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
              <div className="my-auto min-w-fit">
                <FaArrowLeft size={32} className="cursor-pointer" onClick={() => setSelected(null)}/>
              </div>
              <div className="my-auto grow h-fit overflow-hidden">
                <div className="text-3xl font-display font-bold">
                  {selected}
                </div>
                <p className="truncate text-orange-900">
                  {data?.results.find((item: any) => item.properties.Name.title[0].text.content === selected).properties.Description.rich_text[0].text.content}
                </p>
              </div>
            </div>
            <div className="mt-14 px-4 pt-4">
              <div className="flex flex-row w-full gap-2">
                <div className="grow flex flex-col">
                  <div className="flex overflow-hidden gap-1">
                    <MdLocationPin size={26} color="#708C69"/>
                    <h1 className="text-lg truncate font-light">Address</h1>
                  </div>
                  <div className="flex overflow-hidden gap-1">
                    <MdDateRange size={26} color="#708C69"/>
                    <h1 className="text-lg truncate font-light">Visited on {data?.results.find((item: any) => item.properties.Name.title[0].text.content === selected).properties.Visited.date.start}</h1>
                  </div>
                  <div className="my-auto">
                    <h2 className="text-2xl">Rating: {data?.results.find((item: any) => item.properties.Name.title[0].text.content === selected).properties.Rating.number}</h2>
                  </div>
                </div>
                <div>
                <div className="bg-midnight rounded-full h-16 w-16 p-5 mx-auto">
                  <FaExternalLinkAlt color="white" className="w-full h-full"/>
                </div>
                <p className="max-w-16 text-sm text-center text-midnight mt-2">
                  Google Maps
                </p>
                </div>
                
              </div>
            </div>
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