import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetOneHomeById,
  GetOwnersByHomeId,
  submitUpdateHome,
} from "../../services/homeService";

export const UpdateHome = ({ currentUser }) => {
  const { currentHomeId } = useParams();
  const [owners, setOwners] = useState([]);

  const navigate = useNavigate();

  const [home, setHome] = useState({
    name: "",
    description: "",
    imgUrl: "",
  });

  useEffect(() => {
    GetOneHomeById(currentHomeId).then((homeObj) => {
      if (homeObj.length > 0) {
        setHome({
          name: homeObj[0]?.name,
          description: homeObj[0]?.description,
          imgUrl: homeObj[0]?.imgUrl,
        });
      }
    });
  }, [currentHomeId]);

  useEffect(() => {
    GetOwnersByHomeId(currentHomeId).then((ownerArray) => {
      setOwners(ownerArray);
    });
  }, [currentHomeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHome({
      ...home,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedHome = {
      name: home.name,
      description: home.description,
      imgUrl: home.imgUrl,
    };

    submitUpdateHome(updatedHome, currentHomeId).then(() => {
      navigate(-1);
    });
  };
  const isHomeOwner = owners.some((owner) => owner.userId === currentUser.id);
  return (
    <>
      {isHomeOwner ? (
        <div id="main_container">
          <div id="card">
            <div>
              <form onSubmit={handleSubmit}>
                <h2>Update Home</h2>
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
                    className="form-btn button-79"
                    type="button"
                    onClick={() => navigate(`/addOwner/${currentHomeId}`)}
                  >
                    Edit Owners
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
