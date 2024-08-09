import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, Button } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import TextArea from 'antd/es/input/TextArea';
import PropTypes from 'prop-types';

const userInfoSchema = z.object({
  firstName: z.string().min(3, 'First name is required').max(20),
  title: z.string().optional(),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().email('Invalid email address'),
  skypeId: z.string().optional(),
  secondaryEmail: z.string().optional(),
  twitter: z.string().optional(),
});

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
});

const companyInfoSchema = z.object({
  company: z.string().optional(),
  fax: z.string().optional(),
  website: z.string().optional(),
  annualRevenue: z.string().optional(),
  employees: z.string().optional(),
  description: z.string().optional(),
});

const leadInfoSchema = z.object({
  leadOwner: z.string().optional(),
  leadSource: z.enum(['website', 'referral', 'socialmedia']).optional(),
  industry: z.enum(['technology', 'finance', 'healthcare']).optional(),
  leadStatus: z.enum(['new', 'contacted', 'qualified', 'unqualified']).optional(),
  leadRating: z.enum(['hot', 'warm', 'cold']).optional(),
});

const schema = z.object({
  ...userInfoSchema.shape,
  ...companyInfoSchema.shape,
  ...leadInfoSchema.shape,
  ...addressSchema.shape,
});

const { Option } = Select;

const inputStyle = {
  color: '#000',
  fontWeight: 'bold',
};

const FormField = ({ name, placeholder, control, errors, options }) => (
  <div key={name}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        options ? (
          <Select {...field} className="w-full" placeholder={placeholder} showSearch style={inputStyle}>
            {options.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        ) : (
          <Input {...field} placeholder={placeholder} style={inputStyle} />
        )
      )}
    />
    {errors[name] && <span className="text-red-500 text-sm">{errors[name].message}</span>}
  </div>
);

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.string),
};

FormField.defaultProps = {
  placeholder: '',
  errors: {},
  options: null,
};

const LeadForm = () => {
  const [owners, setOwners] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/owners');
        const data = await response.json();
        setOwners(data.map(owner => owner.name));
      } catch (error) {
        console.error('Failed to fetch owners:', error);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cities');
        const data = await response.json();
        setCities(data.map(city => city.name));
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };

    const fetchStates = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/states');
        const data = await response.json();
        setStates(data.map(state => state.name));
      } catch (error) {
        console.error('Failed to fetch states:', error);
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/countries');
        const data = await response.json();
        setCountries(data.map(country => country.name));
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };

    fetchOwners();
    fetchCities();
    fetchStates();
    fetchCountries();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Saved successfully!', { position: 'top-right' });
        reset();
      } else {
        toast.error('Failed to save data', { position: 'top-right' });
      }
    } catch (error) {
      toast.error('An error occurred', { position: 'top-right' });
    }
  };

  const onError = (errors) => {
    console.error(errors);
    toast.error('Please fill in all required fields.', { position: 'top-right' });
  };

  const textFields = [
    { name: 'firstName', placeholder: 'First name' },
    { name: 'title', placeholder: 'Title' },
    { name: 'phone', placeholder: 'Phone' },
    { name: 'mobile', placeholder: 'Mobile' },
    { name: 'company', placeholder: 'Company' },
    { name: 'email', placeholder: 'Email' },
    { name: 'fax', placeholder: 'Fax' },
    { name: 'website', placeholder: 'Website' },
    { name: 'annualRevenue', placeholder: 'Annual revenue' },
    { name: 'employees', placeholder: 'Number of employees' },
    { name: 'skypeId', placeholder: 'Skype ID' },
    { name: 'secondaryEmail', placeholder: 'Secondary email' },
    { name: 'twitter', placeholder: 'Twitter' },
  ];

  const selectFields = [
    { name: 'leadOwner', placeholder: 'Select a lead owner', options: owners },
    { name: 'leadSource', placeholder: 'Select a lead source', options: ['website', 'referral', 'socialmedia'] },
    { name: 'industry', placeholder: 'Select an industry', options: ['technology', 'finance', 'healthcare'] },
    { name: 'leadStatus', placeholder: 'Select a lead status', options: ['new', 'contacted', 'qualified', 'unqualified'] },
    { name: 'leadRating', placeholder: 'Select a lead rating', options: ['hot', 'warm', 'cold'] },
  ];

  const addressFields = [
    { name: 'street', placeholder: 'Street' },
    { name: 'city', placeholder: 'City', options: cities },
    { name: 'state', placeholder: 'State', options: states },
    { name: 'zipCode', placeholder: 'Enter your zip code' },
    { name: 'country', placeholder: 'Country', options: countries },
  ];

  return (
    <div className="border border-neutral-100 mx-64 my-12 rounded-lg p-8 drop-shadow-md bg-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Create Lead</h1>
        <a href="#">
          <h4 className="text-[#2684ff] active:text-blue-600">Edit page layout</h4>
        </a>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <div className="flex flex-col gap-4">
          <div className="col-span-full flex items-center py-4 gap-4">
            <img src="/images/profile.png" alt="profile image" height={100} width={100} />
            <input
              id="input-image"
              type="file"
              className="absolute opacity-0 cursor-pointer"
              accept=".png, .jpg, .jpeg"
            />
            <Button type="primary">Upload image</Button>
          </div>
          {textFields.map((field) => (
            <FormField key={field.name} {...field} control={control} errors={errors} />
          ))}
          <div>
            <label className="inline">
              <input type="checkbox" className="mr-2" />
              Email Opt-Out
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-12">
          {selectFields.map((field) => (
            <FormField key={field.name} {...field} control={control} errors={errors} />
          ))}
          <label className="block mt-4 text-xl font-semibold">Description Information</label>
          <div className="col-span-full">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea {...field} rows={4} placeholder="Description" style={inputStyle} />
              )}
            />
          </div>
          <label className="block mb-4 text-xl font-semibold">Address Information</label>
          {addressFields.map((field) => (
            <FormField key={field.name} {...field} control={control} errors={errors} />
          ))}
        </div>
        <div className="col-span-full flex justify-end gap-4">
          <Button type="default">Cancel</Button>
          <Button type="primary">Save and new</Button>
          <Button disabled={isSubmitting} type="primary" htmlType="submit">
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
