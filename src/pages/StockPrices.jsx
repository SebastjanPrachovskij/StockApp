import React, { useRef, useState } from "react";
import DateRange from "../components/DateRangeComponent/DateRange";
import CompanyProfileProvider from "../contexts/CompanyProfileAPI/CompanyProfileAPI";
import CompanyInfoTablet from "../features/CompanyCharts";
import "./StockPrices.scss";
import axios from "axios";

const InputComponent = () => {
  const [inputError, setInputError] = useState(false);
  const [showStocks, setShowStocks] = useState(false);
  const [companiesLoaded, setCompaniesloaded] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const [stockIsLoaded, setStockIsLoaded] = useState(false);
  const [companyInformation, setCompanyInformation] = useState();
  const [companyStocks, setCompanyStocks] = useState();
  const [inputText, setInputText] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const inputRef = useRef("");

  const handleInputTextClick = () => {
    setInputText(inputRef.current.value);
    setShowStocks(true);
    setShowCompanies(true);
  };

  const handleCompanyInformation = (information) => {
    setCompanyInformation(information);
    setShowCompanies(false);
    setCompaniesloaded(true);
  };
  const handleCompanyStocks = (stocks) => {
    setCompanyStocks(stocks);
    setShowCompanies(false);
    setStockIsLoaded(true);
  };

  const onInputChange = (e) => {
    const { value } = e.target;
    const inputValidation = /^[A-Za-z\s]+$/;
    if (!value) {
    }
    if (value === "" || inputValidation.test(value)) {
      setInputError(false);
      setInputText(value);
    } else {
      setInputError(true);
    }
  };

  async function postCompanyInformation(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/company_information", {
        companyInformation,
        companyStocks,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="stockPrices">
      <form className="stockPrices__form" onSubmit={postCompanyInformation}>
        <label className="stockPrices__company-name" htmlFor="company-name">
          Enter Ticker symbol:
        </label>
        {inputError && (
          <div className="stockPrices__error">Please use letters</div>
        )}
        <input
          className="stockPrices__input"
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={onInputChange}
          maxLength={35}
        />
        <DateRange setDateRange={setDateRange} />
        <button
          type="submit"
          className="stockPrices__button"
          onClick={handleInputTextClick}
          disabled={!inputRef.current.value}
        >
          Submit
        </button>
      </form>

      {showCompanies && (
        <CompanyProfileProvider
          inputText={inputText}
          dateRange={dateRange}
          handleCompanyInformation={handleCompanyInformation}
          handleCompanyStocks={handleCompanyStocks}
        />
      )}

      {companyInformation &&
        companyInformation.country &&
        showStocks &&
        stockIsLoaded &&
        companiesLoaded && (
          <CompanyInfoTablet
            companyInformation={companyInformation}
            companyStocks={companyStocks}
          />
        )}
    </div>
  );
};
export default InputComponent;
