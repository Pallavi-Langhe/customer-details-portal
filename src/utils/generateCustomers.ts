import { Customer } from '../types/Customer';

const titles = [
  'Manager',
  'Developer',
  'Designer',
  'Analyst',
  'Director',
  'Engineer',
];
const firstNames = [
  'Aarav',
  'Priya',
  'Arjun',
  'Neha',
  'Rahul',
  'Anjali',
  'Vikram',
  'Pooja',
];
const lastNames = [
  'Patel',
  'Sharma',
  'Singh',
  'Gupta',
  'Kumar',
  'Mishra',
  'Reddy',
  'Joshi',
];
const cities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Hyderabad',
];

function generateRandomCustomer(id: number): Customer {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const title = titles[Math.floor(Math.random() * titles.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];

  return {
    id: id.toString(),
    name: `${firstName} ${lastName}`,
    title: title,
    address: `${Math.floor(Math.random() * 1000) + 1} Main St, ${city}`,
  };
}

export function generateCustomers(count: number): Promise<Customer[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const customers = Array.from({ length: count }, (_, index) =>
        generateRandomCustomer(index + 1)
      );
      resolve(customers);
    }, 2000); // added delay to repilicate api call
  });
}
