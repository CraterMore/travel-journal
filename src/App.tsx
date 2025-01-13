import { useState, useEffect } from 'react';
import LocationEntry from './assets/components/LocationEntry';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
type Poi ={ key: string, location: google.maps.LatLngLiteral }

const App = () => {


  interface NotionData {
    object: string;
    results: any[];
  }

  const [locations, setLocations] = useState<any[]>([]);

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
    <div className="max-w-screen-lg mx-auto bg-slate-300 flex h-screen">
      <div className="w-1/3 bg-green-100 flex flex-col">
        <h1 className="font-bold text-4xl p-2 text-center">Carter's Travel Log</h1>
        <div>
          {data && data.results.map((item: any, index: number) => (
            <a key={index}>
              <LocationEntry details={item}/>
            </a>
          ))}
        </div>
      </div>
      <div className="w-2/3 bg-blue-100">
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
          <PoiMarkers pois={locations} />
        </Map>
      </div>
    </div>
  );
};

const PoiMarkers = (props: {pois: Poi[]}) => {
  return (
    <>
      {props.pois.map( (poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}>
        <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default App;