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

  // Data States
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  
  // Project Form State
  const initialProjectState = { 
    title: '', tag: '', start_date: '', end_date: '', 
    location: '', description: '', hero_image_url: '', thumbnail_url: '',
    speakers: [], highlights: [], committee: []
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
      committee: { name: '', role: '', image_url: '' },
      highlights: { title: '', type: '', image_url: '', grid_size: 'small' }
    };
    setProjectForm({ ...projectForm, [type]: [...projectForm[type], schemas[type]] });
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
        // Simple strategy: Clear and re-insert children for consistency in this example
        await supabase.from('project_speakers').delete().eq('project_id', pid);
        await supabase.from('project_committee').delete().eq('project_id', pid);
        await supabase.from('project_highlights').delete().eq('project_id', pid);
      } else {
        const { data } = await supabase.from('projects').insert([pData]).select().single();
        pid = data.id;
      }

      // Save children
      if (projectForm.speakers.length) await supabase.from('project_speakers').insert(projectForm.speakers.map(s => ({ ...s, project_id: pid })));
      if (projectForm.committee.length) await supabase.from('project_committee').insert(projectForm.committee.map(c => ({ ...c, project_id: pid })));
      if (projectForm.highlights.length) await supabase.from('project_highlights').insert(projectForm.highlights.map(h => ({ ...h, project_id: pid })));

      alert('Project saved successfully!');
      setProjectForm(initialProjectState);
      setEditingProject(null);
      fetchProjects();
    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="glass-card p-10 rounded-2xl w-full max-w-md space-y-8 border-primary/20">
          <h1 className="text-3xl font-black text-white text-center">Admin <span className="text-primary">Login</span></h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="text" placeholder="Username" className="admin-input w-full" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" className="admin-input w-full" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit" className="admin-btn-primary w-full">{loading ? '...' : 'Sign In'}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-64 bg-white/5 border-r border-white/10 p-8 flex flex-col gap-8 fixed h-full z-20">
        <div className="font-black text-xl text-primary">ADMIN</div>
        <nav className="space-y-2 flex-grow">
          {['projects', 'schedule'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left px-4 py-3 rounded-xl capitalize transition-all ${activeTab === tab ? 'bg-primary text-black font-bold' : 'hover:bg-white/5 text-white/40'}`}>
              {tab}
            </button>
          ))}
        </nav>
        <button onClick={() => { sessionStorage.removeItem('admin_session'); setIsLoggedIn(false); }} className="text-white/20 hover:text-red-500 text-xs uppercase font-bold tracking-widest px-4">Sign Out</button>
      </aside>

      <main className="ml-64 flex-grow p-12 max-w-5xl">
        {activeTab === 'projects' && (
          <div className="space-y-16">
            <h2 className="text-4xl font-black">{editingProject ? 'Edit' : 'Create'} <span className="text-primary">Project</span></h2>
            
            <form onSubmit={handleSaveProject} className="space-y-12">
              {/* SECTION: BASIC INFO */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">1. Project Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Title" className="admin-input col-span-2" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required />
                  <input type="text" placeholder="Tag Line" className="admin-input" value={projectForm.tag} onChange={e => setProjectForm({...projectForm, tag: e.target.value})} />
                  <input type="text" placeholder="Location" className="admin-input" value={projectForm.location} onChange={e => setProjectForm({...projectForm, location: e.target.value})} />
                  <input type="date" className="admin-input" value={projectForm.start_date} onChange={e => setProjectForm({...projectForm, start_date: e.target.value})} />
                  <input type="date" className="admin-input" value={projectForm.end_date} onChange={e => setProjectForm({...projectForm, end_date: e.target.value})} />
                  <textarea placeholder="Description" rows="4" className="admin-input col-span-2" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})}></textarea>
                </div>
              </div>

              {/* SECTION: IMAGES */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">2. Main Media</h3>
                <div className="grid grid-cols-2 gap-8">
                  {['hero_image_url', 'thumbnail_url'].map(field => (
                    <div key={field} className="p-6 border-2 border-dashed border-white/10 rounded-2xl space-y-4">
                      <label className="text-xs uppercase font-black text-white/40 tracking-widest">{field.replace('_', ' ')}</label>
                      <input type="file" className="text-xs w-full" onChange={async (e) => { const url = await uploadImage(e.target.files[0]); if(url) setProjectForm({...projectForm, [field]: url}); }} />
                      {projectForm[field] && (
                        <div className="relative mt-2">
                          <img src={projectForm[field]} className="w-full h-32 object-cover rounded-lg border border-white/10" />
                          <button 
                            type="button" 
                            onClick={() => setProjectForm({...projectForm, [field]: ''})}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                          >
                            <span className="material-symbols-outlined text-xs">close</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: SPEAKERS */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold">3. Keynote Speakers</h3>
                  <button type="button" onClick={() => addItem('speakers')} className="text-primary font-bold text-sm">+ Add Speaker</button>
                </div>
                <div className="space-y-4">
                  {projectForm.speakers.map((s, i) => (
                    <div key={i} className="glass-card p-6 rounded-2xl grid grid-cols-12 gap-4 relative">
                      <div className="col-span-3">
                        <input type="file" className="text-[8px] w-full" onChange={async (e) => { const url = await uploadImage(e.target.files[0]); if(url) updateItem('speakers', i, 'image_url', url); }} />
                        {s.image_url && (
                          <div className="relative mt-2">
                            <img src={s.image_url} className="w-full aspect-square object-cover rounded-lg" />
                            <button 
                              type="button" 
                              onClick={() => updateItem('speakers', i, 'image_url', '')}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <span className="material-symbols-outlined text-[10px]">close</span>
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="col-span-8 space-y-3">
                        <input type="text" placeholder="Name" className="admin-input w-full" value={s.name} onChange={e => updateItem('speakers', i, 'name', e.target.value)} />
                        <input type="text" placeholder="Role" className="admin-input w-full" value={s.role} onChange={e => updateItem('speakers', i, 'role', e.target.value)} />
                        <textarea placeholder="Bio" className="admin-input w-full" rows="2" value={s.description} onChange={e => updateItem('speakers', i, 'description', e.target.value)}></textarea>
                      </div>
                      <button type="button" onClick={() => removeItem('speakers', i)} className="col-span-1 text-red-500 material-symbols-outlined">delete</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: COMMITTEE */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold">4. Committee</h3>
                  <button type="button" onClick={() => addItem('committee')} className="text-primary font-bold text-sm">+ Add Member</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {projectForm.committee.map((c, i) => (
                    <div key={i} className="glass-card p-6 rounded-2xl flex gap-4 relative">
                      <div className="w-20">
                        <input type="file" className="text-[8px] w-full" onChange={async (e) => { const url = await uploadImage(e.target.files[0]); if(url) updateItem('committee', i, 'image_url', url); }} />
                        {c.image_url && (
                          <div className="relative mt-2">
                            <img src={c.image_url} className="w-16 h-16 rounded-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => updateItem('committee', i, 'image_url', '')}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                            >
                              <span className="material-symbols-outlined text-[8px]">close</span>
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow space-y-2">
                        <input type="text" placeholder="Name" className="admin-input w-full text-sm" value={c.name} onChange={e => updateItem('committee', i, 'name', e.target.value)} />
                        <input type="text" placeholder="Role" className="admin-input w-full text-sm" value={c.role} onChange={e => updateItem('committee', i, 'role', e.target.value)} />
                      </div>
                      <button type="button" onClick={() => removeItem('committee', i)} className="text-red-500 material-symbols-outlined self-start">close</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: HIGHLIGHTS */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold">5. Event Highlights</h3>
                  <button type="button" onClick={() => addItem('highlights')} className="text-primary font-bold text-sm">+ Add Highlight</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {projectForm.highlights.map((h, i) => (
                    <div key={i} className="glass-card p-4 rounded-2xl space-y-3 relative">
                      <input type="file" className="text-[8px] w-full" onChange={async (e) => { const url = await uploadImage(e.target.files[0]); if(url) updateItem('highlights', i, 'image_url', url); }} />
                      {h.image_url && (
                        <div className="relative">
                          <img src={h.image_url} className="w-full h-24 object-cover rounded-lg" />
                          <button 
                            type="button" 
                            onClick={() => updateItem('highlights', i, 'image_url', '')}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <span className="material-symbols-outlined text-[10px]">close</span>
                          </button>
                        </div>
                      )}
                      <input type="text" placeholder="Title" className="admin-input w-full text-xs" value={h.title} onChange={e => updateItem('highlights', i, 'title', e.target.value)} />
                      <button type="button" onClick={() => removeItem('highlights', i)} className="absolute top-2 right-2 text-red-500 text-xs">Remove</button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading || uploading} className="admin-btn-primary px-12 py-5 text-xl w-full">
                {loading ? 'Processing...' : (editingProject ? 'Update Everything' : 'Publish Everything')}
              </button>
            </form>

            {/* PROJECT LIST */}
            <section className="pt-20 space-y-6">
              <h3 className="text-2xl font-black">All Projects</h3>
              <div className="grid grid-cols-2 gap-4">
                {projects.map(p => (
                  <div key={p.id} onClick={() => { setEditingProject(p); setProjectForm(p); window.scrollTo({top:0, behavior:'smooth'}); }} className="glass-card p-4 flex gap-4 cursor-pointer hover:border-primary/50 transition-all">
                    <img src={p.thumbnail_url || p.hero_image_url} className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                      <div className="font-bold">{p.title}</div>
                      <div className="text-xs text-white/40">{p.tag}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <style jsx="true">{`
        .admin-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.75rem; padding: 0.75rem 1rem; color: white; outline: none; transition: border-color 0.2s; }
        .admin-input:focus { border-color: #FACC15; }
        .admin-btn-primary { background: #FACC15; color: black; font-weight: 900; border-radius: 0.75rem; transition: all 0.2s; }
        .admin-btn-primary:hover { filter: brightness(1.1); transform: translateY(-2px); }
        .admin-btn-primary:active { transform: translateY(0); }
      `}</style>
    </div>
  );
};

export default Admin;
