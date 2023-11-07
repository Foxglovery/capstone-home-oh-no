import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { GetHomesByUserId, createHome, createUserHome, submitUpdateHome } from "../../services/homeService";
import "./AddAHome.css"

export const AddAHome = ({ currentUser }) => {
    const { currentHomeId } = useParams();
    console.log("paramcheck", currentHomeId)//debug log
    const navigate = useNavigate()
    const [userHome, setUserHome] = useState({})
    const [home, setHome] = useState({
        name: "",
        description: "",
        imgUrl:""
    })

  

    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setHome({
            ...home,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newHome = {
            
            name: home.name,
            description: home.description,
            imgUrl: home.imgUrl
        }

        const createdHomeResponse = await createHome(newHome)
        const createdHome = await createdHomeResponse.json()
        console.log("home created", createdHome)
        const newUserHome = {
            userId: currentUser.id,
            homeId: createdHome.id

        }
        await createUserHome(newUserHome)
        console.log('userHomes created for home ID:', newUserHome)
        navigate(`/allHomes`)

        
    }

    return (
      <div id="main_container">
      <div id="card">
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Add A Home</h2>
            <ul>
              <li>
                <div id="label_title">
                  <label htmlFor="name"> Name</label>
                </div>
                <input
                  type="text"
                  required
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  value={home.name}
                  onChange={handleInputChange}
                 
                />
                <div id="label_imgUrl">
                  <label htmlFor="imgUrl"> Image URL</label>
                </div>
                <input
                  type="url"
                  id="imgUrl"
                  name="imgUrl"
                  placeholder="Enter image URL"
                  value={home.imgUrl}
                  onChange={handleInputChange}
                  
                />
              </li>
    
              <li>
                <div id="label_description">
                  <label htmlFor="description">Description</label>
                </div>
                <textarea
                  name="description"
                  className="field-style"
                  maxLength={84}
                  placeholder="Enter description"
                  value={home.description}
                  onChange={handleInputChange}
                ></textarea>
              </li>
            </ul>
            {/* Here Be Buttons */}
            <div className="btn-wrapper">
              <button
                className="form-btn button-79"
                type="button"
                onClick={handleSubmit}
              >
                 Submit Home
              </button>
              <button
                className="form-btn button-81"
                type="button"
                onClick={() => navigate(-1)}
              >
                 Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    )
}