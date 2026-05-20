import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { auth, signInWithGoogle, logout } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// SVG Icons
const Icons = {
  Lock: () => <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>,
  Bag: () => <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>,
  Book: () => <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
  Bulb: () => <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>,
  Target: () => <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  Chat: () => <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
  Rocket: () => <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>,
  Users: () => <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>,
  Link: () => <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>,
  Edit: () => <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>,
};

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [events, setEvents] = useState([]);
  const [purchasesLoading, setPurchasesLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ display_name: '', bio: '', photo_url: '', twitter: '', linkedin: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        await syncAndFetchProfile(currentUser);
        fetchPurchases(currentUser.email);
        fetchEvents();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const syncAndFetchProfile = async (fbUser) => {
    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firebase_uid: fbUser.uid,
          display_name: fbUser.displayName || '',
          email: fbUser.email,
          photo_url: fbUser.photoURL || ''
        })
      });
      const data = await res.json();
      if (data.profile) {
        setProfile(data.profile);
        setEditForm({
          display_name: data.profile.display_name || '',
          bio: data.profile.bio || '',
          photo_url: data.profile.photo_url || '',
          twitter: data.profile.socials?.twitter || '',
          linkedin: data.profile.socials?.linkedin || ''
        });
      }
    } catch (err) {
      console.error("Profile sync failed:", err);
    }
    setLoading(false);
  };

  const fetchPurchases = async (email) => {
    setPurchasesLoading(true);
    try {
      const res = await fetch(`/api/user/purchases?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.purchases) setPurchases(data.purchases);
    } catch (err) {
      console.error("Purchases fetch failed:", err);
    }
    setPurchasesLoading(false);
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      if (data.events) setEvents(data.events);
    } catch (err) {
      console.error("Events fetch failed:", err);
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          display_name: editForm.display_name,
          bio: editForm.bio,
          photo_url: editForm.photo_url,
          socials: { twitter: editForm.twitter, linkedin: editForm.linkedin }
        })
      });
      const data = await res.json();
      if (data.profile) {
        setProfile(data.profile);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const s = {
    card: { background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px' },
    teal: '#2dd4bf',
    orange: '#f97316',
    muted: 'rgba(240,240,236,0.4)',
    offwhite: '#f0f0ec',
    mono: "'Roboto Mono', monospace",
    syne: "'Syne', sans-serif",
    inter: "'Inter', sans-serif",
    input: { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f0ec', padding: '10px 12px', borderRadius: '8px', fontFamily: "'Roboto Mono', monospace", fontSize: '12px', outline: 'none' },
    label: { display: 'block', fontFamily: "'Roboto Mono', monospace", fontSize: '10px', color: 'rgba(240,240,236,0.5)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '256px', color: s.teal, fontFamily: 'monospace' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '32px', height: '32px', border: '2px solid rgba(45,212,191,0.2)', borderTop: '2px solid #2dd4bf', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          [INITIALIZING_SESSION...]
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: s.teal }}>
          <Icons.Lock />
        </div>
        <h2 style={{ fontFamily: s.syne, fontSize: '28px', fontWeight: 800, color: s.offwhite, marginBottom: '12px' }}>Sign In Required</h2>
        <p style={{ color: s.muted, marginBottom: '32px', fontSize: '14px', maxWidth: '400px', margin: '0 auto 32px' }}>Sign in with your Google account to access your profile, purchases, and community features.</p>
        <button 
          onClick={handleSignIn}
          style={{ border: '1px solid rgba(45,212,191,0.3)', background: 'rgba(45,212,191,0.1)', color: s.teal, padding: '12px 32px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.1em', cursor: 'pointer', fontWeight: 700, textTransform: 'uppercase' }}
        >
          Sign In with Google
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'purchases', label: 'Purchases' },
    { id: 'events', label: 'Events' },
    { id: 'community', label: 'Community' },
  ];

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Profile Header */}
      <div style={{ ...s.card, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '24px', marginBottom: '32px', position: 'relative' }}>
        <img 
          src={profile.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.display_name || 'U')}&background=2dd4bf&color=0a0a0c&size=96&bold=true`} 
          alt={profile.display_name || 'User'} 
          style={{ width: '96px', height: '96px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', objectFit: 'cover' }}
        />
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h1 style={{ fontFamily: s.syne, fontSize: '28px', fontWeight: 800, color: s.offwhite, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {profile.display_name || 'User'}
          </h1>
          <p style={{ fontFamily: s.mono, fontSize: '11px', color: s.muted, letterSpacing: '0.05em', margin: '0 0 12px 0' }}>{profile.email}</p>
          {profile.bio && <p style={{ fontFamily: s.inter, fontSize: '13px', color: 'rgba(240,240,236,0.7)', margin: '0 0 16px 0', maxWidth: '600px', lineHeight: 1.5 }}>{profile.bio}</p>}
          
          <div style={{ display: 'flex', gap: '12px' }}>
            {profile.socials?.twitter && (
              <a href={profile.socials.twitter} target="_blank" style={{ color: '#1DA1F2', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontFamily: s.mono }}><Icons.Link /> Twitter</a>
            )}
            {profile.socials?.linkedin && (
              <a href={profile.socials.linkedin} target="_blank" style={{ color: '#0A66C2', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontFamily: s.mono }}><Icons.Link /> LinkedIn</a>
            )}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', position: 'absolute', top: '24px', right: '24px' }}>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: s.muted, padding: '6px 12px', borderRadius: '6px', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: s.mono, display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Icons.Edit /> Edit
          </button>
          <button 
            onClick={handleLogout}
            style={{ border: '1px solid rgba(249,115,22,0.3)', background: 'rgba(249,115,22,0.08)', color: s.orange, padding: '6px 12px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: s.mono }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {isEditing && (
        <form onSubmit={saveProfile} style={{ ...s.card, marginBottom: '32px', display: 'grid', gap: '16px', background: 'rgba(0,0,0,0.3)' }}>
          <h3 style={{ fontFamily: s.syne, fontSize: '18px', color: s.offwhite, margin: 0 }}>Edit Profile</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={s.label}>Display Name</label>
              <input type="text" value={editForm.display_name} onChange={e => setEditForm({...editForm, display_name: e.target.value})} style={s.input} />
            </div>
            <div>
              <label style={s.label}>Photo URL</label>
              <input type="url" value={editForm.photo_url} onChange={e => setEditForm({...editForm, photo_url: e.target.value})} style={s.input} placeholder="https://..." />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={s.label}>Bio</label>
              <textarea value={editForm.bio} onChange={e => setEditForm({...editForm, bio: e.target.value})} style={{...s.input, height: '80px', resize: 'vertical'}} placeholder="Tell us about yourself..."></textarea>
            </div>
            <div>
              <label style={s.label}>X (Twitter) URL</label>
              <input type="url" value={editForm.twitter} onChange={e => setEditForm({...editForm, twitter: e.target.value})} style={s.input} placeholder="https://x.com/..." />
            </div>
            <div>
              <label style={s.label}>LinkedIn URL</label>
              <input type="url" value={editForm.linkedin} onChange={e => setEditForm({...editForm, linkedin: e.target.value})} style={s.input} placeholder="https://linkedin.com/in/..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setIsEditing(false)} style={{ background: 'transparent', border: 'none', color: s.muted, fontFamily: s.mono, fontSize: '11px', cursor: 'pointer', textTransform: 'uppercase' }}>Cancel</button>
            <button type="submit" style={{ background: s.teal, border: 'none', color: '#000', padding: '8px 24px', borderRadius: '6px', fontFamily: s.mono, fontSize: '11px', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}>Save Changes</button>
          </div>
        </form>
      )}

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', borderBottom: '0.5px solid rgba(255,255,255,0.07)', paddingBottom: '0' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              fontFamily: s.mono,
              fontSize: '10px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '10px 16px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #2dd4bf' : '2px solid transparent',
              color: activeTab === tab.id ? s.teal : s.muted,
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB: Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {/* Quick Stats */}
          <div style={s.card}>
            <div style={{ fontFamily: s.mono, fontSize: '9px', color: s.muted, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Total Purchases</div>
            <div style={{ fontFamily: s.syne, fontSize: '36px', fontWeight: 800, color: s.teal }}>{purchases.length}</div>
          </div>
          <div style={s.card}>
            <div style={{ fontFamily: s.mono, fontSize: '9px', color: s.muted, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Total Spent</div>
            <div style={{ fontFamily: s.syne, fontSize: '36px', fontWeight: 800, color: s.offwhite }}>
              ₹{purchases.reduce((sum, p) => sum + (p.amount || 0), 0) / 100}
            </div>
          </div>
          <div style={s.card}>
            <div style={{ fontFamily: s.mono, fontSize: '9px', color: s.muted, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Upcoming Events</div>
            <div style={{ fontFamily: s.syne, fontSize: '36px', fontWeight: 800, color: s.orange }}>{events.length}</div>
          </div>

          {/* Quick Actions */}
          <div style={{ ...s.card, gridColumn: '1 / -1' }}>
            <div style={{ fontFamily: s.mono, fontSize: '9px', color: s.muted, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>Quick Actions</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <a href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: '0.5px solid rgba(45,212,191,0.2)', background: 'rgba(45,212,191,0.05)', color: s.teal, fontFamily: s.mono, fontSize: '10px', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Icons.Bag /> Browse Products
              </a>
              <a href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: '0.5px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', color: s.muted, fontFamily: s.mono, fontSize: '10px', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Icons.Book /> Read Blog
              </a>
              <a href="https://chat.whatsapp.com/JsJ9FFIIxTc0IvmtkynB3s" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: '0.5px solid rgba(37,211,102,0.3)', background: 'rgba(37,211,102,0.08)', color: '#25d366', fontFamily: s.mono, fontSize: '10px', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Icons.Chat /> Join Community
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Purchases */}
      {activeTab === 'purchases' && (
        <div>
          {purchasesLoading ? (
            <div style={{ color: s.muted, fontFamily: s.mono, fontSize: '11px' }}>Loading purchases...</div>
          ) : purchases.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {purchases.map((p, i) => (
                <div key={i} style={s.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontFamily: s.inter, fontWeight: 700, color: s.offwhite, fontSize: '15px', margin: 0 }}>{p.service_name}</h3>
                    <span style={{ background: 'rgba(45,212,191,0.1)', color: s.teal, padding: '2px 8px', borderRadius: '4px', fontSize: '9px', fontFamily: s.mono, textTransform: 'uppercase', letterSpacing: '0.1em', border: '0.5px solid rgba(45,212,191,0.2)' }}>
                      {p.status || 'verified'}
                    </span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(240,240,236,0.25)', fontFamily: s.mono, marginBottom: '16px' }}>
                    ID: {p.razorpay_payment_id || p.id}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '0.5px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                    <div style={{ fontSize: '11px', color: 'rgba(240,240,236,0.3)' }}>
                      {p.created_at ? new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                    </div>
                    <div style={{ fontWeight: 700, color: s.teal, fontSize: '16px', fontFamily: s.syne }}>
                      ₹{p.amount ? (p.amount / 100).toFixed(2) : '0.00'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ ...s.card, textAlign: 'center', padding: '48px', borderStyle: 'dashed' }}>
              <p style={{ color: s.muted, fontSize: '13px', margin: '0 0 16px 0' }}>No purchases yet.</p>
              <a href="/products" style={{ color: s.teal, fontFamily: s.mono, fontSize: '11px', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Browse Products →</a>
            </div>
          )}
        </div>
      )}

      {/* TAB: Events */}
      {activeTab === 'events' && (
        <div style={{ display: 'grid', gap: '24px' }}>
          {events.length > 0 ? events.map((ev, i) => (
            <div key={i} style={{ ...s.card, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {ev.image_url ? (
                <div style={{ width: '100%', height: '200px', backgroundImage: `url(${ev.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}></div>
              ) : (
                <div style={{ width: '100%', height: '100px', background: 'linear-gradient(to right, rgba(45,212,191,0.05), rgba(45,212,191,0.01))', borderBottom: '0.5px solid rgba(45,212,191,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.teal, opacity: 0.5 }}>
                  <Icons.Rocket />
                </div>
              )}
              
              <div style={{ padding: '24px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <h3 style={{ fontFamily: s.syne, fontWeight: 800, color: s.offwhite, fontSize: '20px', margin: 0 }}>{ev.title}</h3>
                  <span style={{ fontFamily: s.mono, fontSize: '9px', color: s.teal, textTransform: 'uppercase', letterSpacing: '0.1em', border: '0.5px solid rgba(45,212,191,0.2)', padding: '4px 10px', borderRadius: '4px', background: 'rgba(45,212,191,0.05)' }}>{ev.type}</span>
                </div>
                
                <p style={{ fontFamily: s.mono, fontSize: '11px', color: s.orange, margin: '0 0 16px 0', letterSpacing: '0.05em' }}>{ev.event_date}</p>
                <p style={{ fontSize: '13px', color: s.muted, margin: '0 0 20px 0', lineHeight: 1.6 }}>{ev.description}</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginBottom: '20px', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '0.5px solid rgba(255,255,255,0.03)' }}>
                  <div>
                    <div style={{ fontFamily: s.mono, fontSize: '9px', color: s.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Cost</div>
                    <div style={{ fontFamily: s.inter, fontSize: '14px', fontWeight: 600, color: s.teal }}>{ev.cost || 'Free'}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: s.mono, fontSize: '9px', color: s.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Duration</div>
                    <div style={{ fontFamily: s.inter, fontSize: '14px', fontWeight: 600, color: s.offwhite }}>{ev.duration || 'N/A'}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: s.mono, fontSize: '9px', color: s.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>For</div>
                    <div style={{ fontFamily: s.inter, fontSize: '14px', fontWeight: 600, color: s.offwhite }}>{ev.target_audience || 'Everyone'}</div>
                  </div>
                </div>

                {ev.benefits && Array.isArray(ev.benefits) && ev.benefits.length > 0 && (
                  <div>
                    <div style={{ fontFamily: s.mono, fontSize: '10px', color: s.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', borderBottom: '0.5px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>What you get</div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '8px' }}>
                      {ev.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'rgba(240,240,236,0.8)', lineHeight: 1.5 }}>
                          <span style={{ color: s.teal, marginTop: '2px' }}>✓</span> {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )) : (
            <div style={{ ...s.card, textAlign: 'center', padding: '48px', borderStyle: 'dashed' }}>
              <p style={{ color: s.muted, fontSize: '13px', margin: 0 }}>No upcoming events.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB: Community */}
      {activeTab === 'community' && (
        <div style={{ display: 'grid', gap: '16px' }}>
          {/* WhatsApp Community */}
          <div style={{ ...s.card, textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', color: '#25d366', marginBottom: '16px' }}><Icons.Chat /></div>
            <h3 style={{ fontFamily: s.syne, fontSize: '22px', fontWeight: 800, color: s.offwhite, marginBottom: '8px' }}>Join the Kinbo Community</h3>
            <p style={{ color: s.muted, fontSize: '13px', maxWidth: '400px', margin: '0 auto 24px', lineHeight: 1.6 }}>Connect with other users, get early access to features, share feedback, and stay updated on everything Kinbo.</p>
            <a 
              href="https://chat.whatsapp.com/JsJ9FFIIxTc0IvmtkynB3s" 
              target="_blank"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '12px', background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.4)', color: '#25d366', fontFamily: s.mono, fontSize: '11px', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}
            >
              Join WhatsApp Community
            </a>
          </div>

          {/* Social Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            <a href="/blog" style={{ ...s.card, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', color: s.muted }}>
              <Icons.Book />
              <div>
                <div style={{ fontFamily: s.inter, fontWeight: 700, color: s.offwhite, fontSize: '13px' }}>Blog</div>
                <div style={{ fontFamily: s.mono, fontSize: '9px', color: s.muted, textTransform: 'uppercase' }}>Read insights</div>
              </div>
            </a>
            <a href="/ideas" style={{ ...s.card, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', color: s.muted }}>
              <Icons.Bulb />
              <div>
                <div style={{ fontFamily: s.inter, fontWeight: 700, color: s.offwhite, fontSize: '13px' }}>Ideas</div>
                <div style={{ fontFamily: s.mono, fontSize: '9px', color: s.muted, textTransform: 'uppercase' }}>Submit yours</div>
              </div>
            </a>
            <a href="/chat" style={{ ...s.card, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', color: s.muted }}>
              <Icons.Target />
              <div>
                <div style={{ fontFamily: s.inter, fontWeight: 700, color: s.offwhite, fontSize: '13px' }}>Contact</div>
                <div style={{ fontFamily: s.mono, fontSize: '9px', color: s.muted, textTransform: 'uppercase' }}>Reach us</div>
              </div>
            </a>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
