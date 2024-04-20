import React, { useEffect, useState } from "react";
import SideNavigationStore from "./SideNavigationStore"; // Adjust the path based on your project structure
import TopNavigationStore from "./TopNavigationStore"; // Adjust the path based on your project structure
import { getEquipment } from '../../services/StoreServices'
import { useNavigate, useParams } from 'react-router-dom'
import Popup from "./Popup";

function UpdateEquipmentComponent() {
  const [open, setOpen] = useState(true);
  const [equipmentCode, setEquipmentCode] = useState('')
  const [equipmentName, setEquipmentName] = useState('')
  const [quantity, setQuantity] = useState('')
  
  const [state, setState] = useState('')

  const {id} = useParams();

  const  [errors, setErrors] = useState({
    
    equipmentCode: '',
    equipmentName: '',
    quantity: '',
    state: ''

  })

  const navigator = useNavigate();

  useEffect(() => {

      if(id){
        getEquipment(id).then((response) => {
          setEquipmentCode(response.data.equipmentCode);
          setEquipmentName(response.data.equipmentName);
          setQuantity(response.data.quantity);
          
          setCreatedDate(response.data.createdDate);
        }).catch(error => {
          console.error(error);
        })
      }

  }, [id]) 

  function updateEquipment(e){
    // e.preventDefault();

    // // if(validateForm){

    //   const material = {materialCode, materialName,quantity,measuringUnit,minimumLevel,description, createdDate}
    //   console.log(material)

    //   then((response) => {
    //     setShowPopup(true);
    //   })
    alert("Successfully updated")
    navigator('/equipment')
        // updateMaterial(id, material).then((response) => {
        //   console.log(response.data)
          
        //   navigator('/material')
        // }).catch(error => {
        //   console.error(error)
        // })
  
      }
  
      
    // }



function handleCancel(e){
  navigator('/equipment')
}

// function validateForm(){
//   let valid = true;

//   const errorsCopy = {...errors}

//   if(materialCode.trim()){
//     errorsCopy.materialCode = '';
//   }else{
//     errorsCopy.materialCode = 'Material code is required'
//     valid = false;
//   }

//   if(materialName.trim()){
//     errorsCopy.materialName = '';
//   }else{
//     errorsCopy.materialName = 'Material name is required'
//     valid = false;
//   }

//   if(materialCode.trim()){
//     errorsCopy.materialCode = '';
//   }else{
//     errorsCopy.materialCode = 'Material code is required'
//     valid = false;
//   }

//   if(quantity.trim()){
//     errorsCopy.quantity = '';
//   }else{
//     errorsCopy.quantity = 'Quantity is required'
//     valid = false;
//   }

//   if(measuringUnit.trim()){
//     errorsCopy.measuringUnit = '';
//   }else{
//     errorsCopy.measuringUnit = 'Measuring Unit is required'
//     valid = false;
//   }

//   if(minimumLevel.trim()){
//     errorsCopy.minimumLevel = '';
//   }else{
//     errorsCopy.minimumLevel = 'Minimum Level is required'
//     valid = false;
//   }

//   if(createdDate.trim()){
//     errorsCopy.createdDate = '';
//   }else{
//     errorsCopy.createdDate = 'Created date is required'
//     valid = false;
//   }

//   setErrors(errorsCopy);

//   return valid;
// }

function formTitle(){
 if(id){
  return <h4 className="text-4xl leading-relaxed font-bold text-left text-[#001b5e] ">Edit Material</h4>
 } else{
  return <h4 className="text-4xl leading-relaxed font-bold text-left text-[#001b5e] ">Add Material</h4>
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
            
          <h4 className="text-4xl leading-relaxed font-bold text-left text-[#001b5e] ">Update Equipment</h4>
         
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
                    disabled
                    onChange={(e) => setEquipmentCode(e.target.value)}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                  />
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
                    disabled
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
          </div>

          <div>
          <label
                  htmlFor="state"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Add/Issue:
                </label>
                <div className="mt-3">
                  

                    <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
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
              onClick={updateEquipment}
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
     
    </div>
  );
};

export default UpdateEquipmentComponent;






