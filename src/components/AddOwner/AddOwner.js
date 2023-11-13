import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetAllUserHomes,
  GetAllUsers,
  GetUserHomeSpecific,
  RemoveOwnerFromHome,
} from "../../services/userService";
import { GetOwnersByHomeId, createUserHome } from "../../services/homeService";
import "./AddOwner.css";

export const AddOwner = ({ currentUser }) => {
  const { currentHomeId } = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [otherOwners, setOtherOwners] = useState([]);
  const [userHomes, setUserHomes] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    GetAllUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    GetAllUserHomes().then((data) => {
      console.log("userHome from api", data);
      setUserHomes(data);
    });
  }, []);

  useEffect(() => {
    GetOwnersByHomeId(currentHomeId).then((data) => {
      const ownerFilter = data.filter(
        (owner) => owner.user.id !== currentUser.id
      );
      console.log("currentownerlog", ownerFilter);
      setOtherOwners(ownerFilter);
    });
  }, [currentHomeId, currentUser.id]);

  const refreshOwnerList = () => {
    GetOwnersByHomeId(currentHomeId).then((data) => {
      const ownerFilter = data.filter((owner) => owner.user.id !== currentUser.id);
    setOtherOwners(ownerFilter);
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (users.length > 0) {
      const newUserHome = {
        userId: parseInt(selectedUser),
        homeId: parseInt(currentHomeId),
      };

      createUserHome(newUserHome).then(() => {
        refreshOwnerList();
      });
    } else {
      window.alert("Please Select and Area");
    }
  };

  const handleInputChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleDeleteOwner = (userId, homeId) => {
    //a filter of userhomes with parameters
    const userHomeToDelete = userHomes.find(
      (home) =>
        home.userId === parseInt(userId) && home.homeId === parseInt(homeId)
    );
    if (userHomeToDelete) {
      const userHomeToDeleteId = userHomeToDelete.id;

      RemoveOwnerFromHome(userHomeToDeleteId).then(() => {
        //updates the state for rerender by filtering the array and removing any instance of the deleted user
        setOtherOwners((prevOwners) =>
          prevOwners.filter((owner) => owner.user.id !== userId)
        );
      });
    }
  };

  const openDeleteModal = (deleteUserId) => {
    setUserToDelete(deleteUserId)
    setIsDeleteModalVisible(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false)
    setUserToDelete(null)
  }

  return (
    <div id="main_container">
      <div id="card">
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Edit Ownership</h2>
            <ul>
              <li>
                <div id="label_otherOwners">
                  <label htmlFor="otherOwners">~Delete Another Owner~</label>
                </div>
                <ul>
                  {otherOwners.map((owner) => (
                    <div className="other_user_name">
                      <li  key={owner.id}>
                      {owner.user.name}
                      <span
                        className="remove-owner-symbol"
                        onClick={() => openDeleteModal(owner.user.id)}
                        // onClick={() =>
                        //   handleDeleteOwner(owner.user.id, currentHomeId)
                        // }
                        aria-label={`Remove ${owner.user.name}`}
                      >
                        &#10008;
                      </span>

                        
                      {isDeleteModalVisible && userToDelete === owner.user.id && (
                
                <div id="id01" className="modal" style={{ display: isDeleteModalVisible ? 'flex': 'none' }}>
                <span
                  onClick={closeDeleteModal}
                  className="close"
                  title="Close Modal"
                >
                  &times;
                </span>
                {userToDelete === owner.user.id && (
                  <form className="modal-content" >
                  <div className="container">
                    <h1>Delete Owner</h1>
                    <p>You Sure You Want To Delete Them?</p>

                    <div className="clearfix">
                      <div id="modal-btn-container">
                      <button type="button" className="cancel-btn" onClick={closeDeleteModal}>
                        Cancel
                      </button>
                      <button type="button" className="delete-btn" onClick={() =>
                          handleDeleteOwner(owner.user.id, currentHomeId)}>
                        Delete
                      </button>
                      </div>
                    </div>
                  </div>
                </form>
                )}
                
              </div>
              )}

                    </li>
                    </div>
                    
                  ))}
                </ul>

                <div id="label_owner">
                  <label htmlFor="user">Select User To Add As Owner</label>
                </div>
                <select
                  id="user"
                  required
                  name="selectedUser"
                  className=""
                  value={users.selectedUser}
                  onChange={handleInputChange}
                >
                  <option value="">-- Select A User --</option>
                  {users.map((user, index) => (
                    <option key={index} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </li>
              <div className="addOwner_btn_cont">
                <button className="button-78" onClick={handleSubmit}>
                  Submit New Co-Owner
                </button>
              </div>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};
