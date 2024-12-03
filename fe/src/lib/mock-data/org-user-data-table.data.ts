import { OrgData } from "@/interfaces/organization/index.interface"

export const data: OrgData[] = [
  {
    id: "org-123456",
    name: "TechInnovate Solutions",
    description:
      "A cutting-edge software development company specializing in AI and machine learning applications.",
    users: [
      {
        id: "user-001",
        name: "Alice Johnson",
        email: "alice.johnson@techinnovate.com",
        role: "admin",
      },
      {
        id: "user-002",
        name: "Bob Smith",
        email: "bob.smith@techinnovate.com",
        role: "member",
      },
      {
        id: "user-003",
        name: "Carol Davis",
        email: "carol.davis@techinnovate.com",
        role: "member",
      },
      {
        id: "user-004",
        name: "David Brown",
        email: "david.brown@partner.com",
        role: "guest",
      },
    ],
    projects: [
      {
        id: "proj-001",
        name: "AI-Powered Customer Service Bot",
        description:
          "Developing an intelligent chatbot to improve customer support efficiency.",
        users: [
          {
            id: "user-001",
            name: "Alice Johnson",
            email: "alice.johnson@techinnovate.com",
            role: "admin",
          },
          {
            id: "user-002",
            name: "Bob Smith",
            email: "bob.smith@techinnovate.com",
            role: "member",
          },
        ],
        status: "active",
      },
      {
        id: "proj-002",
        name: "Predictive Maintenance System",
        description:
          "Creating a machine learning model to predict equipment failures in manufacturing plants.",
        users: [
          {
            id: "user-001",
            name: "Alice Johnson",
            email: "alice.johnson@techinnovate.com",
            role: "admin",
          },
          {
            id: "user-003",
            name: "Carol Davis",
            email: "carol.davis@techinnovate.com",
            role: "member",
          },
          {
            id: "user-004",
            name: "David Brown",
            email: "david.brown@partner.com",
            role: "guest",
          },
        ],
        status: "active",
      },
      {
        id: "proj-003",
        name: "Smart Home Energy Management",
        description:
          "Developing an IoT-based system for optimizing energy consumption in residential buildings.",
        users: [
          {
            id: "user-002",
            name: "Bob Smith",
            email: "bob.smith@techinnovate.com",
            role: "member",
          },
          {
            id: "user-003",
            name: "Carol Davis",
            email: "carol.davis@techinnovate.com",
            role: "member",
          },
        ],
        status: "archived",
      },
    ],
  },
  {
    id: "org-654321",
    name: "ByteCraft Labs",
    description:
      "A software development company specializing in web and mobile applications.",
    users: [
      {
        id: "user-005",
        name: "Eve Wilson",
        email: "eve@gm.com",
        role: "admin",
      },
    ],
    projects: [
      {
        id: "proj-004",
        name: "E-Commerce Platform",
        description:
          "Building an online shopping platform for small and medium-sized businesses.",
        users: [
          {
            id: "user-005",
            name: "Eve Wilson",
            email: "eve@gm.com",
            role: "admin",
          },
        ],
        status: "active",
      },
    ],
  },
]
