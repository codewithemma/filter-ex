import "./App.css";
import { buttons } from "./ButtonData";
import { useEffect, useState } from "react";
import { getData, filterData } from "./Services";
const ItemsPerPage = 5;
function App() {
  const [filteredData, setFilteredData] = useState(null);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * ItemsPerPage;
  const firstIndex = lastIndex - ItemsPerPage;
  const currentData = filteredData
    ? filteredData.slice(firstIndex, lastIndex).filter((party) => {
        return (
          party.name.toLowerCase().includes(query.toLowerCase()) ||
          party.position.toLowerCase().includes(query.toLowerCase()) ||
          party.party.toLowerCase().includes(query.toLowerCase()) ||
          party.constituency.toLowerCase().includes(query.toLowerCase())
        );
      })
    : [];
  const handleData = (event) => {
    let typeData = event.target.value;
    typeData !== "all"
      ? setFilteredData(filterData(typeData))
      : setFilteredData(getData());
  };

  useEffect(() => {
    setFilteredData(getData());
  }, []);
  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }
  return (
    <div className="App">
      {buttons &&
        buttons.map((item) => (
          <div key={item.id}>
            <button value={item.value} onClick={handleData}>
              {item.name}
            </button>
          </div>
        ))}
      <div className="input-group">
        <input type="text" placeholder="search" onChange={handleChange} />
      </div>
      <div className="card-container">
        {currentData &&
          currentData
            .filter((party) => {
              return (
                party.name.toLowerCase().includes(query.toLowerCase()) ||
                party.position.toLowerCase().includes(query.toLowerCase()) ||
                party.party.toLowerCase().includes(query.toLowerCase()) ||
                party.constituency.toLowerCase().includes(query.toLowerCase())
              );
            })
            ?.map((data) => {
              return (
                <div className="card" key={data.id}>
                  <h2>{data.name}</h2>
                  <p>{data.position}</p>
                  <p className="party">{data.party}</p>
                  <p>{data.constituency}</p>
                </div>
              );
            })}
      </div>
      <div>
        {" "}
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentData.length < ItemsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
