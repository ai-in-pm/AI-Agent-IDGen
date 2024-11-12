import React, { useState } from 'react';
import { FileText, Download, Calendar, BarChart } from 'lucide-react';
import type { ExportFormat } from '../types';

export const Reports = () => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
  const [dateRange, setDateRange] = useState('last7days');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Generate Reports</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as ExportFormat)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="pdf">PDF Document</option>
              <option value="xlsx">Excel Spreadsheet</option>
              <option value="csv">CSV File</option>
              <option value="json">JSON Format</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="today">Today</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            <FileText className="w-4 h-4" />
            <span>Generate Activity Report</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            <BarChart className="w-4 h-4" />
            <span>Generate Analytics Report</span>
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Recent Reports</h3>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">Activity Report</p>
                  <p className="text-sm text-gray-500">Generated on March 15, 2024</p>
                </div>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800">
                <Download className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BarChart className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">Analytics Report</p>
                  <p className="text-sm text-gray-500">Generated on March 14, 2024</p>
                </div>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};