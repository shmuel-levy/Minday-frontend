import React from 'react';

const MindayArchitectureDiagram = ({ className = "", style = {} }) => {
  return (
    <svg 
      viewBox="0 0 1400 1000" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '100%', height: 'auto', ...style }}
    >
      <defs>
        {/* Clean, subtle gradient */}
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#f8fafc", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#e2e8f0", stopOpacity:1}} />
        </linearGradient>
        
        {/* Minimal shadow */}
        <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#64748b" floodOpacity="0.15"/>
        </filter>
        
        {/* Thin, professional arrows */}
        <marker id="requestArrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="#3b82f6" stroke="none"/>
        </marker>
        
        <marker id="responseArrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="#059669" stroke="none"/>
        </marker>
        
        <marker id="socketArrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="#dc2626" stroke="none"/>
        </marker>
      </defs>
      
      {/* Clean background */}
      <rect width="1400" height="1000" fill="url(#bgGradient)"/>
      
      {/* Title */}
      <text x="700" y="40" textAnchor="middle" fill="#1e293b" fontSize="28" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">
        Minday Backend Architecture
      </text>
      <text x="700" y="65" textAnchor="middle" fill="#64748b" fontSize="14" fontFamily="system-ui, -apple-system, sans-serif">
        Request Flow & Project Structure
      </text>
      
      {/* Step numbers - clean, minimal */}
      <g fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500" fontSize="12">
        <circle cx="120" cy="150" r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
        <text x="120" y="155" textAnchor="middle" fill="#ffffff">1</text>
        
        <circle cx="350" cy="150" r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
        <text x="350" y="155" textAnchor="middle" fill="#ffffff">2</text>
        
        <circle cx="580" cy="150" r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
        <text x="580" y="155" textAnchor="middle" fill="#ffffff">3</text>
        
        <circle cx="700" cy="280" r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
        <text x="700" y="285" textAnchor="middle" fill="#ffffff">4</text>
        
        <circle cx="700" cy="420" r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
        <text x="700" y="425" textAnchor="middle" fill="#ffffff">5</text>
        
        <circle cx="400" cy="600" r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
        <text x="400" y="605" textAnchor="middle" fill="#ffffff">6</text>
        
        <circle cx="400" cy="800" r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
        <text x="400" y="805" textAnchor="middle" fill="#ffffff">7</text>
        
        <circle cx="1100" cy="600" r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
        <text x="1100" y="605" textAnchor="middle" fill="#ffffff">8</text>
      </g>
      
      {/* 1. Client Request */}
      <g transform="translate(60,180)">
        <rect width="120" height="50" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" filter="url(#subtleShadow)"/>
        <text x="60" y="20" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">Client Request</text>
        <text x="60" y="35" textAnchor="middle" fill="#64748b" fontSize="10">POST /api/board</text>
      </g>
      
      {/* 2. Server Entry */}
      <g transform="translate(290,180)">
        <rect width="120" height="50" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" filter="url(#subtleShadow)"/>
        <text x="60" y="25" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">server.js</text>
        <text x="60" y="38" textAnchor="middle" fill="#64748b" fontSize="10">Entry Point</text>
      </g>
      
      {/* 3. Middlewares */}
      <g transform="translate(480,120)">
        <rect width="200" height="100" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" filter="url(#subtleShadow)"/>
        <text x="100" y="20" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">middlewares/</text>
        
        <rect x="15" y="30" width="170" height="18" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1"/>
        <text x="100" y="42" textAnchor="middle" fill="#475569" fontSize="9">logger.middleware.js</text>
        
        <rect x="15" y="52" width="170" height="18" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1"/>
        <text x="100" y="64" textAnchor="middle" fill="#475569" fontSize="9">requireAuth.middleware.js</text>
        
        <rect x="15" y="74" width="170" height="18" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1"/>
        <text x="100" y="86" textAnchor="middle" fill="#475569" fontSize="9">setupAls.middleware.js</text>
      </g>
      
      {/* 4. API Routes */}
      <g transform="translate(550,310)">
        <rect width="300" height="80" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" filter="url(#subtleShadow)"/>
        <text x="150" y="20" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">api/ Routes</text>
        
        <rect x="20" y="30" width="80" height="35" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="60" y="42" textAnchor="middle" fill="#475569" fontSize="9">auth/</text>
        <text x="60" y="53" textAnchor="middle" fill="#64748b" fontSize="8">routes + controller</text>
        <text x="60" y="62" textAnchor="middle" fill="#64748b" fontSize="8">service</text>
        
        <rect x="110" y="30" width="80" height="35" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="150" y="42" textAnchor="middle" fill="#475569" fontSize="9">board/</text>
        <text x="150" y="53" textAnchor="middle" fill="#64748b" fontSize="8">routes + controller</text>
        <text x="150" y="62" textAnchor="middle" fill="#64748b" fontSize="8">service</text>
        
        <rect x="200" y="30" width="80" height="35" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="240" y="42" textAnchor="middle" fill="#475569" fontSize="9">user/</text>
        <text x="240" y="53" textAnchor="middle" fill="#64748b" fontSize="8">routes + controller</text>
        <text x="240" y="62" textAnchor="middle" fill="#64748b" fontSize="8">service</text>
      </g>
      
      {/* 5. Controller Detail */}
      <g transform="translate(600,450)">
        <rect width="200" height="60" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" filter="url(#subtleShadow)"/>
        <text x="100" y="20" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">board.controller.js</text>
        <text x="100" y="35" textAnchor="middle" fill="#64748b" fontSize="10">getBoards() • addBoard()</text>
        <text x="100" y="48" textAnchor="middle" fill="#64748b" fontSize="10">updateBoard() • deleteBoard()</text>
      </g>
      
      {/* 6. Services Layer */}
      <g transform="translate(200,550)">
        <rect width="400" height="100" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" filter="url(#subtleShadow)"/>
        <text x="200" y="20" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">services/</text>
        
        <rect x="20" y="30" width="70" height="25" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="55" y="45" textAnchor="middle" fill="#475569" fontSize="9">db.service.js</text>
        
        <rect x="100" y="30" width="70" height="25" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="135" y="45" textAnchor="middle" fill="#475569" fontSize="9">logger.service.js</text>
        
        <rect x="180" y="30" width="70" height="25" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="215" y="45" textAnchor="middle" fill="#475569" fontSize="9">socket.service.js</text>
        
        <rect x="260" y="30" width="70" height="25" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="295" y="45" textAnchor="middle" fill="#475569" fontSize="9">als.service.js</text>
        
        <rect x="140" y="65" width="120" height="25" rx="4" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1"/>
        <text x="200" y="80" textAnchor="middle" fill="#0c4a6e" fontSize="10" fontWeight="500">board.service.js</text>
      </g>
      
      {/* 7. Database */}
      <g transform="translate(320,830)">
        <rect width="160" height="50" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" filter="url(#subtleShadow)"/>
        <text x="80" y="20" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">data/</text>
        <text x="80" y="35" textAnchor="middle" fill="#64748b" fontSize="10">boards.json</text>
      </g>
      
      {/* 8. Client Updates */}
      <g transform="translate(1000,550)">
        <rect width="200" height="100" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" filter="url(#subtleShadow)"/>
        <text x="100" y="25" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">Frontend Clients</text>
        <text x="100" y="45" textAnchor="middle" fill="#64748b" fontSize="10">Real-time Updates</text>
        <text x="100" y="60" textAnchor="middle" fill="#64748b" fontSize="10">Socket Broadcast:</text>
        <text x="100" y="75" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="500">"board-update"</text>
        <text x="100" y="90" textAnchor="middle" fill="#64748b" fontSize="9">All Connected Users</text>
      </g>
      
      {/* REQUEST FLOW - Thin blue arrows with proper spacing */}
      {/* 1 → 2: Client to Server */}
      <path d="M180,205 L290,205" stroke="#3b82f6" strokeWidth="1.5" fill="none" markerEnd="url(#requestArrow)"/>
      
      {/* 2 → 3: Server to Middlewares */}
      <path d="M410,200 Q445,180 480,170" stroke="#3b82f6" strokeWidth="1.5" fill="none" markerEnd="url(#requestArrow)"/>
      
      {/* 3 → 4: Middlewares to Routes */}
      <path d="M580,220 Q640,250 650,310" stroke="#3b82f6" strokeWidth="1.5" fill="none" markerEnd="url(#requestArrow)"/>
      
      {/* 4 → 5: Routes to Controller */}
      <path d="M700,390 L700,450" stroke="#3b82f6" strokeWidth="1.5" fill="none" markerEnd="url(#requestArrow)"/>
      
      {/* 5 → 6: Controller to Services */}
      <path d="M680,510 Q540,530 460,550" stroke="#3b82f6" strokeWidth="1.5" fill="none" markerEnd="url(#requestArrow)"/>
      
      {/* 6 → 7: Services to Database */}
      <path d="M370,650 Q385,740 400,830" stroke="#3b82f6" strokeWidth="1.5" fill="none" markerEnd="url(#requestArrow)"/>
      
      {/* RESPONSE FLOW - Thin green dashed arrows */}
      {/* 7 → 6: Database to Services */}
      <path d="M420,830 Q405,740 390,650" stroke="#059669" strokeWidth="1.5" fill="none" markerEnd="url(#responseArrow)" strokeDasharray="4,3"/>
      
      {/* 6 → 5: Services to Controller */}
      <path d="M480,550 Q560,530 700,510" stroke="#059669" strokeWidth="1.5" fill="none" markerEnd="url(#responseArrow)" strokeDasharray="4,3"/>
      
      {/* 5 → 4: Controller to Routes */}
      <path d="M720,450 L720,390" stroke="#059669" strokeWidth="1.5" fill="none" markerEnd="url(#responseArrow)" strokeDasharray="4,3"/>
      
      {/* 4 → 3: Routes to Middlewares */}
      <path d="M670,310 Q660,250 600,220" stroke="#059669" strokeWidth="1.5" fill="none" markerEnd="url(#responseArrow)" strokeDasharray="4,3"/>
      
      {/* 3 → 2: Middlewares to Server */}
      <path d="M500,170 Q465,180 430,200" stroke="#059669" strokeWidth="1.5" fill="none" markerEnd="url(#responseArrow)" strokeDasharray="4,3"/>
      
      {/* 2 → 1: Server to Client */}
      <path d="M310,205 L200,205" stroke="#059669" strokeWidth="1.5" fill="none" markerEnd="url(#responseArrow)" strokeDasharray="4,3"/>
      
      {/* SOCKET FLOW - Thin red arrow */}
      {/* Services to Frontend */}
      <path d="M480,590 Q740,580 1000,600" stroke="#dc2626" strokeWidth="1.5" fill="none" markerEnd="url(#socketArrow)"/>
      
      {/* Clean, subtle labels */}
      <text x="235" y="195" textAnchor="middle" fill="#64748b" fontSize="9">HTTP Request</text>
      <text x="445" y="165" textAnchor="middle" fill="#64748b" fontSize="9">Processing</text>
      <text x="615" y="265" textAnchor="middle" fill="#64748b" fontSize="9">Route Match</text>
      <text x="720" y="435" textAnchor="middle" fill="#64748b" fontSize="9">Logic</text>
      <text x="570" y="540" textAnchor="middle" fill="#64748b" fontSize="9">Service Call</text>
      <text x="340" y="750" textAnchor="middle" fill="#64748b" fontSize="9">Data Access</text>
      
      <text x="255" y="215" textAnchor="middle" fill="#059669" fontSize="9">JSON Response</text>
      <text x="360" y="770" textAnchor="middle" fill="#059669" fontSize="9">Query Results</text>
      
      <text x="740" y="570" textAnchor="middle" fill="#dc2626" fontSize="9">Live Broadcast</text>
      
      {/* Clean legend */}
      <g transform="translate(50,350)">
        <rect width="160" height="80" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" opacity="0.95" filter="url(#subtleShadow)"/>
        <text x="80" y="18" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="500">Flow Legend</text>
        
        <line x1="15" y1="30" x2="45" y2="30" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#requestArrow)"/>
        <text x="50" y="34" fill="#3b82f6" fontSize="9">Request</text>
        
        <line x1="15" y1="45" x2="45" y2="45" stroke="#059669" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#responseArrow)"/>
        <text x="50" y="49" fill="#059669" fontSize="9">Response</text>
        
        <line x1="15" y1="60" x2="45" y2="60" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#socketArrow)"/>
        <text x="50" y="64" fill="#dc2626" fontSize="9">Socket</text>
      </g>
      
      {/* 30-second explanation guide */}
      <g transform="translate(1200,150)">
        <rect width="180" height="200" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" opacity="0.95" filter="url(#subtleShadow)"/>
        <text x="90" y="18" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="500">30-Second Flow</text>
        
        <text x="15" y="35" fill="#64748b" fontSize="9" fontWeight="500">1-2-3: Entry & Auth</text>
        <text x="20" y="47" fill="#64748b" fontSize="8">Request → server.js →</text>
        <text x="20" y="57" fill="#64748b" fontSize="8">middleware authentication</text>
        
        <text x="15" y="75" fill="#64748b" fontSize="9" fontWeight="500">4-5: API Processing</text>
        <text x="20" y="87" fill="#64748b" fontSize="8">Route matching →</text>
        <text x="20" y="97" fill="#64748b" fontSize="8">controller logic</text>
        
        <text x="15" y="115" fill="#64748b" fontSize="9" fontWeight="500">6-7: Data Operations</text>
        <text x="20" y="127" fill="#64748b" fontSize="8">Service layer →</text>
        <text x="20" y="137" fill="#64748b" fontSize="8">database access</text>
        
        <text x="15" y="155" fill="#64748b" fontSize="9" fontWeight="500">8: Real-time Updates</text>
        <text x="20" y="167" fill="#64748b" fontSize="8">Socket broadcast to</text>
        <text x="20" y="177" fill="#64748b" fontSize="8">all connected clients</text>
        
        <text x="15" y="195" fill="#059669" fontSize="8" fontWeight="500">Response flows back up!</text>
      </g>
    </svg>
  );
};

export default MindayArchitectureDiagram;