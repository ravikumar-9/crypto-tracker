import CoinChart from "@/components/coinDetails/coinChart";
import CoinDataPage from "@/components/coinDetails/coinDetail";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const coinDetails = () => {
  const { coinId } = useParams();

  const fetchCoinDetails = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      const data = await response?.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data:coinDetails} = useQuery({
    queryKey: ["coin_details"],
    queryFn: fetchCoinDetails,
    enabled: coinId ? true : false,
  });

  return (
    <main className="space-y-6 p-8">
      <CoinDataPage coinData={coinDetails} />
      <CoinChart coinId={coinId} />
    </main>
  );
};

export default coinDetails;
