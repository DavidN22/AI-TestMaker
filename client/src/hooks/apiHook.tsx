import { useState, useEffect } from "react";
import axios from "axios";
import { TestResults } from "@/Types/Results";

const useFetch = (url: string) => {
  const [data, setData] = useState<TestResults[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<TestResults[]>(url);
        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`HTTP error! Status: ${err.response.status}`);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
