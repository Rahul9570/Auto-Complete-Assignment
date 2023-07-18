import { FC, useEffect, useState } from "react";
import AutoComplete from "../auto-complete";
import './style.css';

// Define the interface which will shape of country data coming from api and exported to future use in another componment
export interface IcountryData {
  name: string;
  capital: string;
  population: number;
  area: number;
  flag: string;
}



const Home: FC = () => {
  // Define state variables to hold state of api data
  const [countryData, setCountryData] = useState<IcountryData[]>([]);
  const [filteredData, setFilteredData] = useState<IcountryData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch country data when the component mounts
  useEffect(() => {
    getCountryData();
  }, []);

  // Fetch country data from the API
  const getCountryData = async () => {
    //here i am checking if response is ok then set data to state
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,capital,area,population"
      );
      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }
      const jsonData = await response.json();
      
      // Format the received data into desired shape
      const formattedData: IcountryData[] = jsonData.map((item: any) => {
        return {
          name: item.name.common,
          capital: item.capital[0],
          population: item.population,
          area: item.area,
          flag: item.flags.svg
        };
      });
      
      // Set the country data and initialize filteredData with all countryData
      setCountryData(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
        //throw error
      setError("Error occurred while fetching country data.");
    }
  };

  // Handle search input to filter country data
  const handleSearch = (searchValue: string) => {
    const filtered = countryData.filter((country) =>
      country.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="home-container">
      <div>
        {/* Render the AutoComplete component */}
        <AutoComplete countryData={countryData} onSearch={handleSearch} />
      </div>
      <div className="country-parent-container">
        {/* Map and render the filtered country data */}
        {filteredData.map((data, index) => (
          <div className="country-card-container" key={index}>
            <img src={data.flag} alt="Flag" width={'90%'} height={'50%'} />
            <div><b>Name:-</b>{data.name}</div>
            <div><b>Capital:-</b>{data.capital}</div>
            <div><b>Population:-</b>{data.population}</div>
            <div><b>Area:-</b>{data.area}</div>
          </div>
        ))}
      </div>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Home;
