import { useState, useEffect } from 'react';
import LocationEntry from './assets/components/LocationEntry';
import { Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';

const App = () => {


  interface NotionData {
    object: string;
    results: any[];
  }

  const [data, setData] = useState<NotionData | null>(null);

    useEffect(() => {
        fetch('/api/getNotionData?databaseId=179841179fa380349062c49a3cb5429f')
            .then((response) => response.json())
            .then((data) => setData(data))
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
          // onCameraChanged={ (ev: MapCameraChangedEvent) =>
          //   console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          // }
        >
        </Map>
      </div>
    </div>
  );
};

export default App;