import { type NextRequest, NextResponse } from "next/server"

// Mock data - in a real app, this would come from your database
const mockProperties = [
  {
    id: 1,
    property_code: "CPS-S-001",
    title: "Modern 3-Bedroom Apartment Block A - Kyanja",
    description:
      "Luxurious modern apartment featuring contemporary design, spacious living areas, premium kitchen with built-in appliances, elegant bathroom with marble finishes, and excellent natural lighting. Part of an exclusive residential development in Kyanja.",
    price: 1300000000,
    location: "Kyanja, Kampala",
    property_type: "sale",
    category: "residential",
    bedrooms: 3,
    bathrooms: 2,
    area_sqm: 120,
    land_size_decimals: 25,
    features: [
      "Modern Kitchen",
      "Built-in Appliances",
      "Marble Bathroom",
      "Balcony",
      "Parking",
      "24/7 Security",
      "Landscaped Gardens",
      "Premium Finishes",
    ],
    images: [
      "/images/kyanja-apartment-exterior.jpg",
      "/images/kyanja-apartment-living.jpg",
      "/images/kyanja-apartment-kitchen1.jpg",
      "/images/kyanja-apartment-kitchen2.jpg",
      "/images/kyanja-apartment-bathroom.jpg",
    ],
    status: "available",
  },
  {
    id: 2,
    property_code: "CPS-S-002",
    title: "Modern 3-Bedroom Apartment Block B - Kyanja",
    description:
      "Stunning modern apartment with open-plan living, state-of-the-art kitchen, luxurious bathroom with premium fixtures, and contemporary design throughout. Located in a prime residential area with excellent amenities.",
    price: 1300000000,
    location: "Kyanja, Kampala",
    property_type: "sale",
    category: "residential",
    bedrooms: 3,
    bathrooms: 2,
    area_sqm: 120,
    land_size_decimals: 25,
    features: [
      "Open Plan Living",
      "Premium Kitchen",
      "Luxury Bathroom",
      "Modern Fixtures",
      "Parking",
      "Security",
      "Garden Access",
      "Quality Finishes",
    ],
    images: [
      "/images/kyanja-apartment-exterior.jpg",
      "/images/kyanja-apartment-living.jpg",
      "/images/kyanja-apartment-kitchen1.jpg",
      "/images/kyanja-apartment-kitchen2.jpg",
      "/images/kyanja-apartment-bathroom.jpg",
    ],
    status: "available",
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const property = mockProperties.find((p) => p.id === id)

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const updates = await request.json()
    const propertyIndex = mockProperties.findIndex((p) => p.id === id)

    if (propertyIndex === -1) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    mockProperties[propertyIndex] = { ...mockProperties[propertyIndex], ...updates }

    return NextResponse.json(mockProperties[propertyIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const propertyIndex = mockProperties.findIndex((p) => p.id === id)

    if (propertyIndex === -1) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    mockProperties.splice(propertyIndex, 1)

    return NextResponse.json({ message: "Property deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 })
  }
}
