import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error) setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  if (loading) return null;

  return (
    <section className="py-32 bg-transparent border-y border-white/5">
      <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-primary font-mono text-sm uppercase tracking-[0.3em]">Timeline</h2>
            <h3 className="font-hanken text-4xl md:text-5xl text-white font-bold">Previous Editions</h3>
            <p className="text-white/40 max-w-md">Relive the best moments from our previous campus events and student gatherings.</p>
          </div>
          <Link to="/details" className="btn-outline border-white/20 hover:border-primary/50 text-sm">
            Explore All
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length === 0 ? (
            <div className="col-span-full py-20 text-center glass-card rounded-2xl border-dashed border-white/10">
              <p className="text-white/20 italic">No previous editions found yet. Add them in the admin panel!</p>
            </div>
          ) : (
            events.map((event) => (
              <Link to={`/details/${event.id}`} key={event.id} className="group glass-card rounded-2xl overflow-hidden border-white/5 hover:border-primary/30 transition-all">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.thumbnail_url || event.hero_image_url}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110  "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                    {event.tag}
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{event.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{event.description}</p>

                  <div className="pt-6 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-primary">event</span>
                      {event.start_date}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                      {event.location}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;
