export async function fetchCustomers() {
  const res = await fetch("http://127.0.0.1:8000/customers");
  return await res.json();
}

export async function fetchRisk(customerId: number) {
  const res = await fetch(`http://127.0.0.1:8000/risk/${customerId}`);
  return await res.json();
}
