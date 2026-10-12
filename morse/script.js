    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            deck: {
              950: '#060809',
              900: '#0c1013',
              850: '#11171c',
              800: '#172027',
              700: '#23303b',
              600: '#344554',
              500: '#4c647a',
              400: '#7593af'
            },
            signal: {
              green: '#10b981',
              bright: '#34d399',
              glow: 'rgba(52, 211, 153, 0.45)',
              amber: '#f59e0b',
              amberGlow: 'rgba(245, 158, 11, 0.35)',
              red: '#ef4444'
            }
          },
          fontFamily: {
            sans: ['"Inter"', 'sans-serif'],
            mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace']
          }
        }
      }
    }
    // MORSE CODE DATA SPECIFICATIONS
    const MORSE_TABLE = {
      'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',
      'E': '.',     'F': '..-.',  'G': '--.',   'H': '....',
      'I': '..',    'J': '.---',  'K': '-.-',   'L': '.-..',
      'M': '--',    'N': '-.',    'O': '---',   'P': '.--.',
      'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
      'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',
      'Y': '-.--',  'Z': '--..',
      '1': '.----', '2': '..---', '3': '...--', '4': '....-',
      '5': '.....', '6': '-....', '7': '--...', '8': '---..',
      '9': '----.', '0': '-----'
    };

    const REVERSE_MORSE = {};
    Object.entries(MORSE_TABLE).forEach(([char, code]) => {
      REVERSE_MORSE[code] = char;
    });

    // Exact SVG Coordinates for Dave Nathanson KG6ZJ0 Decoder Chart
    const NATHANSON_COORDS = {
      'START': { x: 325, y: 75 },
      'E':     { x: 255, y: 75 },
      'I':     { x: 150, y: 75 },
      'S':     { x: 100, y: 75 },
      'H':     { x: 58,  y: 75 },
      'A':     { x: 255, y: 110 },
      'R':     { x: 225, y: 175 },
      'L':     { x: 175, y: 175 },
      'W':     { x: 255, y: 220 },
      'P':     { x: 185, y: 262 },
      'J':     { x: 255, y: 290 },
      'U':     { x: 150, y: 110 },
      'F':     { x: 198, y: 130 },
      'V':     { x: 100, y: 110 },
      'T':     { x: 378, y: 75 },
      'M':     { x: 457, y: 75 },
      'O':     { x: 511, y: 75 },
      'N':     { x: 422, y: 180 },
      'K':     { x: 458, y: 180 },
      'Y':     { x: 538, y: 180 },
      'C':     { x: 512, y: 216 },
      'D':     { x: 422, y: 228 },
      'X':     { x: 461, y: 228 },
      'B':     { x: 422, y: 282 },
      'G':     { x: 492, y: 112 },
      'Q':     { x: 527, y: 112 },
      'Z':     { x: 492, y: 140 }
    };

    const DAILY_FOUR_WORD_LIST = [
      "ROGER THAT STAY SAFE",
      "SEND HELP VERY FAST",
      "NORTH WIND BLOWS COLD",
      "BEACON SHINES AT DUSK",
      "SAFE HARBOR FOUND HERE",
      "RADAR LOCK ON SHIP",
      "NIGHT SCOUTS MOVE WEST",
      "RADIO TEAM HOLD LINE",
      "STATION ACTIVE ALL GOOD",
      "BRAVE CREW STAND FAST",
      "STORM PASSING EAST NOW",
      "SIGNAL LOUD AND CLEAR",
      "GOLD KEY WORKS WELL",
      "WATCH OUT FOR REEF",
      "DAWN PATROL TAKES FLIGHT",
      "SUN RISES OVER HILLS",
      "EAGLE NEST SECURED NOW",
      "RIVER CROSSING SAFE TODAY",
      "FOG ROLLS OVER BAY",
      "TIME FLIES LIKE WIND",
      "KEEP CALM WORK HARD",
      "NAVY SEALS SWIM SILENT",
      "RADIO TOWER STANDS TALL",
      "DEEP WATER RUNS QUIET",
      "SPEED UP ENGINE POWER",
      "WATCH NIGHT SKY BRIGHT",
      "LIGHT HOUSE FLASH TWICE",
      "RADIO CALL CODE RED",
      "ALERT TEAM TAKE COVER",
      "RADAR FINDS UNKNOWN SHIP",
      "SEARCH VALLEY NEAR MOUNTAIN",
      "SCOUT UNITS RETURN BASE",
      "HOLD POSITION UNTIL DAWN",
      "CHECK COMPASS HEADING TRUE",
      "WIND SPEEDS GAINING FORCE",
      "SHADOWS LENGTHEN ON SHORE",
      "FIRE SMOKE SEEN AHEAD",
      "PATROL REPORT CLEAR TRACK",
      "SILVER BIRCH TREE SHADE",
      "PILOT SEES CLEAR RUNWAY",
      "ECHO HEARD FROM CAVE",
      "TRANSMISSION OVER AND OUT",
      "RADIO CONTACT MADE TODAY",
      "SECRET CODE KEY FOUND",
      "KEEP WATCH ALL NIGHT",
      "RISING TIDE COVERS SAND",
      "STARS GUIDE LOST CREW",
      "COLD IRON SHIELDS SHIP",
      "SECURE CARGO ON DECK",
      "SOLAR WINDS DISRUPT RADIO",
      "RADIO SIGNAL HEARD AGAIN",
      "DESERT ROUTE CLEARED SAFELY",
      "SUPPLY CONVOY ROLLS FORWARD",
      "ANCHOR DROPPED IN BAY",
      "WINGS CLIP CLOUD BASE",
      "BLUE WATER UNDER HULL",
      "STRONG SIGNAL FROM SOUTH",
      "WINTER SNOW FALLS GENTLE",
      "CRICKET CHIRPS AT NOON",
      "GREEN LIGHT FOR LAUNCH",
      "TACTICAL RETREAT NOT NEEDED",
      "FIRST SQUAD LEAD ADVANCE",
      "SHORE BATTERY FIRES SALUTE",
      "GOLDEN DAWN BRINGS HOPE",
      "RADIO BRIDGE RESTORED NOW",
      "OCEAN CURRENT CARRIES SHIP",
      "SILENT WATCHER STANDS GUARD",
      "HIGH PEAKS CAPPED SNOW",
      "SWIFT FALCON STRIKES TRUE",
      "CLEAR HORIZON SEEN AHEAD",
      "SHADOWS RUN TOWARD SUNSET",
      "IRON WILL WINS BATTLE",
      "HEAVY RAIN STOPS NOW",
      "NEW DAY HAS BEGUN",
      "STORM RECEDES PAST ISLAND",
      "RADIO RELAY WORK FINISHED"
    ];

    // APPLICATION STATE
    const app = {
      toneFreq: 700,
      holdThreshold: 160,
      wpm: 15,
      soundEnabled: true,

      // Interactive Map State
      currentMorseSymbol: "",
      mapCommitTimeout: null,
      practiceTranscriptText: "",

      // Daily State
      dailyDate: new Date(),
      dailyTargetText: "",
      dailyTargetMorse: "",
      dailyUserMorse: "",
      dailyUserText: "",

      // Blind test visibility toggles
      hideDailyPhrase: false,
      hideDailyMorse: false,
      hideDailyLive: false
    };

    // AUDIO SYNTHESIZER
    class MorseSynthesizer {
      constructor() {
        this.ctx = null;
        this.osc = null;
        this.gain = null;
        this.isPlaying = false;
        this.playbackAborted = false;
      }

      init() {
        if (!this.ctx) {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          this.ctx = new AudioCtx();
        }
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      }

      beepOn(freq = app.toneFreq) {
        if (!app.soundEnabled) return;
        this.init();
        if (this.isPlaying) return;

        try {
          const now = this.ctx.currentTime;
          this.osc = this.ctx.createOscillator();
          this.gain = this.ctx.createGain();

          this.osc.type = 'sine';
          this.osc.frequency.setValueAtTime(freq, now);

          this.gain.gain.setValueAtTime(0.0001, now);
          this.gain.gain.exponentialRampToValueAtTime(0.25, now + 0.005);

          this.osc.connect(this.gain);
          this.gain.connect(this.ctx.destination);

          this.osc.start();
          this.isPlaying = true;
        } catch (e) {
          console.error("Audio beepOn error", e);
        }
      }

      beepOff() {
        if (!this.isPlaying || !this.gain || !this.osc) return;
        try {
          const now = this.ctx.currentTime;
          this.gain.gain.cancelScheduledValues(now);
          this.gain.gain.setValueAtTime(this.gain.gain.value, now);
          this.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.006);

          const o = this.osc;
          setTimeout(() => {
            try { o.stop(); o.disconnect(); } catch (_) {}
          }, 10);
        } catch (e) {
          console.error("Audio beepOff error", e);
        }
        this.isPlaying = false;
        this.osc = null;
        this.gain = null;
      }

      async playSequence(morseStr, wpm = app.wpm) {
        this.init();
        this.playbackAborted = false;

        const dotMs = Math.round(1200 / wpm);
        const dashMs = dotMs * 3;
        const intraMs = dotMs;
        const letterGapMs = dotMs * 3;
        const wordGapMs = dotMs * 7;

        for (let i = 0; i < morseStr.length; i++) {
          if (this.playbackAborted) break;
          const ch = morseStr[i];

          if (ch === '.') {
            this.beepOn();
            await this.sleep(dotMs);
            this.beepOff();
            await this.sleep(intraMs);
          } else if (ch === '-') {
            this.beepOn();
            await this.sleep(dashMs);
            this.beepOff();
            await this.sleep(intraMs);
          } else if (ch === ' ') {
            await this.sleep(letterGapMs);
          } else if (ch === '/') {
            await this.sleep(wordGapMs);
          }
        }
      }

      stopPlayback() {
        this.playbackAborted = true;
        this.beepOff();
      }

      sleep(ms) {
        return new Promise(res => setTimeout(res, ms));
      }
    }

    const synth = new MorseSynthesizer();

    // MAP NODE HIGHLIGHT & DYNAMIC TRACER LOGIC
    function highlightMapNode(morseSequence) {
      document.querySelectorAll('.nathanson-interactive').forEach(el => {
        el.classList.remove('svg-node-active');
      });

      const trackerLabel = document.getElementById('mapCurrentMorse');
      const svgCursor = document.getElementById('svgTracerCursor');

      if (!morseSequence) {
        trackerLabel.innerText = "START";
        if (svgCursor) {
          svgCursor.setAttribute('cx', NATHANSON_COORDS['START'].x);
          svgCursor.setAttribute('cy', NATHANSON_COORDS['START'].y);
          svgCursor.setAttribute('r', '9');
        }
        return;
      }

      trackerLabel.innerText = morseSequence;

      const matchedChar = REVERSE_MORSE[morseSequence];
      const coords = matchedChar && NATHANSON_COORDS[matchedChar];

      if (coords && svgCursor) {
        svgCursor.setAttribute('cx', coords.x);
        svgCursor.setAttribute('cy', coords.y);
        svgCursor.setAttribute('r', '13');

        const svgNode = document.querySelector(`.nathanson-interactive[data-code="${morseSequence}"]`);
        if (svgNode) {
          svgNode.classList.add('svg-node-active');
        }
      } else if (svgCursor) {
        const prevCode = morseSequence.slice(0, -1);
        const prevChar = REVERSE_MORSE[prevCode];
        const baseCoord = (prevChar && NATHANSON_COORDS[prevChar]) || NATHANSON_COORDS['START'];
        const lastSym = morseSequence.slice(-1);

        const offsetX = lastSym === '.' ? -28 : 28;
        svgCursor.setAttribute('cx', baseCoord.x + offsetX);
        svgCursor.setAttribute('cy', baseCoord.y + 16);
      }
    }

    function appendPracticeMorse(sym) {
      if (app.currentMorseSymbol.length >= 5) {
        commitCurrentLetter();
      }

      app.currentMorseSymbol += sym;
      highlightMapNode(app.currentMorseSymbol);

      clearTimeout(app.mapCommitTimeout);
      app.mapCommitTimeout = setTimeout(() => {
        commitCurrentLetter();
      }, app.holdThreshold * 3.5);
    }

    function commitCurrentLetter() {
      clearTimeout(app.mapCommitTimeout);
      if (!app.currentMorseSymbol) return;

      const letter = REVERSE_MORSE[app.currentMorseSymbol] || '?';
      app.practiceTranscriptText += letter;
      
      const transcriptEl = document.getElementById('practiceTranscript');
      transcriptEl.innerText = app.practiceTranscriptText;

      synth.playSequence(app.currentMorseSymbol);

      app.currentMorseSymbol = "";
      highlightMapNode("");
    }

    function deletePracticeLast() {
      if (app.currentMorseSymbol.length > 0) {
        app.currentMorseSymbol = app.currentMorseSymbol.slice(0, -1);
        highlightMapNode(app.currentMorseSymbol);
      } else if (app.practiceTranscriptText.length > 0) {
        app.practiceTranscriptText = app.practiceTranscriptText.slice(0, -1);
        const transcriptEl = document.getElementById('practiceTranscript');
        if (app.practiceTranscriptText.length === 0) {
          transcriptEl.innerHTML = '<span class="text-deck-600 font-normal text-xs italic">Tap or hold key below to watch the green tracker navigate the map...</span>';
        } else {
          transcriptEl.innerText = app.practiceTranscriptText;
        }
      }
    }

    function setupPracticeKeyer() {
      const keyPad = document.getElementById('practiceKeyPad');
      let isDown = false;
      let downTime = 0;

      function onDown() {
        if (isDown) return;
        isDown = true;
        downTime = performance.now();
        keyPad.classList.add('key-active');
        synth.beepOn();
      }

      function onUp() {
        if (!isDown) return;
        const duration = performance.now() - downTime;
        isDown = false;
        keyPad.classList.remove('key-active');
        synth.beepOff();

        const sym = duration < app.holdThreshold ? '.' : '-';
        appendPracticeMorse(sym);
      }

      keyPad.addEventListener('mousedown', onDown);
      keyPad.addEventListener('mouseup', onUp);
      keyPad.addEventListener('mouseleave', onUp);

      keyPad.addEventListener('touchstart', (e) => {
        e.preventDefault();
        onDown();
      }, { passive: false });

      keyPad.addEventListener('touchend', (e) => {
        e.preventDefault();
        onUp();
      }, { passive: false });

      document.getElementById('btnBackPractice').addEventListener('click', deletePracticeLast);
      document.getElementById('btnClearPractice').addEventListener('click', () => {
        app.practiceTranscriptText = "";
        app.currentMorseSymbol = "";
        highlightMapNode("");
        document.getElementById('practiceTranscript').innerHTML = '<span class="text-deck-600 font-normal text-xs italic">Tap or hold key below to watch the green tracker navigate the map...</span>';
      });

      // Render Alphabet Band Tiles
      const alphaGrid = document.getElementById('alphabetGrid');
      alphaGrid.innerHTML = '';
      const alphabet = Object.keys(MORSE_TABLE)
        .filter(char => /^[A-Z]$/.test(char))
        .sort();
      for (const char of alphabet) {
        const code = MORSE_TABLE[char];
        const tile = document.createElement('div');
        tile.className = 'map-node char-grid-node h-9 rounded bg-deck-850 border border-deck-700 flex flex-col items-center justify-center cursor-pointer hover:border-signal-bright';
        tile.dataset.code = code;
        tile.dataset.char = char;
        tile.innerHTML = `<span class="text-xs font-mono font-bold text-white">${char}</span><span class="text-[7px] text-deck-400 font-mono">${code}</span>`;
        alphaGrid.appendChild(tile);
      }

      // Audition alphabet & number tiles
      document.querySelectorAll('.char-grid-node').forEach(node => {
        node.addEventListener('click', () => {
          const code = node.dataset.code;
          const char = node.dataset.char;
          highlightMapNode(code);
          synth.playSequence(code, 18);
          showToast(`AUDITION '${char}': ${code}`);
          setTimeout(() => highlightMapNode(""), 700);
        });
      });

      // Audition & Insert Prosigns & Priority Signals
      document.querySelectorAll('.prosign-card').forEach(card => {
        card.addEventListener('click', () => {
          const code = card.dataset.code;
          const label = card.dataset.label;
          const desc = card.dataset.desc;

          // Append to practice transcript with spacing
          if (app.practiceTranscriptText.length > 0 && !app.practiceTranscriptText.endsWith(' ')) {
            app.practiceTranscriptText += ' ' + label + ' ';
          } else {
            app.practiceTranscriptText += label + ' ';
          }
          
          const transcriptEl = document.getElementById('practiceTranscript');
          transcriptEl.innerText = app.practiceTranscriptText;

          // Sound play
          synth.playSequence(code, 17);
          showToast(`PROSIGN [${label}]: ${desc}`);
        });
      });

      // Audition SVG letters
      document.querySelectorAll('.nathanson-interactive').forEach(node => {
        node.addEventListener('click', () => {
          const code = node.dataset.code;
          const char = node.dataset.char;
          highlightMapNode(code);
          synth.playSequence(code, 18);
          showToast(`AUDITION '${char}': ${code}`);
          setTimeout(() => highlightMapNode(""), 700);
        });
      });

      document.getElementById('svg-start-helm').addEventListener('click', () => {
        highlightMapNode("");
        showToast("Centered at START HERE");
      });
    }

    function textToMorse(text) {
      return text.trim().toUpperCase().split(/\s+/).map(word => {
        return word.split('').map(c => MORSE_TABLE[c] || '').filter(Boolean).join(' ');
      }).join(' / ');
    }

    function morseToText(morse) {
      if (!morse) return "";
      return morse.trim().split('/').map(w => {
        return w.trim().split(/\s+/).map(c => REVERSE_MORSE[c] || '?').join('');
      }).join(' ');
    }

    function initDailyChallenge(offset = 0) {
      const d = new Date();
      d.setDate(d.getDate() + offset);
      app.dailyDate = d;

      const idx = (d.getFullYear() * 365 + d.getMonth() * 31 + d.getDate()) % DAILY_FOUR_WORD_LIST.length;
      app.dailyTargetText = DAILY_FOUR_WORD_LIST[idx];
      app.dailyTargetMorse = textToMorse(app.dailyTargetText);

      document.getElementById('dailyDateTitle').innerText = `DISPATCH // ${d.toISOString().slice(0,10)}`;
      document.getElementById('dailyTargetPhrase').innerText = app.dailyTargetText;
      document.getElementById('dailyTargetMorse').innerText = app.dailyTargetMorse;

      app.dailyUserMorse = "";
      app.dailyUserText = "";
      updateDailyUI();
      document.getElementById('dailyResultCard').classList.add('hidden');
    }

    function updateDailyUI() {
      const decodedEl = document.getElementById('dailyUserDecoded');
      const rawEl = document.getElementById('dailyUserRawMorse');

      if (!app.dailyUserMorse.trim()) {
        decodedEl.innerHTML = '<span class="text-deck-600 font-normal text-xs italic">Tap key below to begin transmission...</span>';
        rawEl.innerText = "";
      } else {
        const decoded = morseToText(app.dailyUserMorse);
        decodedEl.innerText = decoded;
        rawEl.innerText = app.dailyUserMorse;
      }
    }

    function appendDailyPulse(sym) {
      app.dailyUserMorse += sym;
      updateDailyUI();
    }

    function deleteDailyLast() {
      if (!app.dailyUserMorse) return;

      if (app.dailyUserMorse.endsWith(' / ')) {
        app.dailyUserMorse = app.dailyUserMorse.slice(0, -3);
      } else if (app.dailyUserMorse.endsWith(' ')) {
        app.dailyUserMorse = app.dailyUserMorse.slice(0, -1);
      } else {
        app.dailyUserMorse = app.dailyUserMorse.slice(0, -1);
      }
      updateDailyUI();
    }

    function setupDailyVisibilityToggles() {
      // Toggle 1: Target Phrase
      const btnTogglePhrase = document.getElementById('btnToggleHidePhrase');
      const phraseEl = document.getElementById('dailyTargetPhrase');
      const phraseMaskEl = document.getElementById('dailyTargetPhraseMasked');
      const iconPhrase = document.getElementById('iconTogglePhrase');
      const labelPhrase = document.getElementById('labelTogglePhrase');

      btnTogglePhrase.addEventListener('click', () => {
        app.hideDailyPhrase = !app.hideDailyPhrase;
        if (app.hideDailyPhrase) {
          phraseEl.classList.add('hidden');
          phraseMaskEl.classList.remove('hidden');
          iconPhrase.className = 'fa-regular fa-eye-slash text-[11px]';
          labelPhrase.innerText = 'SHOW';
          showToast('Target phrase hidden for blind test');
        } else {
          phraseEl.classList.remove('hidden');
          phraseMaskEl.classList.add('hidden');
          iconPhrase.className = 'fa-regular fa-eye text-[11px]';
          labelPhrase.innerText = 'HIDE';
        }
      });

      // Toggle 2: Morse Encoding Hint
      const btnToggleMorse = document.getElementById('btnToggleHideMorse');
      const morseEl = document.getElementById('dailyTargetMorse');
      const morseMaskEl = document.getElementById('dailyTargetMorseMasked');
      const iconMorse = document.getElementById('iconToggleMorse');
      const labelMorse = document.getElementById('labelToggleMorse');

      btnToggleMorse.addEventListener('click', () => {
        app.hideDailyMorse = !app.hideDailyMorse;
        if (app.hideDailyMorse) {
          morseEl.classList.add('hidden');
          morseMaskEl.classList.remove('hidden');
          iconMorse.className = 'fa-regular fa-eye-slash text-[11px]';
          labelMorse.innerText = 'SHOW';
          showToast('Morse hint hidden');
        } else {
          morseEl.classList.remove('hidden');
          morseMaskEl.classList.add('hidden');
          iconMorse.className = 'fa-regular fa-eye text-[11px]';
          labelMorse.innerText = 'HIDE';
        }
      });

      // Toggle 3: Live Decoded Transmission Feed
      const btnToggleLive = document.getElementById('btnToggleHideLive');
      const decodedEl = document.getElementById('dailyUserDecoded');
      const decodedMaskEl = document.getElementById('dailyUserDecodedMasked');
      const rawMorseEl = document.getElementById('dailyUserRawMorse');
      const iconLive = document.getElementById('iconToggleLive');
      const labelLive = document.getElementById('labelToggleLive');

      btnToggleLive.addEventListener('click', () => {
        app.hideDailyLive = !app.hideDailyLive;
        if (app.hideDailyLive) {
          decodedEl.classList.add('hidden');
          rawMorseEl.classList.add('hidden');
          decodedMaskEl.classList.remove('hidden');
          iconLive.className = 'fa-regular fa-eye-slash text-[11px]';
          labelLive.innerText = 'SHOW';
          showToast('Live decode hidden until submit');
        } else {
          decodedEl.classList.remove('hidden');
          rawMorseEl.classList.remove('hidden');
          decodedMaskEl.classList.add('hidden');
          iconLive.className = 'fa-regular fa-eye text-[11px]';
          labelLive.innerText = 'HIDE';
        }
      });
    }

    function setupDailyKeyer() {
      const dKey = document.getElementById('dailyKeyPad');
      let isDown = false;
      let start = 0;
      let autoGap = null;

      function onDailyDown() {
        if (isDown) return;
        isDown = true;
        start = performance.now();
        dKey.classList.add('key-active');
        synth.beepOn();
      }

      function onDailyUp() {
        if (!isDown) return;
        const dur = performance.now() - start;
        isDown = false;
        dKey.classList.remove('key-active');
        synth.beepOff();

        const sym = dur < app.holdThreshold ? '.' : '-';
        appendDailyPulse(sym);

        clearTimeout(autoGap);
        autoGap = setTimeout(() => {
          if (app.dailyUserMorse && !app.dailyUserMorse.endsWith(' ') && !app.dailyUserMorse.endsWith('/')) {
            app.dailyUserMorse += ' ';
            updateDailyUI();
          }
        }, app.holdThreshold * 3.2);
      }

      dKey.addEventListener('mousedown', onDailyDown);
      dKey.addEventListener('mouseup', onDailyUp);
      dKey.addEventListener('mouseleave', onDailyUp);

      dKey.addEventListener('touchstart', (e) => {
        e.preventDefault();
        onDailyDown();
      }, { passive: false });

      dKey.addEventListener('touchend', (e) => {
        e.preventDefault();
        onDailyUp();
      }, { passive: false });

      document.getElementById('btnDailyWordGap').addEventListener('click', () => {
        if (!app.dailyUserMorse.endsWith(' / ')) {
          app.dailyUserMorse += ' / ';
          updateDailyUI();
        }
      });

      document.getElementById('btnDailyBackspace').addEventListener('click', deleteDailyLast);

      document.getElementById('btnClearDaily').addEventListener('click', () => {
        app.dailyUserMorse = "";
        updateDailyUI();
      });

      document.getElementById('btnDailyShuffle').addEventListener('click', () => {
        const offset = Math.floor(Math.random() * 50) + 1;
        initDailyChallenge(offset);
        showToast("Loaded alternative practice dispatch.");
      });

      let isPlayingTarget = false;
      document.getElementById('btnListenDaily').addEventListener('click', async () => {
        const btnText = document.getElementById('listenBtnText');
        if (isPlayingTarget) {
          synth.stopPlayback();
          isPlayingTarget = false;
          btnText.innerText = "LISTEN TARGET";
          return;
        }

        isPlayingTarget = true;
        btnText.innerText = "PLAYING...";
        await synth.playSequence(app.dailyTargetMorse, app.wpm);
        isPlayingTarget = false;
        btnText.innerText = "LISTEN TARGET";
      });

      document.getElementById('btnSubmitDaily').addEventListener('click', () => {
        if (!app.dailyUserMorse.trim()) {
          showToast("Please tap in your transmission first!");
          return;
        }

        if (app.hideDailyLive) {
          document.getElementById('btnToggleHideLive').click();
        }

        const actual = morseToText(app.dailyUserMorse).trim().toUpperCase();
        const expected = app.dailyTargetText.trim().toUpperCase();

        let matches = 0;
        const total = expected.replace(/\s+/g, '').length;
        const grid = document.getElementById('dailyCharMatchGrid');
        grid.innerHTML = "";

        const expWords = expected.split(' ');
        const actWords = actual.split(' ');

        for (let w = 0; w < expWords.length; w++) {
          const expW = expWords[w] || "";
          const actW = actWords[w] || "";

          for (let c = 0; c < expW.length; c++) {
            const expCh = expW[c];
            const actCh = actW[c] || "—";
            const isMatch = expCh === actCh;
            if (isMatch) matches++;

            const tag = document.createElement('div');
            tag.className = `px-2 py-1 rounded text-center border ${isMatch ? 'bg-emerald-950/60 border-emerald-500/60 text-signal-bright' : 'bg-red-950/60 border-red-500/60 text-red-400'}`;
            tag.innerHTML = `
              <div class="font-bold text-sm">${actCh}</div>
              <div class="text-[8px] text-deck-400 border-t border-deck-800 mt-0.5">Exp: ${expCh}</div>
            `;
            grid.appendChild(tag);
          }

          const spacer = document.createElement('div');
          spacer.className = "w-2";
          grid.appendChild(spacer);
        }

        const score = Math.max(0, Math.min(100, Math.round((matches / total) * 100)));
        document.getElementById('dailyAccuracyBadge').innerText = `${score}%`;

        document.getElementById('dailyResultCard').classList.remove('hidden');
        document.getElementById('dailyResultCard').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });

      document.getElementById('btnCloseResult').addEventListener('click', () => {
        document.getElementById('dailyResultCard').classList.add('hidden');
      });
    }

    // GLOBAL KEYBOARD BINDINGS (Spacebar keying + Physical Backspace key delete)
    function setupGlobalKeyboard() {
      let isKeyingSpace = false;

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          const isMapVisible = !document.getElementById('view-map').classList.contains('hidden');
          const isDailyVisible = !document.getElementById('view-daily').classList.contains('hidden');

          if (isMapVisible) {
            e.preventDefault();
            deletePracticeLast();
          } else if (isDailyVisible) {
            e.preventDefault();
            deleteDailyLast();
          }
          return;
        }

        if (e.code === 'Space' && !e.repeat) {
          const isMapVisible = !document.getElementById('view-map').classList.contains('hidden');
          const isDailyVisible = !document.getElementById('view-daily').classList.contains('hidden');

          if (isMapVisible) {
            e.preventDefault();
            const pad = document.getElementById('practiceKeyPad');
            pad.dispatchEvent(new MouseEvent('mousedown'));
          } else if (isDailyVisible) {
            e.preventDefault();
            const pad = document.getElementById('dailyKeyPad');
            pad.dispatchEvent(new MouseEvent('mousedown'));
          }
        }
      });

      window.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
          const isMapVisible = !document.getElementById('view-map').classList.contains('hidden');
          const isDailyVisible = !document.getElementById('view-daily').classList.contains('hidden');

          if (isMapVisible) {
            e.preventDefault();
            const pad = document.getElementById('practiceKeyPad');
            pad.dispatchEvent(new MouseEvent('mouseup'));
          } else if (isDailyVisible) {
            e.preventDefault();
            const pad = document.getElementById('dailyKeyPad');
            pad.dispatchEvent(new MouseEvent('mouseup'));
          }
        }
      });
    }

    function setupSettings() {
      const freqSlider = document.getElementById('setFreqSlider');
      freqSlider.addEventListener('input', (e) => {
        app.toneFreq = parseInt(e.target.value, 10);
        document.getElementById('setFreqValue').innerText = `${app.toneFreq} Hz`;
      });

      const holdSlider = document.getElementById('setHoldSlider');
      holdSlider.addEventListener('input', (e) => {
        app.holdThreshold = parseInt(e.target.value, 10);
        document.getElementById('setHoldValue').innerText = `${app.holdThreshold} ms`;
      });

      const wpmSlider = document.getElementById('setWpmSlider');
      wpmSlider.addEventListener('input', (e) => {
        app.wpm = parseInt(e.target.value, 10);
        document.getElementById('setWpmValue').innerText = `${app.wpm} WPM`;
      });

      const muteBtn = document.getElementById('btnToggleSoundMute');
      muteBtn.addEventListener('click', () => {
        app.soundEnabled = !app.soundEnabled;
        if (app.soundEnabled) {
          muteBtn.innerText = "ENABLED";
          muteBtn.className = "px-3.5 py-1.5 rounded-lg bg-deck-800 border border-deck-700 text-signal-bright font-bold";
          showToast("Sound Output Active");
        } else {
          muteBtn.innerText = "MUTED";
          muteBtn.className = "px-3.5 py-1.5 rounded-lg bg-deck-800 border border-deck-700 text-red-400 font-bold";
          synth.beepOff();
          showToast("Sound Output Muted");
        }
      });

      document.getElementById('btnResetAllData').addEventListener('click', () => {
        app.toneFreq = 700;
        app.holdThreshold = 160;
        app.wpm = 15;
        document.getElementById('setFreqSlider').value = 700;
        document.getElementById('setFreqValue').innerText = '700 Hz';
        document.getElementById('setHoldSlider').value = 160;
        document.getElementById('setHoldValue').innerText = '160 ms';
        document.getElementById('setWpmSlider').value = 15;
        document.getElementById('setWpmValue').innerText = '15 WPM';
        showToast("Settings reset to defaults.");
      });
    }

    function switchTab(tabId) {
      document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
      document.querySelectorAll('.nav-btn').forEach(b => {
        b.className = "nav-btn relative group p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 text-deck-400 hover:text-gray-200 hover:bg-deck-900";
        const dot = b.querySelector('.indicator-dot');
        if (dot) dot.classList.add('hidden');
      });

      const activeView = document.getElementById(`view-${tabId}`);
      const activeNav = document.getElementById(`nav-${tabId}`);
      if (activeView) activeView.classList.remove('hidden');
      if (activeNav) {
        activeNav.className = "nav-btn relative group p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 text-signal-bright bg-deck-850/80 shadow-[0_0_12px_rgba(52,211,153,0.25)] ring-1 ring-signal-bright/40";
        const dot = activeNav.querySelector('.indicator-dot');
        if (dot) dot.classList.remove('hidden');
      }
    }

    let toastTimeout;
    function showToast(text) {
      const box = document.getElementById('toastBox');
      document.getElementById('toastText').innerText = text;
      box.classList.remove('hidden');
      box.classList.add('flex');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        box.classList.add('hidden');
        box.classList.remove('flex');
      }, 2200);
    }

    // INITIALIZATION
    window.addEventListener('load', () => {
      setupPracticeKeyer();
      setupDailyKeyer();
      setupDailyVisibilityToggles();
      setupGlobalKeyboard();
      setupSettings();
      document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', () => switchTab(button.id.slice(4)));
      });
      initDailyChallenge();
      highlightMapNode("");
    });