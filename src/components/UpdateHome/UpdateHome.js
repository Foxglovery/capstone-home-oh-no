import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { GetHomesByUserId, submitUpdateHome } from "../../services/homeService";

export const UpdateHome = ({ currentUser }) => {
    const { currentHomeId } = useParams();
    console.log("paramcheck", currentHomeId)//debug log
    const navigate = useNavigate()

    const [home, setHome] = useState({
        name: "",
        description: "",
        imgUrl:""
    })

    useEffect(() => {
        GetHomesByUserId(currentUser.id).then((currentHomeData) => {
            setHome({
                name:currentHomeData.name,
                description: currentHomeData.description,
                imgUrl: currentHomeData.imgUrl
            })
        })
    },[currentUser])

    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setHome({
            ...home,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedHome = {
            
            name: home.name,
            description: home.description,
            imgUrl: home.imgUrl
        }
        console.log("updatedHome", updatedHome)//debug log
        submitUpdateHome(updatedHome, currentHomeId).then(() => {
            navigate(`/allHomes`)
        })
    }

    return (
        <div className="update-home-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Home Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={home.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="name">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={home.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="imgUrl">Image URL:</label>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            value={home.imgUrl}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Home</button>
      </form>
    </div> 
    )
}