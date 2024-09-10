import React, { useState } from 'react';
import './App.css';

function App() {
  const schemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ];

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [dropdowns, setDropdowns] = useState([]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAddNewSchema = () => {
    if (selectedSchemas.length < schemaOptions.length) {
      setDropdowns([...dropdowns, '']);
    }
  };

  const handleSchemaChange = (index, event) => {
    const newSelectedSchemas = [...selectedSchemas];
    newSelectedSchemas[index] = event.target.value;
    setSelectedSchemas(newSelectedSchemas);
  };

  const handleRemoveSchema = (index) => {
    const newDropdowns = [...dropdowns];
    const newSelectedSchemas = [...selectedSchemas];

    newDropdowns.splice(index, 1);
    newSelectedSchemas.splice(index, 1);

    setDropdowns(newDropdowns);
    setSelectedSchemas(newSelectedSchemas);
  };

  const handleSaveSegment = async () => {
    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas.filter((schema) => schema)
    };

    try {
      const response = await fetch('http://localhost:5000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Segment saved successfully!');
      } else {
        console.error('Error saving segment:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }

    handleClosePopup();
  };

  const getAvailableOptions = (selected) => {
    return schemaOptions.filter((option) => !selectedSchemas.includes(option.value) || option.value === selected);
  };

  return (
    <div className="App">
      <button className="save-segment-btn" onClick={handleOpenPopup}>Save segment</button>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Save Segment</h2>

            <label>Segment Name:</label>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="Enter segment name"
              className='name'
            />

            <div className="blue-box">
              {dropdowns.map((dropdown, index) => (
                <div key={index} className="dropdown-row">
                  <select
                    className="animated-dropdown"
                    value={selectedSchemas[index] || ''}
                    onChange={(event) => handleSchemaChange(index, event)}
                  >
                    <option value="" disabled>Select schema</option>
                    {getAvailableOptions(selectedSchemas[index]).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button className="remove-schema-btn" onClick={() => handleRemoveSchema(index)}>Remove</button>
                </div>
              ))}
            </div>

            <button className="add-schema-btn" onClick={handleAddNewSchema}>+Add new schema</button>

            <div className="popup-actions">
              <button className="save-segment-btn" onClick={handleSaveSegment}>Save the segment</button>
              <button className="close-btn" onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
