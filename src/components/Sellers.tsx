import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { Database } from "../types/database.types";

type Seller = Database["public"]["Tables"]["Sellers"]["Row"];

function Sellers() {
  const [sellersData, setSellersData] = useState<Seller[]>([]);
  const [updatedSellersData, setUpdatedSellersData] = useState<{
    contact_address: string;
    contact_email: string;
    sellers: Seller[];
    version: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSellers = async () => {
      const { data, error } = await supabase.from("Sellers").select("*");
      if (error) {
        setError(error.message);
        setIsLoading(false);
      } else if (data) {
        setSellersData(data);
        addAdditionalDetails(data);
        setIsLoading(false);
      }
    };
    fetchSellers();
  }, []);

  const addAdditionalDetails = (sellersData: Seller[]) => {
    const data = {
      contact_address:
        "#34, First floor, Technopark, AVS compound,Koramangala 4th block Bengaluru, Karnataka 560034, India",
      contact_email: "partners@streamlyn.com",
      //* Remove id from the sellers array
      sellers:
        sellersData.map((seller) => {
          const { id, ...rest } = seller;
          return rest;
        }) || [],
      version: 1,
    };
    setUpdatedSellersData(data as any);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
        {JSON.stringify(updatedSellersData, null, 2)}
      </pre>
    </div>
  );
}

export default Sellers;
