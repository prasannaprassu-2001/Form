import React from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

interface JsonEditorProps {
  value: object;
  onChange: (value: object) => void; // Adjusted type
}

const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange }) => {
  const handleChange = (content: any) => {
    try {
      const parsed = JSON.parse(content.json);
      onChange(parsed); // Use the onChange prop to update the schema
    } catch (e) {
      console.error('Invalid JSON:', e);
    }
  };

  return (
    <JSONInput
      id="json-editor"
      locale={locale}
      height="100%"
      width="100%"
      onChange={handleChange}
      placeholder={value}
      theme="light_mitsuketa_tribute"
    />
  );
};

export default JsonEditor;
