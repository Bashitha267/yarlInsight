import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data States
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  
  // Default Schedule Template
  const defaultSchedule = [
    {
      day_label: "Day 01",
      event_date: "Day 1 Schedule",
      events: [
        { display_time: "07:30 AM - 08:00 AM", title: "Registration of the Participants", speaker: "Organizing Team", event_type: "GENERAL", is_active: false },
        { display_time: "08:00 AM - 09:15 AM", title: "Opening Ceremony", speaker: "President, VC, Dean, HOD & IEEE Counselor", event_type: "GENERAL", is_active: false },
        { display_time: "09:30 AM - 10:30 AM", title: "AI-powered Requirement Engineering and Product Discovery (Part 1)", speaker: "Naresh Shanmgaraj", event_type: "KEYNOTE", is_active: true },
        { display_time: "10:30 AM - 11:00 AM", title: "Tea Break", speaker: "", event_type: "BREAK", is_active: false },
        { display_time: "11:00 AM - 12:30 PM", title: "AI-powered Requirement Engineering and Product Discovery (Part 2)", speaker: "Naresh Shanmgaraj", event_type: "WORKSHOP", is_active: false },
        { display_time: "12:30 PM - 01:30 PM", title: "Lunch Break", speaker: "", event_type: "BREAK", is_active: false },
        { display_time: "01:30 PM - 03:00 PM", title: "AI-assisted Development and Code Generation (Part 1)", speaker: "Anto Sheron", event_type: "KEYNOTE", is_active: false },
        { display_time: "03:00 PM - 03:30 PM", title: "Tea Break", speaker: "", event_type: "BREAK", is_active: false },
        { display_time: "03:30 PM - 05:00 PM", title: "AI-assisted Development and Code Generation (Part 2)", speaker: "Anto Sheron", event_type: "WORKSHOP", is_active: false },
        { display_time: "05:00 PM - 05:10 PM", title: "Group Photo & Closing", speaker: "Organizing Team", event_type: "GENERAL", is_active: false }
      ]
    }
  ];

  const [scheduleData, setScheduleData] = useState(defaultSchedule);
  const [scheduleLoading, setScheduleLoading] = useState(false);

  // Project Form State
  const initialProjectState = { 
    title: '', tag: '', start_date: '', end_date: '', 
    location: '', description: '', hero_image_url: '', thumbnail_url: '',
    speakers: [], sponsors: [], highlights: [], committee: []
  };
  const [projectForm, setProjectForm] = useState(initialProjectState);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const admin = sessionStorage.getItem('admin_session');
    if (admin) {
      setIsLoggedIn(true);
      fetchProjects();
      fetchSchedule();
    }
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error) setProjects(data);
  };

  const fetchSchedule = async () => {
    setScheduleLoading(true);
    try {
      const { data: days, error: daysErr } = await supabase.from('schedule_days').select('*').order('sort_order', { ascending: true });
      if (!daysErr && days && days.length > 0) {
        const { data: events } = await supabase.from('schedule_events').select('*').order('sort_order', { ascending: true });
        const grouped = days.map(d => ({
          ...d,
          events: events ? events.filter(e => e.day_id === d.id) : []
        }));
        if (grouped.some(g => g.events.length > 0)) {
          setScheduleData(grouped);
        }
      }
    } catch (e) {
      console.log('Using default schedule template');
    } finally {
      setScheduleLoading(false);
    }
  };

  const saveScheduleDataToSupabase = async (dataToSave) => {
    const targetData = dataToSave || scheduleData;
    await supabase.from('schedule_events').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('schedule_days').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    for (let i = 0; i < targetData.length; i++) {
      const day = targetData[i];
      const { data: dayRes, error: dayErr } = await supabase.from('schedule_days').insert({
        day_label: day.day_label,
        event_date: day.event_date || day.day_label,
        sort_order: i + 1
      }).select().single();

      if (dayErr) throw dayErr;

      if (day.events && day.events.length > 0) {
        const eventsToInsert = day.events.map((ev, evIdx) => ({
          day_id: dayRes.id,
          title: ev.title,
          speaker: ev.speaker || '',
          event_type: ev.event_type || 'GENERAL',
          display_time: ev.display_time,
          is_active: Boolean(ev.is_active),
          sort_order: evIdx + 1
        }));

        const { error: evErr } = await supabase.from('schedule_events').insert(eventsToInsert);
        if (evErr) throw evErr;
      }
    }
  };

  const handleToggleHappeningNow = async (dayIdx, evIdx) => {
    const targetEvent = scheduleData[dayIdx]?.events[evIdx];
    const newIsActive = !targetEvent?.is_active;

    const updatedSchedule = scheduleData.map((d, dI) => ({
      ...d,
      events: d.events.map((e, eI) => ({
        ...e,
        is_active: (dI === dayIdx && eI === evIdx) ? newIsActive : false
      }))
    }));

    setScheduleData(updatedSchedule);

    try {
      // Direct update to Supabase
      const { data: existingEvents } = await supabase.from('schedule_events').select('id');
      if (existingEvents && existingEvents.length > 0) {
        await supabase.from('schedule_events').update({ is_active: false }).neq('id', '00000000-0000-0000-0000-000000000000');
        if (newIsActive && targetEvent) {
          if (targetEvent.id) {
            await supabase.from('schedule_events').update({ is_active: true }).eq('id', targetEvent.id);
          } else {
            await supabase.from('schedule_events').update({ is_active: true }).eq('title', targetEvent.title);
          }
        }
      } else {
        // Auto-save entire structure if DB doesn't have events yet
        await saveScheduleDataToSupabase(updatedSchedule);
      }
    } catch (err) {
      console.error("Auto update is_active error:", err);
    }
  };

  const handleSaveSchedule = async () => {
    setScheduleLoading(true);
    try {
      await saveScheduleDataToSupabase(scheduleData);
      alert('Schedule updated and saved to Supabase successfully!');
      fetchSchedule();
    } catch (err) {
      alert('Note: Schedule preview updated locally!\n\nTo persist in Supabase, execute the generated "supabase_schedule_seed.sql" file in your Supabase SQL Editor if table permissions need configuration.');
    } finally {
      setScheduleLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data: admin, error: dbError } = await supabase.from('admins').select('*').eq('username', username).single();
      if (dbError || !admin) throw new Error('Invalid credentials');
      if (bcrypt.compareSync(password, admin.password_hash)) {
        sessionStorage.setItem('admin_session', 'true');
        setIsLoggedIn(true);
        fetchProjects();
      } else { throw new Error('Invalid credentials'); }
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      return data.secure_url;
    } catch (err) { return null; }
    finally { setUploading(false); }
  };

  // Helper to add items to arrays
  const addItem = (type) => {
    const schemas = {
      speakers: { name: '', role: '', description: '', image_url: '' },
      sponsors: { name: '', title: '', color: '', image_url: '' },
      committee: { name: '', role: '', image_url: '' },
      highlights: { title: '', type: '', image_url: '', grid_size: 'small' }
    };
    setProjectForm({ ...projectForm, [type]: [...(projectForm[type] || []), schemas[type]] });
  };

  const updateItem = (type, index, field, value) => {
    const newArr = [...projectForm[type]];
    newArr[index][field] = value;
    setProjectForm({ ...projectForm, [type]: newArr });
  };

  const removeItem = (type, index) => {
    setProjectForm({ ...projectForm, [type]: projectForm[type].filter((_, i) => i !== index) });
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const pData = { 
        title: projectForm.title, tag: projectForm.tag, start_date: projectForm.start_date, 
        end_date: projectForm.end_date, location: projectForm.location, 
        description: projectForm.description, hero_image_url: projectForm.hero_image_url,
        thumbnail_url: projectForm.thumbnail_url
      };

      let pid;
      if (editingProject) {
        await supabase.from('projects').update(pData).eq('id', editingProject.id);
        pid = editingProject.id;
        await supabase.from('project_speakers').delete().eq('project_id', pid);
        await supabase.from('project_sponsors').delete().eq('project_id', pid);
        await supabase.from('project_committee').delete().eq('project_id', pid);
        await supabase.from('project_highlights').delete().eq('project_id', pid);
      } else {
        const { data } = await supabase.from('projects').insert([pData]).select().single();
        pid = data.id;
      }

      if (projectForm.speakers?.length) await supabase.from('project_speakers').insert(projectForm.speakers.map(s => ({ ...s, project_id: pid })));
      if (projectForm.sponsors?.length) await supabase.from('project_sponsors').insert(projectForm.sponsors.map(s => ({ ...s, project_id: pid })));
      if (projectForm.committee?.length) await supabase.from('project_committee').insert(projectForm.committee.map(c => ({ ...c, project_id: pid })));
      if (projectForm.highlights?.length) await supabase.from('project_highlights').insert(projectForm.highlights.map(h => ({ ...h, project_id: pid })));

      alert('Project saved successfully!');
      setProjectForm(initialProjectState);
      setEditingProject(null);
      fetchProjects();
    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="glass-card p-12 rounded-[2rem] w-full max-w-md space-y-10 relative z-10 border border-white/10 shadow-2xl">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tighter">Admin <span className="text-primary italic">Portal</span></h1>
            <p className="text-white/40 text-sm">Secure access for authorized members only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-primary tracking-widest ml-1">Username</label>
                <input type="text" placeholder="Enter username" className="admin-input" value={username} onChange={e => setUsername(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-primary tracking-widest ml-1">Password</label>
                <input type="password" placeholder="••••••••" className="admin-input" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>
            {error && <div className="text-red-500 text-xs text-center font-bold">{error}</div>}
            <button type="submit" disabled={loading} className="admin-btn-primary w-full">{loading ? 'Authenticating...' : 'Sign In'}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex justify-between items-center p-6 bg-white/5 border-b border-white/10 sticky top-0 z-30 backdrop-blur-xl">
        <div className="font-black text-xl text-primary">ADMIN</div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
          <span className="material-symbols-outlined">{isSidebarOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Sidebar - Mobile Drawer / Desktop Fixed */}
      <aside className={`w-64 bg-black lg:bg-white/5 border-r border-white/10 p-8 flex flex-col gap-8 fixed lg:sticky top-0 h-full z-40 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="hidden lg:block font-black text-xl text-primary">ADMIN</div>
        <nav className="space-y-2 flex-grow">
          {['projects', 'schedule'].map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setIsSidebarOpen(false); }} className={`w-full text-left px-4 py-3 rounded-xl capitalize transition-all ${activeTab === tab ? 'bg-primary text-white font-bold' : 'hover:bg-white/5 text-white/40'}`}>
              {tab}
            </button>
          ))}
        </nav>
        <button onClick={() => { sessionStorage.removeItem('admin_session'); setIsLoggedIn(false); }} className="text-white/20 hover:text-red-500 text-xs uppercase font-bold tracking-widest px-4 text-left">Sign Out</button>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-grow p-6 lg:p-12 mx-auto w-full transition-all duration-300 ${activeTab === 'schedule' ? 'max-w-[1400px]' : 'max-w-5xl'}`}>
        {activeTab === 'projects' && (
          <div className="space-y-16">
            <h2 className="text-3xl lg:text-4xl font-black">{editingProject ? 'Edit' : 'Create'} <span className="text-primary">Project</span></h2>
            
            <form onSubmit={handleSaveProject} className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">1. Project Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Title" className="admin-input md:col-span-2" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required />
                  <input type="text" placeholder="Tag Line" className="admin-input" value={projectForm.tag} onChange={e => setProjectForm({...projectForm, tag: e.target.value})} />
                  <input type="text" placeholder="Location" className="admin-input" value={projectForm.location} onChange={e => setProjectForm({...projectForm, location: e.target.value})} />
                  <input type="date" className="admin-input" value={projectForm.start_date} onChange={e => setProjectForm({...projectForm, start_date: e.target.value})} />
                  <input type="date" className="admin-input" value={projectForm.end_date} onChange={e => setProjectForm({...projectForm, end_date: e.target.value})} />
                  <textarea placeholder="Description" rows="4" className="admin-input md:col-span-2" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})}></textarea>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">2. Main Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {['hero_image_url', 'thumbnail_url'].map(field => (
                    <div key={field} className="p-6 border-2 border-dashed border-white/10 rounded-2xl space-y-4">
                      <label className="text-xs uppercase font-black text-white/40 tracking-widest">{field.replace('_', ' ')}</label>
                      <input type="file" className="text-xs w-full" onChange={async (e) => { const url = await uploadImage(e.target.files[0]); if(url) setProjectForm({...projectForm, [field]: url}); }} />
                      {projectForm[field] && (
                        <div className="relative mt-2">
                          <img src={projectForm[field]} className="w-full h-32 object-cover rounded-lg border border-white/10" />
                          <button type="button" onClick={() => setProjectForm({...projectForm, [field]: ''})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"><span className="material-symbols-outlined text-xs">close</span></button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold">3. Keynote Speakers</h3>
                  <button type="button" onClick={() => addItem('speakers')} className="text-primary font-bold text-sm">+ Add</button>
                </div>
                <div className="space-y-4">
                  {(projectForm.speakers || []).map((s, i) => (
                    <div key={i} className="glass-card p-4 lg:p-6 rounded-2xl flex flex-col md:flex-row gap-6 relative">
                      <div className="w-full md:w-32">
                        <input type="file" className="text-[8px] w-full" onChange={async (e) => { const url = await uploadImage(e.target.files[0]); if(url) updateItem('speakers', i, 'image_url', url); }} />
                        {s.image_url && (
                          <div className="relative mt-2">
                            <img src={s.image_url} className="w-full aspect-square object-cover rounded-lg" />
                            <button type="button" onClick={() => updateItem('speakers', i, 'image_url', '')} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><span className="material-symbols-outlined text-[10px]">close</span></button>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow space-y-3">
                        <input type="text" placeholder="Name" className="admin-input w-full text-sm" value={s.name} onChange={e => updateItem('speakers', i, 'name', e.target.value)} />
                        <input type="text" placeholder="Role" className="admin-input w-full text-sm" value={s.role} onChange={e => updateItem('speakers', i, 'role', e.target.value)} />
                        <textarea placeholder="Bio" className="admin-input w-full text-sm" rows="2" value={s.description} onChange={e => updateItem('speakers', i, 'description', e.target.value)}></textarea>
                      </div>
                      <button type="button" onClick={() => removeItem('speakers', i)} className="text-red-500 material-symbols-outlined self-start">delete</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold">4. Sponsors</h3>
                  <button type="button" onClick={() => addItem('sponsors')} className="text-primary font-bold text-sm">+ Add</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(projectForm.sponsors || []).map((s, i) => (
                    <div key={i} className="glass-card p-4 rounded-2xl flex flex-col gap-4 relative">
                      <div className="w-full">
                        <input type="file" className="text-[8px] w-full" onChange={async (e) => { const url = await uploadImage(e.target.files[0]); if(url) updateItem('sponsors', i, 'image_url', url); }} />
                        {s.image_url && (
                          <div className="relative mt-2">
                            <img src={s.image_url} className="w-full h-28 object-cover rounded-lg border border-white/10" />
                            <button type="button" onClick={() => updateItem('sponsors', i, 'image_url', '')} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><span className="material-symbols-outlined text-[10px]">close</span></button>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <input type="text" placeholder="Sponsor Name" className="admin-input w-full text-xs" value={s.name} onChange={e => updateItem('sponsors', i, 'name', e.target.value)} />
                        <input type="text" placeholder="Sponsor Title (Gold, Silver, etc.)" className="admin-input w-full text-xs" value={s.title} onChange={e => updateItem('sponsors', i, 'title', e.target.value)} />
                        <input type="text" placeholder="Color Hex (#D4AF37)" className="admin-input w-full text-xs" value={s.color} onChange={e => updateItem('sponsors', i, 'color', e.target.value)} />
                      </div>
                      <button type="button" onClick={() => removeItem('sponsors', i)} className="text-red-500 material-symbols-outlined self-start text-sm">close</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold">5. Committee</h3>
                  <button type="button" onClick={() => addItem('committee')} className="text-primary font-bold text-sm">+ Add</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(projectForm.committee || []).map((c, i) => (
                    <div key={i} className="glass-card p-4 rounded-2xl flex gap-4 relative">
                      <div className="w-16">
                        <input type="file" className="text-[8px] w-full" onChange={async (e) => { const url = await uploadImage(e.target.files[0]); if(url) updateItem('committee', i, 'image_url', url); }} />
                        {c.image_url && <img src={c.image_url} className="w-12 h-12 rounded-full object-cover mt-2" />}
                      </div>
                      <div className="flex-grow space-y-2">
                        <input type="text" placeholder="Name" className="admin-input w-full text-xs" value={c.name} onChange={e => updateItem('committee', i, 'name', e.target.value)} />
                        <input type="text" placeholder="Role" className="admin-input w-full text-xs" value={c.role} onChange={e => updateItem('committee', i, 'role', e.target.value)} />
                      </div>
                      <button type="button" onClick={() => removeItem('committee', i)} className="text-red-500 material-symbols-outlined self-start text-sm">close</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: HIGHLIGHTS */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold">6. Event Highlights</h3>
                  <button type="button" onClick={() => addItem('highlights')} className="text-primary font-bold text-sm">+ Add Highlight</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(projectForm.highlights || []).map((h, i) => (
                    <div key={i} className="glass-card p-4 rounded-2xl space-y-3 relative">
                      <div className="relative group">
                        <input type="file" className="text-[8px] w-full" onChange={async (e) => { const url = await uploadImage(e.target.files[0]); if(url) updateItem('highlights', i, 'image_url', url); }} />
                        {h.image_url && (
                          <div className="relative mt-2">
                            <img src={h.image_url} className="w-full h-24 object-cover rounded-lg border border-white/10" />
                            <button type="button" onClick={() => updateItem('highlights', i, 'image_url', '')} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"><span className="material-symbols-outlined text-[10px]">close</span></button>
                          </div>
                        )}
                      </div>
                      <input type="text" placeholder="Caption/Title" className="admin-input w-full text-xs" value={h.title} onChange={e => updateItem('highlights', i, 'title', e.target.value)} />
                      <button type="button" onClick={() => removeItem('highlights', i)} className="absolute top-2 right-2 text-red-500 text-xs font-black uppercase tracking-tighter">Remove</button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading || uploading} className="admin-btn-primary px-12 py-5 text-xl w-full">
                {loading ? 'Processing...' : (editingProject ? 'Update Project' : 'Publish Project')}
              </button>
            </form>

            <section className="pt-20 space-y-6">
              <h3 className="text-2xl font-black">Project List</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map(p => (
                  <div key={p.id} onClick={async () => { setEditingProject(p); const [spk, spo, com, hlt] = await Promise.all([supabase.from('project_speakers').select('*').eq('project_id', p.id), supabase.from('project_sponsors').select('*').eq('project_id', p.id), supabase.from('project_committee').select('*').eq('project_id', p.id), supabase.from('project_highlights').select('*').eq('project_id', p.id)]); setProjectForm({...p, speakers: spk.data || [], sponsors: spo.data || [], committee: com.data || [], highlights: hlt.data || []}); window.scrollTo({top:0, behavior:'smooth'}); }} className="glass-card p-4 flex gap-4 cursor-pointer hover:border-primary/50 transition-all">
                    <img src={p.thumbnail_url || p.hero_image_url} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="overflow-hidden">
                      <div className="font-bold truncate">{p.title}</div>
                      <div className="text-[10px] text-white/40 truncate">{p.tag}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-12 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-black">Manage <span className="text-primary">Event Schedule</span></h2>
                <p className="text-white/40 text-sm mt-1">Edit timeline sessions, speakers, time slots, event types, and set the live session happening now.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setScheduleData([...scheduleData, { day_label: `Day 0${scheduleData.length + 1}`, event_date: `Day ${scheduleData.length + 1} Schedule`, events: [] }])}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-all"
                >
                  + Add Day
                </button>
                <button 
                  type="button" 
                  onClick={handleSaveSchedule}
                  disabled={scheduleLoading}
                  className="admin-btn-primary px-6 py-2.5 text-sm flex items-center gap-2"
                >
                  {scheduleLoading ? 'Saving...' : 'Save Schedule'}
                </button>
              </div>
            </div>

            <div className="space-y-12">
              {scheduleData.map((day, dayIdx) => (
                <div key={dayIdx} className="glass-card p-6 md:p-8 rounded-3xl space-y-6 relative border border-white/10 w-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <input 
                        type="text" 
                        value={day.day_label} 
                        onChange={e => {
                          const updated = [...scheduleData];
                          updated[dayIdx].day_label = e.target.value;
                          setScheduleData(updated);
                        }} 
                        className="admin-input text-lg font-bold w-36"
                        placeholder="Day Label"
                      />
                      <input 
                        type="text" 
                        value={day.event_date} 
                        onChange={e => {
                          const updated = [...scheduleData];
                          updated[dayIdx].event_date = e.target.value;
                          setScheduleData(updated);
                        }} 
                        className="admin-input text-sm text-white/70 w-56"
                        placeholder="Event Date"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={() => {
                          const updated = [...scheduleData];
                          updated[dayIdx].events.push({ display_time: '09:00 AM - 10:00 AM', title: 'New Event Session', speaker: '', event_type: 'KEYNOTE', is_active: false });
                          setScheduleData(updated);
                        }}
                        className="text-xs bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 px-4 py-2.5 rounded-xl font-bold transition-all"
                      >
                        + Add Session
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          const updated = scheduleData.filter((_, i) => i !== dayIdx);
                          setScheduleData(updated);
                        }}
                        className="text-xs text-red-400 hover:text-red-300 font-bold px-3 py-2"
                      >
                        Delete Day
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {(day.events || []).map((ev, evIdx) => (
                      <div 
                        key={evIdx} 
                        className={`p-5 rounded-2xl border transition-all space-y-4 ${
                          ev.is_active 
                            ? 'bg-primary/10 border-primary shadow-[0_0_30px_rgba(26,86,166,0.3)]' 
                            : 'bg-black/60 border-white/10'
                        }`}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                          <div className="lg:col-span-3">
                            <label className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">Time</label>
                            <input 
                              type="text" 
                              value={ev.display_time} 
                              onChange={e => {
                                const updated = [...scheduleData];
                                updated[dayIdx].events[evIdx].display_time = e.target.value;
                                setScheduleData(updated);
                              }}
                              className="admin-input text-xs py-2.5 font-mono"
                              placeholder="09:00 AM - 10:30 AM"
                            />
                          </div>

                          <div className="lg:col-span-4">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-1">Event Title</label>
                            <input 
                              type="text" 
                              value={ev.title} 
                              onChange={e => {
                                const updated = [...scheduleData];
                                updated[dayIdx].events[evIdx].title = e.target.value;
                                setScheduleData(updated);
                              }}
                              className="admin-input text-xs py-2.5 font-bold"
                              placeholder="Session Title"
                            />
                          </div>

                          <div className="lg:col-span-3">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-1">Speaker / Host</label>
                            <input 
                              type="text" 
                              value={ev.speaker} 
                              onChange={e => {
                                const updated = [...scheduleData];
                                updated[dayIdx].events[evIdx].speaker = e.target.value;
                                setScheduleData(updated);
                              }}
                              className="admin-input text-xs py-2.5"
                              placeholder="Speaker Name"
                            />
                          </div>

                          <div className="lg:col-span-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-1">Type</label>
                            <select 
                              value={ev.event_type || 'GENERAL'} 
                              onChange={e => {
                                const updated = [...scheduleData];
                                updated[dayIdx].events[evIdx].event_type = e.target.value;
                                setScheduleData(updated);
                              }}
                              className="admin-input text-xs py-2.5 bg-black"
                            >
                              <option value="KEYNOTE">KEYNOTE</option>
                              <option value="WORKSHOP">WORKSHOP</option>
                              <option value="PANEL">PANEL</option>
                              <option value="BREAK">BREAK</option>
                              <option value="GENERAL">GENERAL</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-between items-center pt-2 border-t border-white/5">
                          <button
                            type="button"
                            onClick={() => handleToggleHappeningNow(dayIdx, evIdx)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                              ev.is_active 
                                ? 'bg-yellow-400 text-black font-black shadow-[0_0_20px_rgba(234,179,8,0.5)]' 
                                : 'bg-white/5 hover:bg-white/10 text-white/60 border border-white/10'
                            }`}
                          >
                            <span className="material-symbols-outlined text-sm">{ev.is_active ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
                            {ev.is_active ? 'HAPPENING NOW (ACTIVE)' : 'MARK HAPPENING NOW'}
                          </button>

                          <button 
                            type="button" 
                            onClick={() => {
                              const updated = [...scheduleData];
                              updated[dayIdx].events = updated[dayIdx].events.filter((_, i) => i !== evIdx);
                              setScheduleData(updated);
                            }}
                            className="text-[11px] text-red-500 hover:text-red-400 font-bold uppercase tracking-wider py-1 px-2"
                          >
                            Remove Session
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <style jsx="true">{`
        .admin-input { 
          background: #111111 !important; 
          border: 1px solid rgba(255, 255, 255, 0.1); 
          border-radius: 0.75rem; 
          padding: 1rem; 
          color: white !important; 
          width: 100%; 
          outline: none; 
          transition: all 0.2s; 
        }
        .admin-input:focus { border-color: #1A56A6; background: #1a1a1a !important; }
        .admin-btn-primary { background: #1A56A6; color: white; font-weight: 900; border-radius: 0.75rem; padding: 1rem; transition: all 0.2s; text-transform: uppercase; }
        .admin-btn-primary:hover { filter: brightness(1.1); transform: translateY(-2px); }
        .glass-card { background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); }
      `}</style>
    </div>
  );
};

export default Admin;
