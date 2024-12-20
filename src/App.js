import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://randomuser.me/api/?page=1&results=1&seed=abc';
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        setData(json.results);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[500px]">
        {data ? (
          data.map((user, index) => (
            <div key={index} className="flex items-center gap-6">
              {/* Image Section */}
              <div className="flex-shrink-0">
                <img
                  src={user.picture.large}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
              </div>

              {/* Details Section */}
              <div className="flex flex-col space-y-2">
                <div className="text-lg font-semibold text-gray-800">
                  {user.name.first} {user.name.last}
                </div>
                <div className="text-sm text-gray-600 capitalize">
                  Gender: {user.gender}
                </div>
                <div className="text-sm text-gray-600">
                  Phone: {user.phone}
                </div>
                <div className="text-sm text-gray-600">
                  Email: {user.email}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;
