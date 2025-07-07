"use client";

import { useState, useEffect } from "react";

interface AIProfile {
  id: string;
  name: string;
  apiKey: string;
}

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const [profiles, setProfiles] = useState<AIProfile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const savedProfiles = localStorage.getItem("aiProfiles");
    if (savedProfiles) {
      const parsedProfiles: AIProfile[] = JSON.parse(savedProfiles);
      setProfiles(parsedProfiles);
      if (parsedProfiles.length > 0) {
        setSelectedProfileId(parsedProfiles[0].id);
      }
    }
  }, []);

  const saveProfiles = (newProfiles: AIProfile[]) => {
    setProfiles(newProfiles);
    localStorage.setItem("aiProfiles", JSON.stringify(newProfiles));
  };

  const addProfile = () => {
    if (!name.trim() || !apiKey.trim()) return;
    const newProfile: AIProfile = {
      id: crypto.randomUUID(),
      name: name.trim(),
      apiKey: apiKey.trim(),
    };
    const newProfiles = [...profiles, newProfile];
    saveProfiles(newProfiles);
    setName("");
    setApiKey("");
    setSelectedProfileId(newProfile.id);
  };

  const deleteProfile = (id: string) => {
    const newProfiles = profiles.filter((p) => p.id !== id);
    saveProfiles(newProfiles);
    if (selectedProfileId === id) {
      setSelectedProfileId(newProfiles.length > 0 ? newProfiles[0].id : null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-yellowAccentDark">AI Profiles</h3>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-yellowAccentLight">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-yellowAccentDark dark:text-yellowAccentLight"
            placeholder="Profile name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-yellowAccentLight">API Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-yellowAccentDark dark:text-yellowAccentLight"
            placeholder="OpenAI API key"
          />
        </div>

        <button
          onClick={addProfile}
          className="mb-4 px-4 py-2 bg-yellowAccentLight dark:bg-yellowAccentDark text-black dark:text-white rounded font-semibold w-full"
        >
          Add Profile
        </button>

        <div className="max-h-48 overflow-y-auto mb-4">
          {profiles.length === 0 && (
            <p className="text-gray-500 dark:text-yellowAccentLight">No profiles created yet.</p>
          )}
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                selectedProfileId === profile.id
                  ? "bg-yellowAccentLight dark:bg-yellowAccentDark text-black dark:text-white"
                  : "text-gray-900 dark:text-yellowAccentLight"
              }`}
              onClick={() => setSelectedProfileId(profile.id)}
            >
              <span>{profile.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProfile(profile.id);
                }}
                className="text-red-600 dark:text-red-400 font-bold"
                aria-label={`Delete profile ${profile.name}`}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded text-gray-700 dark:text-yellowAccentLight font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
