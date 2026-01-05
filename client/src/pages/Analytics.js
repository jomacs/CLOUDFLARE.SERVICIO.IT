import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { analyticsAPI } from '../api';

function Analytics() {
  const { zoneId } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [zoneId]);

  const loadAnalytics = async () => {
    try {
      const response = await analyticsAPI.get(zoneId);
      setAnalytics(response.data.result);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Analytics">
      <div className="mb-6">
        <Link to={`/zones/${zoneId}`} className="text-cf-orange hover:underline">
          ← Back to Zone Details
        </Link>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Loading analytics...</p>
        </div>
      ) : !analytics ? (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">No analytics data available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Requests</h3>
            <p className="text-3xl font-bold text-gray-900">
              {analytics.totals?.requests?.all?.toLocaleString() || 0}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Cached Requests</h3>
            <p className="text-3xl font-bold text-green-600">
              {analytics.totals?.requests?.cached?.toLocaleString() || 0}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Bandwidth</h3>
            <p className="text-3xl font-bold text-blue-600">
              {((analytics.totals?.bandwidth?.all || 0) / 1024 / 1024 / 1024).toFixed(2)} GB
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Unique Visitors</h3>
            <p className="text-3xl font-bold text-purple-600">
              {analytics.totals?.uniques?.all?.toLocaleString() || 0}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 md:col-span-2 lg:col-span-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Requests:</span>
                <span className="font-semibold">
                  {analytics.totals?.requests?.all?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cached:</span>
                <span className="font-semibold text-green-600">
                  {analytics.totals?.requests?.cached?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Uncached:</span>
                <span className="font-semibold text-orange-600">
                  {analytics.totals?.requests?.uncached?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Bandwidth:</span>
                <span className="font-semibold">
                  {((analytics.totals?.bandwidth?.all || 0) / 1024 / 1024 / 1024).toFixed(2)} GB
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Analytics;
