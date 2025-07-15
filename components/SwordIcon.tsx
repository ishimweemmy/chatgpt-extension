import React, { useState } from "react"

const SwordIcon: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)

  const swordSvg = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 3L3 21L5 19L7 17L17 7L19 5L21 3Z"
        stroke="#FFD700"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FFD700"
        opacity="0.9"
      />
      <path
        d="M17 7L19 5"
        stroke="#FFD700"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 17L5 19"
        stroke="#FFD700"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 21L5 19L7 17"
        stroke="#FFD700"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  const dropdownItems = [
    { id: 'lock', icon: '🔒', color: '#ff4444', label: 'Lock' },
    { id: 'settings', icon: '⚙️', color: '#888', label: 'Settings' },
    { id: 'image', icon: '🖼️', color: '#888', label: 'Image' },
    { id: 'list', icon: '📋', color: '#888', label: 'List' },
    { id: 'chat', icon: '💬', color: '#888', label: 'Chat' }
  ]

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Sword Icon */}
      <div
        style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#333',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: '1px solid #FFD700',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
        onClick={() => {
          console.log('Clicked: sword')
        }}
      >
        {swordSvg}
      </div>

      {/* Dropdown Menu */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            left: '40px',
            top: '0',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            backgroundColor: '#2d2d2d',
            borderRadius: '8px',
            padding: '8px',
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
            zIndex: 10001,
            animation: 'slideIn 0.2s ease-out'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <style>
            {`
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateX(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
            `}
          </style>
          
          {dropdownItems.map((item) => (
            <div
              key={item.id}
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#444',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid #666',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#555'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#444'
                e.currentTarget.style.transform = 'scale(1)'
              }}
              onClick={() => {
                console.log(`Clicked: ${item.id}`)
              }}
            >
              <span style={{ fontSize: '14px', color: item.color }}>
                {item.icon}
              </span>
              
              {/* Tooltip */}
              <div
                style={{
                  position: 'absolute',
                  left: '40px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#333',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  zIndex: 10002,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  opacity: 0,
                  pointerEvents: 'none',
                  transition: 'opacity 0.2s ease'
                }}
                className="tooltip"
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SwordIcon