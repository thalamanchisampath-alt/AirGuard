import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PollutionReport } from '../../types';
import confetti from 'canvas-confetti';
import {
  AlertOctagon,
  UploadCloud,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Camera,
  X,
  Send,
  Flame,
  Car,
  HardHat,
  Factory,
  Wind
} from 'lucide-react';

export const ReportPollution: React.FC = () => {
  const { reports, addReport, showToast, currentLocation } = useApp();

  // Form State
  const [pollutionType, setPollutionType] = useState<PollutionReport['type']>('Vehicle Smoke');
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<PollutionReport['severity']>('Medium');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentSubmittedId, setRecentSubmittedId] = useState<string | null>(null);

  // Table filtering & search
  const [filterStatus, setFilterStatus] = useState<'All' | 'Submitted' | 'Under Review' | 'Resolved'>('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [viewModalReport, setViewModalReport] = useState<PollutionReport | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image upload & preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const preview = URL.createObjectURL(file);
      setImagePreviewUrl(preview);
    }
  };

  const handleUseMockPhoto = (type: string) => {
    // Generate simulated visual preview
    setImagePreviewUrl(`https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60`);
    setSelectedFile(new File(['mock'], `${type.toLowerCase().replace(/\s+/g, '_')}_evidence.jpg`, { type: 'image/jpeg' }));
    showToast('Attached field evidence photo!', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!locationName.trim()) {
      showToast('Please provide a specific street or landmark location', 'warning');
      return;
    }
    if (!description.trim() || description.length < 10) {
      showToast('Please provide a detailed description (at least 10 characters)', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = addReport({
        type: pollutionType,
        location: locationName.trim(),
        description: description.trim(),
        severity,
        imageName: selectedFile?.name || 'incident_snapshot.jpg',
        imageUrl: imagePreviewUrl || undefined,
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.error(err);
      }

      setRecentSubmittedId(generatedId);
      setIsSubmitting(false);

      // Reset form
      setLocationName('');
      setDescription('');
      setSelectedFile(null);
      setImagePreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 600);
  };

  // Filtered reports list
  const filteredReports = reports.filter((rep) => {
    const matchesStatus = filterStatus === 'All' || rep.status === filterStatus;
    const matchesSearch =
      rep.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      rep.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
      rep.type.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Citizen Pollution Reporting System
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Empowering citizens to report localized environmental violations directly to municipal green squads
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-300/40">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Active Response SLA: &lt; 4 Hours</span>
        </div>
      </div>

      {/* Success Notification Banner if just submitted */}
      {recentSubmittedId && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between gap-4 animate-in slide-in-from-top-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                Pollution Hazard Successfully Registered!
              </h4>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-400 mt-0.5">
                Complaint Tracking ID: <strong className="font-mono">{recentSubmittedId}</strong>. Dispatched to the Municipal Pollution Control Board.
              </p>
            </div>
          </div>
          <button
            onClick={() => setRecentSubmittedId(null)}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Grid: Reporting Form + Information Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Container */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-500" />
            <span>Submit Environmental Hazard Report</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            Fill in the incident details. Photos and exact street addresses accelerate regulatory intervention.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Pollution Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Pollution Type *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(
                  [
                    'Vehicle Smoke',
                    'Garbage Burning',
                    'Construction Dust',
                    'Industrial Smoke',
                    'Sewage Odour',
                    'Other',
                  ] as const
                ).map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setPollutionType(type)}
                    className={`py-2 px-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      pollutionType === type
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-200 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {type === 'Vehicle Smoke' && <Car className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                    {type === 'Garbage Burning' && <Flame className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                    {type === 'Construction Dust' && <HardHat className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                    {type === 'Industrial Smoke' && <Factory className="w-3.5 h-3.5 text-purple-500 shrink-0" />}
                    {type === 'Sewage Odour' && <Wind className="w-3.5 h-3.5 text-teal-500 shrink-0" />}
                    {type === 'Other' && <AlertTriangle className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                    <span className="truncate">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Location & Severity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Location / Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ring Road Crossing, Near Metro Pillar 184"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setLocationName(`${currentLocation.name}, Sector 4`)}
                  className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline mt-1 inline-block"
                >
                  Use current station: {currentLocation.name}
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Severity Level *
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as PollutionReport['severity'])}
                  className="w-full py-2 px-3 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="Low">Low (Intermittent)</option>
                  <option value="Medium">Medium (Visible Haze)</option>
                  <option value="High">High (Severe / Toxic)</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Description of Incident *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe the visible smoke, smell, vehicle numbers, or industrial source involved..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Upload Photo Evidence
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/40"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                {imagePreviewUrl ? (
                  <div className="flex items-center justify-between gap-3 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-cover bg-center border" style={{ backgroundImage: `url(${imagePreviewUrl})` }} />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-xs">
                          {selectedFile?.name || 'Evidence Image Attached'}
                        </p>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          ✓ Ready for upload
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreviewUrl(null);
                        setSelectedFile(null);
                      }}
                      className="p-1 rounded-full text-slate-400 hover:text-rose-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <UploadCloud className="w-6 h-6 text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      Drag & drop image here, or <span className="text-amber-600 underline">browse files</span>
                    </p>
                    <p className="text-[10px] text-slate-400">PNG, JPG or WebP up to 10MB</p>
                  </div>
                )}
              </div>

              {/* Mock photo shortcut for rapid hackathon testing */}
              {!imagePreviewUrl && (
                <button
                  type="button"
                  onClick={() => handleUseMockPhoto(pollutionType)}
                  className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline mt-1 flex items-center gap-1 font-medium"
                >
                  <Camera className="w-3 h-3" />
                  <span>Attach sample photo of {pollutionType} for test</span>
                </button>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="submit-pollution-report-btn"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Send className={`w-4 h-4 ${isSubmitting ? 'animate-bounce' : ''}`} />
                <span>{isSubmitting ? 'Registering Citizen Complaint...' : 'Submit Incident Report'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Citizen Impact & Guidelines Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 rounded-2xl space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>How Citizen Reports Work</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  <strong>Instant Geocoding:</strong> Your report is assigned a unique Complaint Tracking ID and placed on the live Air Quality Map.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  <strong>AI Hazard Clustering:</strong> Repeated reports in the same district trigger automated priority dispatch to enforcement squads.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  <strong>Earn Eco Points:</strong> Every verified report grants <strong>+75 Points</strong> towards your Clean Air Champion badge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Previously Submitted Reports ("My Reports" & Public Citizen Stream) */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Citizen Incident Reports Stream ({filteredReports.length})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Audit trail of community pollution grievances and remediation tracking
            </p>
          </div>

          {/* Filter & Search Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
              {(['All', 'Submitted', 'Under Review', 'Resolved'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    filterStatus === st
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-8 pr-3 py-1 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 w-36 sm:w-48"
              />
            </div>
          </div>
        </div>

        {/* Table of Reports */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3 px-3">Complaint ID</th>
                <th className="py-3 px-3">Pollution Type</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Date/Time</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-400">
                    No incident reports found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredReports.map((rep) => {
                  return (
                    <tr key={rep.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                        {rep.id}
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                        {rep.type}
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400 max-w-[180px] truncate">
                        {rep.location}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            rep.severity === 'High'
                              ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
                              : rep.severity === 'Medium'
                              ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                          }`}
                        >
                          {rep.severity}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            rep.status === 'Resolved'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                              : rep.status === 'Under Review'
                              ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {rep.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                        {rep.timestamp}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setViewModalReport(rep)}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-[11px] inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Detail Modal */}
      {viewModalReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  Incident Dossier
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {viewModalReport.id}
                </h3>
              </div>
              <button
                onClick={() => setViewModalReport(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Type:</span>
                <strong className="text-slate-900 dark:text-white">{viewModalReport.type}</strong>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Location:</span>
                <strong className="text-slate-900 dark:text-white">{viewModalReport.location}</strong>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Severity:</span>
                <span className="font-bold text-rose-600">{viewModalReport.severity}</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-emerald-600">{viewModalReport.status}</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Timestamp:</span>
                <span>{viewModalReport.timestamp}</span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Description:</span>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 italic leading-relaxed text-slate-800 dark:text-slate-200">
                  "{viewModalReport.description}"
                </p>
              </div>

              {viewModalReport.imageUrl && (
                <div>
                  <span className="text-slate-400 block mb-1">Evidence Photo:</span>
                  <img
                    src={viewModalReport.imageUrl}
                    alt="Evidence"
                    className="w-full h-36 object-cover rounded-xl border border-slate-200 dark:border-slate-800"
                  />
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewModalReport(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
