import { useState } from "react";
import "./AreaDropdown.css"
import 'font-awesome/css/font-awesome.min.css';

export const AreaDropdown = ({areas, jobs, setFilteredJobs}) => {
    const [selectedArea, setSelectedArea] = useState(0)

    const handleInputChange = (e) => {
        console.log("handleInputChange called");
        const selectedAreaId = e.target.value;
        console.log("selectedAreaId:", selectedAreaId);
    console.log("jobs:", jobs);
    console.log("areas:", areas);
        setSelectedArea(selectedAreaId)
        if (jobs) {
         setFilteredJobs(jobs.filter(job => job.areaId === parseInt(selectedAreaId)))
         console.log("Filtered jobs set");   
        }
        
    }

    return (
        <div className="dropdown-container">
            
            <select id="area"
            name="selectedArea"
            value={selectedArea}
            onChange={handleInputChange}
            >
                <option value="">--Select An Area--</option>
                {areas.map((area, index) => (
                    <option key={index} value={area.id}>
                        {area.areaName}
                    </option>
                ))}
            </select>
        </div>
    )
}