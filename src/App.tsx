import { useState, useEffect, useCallback } from 'react';
import LocationEntry from './assets/components/LocationEntry';
import { Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import LoadingList from './assets/components/LoadingList';
import PlaceDetailsPane from './assets/components/PlaceDetailsPane';
import { Analytics } from '@vercel/analytics/react';
import FilterModal from './assets/components/FilterModal';
import ImageFullscreenModal from './assets/components/ImageFullscreenModal';
type Poi ={ key: string, markerNum: number, location: google.maps.LatLngLiteral };

const App = () => {
  const map = useMap();

  interface NotionData {
    object: string;
    results: any[];
  }

  const [locations, setLocations] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [databaseProps, setDatabaseProps] = useState<any | null>(null);
  const [data, setData] = useState<NotionData | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>('');


  function compileLocations(data: any[]) {
    const locations = data.map((item: any) => {
      return {
        key: item.properties.Name.title[0].text.content,
        markerNum: item.properties.MarkerID.unique_id.number,
        location: {
          lat: item.properties.Latitude.number,
          lng: item.properties.Longitude.number,
        }
      };
    });
    setLocations(locations);
  }

  function viewImageFullscreen(imageURL: string) {
    setImageURL(imageURL);
    setImageModalOpen(true);
  }

  function closeImageFullscreen() {
    setImageModalOpen(false);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      <div className="max-w-screen-xl mx-auto bg-slate-300 flex md:flex-row flex-col-reverse h-dvh">
        <div className="w-full md:w-1/3 bg-lionsmane flex flex-col h-2/3 md:h-full">
          <h1 className="font-bold text-4xl p-2 text-center font-display">Carter's Travel Log</h1>
          <FilterModal isOpen={true} onClose={() => console.log("close")} options={{type: ["Type 1", "Type 2"], price: ["-", "$"], tags: ["Cool", "Upscale"]}} onApply={(data) => console.log("Saved")}/>
          <div className="text-center text-sm -translate-y-2">My recommendations and experiences in London and Paris!</div>
          <div className="flex flex-col gap-2 px-3 overflow-y-auto mb-3">
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
          {isMobile && selected &&
            <PlaceDetailsPane data={data?.results.find((item: any) => item.properties.Name.title[0].text.content === selected)} setSelected={setSelected} viewImageFullscreen={viewImageFullscreen}/>
          }
        </div>
        <div className="w-full md:w-2/3 bg-midnight relative flex flex-col justify-end px-4 md:h-auto flex-grow">
          <div className="w-full h-full absolute inset-0">
            <Map
            defaultZoom={isMobile ? 13 : 14}
            defaultCenter={ { lat: 51.523114881185045, lng: -0.10665739073381586 } }
            streetViewControl={false}
            fullscreenControl={false}
            mapId="c43f84728610854c"
            // onCameraChanged={ (ev: MapCameraChangedEvent) =>
            //   console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            // }
            >
              <PoiMarkers pois={locations} setSelected={setSelected} selected={selected} />
              
            </Map>
            
          </div>
          {!isMobile && selected &&
          <PlaceDetailsPane data={data?.results.find((item: any) => item.properties.Name.title[0].text.content === selected)} setSelected={setSelected} viewImageFullscreen={viewImageFullscreen}/>
          }
        </div>
      </div>
      <ImageFullscreenModal imageURL={imageURL} open={imageModalOpen} close={closeImageFullscreen}/>
      <Analytics />
    </div>
  );
};

const PoiMarkers = (props: {pois: Poi[], setSelected: (place: string | null) => void, selected: string | null}) => {
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
            <div className={props.selected===poi.key ? "bg-midnight rounded-full w-10 h-10 animate-bounce border-celeste border-2 flex": "bg-midnight rounded-full w-8 h-8 border-celeste border-2 flex"}>
              <div className="text-celeste text-center font-bold text-xl m-auto">{poi.markerNum}</div>
            </div>
        {/* <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} /> */}
        </AdvancedMarker>
      ))}
    </>
  );
};

export default App;