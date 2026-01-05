import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { zonesAPI } from '../api';

function Zones() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadZones();
  }, []);

  const loadZones = async () => {
    try {
      const response = await zonesAPI.list();
      setZones(response.data.result || []);
    } catch (error) {
      console.error('Error loading zones:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredZones = zones.filter((zone) => {
    if (filter === 'all') return true;
    return zone.status === filter;
  });

  return (
    <Layout title="Zones">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${
              filter === 'all' ? 'bg-cf-orange text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            All ({zones.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded ${
              filter === 'active' ? 'bg-cf-orange text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Active ({zones.filter((z) => z.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded ${
              filter === 'pending' ? 'bg-cf-orange text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Pending ({zones.filter((z) => z.status === 'pending').length})
          </button>
        </div>
        <button
          onClick={loadZones}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading zones...</div>
        ) : filteredZones.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No zones found</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredZones.map((zone) => (
                <tr key={zone.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        zone.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <div className="text-sm font-medium text-gray-900">{zone.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        zone.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {zone.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {zone.plan?.name || 'Free'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      to={`/zones/${zone.id}/dns`}
                      className="text-cf-orange hover:text-orange-600"
                    >
                      DNS
                    </Link>
                    <Link
                      to={`/zones/${zone.id}/analytics`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Analytics
                    </Link>
                    <Link
                      to={`/zones/${zone.id}`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

export default Zones;
