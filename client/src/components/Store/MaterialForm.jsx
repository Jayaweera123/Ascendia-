import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import SideNavigationStore from "./SideNavigationStore"; 
import TopNavigationStore from "./TopNavigationStore";
import { createMaterial, editMaterial, getMaterial } from '../../services/StoreServices'
import { useNavigate, useParams } from 'react-router-dom'
import NotificationBar from "./NotificationBar";

function MaterialForm() {

  // State for controlling side navigation visibility
  const [open, setOpen] = useState(true);

  // State variables to manage form inputs
  const [materialCode, setMaterialCode] = useState('')
  const [materialName, setMaterialName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [measuringUnit, setMeasuringUnit] = useState('')
  const [minimumLevel, setMinimumLevel] = useState('')
  const [description, setDescription] = useState('')
  const [createdDate, setCreatedDate] = useState('')

  // State variable to manage notification bar
  const [isOpen, setIsOpen] = useState(false);
  // Function to handle notification bar
  const notificationHandler = (status) => {
    setIsOpen(status);
};

  // Retrieve and parse projectIDs from local storage
  const projectIDs = JSON.parse(localStorage.getItem('projectIDs'));
  
  // Set a specific project ID (e.g., the first one)
  const projectId = projectIDs ? projectIDs[0] : null;

  console.log('projectId', projectId);

  const userId = localStorage.getItem('userID');
  console.log('UserId',userId); // This will log the userID value

  const {id} = useParams(); // Get the id parameter from the route

  // State variable to manage form validation errors
  const  [errors, setErrors] = useState({
    
    materialCode: '',
    materialName: '',
    quantity: '',
    measuringUnit: '',
    minimumLevel: '',
    description: ''

  })

  const navigator = useNavigate();

  // useEffect to fetch material details if id is present
  useEffect(() => {

      if(id){
        getMaterial(id).then((response) => {
          setMaterialCode(response.data.materialCode);
          setMaterialName(response.data.materialName);
          setQuantity(response.data.quantity);
          setMeasuringUnit(response.data.measuringUnit);
          setMinimumLevel(response.data.minimumLevel);
          setDescription(response.data.description); 
        }).catch(error => {
          console.error(error);
        })
      }

  }, [id]) 

  // Function to handle form submission for saving or editing a material
  function saveOrEditMaterial(e){
    e.preventDefault();

    if(validateForm()){

      const material = {materialCode, materialName,quantity,measuringUnit,minimumLevel,description, createdDate, projectId, userId}
      console.log(material)

      const editMaterialAndShowConfirmation = () => {
        editMaterial(id, material).then((response) => {
          console.log(response.data);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Material edited successfully!',
            confirmButtonColor: '#001b5e'
          }).then(() => {
            navigator('/material');
          });
        }).catch(error => {
          console.error(error)
        })
      }

      const createMaterialAndShowSuccess = () => {
        createMaterial(material)
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Material created successfully!',
              confirmButtonColor: '#001b5e'
            }).then(() => {
              navigator('/material');
            });
          })
          .catch((error) => {
            console.error(error);
           

            const errorsCopy = {... errors}

            errorsCopy.materialCode = '*This record already exists.';

            errorsCopy.materialName = '*This record already exists.';

            setErrors(errorsCopy);

            
          });
      }

      if(id){
        editMaterialAndShowConfirmation();
      } else {
        createMaterialAndShowSuccess();
      }
    }
}

// Function to handle form cancellation
function handleCancel(e){
  navigator('/material')
}

//Form validation function
function validateForm(){
  let valid = true;

  const errorsCopy = {... errors} //spread operator- copy errors object into errorsCopy 

  if(materialCode.trim()){
    errorsCopy.materialCode = '';
  }else{
    errorsCopy.materialCode = '*Material code is required';
    valid = false;
  }

  if(materialName.trim()){
    errorsCopy.materialName = '';
  }else{
    errorsCopy.materialName = '*Material name is required';
    valid = false;
  }

  if(!isNaN(quantity) && Number.isInteger(Number(quantity))){
    if(quantity >= 0 ){
      errorsCopy.quantity = '';
    }else{
      errorsCopy.quantity = '*Quantity cannot be minus';
      valid = false;
    }
  }else{
      errorsCopy.quantity = '*Quantity must be a whole number';
      valid = false;
  }

  if(measuringUnit.trim()){
    errorsCopy.measuringUnit = '';
  }else{
    errorsCopy.measuringUnit = '*Measuring Unit is required';
    valid = false;
  }

  if(!isNaN(minimumLevel) && Number.isInteger(Number(minimumLevel))){
    if(minimumLevel > 0 ){
      errorsCopy.minimumLevel = '';
    }else{
      errorsCopy.minimumLevel = '*Minimum Level is required';
      valid = false;
    }
  }else{
      errorsCopy.minimumLevel = '*Minimum Level must be a whole number';
      valid = false;
  }
      
  if(description.length >= 0 && description.length < 100){
    errorsCopy.description = '';
  }else{
    errorsCopy.description = '*Description cannot be more than 100 characters';
    valid = false;
  }
 
  setErrors(errorsCopy);

  return valid;
}

// Function to dynamically display form title
function formTitle(){
 if(id){
  return <h4 className="text-4xl leading-relaxed font-bold text-left text-[#001b5e] ">Edit Material</h4>
 } else{
  return <h4 className="text-4xl leading-relaxed font-bold text-left text-[#001b5e] ">Add Material</h4>
 }
}

  return (
    <div>
      <TopNavigationStore notificationHandler={notificationHandler} />
      {isOpen && <NotificationBar isOpen={isOpen} notificationHandler={notificationHandler}  />}
      <section className="flex gap-6">
        <SideNavigationStore open={open} setOpen={setOpen} />
        <div className="flex-auto w-8/12 m-3">
          <div className="max-w-2xl pt-4 pb-4 pl-10 pr-10 mx-auto bg-white rounded-lg shadow-md">

            <form  className="space-y-4">

                <div className="flex flex-row gap-3 pt-2 pb-1 mx-auto border-b items-centered border-gray-900/10">
                      
                      {
                        formTitle()
                      } 
                  
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                    <label
                    htmlFor="materialCode"
                            className="block text-base font-medium leading-6 text-gray-900"
                          >
                            Material Code:
                          </label>
                          <div className="mt-3">
                            <input
                              type="text"
                              placeholder="Enter Material Code"
                              name="materialCode"
                              id="materialCode"
                              value={materialCode}
                              onChange={(e) => setMaterialCode(e.target.value)}
                              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                errors.materialCode ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.materialCode && <div className="mt-1 text-sm text-red-500">{errors.materialCode}</div>}
                          </div>
                    </div>

                    <div>
                    <label
                            htmlFor="materialName"
                            className="block text-base font-medium leading-6 text-gray-900"
                          >
                            Material Name:
                          </label>
                          <div className="mt-3">
                            <input
                              type="text"
                              placeholder="Enter Material Name"
                              name="materialName"
                              id="materialName"
                              value={materialName}
                              maxLength={30}
                              onChange={(e) => setMaterialName(e.target.value)}
                              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                errors.materialName ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.materialName && <p className="mt-1 text-sm text-red-500">{errors.materialName}</p>}
                          </div>
                    </div>

                    <div>
                    <label
                            htmlFor="quantity"
                            className="block text-base font-medium leading-6 text-gray-900"
                          >
                            Quantity:
                          </label>
                          <div className="mt-3">
                            <input
                              type="number"
                              placeholder='Enter Quantity of material'
                              name="quantity"
                              id="quantity"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                errors.quantity ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.quantity && <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>}
                          </div>
                    </div>

                    <div>
                    <label
                            htmlFor="measuringUnit"
                            className="block text-base font-medium leading-6 text-gray-900"
                          >
                            Measuring Unit:
                          </label>
                          <div className="mt-3">
                            <input
                              type="text"
                              placeholder='Enter Measuring Unit'
                              name="measuringUnit"
                              id="measuringUnit"
                              value={measuringUnit}
                              onChange={(e) => setMeasuringUnit(e.target.value)}
                              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                errors.measuringUnit ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.measuringUnit && <p className="mt-1 text-sm text-red-500">{errors.measuringUnit}</p>}
                          </div>
                    </div>

                    <div>
                          <label
                            htmlFor="description"
                            className="block text-base font-medium leading-6 text-gray-900"
                          >
                            Description:
                          </label>
                          <div className="mt-3">
                            <textarea
                              name="description"
                              placeholder='Enter Discription'
                              id="description"
                              value={description}
                              maxLength={100} // Limit the number of characters
                              onChange={(e) => setDescription(e.target.value)}
                              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-24 ${
                                errors.description ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                          </div>
                    </div>

                    <div>
                    <label
                            htmlFor="minimumLevel"
                            className="block text-base font-medium leading-6 text-gray-900"
                          >
                            Minimum Level:
                          </label>
                          <div className="mt-3">
                            <input
                              type="number"
                              placeholder='Enter Minimum Level'
                              name="minimumLevel"
                              id="minimumLevel"
                              value={minimumLevel}
                              onChange={(e) => setMinimumLevel(e.target.value)}
                              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                errors.materialCode ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.minimumLevel && <p className="mt-1 text-sm text-red-500">{errors.minimumLevel}</p>}
                          </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end mt-6 gap-x-6">
                    
                      <button
                        type="submit"
                        onClick={saveOrEditMaterial}
                        className="text-white bg-[#001b5e] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Submit
                      </button>

                      <button
                        type="button"
                        onClick={handleCancel}
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      
                    </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MaterialForm;






