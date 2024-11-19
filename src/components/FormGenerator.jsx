import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormField {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  validation?: {
    pattern?: string;
    message?: string;
  };
  options?: { value: string; label: string }[];
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: FormField[];
}

interface FormGeneratorProps {
  schema: FormSchema;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<any> = data => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{schema.formTitle}</h2>
      <p className="mb-4">{schema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {schema.fields.map(field => (
          <div key={field.id} className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor={field.id}>{field.label}</label>
            {field.type === 'text' && (
              <input
                id={field.id}
                type="text"
                placeholder={field.placeholder}
                {...register(field.id, { required: field.required })}
                className="w-full p-2 border rounded"
              />
            )}
            {field.type === 'email' && (
              <input
                id={field.id}
                type="email"
                placeholder={field.placeholder}
                {...register(field.id, {
                  required: field.required,
                  pattern: {
                    value: new RegExp(field.validation?.pattern || ''),
                    message: field.validation?.message
                  }
                })}
                className="w-full p-2 border rounded"
              />
            )}
            {field.type === 'select' && (
              <select id={field.id} {...register(field.id, { required: field.required })} className="w-full p-2 border rounded">
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            )}
            {field.type === 'radio' && (
              <div>
                {field.options?.map(option => (
                  <label key={option.value} className="block">
                    <input type="radio" value={option.value} {...register(field.id, { required: field.required })} />
                    {option.label}
                  </label>
                ))}
              </div>
            )}
            {field.type === 'textarea' && (
              <textarea
                id={field.id}
                placeholder={field.placeholder}
                {...register(field.id, { required: field.required })}
                className="w-full p-2 border rounded"
              />
            )}
            {errors[field.id] && <p className="text-red-500 text-sm">{errors[field.id].message}</p>}
          </div>
        ))}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
};

export default FormGenerator;
