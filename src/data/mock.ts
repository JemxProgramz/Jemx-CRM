import { Customer, Order, Activity } from '../types';

export const mockCustomers: Customer[] = [
  {
    "id": "cust-1",
    "name": "William Hernandez",
    "email": "william.hernandez@wayneenterprises.com",
    "company": "Stark Industries",
    "country": "USA",
    "plan": "Enterprise",
    "status": "Inactive",
    "joinDate": "2024-05-13"
  },
  {
    "id": "cust-2",
    "name": "Charles Hernandez",
    "email": "charles.hernandez@oscorp.com",
    "company": "Stark Industries",
    "country": "Australia",
    "plan": "Basic",
    "status": "Inactive",
    "joinDate": "2025-08-22"
  },
  {
    "id": "cust-3",
    "name": "Charles Rodriguez",
    "email": "charles.rodriguez@massivedynamic.com",
    "company": "Abstergo",
    "country": "Mexico",
    "plan": "Pro",
    "status": "Active",
    "joinDate": "2021-03-05"
  },
  {
    "id": "cust-4",
    "name": "William Rodriguez",
    "email": "william.rodriguez@starkindustries.com",
    "company": "LexCorp",
    "country": "Brazil",
    "plan": "Pro",
    "status": "Active",
    "joinDate": "2023-04-16"
  },
  {
    "id": "cust-5",
    "name": "Joseph Lopez",
    "email": "joseph.lopez@globalio.com",
    "company": "Cloud Solutions",
    "country": "UK",
    "plan": "Basic",
    "status": "Inactive",
    "joinDate": "2021-03-20"
  },
  {
    "id": "cust-6",
    "name": "Jessica Martinez",
    "email": "jessica.martinez@aperturescience.com",
    "company": "Hooli",
    "country": "India",
    "plan": "Pro",
    "status": "Active",
    "joinDate": "2023-06-29"
  },
  {
    "id": "cust-7",
    "name": "David Davis",
    "email": "david.davis@lexcorp.com",
    "company": "Oscorp",
    "country": "Australia",
    "plan": "Basic",
    "status": "Inactive",
    "joinDate": "2025-04-04"
  },
  {
    "id": "cust-8",
    "name": "Elizabeth Anderson",
    "email": "elizabeth.anderson@designco.com",
    "company": "Massive Dynamic",
    "country": "UK",
    "plan": "Pro",
    "status": "Lead",
    "joinDate": "2024-11-25"
  },
  {
    "id": "cust-9",
    "name": "James Jackson",
    "email": "james.jackson@umbrellacorp.com",
    "company": "Oscorp",
    "country": "India",
    "plan": "Enterprise",
    "status": "Lead",
    "joinDate": "2022-11-21"
  },
  {
    "id": "cust-10",
    "name": "Karen Gonzalez",
    "email": "karen.gonzalez@starkindustries.com",
    "company": "Umbrella Corp",
    "country": "Mexico",
    "plan": "Basic",
    "status": "Active",
    "joinDate": "2022-01-16"
  },
  {
    "id": "cust-11",
    "name": "Joseph Taylor",
    "email": "joseph.taylor@piedpiper.com",
    "company": "Aperture Science",
    "country": "Mexico",
    "plan": "Enterprise",
    "status": "Active",
    "joinDate": "2023-03-30"
  },
  {
    "id": "cust-12",
    "name": "Barbara Wilson",
    "email": "barbara.wilson@hooli.com",
    "company": "Startup Inc",
    "country": "Mexico",
    "plan": "Enterprise",
    "status": "Lead",
    "joinDate": "2022-11-11"
  },
  {
    "id": "cust-13",
    "name": "William Gonzalez",
    "email": "william.gonzalez@piedpiper.com",
    "company": "Massive Dynamic",
    "country": "India",
    "plan": "Enterprise",
    "status": "Inactive",
    "joinDate": "2024-01-11"
  },
  {
    "id": "cust-14",
    "name": "James Gonzalez",
    "email": "james.gonzalez@massivedynamic.com",
    "company": "Stark Industries",
    "country": "Mexico",
    "plan": "Pro",
    "status": "Inactive",
    "joinDate": "2025-12-20"
  },
  {
    "id": "cust-15",
    "name": "Robert Miller",
    "email": "robert.miller@cyberdyne.com",
    "company": "Acme Corp",
    "country": "Mexico",
    "plan": "Enterprise",
    "status": "Lead",
    "joinDate": "2025-12-31"
  },
  {
    "id": "cust-16",
    "name": "John Hernandez",
    "email": "john.hernandez@acmecorp.com",
    "company": "Abstergo",
    "country": "Mexico",
    "plan": "Basic",
    "status": "Active",
    "joinDate": "2025-05-04"
  },
  {
    "id": "cust-17",
    "name": "Michael Gonzalez",
    "email": "michael.gonzalez@aviato.com",
    "company": "Oscorp",
    "country": "Brazil",
    "plan": "Enterprise",
    "status": "Lead",
    "joinDate": "2024-11-04"
  },
  {
    "id": "cust-18",
    "name": "Karen Rodriguez",
    "email": "karen.rodriguez@aviato.com",
    "company": "Cyberdyne",
    "country": "USA",
    "plan": "Enterprise",
    "status": "Inactive",
    "joinDate": "2025-12-19"
  },
  {
    "id": "cust-19",
    "name": "Richard Miller",
    "email": "richard.miller@cloudsolutions.com",
    "company": "Aperture Science",
    "country": "Brazil",
    "plan": "Enterprise",
    "status": "Active",
    "joinDate": "2024-10-24"
  },
  {
    "id": "cust-20",
    "name": "David Martin",
    "email": "david.martin@aperturescience.com",
    "company": "Stark Industries",
    "country": "USA",
    "plan": "Enterprise",
    "status": "Inactive",
    "joinDate": "2023-01-26"
  },
  {
    "id": "cust-21",
    "name": "Jessica Davis",
    "email": "jessica.davis@lexcorp.com",
    "company": "Acme Corp",
    "country": "France",
    "plan": "Basic",
    "status": "Lead",
    "joinDate": "2021-09-15"
  },
  {
    "id": "cust-22",
    "name": "Joseph Davis",
    "email": "joseph.davis@lexcorp.com",
    "company": "Hooli",
    "country": "Australia",
    "plan": "Basic",
    "status": "Active",
    "joinDate": "2024-01-29"
  },
  {
    "id": "cust-23",
    "name": "Patricia Brown",
    "email": "patricia.brown@hooli.com",
    "company": "LexCorp",
    "country": "Canada",
    "plan": "Enterprise",
    "status": "Inactive",
    "joinDate": "2024-03-23"
  },
  {
    "id": "cust-24",
    "name": "Charles Smith",
    "email": "charles.smith@starkindustries.com",
    "company": "Aviato",
    "country": "Canada",
    "plan": "Enterprise",
    "status": "Active",
    "joinDate": "2022-02-08"
  },
  {
    "id": "cust-25",
    "name": "Karen Thomas",
    "email": "karen.thomas@initech.com",
    "company": "Design Co",
    "country": "UK",
    "plan": "Enterprise",
    "status": "Active",
    "joinDate": "2025-09-29"
  },
  {
    "id": "cust-26",
    "name": "Barbara Johnson",
    "email": "barbara.johnson@massivedynamic.com",
    "company": "Design Co",
    "country": "USA",
    "plan": "Basic",
    "status": "Lead",
    "joinDate": "2024-05-10"
  },
  {
    "id": "cust-27",
    "name": "Jennifer Jackson",
    "email": "jennifer.jackson@blackmesa.com",
    "company": "Umbrella Corp",
    "country": "Australia",
    "plan": "Pro",
    "status": "Lead",
    "joinDate": "2022-01-10"
  },
  {
    "id": "cust-28",
    "name": "Sarah Taylor",
    "email": "sarah.taylor@startupinc.com",
    "company": "Oscorp",
    "country": "India",
    "plan": "Pro",
    "status": "Lead",
    "joinDate": "2022-09-11"
  },
  {
    "id": "cust-29",
    "name": "Patricia Jones",
    "email": "patricia.jones@aviato.com",
    "company": "Wayne Enterprises",
    "country": "USA",
    "plan": "Basic",
    "status": "Lead",
    "joinDate": "2021-06-02"
  },
  {
    "id": "cust-30",
    "name": "Linda Anderson",
    "email": "linda.anderson@massivedynamic.com",
    "company": "TechCorp",
    "country": "Australia",
    "plan": "Pro",
    "status": "Inactive",
    "joinDate": "2026-01-01"
  },
  {
    "id": "cust-31",
    "name": "Charles Gonzalez",
    "email": "charles.gonzalez@abstergo.com",
    "company": "Massive Dynamic",
    "country": "Brazil",
    "plan": "Enterprise",
    "status": "Lead",
    "joinDate": "2021-10-12"
  },
  {
    "id": "cust-32",
    "name": "Michael Anderson",
    "email": "michael.anderson@massivedynamic.com",
    "company": "Pied Piper",
    "country": "India",
    "plan": "Enterprise",
    "status": "Active",
    "joinDate": "2021-03-19"
  },
  {
    "id": "cust-33",
    "name": "Thomas Garcia",
    "email": "thomas.garcia@aperturescience.com",
    "company": "Global IO",
    "country": "Canada",
    "plan": "Enterprise",
    "status": "Inactive",
    "joinDate": "2023-05-01"
  },
  {
    "id": "cust-34",
    "name": "Sarah Moore",
    "email": "sarah.moore@piedpiper.com",
    "company": "TechCorp",
    "country": "Canada",
    "plan": "Enterprise",
    "status": "Active",
    "joinDate": "2021-10-08"
  },
  {
    "id": "cust-35",
    "name": "Patricia Jones",
    "email": "patricia.jones@blackmesa.com",
    "company": "Aperture Science",
    "country": "Germany",
    "plan": "Basic",
    "status": "Lead",
    "joinDate": "2023-07-06"
  },
  {
    "id": "cust-36",
    "name": "Michael Thomas",
    "email": "michael.thomas@techcorp.com",
    "company": "Cyberdyne",
    "country": "India",
    "plan": "Basic",
    "status": "Active",
    "joinDate": "2022-07-25"
  },
  {
    "id": "cust-37",
    "name": "John Jones",
    "email": "john.jones@oscorp.com",
    "company": "Startup Inc",
    "country": "Germany",
    "plan": "Pro",
    "status": "Inactive",
    "joinDate": "2022-11-07"
  },
  {
    "id": "cust-38",
    "name": "William Rodriguez",
    "email": "william.rodriguez@massivedynamic.com",
    "company": "Black Mesa",
    "country": "Australia",
    "plan": "Pro",
    "status": "Active",
    "joinDate": "2021-02-09"
  },
  {
    "id": "cust-39",
    "name": "Patricia Wilson",
    "email": "patricia.wilson@startupinc.com",
    "company": "Pied Piper",
    "country": "Mexico",
    "plan": "Pro",
    "status": "Lead",
    "joinDate": "2024-09-07"
  },
  {
    "id": "cust-40",
    "name": "Mary Martinez",
    "email": "mary.martinez@cloudsolutions.com",
    "company": "Hooli",
    "country": "India",
    "plan": "Enterprise",
    "status": "Lead",
    "joinDate": "2025-05-01"
  },
  {
    "id": "cust-41",
    "name": "David Jones",
    "email": "david.jones@startupinc.com",
    "company": "LexCorp",
    "country": "Brazil",
    "plan": "Enterprise",
    "status": "Lead",
    "joinDate": "2025-02-16"
  },
  {
    "id": "cust-42",
    "name": "Charles Garcia",
    "email": "charles.garcia@wayneenterprises.com",
    "company": "Cloud Solutions",
    "country": "UK",
    "plan": "Enterprise",
    "status": "Lead",
    "joinDate": "2025-08-31"
  },
  {
    "id": "cust-43",
    "name": "John Anderson",
    "email": "john.anderson@designco.com",
    "company": "Global IO",
    "country": "Germany",
    "plan": "Basic",
    "status": "Inactive",
    "joinDate": "2023-12-23"
  },
  {
    "id": "cust-44",
    "name": "Susan Moore",
    "email": "susan.moore@massivedynamic.com",
    "company": "Pied Piper",
    "country": "Japan",
    "plan": "Enterprise",
    "status": "Inactive",
    "joinDate": "2023-08-19"
  },
  {
    "id": "cust-45",
    "name": "Charles Lopez",
    "email": "charles.lopez@acmecorp.com",
    "company": "Startup Inc",
    "country": "Australia",
    "plan": "Basic",
    "status": "Inactive",
    "joinDate": "2022-08-15"
  },
  {
    "id": "cust-46",
    "name": "Joseph Lopez",
    "email": "joseph.lopez@designco.com",
    "company": "Black Mesa",
    "country": "Germany",
    "plan": "Enterprise",
    "status": "Active",
    "joinDate": "2022-05-31"
  },
  {
    "id": "cust-47",
    "name": "Karen Martinez",
    "email": "karen.martinez@piedpiper.com",
    "company": "TechCorp",
    "country": "Brazil",
    "plan": "Enterprise",
    "status": "Active",
    "joinDate": "2026-04-12"
  },
  {
    "id": "cust-48",
    "name": "Joseph Smith",
    "email": "joseph.smith@aviato.com",
    "company": "Startup Inc",
    "country": "Brazil",
    "plan": "Basic",
    "status": "Inactive",
    "joinDate": "2024-08-09"
  },
  {
    "id": "cust-49",
    "name": "Jessica Johnson",
    "email": "jessica.johnson@globalio.com",
    "company": "Hooli",
    "country": "Japan",
    "plan": "Enterprise",
    "status": "Active",
    "joinDate": "2025-10-30"
  },
  {
    "id": "cust-50",
    "name": "Karen Gonzalez",
    "email": "karen.gonzalez@techcorp.com",
    "company": "Acme Corp",
    "country": "Brazil",
    "plan": "Enterprise",
    "status": "Inactive",
    "joinDate": "2025-09-26"
  }
];

export const mockOrders: Order[] = [
  {
    "id": "ORD-3844",
    "customerId": "cust-24",
    "customerName": "Charles Smith",
    "amount": 2811.37,
    "date": "2025-07-03",
    "status": "Completed",
    "paymentMethod": "Apple Pay"
  },
  {
    "id": "ORD-8149",
    "customerId": "cust-24",
    "customerName": "Charles Smith",
    "amount": 1724.54,
    "date": "2026-06-04",
    "status": "Processing",
    "paymentMethod": "PayPal"
  },
  {
    "id": "ORD-3158",
    "customerId": "cust-32",
    "customerName": "Michael Anderson",
    "amount": 1616.62,
    "date": "2022-06-02",
    "status": "Cancelled",
    "paymentMethod": "PayPal"
  },
  {
    "id": "ORD-5223",
    "customerId": "cust-32",
    "customerName": "Michael Anderson",
    "amount": 4846.87,
    "date": "2024-04-18",
    "status": "Completed",
    "paymentMethod": "PayPal"
  },
  {
    "id": "ORD-5757",
    "customerId": "cust-10",
    "customerName": "Karen Gonzalez",
    "amount": 606.4,
    "date": "2026-01-09",
    "status": "Processing",
    "paymentMethod": "PayPal"
  },
  {
    "id": "ORD-6481",
    "customerId": "cust-30",
    "customerName": "Linda Anderson",
    "amount": 4463.23,
    "date": "2024-10-25",
    "status": "Pending",
    "paymentMethod": "Stripe"
  },
  {
    "id": "ORD-2567",
    "customerId": "cust-20",
    "customerName": "David Martin",
    "amount": 3309.99,
    "date": "2026-02-28",
    "status": "Completed",
    "paymentMethod": "Credit Card"
  },
  {
    "id": "ORD-3216",
    "customerId": "cust-48",
    "customerName": "Joseph Smith",
    "amount": 4338.28,
    "date": "2026-03-15",
    "status": "Pending",
    "paymentMethod": "Stripe"
  },
  {
    "id": "ORD-8864",
    "customerId": "cust-29",
    "customerName": "Patricia Jones",
    "amount": 3086.2,
    "date": "2024-04-08",
    "status": "Completed",
    "paymentMethod": "Stripe"
  },
  {
    "id": "ORD-8896",
    "customerId": "cust-47",
    "customerName": "Karen Martinez",
    "amount": 2549.23,
    "date": "2022-07-17",
    "status": "Pending",
    "paymentMethod": "PayPal"
  },
  {
    "id": "ORD-6285",
    "customerId": "cust-44",
    "customerName": "Susan Moore",
    "amount": 2458.34,
    "date": "2022-09-01",
    "status": "Cancelled",
    "paymentMethod": "Bank Transfer"
  },
  {
    "id": "ORD-4447",
    "customerId": "cust-3",
    "customerName": "Charles Rodriguez",
    "amount": 4734.47,
    "date": "2022-02-18",
    "status": "Completed",
    "paymentMethod": "Apple Pay"
  },
  {
    "id": "ORD-4532",
    "customerId": "cust-12",
    "customerName": "Barbara Wilson",
    "amount": 1063.89,
    "date": "2024-09-17",
    "status": "Pending",
    "paymentMethod": "Apple Pay"
  },
  {
    "id": "ORD-9587",
    "customerId": "cust-12",
    "customerName": "Barbara Wilson",
    "amount": 1726.18,
    "date": "2025-03-22",
    "status": "Processing",
    "paymentMethod": "Stripe"
  },
  {
    "id": "ORD-7938",
    "customerId": "cust-3",
    "customerName": "Charles Rodriguez",
    "amount": 4274.64,
    "date": "2022-09-06",
    "status": "Processing",
    "paymentMethod": "Stripe"
  },
  {
    "id": "ORD-5558",
    "customerId": "cust-5",
    "customerName": "Joseph Lopez",
    "amount": 4892.35,
    "date": "2023-03-14",
    "status": "Pending",
    "paymentMethod": "Stripe"
  },
  {
    "id": "ORD-6195",
    "customerId": "cust-16",
    "customerName": "John Hernandez",
    "amount": 3196.1,
    "date": "2023-11-16",
    "status": "Pending",
    "paymentMethod": "Apple Pay"
  },
  {
    "id": "ORD-9242",
    "customerId": "cust-46",
    "customerName": "Joseph Lopez",
    "amount": 4491.38,
    "date": "2023-10-04",
    "status": "Processing",
    "paymentMethod": "PayPal"
  },
  {
    "id": "ORD-2792",
    "customerId": "cust-5",
    "customerName": "Joseph Lopez",
    "amount": 1587.04,
    "date": "2024-07-14",
    "status": "Pending",
    "paymentMethod": "PayPal"
  },
  {
    "id": "ORD-1573",
    "customerId": "cust-10",
    "customerName": "Karen Gonzalez",
    "amount": 813.51,
    "date": "2025-04-30",
    "status": "Completed",
    "paymentMethod": "Stripe"
  },
  {
    "id": "ORD-1925",
    "customerId": "cust-5",
    "customerName": "Joseph Lopez",
    "amount": 2543.86,
    "date": "2024-12-26",
    "status": "Processing",
    "paymentMethod": "Credit Card"
  },
  {
    "id": "ORD-5308",
    "customerId": "cust-8",
    "customerName": "Elizabeth Anderson",
    "amount": 3042.4,
    "date": "2023-04-12",
    "status": "Pending",
    "paymentMethod": "PayPal"
  },
  {
    "id": "ORD-4839",
    "customerId": "cust-46",
    "customerName": "Joseph Lopez",
    "amount": 1497.57,
    "date": "2022-11-04",
    "status": "Completed",
    "paymentMethod": "Credit Card"
  },
  {
    "id": "ORD-2494",
    "customerId": "cust-27",
    "customerName": "Jennifer Jackson",
    "amount": 242.71,
    "date": "2025-01-18",
    "status": "Cancelled",
    "paymentMethod": "Bank Transfer"
  },
  {
    "id": "ORD-1936",
    "customerId": "cust-13",
    "customerName": "William Gonzalez",
    "amount": 1142.27,
    "date": "2024-11-24",
    "status": "Completed",
    "paymentMethod": "Stripe"
  },
  {
    "id": "ORD-1730",
    "customerId": "cust-50",
    "customerName": "Karen Gonzalez",
    "amount": 3596.33,
    "date": "2024-10-19",
    "status": "Pending",
    "paymentMethod": "Bank Transfer"
  },
  {
    "id": "ORD-5346",
    "customerId": "cust-43",
    "customerName": "John Anderson",
    "amount": 3320.47,
    "date": "2022-10-11",
    "status": "Completed",
    "paymentMethod": "Bank Transfer"
  },
  {
    "id": "ORD-2895",
    "customerId": "cust-27",
    "customerName": "Jennifer Jackson",
    "amount": 3800.46,
    "date": "2022-04-13",
    "status": "Pending",
    "paymentMethod": "Apple Pay"
  },
  {
    "id": "ORD-4238",
    "customerId": "cust-29",
    "customerName": "Patricia Jones",
    "amount": 2990.19,
    "date": "2023-11-30",
    "status": "Cancelled",
    "paymentMethod": "PayPal"
  },
  {
    "id": "ORD-1810",
    "customerId": "cust-39",
    "customerName": "Patricia Wilson",
    "amount": 4572.93,
    "date": "2024-10-15",
    "status": "Cancelled",
    "paymentMethod": "PayPal"
  },
  {
    "id": "ORD-7497",
    "customerId": "cust-27",
    "customerName": "Jennifer Jackson",
    "amount": 1735.79,
    "date": "2022-02-04",
    "status": "Pending",
    "paymentMethod": "Apple Pay"
  },
  {
    "id": "ORD-5942",
    "customerId": "cust-10",
    "customerName": "Karen Gonzalez",
    "amount": 4472.08,
    "date": "2025-02-28",
    "status": "Pending",
    "paymentMethod": "Apple Pay"
  },
  {
    "id": "ORD-6283",
    "customerId": "cust-12",
    "customerName": "Barbara Wilson",
    "amount": 2467.81,
    "date": "2024-03-30",
    "status": "Cancelled",
    "paymentMethod": "Stripe"
  },
  {
    "id": "ORD-1635",
    "customerId": "cust-18",
    "customerName": "Karen Rodriguez",
    "amount": 1460.91,
    "date": "2025-02-03",
    "status": "Processing",
    "paymentMethod": "PayPal"
  },
  {
    "id": "ORD-4363",
    "customerId": "cust-19",
    "customerName": "Richard Miller",
    "amount": 1037.93,
    "date": "2024-12-23",
    "status": "Cancelled",
    "paymentMethod": "Bank Transfer"
  },
  {
    "id": "ORD-1678",
    "customerId": "cust-20",
    "customerName": "David Martin",
    "amount": 4451.36,
    "date": "2023-04-25",
    "status": "Processing",
    "paymentMethod": "Apple Pay"
  },
  {
    "id": "ORD-5913",
    "customerId": "cust-19",
    "customerName": "Richard Miller",
    "amount": 2671.38,
    "date": "2026-04-28",
    "status": "Completed",
    "paymentMethod": "Stripe"
  },
  {
    "id": "ORD-3070",
    "customerId": "cust-1",
    "customerName": "William Hernandez",
    "amount": 3539.95,
    "date": "2022-06-07",
    "status": "Processing",
    "paymentMethod": "Stripe"
  },
  {
    "id": "ORD-3247",
    "customerId": "cust-44",
    "customerName": "Susan Moore",
    "amount": 658.06,
    "date": "2022-01-29",
    "status": "Cancelled",
    "paymentMethod": "Credit Card"
  },
  {
    "id": "ORD-3708",
    "customerId": "cust-49",
    "customerName": "Jessica Johnson",
    "amount": 4259.47,
    "date": "2024-08-23",
    "status": "Pending",
    "paymentMethod": "Apple Pay"
  },
  {
    "id": "ORD-4163",
    "customerId": "cust-48",
    "customerName": "Joseph Smith",
    "amount": 2624.4,
    "date": "2022-12-31",
    "status": "Cancelled",
    "paymentMethod": "Stripe"
  },
  {
    "id": "ORD-8284",
    "customerId": "cust-49",
    "customerName": "Jessica Johnson",
    "amount": 264.86,
    "date": "2024-06-20",
    "status": "Completed",
    "paymentMethod": "Stripe"
  },
  {
    "id": "ORD-5390",
    "customerId": "cust-49",
    "customerName": "Jessica Johnson",
    "amount": 1701.15,
    "date": "2024-03-16",
    "status": "Processing",
    "paymentMethod": "Credit Card"
  },
  {
    "id": "ORD-8875",
    "customerId": "cust-44",
    "customerName": "Susan Moore",
    "amount": 706.28,
    "date": "2025-11-01",
    "status": "Pending",
    "paymentMethod": "PayPal"
  },
  {
    "id": "ORD-2039",
    "customerId": "cust-8",
    "customerName": "Elizabeth Anderson",
    "amount": 2531.66,
    "date": "2022-06-01",
    "status": "Processing",
    "paymentMethod": "Apple Pay"
  },
  {
    "id": "ORD-5049",
    "customerId": "cust-20",
    "customerName": "David Martin",
    "amount": 1679.38,
    "date": "2022-07-05",
    "status": "Pending",
    "paymentMethod": "Bank Transfer"
  },
  {
    "id": "ORD-4757",
    "customerId": "cust-28",
    "customerName": "Sarah Taylor",
    "amount": 4059.51,
    "date": "2022-05-11",
    "status": "Processing",
    "paymentMethod": "Bank Transfer"
  },
  {
    "id": "ORD-7191",
    "customerId": "cust-13",
    "customerName": "William Gonzalez",
    "amount": 4624.43,
    "date": "2022-03-26",
    "status": "Processing",
    "paymentMethod": "Bank Transfer"
  },
  {
    "id": "ORD-7298",
    "customerId": "cust-19",
    "customerName": "Richard Miller",
    "amount": 52.82,
    "date": "2025-03-10",
    "status": "Pending",
    "paymentMethod": "Stripe"
  },
  {
    "id": "ORD-3147",
    "customerId": "cust-34",
    "customerName": "Sarah Moore",
    "amount": 1674.32,
    "date": "2023-09-30",
    "status": "Completed",
    "paymentMethod": "Stripe"
  }
];

export const mockActivities: Activity[] = [
  {
    "id": "act-1",
    "title": "Meeting with Cyberdyne",
    "timestamp": "2 hours ago",
    "type": "meeting"
  },
  {
    "id": "act-2",
    "title": "Meeting with Cyberdyne",
    "timestamp": "14 hours ago",
    "type": "meeting"
  },
  {
    "id": "act-3",
    "title": "Meeting with LexCorp",
    "timestamp": "4 hours ago",
    "type": "meeting"
  },
  {
    "id": "act-4",
    "title": "Meeting with Global IO",
    "timestamp": "11 hours ago",
    "type": "meeting"
  },
  {
    "id": "act-5",
    "title": "Meeting with Wayne Enterprises",
    "timestamp": "12 hours ago",
    "type": "meeting"
  },
  {
    "id": "act-6",
    "title": "New order from Aviato",
    "timestamp": "19 hours ago",
    "type": "order"
  },
  {
    "id": "act-7",
    "title": "Meeting with Startup Inc",
    "timestamp": "17 hours ago",
    "type": "meeting"
  },
  {
    "id": "act-8",
    "title": "New order from Design Co",
    "timestamp": "9 hours ago",
    "type": "order"
  },
  {
    "id": "act-9",
    "title": "System backup completed",
    "timestamp": "11 hours ago",
    "type": "system"
  },
  {
    "id": "act-10",
    "title": "New order from Cyberdyne",
    "timestamp": "4 hours ago",
    "type": "order"
  },
  {
    "id": "act-11",
    "title": "System backup completed",
    "timestamp": "7 hours ago",
    "type": "system"
  },
  {
    "id": "act-12",
    "title": "New order from Black Mesa",
    "timestamp": "22 hours ago",
    "type": "order"
  },
  {
    "id": "act-13",
    "title": "Susan Jones joined Pro plan",
    "timestamp": "20 hours ago",
    "type": "user"
  },
  {
    "id": "act-14",
    "title": "Meeting with Global IO",
    "timestamp": "22 hours ago",
    "type": "meeting"
  },
  {
    "id": "act-15",
    "title": "Michael Anderson joined Pro plan",
    "timestamp": "9 hours ago",
    "type": "user"
  },
  {
    "id": "act-16",
    "title": "System backup completed",
    "timestamp": "3 hours ago",
    "type": "system"
  },
  {
    "id": "act-17",
    "title": "System backup completed",
    "timestamp": "1 hours ago",
    "type": "system"
  },
  {
    "id": "act-18",
    "title": "System backup completed",
    "timestamp": "24 hours ago",
    "type": "system"
  },
  {
    "id": "act-19",
    "title": "Joseph Brown joined Enterprise plan",
    "timestamp": "11 hours ago",
    "type": "user"
  },
  {
    "id": "act-20",
    "title": "Richard Wilson joined Pro plan",
    "timestamp": "22 hours ago",
    "type": "user"
  }
];

export const revenueData = [
  {
    "name": "Jan",
    "total": 19592
  },
  {
    "name": "Feb",
    "total": 21527
  },
  {
    "name": "Mar",
    "total": 22095
  },
  {
    "name": "Apr",
    "total": 22636
  },
  {
    "name": "May",
    "total": 31726
  },
  {
    "name": "Jun",
    "total": 36541
  },
  {
    "name": "Jul",
    "total": 34988
  },
  {
    "name": "Aug",
    "total": 39763
  },
  {
    "name": "Sep",
    "total": 42476
  },
  {
    "name": "Oct",
    "total": 48278
  },
  {
    "name": "Nov",
    "total": 58258
  },
  {
    "name": "Dec",
    "total": 64433
  }
];

export const salesData = [
  {
    "name": "Pro",
    "value": 598
  },
  {
    "name": "Enterprise",
    "value": 313
  },
  {
    "name": "Basic",
    "value": 373
  },
  {
    "name": "Custom",
    "value": 106
  }
];
