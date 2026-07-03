"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Configure your application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">General Settings</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Name</label>
                <input type="text" defaultValue="Microbloom" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                <input type="email" defaultValue="support@microbloom.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Save Changes
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Email Configuration</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Server</label>
                <input type="text" placeholder="smtp.example.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                <input type="number" placeholder="587" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Update Email Settings
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">Settings Menu</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-blue-600 hover:text-blue-900">General</a></li>
            <li><a href="#" className="text-blue-600 hover:text-blue-900">Email</a></li>
            <li><a href="#" className="text-blue-600 hover:text-blue-900">Security</a></li>
            <li><a href="#" className="text-blue-600 hover:text-blue-900">Integrations</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
