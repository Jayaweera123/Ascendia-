import React, { useEffect, useState } from "react";
import SideNavigationStore from "./SideNavigationStore"; // Adjust the path based on your project structure
import TopNavigationStore from "./TopNavigationStore"; // Adjust the path based on your project structure
import { getMaterial, inventoryUpdateMaterial } from '../../services/StoreServices'
import { useNavigate, useParams } from 'react-router-dom'
import Popup from "./Popup";

function UpdateMaterialForm() {
  const [open, setOpen] = useState(true);
  const [materialCode, setMaterialCode] = useState('')
  const [materialName, setMaterialName] = useState('')
  const [updatedQuantity, setUpdatedQuantity] = useState('')
  const [action, setAction] = useState('Issue')
  const [showPopup, setShowPopup] = useState(false);

  const {id} = useParams();

  const  [errors, setErrors] = useState({
    
    updatedQuantity: ''

  })

  const navigator = useNavigate();

  useEffect(() => {
    

      if(id){
        getMaterial(id).then((response) => {
          setMaterialCode(response.data.materialCode);
          setMaterialName(response.data.materialName);
          setUpdatedQuantity(response.data.updatedQuantity);
        }).catch(error => {
          console.error(error);
        })
      }

  }, [id]) 

  //Handle function to update inventory

  function handleInventoryUpdate(e){
     e.preventDefault();

    if(validateForm()){

      const material = {updatedQuantity,action}
      console.log(material,"id:",id)

    //   then((response) => {
    //     setShowPopup(true);
    //   })
    // alert("Successfully updated")
    // navigator('/material')
        inventoryUpdateMaterial(id, material).then((response) => {
          console.log(response.data)
          
          navigator('/material')
        }).catch(error => {
          console.error(error)
        })
  
      }
  
      
    }



function handleCancel(e){
  navigator('/material')
}

//Form validation

function validateForm(){
  let valid = true;

  const errorsCopy = {... errors} //spread operator- copy errors object into errorsCopy 

 
  if(updatedQuantity == null){
    errorsCopy.updatedQuantity = '*Quantity is required';
    valid = false;
  } else if(!isNaN(updatedQuantity) && Number.isInteger(Number(updatedQuantity))){
    if(updatedQuantity > 0 ){
      errorsCopy.updatedQuantity = '';
    } else {
      errorsCopy.updatedQuantity = '*Quantity must be positive whole number';
      valid = false;
    }
  } else {
    errorsCopy.updatedQuantity = '*Quantity must be a whole number';
    valid = false;
  }
  
  setErrors(errorsCopy);
  
  return valid;
  
}

function onClosePopup() {
    setShowPopup(false);
    // Additional logic to perform after closing the popup
  }

  return (
    <div>
      <TopNavigationStore />
      <section className="flex gap-6">
        <SideNavigationStore open={open} setOpen={setOpen} />
        <div className="w-screen m-3">
        <div className="max-w-2xl pt-4 pb-4 pl-10 pr-10 mx-auto bg-white rounded-lg shadow-md">
       <form  className="space-y-4">

      <div className="flex flex-row gap-3 pt-2 pb-1 mx-auto border-b items-centered border-gray-900/10">
            
          <h4 className="text-4xl leading-relaxed font-bold text-left text-[#001b5e] ">Update Inventory</h4>
         
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
                    disabled
                    onChange={(e) => setMaterialCode(e.target.value)}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                  />
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
                    onChange={(e) => setMaterialName(e.target.value)}
                    disabled
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
          </div>

          <div>
          <label
                  htmlFor="updatedQuantity"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Quantity:
                </label>
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder='Enter Quantity of material'
                    name="updatedQuantity"
                    id="updatedQuantity"
                    value={updatedQuantity}
                    onChange={(e) => setUpdatedQuantity(e.target.value)}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.updatedQuantity ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.updatedQuantity && <p className="mt-1 text-sm text-red-500">{errors.updatedQuantity}</p>}
                </div>
          </div>

          <div>
          <label
                  htmlFor="action"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Add/Issue:
                </label>
                <div className="mt-3">
                  

                    <select
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                        className="block w-full px-3 py-1.5 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="Issue">Issue</option>
                        <option value="Add">Add</option>
                    </select>
                </div>
          </div>


        </div>

        
        
        <div className="flex items-center justify-end mt-6 gap-x-6">
           <div className="mt-24">
            <button
              type="submit"
              onClick={handleInventoryUpdate}
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
            
          </div>
      </form>
    </div>
        </div>
      </section>
      {showPopup && <Popup message="Successfully updated inventory" onClose={onClosePopup} />}
    </div>
  );
};

export default UpdateMaterialForm;






