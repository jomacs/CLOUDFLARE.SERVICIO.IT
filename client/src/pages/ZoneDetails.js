import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { zonesAPI, cacheAPI } from '../api';

function ZoneDetails() {
  const { zoneId } = useParams();
  const [zone, setZone] = useState(null);
  const [sslSettings, setSSLSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purging, setPurging] = useState(false);

  useEffect(() => {
    loadZoneDetails();
  }, [zoneId]);

  const loadZoneDetails = async () => {
    try {
      const [zoneRes, sslRes] = await Promise.all([
        zonesAPI.get(zoneId),
        zonesAPI.getSSL(zoneId),
      ]);
      setZone(zoneRes.data.result);
      setSSLSettings(sslRes.data.result);
    } catch (error) {
      console.error('Error loading zone details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurgeCache = async () => {
    if (!window.confirm('Are you sure you want to purge all cache for this zone?')) return;
    
    setPurging(true);
    try {
      await cacheAPI.purge(zoneId, { purge_everything: true });
      alert('Cache purged successfully!');
    } catch (error) {
      alert('Error purging cache: ' + (error.response?.data?.error || error.message));
    } finally {
      setPurging(false);
    }
  };

  if (loading) {
    return <Layout title="Zone Details"><p>Loading...</p></Layout>;
  }

  if (!zone) {
    return <Layout title="Zone Details"><p>Zone not found</p></Layout>;
  }

  return (
    <Layout title={zone.name}>
      <div className="mb-6 flex space-x-2">
        <Link
          to={`/zones/${zoneId}/dns`}
          className="px-4 py-2 bg-cf-orange text-white rounded hover:bg-orange-600"
        >
          DNS Records
        </Link>
        <Link
          to={`/zones/${zoneId}/analytics`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Analytics
        </Link>
        <button
          onClick={handlePurgeCache}
          disabled={purging}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          {purging ? 'Purging...' : '🔥 Purge Cache'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <span
                  className={`px-2 py-1 rounded ${
                    zone.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {zone.status}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Plan</dt>
              <dd className="mt-1 text-sm text-gray-900">{zone.plan?.name || 'Free'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Paused</dt>
              <dd className="mt-1 text-sm text-gray-900">{zone.paused ? 'Yes' : 'No'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Development Mode</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {zone.development_mode ? 'Enabled' : 'Disabled'}
              </dd>
            </div>
          </dl>
        </div>

        {/* SSL Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">SSL/TLS</h2>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">SSL Mode</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                  {sslSettings?.value || 'Not set'}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Nameservers */}
        <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Nameservers</h2>
          {zone.name_servers && zone.name_servers.length > 0 ? (
            <div className="bg-gray-50 p-4 rounded font-mono text-sm space-y-1">
              {zone.name_servers.map((ns, idx) => (
                <div key={idx}>{ns}</div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No nameservers configured</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ZoneDetails;
