/* ═══════════════════════════════════════════════════════════
   YOLA — Main JS v2.0
   Cursor, nav, scroll reveal, mobile menu, animations.
   ═══════════════════════════════════════════════════════════ */

/* ─── 1. TOUCH DETECTION — disable custom cursor ──────── */
(function() {
    var isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) return;

    var c = document.getElementById('c');
    var cr = document.getElementById('cr');
    if (c) c.remove();
    if (cr) cr.remove();
    document.documentElement.style.cursor = 'auto';
    document.body.style.cursor = 'auto';

    var style = document.createElement('style');
    style.textContent = '*,*::before,*::after{cursor:auto!important}';
    document.head.appendChild(style);
})();

/* ─── 2. CURSOR TRACKING (desktop only) ────────────────── */
(function() {
    var isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    var cur = document.getElementById('c');
    var ring = document.getElementById('cr');
    if (!cur || !ring) return;

    var mx = 0, my = 0;
    var rx = 0, ry = 0;
    var halfRing = 14;

    document.addEventListener('mousemove', function(e) {
        mx = e.clientX;
        my = e.clientY;
        cur.style.transform = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';
    });

    /* Smooth ring follow with lerp */
    (function animRing() {
        rx += (mx - rx - halfRing) * 0.1;
        ry += (my - ry - halfRing) * 0.1;
        ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
        requestAnimationFrame(animRing);
    })();

    /* Hover effect on interactive elements */
    var interactive = 'a,button,.nav-pill,.btn,.btn-nav,.cat-btn,.filter-btn,.fb-upvote,.share-btn,.detect-btn,.btn-submit,.nav-toggle,.card';
    document.querySelectorAll(interactive).forEach(function(el) {
        el.addEventListener('mouseenter', function() {
            ring.classList.add('hover');
        });
        el.addEventListener('mouseleave', function() {
            ring.classList.remove('hover');
        });
    });

    /* Hide cursor when leaving window */
    document.addEventListener('mouseleave', function() {
        cur.style.opacity = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function() {
        cur.style.opacity = '1';
        ring.style.opacity = '1';
    });
})();

/* ─── 3. SCROLL PROGRESS BAR ───────────────────────────── */
(function() {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;

    window.addEventListener('scroll', function() {
        var h = document.documentElement;
        var total = h.scrollHeight - h.clientHeight;
        var pct = (h.scrollTop || document.body.scrollTop) / total * 100;
        bar.style.width = pct + '%';
    });
})();

/* ─── 4. NAV — SCROLL SHADOW ────────────────────────────── */
(function() {
    var nav = document.getElementById('mainNav');
    if (!nav) return;

    window.addEventListener('scroll', function() {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    });
    /* Check initial state */
    if (window.scrollY > 40) nav.classList.add('scrolled');
})();

/* ─── 5. MOBILE NAV ────────────────────────────────────── */
(function() {
    var toggle = document.getElementById('navToggle');
    var panel = document.querySelector('.nav-r');
    var overlay = document.getElementById('navOverlay');
    if (!toggle || !panel) return;

    function openNav() {
        panel.classList.add('open');
        toggle.classList.add('open');
        if (overlay) overlay.classList.add('open');
    }

    function closeNav() {
        panel.classList.remove('open');
        toggle.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
    }

    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (panel.classList.contains('open')) {
            closeNav();
        } else {
            openNav();
        }
    });

    /* Close on overlay click */
    if (overlay) {
        overlay.addEventListener('click', closeNav);
    }

    /* Close on escape */
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && panel.classList.contains('open')) {
            closeNav();
        }
    });

    /* Close on resize to desktop */
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) closeNav();
    });
})();

/* ─── 6. SCROLL REVEAL (IntersectionObserver) ──────────── */
(function() {
    var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) {
                /* Add stagger delay if data-reveal-delay is set */
                var delay = e.target.getAttribute('data-reveal-delay');
                if (delay) {
                    e.target.style.transitionDelay = delay + 'ms';
                }
                e.target.classList.add('in');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.rv, .rv-scale').forEach(function(el) {
        obs.observe(el);
    });
})();

/* ─── 7. SMOOTH ANCHOR SCROLL ──────────────────────────── */
(function() {
    document.addEventListener('click', function(e) {
        var target = e.target.closest('a[href^="#"]');
        if (!target) return;

        var id = target.getAttribute('href').slice(1);
        var el = document.getElementById(id);
        if (!el) return;

        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
})();
