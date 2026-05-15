import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [speakers, setSpeakers] = useState([]);
  const [committee, setCommittee] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Project
        const { data: pData, error: pError } = await supabase.from('projects').select('*').eq('id', id).single();
        if (pError) throw pError;
        setProject(pData);

        // Fetch Speakers
        const { data: sData } = await supabase.from('project_speakers').select('*').eq('project_id', id).order('sort_order', { ascending: true });
        setSpeakers(sData || []);

        // Fetch Committee
        const { data: cData } = await supabase.from('project_committee').select('*').eq('project_id', id).order('sort_order', { ascending: true });
        setCommittee(cData || []);

        // Fetch Highlights
        const { data: hData } = await supabase.from('project_highlights').select('*').eq('project_id', id);
        setHighlights(hData || []);

      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-primary animate-pulse text-2xl font-black">Loading Project...</div>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      Project not found. <Link to="/" className="text-primary ml-2">Return Home</Link>
    </div>
  );

  return (
    <div className="bg-transparent text-white font-inter min-h-screen">
      <main className="pt-32 pb-16 px-6 md:px-margin-desktop max-w-container-max mx-auto w-full">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden glass-card border-none shadow-2xl h-[450px]">
            <img
              alt={project.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              src={project.thumbnail_url || project.hero_image_url || 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=2070'}
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            <div>
              <span className="text-primary font-mono text-sm bg-primary/10 px-4 py-1.5 rounded-full border border-primary/30 tracking-widest uppercase">
                {project.tag}
              </span>
              <h1 className="font-hanken text-4xl md:text-6xl mt-6 text-white font-black leading-tight tracking-tight">
                {project.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calendar_today</span>
                <p className="font-medium text-white">{project.start_date} {project.end_date ? `- ${project.end_date}` : ''}</p>
              </div>
              {project.location && (
                <>
                  <div className="hidden sm:block w-px h-4 bg-white/20"></div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <p className="font-medium text-white">{project.location}</p>
                  </div>
                </>
              )}
            </div>

            <p className="text-white/60 text-lg leading-relaxed font-inter">
              {project.description}
            </p>
          </div>
        </section>

        {/* Speakers Section */}
        {speakers.length > 0 && (
          <section className="mb-24">
            <div className="border-l-4 border-primary pl-8 mb-12">
              <h2 className="font-hanken text-3xl md:text-5xl text-white font-black tracking-tight">Keynote Speakers</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {speakers.map((speaker, i) => (
                <div key={i} className="glass-card p-8 flex flex-col items-center text-center group rounded-2xl hover:bg-white/5 transition-all duration-500">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-all mb-6 relative">
                    <img alt={speaker.name} className="w-full h-full object-cover transition-all duration-500" src={speaker.image_url} />
                  </div>
                  <h3 className="text-xl font-black text-white mb-1">{speaker.name}</h3>
                  <p className="text-primary text-xs font-mono font-bold tracking-widest uppercase mb-4">{speaker.role}</p>
                  <p className="text-white/40 text-sm leading-relaxed">{speaker.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Committee Section - Commented out for now
        {committee.length > 0 && (
          <section className="py-24 bg-transparent border-y border-white/5 mb-24">
            <h2 className="font-hanken text-3xl md:text-5xl mb-12 text-center text-white font-black tracking-tight">Organizing Committee</h2>
            <div className="flex flex-wrap justify-center gap-8 px-6">
              {committee.map((member, i) => (
                <div key={i} className="flex items-center gap-4 bg-black/40 p-3 pr-10 rounded-full border border-white/5 hover:border-primary/40 transition-all group">
                  <img alt={member.name} className="w-12 h-12 rounded-full object-cover border border-primary/50 group-hover:border-primary transition-colors" src={member.image_url} />
                  <div>
                    <h4 className="font-bold text-white text-sm">{member.name}</h4>
                    <p className="text-primary text-[10px] uppercase tracking-widest font-mono font-bold">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        */}

        {/* Image Gallery */}
        {highlights.length > 0 && (
          <section className="mt-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="border-l-4 border-primary pl-8">
                <h2 className="font-hanken text-3xl md:text-5xl text-white font-black tracking-tight">Event Highlights</h2>
                <p className="text-white/40 mt-2 text-sm md:text-base">Moments captured from our previous editions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {highlights.map((h, i) => (
                <div key={i} className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] glass-card border-none shadow-2xl">
                  <img
                    alt={h.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    src={h.image_url}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <p className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase mb-2">Gallery Item</p>
                    <h4 className="text-white font-black text-xl leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {h.title || 'Event Moment'}
                    </h4>
                  </div>
                  {/* Subtle border overlay */}
                  <div className="absolute inset-0 border border-white/5 group-hover:border-primary/20 rounded-[2rem] transition-colors pointer-events-none"></div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProjectDetails;
