import { useState, useCallback } from 'react';
import { useAction, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

interface Story { title: string; story: string; moral?: string; }
const THEMES = ['Adventure', 'Friendship', 'Courage', 'Kindness', 'Space', 'Pirates', 'Dragons', 'Underwater'];

function StoryPage() {
  const [name, setName] = useState(''); const [age, setAge] = useState(5); const [interests, setInterests] = useState(''); const [theme, setTheme] = useState('');
  const [loading, setLoading] = useState(false); const [result, setResult] = useState<Story | null>(null);
  const generate = useAction(api.ai.generateStory); const save = useMutation(api.functions.saveStory);

  const handleGenerate = useCallback(async () => {
    if (!name.trim() || !interests.trim()) return; setLoading(true);
    try {
      const r = await generate({ childName: name.trim(), age, interests: interests.trim(), theme: theme || undefined }); setResult(r); await save({ childName: name, age, interests, theme: theme || undefined, ...r });
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, [name, age, interests, theme, generate, save]);

  return (
    <div className="mc"><div className="pg">
      <h1 className="title">✨ <span className="a">Bedtime</span> Story</h1>
      <p className="sub">Create a magical personalized bedtime story starring your child.</p>
      <div className="row"><input className="inp" value={name} onChange={e => setName(e.target.value)} placeholder="Child's name" /><input className="inp" type="number" value={age} onChange={e => setAge(Number(e.target.value))} min={1} max={12} style={{ maxWidth: '100px' }} /></div>
      <input className="inp" value={interests} onChange={e => setInterests(e.target.value)} placeholder="Interests (e.g. dinosaurs, princesses, robots, soccer...)" />
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {THEMES.map(t => (<button key={t} onClick={() => setTheme(theme === t ? '' : t)} style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', fontWeight: 500, border: `1px solid ${theme === t ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--pill)', background: theme === t ? 'var(--asoft)' : 'var(--card)', color: theme === t ? 'var(--accent2)' : 'var(--txt2)', cursor: 'pointer' }}>{t}</button>))}
      </div>
      <button className="btn" disabled={!name.trim() || !interests.trim() || loading} onClick={handleGenerate}>{loading ? '⏳ Writing...' : '🌙 Create Story'}</button>
      {loading && <div className="ld"><span /><span /><span /></div>}
      {result && !loading && (
        <div className="story-card">
          <div className="story-header"><div className="story-title">📖 {result.title}</div></div>
          <div className="story-body">{result.story}</div>
          {result.moral && <div className="story-moral">✨ Moral: {result.moral}</div>}
        </div>
      )}
    </div></div>
  );
}

function App() {
  return (<BrowserRouter><div className="app">
    <header className="hdr"><a href="/"><span style={{ fontSize: '1.5rem' }}>🌙</span><div><h1>BedtimeStory</h1></div></a></header>
    <Routes><Route path="/" element={<StoryPage />} /></Routes>
    <footer className="ftr">© {new Date().getFullYear()} BedtimeStory — An AVS Media App.</footer>
  </div></BrowserRouter>);
}
export default App;
