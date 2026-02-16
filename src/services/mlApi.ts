const BASE_URL = "https://hackowire-1.onrender.com";

export async function fetchCustomers() {
  const res = await fetch(`${BASE_URL}/customers`);
  return res.json();
}

export async function fetchRisk(id: number) {
  const res = await fetch(`${BASE_URL}/risk/${id}`);
  return res.json();
}
