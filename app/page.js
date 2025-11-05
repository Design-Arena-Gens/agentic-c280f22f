'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [dates, setDates] = useState([])
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('birthday')

  useEffect(() => {
    const saved = localStorage.getItem('savedDates')
    if (saved) {
      setDates(JSON.parse(saved))
    }
  }, [])

  const saveDate = (e) => {
    e.preventDefault()
    if (!name || !date) return

    const newDate = {
      id: Date.now(),
      name,
      date,
      category,
      createdAt: new Date().toISOString()
    }

    const updated = [...dates, newDate]
    setDates(updated)
    localStorage.setItem('savedDates', JSON.stringify(updated))

    setName('')
    setDate('')
    setCategory('birthday')
  }

  const deleteDate = (id) => {
    const updated = dates.filter(d => d.id !== id)
    setDates(updated)
    localStorage.setItem('savedDates', JSON.stringify(updated))
  }

  const getCategoryColor = (cat) => {
    const colors = {
      birthday: '#ff6b6b',
      anniversary: '#ee5a6f',
      meeting: '#4ecdc4',
      deadline: '#f7b731',
      event: '#5f27cd',
      other: '#95afc0'
    }
    return colors[cat] || colors.other
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const sortedDates = [...dates].sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          fontSize: '48px',
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}>📅 Date Shop</h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '40px',
          fontSize: '18px'
        }}>Save and manage your important dates</p>

        <form onSubmit={saveDate} style={{ marginBottom: '40px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              Event Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mom's Birthday"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border 0.3s',
                cursor: 'pointer'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            >
              <option value="birthday">🎂 Birthday</option>
              <option value="anniversary">💕 Anniversary</option>
              <option value="meeting">🤝 Meeting</option>
              <option value="deadline">⏰ Deadline</option>
              <option value="event">🎉 Event</option>
              <option value="other">📌 Other</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
          >
            💾 Save Date
          </button>
        </form>

        <div>
          <h2 style={{
            fontSize: '28px',
            marginBottom: '20px',
            color: '#333'
          }}>Saved Dates ({dates.length})</h2>

          {sortedDates.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#999',
              fontSize: '18px'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📭</div>
              No dates saved yet. Add your first date above!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {sortedDates.map((d) => (
                <div
                  key={d.id}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: '#f8f9fa',
                    border: `3px solid ${getCategoryColor(d.category)}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateX(5px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#333',
                      marginBottom: '8px'
                    }}>
                      {d.name}
                    </div>
                    <div style={{
                      fontSize: '16px',
                      color: '#666',
                      marginBottom: '8px'
                    }}>
                      📆 {formatDate(d.date)}
                    </div>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'white',
                      background: getCategoryColor(d.category)
                    }}>
                      {d.category}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteDate(d.id)}
                    style={{
                      padding: '10px 20px',
                      fontSize: '16px',
                      color: 'white',
                      background: '#e74c3c',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#c0392b'}
                    onMouseOut={(e) => e.target.style.background = '#e74c3c'}
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
