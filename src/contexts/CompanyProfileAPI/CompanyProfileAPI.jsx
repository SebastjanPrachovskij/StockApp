const CompanyProfileProvider = ({
  inputText,
  dateRange,
  handleCompanyInformation,
  handleCompanyStocks,
}) => {
  const finnhub = require("finnhub");

  const api_key = finnhub.ApiClient.instance.authentications["api_key"];
  api_key.apiKey = "cblsq3aad3i5tm08lf30";
  const finnhubClient = new finnhub.DefaultApi();

  finnhubClient.companyProfile2(
    { symbol: inputText },
    (error, data, response) => {
      handleCompanyInformation(data);
    }
  );
  finnhubClient.stockCandles(
    inputText,
    "D",
    dateRange[0],
    dateRange[1],
    (error, data, response) => {
      handleCompanyStocks(data);
    }
  );
};

export default CompanyProfileProvider;
