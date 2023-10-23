import { useParams } from "react-router-dom"
import "./HomeDetails.css"
import { useEffect, useState } from "react"
import { GetHomeById } from "../../services/homeService"

export const HomeDetails = () => {
    const { homeId } = useParams()
    const [home, setHome] = useState([])
    
    useEffect(() => {
        GetHomeById(homeId).then(data => {
            console.log("Data from API:", data); // Debug line
            
            
            setHome(data)
        })
    },[homeId])
    
    return (
        <div>
          {home.length > 0 ? (
            <>
              <h1>{home[0].home?.name}</h1>
              <p>{home[0].home?.description}</p>
              {/* joins my owners in one beautiful stress-free string */}
              <p>Owners: {home.map(homeEntry => homeEntry.user?.name).join(", ")}</p>
              {/* more properties */}
            </>
          ) : (
            'Loading...'
          )}
        </div>
      );
      
      
}