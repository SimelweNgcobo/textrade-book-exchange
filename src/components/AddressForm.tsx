
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { MapPin, Package } from 'lucide-react';

interface Address {
  complex: string;
  unitNumber: string;
  streetAddress: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
}

interface AddressFormProps {
  pickupAddress?: Address;
  shippingAddress?: Address;
  addressesSame?: boolean;
  onSave: (pickup: Address, shipping: Address, same: boolean) => Promise<void>;
  isLoading?: boolean;
}

const AddressForm = ({ 
  pickupAddress, 
  shippingAddress, 
  addressesSame = false, 
  onSave, 
  isLoading = false 
}: AddressFormProps) => {
  const [pickup, setPickup] = useState<Address>({
    complex: '',
    unitNumber: '',
    streetAddress: '',
    suburb: '',
    city: '',
    province: '',
    postalCode: ''
  });

  const [shipping, setShipping] = useState<Address>({
    complex: '',
    unitNumber: '',
    streetAddress: '',
    suburb: '',
    city: '',
    province: '',
    postalCode: ''
  });

  const [sameAddress, setSameAddress] = useState(addressesSame);

  useEffect(() => {
    if (pickupAddress) {
      setPickup(pickupAddress);
    }
    if (shippingAddress) {
      setShipping(shippingAddress);
    }
    setSameAddress(addressesSame);
  }, [pickupAddress, shippingAddress, addressesSame]);

  useEffect(() => {
    if (sameAddress) {
      setShipping(pickup);
    }
  }, [sameAddress, pickup]);

  const handlePickupChange = (field: keyof Address, value: string) => {
    const newPickup = { ...pickup, [field]: value };
    setPickup(newPickup);
    if (sameAddress) {
      setShipping(newPickup);
    }
  };

  const handleShippingChange = (field: keyof Address, value: string) => {
    setShipping({ ...shipping, [field]: value });
  };

  const handleSameAddressChange = (checked: boolean) => {
    setSameAddress(checked);
    if (checked) {
      setShipping(pickup);
    }
  };

  const validateAddress = (address: Address): boolean => {
    return !!(address.streetAddress && address.suburb && address.city && address.province && address.postalCode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAddress(pickup)) {
      toast.error('Please fill in all required pickup address fields');
      return;
    }
    
    if (!sameAddress && !validateAddress(shipping)) {
      toast.error('Please fill in all required shipping address fields');
      return;
    }

    try {
      await onSave(pickup, shipping, sameAddress);
      toast.success('Addresses saved successfully!');
    } catch (error) {
      toast.error('Failed to save addresses');
    }
  };

  const renderAddressFields = (
    address: Address,
    onChange: (field: keyof Address, value: string) => void,
    disabled = false
  ) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="complex">Complex/Building Name</Label>
        <Input
          id="complex"
          value={address.complex}
          onChange={(e) => onChange('complex', e.target.value)}
          placeholder="Optional"
          disabled={disabled}
        />
      </div>
      <div>
        <Label htmlFor="unitNumber">Unit Number</Label>
        <Input
          id="unitNumber"
          value={address.unitNumber}
          onChange={(e) => onChange('unitNumber', e.target.value)}
          placeholder="Apt, Suite, Unit"
          disabled={disabled}
        />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="streetAddress">Street Address <span className="text-red-500">*</span></Label>
        <Input
          id="streetAddress"
          value={address.streetAddress}
          onChange={(e) => onChange('streetAddress', e.target.value)}
          placeholder="123 Main Street"
          required
          disabled={disabled}
        />
      </div>
      <div>
        <Label htmlFor="suburb">Suburb <span className="text-red-500">*</span></Label>
        <Input
          id="suburb"
          value={address.suburb}
          onChange={(e) => onChange('suburb', e.target.value)}
          placeholder="Suburb"
          required
          disabled={disabled}
        />
      </div>
      <div>
        <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
        <Input
          id="city"
          value={address.city}
          onChange={(e) => onChange('city', e.target.value)}
          placeholder="City"
          required
          disabled={disabled}
        />
      </div>
      <div>
        <Label htmlFor="province">Province <span className="text-red-500">*</span></Label>
        <Input
          id="province"
          value={address.province}
          onChange={(e) => onChange('province', e.target.value)}
          placeholder="Province"
          required
          disabled={disabled}
        />
      </div>
      <div>
        <Label htmlFor="postalCode">Postal Code <span className="text-red-500">*</span></Label>
        <Input
          id="postalCode"
          value={address.postalCode}
          onChange={(e) => onChange('postalCode', e.target.value)}
          placeholder="0000"
          required
          disabled={disabled}
        />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Pickup Address
          </CardTitle>
          <p className="text-sm text-gray-600">Where buyers can collect books you're selling</p>
        </CardHeader>
        <CardContent>
          {renderAddressFields(pickup, handlePickupChange)}
        </CardContent>
      </Card>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="sameAddress"
          checked={sameAddress}
          onCheckedChange={handleSameAddressChange}
        />
        <Label htmlFor="sameAddress">Use same address for shipping</Label>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Shipping Address
          </CardTitle>
          <p className="text-sm text-gray-600">Where you want books delivered when you buy</p>
        </CardHeader>
        <CardContent>
          {renderAddressFields(shipping, handleShippingChange, sameAddress)}
        </CardContent>
      </Card>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Saving...' : 'Save Addresses'}
      </Button>
    </form>
  );
};

export default AddressForm;
