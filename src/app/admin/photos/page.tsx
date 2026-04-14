"use client";

import { useState, useEffect } from "react";
import { ImageIcon, UploadCloud, Trash2 } from "lucide-react";

type Photo = {
  id: string;
  url: string;
  caption: string | null;
  createdAt: string;
};

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch("/api/photos");
      const data = await res.json();
      if (Array.isArray(data)) setPhotos(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);

    try {
      const res = await fetch("/api/photos", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setFile(null);
        setCaption("");
        fetchPhotos();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this photo from the gallery?")) return;

    try {
      const res = await fetch(`/api/photos?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setPhotos(photos.filter(p => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-heading">Manage Gallery Photos</h1>
        <p className="text-slate-600 mt-2">Upload images to showcase the foundation's impact on the website.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Upload Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
          <h2 className="text-lg font-bold mb-4 font-heading flex items-center gap-2">
            <UploadCloud size={20} className="text-purple-600" />
            Upload New Photo
          </h2>

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Select Image file</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon size={28} className="text-slate-400 mb-2" />
                  <p className="text-sm text-slate-500 font-medium">
                    {file ? file.name : "Click to select or drag & drop"}
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Caption (Optional)</label>
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="e.g. Students in English class"
              />
            </div>

            <button
              disabled={uploading || !file}
              type="submit"
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg disabled:bg-slate-300 transition-colors"
            >
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
          </form>
        </div>

        {/* Photo Gallery Grid */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading gallery...</div>
          ) : photos.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center flex flex-col items-center shadow-sm">
              <ImageIcon size={48} className="text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Gallery is empty</h3>
              <p className="text-slate-500">Upload some photos to display them on the website.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                  <img
                    src={photo.url}
                    alt={photo.caption || "Gallery image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60 transition-colors duration-300 flex flex-col justify-between p-4">
                    <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDelete(photo.id)}
                        className="bg-white/20 hover:bg-red-500 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                        title="Delete photo"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {photo.caption && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs font-medium truncate drop-shadow-md">
                          {photo.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
