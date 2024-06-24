import { useEffect, useState, useMemo } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllUpdatedMaterials } from '../../../services/StoreServices';


const CustomizedActiveShape = (props) => {
  const { fill, x, y, width, height } = props;

  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      stroke="blue"
    />
  );
};

const MaterialChart = ({givenProjectId}) => {

  const [updatedMaterials, setUpdatedMaterials] = useState([]);

    useEffect(() => {
      getAllUpdatedMaterials(givenProjectId)
        .then((response) => {
          // Sort the materials by updated date in descending order
          const sortedMaterials = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
          // Get the last 10 transactions
          const last10Transactions = sortedMaterials.slice(0, 10);
          setUpdatedMaterials(last10Transactions);
          console.log(last10Transactions);
        })
        .catch((error) => {
          console.error(error);
        });
    },[]);

    const data = useMemo(() => {
      return updatedMaterials.map((material) => {
        return {
          name: String(material.materialName), // Assuming the field is materialName
          quantity: material.updatedQuantity, // Assuming the field is updatedQuantity
          // Add any additional transformations here
        };
      });
    }, [updatedMaterials]);

  return (
    <div className='p-5 bg-white rounded-md shadow'>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#8884d8" shape={<CustomizedActiveShape />} />
        <Bar dataKey="Add" fill="#82ca9d" shape={<CustomizedActiveShape />} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default MaterialChart;
