interface MartialArtsSilhouetteProps {
  className?: string;
}

export function MartialArtsSilhouette({ className }: MartialArtsSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 400 500"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Martial artist in iconic fighting stance - side kick pose */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e5c158" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b8962e" />
        </linearGradient>
      </defs>

      {/* Head */}
      <ellipse cx="280" cy="65" rx="28" ry="32" fill="url(#goldGradient)" />

      {/* Neck */}
      <path
        d="M268 95 L292 95 L288 115 L272 115 Z"
        fill="url(#goldGradient)"
      />

      {/* Torso - twisted in kick position */}
      <path
        d="M250 110
           C230 120, 220 140, 225 170
           L235 220
           L295 210
           L310 160
           C315 130, 300 110, 280 108
           Z"
        fill="url(#goldGradient)"
      />

      {/* Back arm (left) - extended back for balance */}
      <path
        d="M250 125
           C230 130, 180 120, 140 140
           L135 135
           C175 110, 225 115, 248 120
           Z"
        fill="url(#goldGradient)"
      />

      {/* Back hand */}
      <ellipse cx="132" cy="138" rx="12" ry="8" fill="url(#goldGradient)" />

      {/* Front arm (right) - guard position */}
      <path
        d="M295 130
           C320 125, 340 140, 350 170
           L345 175
           C335 150, 320 135, 298 138
           Z"
        fill="url(#goldGradient)"
      />

      {/* Front fist */}
      <ellipse cx="348" cy="172" rx="10" ry="12" fill="url(#goldGradient)" />

      {/* Standing leg (right) - slight bend */}
      <path
        d="M270 215
           C265 260, 260 320, 255 380
           L250 420
           C248 435, 240 445, 235 450
           L230 470
           L255 475
           L265 455
           C275 445, 280 430, 278 415
           L285 380
           C290 320, 295 260, 290 218
           Z"
        fill="url(#goldGradient)"
      />

      {/* Standing foot */}
      <path
        d="M230 470 L255 475 L260 485 L225 488 L220 478 Z"
        fill="url(#goldGradient)"
      />

      {/* Kicking leg (left) - extended side kick */}
      <path
        d="M240 210
           C220 220, 180 230, 120 235
           L60 238
           L58 225
           L118 220
           C175 215, 215 205, 238 200
           Z"
        fill="url(#goldGradient)"
      />

      {/* Kicking foot - pointed */}
      <path
        d="M60 225 L58 238 L25 236 L20 230 L55 222 Z"
        fill="url(#goldGradient)"
      />
    </svg>
  );
}

export function MartialArtsStance({ className }: MartialArtsSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 300 450"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Martial artist in ready stance */}
      <defs>
        <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e5c158" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b8962e" />
        </linearGradient>
      </defs>

      {/* Head */}
      <ellipse cx="150" cy="50" rx="25" ry="30" fill="url(#goldGradient2)" />

      {/* Neck */}
      <rect x="140" y="78" width="20" height="20" fill="url(#goldGradient2)" />

      {/* Torso */}
      <path
        d="M110 95
           L190 95
           L185 180
           L115 180
           Z"
        fill="url(#goldGradient2)"
      />

      {/* Left arm - guard up */}
      <path
        d="M110 100
           C80 105, 70 130, 85 160
           L95 155
           C85 135, 90 115, 112 108
           Z"
        fill="url(#goldGradient2)"
      />
      <ellipse cx="87" cy="165" rx="10" ry="12" fill="url(#goldGradient2)" />

      {/* Right arm - guard up */}
      <path
        d="M190 100
           C220 105, 230 130, 215 160
           L205 155
           C215 135, 210 115, 188 108
           Z"
        fill="url(#goldGradient2)"
      />
      <ellipse cx="213" cy="165" rx="10" ry="12" fill="url(#goldGradient2)" />

      {/* Hips */}
      <path
        d="M115 175 L185 175 L195 210 L105 210 Z"
        fill="url(#goldGradient2)"
      />

      {/* Left leg */}
      <path
        d="M105 205
           L130 205
           L125 320
           L120 380
           L90 385
           L100 320
           Z"
        fill="url(#goldGradient2)"
      />
      <path d="M88 380 L122 375 L125 395 L85 400 Z" fill="url(#goldGradient2)" />

      {/* Right leg */}
      <path
        d="M170 205
           L195 205
           L200 320
           L210 380
           L180 385
           L175 320
           Z"
        fill="url(#goldGradient2)"
      />
      <path d="M178 380 L212 375 L215 395 L175 400 Z" fill="url(#goldGradient2)" />
    </svg>
  );
}
