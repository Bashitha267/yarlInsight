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
    }
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error) setProjects(data);
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
      <main className="flex-grow p-6 lg:p-12 max-w-5xl mx-auto w-full">
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
