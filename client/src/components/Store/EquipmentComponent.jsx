import React, { useEffect, useState } from "react";
import SideNavigationStore from "./SideNavigationStore"; // Adjust the path based on your project structure
import TopNavigationStore from "./TopNavigationStore"; // Adjust the path based on your project structure
import { createEquipment, editEquipment, getEquipment } from '../../services/StoreServices'
import { useNavigate, useParams } from 'react-router-dom'

function EquipmentComponent() {
  const [open, setOpen] = useState(true);
  const [equipmentCode, setEquipmentCode] = useState('')
  const [equipmentName, setEquipmentName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [description, setDescription] = useState('')
  const [createdDate, setCreatedDate] = useState('')

  const projectId = 1;

  const {id} = useParams();

  const  [errors, setErrors] = useState({
    
    equipmentCode: '',
    equipmentName: '',
    quantity: '',
    description: ''
    
  })

  const navigator = useNavigate();

  useEffect(() => {

      if(id){
        getEquipment(id).then((response) => {
          setEquipmentCode(response.data.equipmentCode);
          setEquipmentName(response.data.equipmentName);
          setQuantity(response.data.quantity);
          setDescription(response.data.description);
          setCreatedDate(response.data.createdDate);
        }).catch(error => {
          console.error(error);
        })
      }

  }, [id]) 

  function saveOrEditEquipment(e){
    e.preventDefault();

    if(validateForm()){

      const equipment = {equipmentCode, equipmentName,quantity,description,createdDate, projectId}
      console.log(equipment)

      if(id){
        editEquipment(id, equipment).then((response) => {
          console.log(response.data)
          navigator('/equipment')
        }).catch(error => {
          console.error(error)
        })
      }else{
          createEquipment(equipment).then((response) => {
          console.log(response.data);
          navigator('/equipment')
        }).catch(error => {
           console.error(error)
        })
  
      }
  
      
    }

  }

function handleCancel(e){
  navigator('/equipment')
}

//Form validation
function validateForm(){
  let valid = true;

  const errorsCopy = {... errors} //spread operator- copy errors object into errorsCopy 

  if(equipmentCode.trim()){
    errorsCopy.equipmentCode = '';
  }else{
    errorsCopy.equipmentCode = '*Equipment code is required';
    valid = false;
  }

  if(equipmentName.trim()){
    errorsCopy.equipmentName = '';
  }else{
    errorsCopy.equipmentName = '*Equipment name is required';
    valid = false;
  }

  if(equipmentCode.trim()){
    errorsCopy.equipmentCode = '';
  }else{
    errorsCopy.equipmentCode = '*Equipment code is required';
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

  if(description.length >= 0 && description.length < 100){
    errorsCopy.description = '';
  }else{
    errorsCopy.description = '*Description cannot be more than 100 characters';
    valid = false;
  }
 
  setErrors(errorsCopy);

  return valid;
}

function formTitle(){
 if(id){
  return <h4 className="text-4xl leading-relaxed font-bold text-left text-[#001b5e] ">Edit Equipment</h4>
 } else{
  return <h4 className="text-4xl leading-relaxed font-bold text-left text-[#001b5e] ">Add Equipment</h4>
 }
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
            
            {
              formTitle()
            } 
         
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
          <label
          htmlFor="equipmentCode"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                 Equipment Code:
                </label>
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Enter Equipment Code"
                    name="equipmentCode"
                    id="equipmentCode"
                    value={equipmentCode}
                    onChange={(e) => setEquipmentCode(e.target.value)}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.equipmentCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.equipmentCode && <div className="mt-1 text-sm text-red-500">{errors.equipmentCode}</div>}
                </div>
          </div>

          <div>
          <label
                  htmlFor="equipmentName"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Equipment Name:
                </label>
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Enter Equipment Name"
                    name="equipmentName"
                    id="equipmentName"
                    value={equipmentName}
                    onChange={(e) => setEquipmentName(e.target.value)}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.equipmentName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.equipmentName && <div className="mt-1 text-sm text-red-500">{errors.equipmentName}</div>}
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
                    type="text"
                    placeholder='Enter Quantity of equipment'
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.quantity ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.quantity && <div className="mt-1 text-sm text-red-500">{errors.quantity}</div>}
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

        </div>
        
        <div className="flex items-center justify-end mt-6 gap-x-6">
           
            <button
              type="submit"
              onClick={saveOrEditEquipment}
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

export default EquipmentComponent;






