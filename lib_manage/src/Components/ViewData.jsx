import { useEffect, useState } from "react";
import axios from 'axios';
import io from 'socket.io-client';  
import { toast, ToastContainer } from "react-toastify";

export function Viewdata() {
  const [userdata, setUserdata] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const socket = io('http://localhost:5000'); 

    axios.get('http://localhost:5000/users')
      .then(response => {
        setUserdata(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    socket.on('userCreated', (newUser) => {
      setUserdata(prevData => [...prevData, newUser]);
    });

    socket.on('userUpdated', (updatedUser) => {
      setUserdata(prevData =>
        prevData.map(user => (user._id === updatedUser._id ? updatedUser : user))
      );
    });

    socket.on('userDeleted', (userId) => {
      setUserdata(prevData => prevData.filter(user => user._id !== userId));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const deletedata = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setUserdata(userdata.filter(user => user._id !== id));
        toast.success("Data delete successfully");
      })
      .catch(error => {
        console.error(error);
        toast.error('something went wrong');
      });
  };

  const enterEditMode = (user) => {
    setEditMode(user._id);
    setFormData({ ...user });
  };

  const saveEdits = (id) => {
    axios.put(`http://localhost:5000/users/${id}`, formData)
      .then(response => {
        setUserdata(userdata.map(user => (user._id === id ? response.data : user)));
        setEditMode(null);
        toast.success("Data changed");
      })
      .catch(error => {
        console.error(error);
        toast.error("something went wrong");
      });
  };

  return (
    <>
      <div className="bg-customdark text-white min-h-screen flex flex-col justify-center items-center">
        <table className="border border-white ">
          <thead>
            <tr className="bg-customgray">
              <th className="px-4 py-2">NO.</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Book ID</th>
              <th className="px-4 py-2">Book Name</th>
              <th className="px-4 py-2">Book Author Name</th>
              <th className="px-4 py-2">EDIT</th>
              <th className="px-4 py-2">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {userdata.length > 0 ? (
              userdata.map((user, index) => (
                <tr key={user._id} className="bg-customdark">
                  {editMode === user._id ? (
                    <>
                      <td className="border border-white px-4 py-2">{index + 1}</td>
                      <td className="border border-white px-4 py-2">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-transparent text-white border-b border-white w-[100px]" 
                        />
                      </td>
                      <td className="border border-white px-4 py-2">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-transparent text-white border-b border-white w-[150px] " 
                        />
                      </td>
                      <td className="border border-white px-4 py-2">
                        <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="bg-transparent text-white border-b border-white w-[150px] " 
                        />
                      </td>
                      <td className="border border-white px-4 py-2">
                        <input
                          type="text"
                          name="bookID"
                          value={formData.bookID}
                          onChange={handleInputChange}
                          className="bg-transparent text-white border-b border-white w-[150px] " 
                        />
                      </td>
                      <td className="border border-white px-4 py-2">
                        <input
                          type="text"
                          name="bookName"
                          value={formData.bookName}
                          onChange={handleInputChange}
                          className="bg-transparent text-white border-b border-white w-[150px] " 
                        />
                      </td>
                      <td className="border border-white px-4 py-2">
                        <input
                          type="text"
                          name="bookAuthorName"
                          value={formData.bookAuthorName}
                          onChange={handleInputChange}
                          className="bg-transparent text-white border-b border-white w-[150px] "
                        />
                      </td>
                      <td className="border border-white px-4 py-2">
                        <button onClick={() => saveEdits(user._id)} className="text-blue-500 hover:text-blue-300">
                          Save
                        </button>
                      </td>
                      <td className="border border-white px-4 py-2">
                        <button onClick={() => setEditMode(null)} className="text-red-500 hover:text-red-300">
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-white px-4 py-2">{index + 1}</td>
                      <td className="border border-white px-4 py-2">{user.name}</td>
                      <td className="border border-white px-4 py-2">{user.email}</td>
                      <td className="border border-white px-4 py-2">{user.phoneNumber}</td>
                      <td className="border border-white px-4 py-2">{user.bookID}</td>
                      <td className="border border-white px-4 py-2">{user.bookName}</td>
                      <td className="border border-white px-4 py-2">{user.bookAuthorName}</td>
                      <td className="border border-white px-4 py-2 hover:bg-customgray">
                        <button onClick={() => enterEditMode(user)} className="text-blue-500 hover:text-blue-300">
                          Edit
                        </button>
                      </td>
                      <td className="border border-white px-4 py-2 hover:bg-customgray">
                        <button onClick={() => deletedata(user._id)} className="text-red-500 hover:text-red-300">
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </>
  );
}
