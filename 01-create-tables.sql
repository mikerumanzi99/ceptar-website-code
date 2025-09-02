-- Create properties table with CPS coding system
CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  property_code VARCHAR(20) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price BIGINT NOT NULL,
  location VARCHAR(255) NOT NULL,
  property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('sale', 'rent')),
  category VARCHAR(50) NOT NULL CHECK (category IN ('residential', 'commercial', 'land', 'mixed-use', 'industrial')),
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  area_sqm INTEGER DEFAULT 0,
  land_size_decimals INTEGER DEFAULT 0,
  features TEXT[], -- Array of features
  images TEXT[], -- Array of image URLs
  status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'sold', 'rented', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create property counter table for tracking property numbers
CREATE TABLE IF NOT EXISTS property_counter (
  id SERIAL PRIMARY KEY,
  property_type VARCHAR(10) NOT NULL,
  counter INTEGER DEFAULT 0,
  UNIQUE(property_type)
);

-- Initialize counters
INSERT INTO property_counter (property_type, counter) VALUES ('sale', 0), ('rent', 0) ON CONFLICT DO NOTHING;

-- Create function to generate property codes
CREATE OR REPLACE FUNCTION generate_property_code(p_type VARCHAR)
RETURNS VARCHAR AS $$
DECLARE
  counter_val INTEGER;
  type_code VARCHAR(1);
BEGIN
  -- Determine type code
  IF p_type = 'sale' THEN
    type_code := 'S';
  ELSIF p_type = 'rent' THEN
    type_code := 'R';
  ELSE
    RAISE EXCEPTION 'Invalid property type: %', p_type;
  END IF;
  
  -- Update and get counter
  UPDATE property_counter 
  SET counter = counter + 1 
  WHERE property_type = p_type 
  RETURNING counter INTO counter_val;
  
  -- Return formatted code
  RETURN 'CPS-' || type_code || '-' || LPAD(counter_val::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql;

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create users table for admin
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample properties with CPS codes
INSERT INTO properties (
  property_code, title, description, price, location, property_type, category,
  bedrooms, bathrooms, area_sqm, land_size_decimals, features, images, status
) VALUES 
(
  'CPS-S-001',
  'Modern 3-Bedroom Apartment Block A - Kyanja',
  'Luxurious modern apartment featuring contemporary design, spacious living areas, premium kitchen with built-in appliances, elegant bathroom with marble finishes, and excellent natural lighting. Part of an exclusive residential development in Kyanja.',
  1300000000,
  'Kyanja, Kampala',
  'sale',
  'residential',
  3,
  2,
  120,
  25,
  ARRAY['Modern Kitchen', 'Built-in Appliances', 'Marble Bathroom', 'Balcony', 'Parking', '24/7 Security', 'Landscaped Gardens', 'Premium Finishes'],
  ARRAY['/images/kyanja-apartment-exterior.jpg', '/images/kyanja-apartment-living.jpg', '/images/kyanja-apartment-kitchen1.jpg', '/images/kyanja-apartment-kitchen2.jpg', '/images/kyanja-apartment-bathroom.jpg'],
  'available'
),
(
  'CPS-S-002',
  'Modern 3-Bedroom Apartment Block B - Kyanja',
  'Stunning modern apartment with open-plan living, state-of-the-art kitchen, luxurious bathroom with premium fixtures, and contemporary design throughout. Located in a prime residential area with excellent amenities.',
  1300000000,
  'Kyanja, Kampala',
  'sale',
  'residential',
  3,
  2,
  120,
  25,
  ARRAY['Open Plan Living', 'Premium Kitchen', 'Luxury Bathroom', 'Modern Fixtures', 'Parking', 'Security', 'Garden Access', 'Quality Finishes'],
  ARRAY['/images/kyanja-apartment-exterior.jpg', '/images/kyanja-apartment-living.jpg', '/images/kyanja-apartment-kitchen1.jpg', '/images/kyanja-apartment-kitchen2.jpg', '/images/kyanja-apartment-bathroom.jpg'],
  'available'
);
