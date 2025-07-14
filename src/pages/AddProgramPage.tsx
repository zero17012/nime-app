import React, { useState } from 'react';
import { AppItem, SystemRequirements } from '../types';
import { appData } from '../data/mockData';

const AddProgramPage: React.FC = () => {
  const [formData, setFormData] = useState<Partial<AppItem>>({
    type: 'development',
    price: 'Free',
    rating: 0,
    reviews: 0,
    screenshots: [],
    systemRequirements: {
      minimum: {
        os: '',
        processor: '',
        memory: '',
        graphics: '',
        storage: '',
      },
      recommended: {
        os: '',
        processor: '',
        memory: '',
        graphics: '',
        storage: '',
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newApp: AppItem = {
      id: formData.name?.toLowerCase().replace(/\s+/g, '-') || '',
      ...formData as AppItem
    };

    // Update mockData.ts file through an API endpoint
    fetch('/api/programs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newApp),
    })
    .then(response => response.json())
    .then(data => {
      alert('Program added successfully!');
      setFormData({
        type: 'development',
        price: 'Free',
        rating: 0,
        reviews: 0,
        screenshots: [],
        systemRequirements: {
          minimum: {
            os: '',
            processor: '',
            memory: '',
            graphics: '',
            storage: '',
          },
          recommended: {
            os: '',
            processor: '',
            memory: '',
            graphics: '',
            storage: '',
          }
        }
      });
    })
    .catch(error => {
      console.error('Error adding program:', error);
      alert('Error adding program. Please try again.');
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSystemRequirementsChange = (
    type: 'minimum' | 'recommended',
    field: keyof SystemRequirements['minimum'],
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      systemRequirements: {
        ...prev.systemRequirements,
        [type]: {
          ...prev.systemRequirements?.[type],
          [field]: value
        }
      }
    }));
  };

  const handleScreenshotsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const screenshots = e.target.value.split('\n').filter(url => url.trim());
    setFormData(prev => ({
      ...prev,
      screenshots
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Program</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className="w-full bg-surface-dark rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                className="w-full bg-surface-dark rounded-lg p-2 h-24"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full bg-surface-dark rounded-lg p-2"
              >
                <option value="development">Development</option>
                <option value="game">Game</option>
                <option value="extension">Extension</option>
                <option value="web">Web</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category || ''}
                onChange={handleInputChange}
                className="w-full bg-surface-dark rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subcategory</label>
              <input
                type="text"
                name="subcategory"
                value={formData.subcategory || ''}
                onChange={handleInputChange}
                className="w-full bg-surface-dark rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Publisher</label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher || ''}
                onChange={handleInputChange}
                className="w-full bg-surface-dark rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price || ''}
                onChange={handleInputChange}
                className="w-full bg-surface-dark rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Download URL</label>
              <input
                type="url"
                name="downloadUrl"
                value={formData.downloadUrl || ''}
                onChange={handleInputChange}
                className="w-full bg-surface-dark rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">YouTube Video ID</label>
              <input
                type="text"
                name="youtubeId"
                value={formData.youtubeId || ''}
                onChange={handleInputChange}
                className="w-full bg-surface-dark rounded-lg p-2"
                placeholder="e.g., I2UKjyszmfU"
              />
            </div>
          </div>

          {/* Media & Requirements */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Media & Requirements</h2>

            <div>
              <label className="block text-sm font-medium mb-1">Main Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl || ''}
                onChange={handleInputChange}
                className="w-full bg-surface-dark rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Screenshots (one URL per line)</label>
              <textarea
                value={formData.screenshots?.join('\n') || ''}
                onChange={handleScreenshotsChange}
                className="w-full bg-surface-dark rounded-lg p-2 h-24"
                placeholder="https://example.com/screenshot1.jpg&#10;https://example.com/screenshot2.jpg"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Minimum Requirements</h3>
              
              <div>
                <label className="block text-sm font-medium mb-1">Operating System</label>
                <input
                  type="text"
                  value={formData.systemRequirements?.minimum.os || ''}
                  onChange={(e) => handleSystemRequirementsChange('minimum', 'os', e.target.value)}
                  className="w-full bg-surface-dark rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Processor</label>
                <input
                  type="text"
                  value={formData.systemRequirements?.minimum.processor || ''}
                  onChange={(e) => handleSystemRequirementsChange('minimum', 'processor', e.target.value)}
                  className="w-full bg-surface-dark rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Memory</label>
                <input
                  type="text"
                  value={formData.systemRequirements?.minimum.memory || ''}
                  onChange={(e) => handleSystemRequirementsChange('minimum', 'memory', e.target.value)}
                  className="w-full bg-surface-dark rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Graphics</label>
                <input
                  type="text"
                  value={formData.systemRequirements?.minimum.graphics || ''}
                  onChange={(e) => handleSystemRequirementsChange('minimum', 'graphics', e.target.value)}
                  className="w-full bg-surface-dark rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Storage</label>
                <input
                  type="text"
                  value={formData.systemRequirements?.minimum.storage || ''}
                  onChange={(e) => handleSystemRequirementsChange('minimum', 'storage', e.target.value)}
                  className="w-full bg-surface-dark rounded-lg p-2"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recommended Requirements</h3>
              
              <div>
                <label className="block text-sm font-medium mb-1">Operating System</label>
                <input
                  type="text"
                  value={formData.systemRequirements?.recommended.os || ''}
                  onChange={(e) => handleSystemRequirementsChange('recommended', 'os', e.target.value)}
                  className="w-full bg-surface-dark rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Processor</label>
                <input
                  type="text"
                  value={formData.systemRequirements?.recommended.processor || ''}
                  onChange={(e) => handleSystemRequirementsChange('recommended', 'processor', e.target.value)}
                  className="w-full bg-surface-dark rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Memory</label>
                <input
                  type="text"
                  value={formData.systemRequirements?.recommended.memory || ''}
                  onChange={(e) => handleSystemRequirementsChange('recommended', 'memory', e.target.value)}
                  className="w-full bg-surface-dark rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Graphics</label>
                <input
                  type="text"
                  value={formData.systemRequirements?.recommended.graphics || ''}
                  onChange={(e) => handleSystemRequirementsChange('recommended', 'graphics', e.target.value)}
                  className="w-full bg-surface-dark rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Storage</label>
                <input
                  type="text"
                  value={formData.systemRequirements?.recommended.storage || ''}
                  onChange={(e) => handleSystemRequirementsChange('recommended', 'storage', e.target.value)}
                  className="w-full bg-surface-dark rounded-lg p-2"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-secondary hover:bg-accent text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Add Program
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProgramPage;