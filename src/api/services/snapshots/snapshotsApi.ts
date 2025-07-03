import { BASE_URL } from "@/api/utils/constants";

export const getSnapshotsRaw = async (limit: number = 20) => {
  const res = await fetch(`${BASE_URL}/ranking/snapshots?limit=${limit}`, {
    next: {
      revalidate: 60 * 5,
    },
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch snapshots');
  }
  
  return res.json();
};