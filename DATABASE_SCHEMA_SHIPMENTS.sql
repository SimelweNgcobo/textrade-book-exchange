-- Shipments table for tracking Courier Guy deliveries
-- This table will be needed when automatic shipment creation is enabled

CREATE TABLE IF NOT EXISTS shipments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- Courier Guy API integration fields
    courier_guy_shipment_id VARCHAR(255) UNIQUE, -- Courier Guy's internal shipment ID
    tracking_number VARCHAR(255) NOT NULL UNIQUE, -- Public tracking number
    reference VARCHAR(255), -- Our internal reference (e.g., RBS-{book_id}-{timestamp})
    
    -- Shipment status tracking
    status VARCHAR(50) DEFAULT 'pending', -- pending, processing, in_transit, out_for_delivery, delivered, failed, cancelled
    status_description TEXT, -- Human-readable status description
    
    -- Address information (stored for reference)
    sender_name VARCHAR(255) NOT NULL,
    sender_address JSONB NOT NULL, -- Seller's pickup address
    recipient_name VARCHAR(255) NOT NULL,
    recipient_address JSONB NOT NULL, -- Buyer's delivery address
    
    -- Package details
    weight DECIMAL(5,2) DEFAULT 1.0, -- Weight in kg
    dimensions JSONB, -- {length, width, height} in cm
    description TEXT, -- Package description
    declared_value DECIMAL(10,2), -- Package value in ZAR
    
    -- Delivery tracking
    estimated_delivery_date TIMESTAMP WITH TIME ZONE,
    actual_delivery_date TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_status CHECK (status IN ('pending', 'processing', 'in_transit', 'out_for_delivery', 'delivered', 'failed', 'cancelled')),
    CONSTRAINT positive_weight CHECK (weight > 0),
    CONSTRAINT positive_value CHECK (declared_value > 0)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_shipments_book_id ON shipments(book_id);
CREATE INDEX IF NOT EXISTS idx_shipments_seller_id ON shipments(seller_id);
CREATE INDEX IF NOT EXISTS idx_shipments_buyer_id ON shipments(buyer_id);
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_shipments_created_at ON shipments(created_at);

-- RLS (Row Level Security) policies
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;

-- Users can only see shipments where they are either the buyer or seller
CREATE POLICY "Users can view their own shipments" ON shipments
    FOR SELECT
    USING (
        seller_id = auth.uid() OR 
        buyer_id = auth.uid()
    );

-- Only the system can insert shipments (through service role)
CREATE POLICY "System can insert shipments" ON shipments
    FOR INSERT
    WITH CHECK (true); -- This will be restricted to service role in practice

-- Only the system can update shipment status
CREATE POLICY "System can update shipments" ON shipments
    FOR UPDATE
    USING (true) -- This will be restricted to service role in practice
    WITH CHECK (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_shipment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_shipments_updated_at
    BEFORE UPDATE ON shipments
    FOR EACH ROW
    EXECUTE FUNCTION update_shipment_updated_at();

-- Create a view for easier querying with related data
CREATE OR REPLACE VIEW shipment_details AS
SELECT 
    s.*,
    b.title as book_title,
    b.author as book_author,
    b.price as book_price,
    seller.name as seller_name,
    seller.email as seller_email,
    buyer.name as buyer_name,
    buyer.email as buyer_email
FROM shipments s
JOIN books b ON s.book_id = b.id
JOIN profiles seller ON s.seller_id = seller.id
JOIN profiles buyer ON s.buyer_id = buyer.id;

-- Grant appropriate permissions
GRANT SELECT ON shipment_details TO authenticated;
GRANT SELECT, INSERT, UPDATE ON shipments TO service_role;

-- Example queries for common operations:

-- Get all shipments for a user (as buyer or seller)
-- SELECT * FROM shipment_details WHERE seller_id = $1 OR buyer_id = $1 ORDER BY created_at DESC;

-- Get shipment by tracking number
-- SELECT * FROM shipment_details WHERE tracking_number = $1;

-- Update shipment status (from Courier Guy webhook or API polling)
-- UPDATE shipments SET status = $1, status_description = $2, updated_at = NOW() WHERE tracking_number = $3;
