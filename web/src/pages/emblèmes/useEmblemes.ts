import { useEffect, useState } from "react";
import api from "@/services/axios";
import { isAxiosError } from "axios";
import type { Embleme } from "@/types/Embleme";

export function useEmblemes(matiere?: string) {
  const [emblemes, setEmblemes] = useState<Embleme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchEmblemes = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = matiere ? `/emblemes/${matiere}` : `/emblemes`;
        const { data } = await api.get<Embleme[]>(url);

        if (cancelled) return;
        setEmblemes(data);
      } catch (err: any) {
        if (isAxiosError(err)) {
          setError(
            err.response ? `Erreur API: ${err.response.status}` : "API inaccessible"
          );
        } else {
          setError("Une erreur est survenue");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchEmblemes();

    return () => {
      cancelled = true;
    };
  }, [matiere]);

  return { emblemes, loading, error };
}
