import { useState } from 'react';
import axios from 'axios';

const AddUserWork = () => {
  const [formData, setFormData] = useState({
    userID: '',
    firstName: '',
    lastName: '',
    designation: '',
    department: '',
    email: '',
    phoneNumber: '',
    addedDate: '',
    profileImage: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append('userID', formData.userID);
    userData.append('firstName', formData.firstName);
    userData.append('lastName', formData.lastName);
    userData.append('designation', formData.designation);
    userData.append('department', formData.department);
    userData.append('email', formData.email);
    userData.append('phoneNumber', formData.phoneNumber);
    userData.append('addedDate', formData.addedDate); // Include addedDate in form data
    userData.append('profileImage', formData.profileImage);

    try {
      const res = await axios.post('http://localhost:8080/api/users/create', userData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
      setFormData({
        userID: '',
        firstName: '',
        lastName: '',
        designation: '',
        department: '',
        email: '',
        phoneNumber: '',
        addedDate: '',
        profileImage: null
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input type="number" name="userID" value={formData.userID} onChange={handleChange} />
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div>
          <label>Designation:</label>
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
        </div>
        <div>
          <label>Department:</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Added Date:</label>
          <input type="date" name="addedDate" value={formData.addedDate} onChange={handleChange} />
        </div>
        <div>
          <label>Profile Image:</label>
          <input type="file" name="profileImage" onChange={handleFileChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserWork;