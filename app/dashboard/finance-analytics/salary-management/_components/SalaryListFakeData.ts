export interface SalaryListRow {
  id: string;
  employee: {
    name: string;
    email: string;
    avatar?: string;
  };
  role: string;
  basicSalary: number;
  bonus: number;
  total: number;
  status: "Paid" | "Pending" | "Processing";
  paymentDate: string;
}

export const salaryListFakeData: SalaryListRow[] = [
  {
    id: "SAL-001",
    employee: {
      name: "John Doe",
      email: "john@example.com",
    },
    role: "Senior Developer",
    basicSalary: 5000,
    bonus: 500,
    total: 5500,
    status: "Paid",
    paymentDate: "2023-10-25",
  },
  {
    id: "SAL-002",
    employee: {
      name: "Jane Smith",
      email: "jane@example.com",
    },
    role: "UI/UX Designer",
    basicSalary: 4000,
    bonus: 300,
    total: 4300,
    status: "Pending",
    paymentDate: "2023-10-25",
  },
  {
    id: "SAL-003",
    employee: {
      name: "Robert Fox",
      email: "robert@example.com",
    },
    role: "Project Manager",
    basicSalary: 6000,
    bonus: 1000,
    total: 7000,
    status: "Processing",
    paymentDate: "2023-10-26",
  },
  {
    id: "SAL-004",
    employee: {
      name: "Emily Davis",
      email: "emily@example.com",
    },
    role: "QA Engineer",
    basicSalary: 3500,
    bonus: 200,
    total: 3700,
    status: "Paid",
    paymentDate: "2023-10-24",
  },
  {
    id: "SAL-005",
    employee: {
      name: "Michael Brown",
      email: "michael@example.com",
    },
    role: "Backend Dev",
    basicSalary: 4800,
    bonus: 400,
    total: 5200,
    status: "Paid",
    paymentDate: "2023-10-25",
  },
];
