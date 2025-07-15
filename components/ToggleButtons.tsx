import React, { useState } from "react"

interface ToggleProps {
  label: string
  isActive: boolean
  onToggle: () => void
}

const Toggle: React.FC<ToggleProps> = ({ label, isActive, onToggle }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '2px 8px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: 'transparent',
        fontSize: '12px',
        fontWeight: '500',
        color: '#ffffff'
      }}
      onClick={onToggle}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      <span style={{ fontSize: '11px', opacity: 0.9 }}>{label}</span>
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '32px',
          height: '18px'
        }}
      >
        <input
          type="checkbox"
          checked={isActive}
          onChange={onToggle}
          style={{
            opacity: 0,
            width: 0,
            height: 0
          }}
        />
        <span
          style={{
            position: 'absolute',
            cursor: 'pointer',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: isActive ? '#FFD700' : '#666',
            transition: '.3s',
            borderRadius: '18px'
          }}
        >
          <span
            style={{
              position: 'absolute',
              content: '""',
              height: '14px',
              width: '14px',
              left: isActive ? '16px' : '2px',
              bottom: '2px',
              backgroundColor: 'white',
              transition: '.3s',
              borderRadius: '50%'
            }}
          />
        </span>
      </div>
    </div>
  )
}

const ToggleButtons: React.FC = () => {
  const [toggles, setToggles] = useState({
    memory: false,
    referenceChats: false,
  })

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '4px 8px',
        backgroundColor: 'transparent'
      }}
    >
      <Toggle
        label="Memory"
        isActive={toggles.memory}
        onToggle={() => handleToggle('memory')}
      />
      <Toggle
        label="Reference Chats"
        isActive={toggles.referenceChats}
        onToggle={() => handleToggle('referenceChats')}
      />
    </div>
  )
}

export default ToggleButtons