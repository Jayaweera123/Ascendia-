import { useEffect, useState } from 'react';
import { getLowStockMaterials } from '../../../services/StoreServices';

const LowStockMaterials = ({givenProjectId}) => {

  const [lowStockMaterial, setLowStockMaterial] = useState([]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = lowStockMaterial.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(lowStockMaterial.length / recordsPerPage);
  const numbers = [...Array(numberOfPages + 1).keys()].slice(1);
    
  //Get low stock materials list
  useEffect(() => {
    getLowStockMaterials(givenProjectId).then((response) => {
        setLowStockMaterial(response.data); 
        console.log('Low Stock Material', lowStockMaterial);
    }).catch(error => {
        console.error(error);
    })
  }, [])

    useEffect(() => {
        console.log('low stock materials', lowStockMaterial);
      }, [lowStockMaterial]);
    

      //Pagination
        const prePage = () => {
            if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
            }
        };

        const changeCurrentPage = (id) => {
            setCurrentPage(id);
        };

        const nextPage = () => {
            if (currentPage !== numberOfPages) {
            setCurrentPage(currentPage + 1);
            }
        };

  return (
    <div className='p-5 bg-white rounded-md shadow' style={{height:'22rem'}}>

        <div className="flex items-center pb-3 space-x-2 text-sm font-medium text-gray-500 rtl:space-x-reverse dark:text-gray-400">
              <span>Low Stock Materials List</span>
        </div>

        <table className="min-w-full text-sm bg-white">
            
            <thead>
                <tr className="text-gray-700 border-b bg-blue-gray-100 border-blue-gray-50 border-y">
                                   
                    <th className="px-4 py-5 text-left">Material Code</th>
                    <th className="px-4 py-5 text-left">Material Name</th>
                                
                </tr>
            </thead>

            <tbody className="text-gray-700">
                {
                    records
                        .map(material =>
                            <tr className="bg-white border-b border-blue-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={material.materialId}>
                                                
                                <td className="px-4 py-3">{material.materialCode}</td>
                                <td className="px-4 py-3">{material.materialName}</td>
                                                
                            </tr>
                        ) 
                }
            </tbody>
        </table>                     
                            
        <div className="flex items-center justify-between pt-10 pb-10 pl-2 pr-2 border-t border-blue-gray-50">
            <button className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded-sm focus:outline-none" onClick={prePage}>
                Previous
            </button>

            <div className="flex items-center gap-2">
                                        
            {/************************************************* Pagination *********************************************/}
                {
                    numbers.map((n, i) => (
                    <button className={ `${currentPage ===n ? "px-3 py-1 text-sm border rounded-full border-blue-gray-500 focus:outline-none bg-slate-200" : "px-3 py-1 text-sm focus:outline-none border rounded-full border-blue-gray-500"}`} key={i} onClick={() => changeCurrentPage(n)}>
                        {n}
                    </button>

                    ))
                                        
                }

                                        
            </div>

            <button className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded-sm focus:outline-none" onClick={nextPage}>
                Next
            </button>

        </div>
    </div>
  );
};

export default LowStockMaterials;
