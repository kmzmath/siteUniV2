import { BASE_URL } from "@/api/utils/constants";

export const getSnapshotsRaw = async (limit: number = 20) => {
  try {
    const res = await fetch(`${BASE_URL}/ranking/snapshots?limit=${limit}`, {
      next: {
        revalidate: 60 * 5,
      },
    });
    
    // Verifica se a resposta é OK
    if (!res.ok) {
      console.error(`Erro ao buscar snapshots: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch snapshots: ${res.status}`);
    }
    
    // Verifica o content-type
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Resposta não é JSON. Content-Type: ${contentType}`);
      const text = await res.text();
      console.error(`Resposta recebida (primeiros 200 chars): ${text.substring(0, 200)}`);
      throw new Error(`API returned non-JSON response`);
    }
    
    return res.json();
  } catch (error) {
    console.error("Erro ao buscar snapshots:", error);
    // Retorna estrutura vazia em caso de erro
    return {
      snapshots: [],
      count: 0,
      limit: limit
    };
  }
};