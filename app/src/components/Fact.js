import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [limit, setLimit] = useState(1);
  const [fact, setFact] = useState([]);
  const factArr = [];

  const getData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/facts?limit=${limit}`,
        {
          headers: {
            'x-api-key': process.env.REACT_APP_KEY,
          },
        }
      );
      setFact(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  for (let i = 0; i < fact.length; i++) {
    factArr.push(fact[i].fact);
  }
  console.log(factArr);
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <form onSubmit={getData}>
        <p className="font-">Enter the number of posts:</p>
        <input
          onChange={(e) => setLimit(e.target.value)}
          defaultValue={1}
          type='number'
          className='border'
        />
        <button className='rounded bg-black px-3 text-white' type='submit'>
          Generate
        </button>
      </form>
      <ol>
        {factArr.map((fact, index) => {
          return (
            <li key={index}>
              {index + 1}){fact}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Form;
