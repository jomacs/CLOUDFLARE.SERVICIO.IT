import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { zonesAPI } from '../api';

function Dashboard() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0 });

  useEffect(() => {
    loadZones();
  }, []);

  const loadZones = async () => {
    try {
      const response = await zonesAPI.list();
      const zoneData = response.data.result || [];
      setZones(zoneData.slice(0, 5)); // Show only first 5
      
      setStats({
        total: response.data.result_info?.total_count || zoneData.length,
        active: zoneData.filter(z => z.status === 'active').length,
      });
    } catch (error) {
      console.error('Error loading zones:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-gray-500 text-sm">Total Zones</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="text-4xl">🌐</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-gray-500 text-sm">Active Zones</p>
              <p className="text-3xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-gray-500 text-sm">Quick Actions</p>
              <Link to="/zones" className="text-cf-orange hover:underline text-sm">
                Manage Zones →
              </Link>
            </div>
            <div className="text-4xl">⚡</div>
          </div>
        </div>
      </div>

      {/* Recent Zones */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Zones</h2>
        </div>
        <div className="p-6">
          {loading ? (
            <p className="text-gray-500">Loading zones...</p>
          ) : zones.length === 0 ? (
            <p className="text-gray-500">No zones found. Add your first domain to Cloudflare!</p>
          ) : (
            <div className="space-y-4">
              {zones.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-cf-orange transition">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${zone.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{zone.name}</h3>
                      <p className="text-sm text-gray-500">Status: {zone.status}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/zones/${zone.id}/dns`}
                      className="px-4 py-2 bg-cf-orange text-white rounded hover:bg-orange-600 transition"
                    >
                      DNS
                    </Link>
                    <Link
                      to={`/zones/${zone.id}`}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {zones.length > 0 && (
            <div className="mt-6 text-center">
              <Link to="/zones" className="text-cf-orange hover:underline font-medium">
                View All Zones →
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
